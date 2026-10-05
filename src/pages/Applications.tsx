import { useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import Modal from "../components/Modal";

const images = [
  { file: "curioleap.png", alt: "CurioLeap - Growing Through Curiosity" },
  { file: "apcaviation.png", alt: "Asia Pacific College of Aviation & Logistics" },
  { file: "app-01.png", alt: "Application 01" },
  { file: "app-02.png", alt: "Application 02" },
  { file: "app-03.png", alt: "Application 03" },
  { file: "app-04.png", alt: "Application 04" },
];

export default function Applications() {
  const [selected, setSelected] = useState<{ file: string; alt: string } | null>(null);

  return (
    <main className="work-detail-page studio-container">
      <div className="work-detail-back">
          <Link
              to="/works"
              className="inner-back-link">
              <i className="material-symbols-rounded">keyboard_backspace</i>Back to Works
          </Link>
      </div>
      <p className="eyebrow">01 / FUNCTION MEETS FORM</p>
      <h1>
        Applications
      </h1>
      <p className="work-detail-intro">Side projects and applications, built from idea to interface.</p>
      <div className="work-detail-grid">
        {images.map((img) => (
          <div
            key={img.file}
            className="work-detail-tile max-h-120"
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
