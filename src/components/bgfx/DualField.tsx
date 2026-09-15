import { useEffect, useRef } from "react";
import { useMode } from "../../theme/modeContext";

interface Props {
  /** Particle count at a 1400px-wide canvas; scaled down on small canvases. */
  density?: number;
  /** Dim the whole field. The hero runs hot, the small panels run cool. */
  intensity?: number;
  interactive?: boolean;
  className?: string;
}

/* ── design mode ─────────────────────────────────────────────────────────────
   Pigment dragged across paper. Particles follow a curl-ish field and lay down
   long translucent strokes that build up where paths overlap, the way a wash
   darkens where the brush passes twice.
   ── code mode ───────────────────────────────────────────────────────────────
   Signal on a board. Particles hop between nodes of a fixed grid, turning only
   at right angles, leaving additive traces that bloom and decay.
   ────────────────────────────────────────────────────────────────────────── */

interface Wash {
  x: number;
  y: number;
  c: string;
  life: number;
}

interface Trace {
  x: number;
  y: number;
  tx: number;
  ty: number;
  t: number;
  dir: number;
  c: string;
  life: number;
}

const GRID = 26;

/** Simulation steps run synchronously on init so the field starts composed. */
const WARMUP = 90;

function readToken(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function fieldAngle(x: number, y: number, t: number) {
  return (
    Math.sin(x * 1.7 + t) * Math.cos(y * 1.3 - t * 0.7) +
    Math.sin((x + y) * 0.8 + t * 0.5) * 0.5
  );
}

export default function DualField({
  density = 900,
  intensity = 1,
  interactive = true,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCode = mode === "code";

    let w = 1;
    let h = 1;
    let dpr = 1;
    let grid = GRID;
    let t = 0;
    let raf = 0;
    let running = true;
    let frames = 0;
    // How fast the ground reclaims the canvas. Set in resize() from the canvas
    // width so a trail is always roughly the same fraction of the frame —
    // a fixed value that reads as flowing strokes on a hero turns a thumbnail
    // into a ball of scribble.
    let fade = 0.035;

    let ground = "#f0eae0";
    let palette: string[] = [];
    let wash: Wash[] = [];
    let traces: Trace[] = [];

    const pointer = { x: -9999, y: -9999 };

    const readPalette = () => {
      ground = readToken("--ink", isCode ? "#080a0d" : "#f0eae0");
      palette = isCode
        ? [readToken("--pigment", "#c8f55c"), readToken("--plum", "#9a8cff"), readToken("--ochre", "#ffc46b")]
        : [readToken("--pigment", "#3f6b3a"), readToken("--plum", "#6d4778"), readToken("--ochre", "#b7811a")];
    };

    const spawnWash = (): Wash => ({
      x: Math.random() * w,
      y: Math.random() * h,
      c: palette[(Math.random() * palette.length) | 0],
      life: 200 + Math.random() * 420,
    });

    const spawnTrace = (): Trace => {
      const gx = Math.round((Math.random() * w) / grid) * grid;
      const gy = Math.round((Math.random() * h) / grid) * grid;
      return {
        x: gx,
        y: gy,
        tx: gx,
        ty: gy,
        t: 1,
        dir: (Math.random() * 4) | 0,
        c: palette[(Math.random() * palette.length) | 0],
        life: 60 + Math.random() * 160,
      };
    };

    const count = () => {
      const area = Math.max(w * h, 1);
      const scaled = Math.round((density * area) / (1400 * 800 * dpr * dpr));
      return Math.max(30, Math.min(density, scaled));
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.width = Math.round(r.width * dpr);
      h = canvas.height = Math.round(r.height * dpr);
      grid = GRID * dpr;
      // Calibrated on a full-width hero (w ≈ 2100) at 0.035.
      fade = Math.min(0.16, Math.max(0.02, 0.035 * (2100 / w)));
      readPalette();
      ctx.fillStyle = ground;
      ctx.fillRect(0, 0, w, h);
      const n = count();
      wash = Array.from({ length: n }, spawnWash);
      traces = Array.from({ length: Math.round(n * 0.28) }, spawnTrace);
      frames = 0;
      running = true;
      // Pre-roll the simulation so the field arrives already composed rather
      // than assembling itself out of an empty ground over the first seconds.
      // Small, sparse panels need far fewer steps or the strokes pile into mush.
      const warm = Math.round(WARMUP * Math.min(1, density / 900));
      for (let i = 0; i < warm; i++) step();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) * dpr;
      pointer.y = (e.clientY - r.top) * dpr;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };

    const drawWash = () => {
      t += 0.0035;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = ground;
      ctx.globalAlpha = fade;
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = 0.14 * intensity;
      ctx.lineCap = "round";
      ctx.lineWidth = 1.5 * dpr;

      for (const p of wash) {
        const a = fieldAngle(p.x * 0.0022, p.y * 0.0022, t) * Math.PI * 2;
        let vx = Math.cos(a);
        let vy = Math.sin(a);
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy);
        const reach = 160 * dpr;
        if (d < reach && d > 0.001) {
          const f = (1 - d / reach) * 3.2;
          vx += (dx / d) * f;
          vy += (dy / d) * f;
        }
        const nx = p.x + vx * 2.0;
        const ny = p.y + vy * 2.0;
        ctx.strokeStyle = p.c;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        if (--p.life < 0 || p.x < 0 || p.y < 0 || p.x > w || p.y > h) Object.assign(p, spawnWash());
      }
      ctx.globalAlpha = 1;
    };

    const drawTraces = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = ground;
      ctx.globalAlpha = fade;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "square";
      ctx.lineWidth = 0.5 * dpr;

      for (const p of traces) {
        if (p.t >= 1) {
          // Arrived at a node: pick the next one, mostly carrying straight on.
          p.x = p.tx;
          p.y = p.ty;
          const turn = Math.random();
          if (turn < 0.28) p.dir = (p.dir + 1) % 4;
          else if (turn < 0.56) p.dir = (p.dir + 3) % 4;
          const hop = grid * (1 + ((Math.random() * 2) | 0));
          p.tx = p.x + (p.dir === 0 ? hop : p.dir === 2 ? -hop : 0);
          p.ty = p.y + (p.dir === 1 ? hop : p.dir === 3 ? -hop : 0);
          p.t = 0;
          if (--p.life < 0 || p.tx < 0 || p.ty < 0 || p.tx > w || p.ty > h) {
            Object.assign(p, spawnTrace());
            continue;
          }
        }

        const prevX = p.x + (p.tx - p.x) * p.t;
        const prevY = p.y + (p.ty - p.y) * p.t;
        p.t = Math.min(1, p.t + 0.05);
        const curX = p.x + (p.tx - p.x) * p.t;
        const curY = p.y + (p.ty - p.y) * p.t;

        ctx.globalAlpha = 0.34 * intensity;
        ctx.strokeStyle = p.c;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        // The head reads as a packet travelling the trace.
        ctx.globalAlpha = 0.62 * intensity;
        ctx.fillStyle = p.c;
        ctx.fillRect(curX - dpr, curY - dpr, 2 * dpr, 2 * dpr);
      }

      // A soft pointer halo keeps the board reactive without a physics pass.
      if (pointer.x > -9000) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 150 * dpr);
        g.addColorStop(0, palette[0]);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.05 * intensity;
        ctx.fillStyle = g;
        ctx.fillRect(pointer.x - 150 * dpr, pointer.y - 150 * dpr, 300 * dpr, 300 * dpr);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    /** One simulation tick of whichever field the current mode calls for. */
    const step = () => {
      if (isCode) drawTraces();
      else drawWash();
    };

    const frame = () => {
      if (!running) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
      // Pause when scrolled out of the layout entirely.
      if (canvas.offsetParent === null) return;

      step();

      // Reduced motion: compose a still image, then stop.
      if (reduced && ++frames > 90) running = false;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (interactive) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [mode, density, intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
