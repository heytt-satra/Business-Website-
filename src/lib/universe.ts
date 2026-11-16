import * as T from "three";
import { createSatellite } from "./satellite";
import { createGalaxy, createCosmicVeil } from "./galaxy";
const smooth = (a: number, b: number, x: number) =>
  T.MathUtils.smoothstep(x, a, b);
// Compressed distances and sizes. The radial order is astronomical, not to scale.
export const PLANETS = [
  { name: "mercury", radius: 0.64, size: 0.033, phase: 0.3 },
  { name: "venus", radius: 0.9, size: 0.065, phase: 2.5 },
  { name: "earth", radius: 1.17, size: 0.072, phase: 3.8 },
  { name: "mars", radius: 1.44, size: 0.052, phase: 0.8 },
  { name: "jupiter", radius: 1.85, size: 0.18, phase: 5.5 },
  { name: "saturn", radius: 2.27, size: 0.145, phase: 2.6 },
  { name: "uranus", radius: 2.68, size: 0.1, phase: 4.8 },
  { name: "neptune", radius: 3.06, size: 0.095, phase: 0.5 },
] as const;
export function createUniverse() {
  const root = new T.Group(),
    loader = new T.TextureLoader();
  const texture = (file: string) => {
    const t = loader.load(`/media/motion/${file}.jpg`, () => {
      root.userData.needsRender = true;
    });
    t.colorSpace = T.SRGBColorSpace;
    return t;
  };
  const bodies = new T.Group();
  root.add(bodies);
  const planets = PLANETS.map((data) => {
    const body = new T.Mesh(
      new T.SphereGeometry(1, 64, 40),
      new T.MeshStandardMaterial({
        map: texture(data.name),
        roughness: 0.85,
        metalness: 0.025,
      }),
    );
    body.name = data.name;
    bodies.add(body);
    return body;
  });
  const earth = planets[2];
  const cloudMap = texture("clouds");
  const clouds = new T.Mesh(
    new T.SphereGeometry(1.006, 64, 40),
    new T.MeshStandardMaterial({
      map: cloudMap,
      alphaMap: cloudMap,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
    }),
  );
  earth.add(clouds);
  const atmosphere = new T.Mesh(
    new T.SphereGeometry(1.024, 64, 40),
    new T.ShaderMaterial({
      vertexShader: `varying vec3 n,p;void main(){n=normalize(normalMatrix*normal);vec4 v=modelViewMatrix*vec4(position,1.);p=v.xyz;gl_Position=projectionMatrix*v;}`,
      fragmentShader: `varying vec3 n,p;void main(){float a=pow(1.-max(dot(normalize(n),normalize(-p)),0.),4.);gl_FragColor=vec4(.20,.48,.85,a*.48);}`,
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  earth.add(atmosphere);
  const rings = new T.Mesh(
    new T.RingGeometry(1.35, 2.15, 160, 8),
    new T.ShaderMaterial({
      vertexShader: `varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec3 p;void main(){float r=length(p.xy);float band=.42+.18*sin(r*190.)+.08*sin(r*430.);float gap=1.-smoothstep(.015,.04,abs(r-1.78));gl_FragColor=vec4(vec3(.62,.55,.43)*(band+.45),band*(1.-gap*.9));}`,
      side: T.DoubleSide,
      transparent: true,
      depthWrite: false,
    }),
  );
  rings.rotation.x = 1.12;
  planets[5].add(rings);
  const solar = new T.Group();
  bodies.add(solar);
  const sun = new T.Mesh(
    new T.SphereGeometry(0.34, 64, 40),
    new T.MeshBasicMaterial({ map: texture("sun"), color: "#ffe7bd" }),
  );
  solar.add(sun);
  const orbitRotation = new T.Euler(0.68, 0, 0);
  const orbitLines = PLANETS.map((data) => {
    const points = Array.from({ length: 200 }, (_, i) =>
      new T.Vector3(
        Math.cos((i / 200) * Math.PI * 2) * data.radius,
        0,
        Math.sin((i / 200) * Math.PI * 2) * data.radius,
      ).applyEuler(orbitRotation),
    );
    const line = new T.LineLoop(
      new T.BufferGeometry().setFromPoints(points),
      new T.LineBasicMaterial({
        color: "#7a8e9d",
        transparent: true,
        opacity: 0.23,
      }),
    );
    solar.add(line);
    return line;
  });
  const orbital = new T.Group();
  bodies.add(orbital);
  const sats = Array.from({ length: 3 }, (_, i) => {
    const plane = new T.Group();
    plane.rotation.set(0.35 + i * 0.6, 0, i * 0.9);
    orbital.add(plane);
    const r = 1.73 + i * 0.17;
    const line = new T.LineLoop(
      new T.BufferGeometry().setFromPoints(
        Array.from(
          { length: 180 },
          (_, j) =>
            new T.Vector3(
              Math.cos((j / 180) * Math.PI * 2) * r,
              0,
              Math.sin((j / 180) * Math.PI * 2) * r,
            ),
        ),
      ),
      new T.LineBasicMaterial({
        color: "#7996aa",
        transparent: true,
        opacity: 0.22,
      }),
    );
    plane.add(line);
    const sat = createSatellite();
    plane.add(sat);
    return { sat, line, r };
  });
  const galaxy = createGalaxy(1),
    companion = createGalaxy(89),
    remote = createGalaxy(167);
  root.add(galaxy.root, companion.root, remote.root);
  const veil = createCosmicVeil();
  root.add(veil.mesh);
  const stars = new Float32Array(1800 * 3);
  let seed = 49;
  for (let i = 0; i < stars.length; i++) {
    seed = (seed * 16807) % 2147483647;
    stars[i] = (seed / 2147483647 - 0.5) * 28;
  }
  const sg = new T.BufferGeometry();
  sg.setAttribute("position", new T.BufferAttribute(stars, 3));
  const field = new T.Points(
    sg,
    new T.PointsMaterial({
      color: "#92b4d1",
      size: 0.012,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    }),
  );
  root.add(field);
  return {
    root,
    update: (progress: number, time: number, mobile: boolean) => {
      const p = T.MathUtils.clamp(progress, 0, 1) * 5;
      const multi = smooth(1.25, 2, p),
        system = smooth(2.12, 3, p),
        wide = smooth(3.12, 4, p),
        inter = smooth(4.05, 5, p);
      root.position.set(
        mobile ? 0 : 1.03 - system * (1 - wide) * 0.25,
        mobile ? 0.75 : 0.08,
        0,
      );
      root.scale.setScalar(mobile ? 0.64 : 1);
      bodies.scale.setScalar(
        (1 - system * (mobile ? 0.46 : 0.4)) * (1 - wide * 0.9999),
      );
      bodies.visible = wide < 0.9999;
      const solarAppear = smooth(2.05, 2.8, p);
      solar.visible = solarAppear > 0.001;
      sun.scale.setScalar(solarAppear);
      sun.rotation.y = time * 0.015;
      orbitLines.forEach(
        (line) => (line.material.opacity = 0.22 * solarAppear),
      );
      planets.forEach((body, i) => {
        const data = PLANETS[i],
          a = data.phase + (time * 0.025) / Math.pow(i + 1, 0.7);
        const destination = new T.Vector3(
          Math.cos(a) * data.radius,
          0,
          Math.sin(a) * data.radius,
        ).applyEuler(orbitRotation);
        if (i === 2) {
          body.position.set(-multi * 0.88, 0, 0).lerp(destination, system);
          body.scale.setScalar(
            T.MathUtils.lerp(1.43 - multi * 0.63, data.size, system),
          );
        } else if (i === 3) {
          body.position.set(1.13, 0.08, 0.15).lerp(destination, system);
          body.scale.setScalar(
            T.MathUtils.lerp(0.54 * multi, data.size, system),
          );
        } else {
          body.position.copy(destination);
          body.scale.setScalar(data.size * solarAppear);
        }
        body.rotation.set(
          0,
          time * 0.025 + (i === 2 ? 3.2 : 0),
          i === 2 ? 0.14 : 0.05,
        );
        body.visible = body.scale.x > 0.001;
      });
      clouds.rotation.y = time * 0.006;
      const orbitalAmount = smooth(0.15, 0.8, p) * (1 - smooth(1.15, 1.9, p));
      orbital.visible = orbitalAmount > 0.001;
      orbital.position.copy(earth.position);
      sats.forEach(({ sat, line, r }, i) => {
        const a = time * (0.08 + i * 0.02) + i * 2.1 + 1.8;
        sat.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
        sat.scale.setScalar((i === 0 ? 0.19 : 0.11) * orbitalAmount);
        sat.rotation.set(0.3, a + 0.5, 0.3);
        line.material.opacity = 0.18 * orbitalAmount;
      });
      galaxy.root.rotation.set(0.64 + inter * 0.17, -0.12, 0.18 + time * 0.008);
      galaxy.root.scale.setScalar(0.12 + wide * (0.66 - inter * 0.14));
      galaxy.root.position.set(inter * 0.35, -inter * 0.26, -wide * 0.3);
      galaxy.fade(smooth(3.05, 3.9, p));
      companion.root.position.set(-1.6, 1.15, -1.7);
      companion.root.rotation.set(0.28, -0.5, -0.65 + time * 0.006);
      companion.root.scale.setScalar(0.38);
      companion.fade(inter * 0.9);
      remote.root.position.set(1.9, 1.32, -3);
      remote.root.rotation.set(1.1, 0.5, 0.4);
      remote.root.scale.setScalar(0.24);
      remote.fade(inter * 0.6);
      veil.update(inter, time);
      field.rotation.y = time * 0.002;
    },
  };
}
