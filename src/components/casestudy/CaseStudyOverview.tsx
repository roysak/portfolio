import type { CaseStudy } from "../../data/caseStudies";

interface Props {
  study: CaseStudy;
}

export default function CaseStudyOverview({ study }: Props) {
  return (
    <section className="mb-12 pb-12 border-b border-neutral-100">
      <p className="text-lg text-neutral-600 leading-relaxed mb-6">
        {study.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
