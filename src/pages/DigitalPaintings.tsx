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
    <main className="work-detail-page studio-container">
      <div className="work-detail-back">
          <Link
              to="/works"
              className="inner-back-link">
              <i className="material-symbols-rounded">keyboard_backspace</i>Back to Works
          </Link>
      </div>
      <p className="eyebrow">03 / BEYOND THE INTERFACE</p>
      <h1>
        Digital Paintings
      </h1>
      <p className="work-detail-intro">
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
