import type { SplitSectionData } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';
import { Band, FrameCaption } from './SectionShell';

interface Props {
  section: SplitSectionData;
}

const BULLET_ICONS: Record<string, { name: string; className: string }> = {
  check: { name: 'check_circle', className: 'text-emerald-400' },
  warning: { name: 'warning', className: 'text-pigment' },
  error: { name: 'error', className: 'text-rose-400' },
  info: { name: 'info', className: 'text-plum' },
};

export default function SplitSection({ section }: Props) {
  const { openModal } = useModal();
  const imageLeft = section.imagePosition === 'left';

  return (
    <Band id={section.anchor}>
      <div className="grid md:grid-cols-2 gap-[clamp(32px,5vw,72px)] items-center">
        {/* Text */}
        <div className={`reveal ${imageLeft ? 'md:order-2' : 'md:order-1'}`}>
          <h2 className="m-0 mb-5 font-display font-semibold text-[clamp(28px,3.6vw,52px)] leading-[1.02] tracking-[-0.03em] text-balance">
            {section.title}
          </h2>
          <p className="m-0 mb-7 text-bone-2 text-pretty">{section.description}</p>
          <ul className="list-none m-0 p-0 grid gap-3.5">
            {section.bullets.map((bullet, i) => {
              const icon = BULLET_ICONS[bullet.variant] ?? BULLET_ICONS.info;
              return (
                <li key={i} className="flex gap-3 text-[15px] text-bone">
                  <span
                    className={`material-symbols-rounded shrink-0 ${icon.className}`}
                    style={{ fontSize: '20px' }}
                    aria-hidden="true"
                  >
                    {icon.name}
                  </span>
                  {bullet.text}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Image */}
        <figure
          className={`reveal m-0 w-full bg-ink-2 border border-line p-5 flex flex-col items-center ${
            imageLeft ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <FrameCaption>{section.imageCaption}</FrameCaption>
          <img
            src={assetUrl(section.image)}
            alt={section.imageAlt}
            className="object-cover rounded w-full cursor-zoom-in"
            onClick={() => openModal(assetUrl(section.image), section.imageAlt)}
          />
        </figure>
      </div>
    </Band>
  );
}
