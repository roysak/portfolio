import { useParams, Link } from "react-router-dom";
import caseStudy01 from "../data/caseStudy01";
import caseStudy02 from "../data/caseStudy02";
import caseStudy03 from "../data/caseStudy03";
import type { CaseStudyPageData } from "../data/caseStudyTypes";
import CaseStudyHero from "../components/casestudy/CaseStudyHero";
import CaseStudyInPageNav from "../components/casestudy/CaseStudyInPageNav";
import SectionRenderer from "../components/casestudy/SectionRenderer";
import { ModalProvider } from "../components/casestudy/ModalContext";
import Button, { ArrowIcon } from "../components/Button";
import { Col, Grid } from "../components/system";
import { useSpreadMotion, useScrollRefresh } from "../hooks/useMotion";

const CASE_STUDY_DATA: Record<string, CaseStudyPageData> = {
  "01": caseStudy01,
  "02": caseStudy02,
  "03": caseStudy03,
};

const ORDER = Object.keys(CASE_STUDY_DATA);

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const data = id ? CASE_STUDY_DATA[id] : undefined;
  const pageRef = useSpreadMotion<HTMLElement>();
  useScrollRefresh([id]);

  if (!data) {
    return (
      <main className="px-margin py-[clamp(64px,9vw,128px)]">
        <h1 className="m-0 mb-6 font-display font-medium text-display leading-[0.95] tracking-[-0.045em]">
          Case study not found
        </h1>
        <Button to="/case-studies">
          Back to case studies <ArrowIcon />
        </Button>
      </main>
    );
  }

  const index = ORDER.indexOf(id!);
  const next = ORDER[(index + 1) % ORDER.length];

  return (
    <ModalProvider>
      <main ref={pageRef} className="grow min-w-0 w-full overflow-x-clip">
        <div className="px-margin pt-4 pb-2">
          <Link to="/case-studies" className="label hover:text-accent transition-colors">
            ← Back to case studies
          </Link>
        </div>

        <CaseStudyHero hero={data.hero} />
        <CaseStudyInPageNav navItems={data.navItems} />

        {data.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}

        {/* ── End matter ── */}
        <section className="px-margin py-[clamp(48px,7vw,96px)] border-t border-rule">
          <Grid className="gap-y-6 items-end">
            <Col span={6}>
              <span className="label">End of study {id}</span>
              <p className="m-0 mt-3 font-serif text-[clamp(22px,2.6vw,34px)] leading-[1.2] tracking-[-0.015em]">
                Thanks for scrolling.
              </p>
            </Col>
            <Col span={5} start={8} className="flex flex-wrap gap-3 md:justify-end">
              <Button to={`/case-studies/${next}`} primary>
                Next study {next} <ArrowIcon />
              </Button>
              <Button to="/case-studies">All studies</Button>
            </Col>
          </Grid>
        </section>
      </main>
    </ModalProvider>
  );
}
