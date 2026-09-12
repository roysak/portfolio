import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { assetUrl } from "../utils/assetUrl";
import { LocalTime } from "./system";

const links = [
  { to: "/case-studies", label: "Case Studies" },
  { to: "/works", label: "Works" },
  { to: "/blog", label: "Notes" },
  { to: "/resume", label: "Resume" },
];

/** The running head: a ruled bar carrying the masthead, the index and the time. */
export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggle } = useTheme();

  // Publish nav height so sticky in-page navs can offset themselves.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const update = () =>
      document.documentElement.style.setProperty("--nav-height", `${el.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="no-select fixed top-0 left-0 right-0 z-50 bg-paper/85 backdrop-blur-sm border-b border-rule"
    >
      <div className="flex items-center justify-between gap-6 px-margin py-3">
        <NavLink to="/" className="flex items-center gap-3 shrink-0" aria-label="Roys A Kareem — home">
          <img src={assetUrl("/img/logo.svg")} alt="" className="w-8 h-auto" />
          <span className="label label-ink hidden sm:inline">Roys A Kareem</span>
        </NavLink>

        <LocalTime className="hidden lg:inline" />

        <ul className="flex items-center gap-5 sm:gap-8 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `label group transition-colors hover:text-ink ${isActive ? "text-ink" : ""}`
                }
              >
                {({ isActive }) => (
                  <span className="relative inline-block py-1">
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 -bottom-0.5 h-px w-full bg-accent origin-left transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "light" ? "ink" : "paper"} ground`}
              title={theme === "light" ? "Ink" : "Paper"}
              className="w-4 h-4 border border-rule-2 grid place-items-center transition-colors hover:border-accent"
            >
              <span
                aria-hidden="true"
                className={`block w-2 h-2 transition-colors ${theme === "dark" ? "bg-ink" : "bg-transparent"}`}
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
