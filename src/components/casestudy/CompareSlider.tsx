import { useState, useRef, useCallback } from 'react';
import type { CompareSliderSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';

interface Props {
  section: CompareSliderSection;
}

const HEIGHT_MAP: Record<string, string> = {
  tall: 'h-[400px] md:h-[650px] lg:h-[900px]',
  medium: 'h-[266px] sm:h-[346px] md:h-[470px] lg:h-[556px]',
  short: 'h-[300px] md:h-[400px]',
};

export default function CompareSlider({ section }: Props) {
  const [value, setValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }, []);

  const heightClass = HEIGHT_MAP[section.heightPreset] ?? HEIGHT_MAP.medium;

  return (
    <section id={section.anchor} className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-gray-100">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
        <p className="text-gray-600">{section.subtitle}</p>
      </div>

      <div
        ref={containerRef}
        className={`relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100 ${heightClass}`}
      >
        {/* After image — background */}
        <img
          src={assetUrl(section.after.src)}
          alt={`After: ${section.after.label}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 flex items-center justify-end p-8 pointer-events-none">
          <span className="bg-primary-600 text-white px-3 py-1 text-xs font-bold uppercase rounded shadow-md opacity-90">
            {section.after.label}
          </span>
        </div>

        {/* Before image — clipped foreground */}
        <div
          className="absolute inset-0 bg-gray-200 border-r-2 border-white pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <img
            src={assetUrl(section.before.src)}
            alt={`Before: ${section.before.label}`}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 flex items-center justify-start p-8">
            <span className="bg-gray-800 text-white px-3 py-1 text-xs font-bold uppercase rounded shadow-md opacity-90">
              {section.before.label}
            </span>
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center pointer-events-none"
          style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
            <span className="material-symbols-rounded text-gray-600" style={{ fontSize: '20px' }} aria-hidden="true">compare_arrows</span>
          </div>
        </div>

        {/* Range input */}
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10 m-0"
          aria-label="Compare before and after"
        />
      </div>
    </section>
  );
}
