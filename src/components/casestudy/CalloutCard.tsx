import DynamicIcon from '../DynamicIcon';
import type { CalloutSection } from '../../data/caseStudyTypes';

interface Props {
  section: CalloutSection;
}

export default function CalloutCard({ section }: Props) {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <div className="bg-primary-50 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto border border-primary-100">
        <DynamicIcon
          name={section.icon}
          className="w-12 h-12 text-primary-600 mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{section.title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{section.description}</p>
      </div>
    </section>
  );
}
