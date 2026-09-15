import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import { assetUrl } from "../utils/assetUrl";
import Button, { ArrowIcon } from "./Button";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  flip?: boolean;
}

/**
 * Full-width split panel. The index numeral sits behind the copy as a
 * watermark and the artwork tilts back to flat on hover.
 */
export default function CaseStudyCard({ study, index, flip = false }: CaseStudyCardProps) {
  const n = String(index).padStart(2, "0");

  return (
    <article className="group bg-ink grid grid-cols-1 md:grid-cols-2 min-h-110">
      <Link
        to={`/case-studies/${study.link}`}
        className={`relative overflow-hidden bg-ink-3 border-20 border-ink aspect-16/10 md:aspect-auto ${flip ? "md:order-2" : ""}`}
        aria-label={`Open ${study.title}`}
      >
        <img
          src={assetUrl(study.image)}
          alt={`${study.title} preview`}
          loading="lazy"
          className="w-full h-full object-cover scale-105 rotate-[0.6deg] transition-transform duration-900 ease-art group-hover:scale-100 group-hover:rotate-0"
        />
      </Link>

      <div className="relative isolate p-[clamp(28px,4vw,64px)] grid grid-rows-[auto_1fr_auto] gap-7">
        <span
          aria-hidden="true"
          className="absolute -z-10 right-4 top-0 font-display text-[clamp(120px,16vw,240px)] leading-none text-bone opacity-[0.045] select-none"
        >
          {n}
        </span>

        <div>
          <span className="label tag-num">{n}</span>
          <span className="label mx-2 text-line-strong">/</span>
          <span className="label">{study.client}</span>
          <h3 className="mt-3 mb-0 font-display text-[clamp(30px,3.8vw,54px)] leading-[0.98] text-balance transition-colors duration-300 group-hover:text-pigment">
            {study.title}
          </h3>
        </div>

        <p className="m-0 text-bone-2 max-w-[48ch]">{study.description}</p>

        <div className="flex justify-between items-end gap-5 flex-wrap">
          <div className="flex gap-1.5 flex-wrap max-w-[30ch]">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.1em] px-2.5 py-1.25 rounded-art-pill bg-plum-soft text-plum"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button to={`/case-studies/${study.link}`} still>
            Open study <ArrowIcon />
          </Button>
        </div>
      </div>
    </article>
  );
}
