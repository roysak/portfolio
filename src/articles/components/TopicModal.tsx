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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={topic.name}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-neutral-900">{topic.name}</h2>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
              {badgePrefix}{topic.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-full hover:bg-neutral-200"
            aria-label="Close"
          >
            <span className="material-symbols-rounded text-xl! leading-none block!">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-6">
          <p className="text-neutral-600 leading-relaxed">{topic.description}</p>

          {/* Syntax / Summary */}
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{labels.syntax}</p>
            <pre
              className="bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-sm font-mono"
              style={{ userSelect: "text" }}
            >
              <code>{topic.syntax}</code>
            </pre>
          </div>

          {/* Detail (Notes / Arguments) */}
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{labels.detail}</p>
            <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4">
              {topic.notes}
            </p>
          </div>

          {/* Returns / Outcome */}
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{labels.returns}</p>
            <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4">
              {topic.returns}
            </p>
          </div>

          {/* Variations / Examples accordion */}
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{labels.variations}</p>
            <div className="rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100">
              {topic.variations.map((variation, index) => {
                const isOpen = openVariation === index;
                return (
                  <div key={index} className="bg-neutral-50">
                    <button
                      onClick={() => setOpenVariation(isOpen ? null : index)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-100 transition-colors"
                    >
                      <span className="text-sm font-semibold text-neutral-700">{variation.title}</span>
                      <span
                        className={`material-symbols-rounded text-base! text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 bg-white">
                        <pre
                          className="bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-xs font-mono"
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
