import * as T from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// Sculptural concept assemblies. Surface finishes and static batching are applied by models.ts.
const V = (x = 0, y = 0, z = 0) => new T.Vector3(x, y, z);
function palette() {
  return {
    shell: new T.MeshPhysicalMaterial({
      color: "#bac2c7",
      metalness: 0.86,
      roughness: 0.3,
      clearcoat: 0.25,
    }),
    gold: new T.MeshPhysicalMaterial({
      color: "#a58a58",
      metalness: 0.96,
      roughness: 0.32,
    }),
    dark: new T.MeshStandardMaterial({
      color: "#11171e",
      metalness: 0.75,
      roughness: 0.4,
    }),
    ceramic: new T.MeshPhysicalMaterial({
      color: "#c7ccd0",
      metalness: 0.3,
      roughness: 0.32,
    }),
    light: new T.MeshStandardMaterial({
      color: "#c3e2eb",
      emissive: "#6bb5d0",
      emissiveIntensity: 1.5,
      metalness: 0.3,
      roughness: 0.24,
    }),
  };
}
function part(
  p: T.Object3D,
  g: T.BufferGeometry,
  m: T.Material,
  x = 0,
  y = 0,
  z = 0,
) {
  const o = new T.Mesh(g, m);
  o.position.set(x, y, z);
  o.castShadow = true;
  o.receiveShadow = true;
  p.add(o);
  return o;
}
function box(
  p: T.Object3D,
  m: T.Material,
  w: number,
  h: number,
  d: number,
  x = 0,
  y = 0,
  z = 0,
) {
  return part(
    p,
    new RoundedBoxGeometry(w, h, d, 2, Math.min(w, h, d) * 0.12),
    m,
    x,
    y,
    z,
  );
}
function sphere(p: T.Object3D, m: T.Material, r: number, x = 0, y = 0, z = 0) {
  return part(p, new T.SphereGeometry(r, 32, 24), m, x, y, z);
}
function cylinder(
  p: T.Object3D,
  m: T.Material,
  r: number,
  h: number,
  x = 0,
  y = 0,
  z = 0,
  rt = r,
) {
  return part(p, new T.CylinderGeometry(rt, r, h, 48), m, x, y, z);
}
function ring(
  p: T.Object3D,
  m: T.Material,
  r: number,
  t: number,
  x = 0,
  y = 0,
  z = 0,
) {
  return part(p, new T.TorusGeometry(r, t, 10, 96), m, x, y, z);
}
function line(
  p: T.Object3D,
  m: T.Material,
  a: T.Vector3,
  b: T.Vector3,
  r: number,
) {
  const o = cylinder(p, m, r, a.distanceTo(b));
  o.position.copy(a).add(b).multiplyScalar(0.5);
  o.quaternion.setFromUnitVectors(V(0, 1), b.clone().sub(a).normalize());
  return o;
}
function cable(p: T.Object3D, m: T.Material, points: T.Vector3[], r = 0.018) {
  return part(
    p,
    new T.TubeGeometry(new T.CatmullRomCurve3(points), 32, r, 6, false),
    m,
  );
}
function bolts(p: T.Object3D, m: T.Material, r: number, z: number, count = 24) {
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const o = part(
      p,
      new T.CylinderGeometry(0.022, 0.022, 0.016, 6),
      m,
      Math.cos(a) * r,
      Math.sin(a) * r,
      z,
    );
    o.rotation.x = Math.PI / 2;
  }
}

