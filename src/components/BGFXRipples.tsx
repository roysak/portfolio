import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

const MAX_TRAIL = 25;

const VERTEX_SHADER = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  #define MAX_TRAIL 25

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_trail[MAX_TRAIL];
  uniform int u_shape;

  uniform float u_size;
  uniform float u_rounding;
  uniform float u_gap;
  uniform float u_spacingX;
  uniform float u_spacingY;
  uniform vec3 u_color;
  uniform float u_glow;

  float sdHexagon(vec2 p, float r) {
    const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
    p = abs(p);
    p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
    p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
    return length(p) * sign(p.y);
  }

  float sdEquilateralTriangle(vec2 p, float r) {
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x + k*p.y > 0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0*r, 0.0 );
    return -length(p)*sign(p.y);
  }

  float sdBox(in vec2 p, in vec2 b) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
  }

  vec4 hexGrid(vec2 uv, vec2 spacing) {
    vec2 r = vec2(2.0 * spacing.x, 1.73205081 * spacing.y);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    vec2 id = uv - gv;
    return vec4(gv, id);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.y;

    float total_intensity = 0.0;

    for(int i = 0; i < MAX_TRAIL; i++) {
      float age = u_time - u_trail[i].z;
      if(age > 0.0 && age < 3.0) {
        vec2 t_uv = u_trail[i].xy / u_resolution.y;
        float dist = length(uv - t_uv);

        float current_radius = age * 0.35;
        float ring = smoothstep(0.1, 0.0, abs(dist - current_radius));

        if(dist > 0.0) {
          float wave = sin(dist * 40.0 - age * 20.0);
          float fade = smoothstep(1.0, 0.0, age);
          total_intensity += max(0.0, wave) * ring * fade;
        }
      }
    }

    vec2 spacing = vec2(u_spacingX, u_spacingY);

    float scale = 6.0;
    float d = 0.0;

    float effective_size = max(0.01, u_size - u_gap);
    float r = min(u_rounding, effective_size * 0.95);
    float base_size = effective_size - r;

    if (u_shape == 2) {
      vec2 scaled_uv = uv * scale * 1.5;
      vec2 id = floor(scaled_uv / spacing);
      vec2 gv = mod(scaled_uv, spacing) - spacing * 0.5;
      d = sdBox(gv, vec2(base_size)) - r;
    } else if (u_shape == 1) {
      vec2 scaled_uv = uv * scale * 1.5;
      vec2 gv = mod(scaled_uv, spacing) - spacing * 0.5;
      gv.y -= effective_size * 0.3;
      d = sdEquilateralTriangle(gv, base_size) - r;
    } else {
      vec4 hex = hexGrid(uv * scale, spacing);
      d = sdHexagon(hex.xy, base_size) - r;
    }

    float thickness = 0.01 + total_intensity * u_glow * 0.002;
    float outline = smoothstep(thickness, 0.0, abs(d));

    vec3 bgColor = vec3(1.0, 1.0, 1.0);
    vec3 baseOutline = vec3(1.0, 1.0, 1.0);
    vec3 highlight = u_color;

    vec3 col = mix(bgColor, baseOutline, smoothstep(0.02, 0.0, abs(d)));
    col = mix(col, highlight, outline * clamp(total_intensity * u_glow * 0.5, 0.0, 1.0));

    gl_FragColor = vec4(col, 1);
  }
`;

interface BGFXRipplesProps {
  shape?: 0 | 1 | 2;
  size?: number;
  rounding?: number;
  gap?: number;
  spacingX?: number;
  spacingY?: number;
  color?: string;
  glow?: number;
  className?: string;
}

export default function BGFXRipples({
  shape = 0,
  size = 0.8,
  rounding = 0.1,
  gap = 0.2,
  spacingX = 1.2,
  spacingY = 0.8,
  color = '#73B4F2',
  glow = 1.0,
  className,
}: BGFXRipplesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    material: THREE.ShaderMaterial;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    clock: THREE.Clock;
    trail: THREE.Vector3[];
    trailIndex: number;
    animFrameId: number;
  } | null>(null);

  const propsRef = useRef({ shape, size, rounding, gap, spacingX, spacingY, color, glow });
  propsRef.current = { shape, size, rounding, gap, spacingX, spacingY, color, glow };

  const updateTrail = useCallback((x: number, y: number) => {
    const state = stateRef.current;
    if (!state) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = x - rect.left;
    const py = rect.height - (y - rect.top);
    state.trail[state.trailIndex].set(px * window.devicePixelRatio, py * window.devicePixelRatio, state.clock.getElapsedTime());
    state.trailIndex = (state.trailIndex + 1) % MAX_TRAIL;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    container.appendChild(renderer.domElement);

    const trail: THREE.Vector3[] = [];
    for (let i = 0; i < MAX_TRAIL; i++) {
      trail.push(new THREE.Vector3(-1000, -1000, -10.0));
    }

    const clock = new THREE.Clock();

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_resolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
        u_time: { value: 0.0 },
        u_trail: { value: trail },
        u_shape: { value: propsRef.current.shape },
        u_size: { value: propsRef.current.size },
        u_rounding: { value: propsRef.current.rounding },
        u_gap: { value: propsRef.current.gap },
        u_spacingX: { value: propsRef.current.spacingX },
        u_spacingY: { value: propsRef.current.spacingY },
        u_color: { value: new THREE.Color(propsRef.current.color) },
        u_glow: { value: propsRef.current.glow },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    stateRef.current = {
      renderer,
      material,
      scene,
      camera,
      clock,
      trail,
      trailIndex: 0,
      animFrameId: 0,
    };

    clock.start();

    const animate = () => {
      const state = stateRef.current;
      if (!state) return;
      const p = propsRef.current;
      state.material.uniforms.u_time.value = state.clock.getElapsedTime();
      state.material.uniforms.u_shape.value = p.shape;
      state.material.uniforms.u_size.value = p.size;
      state.material.uniforms.u_rounding.value = p.rounding;
      state.material.uniforms.u_gap.value = p.gap;
      state.material.uniforms.u_spacingX.value = p.spacingX;
      state.material.uniforms.u_spacingY.value = p.spacingY;
      (state.material.uniforms.u_color.value as THREE.Color).set(p.color);
      state.material.uniforms.u_glow.value = p.glow;
      state.renderer.render(state.scene, state.camera);
      state.animFrameId = requestAnimationFrame(animate);
    };
    stateRef.current.animFrameId = requestAnimationFrame(animate);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const d = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(d);
      material.uniforms.u_resolution.value.set(w * d, h * d);
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(container);

    const onMouseMove = (e: MouseEvent) => updateTrail(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updateTrail(e.touches[0].clientX, e.touches[0].clientY);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onTouchMove);

    return () => {
      const state = stateRef.current;
      if (state) cancelAnimationFrame(state.animFrameId);
      observer.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
      stateRef.current = null;
    };
  }, [updateTrail]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
