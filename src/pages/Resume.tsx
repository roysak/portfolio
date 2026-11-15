import { assetUrl } from "../utils/assetUrl";
import Button from "../components/Button";
import { useReveal } from "../hooks/useReveal";

const skills: { group: string; items: string[] }[] = [
  { group: "UX Design", items: ["User Research", "Wireframing", "Prototyping", "Interaction Design", "Design Systems"] },
  { group: "Frontend", items: ["HTML5", "CSS3", "SCSS", "TailwindCSS", "JavaScript", "TypeScript", "Angular", "React"] },
  { group: "AI & Backend", items: ["Python", "FastAPI", "LLM Pipelines", "Prompt Engineering", "Elasticsearch", "OpenAI API"] },
  { group: "Tools", items: ["Figma", "Adobe XD", "GitHub Copilot", "Claude", "Gemini", "AI-Assisted Dev"] },
  { group: "Accessibility", items: ["WCAG", "Responsive Design"] },
];

const certs = [
  { name: "Claude Certified Developer", issuer: "Anthropic", year: "2026" },
  { name: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
  { name: "Google UX Design", issuer: "Google", year: "2023" },
  { name: "Enterprise Design Thinking Practitioner", issuer: "IBM", year: "2023" },
  { name: "Creative Coding", issuer: "Domestika", year: "2023" },
];

const achievements = [
  "Built an AI-driven claims validation platform automating rule derivation and claim adjudication",
  "Reduced design-to-development cycle time by ~40% using AI-assisted workflows",
  "Built scalable design systems adopted across multiple enterprise applications",
  "Improved workflow efficiency and usability in automation platforms",
  "Delivered multiple enterprise UX solutions impacting large-scale users",
];

interface Job {
  title: string;
  when: string;
  role?: string;
  sub?: string;
  now?: boolean;
  bullets: string[];
}

const ust: Job[] = [
  {
    title: "Healthcare Claims Validation",
    when: "May 2026 – Present",
    role: "Specialist I · UX Design / Full-Stack Development",
    now: true,
    bullets: [
      "Built an AI claims validation to automate healthcare benefit adjudication.",
      "Architected a hybrid validation combining a two-stage LLM pipeline with a Python rule engine.",
      "Created rule lifecycle management and human-in-the-loop workflows for expert review.",
      "Built semantic retrieval mapping benefits to claim codes via Elasticsearch hybrid search.",
      "Developed the full-stack application from scratch using FastAPI and React/TypeScript.",
      "Stack: FastAPI, React/TypeScript, Elasticsearch, Vector Embeddings, Python, OpenAI, Claude Code, GitHub Copilot.",
    ],
  },
  {
    title: "Intelligent Automation Platform",
    when: "Sep 2021 – Present",
    role: "Specialist I · UX Design",
    sub: "Automation Workflow Builder · AI Marketplace · Dashboard Builder",
    now: true,
    bullets: [
      "Designed and developed workflow builder, AI marketplace, and dashboard systems",
      "Improved UI consistency by ~40% through centralized design system",
      "Accelerated prototyping using AI tools, reducing effort by ~30%",
      "Built Theme Builder for PrimeNG using Angular, GitHub Copilot and VS Code",
      "Collaborated with engineering teams for scalable frontend implementation",
    ],
  },
  {
    title: "Xtract Web",
    when: "Sep 2020 – Aug 2021",
    sub: "UI Designer / Developer",
    bullets: [
      "Designed and developed enterprise web interfaces",
      "Improved performance and usability of internal tools",
      "Built responsive UI using HTML, SCSS, JavaScript, Blazor",
    ],
  },
  {
    title: "CrystalBall (Internal)",
    when: "Apr 2020 – Aug 2020",
    sub: "UI Designer / Developer",
    bullets: ["Designed UI systems, mockups, and prototypes", "Contributed to Angular-based frontend development"],
  },
  {
    title: "Ticket Booking",
    when: "Dec 2016 – Mar 2020",
    sub: "UI Designer / Developer",
    bullets: [
      "Started as UI Designer and transitioned to frontend developer",
      "Improved accessibility (WCAG compliance)",
      "Built Angular-based frontend features",
    ],
  },
];

const vtrio: Job[] = [
  {
    title: "UI Designer / Developer",
    when: "2005 – 2016",
    bullets: [
      "Designed web and mobile interfaces",
      "Developed UI themes and frontend components",
      "Worked with WordPress, Magento, Shopify, PHP, jQuery",
    ],
  },
];

const contacts = [
  { href: "mailto:roysak@gmail.com", label: "roysak@gmail.com" },
  { href: "tel:+919846666988", label: "+91 98466 66988" },
  { href: "https://in.linkedin.com/in/roysak", label: "linkedin.com/in/roysak", ext: true },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="m-0 mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-pigment">
      {children}
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </h2>
  );
}

