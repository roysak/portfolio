import type { CaseStudyPageSection } from '../../data/caseStudyTypes';
import CardGrid from './CardGrid';
import SplitSection from './SplitSection';
import CompareSlider from './CompareSlider';
import DeepDiveTabs from './DeepDiveTabs';
import OutcomesSection from './OutcomesSection';
import Timeline from './Timeline';
import Carousel from './Carousel';
import Showcase from './Showcase';
import CalloutCard from './CalloutCard';
import InfoTree from './InfoTree';

interface Props {
  section: CaseStudyPageSection;
}

export default function SectionRenderer({ section }: Props) {
  switch (section.type) {
    case 'cardGrid':
      return <CardGrid section={section} />;
    case 'split':
      return <SplitSection section={section} />;
    case 'compareSlider':
      return <CompareSlider section={section} />;
    case 'deepDive':
      return <DeepDiveTabs section={section} />;
    case 'outcomes':
      return <OutcomesSection section={section} />;
    case 'timeline':
      return <Timeline section={section} />;
    case 'carousel':
      return <Carousel section={section} />;
    case 'showcase':
      return <Showcase section={section} />;
    case 'callout':
      return <CalloutCard section={section} />;
    case 'infoTree':
      return <InfoTree section={section} />;
    default:
      return null;
  }
}
