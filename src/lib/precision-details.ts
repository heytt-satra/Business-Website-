import * as T from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// Small-scale construction details. These remain illustrative engineering assets,
// not CAD specifications or atomically accurate molecular structures.
const v = (x: number, y: number, z: number) => new T.Vector3(x, y, z);
function material(color: string, roughness = 0.32, metalness = 0.88) {
  return new T.MeshPhysicalMaterial({
    color,
    roughness,
    metalness,
    clearcoat: 0.16,
    clearcoatRoughness: 0.3,
  });
}
function add(
  parent: T.Object3D,
  geometry: T.BufferGeometry,
  mat: T.Material,
  x = 0,
  y = 0,
  z = 0,
) {
  const mesh = new T.Mesh(geometry, mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function block(
  p: T.Object3D,
  mat: T.Material,
  w: number,
  h: number,
  d: number,
  x = 0,
  y = 0,
  z = 0,
) {
  const minimum = Math.min(w, h, d);
  // Sub-pixel grille openings and traces need no bevel tessellation.
  const geometry =
    minimum <= 0.015
      ? new T.BoxGeometry(w, h, d)
      : new RoundedBoxGeometry(w, h, d, 1, minimum * 0.08);
  return add(p, geometry, mat, x, y, z);
}
function rod(
  p: T.Object3D,
  mat: T.Material,
  a: T.Vector3,
  b: T.Vector3,
  r: number,
  segments = 10,
) {
  const mesh = add(
    p,
    new T.CylinderGeometry(r, r, a.distanceTo(b), segments),
    mat,
  );
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(v(0, 1, 0), b.clone().sub(a).normalize());
  return mesh;
}
function tube(
  p: T.Object3D,
  mat: T.Material,
  points: T.Vector3[],
  r: number,
  segments = 40,
) {
  return add(
    p,
    new T.TubeGeometry(new T.CatmullRomCurve3(points), segments, r, 6, false),
    mat,
  );
}
function disc(
  p: T.Object3D,
  mat: T.Material,
  r: number,
  depth: number,
  x: number,
  y: number,
  z: number,
  axis: "y" | "z" = "z",
  sides = 24,
) {
  const m = add(p, new T.CylinderGeometry(r, r, depth, sides), mat, x, y, z);
  if (axis === "z") m.rotation.x = Math.PI / 2;
  return m;
}
function bolt(
  p: T.Object3D,
  steel: T.Material,
  inset: T.Material,
  x: number,
  y: number,
  z: number,
  radius = 0.026,
  axis: "y" | "z" = "z",
) {
  disc(p, steel, radius * 1.38, radius * 0.25, x, y, z, axis);
  disc(
    p,
    steel,
    radius,
    radius * 0.64,
    x,
    y + (axis === "y" ? radius * 0.32 : 0),
    z + (axis === "z" ? radius * 0.32 : 0),
    axis,
    6,
  );
  disc(
    p,
    inset,
    radius * 0.42,
    radius * 0.06,
    x,
    y + (axis === "y" ? radius * 0.66 : 0),
    z + (axis === "z" ? radius * 0.66 : 0),
    axis,
    6,
  );
}
function removeMatching(root: T.Group, predicate: (mesh: T.Mesh) => boolean) {
  for (const child of [...root.children]) {
    if (!(child instanceof T.Mesh) || !predicate(child)) continue;
    root.remove(child);
    child.geometry.dispose();
  }
}

function etchedDie(): T.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1024;
  const c = canvas.getContext("2d")!;
  c.fillStyle = "#252e37";
  c.fillRect(0, 0, 1024, 1024);
  // Repeated logic tiles, cache banks, and routing channels at several scales.
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 4; col++) {
      const x = 28 + col * 246,
        y = 28 + row * 246;
      c.fillStyle = (row + col) % 2 ? "#53636a" : "#6b7472";
      c.fillRect(x, y, 226, 226);
      c.fillStyle = "#37454e";
      c.fillRect(x + 5, y + 5, 145, 211);
      for (let k = 0; k < 22; k++) {
        c.fillStyle = k % 3 ? "#97a29f" : "#667673";
        c.fillRect(x + 10, y + 9 + k * 9, 135, 2);
        c.fillRect(x + 155, y + 8 + k * 9, 64, 4);
      }
      for (let k = 0; k < 12; k++) {
        c.fillStyle = "#24333c";
        c.fillRect(x + 11 + k * 11, y + 8, 2, 207);
      }
    }
  c.strokeStyle = "#bea77c";
  c.lineWidth = 1;
  for (let j = 0; j < 20; j++) {
    const a = 9 + j * 2;
    c.strokeRect(a, a, 1024 - a * 2, 1024 - a * 2);
  }
  // Deliberately no invented technical labels or fake component markings.
  const texture = new T.CanvasTexture(canvas);
  texture.colorSpace = T.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function silicon(root: T.Group) {
  const nickel = material("#7c858a", 0.26),
    gold = material("#aa8d58", 0.3),
    ceramic = material("#272f35", 0.52, 0.15),
    solder = material("#b5bdc1", 0.22);
  // Replace the original checkerboard with a single etched logic die.
  removeMatching(root, (mesh) => Math.abs(mesh.position.y - 0.177) < 0.001);
  const map = etchedDie();
  const die = new T.MeshPhysicalMaterial({
    color: "#b2c0c3",
    map,
    metalness: 0.88,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.13,
    iridescence: 0.24,
    iridescenceIOR: 1.45,
    iridescenceThicknessMinimum: 180,
    iridescenceThicknessMaximum: 310,
  });
  block(root, die, 1.42, 0.016, 1.42, 0, 0.178);
  for (let side = 0; side < 4; side++) {
    const edge = new T.Group();
    edge.rotation.y = (side * Math.PI) / 2;
    root.add(edge);
    // Bond pads and gently arched lead wires expose package construction.
    for (let i = 0; i < 30; i++) {
      const x = (i - 14.5) * 0.043;
      block(edge, gold, 0.024, 0.009, 0.048, x, 0.195, 0.668);
      block(edge, gold, 0.026, 0.009, 0.055, x, 0.12, 0.848);
      tube(
        edge,
        gold,
        [
          v(x, 0.2, 0.674),
          v(x, 0.265, 0.72),
          v(x, 0.232, 0.8),
          v(x, 0.127, 0.85),
        ],
        0.0035,
        12,
      );
    }
    for (let i = 0; i < 11; i++) {
      const x = (i - 5) * 0.17;
      block(edge, ceramic, 0.09, 0.055, 0.048, x, 0.035, 1.06);
      for (const sign of [-1, 1])
        block(edge, solder, 0.019, 0.06, 0.051, x + sign * 0.042, 0.035, 1.06);
      // Thin routed tracks are physical raised copper, not decorative wires.
      block(edge, gold, 0.007, 0.004, 0.13, x, -0.014, 0.963);
    }
    for (let i = 0; i < 18; i++) {
      const x = (i - 8.5) * 0.117;
      block(edge, nickel, 0.022, 0.027, 0.05, x, -0.225, 1.28);
    }
  }
  for (const x of [-1.09, 1.09])
    for (const z of [-1.09, 1.09]) {
      disc(root, gold, 0.036, 0.003, x, -0.013, z, "y");
      disc(root, ceramic, 0.016, 0.005, x, -0.008, z, "y");
    }
  const alignment = add(
    root,
    new T.ConeGeometry(0.058, 0.008, 3),
    nickel,
    -1.13,
    -0.012,
    -0.98,
  );
  alignment.rotation.y = Math.PI / 4;
}

function bio(root: T.Group) {
  const carbon = material("#b9c3bd", 0.36, 0.27),
    nitrogen = material("#718b9c", 0.33, 0.34),
    oxygen = material("#a76466", 0.39, 0.27),
    phosphorus = material("#ad9375", 0.34, 0.48),
    bond = material("#a6b5b1", 0.42, 0.24);
  removeMatching(
    root,
    (mesh) =>
      mesh.geometry.type === "CylinderGeometry" &&
      Math.abs(
        (mesh.geometry as T.CylinderGeometry).parameters.radiusTop - 0.027,
      ) < 0.001,
  );
  removeMatching(
    root,
    (mesh) =>
      mesh.geometry.type === "SphereGeometry" &&
      Math.abs((mesh.geometry as T.SphereGeometry).parameters.radius - 0.052) <
        0.001,
  );
  const atom = (point: T.Vector3, mat: T.Material, radius = 0.032) =>
    add(
      root,
      new T.SphereGeometry(radius, 12, 8),
      mat,
      point.x,
      point.y,
      point.z,
    );
  // Chemically inspired base/sugar rings communicate molecular construction.
  // Element positions are compositional, not a molecular-coordinate dataset.
  for (let step = 0; step <= 44; step += 2) {
    const y = (step / 44 - 0.5) * 3.4,
      angle = step * 0.28;
    const radial = v(Math.cos(angle), 0, Math.sin(angle)),
      tangential = v(-Math.sin(angle), 0, Math.cos(angle));
    const position = (r: number, t: number, dy = 0) =>
      radial
        .clone()
        .multiplyScalar(r)
        .addScaledVector(tangential, t)
        .add(v(0, y + dy, 0));
    for (const sign of [-1, 1]) {
      const n = (step / 2 + (sign > 0 ? 1 : 0)) % 2 ? 6 : 5;
      const points: T.Vector3[] = [];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const p = position(
          sign * (0.265 + Math.cos(a) * 0.117),
          Math.sin(a) * 0.117,
        );
        points.push(p);
        atom(p, i % 3 === 0 ? nitrogen : carbon);
      }
      for (let i = 0; i < n; i++)
        rod(root, bond, points[i], points[(i + 1) % n], 0.011, 8);
      rod(
        root,
        bond,
        position(sign * 0.38, 0),
        position(sign * 0.55, 0),
        0.014,
      );
      const sugar: T.Vector3[] = [];
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const p = position(
          sign * (0.55 + Math.cos(a) * 0.07),
          Math.sin(a) * 0.07,
          Math.sin(a) * 0.038,
        );
        sugar.push(p);
        atom(p, i === 1 ? oxygen : carbon, 0.027);
      }
      for (let i = 0; i < 5; i++)
        rod(root, bond, sugar[i], sugar[(i + 1) % 5], 0.009, 8);
      const phosphate = position(sign * 0.66, 0.02, 0.035);
      atom(phosphate, phosphorus, 0.04);
      const ox = position(sign * 0.71, 0.07, 0.07);
      atom(ox, oxygen, 0.026);
      rod(root, bond, phosphate, ox, 0.01);
      const side = position(sign * 0.29, 0.185);
      atom(side, oxygen, 0.028);
      rod(root, bond, position(sign * 0.28, 0.11), side, 0.01);
    }
    for (const t of [-0.045, 0.045])
      for (let j = 0; j < 3; j++) {
        rod(
          root,
          bond,
          position(-0.11 + j * 0.08, t),
          position(-0.065 + j * 0.08, t),
          0.006,
          6,
        );
      }
  }
}

