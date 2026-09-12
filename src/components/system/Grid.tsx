import type { ElementType, ReactNode } from "react";

/** Lets callers tag blocks with the motion hooks' `data-*` attributes. */
type DataAttrs = { [key: `data-${string}`]: string | number | boolean | undefined };

/**
 * The 12-column grid every page snaps to. Collapses to 8 at 960px and 4 at
 * 640px via the --cols custom property, so column spans stay declarative.
 */
export function Grid({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement> & DataAttrs) {
  return (
    <Tag className={`grid-page ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * A column block. `span` is in desktop columns; `spanMd`/`spanSm` let a block
 * re-proportion itself on the 8- and 4-column grids rather than just reflowing.
 */
export function Col({
  span = 12,
  spanMd,
  spanSm,
  start,
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: {
  span?: Span;
  spanMd?: Span;
  spanSm?: Span;
  start?: Span;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
} & React.HTMLAttributes<HTMLElement> & DataAttrs) {
  const style = {
    "--span": span,
    "--span-md": spanMd ?? Math.min(span, 8),
    "--span-sm": spanSm ?? Math.min(span, 4),
    ...(start ? { "--start": start } : {}),
  } as React.CSSProperties;

  return (
    <Tag
      className={`col-block ${start ? "col-start" : ""} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
