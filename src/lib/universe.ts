import * as T from "three";

const clamp = T.MathUtils.clamp;
const smooth = (a: number, b: number, x: number) =>
  T.MathUtils.smoothstep(x, a, b);
export function createUniverse() {
  const root = new T.Group(),
    loader = new T.TextureLoader();
  const texture = (file: string) => {
    const t = loader.load(`/media/motion/${file}.jpg`);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  };
  const earth = new T.Mesh(
    new T.SphereGeometry(1.45, 80, 48),
    new T.MeshStandardMaterial({
      map: texture("earth"),
      roughness: 0.72,
      metalness: 0.04,
    }),
  );
  root.add(earth);
  const clouds = texture("clouds");
  const cloudLayer = new T.Mesh(
    new T.SphereGeometry(1.459, 64, 40),
    new T.MeshStandardMaterial({
      map: clouds,
      alphaMap: clouds,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      roughness: 0.9,
    }),
  );
  earth.add(cloudLayer);
  const atmosphere = new T.Mesh(
    new T.SphereGeometry(1.49, 64, 40),
    new T.ShaderMaterial({
      uniforms: { glow: { value: new T.Color("#5d9fd6") } },
      vertexShader:
        "varying vec3 vN; varying vec3 vP; void main(){vN=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.);vP=p.xyz;gl_Position=projectionMatrix*p;}",
      fragmentShader:
        "varying vec3 vN; varying vec3 vP;uniform vec3 glow;void main(){float a=pow(1.-max(dot(normalize(vN),normalize(-vP)),0.),4.);gl_FragColor=vec4(glow,a*.55);}",
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  earth.add(atmosphere);
  // Orbit paths and small spacecraft stay attached to Earth as the view widens.
  const orbit = new T.Group();
  earth.add(orbit);
  for (let i = 0; i < 3; i++) {
    const r = 1.85 + i * 0.18;
    const curve = new T.EllipseCurve(0, 0, r, r, 0, Math.PI * 2, false, 0);
    const geometry = new T.BufferGeometry().setFromPoints(
      curve.getPoints(128).map((p) => new T.Vector3(p.x, 0, p.y)),
    );
    const line = new T.LineLoop(
      geometry,
      new T.LineBasicMaterial({
        color: "#90a6b4",
        transparent: true,
        opacity: 0.35,
      }),
    );
    line.rotation.set(0.35 + i * 0.7, 0, i * 0.3);
    orbit.add(line);
    const sat = new T.Mesh(
      new T.BoxGeometry(0.025, 0.025, 0.04),
      new T.MeshBasicMaterial({ color: "#e5e9e8" }),
    );
    sat.position.x = r;
    line.add(sat);
  }
  const mars = new T.Mesh(
    new T.SphereGeometry(0.5, 48, 32),
    new T.MeshStandardMaterial({ map: texture("mars"), roughness: 1 }),
  );
  root.add(mars);
  const sun = new T.Mesh(
    new T.SphereGeometry(0.76, 64, 40),
    new T.MeshBasicMaterial({ map: texture("sun"), color: "#ffe5bf" }),
  );
  root.add(sun);
  const system = new T.Group();
  root.add(system);
  for (let i = 0; i < 7; i++) {
    const r = 1.0 + i * 0.34,
      curve = new T.EllipseCurve(0, 0, r, r, 0, Math.PI * 2, false, 0);
    const orbitLine = new T.LineLoop(
      new T.BufferGeometry().setFromPoints(
        curve.getPoints(140).map((p) => new T.Vector3(p.x, 0, p.y)),
      ),
      new T.LineBasicMaterial({
        color: "#75838c",
        transparent: true,
        opacity: 0.25,
      }),
    );
    system.add(orbitLine);
    const planet = new T.Mesh(
      new T.SphereGeometry(i === 4 ? 0.12 : 0.045 + i * 0.008, 18, 12),
      new T.MeshStandardMaterial({
        color: [
          "#a69a8d",
          "#c5ad89",
          "#7296b5",
          "#c07d54",
          "#c6ae91",
          "#b5a37c",
          "#8aafb8",
        ][i],
        roughness: 0.8,
      }),
    );
    const a = i * 1.9;
    planet.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
    system.add(planet);
  }
  system.rotation.x = 0.42;
  // Deterministic spiral distribution, rendered as individual luminous stars.
  const count = 11000,
    positions = new Float32Array(count * 3),
    colors = new Float32Array(count * 3);
  let seed = 19;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    const r = Math.pow(random(), 0.7) * 3.1,
      a = ((i % 4) * Math.PI) / 2 + r * 2.3 + (random() - 0.5) * 0.65;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = (random() - 0.5) * 0.14 * (1 - r / 3.8);
    positions[i * 3 + 2] = Math.sin(a) * r;
    const c = new T.Color().setRGB(
      1 - r * 0.13,
      0.88 - r * 0.07,
      0.7 + r * 0.07,
    );
    colors.set([c.r, c.g, c.b], i * 3);
  }
  const g = new T.BufferGeometry();
  g.setAttribute("position", new T.BufferAttribute(positions, 3));
  g.setAttribute("color", new T.BufferAttribute(colors, 3));
  const starCanvas = document.createElement("canvas");
  starCanvas.width = 32;
  starCanvas.height = 32;
  const ctx = starCanvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,255,255,.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  const sprite = new T.CanvasTexture(starCanvas);
  const galaxy = new T.Points(
    g,
    new T.PointsMaterial({
      size: 0.035,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  root.add(galaxy);
  galaxy.rotation.x = 0.38;
  const distant = galaxy.clone();
  distant.material = (galaxy.material as T.PointsMaterial).clone();
  distant.position.set(-2, 1, -2);
  distant.scale.setScalar(0.4);
  distant.rotation.z = 0.6;
  root.add(distant);
  const stars = new Float32Array(1400 * 3);
  for (let i = 0; i < stars.length; i++) stars[i] = (random() - 0.5) * 30;
  const starsG = new T.BufferGeometry();
  starsG.setAttribute("position", new T.BufferAttribute(stars, 3));
  const field = new T.Points(
    starsG,
    new T.PointsMaterial({
      size: 0.022,
      map: sprite,
      color: "#b5c3ce",
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    }),
  );
  root.add(field);
  return {
    root,
    update: (progress: number, time: number, mobile: boolean) => {
      const p = clamp(progress, 0, 1) * 5;
      root.position.set(mobile ? 0 : 1.03, mobile ? 0.62 : 0.05, 0);
      earth.rotation.y = time * 0.025 + 3.2 + p * 0.32;
      earth.rotation.z = 0.14;
      cloudLayer.rotation.y = time * 0.007;
      const earthScale = 1 - smooth(0.75, 3, p) * 0.91;
      earth.scale.setScalar(earthScale);
      earth.position.set(-smooth(1.5, 3, p) * 1.9, 0, 0);
      earth.visible = p < 3.8;
      orbit.visible = p > 0.45 && p < 3.5;
      orbit.rotation.y = time * 0.07;
      mars.visible = p > 1.5 && p < 3.7;
      mars.scale.setScalar(
        smooth(1.5, 2.1, p) * (1 - smooth(2.3, 3.3, p) * 0.65),
      );
      mars.position.set(1.3, 0, 0.2);
      mars.rotation.y = time * 0.03;
      const solar = smooth(2.2, 3.2, p) * (1 - smooth(3.2, 4.2, p));
      sun.visible = solar > 0.01;
      sun.scale.setScalar(solar);
      sun.rotation.y = time * 0.015;
      system.visible = solar > 0.01;
      system.scale.setScalar(solar);
      system.rotation.y = time * 0.013;
      const gal = smooth(3.05, 4.1, p);
      galaxy.visible = gal > 0.01;
      galaxy.scale.setScalar(gal * (1 - smooth(4.2, 5, p) * 0.4));
      galaxy.rotation.y = time * 0.014 + p * 0.12;
      distant.visible = p > 4.25;
      distant.scale.setScalar(smooth(4.25, 5, p) * 0.36);
      field.rotation.y = time * 0.002;
    },
  };
}
