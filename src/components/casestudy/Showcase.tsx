import type { ShowcaseSection } from '../../data/caseStudyTypes';
import { assetUrl } from '../../utils/assetUrl';
import { useModal } from './ModalContext';
import { Band, SectionIntro } from './SectionShell';
import { Col } from '../system';

interface Props {
  section: ShowcaseSection;
}

export default function Showcase({ section }: Props) {
  const { openModal } = useModal();

  return (
    <Band id={section.anchor}>
      <SectionIntro title={section.title} subtitle={section.subtitle} />

      <Col span={12}>
        <figure className="m-0">
          <button
            type="button"
            onClick={() => openModal(assetUrl(section.image), section.alt)}
            className="block w-full cursor-zoom-in"
            aria-label={`Zoom: ${section.alt}`}
          >
            <div data-plate className="plate-frame">
              <div className="plate-media">
                <img src={assetUrl(section.image)} alt={section.alt} loading="lazy" />
              </div>
            </div>
          </button>
          <figcaption className="mt-3 flex items-baseline gap-3">
            <span className="label text-accent shrink-0">Plate</span>
            <span className="leader" aria-hidden="true" />
            <span className="label">{section.alt}</span>
          </figcaption>
        </figure>
      </Col>
    </Band>
  );
}
