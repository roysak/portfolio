import type { ReactNode } from "react";

interface Props {
  items: string[];
  /** Seconds for one full pass. */
  duration?: number;
  reverse?: boolean;
  separator?: ReactNode;
  className?: string;
}

/**
 * Infinite ticker. The list is rendered twice and translated by -50%, so the
 * loop is seamless regardless of content width. Pauses on hover.
 */
export default function Marquee({
  items,
  duration = 42,
  reverse = false,
  separator,
  className = "",
}: Props) {
  const mark = separator ?? <span className="text-pigment not-italic">◆</span>;

  return (
    <div className={`marquee overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div
        className="marquee-track"
        data-dir={reverse ? "reverse" : undefined}
        style={{ "--dur": `${duration}s` } as React.CSSProperties}
      >
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className="label label-strong inline-flex items-center gap-12">
            {mark}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
