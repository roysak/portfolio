import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import { assetUrl } from "../utils/assetUrl";
import { ArrowIcon } from "./Button";
import { Col, Grid } from "./system";

interface CaseStudyCardProps {
  study: CaseStudy;
  total: number;
  flip?: boolean;
}

/** One study, set as a full spread: plate on one leaf, the record on the other. */
export default function CaseStudyCard({ study, total, flip = false }: CaseStudyCardProps) {
  const to = `/case-studies/${study.link}`;

  return (
    <article className="group py-[clamp(40px,6vw,80px)] border-b border-rule last:border-b-0">
      <Grid className="gap-y-8 items-center">
        <Col span={6} start={flip ? 7 : 1}>
          <Link to={to} aria-label={`Open ${study.title}`} className="block">
            <div data-plate className="plate-frame aspect-[16/10]">
              <div className="plate-media plate-zoom w-full h-full">
                <img
                  src={assetUrl(study.image)}
                  alt={`${study.title} preview`}
                  loading="lazy"
                  className="object-left-top"
                />
              </div>
              <span
                className="absolute left-4 top-4 w-4 h-4 border border-paper/70"
                style={{ background: study.swatch }}
                aria-hidden="true"
              />
            </div>
          </Link>
        </Col>

        <Col span={5} start={flip ? 1 : 8} className="max-md:mt-2">
          <p className="label m-0 mb-4 flex gap-3">
            <span className="text-accent">
              {study.link} / {String(total).padStart(2, "0")}
            </span>
            <span>{study.client}</span>
          </p>

          <h3 className="m-0 font-display font-medium text-[clamp(28px,3.2vw,44px)] leading-[1] tracking-[-0.04em] text-balance">
            <Link to={to} className="transition-colors group-hover:text-accent">
              {study.title}
            </Link>
          </h3>

          <p className="mt-4 mb-0 font-serif text-lead leading-[1.45] text-ink-2 max-w-[44ch]">
            {study.description}
          </p>

          <dl className="mt-7 m-0 border-t border-rule">
            <div className="flex items-baseline gap-4 py-2.5 border-b border-rule">
              <dt className="label shrink-0 w-24">Focus</dt>
              <dd className="m-0 text-small text-ink">{study.tags.join(" · ")}</dd>
            </div>
          </dl>

          <Link
            to={to}
            className="label inline-flex items-center gap-2 mt-6 group-hover:text-accent transition-colors"
          >
            Open study <ArrowIcon />
          </Link>
        </Col>
      </Grid>
    </article>
  );
}
