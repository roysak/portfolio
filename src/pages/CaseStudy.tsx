import { useParams, Link } from "react-router-dom";
import caseStudy01 from "../data/caseStudy01";
import caseStudy02 from "../data/caseStudy02";
import caseStudy03 from "../data/caseStudy03";
import type { CaseStudyPageData } from "../data/caseStudyTypes";
import CaseStudyHero from "../components/casestudy/CaseStudyHero";
import CaseStudyInPageNav from "../components/casestudy/CaseStudyInPageNav";
import SectionRenderer from "../components/casestudy/SectionRenderer";
import { ModalProvider } from "../components/casestudy/ModalContext";

const CASE_STUDY_DATA: Record<string, CaseStudyPageData> = {
  "01": caseStudy01,
  "02": caseStudy02,
  "03": caseStudy03,
};

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const data = id ? CASE_STUDY_DATA[id] : undefined;

  if (!data) {
    return (
      <main className="case-study-page studio-container py-24 text-center">
        <h1 className="text-3xl font-semibold mb-4">Case Study Not Found</h1>
        <Link
          to="/case-studies"
          className="text-neutral-500 hover:text-neutral-900 underline"
        >
          Back to Case Studies
        </Link>
      </main>
    );
  }

  return (
	<ModalProvider>
	  <main className="case-study-page">
		<div className="case-study-back studio-container">
			<Link
				to="/case-studies"
				className="inner-back-link">
				<i className="material-symbols-rounded">keyboard_backspace</i>Back to Case Studies
			</Link>
		</div>
		<div className="case-study-content">
			<CaseStudyHero hero={data.hero} />
			<CaseStudyInPageNav navItems={data.navItems} />
			{data.sections.map((section, i) => (
			  <SectionRenderer key={i} section={section} />
			))}
			<footer className="case-study-end">
				<p>Thanks for scrolling.</p>
			</footer>
		</div>
	  </main>
    </ModalProvider>
  );
}
