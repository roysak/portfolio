import type { CaseStudyPageData } from './caseStudyTypes';

const caseStudy02: CaseStudyPageData = {
  id: '02',

  hero: {
    type: 'hero',
    badge: 'Dashboard Builder Interface',
    badgeIcon: 'space_dashboard',
    title: 'Building within constraints.',
    description:
      'Designing an intuitive, modular dashboard builder on top of a rigid, pre-established backend, prioritizing speed to market while maximizing canvas real estate.',
    meta: {
      role: 'Product UX Designer',
      platform: 'Web Application',
      tools: 'Figma, AI Tools',
      focus: 'UI Architecture, Layouts',
    },
  },

  navItems: [
    { anchor: 'hero', label: 'Summary' },
    { anchor: 'heuristics', label: 'Constraints' },
    { anchor: 'architecture', label: 'Architecture' },
    { anchor: 'flow', label: 'Flow' },
    { anchor: 'concepts', label: 'Concepts' },
    { anchor: 'problem', label: 'Evolution' },
    { anchor: 'compare', label: 'Compare' },
    { anchor: 'final', label: 'Final Design' },
    { anchor: 'deep-dive', label: 'Deep Dive' },
  ],

  sections: [
    {
      type: 'cardGrid',
      anchor: 'heuristics',
      background: 'gray',
      iconColorClass: 'bg-amber-50 text-amber-500',
      title: 'The Challenge & Constraints',
      subtitle:
        'Bridging a rigid backend architecture with a user-friendly frontend under strict time constraints, requiring pragmatic UX solutions.',
      cards: [
        {
          icon: 'aspect_ratio',
          category: 'Technical Limitation',
          title: 'No Responsive Reflow',
          description:
            'The existing backend lacked capabilities to support a fluid, responsive dashboard. The design needed to set clear user expectations around fixed layouts.',
        },
        {
          icon: 'ads_click',
          category: 'Timeline Constraint',
          title: 'Minimal Front-end Effort',
          description:
            'Strict MVP timelines meant advanced interactions like drag-and-drop widget sidebars were off the table. We needed a simpler, click-based assembly method.',
        },
        {
          icon: 'call_split',
          category: 'Workflow Complexity',
          title: 'Dual Widget Creation',
          description:
            'Users required the ability to build custom widgets from scratch or pull from a global library, all without losing their place on the active canvas.',
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
      type: 'carousel',
      anchor: 'concepts',
      title: 'Concept Explorations',
      subtitle:
        'Iterating through various layout configurations to balance functional density with available canvas real estate before committing to the final architecture.',
      slides: [
        {
          image: '/img/02/dashboard-concept01.png',
          label: 'Concept 01: Persistent Sidebars',
          sublabel: 'Maximum visibility, minimum canvas space.',
        },
        {
          image: '/img/02/dashboard-concept02.png',
          label: 'Concept 02: Top Navigation Shift',
          sublabel: 'Attempting to reclaim horizontal space via top-bars.',
        },
      ],
    },

    {
      type: 'split',
      anchor: 'problem',
      title: 'Early Concepts: The "IDE" Style',
      description:
        'Initial explorations relied heavily on persistent left and right sidebars, attempting to mimic traditional drag-and-drop editor interfaces.',
      bullets: [
        {
          variant: 'warning',
          text: 'Three-column layouts severely shrunk the active workspace.',
        },
        {
          variant: 'warning',
          text: 'Persistent properties panels caused high cognitive load.',
        },
        {
          variant: 'warning',
          text: 'Complex drag-and-drop engineering exceeded our MVP constraints.',
        },
      ],
      image: '/img/02/dashboard-concept02.png',
      imageAlt: 'Early Concept — Cluttered Workspace',
      imageCaption: 'Concept 02: Cluttered Workspace',
      imagePosition: 'right',
    },

    {
      type: 'split',
      anchor: 'solution',
      title: 'Streamlined, Content-First',
      description:
        'The final design strips away visual clutter, turning technical limitations into deliberate, intuitive user experiences.',
      bullets: [
        {
          variant: 'check',
          text: 'Fixed-Grid Canvas: A strict, visible grid guarantees predictable, pixel-perfect widget snapping.',
        },
        {
          variant: 'check',
          text: 'Contextual Controls: Hover menus (Edit, Duplicate) replace the right sidebar, saving space.',
        },
        {
          variant: 'check',
          text: 'Click-to-Add Strategy: Replaced drag-and-drop with a seamless modal to slash development time.',
        },
      ],
      image: '/img/02/final-design.png',
      imageAlt: 'Final Design — Clean Workspace',
      imageCaption: 'Final Design: Clean Workspace',
      imagePosition: 'left',
    },

    {
      type: 'compareSlider',
      anchor: 'compare',
      title: 'The Evolution',
      subtitle:
        'Slide to compare the cluttered IDE-style concept with the clean, constraint-driven final workspace.',
      before: { src: '/img/02/before.png', label: 'Concept' },
      after: { src: '/img/02/after.png', label: 'Final' },
      heightPreset: 'medium',
    },

    {
      type: 'showcase',
      anchor: 'final',
      title: 'The Final Design',
      subtitle:
        'The culmination of constraint-driven decisions resulting in a clean, focused, and highly functional dashboard builder interface.',
      image: '/img/02/final-design.png',
      alt: 'Final Dashboard Design',
    },

    {
      type: 'deepDive',
      anchor: 'deep-dive',
      title: 'Strategic Interface Decisions',
      subtitle:
        'Deep dive into specific UI mechanics designed to bypass technical constraints while preserving user flow.',
      tabs: [
        {
          id: 'ecosystem',
          title: 'Contextual Controls',
          description:
            'Clean hover-state actions directly on widgets replace heavy property sidebars.',
          caption: 'Contextual Widget Hover State',
          image: '/img/02/feature-01.png',
        },
        {
          id: 'modal',
          title: 'Hybrid Widget Modal',
          description:
            'A branched workflow allows users to select global widgets or build custom ones without losing context.',
          caption: 'Simplified Global Setup Frame',
          image: '/img/02/feature-02.png',
        },
        {
          id: 'depth',
          title: 'Drilldown Depth',
          description:
            'Bypassing responsive horizontal scaling by linking dashboards vertically.',
          caption: 'Drilldown Toggle Configuration',
          image: '/img/02/feature-03.png',
        },
      ],
    },

    {
      type: 'outcomes',
      columns: [
        {
          icon: 'my_location',
          title: 'Outcomes & Impact',
          items: [
            {
              title: 'Strategic MVP Deployment',
              description:
                'Pivoting from drag-and-drop to a click-to-add modal bypassed months of engineering effort, allowing us to hit strict launch deadlines.',
            },
            {
              title: 'Constraints Bred Clarity',
              description:
                'The inability to make the layout responsive forced a strict fixed-grid design. This actually improved user trust, as their exact layouts were preserved without unpredictable reflowing.',
            },
          ],
        },
        {
          icon: 'arrow_forward',
          title: 'Future Roadmap',
          items: [
            {
              title: 'Interactive Refinements',
              description:
                'As the backend matures, we plan to reintroduce smooth drag-and-drop mechanics to further accelerate the dashboard assembly process.',
            },
            {
              title: 'Advanced Drilldown Visualizations',
              description:
                'Expanding the "drilldown" feature into a more visual node-tree map so users can track complex data journeys across multiple dashboards.',
            },
          ],
        },
      ],
    },
  ],
};

export default caseStudy02;
