import { useRef } from 'react';
import type { CarouselSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';
import { Band, SectionIntro } from './SectionShell';

interface Props {
  section: CarouselSection;
}

const ARROW_CLASS =
  'absolute top-[40%] -translate-y-1/2 w-11 h-11 rounded-full grid place-items-center bg-ink border border-line-strong text-bone opacity-0 group-hover:opacity-100 focus:opacity-100 transition-[opacity,background-color,color,transform] duration-300 hover:bg-bone hover:text-ink hover:border-bone';

export default function Carousel({ section }: Props) {
  const { openModal } = useModal();
  const carouselRef = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  return (
    <Band id={section.anchor}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <div className="reveal relative group">
        {/* Track */}
        <div
          ref={carouselRef}
          className="flex w-full min-w-0 overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.slides.map((slide, i) => (
            <figure
              key={i}
              className="m-0 snap-center shrink-0 w-full md:w-[85%] flex flex-col items-center"
            >
              <div className="bg-ink-2 border border-line p-4 w-full">
                <img
                  src={assetUrl(slide.image)}
                  alt={slide.label}
                  className="w-full h-auto rounded object-cover cursor-zoom-in"
                  onClick={() => openModal(assetUrl(slide.image), slide.label)}
                />
              </div>
              <figcaption className="text-center mt-4">
                <span className="label block">{slide.label}</span>
                <span className="block text-[13px] text-bone-3 mt-1">{slide.sublabel}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          onClick={() => scroll(-1)}
          className={`${ARROW_CLASS} left-2 sm:-left-5`}
          aria-label="Previous slide"
        >
          <span className="material-symbols-rounded block!" style={{ fontSize: '22px' }} aria-hidden="true">
            chevron_left
          </span>
        </button>

        <button
          onClick={() => scroll(1)}
          className={`${ARROW_CLASS} right-2 sm:-right-5`}
          aria-label="Next slide"
        >
          <span className="material-symbols-rounded block!" style={{ fontSize: '22px' }} aria-hidden="true">
            chevron_right
          </span>
        </button>
      </div>
    </Band>
  );
}
