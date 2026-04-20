import type { CaseStudyPageData } from './caseStudyTypes';

const caseStudy01: CaseStudyPageData = {
  id: '01',

  hero: {
    type: 'hero',
    badge: 'Automation Story Property Panel Redesign',
    badgeIcon: 'dashboard',
    title: 'Streamlining the Property Panel',
    description:
      'Transforming a space-heavy, stacked form into a compact, interactive property grid to speed up automation setup, reduce errors, and maximize screen real estate.',
    meta: {
      role: 'Product UX Designer',
      platform: 'Web Application',
      tools: 'Figma, Stackblitz, Angular',
      focus: 'UI Architecture, Systems',
    },
  },

  navItems: [
    { anchor: 'hero', label: 'Summary' },
    { anchor: 'heuristics', label: 'Heuristics' },
    { anchor: 'problem', label: 'Problem' },
    { anchor: 'solution', label: 'Solution' },
    { anchor: 'compare', label: 'Compare' },
    { anchor: 'final', label: 'Final Design' },
    { anchor: 'deep-dive', label: 'Deep Dive' },
  ],

  sections: [
    {
      type: 'cardGrid',
      anchor: 'heuristics',
      background: 'gray',
      iconColorClass: 'bg-red-50 text-red-500',
      title: 'Heuristic Evaluation (V1)',
      subtitle:
        'Before redesigning, I analyzed the legacy stacked layout against Usability Heuristics to identify core structural failures.',
      cards: [
        {
          icon: 'bolt',
          category: 'Flexibility & Efficiency',
          title: 'Excessive Scrolling',
          description:
            'The stacked label/input layout consumed too much vertical space. Power users had to constantly scroll to configure standard components, slowing down workflow creation.',
        },
        {
          icon: 'visibility',
          category: 'Aesthetic & Minimalist Design',
          title: 'Wasted Real Estate',
          description:
            'Despite taking up screen width, input fields left significant dead whitespace on the right. Heavy borders added unnecessary visual noise to the UI.',
        },
        {
          icon: 'warning',
          category: 'Visibility of System Status',
          title: 'Poor Contextual Tracking',
          description:
            'Scanning stacked forms caused cognitive fatigue. Users struggled to track parent-child relationships and spatial orientation in long property lists.',
        },
      ],
    },

    {
      type: 'split',
      anchor: 'problem',
      title: 'The Legacy Approach',
      description:
        'In complex workflow builders, users manage dense amounts of data simultaneously. The V1 design hindered this through poor space utilization.',
      bullets: [
        { variant: 'warning', text: 'Stacked layouts created a jagged, tiring eye-tracking path.' },
        {
          variant: 'warning',
          text: 'Tabs and dropdowns occupied separate rows, eating premium vertical space.',
        },
        {
          variant: 'warning',
          text: 'Nested data relationships were difficult to distinguish.',
        },
      ],
      image: '/img/01/old.png',
      imageAlt: 'V1 Stacked Layout',
      imageCaption: 'Screenshot: V1 Stacked Layout',
      imagePosition: 'right',
    },

    {
      type: 'split',
      anchor: 'solution',
      title: 'The Power-User Approach',
      description:
        'Transitioning to an inline property grid—a pattern familiar to IDE users—instantly doubled information density while reducing visual clutter.',
      bullets: [
        {
          variant: 'check',
          text: 'Inline, row-wise layout (label left, input right) maximizes width.',
        },
        {
          variant: 'check',
          text: 'Hint text nested under labels preserves the visual rhythm.',
        },
        {
          variant: 'check',
          text: 'Streamlined header merges tabs and dropdowns into one row.',
        },
        {
          variant: 'check',
          text: 'Auto-expanded default states reduce interaction friction.',
        },
      ],
      image: '/img/01/new.png',
      imageAlt: 'V2 Inline Layout',
      imageCaption: 'Screenshot: V2 Inline Layout',
      imagePosition: 'left',
    },

    {
      type: 'compareSlider',
      anchor: 'compare',
      title: 'The Transformation',
      subtitle:
        'Slide to compare the legacy stacked form with the new high-density property grid.',
      before: { src: '/img/01/before.png', label: 'Legacy' },
      after: { src: '/img/01/after.png', label: 'New' },
      heightPreset: 'tall',
    },

    {
      type: 'carousel',
      anchor: 'final',
      title: 'The Final Design',
      subtitle:
        'Showcasing the refined design that balances functionality, clarity, and user-centric decision-making.',
      slides: [
        {
          image: '/img/01/d-01.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-02.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-03.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-04.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-05.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-06.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-07.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-08.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-09.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-10.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-11.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-12.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-13.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-14.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-15.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-16.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-17.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/01/d-18.png',
          label: ' ',
          sublabel: ' ',
        }
      ],
    },

    {
      type: 'deepDive',
      anchor: 'deep-dive',
      title: 'Micro-interactions & Scalability',
      subtitle:
        'Handling the complexities of a dense interface requires clear interactive states and progressive disclosure.',
      tabs: [
        {
          id: 'states',
          title: 'Contextual States & Errors',
          description:
            'Row-level hover/focus orientation and non-disruptive inline error handling.',
          caption: 'Hover, Focus, and Error States',
          image: '/img/01/states.png',
        },
        {
          id: 'tooltips',
          title: 'Progressive Disclosure',
          description:
            'Rich hover tooltips hide technical metadata until the user needs it.',
          caption: 'Rich Metadata Tooltip Hover',
          image: '/img/01/meta.png',
        },
        {
          id: 'inputs',
          title: 'Dynamic Containers',
          description:
            'Flexible columns that scale for arrays, variables, and JSON seamlessly.',
          caption: 'Complex Input Types Grid',
          image: '/img/01/values.png',
        },
      ],
    },

    {
      type: 'callout',
      icon: 'settings',
      title: 'Systematic Design in Figma',
      description:
        'Built using comprehensive Figma variants to create a highly modular component library. This ensured pixel-perfect consistency across complex interaction states and created a streamlined handoff process that directly mirrored front-end component logic.',
    },

    {
      type: 'outcomes',
      columns: [
        {
          icon: 'check_circle',
          title: 'Lessons Learned',
          items: [
            {
              title: 'Density Requires Boundaries',
              description:
                'Row-level hover states are critical to prevent users from losing their place in dense grids.',
            },
            {
              title: 'Defaults Drive Efficiency',
              description:
                'Letting qualitative feedback dictate the default open tabs significantly reduced interaction friction.',
            },
          ],
        },
        {
          icon: 'arrow_forward',
          title: 'Next Steps',
          items: [
            {
              title: 'Keyboard Accessibility',
              description:
                'Introduce robust keyboard navigation (tabbing rows, spacebar expansion) for true power-user support.',
            },
            {
              title: 'Custom Views',
              description:
                'Explore saving custom views or pinning frequently used properties to the top of the panel.',
            },
          ],
        },
      ],
    },
  ],
};

export default caseStudy01;
