import DynamicIcon from '../DynamicIcon';
import type { CardGridSection } from '../../data/caseStudyTypes';

interface Props {
  section: CardGridSection;
}

export default function CardGrid({ section }: Props) {
  const bg = section.background === 'gray' ? 'bg-gray-50' : 'bg-white';

  return (
    <div className={bg} id={section.anchor}>
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
          <p className="text-gray-600">{section.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${section.iconColorClass}`}
              >
                <DynamicIcon name={card.icon} className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold tracking-wider text-primary-600 uppercase mb-2">
                {card.category}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
