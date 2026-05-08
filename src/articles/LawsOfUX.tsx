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
  // ── Cognitive Load ────────────────────────────────────────────────────────
  {
    name: "Hick's Law", category: "Cognitive Load",
    description: "The time it takes to make a decision increases logarithmically with the number and complexity of choices available. Named after British psychologists William Edmund Hick and Ray Hyman.",
    syntax: "RT = a + b × log₂(n)  — where n = number of choices.",
    notes: "Hick's Law does not mean 'always fewer choices'. It means that when speed of decision matters, reduce and simplify options. Complex tasks may legitimately require many choices — break them into steps.",
    returns: "Faster decision-making and reduced cognitive overload when choices are appropriately constrained.",
    variations: [
      { title: "Design applications", code: "✓ Limit primary navigation to 5–7 items\n✓ Use progressive disclosure — show advanced options on demand\n✓ Break complex forms into multiple focused steps\n✓ Highlight a recommended option ('Most popular')\n✓ Use smart defaults to pre-select the most common choice\n✓ Remove rarely used features from primary UI" },
      { title: "Good vs bad examples", code: "Good:\n  Netflix categorises thousands of films into a few\n  genre rows — you choose a genre, then a film\n\n  Dropbox's plan page highlights one option as\n  'Recommended' to reduce decision paralysis\n\nBad:\n  A settings panel with 40 ungrouped options\n  A registration form that asks for everything at once\n  A navigation menu with 15 top-level items" },
      { title: "Common misapplication", code: "✗ Removing choices the user genuinely needs\n  — Fewer choices is not always better\n  — A power user may need all the options\n\n✗ Hiding options so far away they can't be found\n  — The goal is reduced perceived complexity,\n    not inaccessibility\n\nRule: Reduce the number of choices visible at once,\nnot the total capability of the product." },
    ],
  },
  {
    name: "Fitts's Law", category: "Cognitive Load",
    description: "The time required to move to a target is a function of the target's size and the distance to it. Larger, closer targets are faster to acquire. Formulated by psychologist Paul Fitts in 1954.",
    syntax: "MT = a + b × log₂(2D/W)  — D = distance, W = target width.",
    notes: "The corners and edges of a screen are infinitely large in Fitts's terms because the cursor stops there automatically. This is why macOS puts the menu bar at the top edge rather than inside windows.",
    returns: "Faster, less error-prone interactions by sizing and positioning interactive targets appropriately.",
    variations: [
      { title: "Design applications", code: "✓ Make buttons large enough — 44×44px minimum (iOS HIG)\n✓ Place primary actions close to the user's current focus\n✓ Use screen edges for frequently accessed controls\n✓ Increase tap target size beyond the visual element\n✓ Keep destructive actions away from primary actions\n✓ Place related actions near each other to reduce travel" },
      { title: "Good vs bad examples", code: "Good:\n  macOS menu bar fixed to the top screen edge\n  — the cursor stops at the edge, making it infinitely tall\n\n  Mobile floating action button (FAB) in the bottom-right\n  — large, reachable with the thumb, close to content\n\nBad:\n  Tiny 'X' close button on a mobile modal\n  'Delete' button directly next to 'Save'\n  Pagination arrows that are 16×16px" },
      { title: "Touch-specific implications", code: "Touch has a wider error margin than a mouse cursor.\nApple HIG minimum: 44 × 44 pt\nGoogle Material: 48 × 48 dp\n\nBeyond size, consider:\n  • Thumb reach zones on mobile\n    (bottom half of screen = easy, top = stretch)\n  • Spacing between adjacent targets\n    (8px minimum between tappable elements)\n  • Hover states don't exist on touch — design for tap" },
    ],
  },
  {
    name: "Miller's Law", category: "Cognitive Load",
    description: "The average person can hold only 7 (± 2) items in their working memory at one time. Published by cognitive psychologist George Miller in 1956.",
    syntax: "Working memory capacity ≈ 7 ± 2 chunks of information.",
    notes: "The key insight is 'chunking' — grouping individual items into meaningful units expands effective capacity. A phone number like 07911123456 is 11 digits; 0791 112 3456 is three chunks.",
    returns: "Reduced cognitive overload and improved recall when content is chunked into meaningful groups.",
    variations: [
      { title: "Design applications", code: "✓ Group navigation items into logical categories\n✓ Break long forms into sections with clear headings\n✓ Use visual chunking — whitespace, cards, borders\n✓ Limit onboarding steps to 5–7 per screen\n✓ Format phone numbers, IBANs, and card numbers with spaces\n✓ Use numbered steps for multi-stage processes\n✓ Show only 5–7 items per list before pagination" },
      { title: "Chunking examples", code: "Without chunking (hard to remember):\n  Credit card: 4539578763621486\n\nWith chunking (easy to remember):\n  Credit card: 4539 5787 6362 1486\n\nWithout chunking:\n  Navigation: About, Services, Team, Blog, Work,\n              Press, Careers, Contact, Privacy, Terms\n\nWith chunking:\n  Company (About, Team, Press)\n  Work (Services, Portfolio)\n  Connect (Blog, Careers, Contact)" },
      { title: "Miller's Law ≠ always 7", code: "Modern research (Cowan, 2001) suggests true\nworking memory capacity is closer to 4 ± 1 chunks.\n\nThe '7 ± 2' figure was for sequential recall tasks.\nFor design, the practical guideline is:\n\n  • Aim for 5 or fewer primary navigation items\n  • Never show more than 9 without grouping\n  • The exact number matters less than the grouping\n  • Meaningful chunks beat arbitrary lists" },
    ],
  },
  {
    name: "Tesler's Law", category: "Cognitive Load",
    description: "Also known as the Law of Conservation of Complexity — every application has an inherent amount of complexity that cannot be eliminated, only transferred between the system and the user.",
    syntax: "Total complexity = constant. Reduce user complexity → increase system complexity.",
    notes: "Complexity cannot be destroyed — it can only be moved. If you simplify the UI, the engineer or designer must absorb that complexity elsewhere. The goal is to keep complexity on the system side, not the user side.",
    returns: "A simpler user experience achieved by deliberately shifting complexity into the system, not by pretending it doesn't exist.",
    variations: [
      { title: "Design applications", code: "✓ Auto-detect country from IP — don't make users choose\n✓ Smart defaults — pre-fill forms from known data\n✓ Calendar 'smart scheduling' absorbs time-zone complexity\n✓ 'One-click purchase' (Amazon) — system handles all steps\n✓ Auto-save — user never needs to think about saving\n✓ Email client threading — system groups, user just reads" },
      { title: "Good vs bad examples", code: "Good:\n  Google Maps calculates the best route automatically\n  — the user just says 'take me to X'\n  System absorbs: real-time traffic, route options, ETAs\n\n  Gmail's Smart Reply generates response options\n  — user taps one instead of composing from scratch\n\nBad:\n  Asking users to manually enter their delivery address\n  when they've already entered it three times before\n\n  Making users manage their own data export format\n  when the system could just pick the right one" },
      { title: "When to break the rule", code: "Some complexity should stay with the user:\n\n  Financial decisions — users should consciously\n  confirm transfers, not have them auto-completed\n\n  Irreversible actions — deleting data should\n  require deliberate, conscious steps\n\n  Personalisation — users often want control over\n  their own settings and preferences\n\nRule: Automate when the user doesn't care.\n      Ask when the decision is meaningful to them." },
    ],
  },
  {
    name: "Occam's Razor", category: "Cognitive Load",
    description: "Among competing solutions that achieve the same goal, the simplest one — the one with the fewest assumptions and components — is usually correct. Attributed to 14th-century friar William of Ockham.",
    syntax: "Prefer the simplest solution that fully meets the user's need.",
    notes: "In UX, Occam's Razor is a design principle, not a rigid rule. It argues against unnecessary elements — every feature, every field, every screen added without clear evidence of need makes the product worse.",
    returns: "A leaner, more focused product that is easier to learn, use, and maintain.",
    variations: [
      { title: "Design applications", code: "✓ Remove any element that does not serve the user's goal\n✓ Prefer one clear call-to-action over multiple competing ones\n✓ Avoid adding features to 'cover all bases'\n✓ Question every form field — is it truly necessary?\n✓ Resist adding more onboarding steps to explain complexity\n  (simplify the product instead)\n✓ 'What can we remove?' before 'What can we add?'" },
      { title: "Signs you're violating it", code: "✗ The homepage has 4 primary calls-to-action\n✗ The onboarding has 12 steps to explain a simple product\n✗ There is a 'misc' or 'other' section in the navigation\n✗ The settings page has options no one has ever used\n✗ The form collects data 'just in case we need it'\n✗ There are three ways to do the same thing\n   with no clear guidance on which to use" },
      { title: "Applied to design decisions", code: "When evaluating two design options that solve\nthe same user problem equally well:\n\n  Option A: Requires learning a new interaction pattern\n  Option B: Uses a familiar pattern with one extra step\n\n  → Choose B. The extra step is simpler than the\n    cognitive load of learning something new.\n\nSimplicity in UX is not about fewer pixels —\nit's about fewer decisions, fewer surprises,\nand fewer things that can go wrong." },
    ],
  },

  // ── Gestalt Principles ────────────────────────────────────────────────────
  {
    name: "Law of Proximity", category: "Gestalt Principles",
    description: "Objects that are close to each other are perceived as a group, regardless of their shape, colour, or size. One of the foundational Gestalt principles of visual perception.",
    syntax: "Nearby elements → perceived as related. Distant elements → perceived as separate.",
    notes: "Proximity is the most powerful grouping cue available. It works without needing borders, boxes, or shared colour. Whitespace is as meaningful as content — it communicates structure.",
    returns: "Clear visual groupings that help users understand relationships between elements without additional visual decoration.",
    variations: [
      { title: "Design applications", code: "✓ Place labels immediately above or beside their inputs\n✓ Group related form fields with shared whitespace\n✓ Keep a button close to the content it acts on\n✓ Use tighter spacing within a card, looser between cards\n✓ Position captions directly below their image\n✓ Keep navigation items for the same section clustered\n✓ Use proximity to separate primary from secondary actions" },
      { title: "Good vs bad examples", code: "Good:\n  A form where 'First name' and 'Last name' sit close\n  together with more space above the next section\n  — User understands they belong to the same group\n\n  A card component with tight internal spacing\n  and generous margins between cards\n\nBad:\n  Labels equally spaced from both the field above\n  and the field below — ambiguous which they belong to\n\n  A 'Delete' button the same distance from 'Cancel'\n  as it is from 'Save' — relationship is unclear" },
      { title: "Proximity + whitespace", code: "Whitespace communicates meaning:\n\n  Tight spacing (4–8px):   Elements are related\n  Medium spacing (16–24px): Elements are in the same group\n  Large spacing (40–64px):  Elements are separate sections\n\nCommon mistake:\n  Equal spacing between all elements on a page\n  — Everything looks equally unrelated\n  — The grid is visible but the hierarchy is not\n\nFix: vary spacing intentionally to reflect structure" },
    ],
  },
  {
    name: "Law of Similarity", category: "Gestalt Principles",
    description: "Elements that share visual characteristics — shape, colour, size, texture, or orientation — are perceived as related or belonging to the same group, even if they are not physically close.",
    syntax: "Shared visual attributes → perceived as belonging together.",
    notes: "Similarity and proximity work together. When elements look alike, users assume they behave alike. Violating similarity — making something look different — signals that it is different. Use this intentionally.",
    returns: "Intuitive groupings and clear differentiation between interactive and non-interactive elements.",
    variations: [
      { title: "Design applications", code: "✓ Use consistent button styles for all primary actions\n✓ Use the same colour for all clickable links\n✓ Distinguish interactive elements from static content visually\n✓ Use a different style for destructive vs constructive actions\n✓ Apply consistent card styles to all items of the same type\n✓ Use icon families consistently — don't mix icon styles" },
      { title: "Good vs bad examples", code: "Good:\n  All text links are blue and underlined\n  — users know immediately what is clickable\n\n  Danger buttons are red; primary buttons are blue\n  — colour signals intent, not just aesthetics\n\nBad:\n  Some clickable items look like plain text\n  — users don't know what is interactive\n\n  Mixing filled and outlined icons with no system\n  — similar elements look inconsistent without reason" },
      { title: "Exceptions: breaking similarity", code: "Deliberately breaking similarity draws attention:\n\n  Von Restorff Effect: one different item is remembered\n  — Use for 'Recommended' plan or featured product\n\n  A different-coloured button signals a different purpose\n  — Primary (blue) vs Destructive (red) vs Secondary (grey)\n\nRule: Be consistent within a category, distinct across categories.\nEvery visual difference should carry semantic meaning." },
    ],
  },
  {
    name: "Law of Common Region", category: "Gestalt Principles",
    description: "Elements enclosed within a shared boundary — a border, background colour, or shadow — are perceived as belonging together, even if they are not particularly close to each other.",
    syntax: "Shared enclosure → perceived as a group.",
    notes: "Common region is how cards, panels, modals, and tooltips communicate grouping. It is especially useful when proximity alone is not sufficient — for example, when screen density is high.",
    returns: "Clear, scannable groupings that allow users to understand content structure at a glance.",
    variations: [
      { title: "Design applications", code: "✓ Use cards to group related content in a feed\n✓ Use a modal background to separate a task from the page\n✓ Use a panel or sidebar background to group navigation\n✓ Use a subtle background fill to group form sections\n✓ Use a tooltip container to group label + description\n✓ Use tab panels to group content that switches together" },
      { title: "Common region techniques", code: "Border:           Explicit container edge (box or card border)\nBackground fill:  Subtle colour difference (grey panel, white card)\nShadow / elevation: Implies a surface layer above the page\nRounded corners:  Softens the container, implies a card\nWhitespace alone: Proximity-based, no hard boundary\n\nHierarchy of strength (strongest → subtlest):\n  Modal overlay > Card border > Background fill > Whitespace" },
      { title: "Good vs bad examples", code: "Good:\n  A dashboard where each metric sits inside its own card\n  — users instantly see what belongs together\n\n  A multi-section form where each section has a\n  light background fill and a section heading\n\nBad:\n  A page where related items are visually separated\n  by the same whitespace as unrelated items\n  — common region could resolve the ambiguity\n\n  Overusing cards for everything\n  — when everything is enclosed, nothing stands out" },
    ],
  },
  {
    name: "Law of Prägnanz", category: "Gestalt Principles",
    description: "People interpret ambiguous or complex visual information as the simplest, most regular form possible. The mind prefers order, symmetry, and simplicity over complexity. Also called the Law of Good Figure or Law of Simplicity.",
    syntax: "Ambiguous input → simplest stable interpretation.",
    notes: "Designers exploit Prägnanz to create logos, icons, and illustrations that are instantly recognised even when built from minimal shapes. Complex designs fight against this instinct and require more cognitive effort.",
    returns: "Instantly recognisable, memorable visuals that require minimal cognitive effort to interpret.",
    variations: [
      { title: "Design applications", code: "✓ Use simple, geometric icon shapes over complex illustrations\n✓ Reduce visual noise — the simpler the form, the faster the read\n✓ Use familiar patterns — users will interpret them as expected\n✓ Logos and symbols work best when reducible to basic shapes\n✓ Avoid decorative complexity that fights with the content\n✓ When in doubt, simplify — users fill in the gaps" },
      { title: "Examples in logos and icons", code: "FedEx logo: negative space between E and x = an arrow\n  — The mind 'completes' the implied shape\n\nAmazon logo: arrow from 'a' to 'z'\n  — Simple arc read as a smile + 'everything A to Z'\n\nApple logo: a circle with a bite taken out\n  — Instantly read as an apple, not an abstract shape\n\nWWF panda: minimal black and white shapes\n  — Read as a panda despite being mostly white space" },
      { title: "Implications for UI complexity", code: "Users approach a new screen with a Prägnanz instinct:\n  → They will try to find the simplest mental model\n  → Novel patterns require more effort to interpret\n  → Familiar patterns are processed almost automatically\n\nConsequences:\n  • Use standard UI patterns before inventing new ones\n  • When you must be novel, be very deliberate and clear\n  • Reduce visual elements until you can remove no more\n  • Test with users — what seems simple to you may not be" },
    ],
  },
  {
    name: "Law of Continuity", category: "Gestalt Principles",
    description: "Elements arranged along a line, curve, or implied path are perceived as more related to each other than elements that are not. The eye follows the smoothest path through a visual composition.",
    syntax: "Aligned or curved elements → perceived as a sequence or group.",
    notes: "Continuity guides the eye through a layout. A horizontal row implies a sequence; a vertical list implies a hierarchy. Breaking the line — with whitespace or a visual separator — signals a category change.",
    returns: "Intuitive reading paths and clear visual sequences that guide users through content naturally.",
    variations: [
      { title: "Design applications", code: "✓ Align items in a row to imply they are part of a sequence\n✓ Use a horizontal progress bar to suggest steps ahead\n✓ Use a timeline layout for chronological content\n✓ Align the eye from CTA to supporting content with layout\n✓ Use a diagonal or curve to connect before/after states\n✓ Ensure reading flow follows natural left-to-right, top-to-bottom\n✓ Use separator lines only to break continuity intentionally" },
      { title: "Good vs bad examples", code: "Good:\n  A checkout stepper: Step 1 → Step 2 → Step 3\n  — The horizontal line implies a path to completion\n\n  A pricing table where features align in rows\n  — The eye travels horizontally to compare plans\n\nBad:\n  A card grid where items are different heights\n  — The eye has no clear path and scanning is harder\n\n  Navigation items that don't align to a consistent edge\n  — The implied line is broken, making the group feel unstable" },
      { title: "Continuity and carousels", code: "Carousels and horizontal scrolling exploit continuity:\n  → A partially visible card signals 'more to the right'\n  → The cut-off creates an implied continuation\n  → Users follow the visual path to swipe or scroll\n\nDesign cue:\n  Always show part of the next card in a horizontal scroll\n  to signal that more content exists along that axis.\n  A fully visible last card implies there is nothing more." },
    ],
  },

  // ── Memory & Attention ────────────────────────────────────────────────────
  {
    name: "Von Restorff Effect", category: "Memory & Attention",
    description: "When multiple similar objects are present, the one that is visually distinct from the rest is the most likely to be remembered. Also known as the Isolation Effect. Identified by psychiatrist Hedwig von Restorff in 1933.",
    syntax: "Visually distinct element → disproportionate attention and recall.",
    notes: "The effect is powerful but fragile — if too many elements are made distinct, none stands out. Reserve differentiation for the one thing that matters most. Used poorly, it creates visual noise and anxiety.",
    returns: "Focused user attention on the most important element, and stronger memory of highlighted content.",
    variations: [
      { title: "Design applications", code: "✓ Highlight one pricing plan as 'Most popular'\n✓ Use a filled primary button vs outlined secondary buttons\n✓ Use colour sparingly — one accent, not five\n✓ Feature one item in a list with a badge or banner\n✓ Use animation or motion on one key element only\n✓ Make the primary CTA visually distinct from all others\n✓ Use a contrasting background on a featured card" },
      { title: "Good vs bad examples", code: "Good:\n  Three pricing plans: Basic, Pro (highlighted), Enterprise\n  — 'Pro' has a coloured border, badge, and bold label\n  — Users immediately see it as the recommended option\n\n  One red 'Delete' button in a row of grey actions\n  — Stands out as dangerous; draws attention to the risk\n\nBad:\n  Every button on the page is a different colour\n  — Nothing stands out because everything does\n\n  Five badges on five different cards\n  — The isolation effect is cancelled out" },
      { title: "Accessibility consideration", code: "Von Restorff differentiation must not rely on\ncolour alone — 8% of men have colour vision deficiency.\n\nCombine colour with:\n  • Shape or icon (a star, a crown, a badge)\n  • Size (slightly larger card or button)\n  • Typography (bold label, larger heading)\n  • Position (first in list, centred on page)\n  • Motion (subtle pulsing or entrance animation)\n\nTest your design in greyscale to verify distinction\nsurvives without colour." },
    ],
  },
  {
    name: "Serial Position Effect", category: "Memory & Attention",
    description: "Users are most likely to remember items at the beginning (primacy effect) and end (recency effect) of a list or sequence. Items in the middle are recalled least reliably.",
    syntax: "First items → primacy (stored in long-term memory). Last items → recency (still in working memory).",
    notes: "This effect is why the most important navigation items should go first or last — never bury them in the middle. It also explains why 'Save' and 'Cancel' belong at the bottom of a form, not the middle.",
    returns: "Better recall of critical items when they are placed at the start or end of sequences, lists, and navigation.",
    variations: [
      { title: "Design applications", code: "✓ Place the most important navigation item first or last\n✓ Lead with the strongest selling point on a landing page\n✓ End a user flow on a high — a success state, not a form\n✓ Put the primary CTA at the end of content, not in the middle\n✓ Start an onboarding flow with the most valuable step\n✓ In a list of options, put the recommended one first\n✓ End emails and notifications with a clear action" },
      { title: "Navigation examples", code: "Standard navigation order:\n  [Most important] [Secondary] [Tertiary] [Least important]\n  — Wrong: important item buried in the middle\n\n  Amazon: [Deals] [Prime] ... [Cart] [Account]\n  — High-value items at start and end\n\n  App bottom tab bar:\n  [Home] [Search] [Explore] [Library] [Profile]\n  — Home (start) and Profile (end) get most recall" },
      { title: "Applied to forms and flows", code: "Onboarding:\n  Start with the most exciting, rewarding step\n  End with a clear moment of achievement\n  — First and last impressions define the memory of the experience\n\nCheckout:\n  End on a positive confirmation screen\n  — The last screen is disproportionately remembered\n  — A poor 'order confirmed' screen undermines a good checkout\n\nError states:\n  Never end a flow on an error with no resolution\n  — The error becomes the dominant memory" },
    ],
  },
  {
    name: "Zeigarnik Effect", category: "Memory & Attention",
    description: "People remember uncompleted or interrupted tasks significantly better than completed ones. The open loop created by an unfinished task keeps it in working memory until it is resolved.",
    syntax: "Unfinished task → stays in working memory → motivates completion.",
    notes: "The effect is a double-edged sword. In product design it drives completion (progress bars, streaks). But too many open loops — too many notifications, unread badges — creates anxiety and overwhelm.",
    returns: "Higher task completion rates when users are shown their progress and reminded of what remains.",
    variations: [
      { title: "Design applications", code: "✓ Show profile completion progress bars ('70% complete')\n✓ Use course progress indicators in e-learning\n✓ Save partially completed forms and remind users to return\n✓ Use streak mechanics in habit apps (Duolingo, Wordle)\n✓ Show 'X items left' in task management\n✓ Send 'You left something in your cart' emails\n✓ Show chapter progress in reading and podcast apps" },
      { title: "Good vs bad examples", code: "Good:\n  LinkedIn: 'Your profile is 60% complete'\n  — The open loop motivates users to add more information\n\n  Duolingo streak counter\n  — Breaking a 30-day streak feels like a loss\n  — Users return daily to keep the loop closed\n\nBad:\n  An app with 47 unread notifications\n  — Too many open loops cause anxiety, not motivation\n  — Users ignore or disable notifications entirely\n\n  A form that loses progress on navigation away\n  — The loop closes with frustration, not completion" },
      { title: "The anxiety risk", code: "Too many open loops → cognitive anxiety\n\nBadge fatigue:\n  Unread counts that users cannot realistically clear\n  → Users develop notification blindness\n  → Or they leave the product to avoid anxiety\n\nDesign principle:\n  Create open loops only for tasks the user values\n  and only when completion is genuinely achievable.\n  An open loop with no clear path to closure is\n  just stress, not motivation." },
    ],
  },
  {
    name: "Peak-End Rule", category: "Memory & Attention",
    description: "People judge an experience almost entirely by how they felt at its most intense moment (the peak) and at the end, regardless of how good or bad the rest of the experience was. Identified by psychologist Daniel Kahneman.",
    syntax: "Memory of experience ≈ (peak emotion + final emotion) ÷ 2.",
    notes: "Duration neglect means that a short bad experience with a good ending is remembered more positively than a long good experience with a bad ending. The last impression carries enormous weight.",
    returns: "More positive overall memory of a product experience when the peak moment and the ending are intentionally designed to be positive.",
    variations: [
      { title: "Design applications", code: "✓ Design the most emotionally significant moment with care\n✓ End every key flow on a positive, celebratory note\n✓ Make the success state after form submission feel rewarding\n✓ Use micro-animations to mark task completion (confetti, tick)\n✓ Acknowledge the user's effort at the end of a long flow\n✓ Recover gracefully from errors — make the resolution feel good\n✓ Never end a session on a warning, an error, or a dead end" },
      { title: "Peak moment examples", code: "Onboarding peak:\n  The moment the user first gets value from the product\n  — Make it fast, clear, and satisfying\n  — Remove every step that delays this moment\n\nE-commerce peak:\n  The confirmation screen after purchase\n  — Celebrate the decision: 'Great choice!'\n  — Show what happens next — reduce anxiety\n\nHealthcare app peak:\n  Completing a health assessment or hitting a goal\n  — Acknowledge the achievement meaningfully" },
      { title: "End state design", code: "Common failures at the end of a flow:\n\n✗ Empty confirmation ('Your form was submitted.')\n  — No emotion, no acknowledgement, no next step\n\n✗ Redirecting to a dashboard full of empty states\n  — First experience feels like failure, not success\n\n✗ Ending on an upsell immediately after purchase\n  — Sours the peak emotion of completing the purchase\n\nGood endings:\n  ✓ Personal ('Thanks, Sarah — we'll be in touch by Tuesday.')\n  ✓ Visual reward (animation, illustration, progress shown)\n  ✓ Clear next step ('While you wait, you could...')" },
    ],
  },

  // ── Behaviour & Motivation ────────────────────────────────────────────────
  {
    name: "Goal-Gradient Effect", category: "Behaviour & Motivation",
    description: "People accelerate their effort as they get closer to completing a goal. The nearer the finish line, the more motivated they are to reach it. First described by behavioural psychologist Clark Hull in 1934.",
    syntax: "Perceived progress → increased motivation → faster completion.",
    notes: "The key word is 'perceived' progress. Even artificial head-starts (like a loyalty card that comes pre-stamped with 2 of 10) significantly increase completion rates by making the goal feel closer.",
    returns: "Higher completion rates for multi-step processes when users can see their progress and the end goal.",
    variations: [
      { title: "Design applications", code: "✓ Show a progress bar in multi-step forms and onboarding\n✓ Label steps ('Step 2 of 4') to signal proximity to the end\n✓ Use loyalty cards with artificial head-starts\n✓ Show 'X more to go' as the end nears\n✓ Display a percentage complete on profile or course pages\n✓ Animate progress bars filling up to reinforce progress\n✓ Celebrate milestones before the final goal (50%, 75%)" },
      { title: "Good vs bad examples", code: "Good:\n  LinkedIn progress bar: 'Your profile is 80% complete'\n  — Users are motivated by proximity to 100%\n\n  Coffee stamp card: 10 stamps for a free coffee\n  Pre-stamp 2: the user starts at 20% complete\n  — Completion rates increase significantly vs starting at 0\n\nBad:\n  A 12-step onboarding with no progress indicator\n  — Users don't know how close the end is\n  — Drop-off rates increase at every step\n\n  Progress bar that jumps from 10% to 90%\n  — Feels dishonest; undermines trust" },
      { title: "Application in checkout flows", code: "Checkout steps:\n  Basket → Delivery → Payment → Review → Confirmed\n\n  Show the step indicator throughout\n  Increase visual weight of the current step\n  Show remaining steps getting fewer\n\n  At 'Review':\n  'Almost done — just one step to go!'\n  → Goal-gradient motivation is at its peak\n  → Abandonment rates drop significantly near the end" },
    ],
  },
  {
    name: "Doherty Threshold", category: "Behaviour & Motivation",
    description: "Productivity and engagement increase dramatically when a computer and user interact at a pace of under 400 milliseconds. Delays beyond this threshold break flow and reduce task commitment.",
    syntax: "Response time < 400ms → user stays in flow. > 400ms → user disengages.",
    notes: "Walter Doherty and Ahrvind Thadani (IBM, 1982) found that sub-400ms response time increased computer usage dramatically. Beyond 1 second, users lose focus. Beyond 10 seconds, they switch tasks or leave.",
    returns: "Higher engagement, task completion, and perceived product quality when response times are below the 400ms threshold.",
    variations: [
      { title: "Response time guidelines", code: "< 100ms:  Instant — feels like direct manipulation\n           (button press, toggle, checkbox)\n\n100–300ms: Fast — user perceives a reaction\n           (page transition, opening a menu)\n\n300–400ms: Threshold — still feels connected\n           (search results, content loading)\n\n400ms–1s:  Slow — noticeable delay; add a spinner\n\n1–10s:     Frustrating — progress indicator required;\n           users will multitask or lose thread\n\n> 10s:     Unacceptable — users abandon the task" },
      { title: "Design applications", code: "✓ Optimistic UI updates — show the result immediately,\n  confirm in the background (like iOS likes/follows)\n✓ Skeleton screens instead of blank loading states\n✓ Lazy loading — load content as the user scrolls\n✓ Prefetch the next likely page or screen\n✓ Debounce search inputs (wait 200ms after typing stops)\n✓ Show a spinner for anything > 400ms\n✓ Show a progress bar for anything > 1 second\n✓ Cache frequently accessed data locally" },
      { title: "Perceived vs actual performance", code: "You can improve perceived performance without\nimproving actual performance:\n\n  Optimistic UI:\n    Show the liked/saved state immediately\n    Revert on failure (rare, handle gracefully)\n\n  Skeleton screens:\n    Users perceive them as faster than spinners\n    because content layout is already visible\n\n  Progress bars with percentage:\n    Perceived as faster than indeterminate spinners\n\n  Early content first:\n    Load and show text before images\n    — Something to read while images load" },
    ],
  },
  {
    name: "Jakob's Law", category: "Behaviour & Motivation",
    description: "Users spend most of their time on other products. They prefer your product to work the same way as the products they already know. Formulated by UX pioneer Jakob Nielsen.",
    syntax: "Users' existing mental models → set expectations for your product.",
    notes: "This is not an argument against innovation. It is an argument for deliberate innovation — only deviate from convention when the benefit to the user clearly outweighs the cost of breaking their mental model.",
    returns: "A lower learning curve and fewer errors when familiar patterns and conventions are respected.",
    variations: [
      { title: "Design applications", code: "✓ Use platform conventions (iOS/Android/Web standards)\n✓ Place the logo top-left and link it to the homepage\n✓ Use a hamburger menu for mobile navigation\n✓ Blue underlined text = link (or clearly styled alternative)\n✓ Search icon (magnifying glass) for search\n✓ Cart icon (shopping trolley) for e-commerce basket\n✓ Use expected keyboard shortcuts (Ctrl+Z, Ctrl+S)\n✓ Form fields above their submit button, never below" },
      { title: "When to follow convention", code: "Follow convention when:\n  • The pattern exists across your users' most-used products\n  • The task is high-frequency and benefits from automaticity\n  • The cost of re-learning is high (enterprise tools, forms)\n  • Accessibility and assistive technology rely on standards\n  • You have no evidence that a new pattern is better\n\nExample:\n  Don't invent a new login flow if email + password works.\n  Every deviation costs the user mental effort." },
      { title: "When to deviate from convention", code: "Deviate only when:\n  • The existing pattern demonstrably fails your users\n  • Your user research shows a better mental model exists\n  • The new pattern offers a significant, clear benefit\n  • You can transition users with clear affordances\n\nExample:\n  Swipe-to-delete was a deviation from convention\n  — but it was faster, felt natural on touch,\n    and users learned it quickly.\n\nRule: The burden of proof is on the deviation.\n      Earn the right to be different." },
    ],
  },
  {
    name: "Aesthetic-Usability Effect", category: "Behaviour & Motivation",
    description: "Users perceive aesthetically pleasing designs as more usable, even if they are not. Beautiful designs create a halo effect that leads users to be more tolerant of minor usability problems.",
    syntax: "Aesthetic design → perceived usability → increased tolerance → positive first impression.",
    notes: "The effect can mask real usability problems in testing — users rate attractive interfaces as easy to use even when they struggle. Do not use aesthetics as a substitute for genuine usability work.",
    returns: "More positive first impressions, higher user tolerance for minor issues, and greater emotional engagement with the product.",
    variations: [
      { title: "Design applications", code: "✓ Invest in visual quality — typography, spacing, colour\n✓ Use high-quality imagery and illustration\n✓ Maintain consistency — inconsistent UI feels low-quality\n✓ Animate transitions subtly — polish signals care\n✓ Design empty states and error states with the same care\n  as peak states\n✓ First impressions are disproportionately powerful —\n  the landing page and onboarding set the tone" },
      { title: "The halo effect in practice", code: "Users encountering a beautiful, polished UI:\n  • Assume the product is trustworthy\n  • Attribute errors to themselves, not the product\n  • Rate usability higher than the objective task data shows\n  • Are more likely to return after a failure\n  • Are more likely to recommend the product\n\nUsers encountering a poorly designed UI:\n  • Attribute errors to the product immediately\n  • Lose trust after the first failure\n  • Rate usability lower than the task data shows" },
      { title: "The trap: aesthetics ≠ usability", code: "The aesthetic-usability effect is a perception bias —\nit does not make a broken product actually work.\n\nRisks:\n  ✗ Usability testing skewed by attractive prototypes\n    — Ask about behaviour, not satisfaction ratings\n  ✗ Beautiful design masking poor information architecture\n  ✗ Investing in visual polish before solving core flows\n  ✗ Assuming users who rate it highly found it easy\n\nMeasure task completion rates and time-on-task\nalongside satisfaction scores to get the full picture." },
    ],
  },
  {
    name: "Postel's Law", category: "Behaviour & Motivation",
    description: "Be conservative in what you send, be liberal in what you accept. Originally a principle for software interfaces, it applies directly to UX: design inputs that accept many forms of valid user input, and outputs that are precise and clear.",
    syntax: "Input: accept many formats. Output: send one clear, correct response.",
    notes: "Named after internet pioneer Jon Postel. In UX, 'liberal in what you accept' means not forcing users into rigid formats. 'Conservative in what you send' means the system's responses are unambiguous, consistent, and correct.",
    returns: "Fewer input errors, reduced user frustration, and a product that feels forgiving and smart.",
    variations: [
      { title: "Design applications", code: "✓ Accept phone numbers with or without spaces, dashes, +44\n✓ Accept dates in multiple formats, then normalise on display\n✓ Strip whitespace from inputs automatically\n✓ Accept both upper and lowercase in fields that don't need case\n✓ Accept card numbers with or without spaces\n✓ Provide clear, specific error messages when input truly fails\n✓ Autocorrect obvious typos in search queries" },
      { title: "Good vs bad examples", code: "Good:\n  Search: 'Did you mean: \"TypeScript\"?'\n  — Accepts the typo, offers the correction\n\n  Phone field: accepts 07911 123 456, 07911123456,\n  +44 7911 123 456, and 0044 7911 123456\n  — All are the same number; format on display\n\nBad:\n  'Phone number must be 11 digits with no spaces'\n  — Forces the user into one arbitrary format\n\n  'Date must be in DD/MM/YYYY format'\n  — Rejects 09 May 2026, 9/5/26, and 2026-05-09" },
      { title: "Output: be conservative", code: "The 'conservative in output' side:\n\n  Send one clear response, not multiple:\n  ✓ 'Your order has been placed. Order #12345.'\n  ✗ 'Order placed! Maybe. Check your email. Or not?'\n\n  Error messages should be specific:\n  ✓ 'Your session expired. Please log in again.'\n  ✗ 'Something went wrong.'\n\n  Confirmations should be unambiguous:\n  ✓ 'File deleted permanently.'\n  ✗ 'File removed.' (From where? Recoverable?)" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Cognitive Load":        "bg-primary-100 text-primary-700",
  "Gestalt Principles":    "bg-violet-100 text-violet-700",
  "Memory & Attention":    "bg-amber-100 text-amber-700",
  "Behaviour & Motivation":"bg-emerald-100 text-emerald-700",
};

export default function LawsOfUX() {
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
