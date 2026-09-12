import { assetUrl } from "../utils/assetUrl";
import Button from "../components/Button";
import { Col, Grid, Register } from "../components/system";
import { useSpreadMotion } from "../hooks/useMotion";

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
    title: "Healthcare Claims Validation Platform",
    when: "May 2026 – Present",
    role: "Specialist I · UX Design / Full-Stack Development",
    now: true,
    bullets: [
      "Built an AI claims validation platform to automate healthcare benefit adjudication.",
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
  { href: "tel:+919846666988", label: "+91 98466 66988" },
  { href: "mailto:roysak@gmail.com", label: "roysak@gmail.com" },
  { href: "https://in.linkedin.com/in/roysak", label: "linkedin.com/in/roysak", ext: true },
];

/** A ruled section head — the document's only hierarchy marker. */
function Heading({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <h2 className="m-0 mb-5 pb-2 border-b border-rule-2 label flex gap-3">
      <span className="text-accent">{no}</span>
      <span className="text-ink">{children}</span>
    </h2>
  );
}

/** Experience set as a record: dates in the left rail, the work on the right. */
function Record({ jobs }: { jobs: Job[] }) {
  return (
    <div className="grid gap-0 mt-2">
      {jobs.map((j) => (
        <article
          key={j.title}
          className="grid grid-cols-1 md:grid-cols-[10.5rem_1fr] gap-x-gutter gap-y-2 py-6 border-b border-rule last:border-b-0"
        >
          <div className="md:pt-1">
            <span className="label whitespace-nowrap">{j.when}</span>
            {j.now && (
              <span className="label text-accent block mt-1">
                <span aria-hidden="true">●</span> Current
              </span>
            )}
          </div>
          <div>
            <h3 className="m-0 font-display font-medium text-head leading-tight tracking-[-0.025em]">
              {j.title}
            </h3>
            {j.role && <p className="m-0 mt-1.5 text-small text-accent-2 font-medium">{j.role}</p>}
            {j.sub && <p className="m-0 mt-1 text-small text-ink-2">{j.sub}</p>}
            <ul className="list-none m-0 mt-3 p-0 grid gap-1.5">
              {j.bullets.map((b) => (
                <li
                  key={b}
                  className="relative pl-5 text-small text-ink-2 before:content-[''] before:absolute before:left-0 before:top-[0.62em] before:w-2.5 before:h-px before:bg-rule-2"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Resume() {
  const ref = useSpreadMotion<HTMLElement>();

  return (
    <main
      ref={ref}
      className="resume-doc relative px-margin pt-[clamp(28px,5vw,56px)] pb-[clamp(64px,9vw,128px)]"
    >
      <Register className="left-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)] print:hidden" />
      <Register className="right-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)] print:hidden" />

      <Grid className="gap-y-[clamp(32px,5vw,64px)]">
        {/* ── Masthead ── */}
        <Col span={12} className="pb-6 border-b border-rule-2">
          <p className="label m-0 mb-5">
            <span className="text-accent">§</span> <span className="ml-3">Curriculum Vitae</span>
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1
                data-set
                className="m-0 font-display font-medium text-display leading-[0.92] tracking-[-0.05em]"
              >
                Roys A Kareem
              </h1>
              <p className="mt-3 mb-0 font-serif text-lead text-ink-2">
                Product Designer · Frontend Developer · AI-Integrated Product Design
              </p>
              <div className="flex gap-x-6 gap-y-2 flex-wrap mt-4">
                {contacts.map((c) => (
                  <a
                    key={c.href}
                    href={c.href}
                    target={c.ext ? "_blank" : undefined}
                    rel={c.ext ? "noopener noreferrer" : undefined}
                    className="label border-b border-rule-2 pb-0.5 hover:text-accent hover:border-accent transition-colors"
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
            <Button href={assetUrl("/resumes/Roys_Resume.pdf")} download primary className="print:hidden">
              Download PDF
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
              </svg>
            </Button>
          </div>
        </Col>

        {/* ── Left rail ── */}
        <Col span={4} className="grid gap-10 content-start">
          <section>
            <Heading no="01">Summary</Heading>
            <p className="m-0 font-serif text-ink-2 leading-[1.6]">
              Product Designer with 15+ years of experience delivering scalable UX solutions and
              enterprise-grade frontend applications. Specialized in design systems, workflow
              automation platforms, and AI-assisted development. Proven ability to improve usability,
              accelerate development cycles, and bridge design with engineering using Angular, React,
              and modern AI tools.
            </p>
          </section>

          <section>
            <Heading no="02">Skills</Heading>
            <dl className="m-0">
              {skills.map((s) => (
                <div key={s.group} className="py-3 border-b border-rule last:border-b-0">
                  <dt className="label">{s.group}</dt>
                  <dd className="m-0 mt-1.5 flex flex-wrap gap-x-2.5 gap-y-1 text-small">
                    {s.items.map((i, n) => (
                      <span key={i}>
                        {i}
                        {n < s.items.length - 1 && <span className="text-ink-3 ml-2.5">·</span>}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <Heading no="03">Certifications</Heading>
            <ul className="list-none m-0 p-0">
              {certs.map((c) => (
                <li
                  key={c.name}
                  className="flex items-baseline gap-3 py-2.5 border-b border-rule last:border-b-0"
                >
                  <span className="text-small min-w-0">
                    {c.name} <span className="text-ink-3">· {c.issuer}</span>
                  </span>
                  <span className="leader" aria-hidden="true" />
                  <span className="label shrink-0">{c.year}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading no="04">Education</Heading>
            <p className="m-0 text-small font-medium">Bachelor of Commerce (BCom)</p>
            <p className="m-0 mt-1 label">MA College, Kothamangalam · 2003 – 2005</p>
          </section>
        </Col>

        {/* ── Main column ── */}
        <Col span={7} start={6} className="grid gap-10 content-start">
          <section>
            <Heading no="05">Key achievements</Heading>
            <ul className="list-none m-0 p-0">
              {achievements.map((a) => (
                <li
                  key={a}
                  className="relative pl-6 py-2.5 border-b border-rule last:border-b-0 before:content-[''] before:absolute before:left-0 before:top-[1.15em] before:w-3 before:h-px before:bg-accent"
                >
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading no="06">Experience</Heading>
            <p className="label m-0 text-ink">UST · Dec 2016 – Present</p>
            <Record jobs={ust} />
            <p className="label m-0 mt-10 text-ink">Vtrio Solutions Pvt Ltd · 2005 – 2016</p>
            <Record jobs={vtrio} />
          </section>
        </Col>
      </Grid>
    </main>
  );
}
