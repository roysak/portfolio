import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useLenis } from "../hooks/useLenis";
import { useGridOverlay } from "../hooks/useGridOverlay";
import { gsap, prefersReducedMotion } from "../hooks/useMotion";

/** The grid, made visible. Held down on `G`. */
function GridOverlay({ on }: { on: boolean }) {
  return (
    <div className={`grid-overlay ${on ? "on" : ""}`} aria-hidden="true">
      <div>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}

/** A paper wipe between routes — a page turning, not a fade. */
function useWipe(key: string) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tl = gsap.timeline();
    tl.set(el, { scaleY: 1, transformOrigin: "top" })
      .to(el, { scaleY: 0, transformOrigin: "bottom", duration: 0.7, ease: "expo.inOut" });
    return () => {
      tl.kill();
    };
  }, [key]);

  return ref;
}

export default function RootLayout() {
  const { pathname } = useLocation();
  const gridOn = useGridOverlay();
  const wipeRef = useWipe(pathname);
  useLenis();

  // Every route starts at the top of its spread.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased">
      <Nav />
      <div className="flex flex-col flex-1 min-w-0 w-full pt-[var(--nav-height,56px)]">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
      <GridOverlay on={gridOn} />
      <div ref={wipeRef} className="wipe" style={{ transform: "scaleY(0)" }} aria-hidden="true" />
    </div>
  );
}
