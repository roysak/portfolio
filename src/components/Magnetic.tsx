import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** How far the element is allowed to chase the pointer, as a fraction. */
  strength?: number;
  className?: string;
}

/**
 * Wraps an interactive element so it leans toward the pointer while hovered
 * and springs back on exit. Skipped for coarse pointers and reduced motion.
 */
export default function Magnetic({ children, strength = 0.32, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-500 ease-art will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
