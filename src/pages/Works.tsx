import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import SectionHead from "../components/SectionHead";
import FlowField from "../components/bgfx/FlowField";
import { ArrowIcon } from "../components/Button";

const items = [
  {
    to: "/works/applications",
    title: "Applications",
    text: "Side projects and applications I've built.",
    foot: "4 builds",
    art: <img src={assetUrl("/img/works/app-01.png")} alt="" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105" />,
  },
  {
    to: "/works/creative-coding",
    title: "Creative coding",
    text: "Creative coding projects and experiments.",
    foot: "6 effects · WebGL",
    art: <FlowField count={350} scale={0.006} colors={["#9A6FB0", "#E4B04A"]} fade={0.08} />,
  },
  {
    to: "/works/digital-paintings",
    title: "Digital paintings",
    text: "A collection of digital artwork and illustrations.",
    foot: "9 pieces",
    art: <img src={assetUrl("/img/dp/Forest01.png")} alt="" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105" />,
  },
];

export default function Works() {
  return (
    <main className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      <SectionHead title="Works" aside="A curated gallery of craft and code" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="group bg-ink hover:bg-ink-2 transition-colors duration-300 p-7 grid grid-rows-[auto_1fr_auto] gap-6"
          >
            <div>
              <h2 className="m-0 font-display font-semibold text-[28px] tracking-[-0.02em]">{it.title}</h2>
              <p className="mt-1.5 mb-0 text-[15px] text-bone-2">{it.text}</p>
            </div>
            <div className="rounded overflow-hidden aspect-[4/3] bg-ink-3">{it.art}</div>
            <div className="flex justify-between items-center">
              <span className="label">{it.foot}</span>
              <span className="w-9 h-9 rounded-full border border-line-strong grid place-items-center transition-[background-color,color,transform] duration-300 group-hover:bg-bone group-hover:text-ink group-hover:-rotate-45">
                <ArrowIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