function materials(root: T.Group) {
  const titanium = material("#7d8c92", 0.29),
    inset = material("#20282d", 0.5, 0.2),
    ceramic = material("#c0c7c6", 0.35, 0.18),
    accent = material("#958a76", 0.28);
  // Precision specimen mount, layered ceramic carrier, and four corner clamps.
  block(root, inset, 2.12, 0.1, 2.12, 0, -1.065, 0);
  block(root, titanium, 2.07, 0.025, 2.07, 0, -1.001, 0);
  block(root, ceramic, 1.96, 0.025, 1.96, 0, -0.975, 0);
  for (const x of [-0.91, 0.91])
    for (const z of [-0.91, 0.91]) {
      block(root, titanium, 0.25, 0.065, 0.17, x, -0.926, z);
      bolt(root, accent, inset, x, -0.888, z, 0.03, "y");
    }
  for (let i = 0; i < 22; i++) {
    const x = (i - 10.5) * 0.088;
    block(
      root,
      inset,
      0.007,
      0.003,
      i % 5 === 0 ? 0.08 : 0.04,
      x,
      -0.958,
      0.93,
    );
  }
  // Additional tetrahedral cell struts make the specimen a manufactured lattice.
  for (let x = 0; x < 2; x++)
    for (let y = 0; y < 2; y++)
      for (let z = 0; z < 2; z++) {
        const center = v((x - 0.5) * 0.85, (y - 0.5) * 0.85, (z - 0.5) * 0.85);
        for (const signs of [
          [-1, -1, -1],
          [-1, 1, 1],
          [1, -1, 1],
          [1, 1, -1],
        ]) {
          const end = center
            .clone()
            .add(v(signs[0] * 0.425, signs[1] * 0.425, signs[2] * 0.425));
          rod(root, titanium, center, end, 0.015, 8);
        }
        add(
          root,
          new T.IcosahedronGeometry(0.065, 1),
          accent,
          center.x,
          center.y,
          center.z,
        );
      }
  for (const child of root.children)
    if (
      child instanceof T.Mesh &&
      child.geometry.type === "OctahedronGeometry"
    ) {
      const previous = Array.isArray(child.material)
        ? child.material
        : [child.material];
      previous.forEach((mat) => mat.dispose());
      child.material = new T.MeshPhysicalMaterial({
        color: "#c0dbd5",
        roughness: 0.075,
        metalness: 0.05,
        transmission: 0.84,
        thickness: 0.9,
        ior: 1.9,
        attenuationDistance: 2,
        attenuationColor: "#7aa69c",
        clearcoat: 1,
      });
    }
}

// Airfoil section swept along a gently twisted radial span. Both faces and the
// narrow leading/trailing edges are closed so the rotor reads as machined metal.
export function addPrecisionDetails(kind: string, root: T.Group): void {
  if (kind === "silicon") silicon(root);
  else if (kind === "bio") bio(root);
  else if (kind === "materials") materials(root);
}
