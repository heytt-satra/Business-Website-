import * as T from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export function createSatellite() {
  const root = new T.Group();
  const silver = new T.MeshPhysicalMaterial({
      color: "#abb8c2",
      metalness: 0.94,
      roughness: 0.28,
    }),
    gold = new T.MeshPhysicalMaterial({
      color: "#b49b66",
      metalness: 0.93,
      roughness: 0.34,
    }),
    dark = new T.MeshStandardMaterial({
      color: "#121b24",
      metalness: 0.66,
      roughness: 0.4,
    }),
    cells = new T.MeshPhysicalMaterial({
      color: "#142e52",
      metalness: 0.77,
      roughness: 0.22,
      clearcoat: 0.65,
    }),
    wire = new T.MeshStandardMaterial({
      color: "#516d85",
      metalness: 0.8,
      roughness: 0.4,
    }),
    lens = new T.MeshPhysicalMaterial({
      color: "#183243",
      metalness: 0.7,
      roughness: 0.08,
    });
  const add = (g: T.BufferGeometry, m: T.Material, x = 0, y = 0, z = 0) => {
    const o = new T.Mesh(g, m);
    o.position.set(x, y, z);
    o.castShadow = true;
    o.receiveShadow = true;
    root.add(o);
    return o;
  };
  const box = (
    m: T.Material,
    w: number,
    h: number,
    d: number,
    x = 0,
    y = 0,
    z = 0,
  ) =>
    add(
      new RoundedBoxGeometry(w, h, d, 1, Math.min(w, h, d) * 0.06),
      m,
      x,
      y,
      z,
    );
  const rod = (a: T.Vector3, b: T.Vector3, r: number, m = silver) => {
    const o = add(new T.CylinderGeometry(r, r, a.distanceTo(b), 8), m);
    o.position.copy(a).add(b).multiplyScalar(0.5);
    o.quaternion.setFromUnitVectors(
      new T.Vector3(0, 1, 0),
      b.clone().sub(a).normalize(),
    );
  };
  const v = (x = 0, y = 0, z = 0) => new T.Vector3(x, y, z);
  box(gold, 0.74, 0.92, 0.69);
  box(silver, 0.79, 0.065, 0.75, 0, 0.49);
  box(dark, 0.8, 0.08, 0.76, 0, -0.5);
  // Multilayer thermal blankets, seams, tie-downs and radiator fins.
  for (const side of [-1, 1]) {
    box(silver, 0.022, 0.8, 0.61, side * 0.38, 0, 0);
    for (let i = 0; i < 14; i++)
      box(dark, 0.027, 0.035, 0.5, side * 0.395, -0.35 + i * 0.053, 0);
    for (const z of [-0.29, 0.29])
      rod(v(side * 0.375, -0.42, z), v(side * 0.375, 0.42, z), 0.009, gold);
    for (const x of [-0.26, 0.26])
      for (const y of [-0.35, 0.35]) {
        const bolt = add(
          new T.CylinderGeometry(0.023, 0.023, 0.018, 6),
          silver,
          x,
          y,
          side * 0.357,
        );
        bolt.rotation.x = Math.PI / 2;
      }
    box(gold, 0.7, 0.018, 0.035, 0, 0.38, side * 0.354);
    box(gold, 0.7, 0.018, 0.035, 0, -0.38, side * 0.354);
    for (let j = 0; j < 6; j++)
      box(gold, 0.007, 0.7, 0.009, -0.29 + j * 0.115, 0, side * 0.355);
    // Two articulated solar wings, with segmented substrates and individual cell boundaries.
    rod(v(side * 0.38, 0, 0), v(side * 1.05, 0, 0), 0.045);
    rod(v(side * 0.4, -0.21, 0), v(side * 0.96, 0, 0), 0.022);
    for (let panel = 0; panel < 3; panel++) {
      const x = side * (1.12 + panel * 0.49);
      box(silver, 0.47, 0.032, 1.31, x, 0, 0);
      box(dark, 0.445, 0.038, 1.27, x, 0.013, 0);
      for (let row = 0; row < 10; row++)
        for (let col = 0; col < 3; col++)
          box(
            cells,
            0.137,
            0.008,
            0.117,
            x + (col - 1) * 0.145,
            0.038,
            (row - 4.5) * 0.125,
          );
      for (let trace = 0; trace < 4; trace++)
        box(wire, 0.003, 0.01, 1.25, x + (trace - 1.5) * 0.145, 0.044, 0);
      rod(v(x - side * 0.24, 0, -0.6), v(x - side * 0.24, 0, 0.6), 0.015, gold);
    }
    // Thruster bells with internal throats and bracket mounts.
    for (const z of [-0.23, 0.23]) {
      const nozzle = add(
        new T.CylinderGeometry(0.046, 0.09, 0.19, 24, 1, true),
        silver,
        side * 0.26,
        -0.64,
        z,
      );
      nozzle.rotation.z = side * 0.16;
      add(
        new T.CylinderGeometry(0.04, 0.04, 0.06, 16),
        dark,
        side * 0.26,
        -0.56,
        z,
      );
      rod(v(side * 0.26, -0.46, z), v(side * 0.26, -0.62, z), 0.025, gold);
    }
  }
  // Parabolic high-gain antenna, central feed and three-legged support struts.
  const points: T.Vector2[] = [];
  for (let i = 0; i <= 24; i++) {
    const r = (i / 24) * 0.38;
    points.push(new T.Vector2(r, r * r * 0.9));
  }
  const dish = add(new T.LatheGeometry(points, 64), silver, 0, 0.69, 0);
  dish.material = new T.MeshPhysicalMaterial({
    color: "#c4cbd1",
    metalness: 0.9,
    roughness: 0.23,
    side: T.DoubleSide,
  });
  rod(v(0, 0.48, 0), v(0, 0.72, 0), 0.045);
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3;
    rod(v(Math.cos(a) * 0.31, 0.78, Math.sin(a) * 0.31), v(0, 1.04, 0), 0.009);
  }
  add(new T.SphereGeometry(0.035, 16, 12), gold, 0, 1.04, 0);
  for (const x of [-0.22, 0.22]) {
    const tracker = add(
      new T.CylinderGeometry(0.07, 0.085, 0.14, 24),
      dark,
      x,
      0.3,
      0.4,
    );
    tracker.rotation.x = Math.PI / 2;
    const glass = add(new T.CircleGeometry(0.053, 24), lens, x, 0.3, 0.478);
    glass.rotation.z = 0.2;
  }
  rod(v(0.25, 0.46, -0.22), v(0.45, 1.1, -0.36), 0.01);
  rod(v(0.32, 0.86, -0.28), v(0.61, 0.86, -0.28), 0.008);
  const cable = new T.CatmullRomCurve3([
    v(-0.25, -0.4, 0.37),
    v(-0.4, -0.25, 0.4),
    v(-0.4, 0.2, 0.39),
    v(-0.23, 0.46, 0.36),
  ]);
  add(new T.TubeGeometry(cable, 32, 0.014, 6, false), dark);
  // Bake fixed hardware into a small set of material draws for the orbital scene.
  const batches = new Map<T.Material, T.Mesh[]>();
  for (const child of root.children) {
    if (child instanceof T.Mesh && !Array.isArray(child.material)) {
      const list = batches.get(child.material) || [];
      list.push(child);
      batches.set(child.material, list);
    }
  }
  for (const [material, parts] of batches) {
    if (parts.length < 2) continue;
    const gs = parts.map((p) => {
      p.updateMatrix();
      const g = p.geometry.index
        ? p.geometry.toNonIndexed()
        : p.geometry.clone();
      return g.applyMatrix4(p.matrix);
    });
    const combined = mergeGeometries(gs, false);
    gs.forEach((g) => g.dispose());
    if (!combined) continue;
    parts.forEach((p) => {
      root.remove(p);
      p.geometry.dispose();
    });
    const m = new T.Mesh(combined, material);
    m.castShadow = true;
    m.receiveShadow = true;
    root.add(m);
  }
  root.rotation.set(0.15, 0.25, 0.08);
  return root;
}
