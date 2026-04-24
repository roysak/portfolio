import type { CaseStudyPageData } from './caseStudyTypes';

const caseStudy02: CaseStudyPageData = {
  id: '02',

  hero: {
    type: 'hero',
    badge: 'Dashboard Builder Design',
    badgeIcon: 'dashboard_customize',
    title: 'JSON to Visual Canvas',
    description:
      'Redesigned a code-heavy dashboard creation workflow into an intuitive visual builder—shipped in 2 months with a team of 3 engineers by prioritizing usability over feature complexity.',
    meta: {
      role: 'Product UX Designer (End-to-end: UX strategy, interaction design, delivery)',
      platform: 'Analytics Web Application',
      tools: 'AI Ideation, Design Systems',
      focus: 'Constraint-driven UX, Rapid Delivery',
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
        'Dashboard creation required users—primarily data analysts and semi-technical users—to manually write complex JSON configurations without any visual feedback. This created a slow, error-prone workflow heavily dependent on trial and error.',
      bullets: [
        { variant: 'warning', text: 'No visual feedback during dashboard creation or editing.' },
        { variant: 'warning', text: 'Users had to write and publish code just to validate layouts.' },
        { variant: 'warning', text: 'High dependency on engineering teams for debugging and support.' },
        { variant: 'warning', text: 'Strict 2-month timeline with only 3 developers.' },
      ],
      image: '/img/02/json.png',
      imageAlt: 'Manual JSON Configuration',
      imageCaption: 'Legacy Workflow: Trial-and-error JSON editing',
      imagePosition: 'right',
    },

    {
      type: 'callout',
      icon: 'smart_toy',
      title: 'Exploration vs. Reality',
      description:
        'Early AI-assisted concepts explored highly flexible, feature-rich builders with advanced interactions. However, these approaches required significant engineering effort and backend changes. Given the timeline, we made a strategic decision to prioritize a simplified, constraint-driven solution that could be reliably shipped.',
    },

    {
      type: 'carousel',
      anchor: 'concepts',
      title: 'Concept Explorations',
      subtitle:
        'Early concepts explored more flexible, high-density layouts with advanced interactions, but these increased cognitive load and implementation complexity. We iterated toward a more structured, grid-based approach that balanced usability with engineering feasibility.',
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
        'Instead of building a fully flexible system, we focused on the critical path: enabling users to quickly create dashboards with confidence. The solution was a structured visual canvas that translates user actions into valid configurations without exposing underlying JSON.',
      bullets: [
        {
          variant: 'check',
          text: 'Replaced manual JSON editing with intuitive visual interactions.',
        },
        {
          variant: 'check',
          text: 'Introduced real-time visual feedback to eliminate trial-and-error workflows.',
        },
        {
          variant: 'check',
          text: 'Used a constraint-based layout to reduce errors and accelerate development.',
        },
        {
          variant: 'info',
          text: 'Intentionally avoided drag-and-drop interactions due to time constraints and risk of layout inconsistencies, prioritizing a stable and shippable system.',
        },
      ],
      image: '/img/02/after.png',
      imageAlt: 'New Visual Canvas',
      imageCaption: 'Structured visual builder with instant feedback',
      imagePosition: 'left',
    },

    {
      type: 'timeline',
      anchor: 'flow',
      icon: 'commit',
      title: 'Core Flow: Dashboard Creation',
      subtitle:
        'A streamlined, constraint-driven flow designed to reduce errors and guide users from creation to publishing with minimal friction.',
      steps: [
        {
          title: 'Initiation',
          description:
            'User clicks "New Dashboard" and enters the Dashboard Builder interface.',
          variant: 'default',
        },
        {
          title: 'Basic Configuration',
          description: 'Capture essential metadata (Name, Description, Instance) upfront to properly scope the dashboard before layout decisions.',
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
            'Widget-level actions such as Edit, Clone, Delete, and Theme are revealed on hover, reducing interface clutter while keeping controls easily accessible. Internal testing showed users were able to quickly discover and use these controls without guidance.',
          caption: 'Widget Hover State Controls',
          image: '/img/02/feature-01.png',
        },
        {
          id: 'theming',
          title: 'Layered Theme Customization',
          description:
            'Supports both global dashboard themes and widget-level overrides, balancing consistency with flexibility.',
          caption: 'Dashboard and Widget Theming',
          image: '/img/02/feature-02.png',
        },
        {
          id: 'drilldown',
          title: 'Drilldown Interactions',
          description:
            'Allows users to define interactive pathways between dashboards, enabling deeper analysis without overwhelming a single view. Internal users were able to configure drilldowns without requiring engineering assistance.',
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
              title: 'Eliminated Manual Configuration',
              description:
                'Shifted dashboard creation from code-based JSON editing to a fully visual workflow, significantly lowering the barrier for non-technical users.',
            },
            {
              title: 'Faster Iteration Cycles',
              description:
                'Internal team feedback indicated dashboard setup became approximately 2–3x faster due to real-time visual validation replacing manual publish cycles.',
            },
            {
              title: 'Reduced Errors',
              description:
                'Reduced layout errors and broken dashboard deployments to near-zero by enforcing a constraint-based visual grid.',
            },
            {
              title: 'Reduced Engineering Dependency',
              description:
                'Internal testing showed users could successfully create and modify dashboards without requiring engineering support.',
            },
            {
              title: 'Improved Usability',
              description:
                'Internal users reported significantly less confusion compared to the previous JSON-based workflow.',
            },
          ],
        },
        {
          icon: 'route',
          title: 'Next Steps & Evolution',
          items: [
            {
              title: 'Enhanced Interactions',
              description:
                'Planned introduction of drag-and-drop placement and improved layout flexibility.',
            },
            {
              title: 'Workflow Safeguards',
              description:
                'Auto-save, Undo/Redo, and versioning to improve confidence and prevent data loss.',
            },
            {
              title: 'Responsive & Scalable System',
              description:
                'Extending the builder to support responsive layouts and more complex use cases.',
            },
          ],
        },
      ],
    },
  ],
};

export default caseStudy02;