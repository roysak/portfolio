import React, { useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 80;

interface ModalProps {
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

/** Lightbox for the gallery pages. Closes on Escape, backdrop click or the X. */
const Modal: React.FC<ModalProps> = ({ imageSrc, imageAlt, onClose, onPrevious, onNext }) => {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swipeAxis = useRef<"horizontal" | "vertical" | null>(null);
  const suppressClick = useRef(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const figureRef = useRef<HTMLElement>(null);
  const swipeProgress = Math.min(Math.abs(swipeOffset) / SWIPE_THRESHOLD, 1);
  const swipeDirection = swipeOffset < 0 ? "next" : "previous";

  function resetSwipe() {
    touchStart.current = null;
    swipeAxis.current = null;
    setSwipeOffset(0);
  }

  useEffect(() => {
    figureRef.current?.scrollTo(0, 0);
  }, [imageSrc]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrevious) {
        e.preventDefault();
        onPrevious();
      }
      if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        onNext();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={imageAlt}
      className="fixed inset-0 z-1000 grid place-items-center bg-ink/94 backdrop-blur-md cursor-zoom-out"
      onClick={onClose}
    >
      <figure
        ref={figureRef}
        className="m-0 grid gap-4 justify-items-center max-h-[100svh] w-full px-6 py-20 md:px-20 overflow-y-auto overflow-x-hidden touch-pan-y touch-pinch-zoom"
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onTouchStart={(e) => {
          resetSwipe();
          suppressClick.current = false;
          const touch = e.touches[0];
          touchStart.current = e.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
        }}
        onTouchMove={(e) => {
          const start = touchStart.current;
          if (!start) return;
          if (e.touches.length !== 1) {
            resetSwipe();
            return;
          }
          const dx = e.touches[0].clientX - start.x;
          const dy = e.touches[0].clientY - start.y;
          if (!swipeAxis.current && Math.max(Math.abs(dx), Math.abs(dy)) >= 10) {
            swipeAxis.current = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
          }
          if (swipeAxis.current !== "horizontal") return;
          suppressClick.current = true;
          setSwipeOffset((dx < 0 ? onNext : onPrevious) ? dx : 0);
        }}
        onTouchCancel={resetSwipe}
        onTouchEnd={(e) => {
          const start = touchStart.current;
          const axis = swipeAxis.current;
          resetSwipe();
          if (!start || e.touches.length > 0 || axis !== "horizontal") return;
          const touch = e.changedTouches[0];
          const dx = touch.clientX - start.x;
          if (Math.abs(dx) < SWIPE_THRESHOLD) return;
          if (dx < 0) onNext?.();
          else onPrevious?.();
        }}
      >
        <div
          className="relative max-w-full transition-transform ease-out motion-reduce:transition-none"
          style={{
            transform: `translateX(${Math.sign(swipeOffset) * Math.min(Math.abs(swipeOffset) * 0.65, 120)}px)`,
            transitionDuration: swipeOffset === 0 ? "200ms" : "0ms",
          }}
        >
          <img
            key={imageSrc}
            src={imageSrc}
            alt={imageAlt}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            style={{
              opacity: 1 - swipeProgress * 0.2,
              transitionDuration: swipeOffset === 0 ? "200ms" : "0ms",
            }}
            className="block max-w-full rounded-art shadow-lift border border-line cursor-default transition-opacity ease-out motion-reduce:transition-none"
          />
        </div>
        <figcaption aria-live="polite" onClick={(e) => e.stopPropagation()} className="label label-strong cursor-default">{imageAlt}</figcaption>
      </figure>

      {swipeOffset !== 0 && (
        <div className="absolute inset-0 grid place-items-center pointer-events-none p-16">
          <div className="relative p-16 rounded-full bg-ink/80 border-white border-2" style={{ opacity: 0.15 + swipeProgress * 0.85 }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-bone"
            >
              <path d={swipeDirection === "next" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
            </svg>
          </div>
        </div>
      )}
      {([
        { label: "Previous image", action: onPrevious, position: "left-3 md:left-5", path: "M15 6l-6 6 6 6" },
        { label: "Next image", action: onNext, position: "right-3 md:right-5", path: "M9 6l6 6-6 6" },
      ]).map(({ label, action, position, path }) => action && (
        <button
          key={label}
          type="button"
          aria-label={label}
          className={`absolute top-1/2 -translate-y-1/2 ${position} w-11 h-11 rounded-art-pill border border-line-strong bg-ink/90 text-bone grid place-items-center cursor-pointer transition-colors hover:bg-bone hover:text-ink focus-visible:outline-2 focus-visible:outline-bone [@media(pointer:coarse)]:hidden`}
          onClick={(e) => {
            e.stopPropagation();
            action();
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
            <path d={path} />
          </svg>
        </button>
      ))}

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
