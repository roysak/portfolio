import { NavLink, Outlet } from "react-router-dom";
import SectionHead from "../components/SectionHead";

const tabs = [
  { to: "/works/applications", label: "Applications" },
  { to: "/works/creative-coding", label: "Creative coding" },
  { to: "/works/digital-paintings", label: "Digital paintings" },
];

/** Shared shell for the three Works galleries: heading plus segmented sub-navigation. */
export default function WorksLayout() {
  return (
    <main className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      <SectionHead index="01" title="Works" aside="Applications · Creative coding · Digital paintings" />

      <nav
        className="inline-flex flex-wrap gap-1 p-1 mb-12 rounded-art-pill border border-line bg-ink-2"
        aria-label="Works categories"
      >
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              `font-mono text-[11px] uppercase tracking-[0.14em] px-4 py-2.5 rounded-art-pill transition-colors duration-400 ${
                isActive ? "bg-bone text-ink" : "text-bone-2 hover:text-bone"
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
