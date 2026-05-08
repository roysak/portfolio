import{i as e,n as t,t as n}from"./index-jsx-runtime.js";var r=e(t(),1),i=n(),a=[{name:`Hick's Law`,category:`Cognitive Load`,description:`The time it takes to make a decision increases logarithmically with the number and complexity of choices available. Named after British psychologists William Edmund Hick and Ray Hyman.`,syntax:`RT = a + b × log₂(n)  — where n = number of choices.`,notes:`Hick's Law does not mean 'always fewer choices'. It means that when speed of decision matters, reduce and simplify options. Complex tasks may legitimately require many choices — break them into steps.`,returns:`Faster decision-making and reduced cognitive overload when choices are appropriately constrained.`,variations:[{title:`Design applications`,code:`✓ Limit primary navigation to 5–7 items
✓ Use progressive disclosure — show advanced options on demand
✓ Break complex forms into multiple focused steps
✓ Highlight a recommended option ('Most popular')
✓ Use smart defaults to pre-select the most common choice
✓ Remove rarely used features from primary UI`},{title:`Good vs bad examples`,code:`Good:
  Netflix categorises thousands of films into a few
  genre rows — you choose a genre, then a film

  Dropbox's plan page highlights one option as
  'Recommended' to reduce decision paralysis

Bad:
  A settings panel with 40 ungrouped options
  A registration form that asks for everything at once
  A navigation menu with 15 top-level items`},{title:`Common misapplication`,code:`✗ Removing choices the user genuinely needs
  — Fewer choices is not always better
  — A power user may need all the options

✗ Hiding options so far away they can't be found
  — The goal is reduced perceived complexity,
    not inaccessibility

Rule: Reduce the number of choices visible at once,
not the total capability of the product.`}]},{name:`Fitts's Law`,category:`Cognitive Load`,description:`The time required to move to a target is a function of the target's size and the distance to it. Larger, closer targets are faster to acquire. Formulated by psychologist Paul Fitts in 1954.`,syntax:`MT = a + b × log₂(2D/W)  — D = distance, W = target width.`,notes:`The corners and edges of a screen are infinitely large in Fitts's terms because the cursor stops there automatically. This is why macOS puts the menu bar at the top edge rather than inside windows.`,returns:`Faster, less error-prone interactions by sizing and positioning interactive targets appropriately.`,variations:[{title:`Design applications`,code:`✓ Make buttons large enough — 44×44px minimum (iOS HIG)
✓ Place primary actions close to the user's current focus
✓ Use screen edges for frequently accessed controls
✓ Increase tap target size beyond the visual element
✓ Keep destructive actions away from primary actions
✓ Place related actions near each other to reduce travel`},{title:`Good vs bad examples`,code:`Good:
  macOS menu bar fixed to the top screen edge
  — the cursor stops at the edge, making it infinitely tall

  Mobile floating action button (FAB) in the bottom-right
  — large, reachable with the thumb, close to content

Bad:
  Tiny 'X' close button on a mobile modal
  'Delete' button directly next to 'Save'
  Pagination arrows that are 16×16px`},{title:`Touch-specific implications`,code:`Touch has a wider error margin than a mouse cursor.
Apple HIG minimum: 44 × 44 pt
Google Material: 48 × 48 dp

Beyond size, consider:
  • Thumb reach zones on mobile
    (bottom half of screen = easy, top = stretch)
  • Spacing between adjacent targets
    (8px minimum between tappable elements)
  • Hover states don't exist on touch — design for tap`}]},{name:`Miller's Law`,category:`Cognitive Load`,description:`The average person can hold only 7 (± 2) items in their working memory at one time. Published by cognitive psychologist George Miller in 1956.`,syntax:`Working memory capacity ≈ 7 ± 2 chunks of information.`,notes:`The key insight is 'chunking' — grouping individual items into meaningful units expands effective capacity. A phone number like 07911123456 is 11 digits; 0791 112 3456 is three chunks.`,returns:`Reduced cognitive overload and improved recall when content is chunked into meaningful groups.`,variations:[{title:`Design applications`,code:`✓ Group navigation items into logical categories
✓ Break long forms into sections with clear headings
✓ Use visual chunking — whitespace, cards, borders
✓ Limit onboarding steps to 5–7 per screen
✓ Format phone numbers, IBANs, and card numbers with spaces
✓ Use numbered steps for multi-stage processes
✓ Show only 5–7 items per list before pagination`},{title:`Chunking examples`,code:`Without chunking (hard to remember):
  Credit card: 4539578763621486

With chunking (easy to remember):
  Credit card: 4539 5787 6362 1486

Without chunking:
  Navigation: About, Services, Team, Blog, Work,
              Press, Careers, Contact, Privacy, Terms

With chunking:
  Company (About, Team, Press)
  Work (Services, Portfolio)
  Connect (Blog, Careers, Contact)`},{title:`Miller's Law ≠ always 7`,code:`Modern research (Cowan, 2001) suggests true
working memory capacity is closer to 4 ± 1 chunks.

The '7 ± 2' figure was for sequential recall tasks.
For design, the practical guideline is:

  • Aim for 5 or fewer primary navigation items
  • Never show more than 9 without grouping
  • The exact number matters less than the grouping
  • Meaningful chunks beat arbitrary lists`}]},{name:`Tesler's Law`,category:`Cognitive Load`,description:`Also known as the Law of Conservation of Complexity — every application has an inherent amount of complexity that cannot be eliminated, only transferred between the system and the user.`,syntax:`Total complexity = constant. Reduce user complexity → increase system complexity.`,notes:`Complexity cannot be destroyed — it can only be moved. If you simplify the UI, the engineer or designer must absorb that complexity elsewhere. The goal is to keep complexity on the system side, not the user side.`,returns:`A simpler user experience achieved by deliberately shifting complexity into the system, not by pretending it doesn't exist.`,variations:[{title:`Design applications`,code:`✓ Auto-detect country from IP — don't make users choose
✓ Smart defaults — pre-fill forms from known data
✓ Calendar 'smart scheduling' absorbs time-zone complexity
✓ 'One-click purchase' (Amazon) — system handles all steps
✓ Auto-save — user never needs to think about saving
✓ Email client threading — system groups, user just reads`},{title:`Good vs bad examples`,code:`Good:
  Google Maps calculates the best route automatically
  — the user just says 'take me to X'
  System absorbs: real-time traffic, route options, ETAs

  Gmail's Smart Reply generates response options
  — user taps one instead of composing from scratch

Bad:
  Asking users to manually enter their delivery address
  when they've already entered it three times before

  Making users manage their own data export format
  when the system could just pick the right one`},{title:`When to break the rule`,code:`Some complexity should stay with the user:

  Financial decisions — users should consciously
  confirm transfers, not have them auto-completed

  Irreversible actions — deleting data should
  require deliberate, conscious steps

  Personalisation — users often want control over
  their own settings and preferences

Rule: Automate when the user doesn't care.
      Ask when the decision is meaningful to them.`}]},{name:`Occam's Razor`,category:`Cognitive Load`,description:`Among competing solutions that achieve the same goal, the simplest one — the one with the fewest assumptions and components — is usually correct. Attributed to 14th-century friar William of Ockham.`,syntax:`Prefer the simplest solution that fully meets the user's need.`,notes:`In UX, Occam's Razor is a design principle, not a rigid rule. It argues against unnecessary elements — every feature, every field, every screen added without clear evidence of need makes the product worse.`,returns:`A leaner, more focused product that is easier to learn, use, and maintain.`,variations:[{title:`Design applications`,code:`✓ Remove any element that does not serve the user's goal
✓ Prefer one clear call-to-action over multiple competing ones
✓ Avoid adding features to 'cover all bases'
✓ Question every form field — is it truly necessary?
✓ Resist adding more onboarding steps to explain complexity
  (simplify the product instead)
✓ 'What can we remove?' before 'What can we add?'`},{title:`Signs you're violating it`,code:`✗ The homepage has 4 primary calls-to-action
✗ The onboarding has 12 steps to explain a simple product
✗ There is a 'misc' or 'other' section in the navigation
✗ The settings page has options no one has ever used
✗ The form collects data 'just in case we need it'
✗ There are three ways to do the same thing
   with no clear guidance on which to use`},{title:`Applied to design decisions`,code:`When evaluating two design options that solve
the same user problem equally well:

  Option A: Requires learning a new interaction pattern
  Option B: Uses a familiar pattern with one extra step

  → Choose B. The extra step is simpler than the
    cognitive load of learning something new.

Simplicity in UX is not about fewer pixels —
it's about fewer decisions, fewer surprises,
and fewer things that can go wrong.`}]},{name:`Law of Proximity`,category:`Gestalt Principles`,description:`Objects that are close to each other are perceived as a group, regardless of their shape, colour, or size. One of the foundational Gestalt principles of visual perception.`,syntax:`Nearby elements → perceived as related. Distant elements → perceived as separate.`,notes:`Proximity is the most powerful grouping cue available. It works without needing borders, boxes, or shared colour. Whitespace is as meaningful as content — it communicates structure.`,returns:`Clear visual groupings that help users understand relationships between elements without additional visual decoration.`,variations:[{title:`Design applications`,code:`✓ Place labels immediately above or beside their inputs
✓ Group related form fields with shared whitespace
✓ Keep a button close to the content it acts on
✓ Use tighter spacing within a card, looser between cards
✓ Position captions directly below their image
✓ Keep navigation items for the same section clustered
✓ Use proximity to separate primary from secondary actions`},{title:`Good vs bad examples`,code:`Good:
  A form where 'First name' and 'Last name' sit close
  together with more space above the next section
  — User understands they belong to the same group

  A card component with tight internal spacing
  and generous margins between cards

Bad:
  Labels equally spaced from both the field above
  and the field below — ambiguous which they belong to

  A 'Delete' button the same distance from 'Cancel'
  as it is from 'Save' — relationship is unclear`},{title:`Proximity + whitespace`,code:`Whitespace communicates meaning:

  Tight spacing (4–8px):   Elements are related
  Medium spacing (16–24px): Elements are in the same group
  Large spacing (40–64px):  Elements are separate sections

Common mistake:
  Equal spacing between all elements on a page
  — Everything looks equally unrelated
  — The grid is visible but the hierarchy is not

Fix: vary spacing intentionally to reflect structure`}]},{name:`Law of Similarity`,category:`Gestalt Principles`,description:`Elements that share visual characteristics — shape, colour, size, texture, or orientation — are perceived as related or belonging to the same group, even if they are not physically close.`,syntax:`Shared visual attributes → perceived as belonging together.`,notes:`Similarity and proximity work together. When elements look alike, users assume they behave alike. Violating similarity — making something look different — signals that it is different. Use this intentionally.`,returns:`Intuitive groupings and clear differentiation between interactive and non-interactive elements.`,variations:[{title:`Design applications`,code:`✓ Use consistent button styles for all primary actions
✓ Use the same colour for all clickable links
✓ Distinguish interactive elements from static content visually
✓ Use a different style for destructive vs constructive actions
✓ Apply consistent card styles to all items of the same type
✓ Use icon families consistently — don't mix icon styles`},{title:`Good vs bad examples`,code:`Good:
  All text links are blue and underlined
  — users know immediately what is clickable

  Danger buttons are red; primary buttons are blue
  — colour signals intent, not just aesthetics

Bad:
  Some clickable items look like plain text
  — users don't know what is interactive

  Mixing filled and outlined icons with no system
  — similar elements look inconsistent without reason`},{title:`Exceptions: breaking similarity`,code:`Deliberately breaking similarity draws attention:

  Von Restorff Effect: one different item is remembered
  — Use for 'Recommended' plan or featured product

  A different-coloured button signals a different purpose
  — Primary (blue) vs Destructive (red) vs Secondary (grey)

Rule: Be consistent within a category, distinct across categories.
Every visual difference should carry semantic meaning.`}]},{name:`Law of Common Region`,category:`Gestalt Principles`,description:`Elements enclosed within a shared boundary — a border, background colour, or shadow — are perceived as belonging together, even if they are not particularly close to each other.`,syntax:`Shared enclosure → perceived as a group.`,notes:`Common region is how cards, panels, modals, and tooltips communicate grouping. It is especially useful when proximity alone is not sufficient — for example, when screen density is high.`,returns:`Clear, scannable groupings that allow users to understand content structure at a glance.`,variations:[{title:`Design applications`,code:`✓ Use cards to group related content in a feed
✓ Use a modal background to separate a task from the page
✓ Use a panel or sidebar background to group navigation
✓ Use a subtle background fill to group form sections
✓ Use a tooltip container to group label + description
✓ Use tab panels to group content that switches together`},{title:`Common region techniques`,code:`Border:           Explicit container edge (box or card border)
Background fill:  Subtle colour difference (grey panel, white card)
Shadow / elevation: Implies a surface layer above the page
Rounded corners:  Softens the container, implies a card
Whitespace alone: Proximity-based, no hard boundary

Hierarchy of strength (strongest → subtlest):
  Modal overlay > Card border > Background fill > Whitespace`},{title:`Good vs bad examples`,code:`Good:
  A dashboard where each metric sits inside its own card
  — users instantly see what belongs together

  A multi-section form where each section has a
  light background fill and a section heading

Bad:
  A page where related items are visually separated
  by the same whitespace as unrelated items
  — common region could resolve the ambiguity

  Overusing cards for everything
  — when everything is enclosed, nothing stands out`}]},{name:`Law of Prägnanz`,category:`Gestalt Principles`,description:`People interpret ambiguous or complex visual information as the simplest, most regular form possible. The mind prefers order, symmetry, and simplicity over complexity. Also called the Law of Good Figure or Law of Simplicity.`,syntax:`Ambiguous input → simplest stable interpretation.`,notes:`Designers exploit Prägnanz to create logos, icons, and illustrations that are instantly recognised even when built from minimal shapes. Complex designs fight against this instinct and require more cognitive effort.`,returns:`Instantly recognisable, memorable visuals that require minimal cognitive effort to interpret.`,variations:[{title:`Design applications`,code:`✓ Use simple, geometric icon shapes over complex illustrations
✓ Reduce visual noise — the simpler the form, the faster the read
✓ Use familiar patterns — users will interpret them as expected
✓ Logos and symbols work best when reducible to basic shapes
✓ Avoid decorative complexity that fights with the content
✓ When in doubt, simplify — users fill in the gaps`},{title:`Examples in logos and icons`,code:`FedEx logo: negative space between E and x = an arrow
  — The mind 'completes' the implied shape

Amazon logo: arrow from 'a' to 'z'
  — Simple arc read as a smile + 'everything A to Z'

Apple logo: a circle with a bite taken out
  — Instantly read as an apple, not an abstract shape

WWF panda: minimal black and white shapes
  — Read as a panda despite being mostly white space`},{title:`Implications for UI complexity`,code:`Users approach a new screen with a Prägnanz instinct:
  → They will try to find the simplest mental model
  → Novel patterns require more effort to interpret
  → Familiar patterns are processed almost automatically

Consequences:
  • Use standard UI patterns before inventing new ones
  • When you must be novel, be very deliberate and clear
  • Reduce visual elements until you can remove no more
  • Test with users — what seems simple to you may not be`}]},{name:`Law of Continuity`,category:`Gestalt Principles`,description:`Elements arranged along a line, curve, or implied path are perceived as more related to each other than elements that are not. The eye follows the smoothest path through a visual composition.`,syntax:`Aligned or curved elements → perceived as a sequence or group.`,notes:`Continuity guides the eye through a layout. A horizontal row implies a sequence; a vertical list implies a hierarchy. Breaking the line — with whitespace or a visual separator — signals a category change.`,returns:`Intuitive reading paths and clear visual sequences that guide users through content naturally.`,variations:[{title:`Design applications`,code:`✓ Align items in a row to imply they are part of a sequence
✓ Use a horizontal progress bar to suggest steps ahead
✓ Use a timeline layout for chronological content
✓ Align the eye from CTA to supporting content with layout
✓ Use a diagonal or curve to connect before/after states
✓ Ensure reading flow follows natural left-to-right, top-to-bottom
✓ Use separator lines only to break continuity intentionally`},{title:`Good vs bad examples`,code:`Good:
  A checkout stepper: Step 1 → Step 2 → Step 3
  — The horizontal line implies a path to completion

  A pricing table where features align in rows
  — The eye travels horizontally to compare plans

Bad:
  A card grid where items are different heights
  — The eye has no clear path and scanning is harder

  Navigation items that don't align to a consistent edge
  — The implied line is broken, making the group feel unstable`},{title:`Continuity and carousels`,code:`Carousels and horizontal scrolling exploit continuity:
  → A partially visible card signals 'more to the right'
  → The cut-off creates an implied continuation
  → Users follow the visual path to swipe or scroll

Design cue:
  Always show part of the next card in a horizontal scroll
  to signal that more content exists along that axis.
  A fully visible last card implies there is nothing more.`}]},{name:`Von Restorff Effect`,category:`Memory & Attention`,description:`When multiple similar objects are present, the one that is visually distinct from the rest is the most likely to be remembered. Also known as the Isolation Effect. Identified by psychiatrist Hedwig von Restorff in 1933.`,syntax:`Visually distinct element → disproportionate attention and recall.`,notes:`The effect is powerful but fragile — if too many elements are made distinct, none stands out. Reserve differentiation for the one thing that matters most. Used poorly, it creates visual noise and anxiety.`,returns:`Focused user attention on the most important element, and stronger memory of highlighted content.`,variations:[{title:`Design applications`,code:`✓ Highlight one pricing plan as 'Most popular'
✓ Use a filled primary button vs outlined secondary buttons
✓ Use colour sparingly — one accent, not five
✓ Feature one item in a list with a badge or banner
✓ Use animation or motion on one key element only
✓ Make the primary CTA visually distinct from all others
✓ Use a contrasting background on a featured card`},{title:`Good vs bad examples`,code:`Good:
  Three pricing plans: Basic, Pro (highlighted), Enterprise
  — 'Pro' has a coloured border, badge, and bold label
  — Users immediately see it as the recommended option

  One red 'Delete' button in a row of grey actions
  — Stands out as dangerous; draws attention to the risk

Bad:
  Every button on the page is a different colour
  — Nothing stands out because everything does

  Five badges on five different cards
  — The isolation effect is cancelled out`},{title:`Accessibility consideration`,code:`Von Restorff differentiation must not rely on
colour alone — 8% of men have colour vision deficiency.

Combine colour with:
  • Shape or icon (a star, a crown, a badge)
  • Size (slightly larger card or button)
  • Typography (bold label, larger heading)
  • Position (first in list, centred on page)
  • Motion (subtle pulsing or entrance animation)

Test your design in greyscale to verify distinction
survives without colour.`}]},{name:`Serial Position Effect`,category:`Memory & Attention`,description:`Users are most likely to remember items at the beginning (primacy effect) and end (recency effect) of a list or sequence. Items in the middle are recalled least reliably.`,syntax:`First items → primacy (stored in long-term memory). Last items → recency (still in working memory).`,notes:`This effect is why the most important navigation items should go first or last — never bury them in the middle. It also explains why 'Save' and 'Cancel' belong at the bottom of a form, not the middle.`,returns:`Better recall of critical items when they are placed at the start or end of sequences, lists, and navigation.`,variations:[{title:`Design applications`,code:`✓ Place the most important navigation item first or last
✓ Lead with the strongest selling point on a landing page
✓ End a user flow on a high — a success state, not a form
✓ Put the primary CTA at the end of content, not in the middle
✓ Start an onboarding flow with the most valuable step
✓ In a list of options, put the recommended one first
✓ End emails and notifications with a clear action`},{title:`Navigation examples`,code:`Standard navigation order:
  [Most important] [Secondary] [Tertiary] [Least important]
  — Wrong: important item buried in the middle

  Amazon: [Deals] [Prime] ... [Cart] [Account]
  — High-value items at start and end

  App bottom tab bar:
  [Home] [Search] [Explore] [Library] [Profile]
  — Home (start) and Profile (end) get most recall`},{title:`Applied to forms and flows`,code:`Onboarding:
  Start with the most exciting, rewarding step
  End with a clear moment of achievement
  — First and last impressions define the memory of the experience

Checkout:
  End on a positive confirmation screen
  — The last screen is disproportionately remembered
  — A poor 'order confirmed' screen undermines a good checkout

Error states:
  Never end a flow on an error with no resolution
  — The error becomes the dominant memory`}]},{name:`Zeigarnik Effect`,category:`Memory & Attention`,description:`People remember uncompleted or interrupted tasks significantly better than completed ones. The open loop created by an unfinished task keeps it in working memory until it is resolved.`,syntax:`Unfinished task → stays in working memory → motivates completion.`,notes:`The effect is a double-edged sword. In product design it drives completion (progress bars, streaks). But too many open loops — too many notifications, unread badges — creates anxiety and overwhelm.`,returns:`Higher task completion rates when users are shown their progress and reminded of what remains.`,variations:[{title:`Design applications`,code:`✓ Show profile completion progress bars ('70% complete')
✓ Use course progress indicators in e-learning
✓ Save partially completed forms and remind users to return
✓ Use streak mechanics in habit apps (Duolingo, Wordle)
✓ Show 'X items left' in task management
✓ Send 'You left something in your cart' emails
✓ Show chapter progress in reading and podcast apps`},{title:`Good vs bad examples`,code:`Good:
  LinkedIn: 'Your profile is 60% complete'
  — The open loop motivates users to add more information

  Duolingo streak counter
  — Breaking a 30-day streak feels like a loss
  — Users return daily to keep the loop closed

Bad:
  An app with 47 unread notifications
  — Too many open loops cause anxiety, not motivation
  — Users ignore or disable notifications entirely

  A form that loses progress on navigation away
  — The loop closes with frustration, not completion`},{title:`The anxiety risk`,code:`Too many open loops → cognitive anxiety

Badge fatigue:
  Unread counts that users cannot realistically clear
  → Users develop notification blindness
  → Or they leave the product to avoid anxiety

Design principle:
  Create open loops only for tasks the user values
  and only when completion is genuinely achievable.
  An open loop with no clear path to closure is
  just stress, not motivation.`}]},{name:`Peak-End Rule`,category:`Memory & Attention`,description:`People judge an experience almost entirely by how they felt at its most intense moment (the peak) and at the end, regardless of how good or bad the rest of the experience was. Identified by psychologist Daniel Kahneman.`,syntax:`Memory of experience ≈ (peak emotion + final emotion) ÷ 2.`,notes:`Duration neglect means that a short bad experience with a good ending is remembered more positively than a long good experience with a bad ending. The last impression carries enormous weight.`,returns:`More positive overall memory of a product experience when the peak moment and the ending are intentionally designed to be positive.`,variations:[{title:`Design applications`,code:`✓ Design the most emotionally significant moment with care
✓ End every key flow on a positive, celebratory note
✓ Make the success state after form submission feel rewarding
✓ Use micro-animations to mark task completion (confetti, tick)
✓ Acknowledge the user's effort at the end of a long flow
✓ Recover gracefully from errors — make the resolution feel good
✓ Never end a session on a warning, an error, or a dead end`},{title:`Peak moment examples`,code:`Onboarding peak:
  The moment the user first gets value from the product
  — Make it fast, clear, and satisfying
  — Remove every step that delays this moment

E-commerce peak:
  The confirmation screen after purchase
  — Celebrate the decision: 'Great choice!'
  — Show what happens next — reduce anxiety

Healthcare app peak:
  Completing a health assessment or hitting a goal
  — Acknowledge the achievement meaningfully`},{title:`End state design`,code:`Common failures at the end of a flow:

✗ Empty confirmation ('Your form was submitted.')
  — No emotion, no acknowledgement, no next step

✗ Redirecting to a dashboard full of empty states
  — First experience feels like failure, not success

✗ Ending on an upsell immediately after purchase
  — Sours the peak emotion of completing the purchase

Good endings:
  ✓ Personal ('Thanks, Sarah — we'll be in touch by Tuesday.')
  ✓ Visual reward (animation, illustration, progress shown)
  ✓ Clear next step ('While you wait, you could...')`}]},{name:`Goal-Gradient Effect`,category:`Behaviour & Motivation`,description:`People accelerate their effort as they get closer to completing a goal. The nearer the finish line, the more motivated they are to reach it. First described by behavioural psychologist Clark Hull in 1934.`,syntax:`Perceived progress → increased motivation → faster completion.`,notes:`The key word is 'perceived' progress. Even artificial head-starts (like a loyalty card that comes pre-stamped with 2 of 10) significantly increase completion rates by making the goal feel closer.`,returns:`Higher completion rates for multi-step processes when users can see their progress and the end goal.`,variations:[{title:`Design applications`,code:`✓ Show a progress bar in multi-step forms and onboarding
✓ Label steps ('Step 2 of 4') to signal proximity to the end
✓ Use loyalty cards with artificial head-starts
✓ Show 'X more to go' as the end nears
✓ Display a percentage complete on profile or course pages
✓ Animate progress bars filling up to reinforce progress
✓ Celebrate milestones before the final goal (50%, 75%)`},{title:`Good vs bad examples`,code:`Good:
  LinkedIn progress bar: 'Your profile is 80% complete'
  — Users are motivated by proximity to 100%

  Coffee stamp card: 10 stamps for a free coffee
  Pre-stamp 2: the user starts at 20% complete
  — Completion rates increase significantly vs starting at 0

Bad:
  A 12-step onboarding with no progress indicator
  — Users don't know how close the end is
  — Drop-off rates increase at every step

  Progress bar that jumps from 10% to 90%
  — Feels dishonest; undermines trust`},{title:`Application in checkout flows`,code:`Checkout steps:
  Basket → Delivery → Payment → Review → Confirmed

  Show the step indicator throughout
  Increase visual weight of the current step
  Show remaining steps getting fewer

  At 'Review':
  'Almost done — just one step to go!'
  → Goal-gradient motivation is at its peak
  → Abandonment rates drop significantly near the end`}]},{name:`Doherty Threshold`,category:`Behaviour & Motivation`,description:`Productivity and engagement increase dramatically when a computer and user interact at a pace of under 400 milliseconds. Delays beyond this threshold break flow and reduce task commitment.`,syntax:`Response time < 400ms → user stays in flow. > 400ms → user disengages.`,notes:`Walter Doherty and Ahrvind Thadani (IBM, 1982) found that sub-400ms response time increased computer usage dramatically. Beyond 1 second, users lose focus. Beyond 10 seconds, they switch tasks or leave.`,returns:`Higher engagement, task completion, and perceived product quality when response times are below the 400ms threshold.`,variations:[{title:`Response time guidelines`,code:`< 100ms:  Instant — feels like direct manipulation
           (button press, toggle, checkbox)

100–300ms: Fast — user perceives a reaction
           (page transition, opening a menu)

300–400ms: Threshold — still feels connected
           (search results, content loading)

400ms–1s:  Slow — noticeable delay; add a spinner

1–10s:     Frustrating — progress indicator required;
           users will multitask or lose thread

> 10s:     Unacceptable — users abandon the task`},{title:`Design applications`,code:`✓ Optimistic UI updates — show the result immediately,
  confirm in the background (like iOS likes/follows)
✓ Skeleton screens instead of blank loading states
✓ Lazy loading — load content as the user scrolls
✓ Prefetch the next likely page or screen
✓ Debounce search inputs (wait 200ms after typing stops)
✓ Show a spinner for anything > 400ms
✓ Show a progress bar for anything > 1 second
✓ Cache frequently accessed data locally`},{title:`Perceived vs actual performance`,code:`You can improve perceived performance without
improving actual performance:

  Optimistic UI:
    Show the liked/saved state immediately
    Revert on failure (rare, handle gracefully)

  Skeleton screens:
    Users perceive them as faster than spinners
    because content layout is already visible

  Progress bars with percentage:
    Perceived as faster than indeterminate spinners

  Early content first:
    Load and show text before images
    — Something to read while images load`}]},{name:`Jakob's Law`,category:`Behaviour & Motivation`,description:`Users spend most of their time on other products. They prefer your product to work the same way as the products they already know. Formulated by UX pioneer Jakob Nielsen.`,syntax:`Users' existing mental models → set expectations for your product.`,notes:`This is not an argument against innovation. It is an argument for deliberate innovation — only deviate from convention when the benefit to the user clearly outweighs the cost of breaking their mental model.`,returns:`A lower learning curve and fewer errors when familiar patterns and conventions are respected.`,variations:[{title:`Design applications`,code:`✓ Use platform conventions (iOS/Android/Web standards)
✓ Place the logo top-left and link it to the homepage
✓ Use a hamburger menu for mobile navigation
✓ Blue underlined text = link (or clearly styled alternative)
✓ Search icon (magnifying glass) for search
✓ Cart icon (shopping trolley) for e-commerce basket
✓ Use expected keyboard shortcuts (Ctrl+Z, Ctrl+S)
✓ Form fields above their submit button, never below`},{title:`When to follow convention`,code:`Follow convention when:
  • The pattern exists across your users' most-used products
  • The task is high-frequency and benefits from automaticity
  • The cost of re-learning is high (enterprise tools, forms)
  • Accessibility and assistive technology rely on standards
  • You have no evidence that a new pattern is better

Example:
  Don't invent a new login flow if email + password works.
  Every deviation costs the user mental effort.`},{title:`When to deviate from convention`,code:`Deviate only when:
  • The existing pattern demonstrably fails your users
  • Your user research shows a better mental model exists
  • The new pattern offers a significant, clear benefit
  • You can transition users with clear affordances

Example:
  Swipe-to-delete was a deviation from convention
  — but it was faster, felt natural on touch,
    and users learned it quickly.

Rule: The burden of proof is on the deviation.
      Earn the right to be different.`}]},{name:`Aesthetic-Usability Effect`,category:`Behaviour & Motivation`,description:`Users perceive aesthetically pleasing designs as more usable, even if they are not. Beautiful designs create a halo effect that leads users to be more tolerant of minor usability problems.`,syntax:`Aesthetic design → perceived usability → increased tolerance → positive first impression.`,notes:`The effect can mask real usability problems in testing — users rate attractive interfaces as easy to use even when they struggle. Do not use aesthetics as a substitute for genuine usability work.`,returns:`More positive first impressions, higher user tolerance for minor issues, and greater emotional engagement with the product.`,variations:[{title:`Design applications`,code:`✓ Invest in visual quality — typography, spacing, colour
✓ Use high-quality imagery and illustration
✓ Maintain consistency — inconsistent UI feels low-quality
✓ Animate transitions subtly — polish signals care
✓ Design empty states and error states with the same care
  as peak states
✓ First impressions are disproportionately powerful —
  the landing page and onboarding set the tone`},{title:`The halo effect in practice`,code:`Users encountering a beautiful, polished UI:
  • Assume the product is trustworthy
  • Attribute errors to themselves, not the product
  • Rate usability higher than the objective task data shows
  • Are more likely to return after a failure
  • Are more likely to recommend the product

Users encountering a poorly designed UI:
  • Attribute errors to the product immediately
  • Lose trust after the first failure
  • Rate usability lower than the task data shows`},{title:`The trap: aesthetics ≠ usability`,code:`The aesthetic-usability effect is a perception bias —
it does not make a broken product actually work.

Risks:
  ✗ Usability testing skewed by attractive prototypes
    — Ask about behaviour, not satisfaction ratings
  ✗ Beautiful design masking poor information architecture
  ✗ Investing in visual polish before solving core flows
  ✗ Assuming users who rate it highly found it easy

Measure task completion rates and time-on-task
alongside satisfaction scores to get the full picture.`}]},{name:`Postel's Law`,category:`Behaviour & Motivation`,description:`Be conservative in what you send, be liberal in what you accept. Originally a principle for software interfaces, it applies directly to UX: design inputs that accept many forms of valid user input, and outputs that are precise and clear.`,syntax:`Input: accept many formats. Output: send one clear, correct response.`,notes:`Named after internet pioneer Jon Postel. In UX, 'liberal in what you accept' means not forcing users into rigid formats. 'Conservative in what you send' means the system's responses are unambiguous, consistent, and correct.`,returns:`Fewer input errors, reduced user frustration, and a product that feels forgiving and smart.`,variations:[{title:`Design applications`,code:`✓ Accept phone numbers with or without spaces, dashes, +44
✓ Accept dates in multiple formats, then normalise on display
✓ Strip whitespace from inputs automatically
✓ Accept both upper and lowercase in fields that don't need case
✓ Accept card numbers with or without spaces
✓ Provide clear, specific error messages when input truly fails
✓ Autocorrect obvious typos in search queries`},{title:`Good vs bad examples`,code:`Good:
  Search: 'Did you mean: "TypeScript"?'
  — Accepts the typo, offers the correction

  Phone field: accepts 07911 123 456, 07911123456,
  +44 7911 123 456, and 0044 7911 123456
  — All are the same number; format on display

Bad:
  'Phone number must be 11 digits with no spaces'
  — Forces the user into one arbitrary format

  'Date must be in DD/MM/YYYY format'
  — Rejects 09 May 2026, 9/5/26, and 2026-05-09`},{title:`Output: be conservative`,code:`The 'conservative in output' side:

  Send one clear response, not multiple:
  ✓ 'Your order has been placed. Order #12345.'
  ✗ 'Order placed! Maybe. Check your email. Or not?'

  Error messages should be specific:
  ✓ 'Your session expired. Please log in again.'
  ✗ 'Something went wrong.'

  Confirmations should be unambiguous:
  ✓ 'File deleted permanently.'
  ✗ 'File removed.' (From where? Recoverable?)`}]}],o={"Cognitive Load":`bg-primary-100 text-primary-700`,"Gestalt Principles":`bg-violet-100 text-violet-700`,"Memory & Attention":`bg-amber-100 text-amber-700`,"Behaviour & Motivation":`bg-emerald-100 text-emerald-700`};function s(){let[e,t]=(0,r.useState)(null),[n,s]=(0,r.useState)(0),c=Array.from(new Set(a.map(e=>e.category)));return(0,r.useEffect)(()=>{s(0)},[e]),(0,r.useEffect)(()=>(document.body.style.overflow=e?`hidden`:``,()=>{document.body.style.overflow=``}),[e]),(0,i.jsxs)(i.Fragment,{children:[c.map(e=>(0,i.jsxs)(`section`,{className:`mb-10`,children:[(0,i.jsxs)(`div`,{className:`flex items-center gap-3 mb-4`,children:[(0,i.jsx)(`h2`,{className:`text-lg font-semibold text-neutral-800`,children:e}),(0,i.jsxs)(`span`,{className:`text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e]}`,children:[a.filter(t=>t.category===e).length,` topics`]})]}),(0,i.jsx)(`div`,{className:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3`,children:a.filter(t=>t.category===e).map(e=>(0,i.jsxs)(`button`,{onClick:()=>t(e),className:`group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary-600`,children:[(0,i.jsx)(`span`,{className:`text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-tight`,children:e.name}),(0,i.jsx)(`span`,{className:`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e.category]}`,children:e.category})]},e.name))})]},e)),(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4 text-xs text-neutral-500`,children:[(0,i.jsx)(`span`,{className:`font-medium text-neutral-400 uppercase tracking-wide`,children:`Category`}),Object.entries(o).map(([e,t])=>(0,i.jsx)(`span`,{className:`px-2.5 py-0.5 rounded-full font-semibold ${t}`,children:e},e))]}),e&&(0,i.jsx)(`div`,{className:`fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm`,onClick:()=>t(null),children:(0,i.jsxs)(`div`,{className:`bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden`,onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(`div`,{className:`flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50`,children:[(0,i.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,i.jsx)(`h2`,{className:`text-xl font-semibold text-neutral-900`,children:e.name}),(0,i.jsx)(`span`,{className:`text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e.category]}`,children:e.category})]}),(0,i.jsx)(`button`,{onClick:()=>t(null),className:`text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-full hover:bg-neutral-200`,"aria-label":`Close`,children:(0,i.jsx)(`span`,{className:`material-symbols-rounded text-xl! leading-none block!`,children:`close`})})]}),(0,i.jsxs)(`div`,{className:`p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-6`,children:[(0,i.jsx)(`p`,{className:`text-neutral-600 leading-relaxed`,children:e.description}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Summary`}),(0,i.jsx)(`pre`,{className:`bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-sm font-mono`,style:{userSelect:`text`},children:(0,i.jsx)(`code`,{children:e.syntax})})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Notes`}),(0,i.jsx)(`p`,{className:`text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4`,children:e.notes})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Outcome`}),(0,i.jsx)(`p`,{className:`text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4`,children:e.returns})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Examples`}),(0,i.jsx)(`div`,{className:`rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100`,children:e.variations.map((e,t)=>{let r=n===t;return(0,i.jsxs)(`div`,{className:`bg-neutral-50`,children:[(0,i.jsxs)(`button`,{onClick:()=>s(r?null:t),className:`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-100 transition-colors`,children:[(0,i.jsx)(`span`,{className:`text-sm font-semibold text-neutral-700`,children:e.title}),(0,i.jsx)(`span`,{className:`material-symbols-rounded text-base! text-neutral-400 transition-transform duration-200 ${r?`rotate-180`:``}`,children:`expand_more`})]}),r&&(0,i.jsx)(`div`,{className:`px-4 pb-4 pt-1 bg-white`,children:(0,i.jsx)(`pre`,{className:`bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-xs font-mono`,style:{userSelect:`text`},children:(0,i.jsx)(`code`,{children:e.code})})})]},t)})})]})]})]})})]})}export{s as default};