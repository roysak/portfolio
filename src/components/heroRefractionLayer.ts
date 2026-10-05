import * as THREE from 'three';
import { toCanvas } from 'html-to-image';

/** The visible hero DOM, captured for screen-space refraction through the glass. */
export function createHeroRefractionLayer(hero: HTMLElement) {
  const fallback = document.createElement('canvas');
  fallback.width = fallback.height = 2;
  const context = fallback.getContext('2d');
  if (context) { context.fillStyle = '#f5f3ed'; context.fillRect(0, 0, 2, 2); }
  const makeTexture = (image: HTMLCanvasElement) => {
    const texture = new THREE.CanvasTexture(image);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  };
  const uniform = { value: makeTexture(fallback) };
  let disposed = false;
  let pending: number | null = null;
  let captureNumber = 0;
  const capture = async () => {
    const current = ++captureNumber;
    await document.fonts.ready;
    if (disposed || current !== captureNumber) return;
    try {
      const image = await toCanvas(hero, {
        pixelRatio: 1,
        backgroundColor: '#f5f3ed',
        skipFonts: true,
        filter: node => !node.classList?.contains('sculpture-canvas') && !node.classList?.contains('sculpture-toolbar'),
      });
      if (disposed || current !== captureNumber) return;
      const previous = uniform.value;
      uniform.value = makeTexture(image);
      previous.dispose();
    } catch (error) {
      // Keep the neutral fallback if a browser blocks DOM-to-image capture.
      if (!disposed) console.warn('Hero refraction snapshot unavailable', error);
    }
  };
  const scheduleCapture = () => {
    if (pending !== null) window.clearTimeout(pending);
    pending = window.setTimeout(() => { pending = null; void capture(); }, 100);
  };
  const dispose = () => {
    disposed = true;
    if (pending !== null) window.clearTimeout(pending);
    uniform.value.dispose();
  };
  return { uniform, scheduleCapture, dispose };
}
