import type { ShowcaseSection } from '../../data/caseStudyTypes';

interface Props {
  section: ShowcaseSection;
}

export default function Showcase({ section }: Props) {
  return (
    <section
      id={section.anchor}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-gray-100"
    >
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
        <p className="text-gray-600">{section.subtitle}</p>
      </div>
      <div className="w-full bg-gray-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden group">
        <img
          src={section.image}
          alt={section.alt}
          className="w-full h-auto rounded-xl"
        />
      </div>
    </section>
  );
}
