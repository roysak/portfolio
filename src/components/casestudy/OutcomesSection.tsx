import type { OutcomesSection } from '../../data/caseStudyTypes';
import { Band } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: OutcomesSection;
}

export default function OutcomesSection({ section }: Props) {
  return (
    <Band>
      {section.columns.map((col, c) => (
        <Col key={col.title} span={5} start={c === 0 ? 1 : 8} data-fade>
          <h3 className="m-0 mb-5 pb-2 border-b border-rule-2 label flex gap-3">
            <span className="text-accent">{String(c + 1).padStart(2, '0')}</span>
            <span className="text-ink">{col.title}</span>
          </h3>
          <ul className="list-none m-0 p-0">
            {col.items.map((item) => (
              <li key={item.title} className="py-4 border-b border-rule">
                <strong className="block font-medium text-ink mb-1.5">{item.title}</strong>
                <span className="font-serif text-small text-ink-2">{item.description}</span>
              </li>
            ))}
          </ul>
        </Col>
      ))}
    </Band>
  );
}
