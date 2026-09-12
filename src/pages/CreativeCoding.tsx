import { Suspense, lazy, useState } from "react";
import type { ComponentType } from "react";
import { useTheme } from "../hooks/useTheme";
import { Caption } from "../components/system";

/**
 * Every effect is code-split: three.js and the raw-WebGL sims only ever load
 * for the plate the visitor actually asked to see, and never on other routes.
 */
const BGFXRipples = lazy(() => import("../components/bgfx/BGFXRipples"));
const DotRipple = lazy(() => import("../components/bgfx/DotRipple"));
const FluidShader = lazy(() => import("../components/bgfx/FluidShader"));
const FluidShaderImage = lazy(() => import("../components/bgfx/FluidShaderImage"));
const FluidShaderMarble = lazy(() => import("../components/bgfx/FluidShaderMarble"));
const FluidSimulationHexFX = lazy(() => import("../components/bgfx/FluidSimulationHexFX"));

interface TabVariant {
  label: string;
  props: Record<string, unknown>;
}

interface SectionConfig {
  title: string;
  technique: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  props?: Record<string, unknown>;
  variants?: TabVariant[];
}

const SECTIONS: SectionConfig[] = [
  { title: "FluidShader", technique: "GLSL fragment shader · three.js", component: FluidShader },
  {
    title: "FluidShaderImage",
    technique: "Shader + image mask · three.js",
    component: FluidShaderImage,
    props: { imageMask: "/img/image-mask.jpg" },
  },
  {
    title: "FluidShaderMarble",
    technique: "Domain-warped noise · three.js",
    component: FluidShaderMarble,
    props: { marbleScale: 0.5, marbleSpeed: 0.5 },
  },
  {
    title: "FluidSimulationHexFX",
    technique: "Navier–Stokes sim · raw WebGL",
    component: FluidSimulationHexFX,
    props: { thickness: 0.005, spacing: 0.08, roundness: 0.1, size: 8.0 },
  },
  {
    title: "BGFXRipples",
    technique: "Signed-distance grid · GLSL",
    component: BGFXRipples,
    variants: [
      { label: "A", props: {} },
      { label: "B", props: { shape: 2, size: 1, rounding: 0.1, gap: 0, spacingX: 1, spacingY: 2, color: "#F95565", glow: 20.0 } },
      { label: "C", props: { shape: 2, size: 0.8, rounding: 0.1, gap: 0.2, spacingX: 1.2, spacingY: 0.5, color: "#FFB731", glow: 20.0 } },
      { label: "D", props: { shape: 2, size: 1.5, rounding: 0.2, gap: 0.5, spacingX: 2.2, spacingY: 2.2, color: "#25D366", glow: 1.0 } },
      { label: "E", props: { shape: 2, size: 0.3, rounding: 0, gap: 0.5, spacingX: 0.2, spacingY: 0.2, color: "#EA4242", glow: 1.0 } },
    ],
  },
  { title: "DotRipple", technique: "Canvas 2D particle field", component: DotRipple },
];

export default function CreativeCoding() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);
  const { theme } = useTheme();

  const section = SECTIONS[activeSection];
  const Component = section.component;
  const base = section.variants ? section.variants[activeVariant].props : (section.props ?? {});
  // The hex sim paints its own ground, so it has to be told which one we're on.
  const componentProps =
    section.title === "FluidSimulationHexFX"
      ? { ...base, bgColor: theme === "dark" ? "#12110f" : "#f4f1ea" }
      : base;

  function handleSectionChange(i: number) {
    setActiveSection(i);
    setActiveVariant(0);
  }

  return (
    <>
      <p className="max-w-[56ch] font-serif text-lead text-ink-2 mt-0 mb-10">
        Interactive effects <em className="not-italic text-ink">created using AI tools</em>. Move
        your cursor across the plate to disturb it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,1fr)_2.6fr] gap-x-gutter gap-y-8 items-start">
        <ol className="list-none m-0 p-0 border-t border-rule" aria-label="Effects">
          {SECTIONS.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => handleSectionChange(i)}
                aria-pressed={activeSection === i}
                className={`w-full text-left py-3 border-b border-rule transition-colors ${
                  activeSection === i ? "text-ink" : "hover:text-ink"
                }`}
              >
                <span className="label flex justify-between gap-3">
                  <span className={activeSection === i ? "text-accent" : ""}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={activeSection === i ? "text-ink" : ""}>{s.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <figure className="m-0">
          <div className="flex items-center justify-between gap-4 mb-3 min-h-8">
            <Caption className="text-accent">
              PL. {String(activeSection + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
            </Caption>
            {section.variants && (
              <div className="flex gap-px bg-rule border border-rule" role="group" aria-label="Variants">
                {section.variants.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setActiveVariant(i)}
                    aria-pressed={activeVariant === i}
                    className={`w-8 h-7 font-mono text-caption transition-colors ${
                      activeVariant === i
                        ? "bg-ink text-paper"
                        : "bg-paper text-ink-3 hover:text-ink"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="plate-frame aspect-video">
            <Suspense
              fallback={
                <div className="w-full h-full grid place-items-center">
                  <Caption>Loading plate…</Caption>
                </div>
              }
            >
              <Component key={`${activeSection}-${activeVariant}`} {...componentProps} />
            </Suspense>
          </div>

          <figcaption className="mt-3 flex items-baseline gap-3">
            <span className="text-small font-medium">{section.title}</span>
            <span className="leader" aria-hidden="true" />
            <Caption>{section.technique}</Caption>
          </figcaption>
        </figure>
      </div>
    </>
  );
}
