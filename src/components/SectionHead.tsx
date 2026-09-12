import type { ReactNode } from "react";

interface Props {
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
}

/** Oversized display heading with a mono aside, used at the top of every section. */
export default function SectionHead({ title, aside, className = "" }: Props) {
  return (
    <div className={`reveal grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end mb-[clamp(32px,5vw,64px)] ${className}`}>
      <h2 className="m-0 font-display font-semibold text-[clamp(34px,5vw,68px)] leading-[0.98] tracking-[-0.03em] text-balance">
        {title}
      </h2>
      {aside && <div className="label pb-2">{aside}</div>}
    </div>
  );
}
