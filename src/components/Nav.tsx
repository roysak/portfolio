import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-neutral-900"
        : "text-neutral-400 hover:text-neutral-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md w-full mx-auto px-6 py-4 flex items-center justify-between">
      <NavLink to="/" className="text-lg font-semibold tracking-tight text-neutral-900">
        <img src="/img/logo.svg" className="w-[40px] h-[40px]" />
      </NavLink>

      <ul className="flex items-center gap-8">
        <li>
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
        </li>
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
      </ul>
    </nav>
  );
}
