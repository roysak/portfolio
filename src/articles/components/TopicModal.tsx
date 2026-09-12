import { useState, useEffect, useRef } from "react";
import type { TopicItem, ModalLabels } from "./types";
import { CODE_LABELS } from "./types";

interface TopicModalProps {
  topic: TopicItem;
  badgeClass: string;
  badgePrefix?: string;
  labels?: ModalLabels;
  onClose: () => void;
}

export default function TopicModal({
  topic,
  badgeClass,
  badgePrefix = "",
  labels = CODE_LABELS,
  onClose,
}: TopicModalProps) {
  const [openVariation, setOpenVariation] = useState<number | null>(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  // Reset accordion when topic changes
  useEffect(() => { setOpenVariation(0); }, [topic]);

  // Lock body scroll + Esc to close + focus trap + restore focus on close
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    // Focus the first focusable element on mount
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    firstFocusable?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={topic.name}
        className="bg-paper border border-rule-2 w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Running head */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-rule bg-paper-2">
          <div className="flex items-baseline gap-3 min-w-0">
            <h2 className="m-0 font-display text-head font-medium tracking-[-0.025em] text-ink truncate">
              {topic.name}
            </h2>
            <span className={`label px-2 py-0.5 border shrink-0 ${badgeClass}`}>
              {badgePrefix}
              {topic.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="label px-2.5 py-1.5 border border-rule-2 hover:bg-ink hover:text-paper hover:border-ink transition-colors shrink-0"
            aria-label="Close"
          >
            Close ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-7">
          <p className="m-0 font-serif text-ink-2 leading-[1.6]">{topic.description}</p>

          <Field label={labels.syntax}>
            <Code>{topic.syntax}</Code>
          </Field>

          <Field label={labels.detail}>
            <p className="m-0 text-small text-ink-2 leading-relaxed">{topic.notes}</p>
          </Field>

          <Field label={labels.returns}>
            <p className="m-0 text-small text-ink-2 leading-relaxed">{topic.returns}</p>
          </Field>

          {/* Variations / Examples */}
          <div>
            <p className="label m-0 mb-3 pb-1.5 border-b border-rule-2 text-ink">{labels.variations}</p>
            <div className="border-t border-rule">
              {topic.variations.map((variation, index) => {
                const isOpen = openVariation === index;
                return (
                  <div key={index} className="border-b border-rule">
                    <button
                      onClick={() => setOpenVariation(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 py-3 text-left transition-colors hover:text-accent"
                    >
                      <span className="flex items-baseline gap-3 min-w-0">
                        <span className={`label ${isOpen ? "text-accent" : ""}`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-small font-medium">{variation.title}</span>
                      </span>
                      <span className="label shrink-0">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="pb-4">
                        <Code small>{variation.code}</Code>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A labelled block — mono rule above, content below. */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label m-0 mb-3 pb-1.5 border-b border-rule-2 text-ink">{label}</p>
      {children}
    </div>
  );
}

/** A printed code listing on a tint block, not a terminal window. */
function Code({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <pre
      className={`m-0 bg-paper-3 border border-rule p-4 overflow-x-auto font-mono text-ink leading-relaxed ${
        small ? "text-[12px]" : "text-[13px]"
      }`}
      style={{ userSelect: "text" }}
    >
      <code>{children}</code>
    </pre>
  );
}
