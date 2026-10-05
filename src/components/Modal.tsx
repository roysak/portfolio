import React, { useEffect } from 'react';

interface ModalProps {
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageSrc, imageAlt, onClose }) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="relative m-0 grid gap-4 justify-items-center max-h-[100svh] w-full p-6 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageSrc} alt={imageAlt} className="max-w-full rounded-lg" />
        <button
          className="absolute top-2.5 right-2.5 bg-transparent border-0 text-white text-2xl cursor-pointer leading-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;