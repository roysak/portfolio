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
  // ── Sprint Overview ───────────────────────────────────────────────────────
  {
    name: "What is a Design Sprint?", category: "Sprint Overview",
    description: "A Design Sprint is a five-day structured process developed by Jake Knapp at Google Ventures for answering critical business questions through design, prototyping, and testing — compressing months of work into a single week.",
    syntax: "Monday: Map → Tuesday: Sketch → Wednesday: Decide → Thursday: Prototype → Friday: Test.",
    notes: "The sprint is not a brainstorming session or a hackathon. It has a precise structure, defined roles, and strict time-boxing. The prototype tested on Friday is disposable — learning is the output, not the product.",
    returns: "A validated (or invalidated) idea, a realistic prototype, and direct user feedback — all within five days.",
    variations: [
      { title: "Sprint vs other processes", code: "Design Sprint:\n  + 5 days, structured, team-wide alignment\n  + Produces a testable prototype and real user data\n  + Best for high-stakes, high-uncertainty decisions\n  − Heavy time commitment from senior stakeholders\n\nDesign Thinking:\n  + Broader philosophy, flexible timeline\n  + Deeper empathy research phase\n  − Less structured, slower to produce testable artefacts\n\nAgile Sprint:\n  + Builds and ships working software\n  + Iterative over weeks/months\n  − Not optimised for early-stage exploration" },
      { title: "The core premise", code: "Traditional process:\n  Months of planning → build → launch → discover it's wrong\n\nDesign Sprint:\n  5 days → realistic prototype → real user feedback\n  → know whether you're right before you build\n\nKey insight: You can simulate almost any product\nexperience in a prototype good enough to test in\njust one day. You don't need to build it first." },
    ],
  },
  {
    name: "When to Run a Sprint", category: "Sprint Overview",
    description: "Design Sprints are most valuable at moments of high uncertainty and high stakes — when the cost of building the wrong thing is significant and the right direction is genuinely unclear.",
    syntax: "High uncertainty + high stakes + a concrete question = ideal sprint candidate.",
    notes: "Sprints are expensive — five days of a cross-functional team's time. Reserve them for decisions that would otherwise take months of debate or require a costly build to validate.",
    returns: "Clarity on whether an idea is worth pursuing, and confidence in the direction chosen.",
    variations: [
      { title: "Ideal sprint triggers", code: "✓ Launching a new product or service\n✓ Redesigning a core user flow that is underperforming\n✓ Entering a new market or audience segment\n✓ A big feature that is expensive to build and unproven\n✓ A team that is stuck in debate and needs a decision\n✓ A critical business problem with no obvious solution\n✓ Evaluating a major technology or platform change" },
      { title: "When NOT to sprint", code: "✗ The solution is already known — just build it\n✗ The problem is vague and needs more research first\n✗ Stakeholders are not available for the full week\n✗ The team is not empowered to make decisions\n✗ You are already mid-build — use usability testing instead\n✗ The problem is primarily technical, not a design problem" },
    ],
  },
  {
    name: "Sprint Team & Roles", category: "Sprint Overview",
    description: "A Design Sprint requires a small, cross-functional team of 4–7 people plus a dedicated Facilitator. Every member must be present for all five days — partial attendance breaks the process.",
    syntax: "Facilitator + Decider + 4–6 cross-functional members = 5–7 people total.",
    notes: "The Decider is the most important role — they have final authority and their presence prevents decisions being reopened after the sprint. The Facilitator manages time and process, not content.",
    returns: "A fully aligned team that has shared context, shared ownership of decisions, and a jointly built prototype.",
    variations: [
      { title: "Team composition", code: "Facilitator (Sprint Master)\n  — Runs the process, keeps time, stays neutral\n  — Does NOT participate in content decisions\n\nDecider\n  — CEO, product lead, or decision owner\n  — Has the final vote on all key decisions\n  — Must be present every day\n\nCore members (pick 4–5):\n  — Product Manager\n  — Designer / UX Researcher\n  — Engineer (feasibility lens)\n  — Marketing / Business\n  — Customer-facing role (sales, support, CS)" },
      { title: "Optional experts (Monday only)", code: "Experts join Monday's talks for 15–20 min each\nto share specialised knowledge the team lacks:\n\n• The engineer — 'What are the technical constraints?'\n• The researcher — 'What do we know about users?'\n• The sales lead — 'What do customers say they want?'\n• A satisfied customer — 'Why do you use us?'\n• A churned customer — 'Why did you leave?'" },
    ],
  },
  {
    name: "Sprint Preparation", category: "Sprint Overview",
    description: "A successful sprint requires one to two weeks of preparation by the Facilitator. Arriving unprepared wastes the entire team's week.",
    syntax: "Set the challenge → book the space → recruit testers → prepare materials.",
    notes: "Recruit test participants during the sprint week, not after. Five participants is the target — enough to find patterns without being overwhelming to analyse in a single afternoon.",
    returns: "A sprint-ready team, room, materials, and five confirmed test participants for Friday.",
    variations: [
      { title: "Pre-sprint checklist", code: "2 weeks before:\n□ Define the sprint challenge and long-term goal\n□ Confirm Decider and team availability all 5 days\n□ Book a dedicated sprint room for the full week\n□ Begin recruiting 5 test participants for Friday\n\n1 week before:\n□ Prepare sprint questions with the Decider\n□ Set up sprint supplies (sticky notes, markers, paper)\n□ Confirm expert speakers for Monday\n□ Brief the team on the sprint format\n\nDay before:\n□ Confirm all 5 Friday participants\n□ Set up the sprint room\n□ Prepare the Monday schedule" },
      { title: "Recruiting test participants", code: "Target profile:\n  Match the real target user, not convenience\n  (avoid colleagues, friends, or power users)\n\nHow many: 5 participants\n  — 5 users reveals ~85% of usability problems\n  — More users = diminishing returns in one session\n\nScreener questions:\n  • Role, industry, or lifestyle match\n  • Usage of relevant tools or behaviours\n  • Availability on Friday for 1-hour session\n\nIncentive:\n  Offer a gift card (£50–£100 / $50–$100)\n  Always over-recruit by 1–2 to cover no-shows" },
    ],
  },

  // ── The 5 Days ────────────────────────────────────────────────────────────
  {
    name: "Monday: Map", category: "The 5 Days",
    description: "Monday is about building shared understanding. The team defines the long-term goal, maps the problem space, and chooses a specific target to focus the rest of the sprint on.",
    syntax: "Long-term goal → Sprint questions → Expert talks → User journey map → Choose target.",
    notes: "Monday ends with the Decider choosing a specific moment in the user journey to focus on. Without this constraint, the rest of the week loses focus. The map is the north star for all subsequent decisions.",
    returns: "A shared understanding of the problem, a user journey map, and a chosen target moment for the sprint.",
    variations: [
      { title: "Monday schedule", code: "09:00 — Start at the end (long-term goal)\n09:30 — Sprint questions (what must be true?)\n10:00 — Map the user journey (high-level)\n11:00 — Expert talks (15–20 min each)\n13:00 — Lunch\n14:00 — How Might We notes (during talks)\n15:00 — Organise & vote on HMW notes\n16:00 — Target — Decider chooses the focus\n17:00 — End" },
      { title: "Long-term goal format", code: "Frame it as an optimistic 2–5 year future:\n\n'In two years, [product] will be the go-to tool\nfor [target user] to [core job to be done].'\n\nExample:\n'In three years, our app will be the trusted\ncompanion that helps first-time investors make\nconfident, informed decisions every week.'\n\nThen ask: What must be true for this to happen?" },
      { title: "Sprint questions", code: "Sprint questions capture what must be true for\nthe long-term goal to succeed, and what could\ncause the sprint to fail.\n\nFormat: 'Can we [assumption]?'\n\nExamples:\n• Can we help users understand the product in < 2 min?\n• Can we build trust before asking for payment info?\n• Can we retain users past the first week?\n• Can we design for low-tech-literacy users?\n\nThese become the evaluation criteria on Friday." },
    ],
  },
  {
    name: "Tuesday: Sketch", category: "The 5 Days",
    description: "Tuesday is individual creative work. Each team member independently researches inspiration, then produces a detailed solution sketch — working alone to avoid groupthink.",
    syntax: "Lightning demos → Notes → Ideas → Crazy 8s → Solution sketch.",
    notes: "Working individually is the key difference from traditional brainstorming. The best ideas come from individuals thinking deeply, not groups talking. The sketches must be self-explanatory — they will be critiqued anonymously.",
    returns: "A set of competing, detailed solution sketches — one per team member — ready to be critiqued and voted on Wednesday.",
    variations: [
      { title: "Tuesday schedule", code: "09:00 — Lightning demos (inspiring examples, 3 min each)\n10:30 — Notes (review Monday's map and materials)\n11:00 — Ideas (messy individual brainstorm)\n11:30 — Crazy 8s (8 ideas in 8 minutes)\n12:00 — Lunch\n13:00 — Solution sketch (3-panel storyboard)\n17:00 — End (sketches anonymous, face-down)" },
      { title: "Lightning demos", code: "Each team member presents one inspiring product\nor idea relevant to the sprint challenge.\n\nFormat per demo:\n  • Show a screenshot or demo of the product\n  • Explain the 'big idea' in 3 minutes or less\n  • Facilitator captures key ideas on the whiteboard\n\nSources to explore:\n  • Competitor products\n  • Adjacent industries (same problem, different context)\n  • The best product in a completely unrelated field\n  • Past internal experiments" },
      { title: "Solution sketch format", code: "3 panels drawn on paper:\n\nPanel 1: The entry point (how does the user arrive?)\nPanel 2: The core interaction (the key moment)\nPanel 3: The outcome (what happens next?)\n\nRules:\n  • Words and annotations are fine and encouraged\n  • Must be self-explanatory without verbal explanation\n  • No names — sketches are anonymous until Wednesday\n  • Concrete, not vague — specific UI, not 'better UX'" },
    ],
  },
  {
    name: "Wednesday: Decide", category: "The 5 Days",
    description: "Wednesday is decision day. The team reviews all sketches, votes on the best ideas, and the Decider makes the final call. The winning ideas are assembled into a storyboard for the prototype.",
    syntax: "Art museum → Heat map vote → Speed critique → Straw poll → Decider vote → Storyboard.",
    notes: "The structured voting process replaces open debate, which wastes time and favours the loudest voice. The Decider's vote is final — this is not a democracy. The storyboard created on Wednesday is the exact blueprint for Thursday's prototype.",
    returns: "A single, decided direction and a 15-panel storyboard that specifies exactly what the prototype will contain.",
    variations: [
      { title: "Wednesday schedule", code: "09:00 — Art museum (post sketches on the wall)\n09:30 — Heat map vote (silent dot voting)\n10:00 — Speed critique (3 min per sketch)\n11:30 — Straw poll (team's preference)\n12:00 — Decider vote (final decision)\n13:00 — Lunch\n14:00 — Storyboard (15-panel prototype blueprint)\n17:00 — End" },
      { title: "Heat map voting", code: "1. Post all sketches anonymously on the wall\n2. Give each team member a sheet of small dot stickers\n3. Everyone walks the 'art museum' silently for 5 min\n4. Place dots on the parts they find most interesting\n   (not just the overall sketch — specific elements)\n5. No talking during voting\n6. Dots accumulate into a heat map of team interest\n\nThis surfaces what resonates before any discussion begins." },
      { title: "Storyboard", code: "A 15-panel comic-strip blueprint of the prototype.\n\nPanel 1: The opening scene\n  — How does the user first encounter this?\n  — Website, ad, app store, referral?\n\nPanels 2–14: The core experience\n  — Each panel = one screen or one step\n  — Draw roughly but specifically\n  — Note key copy, labels, and interactions\n\nPanel 15: The ending\n  — What happens when the task is done?\n  — What is the user's final emotional state?" },
    ],
  },
  {
    name: "Thursday: Prototype", category: "The 5 Days",
    description: "Thursday is a full-day build sprint. The team creates a realistic-looking prototype based on Wednesday's storyboard — not working software, but something convincing enough to elicit genuine reactions from users.",
    syntax: "Divide roles → build in parallel → assemble → trial run → prepare interview guide.",
    notes: "The goal is 'good enough to test', not perfect. A Keynote or Figma prototype with realistic copy and images is almost always sufficient. Reserve the last hour for a full trial run and to prepare Friday's interview script.",
    returns: "A realistic, testable prototype and a prepared interview script, ready for five user sessions on Friday.",
    variations: [
      { title: "Thursday team roles", code: "Makers (2–3 people)\n  — Build individual screens or components\n  — Use a tool that allows fast visual assembly\n  — Work from Wednesday's storyboard panels\n\nAsset collector (1 person)\n  — Gathers images, copy, icons, and content\n  — Provides to Makers as they need them\n\nWriter (1 person)\n  — Writes all UI copy, labels, and error messages\n  — Ensures the prototype sounds real, not placeholder-y\n\nInterviewer (1 person — usually the facilitator)\n  — Steps away from building\n  — Prepares Friday's interview guide\n  — Confirms all 5 participants" },
      { title: "Prototype tools", code: "Speed matters — choose tools your team already knows:\n\nFigma / Sketch\n  + Realistic visual design, good for UI\n  + Easy clickable prototype mode\n\nKeynote / PowerPoint\n  + Extremely fast assembly\n  + Surprisingly convincing for screens\n\nMarvel / InVision\n  + Quick hotspot linking of static images\n  + No design skill required\n\nWebflow / Framer\n  + More interactive if needed\n  − Slower to build\n\nRule: If you spend more than 30 min on one screen,\nstop and simplify — you are over-building." },
      { title: "Trial run checklist", code: "At 16:00 on Thursday, do a full run-through:\n\n□ Click through every step of the prototype\n□ Check all links work correctly\n□ Verify copy reads naturally (not placeholder text)\n□ Confirm the prototype looks realistic on target device\n□ Identify any missing screens or dead ends\n□ Run the interview guide with a team member as stand-in\n□ Time the session — it should fit in 60 minutes\n□ Prepare backup (screenshots) in case of tech failure" },
    ],
  },
  {
    name: "Friday: Test", category: "The 5 Days",
    description: "Friday is interview day. Each of the five participants completes a one-hour session with the Interviewer while the rest of the team watches a live feed and takes notes together — observing patterns as they emerge.",
    syntax: "5 × 1-hour sessions → team observes live → note patterns → synthesise → decide next steps.",
    notes: "After five sessions, patterns become undeniable. Three or more users making the same mistake or expressing the same confusion is a finding. One user's issue may be noise — look for repetition across participants.",
    returns: "Direct user feedback on the prototype, clear answers to the sprint questions, and a confident decision on what to do next.",
    variations: [
      { title: "Friday schedule", code: "09:00 — Briefing and last-minute setup\n09:30 — Interview session 1\n10:30 — Interview session 2\n11:30 — Interview session 3\n12:30 — Lunch (quick — keep momentum)\n13:00 — Interview session 4\n14:00 — Interview session 5\n15:00 — Team synthesis and pattern discussion\n16:00 — Review sprint questions — answered?\n16:30 — Decide: iterate, pivot, build, or abandon\n17:00 — End" },
      { title: "Interviewer guide", code: "Opening (5 min):\n  'We are testing the design, not you — be honest.'\n  'Think aloud as you work through tasks.'\n  'There are no right or wrong answers.'\n\nWarm-up (5 min):\n  Learn about their context and current behaviours\n\nPrototype tasks (40 min):\n  Give scenario-based tasks, not instructions:\n  ✓ 'Imagine you just heard about this. What would you do?'\n  ✗ 'Click the blue button and then go to settings.'\n\nDebrief (10 min):\n  'What stood out to you — good or bad?'\n  'If this were real, would you use it? Why or why not?'" },
      { title: "Live note-taking", code: "The team watches the live stream together.\nEach person takes notes individually:\n\nSetup:\n  Whiteboard or shared doc with 5 columns (one per user)\n  Two rows: positives (+) and negatives (−)\n\nProcess:\n  • Write one observation per sticky note\n  • Note the participant number, not their name\n  • Focus on behaviour, not interpretation\n  • Circle observations that appear 3+ times\n\nAfter all sessions:\n  Cluster notes by theme across the 5 columns\n  Patterns (3+ users) = findings\n  One-offs = noise (but note them)" },
    ],
  },

  // ── Sprint Techniques ─────────────────────────────────────────────────────
  {
    name: "Note-and-Vote", category: "Sprint Techniques",
    description: "A structured decision-making technique used throughout the sprint to replace open debate. Each person writes ideas or votes silently and independently before any discussion.",
    syntax: "Write silently → share simultaneously → discuss briefly → vote → Decider decides.",
    notes: "Note-and-Vote eliminates the influence of social dynamics, seniority, and vocal dominance. It consistently produces better decisions faster than open group discussion.",
    returns: "A fast, fair group decision that everyone feels heard by, even if they disagreed.",
    variations: [
      { title: "The method", code: "1. Silent individual writing\n   Each person writes their answer, idea, or vote\n   on paper or a sticky note — no peeking\n\n2. Simultaneous reveal\n   Everyone holds up / posts their answer at once\n   No reactions until all are visible\n\n3. Brief discussion\n   Clarify only — not debate. 2 minutes max.\n\n4. Vote\n   Another round of silent voting if needed\n\n5. Decider decides\n   The Decider makes the final call\n   No further debate after the decision" },
      { title: "Where it is used in the sprint", code: "Monday: Choosing the sprint target from the journey map\nMonday: Voting on How Might We notes\nWednesday: Heat map voting on solution sketches\nWednesday: Straw poll before Decider vote\nFriday: Team votes on patterns before Decider decides next steps\n\nAny time the team is stuck in discussion:\n  → Stop talking. Do a Note-and-Vote." },
    ],
  },
  {
    name: "Lightning Demos", category: "Sprint Techniques",
    description: "Short, inspiring presentations (3 minutes each) where team members share an existing product, service, or idea that is relevant to the sprint challenge — to fuel Tuesday's individual sketching.",
    syntax: "Each person: find one inspiring example → present in 3 min → Facilitator captures the 'big idea'.",
    notes: "The goal is inspiration and breadth, not copying. Look beyond direct competitors — the best ideas often come from adjacent industries solving the same underlying problem in a different context.",
    returns: "A curated board of inspiring ideas and techniques that team members can draw on during individual sketching.",
    variations: [
      { title: "How to find good demos", code: "Direct: Competitors and best-in-class products\n\nAnalogous: Different industry, same problem\n  — Onboarding: Duolingo, not another SaaS tool\n  — Trust: Airbnb, not another marketplace\n  — Progress: Fitbit, not another productivity app\n\nAspirational: A product you admire for any reason\n  — A moment of delight, a clever interaction,\n    a simple solution to a complex problem\n\nInternal: Past experiments, old prototypes, support insights" },
      { title: "Presentation format", code: "3 minutes per person:\n\n1. Show the product (screenshot, live demo, or video)\n2. Explain the 'big idea' in one sentence\n   'The big idea here is...'\n3. Describe why it is relevant to the sprint\n\nFacilitator:\n  • Draws the big idea on the whiteboard as a sketch\n  • Labels it with its source\n  • Moves on at 3 minutes regardless" },
    ],
  },
  {
    name: "How Might We (HMW)", category: "Sprint Techniques",
    description: "During Monday's expert talks, team members silently capture ideas and challenges as 'How Might We' questions on sticky notes — reframing problems as design opportunities.",
    syntax: "'How might we [verb] [user] [goal/context]?' — one per sticky note.",
    notes: "HMW notes are generated throughout the Monday talks, not in a dedicated ideation session. Keep notes small — one observation per note. Aim for quantity; they are filtered by voting afterwards.",
    returns: "A large pool of opportunity questions that are organised, voted on, and used to inform the sprint target.",
    variations: [
      { title: "HMW in the sprint context", code: "During expert talks (Monday):\n  As you listen, note anything surprising, challenging,\n  or inspiring on a sticky note starting with 'HMW'\n\nAfter talks:\n  Post all notes on the wall\n  Organise silently into loose themes\n  Each person gets 2 dot-vote stickers\n  Vote on the most important HMWs\n  Decider picks their top 1–2 to focus the sprint target" },
      { title: "Good vs bad HMWs", code: "Too narrow (implies a solution):\n  ✗ 'HMW add a push notification reminder?'\n\nToo broad:\n  ✗ 'HMW improve the whole product?'\n\nJust right:\n  ✓ 'HMW help users who feel overwhelmed get started?'\n  ✓ 'HMW make the first week feel like a win?'\n  ✓ 'HMW reduce the time to first value to under 5 min?'" },
    ],
  },
  {
    name: "Crazy 8s", category: "Sprint Techniques",
    description: "An 8-minute rapid sketching exercise on Tuesday where each person generates 8 distinct ideas — one per minute — to push past obvious first ideas and unlock more creative solutions.",
    syntax: "Fold paper into 8 panels → 1 sketch per minute → 8 minutes total → no self-censorship.",
    notes: "Speed is the constraint that makes Crazy 8s work. The first 3–4 ideas are usually obvious. Ideas 5–8, forced under time pressure, are where the interesting thinking happens.",
    returns: "8 rough ideas per person that surface unexpected directions before committing to a single solution sketch.",
    variations: [
      { title: "How to run it", code: "1. Fold an A4 sheet into 8 panels\n2. Set a timer for 8 minutes\n3. Sketch one idea per panel — visuals, not just words\n4. Move to the next panel when the minute is up\n5. Do not go back and refine earlier panels\n6. After 8 minutes: share (no critique yet)\n7. Circle the 1–2 ideas you want to develop further\n\nOptional second round:\n  Focus the second Crazy 8 on the most\n  promising direction from round one." },
      { title: "What to sketch", code: "Each panel should show a different approach\nto the same problem — not 8 variations of one idea.\n\nAsk yourself:\n  • What if it were invisible / automatic?\n  • What would the simplest version look like?\n  • What would a 10-year-old design?\n  • What would the most expensive version look like?\n  • What if we reversed the flow entirely?\n  • What if the user never had to make a decision?\n  • How would a completely different industry solve this?\n  • What if we removed every optional step?" },
    ],
  },
  {
    name: "Storyboard", category: "Sprint Techniques",
    description: "A 15-panel comic-strip blueprint drawn on Wednesday that specifies exactly what the prototype will contain — each panel representing one screen or step of the user experience.",
    syntax: "Opening scene → 13 core panels → closing scene → one panel per step.",
    notes: "The storyboard is the single most important document in the sprint. Makers on Thursday build exactly what the storyboard shows — do not deviate. Ambiguity in the storyboard becomes ambiguity in the prototype.",
    returns: "An agreed, detailed blueprint that ensures the team builds the right prototype on Thursday.",
    variations: [
      { title: "Storyboard process", code: "1. Draw 15 empty boxes on the whiteboard (4×4 grid)\n2. Choose an opening scene (how does the user arrive?)\n   — Search result? Ad? Word of mouth? Email?\n3. Walk through Wednesday's winning sketch panels\n   adapting them into the storyboard boxes\n4. Fill each box with a rough screen + short caption\n5. Decider makes any needed calls on disagreements\n6. Photograph the completed board before erasing\n\nTime: 2–3 hours. Do not rush — vagueness costs you\nThursday prototype time." },
      { title: "Common storyboard mistakes", code: "✗ Making the opening too convenient\n   ('The user already has the app open')\n   Reality: Users need to find and download it first\n\n✗ Skipping transition states\n   What happens between Panel 3 and Panel 4?\n   Empty states, loading, confirmations matter\n\n✗ Too many panels\n   15 is the limit — more means the prototype is too complex\n   Simplify the flow, not the storyboard\n\n✗ Writing 'magic happens here'\n   Be specific about what appears on each screen\n   The prototype team cannot invent it on Thursday" },
    ],
  },

  // ── After the Sprint ──────────────────────────────────────────────────────
  {
    name: "Synthesising Friday's Results", category: "After the Sprint",
    description: "After all five user sessions, the team identifies patterns across participants and maps them back to the sprint questions defined on Monday to determine what was learned.",
    syntax: "Cluster observations → identify patterns (3+ users) → map to sprint questions → decide.",
    notes: "A finding requires a pattern — seen in at least 3 of 5 participants. Single observations are noise. The synthesis should take no more than two hours; resist the temptation to over-analyse.",
    returns: "A clear set of validated and invalidated assumptions, mapped to the original sprint questions.",
    variations: [
      { title: "Synthesis steps", code: "1. Review the sticky-note observations on the board\n   (5 columns, one per participant)\n\n2. Cluster similar observations across columns\n   — Give each cluster a short label\n\n3. Identify patterns (3+ columns = a finding)\n   — Mark with a circle or highlight\n\n4. Map findings back to each sprint question\n   — Answered: Yes / No / Partially\n\n5. Identify unexpected surprises\n   — Things users said or did that no one predicted" },
      { title: "Reporting results", code: "Sprint report (1–2 pages):\n\nChallenge\n  — The sprint question and long-term goal\n\nPrototype\n  — Screenshots of what was tested\n\nFindings (top 3–5)\n  — What users said and did\n  — Which sprint questions were answered\n\nDecision\n  — Iterate / Pivot / Build / Stop\n\nNext steps\n  — Who does what by when\n\nShare with the wider team and stakeholders\nwithin 48 hours while memory is fresh." },
    ],
  },
  {
    name: "Post-Sprint Decisions", category: "After the Sprint",
    description: "Friday ends with the Decider and team making a clear, evidence-based decision on what to do next. There are four possible outcomes: iterate, pivot, build, or stop.",
    syntax: "Review findings → map to sprint questions → Decider chooses: iterate / pivot / build / stop.",
    notes: "A sprint that invalidates an idea is not a failure — it is the highest-value outcome. Stopping the wrong idea early saves far more than a successful prototype costs. Celebrate learning, not just validation.",
    returns: "A clear, confident next step that is grounded in real user evidence rather than internal opinion.",
    variations: [
      { title: "The four post-sprint paths", code: "ITERATE\n  — The core idea works but execution needs refinement\n  — Run another sprint or go straight to usability testing\n  — Typical when: users understood the concept but\n    got stuck on specific interactions\n\nPIVOT\n  — The prototype failed but a new direction emerged\n  — Go back to Monday and sprint on the new direction\n  — Typical when: users wanted something adjacent\n    to what was tested\n\nBUILD\n  — The idea is validated; users loved it and completed tasks\n  — Move into engineering with confidence\n  — Typical when: 4–5 users completed tasks successfully\n    and expressed genuine desire to use it\n\nSTOP\n  — The idea is invalidated; users didn't want it\n  — Redirect resources to a more promising problem\n  — This is a success — you saved months of wasted build" },
      { title: "Signs of a successful sprint", code: "✓ The team is aligned on a clear direction\n✓ You have direct quotes from real users\n✓ Sprint questions are answered (yes or no)\n✓ The Decider made a confident final call\n✓ Next steps are assigned before people leave the room\n✓ The team learned something they didn't know on Monday\n\nA sprint is not successful because the idea was\nvalidated — it is successful because the team now\nknows something they didn't, and knows what to do next." },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Sprint Overview":   "bg-primary-100 text-primary-700",
  "The 5 Days":        "bg-violet-100 text-violet-700",
  "Sprint Techniques": "bg-amber-100 text-amber-700",
  "After the Sprint":  "bg-emerald-100 text-emerald-700",
};

export default function DesignSprint() {
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
