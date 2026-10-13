import * as THREE from 'three';
import { assetUrl } from '../../utils/assetUrl';

/** An opaque scene surface makes the drawing visible to the glass transmission pass. */
export function createBlueprint(scene: THREE.Scene) {
  let disposed = false;
  const uniforms = {
    drawing: { value: null as THREE.Texture | null },
    ready: { value: 0 },
    paper: { value: new THREE.Color() },
    ink: { value: new THREE.Color() },
    contrast: { value: 0.32 },
    aspect: { value: 3 },
    imageAspect: { value: 3 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    toneMapped: false,
    vertexShader: `
      varying vec2 drawingUv;
      void main() {
        drawingUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D drawing;
      uniform float ready, contrast, aspect, imageAspect;
      uniform vec3 paper, ink;
      varying vec2 drawingUv;
      void main() {
        // Contain the entire sheet on narrow screens, without stretching or cropping.
        vec2 uv = drawingUv - 0.5;
        uv *= vec2(max(aspect / imageAspect, 1.0), max(imageAspect / aspect, 1.0));
        uv = uv / 0.94 + 0.5;
        float stroke = 0.0;
        if (ready > 0.5 && all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)))) {
          vec4 sampleColor = texture2D(drawing, uv);
          float luminance = dot(sampleColor.rgb, vec3(0.2126, 0.7152, 0.0722));
          stroke = smoothstep(0.025, 0.8, 1.0 - luminance) * sampleColor.a;
        }
        gl_FragColor = vec4(mix(paper, ink, stroke * contrast), 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  const geometry = new THREE.PlaneGeometry(1, 1);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -3.4;
  scene.add(mesh);
  const texture = new THREE.TextureLoader().load(assetUrl('/img/material-playground/shapes-blueprint.png'), loaded => {
    if (disposed) { loaded.dispose(); return; }
    uniforms.drawing.value = loaded;
    uniforms.imageAspect.value = loaded.image.width / loaded.image.height;
    uniforms.ready.value = 1;
  }, undefined, error => console.warn('Blueprint background could not be loaded', error));
  const syncTheme = () => {
    const tokens = getComputedStyle(document.documentElement);
    const dark = document.documentElement.dataset.mode === 'code';
    uniforms.paper.value.set(tokens.getPropertyValue('--ink').trim() || '#eef0ef');
    uniforms.ink.value.set(tokens.getPropertyValue(dark ? '--plum' : '--bone-2').trim() || '#5b5248');
    uniforms.contrast.value = dark ? 0.16 : 0.62;
  };
  const observer = new MutationObserver(syncTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });
  syncTheme();
  return {
    resize(camera: THREE.PerspectiveCamera) {
      const height = 2.5 * (camera.position.z - mesh.position.z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      mesh.scale.set(height * camera.aspect, height, 1);
      uniforms.aspect.value = camera.aspect;
    },
    dispose() {
      disposed = true;
      observer.disconnect();
      scene.remove(mesh);
      texture.dispose(); geometry.dispose(); material.dispose();
    },
  };
}
