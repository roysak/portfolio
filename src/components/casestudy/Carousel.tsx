import { useRef, useState } from 'react';
import type { CarouselSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';
import { Band, SectionIntro } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: CarouselSection;
}

const NAV_CLASS =
  'label px-3 py-2 border border-rule-2 hover:bg-ink hover:text-paper hover:border-ink transition-colors';

/** A plate sequence. Case study 01 ships 18 unlabelled slides, so the folio
    counter carries the position rather than a caption that isn't there. */
export default function Carousel({ section }: Props) {
  const { openModal } = useModal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function scroll(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.9;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const per = track.scrollWidth / section.slides.length;
    setIndex(Math.min(section.slides.length - 1, Math.round(track.scrollLeft / per)));
  }

  const total = String(section.slides.length).padStart(2, '0');

  return (
    <Band id={section.anchor}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <Col span={12}>
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="label text-accent">
            PL. {String(index + 1).padStart(2, '0')} / {total}
          </span>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className={NAV_CLASS} aria-label="Previous slide">
              ← Prev
            </button>
            <button onClick={() => scroll(1)} className={NAV_CLASS} aria-label="Next slide">
              Next →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex w-full min-w-0 overflow-x-auto snap-x snap-mandatory gap-gutter pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.slides.map((slide, i) => {
            const label = slide.label?.trim();
            const sublabel = slide.sublabel?.trim();
            return (
              <figure key={i} className="m-0 snap-center shrink-0 w-full md:w-[86%]">
                <button
                  type="button"
                  onClick={() => openModal(assetUrl(slide.image), label || `Slide ${i + 1}`)}
                  className="block w-full cursor-zoom-in"
                  aria-label={`Zoom: ${label || `slide ${i + 1}`}`}
                >
                  <div className="plate-frame">
                    <img src={assetUrl(slide.image)} alt={label || ''} loading="lazy" />
                  </div>
                </button>
                <figcaption className="mt-3 flex items-baseline gap-3">
                  <span className="label shrink-0">
                    {String(i + 1).padStart(2, '0')} / {total}
                  </span>
                  <span className="leader" aria-hidden="true" />
                  {(label || sublabel) && (
                    <span className="text-right min-w-0">
                      {label && <span className="block text-small font-medium">{label}</span>}
                      {sublabel && <span className="label block mt-0.5">{sublabel}</span>}
                    </span>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Col>
    </Band>
  );
}
