import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { createPhysics } from './physics';
import { createBlueprint } from './blueprint';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createMaterial, updateMaterial, type MaterialSettings } from './materials';

function roundedConeGeometry() {
  // Revolve a closed profile with a filleted base and a soft, domed tip.
  const profile = new THREE.Path();
  profile.moveTo(0, -0.9);
  profile.lineTo(0.63, -0.9);
  profile.quadraticCurveTo(0.805, -0.9, 0.735, -0.737);
  profile.lineTo(0.09, 0.765);
  profile.quadraticCurveTo(0.049, 0.86, 0, 0.86);
  return new THREE.LatheGeometry(profile.getPoints(16), 64);
}

function asteriskGeometry() {
  const points: THREE.Vector2[] = [];
  // Six broad arms with concave valleys; round every corner before extrusion.
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    for (const [offset, radius] of [[-0.19, 0.94], [0.19, 0.94], [Math.PI / 6, 0.38]]) {
      points.push(new THREE.Vector2(Math.cos(angle + offset) * radius, Math.sin(angle + offset) * radius));
    }
  }
  const shape = new THREE.Shape();
  points.forEach((p, i) => {
    const before = p.clone().lerp(points[(i + points.length - 1) % points.length], 0.22);
    const after = p.clone().lerp(points[(i + 1) % points.length], 0.22);
    if (i === 0) shape.moveTo(before.x, before.y);
    else shape.lineTo(before.x, before.y);
    shape.quadraticCurveTo(p.x, p.y, after.x, after.y);
  });
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.36, bevelEnabled: true, bevelThickness: 0.09, bevelSize: 0.07, bevelSegments: 4, curveSegments: 8, steps: 1,
  });
  geometry.center();
  return geometry;
}

