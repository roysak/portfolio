import CaseStudyCard from "../components/CaseStudyCard";
import caseStudies from "../data/caseStudies";

export default function CaseStudies() {
  return (
    <main className="case-studies-index studio-container">
      <header className="inner-page-intro">
        <p className="eyebrow">01 / THE THINKING BEHIND THE INTERFACE</p>
        <h1>Complex problems.<br /><em>Clearer experiences.</em></h1>
        <p>Selected stories of research, design, and development making everyday work feel simpler.</p>
      </header>
      <div className="case-studies-grid">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index + 1} />
        ))}
      </div>
    </main>
  );
}
