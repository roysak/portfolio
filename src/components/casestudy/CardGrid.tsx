import DynamicIcon from '../DynamicIcon';
import type { CardGridSection } from '../../data/caseStudyTypes';
import { Band, SectionIntro } from './SectionShell';

interface Props {
  section: CardGridSection;
}

const ACCENT: Record<CardGridSection['accent'], string> = {
  pigment: 'bg-pigment/12 text-pigment',
  plum: 'bg-plum-soft text-plum',
};

export default function CardGrid({ section }: Props) {
  const accent = ACCENT[section.accent] ?? ACCENT.plum;

  return (
    <Band id={section.anchor} tone={section.background === 'raised' ? 'raised' : 'base'}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <div className="reveal grid md:grid-cols-3 gap-px bg-line border border-line">
        {section.cards.map((card) => (
          <div
            key={card.title}
            className="bg-ink p-7 grid content-start gap-4 transition-colors duration-300 hover:bg-ink-2"
          >
            <div className={`w-11 h-11 rounded-full grid place-items-center ${accent}`}>
              <DynamicIcon name={card.icon} className="w-6 h-6" />
            </div>
            <div>
              <span className="label">{card.category}</span>
              <h3 className="mt-2 mb-0 font-display font-semibold text-[21px] leading-tight tracking-[-0.02em]">
                {card.title}
              </h3>
            </div>
            <p className="m-0 text-[15px] text-bone-2">{card.description}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}
