import type { ReactNode } from "react";
import DynamicIcon from "../DynamicIcon";

type Tone = "base" | "raised" | "deep";

const TONE: Record<Tone, string> = {
  base: "",
  raised: "bg-ink-2",
  deep: "bg-ink-3",
};

interface BandProps {
  id?: string;
  tone?: Tone;
  divider?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Full-bleed section band. Carries the same gutter and vertical rhythm as the
 * marketing pages so a case study reads as part of the same site.
 */
export function Band({ id, tone = "base", divider = true, className = "", children }: BandProps) {
  return (
    <section
      id={id}
      className={`px-gutter py-[clamp(56px,8vw,112px)] ${TONE[tone]} ${
        divider ? "border-b border-line" : ""
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto w-full">{children}</div>
    </section>
  );
}

interface SectionIntroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: string;
  className?: string;
}

/** Section heading for case studies — the SectionHead voice, one step down in scale. */
export function SectionIntro({ title, subtitle, icon, className = "" }: SectionIntroProps) {
  return (
    <div className={`reveal grid gap-4 mb-[clamp(32px,5vw,64px)] max-w-[60ch] ${className}`}>
      <h2 className="m-0 font-display font-semibold text-[clamp(28px,3.6vw,52px)] leading-[1.02] tracking-[-0.03em] text-balance flex items-start gap-3.5">
        {icon && <DynamicIcon name={icon} className="w-8 h-8 text-pigment mt-1 shrink-0" />}
        {title}
      </h2>
      {subtitle && <p className="m-0 text-bone-2 max-w-[54ch] text-pretty">{subtitle}</p>}
    </div>
  );
}

/** Small mono caption used above framed screenshots. */
export function FrameCaption({ children }: { children: ReactNode }) {
  return <p className="label m-0 mb-3.5">{children}</p>;
}
