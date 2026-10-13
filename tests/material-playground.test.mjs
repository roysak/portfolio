import test from 'node:test';
import assert from 'node:assert/strict';
import { createPhysics } from '../src/components/material-playground/physics.ts';
import { createMaterial, updateMaterial, initialMaterials, presets } from '../src/components/material-playground/materials.ts';

test('each neighboring shape pair collides and transfers momentum', () => {
  for (let i = 0; i < 3; i++) {
    const { world, objects } = createPhysics();
    const moving = objects[i].body;
    const neighbor = objects[i + 1].body;
    let collided = false;
    moving.addEventListener('collide', event => { if (event.body === neighbor) collided = true; });
    moving.velocity.x = 5;
    for (let frame = 0; frame < 90; frame++) world.step(1 / 60);
    assert.ok(collided, `shape ${i} did not contact shape ${i + 1}`);
    assert.ok(neighbor.position.x > objects[i + 1].home.x + 0.05, 'contact should move the neighboring body');
  }
});

test('all six boundaries contain fast-moving bodies in three dimensions', () => {
  for (const [x, y, z] of [[7, 0, 0], [-7, 0, 0], [0, 7, 0], [0, -7, 0], [0, 0, 7], [0, 0, -7]]) {
    const { world, objects } = createPhysics();
    for (const { body } of objects) body.velocity.set(x, y, z);
    for (let frame = 0; frame < 300; frame++) {
      world.step(1 / 60);
      for (const { body } of objects) {
        assert.ok(Number.isFinite(body.position.x + body.position.y + body.quaternion.w));
        assert.ok(Math.abs(body.position.x) < 6.8);
        assert.ok(Math.abs(body.position.y) < 2);
        assert.ok(Math.abs(body.position.z) < 2.2);
      }
    }
  }
});

test('switching opaque/glass/clearcoat features invalidates shader programs', () => {
  const material = createMaterial();
  updateMaterial(material, presets.Ceramic);
  const opaqueVersion = material.version;
  updateMaterial(material, presets.Glass);
  assert.ok(material.version > opaqueVersion);
  assert.equal(material.opacity, 1);
  const glassVersion = material.version;
  updateMaterial(material, { ...presets.Ceramic, clearcoat: 0 });
  assert.ok(material.version > glassVersion);
  assert.equal(material.transmission, 0);
  updateMaterial(material, presets.Frosted);
  assert.ok(material.roughness > presets.Frosted.roughness);
  material.dispose();
});

test('material edits do not leak into another object or reset defaults', () => {
  const settings = initialMaterials();
  settings[0].color = '#000000';
  assert.equal(initialMaterials()[0].color, presets.Chrome.color);
  const first = createMaterial();
  const second = createMaterial();
  updateMaterial(first, presets.Wax);
  updateMaterial(second, presets.Glass);
  assert.equal(first.userData.playgroundUniforms.uSubsurface.value, 0.85);
  assert.equal(second.userData.playgroundUniforms.uSubsurface.value, 0);
  first.dispose(); second.dispose();
});

 test('bodies can travel in depth and the cone starts upside down', () => {
  const { world, objects } = createPhysics();
  objects[1].body.velocity.z = 2;
  for (let frame = 0; frame < 20; frame++) world.step(1 / 60);
  assert.ok(objects[1].body.position.z > 0.3);
  const cone = objects[2].body;
  const axis = cone.quaternion.vmult({ x: 0, y: 1, z: 0 });
  assert.ok(axis.y < -0.9);
});
