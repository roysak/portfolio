import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import Magnetic from "./Magnetic";

interface ButtonProps {
  to?: string;
  href?: string;
  primary?: boolean;
  children: ReactNode;
  className?: string;
  download?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  /** Opt out of the magnetic pull for buttons packed into tight rows. */
  still?: boolean;
}

export const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={`w-3.5 h-3.5 ${className}`}
    aria-hidden="true"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

/**
 * Pill on paper, rectangle in code mode — the radius comes from the tokens.
 * The label sits above a fill that sweeps up from the baseline on hover.
 */
export default function Button({
  to,
  href,
  primary = false,
  children,
  className = "",
  still = false,
  ...rest
}: ButtonProps) {
  const cls = [
    "group/btn relative isolate inline-flex items-center gap-2.5 overflow-hidden",
    "px-[22px] py-3.5 rounded-art-pill border",
    "font-mono text-[11px] uppercase tracking-[0.14em] whitespace-nowrap",
    "transition-[color,background-color,border-color,border-radius] duration-500 ease-art",
    primary
      ? "bg-pigment text-pigment-ink border-pigment hover:text-pigment"
      : "border-line-strong text-bone hover:text-ink hover:border-bone",
    className,
  ].join(" ");

  const body = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-art group-hover/btn:scale-y-100 ${
          primary ? "bg-ink" : "bg-bone"
        }`}
      />
      {children}
    </>
  );

  const inner = to ? (
    <Link to={to} className={cls}>
      {body}
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      {body}
    </a>
  );

  return still ? inner : <Magnetic strength={0.22}>{inner}</Magnetic>;
}

/** Circular arrow affordance used on cards and index rows. */
export function ArrowBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`w-11 h-11 shrink-0 rounded-art-pill border border-line-strong grid place-items-center transition-[background-color,color,transform,border-radius] duration-500 ease-art group-hover:bg-bone group-hover:text-ink group-hover:border-bone group-hover:-rotate-45 ${className}`}
    >
      <ArrowIcon />
    </span>
  );
}
