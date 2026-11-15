import * as THREE from 'three';

/** Capture glass back-to-front: each layer samples already resolved layers behind it.
 * Ordering uses mesh centers, so intersecting volumes remain an approximation.
 */
export function createTransmissionRenderer(
  renderer: THREE.WebGLRenderer,
  objects: { mesh: THREE.Mesh; material: THREE.MeshPhysicalMaterial }[],
) {
  const targets = new Map<THREE.Mesh, THREE.WebGLRenderTarget>();
  const size = new THREE.Vector2();
  const position = new THREE.Vector3();
  return {
    render(scene: THREE.Scene, camera: THREE.Camera) {
      scene.updateMatrixWorld();
      camera.updateMatrixWorld();
      const layers = objects.filter(({ mesh, material }) => mesh.visible && material.transmission > 0)
        .map(object => ({ ...object, depth: position.setFromMatrixPosition(object.mesh.matrixWorld).applyMatrix4(camera.matrixWorldInverse).z }))
        .sort((a, b) => a.depth - b.depth);
      objects.forEach(({ material }) => { material.userData.playgroundUniforms.uLayeredTransmission.value = false; });
      if (layers.length > 1) {
        renderer.getDrawingBufferSize(size);
        const scale = Math.min(1, 1024 / Math.max(size.x, size.y));
        size.multiplyScalar(scale).floor().max(new THREE.Vector2(1, 1));
        const previousTarget = renderer.getRenderTarget();
        const previousToneMapping = renderer.toneMapping;
        layers.forEach(({ mesh }) => { mesh.visible = false; });
        try {
          renderer.toneMapping = THREE.NoToneMapping;
          for (const { mesh, material } of layers) {
            let target = targets.get(mesh);
            if (!target) {
              target = new THREE.WebGLRenderTarget(size.x, size.y, {
                type: renderer.extensions.has('EXT_color_buffer_float') ? THREE.HalfFloatType : THREE.UnsignedByteType,
                generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter,
                colorSpace: THREE.LinearSRGBColorSpace,
              });
              targets.set(mesh, target);
            }
            target.setSize(size.x, size.y);
            renderer.setRenderTarget(target);
            renderer.render(scene, camera);
            const uniforms = material.userData.playgroundUniforms;
            uniforms.uTransmissionScene.value = target.texture;
            uniforms.uTransmissionSize.value.copy(size);
            uniforms.uLayeredTransmission.value = true;
            mesh.visible = true;
          }
        } finally {
          layers.forEach(({ mesh }) => { mesh.visible = true; });
          renderer.setRenderTarget(previousTarget);
          renderer.toneMapping = previousToneMapping;
        }
      }
      renderer.render(scene, camera);
    },
    dispose() {
      targets.forEach(target => target.dispose());
      targets.clear();
    },
  };
}
