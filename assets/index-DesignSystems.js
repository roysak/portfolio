import{t as e}from"./index-jsx-runtime.js";import{a as t,n}from"./index-components.js";var r=e(),i=[{name:`Color System`,category:`Foundation`,description:`A color system defines the palette, semantic color roles, and usage rules that ensure visual consistency, brand alignment, and accessible contrast ratios across all surfaces, states, and themes.`,syntax:`Global palette → Semantic tokens → Component-level tokens → Theme overrides.`,notes:`Never hard-code hex values into components. All color decisions should flow through tokens. A well-structured system separates what a color IS (blue-500) from what it MEANS (color-action-primary). This separation enables theming, dark mode, and rebranding without touching component code.`,returns:`A consistent, accessible, and themeable visual language that can evolve independently from component implementations.`,variations:[{title:`Palette structure`,code:`Global palette (raw values):
  neutral-0:    #ffffff
  neutral-50:   #f9fafb
  neutral-100:  #f3f4f6
  neutral-900:  #111827

  blue-50:      #eff6ff
  blue-500:     #3b82f6
  blue-700:     #1d4ed8

  red-500:      #ef4444
  green-500:    #22c55e
  amber-500:    #f59e0b

Naming convention:
  [hue]-[step]  — step runs 50, 100, 200 … 900, 950
  Always generate the full ramp; use only what you need`},{title:`Semantic token mapping`,code:`Semantic layer (what it means, not what it is):

  color-background-default:    neutral-0
  color-background-subtle:     neutral-50
  color-background-emphasis:   neutral-900

  color-text-primary:          neutral-900
  color-text-secondary:        neutral-600
  color-text-disabled:         neutral-400
  color-text-inverse:          neutral-0

  color-action-primary:        blue-500
  color-action-primary-hover:  blue-700
  color-action-danger:         red-500

  color-border-default:        neutral-200
  color-border-focus:          blue-500

  color-feedback-success:      green-500
  color-feedback-warning:      amber-500
  color-feedback-error:        red-500`},{title:`Dark mode & accessibility`,code:`Dark mode = token value swap, not new components:
  light:  color-background-default → #ffffff
  dark:   color-background-default → #0f172a

  light:  color-text-primary → #111827
  dark:   color-text-primary → #f1f5f9

Accessibility requirements (WCAG 2.1):
  AA normal text:   contrast ratio ≥ 4.5 : 1
  AA large text:    contrast ratio ≥ 3.0 : 1
  AAA normal text:  contrast ratio ≥ 7.0 : 1
  UI components:    contrast ratio ≥ 3.0 : 1

Tools: Stark, Colour Contrast Analyser, axe DevTools

Do not rely on color alone:
  ✓ Pair color with shape, icon, or label
  ✓ Error states need more than a red border
  ✓ 8% of men have color vision deficiency`}]},{name:`Typography Scale`,category:`Foundation`,description:`A typography scale defines a harmonious set of font sizes, weights, line heights, and letter spacings that establish visual hierarchy, ensure readability, and communicate brand personality across all contexts.`,syntax:`Type ramp (size + weight + line-height) → Semantic roles → Responsive adjustments.`,notes:`Choose a base size (typically 16px) and a scale ratio (1.25 Minor Third, 1.333 Perfect Fourth, or 1.5 Major Third). Generate sizes above and below the base. Assign semantic roles so teams use 'heading-xl' not 'font-size: 48px'. Type decisions belong in tokens, not component stylesheets.`,returns:`A consistent, readable, and hierarchically clear typographic system that works across all screen sizes and contexts.`,variations:[{title:`Type scale definition`,code:`Scale using Perfect Fourth ratio (×1.333):

  display-2xl:  72px / 4.5rem   — hero headlines
  display-xl:   60px / 3.75rem  — page titles
  display-lg:   48px / 3rem     — section headers
  heading-xl:   36px / 2.25rem  — h1
  heading-lg:   30px / 1.875rem — h2
  heading-md:   24px / 1.5rem   — h3
  heading-sm:   20px / 1.25rem  — h4
  body-lg:      18px / 1.125rem — lead text
  body-md:      16px / 1rem     — base body (default)
  body-sm:      14px / 0.875rem — secondary text
  label-md:     14px / 0.875rem — form labels
  label-sm:     12px / 0.75rem  — captions, tags

Font weight roles:
  400: Regular — body text
  500: Medium  — labels, UI text
  600: Semibold — headings, emphasis
  700: Bold    — display, strong emphasis`},{title:`Line height & letter spacing`,code:`Line height (leading) guidelines:
  Display text:   1.1 – 1.2   — tight, impactful
  Headings:       1.2 – 1.3   — comfortable for short text
  Body text:      1.5 – 1.7   — optimal for reading
  Small/caption:  1.4 – 1.5   — still readable at small sizes

Letter spacing (tracking):
  Display large:  -0.02em     — tighten for impact
  Heading:        -0.01em     — slight tightening
  Body:            0em        — natural tracking
  All caps label: +0.08em     — loosen for legibility
  Caption:        +0.02em     — slight opening

Common mistake:
  Using the same line-height for display and body
  Display at 1.6 looks like a shopping list
  Body at 1.1 is unreadable for paragraphs`},{title:`Font pairing & loading`,code:`Font pairing principles:
  1. Use max 2 typefaces in a system
  2. Pair a display face with a readable body face
  3. Or use one versatile variable font for everything

Common pairings:
  Inter (system-grade) + nothing — clean, legible, free
  Geist Sans + Geist Mono — modern, paired sans/mono
  Playfair Display + Source Sans — editorial feel

Font loading strategy:
  1. Self-host or use CDN (not Google Fonts in EU prod)
  2. Use font-display: swap to prevent invisible text
  3. Preload critical font weights (400, 600)
  4. Subset fonts to needed character ranges
  5. Use variable fonts where possible — one file,
     all weights and widths

System font stack fallback:
  -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, Helvetica, Arial, sans-serif`}]},{name:`Spacing System`,category:`Foundation`,description:`A spacing system is a constrained set of spacing values that governs margins, padding, gaps, and layout rhythm across all components and pages. It ensures visual consistency without ad-hoc values.`,syntax:`Base unit (4px or 8px) → Scale multipliers → Named tokens → Component application.`,notes:`The 8-point grid is the industry standard because 8 divides evenly into most common screen sizes and aligns with platform density-independent units (iOS pt, Android dp). A consistent spacing scale eliminates the decision fatigue of 'should this be 12px or 14px?' — neither: it should be 12px or 16px.`,returns:`Visual rhythm, consistent density, and alignment across all UI elements without arbitrary spacing decisions.`,variations:[{title:`8-point spacing scale`,code:`Base unit: 4px (half-step for tight spacing)

  space-0:    0px
  space-0.5:  2px   — hairline gap
  space-1:    4px   — icon-to-label, tight inline
  space-2:    8px   — compact padding, badge gap
  space-3:    12px  — small component padding
  space-4:    16px  — default component padding
  space-5:    20px  — medium spacing
  space-6:    24px  — card padding, section gap
  space-8:    32px  — large component spacing
  space-10:   40px  — section separation
  space-12:   48px  — major section breaks
  space-16:   64px  — page section padding
  space-20:   80px  — hero section spacing
  space-24:   96px  — large layout sections

Rule: Only use values from the scale. Never 13px.`},{title:`Semantic spacing tokens`,code:`Map scale values to semantic meanings:

  Component internal spacing:
    spacing-component-xs:   space-1  (4px)
    spacing-component-sm:   space-2  (8px)
    spacing-component-md:   space-4  (16px)
    spacing-component-lg:   space-6  (24px)

  Component external spacing:
    spacing-stack-xs:       space-2  (8px)
    spacing-stack-sm:       space-4  (16px)
    spacing-stack-md:       space-6  (24px)
    spacing-stack-lg:       space-8  (32px)
    spacing-stack-xl:       space-12 (48px)

  Layout spacing:
    spacing-layout-sm:      space-8  (32px)
    spacing-layout-md:      space-12 (48px)
    spacing-layout-lg:      space-16 (64px)
    spacing-layout-xl:      space-20 (80px)

  Use semantic names in components, never raw values.`},{title:`Density variants`,code:`Many systems need compact and comfortable modes:

  Comfortable (default):
    Button padding:     12px 24px
    Input padding:      12px 16px
    List item height:   48px
    Card padding:       24px

  Compact (data-dense UIs, dashboards):
    Button padding:     8px 16px
    Input padding:      8px 12px
    List item height:   36px
    Card padding:       16px

  Spacious (marketing, reading-focused):
    Button padding:     16px 32px
    Input padding:      16px 20px
    List item height:   56px
    Card padding:       32px

Implementation: density as a CSS custom property or
ThemeProvider context — swap tokens, not components.

Enterprise tools: default compact
Consumer apps:    default comfortable
Marketing sites:  default spacious`}]},{name:`Layout & Grid`,category:`Foundation`,description:`The layout system defines the structural rules — columns, gutters, margins, max-widths, and breakpoints — that determine how content is arranged and reflows across all viewport sizes.`,syntax:`Breakpoints → Column grid → Gutters + margins → Container max-widths.`,notes:`Grids are constraints that enable creativity, not cages. A 12-column grid is preferred because it divides evenly into halves, thirds, quarters, and sixths. The grid lives in layout components — page templates and section wrappers — not inside individual UI components like buttons or cards.`,returns:`A predictable, responsive layout that maintains readability and visual hierarchy across all device sizes.`,variations:[{title:`Breakpoint system`,code:`Standard breakpoint set:

  xs:   0px     — mobile portrait (base, mobile-first)
  sm:   640px   — mobile landscape / large mobile
  md:   768px   — tablet portrait
  lg:   1024px  — tablet landscape / small laptop
  xl:   1280px  — desktop
  2xl:  1536px  — wide desktop

Breakpoint strategy:
  Mobile-first: write base styles for xs,
  then override at larger breakpoints with min-width.

  Do not target specific devices — target content.
  When your layout breaks, add a breakpoint there.

Common breakpoint pattern:
  Stack (xs–sm) → 2 columns (md) → 3 cols (lg) → 4 cols (xl)`},{title:`Column grid & gutters`,code:`Standard 12-column grid:

  Breakpoint  Columns  Gutter  Margin  Max-width
  ─────────────────────────────────────────────────
  xs (≥0)       4       16px    16px    100%
  sm (≥640)     4       16px    24px    100%
  md (≥768)     8       24px    32px    100%
  lg (≥1024)   12       24px    40px    100%
  xl (≥1280)   12       32px    auto    1280px
  2xl (≥1536)  12       32px    auto    1536px

Column spans (12-column base):
  Full width:    12 cols — page-level headings
  Two thirds:     8 cols — main content + sidebar
  Half:           6 cols — split layouts
  Third:          4 cols — card grids
  Quarter:        3 cols — dense card grids

Gutter: the gap between columns (not the outer margin).
Margin: the outer padding from the viewport edge.`},{title:`Container & layout components`,code:`Container component (reusable):
  — Centers content
  — Applies max-width
  — Applies horizontal padding (margin)

  <Container>   max-w-7xl, px-4 sm:px-6 lg:px-8
  <ContainerNarrow>  max-w-3xl — articles, forms
  <ContainerWide>    max-w-screen-2xl — dashboards

Layout component types:
  PageLayout    — full page wrapper, handles nav + footer
  SectionLayout — vertical rhythm between page sections
  GridLayout    — n-column responsive grid
  SidebarLayout — main content + fixed-width sidebar
  SplitLayout   — 50/50 or 60/40 horizontal split

Responsive grid helpers:
  grid-cols-1 → sm:grid-cols-2 → lg:grid-cols-3
  Always define how the grid collapses on small screens
  Never assume desktop layout is the default`}]},{name:`Iconography`,category:`Visual Language`,description:`An icon system defines the style, sizing, stroke weight, and usage guidelines that ensure icons communicate clearly, consistently, and accessibly across all touchpoints in the product.`,syntax:`Icon style guide → Size tokens → Color tokens → Accessibility requirements.`,notes:`Icons are never purely decorative in a UI — they carry meaning. Every icon must have an accessible text alternative unless it is accompanied by a visible label. Mixing icon styles (outlined, filled, rounded) within a product creates visual noise and signals poor quality. Choose one family and apply it consistently.`,returns:`Clear, consistent iconography that communicates meaning at a glance and is accessible to all users including those using assistive technology.`,variations:[{title:`Icon style & sizing system`,code:`Style choices (pick one and stick to it):
  Outlined:   clean, modern, works on all backgrounds
  Filled:     bolder, better for active/selected states
  Rounded:    friendly, consumer-facing products
  Sharp:      professional, enterprise tools

Sizing scale:
  icon-xs:    12px — inline with caption text
  icon-sm:    16px — inline with body text, badges
  icon-md:    20px — default UI icon size
  icon-lg:    24px — navigation, prominent actions
  icon-xl:    32px — empty states, feature icons
  icon-2xl:   48px — illustration-level feature icons

Design rule:
  Icons should always align to the text baseline
  or be optically centred in their container.
  Never use arbitrary sizes outside the scale.`},{title:`Color & usage rules`,code:`Icon color follows text color tokens:
  icon-primary:     same as color-text-primary
  icon-secondary:   same as color-text-secondary
  icon-disabled:    same as color-text-disabled
  icon-inverse:     same as color-text-inverse
  icon-action:      same as color-action-primary
  icon-danger:      same as color-action-danger
  icon-success:     same as color-feedback-success

Usage rules:
  ✓ Leading icon:  icon before label (→ left-aligned)
  ✓ Trailing icon: icon after label (→ right for 'external')
  ✓ Icon button:   icon only, always with aria-label
  ✓ Icon + label:  label always takes precedence
  ✗ Never use icon alone for critical actions
  ✗ Never resize icons outside the size scale
  ✗ Never mix more than one icon style in one view`},{title:`Accessibility requirements`,code:`Decorative icons (have visible label beside them):
  <span aria-hidden='true'>icon</span>
  — Screen reader ignores the icon

Informative icons (stand alone, no visible label):
  <button aria-label='Close dialog'>
    <span aria-hidden='true'>icon</span>
  </button>

Status icons (e.g. error icon next to a message):
  <span role='img' aria-label='Error'>icon</span>
  — Or include visually-hidden text:
  <span aria-hidden='true'>icon</span>
  <span class='sr-only'>Error: </span>
  Your message here

Touch target minimum:
  44×44px (iOS HIG) / 48×48dp (Material)
  The visual icon can be smaller — pad to target size

Contrast: icon against background ≥ 3:1 (WCAG AA)`}]},{name:`Motion & Animation`,category:`Visual Language`,description:`A motion system defines the timing, easing curves, and principles that govern how UI elements enter, exit, and transition — ensuring animation enhances communication rather than becoming noise or hindrance.`,syntax:`Motion principles → Duration scale → Easing curves → Trigger patterns.`,notes:`Motion in UI has one job: to communicate. It should clarify state changes, guide attention, and reinforce spatial relationships. Motion that plays just to look impressive adds cognitive load and frustrates users who need to wait. Always respect prefers-reduced-motion — make it a first-class concern, not an afterthought.`,returns:`Purposeful, performant animations that communicate state changes clearly and respect user motion preferences.`,variations:[{title:`Duration scale & easing curves`,code:`Duration scale:
  duration-instant:    0ms   — no animation (state toggle)
  duration-fastest:   75ms  — micro-feedback (checkbox tick)
  duration-fast:     150ms  — tooltips, dropdowns opening
  duration-base:     200ms  — default transitions (color, opacity)
  duration-slow:     300ms  — panel slides, modal entrance
  duration-slower:   400ms  — page transitions, large reveals
  duration-slowest:  500ms+ — loading sequences, onboarding

Rule: Larger elements move slower; smaller elements move faster.
A button state change: 150ms. A full-page transition: 300ms.

Easing curves:
  ease-in:         accelerate out → use for exits
  ease-out:        decelerate in  → use for entrances
  ease-in-out:     both ends soft → use for position changes
  linear:          constant speed → use for spinners only
  spring/bounce:   use sparingly, consumer apps only`},{title:`Motion principles`,code:`1. Purpose over polish
   Every animation must serve a function:
   — Orientation: where did that element go?
   — Feedback:    the action registered
   — State:       something changed
   — Hierarchy:   this is important

2. Continuity
   Elements that persist between states should
   animate position/size, not fade out and in.
   (Shared element transitions, layout animations)

3. Sequence
   Animate related elements together or in a
   deliberate stagger — not all at once and not
   independently at random intervals.

4. Restraint
   Never animate more than 2–3 elements simultaneously.
   Avoid animating during user input.
   Animations over 400ms feel slow — use progress instead.

5. Performance
   Animate only: transform (translate, scale, rotate)
   and opacity — these don't trigger layout reflow.
   Never animate: width, height, top, left, margin, padding.`},{title:`Reduced motion & accessibility`,code:`The prefers-reduced-motion media query:
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

Do NOT just 'turn off' animations for reduced motion.
Instead provide an alternative:

  Full motion:    element fades + slides in
  Reduced motion: element appears instantly (opacity only)
  No motion:      element is simply shown

Patterns to avoid entirely:
  ✗ Auto-playing carousels (use pause controls)
  ✗ Looping background animations
  ✗ Parallax scrolling
  ✗ Animations triggered by scroll position
  ✗ Flashing or strobing effects (WCAG 2.3.1)

Tests: always test with 'Reduce Motion' OS setting enabled`}]},{name:`Elevation & Shadow`,category:`Visual Language`,description:`An elevation system uses shadow and layering to communicate spatial hierarchy — which surfaces are in front, which are behind, and which elements are interactive, floating, or fixed relative to the page.`,syntax:`Elevation level → Shadow definition → Usage context → Z-index management.`,notes:`Shadow communicates depth, not decoration. Every shadow level should have a clear meaning: surface (in-page content), raised (interactive), overlay (temporary layer), modal (blocking layer). Using the wrong elevation level misleads users about the spatial model of the UI. Avoid using shadow for aesthetics alone.`,returns:`A clear spatial hierarchy that helps users understand which elements are interactive, temporary, or prioritised — without relying on colour alone.`,variations:[{title:`Shadow scale`,code:`Elevation levels and their shadows:

  elevation-0 (flush):
    none — base surface, in-page content

  elevation-1 (raised):
    0 1px 2px rgba(0,0,0,0.06),
    0 1px 3px rgba(0,0,0,0.10)
    Use: cards, list items, table rows on hover

  elevation-2 (floating):
    0 4px 6px rgba(0,0,0,0.07),
    0 2px 4px rgba(0,0,0,0.06)
    Use: dropdowns, select menus, popovers

  elevation-3 (overlay):
    0 10px 15px rgba(0,0,0,0.10),
    0 4px 6px rgba(0,0,0,0.05)
    Use: tooltips, date pickers, command palettes

  elevation-4 (modal):
    0 20px 25px rgba(0,0,0,0.15),
    0 10px 10px rgba(0,0,0,0.04)
    Use: modal dialogs, drawers, sheet panels

  elevation-5 (notification):
    0 25px 50px rgba(0,0,0,0.25)
    Use: toast notifications, system alerts`},{title:`Z-index management`,code:`Establish a z-index naming system:

  z-below:       -1   — backgrounds, decorative layers
  z-base:         0   — page content (default)
  z-raised:      10   — cards, sticky table headers
  z-dropdown:   100   — dropdowns, context menus
  z-sticky:     200   — sticky nav, sticky sidebars
  z-overlay:    300   — modal backdrops
  z-modal:      400   — dialog panels, drawers
  z-tooltip:    500   — tooltips (must be above modals)
  z-toast:      600   — toast notifications
  z-maximum:   9999   — critical system alerts

Common mistake:
  Using arbitrary z-index values (z-index: 99999)
  — Creates an arms race of ever-higher values
  — Makes layering impossible to reason about
  — Results in elements unexpectedly above each other

Rule: always use the named scale, never raw integers.`},{title:`Dark mode shadow considerations`,code:`Shadow on dark backgrounds is nearly invisible.
In dark mode, elevation must use alternative cues:

Strategy 1: Tinted surfaces
  Increase surface lightness with elevation:
  elevation-0: background-900 (#1e293b)
  elevation-1: background-800 (#334155)
  elevation-2: background-700 (#475569)
  elevation-3: background-600 (#64748b)

Strategy 2: Combined shadow + tint
  Use a lighter tinted surface AND a shadow
  The shadow confirms depth; the tint provides contrast

Strategy 3: Border on elevation
  Add a subtle lighter border to floating elements:
  border: 1px solid rgba(255,255,255,0.08)
  — Defines the edge of the elevated surface
  — Works even when shadow is invisible

Material Design 3 and Apple use the tinted surface
approach for their dark mode elevation systems.`}]},{name:`Shape & Border Radius`,category:`Visual Language`,description:`The shape system defines the border radius values, component silhouettes, and shape roles that contribute to brand personality — from sharp and professional to soft and friendly — applied consistently across all components.`,syntax:`Shape scale → Semantic shape tokens → Component-level shape roles.`,notes:`Shape is one of the most expressive brand tools available. Rounded corners feel friendly and approachable (consumer apps). Sharp corners feel precise and professional (enterprise tools). The key is consistency — applying shape randomly across components makes a system feel undesigned. All major components should follow the same shape philosophy.`,returns:`A consistent brand personality expressed through shape, with clear rules that prevent arbitrary corner radius decisions.`,variations:[{title:`Border radius scale`,code:`Shape scale:
  radius-none:    0px    — no rounding, sharp
  radius-sm:      2px    — subtle, nearly square
  radius-md:      4px    — default small component
  radius-lg:      8px    — default component radius
  radius-xl:      12px   — cards, panels
  radius-2xl:     16px   — large cards, modals
  radius-3xl:     24px   — marketing cards, hero elements
  radius-full:    9999px — pills, badges, avatars

Semantic mapping:
  shape-component-sm:   radius-md  (4px)  — inputs, buttons
  shape-component-md:   radius-lg  (8px)  — cards, dropdowns
  shape-component-lg:   radius-xl  (12px) — modals, panels
  shape-badge:          radius-full        — tags, chips
  shape-avatar:         radius-full        — user images`},{title:`Brand personality & shape`,code:`Sharp (radius-none or radius-sm):
  Personality: precise, professional, serious
  Good for: enterprise tools, financial products,
            developer tools, government services
  Examples: Linear, Bloomberg, most SaaS dashboards

Balanced (radius-md to radius-lg):
  Personality: modern, neutral, versatile
  Good for: B2B SaaS, productivity tools, marketplaces
  Examples: Notion, Figma, Stripe, Shopify

Rounded (radius-xl to radius-2xl):
  Personality: friendly, approachable, consumer
  Good for: consumer apps, wellness, education, social
  Examples: Airbnb, Duolingo, Spotify, Apple

Pill/Full-round:
  Reserved for: buttons on marketing sites, badges,
  tags, avatar chips — not for containers or cards

Rule: choose one shape personality and apply it
consistently. Mixed shapes signal inconsistency.`},{title:`Shape in component application`,code:`Consistent shape application:

  Buttons:
    Small:   same radius as shape-component-sm
    Default: same radius as shape-component-sm
    Large:   same radius as shape-component-sm
    → Buttons keep consistent shape at all sizes

  Inputs / Text fields:
    Default radius: shape-component-sm
    → Should match button radius for visual harmony

  Cards:
    Default radius: shape-component-md
    → Slightly more rounded than interactive elements

  Modals / Dialogs:
    Default radius: shape-component-lg
    → Most rounded to signal temporary/floating nature

  Tags / Badges:
    Always: shape-badge (radius-full)
    → Pills are universally understood as labels

  Tooltips:
    Typically: radius-lg
    → Match the modal level for floating surfaces`}]},{name:`Design Tokens`,category:`Component Architecture`,description:`Design tokens are named variables that store the visual decisions of a design system — colors, typography, spacing, shadows, and more — in a format that can be shared across design tools, platforms, and codebases.`,syntax:`Global tokens → Alias (semantic) tokens → Component tokens → Platform output.`,notes:`Tokens are the contract between design and engineering. They are not implementation details — they are design decisions given names. A token like 'color-action-primary' communicates intent. A hex value like '#3b82f6' does not. Tokens enable theming, multi-brand systems, and dark mode without touching component code.`,returns:`A single source of truth for all visual decisions that keeps design tools and code in sync across teams and platforms.`,variations:[{title:`Token taxonomy (3-tier system)`,code:`Tier 1 — Global tokens (raw values):
  color-blue-500: #3b82f6
  font-size-16: 16px
  space-4: 16px
  → Never used directly in components
  → Only referenced by semantic tokens

Tier 2 — Alias / Semantic tokens:
  color-action-primary: {color-blue-500}
  font-size-body: {font-size-16}
  spacing-component-md: {space-4}
  → Used in component tokens
  → Drive theming (swap values, not structure)

Tier 3 — Component tokens:
  button-background-primary: {color-action-primary}
  button-font-size: {font-size-body}
  button-padding-horizontal: {spacing-component-md}
  → Consumed directly by components
  → Override at this level for brand variants`},{title:`Token naming conventions`,code:`Format: [category]-[property]-[variant]-[state]

Examples:
  color-background-primary          → category + property
  color-background-primary-subtle   → + variant
  color-background-primary-hover    → + state
  color-text-secondary-disabled     → property + variant + state

  font-size-body-lg
  font-weight-heading
  font-line-height-body

  spacing-inline-md
  spacing-stack-lg
  spacing-inset-md     — equal padding all sides
  spacing-inset-squish — top/bottom smaller than left/right
  spacing-inset-stretch — top/bottom larger than left/right

  border-radius-component-sm
  border-width-default
  border-color-default

  shadow-elevation-1
  shadow-elevation-modal

Rule: tokens should read like sentences describing their role,
not like variables describing their value.`},{title:`Tooling & platform output`,code:`Token workflow:
  Design (Figma Variables/Tokens Studio)
    ↓ export JSON
  Token transformation (Style Dictionary)
    ↓ transforms to platform-specific output
  Code (CSS variables / JS / Swift / Kotlin)

CSS output:
  :root {
    --color-action-primary: #3b82f6;
    --spacing-component-md: 16px;
    --font-size-body: 16px;
  }

JS/TS output:
  export const tokens = {
    colorActionPrimary: '#3b82f6',
    spacingComponentMd: '16px',
  };

Theme support:
  [data-theme='dark'] {
    --color-action-primary: #60a5fa;
    --color-background-default: #0f172a;
  }

Tools: Style Dictionary, Theo (Salesforce),
Figma Variables, Token Studio, Specify`}]},{name:`Atomic Design`,category:`Component Architecture`,description:`Atomic Design is a methodology for building UI component libraries in layers — from the smallest indivisible elements (atoms) to fully assembled page-level compositions (pages). Created by Brad Frost.`,syntax:`Atoms → Molecules → Organisms → Templates → Pages.`,notes:`Atomic Design is a mental model, not a rigid filing system. The value is in thinking about components at the right level of abstraction. The common mistake is over-atomising — splitting a simple component into five sub-atoms that are never reused. Components should be split when composition genuinely occurs, not because it theoretically could.`,returns:`A component library that is composable, scalable, and consistent — where building new features means assembling existing parts, not creating new ones.`,variations:[{title:`The five levels explained`,code:`Atoms — smallest indivisible UI elements:
  Button, Input, Label, Icon, Badge, Avatar,
  Checkbox, Radio, Toggle, Tag, Spinner, Divider
  → Cannot be broken down further
  → Have no composition of other atoms

Molecules — simple groups of atoms:
  Search bar (Input + Button + Icon)
  Form field (Label + Input + Error message)
  Card header (Avatar + Heading + Subtext)
  Navigation item (Icon + Label + Badge)
  → Compose 2–4 atoms with a single purpose

Organisms — complex, standalone UI sections:
  Navigation bar (Logo + Nav links + Search + Avatar)
  Product card (Image + Title + Price + CTA)
  Data table (Header + Rows + Pagination)
  Signup form (Form fields + Submit + Terms)
  → Compose molecules and atoms; can stand alone

Templates — page-level wireframe structures:
  Article template, Dashboard layout, Settings page
  → Define content areas; use placeholder content

Pages — template instances with real content:
  The actual rendered application views`},{title:`Component composition in practice`,code:`Example: Building a Comment component

Atoms used:
  Avatar        — user image
  Text (body)   — comment content
  Text (label)  — username, timestamp
  Button        — reply, like
  Icon          — like icon, reply icon
  Badge         — reply count

Molecule — CommentAuthor:
  Avatar + Text (name) + Text (timestamp)

Molecule — CommentActions:
  Button (like) + Icon + Badge (count)
  Button (reply) + Icon

Organism — Comment:
  CommentAuthor + Text (body) + CommentActions

Organism — CommentThread:
  Comment + nested Comment (replies)

This hierarchy means:
  — Updating Avatar updates all Comment instances
  — Updating CommentAuthor updates all Comments
  — New design only needs to change the right level`},{title:`When to split vs. keep together`,code:`Split a component when:
  ✓ Two or more distinct components reuse the same part
  ✓ The part has its own state or behaviour
  ✓ The part is meaningful and named in design
  ✓ The part will be swapped out by another team

Keep together when:
  ✗ The part is only used in one place
  ✗ Splitting requires passing through many props
  ✗ The split makes the API more complex
  ✗ The part has no design-level name or identity

Practical heuristic:
  'Is this named in our design file as its own component?'
  If yes → extract it.
  If no → leave it.

Over-atomisation warning signs:
  — Components with names like 'TextWrapper'
  — Components that only render one child
  — 5+ prop levels required to customise anything
  — Engineers create new components because the atoms
    are too rigid to compose into what they need`}]},{name:`Component States`,category:`Component Architecture`,description:`Every interactive component must define and design all of its possible states — from the base default through every interaction state, loading condition, and error case — before it can be considered complete.`,syntax:`Default → Hover → Focus → Active → Disabled → Loading → Error → Empty → Success.`,notes:`Most design systems are 70% complete because designers hand off only the default state. Edge cases — empty states, error states, loading states — are where real users spend disproportionate time. Every state must be designed, documented, and built. 'The happy path is not the only path' is the most important principle in component completeness.`,returns:`Components that handle every real-world condition gracefully, reducing engineering guesswork and preventing inconsistent fallback implementations.`,variations:[{title:`Full state inventory`,code:`Interactive states (all interactive components):
  default   — resting, no user interaction
  hover     — cursor over element (mouse only)
  focus     — keyboard or programmatic focus
  focus-visible — keyboard focus only (not on click)
  active    — being pressed/clicked
  visited   — for links (already followed)
  disabled  — non-interactive, cannot be activated

Content states:
  empty     — no data to display
  loading   — data being fetched
  error     — operation failed
  success   — operation completed
  partial   — some data, more loading
  stale     — data present but may be outdated

Form-specific states:
  untouched — not yet interacted with
  touched   — has been focused and blurred
  valid     — passes validation
  invalid   — fails validation (show error)
  required  — must be filled before submission
  read-only — visible but not editable`},{title:`Designing each state`,code:`Button — all states defined:
  default:  background=action-primary, text=white
  hover:    background slightly darker (-10% lightness)
  focus:    2px solid focus-ring, 2px offset (accessible)
  active:   background darker still, slight scale down
  disabled: opacity 40%, cursor not-allowed
  loading:  spinner inside, text hidden, non-clickable

Input field — all states defined:
  default:  border=neutral-300, label above
  hover:    border=neutral-400
  focus:    border=action-primary, shadow ring
  filled:   border=neutral-300, value text visible
  error:    border=danger, error message below
  success:  border=success, checkmark icon
  disabled: bg=neutral-100, text=neutral-400
  read-only: bg=neutral-50, no border on focus

Card — content states:
  loading:  skeleton placeholder (grey shimmer)
  empty:    illustration + message + CTA
  error:    icon + message + retry action
  success:  normal populated state`},{title:`Empty states & error states`,code:`Empty state anatomy:
  1. Illustration or icon (optional but recommended)
  2. Headline — what is missing ('No projects yet')
  3. Body — why it's empty and what to do
  4. Primary CTA — the action to resolve the emptiness

  Do: design empty states before the data state
  Do: make empty states useful, not just apologetic
  Don't: show a blank page or a generic '0 results'

Error state design:
  Network error:
    Icon + 'Could not load data' + Retry button
  Validation error:
    Inline below field, red border, specific message
    'Email is invalid' not 'Invalid input'
  404 state:
    Illustration + 'Page not found' + Back / Home CTA
  Permission error:
    Explain why they can't access + contact/upgrade CTA

Loading state options:
  Spinner:   use for short, indeterminate waits (<2s)
  Skeleton:  use for content-shaped loads (cards, lists)
  Progress:  use for determinate operations with %`}]},{name:`Accessibility`,category:`Component Architecture`,description:`Accessibility (a11y) in a design system means building components that are perceivable, operable, understandable, and robust for all users — including those using screen readers, keyboard navigation, or assistive technologies.`,syntax:`WCAG 2.1 AA compliance → Semantic HTML → ARIA patterns → Keyboard navigation → Focus management.`,notes:`Accessibility is not a feature you add at the end — it must be baked into every component from the start. A design system is the highest-leverage place to implement accessibility: fix it once in the component, and every product using that component benefits. 'Accessible design is good design' — the constraints of accessibility almost always produce better, clearer interfaces.`,returns:`Components that work for everyone, reduce legal risk, and often improve usability for all users — not just those with disabilities.`,variations:[{title:`WCAG 2.1 AA requirements`,code:`The four WCAG principles (POUR):
  Perceivable:   content is available to all senses
  Operable:      UI can be used without a mouse
  Understandable: content and UI are clear
  Robust:        works with assistive technologies

Key AA requirements:
  1.1.1 Non-text content: alt text for images
  1.3.1 Info and relationships: semantic structure
  1.4.1 Use of color: don't rely on color alone
  1.4.3 Contrast: 4.5:1 normal, 3:1 large text
  1.4.4 Resize text: 200% zoom without loss
  2.1.1 Keyboard: all functionality via keyboard
  2.4.3 Focus order: logical tab order
  2.4.7 Focus visible: visible focus indicator
  3.3.1 Error identification: describe errors in text
  3.3.2 Labels: inputs have descriptive labels
  4.1.2 Name/Role/Value: ARIA on custom controls`},{title:`Keyboard navigation patterns`,code:`Tab stops: every interactive element must be reachable
  via Tab key and activatable via Enter or Space.

Key navigation patterns by component:

  Dropdown/Select:
    Enter/Space → open
    Arrow keys  → navigate options
    Enter       → select option
    Escape      → close, return focus to trigger

  Modal dialog:
    Focus trapped inside modal when open
    Escape → close dialog
    Return focus to trigger element on close
    First focusable element receives focus on open

  Tabs:
    Tab → moves into tab list
    Arrow keys → switch between tabs
    Tab → moves to tab panel content

  Accordion:
    Enter/Space → expand/collapse panel
    Arrow keys (optional) → navigate between items

  Data table:
    Arrow keys → cell navigation
    Enter → activate cell link or button
    Home/End → first/last cell in row`},{title:`ARIA usage & screen reader testing`,code:`Core ARIA rules:
  1. Use semantic HTML before ARIA
     <button> not <div role='button'>
  2. Don't change native semantics
     Never role='button' on an <a> with href
  3. Interactive elements need accessible names
     aria-label, aria-labelledby, or visible text
  4. All ARIA is better tested than assumed

Common ARIA patterns:
  aria-label='Close dialog'     — names an icon button
  aria-labelledby='heading-id'  — references a heading
  aria-describedby='hint-id'    — associates hint text
  aria-required='true'          — marks required field
  aria-invalid='true'           — marks validation error
  aria-expanded='true|false'    — disclosure state
  aria-live='polite'            — announces dynamic updates
  aria-busy='true'              — content is loading
  role='alert'                  — announces immediately

Screen reader testing matrix:
  Desktop: NVDA + Firefox (Windows)
  Desktop: JAWS + Chrome (Windows)
  Desktop: VoiceOver + Safari (macOS)
  Mobile:  VoiceOver + Safari (iOS)
  Mobile:  TalkBack + Chrome (Android)`}]},{name:`Documentation`,category:`Governance & Process`,description:`Design system documentation is the living reference that tells teams what exists, how to use it, when to use it, and why decisions were made — making the system discoverable, learnable, and adoptable.`,syntax:`Component docs → Usage guidelines → Decision log → Contribution guide → Changelog.`,notes:`A design system without documentation is a collection of components, not a system. Documentation is a product in itself — it needs a content strategy, an owner, and regular updates. The most common failure mode is documentation that describes the component's props but not when or why to use it. Usage guidelines are more valuable than API references.`,returns:`A self-serve system where teams can adopt, use, and contribute to the design system without requiring constant guidance from the core team.`,variations:[{title:`Component documentation structure`,code:`Every component page should include:

  1. Overview
     What it is, what it does, when to use it
     1–3 sentence summary — write for a new engineer

  2. Live examples
     Interactive preview of all variants
     All states: default, hover, disabled, error
     Light and dark mode if supported

  3. Usage guidelines
     ✓ Do: when and how to use it correctly
     ✗ Don't: common misuse patterns to avoid
     Related components and when to choose each

  4. Anatomy
     Diagram labelling each part of the component
     With names that match design and code

  5. Props / API reference
     All props with type, default, and description

  6. Accessibility
     Keyboard interactions
     ARIA requirements
     Screen reader behaviour

  7. Changelog
     What changed and when, per component`},{title:`Usage guidelines writing guide`,code:`Do / Don't format:

  ✓ Do: Use a primary button for the main action
         on any given screen or section.

  ✗ Don't: Use more than one primary button per
            screen — it dilutes visual hierarchy.

  ✓ Do: Use a ghost/outline button for secondary
         actions alongside a primary button.

  ✗ Don't: Use a ghost button as the only button
            on a screen — it has insufficient weight.

Content principles for documentation:
  — Write in the second person ('you', 'your team')
  — Use active voice ('Use X when…' not 'X should be used…')
  — Explain the WHY, not just the HOW
  — Reference real product examples where possible
  — Update docs in the same PR as the code change
  — Treat outdated docs as bugs`},{title:`Documentation tooling`,code:`Common documentation platforms:

  Storybook:
    Component sandbox + auto-generated prop docs
    Interaction testing, accessibility audits
    Best for: developer-focused component docs
    GitHub: storybook.js.org

  Zeroheight:
    Design-to-doc platform connected to Figma
    Best for: design + dev combined documentation
    Can embed Storybook stories inline

  Supernova:
    Figma-connected with code export
    Best for: teams wanting token and component sync

  Notion / Confluence:
    Flexible wikis for process and decision docs
    Best for: contribution guides, meeting notes,
    design decisions, ADRs (Architecture Decision Records)

Minimum viable doc stack:
  Storybook (component docs)
  + Figma (design specs)
  + README in the repo (contribution guide)
  + CHANGELOG.md (what changed and when)`}]},{name:`Versioning & Releases`,category:`Governance & Process`,description:`A versioning strategy ensures that teams consuming the design system know exactly what changed, whether updates are breaking, and how to migrate — enabling continuous improvement without surprise regressions.`,syntax:`Semantic versioning (MAJOR.MINOR.PATCH) → Changelog → Migration guides → Deprecation notices.`,notes:`The design system is a dependency — treat it like one. Breaking changes must be communicated well in advance, documented with migration paths, and released in major versions only. The fastest way to lose team trust in a design system is to ship breaking changes in a patch release, or to remove a component without warning.`,returns:`Consumer teams can adopt updates with confidence, knowing what changed, whether it's safe to upgrade, and how to handle breaking changes.`,variations:[{title:`Semantic versioning for design systems`,code:`Semantic versioning: MAJOR.MINOR.PATCH

PATCH (e.g. 2.4.1 → 2.4.2):
  — Bug fixes (visual glitch, wrong token value)
  — Documentation updates
  — Dependency security updates
  — No API or visual changes
  → Safe to upgrade without review

MINOR (e.g. 2.4.0 → 2.5.0):
  — New components or variants added
  — New props added (all optional, backwards-compatible)
  — New tokens added
  — Deprecation notices added (not removed)
  → Safe to upgrade; review new additions

MAJOR (e.g. 2.x → 3.0.0):
  — Component API changes (renamed/removed props)
  — Component removed from library
  — Token renamed or removed
  — Visual changes that affect layout or spacing
  → Requires migration; read the upgrade guide first

Rule: Never make breaking changes in PATCH or MINOR.`},{title:`Changelog best practices`,code:`Keep a CHANGELOG.md at the repo root.
Format: Keep a Changelog (keepachangelog.com)

Example entry:
## [3.0.0] — 2026-05-09

### Breaking Changes
- Button: \`variant='ghost'\` renamed to \`variant='outline'\`
  Migration: find-replace across codebase
- Token: \`color-primary\` removed → use \`color-action-primary\`

### Added
- DatePicker component (new)
- Button: new \`loading\` prop with spinner state
- 4 new neutral palette tokens (neutral-925, neutral-950)

### Changed
- Badge: increased default font-size from 11px to 12px
- Modal: default border-radius increased to 16px

### Fixed
- Input: focus ring not visible in Firefox 125
- Tooltip: z-index conflict with sticky nav resolved

### Deprecated
- \`TextInput\` → use \`Input\` (removal in v4.0)

Requirements:
  — One entry per release
  — Breaking changes always listed first
  — Include migration steps for every breaking change`},{title:`Deprecation & migration strategy`,code:`Deprecation lifecycle:
  1. Mark deprecated (MINOR version)
     — Add console.warn in component
     — Mark deprecated in docs with alternative
     — Add to CHANGELOG under Deprecated
     — Minimum 1 major version of notice

  2. Remove (MAJOR version)
     — Include in CHANGELOG under Breaking Changes
     — Provide a codemod if possible
     — Keep migration guide in docs for 1 major version

Deprecation warning pattern (React):
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '[DS v2.5] TextInput is deprecated.'
      + ' Use Input instead. Remove by v3.0.'
    );
  }

Codemods (AST-based automated migration):
  — jscodeshift for JS/TS component migrations
  — postcss for CSS token renames
  — sed scripts for simple string replacements
  Publish codemod scripts in the repo under /codemods/

Migration support commitment:
  — Announce MAJOR releases 4+ weeks in advance
  — Run office hours or migration sessions for teams
  — Track adoption in dashboards (who is on what version)`}]},{name:`Contribution Model`,category:`Governance & Process`,description:`A contribution model defines how teams outside the core design system team propose, design, build, and submit new components and changes — balancing autonomy and quality, and preventing the system from becoming a bottleneck.`,syntax:`Request → RFC → Design review → Build → Review → Release → Documentation.`,notes:`Without a clear contribution model, one of two failure modes occurs: (1) the system becomes a bottleneck — everything must go through the core team, slowing product teams; or (2) the system loses coherence — anyone can add anything, resulting in an inconsistent, bloated library. The contribution model is the governance mechanism that prevents both.`,returns:`A healthy system that grows systematically with input from the whole organisation while maintaining quality and consistency standards.`,variations:[{title:`Contribution tiers`,code:`Tier 1 — Fixes and enhancements (core team only):
  Bug fixes, token updates, documentation improvements
  Process: direct PR, single reviewer required

Tier 2 — New variants / props (product teams):
  Adding a variant to an existing component
  Process:
    1. Open RFC issue with use-case and design
    2. Core team reviews for system fit
    3. Approved → product team builds + tests
    4. Core team reviews PR
    5. Merged and documented

Tier 3 — New components (product teams + core):
  A component that does not exist in the system
  Process:
    1. Check: is it used in 3+ places across the product?
       (Rule of three — don't abstract prematurely)
    2. Open RFC with design spec and rationale
    3. Design review from system team
    4. Build with full state coverage
    5. Accessibility audit required
    6. Documentation required before merge
    7. Core team review and approval

Tier 4 — Architectural changes (core team only):
  Token structure, build tooling, framework changes
  Process: ADR (Architecture Decision Record) + RFC`},{title:`RFC (Request for Comment) template`,code:`RFC: New Component / Change Proposal

Title:       [RFC] Add DateRangePicker component
Author:      Sarah Chen, Booking team
Date:        2026-05-09
Status:      Draft | Open for comment | Accepted | Rejected

Problem:
  3 product teams have built custom date range pickers
  with different behaviour and accessibility quality.
  This creates inconsistent UX and duplicated effort.

Proposed solution:
  Add a DateRangePicker to the design system.

Design spec: [Figma link]
Existing implementations: [links to 3 product versions]

API proposal:
  <DateRangePicker
    startDate: Date | null
    endDate: Date | null
    onChange: (range: DateRange) => void
    minDate?: Date
    maxDate?: Date
    disabledDates?: Date[]
  />

Open questions:
  — Should this include time selection?
  — Which calendar library should it use?

Alternatives considered:
  — Wrapping react-datepicker (rejected: too opinionated)
  — Using a third-party headless component (preferred)`},{title:`Quality gates for contributions`,code:`Before a component is accepted into the system:

Design requirements:
  ✓ All states designed (default, hover, focus,
    active, disabled, loading, error, empty)
  ✓ Both light and dark mode
  ✓ All breakpoints / responsive behaviour
  ✓ Figma component with auto-layout and variants
  ✓ Documented in Figma with usage annotations

Code requirements:
  ✓ Semantic HTML structure
  ✓ Full TypeScript types
  ✓ Responsive implementation
  ✓ All states implemented
  ✓ Keyboard navigation correct
  ✓ ARIA attributes correct
  ✓ Unit/interaction tests pass
  ✓ Visual regression snapshots updated
  ✓ No prop types (use TypeScript interfaces)

Documentation requirements:
  ✓ Storybook story for every variant and state
  ✓ Usage guidelines (Do / Don't)
  ✓ Accessibility notes
  ✓ Props table complete and accurate
  ✓ Added to CHANGELOG under Added

Skipping any of the above = not ready for system`}]},{name:`Design–Dev Handoff`,category:`Governance & Process`,description:`Design–development handoff is the process by which design decisions, specifications, and components move from design tools into production code — with enough clarity that engineers can implement correctly without constant design involvement.`,syntax:`Tokens synced → Figma components annotated → Storybook linked → Implementation guide provided.`,notes:`The best handoff is no handoff. When design tokens flow automatically from Figma to code, and components in Figma match exactly what exists in Storybook, handoff becomes a review rather than a translation exercise. The more the design tool and codebase share a vocabulary (same token names, same component names), the less is lost in translation.`,returns:`Faster, more accurate implementation with fewer back-and-forth cycles, fewer deviations from design intent, and a shared vocabulary between designers and engineers.`,variations:[{title:`Token sync workflow`,code:`Ideal automated token workflow:

  1. Designer sets tokens in Figma Variables or Token Studio
  2. Tokens exported as JSON (via plugin or CI)
  3. Style Dictionary transforms JSON to:
     — CSS custom properties (:root { --token: value })
     — JS/TS constants (tokens.js)
     — iOS Swift tokens
     — Android Kotlin tokens
  4. Engineer imports tokens from the design system package
  5. PR to update tokens triggers visual regression tests
  6. Approved → merged → released as PATCH or MINOR

Token source of truth:
  Figma → code (Figma is the source, code is the output)
  NOT the reverse — don't define tokens in code first

Sync cadence:
  Token changes: sync on every design change (automated)
  Component changes: sync at sprint boundaries
  Major redesigns: sync on explicit release schedule

Tools: Token Studio, Specify, Supernova, Style Dictionary`},{title:`Figma component handoff standards`,code:`Every Figma component handed off should have:

  1. Auto-layout
     — All frames use auto-layout (not manual placement)
     — Correct resizing behaviour (hug / fill / fixed)

  2. Tokens applied
     — All colors, sizes, and spacing from token library
     — No hard-coded values in component styles

  3. Variants defined
     — All states as Figma variants (not separate frames)
     — Named to match code: variant=primary, state=hover

  4. Annotations
     — Interaction notes (what happens on click/hover)
     — Responsive behaviour noted
     — Edge cases flagged (truncation, overflow, empty)

  5. Linked to Storybook
     — Figma component links to its Storybook story
     — (Figma Storybook Connect plugin or manual links)

  6. Redline specs (if not using token handoff)
     — Spacing values, sizes, all from the design token names
     — Engineers should see token names, not raw values`},{title:`Implementation checklist & review`,code:`Design review checklist (engineer → designer):

  Visual fidelity:
  ✓ Typography matches spec (size, weight, line-height)
  ✓ Colors match design tokens exactly
  ✓ Spacing matches the design (in px and tokens)
  ✓ Border radius matches the shape system
  ✓ Icons are the correct size and style
  ✓ Shadows match the elevation system

  Behaviour:
  ✓ Hover state matches design
  ✓ Focus ring is visible and correct style
  ✓ Active/pressed state implemented
  ✓ Disabled state matches design
  ✓ Loading state implemented
  ✓ Animation/transition matches motion spec

  Responsiveness:
  ✓ Layout correct at all defined breakpoints
  ✓ Text doesn't truncate unexpectedly
  ✓ Touch targets are 44×44px minimum

  Tools that reduce review burden:
    Storybook Design addon — Figma frame beside story
    Chromatic — visual diff review for component changes
    Percy — screenshot-based visual regression testing`}]}],a={Foundation:`bg-primary-100 text-primary-700`,"Visual Language":`bg-violet-100 text-violet-700`,"Component Architecture":`bg-amber-100 text-amber-700`,"Governance & Process":`bg-emerald-100 text-emerald-700`};function o(){return(0,r.jsx)(n,{items:i,badgeColors:a,legendLabel:`Category`,labels:t})}export{o as default};