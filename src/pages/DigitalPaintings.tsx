import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

export default function DigitalPaintings() {
  const [selectedPainting, setSelectedPainting] = useState<string | null>(null);

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
        Digital Paintings
      </h1>
      <p className="text-neutral-500 leading-relaxed max-w-2xl mb-12">
        A curated gallery of digital paintings and illustrations.
      </p>
      
      <div className="gallery-masonry">
        {paintings.map((painting) => (
          <div
            key={painting}
            className="gallery-item cursor-pointer"
            onClick={() => setSelectedPainting(painting)}
          >
            <img
              src={assetUrl(`/img/dp/${painting}`)}
              alt={painting.replace(/\.[^.]+$/, "").replace(/_/g, " ")}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      {selectedPainting && (
        <Modal
          imageSrc={assetUrl(`/img/dp/${selectedPainting}`)}
          imageAlt={selectedPainting.replace(/\.[^.]+$/, "").replace(/_/g, " ")}
          onClose={() => setSelectedPainting(null)}
        />
      )}
    </main>
  );
}
