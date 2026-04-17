// ─── Meta ──────────────────────────────────────────────────────────────────

export interface CaseStudyMeta {
  role: string;
  platform: string;
  tools: string;
  focus: string;
}

// ─── Hero ──────────────────────────────────────────────────────────────────

export interface HeroData {
  type: 'hero';
  badge: string;
  badgeIcon?: string;
  title: string;
  description: string;
  meta: CaseStudyMeta;
}

// ─── In-page nav ────────────────────────────────────────────────────────────

export interface CaseStudyNavItem {
  anchor: string;
  label: string;
}

// ─── Card Grid ──────────────────────────────────────────────────────────────

export interface CardGridItem {
  icon: string;
  category: string;
  title: string;
  description: string;
}

export interface CardGridSection {
  type: 'cardGrid';
  anchor: string;
  background: 'white' | 'gray';
  iconColorClass: string; // e.g. 'bg-red-50 text-red-500'
  title: string;
  subtitle: string;
  cards: CardGridItem[];
}

// ─── Split Section ───────────────────────────────────────────────────────────

export interface SplitBullet {
  variant: 'check' | 'warning' | 'error';
  text: string;
}

export interface SplitSectionData {
  type: 'split';
  anchor?: string;
  title: string;
  description: string;
  bullets: SplitBullet[];
  image: string;
  imageAlt: string;
  imageCaption: string;
  imagePosition: 'left' | 'right';
}

// ─── Compare Slider ─────────────────────────────────────────────────────────

export interface CompareSliderSection {
  type: 'compareSlider';
  anchor: string;
  title: string;
  subtitle: string;
  before: { src: string; label: string };
  after: { src: string; label: string };
  heightPreset: 'tall' | 'medium' | 'short';
}

// ─── Deep Dive Tabs ──────────────────────────────────────────────────────────

export interface DeepDiveTab {
  id: string;
  title: string;
  description: string;
  caption: string;
  image: string;
}

export interface DeepDiveSection {
  type: 'deepDive';
  anchor: string;
  title: string;
  subtitle: string;
  tabs: DeepDiveTab[];
}

// ─── Outcomes ────────────────────────────────────────────────────────────────

export interface OutcomeItem {
  title: string;
  description: string;
}

export interface OutcomeColumn {
  icon: string;
  title: string;
  items: OutcomeItem[];
}

export interface OutcomesSection {
  type: 'outcomes';
  columns: OutcomeColumn[];
}

// ─── Timeline ────────────────────────────────────────────────────────────────

export interface TimelineStep {
  title: string;
  description?: string;
  variant: 'default' | 'highlighted' | 'success';
  label?: string;
  note?: { icon: string; text: string };
  items?: string[];
}

export interface TimelineSection {
  type: 'timeline';
  anchor: string;
  icon?: string;
  title: string;
  subtitle: string;
  steps: TimelineStep[];
}

// ─── Carousel ────────────────────────────────────────────────────────────────

export interface CarouselSlide {
  image: string;
  label: string;
  sublabel: string;
}

export interface CarouselSection {
  type: 'carousel';
  anchor: string;
  title: string;
  subtitle: string;
  slides: CarouselSlide[];
}

// ─── Full-width Showcase ─────────────────────────────────────────────────────

export interface ShowcaseSection {
  type: 'showcase';
  anchor: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

// ─── Callout Card ────────────────────────────────────────────────────────────

export interface CalloutSection {
  type: 'callout';
  icon: string;
  title: string;
  description: string;
}

// ─── Info Tree (IA diagram) ──────────────────────────────────────────────────

export interface InfoTreeSubitem {
  text: string;
  badge?: { text: string; variant: 'required' | 'optional' };
  subtext?: string;
}

export interface InfoTreeItem {
  title: string;
  highlighted?: boolean;
  subitems?: InfoTreeSubitem[];
}

export interface InfoTreeBranch {
  icon: string;
  title: string;
  items: InfoTreeItem[];
}

export interface InfoTreeSection {
  type: 'infoTree';
  anchor: string;
  title: string;
  subtitle: string;
  root: {
    icon: string;
    title: string;
    subtitle: string;
  };
  branches: InfoTreeBranch[];
}

// ─── Union ───────────────────────────────────────────────────────────────────

export type CaseStudyPageSection =
  | CardGridSection
  | SplitSectionData
  | CompareSliderSection
  | DeepDiveSection
  | OutcomesSection
  | TimelineSection
  | CarouselSection
  | ShowcaseSection
  | CalloutSection
  | InfoTreeSection;

// ─── Page ────────────────────────────────────────────────────────────────────

export interface CaseStudyPageData {
  id: string;
  hero: HeroData;
  navItems: CaseStudyNavItem[];
  sections: CaseStudyPageSection[];
}
