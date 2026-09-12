import DynamicIcon from '../DynamicIcon';
import type { CalloutSection } from '../../data/caseStudyTypes';
import { Band } from './SectionShell';

interface Props {
  section: CalloutSection;
}

export default function CalloutCard({ section }: Props) {
  return (
    <Band>
      <div className="reveal bg-ink-2 border border-line p-[clamp(28px,5vw,64px)] max-w-4xl mx-auto grid justify-items-center gap-5 text-center">
        <DynamicIcon name={section.icon} className="w-12 h-12 text-pigment" />
        <h2 className="m-0 font-display font-semibold text-[clamp(26px,3.2vw,42px)] leading-[1.05] tracking-[-0.03em] text-balance">
          {section.title}
        </h2>
        <p className="m-0 text-bone-2 max-w-[54ch] text-pretty">{section.description}</p>
      </div>
    </Band>
  );
}
