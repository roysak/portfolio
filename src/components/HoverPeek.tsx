import { useEffect, useRef, useState, type ReactNode } from "react";
import { PeekContext, type PeekApi } from "./peekContext";

/** Provides a cursor-following image preview. Wrap a list; call `usePeek()` on rows. */
export function HoverPeekProvider({ children }: { children: ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("pointermove", onMove);
    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (boxRef.current) {
        boxRef.current.style.left = `${pos.current.x}px`;
        boxRef.current.style.top = `${pos.current.y}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const api: PeekApi = {
    show: (s) => setSrc(s),
    hide: () => setSrc(null),
  };

  return (
    <PeekContext.Provider value={api}>
      {children}
      <div ref={boxRef} className={`peek ${src ? "on" : ""}`} aria-hidden="true">
        {src && <img src={src} alt="" className="w-full h-full object-cover object-top" />}
      </div>
    </PeekContext.Provider>
  );
}
