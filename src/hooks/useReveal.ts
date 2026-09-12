import { useEffect, useRef } from "react";

/**
 * Attach to a container. Every descendant with `.reveal` that sits below the
 * fold gets the `.pre` class and animates in when it scrolls into view.
 * Elements already visible on load are left untouched so the page is
 * readable at rest.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove("pre");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("pre");
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return ref;
}
