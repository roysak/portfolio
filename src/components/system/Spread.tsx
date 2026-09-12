import type { ReactNode } from "react";
import { Col, Grid } from "./Grid";

type Tone = "paper" | "tint" | "deep";

const TONE: Record<Tone, string> = {
  paper: "",
  tint: "bg-paper-2",
  deep: "bg-paper-3",
};

/**
 * A page spread: full-bleed band, page margins, the shared vertical rhythm and
 * an optional rule + register marks at its top edge. Replaces the ad-hoc
 * `px-gutter py-[clamp(...)] border-b` that used to be repeated on every page.
 */
export function Spread({
  id,
  tone = "paper",
  rule = true,
  marks = false,
  tight = false,
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  rule?: boolean;
  marks?: boolean;
  tight?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative px-margin ${
        tight ? "py-[clamp(36px,5vw,68px)]" : "py-[clamp(56px,8vw,132px)]"
      } ${TONE[tone]} ${className}`}
    >
      {rule && (
        <span
          data-rule
          aria-hidden="true"
          className="rule-draw absolute top-0 left-margin right-margin h-px bg-rule"
        />
      )}
      {marks && (
        <>
          <span className="register left-[calc(var(--margin)-22px)] top-[calc(var(--margin)/2)]" aria-hidden="true" />
          <span className="register right-[calc(var(--margin)-22px)] top-[calc(var(--margin)/2)]" aria-hidden="true" />
        </>
      )}
      <Grid>{children}</Grid>
    </section>
  );
}

/**
 * A section head set as a running head: mono section number and label above a
 * display title, with the aside pushed to the right of the grid.
 */
export function SpreadHead({
  index,
  label,
  title,
  aside,
}: {
  index?: string;
  label?: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <>
      <Col span={8}>
        {(index || label) && (
          <p className="label m-0 mb-5 flex gap-3">
            {index && <span className="text-accent">{index}</span>}
            {label && <span>{label}</span>}
          </p>
        )}
        <h2
          data-set
          className="m-0 font-display font-medium text-title leading-[1.02] tracking-[-0.035em] text-balance"
        >
          {title}
        </h2>
      </Col>
      {aside && (
        <Col
          as="p"
          span={3}
          start={10}
          className="self-end m-0 text-small text-ink-2 max-w-[34ch] max-md:mt-5"
        >
          {aside}
        </Col>
      )}
    </>
  );
}
