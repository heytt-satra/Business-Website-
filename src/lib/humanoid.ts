import * as T from "three";
const V = (x = 0, y = 0, z = 0) => new T.Vector3(x, y, z);
function add(p: T.Object3D, g: T.BufferGeometry, m: T.Material, at = V()) {
  const o = new T.Mesh(g, m);
  o.position.copy(at);
  o.castShadow = true;
  o.receiveShadow = true;
  p.add(o);
  return o;
}
function ellipsoid(
  p: T.Object3D,
  m: T.Material,
  r: number,
  at: T.Vector3,
  scale: T.Vector3,
) {
  const o = add(p, new T.SphereGeometry(r, 32, 24), m, at);
  o.scale.copy(scale);
  return o;
}
function rod(
  p: T.Object3D,
  m: T.Material,
  a: T.Vector3,
  b: T.Vector3,
  r: number,
  r2 = r,
) {
  const o = add(
    p,
    new T.CylinderGeometry(r2, r, a.distanceTo(b), 16),
    m,
    a.clone().add(b).multiplyScalar(0.5),
  );
  o.quaternion.setFromUnitVectors(V(0, 1), b.clone().sub(a).normalize());
  return o;
}
function tube(p: T.Object3D, m: T.Material, points: T.Vector3[], r: number) {
  return add(
    p,
    new T.TubeGeometry(new T.CatmullRomCurve3(points), 32, r, 8, false),
    m,
  );
}
function armor(
  p: T.Object3D,
  m: T.Material,
  points: number[][],
  z: number,
  depth = 0.055,
) {
  const s = new T.Shape();
  points.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  const g = new T.ExtrudeGeometry(s, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.018,
    bevelThickness: 0.014,
    curveSegments: 6,
  });
  return add(p, g, m, V(0, 0, z));
}
function joint(
  p: T.Object3D,
  m: T.Material,
  at: T.Vector3,
  r: number,
  side: "x" | "z" = "z",
) {
  const g = add(p, new T.TorusGeometry(r, 0.014, 8, 40), m, at);
  if (side === "x") g.rotation.y = Math.PI / 2;
  return g;
}

