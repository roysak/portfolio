import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "theme";

function readStored(): Theme {
  try {
    const t = localStorage.getItem(KEY);
    if (t === "light" || t === "dark") return t;
  } catch {
    /* storage unavailable */
  }
  return "dark";
}

function apply(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/** User-selectable theme, persisted in localStorage. Dark is the default. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readStored);

  useEffect(() => {
    apply(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}

/**
 * Forces the light variant while the calling page is mounted and restores the
 * user's choice on unmount. Used by long-form pages whose components are
 * authored against a light ground (case study details, blog, articles).
 */
export function useForceLightTheme() {
  useEffect(() => {
    const previous = document.documentElement.getAttribute("data-theme");
    apply("light");
    return () => {
      if (previous) document.documentElement.setAttribute("data-theme", previous);
      else document.documentElement.removeAttribute("data-theme");
    };
  }, []);
}
