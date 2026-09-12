import { useState } from "react";
import type { ComponentType } from "react";
import BGFXRipples from "../components/bgfx/BGFXRipples";
import DotRipple from "../components/bgfx/DotRipple";
import FluidShader from "../components/bgfx/FluidShader";
import FluidShaderImage from "../components/bgfx/FluidShaderImage";
import FluidShaderMarble from "../components/bgfx/FluidShaderMarble";
import FluidSimulationHexFX from "../components/bgfx/FluidSimulationHexFX";

interface TabVariant {
  label: string;
  props: Record<string, unknown>;
}

interface SectionConfig {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  props?: Record<string, unknown>;
  variants?: TabVariant[];
}

const SECTIONS: SectionConfig[] = [
  {
    title: "BGFXRipples",
    component: BGFXRipples,
    variants: [
      { label: "A", props: {} },
      { label: "B", props: { shape: 2, size: 1, rounding: 0.1, gap: 0, spacingX: 1, spacingY: 2, color: "#F95565", glow: 20.0 } },
      { label: "C", props: { shape: 2, size: 0.8, rounding: 0.1, gap: 0.2, spacingX: 1.2, spacingY: 0.5, color: "#FFB731", glow: 20.0 } },
      { label: "D", props: { shape: 2, size: 1.5, rounding: 0.2, gap: 0.5, spacingX: 2.2, spacingY: 2.2, color: "#25D366", glow: 1.0 } },
      { label: "E", props: { shape: 2, size: 0.3, rounding: 0, gap: 0.5, spacingX: 0.2, spacingY: 0.2, color: "#EA4242", glow: 1.0 } },
    ],
  },
  { title: "DotRipple", component: DotRipple },
  { title: "FluidShader", component: FluidShader },
  { title: "FluidShaderImage", component: FluidShaderImage, props: { imageMask: "/img/image-mask.jpg" } },
  { title: "FluidShaderMarble", component: FluidShaderMarble, props: { marbleScale: 0.5, marbleSpeed: 0.5 } },
  {
    title: "FluidSimulationHexFX",
    component: FluidSimulationHexFX,
    props: { thickness: 0.005, spacing: 0.08, roundness: 0.1, size: 8.0, bgColor: "#0f0d14" },
  },
];

export default function CreativeCoding() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);

  const section = SECTIONS[activeSection];
  const Component = section.component;
  const componentProps = section.variants ? section.variants[activeVariant].props : (section.props ?? {});

  function handleSectionChange(i: number) {
    setActiveSection(i);
    setActiveVariant(0);
  }

  return (
    <>
      <p className="max-w-[60ch] text-bone-2 mt-0 mb-8">
        Interactive effects <b className="font-medium text-bone">created using AI tools</b>. Move your cursor across
        the canvas to see the effects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 items-start">
        <ol className="list-none m-0 p-0 border-t border-line">
          {SECTIONS.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => handleSectionChange(i)}
                aria-pressed={activeSection === i}
                className={`w-full text-left flex justify-between py-3.5 border-b border-line font-mono text-xs uppercase tracking-[0.08em] transition-colors ${
                  activeSection === i ? "text-pigment" : "text-bone-2 hover:text-bone"
                }`}
              >
                <span>{s.title}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ol>

        <div>
          <div className="flex items-center justify-between mb-3 min-h-8">
            <span className="label">Background effect {String(activeSection + 1).padStart(2, "0")}</span>
            {section.variants && (
              <div className="flex gap-1.5">
                {section.variants.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setActiveVariant(i)}
                    aria-pressed={activeVariant === i}
                    className={`w-8 h-8 rounded-full border font-mono text-[11px] transition-colors ${
                      activeVariant === i ? "bg-bone text-ink border-bone" : "border-line-strong text-bone-2 hover:text-bone"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-full aspect-video rounded overflow-hidden border border-line bg-ink-2">
            <Component key={`${activeSection}-${activeVariant}`} {...componentProps} />
          </div>
        </div>
      </div>
    </>
  );
}
