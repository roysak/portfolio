import type { SplitSectionData } from '../../data/caseStudyTypes';

interface Props {
  section: SplitSectionData;
}

const BULLET_ICONS: Record<string, React.ReactNode> = {
  check: (
    <svg className="w-5 h-5 text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-amber-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-400 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

export default function SplitSection({ section }: Props) {
  const imageLeft = section.imagePosition === 'left';

  return (
    <section
      id={section.anchor}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className={imageLeft ? 'md:order-2' : 'md:order-1'}>
          <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>
          <ul className="space-y-4">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                {BULLET_ICONS[bullet.variant]}
                {bullet.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div
          className={`w-full bg-gray-100 rounded-2xl flex flex-col items-center border border-gray-200 shadow-sm p-6 relative overflow-hidden group ${
            imageLeft ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <p className="text-gray-500 font-medium text-sm tracking-wide uppercase mb-3">
            {section.imageCaption}
          </p>
          <img
            src={section.image}
            alt={section.imageAlt}
            className="object-cover rounded shadow-sm w-full"
          />
          <div className="absolute inset-0 border-2 border-dashed border-transparent group-hover:border-gray-300 rounded-2xl transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
