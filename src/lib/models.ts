import * as T from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { createSignatureModel } from "./signature-models";
import { finishSurfaces } from "./studio";
import { addMechanicalDetails } from "./mechanical-details";
import { addPrecisionDetails } from "./precision-details";

export type Model = { root: T.Group; animate: (time: number) => void };

// Bake fixed parts together while keeping articulated groups independently movable.
function batchFixedParts(parent: T.Object3D) {
  parent.children
    .filter((child) => child instanceof T.Group)
    .forEach(batchFixedParts);
  const batches = new Map<T.Material, T.Mesh[]>();
  for (const child of parent.children) {
    if (!(child instanceof T.Mesh) || Array.isArray(child.material)) continue;
    const batch = batches.get(child.material) || [];
    batch.push(child);
    batches.set(child.material, batch);
  }
  for (const [material, parts] of batches) {
    if (parts.length < 2) continue;
    const baked = parts.map((part) => {
      part.updateMatrix();
      const geometry = part.geometry.index
        ? part.geometry.toNonIndexed()
        : part.geometry.clone();
      return geometry.applyMatrix4(part.matrix);
    });
    const combined = mergeGeometries(baked, false);
    baked.forEach((geometry) => geometry.dispose());
    if (!combined) continue;
    for (const part of parts) {
      parent.remove(part);
      part.geometry.dispose();
    }
    const combinedMesh = new T.Mesh(combined, material);
    combinedMesh.castShadow = true;
    combinedMesh.receiveShadow = true;
    parent.add(combinedMesh);
  }
}
const metal = (color: string, roughness = 0.28, metalness = 0.86) =>
  new T.MeshPhysicalMaterial({ color, roughness, metalness });
const silver = () => metal("#929ca3", 0.36, 0.94);
const gold = () => metal("#a88b58", 0.34, 0.92);
const black = () => metal("#141a20", 0.48, 0.7);
const blue = () => metal("#19293a", 0.22, 0.82);
function mesh(
  g: T.BufferGeometry,
  m: T.Material,
  parent: T.Object3D,
  x = 0,
  y = 0,
  z = 0,
) {
  const o = new T.Mesh(g, m);
  o.position.set(x, y, z);
  o.castShadow = true;
  o.receiveShadow = true;
  parent.add(o);
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
  return mesh(
    new RoundedBoxGeometry(w, h, d, 2, Math.min(w, h, d) * 0.055),
    m,
    p,
    x,
    y,
    z,
  );
}
function cyl(
  p: T.Object3D,
  m: T.Material,
  r: number,
  h: number,
  x = 0,
  y = 0,
  z = 0,
  rt = r,
) {
  return mesh(new T.CylinderGeometry(rt, r, h, 48), m, p, x, y, z);
}
function ball(p: T.Object3D, m: T.Material, r: number, x = 0, y = 0, z = 0) {
  return mesh(new T.SphereGeometry(r, 24, 16), m, p, x, y, z);
}
function tube(p: T.Object3D, m: T.Material, points: T.Vector3[], r: number) {
  return mesh(
    new T.TubeGeometry(
      new T.CatmullRomCurve3(points),
      Math.max(points.length * 5, 24),
      r,
      8,
      false,
    ),
    m,
    p,
  );
}
function rod(
  p: T.Object3D,
  m: T.Material,
  a: T.Vector3,
  b: T.Vector3,
  r: number,
) {
  const o = cyl(p, m, r, a.distanceTo(b));
  o.position.copy(a).add(b).multiplyScalar(0.5);
  o.quaternion.setFromUnitVectors(
    new T.Vector3(0, 1, 0),
    b.clone().sub(a).normalize(),
  );
  return o;
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
  const o = mesh(new T.TorusGeometry(r, t, 16, 96), m, p, x, y, z);
  o.rotation.x = Math.PI / 2;
  return o;
}

