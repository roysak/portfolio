import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ITERATIONS = 15;
const SPLAT_RADIUS = 0.009;

// --- Props Interface ---
interface FluidShaderProps {
  thickness?: number;
  spacing?: number;
  roundness?: number;
  size?: number;
  viscosity?: number;
  colorFade?: number;
  bgColor?: string;
  className?: string;
}

// --- Shader Definitions ---
const baseVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const clearShader = `void main() { gl_FragColor = vec4(0.0); }`;

const displayShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uThickness;
  uniform float uSpacing;
  uniform float uRoundness;
  uniform float uSize;
  uniform vec3 uBgColor;

  float sdHexagon(vec2 p, float r) {
    const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
    p = abs(p);
    p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
    p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
    return length(p) * sign(p.y);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * uResolution / min(uResolution.x, uResolution.y) * (12.0 / uSize);
    vec2 grid_r = vec2(1.0, 1.7320508);
    vec2 h = grid_r * 0.5;
    vec2 a = mod(uv, grid_r) - h;
    vec2 b = mod(uv - h, grid_r) - h;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    vec2 p = gv.yx;
    float baseSize = 0.5 - uSpacing;
    float rSize = max(baseSize - uRoundness, 0.0);
    float d = sdHexagon(p, rSize) - uRoundness;
    float outlineDist = abs(d);
    float outlineMask = smoothstep(uThickness, uThickness - 0.01, outlineDist);
    vec3 color = texture2D(uTexture, vUv).rgb;
    float fluidIntensity = clamp(length(color) * 1.5, 0.0, 1.0);
    vec3 finalColor = mix(uBgColor, color, outlineMask * fluidIntensity);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const splatShader = `
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float uAspectRatio;
  uniform vec3 uColor;
  uniform vec2 uPoint;
  uniform float uRadius;
  void main() {
    vec2 p = vUv - uPoint.xy;
    p.x *= uAspectRatio;
    vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const advectionShader = `
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main() {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    coord = clamp(coord, vec2(0.0), vec2(1.0));
    gl_FragColor = texture2D(uSource, coord) * dissipation;
  }
`;

const divergenceShader = `
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform vec2 texelSize;
  void main() {
    float L = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).y;
    float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).y;
    if (vUv.x - texelSize.x < 0.0) L = -texture2D(uVelocity, vUv).x;
    if (vUv.x + texelSize.x > 1.0) R = -texture2D(uVelocity, vUv).x;
    if (vUv.y + texelSize.y > 1.0) T = -texture2D(uVelocity, vUv).y;
    if (vUv.y - texelSize.y < 0.0) B = -texture2D(uVelocity, vUv).y;
    gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
  }
`;

const jacobiShader = `
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 texelSize;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
    float C = texture2D(uPressure, vUv).x;
    if (vUv.x - texelSize.x < 0.0) L = C;
    if (vUv.x + texelSize.x > 1.0) R = C;
    if (vUv.y + texelSize.y > 1.0) T = C;
    if (vUv.y - texelSize.y < 0.0) B = C;
    float div = texture2D(uDivergence, vUv).x;
    gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
  }
`;

const gradientSubtractShader = `
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  uniform vec2 texelSize;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
    float C = texture2D(uPressure, vUv).x;
    if (vUv.x - texelSize.x < 0.0) L = C;
    if (vUv.x + texelSize.x > 1.0) R = C;
    if (vUv.y + texelSize.y > 1.0) T = C;
    if (vUv.y - texelSize.y < 0.0) B = C;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

interface DoubleFBO {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
  swap: () => void;
}

