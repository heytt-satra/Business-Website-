import * as T from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// Illustrative engineering details, dimensioned to the existing concept assemblies.
// Every repeated part shares its material so the model builder can batch it.
type Palette = ReturnType<typeof palette>;
const V = (x = 0, y = 0, z = 0) => new T.Vector3(x, y, z);
function palette() {
  const material = (color: string, roughness: number, metalness = 0.95) =>
    new T.MeshStandardMaterial({ color, roughness, metalness });
  return {
    titanium: material("#6f777a", 0.32),
    machined: material("#b3b9bc", 0.23),
    copper: material("#9e6844", 0.36),
    nickel: material("#879797", 0.27),
    graphite: material("#252a2d", 0.54, 0.65),
    ceramic: material("#d6d4c7", 0.61, 0.03),
    rubber: material("#111518", 0.78, 0.02),
    foil: new T.MeshPhysicalMaterial({
      color: "#aa8549",
      roughness: 0.32,
      metalness: 0.97,
      clearcoat: 0.16,
    }),
    glass: new T.MeshPhysicalMaterial({
      color: "#152c32",
      roughness: 0.08,
      metalness: 0.3,
      clearcoat: 1,
    }),
    hotSteel: material("#75675e", 0.48),
  };
}
function add(
  parent: T.Object3D,
  geometry: T.BufferGeometry,
  material: T.Material,
  at = V(),
) {
  const part = new T.Mesh(geometry, material);
  part.position.copy(at);
  part.castShadow = true;
  part.receiveShadow = true;
  parent.add(part);
  return part;
}
function block(
  parent: T.Object3D,
  material: T.Material,
  size: [number, number, number],
  at: T.Vector3,
) {
  return add(
    parent,
    new RoundedBoxGeometry(...size, 1, Math.min(...size) * 0.1),
    material,
    at,
  );
}
function cylinder(
  parent: T.Object3D,
  material: T.Material,
  radius: number,
  length: number,
  at: T.Vector3,
  axis = V(0, 1, 0),
  segments = 24,
) {
  const part = add(
    parent,
    new T.CylinderGeometry(radius, radius, length, segments),
    material,
    at,
  );
  part.quaternion.setFromUnitVectors(V(0, 1, 0), axis.clone().normalize());
  return part;
}
function segment(
  parent: T.Object3D,
  material: T.Material,
  start: T.Vector3,
  end: T.Vector3,
  radius: number,
) {
  return cylinder(
    parent,
    material,
    radius,
    start.distanceTo(end),
    start.clone().add(end).multiplyScalar(0.5),
    end.clone().sub(start),
    10,
  );
}
function pipe(
  parent: T.Object3D,
  material: T.Material,
  points: T.Vector3[],
  radius: number,
  segments = 48,
) {
  return add(
    parent,
    new T.TubeGeometry(
      new T.CatmullRomCurve3(points),
      segments,
      radius,
      6,
      false,
    ),
    material,
  );
}
function hoop(
  parent: T.Object3D,
  material: T.Material,
  radius: number,
  thickness: number,
  at: T.Vector3,
  normal = V(0, 1, 0),
  segments = 64,
) {
  const part = add(
    parent,
    new T.TorusGeometry(radius, thickness, 8, segments),
    material,
    at,
  );
  part.quaternion.setFromUnitVectors(V(0, 0, 1), normal.clone().normalize());
  return part;
}
function basis(normal: T.Vector3) {
  const n = normal.clone().normalize();
  const u = new T.Vector3()
    .crossVectors(n, Math.abs(n.y) > 0.9 ? V(1, 0, 0) : V(0, 1, 0))
    .normalize();
  return { n, u, v: new T.Vector3().crossVectors(n, u).normalize() };
}
function fastener(
  parent: T.Object3D,
  p: Palette,
  at: T.Vector3,
  axis: T.Vector3,
  radius = 0.025,
) {
  cylinder(parent, p.titanium, radius * 1.32, radius * 0.22, at, axis, 16);
  const head = at.clone().addScaledVector(axis, radius * 0.34);
  cylinder(parent, p.machined, radius, radius * 0.68, head, axis, 6);
  cylinder(
    parent,
    p.graphite,
    radius * 0.39,
    radius * 0.04,
    head.clone().addScaledVector(axis, radius * 0.36),
    axis,
    6,
  );
}
function boltCircle(
  parent: T.Object3D,
  p: Palette,
  at: T.Vector3,
  normal: T.Vector3,
  radius: number,
  count: number,
  size = 0.025,
) {
  const { n, u, v } = basis(normal);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    fastener(
      parent,
      p,
      at
        .clone()
        .addScaledVector(u, Math.cos(angle) * radius)
        .addScaledVector(v, Math.sin(angle) * radius),
      n,
      size,
    );
  }
}
function flange(
  parent: T.Object3D,
  p: Palette,
  at: T.Vector3,
  axis: T.Vector3,
  radius: number,
  depth = 0.06,
  viewport = false,
) {
  const n = axis.clone().normalize();
  cylinder(parent, p.titanium, radius, depth, at, n, 40);
  hoop(
    parent,
    p.machined,
    radius * 0.84,
    radius * 0.045,
    at.clone().addScaledVector(n, depth * 0.52),
    n,
  );
  cylinder(
    parent,
    viewport ? p.glass : p.graphite,
    radius * 0.64,
    0.008,
    at.clone().addScaledVector(n, depth * 0.53),
    n,
    32,
  );
  boltCircle(
    parent,
    p,
    at.clone().addScaledVector(n, depth * 0.55),
    n,
    radius * 0.83,
    8,
    radius * 0.075,
  );
}

