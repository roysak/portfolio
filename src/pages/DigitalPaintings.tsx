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
      <p className="max-w-[60ch] text-bone-2 mt-0 mb-10">
        Painting is where the colour sense comes from. A curated gallery of digital work, mostly landscapes and
        colour studies.
      </p>

      <div className="masonry">
        {paintings.map((p, i) => (
          <figure
            key={p}
            data-cursor="big"
            className="group relative m-0 rounded-art overflow-hidden bg-ink-3 border border-line cursor-zoom-in"
            onClick={() => setSelected(p)}
          >
            <img
              src={assetUrl(`/img/dp/${p}`)}
              alt={pretty(p)}
              loading="lazy"
              className="w-full block transition-transform duration-700 ease-art group-hover:scale-[1.04]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 pt-12 pb-3.5 px-4 bg-linear-to-t from-black/85 to-transparent text-[#EDE6DA] font-mono text-[10px] uppercase tracking-[0.14em] opacity-0 translate-y-2 transition-all duration-400 ease-art group-hover:opacity-100 group-hover:translate-y-0">
              <span>{pretty(p)}</span>
              <span>{String(i + 1).padStart(2, "0")}</span>
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
