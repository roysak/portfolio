import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import Modal from "../components/Modal";

const images = [
  { file: "recipe-book.png", alt: "Recipe Book - A simple recipe management application" },
  { file: "curioleap.png", alt: "CurioLeap - Growing Through Curiosity" },
  { file: "apcaviation.png", alt: "Asia Pacific College of Aviation & Logistics" },
  { file: "covid-orbit.png", alt: "Covid Orbit - Exploring the spread of the virus" },
  { file: "f1-project.png", alt: "F1 Project - A basic Formula 1 exploration tool" },
  { file: "diet-planner.png", alt: "Diet Planner - A simple diet planning application" },
  { file: "mission-atlas.png", alt: "Mission Atlas - Explore India's Space Age" },
  { file: "world-atlas.png", alt: "World Atlas - Explore the Globe" },
  { file: "app-01.png", alt: "Application 01" },
  { file: "app-02.png", alt: "Application 02" },
  { file: "app-03.png", alt: "Application 03" },
  { file: "app-04.png", alt: "Application 04" },
];

export default function Applications() {
  const [selected, setSelected] = useState<number | null>(null);

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
            onClick={() => setSelected(i)}
          >
            <div className="overflow-hidden max-h-88">
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

      {selected !== null && (
        <Modal
          imageSrc={assetUrl(`/img/works/${images[selected].file}`)}
          imageAlt={images[selected].alt}
          onPrevious={() => setSelected((index) => index === null ? null : (index - 1 + images.length) % images.length)}
          onNext={() => setSelected((index) => index === null ? null : (index + 1) % images.length)}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
