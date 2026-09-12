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
import { useReveal } from "../hooks/useReveal";

const CASE_STUDY_DATA: Record<string, CaseStudyPageData> = {
  "01": caseStudy01,
  "02": caseStudy02,
  "03": caseStudy03,
};

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const data = id ? CASE_STUDY_DATA[id] : undefined;
  const pageRef = useReveal<HTMLElement>();

  if (!data) {
    return (
      <main className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)] text-center">
        <h1 className="m-0 mb-6 font-display font-semibold text-[clamp(34px,5vw,68px)] leading-[0.98] tracking-[-0.03em]">
          Case study not found
        </h1>
        <Button to="/case-studies">
          Back to case studies <ArrowIcon />
        </Button>
      </main>
    );
  }

  return (
    <ModalProvider>
      <main ref={pageRef} className="grow min-w-0 w-full overflow-x-clip">
        <div className="px-gutter pt-32 pb-2">
          <div className="max-w-6xl mx-auto w-full">
            <Link
              to="/case-studies"
              className="label inline-flex gap-2 items-center hover:text-bone transition-colors"
            >
              <i className="material-symbols-rounded text-base!">keyboard_backspace</i>
              Back to case studies
            </Link>
          </div>
        </div>

        <CaseStudyHero hero={data.hero} />
        <CaseStudyInPageNav navItems={data.navItems} />
        {data.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}

        <div className="px-gutter py-[clamp(48px,7vw,88px)]">
          <div className="max-w-6xl mx-auto w-full flex flex-wrap gap-4 justify-between items-center">
            <span className="label">Thanks for scrolling.</span>
            <Button to="/case-studies">
              All case studies <ArrowIcon />
            </Button>
          </div>
        </div>
      </main>
    </ModalProvider>
  );
}
