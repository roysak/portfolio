import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The one easing this system uses. Print doesn't bounce. */
export const EASE = "expo.out";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scopes a set of GSAP tweens to a container and reverts them on unmount.
 * Returns a no-op ref when the visitor has asked for reduced motion, so every
 * caller gets motion-safety for free rather than remembering to guard.
 */
export function useMotion<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: { scope: T }) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope || prefersReducedMotion()) return;

    const ctx = gsap.context(() => setup({ scope }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * The signature move — hairlines draw in from the left, headlines set line by
 * line, plates clip up from their bottom edge. Applied by class so pages stay
 * declarative: add `data-rule`, `data-set` or `data-plate` and it animates.
 */
export function useSpreadMotion<T extends HTMLElement = HTMLElement>() {
  return useMotion<T>(({ scope }) => {
    const at = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, scope);

    at("[data-rule]").forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        duration: 1.1,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 92%" },
      });
    });

    at("[data-set]").forEach((el) => {
      const lines = el.querySelectorAll<HTMLElement>(".line-mask > span");
      // Masked lines can slide the full height because the mask hides the
      // overflow. An unmasked heading has nothing to hide behind, so it rises
      // a short distance and fades instead of sweeping across its neighbours.
      const from = lines.length
        ? { yPercent: 108 }
        : { y: 24, opacity: 0 };

      gsap.from(lines.length ? lines : [el], {
        ...from,
        duration: 1,
        ease: EASE,
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    at("[data-plate]").forEach((el) => {
      gsap.from(el, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.15,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
      const media = el.querySelector<HTMLElement>(".plate-media");
      if (media) {
        gsap.from(media, {
          scale: 1.08,
          duration: 1.4,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      }
    });

    at("[data-fade]").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 92%" },
      });
    });
  });
}

/** Recomputes ScrollTrigger positions once late-loading media settles. */
export function useScrollRefresh(deps: unknown[] = []) {
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
