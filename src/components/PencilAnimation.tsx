import { useEffect, useRef } from 'react';

// ── Timing (ms) ───────────────────────────────────────────────────────────
const SKETCH_LIFETIME = 450;  // sketch lines fully faded (short-lived)
const BINARY_START    = 200;  // binary chars begin appearing
const BINARY_PEAK     = 400;  // binary chars at full opacity
const BINARY_END      = 1400; // binary chars fully gone (long scatter tail)
const POINT_LIFETIME  = 1500; // points removed from trail

// ── Sketch / binary config ────────────────────────────────────────────────
const BINARY_SPACING  = 4;   // px between binary chars along segment
const MAX_SCATTER     = 55;   // px a binary char drifts before gone
const FONT_SIZE       = 11;
const FONT_STYLE      = `bold ${FONT_SIZE}px "Courier New", monospace`;
const MIN_MOVE_SQ     = 6;    // skip point if moved less than √6 px

// Four overlapping strokes — [perp-offset px, base alpha, line width, hsl hue]
// Larger offsets + distinct hues give a vivid scrambled sketch look
const SKETCH_VARIANTS: [number, number, number, number][] = [
  [  0,    0.90, 1.4,  195 ],  // cyan-blue   (primary)
  [  2.8,  0.60, 1.0,  320 ],  // hot pink
  [ -2.2,  0.50, 0.9,  150 ],  // mint green
  [  1.4,  0.35, 0.7,   45 ],  // amber
];

interface Pt { x: number; y: number; t: number }

// ── Deterministic helpers keyed on snapped grid cell ─────────────────────

// Stable 0/1 char for each cell
function getBinChar(x: number, y: number): '0' | '1' {
  const h = Math.sin(
    Math.floor(x / BINARY_SPACING) * 127.1 +
    Math.floor(y / BINARY_SPACING) * 311.7,
  ) * 43758.5453;
  return (h - Math.floor(h)) > 0.5 ? '1' : '0';
}

// Scatter direction (radians) for each binary char — fixed per spawn cell
function getScatterAngle(x: number, y: number): number {
  const h = Math.sin(
    Math.floor(x / BINARY_SPACING) * 213.3 +
    Math.floor(y / BINARY_SPACING) * 571.9,
  ) * 43758.5453;
  return (h - Math.floor(h)) * Math.PI * 2;
}

// ── React Component ───────────────────────────────────────────────────────

export default function PencilAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let trail: Pt[] = [];
    let rafId        = 0;
    let loopActive   = false;
    let resizeTimer  = 0;

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
      trail = trail.filter(p => now - p.t < POINT_LIFETIME);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trail.length >= 2) {
        ctx.font         = FONT_STYLE;
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.lineCap      = 'round';
        ctx.lineJoin     = 'round';

        for (let i = 1; i < trail.length; i++) {
          const a   = trail[i - 1];
          const b   = trail[i];
          const age = now - a.t;

          const dx  = b.x - a.x;
          const dy  = b.y - a.y;
          const len = Math.hypot(dx, dy);
          if (len === 0) continue;

          const nx = -dy / len;
          const ny =  dx / len;

          // ── Phase 1: vivid scrambled multi-color sketch strokes ──────
          if (age < SKETCH_LIFETIME) {
            const fade = 1 - age / SKETCH_LIFETIME;
            // Midpoint bezier smoothing — start at mid(prev,a), curve to mid(a,b)
            const prev = i >= 2 ? trail[i - 2] : a;
            const smx  = (prev.x + a.x) * 0.5;
            const smy  = (prev.y + a.y) * 0.5;
            const emx  = (a.x + b.x) * 0.5;
            const emy  = (a.y + b.y) * 0.5;
            for (let v = 0; v < SKETCH_VARIANTS.length; v++) {
              const [off, baseAlpha, width, hue] = SKETCH_VARIANTS[v];
              const ox = nx * off;
              const oy = ny * off;
              const alpha = (baseAlpha * fade).toFixed(3);
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${hue},90%,55%,${alpha})`;
              ctx.lineWidth   = width;
              ctx.moveTo(smx + ox, smy + oy);
              ctx.quadraticCurveTo(a.x + ox, a.y + oy, emx + ox, emy + oy);
              ctx.stroke();
            }
          }

          // ── Phase 2→3: binary chars fade in, scatter, then fade out ──
          if (age >= BINARY_START && age < BINARY_END) {
            const binAlpha = age < BINARY_PEAK
              ? (age - BINARY_START) / (BINARY_PEAK - BINARY_START)
              : 1 - (age - BINARY_PEAK) / (BINARY_END - BINARY_PEAK);

            if (binAlpha > 0.01) {
              // How far into the scatter phase (0 → 1 after BINARY_PEAK)
              const scatterT = age < BINARY_PEAK
                ? 0
                : (age - BINARY_PEAK) / (BINARY_END - BINARY_PEAK);
              const scatterDist = scatterT * scatterT * MAX_SCATTER; // ease-in

              const steps = Math.max(1, Math.floor(len / BINARY_SPACING));
              for (let s = 0; s <= steps; s++) {
                const t   = s / steps;
                const spx = a.x + dx * t;
                const spy = a.y + dy * t;

                const angle = getScatterAngle(spx, spy);
                const px = spx + Math.cos(angle) * scatterDist;
                const py = spy + Math.sin(angle) * scatterDist;

                // Slowly cycle hue — ~6° per trail segment, ~2° per char
                const hue = (i * 6 + s * 2) % 360;
                ctx.fillStyle = `hsla(${hue},85%,55%,${Math.min(1, binAlpha).toFixed(3)})`;
                ctx.fillText(getBinChar(spx, spy), px, py);
              }
            }
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