export default function FluidShader({
  thickness = 0.008,
  spacing = 0.120,
  roundness = 0.100,
  size = 3.5,
  viscosity = 0.15,
  colorFade = 0.90,
  bgColor = '#f2f0f4',
  className,
}: FluidShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const propsRef = useRef({ thickness, spacing, roundness, size, viscosity, colorFade, bgColor });
  propsRef.current = { thickness, spacing, roundness, size, viscosity, colorFade, bgColor };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const createMaterial = (fragmentShader: string, uniforms: Record<string, { value: unknown }>) =>
      new THREE.ShaderMaterial({ vertexShader: baseVertex, fragmentShader, uniforms, depthWrite: false, depthTest: false });

    const getRenderTarget = () =>
      new THREE.WebGLRenderTarget(width >> 1, height >> 1, {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        depthBuffer: false,
      });

    const createDoubleFBO = (): DoubleFBO => ({
      read: getRenderTarget(),
      write: getRenderTarget(),
      swap() { const t = this.read; this.read = this.write; this.write = t; },
    });

    const density = createDoubleFBO();
    const velocity = createDoubleFBO();
    const pressure = createDoubleFBO();
    const divergence = getRenderTarget();
    const texelSize = new THREE.Vector2(1.0 / (width >> 1), 1.0 / (height >> 1));

    const clearMat = createMaterial(clearShader, { uTexture: { value: null } });
    const displayMat = createMaterial(displayShader, {
      uTexture: { value: null },
      uResolution: { value: new THREE.Vector2(width, height) },
      uThickness: { value: propsRef.current.thickness },
      uSpacing: { value: propsRef.current.spacing },
      uRoundness: { value: propsRef.current.roundness },
      uSize: { value: propsRef.current.size },
      uBgColor: { value: new THREE.Color(propsRef.current.bgColor) },
    });
    const splatMat = createMaterial(splatShader, {
      uTarget: { value: null },
      uAspectRatio: { value: width / height },
      uColor: { value: new THREE.Vector3() },
      uPoint: { value: new THREE.Vector2() },
      uRadius: { value: SPLAT_RADIUS },
    });
    const advectMat = createMaterial(advectionShader, {
      uVelocity: { value: null }, uSource: { value: null },
      texelSize: { value: texelSize }, dt: { value: 0.016 }, dissipation: { value: 1.0 },
    });
    const divergenceMat = createMaterial(divergenceShader, { uVelocity: { value: null }, texelSize: { value: texelSize } });
    const jacobiMat = createMaterial(jacobiShader, {
      uPressure: { value: null }, uDivergence: { value: null }, texelSize: { value: texelSize },
    });
    const gradientSubtractMat = createMaterial(gradientSubtractShader, {
      uPressure: { value: null }, uVelocity: { value: null }, texelSize: { value: texelSize },
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    scene.add(quad);

    const renderPass = (material: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null) => {
      quad.material = material;
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
    };

    // --- Pointer Handling (scoped to canvas) ---
    const canvas = renderer.domElement;
    const pointers: { x: number; y: number; dx: number; dy: number; moved: boolean }[] = [];
    const splatColor = new THREE.Vector3(0.3, 0.6, 1.0);

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) / width;
      const y = 1.0 - (clientY - rect.top) / height;
      if (pointers.length === 0) {
        pointers.push({ x, y, dx: 0, dy: 0, moved: false });
      } else {
        pointers[0].dx = (x - pointers[0].x) * 3000.0;
        pointers[0].dy = (y - pointers[0].y) * 3000.0;
        pointers[0].x = x;
        pointers[0].y = y;
        pointers[0].moved = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => { if (e.cancelable) e.preventDefault(); updatePointer(e.touches[0].clientX, e.touches[0].clientY); };
    const handleTouchStart = (e: TouchEvent) => { if (e.cancelable) e.preventDefault(); updatePointer(e.touches[0].clientX, e.touches[0].clientY); };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });

    // --- Resize ---
    const ro = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      renderer.setSize(width, height);
      texelSize.set(1.0 / (width >> 1), 1.0 / (height >> 1));
      splatMat.uniforms.uAspectRatio.value = width / height;
      displayMat.uniforms.uResolution.value.set(width, height);
    });
    ro.observe(container);

    // --- Main Loop ---
    let animId: number;
    const step = () => {
      const cfg = propsRef.current;

      // Sync uniforms from props each frame
      displayMat.uniforms.uThickness.value = cfg.thickness;
      displayMat.uniforms.uSpacing.value = cfg.spacing;
      displayMat.uniforms.uRoundness.value = cfg.roundness;
      displayMat.uniforms.uSize.value = cfg.size;
      displayMat.uniforms.uBgColor.value.set(cfg.bgColor);

      if (pointers.length > 0 && pointers[0].moved) {
        const p = pointers[0];
        splatMat.uniforms.uPoint.value.set(p.x, p.y);

        splatMat.uniforms.uTarget.value = velocity.read.texture;
        splatMat.uniforms.uColor.value.set(p.dx, p.dy, 0.0);
        renderPass(splatMat, velocity.write);
        velocity.swap();

        const time = Date.now() * 0.001;
        splatColor.set(Math.sin(time) * 0.2 + 0.5, Math.cos(time * 0.5) * 0.2 + 0.5, Math.sin(time * 0.3) * 0.2 + 0.8);
        splatMat.uniforms.uTarget.value = density.read.texture;
        splatMat.uniforms.uColor.value.copy(splatColor);
        renderPass(splatMat, density.write);
        density.swap();

        p.moved = false;
      }

      advectMat.uniforms.uVelocity.value = velocity.read.texture;
      advectMat.uniforms.uSource.value = velocity.read.texture;
      advectMat.uniforms.dissipation.value = 0.99 - cfg.viscosity * 0.14;
      renderPass(advectMat, velocity.write);
      velocity.swap();

      advectMat.uniforms.uVelocity.value = velocity.read.texture;
      advectMat.uniforms.uSource.value = density.read.texture;
      advectMat.uniforms.dissipation.value = cfg.colorFade;
      renderPass(advectMat, density.write);
      density.swap();

      divergenceMat.uniforms.uVelocity.value = velocity.read.texture;
      renderPass(divergenceMat, divergence);
      renderPass(clearMat, pressure.read);

      jacobiMat.uniforms.uDivergence.value = divergence.texture;
      for (let i = 0; i < ITERATIONS; i++) {
        jacobiMat.uniforms.uPressure.value = pressure.read.texture;
        renderPass(jacobiMat, pressure.write);
        pressure.swap();
      }

      gradientSubtractMat.uniforms.uPressure.value = pressure.read.texture;
      gradientSubtractMat.uniforms.uVelocity.value = velocity.read.texture;
      renderPass(gradientSubtractMat, velocity.write);
      velocity.swap();

      displayMat.uniforms.uTexture.value = density.read.texture;
      renderPass(displayMat, null);

      animId = requestAnimationFrame(step);
    };
    step();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      density.read.dispose(); density.write.dispose();
      velocity.read.dispose(); velocity.write.dispose();
      pressure.read.dispose(); pressure.write.dispose();
      divergence.dispose();
      renderer.dispose();
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', background: bgColor, overflow: 'hidden' }}
    />
  );
}
