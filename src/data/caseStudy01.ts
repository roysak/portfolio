import type { CaseStudyPageData } from './caseStudyTypes';

const caseStudy01: CaseStudyPageData = {
  id: '01',

  hero: {
    type: 'hero',
    badge: 'Automation Story Property Panel Redesign',
    badgeIcon: 'dashboard',
    title: 'Streamlining the Property Panel',
    description:
      'Replaced a scroll-heavy stacked form with a high-density property grid—reducing navigation effort, improving scanability, and accelerating workflow configuration for power users.',
    meta: {
      role: 'Product UX Designer (UX strategy, interaction design, system design, delivery collaboration)',
      platform: 'Automation Workflow Builder (Web)',
      tools: 'Figma, Stackblitz, Angular',
      focus: 'Information Density, Interaction Efficiency, Scalable UI Systems',
    },
  },

  navItems: [
    { anchor: 'hero', label: 'Summary' },
    { anchor: 'heuristics', label: 'Heuristics' },
    { anchor: 'problem', label: 'Problem' },
    { anchor: 'insight', label: 'Insight' }, // ✅ NEW
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
        'The legacy stacked layout was evaluated against usability heuristics to identify structural inefficiencies impacting speed, clarity, and cognitive load.',
      cards: [
        {
          icon: 'bolt',
          category: 'Flexibility & Efficiency',
          title: 'Excessive Scrolling',
          description:
            'Each property consumed a full row, forcing users into repeated scrolling loops for even simple configurations.',
        },
        {
          icon: 'visibility',
          category: 'Aesthetic & Minimalist Design',
          title: 'Wasted Real Estate',
          description:
            'Horizontal space remained underutilized while vertical space was overconsumed, reducing information density.',
        },
        {
          icon: 'warning',
          category: 'Visibility of System Status',
          title: 'Poor Contextual Tracking',
          description:
            'Users struggled to maintain spatial orientation and understand nested relationships in long, stacked lists.',
        },
      ],
    },

    {
      type: 'split',
      anchor: 'problem',
      title: 'The Legacy Approach',
      description:
        'The panel treated configuration as a form-filling task, forcing users into sequential interaction patterns that don’t scale for complex workflows.',
      bullets: [
        { variant: 'warning', text: 'Sequential scanning increased cognitive load and slowed decision-making.' },
        {
          variant: 'warning',
          text: 'High scroll dependency disrupted workflow continuity.',
        },
        {
          variant: 'warning',
          text: 'Weak hierarchy made nested relationships difficult to parse.',
        },
      ],
      image: '/img/01/old.png',
      imageAlt: 'V1 Stacked Layout',
      imageCaption: 'Screenshot: V1 Stacked Layout',
      imagePosition: 'right',
    },

    {
      type: 'callout',
      icon: 'lightbulb',
      title: 'Key Insight',
      description:
        'The issue wasn’t just layout—it was the wrong interaction model. Users weren’t filling forms; they were performing structured editing. This required shifting from a sequential form pattern to a parallel, grid-based interaction model similar to IDE property inspectors.',
    },


    {
      type: 'split',
      anchor: 'solution',
      title: 'The Power-User Approach',
      description:
        'An inline property grid restructured the panel into a compact, row-based system—enabling faster scanning, reduced navigation, and higher information density.',
      bullets: [
        {
          variant: 'check',
          text: 'Row-based layout enables parallel scanning instead of sequential reading.',
        },
        {
          variant: 'check',
          text: 'Full-width utilization significantly increases visible data per viewport.',
        },
        {
          variant: 'check',
          text: 'Merged header reduces structural fragmentation and saves vertical space.',
        },
        {
          variant: 'check',
          text: 'Interaction states (hover, focus, error) maintain clarity in dense layouts.',
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
        'From sequential, scroll-heavy interaction to a high-density, scan-efficient property grid. Slide to compare the legacy stacked form with the new design.',
      before: { src: '/img/01/before.png', label: 'Legacy' },
      after: { src: '/img/01/after.png', label: 'New' },
      heightPreset: 'tall',
    },

        {
      type: 'cardGrid',
      anchor: 'impact',
      background: 'white',
      iconColorClass: 'bg-green-50 text-green-600',
      title: 'Impact',
      subtitle:
        'Post-redesign observations and usability validation indicated strong improvements in efficiency and usability.',
      cards: [
        {
          icon: 'speed',
          category: 'Efficiency',
          title: 'Reduced Navigation Effort',
          description:
            'Reduced scroll depth by ~40–60%, minimized interaction steps, and enabled faster property access through improved visibility and higher information density.',
        },
        {
          icon: 'visibility',
          category: 'Usability',
          title: 'Improved Scanability',
          description:
            'Improved speed and accuracy by enabling parallel scanning, reducing cognitive load, and maintaining context with inline validation.',
        },
        {
          icon: 'check_circle',
          category: 'User Feedback',
          title: 'Power-User Preference',
          description:
            'Despite initial density concerns, users adapted quickly and showed a strong preference for the grid—especially power users handling complex workflows.',
        },
      ],
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
        'Dense interfaces require strong interaction design to maintain clarity and usability.',
      tabs: [
        {
          id: 'states',
          title: 'Contextual States & Errors',
          description:
            'Row-level hover and focus states prevent disorientation, while inline validation reduces disruption.',
          caption: 'Hover, Focus, and Error States',
          image: '/img/01/states.png',
        },
        {
          id: 'tooltips',
          title: 'Progressive Disclosure',
          description:
            'Advanced metadata is hidden until needed, balancing simplicity with depth.',
          caption: 'Rich Metadata Tooltip Hover',
          image: '/img/01/meta.png',
        },
        {
          id: 'inputs',
          title: 'Dynamic Containers',
          description:
            'The layout scales seamlessly for arrays, variables, and complex JSON structures.',
          caption: 'Complex Input Types Grid',
          image: '/img/01/values.png',
        },
      ],
    },

    {
      type: 'callout',
      icon: 'warning',
      title: 'Trade-offs',
      description:
        'Higher information density increased initial learning curve and required stronger interaction cues. This was mitigated through clear hover states, consistent patterns, and thoughtful defaults.',
    },

    {
      type: 'callout',
      icon: 'settings',
      title: 'Systematic Design in Figma',
      description:
        'Variant-driven components mirrored front-end logic, ensuring consistency across interaction states and enabling efficient developer handoff.',
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
                'Without strong interaction cues, high-density layouts quickly become unusable.',
            },
            {
              title: 'Interaction Enables Efficiency',
              description:
                'Improved feedback and affordances made higher density usable and effective.',
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
                'Enable full keyboard navigation for true power-user efficiency.',
            },
            {
              title: 'Custom Views',
              description:
                'Allow users to pin and personalize frequently used properties.',
            },
          ],
        },
      ],
    },
  ],
};

export default caseStudy01;
