import * as T from "three";

/** Reflected softboxes, kept separate from the visible black presentation stage. */
export function createStudioEnvironment() {
  const scene = new T.Scene();
  scene.background = new T.Color("#101317");
  const panel = (
    width: number,
    height: number,
    color: string,
    intensity: number,
    x: number,
    y: number,
    z: number,
  ) => {
    const material = new T.MeshBasicMaterial({
      color: new T.Color(color).multiplyScalar(intensity),
      side: T.DoubleSide,
    });
    const mesh = new T.Mesh(new T.PlaneGeometry(width, height), material);
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  };
  panel(3.5, 5, "#f7f0e4", 4.5, -4, 4, 3);
  panel(0.7, 5, "#c7e1ef", 3, 4, 2, 1);
  panel(3, 0.6, "#ffffff", 6, 0, 4, -3);
  panel(1.2, 2, "#bdc4c8", 0.7, -1, 0, -5);
  return scene;
}

function surfaceMap(mode: "brushed" | "grain") {
  const size = 256,
    data = new Uint8Array(size * size * 4);
  let seed = 83;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let y = 0; y < size; y++) {
    const line = random();
    for (let x = 0; x < size; x++) {
      const noise =
        mode === "brushed"
          ? 0.65 * line + 0.25 * random() + 0.1 * Math.sin(x * 0.12)
          : random();
      const value = Math.round(155 + noise * 85),
        p = (y * size + x) * 4;
      data[p] = value;
      data[p + 1] = value;
      data[p + 2] = value;
      data[p + 3] = 255;
    }
  }
  const texture = new T.DataTexture(data, size, size, T.RGBAFormat);
  texture.wrapS = texture.wrapT = T.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.generateMipmaps = true;
  texture.minFilter = T.LinearMipmapLinearFilter;
  texture.magFilter = T.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/** Small finish variation breaks perfect computer-generated surfaces without dirtying the machinery. */
export function finishSurfaces(root: T.Object3D) {
  const brushed = surfaceMap("brushed"),
    grain = surfaceMap("grain"),
    materials = new Set<T.MeshStandardMaterial>();
  root.traverse((o) => {
    if (o instanceof T.Mesh) {
      for (const m of Array.isArray(o.material) ? o.material : [o.material])
        if (m instanceof T.MeshStandardMaterial) materials.add(m);
    }
  });
  let brushedUsed = false,
    grainUsed = false;
  for (const m of materials) {
    if (
      m.transparent ||
      m.emissiveIntensity > 1 ||
      m.map ||
      m.normalMap ||
      m.bumpMap
    )
      continue;
    const isMetal = m.metalness > 0.55,
      texture = isMetal ? brushed : grain;
    m.roughnessMap = texture;
    m.bumpMap = texture;
    m.bumpScale = isMetal ? 0.003 : 0.0012;
    if (isMetal) brushedUsed = true;
    else grainUsed = true;
    m.envMapIntensity = isMetal ? 0.8 : 0.55;
    if (m instanceof T.MeshPhysicalMaterial && isMetal) {
      m.anisotropy = 0.42;
      m.anisotropyRotation = Math.PI / 2;
    }
    m.needsUpdate = true;
  }
  if (!brushedUsed) brushed.dispose();
  if (!grainUsed) grain.dispose();
}
