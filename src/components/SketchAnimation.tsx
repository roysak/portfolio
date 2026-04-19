import { useEffect, useRef } from 'react';
import colormap from 'colormap';

// ── Config ────────────────────────────────────────────────────────────────
const LIFETIME      = 1000;  // ms – total lifetime of a trail point
const SYM_START     = 200;   // ms – symbols begin fading in
const SYM_PEAK      = 600;  // ms – symbols at full opacity / scatter starts
const SYM_END       = 800;  // ms – symbols fully gone
const SYM_SPACING   = 10;    // px between symbol sample points along segment
const MAX_SCATTER   = 40;    // px max scatter distance
const SYM_BASE_SIZE = 11;    // base font size in px
const SYM_ZOOM_IN   = 3.2;   // max scale for symbols flying toward viewer
const SYM_ZOOM_OUT  = 0.25;  // min scale for symbols flying away from viewer
const MIN_MOVE_SQ   = 20;    // skip point if moved less than ~4.5 px
const JITTER        = 0.5;     // px of sketch wobble per stroke pass

const SYMBOLS = '10#@$%&*()<>!?/\\^~|=+[];:\'",.`'.split('');

// ── Colormap palette (256 steps, rainbow) ─────────────────────────────────
const PALETTE = colormap({
  colormap: 'hot',
  nshades:  256,
  format:   'rgba',
  alpha:    1,
}) as [number, number, number, number][];

/** Map t ∈ [0,1] to an rgba string with the given alpha. */
function palColor(t: number, alpha: number): string {
  const idx = Math.min(255, Math.max(0, Math.round(t * 255)));
  const [r, g, b] = PALETTE[idx];
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
}

interface Pt { x: number; y: number; t: number }

// Deterministic helpers keyed on position — stable, not flickering
function stableHash(x: number, y: number, seed: number): number {
  const h = Math.sin(Math.floor(x) * 127.1 + Math.floor(y) * 311.7 + seed * 74.3) * 43758.5453;
  return h - Math.floor(h); // 0..1
}

function getSymbol(x: number, y: number): string {
  return SYMBOLS[Math.floor(stableHash(x, y, 1) * SYMBOLS.length)];
}

function getScatterAngle(x: number, y: number): number {
  return stableHash(x, y, 3) * Math.PI * 2;
}

// Deterministic sub-pixel wobble — stable per point position + pass seed
function jit(x: number, y: number, seed: number): number {
  return (stableHash(x, y, seed) - 0.5) * 2 * JITTER;
}

// ── React Component ───────────────────────────────────────────────────────

