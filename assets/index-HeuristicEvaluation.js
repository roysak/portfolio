import{t as e}from"./index-jsx-runtime.js";import{a as t,n}from"./index-components.js";var r=e(),i=[{name:`1. Visibility of System Status`,category:`Nielsen's Heuristics`,description:`The system should always keep users informed about what is going on, through appropriate feedback within a reasonable time.`,syntax:`Keep users informed → timely, relevant, contextual feedback.`,notes:`Users need to know what the system is doing at all times. Uncertainty breeds frustration and distrust.`,returns:`Increased user confidence and reduced anxiety.`,variations:[{title:`Good examples`,code:`✓ Progress bar during file upload
✓ 'Saving…' / 'Saved' indicator in a doc editor
✓ Skeleton screens while content loads
✓ Step indicators in multi-step forms`},{title:`Bad examples`,code:`✗ Button click with no visual feedback
✗ Blank screen during a long operation
✗ Form submission with no confirmation message`},{title:`Evaluation questions`,code:`• Does the UI confirm every user action?
• Is the current state always visible?
• Is feedback provided within 0.1–1s for interactions?`}]},{name:`2. Match with Real World`,category:`Nielsen's Heuristics`,description:`The system should speak the users' language — words, phrases, and concepts familiar to the user, rather than system-oriented terms.`,syntax:`Use real-world metaphors → match mental models → avoid jargon.`,notes:`Information should appear in a natural and logical order. Skeuomorphic design and familiar icons leverage existing mental models.`,returns:`Reduced cognitive load and faster task completion.`,variations:[{title:`Good examples`,code:`✓ 'Trash' / 'Recycle Bin' icon for deletion
✓ Shopping cart metaphor in e-commerce
✓ Using 'Save' not 'Persist to disk'
✓ Calendar grids matching physical calendars`},{title:`Bad examples`,code:`✗ Error: '404 Not Found' shown to end users
✗ 'Null pointer exception' in UI messages
✗ Technical field labels like 'userId' instead of 'Your name'`},{title:`Evaluation questions`,code:`• Would the target user understand every label?
• Are icons universally recognisable?
• Is the workflow order intuitive?`}]},{name:`3. User Control & Freedom`,category:`Nielsen's Heuristics`,description:`Users often choose system functions by mistake. They need a clearly marked 'emergency exit' to leave the unwanted state without extended dialogue.`,syntax:`Provide undo / redo → easy exits → cancel actions.`,notes:`Support undo and redo wherever possible. Never trap users in a decision — give them a way back.`,returns:`Reduced error recovery time and user stress.`,variations:[{title:`Good examples`,code:`✓ Ctrl+Z undo in text editors
✓ 'Cancel' button on every modal and form
✓ 'Undo send' in email clients
✓ Browser back button that always works`},{title:`Bad examples`,code:`✗ Destructive action with no confirmation
✗ No way to exit a fullscreen onboarding flow
✗ Modal with only a 'Confirm' button`},{title:`Evaluation questions`,code:`• Can users undo any significant action?
• Is there a Cancel / Back option everywhere?
• Are accidental deletions recoverable?`}]},{name:`4. Consistency & Standards`,category:`Nielsen's Heuristics`,description:`Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.`,syntax:`Internal consistency + external (platform) conventions.`,notes:`Inconsistency forces users to re-learn. Adhere to design systems and platform guidelines (iOS HIG, Material Design, WCAG).`,returns:`Faster learning curve and reduced errors.`,variations:[{title:`Good examples`,code:`✓ Same icon always means the same action
✓ Primary button always on the right
✓ Consistent date formats throughout
✓ 'Submit' vs 'Send' — pick one and stick to it`},{title:`Bad examples`,code:`✗ 'Delete' in one place, 'Remove' in another
✗ Different button colours for the same action
✗ Search on the left in some views, right in others`},{title:`Evaluation questions`,code:`• Is terminology consistent across all screens?
• Do similar UI elements behave the same way?
• Does the UI follow OS/platform conventions?`}]},{name:`5. Error Prevention`,category:`Nielsen's Heuristics`,description:`Even better than good error messages is a careful design that prevents problems from occurring in the first place.`,syntax:`Eliminate error-prone conditions → confirm before destructive actions.`,notes:`Two types: slips (unconscious mistakes) and mistakes (conscious wrong decisions). Design should prevent both.`,returns:`Fewer errors and improved task success rates.`,variations:[{title:`Good examples`,code:`✓ Disable 'Submit' until required fields are filled
✓ 'Are you sure you want to delete?' for destructive actions
✓ Input masks for phone/credit card fields
✓ Autocomplete to reduce typing errors`},{title:`Bad examples`,code:`✗ Delete button next to Edit with no confirmation
✗ Password field with no visibility toggle
✗ Date picker that allows impossible dates`},{title:`Evaluation questions`,code:`• Are high-risk actions gated by confirmation?
• Do forms prevent invalid input?
• Is the interface forgiving of small mistakes?`}]},{name:`6. Recognition over Recall`,category:`Nielsen's Heuristics`,description:`Minimise the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the dialogue to another.`,syntax:`Make options visible → contextual help → visible state.`,notes:`Human short-term memory is limited (~7 items). Show rather than require users to remember.`,returns:`Reduced cognitive load and faster task completion.`,variations:[{title:`Good examples`,code:`✓ Recent searches / history suggestions
✓ Breadcrumbs showing current location
✓ Visible keyboard shortcuts next to menu items
✓ Autocomplete showing previously used values`},{title:`Bad examples`,code:`✗ Requiring users to remember an order ID
✗ No indication of which step in a multi-step flow
✗ Icons with no labels or tooltips`},{title:`Evaluation questions`,code:`• Must the user memorise anything across screens?
• Are all available options visible or discoverable?
• Is context maintained across a workflow?`}]},{name:`7. Flexibility & Efficiency`,category:`Nielsen's Heuristics`,description:`Accelerators — unseen by novice users — may speed up interaction for the expert user so that the system can cater to both inexperienced and experienced users.`,syntax:`Keyboard shortcuts + advanced modes + personalisation.`,notes:`Design for both novice and expert users. Let users tailor frequent actions. Power users should not be slowed by interfaces designed only for beginners.`,returns:`Higher productivity for expert users without harming novices.`,variations:[{title:`Good examples`,code:`✓ Keyboard shortcuts (Ctrl+S, Ctrl+K)
✓ Quick actions / command palette (⌘K)
✓ Saved templates and favourites
✓ Bulk actions in data tables`},{title:`Bad examples`,code:`✗ No keyboard navigation in a form-heavy app
✗ Requiring the same wizard for repeat tasks
✗ No way to set defaults or preferences`},{title:`Evaluation questions`,code:`• Are there shortcuts for frequent actions?
• Can expert users bypass step-by-step flows?
• Can users customise or personalise the experience?`}]},{name:`8. Aesthetic & Minimalist Design`,category:`Nielsen's Heuristics`,description:`Dialogues should not contain irrelevant or rarely needed information. Every extra unit of information competes with the relevant information and diminishes its relative visibility.`,syntax:`Remove clutter → prioritise content → signal-to-noise ratio.`,notes:`This doesn't mean boring. It means every element should have a purpose. Remove decorative elements that add noise without value.`,returns:`Clearer communication and faster decision-making.`,variations:[{title:`Good examples`,code:`✓ Progressive disclosure — show details on demand
✓ White space to group related content
✓ Removing rarely-used menu items
✓ Collapsible sections for advanced settings`},{title:`Bad examples`,code:`✗ Dashboard full of widgets the user never uses
✗ Marketing copy on a task-focused screen
✗ Animations that delay task completion`},{title:`Evaluation questions`,code:`• Does every element earn its place?
• Is there visual noise competing with key content?
• Are secondary actions less prominent than primary?`}]},{name:`9. Recognise & Recover from Errors`,category:`Nielsen's Heuristics`,description:`Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.`,syntax:`Plain language → identify problem → suggest solution.`,notes:`Good error messages have three parts: what went wrong, why, and how to fix it. Avoid blaming the user.`,returns:`Faster error recovery and maintained user confidence.`,variations:[{title:`Good examples`,code:`✓ 'Password must be at least 8 characters. Try adding a number.'
✓ Inline validation with specific guidance
✓ 'We couldn't save. Check your connection and try again.'`},{title:`Bad examples`,code:`✗ 'Error 500'
✗ 'Something went wrong'
✗ 'Invalid input' without specifying which field`},{title:`Error message formula`,code:`1. What happened:
   'We couldn't send your message.'

2. Why it happened:
   'Your session has expired.'

3. What to do:
   'Please log in again and try.'`}]},{name:`10. Help & Documentation`,category:`Nielsen's Heuristics`,description:`Even though it is better if the system can be used without documentation, it may be necessary to provide help. Such information should be easy to search and focused on the user's task.`,syntax:`Contextual help → searchable docs → task-focused guidance.`,notes:`Help should be offered in context, not hidden away. Tooltips, inline hints, and onboarding tours reduce the need for separate documentation.`,returns:`Reduced support burden and improved self-service.`,variations:[{title:`Good examples`,code:`✓ Tooltip on hover for unfamiliar controls
✓ Inline help text below form fields
✓ Onboarding walkthroughs for new users
✓ Searchable FAQ / knowledge base`},{title:`Bad examples`,code:`✗ Help link that opens a 200-page PDF
✗ No tooltips on icon-only navigation
✗ Documentation not updated with product changes`},{title:`Evaluation questions`,code:`• Is help available in context?
• Can users find answers without leaving the task?
• Is documentation searchable and task-oriented?`}]},{name:`Severity Rating`,category:`Evaluation Process`,description:`A 0–4 scale used to prioritise usability problems found during a heuristic evaluation, combining frequency, impact, and persistence.`,syntax:`0 = Not a problem → 4 = Usability catastrophe.`,notes:`Rating severity helps teams triage fixes. Use a combination of individual ratings (to reduce bias) averaged across evaluators.`,returns:`A prioritised list of issues to address.`,variations:[{title:`Severity scale`,code:`0 — Not a usability problem
1 — Cosmetic only; fix if time permits
2 — Minor; low priority fix
3 — Major; important to fix; high priority
4 — Usability catastrophe; imperative to fix`},{title:`Scoring factors`,code:`Frequency:   How often does the problem occur?
Impact:      How hard is it to overcome?
Persistence: Is it a one-time or recurring problem?

Severity = avg(Frequency + Impact + Persistence)`}]},{name:`Evaluator Selection`,category:`Evaluation Process`,description:`Heuristic evaluations are most effective with 3–5 evaluators. Each evaluator independently inspects the interface and then reports findings.`,syntax:`3–5 independent evaluators → individual review → aggregate findings.`,notes:`A single evaluator finds ~35% of problems. Five evaluators find ~75%. Beyond 5, diminishing returns set in. Evaluators should ideally be UX experts.`,returns:`A combined list of usability issues across all evaluators.`,variations:[{title:`Evaluator types`,code:`Single evaluator:      ~35% of problems found
3 evaluators:          ~60% of problems found
5 evaluators:          ~75% of problems found

UX experts find ~3.75× more issues than novices.`},{title:`Session structure`,code:`1. Briefing (5 min) — goals, scope, heuristics
2. Independent inspection (60–90 min each)
3. Individual report compilation
4. Group debrief — aggregate & deduplicate
5. Severity ratings & prioritisation`}]},{name:`Inspection Method`,category:`Evaluation Process`,description:`Each evaluator independently walks through the interface at least twice — once to get a feel for the flow, and again to focus on specific heuristics.`,syntax:`Pass 1: general flow → Pass 2: heuristic-by-heuristic inspection.`,notes:`Evaluate each screen against all 10 heuristics. Document every issue with: location, heuristic violated, description, and severity.`,returns:`A list of specific, heuristic-tagged usability findings.`,variations:[{title:`Issue report template`,code:`Issue #:      [number]
Location:     [screen / component]
Heuristic:    [#N — Name]
Description:  [What is wrong]
Severity:     [0–4]
Recommendation: [Suggested fix]`},{title:`Inspection checklist`,code:`For each screen, ask:
□ Is system status visible?
□ Does the language match user expectations?
□ Can errors be undone?
□ Is the interface consistent?
□ Are errors prevented?
□ Does it minimise memory load?
□ Are shortcuts available?
□ Is the design minimal?
□ Are error messages helpful?
□ Is help accessible?`}]},{name:`Aggregating Findings`,category:`Evaluation Process`,description:`After individual evaluations, findings are combined, deduplicated, and severity-rated to produce a final prioritised report.`,syntax:`Collect → deduplicate → rate severity → prioritise → report.`,notes:`Use a shared spreadsheet or tool (FigJam, Notion, Dovetail) to aggregate. Assign each unique issue an average severity across all evaluators.`,returns:`A final report with ranked usability issues and recommendations.`,variations:[{title:`Aggregation process`,code:`1. Collect all individual finding lists
2. Map duplicates (same issue, different wording)
3. Average severity scores per issue
4. Sort by severity (highest first)
5. Write actionable recommendations
6. Present to product / engineering team`},{title:`Report structure`,code:`Executive Summary
  — Method, scope, evaluator count

Key Findings (top 5–10 by severity)

Full Issue List
  — ID, screen, heuristic, severity, recommendation

Appendix
  — Screenshots, raw evaluator notes`}]},{name:`When to Use HE`,category:`Evaluation Process`,description:`Heuristic evaluation is best suited for early-stage design review, expert audits, or when time and budget prevent user testing.`,syntax:`Expert review → fast, cheap, no users required → best in early/mid stages.`,notes:`HE is not a replacement for user testing. It finds expert-identified issues but can miss real-world usability problems. Combine with usability testing for best results.`,returns:`A rapid, cost-effective audit of usability issues.`,variations:[{title:`Ideal timing`,code:`✓ After wireframing, before usability testing
✓ During design QA before launch
✓ Auditing a competitor product
✓ When no test participants are available
✓ Supplementing quantitative data with qualitative insight`},{title:`HE vs Usability Testing`,code:`Heuristic Evaluation:
  + Fast (days, not weeks)
  + Cheap (no recruiting)
  + Expert insight
  − No real users
  − May miss real-world issues

Usability Testing:
  + Real user behaviour
  + Uncovers unexpected issues
  − Slower and more expensive`}]}],a={"Nielsen's Heuristics":`bg-primary-100 text-primary-700`,"Evaluation Process":`bg-emerald-100 text-emerald-700`};function o(){return(0,r.jsx)(n,{items:i,badgeColors:a,legendLabel:`Category`,labels:t})}export{o as default};