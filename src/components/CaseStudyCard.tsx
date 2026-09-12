import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import { assetUrl } from "../utils/assetUrl";
import Button, { ArrowIcon } from "./Button";

interface CaseStudyCardProps {
  study: CaseStudy;
  flip?: boolean;
}

/** Full-width split panel: image on one side, editorial copy on the other. */
export default function CaseStudyCard({ study, flip = false }: CaseStudyCardProps) {
  return (
    <article className="group bg-ink grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
      <Link
        to={`/case-studies/${study.link}`}
        className={`relative overflow-hidden bg-ink-3 aspect-[16/10] md:aspect-auto ${flip ? "md:order-2" : ""}`}
        aria-label={`Open ${study.title}`}
      >
        <img
          src={assetUrl(study.image)}
          alt={`${study.title} preview`}
          className="w-full h-full object-cover object-left-top transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]"
        />
        <span
          className="absolute left-5 top-5 w-7 h-7 rounded-full border-2 border-white/60"
          style={{ background: study.swatch }}
          aria-hidden="true"
        />
      </Link>

      <div className="p-[clamp(28px,4vw,56px)] grid grid-rows-[auto_1fr_auto] gap-6">
        <div>
          <span className="label">
            {study.link} · {study.client}
          </span>
          <h3 className="mt-2.5 mb-0 font-display font-semibold text-[clamp(30px,3.4vw,48px)] leading-none tracking-[-0.03em] text-balance">
            {study.title}
          </h3>
        </div>
        <p className="m-0 text-bone-2 max-w-[46ch]">{study.description}</p>
        <div className="flex justify-between items-end gap-4 flex-wrap">
          <div className="flex gap-1.5 flex-wrap">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.06em] px-2.5 py-[5px] rounded-full bg-plum-soft text-plum"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button to={`/case-studies/${study.link}`}>
            Open study <ArrowIcon />
          </Button>
        </div>
      </div>
    </article>
  );
}
