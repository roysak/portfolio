import { useEffect, useRef, useCallback } from 'react';

interface DotRippleProps {
  dotSpacing?: number;
  baseDotRadius?: number;
  maxDotRadius?: number;
  rippleSpeed?: number;
  rippleThickness?: number;
  fadeDistance?: number;
  bgColor?: string;
  dotColor?: string;
  highlightColor?: string;
  shape?: 'circle' | 'square' | 'triangle' | 'hexagon';
  sides?: number;
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
}

export default function DotRipple({
  dotSpacing = 20,
  baseDotRadius = 1.5,
  maxDotRadius = 8,
  rippleSpeed = 6,
  rippleThickness = 100,
  fadeDistance = 300,
  bgColor = '#1c1820',
  dotColor = '#2E2338',
  highlightColor = '#4F34B3',
  shape = 'circle',
  sides = 5,
  className,
}: DotRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const dotsRef = useRef<{ x: number; y: number }[]>([]);

  const propsRef = useRef({
    dotSpacing, baseDotRadius, maxDotRadius, rippleSpeed,
    rippleThickness, fadeDistance, dotColor, highlightColor, shape, sides,
  });
  propsRef.current = {
    dotSpacing, baseDotRadius, maxDotRadius, rippleSpeed,
    rippleThickness, fadeDistance, dotColor, highlightColor, shape, sides,
  };

  const createGrid = useCallback((width: number, height: number) => {
    const dots: { x: number; y: number }[] = [];
    const spacing = propsRef.current.dotSpacing;
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dots.push({ x, y });
      }
    }
    dotsRef.current = dots;
  }, []);

  const interpolateColor = useCallback((color1: string, color2: string, factor: number) => {
    const hexToRgb = (hex: string) => hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const r = Math.round(rgb1[0] + factor * (rgb2[0] - rgb1[0]));
    const g = Math.round(rgb1[1] + factor * (rgb2[1] - rgb1[1]));
    const b = Math.round(rgb1[2] + factor * (rgb2[2] - rgb1[2]));
    return `rgb(${r}, ${g}, ${b})`;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      createGrid(w, h);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let maxDiagonal = 0;

    const animate = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      maxDiagonal = Math.hypot(w, h);

      const cfg = propsRef.current;
      const ripples = ripplesRef.current;
      const dots = dotsRef.current;

      ctx.clearRect(0, 0, w, h);

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].radius += cfg.rippleSpeed;
        if (ripples[i].radius - cfg.rippleThickness > maxDiagonal || ripples[i].radius > cfg.fadeDistance) {
          ripples.splice(i, 1);
        }
      }

      // Draw dots
      for (const dot of dots) {
        let currentRadius = cfg.baseDotRadius;
        let intensity = 0;

        for (const ripple of ripples) {
          const distance = Math.hypot(dot.x - ripple.x, dot.y - ripple.y);
          const diff = Math.abs(distance - ripple.radius);

          if (diff < cfg.rippleThickness) {
            const normalizedDiff = diff / cfg.rippleThickness;
            const lifeFactor = Math.max(0, 1 - (ripple.radius / cfg.fadeDistance));
            const rippleEffect = Math.cos(normalizedDiff * Math.PI / 2) * lifeFactor;
            intensity = Math.max(intensity, rippleEffect);
          }
        }

        currentRadius += intensity * (cfg.maxDotRadius - cfg.baseDotRadius);

        ctx.beginPath();
        if (cfg.shape === 'circle') {
          ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        } else if (cfg.shape === 'square') {
          ctx.rect(dot.x - currentRadius, dot.y - currentRadius, currentRadius * 2, currentRadius * 2);
        } else {
          let numSides = 3;
          if (cfg.shape === 'triangle') numSides = 3;
          else if (cfg.shape === 'hexagon') numSides = 6;
          else numSides = cfg.sides;

          for (let i = 0; i < numSides; i++) {
            const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
            const px = dot.x + currentRadius * Math.cos(angle);
            const py = dot.y + currentRadius * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        }

        if (intensity > 0.01) {
          ctx.fillStyle = interpolateColor(cfg.dotColor, cfg.highlightColor, intensity);
        } else {
          ctx.fillStyle = cfg.dotColor;
        }
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      if ('touches' in e) {
        for (let i = 0; i < e.touches.length; i++) {
          ripplesRef.current.push({
            x: e.touches[i].clientX - rect.left,
            y: e.touches[i].clientY - rect.top,
            radius: 0,
          });
        }
      } else {
        ripplesRef.current.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          radius: 0,
        });
      }
    };

    container.addEventListener('mousedown', onPointerDown as EventListener);
    container.addEventListener('touchstart', onPointerDown as EventListener);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      container.removeEventListener('mousedown', onPointerDown as EventListener);
      container.removeEventListener('touchstart', onPointerDown as EventListener);
    };
  }, [createGrid, interpolateColor]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', backgroundColor: bgColor, overflow: 'hidden' }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
