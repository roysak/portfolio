import React, { useEffect } from "react";

interface ModalProps {
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

/** Lightbox for the gallery pages. Closes on Escape, backdrop click or the X. */
const Modal: React.FC<ModalProps> = ({ imageSrc, imageAlt, onClose }) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={imageAlt}
      className="fixed inset-0 z-1000 grid place-items-center p-6 bg-ink/94 backdrop-blur-md cursor-zoom-out"
      onClick={onClose}
    >
      <figure className="m-0 grid gap-4 justify-items-center max-h-[92svh]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-[84svh] rounded-art shadow-lift border border-line"
        />
        <figcaption className="label label-strong">{imageAlt}</figcaption>
      </figure>

      <button
        type="button"
        className="absolute top-5 right-5 w-11 h-11 rounded-art-pill border border-line-strong text-bone grid place-items-center transition-colors hover:bg-bone hover:text-ink"
        onClick={onClose}
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
};

export default Modal;
