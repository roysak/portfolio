import CaseStudyCard from "../components/CaseStudyCard";
import caseStudies from "../data/caseStudies";

export default function CaseStudies() {
  return (
    <main className="max-w-6xl w-full mx-auto px-6 py-24 pt-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Case Studies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </main>
  );
}
