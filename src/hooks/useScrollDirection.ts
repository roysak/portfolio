import { useEffect, useState } from 'react';

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handler = () => {
      const scrollY = window.scrollY;

      // Always show nav at the very top
      if (scrollY === 0) {
        setScrollDir('up');
        lastScrollY = scrollY;
        return;
      }

      // Ignore tiny jitters
      if (Math.abs(scrollY - lastScrollY) < 5) return;

      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return scrollDir;
}