function fusion(root: T.Group, p: Palette) {
  const detail = new T.Group();
  detail.name = "reactor-service-assembly";
  root.add(detail);
  // Sector-built vessel plates, an open service quadrant, and access flanges.
  for (let i = 0; i < 18; i++) {
    if (i > 3 && i < 8) continue;
    const a = (i / 18) * Math.PI * 2,
      radial = V(Math.cos(a), 0, Math.sin(a));
    const tangent = V(-Math.sin(a), 0, Math.cos(a));
    for (const y of [-0.71, 0.71]) {
      const bracket = block(
        detail,
        p.titanium,
        [0.24, 0.09, 0.18],
        radial.clone().multiplyScalar(1.43).setY(y),
      );
      bracket.rotation.y = -a;
      fastener(
        detail,
        p,
        radial
          .clone()
          .multiplyScalar(1.43)
          .setY(y + 0.055),
        V(0, 1, 0),
        0.031,
      );
    }
    const lower = radial.clone().multiplyScalar(1.34).setY(-0.75),
      upper = radial.clone().multiplyScalar(1.34).setY(0.73);
    segment(detail, p.graphite, lower, upper, 0.036);
    for (const sign of [-1, 1]) {
      const start = radial
        .clone()
        .multiplyScalar(1.22)
        .addScaledVector(tangent, sign * 0.06)
        .setY(0.74);
      pipe(
        detail,
        sign > 0 ? p.copper : p.nickel,
        [
          start,
          radial
            .clone()
            .multiplyScalar(1.5)
            .addScaledVector(tangent, sign * 0.06)
            .setY(0.92),
          radial
            .clone()
            .multiplyScalar(1.56)
            .addScaledVector(tangent, sign * 0.06)
            .setY(0.32),
        ],
        0.016,
        22,
      );
    }
    const plate = block(
      detail,
      p.ceramic,
      [0.14, 0.22, 0.045],
      radial.clone().multiplyScalar(1.54).setY(-0.3),
    );
    plate.rotation.y = Math.PI / 2 - a;
  }
  for (const a of [0.05, 1.65, 2.25, 3.2, 4.7]) {
    const axis = V(Math.cos(a), 0, Math.sin(a));
    const location = axis.clone().multiplyScalar(1.48).setY(0.02);
    cylinder(detail, p.graphite, 0.145, 0.27, location, axis);
    flange(
      detail,
      p,
      axis.clone().multiplyScalar(1.64).setY(0.02),
      axis,
      0.205,
      0.055,
      true,
    );
    cylinder(
      detail,
      p.copper,
      0.043,
      0.16,
      axis.clone().multiplyScalar(1.48).setY(0.28),
      V(0, 1, 0),
      16,
    );
  }
  for (const y of [-0.86, -0.79, 0.83])
    hoop(detail, p.hotSteel, 1.13, 0.025, V(0, y, 0));
  boltCircle(detail, p, V(0, 1.055, 0), V(0, 1, 0), 0.285, 12, 0.023);
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    block(
      detail,
      p.copper,
      [0.018, 1.44, 0.028],
      V(Math.cos(a) * 0.315, 0, Math.sin(a) * 0.315),
    ).rotation.y = -a;
  }
  // Bolted mounting shoes turn the feet into a plausible load path.
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2,
      center = V(Math.cos(a) * 1.25, -1.33, Math.sin(a) * 1.25);
    block(detail, p.titanium, [0.36, 0.055, 0.36], center);
    for (const x of [-0.12, 0.12])
      for (const z of [-0.12, 0.12])
        fastener(
          detail,
          p,
          center.clone().add(V(x, 0.035, z)),
          V(0, 1, 0),
          0.021,
        );
  }
}

