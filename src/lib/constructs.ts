import * as T from "three";

const V = (x = 0, y = 0, z = 0) => new T.Vector3(x, y, z);
const metal = (color: string, roughness = 0.3) =>
  new T.MeshPhysicalMaterial({
    color,
    metalness: 0.93,
    roughness,
    clearcoat: 0.2,
  });
function mesh(
  parent: T.Object3D,
  geometry: T.BufferGeometry,
  material: T.Material,
  position = V(),
) {
  const m = new T.Mesh(geometry, material);
  m.position.copy(position);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
function beam(
  p: T.Object3D,
  m: T.Material,
  a: T.Vector3,
  b: T.Vector3,
  r: number,
) {
  const o = mesh(
    p,
    new T.CylinderGeometry(r, r, a.distanceTo(b), 6),
    m,
    a.clone().add(b).multiplyScalar(0.5),
  );
  o.quaternion.setFromUnitVectors(V(0, 1), b.clone().sub(a).normalize());
  return o;
}
function triangle(a: T.Vector3, b: T.Vector3, c: T.Vector3) {
  const g = new T.BufferGeometry();
  g.setAttribute(
    "position",
    new T.Float32BufferAttribute(
      [...a.toArray(), ...b.toArray(), ...c.toArray()],
      3,
    ),
  );
  g.setAttribute("uv", new T.Float32BufferAttribute([0, 0, 1, 0, 0.5, 1], 2));
  g.computeVertexNormals();
  return g;
}
function glow(color: string, power: number, opacity: number) {
  return new T.ShaderMaterial({
    uniforms: {
      color: { value: new T.Color(color) },
      power: { value: power },
      opacity: { value: opacity },
    },
    vertexShader:
      "varying vec3 n;varying vec3 eye;void main(){n=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.);eye=-p.xyz;gl_Position=projectionMatrix*p;}",
    fragmentShader:
      "varying vec3 n;varying vec3 eye;uniform vec3 color;uniform float power;uniform float opacity;void main(){float f=pow(1.-abs(dot(normalize(n),normalize(eye))),power);gl_FragColor=vec4(color,f*opacity);}",
    transparent: true,
    depthWrite: false,
    blending: T.AdditiveBlending,
    side: T.DoubleSide,
  });
}

export function dysonSphere(root: T.Group) {
  const graphite = metal("#26343d", 0.4),
    rim = metal("#9e9583", 0.3),
    solar = new T.MeshPhysicalMaterial({
      color: "#152533",
      metalness: 0.82,
      roughness: 0.24,
      side: T.DoubleSide,
    });
  const frame = new T.Group();
  root.add(frame);
  const solarMap =
    typeof document !== "undefined"
      ? new T.TextureLoader().load("/media/motion/sun.jpg", () => {
          root.userData.needsRender = true;
        })
      : null;
  if (solarMap) {
    solarMap.colorSpace = T.SRGBColorSpace;
    solarMap.anisotropy = 4;
  }
  const sun = mesh(
    root,
    new T.SphereGeometry(0.63, 96, 64),
    new T.MeshBasicMaterial({
      map: solarMap,
      color: "#fff0c9",
      toneMapped: false,
    }),
  );
  sun.castShadow = false;
  sun.receiveShadow = false;
  mesh(
    root,
    new T.SphereGeometry(0.654, 64, 40),
    glow("#ffb349", 2.4, 0.7),
  ).castShadow = false;
  mesh(
    root,
    new T.SphereGeometry(0.79, 64, 40),
    glow("#fc8128", 5, 0.09),
  ).castShadow = false;
  root.add(new T.PointLight("#ffbf78", 5.5, 5, 2));
  const geo = new T.IcosahedronGeometry(1.52, 3),
    a = geo.getAttribute("position"),
    traces: number[] = [],
    seams = new Set<string>();
  let panels = 0;
  for (let i = 0; i < a.count; i += 3) {
    const vertices = [0, 1, 2].map((k) => V().fromBufferAttribute(a, i + k)),
      center = vertices[0]
        .clone()
        .add(vertices[1])
        .add(vertices[2])
        .divideScalar(3);
    // An open, irregular front quadrant reveals the Sun and the inward-facing collectors.
    if (center.z > 0.25 && center.x > -0.92 && center.y < 1.18) continue;
    if (center.y < -0.95 && i % 7 === 0) continue;
    const outer = vertices.map((v) => v.clone().lerp(center, 0.09)),
      inner = vertices.map((v) =>
        v.clone().lerp(center, 0.22).multiplyScalar(1.003),
      );
    mesh(
      frame,
      triangle(...(outer as [T.Vector3, T.Vector3, T.Vector3])),
      graphite,
    );
    mesh(
      frame,
      triangle(...(inner as [T.Vector3, T.Vector3, T.Vector3])),
      solar,
    );
    for (let k = 0; k < 3; k++) {
      const u = vertices[k],
        v = vertices[(k + 1) % 3],
        key = [
          u
            .toArray()
            .map((n) => n.toFixed(3))
            .join(),
          v
            .toArray()
            .map((n) => n.toFixed(3))
            .join(),
        ]
          .sort()
          .join("|");
      if (!seams.has(key)) {
        seams.add(key);
        beam(frame, rim, u, v, 0.008);
      }
      for (let line = 1; line < 5; line++) {
        const p = inner[k].clone().lerp(inner[(k + 1) % 3], line / 5),
          q = inner[k].clone().lerp(inner[(k + 2) % 3], line / 5);
        traces.push(...p.toArray(), ...q.toArray());
      }
    }
    if (panels++ % 6 === 0) {
      const node = mesh(
        frame,
        new T.BoxGeometry(0.035, 0.035, 0.025),
        rim,
        center.clone().multiplyScalar(1.02),
      );
      node.lookAt(center.clone().multiplyScalar(2));
    }
  }
  geo.dispose();
  const lines = new T.BufferGeometry();
  lines.setAttribute("position", new T.Float32BufferAttribute(traces, 3));
  frame.add(
    new T.LineSegments(
      lines,
      new T.LineBasicMaterial({
        color: "#7c9caa",
        transparent: true,
        opacity: 0.3,
      }),
    ),
  );
  const orbits: T.Group[] = [];
  for (let j = 0; j < 2; j++) {
    const orbit = new T.Group();
    orbit.rotation.set(j ? 0.95 : 0.3, j ? 0.25 : 0, j ? -0.3 : 0.5);
    root.add(orbit);
    orbits.push(orbit);
    mesh(orbit, new T.TorusGeometry(1.72 + j * 0.1, 0.012, 8, 160), rim);
    for (let k = 0; k < 36; k++) {
      const angle = (k / 36) * Math.PI * 2,
        r = 1.72 + j * 0.1;
      const tile = mesh(
        orbit,
        new T.BoxGeometry(0.12, 0.06, 0.014),
        k % 5 ? solar : rim,
        V(Math.cos(angle) * r, Math.sin(angle) * r, 0),
      );
      tile.rotation.z = angle + Math.PI / 2;
    }
  }
  // Prominence arches share the star's equatorial frame and remain inside the collector shell.
  const flare = new T.MeshBasicMaterial({
    color: "#fc9e40",
    transparent: true,
    opacity: 0.5,
    blending: T.AdditiveBlending,
    depthWrite: false,
  });
  for (let i = 0; i < 9; i++) {
    const pts: T.Vector3[] = [];
    for (let j = 0; j <= 24; j++) {
      const t = (j / 24) * Math.PI;
      pts.push(
        V(
          Math.cos(t) * 0.12,
          0.63 + Math.sin(t) * (0.06 + (i % 3) * 0.025),
          Math.sin(t) * 0.02,
        ),
      );
    }
    const p = mesh(
      sun,
      new T.TubeGeometry(new T.CatmullRomCurve3(pts), 24, 0.004, 5, false),
      flare,
    );
    p.rotation.z = i * 0.73;
    p.rotation.y = i * 0.91;
    p.castShadow = false;
  }
  root.rotation.set(0.16, -0.14, -0.13);
  root.scale.setScalar(0.87);
  return (time: number) => {
    sun.rotation.y = time * 0.024;
    frame.rotation.y = Math.sin(time * 0.055) * 0.16;
    orbits.forEach(
      (o, i) => (o.rotation.z = (i ? -0.3 : 0.5) + time * (i ? -0.018 : 0.014)),
    );
  };
}
