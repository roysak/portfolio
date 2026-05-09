import { CategorizedArticle, UX_LABELS } from "./components";
import type { TopicItem } from "./components";

const topicsData: TopicItem[] = [
  // ── The 5 Stages ─────────────────────────────────────────────────────────
  {
    name: "1. Empathise", category: "The 5 Stages",
    description: "The first stage is about deeply understanding the people you are designing for. Suspend assumptions and seek to understand users' needs, emotions, motivations, and pain points through direct observation and engagement.",
    syntax: "Observe → Engage → Immerse → Listen without judgement.",
    notes: "This is the foundation of human-centred design. Poor empathy leads to solving the wrong problem. Spend more time here than feels comfortable — most teams rush past it.",
    returns: "A rich, first-hand understanding of users' real-world experiences and unmet needs.",
    variations: [
      { title: "Core activities", code: "• Conduct user interviews (open-ended questions)\n• Observe users in their natural environment\n• Try the experience yourself (immersion)\n• Review existing research, data, and support logs\n• Run empathy mapping workshops" },
      { title: "Good empathy practices", code: "✓ Ask 'why' at least 5 times to reach root causes\n✓ Record sessions (with consent) to revisit nuance\n✓ Take notes on emotions, not just facts\n✓ Involve the whole team — empathy is not just research's job\n✓ Look for workarounds — they reveal real frustrations" },
      { title: "Common mistakes", code: "✗ Asking leading questions ('Do you find this easy?')\n✗ Designing for the average — the edges reveal the most\n✗ Treating surveys alone as empathy\n✗ Skipping this stage when time is tight\n✗ Letting internal assumptions substitute for user data" },
    ],
  },
  {
    name: "2. Define", category: "The 5 Stages",
    description: "Synthesise your research into a sharp, human-centred problem statement. Move from raw observations to a clear articulation of the core problem that will guide the rest of the process.",
    syntax: "Synthesise insights → identify patterns → craft a Point of View (POV).",
    notes: "A well-written problem statement is specific enough to be actionable but broad enough to allow creative solutions. Avoid defining the problem as a disguised solution.",
    returns: "A clear, focused problem statement that aligns the team and sets the direction for ideation.",
    variations: [
      { title: "POV statement formula", code: "[User] needs [need] because [insight].\n\nExample:\n'A busy working parent needs a way to track\ntheir child's medication schedule because\noverlapping appointments cause dangerous gaps.'" },
      { title: "Synthesis tools", code: "• Affinity mapping — cluster raw observations into themes\n• Empathy maps — surface what users say, think, feel, do\n• Journey maps — spot pain points across the full experience\n• 'How Might We' questions — reframe problems as opportunities\n• 2×2 prioritisation — rank themes by impact and frequency" },
      { title: "Signs of a good problem statement", code: "✓ Focuses on the user, not the product\n✓ Describes a need, not a feature\n✓ Is specific and actionable\n✓ Does not imply a solution\n✓ The team can hold it in their heads\n✓ It could generate many different solutions" },
    ],
  },
  {
    name: "3. Ideate", category: "The 5 Stages",
    description: "Generate a large and diverse pool of ideas — quantity over quality at first. Challenge assumptions, think laterally, and defer judgement to create space for breakthrough thinking.",
    syntax: "Diverge widely → defer judgement → converge on the most promising ideas.",
    notes: "The best idea is rarely the first idea. Create psychological safety so that wild ideas surface — they often contain the seed of the real solution. Separate generation from evaluation.",
    returns: "A broad set of potential solutions from which the best candidates are selected for prototyping.",
    variations: [
      { title: "Brainstorming rules", code: "1. Defer judgement — no criticism during generation\n2. Encourage wild ideas — quantity first\n3. Build on others' ideas ('Yes, and...')\n4. Stay focused on the topic\n5. One conversation at a time\n6. Be visual — sketch, don't just talk\n7. Go for volume — aim for 50+ ideas" },
      { title: "Ideation techniques", code: "• Crazy 8s — 8 ideas in 8 minutes (forces speed)\n• SCAMPER — Substitute, Combine, Adapt, Modify,\n             Put to other uses, Eliminate, Reverse\n• Worst possible idea — reverse to find good ones\n• Analogous inspiration — borrow from other industries\n• Storyboarding — sketch ideas as narrative sequences" },
      { title: "Converging and selecting", code: "• Dot voting — each team member gets 3–5 sticky dots\n• 2×2 matrix — plot by feasibility vs. impact\n• 'I like / I wish / What if' — structured critique\n• Rose / Thorn / Bud — positives, problems, potential\n• Build a prototype of top 2–3 ideas in parallel" },
    ],
  },
  {
    name: "4. Prototype", category: "The 5 Stages",
    description: "Build quick, cheap, tangible representations of your ideas to make them testable. The goal is to learn, not to build the final product — prototypes are meant to be thrown away.",
    syntax: "Build to think → make it tangible → test one assumption at a time.",
    notes: "Prototypes should answer a specific question. Match fidelity to the question: paper for concept validation, interactive for flow testing, high-fi for visual and micro-interaction feedback.",
    returns: "A testable artefact that exposes assumptions and generates real user feedback quickly.",
    variations: [
      { title: "Fidelity levels", code: "Low-fi (paper / sketch)\n  — Concept validation, rough flow\n  — Takes: minutes to hours\n  — Tests: 'Is this the right idea?'\n\nMid-fi (wireframe / clickable)\n  — Flow and information architecture\n  — Takes: hours to days\n  — Tests: 'Does this flow make sense?'\n\nHigh-fi (visual / interactive)\n  — Look, feel, micro-interactions\n  — Takes: days to weeks\n  — Tests: 'Is this desirable and usable?'" },
      { title: "Prototype types", code: "• Paper prototype — sketches on paper, manually 'clicked'\n• Clickable wireframe — Figma / Sketch / Axure\n• Wizard of Oz — human powers the 'system' behind the scenes\n• Storyboard — comic-strip narrative of the experience\n• Role-play / bodystorming — act out the service\n• Physical prototype — foam, cardboard for hardware/spaces" },
      { title: "Prototype mindset", code: "✓ Build to learn, not to impress\n✓ One prototype per key assumption\n✓ Timebox ruthlessly — 1 day max for early prototypes\n✓ Label it 'prototype' to set expectations\n✓ Keep it rough enough that users feel safe critiquing\n✓ Test with 5 users — reveals most usability issues" },
    ],
  },
  {
    name: "5. Test", category: "The 5 Stages",
    description: "Put prototypes in front of real users and observe. Listen to what users do, not just what they say. Use findings to refine the prototype, redefine the problem, or pivot the solution.",
    syntax: "Observe → listen → learn → iterate → refine or pivot.",
    notes: "Testing is not about validating your idea — it is about learning what is wrong with it. Stay curious and emotionally detached from your prototype. Failure is the most valuable outcome.",
    returns: "Validated insights that drive the next iteration and move the solution closer to a genuine user need.",
    variations: [
      { title: "Testing session structure", code: "1. Welcome (2 min)\n   Set context, explain think-aloud protocol\n2. Warm-up questions (3 min)\n   Learn about the user's context and background\n3. Tasks (20–30 min)\n   Give scenario-based tasks, observe silently\n4. Debrief (5–10 min)\n   Ask about surprises, frustrations, preferences\n5. Synthesis (after session)\n   Note observations, insights, recommendations" },
      { title: "What to watch for", code: "• Points of confusion or hesitation\n• Unexpected paths through the interface\n• Workarounds the user invents\n• Moments of delight or surprise\n• Tasks that fail or take much longer than expected\n• Verbalisations of emotion ('Ugh', 'Oh nice', 'Hmm...')" },
      { title: "After testing: decide", code: "Iterate — fix what's broken, keep what works\nPivot — the problem definition was wrong; go back to Define\nPerservere — the prototype is validated; increase fidelity\n\nOne round of testing rarely ends the process.\nPlan for at least 2–3 cycles before committing to build." },
    ],
  },

  // ── Research Methods ──────────────────────────────────────────────────────
  {
    name: "User Interviews", category: "Research Methods",
    description: "One-on-one conversations with users to uncover their goals, behaviours, pain points, and mental models. The richest source of qualitative insight in the Empathise stage.",
    syntax: "Prepare guide → recruit participants → ask open questions → listen actively.",
    notes: "Interviews reveal the 'why' behind behaviour that analytics cannot explain. Aim for 5–8 participants per audience segment. Conduct sessions in the user's natural environment when possible.",
    returns: "Qualitative insights into user motivations, frustrations, and mental models.",
    variations: [
      { title: "Question types", code: "✓ Open: 'Tell me about the last time you...'\n✓ Probing: 'Why did you do it that way?'\n✓ Clarifying: 'Can you show me what you mean?'\n✓ Silent pause — allow time to fill silence\n\n✗ Leading: 'Did you find that frustrating?'\n✗ Closed: 'Do you use this feature?'\n✗ Hypothetical: 'Would you use this if we built it?'" },
      { title: "Interview guide structure", code: "1. Introduction & consent\n2. Background questions (role, context, habits)\n3. Core topic questions (open, then deep-dive)\n4. Specific scenario / task walkthrough\n5. Closing — anything you'd like to add?" },
    ],
  },
  {
    name: "Empathy Map", category: "Research Methods",
    description: "A collaborative visualisation tool that captures what a user says, thinks, does, and feels. Helps teams build shared understanding and surface hidden needs and contradictions.",
    syntax: "4 quadrants: Says | Thinks | Does | Feels → Pains | Gains.",
    notes: "Contradictions between what a user says and what they do are the most valuable insights. Run the mapping exercise as a team immediately after research, while observations are fresh.",
    returns: "A shared team understanding of the user that grounds subsequent design decisions.",
    variations: [
      { title: "Empathy map quadrants", code: "SAYS   — Direct quotes from interviews/observation\nTHINKS — Beliefs, assumptions (may differ from Says)\nDOES   — Observable behaviours and actions\nFEELS  — Emotional state, attitude, mood\n\nPAINS  — Frustrations, fears, obstacles\nGAINS  — Wants, needs, measures of success" },
      { title: "How to run it", code: "1. Write each observation on a separate sticky note\n2. Place notes into the four quadrants as a team\n3. Look for patterns, repetitions, contradictions\n4. Synthesise pains and gains from the clusters\n5. Use the output to inform your POV statement" },
    ],
  },
  {
    name: "Customer Journey Map", category: "Research Methods",
    description: "A timeline visualisation of a user's end-to-end experience with a product, service, or situation — including actions, touchpoints, emotions, and pain points at each stage.",
    syntax: "Stages → Actions → Touchpoints → Emotions → Pain points → Opportunities.",
    notes: "Journey maps expose gaps between the experience you intend to deliver and the one users actually have. Map the current ('as-is') state before designing the future ('to-be') state.",
    returns: "A holistic view of the user experience that reveals moments of friction and opportunity.",
    variations: [
      { title: "Journey map components", code: "Actor:       The persona taking the journey\nScenario:    The goal and context\nStages:      High-level phases (Awareness → Use → Renewal)\nActions:     What the user does at each stage\nTouchpoints: Where they interact (app, email, store)\nEmotions:    Sentiment curve (high/low over time)\nPain points: Moments of friction\nOpportunities: Design improvements" },
      { title: "Common journey stages", code: "E-commerce:  Discover → Research → Purchase → Receive → Return\nOnboarding:  Awareness → Sign-up → First use → Habit → Advocacy\nHealthcare:  Symptom → Search → Appointment → Treatment → Recovery" },
    ],
  },
  {
    name: "Persona", category: "Research Methods",
    description: "A fictional but research-grounded character that represents a key user segment. Personas humanise data and keep teams aligned on who they are designing for throughout the process.",
    syntax: "Name + photo → goals → behaviours → frustrations → context.",
    notes: "Personas are only as good as the research behind them. Proto-personas (assumption-based) are useful early on but must be validated. Avoid demographic stereotypes — focus on behaviours and goals.",
    returns: "A shared, concrete reference point that keeps design decisions anchored to real user needs.",
    variations: [
      { title: "Persona template", code: "Name & photo:     Maya, 34\nRole / context:   Product manager, remote team\nGoals:            Ship features fast without tech debt\nFrustrations:     Too many tools, no single source of truth\nBehaviours:       Checks Slack first thing, lives in spreadsheets\nQuote:            'I need to see the big picture at a glance.'\nTech comfort:     High\nFrequency of use: Daily" },
      { title: "Proto-persona vs research persona", code: "Proto-persona (quick, assumption-based)\n  + Fast — can be done in 1 hour\n  + Aligns team before research begins\n  − Untested — could be completely wrong\n\nResearch persona (evidence-based)\n  + Grounded in real user data\n  + Defensible to stakeholders\n  − Requires 5–10+ interviews per segment" },
    ],
  },

  // ── Ideation Methods ──────────────────────────────────────────────────────
  {
    name: "How Might We (HMW)", category: "Ideation Methods",
    description: "'How Might We' questions reframe problems and insights as open-ended design opportunities. They are the bridge between the Define and Ideate stages.",
    syntax: "Insight → 'How might we [verb] [user] [goal/context]?'",
    notes: "The phrasing matters: 'How' implies it's solvable, 'Might' suggests exploration (not prescription), 'We' signals collaboration. Generate many HMWs — one insight can spawn 5–10 questions.",
    returns: "A set of focused, generative prompts that guide ideation sessions.",
    variations: [
      { title: "HMW examples", code: "Insight: Users forget to take their medication.\n\nHMW make the reminder feel personal?\nHMW remove the reliance on memory entirely?\nHMW turn medication tracking into a positive habit?\nHMW leverage social accountability?\nHMW make it easier to reorder before running out?" },
      { title: "HMW spectrum check", code: "Too narrow: 'HMW add a push notification?'\n→ Already implies a solution\n\nToo broad: 'HMW improve healthcare?'\n→ Too open to generate focused ideas\n\nJust right: 'HMW help patients stay consistent\nwith their treatment plan at home?'" },
    ],
  },
  {
    name: "Crazy 8s", category: "Ideation Methods",
    description: "A rapid sketching exercise where each participant generates 8 distinct ideas in 8 minutes — one per minute. Speed prevents overthinking and unlocks unconventional thinking.",
    syntax: "Fold paper into 8 panels → sketch 1 idea per panel → 1 minute per sketch.",
    notes: "The constraint of time and quantity is the point — it pushes participants past their first, obvious idea. Run at least two rounds: the second round is almost always better.",
    returns: "A high volume of rough, varied ideas in minimal time that can be built upon collaboratively.",
    variations: [
      { title: "How to run Crazy 8s", code: "1. Each participant folds an A4 sheet into 8 panels\n2. Set a timer for 8 minutes\n3. Sketch one idea per panel — no words only\n4. No judgement — quantity over quality\n5. Share: 1 minute per person to present their 8\n6. Vote on the most interesting 2–3 ideas\n7. Optionally run a second round focused on top ideas" },
      { title: "Facilitation tips", code: "✓ Frame with the HMW question before starting\n✓ Play background music to set the pace\n✓ Call out 'next idea' every 60 seconds\n✓ Encourage storyboards, not just UI screens\n✓ Remind people: ugly sketches are fine\n✓ Run remotely using FigJam or Miro sticky notes" },
    ],
  },
  {
    name: "Affinity Mapping", category: "Ideation Methods",
    description: "A bottom-up synthesis method where research observations, ideas, or data points are written on individual sticky notes and clustered into emergent themes by the team.",
    syntax: "Write individual observations → cluster by similarity → name each theme → rank themes.",
    notes: "The act of clustering as a team builds shared understanding — it is as much a collaboration tool as an analysis tool. Avoid pre-defining categories; let themes emerge from the data.",
    returns: "A structured map of themes that reveals patterns, priorities, and design opportunities.",
    variations: [
      { title: "Affinity mapping steps", code: "1. Write one observation per sticky note\n   (keep language neutral and specific)\n2. Place all notes on a board silently\n3. Cluster similar notes together\n4. Name each cluster with a theme headline\n5. Look for sub-clusters within large groups\n6. Identify the top 3–5 themes by volume and impact\n7. Convert themes into HMW questions" },
      { title: "Tools", code: "In-person:  Sticky notes + whiteboard or wall\nRemote:     FigJam, Miro, MURAL, Dovetail\n\nTips:\n• Use different note colours per participant or source\n• Keep clusters loose — a note can move multiple times\n• Time-box to 45–60 min to maintain energy\n• Photograph the board before dismantling" },
    ],
  },

  // ── Prototyping ───────────────────────────────────────────────────────────
  {
    name: "Paper Prototype", category: "Prototyping",
    description: "The fastest and cheapest form of prototype — hand-drawn screens on paper that a facilitator 'animates' by swapping sheets in response to user actions.",
    syntax: "Sketch screens on paper → act as the 'computer' → observe where users struggle.",
    notes: "Paper prototypes are best for testing concepts and navigation flows very early in the process. They are deliberately rough — users feel safe giving honest feedback because nothing looks 'finished'.",
    returns: "Fast insight into whether a concept makes sense, before any digital design investment.",
    variations: [
      { title: "Running a paper prototype session", code: "Roles:\n  Facilitator — gives tasks and observes\n  Computer    — swaps paper screens manually\n  Observer    — notes reactions and quotes\n\nSession:\n1. Set context: 'This is a rough sketch — honest feedback helps'\n2. Give a scenario-based task, not instructions\n3. Computer swaps screens as user 'taps' elements\n4. Note hesitation, wrong taps, confusion\n5. Debrief: What felt natural? What was confusing?" },
      { title: "What it tests well", code: "✓ Navigation structure and information architecture\n✓ Conceptual understanding of the product\n✓ Task flow and sequencing\n✓ Label clarity and button placement\n\n✗ Not suitable for testing visual design\n✗ Not suitable for testing micro-interactions or animations" },
    ],
  },
  {
    name: "Wizard of Oz", category: "Prototyping",
    description: "A technique where a human operator secretly powers a system that appears automated to the user — allowing testing of complex or AI-driven experiences before any technology is built.",
    syntax: "Simulate the system manually → user believes it is real → observe natural behaviour.",
    notes: "Named after the man behind the curtain. Ideal for testing voice interfaces, AI assistants, chatbots, or any feature that is expensive to build. The user's belief that it's real is essential.",
    returns: "Validated interaction patterns and user expectations for complex features, at near-zero engineering cost.",
    variations: [
      { title: "Classic applications", code: "• AI chatbot — human responds as if it were the AI\n• Smart home device — operator controls actions remotely\n• Voice assistant — operator speaks responses\n• Personalisation — researcher manually curates 'algorithm' results\n• Logistics routing — researcher acts as the routing engine" },
      { title: "Running the session", code: "1. Build a front-end shell (UI without the logic)\n2. Set up a back-channel (Slack, phone) for the operator\n3. Keep the operator hidden from the participant\n4. Define response scripts or decision rules in advance\n5. Observe how naturally the user interacts\n6. Debrief: What did they expect the system to do?" },
    ],
  },

  // ── Testing & Iteration ───────────────────────────────────────────────────
  {
    name: "Think-Aloud Protocol", category: "Testing & Iteration",
    description: "A usability testing technique where participants narrate their thoughts, feelings, and intentions out loud as they interact with a prototype — making invisible mental processes visible.",
    syntax: "Give task → ask user to narrate thoughts → observe and listen → never help.",
    notes: "The hardest part for facilitators is staying silent. Do not hint, rephrase, or rescue the user — confusion is data. Use probing questions only after the task is complete.",
    returns: "Rich, in-the-moment insight into where users struggle and why, directly from their own words.",
    variations: [
      { title: "Facilitator script", code: "Introduction:\n'As you work through the tasks, please say out loud\neverything you are thinking — even if it seems obvious.\nThere are no wrong answers. We are testing the design,\nnot you.'\n\nDuring task (if silence):\n'What are you thinking right now?'\n'What would you expect to happen next?'\n\nAfter task:\n'How did that feel?'\n'Was there anything surprising or confusing?'" },
      { title: "What to document", code: "✓ Exact quotes (verbatim)\n✓ Points of hesitation (note the timestamp)\n✓ Wrong paths taken before finding the right one\n✓ Emotional reactions (sighs, laughs, frowns)\n✓ Workarounds the user invented\n✓ Tasks completed successfully vs. abandoned" },
    ],
  },
  {
    name: "5-Second Test", category: "Testing & Iteration",
    description: "Participants view a design for exactly 5 seconds, then answer questions from memory. Tests first impressions, visual hierarchy, and whether key messages are immediately clear.",
    syntax: "Show design for 5 seconds → hide it → ask: 'What do you remember?'",
    notes: "First impressions form in milliseconds. The 5-second test reveals whether your hierarchy and messaging are working, before any interaction takes place.",
    returns: "Insight into whether a design communicates its core purpose and key information at a glance.",
    variations: [
      { title: "Standard questions", code: "1. What is this product / page about?\n2. What is the most important thing you noticed?\n3. Who do you think this is for?\n4. What can you do here?\n5. How would you describe it in one word?" },
      { title: "When to use it", code: "✓ Landing pages and marketing screens\n✓ Dashboard designs — is the key info obvious?\n✓ App home screens — does the purpose read instantly?\n✓ Brand and logo concepts\n✓ Any design where first impressions matter\n\nTools: Lyssna (UsabilityHub), Maze, UserTesting" },
    ],
  },
  {
    name: "Desirability Testing", category: "Testing & Iteration",
    description: "Measures the emotional and subjective reaction users have to a design using a set of descriptive adjectives (the Microsoft Product Reaction Cards). Captures feel, not just function.",
    syntax: "Present design → user picks 5 words from 118 cards → discuss choices.",
    notes: "Usability testing tells you if people can use a product; desirability testing tells you how they feel about it. Use alongside usability testing, not as a replacement.",
    returns: "A qualitative understanding of the emotional tone and brand perception a design creates.",
    variations: [
      { title: "Microsoft Reaction Cards (sample)", code: "Positive: Approachable, Clean, Familiar, Trustworthy,\n          Innovative, Exciting, Efficient, Empowering\n\nNeutral:  Familiar, Straightforward, Expected\n\nNegative: Busy, Complicated, Confusing, Dated,\n          Overwhelming, Slow, Intimidating" },
      { title: "Session structure", code: "1. Show participant the design (no tasks)\n2. Provide the word cards (physical or digital)\n3. Ask them to pick 5 that best describe the design\n4. For each word chosen, ask 'Why did you pick that?'\n5. Aggregate results across participants\n6. Compare intended brand words vs. chosen words" },
    ],
  },
  {
    name: "Iteration & Pivoting", category: "Testing & Iteration",
    description: "Design Thinking is non-linear. After testing, teams either iterate (refine the current solution), pivot (change direction based on new insight), or loop back to an earlier stage.",
    syntax: "Test → synthesise findings → decide: iterate / pivot / re-empathise / commit.",
    notes: "The number of iterations needed is unknown at the start. Ship when the prototype solves the core problem reliably — not when it is perfect. Perfection is the enemy of learning.",
    returns: "A progressively refined solution that is grounded in real user feedback at every stage.",
    variations: [
      { title: "Decision framework", code: "ITERATE when:\n  — Users understand the concept but execution is unclear\n  — Small, fixable usability issues found\n  — Core flow works but details need refinement\n\nPIVOT when:\n  — Users don't understand the core value proposition\n  — The problem definition was wrong\n  — A fundamentally different approach emerged\n\nCOMMIT when:\n  — Users complete tasks successfully and independently\n  — Emotional response is positive\n  — The solution addresses the original POV statement" },
      { title: "Iteration velocity tips", code: "✓ Timebox each iteration to 1–3 days max early on\n✓ Change one thing at a time to isolate what worked\n✓ Keep a changelog — document every iteration\n✓ Re-test with some of the same users for consistency\n✓ Increase fidelity incrementally — don't jump to hi-fi too soon\n✓ Celebrate failed prototypes — they are learning, not waste" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "The 5 Stages":       "bg-primary-100 text-primary-700",
  "Research Methods":   "bg-violet-100 text-violet-700",
  "Ideation Methods":   "bg-amber-100 text-amber-700",
  "Prototyping":        "bg-emerald-100 text-emerald-700",
  "Testing & Iteration":"bg-rose-100 text-rose-700",
};

export default function DesignThinking() {
  return (
    <CategorizedArticle
      items={topicsData}
      badgeColors={categoryColor}
      legendLabel="Category"
      labels={UX_LABELS}
    />
  );
}

