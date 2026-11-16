import * as T from "three";
const V = (x = 0, y = 0, z = 0) => new T.Vector3(x, y, z);
type Section = [number, number, number, number?];

// Cross-section sculpting, rather than a collection of exposed mechanical joints.
// Each profile describes height, half width, half depth and forward displacement.
function sculpt(
  parent: T.Object3D,
  material: T.Material,
  sections: Section[],
  at = V(),
) {
  const profile = new T.CatmullRomCurve3(
    sections.map(([y, w, d]) => V(w, y, d)),
    false,
    "centripetal",
  );
  const offsets = new T.CatmullRomCurve3(
    sections.map(([y, , , z = 0]) => V(z, y, 0)),
    false,
    "centripetal",
  );
  const positions: number[] = [],
    uv: number[] = [],
    indices: number[] = [];
  const rows = 80,
    sides = 64;
  for (let j = 0; j <= rows; j++) {
    const p = profile.getPoint(j / rows),
      o = offsets.getPoint(j / rows);
    for (let k = 0; k <= sides; k++) {
      const a = (k / sides) * Math.PI * 2;
      positions.push(
        Math.sin(a) * Math.max(0.001, p.x),
        p.y,
        Math.cos(a) * Math.max(0.001, p.z) + o.x,
      );
      uv.push(k / sides, j / rows);
      if (j < rows && k < sides) {
        const n = j * (sides + 1) + k;
        indices.push(
          n,
          n + 1,
          n + sides + 1,
          n + 1,
          n + sides + 2,
          n + sides + 1,
        );
      }
    }
  }
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return add(parent, g, material, at);
}
function add(p: T.Object3D, g: T.BufferGeometry, m: T.Material, at = V()) {
  const o = new T.Mesh(g, m);
  o.position.copy(at);
  o.castShadow = true;
  o.receiveShadow = true;
  p.add(o);
  return o;
}
function path(p: T.Object3D, m: T.Material, points: T.Vector3[], r = 0.006) {
  return add(
    p,
    new T.TubeGeometry(new T.CatmullRomCurve3(points), 40, r, 8, false),
    m,
  );
}
function oval(p: T.Object3D, m: T.Material, at: T.Vector3, size: T.Vector3) {
  const o = add(p, new T.SphereGeometry(1, 48, 32), m, at);
  o.scale.copy(size);
  return o;
}

