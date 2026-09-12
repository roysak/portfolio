import { useEffect, useRef } from "react";

/**
 * Two-part pointer: a dot pinned to the cursor and a ring that trails it.
 * The ring takes its corner radius from the active mode's tokens, so it reads
 * as a circle on paper and as a square reticle in code mode.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const target = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };
    let raf = 0;
    let seen = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!seen) {
        seen = true;
        trail.x = target.x;
        trail.y = target.y;
        dot.classList.add("on");
        ring.classList.add("on");
      }
    };

    const onLeave = () => {
      dot.classList.remove("on");
      ring.classList.remove("on");
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      const big = !!el?.closest("a, button, [data-cursor='big'], input, textarea, select");
      dot.classList.toggle("big", big);
      ring.classList.toggle("big", big);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      trail.x += (target.x - trail.x) * 0.16;
      trail.y += (target.y - trail.y) * 0.16;
      dot.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`;
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