export function createPlayground(host: HTMLDivElement, onSelect: (index: number) => void, onError: () => void) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-label', 'Interactive 3D shapes. Ctrl + click a shape to edit its material on desktop. Drag a shape to move it.');
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentTarget = pmrem.fromScene(environment, 0.04);
  scene.environment = environmentTarget.texture;
  environment.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x696479, 2));
  const key = new THREE.DirectionalLight(0xffe9d5, 4);
  key.position.set(-3, 5, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xc3d9ff, 3);
  fill.position.set(4, 1, -3);
  scene.add(fill);

  const blueprint = createBlueprint(scene);

  const { world, objects: physicsObjects } = createPhysics();
  const geometries = [new RoundedBoxGeometry(1.5, 1.5, 1.0, 5, 0.2), new THREE.SphereGeometry(0.83, 48, 32), roundedConeGeometry(), asteriskGeometry()];
  const objects = geometries.map((geometry, i) => {
    const material = createMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const { body, home } = physicsObjects[i];
    return { mesh, material, body, home };
  });


  let selected = -1;
  let tool: 'move' | 'rotate' | 'depth' = 'move';
  let spinning = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const motionChange = () => { spinning = !motionQuery.matches; };
  motionQuery.addEventListener('change', motionChange);
  let active: { index: number; pointer: number; x: number; y: number; startX: number; startY: number; dragged: boolean; depth: boolean; startZ: number; rotate: boolean; offset: THREE.Vector3 } | null = null;
  const target = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const intersection = new THREE.Vector3();
  function project(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(dragPlane, intersection);
  }
  const down = (event: PointerEvent) => {
    if (active || event.button !== 0) return;
    project(event);
    const hit = raycaster.intersectObjects(objects.map(o => o.mesh))[0];
    if (!hit) return;
    event.preventDefault();
    const index = objects.findIndex(o => o.mesh === hit.object);
    const body = objects[index].body;
    dragPlane.constant = -body.position.z;
    project(event);
    target.copy(body.position);
    active = { index, pointer: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, dragged: false, depth: tool === 'depth' || event.altKey, startZ: body.position.z, rotate: tool === 'rotate' || event.shiftKey, offset: target.clone().sub(intersection) };
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = 'grabbing';
  };
  const move = (event: PointerEvent) => {
    project(event);
    if (!active) {
      canvas.style.cursor = raycaster.intersectObjects(objects.map(o => o.mesh)).length ? 'grab' : 'default';
      return;
    }
    if (active.pointer !== event.pointerId) return;
    // Remember the whole gesture, including a drag that returns to its starting point.
    active.dragged ||= Math.hypot(event.clientX - active.startX, event.clientY - active.startY) > 5;
    if (!active.dragged) return;
    if (active.rotate) {
      const body = objects[active.index].body;
      body.angularVelocity.set((event.clientY - active.y) * 0.12, (event.clientX - active.x) * 0.12, 0);
      active.x = event.clientX;
      active.y = event.clientY;
    } else if (active.depth) {
      target.z = THREE.MathUtils.clamp(active.startZ + (active.startY - event.clientY) * 0.015, -1.1, 1.1);
    } else {
      target.copy(intersection).add(active.offset);
      target.x = THREE.MathUtils.clamp(target.x, -5.65, 5.65);
      target.y = THREE.MathUtils.clamp(target.y, -0.85, 0.85);
    }
  };
  const up = (event?: PointerEvent) => {
    if (!active || (event && event.pointerId !== active.pointer)) return;
    const clicked = event?.type === 'pointerup' && !active.dragged
      && Math.hypot(event.clientX - active.startX, event.clientY - active.startY) <= 5;
    const index = active.index;
    const id = active.pointer;
    active = null;
    if (canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id);
    canvas.style.cursor = 'grab';
    if (clicked && event?.ctrlKey && !matchMedia('(max-width: 600px)').matches) {
      selected = index;
      onSelect(index);
    }
  };
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('lostpointercapture', up);
  const blur = () => up();
  window.addEventListener('blur', blur);
  const contextLost = (event: Event) => { event.preventDefault(); onError(); };
  canvas.addEventListener('webglcontextlost', contextLost);
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    camera.aspect = width / Math.max(height, 1);
    camera.position.set(0, 0, Math.max(7, 5.7 / Math.tan(THREE.MathUtils.degToRad(16)) / camera.aspect));
    camera.updateProjectionMatrix();
    blueprint.resize(camera);
    renderer.setSize(width, height);
  });
  resize.observe(host);
  let visible = true;
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) up(); });
  observer.observe(host);
  let previous = performance.now();
  const step = 1 / 60;
  let accumulator = 0;
  let raf = 0;
  let disposed = false;
  function animate(now: number) {
    if (disposed) return;
    raf = requestAnimationFrame(animate);
    const elapsed = Math.min((now - previous) / 1000, 0.05);
    previous = now;
    if (!visible || document.hidden) return;
    accumulator += elapsed;
    while (accumulator >= step) {
      for (const [index, object] of objects.entries()) {
        const { body, home } = object;
        const dragging = active?.index === index && active.dragged && !active.rotate;
        const anchor = dragging ? target : home;
        const stiffness = dragging ? 65 : 1.8;
        body.applyForce(new CANNON.Vec3((anchor.x - body.position.x) * stiffness - body.velocity.x * 5,
          (anchor.y - body.position.y) * stiffness - body.velocity.y * 5,
          (anchor.z - body.position.z) * stiffness - body.velocity.z * 5));
        // Idle torque is suspended for the selected object so material inspection stays steady.
        if (spinning && index !== selected && active?.index !== index) {
          body.torque.y += 0.065;
          body.torque.x += 0.025;
        }
        const speed = body.velocity.length();
        if (speed > 7) body.velocity.scale(7 / speed, body.velocity);
      }
      world.step(step);
      accumulator -= step;
    }
    objects.forEach(({ mesh, body }) => {
      mesh.position.copy(body.position);
      mesh.quaternion.copy(body.quaternion);
    });
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(animate);
  return {
    setMaterials(settings: MaterialSettings[]) { objects.forEach((o, i) => updateMaterial(o.material, settings[i])); },
    select(index: number) { selected = index; },
    setTool(value: 'move' | 'rotate' | 'depth') { tool = value; },
    setSpinning(value: boolean) { spinning = value; },
    nudge(index: number, x: number, y: number, rotate: boolean, z = 0) {
      const body = objects[index].body;
      if (rotate) body.angularVelocity.set(y * 2, x * 2, 0);
      else body.applyImpulse(new CANNON.Vec3(x * 1.5, y * 1.5, z * 1.5));
    },
    reset() {
      up();
      objects.forEach(({ body, home }, i) => {
        body.position.copy(home);
        body.velocity.setZero(); body.angularVelocity.setZero(); body.force.setZero(); body.torque.setZero();
        body.quaternion.setFromEuler(0.12, -0.22, i === 2 ? Math.PI - 0.15 : 0.08);
      });
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      up();
      resize.disconnect(); observer.disconnect();
      motionQuery.removeEventListener('change', motionChange);
      window.removeEventListener('blur', blur);
      canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('lostpointercapture', up); canvas.removeEventListener('webglcontextlost', contextLost);
      objects.forEach(o => { o.mesh.geometry.dispose(); o.material.dispose(); });
      blueprint.dispose();
      environmentTarget.dispose(); renderer.dispose(); renderer.forceContextLoss(); canvas.remove();
    },
  };
}
