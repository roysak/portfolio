import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/** An animated hairline. The system's only decoration. */
export function Rule({ className = "", strong = false }: { className?: string; strong?: boolean }) {
  return (
    <span
      data-rule
      aria-hidden="true"
      className={`rule-draw block h-px w-full ${strong ? "bg-rule-2" : "bg-rule"} ${className}`}
    />
  );
}

/** A print register cross. Positioned by the caller. */
export function Register({ className = "" }: { className?: string }) {
  return <span className={`register ${className}`} aria-hidden="true" />;
}

/** Mono metadata line. */
export function Caption({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`label ${className}`}>{children}</span>;
}

/**
 * A ruled key/value row — the workhorse for colophons, spec tables and
 * case-study metadata. Data set as data, not as prose.
 */
export function DataRow({ k, v }: { k: ReactNode; v: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 py-2.5 border-b border-rule">
      <span className="label shrink-0 w-[9rem] max-sm:w-[7rem]">{k}</span>
      <span className="text-small text-ink min-w-0">{v}</span>
    </div>
  );
}

/** Kochi local time, ticking. The running head's one live element. */
export function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return null;
  return (
    <span className={`label tabular-nums ${className}`}>
      Kochi <span className="text-ink-2">{now}</span> IST
    </span>
  );
}
