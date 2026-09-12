import DynamicIcon from '../DynamicIcon';
import type { InfoTreeSection } from '../../data/caseStudyTypes';
import { Band, SectionIntro } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: InfoTreeSection;
}

/** Information architecture drawn in hairlines — a technical plate, not a card stack. */
export default function InfoTree({ section }: Props) {
  return (
    <Band id={section.anchor}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <Col span={10}>
        {/* Root */}
        <div data-fade className="flex items-center gap-4 p-4 bg-ink text-paper w-full sm:w-max sm:pr-14">
          <DynamicIcon name={section.root.icon} className="w-5 h-5 shrink-0" />
          <div>
            <h3 className="m-0 font-display font-medium text-head leading-tight tracking-[-0.025em]">
              {section.root.title}
            </h3>
            <p className="m-0 mt-1 font-mono text-caption uppercase tracking-[0.11em] opacity-70">
              {section.root.subtitle}
            </p>
          </div>
        </div>

        {/* Branches, hung off a single spine */}
        <div className="ml-5 sm:ml-8 border-l border-rule-2 pl-6 sm:pl-10 pt-8 grid gap-8">
          {section.branches.map((branch, b) => (
            <div key={branch.title} data-fade className="relative">
              {/* Connector back to the spine */}
              <span
                aria-hidden="true"
                className="absolute -left-6 sm:-left-10 top-4 w-6 sm:w-10 border-t border-rule-2"
              />

              <h4 className="m-0 mb-4 pb-2 border-b border-rule-2 flex items-center gap-3">
                <span className="label text-accent">{String(b + 1).padStart(2, '0')}</span>
                <DynamicIcon name={branch.icon} className="w-4 h-4 text-accent-2" />
                <span className="font-display font-medium text-head tracking-[-0.025em]">
                  {branch.title}
                </span>
              </h4>

              <div className="grid gap-0">
                {branch.items.map((item) => (
                  <div
                    key={item.title}
                    className={`py-3 border-b border-rule ${
                      item.highlighted ? 'border-l-2 border-l-accent pl-4' : ''
                    }`}
                  >
                    <span className="font-medium text-ink text-small">{item.title}</span>

                    {item.subitems && item.subitems.length > 0 && (
                      <ul className="list-none m-0 p-0 mt-2 grid gap-1.5">
                        {item.subitems.map((sub, j) => (
                          <li
                            key={j}
                            className="flex items-baseline gap-2.5 flex-wrap text-small text-ink-2"
                          >
                            <span className="font-mono text-ink-3 shrink-0" aria-hidden="true">
                              └
                            </span>
                            {sub.text}
                            {sub.subtext && <span className="label">{sub.subtext}</span>}
                            {sub.badge && (
                              <span
                                className={`font-mono text-[10px] px-2 py-0.5 uppercase tracking-[0.08em] border ${
                                  sub.badge.variant === 'required'
                                    ? 'text-accent border-accent'
                                    : 'text-accent-2 border-accent-2'
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
          ))}
        </div>
      </Col>
    </Band>
  );
}
