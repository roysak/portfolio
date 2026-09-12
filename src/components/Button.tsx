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

const base =
  "inline-flex items-center gap-2.5 px-[22px] py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.1em] border transition-[transform,background-color,color,border-color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5";
const ghost = "border-line-strong text-bone";
const solid = "bg-pigment text-pigment-ink border-pigment hover:bg-bone hover:border-bone hover:text-ink";

export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" aria-hidden="true">
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