function quantum(root: T.Group, p: Palette) {
  const levels = [1.5, 0.9, 0.3, -0.35, -0.95],
    radii = [1.06, 0.9, 0.74, 0.57, 0.4];
  const detail = new T.Group();
  detail.name = "cryogenic-coax-and-thermal-anchors";
  root.add(detail);
  for (let k = 0; k < levels.length; k++) {
    const y = levels[k],
      radius = radii[k];
    boltCircle(
      detail,
      p,
      V(0, y + 0.042, 0),
      V(0, 1, 0),
      radius * 0.88,
      18,
      0.016,
    );
    hoop(detail, p.copper, radius * 0.95, 0.012, V(0, y - 0.047, 0));
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + 0.14;
      const x = Math.cos(a) * radius * 0.69,
        z = Math.sin(a) * radius * 0.69;
      cylinder(
        detail,
        p.graphite,
        0.027,
        0.012,
        V(x, y + 0.043, z),
        V(0, 1, 0),
        16,
      );
      cylinder(
        detail,
        p.copper,
        0.032,
        0.065,
        V(x, y + 0.079, z),
        V(0, 1, 0),
        6,
      );
      cylinder(
        detail,
        p.ceramic,
        0.017,
        0.06,
        V(x, y + 0.133, z),
        V(0, 1, 0),
        12,
      );
      if (k < 4) {
        const nextR = radii[k + 1] * 0.69,
          nextY = levels[k + 1];
        pipe(
          detail,
          i % 3 ? p.nickel : p.copper,
          [
            V(x, y + 0.15, z),
            V(x * 1.04, y - 0.1, z * 1.04),
            V(
              Math.cos(a + 0.05) * nextR,
              nextY + 0.25,
              Math.sin(a + 0.05) * nextR,
            ),
            V(Math.cos(a) * nextR, nextY + 0.12, Math.sin(a) * nextR),
          ],
          0.009,
          26,
        );
      }
    }
    if (k > 0) {
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        for (let strand = -2; strand <= 2; strand++) {
          const theta = a + strand * 0.023;
          const r = radius * 0.4;
          pipe(
            detail,
            p.copper,
            [
              V(Math.cos(theta) * r, y + 0.045, Math.sin(theta) * r),
              V(Math.cos(theta) * r * 0.8, y + 0.2, Math.sin(theta) * r * 0.8),
              V(Math.cos(theta) * r, y + 0.37, Math.sin(theta) * r),
            ],
            0.01,
            18,
          );
        }
      }
    }
  }
  // The rear half of the radiation shield stays open toward the presentation view.
  const shield = add(
    detail,
    new T.CylinderGeometry(1.11, 1.11, 0.86, 56, 1, true, Math.PI / 2, Math.PI),
    p.hotSteel,
    V(0, 1, 0),
  );
  (shield.material as T.MeshStandardMaterial).side = T.DoubleSide;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    cylinder(
      detail,
      p.copper,
      0.057,
      0.17,
      V(Math.cos(a) * 0.74, 1.64, Math.sin(a) * 0.74),
      V(0, 1, 0),
      6,
    );
    hoop(
      detail,
      p.machined,
      0.051,
      0.008,
      V(Math.cos(a) * 0.74, 1.715, Math.sin(a) * 0.74),
    );
  }
  block(detail, p.titanium, [0.31, 0.04, 0.31], V(0, -1.76, 0));
  for (const x of [-0.115, 0.115])
    for (const z of [-0.115, 0.115])
      fastener(detail, p, V(x, -1.73, z), V(0, 1, 0), 0.012);
}

