import DynamicIcon from '../DynamicIcon';
import type { OutcomesSection } from '../../data/caseStudyTypes';
import { Band } from './SectionShell';

interface Props {
  section: OutcomesSection;
}

export default function OutcomesSection({ section }: Props) {
  return (
    <Band>
      <div className="grid md:grid-cols-2 gap-[clamp(32px,5vw,72px)]">
        {section.columns.map((col) => (
          <div key={col.title} className="reveal">
            <h3 className="m-0 mb-7 font-display font-semibold text-[clamp(22px,2.4vw,30px)] tracking-[-0.02em] flex items-center gap-3">
              <DynamicIcon name={col.icon} className="w-6 h-6 text-pigment" />
              {col.title}
            </h3>
            <ul className="list-none m-0 p-0 grid border-t border-line">
              {col.items.map((item) => (
                <li key={item.title} className="py-5 border-b border-line">
                  <strong className="block font-medium text-bone mb-1">{item.title}</strong>
                  <span className="text-[15px] text-bone-2">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Band>
  );
}
