import { useState } from 'react';
import type { DeepDiveSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';

interface Props {
  section: DeepDiveSection;
}

export default function DeepDiveTabs({ section }: Props) {
  const { openModal } = useModal();
  const [activeId, setActiveId] = useState(section.tabs[0]?.id ?? '');

  return (
    <div className="bg-gray-900 text-white" id={section.anchor}>
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
          <p className="text-gray-400">{section.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Tab nav */}
          <div className="md:col-span-4 space-y-2">
            {section.tabs.map((tab) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-200 border ${
                    isActive
                      ? 'bg-white/10 border-white/20 shadow-lg text-white'
                      : 'border-transparent hover:bg-white/5 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <h4 className="font-bold mb-2">{tab.title}</h4>
                  <p className="text-sm opacity-80 text-gray-300">
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="md:col-span-8 flex items-center">
            {section.tabs.map((tab) =>
              tab.id === activeId ? (
                <div
                  key={tab.id}
                  className="w-full bg-gray-800 rounded-2xl flex flex-col items-center border border-gray-700 shadow-sm p-6 relative overflow-hidden group"
                >
                  <p className="text-gray-400 font-medium text-sm tracking-wide uppercase mb-3">
                    {tab.caption}
                  </p>
                  <img
                    src={assetUrl(tab.image)}
                    alt={tab.caption}
                    className="w-full rounded cursor-zoom-in"
                    onClick={() => openModal(assetUrl(tab.image), tab.caption)}
                  />
                  {/* <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-gray-600 rounded-2xl transition-colors duration-300" /> */}
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
