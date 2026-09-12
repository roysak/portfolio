import { useEffect, useState } from "react";

/** A mono tick in the corner rather than a floating pill. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`no-select fixed bottom-5 right-5 z-40 label px-3 py-2 border border-rule-2 bg-paper hover:text-paper hover:bg-ink hover:border-ink transition-[opacity,color,background-color,border-color] duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      ↑ Top
    </button>
  );
}
