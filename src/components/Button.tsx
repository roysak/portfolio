import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  to?: string;
  href?: string;
  primary?: boolean;
  children: ReactNode;
  className?: string;
  download?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
}

/**
 * Square, ruled, mono. Nothing here is round — a printed sheet has no pills.
 * The primary variant fills with ink rather than accent; accent is reserved
 * for marks and numbers.
 */
const base =
  "group inline-flex items-center gap-3 px-5 py-3 font-mono text-caption uppercase tracking-[0.11em] border transition-colors duration-300";
const ghost = "border-rule-2 text-ink hover:bg-ink hover:text-paper hover:border-ink";
const solid = "bg-ink text-paper border-ink hover:bg-accent hover:border-accent hover:text-paper";

export const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function Button({ to, href, primary, children, className = "", ...rest }: ButtonProps) {
  const cls = `${base} ${primary ? solid : ghost} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}