function propulsion(root: T.Group, p: Palette) {
  const detail = new T.Group();
  detail.name = "regenerative-cooling-and-feed-system";
  root.add(detail);
  const profile = [
    [-1.4, 1],
    [-1.12, 0.83],
    [-0.65, 0.5],
    [-0.25, 0.28],
    [0.05, 0.21],
    [0.35, 0.28],
    [0.75, 0.3],
    [1.1, 0.25],
  ];
  // Individual longitudinal channels carry the eye down the contour of the bell.
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    pipe(
      detail,
      i % 4 === 0 ? p.copper : p.hotSteel,
      profile.map(([y, r]) =>
        V(Math.cos(angle) * (r + 0.008), y, Math.sin(angle) * (r + 0.008)),
      ),
      0.0085,
      44,
    );
  }
  hoop(detail, p.hotSteel, 1.005, 0.022, V(0, -1.4, 0));
  for (const y of [0.4, 1.25]) {
    cylinder(detail, p.titanium, y > 1 ? 0.4 : 0.335, 0.035, V(0, y, 0));
    boltCircle(
      detail,
      p,
      V(0, y + 0.022, 0),
      V(0, 1, 0),
      y > 1 ? 0.345 : 0.292,
      18,
      0.016,
    );
  }
  for (const side of [-1, 1]) {
    flange(detail, p, V(side * 0.61, 0.88, 0.245), V(0, 0, 1), 0.215, 0.055);
    cylinder(detail, p.copper, 0.062, 0.32, V(side * 0.61, 1.35, 0));
    flange(detail, p, V(side * 0.61, 1.52, 0), V(0, 1, 0), 0.115, 0.035);
    const route = [
      V(side * 0.65, 0.62, 0.12),
      V(side * 0.82, 0.5, 0.22),
      V(side * 0.72, -0.02, 0.25),
      V(side * 0.3, -0.22, 0.14),
    ];
    pipe(detail, p.nickel, route, 0.041, 42);
    for (let k = 0; k < 9; k++)
      hoop(
        detail,
        p.machined,
        0.048,
        0.006,
        V(side * 0.78, 0.2 + k * 0.022, 0.23),
      );
    block(detail, p.graphite, [0.14, 0.19, 0.16], V(side * 0.76, 0.18, 0.24));
    cylinder(
      detail,
      p.titanium,
      0.065,
      0.08,
      V(side * 0.76, 0.18, 0.35),
      V(0, 0, 1),
    );
    hoop(
      detail,
      p.hotSteel,
      0.085,
      0.012,
      V(side * 0.76, 0.18, 0.4),
      V(0, 0, 1),
      24,
    );
    for (let spoke = 0; spoke < 3; spoke++) {
      const a = (spoke / 3) * Math.PI * 2;
      segment(
        detail,
        p.machined,
        V(side * 0.76, 0.18, 0.4),
        V(side * 0.76 + Math.cos(a) * 0.08, 0.18 + Math.sin(a) * 0.08, 0.4),
        0.007,
      );
    }
    for (let line = 0; line < 3; line++)
      pipe(
        detail,
        line === 0 ? p.copper : p.graphite,
        [
          V(side * (0.22 + line * 0.025), 1.45, -0.1),
          V(side * 0.43, 1.21, -0.26 - line * 0.022),
          V(side * 0.45, 0.44, -0.24 - line * 0.022),
          V(side * 0.24, 0.13, -0.1),
        ],
        0.008,
        36,
      );
  }
  flange(detail, p, V(0, 1.675, 0), V(0, 1, 0), 0.26, 0.04);
}

