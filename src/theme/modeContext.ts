import { createContext, useContext } from "react";

/** The two halves of the portfolio. `design` is paper, `code` is ink. */
export type Mode = "design" | "code";

/** Where on screen the mode flip should originate from, in client coordinates. */
export interface Origin {
  x: number;
  y: number;
}

export interface ModeApi {
  mode: Mode;
  /** The mode that is *not* current — handy for labelling the switch. */
  other: Mode;
  set: (mode: Mode, origin?: Origin) => void;
  toggle: (origin?: Origin) => void;
}

export const ModeContext = createContext<ModeApi>({
  mode: "design",
  other: "code",
  set: () => {},
  toggle: () => {},
});

export const useMode = () => useContext(ModeContext);

export const MODE_KEY = "mode";

/** Reads the persisted mode. Mirrors the bootstrap script in index.html. */
export function readMode(): Mode {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-mode");
    if (attr === "design" || attr === "code") return attr;
  }
  try {
    const stored = localStorage.getItem(MODE_KEY);
    if (stored === "design" || stored === "code") return stored;
  } catch {
    /* storage unavailable */
  }
  return "design";
}
