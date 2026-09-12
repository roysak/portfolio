import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import Modal from "../components/Modal";

const images = [
  { file: "app-01.png", alt: "Application 01" },
  { file: "app-02.png", alt: "Application 02" },
  { file: "app-03.png", alt: "Application 03" },
  { file: "app-04.png", alt: "Application 04" },
];

export default function Applications() {
  const [selected, setSelected] = useState<(typeof images)[number] | null>(null);

  return (
    <>
      <p className="max-w-[60ch] text-bone-2 mt-0 mb-10">
        Side projects and internal tools, designed and built end to end. Click any frame to open it full size.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {images.map((img, i) => (
          <figure
            key={img.file}
            data-cursor="big"
            className="group m-0 border border-line rounded-art overflow-hidden bg-ink-2 cursor-zoom-in transition-colors duration-500 hover:border-line-strong"
            onClick={() => setSelected(img)}
          >
            <div className="overflow-hidden">
              <img
                src={assetUrl(`/img/works/${img.file}`)}
                alt={img.alt}
                loading="lazy"
                className="w-full transition-transform duration-700 ease-art group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="px-4 py-3.5 border-t border-line flex justify-between items-center">
              <span className="label tag-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="label transition-colors group-hover:text-pigment">View</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {selected && (
        <Modal
          imageSrc={assetUrl(`/img/works/${selected.file}`)}
          imageAlt={selected.alt}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
