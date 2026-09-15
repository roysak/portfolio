import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import SectionHead from "../components/SectionHead";
import DualField from "../components/bgfx/DualField";
import { ArrowBadge } from "../components/Button";
import { useReveal } from "../hooks/useReveal";

const items = [
  {
    to: "/works/applications",
    title: "Applications",
    text: "Side projects and applications I've built, end to end.",
    foot: "4 builds",
    art: (
      <img
        src={assetUrl("/img/works/app-01.png")}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-art group-hover:scale-105"
      />
    ),
  },
  {
    to: "/works/creative-coding",
    title: "Creative coding",
    text: "Shader and canvas experiments, most of them built with AI in the loop.",
    foot: "6 effects · WebGL",
    art: <DualField density={360} intensity={1.15} interactive={false} />,
  },
  {
    to: "/works/digital-paintings",
    title: "Digital paintings",
    text: "A collection of digital artwork and illustrations.",
    foot: "9 pieces",
    art: (
      <img
        src={assetUrl("/img/dp/Forest01.png")}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-art group-hover:scale-105"
      />
    ),
  },
];

export default function Works() {
  const pageRef = useReveal<HTMLElement>();

  return (
    <main ref={pageRef} className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      <SectionHead index="01" title="Works" aside="Craft, code and paint" />
      <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="group bg-ink hover:bg-ink-2 transition-colors duration-500 p-7 grid grid-rows-[auto_1fr_auto] gap-6"
          >
            <div>
              <h2 className="m-0 font-display text-[clamp(24px,2.4vw,34px)] leading-tight">{it.title}</h2>
              <p className="mt-2 mb-0 text-[15px] text-bone-2">{it.text}</p>
            </div>
            <div className="rounded-art-sm overflow-hidden aspect-4/3 bg-ink-3 border border-line">{it.art}</div>
            <div className="flex justify-between items-center gap-3">
              <span className="label">{it.foot}</span>
              <ArrowBadge className="w-9! h-9!" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
