import { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import Modal from "../components/Modal";
import { Col, Grid, Plate } from "../components/system";
import { useSpreadMotion } from "../hooks/useMotion";

const images = [
  { file: "app-01.png", alt: "Application screenshot 01", meta: "Web · Interface" },
  { file: "app-02.png", alt: "Application screenshot 02", meta: "Web · Interface" },
  { file: "app-03.png", alt: "Application screenshot 03", meta: "Web · Interface" },
  { file: "app-04.png", alt: "Application screenshot 04", meta: "Web · Interface" },
];

export default function Applications() {
  const [selected, setSelected] = useState<(typeof images)[number] | null>(null);
  const ref = useSpreadMotion<HTMLDivElement>();

  return (
    <div ref={ref}>
      <p className="max-w-[56ch] font-serif text-lead text-ink-2 mt-0 mb-10">
        Side projects and applications I've built — the ones where the design and the deployment
        were the same pair of hands.
      </p>

      <Grid className="gap-y-[clamp(32px,4vw,56px)]">
        {images.map((img, i) => (
          <Col key={img.file} span={6}>
            <Plate
              no={i + 1}
              total={images.length}
              title={`Application ${String(i + 1).padStart(2, "0")}`}
              meta={img.meta}
              ratio="4 / 3"
              zoom
              onClick={() => setSelected(img)}
              className="cursor-zoom-in"
            >
              <img
                src={assetUrl(`/img/works/${img.file}`)}
                alt={img.alt}
                width={1600}
                height={1200}
                loading="lazy"
              />
            </Plate>
          </Col>
        ))}
      </Grid>

      {selected && (
        <Modal
          imageSrc={assetUrl(`/img/works/${selected.file}`)}
          imageAlt={selected.alt}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
