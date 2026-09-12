import type { ReactNode } from "react";

interface Props {
  /** Two-digit section marker, e.g. "02". */
  index?: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
}

/**
 * Section opener: a numbered rule, an oversized display heading and a mono
 * aside. The heading takes its typeface, weight and tracking from the mode.
 */
export default function SectionHead({ index, title, aside, className = "" }: Props) {
  return (
    <div className={`reveal mb-[clamp(36px,5vw,72px)] ${className}`}>
      {index && (
        <div className="flex items-center gap-4 mb-6">
          <span className="label tag-num text-pigment">{index}</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end">
        <h2 className="m-0 font-display text-[clamp(38px,6vw,86px)] leading-(--display-leading) text-balance">
          {title}
        </h2>
        {aside && <div className="label pb-2 sm:text-right">{aside}</div>}
      </div>
    </div>
  );
}
