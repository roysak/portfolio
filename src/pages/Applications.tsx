import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import Modal from "../components/Modal";

const images = [
  { file: "app-01.png", alt: "App 1" },
  { file: "app-02.png", alt: "App 2" },
  { file: "app-03.png", alt: "App 3" },
  { file: "app-04.png", alt: "App 4" },
];

export default function Applications() {
  const [selected, setSelected] = useState<{ file: string; alt: string } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
        {images.map((img, i) => (
          <figure
            key={img.file}
            data-cursor="big"
            className="m-0 border border-line rounded overflow-hidden bg-ink-2 cursor-zoom-in"
            onClick={() => setSelected(img)}
          >
            <img src={assetUrl(`/img/works/${img.file}`)} alt={img.alt} className="w-full" loading="lazy" />
            <figcaption className="px-3.5 py-3 border-t border-line flex justify-between">
              <span className="label">App {String(i + 1).padStart(2, "0")}</span>
              <span className="label">View</span>
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
