import type { CalloutSection } from '../../data/caseStudyTypes';
import { Band } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: CalloutSection;
}

/** The pull-quote: set in the serif, held out on an accent rule. */
export default function CalloutCard({ section }: Props) {
  return (
    <Band tone="raised">
      <Col span={2}>
        <span className="label text-accent">Key insight</span>
      </Col>
      <Col span={9} start={4} data-fade>
        <div className="border-l-2 border-accent pl-[clamp(20px,3vw,40px)]">
          <h2 className="m-0 font-serif font-normal text-[clamp(24px,3vw,40px)] leading-[1.24] tracking-[-0.015em] text-balance">
            {section.title}
          </h2>
          <p className="m-0 mt-5 text-ink-2 max-w-[56ch] text-pretty">{section.description}</p>
        </div>
      </Col>
    </Band>
  );
}
