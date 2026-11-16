import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import * as T from "three";
registerHooks({
  resolve(s, c, next) {
    if (
      c.parentURL?.includes("/src/lib/") &&
      s.startsWith(".") &&
      !/\.[a-z]+$/i.test(s)
    )
      return next(s + ".ts", c);
    return next(s, c);
  },
});
// Geometry tests do not need a browser or external texture requests.
T.TextureLoader.prototype.load = function () {
  return new T.Texture();
};
const { createUniverse, PLANETS } = await import("../src/lib/universe.ts");
const { createModel, disposeObject } = await import("../src/lib/models.ts");
const scene = createUniverse();
assert.deepEqual(
  PLANETS.map((p) => p.name),
  [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ],
);
for (const time of [0, 10, 100]) {
  scene.update(0.6, time, false);
  PLANETS.forEach((p, i) => {
    const body = scene.root.getObjectByName(p.name);
    assert.ok(body, `${p.name} exists`);
    assert.ok(
      Math.abs(body.position.length() - p.radius) < 1e-6,
      `${p.name} remains on its own orbit`,
    );
    if (i) assert.ok(p.radius > PLANETS[i - 1].radius);
  });
}
let previous;
for (let i = 0; i <= 500; i++) {
  scene.update(i / 500, 0, false);
  scene.root.updateMatrixWorld(true);
  const earth = scene.root
    .getObjectByName("earth")
    .getWorldPosition(new T.Vector3());
  if (previous)
    assert.ok(
      earth.distanceTo(previous) < 0.08,
      "Earth follows a continuous transition",
    );
  previous = earth;
  scene.root.traverse((o) =>
    assert.ok(
      [...o.position.toArray(), ...o.scale.toArray()].every(Number.isFinite),
    ),
  );
}
disposeObject(scene.root);
for (const kind of [
  "fusion",
  "silicon",
  "bio",
  "intelligence",
  "quantum",
  "orbital",
  "propulsion",
  "materials",
  "energy",
  "robotics",
]) {
  const model = createModel(kind);
  model.animate(2);
  model.root.updateMatrixWorld(true);
  let vertices = 0;
  model.root.traverse((o) => {
    if (o.geometry) {
      const positions = o.geometry.getAttribute("position");
      vertices += positions.count;
      for (const value of positions.array)
        assert.ok(Number.isFinite(value), `${kind} geometry`);
    }
  });
  assert.ok(vertices > 100, `${kind} has geometry`);
  disposeObject(model.root);
  console.log(`${kind}: finite geometry and disposal passed`);
}
console.log(
  "Eight ordered planetary orbits and 501 continuous journey frames passed.",
);
