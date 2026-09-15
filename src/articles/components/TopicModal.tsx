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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={topic.name}
        className="bg-ink-2 border border-line rounded-art shadow-lift w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line bg-ink-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-bone">{topic.name}</h2>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-art-pill ${badgeClass}`}>
              {badgePrefix}{topic.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-bone-3 hover:text-bone transition-colors p-1.5 rounded-art-pill hover:bg-ink-3"
            aria-label="Close"
          >
            <span className="material-symbols-rounded text-xl! leading-none block!">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-6">
          <p className="text-bone-2 leading-relaxed">{topic.description}</p>

          {/* Syntax / Summary */}
          <div>
            <p className="label mb-2">{labels.syntax}</p>
            <pre
              className="bg-[#0c0e12] text-[#e8edf4] border border-line rounded-art-sm p-4 overflow-x-auto text-sm font-mono"
              style={{ userSelect: "text" }}
            >
              <code>{topic.syntax}</code>
            </pre>
          </div>

          {/* Detail (Notes / Arguments) */}
          <div>
            <p className="label mb-2">{labels.detail}</p>
            <p className="text-sm text-bone-2 leading-relaxed bg-ink-3 border border-line rounded-art-sm p-4">
              {topic.notes}
            </p>
          </div>

          {/* Returns / Outcome */}
          <div>
            <p className="label mb-2">{labels.returns}</p>
            <p className="text-sm text-bone-2 leading-relaxed bg-ink-3 border border-line rounded-art-sm p-4">
              {topic.returns}
            </p>
          </div>

          {/* Variations / Examples accordion */}
          <div>
            <p className="label mb-2">{labels.variations}</p>
            <div className="rounded-art border border-line overflow-hidden divide-y divide-line">
              {topic.variations.map((variation, index) => {
                const isOpen = openVariation === index;
                return (
                  <div key={index} className="bg-ink-3">
                    <button
                      onClick={() => setOpenVariation(isOpen ? null : index)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-ink-2 transition-colors"
                    >
                      <span className="text-sm font-semibold text-bone">{variation.title}</span>
                      <span
                        className={`material-symbols-rounded text-base! text-bone-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 bg-ink-2">
                        <pre
                          className="bg-[#0c0e12] text-[#e8edf4] border border-line rounded-art-sm p-4 overflow-x-auto text-xs font-mono"
                          style={{ userSelect: "text" }}
                        >
                          <code>{variation.code}</code>
                        </pre>
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
