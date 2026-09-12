import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import caseStudies from "../data/caseStudies";
import FlowField from "../components/bgfx/FlowField";
import Button, { ArrowIcon } from "../components/Button";
import { HoverPeekProvider } from "../components/HoverPeek";
import { usePeek } from "../components/peekContext";
import { Col, Grid, LocalTime, Plate, Register, Spread, SpreadHead } from "../components/system";
import { useSpreadMotion } from "../hooks/useMotion";

const tickerWords = [
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

const works = [
  {
    to: "/works/applications",
    title: "Applications",
    text: "Side projects and applications I've built.",
    meta: "4 builds · Product",
    media: <img src={assetUrl("/img/works/app-01.png")} alt="Screenshot of a web application built by Roys" width={1600} height={1200} loading="lazy" />,
  },
  {
    to: "/works/creative-coding",
    title: "Creative coding",
    text: "Interactive background effects created using AI tools.",
    meta: "6 effects · WebGL",
    media: <FlowField count={340} scale={0.006} colors={["#b8390a", "#1e3a5f"]} fade={0.08} />,
  },
  {
    to: "/works/digital-paintings",
    title: "Digital paintings",
    text: "A collection of digital artwork and illustrations.",
    meta: "9 pieces · Digital",
    media: <img src={assetUrl("/img/dp/Forest01.webp")} alt="Digital painting of a forest" width={655} height={1000} loading="lazy" />,
  },
];

/** A table-of-contents row: number, title, leader dots, folio. */
function IndexRow({ study, total }: { study: (typeof caseStudies)[number]; total: number }) {
  const peek = usePeek();
  return (
    <li>
      <Link
        to={`/case-studies/${study.link}`}
        onPointerEnter={() => peek.show(assetUrl(study.image))}
        onPointerLeave={peek.hide}
        className="group block border-b border-rule py-6 transition-[padding-left] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-3"
      >
        <div className="flex items-baseline gap-5">
          <span className="label text-accent shrink-0">{study.link}</span>
          <h3 className="m-0 font-display font-medium text-[clamp(24px,3.4vw,46px)] leading-none tracking-[-0.035em] transition-colors group-hover:text-accent">
            {study.title}
          </h3>
          <span className="leader max-sm:hidden" aria-hidden="true" />
          <span className="label shrink-0 max-sm:hidden">
            {study.link} / {String(total).padStart(2, "0")}
          </span>
          <ArrowIcon />
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-1 pl-[calc(3ch+1.25rem)] max-sm:pl-0">
          <p className="m-0 font-serif text-small text-ink-2 max-w-[58ch]">{study.description}</p>
          <span className="label">{study.tags.join(" · ")}</span>
        </div>
      </Link>
    </li>
  );
}

export default function Home() {
  const pageRef = useSpreadMotion<HTMLElement>();

  return (
    <main ref={pageRef} className="grow min-w-0 w-full overflow-x-clip">
      {/* ─── Cover ─────────────────────────────────────────────────────── */}
      <section className="relative px-margin pt-[clamp(28px,5vw,64px)] pb-[clamp(40px,6vw,80px)]">
        <Register className="left-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,64px)]" />
        <Register className="right-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,64px)]" />

        <Grid className="gap-y-[clamp(28px,4vw,56px)]">
          {/* Masthead */}
          <Col span={12} className="flex flex-wrap justify-between gap-x-8 gap-y-2 pb-4 border-b border-rule">
            <span className="label label-ink">Roys A Kareem</span>
            <span className="label">Product Designer</span>
            <span className="label">Frontend Developer</span>
            <span className="label max-md:hidden">AI-Integrated Product Design</span>
            <LocalTime />
          </Col>

          {/* Title */}
          <Col span={12}>
            <h1
              data-set
              className="m-0 font-display font-medium text-hero leading-[0.86] tracking-[-0.05em]"
            >
              <span className="line-mask">
                <span>Pixels.</span>
              </span>
              <span className="line-mask">
                <span>Code.</span>
              </span>
              <span className="line-mask">
                <span className="text-accent">Impact.</span>
              </span>
            </h1>
          </Col>

          {/* Standfirst, actions, and one plate */}
          <Col span={4} className="self-end">
            <p className="m-0 font-serif text-lead leading-[1.45] text-ink-2 text-pretty">
              Crafting colorful, user-centric experiences from the first pixel to the final
              deployment. <em className="not-italic text-ink">Fifteen years</em> of enterprise UX,
              design systems and workflow automation, now built with AI in the loop.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Button to="/case-studies" primary>
                Read the case studies <ArrowIcon />
              </Button>
              <Button to="/resume">Resume</Button>
            </div>
          </Col>

          <Col span={5} start={8} className="self-end">
            <Plate title="Frontispiece — Flow field" meta="Generative · Canvas 2D" ratio="16 / 10">
              <FlowField count={900} />
            </Plate>
          </Col>
        </Grid>
      </section>

      {/* ─── Ticker rule ───────────────────────────────────────────────── */}
      <div
        className="no-select overflow-hidden border-y border-rule py-2.5 whitespace-nowrap bg-paper-2"
        aria-hidden="true"
      >
        <div className="ticker-track">
          {[...tickerWords, ...tickerWords].map((w, i) => (
            <span key={i} className="label inline-flex items-center">
              <i className="not-italic text-accent mx-8">✳</i>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Contents ──────────────────────────────────────────────────── */}
      <Spread id="contents" rule={false}>
        <SpreadHead
          index="§ 01"
          label="Contents"
          title={
            <>
              Selected <span className="font-serif font-normal italic text-ink-2">case studies</span>
            </>
          }
          aside="Deep dives into the why behind the what — research, constraint, trade-off and outcome."
        />
        <Col span={12} className="mt-[clamp(32px,5vw,64px)]">
          <HoverPeekProvider>
            <ul className="list-none m-0 p-0 border-t border-rule">
              {caseStudies.map((s) => (
                <IndexRow key={s.id} study={s} total={caseStudies.length} />
              ))}
            </ul>
          </HoverPeekProvider>
        </Col>
      </Spread>

      {/* ─── Plates ────────────────────────────────────────────────────── */}
      <Spread id="works" tone="tint">
        <SpreadHead index="§ 02" label="Plates" title="Works" aside="A curated gallery of craft and code." />
        <Col span={12} className="mt-[clamp(32px,5vw,64px)]">
          <Grid className="gap-y-10">
            {works.map((w, i) => (
              <Col key={w.to} span={4}>
                <Link to={w.to} className="group block">
                  <Plate no={i + 1} total={works.length} title={w.title} meta={w.meta} zoom>
                    {w.media}
                  </Plate>
                  <p className="mt-3 m-0 font-serif text-small text-ink-2">{w.text}</p>
                </Link>
              </Col>
            ))}
          </Grid>
        </Col>
      </Spread>

      {/* ─── Colophon of the practice ──────────────────────────────────── */}
      <Spread id="about">
        <Col span={7}>
          <p className="label m-0 mb-6">
            <span className="text-accent">§ 03</span> <span className="ml-3">Statement</span>
          </p>
          <p
            data-fade
            className="m-0 font-serif font-normal text-[clamp(23px,2.9vw,40px)] leading-[1.28] tracking-[-0.015em] text-pretty"
          >
            I design and ship the same product. Design systems, automation workflow builders and
            dashboard tooling for enterprise platforms, with{" "}
            <em className="not-italic text-accent">AI-assisted workflows</em> shortening the distance
            between a sketch and a deployed screen.
          </p>
        </Col>

        <Col span={4} start={9} className="max-lg:mt-10">
          <p className="label m-0 mb-3">By the numbers</p>
          <dl className="m-0 border-t border-rule">
            {facts.map((f) => (
              <div key={f.label} className="flex items-baseline gap-5 py-4 border-b border-rule">
                <dt className="m-0 font-display font-medium text-[34px] leading-none tracking-[-0.04em] tabular-nums w-[3.2ch] shrink-0">
                  {f.value}
                  <span className="text-accent text-[0.55em] align-super">{f.unit}</span>
                </dt>
                <dd className="label m-0">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Col>
      </Spread>
    </main>
  );
}
