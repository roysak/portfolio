import { useEffect, useState } from 'react';
import type { CaseStudyNavItem } from '../../data/caseStudyTypes';

interface Props {
  navItems: CaseStudyNavItem[];
}

/** A running index that sticks under the nav — the chapter's table of contents. */
export default function CaseStudyInPageNav({ navItems }: Props) {
  const [activeAnchor, setActiveAnchor] = useState<string>(navItems[0]?.anchor ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveAnchor(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.anchor);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <nav
      className="no-select sticky z-30 bg-paper/90 backdrop-blur-sm border-y border-rule"
      style={{ top: 'var(--nav-height, 56px)' }}
      aria-label="Sections"
    >
      <div className="px-margin py-2.5 overflow-x-auto">
        <ol className="list-none m-0 p-0 flex gap-x-7 min-w-max">
          {navItems.map((item, i) => {
            const isActive = activeAnchor === item.anchor;
            return (
              <li key={item.anchor}>
                <a
                  href={`#${item.anchor}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`label group inline-flex items-baseline gap-2 py-1 transition-colors hover:text-ink ${
                    isActive ? 'text-ink' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.anchor)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className={isActive ? 'text-accent' : 'text-ink-3'}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 -bottom-1 h-px w-full bg-accent origin-left transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
