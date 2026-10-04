import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GlassPanel from './GlassPanel';
import { createSculptureBackdrop } from './sculptureBackdrop';
import { createEnvironment, createGlassMaterial, asteriskMaterials } from './glassMaterial';
import { createAsteriskGeometry, createAsteriskPhysics } from './asteriskPhysics';
import type { GlassSettings } from './glassMaterial';

type Runtime = { apply: (settings: GlassSettings[], selected: number) => void; resetView: () => void; scatter: () => void };
export default function Sculpture() {
  const host = useRef<HTMLDivElement>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const runtime = useRef<Runtime | null>(null);
  const [settings, setSettings] = useState<GlassSettings[]>(() => asteriskMaterials.map(item => ({ ...item.settings })));
  const [selected, setSelected] = useState(0);
  const [tool, setTool] = useState<'nudge' | 'rotate'>('nudge');
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState(true);
  const interaction = useRef({ paused: false, open: false, tool: 'nudge' as 'nudge' | 'rotate' });
  useEffect(() => { interaction.current = { paused, open, tool }; }, [paused, open, tool]);
  useEffect(() => { runtime.current?.apply(settings, selected); }, [settings, selected]);
  const closePanel = useCallback(() => { setOpen(false); editButton.current?.focus({ preventScroll: true }); }, []);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch { queueMicrotask(() => setAvailable(false)); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    element.appendChild(canvas);
    const scene = new THREE.Scene();
    const backdrop = createSculptureBackdrop();
    if (backdrop) scene.add(backdrop.mesh);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 10.5);
    const controls = new OrbitControls(camera, canvas);
    controls.enablePan = false; controls.enableZoom = false;
    controls.enableDamping = true; controls.dampingFactor = 0.07;
    controls.rotateSpeed = 0.65; controls.autoRotateSpeed = 0.4;
    controls.saveState();
    const geometry = createAsteriskGeometry();
    const physics = createAsteriskPhysics();
    const glasses = asteriskMaterials.map(() => createGlassMaterial());
    const sculptures = glasses.map((glass, index) => {
      const mesh = new THREE.Mesh(geometry, glass.material);
      mesh.userData.asterisk = index;
      mesh.position.copy(physics.bodies[index].position);
      mesh.quaternion.copy(physics.bodies[index].quaternion);
      scene.add(mesh);
      return mesh;
    });
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(-3, 5, 5); scene.add(key);
    const backlight = new THREE.DirectionalLight(0xffd9bf, 2); backlight.position.set(-3, 2, -4); scene.add(backlight);
    const environments = new Map<string, THREE.WebGLRenderTarget>();
    const environmentFor = (name: string) => {
      let environment = environments.get(name);
      if (!environment) { environment = createEnvironment(renderer, name); environments.set(name, environment); }
      return environment.texture;
    };
    const apply = (allSettings: GlassSettings[], active: number) => {
      allSettings.forEach((s, index) => {
        const glass = glasses[index];
        // Let MeshPhysicalMaterial refract actual scene geometry and its background.
        glass.apply(s);
        glass.material.envMap = environmentFor(s.environment);
        glass.material.envMapIntensity = s.environmentIntensity;
        glass.material.envMapRotation.y = THREE.MathUtils.degToRad(s.environmentRotation);
      });
      const s = allSettings[active];
      scene.background = s.backdrop ? environmentFor(s.environment) : new THREE.Color('#f5f3ed');
      if (backdrop) backdrop.mesh.visible = !s.backdrop;
      scene.backgroundRotation.y = THREE.MathUtils.degToRad(s.environmentRotation);
      scene.backgroundBlurriness = 0.25;
      scene.backgroundIntensity = 0.6;
    };
    apply(asteriskMaterials.map(item => item.settings), 0);
    runtime.current = { apply, resetView: () => controls.reset(), scatter: physics.scatter };
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      backdrop?.resize(width, height, element.parentElement?.clientWidth ?? width);
      renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    let visible = true;
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); intersection.observe(element);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragPlane = new THREE.Plane();
    const planeNormal = new THREE.Vector3();
    const planePoint = new THREE.Vector3();
    const targetPosition = new THREE.Vector3();
    const targetRotation = new THREE.Quaternion();
    const rotationX = new THREE.Quaternion();
    const rotationY = new THREE.Quaternion();
    const cameraRight = new THREE.Vector3();
    const cameraUp = new THREE.Vector3();
    let down: { x: number; y: number; id: number; moved: boolean; index: number; mode: 'nudge' | 'rotate'; origin: THREE.Vector3; startPoint: THREE.Vector3; rotation: THREE.Quaternion } | null = null;
    const aim = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
    };
    const onDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || down) return;
      aim(event);
      const hit = raycaster.intersectObjects(sculptures)[0];
      if (!hit) return; // Empty space continues to orbit the camera.
      const index = hit.object.userData.asterisk as number;
      const origin = sculptures[index].position.clone();
      camera.getWorldDirection(planeNormal);
      dragPlane.setFromNormalAndCoplanarPoint(planeNormal, origin);
      if (!raycaster.ray.intersectPlane(dragPlane, planePoint)) return;
      down = { x: event.clientX, y: event.clientY, id: event.pointerId, moved: false, index,
        mode: event.shiftKey ? 'rotate' : interaction.current.tool, origin,
        startPoint: planePoint.clone(), rotation: sculptures[index].quaternion.clone() };
      controls.enabled = false;
      canvas.setPointerCapture(event.pointerId);
      event.preventDefault(); event.stopImmediatePropagation();
    };
    const onMove = (event: PointerEvent) => {
      if (!down || down.id !== event.pointerId) return;
      const dx = event.clientX - down.x, dy = event.clientY - down.y;
      if (!down.moved && Math.hypot(dx, dy) > 6) {
        down.moved = true;
        setSelected(down.index);
        physics.beginGrab(down.index, down.mode);
        canvas.classList.add('is-manipulating');
      }
      if (!down.moved) return;
      targetPosition.copy(down.origin);
      targetRotation.copy(down.rotation);
      if (down.mode === 'nudge') {
        aim(event);
        if (raycaster.ray.intersectPlane(dragPlane, planePoint)) targetPosition.add(planePoint.sub(down.startPoint));
      } else {
        cameraRight.setFromMatrixColumn(camera.matrixWorld, 0);
        cameraUp.setFromMatrixColumn(camera.matrixWorld, 1);
        rotationX.setFromAxisAngle(cameraUp, dx * 0.012);
        rotationY.setFromAxisAngle(cameraRight, dy * 0.012);
        targetRotation.premultiply(rotationX).premultiply(rotationY);
      }
      physics.moveGrab(targetPosition, targetRotation);
      event.preventDefault(); event.stopImmediatePropagation();
    };
    const finish = () => {
      if (!down) return;
      const id = down.id;
      down = null;
      physics.endGrab();
      controls.enabled = true;
      canvas.classList.remove('is-manipulating');
      if (canvas.hasPointerCapture(id)) canvas.releasePointerCapture(id);
    };
    const onUp = (event: PointerEvent) => {
      if (!down || down.id !== event.pointerId) return;
      const clicked = !down.moved && Math.hypot(event.clientX - down.x, event.clientY - down.y) <= 6;
      const index = down.index;
      finish();
      if (clicked) { setSelected(index); setOpen(true); }
      event.stopImmediatePropagation();
    };
    const onCancel = () => finish();
    const lost = (event: Event) => { event.preventDefault(); finish(); setAvailable(false); setOpen(false); };
    const restored = () => setAvailable(true);
    canvas.addEventListener('pointerdown', onDown, true); canvas.addEventListener('pointermove', onMove, true);
    canvas.addEventListener('pointerup', onUp, true); canvas.addEventListener('pointercancel', onCancel);
    canvas.addEventListener('lostpointercapture', onCancel); window.addEventListener('blur', onCancel);
    canvas.addEventListener('webglcontextlost', lost); canvas.addEventListener('webglcontextrestored', restored);
    let frame = 0, previous = 0, accumulator = 0;
    const scatterDirection = backlight.position.clone().normalize();
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      const delta = Math.min((time - previous) / 1000, 0.05); previous = time;
      if (!visible || document.hidden || renderer.getContext().isContextLost()) return;
      const moving = Boolean(down?.moved) || (!motion.matches && !interaction.current.paused && !interaction.current.open);
      controls.autoRotate = false;
      if (moving) {
        accumulator += delta;
        while (accumulator >= 1 / 120) { physics.world.step(1 / 120); accumulator -= 1 / 120; }
      } else { accumulator = 0; }
      sculptures.forEach((mesh, index) => {
        mesh.position.copy(physics.bodies[index].position);
        mesh.quaternion.copy(physics.bodies[index].quaternion);
      });
      controls.update(delta);
      camera.updateMatrixWorld();
      backdrop?.update(camera);
      glasses.forEach(glass => glass.uniforms.uScatterLight.value.copy(scatterDirection).transformDirection(camera.matrixWorldInverse));
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);
    return () => {
      runtime.current = null;
      cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); controls.dispose();
      finish();
      canvas.removeEventListener('pointerdown', onDown, true); canvas.removeEventListener('pointermove', onMove, true);
      canvas.removeEventListener('pointerup', onUp, true); canvas.removeEventListener('pointercancel', onCancel);
      canvas.removeEventListener('lostpointercapture', onCancel); window.removeEventListener('blur', onCancel);
      canvas.removeEventListener('webglcontextlost', lost); canvas.removeEventListener('webglcontextrestored', restored);
      backdrop?.dispose(); physics.dispose(); geometry.dispose(); glasses.forEach(glass => glass.material.dispose()); environments.forEach(target => target.dispose());
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove();
    };
  }, []);

  return <>
    <div ref={host} className={`sculpture-canvas glass-sculpture ${available ? '' : 'glass-unavailable'}`} aria-label="Six rounded asterisks with collision physics. Drag an asterisk to nudge it; Shift-drag or choose Rotate to turn it. Drag empty space to orbit. Click an asterisk to edit its material."><div className="sculpture-fallback asterisk-fallback" aria-hidden="true">{asteriskMaterials.map(item => <span key={item.name} style={{ color: item.settings.color }}>✳</span>)}</div></div>
    <div className="sculpture-toolbar">{available ? <><div className="asterisk-tools" aria-label="Object interaction"><button onClick={() => setTool('nudge')} aria-pressed={tool === 'nudge'} title="Drag an asterisk to nudge it">Nudge</button><button onClick={() => setTool('rotate')} aria-pressed={tool === 'rotate'} title="Drag an asterisk to rotate it. Shift-drag also rotates.">Rotate</button></div><button ref={editButton} className="glass-edit" onClick={() => setOpen(!open)} aria-expanded={open}>Edit material <span aria-hidden="true">↗</span></button><button className="asterisk-scatter" onClick={() => { runtime.current?.scatter(); setPaused(false); setOpen(false); }} aria-label="Scatter asterisks">↻</button><button className="motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? '▶ Play' : 'Ⅱ Pause'}</button></> : <span role="status">3D preview unavailable on this device.</span>}</div>
    {open && available && <GlassPanel selected={selected} onSelect={setSelected} settings={settings[selected]} onChange={value => setSettings(current => current.map((item, index) => index === selected ? value : item))} onClose={closePanel} onResetView={() => runtime.current?.resetView()} />}
  </>;
}





