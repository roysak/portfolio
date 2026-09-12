import DynamicIcon from '../DynamicIcon';
import type { CardGridSection } from '../../data/caseStudyTypes';
import { Band, SectionIntro } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: CardGridSection;
}

const ACCENT: Record<CardGridSection['accent'], string> = {
  pigment: 'text-accent',
  plum: 'text-accent-2',
};

export default function CardGrid({ section }: Props) {
  const accent = ACCENT[section.accent] ?? ACCENT.plum;

  return (
    <Band id={section.anchor} tone={section.background === 'raised' ? 'raised' : 'base'}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      {section.cards.map((card, i) => (
        <Col key={card.title} span={4} data-fade>
          <div className="h-full grid content-start gap-4 pt-5 border-t border-rule-2">
            <div className="flex items-center justify-between gap-3">
              <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
              <DynamicIcon name={card.icon} className={`w-5 h-5 ${accent}`} />
            </div>
            <div>
              <span className="label block">{card.category}</span>
              <h3 className="mt-2 mb-0 font-display font-medium text-head leading-tight tracking-[-0.025em]">
                {card.title}
              </h3>
            </div>
            <p className="m-0 font-serif text-small text-ink-2">{card.description}</p>
          </div>
        </Col>
      ))}
    </Band>
  );
}
