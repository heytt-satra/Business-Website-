import * as T from "three";
const vertex = `varying vec2 uvP; void main(){uvP=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const noise = `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=mat2(1.6,1.2,-1.2,1.6)*p;a*=.5;}return v;}`;

// Layered procedural dust and individual stars, with no photographic backdrop.
export function createGalaxy(seed = 0) {
  const root = new T.Group();
  const material = new T.ShaderMaterial({
    uniforms: { opacity: { value: 1 }, seed: { value: seed } },
    vertexShader: vertex,
    fragmentShader: `varying vec2 uvP;uniform float opacity;uniform float seed;${noise}
void main(){
 vec2 p=(uvP-.5)*2.;float r=length(p);float a=atan(p.y,p.x);
 float grain=fbm(p*34.+seed);float dust=fbm(p*16.-seed);
 float spiral=a*3.-log(r+.04)*5.4+grain*2.2;
 float arm=pow(.5+.5*cos(spiral),5.);
 float envelope=exp(-r*3.8)*(1.-smoothstep(.66,1.,r));
 float core=exp(-r*r*125.);
 float filaments=pow(fbm(p*95.+seed),3.);
 vec3 warm=vec3(1.,.70,.38),blue=vec3(.20,.43,1.),rose=vec3(.92,.20,.47);
 vec3 col=mix(blue,rose,smoothstep(.48,.76,grain));
 col=mix(col,warm,exp(-r*5.));
 float density=(arm*.85+.14)*envelope*(.3+grain*1.4);
 density*=1.-smoothstep(.49,.74,dust)*.76;
 col=col*density*2.8+warm*core*1.5+vec3(.5,.65,1.)*filaments*arm*envelope*.5;
 gl_FragColor=vec4(col,clamp((density*1.7+core)*opacity,0.,.96));
}`,
    transparent: true,
    depthWrite: false,
    side: T.DoubleSide,
    blending: T.AdditiveBlending,
  });
  const disc = new T.Mesh(new T.PlaneGeometry(6.6, 6.6), material);
  root.add(disc);
  const haze = disc.clone();
  haze.material = material.clone();
  haze.material.uniforms.opacity.value = 0.25;
  haze.position.z = -0.09;
  haze.scale.setScalar(1.08);
  root.add(haze);
  let rng = 31 + seed;
  const random = () => {
    rng = (rng * 16807) % 2147483647;
    return (rng - 1) / 2147483646;
  };
  const positions: number[] = [],
    colors: number[] = [],
    sizes: number[] = [];
  for (let i = 0; i < 14000; i++) {
    const r = Math.pow(random(), 0.8) * 3.1;
    const a =
      ((i % 3) * Math.PI * 2) / 3 +
      Math.log(r / 3.3 + 0.04) * 1.8 +
      (random() - 0.5) * (0.24 + r * 0.08);
    positions.push(
      Math.cos(a) * r,
      Math.sin(a) * r,
      (random() - 0.5) * (0.14 + Math.exp(-r * 3) * 0.3),
    );
    const c = new T.Color().setRGB(
      1 - r * 0.18,
      0.78 - r * 0.05,
      0.52 + r * 0.15,
    );
    colors.push(c.r, c.g, c.b);
    sizes.push(0.45 + random() * 1.2);
  }
  const geometry = new T.BufferGeometry();
  geometry.setAttribute("position", new T.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new T.Float32BufferAttribute(colors, 3));
  geometry.setAttribute("size", new T.Float32BufferAttribute(sizes, 1));
  const stars = new T.Points(
    geometry,
    new T.ShaderMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      uniforms: { opacity: { value: 1 } },
      vertexShader: `attribute float size;varying vec3 tint;void main(){tint=color;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=clamp(size*9./-mv.z,1.,3.);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 tint;uniform float opacity;void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(tint,pow(max(0.,1.-d),3.)*.65*opacity);}`,
    }),
  );
  root.add(stars);
  return {
    root,
    fade: (alpha: number) => {
      material.uniforms.opacity.value = alpha;
      haze.material.uniforms.opacity.value = alpha * 0.25;
      stars.material.uniforms.opacity.value = alpha;
      root.visible = alpha > 0.001;
    },
  };
}

export function createCosmicVeil() {
  const material = new T.ShaderMaterial({
    uniforms: { time: { value: 0 }, opacity: { value: 0 } },
    vertexShader: vertex,
    fragmentShader: `varying vec2 uvP;uniform float time;uniform float opacity;${noise}
void main(){vec2 p=(uvP-.5)*2.;float r=length(p);float a=atan(p.y,p.x);
 vec2 bend=vec2(a*1.5+time*.008,log(r+.07)*1.6);
 float fil=fbm(bend*4.+fbm(p*6.));float veil=pow(fil,3.5)*(1.-smoothstep(.35,1.3,r));
 float arc=exp(-pow((r-.48-fbm(p*5.)*.06)*65.,2.));
 vec3 color=mix(vec3(.08,.22,.65),vec3(.60,.16,.43),fbm(p*3.+4.));
 color=color*veil*2.4+vec3(.34,.48,.75)*arc*.09;
 gl_FragColor=vec4(color,clamp((veil*2.+arc*.08)*opacity,0.,.8));}`,
    transparent: true,
    depthWrite: false,
    blending: T.AdditiveBlending,
  });
  const mesh = new T.Mesh(new T.PlaneGeometry(12, 9), material);
  mesh.position.z = -3;
  return {
    mesh,
    update: (opacity: number, time: number) => {
      material.uniforms.opacity.value = opacity;
      material.uniforms.time.value = time;
      mesh.visible = opacity > 0.001;
    },
  };
}
