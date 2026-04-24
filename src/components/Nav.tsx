import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import { useScrollDirection } from "../hooks/useScrollDirection";

export default function Nav() {
  const scrollDir = useScrollDirection();
  const navRef = useRef<HTMLElement>(null);

  // Publish nav height as a CSS variable so other sticky elements can offset themselves
  useEffect(() => {
    const update = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          '--nav-height',
          `${navRef.current.offsetHeight}px`
        );
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-neutral-900"
        : "text-neutral-400 hover:text-neutral-700"
    }`;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-transform duration-300 ${
        scrollDir === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="w-full mx-auto pl-3 py-4 pr-6 flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold tracking-tight text-neutral-900 hover:scale-[1.3] transition-all duration-300">
          <img src={assetUrl('/img/logo.svg')} className="w-10 h-10" />
        </NavLink>

        <ul className="flex items-center gap-8">
          <li>
            <NavLink to="/case-studies" className={linkClass}>
              Case Studies
            </NavLink>
          </li>
          <li>
            <NavLink to="/works" className={linkClass}>
              Works
            </NavLink>
          </li>
          <li>
            <NavLink to="/resume" className={linkClass}>
              Resume
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
