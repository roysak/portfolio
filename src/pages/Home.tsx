import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import caseStudies from "../data/caseStudies";
import FlowField from "../components/bgfx/FlowField";
import Button, { ArrowIcon } from "../components/Button";
import SectionHead from "../components/SectionHead";
import { HoverPeekProvider } from "../components/HoverPeek";
import { usePeek } from "../components/peekContext";
import { useReveal } from "../hooks/useReveal";

const marqueeWords = [
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

function IndexRow({ study }: { study: (typeof caseStudies)[number] }) {
  const peek = usePeek();
  return (
    <li className="border-b border-line">
      <Link
        to={`/case-studies/${study.link}`}
        onPointerEnter={() => peek.show(assetUrl(study.image))}
        onPointerLeave={peek.hide}
        className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[64px_1.3fr_1fr_auto] gap-x-6 gap-y-3 items-center py-7 transition-[padding] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:pl-4"
      >
        <span className="font-mono text-[13px] text-bone-3">{study.link}</span>
        <h3 className="m-0 font-display font-semibold text-[clamp(24px,3.2vw,44px)] leading-none tracking-[-0.025em] transition-colors group-hover:text-pigment">
          {study.title}
        </h3>
        <p className="m-0 text-[15px] text-bone-2 max-w-[46ch] col-start-2 col-span-2 md:col-start-auto md:col-span-1">
          {study.description}
        </p>
        <span className="row-start-1 col-start-3 md:col-start-auto w-11 h-11 rounded-full border border-line-strong grid place-items-center transition-[background-color,transform,color] duration-300 group-hover:bg-bone group-hover:text-ink group-hover:-rotate-45">
          <ArrowIcon />
        </span>
      </Link>
    </li>
  );
}

export default function Home() {
  const pageRef = useReveal<HTMLElement>();

  return (
    <main ref={pageRef} className="grow min-w-0 w-full overflow-x-clip">
      {/* ── Hero ── */}
      <section className="relative min-h-[78svh] grid content-end overflow-hidden border-b border-line pt-32 pb-12 px-gutter">
        <div className="absolute inset-0">
          <FlowField count={1100} />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,transparent_30%,var(--ink)_92%)]" />

        <div className="relative grid gap-7">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="label">Product Designer</span>
            <span className="label">Frontend Developer</span>
            <span className="label">AI-Integrated Product Design</span>
            <span className="label">Kochi, India</span>
          </div>

          <h1 className="m-0 font-display font-bold text-[clamp(56px,11.5vw,176px)] leading-[0.9] tracking-[-0.035em] text-balance [font-variation-settings:'opsz'_96]">
            <span className="rise-word"><span>Pixels.</span></span>{" "}
            <span className="rise-word"><span>Code.</span></span>{" "}
            <span className="rise-word"><span className="text-pigment">Impact.</span></span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
            <p className="m-0 max-w-[42ch] text-[clamp(17px,1.6vw,21px)] text-bone-2 text-pretty">
              Crafting colorful, user-centric experiences from the first pixel to the final deployment.{" "}
              <b className="font-medium text-bone">Fifteen years</b> of enterprise UX, design systems and workflow
              automation, now built with AI in the loop.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button to="/case-studies" primary>
                Read the case studies <ArrowIcon />
              </Button>
              <Button to="/resume">Resume</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden border-b border-line py-3.5 whitespace-nowrap" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="label tracking-[0.12em]">
              <i className="not-italic text-pigment mr-12">◆</i>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ── Case study index ── */}
      <section className="px-gutter py-[clamp(64px,9vw,128px)] border-b border-line">
        <SectionHead
          title={
            <>
              Selected <em className="font-normal text-bone-2">case studies</em>
            </>
          }
          aside="Deep dives into the why behind the what"
        />
        <HoverPeekProvider>
          <ul className="list-none m-0 p-0 border-t border-line">
            {caseStudies.map((s) => (
              <IndexRow key={s.id} study={s} />
            ))}
          </ul>
        </HoverPeekProvider>
      </section>

      {/* ── Works triptych ── */}
      <section className="px-gutter py-[clamp(64px,9vw,128px)] border-b border-line">
        <SectionHead title="Works" aside="A curated gallery of craft and code" />
        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
          <Panel to="/works/applications" title="Applications" text="Side projects and applications I've built." foot="4 builds">
            <img src={assetUrl("/img/works/app-01.png")} alt="Screenshot of a web application built by Roys" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105" />
          </Panel>
          <Panel to="/works/creative-coding" title="Creative coding" text="Interactive background effects created using AI tools." foot="6 effects · WebGL">
            <FlowField count={350} scale={0.006} colors={["#9A6FB0", "#E4B04A"]} fade={0.08} />
          </Panel>
          <Panel to="/works/digital-paintings" title="Digital paintings" text="A collection of digital artwork and illustrations." foot="9 pieces">
            <img src={assetUrl("/img/dp/Forest01.png")} alt="Digital painting of a forest" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105" />
          </Panel>
        </div>
      </section>

      {/* ── About ── */}
      <section className="px-gutter py-[clamp(64px,9vw,128px)] border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-[clamp(32px,6vw,96px)] items-start">
          <p className="reveal m-0 font-display font-normal text-[clamp(24px,3vw,40px)] leading-[1.2] tracking-[-0.02em] text-pretty">
            I design and ship the same product. Design systems, automation workflow builders and dashboard tooling
            for enterprise platforms, with <b className="font-semibold text-pigment">AI-assisted workflows</b>{" "}
            shortening the distance between a sketch and a deployed screen.
          </p>
          <div className="reveal grid grid-cols-2 border-t border-line">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`py-5 border-b border-line ${i % 2 === 0 ? "pr-6 border-r" : "pl-6"}`}
              >
                <div className="font-display font-semibold text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.03em] tabular-nums">
                  {f.value}
                  <small className="text-[0.5em] text-pigment ml-0.5">{f.unit}</small>
                </div>
                <span className="label block mt-2">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

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
      className="group bg-ink hover:bg-ink-2 transition-colors duration-300 p-7 grid grid-rows-[auto_1fr_auto] gap-6 relative overflow-hidden"
    >
      <div>
        <h3 className="m-0 font-display font-semibold text-[28px] tracking-[-0.02em]">{title}</h3>
        <p className="mt-1.5 mb-0 text-[15px] text-bone-2">{text}</p>
      </div>
      <div className="relative rounded overflow-hidden aspect-[4/3] bg-ink-3">{children}</div>
      <div className="flex justify-between items-center">
        <span className="label">{foot}</span>
        <span className="label">Open</span>
      </div>
    </Link>
  );
}
