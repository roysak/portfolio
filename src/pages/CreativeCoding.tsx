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
  blurb: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  props?: Record<string, unknown>;
  variants?: TabVariant[];
}

const SECTIONS: SectionConfig[] = [
  { title: "FluidShader", blurb: "Navier–Stokes style advection on the GPU.", component: FluidShader },
  {
    title: "FluidShaderImage",
    blurb: "The same solver, masked by a source image.",
    component: FluidShaderImage,
    props: { imageMask: "/img/image-mask.jpg" },
  },
  {
    title: "FluidShaderMarble",
    blurb: "Domain warping turns the flow into marbled paper.",
    component: FluidShaderMarble,
    props: { marbleScale: 0.5, marbleSpeed: 0.5 },
  },
  {
    title: "FluidSimulationHexFX",
    blurb: "Velocity quantised onto a hex lattice.",
    component: FluidSimulationHexFX,
    props: { thickness: 0.005, spacing: 0.08, roundness: 0.1, size: 8.0, bgColor: "#0f0d14" },
  },
  {
    title: "BGFXRipples",
    blurb: "A parametric ripple grid — five presets.",
    component: BGFXRipples,
    variants: [
      { label: "A", props: {} },
      { label: "B", props: { shape: 2, size: 1, rounding: 0.1, gap: 0, spacingX: 1, spacingY: 2, color: "#F95565", glow: 20.0 } },
      { label: "C", props: { shape: 2, size: 0.8, rounding: 0.1, gap: 0.2, spacingX: 1.2, spacingY: 0.5, color: "#FFB731", glow: 20.0 } },
      { label: "D", props: { shape: 2, size: 1.5, rounding: 0.2, gap: 0.5, spacingX: 2.2, spacingY: 2.2, color: "#25D366", glow: 1.0 } },
      { label: "E", props: { shape: 2, size: 0.3, rounding: 0, gap: 0.5, spacingX: 0.2, spacingY: 0.2, color: "#EA4242", glow: 1.0 } },
    ],
  },
  { title: "DotRipple", blurb: "Pointer-driven displacement across a dot field.", component: DotRipple },
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
      <p className="max-w-[60ch] text-bone-2 mt-0 mb-10">
        Shader and canvas experiments, <b className="font-medium text-bone">built with AI in the loop</b>. Move your
        cursor across the canvas to drive them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">
        <ol className="list-none m-0 p-0 border-t border-line">
          {SECTIONS.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => handleSectionChange(i)}
                aria-pressed={activeSection === i}
                className={`w-full text-left grid gap-1 py-4 px-3 border-b border-line transition-colors duration-300 ${
                  activeSection === i ? "bg-pigment-soft text-bone" : "hover:bg-ink-2"
                }`}
              >
                <span className="flex justify-between items-center gap-3">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                      activeSection === i ? "text-pigment" : "text-bone-2"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="label tag-num">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="text-[13px] text-bone-3 leading-snug">{s.blurb}</span>
              </button>
            </li>
          ))}
        </ol>

        <div>
          <div className="flex items-center justify-between gap-4 mb-3 min-h-9">
            <span className="label label-strong">{section.title}</span>
            {section.variants && (
              <div className="flex gap-1.5">
                {section.variants.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setActiveVariant(i)}
                    aria-pressed={activeVariant === i}
                    aria-label={`Preset ${v.label}`}
                    className={`w-8 h-8 rounded-art-pill border font-mono text-[10px] transition-colors duration-300 ${
                      activeVariant === i
                        ? "bg-bone text-ink border-bone"
                        : "border-line-strong text-bone-2 hover:text-bone"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-full aspect-video rounded-art overflow-hidden border border-line bg-ink-2">
            <Component key={`${activeSection}-${activeVariant}`} {...componentProps} />
          </div>
        </div>
      </div>
    </>
  );
}
