import type { CaseStudyPageData } from './caseStudyTypes';

const caseStudy03: CaseStudyPageData = {
  id: '03',

  hero: {
    type: 'hero',
    badge: 'Insurance Claims Validation Platform',
    badgeIcon: 'fact_check',
    title: 'BenVal: Validating Claims Against a Living Source of Truth',
    description:
      'Designed and built an end-to-end platform that validates insurance claim line items against a benefit "Source of Truth" rule set, pairing a deterministic rule engine with LLM-based matching and adjudication to cut manual review time while keeping a human in the loop.',
    meta: {
      role: 'Full-Stack Engineer (Backend architecture, LLM pipeline, frontend delivery)',
      platform: 'FastAPI + React/Vite Web Application',
      tools: 'Elasticsearch, Azure OpenAI, Internal SG Agent Gateway',
      focus: 'Deterministic + LLM Hybrid Validation, Human-in-the-Loop Review',
    },
  },
  navItems: [
    { anchor: 'ecosystem', label: 'Ecosystem' },
    { anchor: 'architecture', label: 'Architecture' },
    { anchor: 'challenge', label: 'Challenge' },
    { anchor: 'solution', label: 'Solution' },
    { anchor: 'flow', label: 'Validation Flow' },
    { anchor: 'features', label: 'Features' },
    { anchor: 'final', label: 'Outcomes' },
  ],

  sections: [
    {
      type: 'cardGrid',
      anchor: 'ecosystem',
      background: 'raised',
      accent: 'plum',
      title: 'The Application Ecosystem',
      subtitle:
        'BenVal is organized around three connected pillars that take a benefit rule set from raw source documents through to an auditable, reviewable claim decision.',
      cards: [
        {
          icon: 'rule',
          category: 'Pillar 1',
          title: 'Source of Truth (SOT) Generation',
          description:
            'Benefit-header data is uploaded and converted into structured SOT rules, then embedded into Elasticsearch for retrieval.',
        },
        {
          icon: 'smart_toy',
          category: 'Pillar 2',
          title: 'Validation Pipeline',
          description:
            'Claim line items are matched against the nearest SOT rules via vector search, then adjudicated by a deterministic rule engine and/or LLM.',
        },
        {
          icon: 'fact_check',
          category: 'Pillar 3',
          title: 'Human-in-the-Loop Review',
          description:
            'Reviewers audit, override, and track claim decisions, with every LLM call logged for cost, latency, and accuracy telemetry.',
        },
      ],
    },

    {
      type: 'infoTree',
      anchor: 'architecture',
      title: 'System Architecture',
      subtitle:
        'A FastAPI backend organized into self-contained feature packages, backed by Elasticsearch for both structured and vector data, with a React SPA frontend.',
      root: {
        icon: 'account_tree',
        title: 'BenVal Backend',
        subtitle: 'FastAPI app (app.py)',
      },
      branches: [
        {
          icon: 'rule_folder',
          title: 'Rule Generation',
          items: [
            {
              title: 'Upload Benefit-Header Data',
              subitems: [{ text: 'Parses source documents into candidate rules' }],
            },
            {
              title: 'Embed & Index SOT Rules',
              highlighted: true,
              subitems: [
                { text: 'Generates embeddings', badge: { text: 'Shared with Validator', variant: 'required' } },
                { text: 'Writes to sot_rule_collection index' },
              ],
            },
          ],
        },
        {
          icon: 'search',
          title: 'Claim Validation',
          items: [
            { title: 'Embed Claim Query' },
            {
              title: 'Retrieve Nearest SOT Rules',
              subitems: [{ text: 'Elasticsearch vector search' }],
            },
            {
              title: 'Adjudicate',
              subitems: [
                { text: 'Deterministic rule engine', badge: { text: 'Rule-based', variant: 'required' } },
                { text: 'LLM adjudication (GPT nano/mini/main, SG agent)', badge: { text: 'Model tiers', variant: 'optional' } },
              ],
            },
          ],
        },
        {
          icon: 'fact_check',
          title: 'Review & Telemetry',
          items: [
            { title: 'Claim HITL Workflow' },
            {
              title: 'Evaluator & Dashboard',
              subitems: [
                { text: 'Evaluation run history' },
                { text: 'LLM call telemetry & cost tracking' },
              ],
            },
          ],
        },
      ],
    },

    {
      type: 'split',
      anchor: 'challenge',
      title: 'Manual Review Doesn\u2019t Scale',
      description:
        'Benefit rules live across dense, frequently updated header documents, and claim line items must be checked against them one by one. Reviewers were manually cross-referencing claims against static rule sheets, with no consistent, auditable trail of how a decision was reached.',
      bullets: [
        { variant: 'warning', text: 'Benefit rules were scattered across documents with no queryable structure.' },
        { variant: 'warning', text: 'Manual claim-to-rule matching was slow and inconsistent between reviewers.' },
        { variant: 'warning', text: 'Pure rule-based logic couldn\u2019t handle ambiguous or loosely worded benefit language.' },
        { variant: 'warning', text: 'No telemetry existed to track LLM cost, latency, or decision accuracy over time.' },
      ],
      image: '/img/03/manual-review.png',
      imageAlt: 'Manual claim review workflow',
      imageCaption: 'Legacy workflow: manual cross-referencing against static rule sheets',
      imagePosition: 'right',
    },

    {
      type: 'callout',
      icon: 'hub',
      title: 'Deterministic Rules, LLM Judgment',
      description:
        'Rather than choosing between rigid rule automation or fully LLM-driven decisions, BenVal combines both: the deterministic rule engine handles claims with a clearly selected rule, while LLM adjudication (across nano/mini/main tiers and an internal SG agent) resolves ambiguous matches and nuanced benefit language, with every decision routed through a human review queue.',
    },

    {
      type: 'split',
      anchor: 'solution',
      title: 'A Hybrid Validation Engine',
      description:
        'BenVal retrieves the most relevant SOT rules for a claim via vector search over Elasticsearch, then routes adjudication through whichever mechanism fits the claim: an exact rule engine pass, or an LLM call sized to the complexity of the case.',
      bullets: [
        { variant: 'check', text: 'Vector search over embedded SOT rules for fast, relevant rule retrieval.' },
        { variant: 'check', text: 'Deterministic rule engine for claims with an already-selected, well-defined rule.' },
        { variant: 'check', text: 'Tiered LLM adjudication (nano/mini/main + SG agent) for ambiguous or complex claims.' },
        { variant: 'check', text: 'Concurrency-capped batch validation for high-volume claim files.' },
      ],
      image: '/img/03/validator.png',
      imageAlt: 'Claim validator interface',
      imageCaption: 'The Validator page: rule matches and adjudication results side by side',
      imagePosition: 'left',
    },

    {
      type: 'timeline',
      anchor: 'flow',
      icon: 'commit',
      title: 'Core Flow: Claim Validation',
      subtitle:
        'From an uploaded claim file to a reviewed, auditable decision, each claim line item moves through a consistent, traceable pipeline.',
      steps: [
        {
          title: 'Claim Ingestion',
          description:
            'Excel claim files are uploaded and parsed into structured claim line items in the excel_claim_data index.',
          variant: 'default',
        },
        {
          title: 'Rule Retrieval',
          description:
            'Each claim query is embedded and matched against the nearest SOT rules stored in Elasticsearch.',
          variant: 'default',
        },
        {
          title: 'Adjudication',
          description: 'The matched rule is evaluated deterministically, or escalated to an LLM tier for judgment.',
          label: 'Decision Stage',
          variant: 'highlighted',
          items: [
            'Rule Engine: exact evaluation against a selected SOT rule.',
            'LLM Adjudication: GPT nano/mini/main or SG agent, chosen by claim complexity.',
          ],
          note: {
            icon: 'call_split',
            text: 'Batch Branch: Bulk claim files run through a semaphore-capped batch endpoint instead of single-claim validation.',
          },
        },
        {
          title: 'Human-in-the-Loop Review',
          description:
            'Reviewers audit flagged or low-confidence decisions, override where needed, and record status history.',
          variant: 'default',
        },
        {
          title: 'Telemetry & Evaluation',
          description:
            'Every LLM call is logged with token usage and cost; evaluation runs track adjudication accuracy over time.',
          variant: 'default',
        },
        {
          title: 'Export',
          description: 'Validated results and SOT rule sets can be downloaded for downstream reporting.',
          variant: 'success',
        },
      ],
    },

    {
      type: 'deepDive',
      anchor: 'features',
      title: 'Supporting Features',
      subtitle:
        'Beyond the core validation loop, BenVal includes the tooling reviewers and administrators need to trust and manage the system.',
      tabs: [
        {
          id: 'claim-hitl',
          title: 'Claim HITL Review',
          description:
            'A dedicated review queue lets any authenticated user audit claim decisions, add overrides, and track status changes over time, independent of the admin-only write restrictions applied elsewhere in the app.',
          caption: 'Claim HITL review workflow',
          image: '/img/03/claim-hitl.png',
        },
        {
          id: 'telemetry',
          title: 'LLM Telemetry & Cost Dashboard',
          description:
            'Every LLM call across the nano, mini, main, and SG agent tiers is captured with token usage and computed cost, surfaced on a dashboard for monitoring spend and latency trends.',
          caption: 'Telemetry dashboard and logs',
          image: '/img/03/telemetry-dashboard.png',
        },
        {
          id: 'rule-management',
          title: 'SOT Rule Management',
          description:
            'Admins can generate, edit, and re-embed SOT rules from uploaded benefit-header data, keeping the rule set current as source documents change.',
          caption: 'Managing the Source of Truth rule set',
          image: '/img/03/manage-sot.png',
        },
        {
          id: 'evaluator',
          title: 'Evaluation Runs',
          description:
            'Evaluation runs replay claim sets against the pipeline and store results for comparison, making it possible to measure the impact of rule or prompt changes before rollout.',
          caption: 'Evaluator run history',
          image: '/img/03/evaluator.png',
        },
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
              title: 'Hybrid Adjudication Model',
              description:
                'Combined deterministic rule evaluation with tiered LLM adjudication, avoiding both over-automation and unnecessary LLM cost on straightforward claims.',
            },
            {
              title: 'Auditable Decisions',
              description:
                'Every claim decision is traceable back to the matched SOT rule and, when applicable, the LLM call that produced it.',
            },
            {
              title: 'Cost & Performance Visibility',
              description:
                'Built-in telemetry made LLM spend and latency visible for the first time, enabling tier selection based on real cost data.',
            },
            {
              title: 'Faster Claim Throughput',
              description:
                'Batch validation with concurrency limits allowed high-volume claim files to be processed without manual line-by-line review.',
            },
          ],
        },
        {
          icon: 'route',
          title: 'Next Steps & Evolution',
          items: [
            {
              title: 'Expanded Evaluation Coverage',
              description:
                'Grow the evaluation run library to catch regressions across a broader range of benefit rule types.',
            },
            {
              title: 'Finer-Grained Access Control',
              description:
                'Extend role-based access beyond the current admin/authenticated split for more nuanced review permissions.',
            },
            {
              title: 'Automated Rule Drift Detection',
              description:
                'Flag when source benefit-header documents change in ways that may invalidate existing embedded SOT rules.',
            },
          ],
        },
      ],
    },
  ],
};

export default caseStudy03;