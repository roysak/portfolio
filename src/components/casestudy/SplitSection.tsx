import type { SplitSectionData } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';
import { Band, FrameCaption } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: SplitSectionData;
}

/** Bullet tone is carried by a mono glyph in the margin, not a coloured pill. */
const BULLET_MARK: Record<string, { mark: string; className: string }> = {
  check: { mark: '✓', className: 'text-accent-2' },
  warning: { mark: '!', className: 'text-accent' },
  error: { mark: '✕', className: 'text-accent' },
  info: { mark: '·', className: 'text-ink-3' },
};

export default function SplitSection({ section }: Props) {
  const { openModal } = useModal();
  const imageLeft = section.imagePosition === 'left';

  return (
    <Band id={section.anchor}>
      {/* Text */}
      <Col span={5} start={imageLeft ? 8 : 1}>
        <h2
          data-set
          className="m-0 mb-5 font-display font-medium text-[clamp(26px,3.2vw,44px)] leading-[1.02] tracking-[-0.035em] text-balance"
        >
          {section.title}
        </h2>
        <p className="m-0 mb-7 font-serif text-lead leading-[1.45] text-ink-2 text-pretty">
          {section.description}
        </p>
        <ul className="list-none m-0 p-0 border-t border-rule">
          {section.bullets.map((bullet, i) => {
            const mark = BULLET_MARK[bullet.variant] ?? BULLET_MARK.info;
            return (
              <li key={i} className="flex gap-4 py-3 border-b border-rule text-small">
                <span
                  className={`font-mono shrink-0 w-4 text-center ${mark.className}`}
                  aria-hidden="true"
                >
                  {mark.mark}
                </span>
                <span className="text-ink-2">{bullet.text}</span>
              </li>
            );
          })}
        </ul>
      </Col>

      {/* Plate */}
      <Col span={6} start={imageLeft ? 1 : 7}>
        <figure className="m-0">
          <FrameCaption>{section.imageCaption}</FrameCaption>
          <button
            type="button"
            onClick={() => openModal(assetUrl(section.image), section.imageAlt)}
            className="block w-full cursor-zoom-in"
            aria-label={`Zoom: ${section.imageAlt}`}
          >
            <div data-plate className="plate-frame">
              <div className="plate-media">
                <img src={assetUrl(section.image)} alt={section.imageAlt} loading="lazy" />
              </div>
            </div>
          </button>
        </figure>
      </Col>
    </Band>
  );
}
