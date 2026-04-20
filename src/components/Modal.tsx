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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt={imageAlt} className="modal-image" />
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;