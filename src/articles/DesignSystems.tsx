import { useState, useEffect } from "react";

interface TopicVariation {
  title: string;
  code: string;
}

interface TopicData {
  name: string;
  category: string;
  description: string;
  syntax: string;
  notes: string;
  returns: string;
  variations: TopicVariation[];
}

const topicsData: TopicData[] = [
  // ── Foundation ────────────────────────────────────────────────────────────
  {
    name: "Color System", category: "Foundation",
    description: "A color system defines the palette, semantic color roles, and usage rules that ensure visual consistency, brand alignment, and accessible contrast ratios across all surfaces, states, and themes.",
    syntax: "Global palette → Semantic tokens → Component-level tokens → Theme overrides.",
    notes: "Never hard-code hex values into components. All color decisions should flow through tokens. A well-structured system separates what a color IS (blue-500) from what it MEANS (color-action-primary). This separation enables theming, dark mode, and rebranding without touching component code.",
    returns: "A consistent, accessible, and themeable visual language that can evolve independently from component implementations.",
    variations: [
      { title: "Palette structure", code: "Global palette (raw values):\n  neutral-0:    #ffffff\n  neutral-50:   #f9fafb\n  neutral-100:  #f3f4f6\n  neutral-900:  #111827\n\n  blue-50:      #eff6ff\n  blue-500:     #3b82f6\n  blue-700:     #1d4ed8\n\n  red-500:      #ef4444\n  green-500:    #22c55e\n  amber-500:    #f59e0b\n\nNaming convention:\n  [hue]-[step]  — step runs 50, 100, 200 … 900, 950\n  Always generate the full ramp; use only what you need" },
      { title: "Semantic token mapping", code: "Semantic layer (what it means, not what it is):\n\n  color-background-default:    neutral-0\n  color-background-subtle:     neutral-50\n  color-background-emphasis:   neutral-900\n\n  color-text-primary:          neutral-900\n  color-text-secondary:        neutral-600\n  color-text-disabled:         neutral-400\n  color-text-inverse:          neutral-0\n\n  color-action-primary:        blue-500\n  color-action-primary-hover:  blue-700\n  color-action-danger:         red-500\n\n  color-border-default:        neutral-200\n  color-border-focus:          blue-500\n\n  color-feedback-success:      green-500\n  color-feedback-warning:      amber-500\n  color-feedback-error:        red-500" },
      { title: "Dark mode & accessibility", code: "Dark mode = token value swap, not new components:\n  light:  color-background-default → #ffffff\n  dark:   color-background-default → #0f172a\n\n  light:  color-text-primary → #111827\n  dark:   color-text-primary → #f1f5f9\n\nAccessibility requirements (WCAG 2.1):\n  AA normal text:   contrast ratio ≥ 4.5 : 1\n  AA large text:    contrast ratio ≥ 3.0 : 1\n  AAA normal text:  contrast ratio ≥ 7.0 : 1\n  UI components:    contrast ratio ≥ 3.0 : 1\n\nTools: Stark, Colour Contrast Analyser, axe DevTools\n\nDo not rely on color alone:\n  ✓ Pair color with shape, icon, or label\n  ✓ Error states need more than a red border\n  ✓ 8% of men have color vision deficiency" },
    ],
  },
  {
    name: "Typography Scale", category: "Foundation",
    description: "A typography scale defines a harmonious set of font sizes, weights, line heights, and letter spacings that establish visual hierarchy, ensure readability, and communicate brand personality across all contexts.",
    syntax: "Type ramp (size + weight + line-height) → Semantic roles → Responsive adjustments.",
    notes: "Choose a base size (typically 16px) and a scale ratio (1.25 Minor Third, 1.333 Perfect Fourth, or 1.5 Major Third). Generate sizes above and below the base. Assign semantic roles so teams use 'heading-xl' not 'font-size: 48px'. Type decisions belong in tokens, not component stylesheets.",
    returns: "A consistent, readable, and hierarchically clear typographic system that works across all screen sizes and contexts.",
    variations: [
      { title: "Type scale definition", code: "Scale using Perfect Fourth ratio (×1.333):\n\n  display-2xl:  72px / 4.5rem   — hero headlines\n  display-xl:   60px / 3.75rem  — page titles\n  display-lg:   48px / 3rem     — section headers\n  heading-xl:   36px / 2.25rem  — h1\n  heading-lg:   30px / 1.875rem — h2\n  heading-md:   24px / 1.5rem   — h3\n  heading-sm:   20px / 1.25rem  — h4\n  body-lg:      18px / 1.125rem — lead text\n  body-md:      16px / 1rem     — base body (default)\n  body-sm:      14px / 0.875rem — secondary text\n  label-md:     14px / 0.875rem — form labels\n  label-sm:     12px / 0.75rem  — captions, tags\n\nFont weight roles:\n  400: Regular — body text\n  500: Medium  — labels, UI text\n  600: Semibold — headings, emphasis\n  700: Bold    — display, strong emphasis" },
      { title: "Line height & letter spacing", code: "Line height (leading) guidelines:\n  Display text:   1.1 – 1.2   — tight, impactful\n  Headings:       1.2 – 1.3   — comfortable for short text\n  Body text:      1.5 – 1.7   — optimal for reading\n  Small/caption:  1.4 – 1.5   — still readable at small sizes\n\nLetter spacing (tracking):\n  Display large:  -0.02em     — tighten for impact\n  Heading:        -0.01em     — slight tightening\n  Body:            0em        — natural tracking\n  All caps label: +0.08em     — loosen for legibility\n  Caption:        +0.02em     — slight opening\n\nCommon mistake:\n  Using the same line-height for display and body\n  Display at 1.6 looks like a shopping list\n  Body at 1.1 is unreadable for paragraphs" },
      { title: "Font pairing & loading", code: "Font pairing principles:\n  1. Use max 2 typefaces in a system\n  2. Pair a display face with a readable body face\n  3. Or use one versatile variable font for everything\n\nCommon pairings:\n  Inter (system-grade) + nothing — clean, legible, free\n  Geist Sans + Geist Mono — modern, paired sans/mono\n  Playfair Display + Source Sans — editorial feel\n\nFont loading strategy:\n  1. Self-host or use CDN (not Google Fonts in EU prod)\n  2. Use font-display: swap to prevent invisible text\n  3. Preload critical font weights (400, 600)\n  4. Subset fonts to needed character ranges\n  5. Use variable fonts where possible — one file,\n     all weights and widths\n\nSystem font stack fallback:\n  -apple-system, BlinkMacSystemFont, 'Segoe UI',\n  Roboto, Helvetica, Arial, sans-serif" },
    ],
  },
  {
    name: "Spacing System", category: "Foundation",
    description: "A spacing system is a constrained set of spacing values that governs margins, padding, gaps, and layout rhythm across all components and pages. It ensures visual consistency without ad-hoc values.",
    syntax: "Base unit (4px or 8px) → Scale multipliers → Named tokens → Component application.",
    notes: "The 8-point grid is the industry standard because 8 divides evenly into most common screen sizes and aligns with platform density-independent units (iOS pt, Android dp). A consistent spacing scale eliminates the decision fatigue of 'should this be 12px or 14px?' — neither: it should be 12px or 16px.",
    returns: "Visual rhythm, consistent density, and alignment across all UI elements without arbitrary spacing decisions.",
    variations: [
      { title: "8-point spacing scale", code: "Base unit: 4px (half-step for tight spacing)\n\n  space-0:    0px\n  space-0.5:  2px   — hairline gap\n  space-1:    4px   — icon-to-label, tight inline\n  space-2:    8px   — compact padding, badge gap\n  space-3:    12px  — small component padding\n  space-4:    16px  — default component padding\n  space-5:    20px  — medium spacing\n  space-6:    24px  — card padding, section gap\n  space-8:    32px  — large component spacing\n  space-10:   40px  — section separation\n  space-12:   48px  — major section breaks\n  space-16:   64px  — page section padding\n  space-20:   80px  — hero section spacing\n  space-24:   96px  — large layout sections\n\nRule: Only use values from the scale. Never 13px." },
      { title: "Semantic spacing tokens", code: "Map scale values to semantic meanings:\n\n  Component internal spacing:\n    spacing-component-xs:   space-1  (4px)\n    spacing-component-sm:   space-2  (8px)\n    spacing-component-md:   space-4  (16px)\n    spacing-component-lg:   space-6  (24px)\n\n  Component external spacing:\n    spacing-stack-xs:       space-2  (8px)\n    spacing-stack-sm:       space-4  (16px)\n    spacing-stack-md:       space-6  (24px)\n    spacing-stack-lg:       space-8  (32px)\n    spacing-stack-xl:       space-12 (48px)\n\n  Layout spacing:\n    spacing-layout-sm:      space-8  (32px)\n    spacing-layout-md:      space-12 (48px)\n    spacing-layout-lg:      space-16 (64px)\n    spacing-layout-xl:      space-20 (80px)\n\n  Use semantic names in components, never raw values." },
      { title: "Density variants", code: "Many systems need compact and comfortable modes:\n\n  Comfortable (default):\n    Button padding:     12px 24px\n    Input padding:      12px 16px\n    List item height:   48px\n    Card padding:       24px\n\n  Compact (data-dense UIs, dashboards):\n    Button padding:     8px 16px\n    Input padding:      8px 12px\n    List item height:   36px\n    Card padding:       16px\n\n  Spacious (marketing, reading-focused):\n    Button padding:     16px 32px\n    Input padding:      16px 20px\n    List item height:   56px\n    Card padding:       32px\n\nImplementation: density as a CSS custom property or\nThemeProvider context — swap tokens, not components.\n\nEnterprise tools: default compact\nConsumer apps:    default comfortable\nMarketing sites:  default spacious" },
    ],
  },
  {
    name: "Layout & Grid", category: "Foundation",
    description: "The layout system defines the structural rules — columns, gutters, margins, max-widths, and breakpoints — that determine how content is arranged and reflows across all viewport sizes.",
    syntax: "Breakpoints → Column grid → Gutters + margins → Container max-widths.",
    notes: "Grids are constraints that enable creativity, not cages. A 12-column grid is preferred because it divides evenly into halves, thirds, quarters, and sixths. The grid lives in layout components — page templates and section wrappers — not inside individual UI components like buttons or cards.",
    returns: "A predictable, responsive layout that maintains readability and visual hierarchy across all device sizes.",
    variations: [
      { title: "Breakpoint system", code: "Standard breakpoint set:\n\n  xs:   0px     — mobile portrait (base, mobile-first)\n  sm:   640px   — mobile landscape / large mobile\n  md:   768px   — tablet portrait\n  lg:   1024px  — tablet landscape / small laptop\n  xl:   1280px  — desktop\n  2xl:  1536px  — wide desktop\n\nBreakpoint strategy:\n  Mobile-first: write base styles for xs,\n  then override at larger breakpoints with min-width.\n\n  Do not target specific devices — target content.\n  When your layout breaks, add a breakpoint there.\n\nCommon breakpoint pattern:\n  Stack (xs–sm) → 2 columns (md) → 3 cols (lg) → 4 cols (xl)" },
      { title: "Column grid & gutters", code: "Standard 12-column grid:\n\n  Breakpoint  Columns  Gutter  Margin  Max-width\n  ─────────────────────────────────────────────────\n  xs (≥0)       4       16px    16px    100%\n  sm (≥640)     4       16px    24px    100%\n  md (≥768)     8       24px    32px    100%\n  lg (≥1024)   12       24px    40px    100%\n  xl (≥1280)   12       32px    auto    1280px\n  2xl (≥1536)  12       32px    auto    1536px\n\nColumn spans (12-column base):\n  Full width:    12 cols — page-level headings\n  Two thirds:     8 cols — main content + sidebar\n  Half:           6 cols — split layouts\n  Third:          4 cols — card grids\n  Quarter:        3 cols — dense card grids\n\nGutter: the gap between columns (not the outer margin).\nMargin: the outer padding from the viewport edge." },
      { title: "Container & layout components", code: "Container component (reusable):\n  — Centers content\n  — Applies max-width\n  — Applies horizontal padding (margin)\n\n  <Container>   max-w-7xl, px-4 sm:px-6 lg:px-8\n  <ContainerNarrow>  max-w-3xl — articles, forms\n  <ContainerWide>    max-w-screen-2xl — dashboards\n\nLayout component types:\n  PageLayout    — full page wrapper, handles nav + footer\n  SectionLayout — vertical rhythm between page sections\n  GridLayout    — n-column responsive grid\n  SidebarLayout — main content + fixed-width sidebar\n  SplitLayout   — 50/50 or 60/40 horizontal split\n\nResponsive grid helpers:\n  grid-cols-1 → sm:grid-cols-2 → lg:grid-cols-3\n  Always define how the grid collapses on small screens\n  Never assume desktop layout is the default" },
    ],
  },

  // ── Visual Language ───────────────────────────────────────────────────────
  {
    name: "Iconography", category: "Visual Language",
    description: "An icon system defines the style, sizing, stroke weight, and usage guidelines that ensure icons communicate clearly, consistently, and accessibly across all touchpoints in the product.",
    syntax: "Icon style guide → Size tokens → Color tokens → Accessibility requirements.",
    notes: "Icons are never purely decorative in a UI — they carry meaning. Every icon must have an accessible text alternative unless it is accompanied by a visible label. Mixing icon styles (outlined, filled, rounded) within a product creates visual noise and signals poor quality. Choose one family and apply it consistently.",
    returns: "Clear, consistent iconography that communicates meaning at a glance and is accessible to all users including those using assistive technology.",
    variations: [
      { title: "Icon style & sizing system", code: "Style choices (pick one and stick to it):\n  Outlined:   clean, modern, works on all backgrounds\n  Filled:     bolder, better for active/selected states\n  Rounded:    friendly, consumer-facing products\n  Sharp:      professional, enterprise tools\n\nSizing scale:\n  icon-xs:    12px — inline with caption text\n  icon-sm:    16px — inline with body text, badges\n  icon-md:    20px — default UI icon size\n  icon-lg:    24px — navigation, prominent actions\n  icon-xl:    32px — empty states, feature icons\n  icon-2xl:   48px — illustration-level feature icons\n\nDesign rule:\n  Icons should always align to the text baseline\n  or be optically centred in their container.\n  Never use arbitrary sizes outside the scale." },
      { title: "Color & usage rules", code: "Icon color follows text color tokens:\n  icon-primary:     same as color-text-primary\n  icon-secondary:   same as color-text-secondary\n  icon-disabled:    same as color-text-disabled\n  icon-inverse:     same as color-text-inverse\n  icon-action:      same as color-action-primary\n  icon-danger:      same as color-action-danger\n  icon-success:     same as color-feedback-success\n\nUsage rules:\n  ✓ Leading icon:  icon before label (→ left-aligned)\n  ✓ Trailing icon: icon after label (→ right for 'external')\n  ✓ Icon button:   icon only, always with aria-label\n  ✓ Icon + label:  label always takes precedence\n  ✗ Never use icon alone for critical actions\n  ✗ Never resize icons outside the size scale\n  ✗ Never mix more than one icon style in one view" },
      { title: "Accessibility requirements", code: "Decorative icons (have visible label beside them):\n  <span aria-hidden='true'>icon</span>\n  — Screen reader ignores the icon\n\nInformative icons (stand alone, no visible label):\n  <button aria-label='Close dialog'>\n    <span aria-hidden='true'>icon</span>\n  </button>\n\nStatus icons (e.g. error icon next to a message):\n  <span role='img' aria-label='Error'>icon</span>\n  — Or include visually-hidden text:\n  <span aria-hidden='true'>icon</span>\n  <span class='sr-only'>Error: </span>\n  Your message here\n\nTouch target minimum:\n  44×44px (iOS HIG) / 48×48dp (Material)\n  The visual icon can be smaller — pad to target size\n\nContrast: icon against background ≥ 3:1 (WCAG AA)" },
    ],
  },
  {
    name: "Motion & Animation", category: "Visual Language",
    description: "A motion system defines the timing, easing curves, and principles that govern how UI elements enter, exit, and transition — ensuring animation enhances communication rather than becoming noise or hindrance.",
    syntax: "Motion principles → Duration scale → Easing curves → Trigger patterns.",
    notes: "Motion in UI has one job: to communicate. It should clarify state changes, guide attention, and reinforce spatial relationships. Motion that plays just to look impressive adds cognitive load and frustrates users who need to wait. Always respect prefers-reduced-motion — make it a first-class concern, not an afterthought.",
    returns: "Purposeful, performant animations that communicate state changes clearly and respect user motion preferences.",
    variations: [
      { title: "Duration scale & easing curves", code: "Duration scale:\n  duration-instant:    0ms   — no animation (state toggle)\n  duration-fastest:   75ms  — micro-feedback (checkbox tick)\n  duration-fast:     150ms  — tooltips, dropdowns opening\n  duration-base:     200ms  — default transitions (color, opacity)\n  duration-slow:     300ms  — panel slides, modal entrance\n  duration-slower:   400ms  — page transitions, large reveals\n  duration-slowest:  500ms+ — loading sequences, onboarding\n\nRule: Larger elements move slower; smaller elements move faster.\nA button state change: 150ms. A full-page transition: 300ms.\n\nEasing curves:\n  ease-in:         accelerate out → use for exits\n  ease-out:        decelerate in  → use for entrances\n  ease-in-out:     both ends soft → use for position changes\n  linear:          constant speed → use for spinners only\n  spring/bounce:   use sparingly, consumer apps only" },
      { title: "Motion principles", code: "1. Purpose over polish\n   Every animation must serve a function:\n   — Orientation: where did that element go?\n   — Feedback:    the action registered\n   — State:       something changed\n   — Hierarchy:   this is important\n\n2. Continuity\n   Elements that persist between states should\n   animate position/size, not fade out and in.\n   (Shared element transitions, layout animations)\n\n3. Sequence\n   Animate related elements together or in a\n   deliberate stagger — not all at once and not\n   independently at random intervals.\n\n4. Restraint\n   Never animate more than 2–3 elements simultaneously.\n   Avoid animating during user input.\n   Animations over 400ms feel slow — use progress instead.\n\n5. Performance\n   Animate only: transform (translate, scale, rotate)\n   and opacity — these don't trigger layout reflow.\n   Never animate: width, height, top, left, margin, padding." },
      { title: "Reduced motion & accessibility", code: "The prefers-reduced-motion media query:\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n\nDo NOT just 'turn off' animations for reduced motion.\nInstead provide an alternative:\n\n  Full motion:    element fades + slides in\n  Reduced motion: element appears instantly (opacity only)\n  No motion:      element is simply shown\n\nPatterns to avoid entirely:\n  ✗ Auto-playing carousels (use pause controls)\n  ✗ Looping background animations\n  ✗ Parallax scrolling\n  ✗ Animations triggered by scroll position\n  ✗ Flashing or strobing effects (WCAG 2.3.1)\n\nTests: always test with 'Reduce Motion' OS setting enabled" },
    ],
  },
  {
    name: "Elevation & Shadow", category: "Visual Language",
    description: "An elevation system uses shadow and layering to communicate spatial hierarchy — which surfaces are in front, which are behind, and which elements are interactive, floating, or fixed relative to the page.",
    syntax: "Elevation level → Shadow definition → Usage context → Z-index management.",
    notes: "Shadow communicates depth, not decoration. Every shadow level should have a clear meaning: surface (in-page content), raised (interactive), overlay (temporary layer), modal (blocking layer). Using the wrong elevation level misleads users about the spatial model of the UI. Avoid using shadow for aesthetics alone.",
    returns: "A clear spatial hierarchy that helps users understand which elements are interactive, temporary, or prioritised — without relying on colour alone.",
    variations: [
      { title: "Shadow scale", code: "Elevation levels and their shadows:\n\n  elevation-0 (flush):\n    none — base surface, in-page content\n\n  elevation-1 (raised):\n    0 1px 2px rgba(0,0,0,0.06),\n    0 1px 3px rgba(0,0,0,0.10)\n    Use: cards, list items, table rows on hover\n\n  elevation-2 (floating):\n    0 4px 6px rgba(0,0,0,0.07),\n    0 2px 4px rgba(0,0,0,0.06)\n    Use: dropdowns, select menus, popovers\n\n  elevation-3 (overlay):\n    0 10px 15px rgba(0,0,0,0.10),\n    0 4px 6px rgba(0,0,0,0.05)\n    Use: tooltips, date pickers, command palettes\n\n  elevation-4 (modal):\n    0 20px 25px rgba(0,0,0,0.15),\n    0 10px 10px rgba(0,0,0,0.04)\n    Use: modal dialogs, drawers, sheet panels\n\n  elevation-5 (notification):\n    0 25px 50px rgba(0,0,0,0.25)\n    Use: toast notifications, system alerts" },
      { title: "Z-index management", code: "Establish a z-index naming system:\n\n  z-below:       -1   — backgrounds, decorative layers\n  z-base:         0   — page content (default)\n  z-raised:      10   — cards, sticky table headers\n  z-dropdown:   100   — dropdowns, context menus\n  z-sticky:     200   — sticky nav, sticky sidebars\n  z-overlay:    300   — modal backdrops\n  z-modal:      400   — dialog panels, drawers\n  z-tooltip:    500   — tooltips (must be above modals)\n  z-toast:      600   — toast notifications\n  z-maximum:   9999   — critical system alerts\n\nCommon mistake:\n  Using arbitrary z-index values (z-index: 99999)\n  — Creates an arms race of ever-higher values\n  — Makes layering impossible to reason about\n  — Results in elements unexpectedly above each other\n\nRule: always use the named scale, never raw integers." },
      { title: "Dark mode shadow considerations", code: "Shadow on dark backgrounds is nearly invisible.\nIn dark mode, elevation must use alternative cues:\n\nStrategy 1: Tinted surfaces\n  Increase surface lightness with elevation:\n  elevation-0: background-900 (#1e293b)\n  elevation-1: background-800 (#334155)\n  elevation-2: background-700 (#475569)\n  elevation-3: background-600 (#64748b)\n\nStrategy 2: Combined shadow + tint\n  Use a lighter tinted surface AND a shadow\n  The shadow confirms depth; the tint provides contrast\n\nStrategy 3: Border on elevation\n  Add a subtle lighter border to floating elements:\n  border: 1px solid rgba(255,255,255,0.08)\n  — Defines the edge of the elevated surface\n  — Works even when shadow is invisible\n\nMaterial Design 3 and Apple use the tinted surface\napproach for their dark mode elevation systems." },
    ],
  },
  {
    name: "Shape & Border Radius", category: "Visual Language",
    description: "The shape system defines the border radius values, component silhouettes, and shape roles that contribute to brand personality — from sharp and professional to soft and friendly — applied consistently across all components.",
    syntax: "Shape scale → Semantic shape tokens → Component-level shape roles.",
    notes: "Shape is one of the most expressive brand tools available. Rounded corners feel friendly and approachable (consumer apps). Sharp corners feel precise and professional (enterprise tools). The key is consistency — applying shape randomly across components makes a system feel undesigned. All major components should follow the same shape philosophy.",
    returns: "A consistent brand personality expressed through shape, with clear rules that prevent arbitrary corner radius decisions.",
    variations: [
      { title: "Border radius scale", code: "Shape scale:\n  radius-none:    0px    — no rounding, sharp\n  radius-sm:      2px    — subtle, nearly square\n  radius-md:      4px    — default small component\n  radius-lg:      8px    — default component radius\n  radius-xl:      12px   — cards, panels\n  radius-2xl:     16px   — large cards, modals\n  radius-3xl:     24px   — marketing cards, hero elements\n  radius-full:    9999px — pills, badges, avatars\n\nSemantic mapping:\n  shape-component-sm:   radius-md  (4px)  — inputs, buttons\n  shape-component-md:   radius-lg  (8px)  — cards, dropdowns\n  shape-component-lg:   radius-xl  (12px) — modals, panels\n  shape-badge:          radius-full        — tags, chips\n  shape-avatar:         radius-full        — user images" },
      { title: "Brand personality & shape", code: "Sharp (radius-none or radius-sm):\n  Personality: precise, professional, serious\n  Good for: enterprise tools, financial products,\n            developer tools, government services\n  Examples: Linear, Bloomberg, most SaaS dashboards\n\nBalanced (radius-md to radius-lg):\n  Personality: modern, neutral, versatile\n  Good for: B2B SaaS, productivity tools, marketplaces\n  Examples: Notion, Figma, Stripe, Shopify\n\nRounded (radius-xl to radius-2xl):\n  Personality: friendly, approachable, consumer\n  Good for: consumer apps, wellness, education, social\n  Examples: Airbnb, Duolingo, Spotify, Apple\n\nPill/Full-round:\n  Reserved for: buttons on marketing sites, badges,\n  tags, avatar chips — not for containers or cards\n\nRule: choose one shape personality and apply it\nconsistently. Mixed shapes signal inconsistency." },
      { title: "Shape in component application", code: "Consistent shape application:\n\n  Buttons:\n    Small:   same radius as shape-component-sm\n    Default: same radius as shape-component-sm\n    Large:   same radius as shape-component-sm\n    → Buttons keep consistent shape at all sizes\n\n  Inputs / Text fields:\n    Default radius: shape-component-sm\n    → Should match button radius for visual harmony\n\n  Cards:\n    Default radius: shape-component-md\n    → Slightly more rounded than interactive elements\n\n  Modals / Dialogs:\n    Default radius: shape-component-lg\n    → Most rounded to signal temporary/floating nature\n\n  Tags / Badges:\n    Always: shape-badge (radius-full)\n    → Pills are universally understood as labels\n\n  Tooltips:\n    Typically: radius-lg\n    → Match the modal level for floating surfaces" },
    ],
  },

  // ── Component Architecture ────────────────────────────────────────────────
  {
    name: "Design Tokens", category: "Component Architecture",
    description: "Design tokens are named variables that store the visual decisions of a design system — colors, typography, spacing, shadows, and more — in a format that can be shared across design tools, platforms, and codebases.",
    syntax: "Global tokens → Alias (semantic) tokens → Component tokens → Platform output.",
    notes: "Tokens are the contract between design and engineering. They are not implementation details — they are design decisions given names. A token like 'color-action-primary' communicates intent. A hex value like '#3b82f6' does not. Tokens enable theming, multi-brand systems, and dark mode without touching component code.",
    returns: "A single source of truth for all visual decisions that keeps design tools and code in sync across teams and platforms.",
    variations: [
      { title: "Token taxonomy (3-tier system)", code: "Tier 1 — Global tokens (raw values):\n  color-blue-500: #3b82f6\n  font-size-16: 16px\n  space-4: 16px\n  → Never used directly in components\n  → Only referenced by semantic tokens\n\nTier 2 — Alias / Semantic tokens:\n  color-action-primary: {color-blue-500}\n  font-size-body: {font-size-16}\n  spacing-component-md: {space-4}\n  → Used in component tokens\n  → Drive theming (swap values, not structure)\n\nTier 3 — Component tokens:\n  button-background-primary: {color-action-primary}\n  button-font-size: {font-size-body}\n  button-padding-horizontal: {spacing-component-md}\n  → Consumed directly by components\n  → Override at this level for brand variants" },
      { title: "Token naming conventions", code: "Format: [category]-[property]-[variant]-[state]\n\nExamples:\n  color-background-primary          → category + property\n  color-background-primary-subtle   → + variant\n  color-background-primary-hover    → + state\n  color-text-secondary-disabled     → property + variant + state\n\n  font-size-body-lg\n  font-weight-heading\n  font-line-height-body\n\n  spacing-inline-md\n  spacing-stack-lg\n  spacing-inset-md     — equal padding all sides\n  spacing-inset-squish — top/bottom smaller than left/right\n  spacing-inset-stretch — top/bottom larger than left/right\n\n  border-radius-component-sm\n  border-width-default\n  border-color-default\n\n  shadow-elevation-1\n  shadow-elevation-modal\n\nRule: tokens should read like sentences describing their role,\nnot like variables describing their value." },
      { title: "Tooling & platform output", code: "Token workflow:\n  Design (Figma Variables/Tokens Studio)\n    ↓ export JSON\n  Token transformation (Style Dictionary)\n    ↓ transforms to platform-specific output\n  Code (CSS variables / JS / Swift / Kotlin)\n\nCSS output:\n  :root {\n    --color-action-primary: #3b82f6;\n    --spacing-component-md: 16px;\n    --font-size-body: 16px;\n  }\n\nJS/TS output:\n  export const tokens = {\n    colorActionPrimary: '#3b82f6',\n    spacingComponentMd: '16px',\n  };\n\nTheme support:\n  [data-theme='dark'] {\n    --color-action-primary: #60a5fa;\n    --color-background-default: #0f172a;\n  }\n\nTools: Style Dictionary, Theo (Salesforce),\nFigma Variables, Token Studio, Specify" },
    ],
  },
  {
    name: "Atomic Design", category: "Component Architecture",
    description: "Atomic Design is a methodology for building UI component libraries in layers — from the smallest indivisible elements (atoms) to fully assembled page-level compositions (pages). Created by Brad Frost.",
    syntax: "Atoms → Molecules → Organisms → Templates → Pages.",
    notes: "Atomic Design is a mental model, not a rigid filing system. The value is in thinking about components at the right level of abstraction. The common mistake is over-atomising — splitting a simple component into five sub-atoms that are never reused. Components should be split when composition genuinely occurs, not because it theoretically could.",
    returns: "A component library that is composable, scalable, and consistent — where building new features means assembling existing parts, not creating new ones.",
    variations: [
      { title: "The five levels explained", code: "Atoms — smallest indivisible UI elements:\n  Button, Input, Label, Icon, Badge, Avatar,\n  Checkbox, Radio, Toggle, Tag, Spinner, Divider\n  → Cannot be broken down further\n  → Have no composition of other atoms\n\nMolecules — simple groups of atoms:\n  Search bar (Input + Button + Icon)\n  Form field (Label + Input + Error message)\n  Card header (Avatar + Heading + Subtext)\n  Navigation item (Icon + Label + Badge)\n  → Compose 2–4 atoms with a single purpose\n\nOrganisms — complex, standalone UI sections:\n  Navigation bar (Logo + Nav links + Search + Avatar)\n  Product card (Image + Title + Price + CTA)\n  Data table (Header + Rows + Pagination)\n  Signup form (Form fields + Submit + Terms)\n  → Compose molecules and atoms; can stand alone\n\nTemplates — page-level wireframe structures:\n  Article template, Dashboard layout, Settings page\n  → Define content areas; use placeholder content\n\nPages — template instances with real content:\n  The actual rendered application views" },
      { title: "Component composition in practice", code: "Example: Building a Comment component\n\nAtoms used:\n  Avatar        — user image\n  Text (body)   — comment content\n  Text (label)  — username, timestamp\n  Button        — reply, like\n  Icon          — like icon, reply icon\n  Badge         — reply count\n\nMolecule — CommentAuthor:\n  Avatar + Text (name) + Text (timestamp)\n\nMolecule — CommentActions:\n  Button (like) + Icon + Badge (count)\n  Button (reply) + Icon\n\nOrganism — Comment:\n  CommentAuthor + Text (body) + CommentActions\n\nOrganism — CommentThread:\n  Comment + nested Comment (replies)\n\nThis hierarchy means:\n  — Updating Avatar updates all Comment instances\n  — Updating CommentAuthor updates all Comments\n  — New design only needs to change the right level" },
      { title: "When to split vs. keep together", code: "Split a component when:\n  ✓ Two or more distinct components reuse the same part\n  ✓ The part has its own state or behaviour\n  ✓ The part is meaningful and named in design\n  ✓ The part will be swapped out by another team\n\nKeep together when:\n  ✗ The part is only used in one place\n  ✗ Splitting requires passing through many props\n  ✗ The split makes the API more complex\n  ✗ The part has no design-level name or identity\n\nPractical heuristic:\n  'Is this named in our design file as its own component?'\n  If yes → extract it.\n  If no → leave it.\n\nOver-atomisation warning signs:\n  — Components with names like 'TextWrapper'\n  — Components that only render one child\n  — 5+ prop levels required to customise anything\n  — Engineers create new components because the atoms\n    are too rigid to compose into what they need" },
    ],
  },
  {
    name: "Component States", category: "Component Architecture",
    description: "Every interactive component must define and design all of its possible states — from the base default through every interaction state, loading condition, and error case — before it can be considered complete.",
    syntax: "Default → Hover → Focus → Active → Disabled → Loading → Error → Empty → Success.",
    notes: "Most design systems are 70% complete because designers hand off only the default state. Edge cases — empty states, error states, loading states — are where real users spend disproportionate time. Every state must be designed, documented, and built. 'The happy path is not the only path' is the most important principle in component completeness.",
    returns: "Components that handle every real-world condition gracefully, reducing engineering guesswork and preventing inconsistent fallback implementations.",
    variations: [
      { title: "Full state inventory", code: "Interactive states (all interactive components):\n  default   — resting, no user interaction\n  hover     — cursor over element (mouse only)\n  focus     — keyboard or programmatic focus\n  focus-visible — keyboard focus only (not on click)\n  active    — being pressed/clicked\n  visited   — for links (already followed)\n  disabled  — non-interactive, cannot be activated\n\nContent states:\n  empty     — no data to display\n  loading   — data being fetched\n  error     — operation failed\n  success   — operation completed\n  partial   — some data, more loading\n  stale     — data present but may be outdated\n\nForm-specific states:\n  untouched — not yet interacted with\n  touched   — has been focused and blurred\n  valid     — passes validation\n  invalid   — fails validation (show error)\n  required  — must be filled before submission\n  read-only — visible but not editable" },
      { title: "Designing each state", code: "Button — all states defined:\n  default:  background=action-primary, text=white\n  hover:    background slightly darker (-10% lightness)\n  focus:    2px solid focus-ring, 2px offset (accessible)\n  active:   background darker still, slight scale down\n  disabled: opacity 40%, cursor not-allowed\n  loading:  spinner inside, text hidden, non-clickable\n\nInput field — all states defined:\n  default:  border=neutral-300, label above\n  hover:    border=neutral-400\n  focus:    border=action-primary, shadow ring\n  filled:   border=neutral-300, value text visible\n  error:    border=danger, error message below\n  success:  border=success, checkmark icon\n  disabled: bg=neutral-100, text=neutral-400\n  read-only: bg=neutral-50, no border on focus\n\nCard — content states:\n  loading:  skeleton placeholder (grey shimmer)\n  empty:    illustration + message + CTA\n  error:    icon + message + retry action\n  success:  normal populated state" },
      { title: "Empty states & error states", code: "Empty state anatomy:\n  1. Illustration or icon (optional but recommended)\n  2. Headline — what is missing ('No projects yet')\n  3. Body — why it's empty and what to do\n  4. Primary CTA — the action to resolve the emptiness\n\n  Do: design empty states before the data state\n  Do: make empty states useful, not just apologetic\n  Don't: show a blank page or a generic '0 results'\n\nError state design:\n  Network error:\n    Icon + 'Could not load data' + Retry button\n  Validation error:\n    Inline below field, red border, specific message\n    'Email is invalid' not 'Invalid input'\n  404 state:\n    Illustration + 'Page not found' + Back / Home CTA\n  Permission error:\n    Explain why they can't access + contact/upgrade CTA\n\nLoading state options:\n  Spinner:   use for short, indeterminate waits (<2s)\n  Skeleton:  use for content-shaped loads (cards, lists)\n  Progress:  use for determinate operations with %" },
    ],
  },
  {
    name: "Accessibility", category: "Component Architecture",
    description: "Accessibility (a11y) in a design system means building components that are perceivable, operable, understandable, and robust for all users — including those using screen readers, keyboard navigation, or assistive technologies.",
    syntax: "WCAG 2.1 AA compliance → Semantic HTML → ARIA patterns → Keyboard navigation → Focus management.",
    notes: "Accessibility is not a feature you add at the end — it must be baked into every component from the start. A design system is the highest-leverage place to implement accessibility: fix it once in the component, and every product using that component benefits. 'Accessible design is good design' — the constraints of accessibility almost always produce better, clearer interfaces.",
    returns: "Components that work for everyone, reduce legal risk, and often improve usability for all users — not just those with disabilities.",
    variations: [
      { title: "WCAG 2.1 AA requirements", code: "The four WCAG principles (POUR):\n  Perceivable:   content is available to all senses\n  Operable:      UI can be used without a mouse\n  Understandable: content and UI are clear\n  Robust:        works with assistive technologies\n\nKey AA requirements:\n  1.1.1 Non-text content: alt text for images\n  1.3.1 Info and relationships: semantic structure\n  1.4.1 Use of color: don't rely on color alone\n  1.4.3 Contrast: 4.5:1 normal, 3:1 large text\n  1.4.4 Resize text: 200% zoom without loss\n  2.1.1 Keyboard: all functionality via keyboard\n  2.4.3 Focus order: logical tab order\n  2.4.7 Focus visible: visible focus indicator\n  3.3.1 Error identification: describe errors in text\n  3.3.2 Labels: inputs have descriptive labels\n  4.1.2 Name/Role/Value: ARIA on custom controls" },
      { title: "Keyboard navigation patterns", code: "Tab stops: every interactive element must be reachable\n  via Tab key and activatable via Enter or Space.\n\nKey navigation patterns by component:\n\n  Dropdown/Select:\n    Enter/Space → open\n    Arrow keys  → navigate options\n    Enter       → select option\n    Escape      → close, return focus to trigger\n\n  Modal dialog:\n    Focus trapped inside modal when open\n    Escape → close dialog\n    Return focus to trigger element on close\n    First focusable element receives focus on open\n\n  Tabs:\n    Tab → moves into tab list\n    Arrow keys → switch between tabs\n    Tab → moves to tab panel content\n\n  Accordion:\n    Enter/Space → expand/collapse panel\n    Arrow keys (optional) → navigate between items\n\n  Data table:\n    Arrow keys → cell navigation\n    Enter → activate cell link or button\n    Home/End → first/last cell in row" },
      { title: "ARIA usage & screen reader testing", code: "Core ARIA rules:\n  1. Use semantic HTML before ARIA\n     <button> not <div role='button'>\n  2. Don't change native semantics\n     Never role='button' on an <a> with href\n  3. Interactive elements need accessible names\n     aria-label, aria-labelledby, or visible text\n  4. All ARIA is better tested than assumed\n\nCommon ARIA patterns:\n  aria-label='Close dialog'     — names an icon button\n  aria-labelledby='heading-id'  — references a heading\n  aria-describedby='hint-id'    — associates hint text\n  aria-required='true'          — marks required field\n  aria-invalid='true'           — marks validation error\n  aria-expanded='true|false'    — disclosure state\n  aria-live='polite'            — announces dynamic updates\n  aria-busy='true'              — content is loading\n  role='alert'                  — announces immediately\n\nScreen reader testing matrix:\n  Desktop: NVDA + Firefox (Windows)\n  Desktop: JAWS + Chrome (Windows)\n  Desktop: VoiceOver + Safari (macOS)\n  Mobile:  VoiceOver + Safari (iOS)\n  Mobile:  TalkBack + Chrome (Android)" },
    ],
  },

  // ── Governance & Process ──────────────────────────────────────────────────
  {
    name: "Documentation", category: "Governance & Process",
    description: "Design system documentation is the living reference that tells teams what exists, how to use it, when to use it, and why decisions were made — making the system discoverable, learnable, and adoptable.",
    syntax: "Component docs → Usage guidelines → Decision log → Contribution guide → Changelog.",
    notes: "A design system without documentation is a collection of components, not a system. Documentation is a product in itself — it needs a content strategy, an owner, and regular updates. The most common failure mode is documentation that describes the component's props but not when or why to use it. Usage guidelines are more valuable than API references.",
    returns: "A self-serve system where teams can adopt, use, and contribute to the design system without requiring constant guidance from the core team.",
    variations: [
      { title: "Component documentation structure", code: "Every component page should include:\n\n  1. Overview\n     What it is, what it does, when to use it\n     1–3 sentence summary — write for a new engineer\n\n  2. Live examples\n     Interactive preview of all variants\n     All states: default, hover, disabled, error\n     Light and dark mode if supported\n\n  3. Usage guidelines\n     ✓ Do: when and how to use it correctly\n     ✗ Don't: common misuse patterns to avoid\n     Related components and when to choose each\n\n  4. Anatomy\n     Diagram labelling each part of the component\n     With names that match design and code\n\n  5. Props / API reference\n     All props with type, default, and description\n\n  6. Accessibility\n     Keyboard interactions\n     ARIA requirements\n     Screen reader behaviour\n\n  7. Changelog\n     What changed and when, per component" },
      { title: "Usage guidelines writing guide", code: "Do / Don't format:\n\n  ✓ Do: Use a primary button for the main action\n         on any given screen or section.\n\n  ✗ Don't: Use more than one primary button per\n            screen — it dilutes visual hierarchy.\n\n  ✓ Do: Use a ghost/outline button for secondary\n         actions alongside a primary button.\n\n  ✗ Don't: Use a ghost button as the only button\n            on a screen — it has insufficient weight.\n\nContent principles for documentation:\n  — Write in the second person ('you', 'your team')\n  — Use active voice ('Use X when…' not 'X should be used…')\n  — Explain the WHY, not just the HOW\n  — Reference real product examples where possible\n  — Update docs in the same PR as the code change\n  — Treat outdated docs as bugs" },
      { title: "Documentation tooling", code: "Common documentation platforms:\n\n  Storybook:\n    Component sandbox + auto-generated prop docs\n    Interaction testing, accessibility audits\n    Best for: developer-focused component docs\n    GitHub: storybook.js.org\n\n  Zeroheight:\n    Design-to-doc platform connected to Figma\n    Best for: design + dev combined documentation\n    Can embed Storybook stories inline\n\n  Supernova:\n    Figma-connected with code export\n    Best for: teams wanting token and component sync\n\n  Notion / Confluence:\n    Flexible wikis for process and decision docs\n    Best for: contribution guides, meeting notes,\n    design decisions, ADRs (Architecture Decision Records)\n\nMinimum viable doc stack:\n  Storybook (component docs)\n  + Figma (design specs)\n  + README in the repo (contribution guide)\n  + CHANGELOG.md (what changed and when)" },
    ],
  },
  {
    name: "Versioning & Releases", category: "Governance & Process",
    description: "A versioning strategy ensures that teams consuming the design system know exactly what changed, whether updates are breaking, and how to migrate — enabling continuous improvement without surprise regressions.",
    syntax: "Semantic versioning (MAJOR.MINOR.PATCH) → Changelog → Migration guides → Deprecation notices.",
    notes: "The design system is a dependency — treat it like one. Breaking changes must be communicated well in advance, documented with migration paths, and released in major versions only. The fastest way to lose team trust in a design system is to ship breaking changes in a patch release, or to remove a component without warning.",
    returns: "Consumer teams can adopt updates with confidence, knowing what changed, whether it's safe to upgrade, and how to handle breaking changes.",
    variations: [
      { title: "Semantic versioning for design systems", code: "Semantic versioning: MAJOR.MINOR.PATCH\n\nPATCH (e.g. 2.4.1 → 2.4.2):\n  — Bug fixes (visual glitch, wrong token value)\n  — Documentation updates\n  — Dependency security updates\n  — No API or visual changes\n  → Safe to upgrade without review\n\nMINOR (e.g. 2.4.0 → 2.5.0):\n  — New components or variants added\n  — New props added (all optional, backwards-compatible)\n  — New tokens added\n  — Deprecation notices added (not removed)\n  → Safe to upgrade; review new additions\n\nMAJOR (e.g. 2.x → 3.0.0):\n  — Component API changes (renamed/removed props)\n  — Component removed from library\n  — Token renamed or removed\n  — Visual changes that affect layout or spacing\n  → Requires migration; read the upgrade guide first\n\nRule: Never make breaking changes in PATCH or MINOR." },
      { title: "Changelog best practices", code: "Keep a CHANGELOG.md at the repo root.\nFormat: Keep a Changelog (keepachangelog.com)\n\nExample entry:\n## [3.0.0] — 2026-05-09\n\n### Breaking Changes\n- Button: `variant='ghost'` renamed to `variant='outline'`\n  Migration: find-replace across codebase\n- Token: `color-primary` removed → use `color-action-primary`\n\n### Added\n- DatePicker component (new)\n- Button: new `loading` prop with spinner state\n- 4 new neutral palette tokens (neutral-925, neutral-950)\n\n### Changed\n- Badge: increased default font-size from 11px to 12px\n- Modal: default border-radius increased to 16px\n\n### Fixed\n- Input: focus ring not visible in Firefox 125\n- Tooltip: z-index conflict with sticky nav resolved\n\n### Deprecated\n- `TextInput` → use `Input` (removal in v4.0)\n\nRequirements:\n  — One entry per release\n  — Breaking changes always listed first\n  — Include migration steps for every breaking change" },
      { title: "Deprecation & migration strategy", code: "Deprecation lifecycle:\n  1. Mark deprecated (MINOR version)\n     — Add console.warn in component\n     — Mark deprecated in docs with alternative\n     — Add to CHANGELOG under Deprecated\n     — Minimum 1 major version of notice\n\n  2. Remove (MAJOR version)\n     — Include in CHANGELOG under Breaking Changes\n     — Provide a codemod if possible\n     — Keep migration guide in docs for 1 major version\n\nDeprecation warning pattern (React):\n  if (process.env.NODE_ENV !== 'production') {\n    console.warn(\n      '[DS v2.5] TextInput is deprecated.'\n      + ' Use Input instead. Remove by v3.0.'\n    );\n  }\n\nCodemods (AST-based automated migration):\n  — jscodeshift for JS/TS component migrations\n  — postcss for CSS token renames\n  — sed scripts for simple string replacements\n  Publish codemod scripts in the repo under /codemods/\n\nMigration support commitment:\n  — Announce MAJOR releases 4+ weeks in advance\n  — Run office hours or migration sessions for teams\n  — Track adoption in dashboards (who is on what version)" },
    ],
  },
  {
    name: "Contribution Model", category: "Governance & Process",
    description: "A contribution model defines how teams outside the core design system team propose, design, build, and submit new components and changes — balancing autonomy and quality, and preventing the system from becoming a bottleneck.",
    syntax: "Request → RFC → Design review → Build → Review → Release → Documentation.",
    notes: "Without a clear contribution model, one of two failure modes occurs: (1) the system becomes a bottleneck — everything must go through the core team, slowing product teams; or (2) the system loses coherence — anyone can add anything, resulting in an inconsistent, bloated library. The contribution model is the governance mechanism that prevents both.",
    returns: "A healthy system that grows systematically with input from the whole organisation while maintaining quality and consistency standards.",
    variations: [
      { title: "Contribution tiers", code: "Tier 1 — Fixes and enhancements (core team only):\n  Bug fixes, token updates, documentation improvements\n  Process: direct PR, single reviewer required\n\nTier 2 — New variants / props (product teams):\n  Adding a variant to an existing component\n  Process:\n    1. Open RFC issue with use-case and design\n    2. Core team reviews for system fit\n    3. Approved → product team builds + tests\n    4. Core team reviews PR\n    5. Merged and documented\n\nTier 3 — New components (product teams + core):\n  A component that does not exist in the system\n  Process:\n    1. Check: is it used in 3+ places across the product?\n       (Rule of three — don't abstract prematurely)\n    2. Open RFC with design spec and rationale\n    3. Design review from system team\n    4. Build with full state coverage\n    5. Accessibility audit required\n    6. Documentation required before merge\n    7. Core team review and approval\n\nTier 4 — Architectural changes (core team only):\n  Token structure, build tooling, framework changes\n  Process: ADR (Architecture Decision Record) + RFC" },
      { title: "RFC (Request for Comment) template", code: "RFC: New Component / Change Proposal\n\nTitle:       [RFC] Add DateRangePicker component\nAuthor:      Sarah Chen, Booking team\nDate:        2026-05-09\nStatus:      Draft | Open for comment | Accepted | Rejected\n\nProblem:\n  3 product teams have built custom date range pickers\n  with different behaviour and accessibility quality.\n  This creates inconsistent UX and duplicated effort.\n\nProposed solution:\n  Add a DateRangePicker to the design system.\n\nDesign spec: [Figma link]\nExisting implementations: [links to 3 product versions]\n\nAPI proposal:\n  <DateRangePicker\n    startDate: Date | null\n    endDate: Date | null\n    onChange: (range: DateRange) => void\n    minDate?: Date\n    maxDate?: Date\n    disabledDates?: Date[]\n  />\n\nOpen questions:\n  — Should this include time selection?\n  — Which calendar library should it use?\n\nAlternatives considered:\n  — Wrapping react-datepicker (rejected: too opinionated)\n  — Using a third-party headless component (preferred)" },
      { title: "Quality gates for contributions", code: "Before a component is accepted into the system:\n\nDesign requirements:\n  ✓ All states designed (default, hover, focus,\n    active, disabled, loading, error, empty)\n  ✓ Both light and dark mode\n  ✓ All breakpoints / responsive behaviour\n  ✓ Figma component with auto-layout and variants\n  ✓ Documented in Figma with usage annotations\n\nCode requirements:\n  ✓ Semantic HTML structure\n  ✓ Full TypeScript types\n  ✓ Responsive implementation\n  ✓ All states implemented\n  ✓ Keyboard navigation correct\n  ✓ ARIA attributes correct\n  ✓ Unit/interaction tests pass\n  ✓ Visual regression snapshots updated\n  ✓ No prop types (use TypeScript interfaces)\n\nDocumentation requirements:\n  ✓ Storybook story for every variant and state\n  ✓ Usage guidelines (Do / Don't)\n  ✓ Accessibility notes\n  ✓ Props table complete and accurate\n  ✓ Added to CHANGELOG under Added\n\nSkipping any of the above = not ready for system" },
    ],
  },
  {
    name: "Design–Dev Handoff", category: "Governance & Process",
    description: "Design–development handoff is the process by which design decisions, specifications, and components move from design tools into production code — with enough clarity that engineers can implement correctly without constant design involvement.",
    syntax: "Tokens synced → Figma components annotated → Storybook linked → Implementation guide provided.",
    notes: "The best handoff is no handoff. When design tokens flow automatically from Figma to code, and components in Figma match exactly what exists in Storybook, handoff becomes a review rather than a translation exercise. The more the design tool and codebase share a vocabulary (same token names, same component names), the less is lost in translation.",
    returns: "Faster, more accurate implementation with fewer back-and-forth cycles, fewer deviations from design intent, and a shared vocabulary between designers and engineers.",
    variations: [
      { title: "Token sync workflow", code: "Ideal automated token workflow:\n\n  1. Designer sets tokens in Figma Variables or Token Studio\n  2. Tokens exported as JSON (via plugin or CI)\n  3. Style Dictionary transforms JSON to:\n     — CSS custom properties (:root { --token: value })\n     — JS/TS constants (tokens.js)\n     — iOS Swift tokens\n     — Android Kotlin tokens\n  4. Engineer imports tokens from the design system package\n  5. PR to update tokens triggers visual regression tests\n  6. Approved → merged → released as PATCH or MINOR\n\nToken source of truth:\n  Figma → code (Figma is the source, code is the output)\n  NOT the reverse — don't define tokens in code first\n\nSync cadence:\n  Token changes: sync on every design change (automated)\n  Component changes: sync at sprint boundaries\n  Major redesigns: sync on explicit release schedule\n\nTools: Token Studio, Specify, Supernova, Style Dictionary" },
      { title: "Figma component handoff standards", code: "Every Figma component handed off should have:\n\n  1. Auto-layout\n     — All frames use auto-layout (not manual placement)\n     — Correct resizing behaviour (hug / fill / fixed)\n\n  2. Tokens applied\n     — All colors, sizes, and spacing from token library\n     — No hard-coded values in component styles\n\n  3. Variants defined\n     — All states as Figma variants (not separate frames)\n     — Named to match code: variant=primary, state=hover\n\n  4. Annotations\n     — Interaction notes (what happens on click/hover)\n     — Responsive behaviour noted\n     — Edge cases flagged (truncation, overflow, empty)\n\n  5. Linked to Storybook\n     — Figma component links to its Storybook story\n     — (Figma Storybook Connect plugin or manual links)\n\n  6. Redline specs (if not using token handoff)\n     — Spacing values, sizes, all from the design token names\n     — Engineers should see token names, not raw values" },
      { title: "Implementation checklist & review", code: "Design review checklist (engineer → designer):\n\n  Visual fidelity:\n  ✓ Typography matches spec (size, weight, line-height)\n  ✓ Colors match design tokens exactly\n  ✓ Spacing matches the design (in px and tokens)\n  ✓ Border radius matches the shape system\n  ✓ Icons are the correct size and style\n  ✓ Shadows match the elevation system\n\n  Behaviour:\n  ✓ Hover state matches design\n  ✓ Focus ring is visible and correct style\n  ✓ Active/pressed state implemented\n  ✓ Disabled state matches design\n  ✓ Loading state implemented\n  ✓ Animation/transition matches motion spec\n\n  Responsiveness:\n  ✓ Layout correct at all defined breakpoints\n  ✓ Text doesn't truncate unexpectedly\n  ✓ Touch targets are 44×44px minimum\n\n  Tools that reduce review burden:\n    Storybook Design addon — Figma frame beside story\n    Chromatic — visual diff review for component changes\n    Percy — screenshot-based visual regression testing" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Foundation":              "bg-primary-100 text-primary-700",
  "Visual Language":         "bg-violet-100 text-violet-700",
  "Component Architecture":  "bg-amber-100 text-amber-700",
  "Governance & Process":    "bg-emerald-100 text-emerald-700",
};

export default function DesignSystems() {
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [openVariation, setOpenVariation] = useState<number | null>(0);

  const categories = Array.from(new Set(topicsData.map((t) => t.category)));

  useEffect(() => {
    setOpenVariation(0);
  }, [selectedTopic]);

  useEffect(() => {
    document.body.style.overflow = selectedTopic ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedTopic]);

  return (
    <>
      {categories.map((cat) => (
        <section key={cat} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-neutral-800">{cat}</h2>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[cat]}`}>
              {topicsData.filter((t) => t.category === cat).length} topics
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {topicsData
              .filter((t) => t.category === cat)
              .map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => setSelectedTopic(topic)}
                  className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary-600"
                >
                  <span className="text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-tight">
                    {topic.name}
                  </span>
                  <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[topic.category]}`}>
                    {topic.category}
                  </span>
                </button>
              ))}
          </div>
        </section>
      ))}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
        <span className="font-medium text-neutral-400 uppercase tracking-wide">Category</span>
        {Object.entries(categoryColor).map(([cat, cls]) => (
          <span key={cat} className={`px-2.5 py-0.5 rounded-full font-semibold ${cls}`}>
            {cat}
          </span>
        ))}
      </div>

      {/* Modal */}
      {selectedTopic && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-neutral-900">{selectedTopic.name}</h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[selectedTopic.category]}`}>
                  {selectedTopic.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-full hover:bg-neutral-200"
                aria-label="Close"
              >
                <span className="material-symbols-rounded text-xl! leading-none block!">close</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-6">
              <p className="text-neutral-600 leading-relaxed">{selectedTopic.description}</p>

              {/* Summary */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Summary</p>
                <pre className="bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-sm font-mono" style={{ userSelect: "text" }}>
                  <code>{selectedTopic.syntax}</code>
                </pre>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Notes</p>
                <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4">
                  {selectedTopic.notes}
                </p>
              </div>

              {/* Outcome */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Outcome</p>
                <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4">
                  {selectedTopic.returns}
                </p>
              </div>

              {/* Examples accordion */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Examples</p>
                <div className="rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100">
                  {selectedTopic.variations.map((variation, index) => {
                    const isOpen = openVariation === index;
                    return (
                      <div key={index} className="bg-neutral-50">
                        <button
                          onClick={() => setOpenVariation(isOpen ? null : index)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-100 transition-colors"
                        >
                          <span className="text-sm font-semibold text-neutral-700">{variation.title}</span>
                          <span
                            className={`material-symbols-rounded text-base! text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          >
                            expand_more
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 bg-white">
                            <pre className="bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-xs font-mono" style={{ userSelect: "text" }}>
                              <code>{variation.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
