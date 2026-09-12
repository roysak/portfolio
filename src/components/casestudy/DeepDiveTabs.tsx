import { useState } from 'react';
import type { DeepDiveSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';
import { Band, SectionIntro, FrameCaption } from './SectionShell';

interface Props {
  section: DeepDiveSection;
}

export default function DeepDiveTabs({ section }: Props) {
  const { openModal } = useModal();
  const [activeId, setActiveId] = useState(section.tabs[0]?.id ?? '');

  return (
    <Band id={section.anchor} tone="deep">
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <div className="grid md:grid-cols-12 gap-[clamp(28px,4vw,56px)]">
        {/* Tab nav */}
        <div className="reveal md:col-span-4 grid content-start gap-2">
          {section.tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                className={`w-full text-left p-5 border transition-colors duration-300 ${
                  isActive
                    ? 'bg-ink border-line-strong text-bone'
                    : 'bg-transparent border-line text-bone-2 hover:text-bone hover:border-line-strong'
                }`}
              >
                <h4
                  className={`m-0 mb-1.5 font-display font-semibold text-[18px] tracking-[-0.02em] ${
                    isActive ? 'text-pigment' : ''
                  }`}
                >
                  {tab.title}
                </h4>
                <p className="m-0 text-[14px] text-bone-2">{tab.description}</p>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="md:col-span-8 flex items-center">
          {section.tabs.map((tab) =>
            tab.id === activeId ? (
              <figure
                key={tab.id}
                className="reveal m-0 w-full bg-ink border border-line p-5 flex flex-col items-center"
              >
                <FrameCaption>{tab.caption}</FrameCaption>
                <img
                  src={assetUrl(tab.image)}
                  alt={tab.caption}
                  className="w-full rounded cursor-zoom-in"
                  onClick={() => openModal(assetUrl(tab.image), tab.caption)}
                />
              </figure>
            ) : null
          )}
        </div>
      </div>
    </Band>
  );
}
