import * as THREE from 'three';
import * as CANNON from 'cannon-es';

/** One continuous, beveled six-arm silhouette rather than intersecting meshes. */
export function createAsteriskGeometry() {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    const direction = new THREE.Vector2(Math.cos(angle), Math.sin(angle));
    const side = new THREE.Vector2(-direction.y, direction.x);
    points.push(direction.clone().multiplyScalar(0.66).addScaledVector(side, -0.16));
    points.push(direction.clone().multiplyScalar(0.66).addScaledVector(side, 0.16));
    points.push(new THREE.Vector2(Math.cos(angle + Math.PI / 6), Math.sin(angle + Math.PI / 6)).multiplyScalar(0.32));
  }
  const shape = new THREE.Shape();
  const incoming = points.map((point, i) => point.clone().lerp(points[(i + points.length - 1) % points.length], 0.24));
  const outgoing = points.map((point, i) => point.clone().lerp(points[(i + 1) % points.length], 0.24));
  shape.moveTo(incoming[0].x, incoming[0].y);
  points.forEach((point, i) => {
    if (i) shape.lineTo(incoming[i].x, incoming[i].y);
    shape.quadraticCurveTo(point.x, point.y, outgoing[i].x, outgoing[i].y);
  });
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.07, bevelSegments: 5, curveSegments: 8, steps: 1 });
  geometry.translate(0, 0, -0.11);
  geometry.computeBoundingSphere();
  return geometry;
}

export function createAsteriskPhysics() {
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, 0, 0) });
  (world.solver as CANNON.GSSolver).iterations = 15;
  world.defaultContactMaterial.friction = 0.25;
  world.defaultContactMaterial.restitution = 0.35;
  const bodies = Array.from({ length: 6 }, (_, index) => {
    const body = new CANNON.Body({ mass: 1, linearDamping: 0.65, angularDamping: 0.75 });
    // Keep the sculpture in a shallow display plane so pieces cannot hide in a stack.
    body.linearFactor.set(1, 1, 0);
    body.angularFactor.set(0, 0, 1);
    // Three rounded bars form a concave compound collider that follows all six arms.
    for (let arm = 0; arm < 3; arm++) {
      const angle = arm * Math.PI / 3;
      const rotation = new CANNON.Quaternion(); rotation.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), angle);
      body.addShape(new CANNON.Box(new CANNON.Vec3(0.58, 0.18, 0.18)), new CANNON.Vec3(), rotation);
      for (const sign of [-1, 1]) body.addShape(new CANNON.Sphere(0.18), new CANNON.Vec3(sign * 0.58 * Math.cos(angle), sign * 0.58 * Math.sin(angle), 0));
    }
    const angle = index * Math.PI / 3 + Math.PI / 6;
    body.position.set(Math.cos(angle) * 1.55, Math.sin(angle) * 1.55, 0);
    body.quaternion.setFromEuler(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    );
    body.angularVelocity.set(0, 0, (index % 2 ? -1 : 1) * 0.3);
    world.addBody(body);
    return body;
  });
  let grab: { index: number; mode: 'nudge' | 'rotate'; position: CANNON.Vec3; rotation: CANNON.Quaternion } | null = null;
  const beginGrab = (index: number, mode: 'nudge' | 'rotate') => {
    const body = bodies[index];
    grab = { index, mode, position: body.position.clone(), rotation: body.quaternion.clone() };
    body.wakeUp();
    if (mode === 'rotate') body.angularFactor.set(1, 1, 1);
  };
  const moveGrab = (position: { x: number; y: number; z: number }, rotation: { x: number; y: number; z: number; w: number }) => {
    if (!grab) return;
    grab.position.set(position.x, position.y, 0);
    const distance = grab.position.length();
    if (distance > 2.5) grab.position.scale(2.5 / distance, grab.position);
    grab.rotation.set(rotation.x, rotation.y, rotation.z, rotation.w);
  };
  const endGrab = () => {
    if (grab) {
      const body = bodies[grab.index];
      body.angularFactor.set(0, 0, 1);
      body.angularVelocity.x = 0; body.angularVelocity.y = 0;
    }
    grab = null;
  };
  const rotationError = new CANNON.Quaternion();
  const inverseRotation = new CANNON.Quaternion();
  world.addEventListener('preStep', () => {
    for (const body of bodies) {
      // A damped spring to the origin, with stronger depth restraint to keep all six readable.
      body.force.set(-body.position.x * 2.5, -body.position.y * 2.5, -body.position.z * 16 - body.velocity.z * 2);
    }
    if (grab) {
      const body = bodies[grab.index];
      // Spring-driven dragging keeps collision response active instead of teleporting bodies.
      body.force.x = (grab.position.x - body.position.x) * 45 - body.velocity.x * 10;
      body.force.y = (grab.position.y - body.position.y) * 45 - body.velocity.y * 10;
      const force = body.force.length();
      if (force > 45) body.force.scale(45 / force, body.force);
      if (grab.mode === 'rotate') {
        body.quaternion.conjugate(inverseRotation);
        grab.rotation.mult(inverseRotation, rotationError);
        const sign = rotationError.w < 0 ? -1 : 1;
        body.torque.set(rotationError.x * sign * 14 - body.angularVelocity.x * 1.8,
          rotationError.y * sign * 14 - body.angularVelocity.y * 1.8,
          rotationError.z * sign * 14 - body.angularVelocity.z * 1.8);
      }
    }
  });
  const scatter = () => bodies.forEach((body, index) => {
    const angle = index * Math.PI / 3 + world.time;
    const direction = body.position.clone();
    if (direction.length() < 0.1) direction.set(Math.cos(angle), Math.sin(angle), 0);
    direction.normalize(); direction.scale(2.5, direction);
    body.applyImpulse(direction);
    body.angularVelocity.set(0, 0, index % 2 ? -1.5 : 1.5);
  });
  return { world, bodies, scatter, beginGrab, moveGrab, endGrab, dispose: () => { endGrab(); bodies.forEach(body => world.removeBody(body)); } };
}
