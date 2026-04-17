import { useRef } from 'react';
import type { CarouselSection } from '../../data/caseStudyTypes';

interface Props {
  section: CarouselSection;
}

export default function Carousel({ section }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  return (
    <section
      id={section.anchor}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-b border-gray-100"
    >
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
        <p className="text-gray-600">{section.subtitle}</p>
      </div>

      <div className="relative max-w-5xl mx-auto group">
        {/* Track */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.slides.map((slide, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-full md:w-[85%] flex flex-col items-center"
            >
              <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-4 w-full">
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-auto rounded-xl shadow-sm border border-gray-200 object-cover"
                />
              </div>
              <p className="text-sm font-bold text-gray-500 mt-4 uppercase tracking-wider">
                {slide.label}
              </p>
              <p className="text-xs text-gray-400 mt-1">{slide.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Prev */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-2 sm:-left-4 top-[40%] -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 hover:scale-110 focus:opacity-100"
          aria-label="Previous slide"
        >
          <span className="material-symbols-rounded" style={{ fontSize: '24px' }} aria-hidden="true">chevron_left</span>
        </button>

        {/* Next */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-2 sm:-right-4 top-[40%] -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 hover:scale-110 focus:opacity-100"
          aria-label="Next slide"
        >
          <span className="material-symbols-rounded" style={{ fontSize: '24px' }} aria-hidden="true">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
