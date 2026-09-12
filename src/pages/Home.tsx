import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import caseStudies from "../data/caseStudies";
import DualField from "../components/bgfx/DualField";
import Button, { ArrowIcon, ArrowBadge } from "../components/Button";
import SectionHead from "../components/SectionHead";
import Marquee from "../components/Marquee";
import { HoverPeekProvider } from "../components/HoverPeek";
import { usePeek } from "../components/peekContext";
import { useReveal } from "../hooks/useReveal";
import { useMode } from "../theme/modeContext";

const capabilities = [
  "Design systems",
  "Workflow automation",
  "Dashboard builders",
  "Angular",
  "React",
  "TypeScript",
  "FastAPI",
  "LLM pipelines",
  "WebGL",
  "Digital painting",
  "WCAG",
];

const facts = [
  { value: "15", unit: "+", label: "Years in UI and product" },
  { value: "40", unit: "%", label: "Shorter design-to-dev cycle" },
  { value: "40", unit: "%", label: "Better UI consistency via design system" },
  { value: "30", unit: "%", label: "Less prototyping effort with AI tools" },
];

const disciplines = [
  {
    k: "Design",
    items: ["User research", "Interaction design", "Design systems", "Prototyping", "Accessibility"],
  },
  {
    k: "Code",
    items: ["React / TypeScript", "Angular", "FastAPI / Python", "Elasticsearch", "WebGL / Canvas"],
  },
  {
    k: "AI in the loop",
    items: ["LLM pipelines", "Prompt engineering", "Claude Code", "Copilot-assisted builds", "Rule engines"],
  },
];

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function RegMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`absolute w-6 h-6 text-line-strong pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="9" />
      <path d="M20 0v14M20 26v14M0 20h14M26 20h14" />
    </svg>
  );
}

function Hero() {
  const { mode } = useMode();

  return (
    <section className="relative min-h-[92svh] flex flex-col justify-end overflow-hidden border-b border-line px-gutter pt-32 pb-10">
      <div className="absolute inset-0" aria-hidden="true">
        <DualField density={1100} />
      </div>
      {/* Scrim: the field breathes through the upper half, the type sits on solid ground */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,var(--ink)_0%,transparent_12%,transparent_22%,var(--ink)_68%)]"
      />

      <RegMark className="hidden sm:block left-4 top-24" />
      <RegMark className="hidden sm:block right-4 top-24" />

      <div className="relative grid gap-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["Product Designer", "Frontend Developer", "AI-Integrated Design", "Kochi, India"].map((l, i) => (
              <span key={l} className="label lift-in" style={{ "--i": i } as React.CSSProperties}>
                {l}
              </span>
            ))}
          </div>
          <span className="label label-strong inline-flex items-center gap-2">
            <span className="relative flex w-2 h-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-pigment animate-ping opacity-70" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-pigment" />
            </span>
            Open to new work
          </span>
        </div>

        {/* Three words, three typefaces — the whole thesis in one line */}
        <h1 className="m-0 text-[clamp(58px,14vw,210px)] leading-[0.86] tracking-[-0.03em]">
          <span className="rise-word" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="hero-serif font-serif italic font-normal">Pixels.</span>
          </span>{" "}
          <span className="rise-word" style={{ "--i": 1 } as React.CSSProperties}>
            <span className="hero-mono font-mono font-normal tracking-[-0.06em] text-[0.8em]">Code.</span>
          </span>{" "}
          <span className="rise-word" style={{ "--i": 2 } as React.CSSProperties}>
            <span className="font-grotesk font-extrabold">Impact.</span>
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-7 items-end">
          <p
            className="lift-in m-0 max-w-[46ch] text-[clamp(17px,1.7vw,22px)] text-bone-2 text-pretty"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            I design the thing and then I ship it. <b className="font-medium text-bone">Fifteen years</b> of enterprise
            UX, design systems and workflow automation — now with AI in the loop, from the first sketch to the
            deployed screen.
          </p>
          <div className="lift-in flex flex-wrap gap-3.5" style={{ "--i": 2 } as React.CSSProperties}>
            <Button to="/case-studies" primary>
              Case studies <ArrowIcon />
            </Button>
            <Button to="/resume">Resume</Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="label inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 animate-bounce" aria-hidden="true">
              <path d="M12 5v14m0 0l-5-5m5 5l5-5" />
            </svg>
            Scroll
          </span>
          <span className="label hidden sm:inline">
            {mode === "code" ? "// flip the switch for the other half" : "Flip the switch for the other half"}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Case study index ─────────────────────────────────────────────────────── */

function IndexRow({ study, n }: { study: (typeof caseStudies)[number]; n: number }) {
  const peek = usePeek();

  return (
    <li className="border-b border-line">
      <Link
        to={`/case-studies/${study.link}`}
        onPointerEnter={() => peek.show(assetUrl(study.image))}
        onPointerLeave={peek.hide}
        className="index-row group grid grid-cols-[auto_1fr_auto] md:grid-cols-[64px_1.25fr_1fr_auto] gap-x-6 gap-y-3 items-center px-2 md:px-4 py-7 transition-[padding] duration-500 ease-art hover:px-6"
      >
        {/* Placement is explicit in every cell: mixing a definite row with auto
            columns makes grid place the badge before the auto-flow items. */}
        <span className="label tag-num row-start-1 col-start-1">{String(n).padStart(2, "0")}</span>
        <h3 className="row-start-1 col-start-2 m-0 font-display text-[clamp(26px,3.6vw,52px)] leading-none transition-colors duration-300 group-hover:text-pigment">
          {study.title}
        </h3>
        <p className="row-start-2 col-start-2 col-span-2 md:row-start-1 md:col-start-3 md:col-span-1 m-0 text-[15px] text-bone-2 max-w-[46ch]">
          {study.description}
        </p>
        <ArrowBadge className="row-start-1 col-start-3 md:col-start-4" />
      </Link>
    </li>
  );
}

/* ── Works panel ──────────────────────────────────────────────────────────── */

function Panel({
  to,
  title,
  text,
  foot,
  children,
}: {
  to: string;
  title: string;
  text: string;
  foot: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group bg-ink hover:bg-ink-2 transition-colors duration-500 p-7 grid grid-rows-[auto_1fr_auto] gap-6"
    >
      <div>
        <h3 className="m-0 font-display text-[clamp(24px,2.4vw,34px)] leading-tight">{title}</h3>
        <p className="mt-2 mb-0 text-[15px] text-bone-2">{text}</p>
      </div>
      <div className="relative rounded-art-sm overflow-hidden aspect-4/3 bg-ink-3 border border-line">
        {children}
      </div>
      <div className="flex justify-between items-center gap-3">
        <span className="label">{foot}</span>
        <ArrowBadge className="w-9! h-9!" />
      </div>
    </Link>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function Home() {
  const pageRef = useReveal<HTMLElement>();

  return (
    <main ref={pageRef} className="grow min-w-0 w-full overflow-x-clip">
      <Hero />

      <Marquee items={capabilities} className="border-b border-line py-4" />

      {/* ── Statement ── */}
      <section id="approach" className="px-gutter py-[clamp(64px,10vw,140px)] border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-[clamp(36px,6vw,96px)] items-start">
          <div className="reveal grid gap-8">
            <span className="label tag-num text-pigment">01 — Approach</span>
            <p className="m-0 font-display text-[clamp(26px,3.4vw,46px)] leading-[1.16] text-pretty">
              Most teams hand a design over a wall. I walk it across myself — design systems, automation workflow
              builders and dashboard tooling for enterprise platforms, with{" "}
              <em className="text-pigment not-italic">AI-assisted workflows</em> shortening the distance between a
              sketch and a deployed screen.
            </p>
            <div className="grid sm:grid-cols-3 gap-px bg-line border border-line">
              {disciplines.map((d) => (
                <div key={d.k} className="bg-ink p-5 grid gap-3 content-start">
                  <span className="label text-pigment">{d.k}</span>
                  <ul className="list-none m-0 p-0 grid gap-1.5 text-[14px] text-bone-2">
                    {d.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal grid grid-cols-2 border-t border-line">
            {facts.map((f, i) => (
              <div key={f.label} className={`py-6 border-b border-line ${i % 2 === 0 ? "pr-6 border-r" : "pl-6"}`}>
                <div className="font-display text-[clamp(40px,5vw,68px)] leading-none tabular-nums">
                  {f.value}
                  <small className="text-[0.45em] text-pigment ml-1 align-super">{f.unit}</small>
                </div>
                <span className="label block mt-2.5">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section id="studies" className="px-gutter py-[clamp(64px,10vw,140px)] border-b border-line">
        <SectionHead
          index="02"
          title={
            <>
              Selected <em className="font-serif italic text-bone-2">case studies</em>
            </>
          }
          aside="The why behind the what"
        />
        <HoverPeekProvider>
          <ul className="list-none m-0 p-0 border-t border-line">
            {caseStudies.map((s, i) => (
              <IndexRow key={s.id} study={s} n={i + 1} />
            ))}
          </ul>
        </HoverPeekProvider>
      </section>

      {/* ── Works ── */}
      <section id="works" className="px-gutter py-[clamp(64px,10vw,140px)]">
        <SectionHead index="03" title="Works" aside="Craft, code and paint" />
        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
          <Panel
            to="/works/applications"
            title="Applications"
            text="Side projects and applications I've built."
            foot="4 builds"
          >
            <img
              src={assetUrl("/img/works/app-01.png")}
              alt="Screenshot of a web application built by Roys"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-art group-hover:scale-105"
            />
          </Panel>
          <Panel
            to="/works/creative-coding"
            title="Creative coding"
            text="Interactive shader and canvas experiments."
            foot="6 effects · WebGL"
          >
            <DualField density={360} intensity={1.15} interactive={false} />
          </Panel>
          <Panel
            to="/works/digital-paintings"
            title="Digital paintings"
            text="A collection of digital artwork and illustrations."
            foot="9 pieces"
          >
            <img
              src={assetUrl("/img/dp/Forest01.png")}
              alt="Digital painting of a forest"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-art group-hover:scale-105"
            />
          </Panel>
        </div>
      </section>
    </main>
  );
}
