import { useState } from "react";
import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import BGFXRipples from "../components/bgfx/BGFXRipples";
import DotRipple from "../components/bgfx/DotRipple";
import FluidShader from "../components/bgfx/FluidShader";
import FluidShaderImage from "../components/bgfx/FluidShaderImage";
import FluidShaderMarble from "../components/bgfx/FluidShaderMarble";
import FluidSimulationFX from "../components/bgfx/FluidSimulationFX";
import FluidSimulationHexFX from '../components/bgfx/FluidSimulationHexFX';

interface TabVariant {
  label: string;
  props: Record<string, unknown>;
}

interface SectionConfig {
  label: string;
  title: string;
  component: ComponentType<any>;
  props?: Record<string, unknown>;
  variants?: TabVariant[];
}

const SECTIONS: SectionConfig[] = [
  {
    label: "01",
    title: "BGFXRipples",
    component: BGFXRipples,
    variants: [
      { label: "A", props: {} },
      { label: "B", props: { shape: 2, size: 1, rounding: 0.1, gap: 0, spacingX: 1, spacingY: 2, color: '#F95565', glow: 20.0 } },
      { label: "C", props: { shape: 2, size: 0.8, rounding: 0.1, gap: 0.2, spacingX: 1.2, spacingY: 0.5, color: '#FFB731', glow: 20.0 } },
      { label: "D", props: { shape: 2, size: 1.5, rounding: 0.2, gap: 0.5, spacingX: 2.2, spacingY: 2.2, color: '#25D366', glow: 1.0 } },
      { label: "E", props: { shape: 2, size: 0.3, rounding: 0, gap: 0.5, spacingX: 0.2, spacingY: 0.2, color: '#EA4242', glow: 1.0 } },
    ],
  },
  {
    label: "02",
    title: "DotRipple",
    component: DotRipple,
  },
  {
    label: "03",
    title: "FluidShader",
    component: FluidShader,
  },
  {
    label: "04",
    title: "FluidShaderImage",
    component: FluidShaderImage,
    props: { imageMask: "/img/image-mask.jpg" },
  },
  {
    label: "05",
    title: "FluidShaderMarble",
    component: FluidShaderMarble,
    props: { marbleScale: 0.5, marbleSpeed: 0.5 },
  },
  {
    label: "06",
    title: "FluidSimulationFX",
    component: FluidSimulationFX,
  },
  {
    label: "07",
    title: "FluidSimulationHexFX",
    component: FluidSimulationHexFX,
    props: { thickness: 0.005, spacing: 0.08, roundness: 0.1, size: 8.0, bgColor: "#ffffff" },
  },
];

export default function CreativeCoding() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);

  const section = SECTIONS[activeSection];
  const Component = section.component;
  const componentProps = section.variants
    ? section.variants[activeVariant].props
    : (section.props ?? {});

  function handleSectionChange(i: number) {
    setActiveSection(i);
    setActiveVariant(0);
  }

  return (
    <main className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full py-24 pt-12">
      <div className="pb-12">
        <Link to="/works" className="text-neutral-500 hover:text-neutral-900 flex gap-2">
          <i className="material-symbols-rounded">keyboard_backspace</i>Back to Works
        </Link>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Creative Coding
      </h1>

      <section className="mb-16">
        <p className="text-neutral-500 leading-relaxed max-w-2xl mb-6">
          Interactive effects <span className="font-bold">created Using AI Tools</span>. Move your cursor across the canvas to see the effects.
        </p>

        {/* Section tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {SECTIONS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => handleSectionChange(i)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                activeSection === i
                  ? 'bg-primary-600 hover:bg-primary-700 text-white border-primary-600'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-medium">Background Effects {section.label}</h2>

          {/* Variant sub-tabs (only when section has variants) */}
          {section.variants && (
            <div className="flex gap-2">
              {section.variants.map((v, i) => (
                <button
                  key={v.label}
                  onClick={() => setActiveVariant(i)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    activeVariant === i
                      ? 'bg-neutral-800 text-white border-neutral-800'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Canvas */}
        <div className="w-full aspect-video rounded-xl overflow-hidden border border-neutral-200">
          <Component key={`${activeSection}-${activeVariant}`} {...componentProps} />
        </div>
      </section>
    </main>
  );
}