function orbital(root: T.Group, p: Palette) {
  const detail = new T.Group();
  detail.name = "multilayer-insulation-and-avionics";
  root.add(detail);
  // Slightly irregular blanket geometry catches broad studio reflections like MLI.
  for (let side = 0; side < 4; side++) {
    const face = new T.Group();
    face.rotation.y = (side * Math.PI) / 2;
    detail.add(face);
    const foil = new T.PlaneGeometry(0.776, 0.955, 12, 16),
      position = foil.getAttribute("position");
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i),
        y = position.getY(i);
      const wrinkle =
        Math.sin(x * 87 + y * 21 + side) * 0.0045 +
        Math.cos(y * 71 - x * 19) * 0.0035;
      position.setZ(i, wrinkle);
    }
    foil.computeVertexNormals();
    add(face, foil, p.foil, V(0, 0, 0.411));
    for (const x of [-0.38, 0.38])
      block(face, p.graphite, [0.019, 0.96, 0.009], V(x, 0, 0.422));
    for (const y of [-0.47, 0.47])
      block(face, p.graphite, [0.77, 0.018, 0.009], V(0, y, 0.422));
    for (let i = 0; i < 7; i++)
      for (const x of [-0.36, 0.36])
        fastener(face, p, V(x, (i - 3) * 0.14, 0.428), V(0, 0, 1), 0.008);
    // A stitched center seam, not a smooth featureless gold box.
    block(face, p.hotSteel, [0.013, 0.95, 0.012], V(0.17, 0, 0.426));
  }
  const panelGroups = root.children.filter(
    (child) =>
      child instanceof T.Group &&
      Math.abs(Math.abs(child.position.x) - 1.6) < 0.01,
  );
  for (const panel of panelGroups) {
    for (let x = 0; x < 8; x++)
      for (let z = 0; z < 6; z++) {
        for (const offset of [-0.038, 0.038])
          block(
            panel,
            p.nickel,
            [0.003, 0.0015, 0.177],
            V((x - 3.5) * 0.198 + offset, 0.069, (z - 2.5) * 0.211),
          );
      }
    for (const z of [-0.66, 0.66]) {
      block(panel, p.graphite, [1.66, 0.08, 0.04], V(0, -0.025, z));
      for (let i = 0; i < 10; i++)
        fastener(panel, p, V((i - 4.5) * 0.17, 0.018, z), V(0, 1, 0), 0.008);
    }
    for (const x of [-0.75, 0, 0.75])
      block(panel, p.titanium, [0.04, 0.05, 1.28], V(x, -0.065, 0));
  }
  for (const x of [-0.41, 0.41]) {
    for (let i = 0; i < 7; i++)
      block(detail, p.ceramic, [0.015, 0.075, 0.52], V(x, (i - 3) * 0.106, 0));
    cylinder(detail, p.graphite, 0.105, 0.17, V(x * 1.25, 0, 0), V(1, 0, 0));
    boltCircle(
      detail,
      p,
      V(x * 1.47, 0, 0),
      V(Math.sign(x), 0, 0),
      0.078,
      8,
      0.009,
    );
  }
  const tracker = block(
    detail,
    p.graphite,
    [0.2, 0.19, 0.21],
    V(0.23, 0.65, 0.22),
  );
  tracker.rotation.x = -0.25;
  flange(
    detail,
    p,
    V(0.23, 0.68, 0.339),
    V(0, 0.25, 1).normalize(),
    0.078,
    0.028,
    true,
  );
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    segment(
      detail,
      p.titanium,
      V(Math.cos(a) * 0.25, 1.24, Math.sin(a) * 0.25 + 0.1),
      V(0, 1.45, 0.2),
      0.009,
    );
  }
  for (const x of [-0.28, 0.28])
    pipe(
      detail,
      p.graphite,
      [V(x, 0.46, -0.38), V(x * 1.4, 0.39, -0.45), V(x * 2, 0.08, -0.37)],
      0.013,
      24,
    );
}

export function addMechanicalDetails(kind: string, root: T.Group): void {
  if (!["fusion", "quantum", "propulsion", "orbital"].includes(kind)) return;
  const p = palette();
  if (kind === "fusion") fusion(root, p);
  if (kind === "quantum") quantum(root, p);
  if (kind === "propulsion") propulsion(root, p);
  if (kind === "orbital") orbital(root, p);
  // The palette is local to this model; unused materials must not retain resources.
  const used = new Set<T.Material>();
  root.traverse((object) => {
    if (object instanceof T.Mesh)
      (Array.isArray(object.material)
        ? object.material
        : [object.material]
      ).forEach((material) => used.add(material));
  });
  Object.values(p).forEach((material) => {
    if (!used.has(material)) material.dispose();
  });
}
