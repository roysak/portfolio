import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { assetUrl } from "../utils/assetUrl";

const links = [
  { to: "/case-studies", label: "Case Studies" },
  { to: "/works", label: "Works" },
  { to: "/resume", label: "Resume" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggle } = useTheme();

  // Publish nav height as a CSS variable so sticky in-page navs can offset themselves
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

  return (
    <nav
      ref={navRef}
      className="site-nav fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-gutter py-4"
    >
      <NavLink to="/" className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.1em]">
        {/* <span
          className="w-2.5 h-2.5 rounded-full bg-[#E4B04A] shadow-[0_0_0_4px_rgba(228,176,74,0.25)]"
          aria-hidden="true"
        /> */}
        <img src={assetUrl("/img/logo.svg")} alt="Roys A Kareem" className="w-[40px] h-auto" />
        <span className="hidden sm:inline">Roys A Kareem</span>
      </NavLink>

      <ul className="flex items-center gap-4 sm:gap-7 list-none m-0 p-0">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                `nav-link relative py-1.5 font-mono text-xs uppercase tracking-[0.1em] ${isActive ? "current" : ""}`
              }
            >
              {l.label}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="w-[26px] h-[26px] rounded-full border border-current grid place-items-center"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
