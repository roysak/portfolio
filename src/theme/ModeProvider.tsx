import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { MODE_KEY, ModeContext, readMode, type Mode, type ModeApi, type Origin } from "./modeContext";

/** `document.startViewTransition` is still missing from some TS DOM libs. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

function applyMode(mode: Mode) {
  const root = document.documentElement;
  root.setAttribute("data-mode", mode);
  root.style.colorScheme = mode === "code" ? "dark" : "light";
}

/**
 * Owns the design/code mode.
 *
 * Flipping paints a circular wipe out of whatever was clicked, using the View
 * Transitions API. `flushSync` is required so the DOM is already in its new
 * state when the browser snapshots the "after" frame. Browsers without the API
 * — and anyone who asked for reduced motion — get an instant swap, which the
 * token transitions on `body` still soften.
 */
export default function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(readMode);
  // `set` runs from event handlers and needs the committed value, not a closure
  // captured at render time.
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
    applyMode(mode);
  }, [mode]);

  const commit = useCallback((next: Mode) => {
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    setMode(next);
  }, []);

  const set = useCallback(
    (next: Mode, origin?: Origin) => {
      if (next === modeRef.current) return;

      const root = document.documentElement;
      const doc = document as ViewTransitionDocument;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced || typeof doc.startViewTransition !== "function") {
        commit(next);
        return;
      }

      root.style.setProperty("--vt-x", `${origin?.x ?? window.innerWidth - 72}px`);
      root.style.setProperty("--vt-y", `${origin?.y ?? 44}px`);
      root.dataset.vt = "mode";

      const transition = doc.startViewTransition(() => {
        flushSync(() => commit(next));
      });
      transition.finished.finally(() => {
        delete root.dataset.vt;
      });
    },
    [commit],
  );

  const toggle = useCallback(
    (origin?: Origin) => set(modeRef.current === "design" ? "code" : "design", origin),
    [set],
  );

  const api = useMemo<ModeApi>(
    () => ({ mode, other: mode === "design" ? "code" : "design", set, toggle }),
    [mode, set, toggle],
  );

  return <ModeContext.Provider value={api}>{children}</ModeContext.Provider>;
}
