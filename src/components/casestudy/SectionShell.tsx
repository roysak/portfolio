import type { ReactNode } from "react";
import { Col, Grid } from "../system";

type Tone = "base" | "raised" | "deep";

const TONE: Record<Tone, string> = {
  base: "",
  raised: "bg-paper-2",
  deep: "bg-paper-3",
};

interface BandProps {
  id?: string;
  tone?: Tone;
  divider?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A case-study spread. Carries the same margins, grid and rhythm as the rest of
 * the site so a study reads as a chapter of the same book.
 */
export function Band({ id, tone = "base", divider = true, className = "", children }: BandProps) {
  return (
    <section
      id={id}
      className={`relative px-margin py-[clamp(48px,7vw,112px)] ${TONE[tone]} ${className}`}
    >
      {divider && (
        <span
          data-rule
          aria-hidden="true"
          className="rule-draw absolute top-0 left-margin right-margin h-px bg-rule"
        />
      )}
      <Grid className="gap-y-10">{children}</Grid>
    </section>
  );
}

interface SectionIntroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Retained for data compatibility; the print system numbers rather than icons. */
  icon?: string;
  className?: string;
}

/** Section heading — the same voice as the marketing pages, one step down. */
export function SectionIntro({ title, subtitle, className = "" }: SectionIntroProps) {
  return (
    <Col span={12} className={className}>
      <h2
        data-set
        className="m-0 font-display font-medium text-[clamp(26px,3.2vw,44px)] leading-[1.02] tracking-[-0.035em] text-balance max-w-[22ch]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="m-0 mt-4 font-serif text-lead leading-[1.45] text-ink-2 max-w-[58ch] text-pretty">
          {subtitle}
        </p>
      )}
      <div className="mt-7 h-px bg-rule rule-draw" data-rule aria-hidden="true" />
    </Col>
  );
}

/** Small mono caption used above framed screenshots. */
export function FrameCaption({ children }: { children: ReactNode }) {
  return <p className="label m-0 mb-3">{children}</p>;
}
