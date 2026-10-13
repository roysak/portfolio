import * as CANNON from 'cannon-es';

export function createPhysics() {
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, 0, 0) });
  world.defaultContactMaterial.friction = 0.16;
  world.defaultContactMaterial.restitution = 0.45;
  const objects = Array.from({ length: 4 }, (_, i) => {
    const home = new CANNON.Vec3((i - 1.5) * 2.85, 0, 0);
    const body = new CANNON.Body({ mass: 1, position: home.clone(), linearDamping: 0.65, angularDamping: 0.8 });
    if (i === 2) body.addShape(new CANNON.Cylinder(0.01, 0.78, 1.8, 24));
    if (i === 0) body.addShape(new CANNON.Box(new CANNON.Vec3(0.75, 0.75, 0.5)));
    if (i === 1) body.addShape(new CANNON.Sphere(0.83));
    if (i === 3) {
      // Compound arms preserve the asterisk's concave gaps during collisions.
      for (let arm = 0; arm < 3; arm++) {
        const q = new CANNON.Quaternion();
        q.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), arm * Math.PI / 3);
        body.addShape(new CANNON.Box(new CANNON.Vec3(0.95, 0.2, 0.27)), new CANNON.Vec3(), q);
      }
    }
    body.quaternion.setFromEuler(0.12, -0.22, i === 2 ? Math.PI - 0.15 : 0.08);
    world.addBody(body);
    return { body, home };
  });
  for (const [x, y, angle] of [[-6.8, 0, -Math.PI / 2], [6.8, 0, Math.PI / 2], [0, -2, -Math.PI / 2], [0, 2, Math.PI / 2]]) {
    const wall = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), position: new CANNON.Vec3(x, y, 0) });
    // Plane normals point inward.
    if (x) wall.quaternion.setFromEuler(0, -angle, 0);
    else wall.quaternion.setFromEuler(angle, 0, 0);
    world.addBody(wall);
  }
  for (const z of [-2.2, 2.2]) {
    const wall = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), position: new CANNON.Vec3(0, 0, z) });
    if (z > 0) wall.quaternion.setFromEuler(0, Math.PI, 0);
    world.addBody(wall);
  }
  return { world, objects };
}
