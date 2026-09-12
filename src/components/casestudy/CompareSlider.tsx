import { useState, useRef, useCallback } from 'react';
import type { CompareSliderSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { Band, SectionIntro } from './SectionShell';

interface Props {
  section: CompareSliderSection;
}

const HEIGHT_MAP: Record<string, string> = {
  tall: 'h-[400px] md:h-[650px] lg:h-[900px]',
  medium: 'h-[266px] sm:h-[346px] md:h-[470px] lg:h-[556px]',
  short: 'h-[300px] md:h-[400px]',
};

const LABEL_CLASS =
  'font-mono text-[11px] uppercase tracking-[0.08em] px-2.5 py-[5px] rounded-full';

export default function CompareSlider({ section }: Props) {
  const [value, setValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }, []);

  const heightClass = HEIGHT_MAP[section.heightPreset] ?? HEIGHT_MAP.medium;

  return (
    <Band id={section.anchor}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <div
        ref={containerRef}
        className={`reveal relative w-full overflow-hidden border border-line bg-ink-3 ${heightClass}`}
      >
        {/* After image — background */}
        <img
          src={assetUrl(section.after.src)}
          alt={`After: ${section.after.label}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 flex items-center justify-end p-7 pointer-events-none">
          <span className={`${LABEL_CLASS} bg-pigment text-pigment-ink`}>{section.after.label}</span>
        </div>

        {/* Before image — clipped foreground */}
        <div
          className="absolute inset-0 bg-ink-3 border-r border-bone pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <img
            src={assetUrl(section.before.src)}
            alt={`Before: ${section.before.label}`}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 flex items-center justify-start p-7">
            <span className={`${LABEL_CLASS} bg-ink text-bone border border-line-strong`}>
              {section.before.label}
            </span>
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-bone flex items-center justify-center pointer-events-none"
          style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-11 h-11 bg-bone text-ink rounded-full grid place-items-center shadow-lift">
            <span className="material-symbols-rounded" style={{ fontSize: '20px' }} aria-hidden="true">
              compare_arrows
            </span>
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
    </Band>
  );
}
