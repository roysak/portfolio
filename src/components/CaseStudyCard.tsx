import type { CaseStudy } from "../data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="group cursor-pointer flex flex-col">
      <a href={`/${study.link}/`}>
        <div
          className={`relative w-full aspect-4/2 rounded-2xl overflow-hidden mb-6 transition-all duration-500 ease-out border border-neutral-100 ${study.color} flex items-start justify-center shadow-sm group-hover:shadow-xl group-hover:scale-[1.02]`}
        >
          <img
            src={`/img/${study.image}`}
            alt={study.title}
            className="object-cover object-top w-full h-full"
          />

          <div className="card-arrow absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ease-out opacity-0 translate-y-2 -translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-900"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
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
                className="px-3 py-1 bg-white border border-neutral-200 text-neutral-600 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
}
