import { useEffect, useRef } from "react";

/** A single pigment dot that follows the pointer and grows over interactive elements. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;

    const onMove = (e: PointerEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.classList.add("on");
    };
    const onLeave = () => dot.classList.remove("on");
    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      dot.classList.toggle("big", !!el?.closest("a, button, [data-cursor='big']"));
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}
