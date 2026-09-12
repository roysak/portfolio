import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import Modal from "../components/Modal";

const paintings = [
  "Aerial_View.png",
  "Birch_tree.png",
  "Birds01.png",
  "Sea01.png",
  "SeaShore01.png",
  "WaterFall03.png",
  "ColorStudy01.png",
  "Doorway01.png",
  "Forest01.png",
];

const pretty = (file: string) =>
  file
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/(\d+)$/, " $1");

export default function DigitalPaintings() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <p className="max-w-[60ch] text-bone-2 mt-0 mb-8">A curated gallery of digital paintings and illustrations.</p>
      <div className="masonry">
        {paintings.map((p) => (
          <figure
            key={p}
            data-cursor="big"
            className="group relative m-0 rounded overflow-hidden bg-ink-3 cursor-zoom-in"
            onClick={() => setSelected(p)}
          >
            <img
              src={assetUrl(`/img/dp/${p}`)}
              alt={pretty(p)}
              loading="lazy"
              className="w-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-3.5 bg-[linear-gradient(transparent,rgba(15,13,20,.85))] text-[#EDE6DA] font-mono text-[11px] uppercase tracking-[0.1em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {pretty(p)}
            </figcaption>
          </figure>
        ))}
      </div>

      {selected && (
        <Modal imageSrc={assetUrl(`/img/dp/${selected}`)} imageAlt={pretty(selected)} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
