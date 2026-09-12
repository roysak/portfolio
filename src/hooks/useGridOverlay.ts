import { useEffect, useState } from "react";

/**
 * Hold `G` to see the grid the whole site is built on. An easter egg for the
 * three people who will try it — and a fair demonstration that the grid is
 * real rather than decorative.
 */
export function useGridOverlay() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const isTyping = (t: EventTarget | null) =>
      t instanceof HTMLElement &&
      (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);

    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "g" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;
      setOn(true);
    };
    const up = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g") setOn(false);
    };
    const blur = () => setOn(false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  return on;
}
