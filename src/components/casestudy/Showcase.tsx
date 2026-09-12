import type { ShowcaseSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';
import { Band, SectionIntro } from './SectionShell';

interface Props {
  section: ShowcaseSection;
}

export default function Showcase({ section }: Props) {
  const { openModal } = useModal();
  return (
    <Band id={section.anchor}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />
      <div className="reveal w-full bg-ink-2 border border-line overflow-hidden">
        <img
          src={assetUrl(section.image)}
          alt={section.alt}
          className="w-full h-auto cursor-zoom-in"
          onClick={() => openModal(assetUrl(section.image), section.alt)}
        />
      </div>
    </Band>
  );
}
