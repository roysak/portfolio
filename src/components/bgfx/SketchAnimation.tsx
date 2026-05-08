import { useEffect, useRef } from 'react';
import colormap from 'colormap';

// ── Config ────────────────────────────────────────────────────────────────
const LIFETIME      = 1400;  // ms – total lifetime of a trail point
const SYM_START     = 300;   // ms – symbols begin fading in
const SYM_PEAK      = 300;   // ms – symbols at full opacity / scatter starts
const SYM_END       = 1200;   // ms – symbols fully gone
const SYM_SPACING   = 10;    // px between symbol sample points along segment
const MAX_SCATTER   = 40;    // px max scatter distance
const SYM_BASE_SIZE = 16;    // base font size in px
const SYM_ZOOM_IN   = 3.2;   // max scale for symbols flying toward viewer
const SYM_ZOOM_OUT  = 0.25;  // min scale for symbols flying away from viewer
const MIN_MOVE_SQ     = 250;    // skip point if moved less than ~4.5 px
const SMOOTH_PASSES   = 4;     // ← SMOOTHNESS: Laplacian passes (0 = off, 1–8 range)
const CATMULL_TENSION = 0.5;   // ← TENSION: spline roundness (0 = straight, 0.5 = standard, 1 = very round)
const STROKE_WIDTH = 2;  // main line thickness in px

// const SYMBOLS = '10codevvarletfunction#@$%&*(){}<>!?/\\^~|=+[];:\''.split('');
const SYMBOLS = 'I can create images and write code'.split('');

// ── Colormap palette (256 steps, rainbow) ─────────────────────────────────
const PALETTE = colormap({
  colormap: 'magma',
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

/**
 * Weighted Laplacian smoothing — each interior point is blended toward
 * the average of its two neighbours.  More passes = smoother path.
 */
function smoothTrail(pts: Pt[], passes: number): Pt[] {
  if (passes === 0 || pts.length < 3) return pts;
  let result = pts.slice();
  for (let p = 0; p < passes; p++) {
    const next: Pt[] = [result[0]];
    for (let i = 1; i < result.length - 1; i++) {
      next.push({
        x: result[i - 1].x * 0.25 + result[i].x * 0.5 + result[i + 1].x * 0.25,
        y: result[i - 1].y * 0.25 + result[i].y * 0.5 + result[i + 1].y * 0.25,
        t: result[i].t,
      });
    }
    next.push(result[result.length - 1]);
    result = next;
  }
  return result;
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

        // Smooth trail positions before drawing (keeps original trail for aging)
        const drawTrail = smoothTrail(trail, SMOOTH_PASSES);

        // ── Phase 1: smooth strokes via Catmull-Rom → cubic Bezier ────────
        for (let pass = 0; pass < 2; pass++) {
          for (let i = 1; i < drawTrail.length; i++) {
            const p0 = drawTrail[Math.max(0, i - 2)];
            const p1 = drawTrail[i - 1];
            const p2 = drawTrail[i];
            const p3 = drawTrail[Math.min(drawTrail.length - 1, i + 1)];

            const age = now - p1.t;
            if (age >= SYM_START) continue;

            const t     = age / SYM_START;
            const alpha = Math.max(0, 1 - t * t);
            if (alpha < 0.01) continue;

            // Catmull-Rom → cubic Bezier (CATMULL_TENSION controls roundness)
            const cp1x = p1.x + (p2.x - p0.x) * CATMULL_TENSION / 3;
            const cp1y = p1.y + (p2.y - p0.y) * CATMULL_TENSION / 3;
            const cp2x = p2.x - (p3.x - p1.x) * CATMULL_TENSION / 3;
            const cp2y = p2.y - (p3.y - p1.y) * CATMULL_TENSION / 3;

            const trailT      = drawTrail.length > 1 ? i / (drawTrail.length - 1) : 0;
            const strokeAlpha = alpha * (pass === 0 ? 0.85 : 0.40);
            ctx.strokeStyle   = palColor(trailT, strokeAlpha);
            ctx.lineWidth     = pass === 0 ? STROKE_WIDTH : STROKE_WIDTH * 1.5;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
            ctx.stroke();
          }
        }

        // ── Phase 2: symbols fade in, scatter, then fade out ───────────
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';

        for (let i = 1; i < drawTrail.length; i++) {
          const a   = drawTrail[i - 1];
          const b   = drawTrail[i];
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
    <div className="fixed z-100 inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
