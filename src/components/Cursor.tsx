import { useEffect, useRef } from 'react';

export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const onMouseMove = (e: MouseEvent) => {
      const t = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      outer.style.transform = t;
      inner.style.transform = t;
    };

    const onMouseDown = () => {
      outer.classList.add('click');
      inner.classList.add('click');
    };

    const onMouseUp = () => {
      outer.classList.remove('click');
      inner.classList.remove('click');
    };

    // Use event delegation so dynamically-added links are covered
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('a, button')) {
        outer.classList.add('hover');
        inner.classList.add('hover');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('a, button')) {
        outer.classList.remove('hover');
        inner.classList.remove('hover');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor_outer" />
      <div ref={innerRef} className="cursor_inner" />
    </>
  );
}