export function createSignatureModel(
  kind: string,
  root: T.Group,
): ((time: number) => void) | undefined {
  if (!["intelligence", "energy", "robotics"].includes(kind)) return;
  const p = palette();
  let animate: (t: number) => void = () => {};
  if (kind === "intelligence") {
    // A suspended photonic processor, framed by a machined crown and radial optical channels.
    const core = new T.Group();
    core.position.y = 0.27;
    root.add(core);
    const brain = part(core, new T.IcosahedronGeometry(0.7, 2), p.dark);
    const vertices = brain.geometry.getAttribute("position"),
      seen = new Set<string>();
    for (let i = 0; i < vertices.count; i++) {
      const v = V().fromBufferAttribute(vertices, i);
      const k = v
        .toArray()
        .map((n) => n.toFixed(2))
        .join();
      if (seen.has(k)) continue;
      seen.add(k);
      sphere(core, p.light, 0.016, v.x * 1.015, v.y * 1.015, v.z * 1.015);
    }
    const circuit = new T.LineSegments(
      new T.WireframeGeometry(new T.IcosahedronGeometry(0.707, 1)),
      new T.LineBasicMaterial({
        color: "#a08e6a",
        transparent: true,
        opacity: 0.7,
      }),
    );
    core.add(circuit);
    for (let j = 0; j < 3; j++) {
      const r = ring(core, j === 1 ? p.gold : p.shell, 0.87 + j * 0.1, 0.027);
      r.rotation.set(j * 0.92, 0.3 + j * 0.53, 0);
    }
    // Eight swept optical supports form an open crown around the exposed neural core.
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4,
        group = new T.Group();
      group.rotation.y = a;
      root.add(group);
      cable(
        group,
        p.dark,
        [
          V(0, -1.2, 0.65),
          V(0, -0.94, 1.03),
          V(0, -0.48, 1.2),
          V(0, -0.12, 1.13),
        ],
        0.075,
      );
      cable(
        group,
        p.gold,
        [
          V(0.048, -1.22, 0.65),
          V(0.048, -0.94, 1.04),
          V(0.048, -0.48, 1.22),
          V(0.048, -0.12, 1.14),
        ],
        0.024,
      );
      cable(
        group,
        p.shell,
        [
          V(-0.048, -1.22, 0.65),
          V(-0.048, -0.94, 1.04),
          V(-0.048, -0.48, 1.22),
          V(-0.048, -0.12, 1.14),
        ],
        0.016,
      );
      sphere(group, p.gold, 0.065, 0, -0.12, 1.13);
      sphere(group, p.light, 0.025, 0, -0.11, 1.187);
      for (let j = 0; j < 4; j++)
        box(
          group,
          p.gold,
          0.12,
          0.025,
          0.12,
          0,
          -1.05 + j * 0.18,
          0.9 + Math.sin(j * 0.7) * 0.24,
        );
    }
    // Fine optical traces and tiny emitters make the core read as an intelligence instrument.
    for (let j = 0; j < 18; j++) {
      const trace: T.Vector3[] = [];
      for (let k = 0; k <= 48; k++) {
        const a = (k / 48) * Math.PI * 2,
          r = 0.72 + 0.008 * Math.sin(a * 12 + j);
        trace.push(
          V(
            Math.cos(a) * r,
            Math.sin(a) * r * 0.85,
            Math.sin(a * 3 + j) * 0.045,
          ),
        );
      }
      const orbit = new T.Group();
      orbit.rotation.y = (j * Math.PI) / 18;
      core.add(orbit);
      cable(orbit, j % 3 === 0 ? p.gold : p.shell, trace, 0.005);
    }
    for (const y of [-1.16, -1.29]) {
      const r = ring(root, p.gold, 1.13, 0.055, 0, y);
      r.rotation.x = Math.PI / 2;
    }
    cylinder(root, p.dark, 1.18, 0.1, 0, -1.36);
    cylinder(root, p.shell, 0.57, 0.08, 0, -1.44);
    cylinder(root, p.dark, 0.3, 0.2, 0, -1.23);
    root.rotation.set(0.17, 0.4, 0);
    root.position.y = 0.1;
    animate = (t) => {
      core.rotation.y = t * 0.12;
      core.rotation.z = Math.sin(t * 0.2) * 0.06;
      p.light.emissiveIntensity = 1.3 + Math.sin(t * 1.2) * 0.25;
    };
  } else if (kind === "energy") {
    // An armillary stellar-power concept: nested containment coils around a luminous energy chamber.
    const shell = new T.Group();
    root.add(shell);
    const plasma = new T.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader:
        "varying vec3 vP;varying vec3 vN;varying vec3 vView;void main(){vP=position;vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);vView=-mv.xyz;gl_Position=projectionMatrix*mv;}",
      fragmentShader: `varying vec3 vP;varying vec3 vN;varying vec3 vView;uniform float time;
      void main(){vec3 p=normalize(vP);float a=atan(p.z,p.x);float w=sin(a*13.+p.y*19.+sin(p.y*12.-time*.3)*2.);
      float f=pow(abs(w),8.);float detail=sin(p.x*67.+sin(p.z*38.+time*.12))*sin(p.y*42.+p.z*21.);
      float edge=pow(1.-max(dot(normalize(vN),normalize(vView)),0.),2.);
      vec3 c=mix(vec3(.07,.14,.19),vec3(.48,.75,.82),f*.8+detail*.08+.2);
      c+=vec3(.55,.7,.72)*edge*.65;gl_FragColor=vec4(c,1.);}`,
    });
    const core = sphere(shell, plasma, 0.54);
    core.scale.y = 1.05;
    const inner = part(shell, new T.IcosahedronGeometry(0.65, 1), p.gold);
    inner.material = new T.MeshPhysicalMaterial({
      color: "#ad8a4f",
      metalness: 0.9,
      roughness: 0.28,
      wireframe: true,
    });
    for (let j = 0; j < 3; j++) {
      const g = new T.Group();
      g.rotation.set(0.25 + j * 0.8, j * 0.9, 0.3);
      shell.add(g);
      ring(g, p.dark, 0.98 + j * 0.13, 0.075);
      ring(g, p.gold, 0.98 + j * 0.13, 0.028, 0, 0, 0.08);
      ring(g, p.shell, 0.98 + j * 0.13, 0.012, 0, 0, -0.075);
      bolts(g, p.gold, 0.98 + j * 0.13, 0.086, 32);
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        const tab = box(
          g,
          p.gold,
          0.11,
          0.18,
          0.17,
          Math.cos(a) * (1 + j * 0.13),
          Math.sin(a) * (1 + j * 0.13),
        );
        tab.rotation.z = a;
      }
    }
    for (const side of [-1, 1]) {
      const pillar = box(root, p.dark, 0.2, 1.8, 0.32, side * 1.24, -0.45);
      pillar.rotation.z = -side * 0.17;
      box(root, p.gold, 0.045, 1.57, 0.35, side * 1.24, -0.47);
      cylinder(root, p.shell, 0.18, 0.15, side * 1.08, -1.35);
      cable(
        root,
        p.gold,
        [
          V(side * 1.12, -1.32, 0.08),
          V(side * 0.9, -0.9, 0.2),
          V(side * 0.52, -0.48, 0.1),
        ],
        0.04,
      );
    }
    cylinder(root, p.dark, 1.1, 0.15, 0, -1.47);
    cylinder(root, p.gold, 1.04, 0.035, 0, -1.38);
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      box(
        root,
        p.shell,
        0.018,
        0.1,
        0.09,
        Math.cos(a) * 1.08,
        -1.46,
        Math.sin(a) * 1.08,
      ).rotation.y = -a;
    }
    root.rotation.set(0.1, -0.3, 0);
    root.position.y = 0.12;
    animate = (t) => {
      shell.rotation.y = t * 0.08;
      core.scale.setScalar(1 + Math.sin(t * 1.1) * 0.025);
      plasma.uniforms.time.value = t;
    };
  } else {
    // A complete humanoid with segmented armor, independent joints, tendon runs, hands and feet.
    const torso = new T.Group();
    root.add(torso);
    const chest = part(
      torso,
      new T.CylinderGeometry(0.46, 0.31, 0.68, 8),
      p.shell,
      0,
      0.59,
    );
    chest.scale.z = 0.57;
    box(torso, p.dark, 0.19, 0.61, 0.28, 0, 0.59, 0.16);
    box(torso, p.gold, 0.035, 0.48, 0.025, 0, 0.63, 0.315);
    for (const s of [-1, 1]) {
      const plate = box(
        torso,
        p.ceramic,
        0.28,
        0.3,
        0.12,
        s * 0.245,
        0.71,
        0.23,
      );
      plate.rotation.z = s * 0.12;
      for (let i = 0; i < 4; i++)
        box(
          torso,
          p.dark,
          0.15,
          0.018,
          0.025,
          s * 0.245,
          0.55 + i * 0.045,
          0.3,
        );
    }
    for (let i = 0; i < 4; i++) {
      const y = 0.08 + i * 0.09;
      cylinder(torso, p.dark, 0.245, 0.07, 0, y);
      box(torso, p.shell, 0.37 - i * 0.018, 0.065, 0.23, 0, y, 0.085);
    }
    const pelvis = part(
      root,
      new T.CylinderGeometry(0.29, 0.35, 0.27, 8),
      p.dark,
      0,
      -0.16,
    );
    pelvis.scale.z = 0.66;
    for (const s of [-1, 1])
      box(root, p.shell, 0.22, 0.19, 0.29, s * 0.18, -0.13, 0.035).rotation.z =
        -s * 0.12;
    cylinder(torso, p.dark, 0.115, 0.17, 0, 1.01);
    for (const y of [0.96, 1, 1.04]) {
      const r = ring(torso, p.gold, 0.116, 0.012, 0, y);
      r.rotation.x = Math.PI / 2;
    }
    const head = new T.Group();
    head.position.y = 1.27;
    torso.add(head);
    const skull = sphere(head, p.ceramic, 0.245);
    skull.scale.set(0.85, 1.15, 0.83);
    const face = box(head, p.dark, 0.32, 0.16, 0.16, 0, 0.015, 0.145);
    face.rotation.x = 0.05;
    for (const s of [-1, 1]) {
      box(head, p.light, 0.105, 0.016, 0.025, s * 0.078, 0.035, 0.235);
      const ear = cylinder(head, p.gold, 0.075, 0.035, s * 0.218, 0);
      ear.rotation.z = Math.PI / 2;
      for (let i = 0; i < 3; i++)
        box(
          head,
          p.dark,
          0.085,
          0.011,
          0.016,
          s * 0.09,
          -0.12 + i * 0.026,
          0.19,
        );
    }
    box(head, p.shell, 0.16, 0.075, 0.1, 0, -0.19, 0.115);
    const arms: T.Group[] = [];
    for (const s of [-1, 1]) {
      const arm = new T.Group();
      arm.position.set(s * 0.54, 0.75, 0);
      arm.rotation.z = s * 0.08;
      torso.add(arm);
      arms.push(arm);
      sphere(arm, p.dark, 0.175);
      const shoulder = sphere(arm, p.shell, 0.19);
      shoulder.scale.set(1, 0.78, 0.9);
      cylinder(arm, p.gold, 0.1, 0.045, 0, 0, 0.17).rotation.x = Math.PI / 2;
      line(arm, p.dark, V(0, -0.06), V(s * 0.04, -0.48), 0.11);
      const upper = box(
        arm,
        p.ceramic,
        0.21,
        0.34,
        0.21,
        s * 0.02,
        -0.27,
        0.045,
      );
      upper.rotation.z = s * 0.08;
      sphere(arm, p.dark, 0.12, s * 0.04, -0.51);
      cylinder(arm, p.gold, 0.08, 0.22, s * 0.04, -0.51).rotation.x =
        Math.PI / 2;
      const fore = part(
        arm,
        new T.CylinderGeometry(0.115, 0.085, 0.42, 8),
        p.shell,
        s * 0.025,
        -0.77,
        0.035,
      );
      fore.rotation.z = -s * 0.05;
      box(arm, p.dark, 0.04, 0.29, 0.025, s * 0.025, -0.75, 0.15);
      cable(
        arm,
        p.gold,
        [
          V(-s * 0.075, -0.08, -0.09),
          V(-s * 0.12, -0.35, -0.13),
          V(-s * 0.06, -0.58, -0.12),
          V(-s * 0.06, -0.92, -0.06),
        ],
        0.018,
      );
      sphere(arm, p.dark, 0.075, 0, -1.02, 0.035);
      box(arm, p.shell, 0.15, 0.17, 0.09, 0, -1.13, 0.04);
      for (let f = 0; f < 4; f++) {
        const x = (f - 1.5) * 0.036,
          y = -1.22,
          len = 0.12 - Math.abs(f - 1.3) * 0.015;
        line(arm, p.shell, V(x, y, 0.04), V(x, y - len, 0.06), 0.015);
        sphere(arm, p.gold, 0.018, x, y - len, 0.06);
        line(
          arm,
          p.shell,
          V(x, y - len, 0.06),
          V(x, y - len - 0.065, 0.09),
          0.013,
        );
      }
      line(
        arm,
        p.shell,
        V(-s * 0.075, -1.1, 0.04),
        V(-s * 0.115, -1.19, 0.08),
        0.022,
      );
      // Leg shells leave the knee actuators and ankle mechanisms visible.
      sphere(root, p.dark, 0.14, s * 0.2, -0.32);
      const thigh = part(
        root,
        new T.CylinderGeometry(0.16, 0.12, 0.55, 10),
        p.shell,
        s * 0.21,
        -0.63,
      );
      thigh.scale.z = 0.85;
      box(root, p.ceramic, 0.17, 0.39, 0.1, s * 0.21, -0.62, 0.12);
      line(
        root,
        p.gold,
        V(s * 0.29, -0.39, -0.08),
        V(s * 0.3, -0.92, -0.09),
        0.025,
      );
      sphere(root, p.dark, 0.125, s * 0.22, -0.96);
      box(root, p.gold, 0.16, 0.13, 0.1, s * 0.22, -0.96, 0.12);
      const shin = part(
        root,
        new T.CylinderGeometry(0.12, 0.085, 0.55, 10),
        p.shell,
        s * 0.22,
        -1.29,
      );
      shin.scale.z = 0.9;
      box(root, p.dark, 0.045, 0.37, 0.03, s * 0.22, -1.25, 0.12);
      line(
        root,
        p.gold,
        V(s * 0.28, -1.04, -0.07),
        V(s * 0.28, -1.55, -0.06),
        0.018,
      );
      sphere(root, p.dark, 0.085, s * 0.22, -1.59);
      box(root, p.shell, 0.23, 0.13, 0.39, s * 0.22, -1.69, 0.08);
      box(root, p.dark, 0.24, 0.035, 0.4, s * 0.22, -1.775, 0.08);
      for (let i = 0; i < 3; i++)
        box(root, p.dark, 0.19, 0.009, 0.02, s * 0.22, -1.62, 0.14 + i * 0.055);
    }
    // Spine, panel fasteners and collar details remain visible when rotated.
    for (let i = 0; i < 8; i++) {
      box(torso, p.dark, 0.17, 0.05, 0.1, 0, 0.18 + i * 0.09, -0.24);
      sphere(torso, p.gold, 0.022, 0, 0.18 + i * 0.09, -0.3);
    }
    for (const s of [-1, 1])
      for (const y of [0.35, 0.83])
        sphere(torso, p.gold, 0.022, s * 0.3, y, 0.25);
    root.rotation.y = -0.22;
    root.position.y = 0.12;
    animate = (t) => {
      head.rotation.y = Math.sin(t * 0.24) * 0.12;
      arms.forEach(
        (a, i) => (a.rotation.x = Math.sin(t * 0.42 + i * 0.7) * 0.025),
      );
    };
  }
  const used = new Set<T.Material>();
  root.traverse((o) => {
    if (o instanceof T.Mesh)
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
        used.add(m),
      );
  });
  Object.values(p).forEach((m) => {
    if (!used.has(m)) m.dispose();
  });
  return animate;
}
