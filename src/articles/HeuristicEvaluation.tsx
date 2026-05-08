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
  // ── Nielsen's 10 Heuristics ───────────────────────────────────────────────
  {
    name: "1. Visibility of System Status", category: "Nielsen's Heuristics",
    description: "The system should always keep users informed about what is going on, through appropriate feedback within a reasonable time.",
    syntax: "Keep users informed → timely, relevant, contextual feedback.",
    notes: "Users need to know what the system is doing at all times. Uncertainty breeds frustration and distrust.",
    returns: "Increased user confidence and reduced anxiety.",
    variations: [
      { title: "Good examples", code: "✓ Progress bar during file upload\n✓ 'Saving…' / 'Saved' indicator in a doc editor\n✓ Skeleton screens while content loads\n✓ Step indicators in multi-step forms" },
      { title: "Bad examples", code: "✗ Button click with no visual feedback\n✗ Blank screen during a long operation\n✗ Form submission with no confirmation message" },
      { title: "Evaluation questions", code: "• Does the UI confirm every user action?\n• Is the current state always visible?\n• Is feedback provided within 0.1–1s for interactions?" },
    ],
  },
  {
    name: "2. Match with Real World", category: "Nielsen's Heuristics",
    description: "The system should speak the users' language — words, phrases, and concepts familiar to the user, rather than system-oriented terms.",
    syntax: "Use real-world metaphors → match mental models → avoid jargon.",
    notes: "Information should appear in a natural and logical order. Skeuomorphic design and familiar icons leverage existing mental models.",
    returns: "Reduced cognitive load and faster task completion.",
    variations: [
      { title: "Good examples", code: "✓ 'Trash' / 'Recycle Bin' icon for deletion\n✓ Shopping cart metaphor in e-commerce\n✓ Using 'Save' not 'Persist to disk'\n✓ Calendar grids matching physical calendars" },
      { title: "Bad examples", code: "✗ Error: '404 Not Found' shown to end users\n✗ 'Null pointer exception' in UI messages\n✗ Technical field labels like 'userId' instead of 'Your name'" },
      { title: "Evaluation questions", code: "• Would the target user understand every label?\n• Are icons universally recognisable?\n• Is the workflow order intuitive?" },
    ],
  },
  {
    name: "3. User Control & Freedom", category: "Nielsen's Heuristics",
    description: "Users often choose system functions by mistake. They need a clearly marked 'emergency exit' to leave the unwanted state without extended dialogue.",
    syntax: "Provide undo / redo → easy exits → cancel actions.",
    notes: "Support undo and redo wherever possible. Never trap users in a decision — give them a way back.",
    returns: "Reduced error recovery time and user stress.",
    variations: [
      { title: "Good examples", code: "✓ Ctrl+Z undo in text editors\n✓ 'Cancel' button on every modal and form\n✓ 'Undo send' in email clients\n✓ Browser back button that always works" },
      { title: "Bad examples", code: "✗ Destructive action with no confirmation\n✗ No way to exit a fullscreen onboarding flow\n✗ Modal with only a 'Confirm' button" },
      { title: "Evaluation questions", code: "• Can users undo any significant action?\n• Is there a Cancel / Back option everywhere?\n• Are accidental deletions recoverable?" },
    ],
  },
  {
    name: "4. Consistency & Standards", category: "Nielsen's Heuristics",
    description: "Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.",
    syntax: "Internal consistency + external (platform) conventions.",
    notes: "Inconsistency forces users to re-learn. Adhere to design systems and platform guidelines (iOS HIG, Material Design, WCAG).",
    returns: "Faster learning curve and reduced errors.",
    variations: [
      { title: "Good examples", code: "✓ Same icon always means the same action\n✓ Primary button always on the right\n✓ Consistent date formats throughout\n✓ 'Submit' vs 'Send' — pick one and stick to it" },
      { title: "Bad examples", code: "✗ 'Delete' in one place, 'Remove' in another\n✗ Different button colours for the same action\n✗ Search on the left in some views, right in others" },
      { title: "Evaluation questions", code: "• Is terminology consistent across all screens?\n• Do similar UI elements behave the same way?\n• Does the UI follow OS/platform conventions?" },
    ],
  },
  {
    name: "5. Error Prevention", category: "Nielsen's Heuristics",
    description: "Even better than good error messages is a careful design that prevents problems from occurring in the first place.",
    syntax: "Eliminate error-prone conditions → confirm before destructive actions.",
    notes: "Two types: slips (unconscious mistakes) and mistakes (conscious wrong decisions). Design should prevent both.",
    returns: "Fewer errors and improved task success rates.",
    variations: [
      { title: "Good examples", code: "✓ Disable 'Submit' until required fields are filled\n✓ 'Are you sure you want to delete?' for destructive actions\n✓ Input masks for phone/credit card fields\n✓ Autocomplete to reduce typing errors" },
      { title: "Bad examples", code: "✗ Delete button next to Edit with no confirmation\n✗ Password field with no visibility toggle\n✗ Date picker that allows impossible dates" },
      { title: "Evaluation questions", code: "• Are high-risk actions gated by confirmation?\n• Do forms prevent invalid input?\n• Is the interface forgiving of small mistakes?" },
    ],
  },
  {
    name: "6. Recognition over Recall", category: "Nielsen's Heuristics",
    description: "Minimise the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the dialogue to another.",
    syntax: "Make options visible → contextual help → visible state.",
    notes: "Human short-term memory is limited (~7 items). Show rather than require users to remember.",
    returns: "Reduced cognitive load and faster task completion.",
    variations: [
      { title: "Good examples", code: "✓ Recent searches / history suggestions\n✓ Breadcrumbs showing current location\n✓ Visible keyboard shortcuts next to menu items\n✓ Autocomplete showing previously used values" },
      { title: "Bad examples", code: "✗ Requiring users to remember an order ID\n✗ No indication of which step in a multi-step flow\n✗ Icons with no labels or tooltips" },
      { title: "Evaluation questions", code: "• Must the user memorise anything across screens?\n• Are all available options visible or discoverable?\n• Is context maintained across a workflow?" },
    ],
  },
  {
    name: "7. Flexibility & Efficiency", category: "Nielsen's Heuristics",
    description: "Accelerators — unseen by novice users — may speed up interaction for the expert user so that the system can cater to both inexperienced and experienced users.",
    syntax: "Keyboard shortcuts + advanced modes + personalisation.",
    notes: "Design for both novice and expert users. Let users tailor frequent actions. Power users should not be slowed by interfaces designed only for beginners.",
    returns: "Higher productivity for expert users without harming novices.",
    variations: [
      { title: "Good examples", code: "✓ Keyboard shortcuts (Ctrl+S, Ctrl+K)\n✓ Quick actions / command palette (⌘K)\n✓ Saved templates and favourites\n✓ Bulk actions in data tables" },
      { title: "Bad examples", code: "✗ No keyboard navigation in a form-heavy app\n✗ Requiring the same wizard for repeat tasks\n✗ No way to set defaults or preferences" },
      { title: "Evaluation questions", code: "• Are there shortcuts for frequent actions?\n• Can expert users bypass step-by-step flows?\n• Can users customise or personalise the experience?" },
    ],
  },
  {
    name: "8. Aesthetic & Minimalist Design", category: "Nielsen's Heuristics",
    description: "Dialogues should not contain irrelevant or rarely needed information. Every extra unit of information competes with the relevant information and diminishes its relative visibility.",
    syntax: "Remove clutter → prioritise content → signal-to-noise ratio.",
    notes: "This doesn't mean boring. It means every element should have a purpose. Remove decorative elements that add noise without value.",
    returns: "Clearer communication and faster decision-making.",
    variations: [
      { title: "Good examples", code: "✓ Progressive disclosure — show details on demand\n✓ White space to group related content\n✓ Removing rarely-used menu items\n✓ Collapsible sections for advanced settings" },
      { title: "Bad examples", code: "✗ Dashboard full of widgets the user never uses\n✗ Marketing copy on a task-focused screen\n✗ Animations that delay task completion" },
      { title: "Evaluation questions", code: "• Does every element earn its place?\n• Is there visual noise competing with key content?\n• Are secondary actions less prominent than primary?" },
    ],
  },
  {
    name: "9. Recognise & Recover from Errors", category: "Nielsen's Heuristics",
    description: "Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.",
    syntax: "Plain language → identify problem → suggest solution.",
    notes: "Good error messages have three parts: what went wrong, why, and how to fix it. Avoid blaming the user.",
    returns: "Faster error recovery and maintained user confidence.",
    variations: [
      { title: "Good examples", code: "✓ 'Password must be at least 8 characters. Try adding a number.'\n✓ Inline validation with specific guidance\n✓ 'We couldn't save. Check your connection and try again.'" },
      { title: "Bad examples", code: "✗ 'Error 500'\n✗ 'Something went wrong'\n✗ 'Invalid input' without specifying which field" },
      { title: "Error message formula", code: "1. What happened:\n   'We couldn't send your message.'\n\n2. Why it happened:\n   'Your session has expired.'\n\n3. What to do:\n   'Please log in again and try.'" },
    ],
  },
  {
    name: "10. Help & Documentation", category: "Nielsen's Heuristics",
    description: "Even though it is better if the system can be used without documentation, it may be necessary to provide help. Such information should be easy to search and focused on the user's task.",
    syntax: "Contextual help → searchable docs → task-focused guidance.",
    notes: "Help should be offered in context, not hidden away. Tooltips, inline hints, and onboarding tours reduce the need for separate documentation.",
    returns: "Reduced support burden and improved self-service.",
    variations: [
      { title: "Good examples", code: "✓ Tooltip on hover for unfamiliar controls\n✓ Inline help text below form fields\n✓ Onboarding walkthroughs for new users\n✓ Searchable FAQ / knowledge base" },
      { title: "Bad examples", code: "✗ Help link that opens a 200-page PDF\n✗ No tooltips on icon-only navigation\n✗ Documentation not updated with product changes" },
      { title: "Evaluation questions", code: "• Is help available in context?\n• Can users find answers without leaving the task?\n• Is documentation searchable and task-oriented?" },
    ],
  },

  // ── Evaluation Process ────────────────────────────────────────────────────
  {
    name: "Severity Rating", category: "Evaluation Process",
    description: "A 0–4 scale used to prioritise usability problems found during a heuristic evaluation, combining frequency, impact, and persistence.",
    syntax: "0 = Not a problem → 4 = Usability catastrophe.",
    notes: "Rating severity helps teams triage fixes. Use a combination of individual ratings (to reduce bias) averaged across evaluators.",
    returns: "A prioritised list of issues to address.",
    variations: [
      { title: "Severity scale", code: "0 — Not a usability problem\n1 — Cosmetic only; fix if time permits\n2 — Minor; low priority fix\n3 — Major; important to fix; high priority\n4 — Usability catastrophe; imperative to fix" },
      { title: "Scoring factors", code: "Frequency:   How often does the problem occur?\nImpact:      How hard is it to overcome?\nPersistence: Is it a one-time or recurring problem?\n\nSeverity = avg(Frequency + Impact + Persistence)" },
    ],
  },
  {
    name: "Evaluator Selection", category: "Evaluation Process",
    description: "Heuristic evaluations are most effective with 3–5 evaluators. Each evaluator independently inspects the interface and then reports findings.",
    syntax: "3–5 independent evaluators → individual review → aggregate findings.",
    notes: "A single evaluator finds ~35% of problems. Five evaluators find ~75%. Beyond 5, diminishing returns set in. Evaluators should ideally be UX experts.",
    returns: "A combined list of usability issues across all evaluators.",
    variations: [
      { title: "Evaluator types", code: "Single evaluator:      ~35% of problems found\n3 evaluators:          ~60% of problems found\n5 evaluators:          ~75% of problems found\n\nUX experts find ~3.75× more issues than novices." },
      { title: "Session structure", code: "1. Briefing (5 min) — goals, scope, heuristics\n2. Independent inspection (60–90 min each)\n3. Individual report compilation\n4. Group debrief — aggregate & deduplicate\n5. Severity ratings & prioritisation" },
    ],
  },
  {
    name: "Inspection Method", category: "Evaluation Process",
    description: "Each evaluator independently walks through the interface at least twice — once to get a feel for the flow, and again to focus on specific heuristics.",
    syntax: "Pass 1: general flow → Pass 2: heuristic-by-heuristic inspection.",
    notes: "Evaluate each screen against all 10 heuristics. Document every issue with: location, heuristic violated, description, and severity.",
    returns: "A list of specific, heuristic-tagged usability findings.",
    variations: [
      { title: "Issue report template", code: "Issue #:      [number]\nLocation:     [screen / component]\nHeuristic:    [#N — Name]\nDescription:  [What is wrong]\nSeverity:     [0–4]\nRecommendation: [Suggested fix]" },
      { title: "Inspection checklist", code: "For each screen, ask:\n□ Is system status visible?\n□ Does the language match user expectations?\n□ Can errors be undone?\n□ Is the interface consistent?\n□ Are errors prevented?\n□ Does it minimise memory load?\n□ Are shortcuts available?\n□ Is the design minimal?\n□ Are error messages helpful?\n□ Is help accessible?" },
    ],
  },
  {
    name: "Aggregating Findings", category: "Evaluation Process",
    description: "After individual evaluations, findings are combined, deduplicated, and severity-rated to produce a final prioritised report.",
    syntax: "Collect → deduplicate → rate severity → prioritise → report.",
    notes: "Use a shared spreadsheet or tool (FigJam, Notion, Dovetail) to aggregate. Assign each unique issue an average severity across all evaluators.",
    returns: "A final report with ranked usability issues and recommendations.",
    variations: [
      { title: "Aggregation process", code: "1. Collect all individual finding lists\n2. Map duplicates (same issue, different wording)\n3. Average severity scores per issue\n4. Sort by severity (highest first)\n5. Write actionable recommendations\n6. Present to product / engineering team" },
      { title: "Report structure", code: "Executive Summary\n  — Method, scope, evaluator count\n\nKey Findings (top 5–10 by severity)\n\nFull Issue List\n  — ID, screen, heuristic, severity, recommendation\n\nAppendix\n  — Screenshots, raw evaluator notes" },
    ],
  },
  {
    name: "When to Use HE", category: "Evaluation Process",
    description: "Heuristic evaluation is best suited for early-stage design review, expert audits, or when time and budget prevent user testing.",
    syntax: "Expert review → fast, cheap, no users required → best in early/mid stages.",
    notes: "HE is not a replacement for user testing. It finds expert-identified issues but can miss real-world usability problems. Combine with usability testing for best results.",
    returns: "A rapid, cost-effective audit of usability issues.",
    variations: [
      { title: "Ideal timing", code: "✓ After wireframing, before usability testing\n✓ During design QA before launch\n✓ Auditing a competitor product\n✓ When no test participants are available\n✓ Supplementing quantitative data with qualitative insight" },
      { title: "HE vs Usability Testing", code: "Heuristic Evaluation:\n  + Fast (days, not weeks)\n  + Cheap (no recruiting)\n  + Expert insight\n  − No real users\n  − May miss real-world issues\n\nUsability Testing:\n  + Real user behaviour\n  + Uncovers unexpected issues\n  − Slower and more expensive" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Nielsen's Heuristics": "bg-primary-100 text-primary-700",
  "Evaluation Process":   "bg-emerald-100 text-emerald-700",
};

export default function HeuristicEvaluation() {
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

              {/* Syntax */}
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

              {/* Returns */}
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
