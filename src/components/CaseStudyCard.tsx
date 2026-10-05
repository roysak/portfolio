import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import { assetUrl } from "../utils/assetUrl";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export default function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  return (
    <article className="study-card">
      <Link to={`/case-studies/${study.link}`}>
        <div className="study-card-image"><img src={assetUrl(study.image)} alt={study.title} loading="lazy" /></div>
        <div className="study-card-body">
          <p className="eyebrow">{String(index).padStart(2, '0')} / {study.client}</p>
          <div className="study-card-title"><h2>{study.title}</h2><span className="round-arrow" aria-hidden="true">↗</span></div>
          <p>{study.description}</p>
          <div className="study-card-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </Link>
    </article>
  );
}
