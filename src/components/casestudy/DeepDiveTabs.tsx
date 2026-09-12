import { useState } from 'react';
import type { DeepDiveSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';
import { Band, SectionIntro, FrameCaption } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: DeepDiveSection;
}

export default function DeepDiveTabs({ section }: Props) {
  const { openModal } = useModal();
  const [activeId, setActiveId] = useState(section.tabs[0]?.id ?? '');
  const active = section.tabs.find((t) => t.id === activeId);

  return (
    <Band id={section.anchor} tone="deep">
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      {/* Index */}
      <Col span={4}>
        <div className="border-t border-rule-2" role="tablist" aria-label={String(section.title)}>
          {section.tabs.map((tab, i) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(tab.id)}
                className={`w-full text-left py-4 border-b border-rule transition-colors duration-300 ${
                  isActive ? '' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span className={`label ${isActive ? 'text-accent' : ''}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-display font-medium text-[18px] tracking-[-0.02em] ${
                        isActive ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {tab.title}
                    </span>
                    <span className="block mt-1 font-serif text-small text-ink-2">
                      {tab.description}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Col>

      {/* Plate */}
      <Col span={7} start={6}>
        {active && (
          <figure key={active.id} className="m-0">
            <FrameCaption>{active.caption}</FrameCaption>
            <button
              type="button"
              onClick={() => openModal(assetUrl(active.image), active.caption)}
              className="block w-full cursor-zoom-in"
              aria-label={`Zoom: ${active.caption}`}
            >
              <div className="plate-frame">
                <img src={assetUrl(active.image)} alt={active.caption} loading="lazy" />
              </div>
            </button>
          </figure>
        )}
      </Col>
    </Band>
  );
}
