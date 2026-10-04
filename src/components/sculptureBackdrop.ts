import * as THREE from 'three';

/** The original two fine orbit rings, rendered behind the glass as scene content. */
export function createSculptureBackdrop() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
  const mesh = new THREE.Mesh(geometry, material);
  const direction = new THREE.Vector3();
  const resize = (width: number, height: number, artWidth: number) => {
    const ratio = 2;
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.fillStyle = '#f5f3ed'; context.fillRect(0, 0, width, height);
    context.strokeStyle = '#dbd9cc'; context.lineWidth = 1;
    const inset = (width - artWidth) / 2;
    context.beginPath();
    context.ellipse(inset + artWidth * 0.5, height * 0.49, artWidth * 0.47, height * 0.35, -Math.PI / 6, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.ellipse(inset + artWidth * 0.505, height * 0.49, artWidth * 0.325, height * 0.47, 35 * Math.PI / 180, 0, Math.PI * 2);
    context.stroke();
    texture.needsUpdate = true;
  };
  const update = (camera: THREE.PerspectiveCamera) => {
    camera.getWorldDirection(direction);
    mesh.position.copy(direction).multiplyScalar(3.5);
    mesh.quaternion.copy(camera.quaternion);
    const height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.length() + 3.5);
    mesh.scale.set(height * camera.aspect, height, 1);
  };
  return { mesh, resize, update, dispose: () => { geometry.dispose(); material.dispose(); texture.dispose(); } };
}
