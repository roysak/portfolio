import * as THREE from 'three';

export const defaultGlass = {
  color: '#fff0e5', transmission: 1, roughness: 0.08, thickness: 0.65,
  ior: 1.5, dispersion: 0.12, attenuationColor: '#ffb98a', attenuationDistance: 4,
  reflection: 1, environmentIntensity: 1.2, clearcoat: 0.3, metalness: 0,
  environment: 'studio', environmentRotation: 0, backdrop: false,
  fresnel: 0, fresnelPower: 4, fresnelColor: '#ffffff',
  scattering: 0, scatteringPower: 3, scatteringDistortion: 0.3, scatteringColor: '#ffb98a',
};
export type GlassSettings = typeof defaultGlass;
export type NumericSetting = { [K in keyof GlassSettings]: GlassSettings[K] extends number ? K : never }[keyof GlassSettings];
export const glassPresets: Record<string, Partial<GlassSettings>> = {
  Amber: {},
  Glass: { color: '#ffffff', metalness: 0, transmission: 1, attenuationColor: '#ffffff', roughness: 0.03, thickness: 0.65, dispersion: 0.18, attenuationDistance: 10, clearcoat: 0, environmentIntensity: 0.8, fresnel: 0 },
  Frosted: { color: '#e8f3ef', roughness: 0.42, attenuationColor: '#b6dbd1', attenuationDistance: 2.5, scattering: 0.28, scatteringColor: '#d8fff0' },
  Rose: { color: '#ffd3e3', attenuationColor: '#e689b6', attenuationDistance: 2, dispersion: 0.45, environment: 'sunset' },
  Chrome: { color: '#d5e0ed', metalness: 1, transmission: 0, roughness: 0.16, clearcoat: 0.8, fresnel: 0 },
  Ceramic: { color: '#da592e', transmission: 0, roughness: 0.3, clearcoat: 0.65, fresnel: 0.02 },
};

export const asteriskMaterials = ['Amber', 'Glass', 'Frosted', 'Rose', 'Chrome', 'Ceramic'].map(name => ({
  name, settings: { ...defaultGlass, ...glassPresets[name] },
}));

/** Analytic artistic additions to physical glass; scattering is a backlighting approximation. */
export function createGlassMaterial() {
  const material = new THREE.MeshPhysicalMaterial({ metalness: 0, transmission: 1, opacity: 1 });
  const uniforms = {
    uFresnel: { value: 0 }, uFresnelPower: { value: 4 }, uFresnelColor: { value: new THREE.Color() },
    uScattering: { value: 0 }, uScatteringPower: { value: 3 }, uScatteringDistortion: { value: 0.3 },
    uScatteringColor: { value: new THREE.Color() }, uScatterLight: { value: new THREE.Vector3(-3, 2, -4).normalize() },
  };
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>

      uniform float uFresnel;
      uniform float uFresnelPower;
      uniform vec3 uFresnelColor;
      uniform float uScattering;
      uniform float uScatteringPower;
      uniform float uScatteringDistortion;
      uniform vec3 uScatteringColor;
      uniform vec3 uScatterLight;`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', `
      float edge = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), uFresnelPower);
      outgoingLight += uFresnelColor * edge * uFresnel;
      vec3 scatterDirection = normalize(uScatterLight + normal * uScatteringDistortion);
      float scatterLobe = pow(clamp(dot(normalize(vViewPosition), -scatterDirection), 0.0, 1.0), uScatteringPower);
      float backlit = clamp(dot(-normal, uScatterLight) + 0.25, 0.0, 1.0);
      outgoingLight += uScatteringColor * uScattering * scatterLobe * backlit;
      #include <opaque_fragment>`);
  };
  material.customProgramCacheKey = () => 'portfolio-glass-v2-native-transmission';
  const apply = (s: GlassSettings) => {

    material.metalness = s.metalness;
    material.color.set(s.color); material.transmission = s.transmission; material.roughness = s.roughness;
    material.thickness = s.thickness; material.ior = s.ior; material.dispersion = s.dispersion;
    material.attenuationColor.set(s.attenuationColor); material.attenuationDistance = s.attenuationDistance;
    material.specularIntensity = s.reflection; material.clearcoat = s.clearcoat; material.clearcoatRoughness = s.roughness;
    uniforms.uFresnel.value = s.fresnel; uniforms.uFresnelPower.value = s.fresnelPower; uniforms.uFresnelColor.value.set(s.fresnelColor);
    uniforms.uScattering.value = s.scattering; uniforms.uScatteringPower.value = s.scatteringPower;
    uniforms.uScatteringDistortion.value = s.scatteringDistortion; uniforms.uScatteringColor.value.set(s.scatteringColor);
  };
  return { material, uniforms, apply };
}

/** Local HDR light cards: no remote HDRI request or licensing dependency. */
export function createEnvironment(renderer: THREE.WebGLRenderer, preset: string) {
  const palette = preset === 'sunset' ? ['#574348', '#ffd5ad', '#ff846c', '#a6b7ff']
    : preset === 'night' ? ['#121b31', '#abd9ff', '#8b8dff', '#f3a2d9']
    : ['#aaa79e', '#ffffff', '#e0edff', '#ffe2c2'];
  const room = new THREE.Scene();
  room.background = new THREE.Color(palette[0]);
  const geometry = new THREE.PlaneGeometry(1, 1);
  const materials: THREE.MeshBasicMaterial[] = [];
  const card = (color: string, intensity: number, position: [number, number, number], scale: [number, number]) => {
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide });
    materials.push(material);
    const plane = new THREE.Mesh(geometry, material); plane.position.set(...position); plane.scale.set(...scale, 1); plane.lookAt(0, 0, 0); room.add(plane);
  };
  card(palette[1], 5, [-4, 3, 3], [2, 6]);
  card(palette[2], 3, [4, 1, 1], [1.2, 7]);
  card(palette[3], 3, [0, 3, -4], [5, 2]);
  card(palette[2], 1.5, [1.5, 0, -5], [1.5, 7]);
  card('#30343b', 1, [-1.2, 0, -5], [0.9, 7]);
  card('#ffffff', 2, [0, 6, 0], [5, 3]);
  card('#181a20', 1, [0, -3, -4], [6, 3]);
  const generator = new THREE.PMREMGenerator(renderer);
  const target = generator.fromScene(room, 0.04, 0.1, 100, { size: 128 });
  generator.dispose(); geometry.dispose(); materials.forEach(material => material.dispose());
  return target;
}


