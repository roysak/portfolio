import{i as e,n as t,t as n}from"./index-jsx-runtime.js";var r=e(t(),1),i=n(),a=[{name:`What is a Design Sprint?`,category:`Sprint Overview`,description:`A Design Sprint is a five-day structured process developed by Jake Knapp at Google Ventures for answering critical business questions through design, prototyping, and testing — compressing months of work into a single week.`,syntax:`Monday: Map → Tuesday: Sketch → Wednesday: Decide → Thursday: Prototype → Friday: Test.`,notes:`The sprint is not a brainstorming session or a hackathon. It has a precise structure, defined roles, and strict time-boxing. The prototype tested on Friday is disposable — learning is the output, not the product.`,returns:`A validated (or invalidated) idea, a realistic prototype, and direct user feedback — all within five days.`,variations:[{title:`Sprint vs other processes`,code:`Design Sprint:
  + 5 days, structured, team-wide alignment
  + Produces a testable prototype and real user data
  + Best for high-stakes, high-uncertainty decisions
  − Heavy time commitment from senior stakeholders

Design Thinking:
  + Broader philosophy, flexible timeline
  + Deeper empathy research phase
  − Less structured, slower to produce testable artefacts

Agile Sprint:
  + Builds and ships working software
  + Iterative over weeks/months
  − Not optimised for early-stage exploration`},{title:`The core premise`,code:`Traditional process:
  Months of planning → build → launch → discover it's wrong

Design Sprint:
  5 days → realistic prototype → real user feedback
  → know whether you're right before you build

Key insight: You can simulate almost any product
experience in a prototype good enough to test in
just one day. You don't need to build it first.`}]},{name:`When to Run a Sprint`,category:`Sprint Overview`,description:`Design Sprints are most valuable at moments of high uncertainty and high stakes — when the cost of building the wrong thing is significant and the right direction is genuinely unclear.`,syntax:`High uncertainty + high stakes + a concrete question = ideal sprint candidate.`,notes:`Sprints are expensive — five days of a cross-functional team's time. Reserve them for decisions that would otherwise take months of debate or require a costly build to validate.`,returns:`Clarity on whether an idea is worth pursuing, and confidence in the direction chosen.`,variations:[{title:`Ideal sprint triggers`,code:`✓ Launching a new product or service
✓ Redesigning a core user flow that is underperforming
✓ Entering a new market or audience segment
✓ A big feature that is expensive to build and unproven
✓ A team that is stuck in debate and needs a decision
✓ A critical business problem with no obvious solution
✓ Evaluating a major technology or platform change`},{title:`When NOT to sprint`,code:`✗ The solution is already known — just build it
✗ The problem is vague and needs more research first
✗ Stakeholders are not available for the full week
✗ The team is not empowered to make decisions
✗ You are already mid-build — use usability testing instead
✗ The problem is primarily technical, not a design problem`}]},{name:`Sprint Team & Roles`,category:`Sprint Overview`,description:`A Design Sprint requires a small, cross-functional team of 4–7 people plus a dedicated Facilitator. Every member must be present for all five days — partial attendance breaks the process.`,syntax:`Facilitator + Decider + 4–6 cross-functional members = 5–7 people total.`,notes:`The Decider is the most important role — they have final authority and their presence prevents decisions being reopened after the sprint. The Facilitator manages time and process, not content.`,returns:`A fully aligned team that has shared context, shared ownership of decisions, and a jointly built prototype.`,variations:[{title:`Team composition`,code:`Facilitator (Sprint Master)
  — Runs the process, keeps time, stays neutral
  — Does NOT participate in content decisions

Decider
  — CEO, product lead, or decision owner
  — Has the final vote on all key decisions
  — Must be present every day

Core members (pick 4–5):
  — Product Manager
  — Designer / UX Researcher
  — Engineer (feasibility lens)
  — Marketing / Business
  — Customer-facing role (sales, support, CS)`},{title:`Optional experts (Monday only)`,code:`Experts join Monday's talks for 15–20 min each
to share specialised knowledge the team lacks:

• The engineer — 'What are the technical constraints?'
• The researcher — 'What do we know about users?'
• The sales lead — 'What do customers say they want?'
• A satisfied customer — 'Why do you use us?'
• A churned customer — 'Why did you leave?'`}]},{name:`Sprint Preparation`,category:`Sprint Overview`,description:`A successful sprint requires one to two weeks of preparation by the Facilitator. Arriving unprepared wastes the entire team's week.`,syntax:`Set the challenge → book the space → recruit testers → prepare materials.`,notes:`Recruit test participants during the sprint week, not after. Five participants is the target — enough to find patterns without being overwhelming to analyse in a single afternoon.`,returns:`A sprint-ready team, room, materials, and five confirmed test participants for Friday.`,variations:[{title:`Pre-sprint checklist`,code:`2 weeks before:
□ Define the sprint challenge and long-term goal
□ Confirm Decider and team availability all 5 days
□ Book a dedicated sprint room for the full week
□ Begin recruiting 5 test participants for Friday

1 week before:
□ Prepare sprint questions with the Decider
□ Set up sprint supplies (sticky notes, markers, paper)
□ Confirm expert speakers for Monday
□ Brief the team on the sprint format

Day before:
□ Confirm all 5 Friday participants
□ Set up the sprint room
□ Prepare the Monday schedule`},{title:`Recruiting test participants`,code:`Target profile:
  Match the real target user, not convenience
  (avoid colleagues, friends, or power users)

How many: 5 participants
  — 5 users reveals ~85% of usability problems
  — More users = diminishing returns in one session

Screener questions:
  • Role, industry, or lifestyle match
  • Usage of relevant tools or behaviours
  • Availability on Friday for 1-hour session

Incentive:
  Offer a gift card (£50–£100 / $50–$100)
  Always over-recruit by 1–2 to cover no-shows`}]},{name:`Monday: Map`,category:`The 5 Days`,description:`Monday is about building shared understanding. The team defines the long-term goal, maps the problem space, and chooses a specific target to focus the rest of the sprint on.`,syntax:`Long-term goal → Sprint questions → Expert talks → User journey map → Choose target.`,notes:`Monday ends with the Decider choosing a specific moment in the user journey to focus on. Without this constraint, the rest of the week loses focus. The map is the north star for all subsequent decisions.`,returns:`A shared understanding of the problem, a user journey map, and a chosen target moment for the sprint.`,variations:[{title:`Monday schedule`,code:`09:00 — Start at the end (long-term goal)
09:30 — Sprint questions (what must be true?)
10:00 — Map the user journey (high-level)
11:00 — Expert talks (15–20 min each)
13:00 — Lunch
14:00 — How Might We notes (during talks)
15:00 — Organise & vote on HMW notes
16:00 — Target — Decider chooses the focus
17:00 — End`},{title:`Long-term goal format`,code:`Frame it as an optimistic 2–5 year future:

'In two years, [product] will be the go-to tool
for [target user] to [core job to be done].'

Example:
'In three years, our app will be the trusted
companion that helps first-time investors make
confident, informed decisions every week.'

Then ask: What must be true for this to happen?`},{title:`Sprint questions`,code:`Sprint questions capture what must be true for
the long-term goal to succeed, and what could
cause the sprint to fail.

Format: 'Can we [assumption]?'

Examples:
• Can we help users understand the product in < 2 min?
• Can we build trust before asking for payment info?
• Can we retain users past the first week?
• Can we design for low-tech-literacy users?

These become the evaluation criteria on Friday.`}]},{name:`Tuesday: Sketch`,category:`The 5 Days`,description:`Tuesday is individual creative work. Each team member independently researches inspiration, then produces a detailed solution sketch — working alone to avoid groupthink.`,syntax:`Lightning demos → Notes → Ideas → Crazy 8s → Solution sketch.`,notes:`Working individually is the key difference from traditional brainstorming. The best ideas come from individuals thinking deeply, not groups talking. The sketches must be self-explanatory — they will be critiqued anonymously.`,returns:`A set of competing, detailed solution sketches — one per team member — ready to be critiqued and voted on Wednesday.`,variations:[{title:`Tuesday schedule`,code:`09:00 — Lightning demos (inspiring examples, 3 min each)
10:30 — Notes (review Monday's map and materials)
11:00 — Ideas (messy individual brainstorm)
11:30 — Crazy 8s (8 ideas in 8 minutes)
12:00 — Lunch
13:00 — Solution sketch (3-panel storyboard)
17:00 — End (sketches anonymous, face-down)`},{title:`Lightning demos`,code:`Each team member presents one inspiring product
or idea relevant to the sprint challenge.

Format per demo:
  • Show a screenshot or demo of the product
  • Explain the 'big idea' in 3 minutes or less
  • Facilitator captures key ideas on the whiteboard

Sources to explore:
  • Competitor products
  • Adjacent industries (same problem, different context)
  • The best product in a completely unrelated field
  • Past internal experiments`},{title:`Solution sketch format`,code:`3 panels drawn on paper:

Panel 1: The entry point (how does the user arrive?)
Panel 2: The core interaction (the key moment)
Panel 3: The outcome (what happens next?)

Rules:
  • Words and annotations are fine and encouraged
  • Must be self-explanatory without verbal explanation
  • No names — sketches are anonymous until Wednesday
  • Concrete, not vague — specific UI, not 'better UX'`}]},{name:`Wednesday: Decide`,category:`The 5 Days`,description:`Wednesday is decision day. The team reviews all sketches, votes on the best ideas, and the Decider makes the final call. The winning ideas are assembled into a storyboard for the prototype.`,syntax:`Art museum → Heat map vote → Speed critique → Straw poll → Decider vote → Storyboard.`,notes:`The structured voting process replaces open debate, which wastes time and favours the loudest voice. The Decider's vote is final — this is not a democracy. The storyboard created on Wednesday is the exact blueprint for Thursday's prototype.`,returns:`A single, decided direction and a 15-panel storyboard that specifies exactly what the prototype will contain.`,variations:[{title:`Wednesday schedule`,code:`09:00 — Art museum (post sketches on the wall)
09:30 — Heat map vote (silent dot voting)
10:00 — Speed critique (3 min per sketch)
11:30 — Straw poll (team's preference)
12:00 — Decider vote (final decision)
13:00 — Lunch
14:00 — Storyboard (15-panel prototype blueprint)
17:00 — End`},{title:`Heat map voting`,code:`1. Post all sketches anonymously on the wall
2. Give each team member a sheet of small dot stickers
3. Everyone walks the 'art museum' silently for 5 min
4. Place dots on the parts they find most interesting
   (not just the overall sketch — specific elements)
5. No talking during voting
6. Dots accumulate into a heat map of team interest

This surfaces what resonates before any discussion begins.`},{title:`Storyboard`,code:`A 15-panel comic-strip blueprint of the prototype.

Panel 1: The opening scene
  — How does the user first encounter this?
  — Website, ad, app store, referral?

Panels 2–14: The core experience
  — Each panel = one screen or one step
  — Draw roughly but specifically
  — Note key copy, labels, and interactions

Panel 15: The ending
  — What happens when the task is done?
  — What is the user's final emotional state?`}]},{name:`Thursday: Prototype`,category:`The 5 Days`,description:`Thursday is a full-day build sprint. The team creates a realistic-looking prototype based on Wednesday's storyboard — not working software, but something convincing enough to elicit genuine reactions from users.`,syntax:`Divide roles → build in parallel → assemble → trial run → prepare interview guide.`,notes:`The goal is 'good enough to test', not perfect. A Keynote or Figma prototype with realistic copy and images is almost always sufficient. Reserve the last hour for a full trial run and to prepare Friday's interview script.`,returns:`A realistic, testable prototype and a prepared interview script, ready for five user sessions on Friday.`,variations:[{title:`Thursday team roles`,code:`Makers (2–3 people)
  — Build individual screens or components
  — Use a tool that allows fast visual assembly
  — Work from Wednesday's storyboard panels

Asset collector (1 person)
  — Gathers images, copy, icons, and content
  — Provides to Makers as they need them

Writer (1 person)
  — Writes all UI copy, labels, and error messages
  — Ensures the prototype sounds real, not placeholder-y

Interviewer (1 person — usually the facilitator)
  — Steps away from building
  — Prepares Friday's interview guide
  — Confirms all 5 participants`},{title:`Prototype tools`,code:`Speed matters — choose tools your team already knows:

Figma / Sketch
  + Realistic visual design, good for UI
  + Easy clickable prototype mode

Keynote / PowerPoint
  + Extremely fast assembly
  + Surprisingly convincing for screens

Marvel / InVision
  + Quick hotspot linking of static images
  + No design skill required

Webflow / Framer
  + More interactive if needed
  − Slower to build

Rule: If you spend more than 30 min on one screen,
stop and simplify — you are over-building.`},{title:`Trial run checklist`,code:`At 16:00 on Thursday, do a full run-through:

□ Click through every step of the prototype
□ Check all links work correctly
□ Verify copy reads naturally (not placeholder text)
□ Confirm the prototype looks realistic on target device
□ Identify any missing screens or dead ends
□ Run the interview guide with a team member as stand-in
□ Time the session — it should fit in 60 minutes
□ Prepare backup (screenshots) in case of tech failure`}]},{name:`Friday: Test`,category:`The 5 Days`,description:`Friday is interview day. Each of the five participants completes a one-hour session with the Interviewer while the rest of the team watches a live feed and takes notes together — observing patterns as they emerge.`,syntax:`5 × 1-hour sessions → team observes live → note patterns → synthesise → decide next steps.`,notes:`After five sessions, patterns become undeniable. Three or more users making the same mistake or expressing the same confusion is a finding. One user's issue may be noise — look for repetition across participants.`,returns:`Direct user feedback on the prototype, clear answers to the sprint questions, and a confident decision on what to do next.`,variations:[{title:`Friday schedule`,code:`09:00 — Briefing and last-minute setup
09:30 — Interview session 1
10:30 — Interview session 2
11:30 — Interview session 3
12:30 — Lunch (quick — keep momentum)
13:00 — Interview session 4
14:00 — Interview session 5
15:00 — Team synthesis and pattern discussion
16:00 — Review sprint questions — answered?
16:30 — Decide: iterate, pivot, build, or abandon
17:00 — End`},{title:`Interviewer guide`,code:`Opening (5 min):
  'We are testing the design, not you — be honest.'
  'Think aloud as you work through tasks.'
  'There are no right or wrong answers.'

Warm-up (5 min):
  Learn about their context and current behaviours

Prototype tasks (40 min):
  Give scenario-based tasks, not instructions:
  ✓ 'Imagine you just heard about this. What would you do?'
  ✗ 'Click the blue button and then go to settings.'

Debrief (10 min):
  'What stood out to you — good or bad?'
  'If this were real, would you use it? Why or why not?'`},{title:`Live note-taking`,code:`The team watches the live stream together.
Each person takes notes individually:

Setup:
  Whiteboard or shared doc with 5 columns (one per user)
  Two rows: positives (+) and negatives (−)

Process:
  • Write one observation per sticky note
  • Note the participant number, not their name
  • Focus on behaviour, not interpretation
  • Circle observations that appear 3+ times

After all sessions:
  Cluster notes by theme across the 5 columns
  Patterns (3+ users) = findings
  One-offs = noise (but note them)`}]},{name:`Note-and-Vote`,category:`Sprint Techniques`,description:`A structured decision-making technique used throughout the sprint to replace open debate. Each person writes ideas or votes silently and independently before any discussion.`,syntax:`Write silently → share simultaneously → discuss briefly → vote → Decider decides.`,notes:`Note-and-Vote eliminates the influence of social dynamics, seniority, and vocal dominance. It consistently produces better decisions faster than open group discussion.`,returns:`A fast, fair group decision that everyone feels heard by, even if they disagreed.`,variations:[{title:`The method`,code:`1. Silent individual writing
   Each person writes their answer, idea, or vote
   on paper or a sticky note — no peeking

2. Simultaneous reveal
   Everyone holds up / posts their answer at once
   No reactions until all are visible

3. Brief discussion
   Clarify only — not debate. 2 minutes max.

4. Vote
   Another round of silent voting if needed

5. Decider decides
   The Decider makes the final call
   No further debate after the decision`},{title:`Where it is used in the sprint`,code:`Monday: Choosing the sprint target from the journey map
Monday: Voting on How Might We notes
Wednesday: Heat map voting on solution sketches
Wednesday: Straw poll before Decider vote
Friday: Team votes on patterns before Decider decides next steps

Any time the team is stuck in discussion:
  → Stop talking. Do a Note-and-Vote.`}]},{name:`Lightning Demos`,category:`Sprint Techniques`,description:`Short, inspiring presentations (3 minutes each) where team members share an existing product, service, or idea that is relevant to the sprint challenge — to fuel Tuesday's individual sketching.`,syntax:`Each person: find one inspiring example → present in 3 min → Facilitator captures the 'big idea'.`,notes:`The goal is inspiration and breadth, not copying. Look beyond direct competitors — the best ideas often come from adjacent industries solving the same underlying problem in a different context.`,returns:`A curated board of inspiring ideas and techniques that team members can draw on during individual sketching.`,variations:[{title:`How to find good demos`,code:`Direct: Competitors and best-in-class products

Analogous: Different industry, same problem
  — Onboarding: Duolingo, not another SaaS tool
  — Trust: Airbnb, not another marketplace
  — Progress: Fitbit, not another productivity app

Aspirational: A product you admire for any reason
  — A moment of delight, a clever interaction,
    a simple solution to a complex problem

Internal: Past experiments, old prototypes, support insights`},{title:`Presentation format`,code:`3 minutes per person:

1. Show the product (screenshot, live demo, or video)
2. Explain the 'big idea' in one sentence
   'The big idea here is...'
3. Describe why it is relevant to the sprint

Facilitator:
  • Draws the big idea on the whiteboard as a sketch
  • Labels it with its source
  • Moves on at 3 minutes regardless`}]},{name:`How Might We (HMW)`,category:`Sprint Techniques`,description:`During Monday's expert talks, team members silently capture ideas and challenges as 'How Might We' questions on sticky notes — reframing problems as design opportunities.`,syntax:`'How might we [verb] [user] [goal/context]?' — one per sticky note.`,notes:`HMW notes are generated throughout the Monday talks, not in a dedicated ideation session. Keep notes small — one observation per note. Aim for quantity; they are filtered by voting afterwards.`,returns:`A large pool of opportunity questions that are organised, voted on, and used to inform the sprint target.`,variations:[{title:`HMW in the sprint context`,code:`During expert talks (Monday):
  As you listen, note anything surprising, challenging,
  or inspiring on a sticky note starting with 'HMW'

After talks:
  Post all notes on the wall
  Organise silently into loose themes
  Each person gets 2 dot-vote stickers
  Vote on the most important HMWs
  Decider picks their top 1–2 to focus the sprint target`},{title:`Good vs bad HMWs`,code:`Too narrow (implies a solution):
  ✗ 'HMW add a push notification reminder?'

Too broad:
  ✗ 'HMW improve the whole product?'

Just right:
  ✓ 'HMW help users who feel overwhelmed get started?'
  ✓ 'HMW make the first week feel like a win?'
  ✓ 'HMW reduce the time to first value to under 5 min?'`}]},{name:`Crazy 8s`,category:`Sprint Techniques`,description:`An 8-minute rapid sketching exercise on Tuesday where each person generates 8 distinct ideas — one per minute — to push past obvious first ideas and unlock more creative solutions.`,syntax:`Fold paper into 8 panels → 1 sketch per minute → 8 minutes total → no self-censorship.`,notes:`Speed is the constraint that makes Crazy 8s work. The first 3–4 ideas are usually obvious. Ideas 5–8, forced under time pressure, are where the interesting thinking happens.`,returns:`8 rough ideas per person that surface unexpected directions before committing to a single solution sketch.`,variations:[{title:`How to run it`,code:`1. Fold an A4 sheet into 8 panels
2. Set a timer for 8 minutes
3. Sketch one idea per panel — visuals, not just words
4. Move to the next panel when the minute is up
5. Do not go back and refine earlier panels
6. After 8 minutes: share (no critique yet)
7. Circle the 1–2 ideas you want to develop further

Optional second round:
  Focus the second Crazy 8 on the most
  promising direction from round one.`},{title:`What to sketch`,code:`Each panel should show a different approach
to the same problem — not 8 variations of one idea.

Ask yourself:
  • What if it were invisible / automatic?
  • What would the simplest version look like?
  • What would a 10-year-old design?
  • What would the most expensive version look like?
  • What if we reversed the flow entirely?
  • What if the user never had to make a decision?
  • How would a completely different industry solve this?
  • What if we removed every optional step?`}]},{name:`Storyboard`,category:`Sprint Techniques`,description:`A 15-panel comic-strip blueprint drawn on Wednesday that specifies exactly what the prototype will contain — each panel representing one screen or step of the user experience.`,syntax:`Opening scene → 13 core panels → closing scene → one panel per step.`,notes:`The storyboard is the single most important document in the sprint. Makers on Thursday build exactly what the storyboard shows — do not deviate. Ambiguity in the storyboard becomes ambiguity in the prototype.`,returns:`An agreed, detailed blueprint that ensures the team builds the right prototype on Thursday.`,variations:[{title:`Storyboard process`,code:`1. Draw 15 empty boxes on the whiteboard (4×4 grid)
2. Choose an opening scene (how does the user arrive?)
   — Search result? Ad? Word of mouth? Email?
3. Walk through Wednesday's winning sketch panels
   adapting them into the storyboard boxes
4. Fill each box with a rough screen + short caption
5. Decider makes any needed calls on disagreements
6. Photograph the completed board before erasing

Time: 2–3 hours. Do not rush — vagueness costs you
Thursday prototype time.`},{title:`Common storyboard mistakes`,code:`✗ Making the opening too convenient
   ('The user already has the app open')
   Reality: Users need to find and download it first

✗ Skipping transition states
   What happens between Panel 3 and Panel 4?
   Empty states, loading, confirmations matter

✗ Too many panels
   15 is the limit — more means the prototype is too complex
   Simplify the flow, not the storyboard

✗ Writing 'magic happens here'
   Be specific about what appears on each screen
   The prototype team cannot invent it on Thursday`}]},{name:`Synthesising Friday's Results`,category:`After the Sprint`,description:`After all five user sessions, the team identifies patterns across participants and maps them back to the sprint questions defined on Monday to determine what was learned.`,syntax:`Cluster observations → identify patterns (3+ users) → map to sprint questions → decide.`,notes:`A finding requires a pattern — seen in at least 3 of 5 participants. Single observations are noise. The synthesis should take no more than two hours; resist the temptation to over-analyse.`,returns:`A clear set of validated and invalidated assumptions, mapped to the original sprint questions.`,variations:[{title:`Synthesis steps`,code:`1. Review the sticky-note observations on the board
   (5 columns, one per participant)

2. Cluster similar observations across columns
   — Give each cluster a short label

3. Identify patterns (3+ columns = a finding)
   — Mark with a circle or highlight

4. Map findings back to each sprint question
   — Answered: Yes / No / Partially

5. Identify unexpected surprises
   — Things users said or did that no one predicted`},{title:`Reporting results`,code:`Sprint report (1–2 pages):

Challenge
  — The sprint question and long-term goal

Prototype
  — Screenshots of what was tested

Findings (top 3–5)
  — What users said and did
  — Which sprint questions were answered

Decision
  — Iterate / Pivot / Build / Stop

Next steps
  — Who does what by when

Share with the wider team and stakeholders
within 48 hours while memory is fresh.`}]},{name:`Post-Sprint Decisions`,category:`After the Sprint`,description:`Friday ends with the Decider and team making a clear, evidence-based decision on what to do next. There are four possible outcomes: iterate, pivot, build, or stop.`,syntax:`Review findings → map to sprint questions → Decider chooses: iterate / pivot / build / stop.`,notes:`A sprint that invalidates an idea is not a failure — it is the highest-value outcome. Stopping the wrong idea early saves far more than a successful prototype costs. Celebrate learning, not just validation.`,returns:`A clear, confident next step that is grounded in real user evidence rather than internal opinion.`,variations:[{title:`The four post-sprint paths`,code:`ITERATE
  — The core idea works but execution needs refinement
  — Run another sprint or go straight to usability testing
  — Typical when: users understood the concept but
    got stuck on specific interactions

PIVOT
  — The prototype failed but a new direction emerged
  — Go back to Monday and sprint on the new direction
  — Typical when: users wanted something adjacent
    to what was tested

BUILD
  — The idea is validated; users loved it and completed tasks
  — Move into engineering with confidence
  — Typical when: 4–5 users completed tasks successfully
    and expressed genuine desire to use it

STOP
  — The idea is invalidated; users didn't want it
  — Redirect resources to a more promising problem
  — This is a success — you saved months of wasted build`},{title:`Signs of a successful sprint`,code:`✓ The team is aligned on a clear direction
✓ You have direct quotes from real users
✓ Sprint questions are answered (yes or no)
✓ The Decider made a confident final call
✓ Next steps are assigned before people leave the room
✓ The team learned something they didn't know on Monday

A sprint is not successful because the idea was
validated — it is successful because the team now
knows something they didn't, and knows what to do next.`}]}],o={"Sprint Overview":`bg-primary-100 text-primary-700`,"The 5 Days":`bg-violet-100 text-violet-700`,"Sprint Techniques":`bg-amber-100 text-amber-700`,"After the Sprint":`bg-emerald-100 text-emerald-700`};function s(){let[e,t]=(0,r.useState)(null),[n,s]=(0,r.useState)(0),c=Array.from(new Set(a.map(e=>e.category)));return(0,r.useEffect)(()=>{s(0)},[e]),(0,r.useEffect)(()=>(document.body.style.overflow=e?`hidden`:``,()=>{document.body.style.overflow=``}),[e]),(0,i.jsxs)(i.Fragment,{children:[c.map(e=>(0,i.jsxs)(`section`,{className:`mb-10`,children:[(0,i.jsxs)(`div`,{className:`flex items-center gap-3 mb-4`,children:[(0,i.jsx)(`h2`,{className:`text-lg font-semibold text-neutral-800`,children:e}),(0,i.jsxs)(`span`,{className:`text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e]}`,children:[a.filter(t=>t.category===e).length,` topics`]})]}),(0,i.jsx)(`div`,{className:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3`,children:a.filter(t=>t.category===e).map(e=>(0,i.jsxs)(`button`,{onClick:()=>t(e),className:`group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary-600`,children:[(0,i.jsx)(`span`,{className:`text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-tight`,children:e.name}),(0,i.jsx)(`span`,{className:`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e.category]}`,children:e.category})]},e.name))})]},e)),(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4 text-xs text-neutral-500`,children:[(0,i.jsx)(`span`,{className:`font-medium text-neutral-400 uppercase tracking-wide`,children:`Category`}),Object.entries(o).map(([e,t])=>(0,i.jsx)(`span`,{className:`px-2.5 py-0.5 rounded-full font-semibold ${t}`,children:e},e))]}),e&&(0,i.jsx)(`div`,{className:`fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm`,onClick:()=>t(null),children:(0,i.jsxs)(`div`,{className:`bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden`,onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(`div`,{className:`flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50`,children:[(0,i.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,i.jsx)(`h2`,{className:`text-xl font-semibold text-neutral-900`,children:e.name}),(0,i.jsx)(`span`,{className:`text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e.category]}`,children:e.category})]}),(0,i.jsx)(`button`,{onClick:()=>t(null),className:`text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-full hover:bg-neutral-200`,"aria-label":`Close`,children:(0,i.jsx)(`span`,{className:`material-symbols-rounded text-xl! leading-none block!`,children:`close`})})]}),(0,i.jsxs)(`div`,{className:`p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-6`,children:[(0,i.jsx)(`p`,{className:`text-neutral-600 leading-relaxed`,children:e.description}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Summary`}),(0,i.jsx)(`pre`,{className:`bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-sm font-mono`,style:{userSelect:`text`},children:(0,i.jsx)(`code`,{children:e.syntax})})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Notes`}),(0,i.jsx)(`p`,{className:`text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4`,children:e.notes})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Outcome`}),(0,i.jsx)(`p`,{className:`text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4`,children:e.returns})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Examples`}),(0,i.jsx)(`div`,{className:`rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100`,children:e.variations.map((e,t)=>{let r=n===t;return(0,i.jsxs)(`div`,{className:`bg-neutral-50`,children:[(0,i.jsxs)(`button`,{onClick:()=>s(r?null:t),className:`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-100 transition-colors`,children:[(0,i.jsx)(`span`,{className:`text-sm font-semibold text-neutral-700`,children:e.title}),(0,i.jsx)(`span`,{className:`material-symbols-rounded text-base! text-neutral-400 transition-transform duration-200 ${r?`rotate-180`:``}`,children:`expand_more`})]}),r&&(0,i.jsx)(`div`,{className:`px-4 pb-4 pt-1 bg-white`,children:(0,i.jsx)(`pre`,{className:`bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-xs font-mono`,style:{userSelect:`text`},children:(0,i.jsx)(`code`,{children:e.code})})})]},t)})})]})]})]})})]})}export{s as default};