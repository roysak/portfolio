import DynamicIcon from '../DynamicIcon';
import type { InfoTreeSection } from '../../data/caseStudyTypes';

interface Props {
  section: InfoTreeSection;
}

export default function InfoTree({ section }: Props) {
  return (
    <div className="bg-white border-b border-gray-100" id={section.anchor}>
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
          <p className="text-gray-600">{section.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Root node */}
          <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg flex items-center gap-4 relative z-10 w-full sm:w-max sm:pr-12">
            <div className="bg-white/20 p-2.5 rounded-lg">
              <DynamicIcon name={section.root.icon} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{section.root.title}</h3>
              <p className="text-xs text-primary-300 font-bold uppercase tracking-wider mt-0.5">
                {section.root.subtitle}
              </p>
            </div>
          </div>

          {/* Branches */}
          <div className="ml-6 sm:ml-8 border-l-2 border-primary-200 pl-6 sm:pl-10 pb-4 space-y-8 relative -top-4 pt-12">
            {section.branches.map((branch) => (
              <div key={branch.title} className="relative">
                {/* Horizontal connector */}
                <div className="absolute -left-6.5 sm:-left-10.5 top-8 w-6 sm:w-10 border-t-2 border-primary-200" />

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DynamicIcon name={branch.icon} className="w-5 h-5 text-primary-500" />
                    {branch.title}
                  </h4>

                  <div className="space-y-3">
                    {branch.items.map((item) => (
                      <div
                        key={item.title}
                        className={`p-3.5 rounded-lg border text-sm ${
                          item.highlighted
                            ? 'bg-primary-50/50 border-primary-100'
                            : 'bg-gray-50 border-gray-100'
                        }`}
                      >
                        <span className="font-semibold text-gray-800">{item.title}</span>

                        {item.subitems && item.subitems.length > 0 && (
                          <ul className="text-gray-600 mt-1.5 ml-1 space-y-1.5">
                            {item.subitems.map((sub, j) => (
                              <li key={j} className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0" aria-hidden="true"><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
                                {sub.text}
                                {sub.subtext && (
                                  <span className="text-gray-500 text-xs">{sub.subtext}</span>
                                )}
                                {sub.badge && (
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                                      sub.badge.variant === 'required'
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'bg-gray-200 text-gray-600'
                                    }`}
                                  >
                                    {sub.badge.text}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
