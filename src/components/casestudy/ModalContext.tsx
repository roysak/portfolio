import { createContext, useContext, useState } from 'react';
import Modal from '../Modal';

interface ModalState {
  src: string;
  alt: string;
}

interface ModalContextValue {
  openModal: (src: string, alt: string) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null);

  function openModal(src: string, alt: string) {
    setModal({ src, alt });
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {modal && (
        <Modal imageSrc={modal.src} imageAlt={modal.alt} onClose={closeModal} />
      )}
    </ModalContext.Provider>
  );
}
