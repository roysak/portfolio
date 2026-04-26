import CaseStudyCard from "../components/CaseStudyCard";
import caseStudies from "../data/caseStudies";

export default function CaseStudies() {
  return (
    <main className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full py-24 pt-12">
      <h1 className="text-3xl text-primary-600 font-semibold tracking-tight mb-10">
        Case Studies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-16">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </main>
  );
}