function Timeline({ jobs }: { jobs: Job[] }) {
  return (
    <div className="relative border-l border-line pl-8 grid gap-11 mt-5">
      {jobs.map((j) => (
        <div key={j.title} className="relative">
          <span
            aria-hidden="true"
            className={`absolute -left-[37px] top-2 w-[11px] h-[11px] rounded-full border-2 ${
              j.now
                ? "bg-pigment border-pigment shadow-[0_0_0_5px_var(--pigment-soft)]"
                : "bg-ink border-bone-3"
            }`}
          />
          <div className="flex justify-between gap-4 flex-wrap items-baseline">
            <h3 className="m-0 font-display text-[clamp(21px,2.2vw,30px)] leading-tight">{j.title}</h3>
            <span className="font-mono text-[11px] tracking-[0.08em] text-bone-3 whitespace-nowrap">{j.when}</span>
          </div>
          {j.role && <p className="m-0 mt-2 text-plum font-medium text-[15px]">{j.role}</p>}
          {j.sub && <p className="m-0 mt-1 text-[15px] text-bone-2">{j.sub}</p>}
          <ul className="list-none mt-4 mb-0 p-0 text-[15px] text-bone-2 grid gap-2">
            {j.bullets.map((b) => (
              <li
                key={b}
                className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.72em] before:w-2 before:h-px before:bg-bone-3"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Resume() {
  const pageRef = useReveal<HTMLElement>();

  return (
    <main ref={pageRef} className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      {/* ── Masthead ── */}
      <header className="grid gap-8 pb-12 border-b border-line mb-14">
        <div className="flex items-center gap-4">
          <span className="label tag-num text-pigment">CV</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <span className="label">Updated 2026</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <h1 className="m-0 font-display text-[clamp(46px,9vw,132px)] leading-[0.9] text-balance">
              <em className="font-serif italic text-pigment"></em>Roys A Kareem
            </h1>
            <p className="mt-5 mb-0 text-[clamp(16px,1.6vw,20px)] text-bone-2">
              Product Designer · Frontend Developer · AI-Integrated Product Design
            </p>
            <div className="flex gap-x-6 gap-y-2.5 flex-wrap mt-5">
              {contacts.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  target={c.ext ? "_blank" : undefined}
                  rel={c.ext ? "noopener noreferrer" : undefined}
                  className="link-sweep font-mono text-[11px] tracking-[0.08em] text-bone-2 hover:text-pigment transition-colors"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          <Button href={assetUrl("/resumes/Roys_Resume.pdf")} download primary>
            Download PDF
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
            </svg>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-[clamp(40px,6vw,96px)]">
        {/* ── Left column ── */}
        <aside className="grid gap-12 content-start lg:sticky lg:top-[calc(var(--nav-height,72px)+32px)]">
          <section className="reveal">
            <Heading>Summary</Heading>
            <p className="m-0 text-[15px] text-bone-2">
              Product Designer with 15+ years of experience delivering scalable UX solutions and enterprise-grade
              frontend applications. Specialized in design systems, workflow automation platforms, and AI-assisted
              development. Proven ability to improve usability, accelerate development cycles, and bridge design with
              engineering using Angular, React, and modern AI tools.
            </p>
          </section>

          <section className="reveal">
            <Heading>Skills</Heading>
            <dl className="m-0 grid gap-4">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="label mb-2">{s.group}</dt>
                  <dd className="m-0 flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <span
                        key={i}
                        className="text-[13px] px-2.5 py-1 rounded-art-pill border border-line text-bone-2"
                      >
                        {i}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="reveal">
            <Heading>Certifications</Heading>
            <ul className="list-none m-0 p-0 grid gap-3">
              {certs.map((c) => (
                <li key={c.name} className="grid grid-cols-[1fr_auto] gap-3 text-[15px] border-b border-line pb-3">
                  <span>
                    {c.name}
                    <span className="block text-[13px] text-bone-3">{c.issuer}</span>
                  </span>
                  <span className="font-mono text-[11px] text-bone-3">{c.year}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="reveal">
            <Heading>Education</Heading>
            <p className="m-0 text-[15px]">Bachelor of Commerce (BCom)</p>
            <p className="m-0 text-[15px] text-bone-2">MA College, Kothamangalam · 2003 – 2005</p>
          </section>
        </aside>

        {/* ── Right column ── */}
        <div className="grid gap-12 content-start min-w-0">
          <section className="reveal">
            <Heading>Key achievements</Heading>
            <ul className="list-none m-0 p-0 grid gap-px bg-line border border-line">
              {achievements.map((a, i) => (
                <li key={a} className="bg-ink p-5 flex gap-4 items-baseline">
                  <span className="label tag-num shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15px]">{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="reveal">
            <Heading>Experience</Heading>
            <p className="label label-strong m-0">UST · Dec 2016 – Present</p>
            <Timeline jobs={ust} />
            <p className="label label-strong m-0 mt-14">Vtrio Solutions Pvt Ltd · 2005 – 2016</p>
            <Timeline jobs={vtrio} />
          </section>
        </div>
      </div>
    </main>
  );
}
