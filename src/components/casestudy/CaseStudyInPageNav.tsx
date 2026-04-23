import { useEffect, useState } from 'react';
import type { CaseStudyNavItem } from '../../data/caseStudyTypes';
import { useScrollDirection } from '../../hooks/useScrollDirection';

interface Props {
  navItems: CaseStudyNavItem[];
}

export default function CaseStudyInPageNav({ navItems }: Props) {
  const [activeAnchor, setActiveAnchor] = useState<string>(navItems[0]?.anchor ?? '');
  const scrollDir = useScrollDirection();

  useEffect(() => {
    const anchors = navItems.map((item) => item.anchor);

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveAnchor(visible[0].target.id);
        }
      },
      {
        rootMargin: '-10% 0px -80% 0px', // trigger when section enters top 10–20% of viewport
        threshold: 0,
      }
    );

    anchors.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const linkClass = (anchor: string) =>
    `text-sm font-medium transition-colors ${
      activeAnchor === anchor
        ? 'text-neutral-900'
        : 'text-neutral-400 hover:text-neutral-700'
    }`;

  return (
    <nav
      className="sticky z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-[top] duration-300"
      style={{ top: scrollDir === 'up' ? 'var(--nav-height, 72px)' : '0px' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center items-center">
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className={linkClass(item.anchor)}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.anchor)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
