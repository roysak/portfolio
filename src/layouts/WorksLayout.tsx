import { NavLink, Outlet } from "react-router-dom";
import SectionHead from "../components/SectionHead";

const tabs = [
  { to: "/works/applications", label: "Applications" },
  { to: "/works/creative-coding", label: "Creative coding" },
  { to: "/works/digital-paintings", label: "Digital paintings" },
];

/** Shared shell for the three Works galleries: heading plus pill sub-navigation. */
export default function WorksLayout() {
  return (
    <main className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      <SectionHead title="Works" aside="Applications · Creative coding · Digital paintings" />
      <nav className="flex gap-2 flex-wrap mb-10" aria-label="Works categories">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              `font-mono text-xs uppercase tracking-[0.1em] px-4 py-2.5 rounded-full border transition-colors duration-300 ${
                isActive
                  ? "bg-bone text-ink border-bone"
                  : "border-line-strong text-bone-2 hover:text-bone"
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </main>
  );
}
