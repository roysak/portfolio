import DynamicIcon from '../DynamicIcon';
import type { TimelineSection } from '../../data/caseStudyTypes';
import { Band, SectionIntro } from './SectionShell';

interface Props {
  section: TimelineSection;
}

export default function Timeline({ section }: Props) {
  return (
    <Band id={section.anchor} tone="raised">
      <SectionIntro title={section.title} subtitle={section.subtitle} icon={section.icon} />

      <div className="max-w-3xl">
        <div className="relative border-l border-line-strong ml-4 md:ml-6 grid gap-8 pb-4">
          {section.steps.map((step, i) => {
            const isSuccess = step.variant === 'success';
            const isHighlighted = step.variant === 'highlighted';

            return (
              <div key={i} className="reveal relative pl-8 md:pl-12">
                {/* Step marker */}
                <div
                  className={`absolute -left-4 top-1 w-8 h-8 rounded-full grid place-items-center font-mono text-[11px] ${
                    isSuccess
                      ? 'bg-emerald-400 text-ink'
                      : 'bg-pigment text-pigment-ink'
                  }`}
                >
                  {isSuccess ? (
                    <span className="material-symbols-rounded" style={{ fontSize: '16px' }} aria-hidden="true">
                      check
                    </span>
                  ) : (
                    i + 1
                  )}
                </div>

                {/* Card */}
                <div
                  className={`p-6 border relative overflow-hidden ${
                    isSuccess
                      ? 'bg-emerald-400/8 border-emerald-400/25'
                      : isHighlighted
                      ? 'bg-plum-soft border-plum/30'
                      : 'bg-ink border-line'
                  }`}
                >
                  {step.label && (
                    <div className="absolute top-0 right-0 bg-pigment text-pigment-ink font-mono text-[10px] px-3 py-1 uppercase tracking-[0.08em]">
                      {step.label}
                    </div>
                  )}

                  <h4 className="m-0 mb-2 font-display font-semibold text-[19px] tracking-[-0.02em] text-bone">
                    {step.title}
                  </h4>

                  {step.description && (
                    <p className="m-0 text-[15px] text-bone-2">{step.description}</p>
                  )}

                  {step.items && step.items.length > 0 && (
                    <ul className="list-none m-0 p-0 mt-3 grid gap-1.5 text-[14px] text-bone-2">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span
                            className="material-symbols-rounded text-pigment shrink-0"
                            style={{ fontSize: '14px' }}
                            aria-hidden="true"
                          >
                            check
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.note && (
                    <div className="mt-4 bg-pigment/8 border border-pigment/25 p-3.5 flex gap-3 items-start">
                      <DynamicIcon
                        name={step.note.icon}
                        className="w-4 h-4 text-pigment mt-0.5 shrink-0"
                      />
                      <p className="m-0 text-[13px] text-bone-2">{step.note.text}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Band>
  );
}
