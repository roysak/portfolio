import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full border border-line-strong bg-ink/80 backdrop-blur text-bone grid place-items-center transition-opacity duration-300 hover:bg-bone hover:text-ink ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
        <path d="M12 19V5m0 0l-6 6m6-6l6 6" />
      </svg>
    </button>
  );
}
