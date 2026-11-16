import * as T from "three";

export function superIntelligence(root: T.Group) {
  const network = new T.Group();
  root.add(network);
  let seed = 71;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const positions: number[] = [],
    phases: number[] = [],
    colors: number[] = [],
    edges: number[] = [];
  const v = (x = 0, y = 0, z = 0) => new T.Vector3(x, y, z);
  // Nested neural arborizations occupy a volume. Signals follow the branches.
  for (let arm = 0; arm < 160; arm++) {
    const y = 1 - (2 * (arm + 0.5)) / 160,
      a = arm * Math.PI * (3 - Math.sqrt(5)),
      r = Math.sqrt(1 - y * y);
    const direction = v(Math.cos(a) * r, y, Math.sin(a) * r);
    const tangent = v(-direction.z, 0.2, direction.x).normalize();
    let last = direction.clone().multiplyScalar(0.16);
    for (let j = 0; j < 45; j++) {
      const f = j / 44,
        length = 0.18 + f * (0.85 + random() * 0.22);
      const point = direction
        .clone()
        .multiplyScalar(length)
        .addScaledVector(tangent, Math.sin(f * 9 + arm) * f * 0.14);
      point.y *= 0.91;
      point.x *= 1.06;
      positions.push(...point.toArray());
      phases.push(f + arm * 0.17);
      colors.push(1, 0.36 + f * 0.38, 0.07 + f * 0.23);
      edges.push(...last.toArray(), ...point.toArray());
      if (j % 4 === 0 && j > 15) {
        const side = point
          .clone()
          .addScaledVector(tangent, (random() - 0.5) * 0.3)
          .addScaledVector(direction, 0.1);
        edges.push(...point.toArray(), ...side.toArray());
        for (let k = 0; k < 4; k++) {
          const tip = side
            .clone()
            .add(
              v(
                (random() - 0.5) * 0.12,
                (random() - 0.5) * 0.12,
                (random() - 0.5) * 0.12,
              ),
            );
          edges.push(...side.toArray(), ...tip.toArray());
          positions.push(...tip.toArray());
          phases.push(f + arm * 0.17 + k * 0.1);
          colors.push(1, 0.6, 0.23);
        }
      }
      last = point;
    }
  }
  const eg = new T.BufferGeometry();
  eg.setAttribute("position", new T.Float32BufferAttribute(edges, 3));
  network.add(
    new T.LineSegments(
      eg,
      new T.LineBasicMaterial({
        color: new T.Color("#ffc078").multiplyScalar(1.8),
        transparent: true,
        opacity: 0.55,
        blending: T.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    ),
  );
  const pg = new T.BufferGeometry();
  pg.setAttribute("position", new T.Float32BufferAttribute(positions, 3));
  pg.setAttribute("phase", new T.Float32BufferAttribute(phases, 1));
  pg.setAttribute("color", new T.Float32BufferAttribute(colors, 3));
  const pointsMaterial = new T.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: T.AdditiveBlending,
    vertexShader: `attribute float phase;uniform float time;varying vec3 tint;varying float pulse;void main(){tint=color;pulse=pow(.5+.5*sin(phase*12.-time*1.7),12.);vec4 p=modelViewMatrix*vec4(position,1.);gl_PointSize=(1.3+pulse*3.)*6./-p.z;gl_Position=projectionMatrix*p;}`,
    fragmentShader: `varying vec3 tint;varying float pulse;void main(){float r=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(tint*(1.+pulse),pow(max(0.,1.-r),2.)*(.35+pulse*.65));}`,
  });
  network.add(new T.Points(pg, pointsMaterial));
  const coreMat = new T.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: T.AdditiveBlending,
    vertexShader: `varying vec3 p,n,e;void main(){p=position;n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);e=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying vec3 p,n,e;uniform float time;void main(){float f=pow(1.-abs(dot(normalize(n),normalize(e))),2.);float cells=pow(abs(sin(p.x*65.+time*.2)*cos(p.y*57.)*sin(p.z*71.)),3.);gl_FragColor=vec4(1.,.48+cells*.4,.12+cells*.4,.18+f*.65+cells*.5);}`,
  });
  network.add(new T.Mesh(new T.SphereGeometry(0.28, 64, 40), coreMat));
  const orbitals: T.Group[] = [];
  for (let layer = 0; layer < 4; layer++) {
    const group = new T.Group();
    group.rotation.set(layer * 0.62, 0.2 + layer * 0.45, layer * 0.4);
    root.add(group);
    orbitals.push(group);
    const radius = 1.28 + layer * 0.11;
    for (let arc = 0; arc < 5; arc++) {
      const start = (arc * Math.PI * 2) / 5,
        end = start + 0.8;
      const curve = new T.EllipseCurve(
        0,
        0,
        radius,
        radius,
        start,
        end,
        false,
        0,
      );
      const g = new T.BufferGeometry().setFromPoints(curve.getPoints(80));
      group.add(
        new T.Line(
          g,
          new T.LineBasicMaterial({
            color: layer % 2 ? "#ae773c" : "#f8c17a",
            transparent: true,
            opacity: 0.55,
            blending: T.AdditiveBlending,
            depthWrite: false,
          }),
        ),
      );
    }
    const ticks: number[] = [];
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * Math.PI * 2,
        r2 = radius + (i % 10 === 0 ? 0.045 : 0.012);
      ticks.push(
        Math.cos(a) * radius,
        Math.sin(a) * radius,
        0,
        Math.cos(a) * r2,
        Math.sin(a) * r2,
        0,
      );
    }
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute(ticks, 3));
    group.add(
      new T.LineSegments(
        g,
        new T.LineBasicMaterial({
          color: "#d3a569",
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
          blending: T.AdditiveBlending,
        }),
      ),
    );
  }
  root.rotation.set(0.06, -0.2, 0);
  root.scale.setScalar(1.13);
  return (time: number) => {
    pointsMaterial.uniforms.time.value = time;
    coreMat.uniforms.time.value = time;
    network.rotation.y = time * 0.025;
    orbitals.forEach(
      (o, i) => (o.rotation.z = i * 0.4 + time * (i % 2 ? -0.018 : 0.022)),
    );
  };
}
