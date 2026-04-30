import { useState } from "react";
import { Link } from "react-router-dom";
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
    <main className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full py-24 pt-12">
      <div className="pb-12">
          <Link
              to="/works"
              className="text-neutral-500 hover:text-neutral-900 flex gap-2">
              <i className="material-symbols-rounded">keyboard_backspace</i>Back to Works
          </Link>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Applications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {images.map((img) => (
          <div
            key={img.file}
            className="border border-neutral-200 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelected(img)}
          >
            <img
              src={assetUrl(`/img/works/${img.file}`)}
              alt={img.alt}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>

      {selected && (
        <Modal
          imageSrc={assetUrl(`/img/works/${selected.file}`)}
          imageAlt={selected.alt}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}
