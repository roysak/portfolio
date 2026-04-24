import type { CaseStudyPageData } from './caseStudyTypes';

const caseStudy02: CaseStudyPageData = {
  id: '02',

  hero: {
    type: 'hero',
    badge: 'Dashboard Builder Design',
    badgeIcon: 'dashboard_customize',
    title: 'Manual JSON to Visual Canvas',
    description:
      'Transforming a complex, code-based dashboard configuration process into an intuitive visual builder in just over two months through ruthless prioritization.',
    meta: {
      role: 'Lead Product Designer',
      platform: 'Analytics Web Application',
      tools: 'AI Ideation, Design Systems',
      focus: 'MVP Scoping, Rapid Delivery, UX Strategy',
    },
  },

  navItems: [
    { anchor: 'ecosystem', label: 'Ecosystem' },
    { anchor: 'architecture', label: 'Architecture' },
    { anchor: 'challenge', label: 'Challenge' },
    { anchor: 'concepts', label: 'Concepts' },
    { anchor: 'solution', label: 'Solution' },
    { anchor: 'flow', label: 'Flow' },
    { anchor: 'features', label: 'Features & Customization' },
    { anchor: 'final', label: 'Final' }
  ],

  sections: [
    {
      type: 'cardGrid',
      anchor: 'ecosystem',
      background: 'gray',
      iconColorClass: 'bg-blue-50 text-blue-500',
      title: 'The Application Ecosystem',
      subtitle:
        'The dashboard builder is the centerpiece of a larger, modular analytics application consisting of three main pillars.',
      cards: [
        {
          icon: 'database',
          category: 'Pillar 1',
          title: 'Data Sources',
          description:
            'The foundational data connections and databases supplying the raw data for visualizations.',
        },
        {
          icon: 'bar_chart',
          category: 'Pillar 2',
          title: 'Widgets',
          description:
            'Reusable, standalone data visualization components created independently to be deployed across multiple contexts.',
        },
        {
          icon: 'dashboard',
          category: 'Pillar 3',
          title: 'Dashboards',
          description:
            'The actual canvases where users assemble widgets using the dashboard builder—our core UX challenge.',
        },
      ],
    },
  
    {
      type: 'infoTree',
      anchor: 'architecture',
      title: 'Information Architecture',
      subtitle:
        'A strict hierarchical tree establishing the foundational paths between Data Sources, Widgets, and Dashboards.',
      root: {
        icon: 'home',
        title: 'Dashboard Builder',
        subtitle: 'Home / Listing Page',
      },
      branches: [
        {
          icon: 'space_dashboard',
          title: 'Dashboard Management',
          items: [
            {
              title: 'Existing Dashboards (Cards)',
              subitems: [{ text: 'Click Card → Preview → Edit Mode' }],
            },
            {
              title: 'Create New Dashboard',
              highlighted: true,
              subitems: [
                {
                  text: 'Select Data Source',
                  badge: { text: 'Required', variant: 'required' },
                },
                {
                  text: 'Add Widgets',
                  subtext: '(Filtered by selected source)',
                },
              ],
            },
          ],
        },
        {
          icon: 'database',
          title: 'Data Sources',
          items: [
            { title: 'Data Source Listing' },
            {
              title: 'Create New Data Source',
              subitems: [
                { text: 'Name & Description' },
                { text: 'Database Details' },
                { text: 'Data Frame Setup' },
                { text: 'Scheduler Config' },
                { text: 'Authorization Setup' },
              ],
            },
          ],
        },
        {
          icon: 'bar_chart',
          title: 'Widgets Library',
          items: [
            { title: 'Widget Listing' },
            {
              title: 'Create New Widget',
              subitems: [
                {
                  text: 'Select Data Source',
                  badge: { text: 'Required', variant: 'required' },
                },
                { text: 'Set Properties & Input Data' },
                {
                  text: 'Enable Drilldown',
                  badge: { text: 'Optional', variant: 'optional' },
                },
              ],
            },
          ],
        },
      ],
    },
  
    {
      type: 'split',
      anchor: 'challenge',
      title: 'Building Blind',
      description:
        'Users previously had to construct custom dashboards by manually writing complex JSON files in a text editor without any visual feedback, leading to a frustrating "guess and check" cycle.',
      bullets: [
        { variant: 'warning', text: 'No visual feedback during dashboard creation or editing.' },
        { variant: 'warning', text: 'Users were forced to write and publish code just to verify layouts.' },
        { variant: 'warning', text: 'Strict 2+ month deadline with a lean team of only 3 developers.' },
      ],
      image: '/img/02/json.png',
      imageAlt: 'Manual JSON Configuration',
      imageCaption: 'Legacy Workflow: Manual JSON Editing',
      imagePosition: 'right',
    },

    {
      type: 'callout',
      icon: 'smart_toy',
      title: 'AI Concepts vs. Reality',
      description:
        'To accelerate ideation, we utilized AI tools to generate initial UI/UX concepts. While feature-rich and advanced, these designs were far too complex for our time and resource constraints. Attempting to build them would have guaranteed missing our launch, forcing a pivot to a highly pragmatic approach.',
    },

    {
      type: 'carousel',
      anchor: 'concepts',
      title: 'Concept Explorations',
      subtitle:
        'Iterating through various layout configurations to balance functional density with available canvas real estate before committing to the final architecture.',
      slides: [
        {
          image: '/img/02/dashboard-concept01.png',
          label: 'Concept 01',
          sublabel: ' ',
        },
        {
          image: '/img/02/dashboard-concept02.png',
          label: 'Concept 02',
          sublabel: ' ',
        },
      ],
    },

    {
      type: 'split',
      anchor: 'solution',
      title: 'The Visual Canvas',
      description:
        'By focusing strictly on the critical path and integrating seamlessly with our existing design system, we shipped a highly usable builder on time.',
      bullets: [
        {
          variant: 'check',
          text: 'Eliminated manual coding with intuitive visual controls.',
        },
        {
          variant: 'check',
          text: 'Removed the "guess and check" cycle with instant visual feedback.',
        },
        {
          variant: 'check',
          text: 'Established a solid foundation for future iterative enhancements.',
        },
      ],
      image: '/img/02/after.png',
      imageAlt: 'New Visual Canvas',
      imageCaption: 'The New Visual Dashboard Builder',
      imagePosition: 'left',
    },

    {
      type: 'timeline',
      anchor: 'flow',
      icon: 'commit',
      title: 'Core Flow: Dashboard Creation',
      subtitle:
        'The end-to-end journey from initiation to publishing, highlighting critical configuration branches.',
      steps: [
        {
          title: 'Initiation',
          description:
            'User clicks "New Dashboard" and enters the Dashboard Builder interface.',
          variant: 'default',
        },
        {
          title: 'Basic Configuration',
          description: 'Set Name, Description, and Instance.',
          variant: 'default',
          note: {
            icon: 'call_split',
            text: 'Drilldown Branch: If "Drilldown Dashboard" is enabled, the user must specify the dashboard size, which dictates how it renders inside modal windows.',
          },
        },
        {
          title: 'Widget Assembly',
          description: 'Add and arrange widgets onto the fixed-grid canvas.',
          label: 'Canvas Stage',
          variant: 'highlighted',
          items: [
            'Custom Widgets: Built from scratch on canvas.',
            'Available Widgets: Pre-built, automatically filtered by selected instance/data source.',
          ],
        },
        {
          title: 'Global Settings',
          description:
            'Configure User Management (permissions/access) and apply a Global Theme.',
          variant: 'default',
        },
        {
          title: 'Validation Loop',
          description: 'Save → Fix Errors (if any) → Re-Save',
          variant: 'default',
        },
        {
          title: 'Finalization',
          description:
            'Publish the dashboard to make it live, then click Preview to view the final rendered output.',
          variant: 'success',
        },
      ],
    },

    {
      type: 'deepDive',
      anchor: 'features',
      title: 'Interactive Features & Customization',
      subtitle:
        'Implementing advanced navigation, contextual controls, and granular styling to enhance the builder experience.',
        tabs: [
        {
          id: 'hover-options',
          title: 'Contextual Hover Options',
          description:
            'Streamlines the editing workflow with quick-access on-hover widget controls, including Clone, Delete, Edit, and Theme Selection.',
          caption: 'Widget Hover State Controls',
          image: '/img/02/feature-01.png',
        },
        {
          id: 'theming',
          title: 'Theme Customization',
          description:
            'Provides granular aesthetic control, allowing users to apply custom themes at both the global dashboard and individual widget levels.',
          caption: 'Dashboard and Widget Theming',
          image: '/img/02/feature-02.png',
        },
        {
          id: 'drilldown',
          title: 'Drilldown & Rules',
          description:
            'Enables users to open nested dashboards for deeper insights by defining specific table columns as interactive links.',
          caption: 'Configuring Drilldown Rules',
          image: '/img/02/feature-03.png',
        },
      ],
    },

    {
      type: 'carousel',
      anchor: 'final',
      title: 'The Final Design',
      subtitle:
        'The culmination of constraint-driven decisions resulting in a clean, focused, and highly functional dashboard builder interface.',
      slides: [
        {
          image: '/img/02/design-01.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-02.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-03.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-04.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-05.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-06.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-07.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-08.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-09.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-10.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-11.png',
          label: ' ',
          sublabel: ' ',
        },
        {
          image: '/img/02/design-12.png',
          label: ' ',
          sublabel: ' ',
        }

      ],
    },

    {
      type: 'outcomes',
      columns: [
        {
          icon: 'check_circle',
          title: 'Impact & Delivery',
          items: [
            {
              title: 'Eliminated Coding',
              description:
                'Users now visually configure dashboards instead of editing raw JSON files.',
            },
            {
              title: 'Instant Validation',
              description:
                'Live visual previews give immediate confirmation of layout choices, drastically reducing build times.',
            },
          ],
        },
        {
          icon: 'route',
          title: 'Strategic Roadmap',
          items: [
            {
              title: 'Frictionless Editing',
              description:
                'Implementing deferred drag-and-drop capabilities for effortless widget placement.',
            },
            {
              title: 'Cross-Device Fluidity & Safeguards',
              description:
                'Introducing fully responsive layouts alongside Auto-save, Undo, and Redo workflow protections.',
            },
          ],
        },
      ],
    },
  ],
};

export default caseStudy02;