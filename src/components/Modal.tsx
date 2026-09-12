import React, { useEffect } from "react";

interface ModalProps {
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageSrc, imageAlt, onClose }) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label={imageAlt}
      className="fixed inset-0 z-[1000] grid place-items-center p-6 bg-[rgba(15,13,20,0.92)] cursor-zoom-out"
      onClick={onClose}
    >
      <img src={imageSrc} alt={imageAlt} className="max-w-full max-h-[90svh] rounded shadow-lift" />
      <button
        type="button"
        className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/30 text-[#EDE6DA] grid place-items-center hover:bg-[#EDE6DA] hover:text-[#0F0D14] transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
};

export default Modal;
