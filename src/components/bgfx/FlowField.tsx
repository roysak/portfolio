import { useEffect, useRef } from "react";

export interface FlowFieldOptions {
  count?: number;
  colors?: string[];
  scale?: number;
  speed?: number;
  fade?: number;
  radius?: number;
}

interface Particle {
  x: number;
  y: number;
  c: string;
  life: number;
}

const DEFAULTS: Required<FlowFieldOptions> = {
  count: 900,
  colors: ["#E4B04A", "#9A6FB0", "#EDE6DA"],
  scale: 0.0022,
  speed: 0.9,
  fade: 0.06,
  radius: 140,
};

function noise(x: number, y: number, t: number) {
  return (
    Math.sin(x * 1.7 + t) * Math.cos(y * 1.3 - t * 0.7) +
    Math.sin((x + y) * 0.8 + t * 0.5) * 0.5
  );
}

function groundColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#0f0d14";
}

/**
 * Lightweight 2D flow-field: particles trace curl-like paths in pigment
 * colours over the page ground and scatter away from the pointer.
 */
export default function FlowField({ className = "", ...opts }: FlowFieldOptions & { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optsRef = useRef({ ...DEFAULTS, ...opts });
  const merged = { ...DEFAULTS, ...opts };

  useEffect(() => {
    optsRef.current = merged;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 1;
    let h = 1;
    let t = 0;
    let parts: Particle[] = [];
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    const spawn = (): Particle => {
      const o = optsRef.current;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        c: o.colors[(Math.random() * o.colors.length) | 0],
        life: 100 + Math.random() * 300,
      };
    };

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.width = Math.max(1, Math.round(r.width * dpr));
      h = canvas.height = Math.max(1, Math.round(r.height * dpr));
      ctx.fillStyle = groundColor();
      ctx.fillRect(0, 0, w, h);
      parts = Array.from({ length: optsRef.current.count }, spawn);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const dpr = w / r.width;
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const frame = () => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (canvas.offsetParent === null) return;

      const o = optsRef.current;
      if (parts.length !== o.count) parts = Array.from({ length: o.count }, spawn);
      t += 0.004 * o.speed;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = groundColor();
      ctx.globalAlpha = o.fade;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1.2 * (w / 1400 + 0.6);

      for (const p of parts) {
        const a = noise(p.x * o.scale, p.y * o.scale, t) * Math.PI * 2;
        let vx = Math.cos(a);
        let vy = Math.sin(a);
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < o.radius && d > 0) {
          const f = (1 - d / o.radius) * 3;
          vx += (dx / d) * f;
          vy += (dy / d) * f;
        }
        const nx = p.x + vx * 1.6 * o.speed;
        const ny = p.y + vy * 1.6 * o.speed;
        ctx.strokeStyle = p.c;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        p.life--;
        if (p.life < 0 || p.x < 0 || p.y < 0 || p.x > w || p.y > h) Object.assign(p, spawn());
      }
      ctx.globalAlpha = 1;
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    frame();
    // With reduced motion, render a short burst then hold a still frame.
    let stopTimer = 0;
    if (reduced) stopTimer = window.setTimeout(() => (running = false), 1500);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(stopTimer);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} aria-hidden="true" />;
}
