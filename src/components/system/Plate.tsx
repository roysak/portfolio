import type { ReactNode } from "react";

/**
 * A numbered, captioned work — the unit this whole site is built from, whether
 * it holds a painting, a screenshot or a live shader. The frame is fixed to the
 * grid; only what is inside it moves.
 */
export function Plate({
  no,
  total,
  title,
  meta,
  /** A CSS aspect-ratio, or "auto" to let the work keep its own proportions. */
  ratio = "4 / 3",
  href,
  onClick,
  zoom = false,
  className = "",
  children,
}: {
  no?: number | string;
  total?: number | string;
  title?: ReactNode;
  meta?: ReactNode;
  ratio?: string;
  href?: string;
  onClick?: () => void;
  zoom?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const plateNo =
    no === undefined
      ? null
      : `PL. ${String(no).padStart(2, "0")}${total ? ` / ${String(total).padStart(2, "0")}` : ""}`;

  const frame = (
    <div
      data-plate
      className="plate-frame"
      style={ratio === "auto" ? undefined : { aspectRatio: ratio }}
    >
      <div className={`plate-media w-full h-full ${zoom ? "plate-zoom" : ""}`}>{children}</div>
    </div>
  );

  const caption = (plateNo || title || meta) && (
    <figcaption className="mt-3 flex items-baseline gap-3">
      {plateNo && <span className="label text-accent shrink-0">{plateNo}</span>}
      <span className="leader" aria-hidden="true" />
      <span className="text-right min-w-0">
        {title && <span className="block text-small font-medium leading-snug">{title}</span>}
        {meta && <span className="label block mt-0.5">{meta}</span>}
      </span>
    </figcaption>
  );

  const body = (
    <>
      {frame}
      {caption}
    </>
  );

  if (href || onClick) {
    return (
      <figure className={`plate group m-0 ${className}`}>
        {href ? (
          <a href={href} className="block">
            {body}
          </a>
        ) : (
          <button type="button" onClick={onClick} className="block w-full text-left">
            {body}
          </button>
        )}
      </figure>
    );
  }

  return <figure className={`plate m-0 ${className}`}>{body}</figure>;
}
