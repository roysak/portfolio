import { assetUrl } from "../utils/assetUrl";
import Button from "../components/Button";

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

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="m-0 mb-4 font-mono text-xs uppercase tracking-[0.12em] text-pigment">{children}</h2>;
}

function Timeline({ jobs }: { jobs: Job[] }) {
  return (
    <div className="border-l border-line pl-7 grid gap-10 mt-4">
      {jobs.map((j) => (
        <div key={j.title} className="relative">
          <span
            aria-hidden="true"
            className={`absolute -left-[33px] top-2 w-[9px] h-[9px] rounded-full border-2 ${
              j.now ? "bg-pigment border-pigment shadow-[0_0_0_5px_rgba(228,176,74,0.18)]" : "bg-ink border-bone-3"
            }`}
          />
          <div className="flex justify-between gap-3 flex-wrap items-baseline">
            <h3 className="m-0 font-display font-semibold text-2xl tracking-[-0.02em]">{j.title}</h3>
            <span className="font-mono text-xs tracking-[0.06em] text-bone-3 whitespace-nowrap">{j.when}</span>
          </div>
          {j.role && <p className="m-0 mt-2 text-plum font-medium">{j.role}</p>}
          {j.sub && <p className="m-0 mt-1 text-[15px] text-bone-2">{j.sub}</p>}
          <ul className="list-disc mt-3 mb-0 pl-[18px] text-[15px] text-bone-2 grid gap-1 marker:text-bone-3">
            {j.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Resume() {
  return (
    <main className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      {/* ── Header ── */}
      <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end pb-10 border-b border-line mb-14">
        <div>
          <h1 className="m-0 font-display font-bold text-[clamp(44px,7vw,104px)] leading-[0.92] tracking-[-0.04em]">
            Roys A Kareem
          </h1>
          <p className="mt-4 mb-0 text-lg text-bone-2">
            Product Designer · Frontend Developer · AI-Integrated Product Design
          </p>
          <div className="flex gap-5 flex-wrap mt-4">
            {[
              { href: "tel:+919846666988", label: "+91 98466 66988" },
              { href: "mailto:roysak@gmail.com", label: "roysak@gmail.com" },
              { href: "https://in.linkedin.com/in/roysak", label: "linkedin.com/in/roysak", ext: true },
            ].map((c) => (
              <a
                key={c.href}
                href={c.href}
                target={c.ext ? "_blank" : undefined}
                rel={c.ext ? "noopener noreferrer" : undefined}
                className="font-mono text-xs tracking-[0.06em] border-b border-line-strong pb-0.5 hover:text-pigment hover:border-pigment transition-colors"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
        <Button href={assetUrl("/resumes/Roys_Resume.pdf")} download primary>
          Download resume
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
          </svg>
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-[clamp(32px,6vw,96px)]">
        {/* ── Left column ── */}
        <aside className="grid gap-11 content-start">
          <section>
            <Heading>Summary</Heading>
            <p className="m-0 text-bone-2">
              Product Designer with 15+ years of experience delivering scalable UX solutions and enterprise-grade
              frontend applications. Specialized in design systems, workflow automation platforms, and AI-assisted
              development. Proven ability to improve usability, accelerate development cycles, and bridge design with
              engineering using Angular, React, and modern AI tools.
            </p>
          </section>

          <section>
            <Heading>Skills</Heading>
            <dl className="m-0 grid gap-3.5">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="font-mono text-[13px] uppercase tracking-[0.06em] text-bone-3">{s.group}</dt>
                  <dd className="m-0 mt-1 flex flex-wrap gap-x-3 gap-y-1.5 text-[15px]">
                    {s.items.map((i) => (
                      <span key={i}>{i}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <Heading>Certifications</Heading>
            <ul className="list-none m-0 p-0 grid gap-3">
              {certs.map((c) => (
                <li key={c.name} className="grid grid-cols-[1fr_auto] gap-3 text-[15px]">
                  <span>
                    {c.name} <span className="text-bone-3">· {c.issuer}</span>
                  </span>
                  <span className="font-mono text-xs text-bone-3">{c.year}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading>Education</Heading>
            <p className="m-0">Bachelor of Commerce (BCom)</p>
            <p className="m-0 text-bone-2">MA College, Kothamangalam · 2003 – 2005</p>
          </section>
        </aside>

        {/* ── Right column ── */}
        <div className="grid gap-11 content-start">
          <section>
            <Heading>Key achievements</Heading>
            <ul className="list-none m-0 p-0 grid gap-2.5">
              {achievements.map((a) => (
                <li key={a} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-0.5 before:bg-pigment">
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading>Experience</Heading>
            <p className="label m-0">UST · Dec 2016 – Present</p>
            <Timeline jobs={ust} />
            <p className="label m-0 mt-12">Vtrio Solutions Pvt Ltd · 2005 – 2016</p>
            <Timeline jobs={vtrio} />
          </section>
        </div>
      </div>
    </main>
  );
}
