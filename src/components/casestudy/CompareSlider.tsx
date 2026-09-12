import { useState, useCallback } from 'react';
import type { CompareSliderSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { Band, SectionIntro } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: CompareSliderSection;
}

const HEIGHT_MAP: Record<string, string> = {
  tall: 'h-[400px] md:h-[650px] lg:h-[900px]',
  medium: 'h-[266px] sm:h-[346px] md:h-[470px] lg:h-[556px]',
  short: 'h-[300px] md:h-[400px]',
};

const LABEL_CLASS = 'label px-2.5 py-1.5 border';

export default function CompareSlider({ section }: Props) {
  const [value, setValue] = useState(50);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }, []);

  const heightClass = HEIGHT_MAP[section.heightPreset] ?? HEIGHT_MAP.medium;

  return (
    <Band id={section.anchor}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <Col span={12}>
        <div data-plate className={`plate-frame w-full ${heightClass}`}>
          {/* After — the ground */}
          <img
            src={assetUrl(section.after.src)}
            alt={`After: ${section.after.label}`}
            className="absolute inset-0 object-top"
          />
          <div className="absolute inset-0 flex items-start justify-end p-5 pointer-events-none">
            <span className={`${LABEL_CLASS} bg-ink text-paper border-ink`}>
              {section.after.label}
            </span>
          </div>

          {/* Before — clipped over it */}
          <div
            className="absolute inset-0 bg-paper-3 pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
          >
            <img
              src={assetUrl(section.before.src)}
              alt={`Before: ${section.before.label}`}
              className="absolute inset-0 object-top"
            />
            <div className="absolute inset-0 flex items-start justify-start p-5">
              <span className={`${LABEL_CLASS} bg-paper text-ink border-rule-2`}>
                {section.before.label}
              </span>
            </div>
          </div>

          {/* Handle — a hairline and a square grip */}
          <div
            className="absolute top-0 bottom-0 w-px bg-accent flex items-center justify-center pointer-events-none"
            style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
          >
            <span className="w-8 h-8 bg-accent text-paper grid place-items-center font-mono text-caption">
              ↔
            </span>
          </div>

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

        <p className="label mt-3">Drag to compare · Legacy left, redesign right</p>
      </Col>
    </Band>
  );
}
