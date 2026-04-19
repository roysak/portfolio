import { useParams, Link } from "react-router-dom";
import caseStudy01 from "../data/caseStudy01";
import caseStudy02 from "../data/caseStudy02";
import type { CaseStudyPageData } from "../data/caseStudyTypes";
import CaseStudyHero from "../components/casestudy/CaseStudyHero";
import CaseStudyInPageNav from "../components/casestudy/CaseStudyInPageNav";
import SectionRenderer from "../components/casestudy/SectionRenderer";

const CASE_STUDY_DATA: Record<string, CaseStudyPageData> = {
  "01": caseStudy01,
  "02": caseStudy02,
};

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const data = id ? CASE_STUDY_DATA[id] : undefined;

  if (!data) {
    return (
      <main className="max-w-6xl w-full mx-auto px-6 py-24 text-center">
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
    <div className="min-h-screen bg-white text-gray-900">
      <CaseStudyHero hero={data.hero} />
      <CaseStudyInPageNav navItems={data.navItems} />
      {data.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} />
      ))}
      <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-100">
        <p>Thanks for scrolling.</p>
      </footer>
    </div>
  );
}

