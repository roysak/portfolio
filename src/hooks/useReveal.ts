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
    // Without the observer we must never hide anything, or the content would
    // stay invisible for good.
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove("pre");
            io.unobserve(e.target);
          }
        }
      },
      // Fire as soon as any sliver enters: a threshold large enough to need a
      // chunk of a tall section visible can leave it hidden on short viewports.
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
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