export default function SketchAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let trail: Pt[] = [];
    let rafId       = 0;
    let loopActive  = false;
    let resizeTimer = 0;

    let rect   = canvas.getBoundingClientRect();
    let scaleX = 1;
    let scaleY = 1;

    // ── Setup / resize ──────────────────────────────────────────────────
    const setup = () => {
      const p = canvas.parentElement ?? canvas;
      canvas.width  = p.clientWidth;
      canvas.height = p.clientHeight;
      rect   = canvas.getBoundingClientRect();
      scaleX = canvas.width  / rect.width;
      scaleY = canvas.height / rect.height;
    };

    // ── Animation loop ──────────────────────────────────────────────────
    const startLoop = () => {
      if (!loopActive) {
        loopActive = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      const now = performance.now();
      trail = trail.filter(p => now - p.t < LIFETIME);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trail.length >= 2) {
        ctx.lineCap  = 'round';
        ctx.lineJoin = 'round';

        // ── Phase 1: sketch strokes (fade out by SYM_START) ────────────
        for (let pass = 0; pass < 2; pass++) {
          for (let i = 1; i < trail.length; i++) {
            const a   = trail[i - 1];
            const b   = trail[i];
            const age = now - a.t;
            if (age >= SYM_START) continue;

            const t     = age / SYM_START;
            const alpha = Math.max(0, 1 - t * t);
            if (alpha < 0.01) continue;

            const ax = a.x + jit(a.x, a.y, pass);
            const ay = a.y + jit(a.x, a.y, pass + 7);

            const prev = i >= 2 ? trail[i - 2] : a;
            const smx  = (prev.x + a.x) * 0.5 + jit(prev.x, prev.y, pass + 2);
            const smy  = (prev.y + a.y) * 0.5 + jit(prev.y, prev.x, pass + 9);
            const emx  = (a.x + b.x)   * 0.5 + jit(a.x, a.y, pass + 3);
            const emy  = (a.y + b.y)   * 0.5 + jit(a.y, a.x, pass + 10);

            // Position along trail (0 = tail, 1 = head) → colormap index
            const trailT      = trail.length > 1 ? i / (trail.length - 1) : 0;
            const strokeAlpha = alpha * (pass === 0 ? 0.85 : 0.40);
            ctx.strokeStyle = palColor(trailT, strokeAlpha);
            ctx.lineWidth   = pass === 0 ? 1.6 : 0.9;

            ctx.beginPath();
            ctx.moveTo(smx, smy);
            ctx.quadraticCurveTo(ax, ay, emx, emy);
            ctx.stroke();
          }
        }

        // ── Phase 2: symbols fade in, scatter, then fade out ───────────
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';

        for (let i = 1; i < trail.length; i++) {
          const a   = trail[i - 1];
          const b   = trail[i];
          const age = now - a.t;
          if (age < SYM_START || age >= SYM_END) continue;

          // Fade in up to peak, then fade out
          const symAlpha = age < SYM_PEAK
            ? (age - SYM_START) / (SYM_PEAK - SYM_START)
            : 1 - (age - SYM_PEAK) / (SYM_END - SYM_PEAK);
          if (symAlpha < 0.01) continue;

          // Scatter eases in after peak
          const scatterT    = age < SYM_PEAK ? 0 : (age - SYM_PEAK) / (SYM_END - SYM_PEAK);
          const scatterDist = scatterT * scatterT * MAX_SCATTER;

          const dx    = b.x - a.x;
          const dy    = b.y - a.y;
          const len   = Math.hypot(dx, dy);
          if (len === 0) continue;

          const steps = Math.max(1, Math.floor(len / SYM_SPACING));
          for (let s = 0; s <= steps; s++) {
            const frac = s / steps;
            const spx  = a.x + dx * frac;
            const spy  = a.y + dy * frac;

            const angle = getScatterAngle(spx, spy);
            const px    = spx + Math.cos(angle) * scatterDist;
            const py    = spy + Math.sin(angle) * scatterDist;

            // Decide zoom direction per symbol (stable, not flickering)
            const zoomIn    = stableHash(spx, spy, 9) > 0.5;
            const targetScale = zoomIn ? SYM_ZOOM_IN : SYM_ZOOM_OUT;
            // Scale eases from 1 toward target as scatter progresses
            const scale     = 1 + (targetScale - 1) * (scatterT * scatterT);
            const fontSize  = Math.max(4, Math.round(SYM_BASE_SIZE * scale));
            ctx.font = `bold ${fontSize}px "Courier New", monospace`;

            // Each symbol gets its own color offset for variety
            const symT = ((i / Math.max(trail.length - 1, 1)) + frac * 0.25) % 1;
            ctx.fillStyle = palColor(symT, symAlpha);
            ctx.fillText(getSymbol(spx, spy), px, py);
          }
        }
      }

      if (trail.length > 0) {
        rafId = requestAnimationFrame(tick);
      } else {
        loopActive = false;
      }
    };

    // ── Mouse tracking ──────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top)  * scaleY;
      const last = trail[trail.length - 1];
      if (last) {
        const ddx = x - last.x, ddy = y - last.y;
        if (ddx * ddx + ddy * ddy < MIN_MOVE_SQ) return;
      }
      trail.push({ x, y, t: performance.now() });
      startLoop();
    };

    // ── Debounced resize ────────────────────────────────────────────────
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 100);
    });

    document.addEventListener('mousemove', onMouseMove);
    setup();
    observer.observe(canvas.parentElement ?? canvas);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="fixed z-100 inset-0 pointer-events-none mix-blend-darken">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
