import CaseStudyCard from "../components/CaseStudyCard";
import caseStudies from "../data/caseStudies";
import { Col, Grid, Register } from "../components/system";
import { useSpreadMotion } from "../hooks/useMotion";

export default function CaseStudies() {
  const ref = useSpreadMotion<HTMLElement>();

  return (
    <main ref={ref} className="relative px-margin pt-[clamp(28px,5vw,56px)] pb-[clamp(48px,7vw,96px)]">
      <Register className="left-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />
      <Register className="right-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />

      <Grid className="gap-y-6">
        <Col span={8}>
          <p className="label m-0 mb-5">
            <span className="text-accent">§ 01</span> <span className="ml-3">Contents</span>
          </p>
          <h1 data-set className="m-0 font-display font-medium text-display leading-[0.95] tracking-[-0.045em]">
            Case{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-ink-2">studies</span>
          </h1>
        </Col>
        <Col span={3} start={10} as="p" className="self-end m-0 text-small text-ink-2 max-md:mt-4">
          Deep dives into the why behind the what — research, constraint, trade-off and outcome.
        </Col>

        <Col span={12} className="mt-[clamp(24px,4vw,48px)] border-t border-rule">
          {caseStudies.map((study, i) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              total={caseStudies.length}
              flip={i % 2 === 1}
            />
          ))}
        </Col>
      </Grid>
    </main>
  );
}
