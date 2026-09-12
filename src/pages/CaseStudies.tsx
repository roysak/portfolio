import CaseStudyCard from "../components/CaseStudyCard";
import SectionHead from "../components/SectionHead";
import caseStudies from "../data/caseStudies";
import { useReveal } from "../hooks/useReveal";

export default function CaseStudies() {
  const pageRef = useReveal<HTMLElement>();

  return (
    <main ref={pageRef} className="px-gutter pt-36 pb-[clamp(64px,9vw,128px)]">
      <SectionHead
        index="01"
        title={
          <>
            Case <em className="font-serif italic text-bone-2">studies</em>
          </>
        }
        aside={`${caseStudies.length} deep dives · enterprise platforms`}
      />
      <div className="reveal grid gap-px bg-line border border-line">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i + 1} flip={i % 2 === 1} />
        ))}
      </div>
    </main>
  );
}
