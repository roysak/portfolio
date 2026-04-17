import DynamicIcon from '../DynamicIcon';
import type { TimelineSection } from '../../data/caseStudyTypes';

interface Props {
  section: TimelineSection;
}

export default function Timeline({ section }: Props) {
  return (
    <div className="bg-gray-50 border-b border-gray-100" id={section.anchor}>
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            {section.icon && (
              <DynamicIcon name={section.icon} className="w-8 h-8 text-primary-500" />
            )}
            {section.title}
          </h2>
          <p className="text-gray-600">{section.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-primary-200 ml-4 md:ml-6 space-y-8 pb-4">
            {section.steps.map((step, i) => {
              const isSuccess = step.variant === 'success';
              const isHighlighted = step.variant === 'highlighted';

              return (
                <div key={i} className="relative pl-8 md:pl-12">
                  {/* Step marker */}
                  <div
                    className={`absolute -left-4.25 top-1 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold ${
                      isSuccess ? 'bg-green-500' : 'bg-primary-500'
                    }`}
                  >
                    {isSuccess ? (
                      <span className="material-symbols-rounded" style={{ fontSize: '16px' }} aria-hidden="true">check</span>
                    ) : (
                      i + 1
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`p-5 rounded-xl border shadow-sm relative overflow-hidden ${
                      isSuccess
                        ? 'bg-green-50 border-green-100'
                        : isHighlighted
                        ? 'bg-primary-50 border-primary-100'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    {step.label && (
                      <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] px-3 py-1 rounded-bl-lg uppercase tracking-wider font-bold">
                        {step.label}
                      </div>
                    )}

                    <h4
                      className={`font-bold mb-2 text-lg ${
                        isSuccess ? 'text-green-900' : 'text-gray-900'
                      }`}
                    >
                      {step.title}
                    </h4>

                    {step.description && (
                      <p
                        className={`text-sm ${
                          isSuccess ? 'text-green-800' : 'text-gray-600'
                        }`}
                      >
                        {step.description}
                      </p>
                    )}

                    {step.items && step.items.length > 0 && (
                      <ul className="text-xs text-gray-600 space-y-1.5 ml-1 mt-2">
                        {step.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <span className="material-symbols-rounded text-primary-500" style={{ fontSize: '12px' }} aria-hidden="true">check</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.note && (
                      <div className="mt-3 bg-amber-50 border border-amber-100 p-3 rounded-lg flex gap-3 items-start">
                        <DynamicIcon
                          name={step.note.icon}
                          className="w-4 h-4 text-amber-600 mt-0.5 shrink-0"
                        />
                        <p className="text-xs text-amber-800">{step.note.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
