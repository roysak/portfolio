import { useState } from "react";
import { Link } from "react-router-dom";
import BGFXRipples from "../components/BGFXRipples";

const TABS = [
  { label: "01", props: {} },
  { label: "02", props: { shape: 2 as const, size: 1, rounding: 0.1, gap: 0, spacingX: 1, spacingY: 2, color: '#F95565', glow: 20.0 } },
  { label: "03", props: { shape: 2 as const, size: 0.8, rounding: 0.1, gap: 0.2, spacingX: 1.2, spacingY: 0.8, color: '#FFB731', glow: 20.0 } },
  { label: "04", props: { shape: 2 as const, size: 1, rounding: 0, gap: 0.5, spacingX: 1, spacingY: 1, color: '#25D366', glow: 1.0 } },
  { label: "05", props: { shape: 2 as const, size: 0.3, rounding: 0, gap: 0.5, spacingX: .2, spacingY: .2, color: '#EA4242', glow: 1.0 } },
];

export default function CreativeCoding() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full py-24 pt-12">
      <div className="pb-12">
          <Link
              to="/works"
              className="text-neutral-500 hover:text-neutral-900 flex gap-2">
              <i className="material-symbols-rounded">keyboard_backspace</i>Back to Works
          </Link>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Creative Coding
      </h1>

      <section className="mb-16">
        <h2 className="text-xl font-medium mb-2">Background Effects</h2>
        <p className="text-neutral-500 leading-relaxed max-w-2xl mb-6">
          A GPU shader that renders a tiled grid of shapes with interactive effects. Move your cursor across the canvas to see the effects. <span className="font-bold">Created Using AI Tools</span>
        </p>
        <div className="flex gap-2 mb-4">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                activeTab === i
                  ? 'bg-primary-600 hover:bg-primary-700 text-white border-primary-600'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="w-full aspect-video rounded-xl overflow-hidden border border-neutral-200">
          <BGFXRipples key={activeTab} {...TABS[activeTab].props} props={TABS[activeTab].props} />
        </div>
      </section>
    </main>
  );
}