export function armoredHumanoid(root: T.Group) {
  const pearl = new T.MeshPhysicalMaterial({
    color: "#cbd0d0",
    metalness: 0.28,
    roughness: 0.36,
    clearcoat: 0.45,
    clearcoatRoughness: 0.18,
  });
  const titanium = new T.MeshPhysicalMaterial({
    color: "#78838d",
    metalness: 0.96,
    roughness: 0.26,
    clearcoat: 0.25,
  });
  const edge = new T.MeshPhysicalMaterial({
    color: "#adb8c0",
    metalness: 0.98,
    roughness: 0.18,
  });
  const black = new T.MeshPhysicalMaterial({
    color: "#080d12",
    metalness: 0.72,
    roughness: 0.17,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });
  const seam = new T.MeshStandardMaterial({
    color: "#25313c",
    metalness: 0.65,
    roughness: 0.48,
  });
  const optic = new T.MeshBasicMaterial({
    color: new T.Color("#ef6549").multiplyScalar(1.7),
    toneMapped: false,
  });
  const body = new T.Group();
  root.add(body);
  // A single closed torso shell with human clavicles, chest, waist and pelvis.
  sculpt(body, pearl, [
    [-0.37, 0.02, 0.02],
    [-0.3, 0.27, 0.17],
    [-0.13, 0.3, 0.19],
    [0.06, 0.255, 0.18],
    [0.28, 0.285, 0.205],
    [0.53, 0.405, 0.24],
    [0.76, 0.46, 0.225],
    [0.88, 0.39, 0.19],
    [0.96, 0.19, 0.12],
    [0.98, 0.02, 0.02],
  ]);
  sculpt(body, titanium, [
    [0.87, 0.1, 0.095],
    [1.02, 0.115, 0.1],
    [1.15, 0.09, 0.08],
  ]);
  for (const s of [-1, 1]) {
    // Broad, low-profile breastplate follows the chest instead of bulging outward.
    const shape = new T.Shape();
    [
      [0.028, 0.82],
      [0.2, 0.86],
      [0.4, 0.78],
      [0.38, 0.6],
      [0.24, 0.52],
      [0.035, 0.55],
    ].forEach(([x, y], i) =>
      i ? shape.lineTo(s * x, y) : shape.moveTo(s * x, y),
    );
    shape.closePath();
    const plate = new T.ExtrudeGeometry(shape, {
      depth: 0.008,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.007,
      bevelThickness: 0.004,
    });
    const attribute = plate.getAttribute("position");
    for (let i = 0; i < attribute.count; i++) {
      const x = attribute.getX(i),
        y = attribute.getY(i);
      const depth = 0.24 - Math.max(0, y - 0.53) * 0.18;
      const width =
        0.405 +
        Math.min(0.23, Math.max(0, y - 0.53)) * 0.24 -
        Math.max(0, y - 0.76) * 0.58;
      attribute.setZ(
        i,
        attribute.getZ(i) +
          depth * Math.sqrt(Math.max(0.01, 1 - (x / width) ** 2)) +
          0.008,
      );
    }
    plate.computeVertexNormals();
    add(body, plate, pearl);
    path(
      body,
      seam,
      [
        V(s * 0.06, 0.85, 0.209),
        V(s * 0.22, 0.88, 0.192),
        V(s * 0.4, 0.81, 0.161),
      ],
      0.004,
    );
    path(
      body,
      titanium,
      [
        V(s * 0.04, 0.52, 0.244),
        V(s * 0.23, 0.48, 0.203),
        V(s * 0.37, 0.55, 0.153),
      ],
      0.005,
    );
    path(
      body,
      seam,
      [
        V(s * 0.24, 0.35, 0.14),
        V(s * 0.215, 0.14, 0.16),
        V(s * 0.24, -0.1, 0.17),
      ],
      0.004,
    );
    path(
      body,
      edge,
      [
        V(s * 0.33, 0.48, -0.17),
        V(s * 0.28, 0.16, -0.16),
        V(s * 0.27, -0.08, -0.14),
      ],
      0.004,
    );
  }
  // Inset sternum emblem and uninterrupted abdominal armor, no exposed ribs.
  oval(body, black, V(0, 0.685, 0.245), V(0.036, 0.1, 0.012));
  path(body, optic, [V(0, 0.73, 0.258), V(0, 0.65, 0.26)], 0.004);
  for (let i = 0; i < 3; i++)
    path(
      body,
      titanium,
      [
        V(-0.15, 0.34 - i * 0.105, 0.177),
        V(0, 0.31 - i * 0.105, 0.208),
        V(0.15, 0.34 - i * 0.105, 0.177),
      ],
      0.003,
    );

  const head = new T.Group();
  head.position.set(0, 1.22, 0);
  body.add(head);
  sculpt(head, titanium, [
    [-0.18, 0.015, 0.02],
    [-0.15, 0.12, 0.11, 0.02],
    [-0.05, 0.165, 0.145],
    [0.12, 0.173, 0.154],
    [0.25, 0.15, 0.135],
    [0.31, 0.085, 0.08],
    [0.325, 0.001, 0.001],
  ]);
  // Seamless smoked faceplate, framed by silver cheekbones and a defined jaw.
  const face = add(
    head,
    new T.SphereGeometry(1, 64, 48, Math.PI * 0.06, Math.PI * 0.88, 0.35, 2.32),
    black,
    V(0, 0.07, 0.037),
  );
  face.scale.set(0.153, 0.213, 0.137);
  for (const s of [-1, 1]) {
    path(
      head,
      edge,
      [
        V(s * 0.137, 0.17, 0.102),
        V(s * 0.112, 0.19, 0.147),
        V(s * 0.035, 0.163, 0.17),
      ],
      0.015,
    );
    path(
      head,
      optic,
      [
        V(s * 0.025, 0.136, 0.17),
        V(s * 0.065, 0.137, 0.168),
        V(s * 0.109, 0.152, 0.144),
      ],
      0.005,
    );
    path(
      head,
      titanium,
      [
        V(s * 0.146, 0.07, 0.1),
        V(s * 0.127, -0.015, 0.133),
        V(s * 0.081, -0.095, 0.142),
        V(s * 0.025, -0.132, 0.129),
      ],
      0.018,
    );
    path(
      head,
      seam,
      [
        V(s * 0.147, 0.07, -0.065),
        V(s * 0.16, 0.17, -0.035),
        V(s * 0.13, 0.25, -0.026),
      ],
      0.004,
    );
    oval(head, black, V(s * 0.166, 0.055, -0.005), V(0.012, 0.047, 0.039));
    for (let i = 0; i < 4; i++)
      path(
        head,
        edge,
        [
          V(s * (0.04 + i * 0.018), -0.094, 0.139 - i * 0.005),
          V(s * (0.035 + i * 0.018), -0.113, 0.133 - i * 0.005),
        ],
        0.0025,
      );
  }
  path(
    head,
    edge,
    [V(-0.06, -0.138, 0.102), V(0, -0.16, 0.121), V(0.06, -0.138, 0.102)],
    0.012,
  );
  const arms: T.Group[] = [];
  for (const s of [-1, 1]) {
    const arm = new T.Group();
    arm.position.set(s * 0.49, 0.77, 0);
    arm.rotation.z = s * 0.055;
    body.add(arm);
    arms.push(arm);
    sculpt(arm, pearl, [
      [-0.99, 0.069, 0.069],
      [-0.88, 0.08, 0.085],
      [-0.69, 0.125, 0.125],
      [-0.54, 0.13, 0.125],
      [-0.41, 0.125, 0.119],
      [-0.25, 0.149, 0.145],
      [-0.08, 0.18, 0.166],
      [0.08, 0.17, 0.154],
      [0.16, 0.08, 0.08],
      [0.18, 0.001, 0.001],
    ]);
    path(
      arm,
      seam,
      [
        V(s * 0.09, 0.07, 0.13),
        V(s * 0.14, -0.05, 0.12),
        V(s * 0.13, -0.18, 0.1),
      ],
      0.004,
    );
    path(
      arm,
      titanium,
      [V(-0.085, -0.6, 0.1), V(-0.07, -0.79, 0.085), V(-0.025, -0.94, 0.073)],
      0.004,
    );
    // The elbow is an unbroken exterior, not a spherical bearing or hinge.
    oval(arm, titanium, V(0, -0.48, -0.105), V(0.093, 0.12, 0.037));
    sculpt(arm, black, [
      [-1.055, 0.07, 0.065],
      [-1.025, 0.073, 0.067],
      [-0.98, 0.073, 0.07],
    ]);
    sculpt(
      arm,
      pearl,
      [
        [-1.23, 0.06, 0.044],
        [-1.16, 0.081, 0.052],
        [-1.06, 0.074, 0.051],
      ],
      V(0, 0, 0.015),
    );
    for (let f = 0; f < 4; f++) {
      const x = (f - 1.5) * 0.039,
        l = 0.15 - Math.abs(f - 1.3) * 0.022;
      path(
        arm,
        pearl,
        [
          V(x, -1.205, 0.015),
          V(x, -1.26, 0.015),
          V(x, -1.27 - l * 0.5, 0.035),
          V(x, -1.25 - l, 0.071),
        ],
        0.019,
      );
      path(arm, titanium, [V(x, -1.1, 0.066), V(x, -1.19, 0.065)], 0.003);
    }
    path(
      arm,
      pearl,
      [
        V(-s * 0.065, -1.12, 0.025),
        V(-s * 0.11, -1.18, 0.04),
        V(-s * 0.116, -1.24, 0.08),
      ],
      0.025,
    );
    const leg = new T.Group();
    leg.position.set(s * 0.18, -0.27, 0);
    leg.scale.y = 1.1;
    leg.rotation.z = -s * 0.017;
    root.add(leg);
    sculpt(leg, pearl, [
      [-1.32, 0.068, 0.075],
      [-1.2, 0.082, 0.08],
      [-1.0, 0.12, 0.12],
      [-0.84, 0.135, 0.125],
      [-0.69, 0.13, 0.12],
      [-0.56, 0.14, 0.13],
      [-0.35, 0.174, 0.157],
      [-0.12, 0.18, 0.17],
      [0.03, 0.13, 0.14],
      [0.09, 0.001, 0.001],
    ]);
    // Floating kneecap is flush with a continuous, fully enclosed leg surface.
    oval(leg, pearl, V(0, -0.66, 0.099), V(0.1, 0.13, 0.035));
    path(
      leg,
      seam,
      [
        V(s * 0.1, -0.16, 0.14),
        V(s * 0.13, -0.34, 0.115),
        V(s * 0.09, -0.51, 0.11),
      ],
      0.004,
    );
    path(
      leg,
      titanium,
      [
        V(-s * 0.07, -0.81, 0.113),
        V(-s * 0.055, -1.07, 0.09),
        V(-s * 0.03, -1.24, 0.08),
      ],
      0.005,
    );
    const foot = oval(leg, pearl, V(0, -1.35, 0.084), V(0.105, 0.09, 0.21));
    foot.rotation.x = 0.03;
    oval(leg, black, V(0, -1.405, 0.08), V(0.105, 0.026, 0.2));
    path(
      leg,
      seam,
      [V(-0.08, -1.34, 0.205), V(0, -1.32, 0.25), V(0.08, -1.34, 0.205)],
      0.004,
    );
  }
  root.rotation.y = -0.2;
  root.scale.setScalar(1.03);
  return (time: number) => {
    head.rotation.y = Math.sin(time * 0.21) * 0.065;
    arms.forEach(
      (a, i) => (a.rotation.x = Math.sin(time * 0.28 + i * 0.7) * 0.018),
    );
    body.position.y = Math.sin(time * 0.7) * 0.004;
  };
}
