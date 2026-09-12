import React, { useEffect } from "react";

interface ModalProps {
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

/** Plate zoom — the work lifted off the page against a flat ground. */
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
      className="fixed inset-0 z-[1000] grid place-items-center p-[clamp(20px,5vw,72px)] bg-paper/97 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <figure className="m-0 max-w-full">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-[82svh] border border-rule"
        />
        <figcaption className="mt-3 flex items-baseline gap-3">
          <span className="label text-accent shrink-0">Plate</span>
          <span className="leader" aria-hidden="true" />
          <span className="label">{imageAlt}</span>
        </figcaption>
      </figure>

      <button
        type="button"
        className="absolute top-5 right-5 label px-3 py-2 border border-rule-2 hover:bg-ink hover:text-paper hover:border-ink transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        Close ✕
      </button>
    </div>
  );
};

export default Modal;
