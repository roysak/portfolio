import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    color: string;
}

interface PixelExplosionProps {
    src: string;
    alt?: string;
    className?: string;
}

const GAP = 4;
const EXPLOSION_RADIUS = 130;
const EXPLOSION_STRENGTH = 25;
const SPRING = 0.04;
const FRICTION = 0.87;

export default function PixelExplosion({ src, alt = "", className = "" }: PixelExplosionProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animId: number;
        let mouseX = -9999;
        let mouseY = -9999;
        let isActive = false;

        const setup = (imgEl: HTMLImageElement) => {
            const w = canvas.offsetWidth;
            if (!w) return;
            const h = Math.round((w * imgEl.naturalHeight) / imgEl.naturalWidth);
            canvas.width = w;
            canvas.height = h;
            canvas.style.height = `${h}px`;

            const off = document.createElement("canvas");
            off.width = w;
            off.height = h;
            const offCtx = off.getContext("2d")!;
            offCtx.drawImage(imgEl, 0, 0, w, h);
            const { data } = offCtx.getImageData(0, 0, w, h);

            particles = [];
            for (let y = 0; y < h; y += GAP) {
                for (let x = 0; x < w; x += GAP) {
                    const idx = (y * w + x) * 4;
                    const a = data[idx + 3];
                    if (a < 10) continue;
                    particles.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        color: `rgba(${data[idx]},${data[idx + 1]},${data[idx + 2]},${(a / 255).toFixed(3)})`,
                    });
                }
            }
        };

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particles) {
                if (isActive) {
                    const dx = p.x - mouseX;
                    const dy = p.y - mouseY;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < EXPLOSION_RADIUS * EXPLOSION_RADIUS && distSq > 0) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / EXPLOSION_RADIUS) * EXPLOSION_STRENGTH;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                // Spring back to origin
                p.vx += (p.originX - p.x) * SPRING;
                p.vy += (p.originY - p.y) * SPRING;

                // Friction
                p.vx *= FRICTION;
                p.vy *= FRICTION;

                p.x += p.vx;
                p.y += p.vy;

                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, GAP - 1, GAP - 1);
            }

            animId = requestAnimationFrame(tick);
        };

        const img = new Image();
        img.src = src;
        img.onload = () => {
            setup(img);
            tick();
        };

        const onMove = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect();
            mouseX = (e.clientX - r.left) * (canvas.width / r.width);
            mouseY = (e.clientY - r.top) * (canvas.height / r.height);
            isActive = true;
        };

        const onLeave = () => {
            isActive = false;
        };

        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseleave", onLeave);

        const ro = new ResizeObserver(() => {
            if (img.complete && img.naturalWidth) {
                setup(img);
            }
        });
        ro.observe(canvas);

        return () => {
            cancelAnimationFrame(animId);
            canvas.removeEventListener("mousemove", onMove);
            canvas.removeEventListener("mouseleave", onLeave);
            ro.disconnect();
        };
    }, [src]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            role="img"
            aria-label={alt}
        />
    );
}