export function armoredHumanoid(root: T.Group) {
  const titanium = new T.MeshPhysicalMaterial({
      color: "#8f9ba4",
      metalness: 0.97,
      roughness: 0.26,
      clearcoat: 0.32,
      clearcoatRoughness: 0.22,
    }),
    bright = new T.MeshPhysicalMaterial({
      color: "#c0c9cf",
      metalness: 0.95,
      roughness: 0.22,
      clearcoat: 0.35,
    }),
    graphite = new T.MeshStandardMaterial({
      color: "#151c22",
      metalness: 0.78,
      roughness: 0.4,
    }),
    ceramic = new T.MeshPhysicalMaterial({
      color: "#39434d",
      metalness: 0.8,
      roughness: 0.31,
    }),
    eye = new T.MeshStandardMaterial({
      color: "#3b0805",
      emissive: "#ff0b05",
      emissiveIntensity: 2,
      toneMapped: false,
      roughness: 0.25,
      metalness: 0.1,
    });
  const torso = new T.Group();
  root.add(torso);
  ellipsoid(torso, graphite, 0.5, V(0, 0.64, -0.03), V(1.04, 0.9, 0.55));
  // Curved back shell and interlocking, chamfered pectoral plates.
  ellipsoid(torso, titanium, 0.46, V(0, 0.65, -0.14), V(1.02, 0.83, 0.4));
  for (const s of [-1, 1]) {
    const side = new T.Group();
    side.scale.x = s;
    torso.add(side);
    armor(
      side,
      titanium,
      [
        [0.035, 0.81],
        [0.18, 0.98],
        [0.47, 0.91],
        [0.51, 0.69],
        [0.36, 0.46],
        [0.13, 0.48],
      ],
      0.18,
      0.055,
    );
    armor(
      side,
      bright,
      [
        [0.055, 0.84],
        [0.18, 0.91],
        [0.45, 0.86],
        [0.38, 0.8],
        [0.14, 0.75],
      ],
      0.25,
      0.025,
    );
    armor(
      side,
      ceramic,
      [
        [0.13, 0.65],
        [0.38, 0.72],
        [0.34, 0.52],
        [0.15, 0.52],
      ],
      0.26,
      0.02,
    );
    tube(
      side,
      graphite,
      [
        V(0.08, 0.75, 0.28),
        V(0.18, 0.7, 0.3),
        V(0.35, 0.72, 0.3),
        V(0.44, 0.79, 0.26),
      ],
      0.009,
    );
    tube(
      side,
      eye,
      [V(0.08, 0.75, 0.29), V(0.16, 0.71, 0.31), V(0.27, 0.72, 0.32)],
      0.005,
    );
    for (let j = 0; j < 5; j++) {
      const y = 0.08 + j * 0.082;
      const rib = armor(
        side,
        titanium,
        [
          [0.035, y + 0.06],
          [0.23 + j * 0.014, y + 0.09],
          [0.28 + j * 0.014, y + 0.04],
          [0.09, y - 0.015],
        ],
        0.145 - j * 0.012,
        0.035,
      );
      rib.rotation.y = -0.12;
    }
    tube(
      side,
      graphite,
      [V(0.3, 0.46, -0.06), V(0.27, 0.24, -0.1), V(0.22, -0.05, -0.08)],
      0.048,
    );
    for (let k = 0; k < 3; k++)
      tube(
        side,
        bright,
        [
          V(0.19 + k * 0.028, 0.4, -0.12),
          V(0.15 + k * 0.028, 0.2, -0.16),
          V(0.16 + k * 0.028, -0.02, -0.14),
        ],
        0.012,
      );
  }
  rod(torso, graphite, V(0, -0.09), V(0, 0.48), 0.15, 0.21);
  for (let i = 0; i < 6; i++) {
    const y = 0.025 + i * 0.07;
    armor(
      torso,
      ceramic,
      [
        [-0.055, y],
        [0, y + 0.045],
        [0.055, y],
        [0, y - 0.03],
      ],
      0.21,
      0.025,
    );
  }
  armor(
    root,
    graphite,
    [
      [-0.31, -0.1],
      [-0.22, -0.36],
      [0, -0.49],
      [0.22, -0.36],
      [0.31, -0.1],
      [0, -0.04],
    ],
    -0.05,
    0.28,
  );
  for (const s of [-1, 1])
    armor(
      root,
      titanium,
      [
        [s * 0.02, -0.12],
        [s * 0.29, -0.08],
        [s * 0.33, -0.25],
        [s * 0.21, -0.38],
        [s * 0.08, -0.3],
      ],
      0.19,
      0.04,
    );
  armor(
    root,
    bright,
    [
      [-0.08, -0.14],
      [0.08, -0.14],
      [0.11, -0.29],
      [0, -0.42],
      [-0.11, -0.29],
    ],
    0.23,
    0.03,
  );
  // Vertebrae, neck actuators, cable sheaths, and collar seams.
  for (let i = 0; i < 9; i++) {
    const y = 0.06 + i * 0.095;
    ellipsoid(torso, ceramic, 0.05, V(0, y, -0.32), V(1, 0.62, 0.8));
    rod(torso, bright, V(-0.12, y, -0.28), V(0.12, y, -0.28), 0.014);
  }
  rod(torso, graphite, V(0, 0.92), V(0, 1.15), 0.105);
  for (const s of [-1, 1])
    rod(
      torso,
      bright,
      V(s * 0.09, 0.95, 0.02),
      V(s * 0.065, 1.14, 0.035),
      0.026,
    );
  for (let i = 0; i < 4; i++)
    joint(torso, titanium, V(0, 1.01 + i * 0.033, 0), 0.105).rotation.x =
      Math.PI / 2;
  const head = new T.Group();
  head.position.set(0, 1.34, 0.015);
  torso.add(head);
  ellipsoid(head, graphite, 0.235, V(), V(0.85, 1.22, 0.85));
  ellipsoid(head, titanium, 0.234, V(0, 0.045, -0.045), V(0.88, 1.18, 0.77));
  armor(
    head,
    titanium,
    [
      [-0.17, 0.14],
      [-0.085, 0.27],
      [0.085, 0.27],
      [0.17, 0.14],
      [0.11, 0.07],
      [0, 0.12],
      [-0.11, 0.07],
    ],
    0.115,
    0.04,
  );
  armor(
    head,
    bright,
    [
      [-0.04, 0.22],
      [0, 0.28],
      [0.04, 0.22],
      [0.025, 0.09],
      [0, 0.06],
      [-0.025, 0.09],
    ],
    0.17,
    0.025,
  );
  for (const s of [-1, 1]) {
    armor(
      head,
      graphite,
      [
        [s * 0.025, 0.075],
        [s * 0.18, 0.1],
        [s * 0.17, -0.005],
        [s * 0.04, -0.025],
      ],
      0.185,
      0.02,
    );
    armor(
      head,
      eye,
      [
        [s * 0.035, 0.048],
        [s * 0.159, 0.07],
        [s * 0.139, 0.021],
        [s * 0.062, 0.005],
      ],
      0.212,
      0.009,
    );
    armor(
      head,
      bright,
      [
        [s * 0.045, -0.042],
        [s * 0.19, 0.013],
        [s * 0.19, -0.09],
        [s * 0.1, -0.195],
        [s * 0.055, -0.15],
      ],
      0.13,
      0.048,
    );
    armor(
      head,
      ceramic,
      [
        [s * 0.11, -0.07],
        [s * 0.18, -0.03],
        [s * 0.125, -0.16],
        [s * 0.095, -0.17],
      ],
      0.193,
      0.015,
    );
    rod(
      head,
      titanium,
      V(s * 0.21, 0.075, -0.035),
      V(s * 0.19, -0.1, -0.025),
      0.04,
    );
    joint(head, graphite, V(s * 0.219, 0.025, -0.025), 0.055, "x");
    tube(
      head,
      bright,
      [
        V(s * 0.14, 0.21, -0.08),
        V(s * 0.2, 0.13, -0.13),
        V(s * 0.2, -0.04, -0.09),
      ],
      0.012,
    );
  }
  armor(
    head,
    titanium,
    [
      [-0.032, 0.06],
      [0.032, 0.06],
      [0.055, -0.075],
      [0, -0.1],
      [-0.055, -0.075],
    ],
    0.195,
    0.018,
  );
  armor(
    head,
    graphite,
    [
      [-0.083, -0.11],
      [0.083, -0.11],
      [0.06, -0.178],
      [-0.06, -0.178],
    ],
    0.175,
    0.015,
  );
  for (let i = 0; i < 5; i++)
    rod(
      head,
      bright,
      V((i - 2) * 0.027, -0.125, 0.205),
      V((i - 2) * 0.022, -0.167, 0.208),
      0.007,
    );
  armor(
    head,
    titanium,
    [
      [-0.083, -0.19],
      [0, -0.235],
      [0.083, -0.19],
      [0.06, -0.174],
      [-0.06, -0.174],
    ],
    0.11,
    0.055,
  );
  const arms: T.Group[] = [];
  for (const s of [-1, 1]) {
    const arm = new T.Group();
    arm.position.set(s * 0.55, 0.79, 0);
    arm.rotation.z = s * 0.12;
    torso.add(arm);
    arms.push(arm);
    ellipsoid(arm, graphite, 0.19, V(), V(1.05, 1, 1));
    const cap = add(
      arm,
      new T.SphereGeometry(0.235, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.64),
      titanium,
    );
    cap.rotation.z = -s * 0.23;
    cap.scale.z = 0.84;
    for (let j = 0; j < 3; j++) {
      const band = joint(
        arm,
        ceramic,
        V(0, 0.025 - j * 0.036, 0.04),
        0.2 - j * 0.011,
      );
      band.rotation.x = 0.65;
    }
    joint(arm, bright, V(s * 0.2, 0, 0), 0.12, "x");
    rod(arm, graphite, V(0, -0.07), V(s * 0.045, -0.5), 0.115, 0.15);
    const upper = ellipsoid(
      arm,
      titanium,
      0.15,
      V(s * 0.025, -0.28, 0.015),
      V(0.92, 1.6, 0.9),
    );
    upper.rotation.z = s * 0.09;
    armor(
      arm,
      bright,
      [
        [-0.075, -0.12],
        [0.07, -0.1],
        [0.1, -0.31],
        [0.03, -0.43],
        [-0.07, -0.35],
      ],
      0.105,
      0.035,
    );
    tube(
      arm,
      graphite,
      [
        V(-s * 0.09, -0.12, -0.02),
        V(-s * 0.135, -0.31, -0.08),
        V(-s * 0.11, -0.47, -0.06),
      ],
      0.024,
    );
    rod(
      arm,
      bright,
      V(s * 0.1, -0.16, -0.07),
      V(s * 0.09, -0.48, -0.08),
      0.024,
    );
    ellipsoid(arm, graphite, 0.12, V(s * 0.04, -0.52), V(1, 1, 1));
    joint(arm, titanium, V(s * 0.04, -0.52, 0.12), 0.087);
    joint(arm, bright, V(s * 0.04, -0.52, 0.127), 0.055);
    rod(arm, graphite, V(s * 0.04, -0.54), V(0, -1.02), 0.075, 0.105);
    armor(
      arm,
      titanium,
      [
        [-0.105, -0.59],
        [0.11, -0.58],
        [0.14, -0.72],
        [0.065, -1.01],
        [-0.065, -1.01],
        [-0.13, -0.74],
      ],
      0.04,
      0.095,
    );
    armor(
      arm,
      ceramic,
      [
        [-0.04, -0.64],
        [0.055, -0.62],
        [0.075, -0.77],
        [0.025, -0.96],
        [-0.02, -0.94],
      ],
      0.15,
      0.012,
    );
    for (let k = 0; k < 4; k++)
      rod(
        arm,
        bright,
        V(-0.1, -0.65 - k * 0.07, 0.155),
        V(-0.045, -0.68 - k * 0.07, 0.16),
        0.007,
      );
    rod(
      arm,
      bright,
      V(-s * 0.085, -0.59, -0.06),
      V(-s * 0.06, -0.97, -0.05),
      0.018,
    );
    ellipsoid(arm, graphite, 0.072, V(0, -1.045, 0.015), V(1, 1, 1));
    armor(
      arm,
      titanium,
      [
        [-0.08, -1.08],
        [0.075, -1.08],
        [0.085, -1.22],
        [0.04, -1.27],
        [-0.08, -1.23],
      ],
      0.025,
      0.055,
    );
    for (let f = 0; f < 4; f++) {
      const x = (f - 1.5) * 0.041,
        l = 0.11 - Math.abs(f - 1.4) * 0.015;
      ellipsoid(arm, graphite, 0.022, V(x, -1.24, 0.05), V(1, 1, 1));
      rod(
        arm,
        bright,
        V(x, -1.25, 0.045),
        V(x, -1.25 - l, 0.065),
        0.017,
        0.019,
      );
      ellipsoid(arm, graphite, 0.019, V(x, -1.26 - l, 0.065), V(1, 1, 1));
      rod(arm, titanium, V(x, -1.27 - l, 0.065), V(x, -1.32 - l, 0.1), 0.014);
      rod(
        arm,
        bright,
        V(x - 0.008, -1.11, 0.087),
        V(x - 0.008, -1.22, 0.09),
        0.007,
      );
    }
    rod(
      arm,
      titanium,
      V(-s * 0.08, -1.12, 0.04),
      V(-s * 0.13, -1.2, 0.09),
      0.024,
    );
    rod(
      arm,
      bright,
      V(-s * 0.13, -1.2, 0.09),
      V(-s * 0.12, -1.27, 0.12),
      0.018,
    );
    // Human proportions, armored thighs, exposed knee bearings, and hydraulic ankles.
    const leg = new T.Group();
    leg.position.x = s * 0.215;
    leg.rotation.z = -s * 0.025;
    root.add(leg);
    ellipsoid(leg, graphite, 0.15, V(0, -0.39), V(1, 1, 1));
    rod(leg, graphite, V(0, -0.4), V(s * 0.02, -0.94), 0.105, 0.16);
    ellipsoid(leg, titanium, 0.166, V(0, -0.64), V(1, 1.63, 0.83));
    armor(
      leg,
      bright,
      [
        [-0.115, -0.42],
        [0.105, -0.42],
        [0.13, -0.62],
        [0.07, -0.85],
        [0, -0.9],
        [-0.085, -0.81],
        [-0.14, -0.6],
      ],
      0.09,
      0.055,
    );
    armor(
      leg,
      ceramic,
      [
        [-0.025, -0.48],
        [0.07, -0.48],
        [0.065, -0.67],
        [0.015, -0.83],
        [-0.035, -0.73],
      ],
      0.155,
      0.015,
    );
    rod(
      leg,
      bright,
      V(-s * 0.11, -0.4, -0.09),
      V(-s * 0.1, -0.88, -0.07),
      0.024,
    );
    ellipsoid(leg, graphite, 0.125, V(0, -0.98), V(1, 1, 1));
    joint(leg, bright, V(0, -0.98, 0.12), 0.081);
    armor(
      leg,
      titanium,
      [
        [-0.1, -0.94],
        [0, -0.885],
        [0.1, -0.94],
        [0.09, -1.06],
        [0, -1.105],
        [-0.09, -1.06],
      ],
      0.14,
      0.04,
    );
    rod(leg, graphite, V(0, -1.09), V(0, -1.57), 0.072, 0.11);
    armor(
      leg,
      titanium,
      [
        [-0.095, -1.08],
        [0.1, -1.08],
        [0.125, -1.2],
        [0.065, -1.57],
        [-0.06, -1.57],
        [-0.11, -1.2],
      ],
      0.005,
      0.13,
    );
    armor(
      leg,
      bright,
      [
        [-0.02, -1.12],
        [0.07, -1.14],
        [0.045, -1.51],
        [0, -1.57],
        [-0.035, -1.4],
      ],
      0.135,
      0.025,
    );
    rod(
      leg,
      bright,
      V(-s * 0.085, -1.1, -0.065),
      V(-s * 0.065, -1.57, -0.05),
      0.026,
    );
    tube(
      leg,
      graphite,
      [
        V(s * 0.075, -1.12, -0.07),
        V(s * 0.11, -1.3, -0.12),
        V(s * 0.06, -1.57, -0.1),
      ],
      0.025,
    );
    ellipsoid(leg, graphite, 0.08, V(0, -1.61), V(1, 1, 1));
    ellipsoid(leg, titanium, 0.15, V(0, -1.7, 0.09), V(0.82, 0.54, 1.57));
    armor(
      leg,
      ceramic,
      [
        [-0.1, -1.75],
        [0.1, -1.75],
        [0.11, -1.79],
        [-0.11, -1.79],
      ],
      -0.07,
      0.37,
    );
    for (let k = 0; k < 3; k++)
      rod(
        leg,
        graphite,
        V(-0.095, -1.68, 0.18 + k * 0.035),
        V(0.095, -1.68, 0.18 + k * 0.035),
        0.007,
      );
  }
  // Fastener heads are small enough to read as construction detail, rather than decoration.
  for (const s of [-1, 1])
    for (const [x, y, z] of [
      [0.42, 0.82, 0.29],
      [0.15, 0.51, 0.29],
      [0.23, -0.18, 0.26],
    ])
      ellipsoid(root, graphite, 0.015, V(s * x, y, z), V(1, 1, 0.5));
  root.rotation.y = -0.24;
  root.position.y = 0.06;
  root.scale.setScalar(0.94);
  return (time: number) => {
    head.rotation.y = Math.sin(time * 0.2) * 0.085;
    head.rotation.x = Math.sin(time * 0.16) * 0.025;
    arms.forEach((a, i) => {
      a.rotation.x = Math.sin(time * 0.3 + i * 0.7) * 0.025;
    });
    eye.emissiveIntensity = 1.9 + Math.sin(time * 0.9) * 0.15;
  };
}
