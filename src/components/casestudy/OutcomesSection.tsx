import DynamicIcon from '../DynamicIcon';
import type { OutcomesSection } from '../../data/caseStudyTypes';

interface Props {
  section: OutcomesSection;
}

export default function OutcomesSection({ section }: Props) {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-gray-100">
      <div className="grid md:grid-cols-2 gap-12">
        {section.columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <DynamicIcon name={col.icon} className="w-5 h-5 text-primary-500" />
              {col.title}
            </h3>
            <ul className="space-y-6">
              {col.items.map((item) => (
                <li key={item.title} className="text-sm">
                  <strong className="block text-gray-900 mb-1">{item.title}</strong>
                  <span className="text-gray-600">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
