import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import ModeSwitch from "./ModeSwitch";

const links = [
  { to: "/case-studies", label: "Case studies" },
  { to: "/works", label: "Works" },
  // { to: "/blog", label: "Blog" },
  { to: "/resume", label: "Resume" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  // Publish the masthead height so sticky in-page navs and scroll padding can offset themselves.
  useEffect(() => {
    const update = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty("--nav-height", `${navRef.current.offsetHeight}px`);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="progress-rail" aria-hidden="true">
        <i />
      </div>

      <nav
        ref={navRef}
        data-stuck={stuck}
        className="site-nav fixed top-0 left-0 right-0 z-50 border-b border-transparent px-gutter py-4 flex items-center justify-between gap-4"
      >
        <NavLink
          to="/"
          className="flex items-center gap-3 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo className="w-8 h-8 text-pigment shrink-0" />
          <span className="hidden sm:grid leading-tight">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Roys A Kareem</span>
            <span className="label text-[10px]">Designer / Developer</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `nav-link relative py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-pigment ${
                    isActive ? "current text-bone" : "text-bone-2"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ModeSwitch />
          <button
            type="button"
            className="md:hidden w-10 h-10 rounded-art-pill border border-line-strong grid place-items-center transition-colors hover:bg-bone hover:text-ink"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="md:hidden fixed inset-0 z-40 bg-ink/97 backdrop-blur-lg pt-[calc(var(--nav-height,72px)+24px)] px-gutter"
      >
        <ul className="list-none m-0 p-0 grid border-t border-line">
          {links.map((l) => (
            <li key={l.to} className="border-b border-line">
              <NavLink
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-6 font-display text-[clamp(30px,9vw,48px)] leading-none"
              >
                {l.label}
                <span className="label tag-num">{String(links.indexOf(l) + 1).padStart(2, "0")}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
