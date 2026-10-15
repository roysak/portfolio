import * as THREE from 'three';

export interface MaterialSettings {
  color: string;
  roughness: number;
  metalness: number;
  specular: number;
  transmission: number;
  frost: number;
  subsurface: number;
  thickness: number;
  ior: number;
  clearcoat: number;
}

const base: MaterialSettings = {
  color: '#a3243d', roughness: 0.28, metalness: 0, specular: 0.8,
  transmission: 0, frost: 0, subsurface: 0, thickness: 1.2, ior: 1.5, clearcoat: 0.35,
};
export const presets: Record<string, MaterialSettings> = {
  Ceramic: { ...base, color: '#5c1725' },
  Chrome: { ...base, color: '#8f8578', roughness: 0.16, metalness: 1, clearcoat: 0.6 },
  Glass: { ...base, color: '#e7e1e9', roughness: 0.03, transmission: 1, clearcoat: 1 },
  Frosted: { ...base, color: '#ff990a', roughness: 0.08, transmission: 0.95, frost: 0.65, subsurface: 0.75, specular: 0.14, ior: 1.50, clearcoat: 0.0 },
  Wax: { ...base, color: '#cb882a', roughness: 0.45, subsurface: 0.85, clearcoat: 0.1 },
};
export function getThemePresets(): Record<string, MaterialSettings> {
  if (typeof document === 'undefined') return presets;
  const tokens = getComputedStyle(document.documentElement);
  const read = (token: string, fallback: string) => tokens.getPropertyValue(token).trim() || fallback;
  const plum = read('--plum', presets.Frosted.color);
  const colors: Record<string, string> = {
    Ceramic: read('--ceramic', presets.Ceramic.color),
    Chrome: read('--bone-3', presets.Chrome.color),
    Glass: `#${new THREE.Color(plum).lerp(new THREE.Color('#ffffff'), 0.7).getHexString()}`,
    Frosted: read('--frosted', presets.Frosted.color),
    Wax: read('--wax', presets.Wax.color),
  };
  return Object.fromEntries(Object.entries(presets).map(([name, settings]) => [name, { ...settings, color: colors[name] }]));
}
export const shapeNames = ['Square', 'Sphere', 'Cone', 'Asterisk'];
export const initialMaterials = (palette = presets) => [palette.Chrome, palette.Glass, palette.Ceramic, palette.Frosted].map(p => ({ ...p }));

export function createMaterial() {
  const material = new THREE.MeshPhysicalMaterial();
  const uniforms = {
    uSubsurface: { value: 0 }, uFrost: { value: 0 },
    uLayeredTransmission: { value: false },
    uTransmissionScene: { value: null as THREE.Texture | null },
    uTransmissionSize: { value: new THREE.Vector2(1, 1) },
  };
  material.userData.playgroundUniforms = uniforms;
  // A view/light-dependent thin scattering approximation, plus procedural microtexture.
  // This is an artistic real-time SSS approximation, not volumetric path tracing.
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vSurfacePosition;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvSurfacePosition = position;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
      uniform float uSubsurface;
      uniform float uFrost;
      varying vec3 vSurfacePosition;
    `).replace('#include <transmission_pars_fragment>', `
      uniform bool uLayeredTransmission;
      uniform sampler2D uTransmissionScene;
      uniform vec2 uTransmissionSize;
      ${THREE.ShaderChunk.transmission_pars_fragment
        .replace('log2( transmissionSamplerSize.x )', 'log2( uLayeredTransmission ? uTransmissionSize.x : transmissionSamplerSize.x )')
        .replace('return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );',
          'if ( uLayeredTransmission ) return textureBicubic( uTransmissionScene, fragCoord.xy, lod );\nreturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );')}
    `).replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      vec3 grain = sin(vSurfacePosition.yzx * 185.0) * cos(vSurfacePosition.zxy * 153.0);
      normal = normalize(normal + grain * uFrost * 0.075);
    `).replace('#include <opaque_fragment>', `
      float rimScatter = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 2.0);
      float wrappedLight = pow(max(dot(-normal, normalize(vec3(-0.6, 0.8, -0.4))) * 0.5 + 0.5, 0.0), 2.0);
      outgoingLight += diffuse * uSubsurface * (0.28 * wrappedLight + 0.65 * rimScatter) * (1.0 - metalness);
      #include <opaque_fragment>
    `);
  };
  material.customProgramCacheKey = () => 'material-playground-v2';
  return material;
}

export function updateMaterial(material: THREE.MeshPhysicalMaterial, settings: MaterialSettings) {
  const recompile = (material.transmission > 0) !== (settings.transmission > 0)
    || (material.clearcoat > 0) !== (settings.clearcoat > 0);
  material.color.set(settings.color);
  material.roughness = Math.min(1, settings.roughness + settings.frost * 0.65);
  material.metalness = settings.metalness;
  material.specularIntensity = settings.specular;
  material.transmission = settings.transmission;
  material.thickness = settings.thickness;
  material.ior = settings.ior;
  material.clearcoat = settings.clearcoat;
  material.clearcoatRoughness = settings.frost * 0.5;
  material.attenuationColor.set(settings.color);
  material.attenuationDistance = 4;
  material.envMapIntensity = 1.3;
  material.userData.playgroundUniforms.uSubsurface.value = settings.subsurface;
  material.userData.playgroundUniforms.uFrost.value = settings.frost;
  if (recompile) material.needsUpdate = true;
}
