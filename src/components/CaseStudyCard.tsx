import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import { assetUrl } from "../utils/assetUrl";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="group cursor-pointer flex flex-col">
      <Link to={`/case-studies/${study.link}`}>
        <div
          className={`relative w-full aspect-4/2.5 rounded-2xl overflow-hidden mb-6 transition-all duration-300 ease-out ${study.color} ${study.shadow} flex items-start justify-center shadow-sm group-hover:shadow-xl group-hover:scale-[1.02]`}
        >
          <img
            src={assetUrl(study.image)}
            alt={study.title}
            className="object-cover object-top w-full h-full"
          />
        </div>

        <div className="flex flex-col grow">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {study.client}
            </span>
          </div>

          <h2 className="text-2xl font-semibold mb-3 group-hover:text-neutral-600 transition-colors">
            {study.title}
          </h2>

          <p className="text-neutral-500 leading-relaxed mb-6 grow">
            {study.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-neutral-200 rounded-full bg-primary-50 text-primary-600 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