export function createModel(kind: string): Model {
  const root = new T.Group();
  const signature = createSignatureModel(kind, root);
  if (signature) {
    finishSurfaces(root);
    batchFixedParts(root);
    return { root, animate: signature };
  }
  const steel = silver(),
    copper = gold(),
    dark = black(),
    navy = blue();
  const movers: ((t: number) => void)[] = [];
  if (kind === "fusion") {
    ring(root, dark, 1.05, 0.38);
    ring(root, steel, 1.05, 0.27);
    const plasma = metal("#b9d8ee", 0.2, 0.25);
    plasma.emissive.set("#468eb5");
    plasma.emissiveIntensity = 1.3;
    ring(root, plasma, 1.05, 0.12);
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      if (i > 3 && i < 8) continue;
      const frame = new T.Group();
      frame.position.set(Math.cos(a) * 1.05, 0, Math.sin(a) * 1.05);
      frame.rotation.y = -a;
      root.add(frame);
      const coil = mesh(
        new T.TorusGeometry(0.48, 0.105, 12, 40),
        copper,
        frame,
      );
      coil.scale.set(0.84, 1.6, 1);
      for (let j = -3; j <= 3; j++) {
        const c = mesh(
          new T.TorusGeometry(0.48, 0.012, 6, 40),
          steel,
          frame,
          0,
          0,
          j * 0.029,
        );
        c.scale.set(0.84, 1.6, 1);
      }
      box(frame, dark, 0.17, 1.72, 0.16, 0, 0, -0.11);
    }
    cyl(root, steel, 0.31, 1.85);
    cyl(root, copper, 0.35, 0.16, 0, 0.96);
    cyl(root, dark, 0.34, 0.17, 0, -0.98);
    [-0.7, 0.7].forEach((y) => ring(root, steel, 1.43, 0.065, 0, y));
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      box(
        root,
        dark,
        0.2,
        0.65,
        0.2,
        Math.cos(a) * 1.25,
        -1,
        Math.sin(a) * 1.25,
      );
    }
    root.rotation.x = 0.23;
    movers.push((t) => {
      plasma.emissiveIntensity = 1.2 + Math.sin(t * 1.5) * 0.2;
    });
  } else if (kind === "silicon") {
    box(root, dark, 2.55, 0.16, 2.55, 0, -0.2);
    box(root, navy, 2.3, 0.12, 2.3, 0, -0.08);
    for (let side = 0; side < 4; side++)
      for (let i = 0; i < 22; i++) {
        const p = new T.Group();
        p.rotation.y = (side * Math.PI) / 2;
        root.add(p);
        box(p, copper, 0.045, 0.055, 0.28, (i - 10.5) * 0.103, -0.15, 1.36);
      }
    box(root, copper, 1.86, 0.07, 1.86, 0, 0.02);
    box(root, steel, 1.69, 0.08, 1.69, 0, 0.075);
    const die = metal("#586c86", 0.13, 0.83);
    box(root, die, 1.4, 0.05, 1.4, 0, 0.14);
    for (let x = 0; x < 6; x++)
      for (let z = 0; z < 6; z++)
        box(
          root,
          (x + z) % 3 === 0 ? copper : navy,
          0.18,
          0.016,
          0.18,
          (x - 2.5) * 0.22,
          0.177,
          (z - 2.5) * 0.22,
        );
    for (let i = 0; i < 12; i++) {
      box(root, copper, 0.012, 0.008, 2.15, (i - 5.5) * 0.17, 0.008, 0);
      for (let s = -1; s <= 1; s += 2)
        box(root, steel, 0.1, 0.08, 0.05, s * 1.04, 0.04, (i - 5.5) * 0.17);
    }
    root.rotation.set(0.45, 0.25, 0);
  } else if (kind === "quantum") {
    const levels = [1.5, 0.9, 0.3, -0.35, -0.95],
      radii = [1.06, 0.9, 0.74, 0.57, 0.4];
    levels.forEach((y, i) => {
      cyl(root, copper, radii[i], 0.075, 0, y);
      ring(root, steel, radii[i] - 0.04, 0.026, 0, y + 0.055);
      for (let j = 0; j < 6; j++) {
        const a = (j / 6) * Math.PI * 2;
        cyl(
          root,
          steel,
          0.034,
          0.58,
          Math.cos(a) * (radii[i] - 0.12),
          y - 0.33,
          Math.sin(a) * (radii[i] - 0.12),
        );
      }
    });
    for (let j = 0; j < 24; j++) {
      const a = (j / 24) * Math.PI * 2,
        points: T.Vector3[] = [];
      for (let i = 0; i <= 28; i++) {
        const v = i / 28;
        const r = 0.91 - v * 0.63;
        points.push(
          new T.Vector3(
            Math.cos(a + Math.sin(v * 12) * 0.1) * r,
            1.58 - v * 2.85,
            Math.sin(a + Math.sin(v * 12) * 0.1) * r,
          ),
        );
      }
      tube(root, j % 3 === 0 ? steel : copper, points, 0.012);
    }
    cyl(root, dark, 0.18, 0.4, 0, -1.38);
    box(root, steel, 0.27, 0.16, 0.27, 0, -1.66);
    cyl(root, steel, 0.16, 0.28, 0, 1.68);
    root.scale.setScalar(0.85);
  } else if (kind === "orbital") {
    box(root, copper, 0.8, 1.0, 0.8);
    box(root, steel, 0.73, 0.14, 0.73, 0, 0.58);
    for (const s of [-1, 1]) {
      box(root, steel, 1.8, 0.045, 0.05, s * 1.15, 0, 0);
      const panel = new T.Group();
      panel.position.x = s * 1.6;
      panel.rotation.x = 0.1;
      root.add(panel);
      box(panel, steel, 1.65, 0.045, 1.35);
      box(panel, navy, 1.59, 0.05, 1.29, 0, 0.025);
      for (let i = 0; i < 8; i++)
        for (let j = 0; j < 6; j++)
          box(
            panel,
            i % 2 ? navy : metal("#344f77", 0.22),
            0.183,
            0.015,
            0.193,
            (i - 3.5) * 0.198,
            0.06,
            (j - 2.5) * 0.211,
          );
    }
    const dish = mesh(
      new T.SphereGeometry(0.53, 40, 24, 0, Math.PI * 2, 0, 0.65),
      steel,
      root,
      0,
      0.8,
      0,
    );
    dish.rotation.x = 0.35;
    rod(
      root,
      steel,
      new T.Vector3(0, 0.7, 0),
      new T.Vector3(0, 1.45, 0.2),
      0.018,
    );
    ball(root, copper, 0.06, 0, 1.45, 0.2);
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      cyl(
        root,
        dark,
        0.12,
        0.22,
        Math.cos(a) * 0.28,
        -0.6,
        Math.sin(a) * 0.28,
        0.06,
      );
    }
    root.rotation.set(0.3, 0.2, 0.1);
    root.scale.setScalar(0.82);
  } else if (kind === "propulsion") {
    const points = [
      new T.Vector2(0.25, 1.1),
      new T.Vector2(0.3, 0.75),
      new T.Vector2(0.28, 0.35),
      new T.Vector2(0.21, 0.05),
      new T.Vector2(0.28, -0.25),
      new T.Vector2(0.5, -0.65),
      new T.Vector2(0.83, -1.12),
      new T.Vector2(1, -1.4),
    ];
    const bell = mesh(new T.LatheGeometry(points, 72), steel, root);
    (bell.material as T.MeshStandardMaterial).side = T.DoubleSide;
    for (let i = 0; i < 22; i++) {
      const y = -1.38 + i * 0.096;
      const r = y < 0 ? 0.22 + Math.pow(-y / 1.4, 1.45) * 0.78 : 0.28;
      ring(root, i % 4 === 0 ? copper : dark, r, 0.018, 0, y);
    }
    cyl(root, dark, 0.34, 0.5, 0, 0.9);
    cyl(root, copper, 0.38, 0.12, 0, 1.2);
    cyl(root, steel, 0.2, 0.4, 0, 1.45);
    [-1, 1].forEach((s) => {
      ball(root, dark, 0.26, s * 0.61, 0.88, 0);
      cyl(root, steel, 0.2, 0.5, s * 0.61, 1.03);
      tube(
        root,
        copper,
        [
          new T.Vector3(s * 0.2, 1.4, 0),
          new T.Vector3(s * 0.75, 1.25, 0),
          new T.Vector3(s * 0.68, 0.35, 0),
          new T.Vector3(s * 0.25, 0.2, 0),
        ],
        0.055,
      );
    });
    root.rotation.z = -0.15;
  } else if (kind === "bio") {
    const a: T.Vector3[] = [],
      b: T.Vector3[] = [];
    const pearl = metal("#c9ddd2", 0.23, 0.25),
      sage = metal("#76958b", 0.29, 0.55);
    for (let i = 0; i <= 44; i++) {
      const y = (i / 44 - 0.5) * 3.4,
        angle = i * 0.28;
      const u = new T.Vector3(
          Math.cos(angle) * 0.63,
          y,
          Math.sin(angle) * 0.63,
        ),
        v = new T.Vector3(-u.x, y, -u.z);
      a.push(u);
      b.push(v);
      ball(root, pearl, 0.075, u.x, u.y, u.z);
      ball(root, sage, 0.075, v.x, v.y, v.z);
      if (i % 2 === 0) {
        rod(root, steel, u, v, 0.027);
        ball(root, copper, 0.052, 0, y, 0);
      }
    }
    tube(root, pearl, a, 0.053);
    tube(root, sage, b, 0.053);
    root.rotation.z = -0.25;
  } else if (kind === "materials") {
    const nodes: T.Vector3[] = [];
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++)
        for (let z = 0; z < 3; z++) {
          const v = new T.Vector3(
            (x - 1) * 0.85,
            (y - 1) * 0.85,
            (z - 1) * 0.85,
          );
          nodes.push(v);
          ball(root, (x + y + z) % 2 ? steel : copper, 0.16, v.x, v.y, v.z);
        }
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].distanceTo(nodes[j]) < 0.86)
          rod(root, steel, nodes[i], nodes[j], 0.035);
    const crystal = mesh(
      new T.OctahedronGeometry(0.64),
      new T.MeshPhysicalMaterial({
        color: "#9bb4bf",
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.55,
        thickness: 1.3,
      }),
      root,
    );
    crystal.rotation.z = 0.4;
    root.rotation.set(0.25, 0.3, 0.12);
  }
  addMechanicalDetails(kind, root);
  addPrecisionDetails(kind, root);
  if (kind === "bio") root.scale.setScalar(0.88);
  finishSurfaces(root);
  batchFixedParts(root);
  return { root, animate: (t) => movers.forEach((f) => f(t)) };
}

export function disposeObject(root: T.Object3D) {
  const materials = new Set<T.Material>(),
    geometries = new Set<T.BufferGeometry>(),
    textures = new Set<T.Texture>();
  root.traverse((o) => {
    if (o instanceof T.Mesh || o instanceof T.Points || o instanceof T.Line) {
      geometries.add(o.geometry);
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
        materials.add(m),
      );
    }
  });
  materials.forEach((m) => {
    Object.values(m).forEach((v) => {
      if (v instanceof T.Texture) textures.add(v);
    });
    m.dispose();
  });
  textures.forEach((t) => t.dispose());
  geometries.forEach((g) => g.dispose());
}
