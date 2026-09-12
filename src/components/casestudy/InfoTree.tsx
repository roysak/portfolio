import DynamicIcon from '../DynamicIcon';
import type { InfoTreeSection } from '../../data/caseStudyTypes';
import { Band, SectionIntro } from './SectionShell';

interface Props {
  section: InfoTreeSection;
}

export default function InfoTree({ section }: Props) {
  return (
    <Band id={section.anchor}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <div className="max-w-3xl">
        {/* Root node */}
        <div className="reveal bg-bone text-ink p-4 flex items-center gap-4 relative z-10 w-full sm:w-max sm:pr-12">
          <div className="bg-ink/10 p-2.5 rounded-full">
            <DynamicIcon name={section.root.icon} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="m-0 font-display font-semibold text-[19px] leading-tight tracking-[-0.02em]">
              {section.root.title}
            </h3>
            <p className="m-0 mt-1 font-mono text-[11px] uppercase tracking-[0.08em] opacity-70">
              {section.root.subtitle}
            </p>
          </div>
        </div>

        {/* Branches */}
        <div className="ml-6 sm:ml-8 border-l border-line-strong pl-6 sm:pl-10 pb-4 grid gap-8 relative -top-4 pt-12">
          {section.branches.map((branch) => (
            <div key={branch.title} className="reveal relative">
              {/* Horizontal connector */}
              <div className="absolute -left-6 sm:-left-10 top-8 w-6 sm:w-10 border-t border-line-strong" />

              <div className="bg-ink-2 p-6 border border-line">
                <h4 className="m-0 mb-4 font-display font-semibold text-[18px] tracking-[-0.02em] flex items-center gap-2.5">
                  <DynamicIcon name={branch.icon} className="w-5 h-5 text-pigment" />
                  {branch.title}
                </h4>

                <div className="grid gap-3">
                  {branch.items.map((item) => (
                    <div
                      key={item.title}
                      className={`p-3.5 border text-[15px] ${
                        item.highlighted ? 'bg-plum-soft border-plum/30' : 'bg-ink border-line'
                      }`}
                    >
                      <span className="font-medium text-bone">{item.title}</span>

                      {item.subitems && item.subitems.length > 0 && (
                        <ul className="list-none m-0 p-0 text-bone-2 mt-2 grid gap-1.5 text-[14px]">
                          {item.subitems.map((sub, j) => (
                            <li key={j} className="flex items-center gap-2 flex-wrap">
                              <span
                                className="material-symbols-rounded text-bone-3 shrink-0"
                                style={{ fontSize: '16px' }}
                                aria-hidden="true"
                              >
                                subdirectory_arrow_right
                              </span>
                              {sub.text}
                              {sub.subtext && (
                                <span className="text-bone-3 text-[13px]">{sub.subtext}</span>
                              )}
                              {sub.badge && (
                                <span
                                  className={`font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-[0.06em] ${
                                    sub.badge.variant === 'required'
                                      ? 'bg-pigment/15 text-pigment'
                                      : 'bg-plum-soft text-plum'
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
    </Band>
  );
}
