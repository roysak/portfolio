import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import Modal from "../components/Modal";
import { Col, Grid, Plate } from "../components/system";
import { useSpreadMotion } from "../hooks/useMotion";

/**
 * Hung three to a row and ordered by proportion, so each row shares a shape —
 * portraits, then landscapes, then the squares. Intrinsic dimensions are
 * declared so the page never reflows as the plates arrive.
 */
const paintings = [
  { file: "Aerial_View.webp", w: 820, h: 1180, medium: "Digital · Procreate", year: "2023" },
  { file: "Birch_tree.webp", w: 820, h: 1180, medium: "Digital · Procreate", year: "2023" },
  { file: "Doorway01.webp", w: 601, h: 887, medium: "Digital · Study", year: "2022" },

  { file: "Sea01.webp", w: 1000, h: 621, medium: "Digital · Study", year: "2023" },
  { file: "WaterFall03.webp", w: 1000, h: 605, medium: "Digital · Study", year: "2023" },
  { file: "SeaShore01.webp", w: 1000, h: 573, medium: "Digital · Study", year: "2023" },

  { file: "Birds01.webp", w: 800, h: 802, medium: "Digital · Study", year: "2023" },
  { file: "ColorStudy01.webp", w: 864, h: 864, medium: "Digital · Colour study", year: "2022" },
  { file: "Forest01.webp", w: 655, h: 1000, medium: "Digital · Procreate", year: "2022" },
];

const pretty = (file: string) =>
  file
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/(\d+)$/, " $1")
    .trim();

export default function DigitalPaintings() {
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useSpreadMotion<HTMLDivElement>();

  return (
    <div ref={ref}>
      <p className="max-w-[56ch] font-serif text-lead text-ink-2 mt-0 mb-10">
        A curated gallery of digital paintings and illustrations — landscape studies, mostly, made
        to keep the hand honest between screens.
      </p>

      <Grid className="gap-y-[clamp(32px,4vw,56px)] items-start">
        {paintings.map((p, i) => (
          <Col key={p.file} span={4}>
            <Plate
              no={i + 1}
              total={paintings.length}
              title={pretty(p.file)}
              meta={`${p.medium} · ${p.year}`}
              ratio="auto"
              zoom
              onClick={() => setSelected(p.file)}
              className="cursor-zoom-in"
            >
              <img
                src={assetUrl(`/img/dp/${p.file}`)}
                alt={pretty(p.file)}
                width={p.w}
                height={p.h}
                loading="lazy"
              />
            </Plate>
          </Col>
        ))}
      </Grid>

      {selected && (
        <Modal
          imageSrc={assetUrl(`/img/dp/${selected}`)}
          imageAlt={pretty(selected)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
