import { useEffect, useRef } from 'react';
import colormap from 'colormap';

// ── Swap this string to try any colormap name, e.g. 'jet', 'hot', ────────
// ── 'cool', 'spring', 'hsv', 'rainbow', 'portland', 'blackbody' ──────────
const COLORMAP_NAME = 'inferno';
const NSHADES = 20;

const PALETTE: readonly string[] = colormap({
  colormap: COLORMAP_NAME, // hack to get reverse palette since colormap lib doesn't support it
  nshades: NSHADES,
  format: 'hex',
  alpha: 1,
}).toReversed() as readonly string[]; // assert immutability since we rely on stable references for performance

console.log("Pallette", PALETTE,  PALETTE.toReversed()) // we want dark colors for small displacement and bright colors for large displacement

// ── Dot — pure physics state, no canvas reference ────────────────────────

class Dot {
  x: number;
  y: number;
  vx = 0;
  vy = 0;
  readonly ix: number;
  readonly iy: number;
  size = 8;         // default (far) value
  thickness = 0.5; // default (far) value
  color = PALETTE[0];

  private static readonly MIN_DIST    = 200;
  private static readonly MIN_DIST_SQ = 200 * 200;
  private static readonly INFL_SQ    = 250 * 250; // size/thickness influence radius
  private static readonly PUSH_FACTOR = 0.009;
  private static readonly PULL_FACTOR = 0.006;
  private static readonly DAMP_FACTOR = 0.9;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.ix = x;
    this.iy = y;
  }

  // Returns squared velocity magnitude so the loop can track idle state
  update(cx: number, cy: number): number {
    // Origin displacement — used for pull force AND viridis color index
    const odx = this.ix - this.x;
    const ody = this.iy - this.y;
    const od  = Math.sqrt(odx * odx + ody * ody);
    const idx = Math.min(Math.floor((od / 40) * (NSHADES - 1)), NSHADES - 1);
    this.color = PALETTE[idx];

    let ax = odx * Dot.PULL_FACTOR;
    let ay = ody * Dot.PULL_FACTOR;

    const dx  = this.x - cx;
    const dy  = this.y - cy;
    const dd2 = dx * dx + dy * dy;

    // Avoid sqrt entirely for dots outside the influence radius
    if (dd2 < Dot.INFL_SQ) {
      const dd = Math.sqrt(dd2);
      // Inline mapRange(dd, 0, 250, 2, 0.5) and mapRange(dd, 0, 250, 12, 8)
      const t  = dd / 250;
      this.thickness = 2   - t * 1.5;
      this.size      = 12  - t * 4;
      if (dd2 < Dot.MIN_DIST_SQ && dd > 0) {
        const distDelta = Dot.MIN_DIST - dd;
        ax += (dx / dd) * distDelta * Dot.PUSH_FACTOR;
        ay += (dy / dd) * distDelta * Dot.PUSH_FACTOR;
      }
    } else {
      this.thickness = 0.5;
      this.size      = 8;
    }

    this.vx = (this.vx + ax) * Dot.DAMP_FACTOR;
    this.vy = (this.vy + ay) * Dot.DAMP_FACTOR;
    this.x += this.vx;
    this.y += this.vy;

    return this.vx * this.vx + this.vy * this.vy;
  }
}

// ── React Component ───────────────────────────────────────────────────────

const GAP = 40;

export default function GridAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cursor in canvas-space coords; far off-screen by default
    let cursorX = 9999;
    let cursorY = 9999;

    // Cached bounding rect — updated on resize only, not per-mousemove
    let rect = canvas.getBoundingClientRect();

    let dots: Dot[] = [];
    let animFrameId = 0;
    let resizeTimer  = 0;

    // ── Build dot grid ──────────────────────────────────────────────────
    const buildDots = () => {
      dots = [];
      const w = canvas.width;
      const h = canvas.height;
      const spaceX = (w % GAP) * 0.5 - 4.5;
      const spaceY = (h % GAP) * 0.5 - 4.5;
      for (let x = spaceX; x < w; x += GAP) {
        for (let y = spaceY; y < h; y += GAP) {
          dots.push(new Dot(x, y));
        }
      }
    };

    const setup = () => {
      const parent = canvas.parentElement ?? canvas;
      canvas.width  = parent.clientWidth;
      canvas.height = parent.clientHeight;
      rect   = canvas.getBoundingClientRect(); // refresh cached rect
      scaleX = canvas.width  / rect.width;
      scaleY = canvas.height / rect.height;
      buildDots();
      startLoop(); // redraw after resize
    };

    // ── Draw all dots — color set per-dot from viridis palette ────────
    const drawDots = () => {
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        ctx.fillStyle = d.color;
        const half  = d.size * 0.5;
        const halfT = d.thickness * 0.5;
        // vertical bar
        ctx.fillRect(d.x + half - halfT, d.y, d.thickness, d.size);
        // horizontal bar
        ctx.fillRect(d.x, d.y + half - halfT, d.size, d.thickness);
      }
    };

    // Cached scale factors — recomputed only on resize, not per-mousemove
    let scaleX = 1;
    let scaleY = 1;

    // ── Stop-start rAF — loop runs only while dots are moving ───────────
    let loopActive = false;

    const tick = () => {
      if (document.hidden) {
        animFrameId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let maxVelSq = 0;
      for (let i = 0; i < dots.length; i++) {
        const v2 = dots[i].update(cursorX, cursorY);
        if (v2 > maxVelSq) maxVelSq = v2;
      }
      drawDots();

      // Keep looping if cursor is influencing dots OR dots are still settling
      if (cursorX < 9000 || maxVelSq > 0.00005) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        loopActive = false;
      }
    };

    const startLoop = () => {
      if (!loopActive) {
        loopActive = true;
        animFrameId = requestAnimationFrame(tick);
      }
    };

    // ── Mouse tracking ──────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      cursorX = (e.clientX - rect.left) * scaleX;
      cursorY = (e.clientY - rect.top)  * scaleY;
      startLoop();
    };

    const onMouseLeave = () => {
      cursorX = 9999;
      cursorY = 9999;
    };

    // ── Debounced resize — prevents rapid dot-array rebuilding ──────────
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 100);
    });

    document.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    setup();
    observer.observe(canvas.parentElement ?? canvas);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      document.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
