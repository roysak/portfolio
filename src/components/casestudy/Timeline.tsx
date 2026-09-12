import DynamicIcon from '../DynamicIcon';
import type { TimelineSection } from '../../data/caseStudyTypes';
import { Band, SectionIntro } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: TimelineSection;
}

/** A ruled, numbered sequence — a printed running order rather than a stack of cards. */
export default function Timeline({ section }: Props) {
  return (
    <Band id={section.anchor} tone="raised">
      <SectionIntro title={section.title} subtitle={section.subtitle} icon={section.icon} />

      <Col span={9}>
        <ol className="list-none m-0 p-0 border-t border-rule-2">
          {section.steps.map((step, i) => {
            const isSuccess = step.variant === 'success';
            const isHighlighted = step.variant === 'highlighted';

            return (
              <li
                key={i}
                data-fade
                className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4.5rem_1fr] gap-x-6 gap-y-2 py-6 border-b border-rule"
              >
                <span
                  className={`label pt-1 ${isSuccess || isHighlighted ? 'text-accent' : ''}`}
                  aria-hidden={isSuccess ? undefined : true}
                >
                  {isSuccess ? '✓ Done' : String(i + 1).padStart(2, '0')}
                </span>

                <div className={isHighlighted ? 'border-l-2 border-accent pl-5 -ml-5' : ''}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h4 className="m-0 font-display font-medium text-head leading-tight tracking-[-0.025em]">
                      {step.title}
                    </h4>
                    {step.label && <span className="label text-accent">{step.label}</span>}
                  </div>

                  {step.description && (
                    <p className="m-0 mt-2 font-serif text-small text-ink-2">{step.description}</p>
                  )}

                  {step.items && step.items.length > 0 && (
                    <ul className="list-none m-0 p-0 mt-3 grid gap-1.5">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-baseline gap-3 text-small text-ink-2">
                          <span className="font-mono text-accent-2 shrink-0" aria-hidden="true">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.note && (
                    <p className="m-0 mt-4 flex gap-3 items-start pt-3 border-t border-rule">
                      <DynamicIcon
                        name={step.note.icon}
                        className="w-4 h-4 text-accent mt-0.5 shrink-0"
                      />
                      <span className="label normal-case tracking-normal text-small">
                        {step.note.text}
                      </span>
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Col>
    </Band>
  );
}
