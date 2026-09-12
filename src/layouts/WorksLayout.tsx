import { NavLink, Outlet } from "react-router-dom";
import { Col, Grid, Register } from "../components/system";
import { useSpreadMotion } from "../hooks/useMotion";

const tabs = [
  { no: "01", to: "/works/applications", label: "Applications" },
  { no: "02", to: "/works/creative-coding", label: "Creative coding" },
  { no: "03", to: "/works/digital-paintings", label: "Digital paintings" },
];

/** Shared shell for the three galleries: a ruled masthead and a mono index. */
export default function WorksLayout() {
  const ref = useSpreadMotion<HTMLElement>();

  return (
    <main ref={ref} className="relative px-margin pt-[clamp(28px,5vw,56px)] pb-[clamp(64px,9vw,128px)]">
      <Register className="left-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />
      <Register className="right-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />

      <Grid className="gap-y-8">
        <Col span={12} className="flex items-baseline justify-between gap-6 pb-4 border-b border-rule">
          <h1 data-set className="m-0 font-display font-medium text-title leading-none tracking-[-0.04em]">
            Works
          </h1>
          <span className="label max-sm:hidden">Plates · Craft and code</span>
        </Col>

        <Col span={12} as="nav" aria-label="Works categories">
          <ul className="list-none m-0 p-0 flex flex-wrap gap-x-8 gap-y-2">
            {tabs.map((t) => (
              <li key={t.to}>
                <NavLink
                  to={t.to}
                  className={({ isActive }) =>
                    `label group inline-flex items-baseline gap-2.5 py-1 transition-colors hover:text-ink ${
                      isActive ? "text-ink" : ""
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? "text-accent" : ""}>{t.no}</span>
                      <span className="relative">
                        {t.label}
                        <span
                          aria-hidden="true"
                          className={`absolute left-0 -bottom-1 h-px w-full bg-accent origin-left transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </Col>

        <Col span={12} className="mt-[clamp(16px,3vw,32px)]">
          <Outlet />
        </Col>
      </Grid>
    </main>
  );
}
