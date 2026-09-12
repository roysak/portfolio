import CaseStudyCard from "../components/CaseStudyCard";
import SectionHead from "../components/SectionHead";
import caseStudies from "../data/caseStudies";

export default function CaseStudies() {
  return (
    <main className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      <SectionHead
        title={
          <>
            Case <em className="font-normal text-bone-2">studies</em>
          </>
        }
        aside="Deep dives into the why behind the what"
      />
      <div className="grid gap-px bg-line border border-line">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} flip={i % 2 === 1} />
        ))}
      </div>
    </main>
  );
}
