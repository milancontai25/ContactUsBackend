// src/components/ScrollRow.jsx
// Reusable horizontal scroller with left/right arrows.
// Arrows disappear when there is nothing to scroll (handles 1..n items),
// and disable themselves at the start / end of the track.

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../assets/css/scrollrow.css';

const EPS = 4; // pixel tolerance for sub-pixel scroll positions

const ScrollRow = ({ children, className = '', ariaLabel = 'items', step = 0.85 }) => {
  const trackRef = useRef(null);
  const childCount = React.Children.count(children);

  const [state, setState] = useState({ overflowing: false, atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const overflowing = el.scrollWidth - el.clientWidth > EPS;
    const atStart = el.scrollLeft <= EPS;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - EPS;

    // bail out when nothing changed so this never loops
    setState((prev) =>
      prev.overflowing === overflowing && prev.atStart === atStart && prev.atEnd === atEnd
        ? prev
        : { overflowing, atStart, atEnd }
    );
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    measure();
    const raf = requestAnimationFrame(measure);
    const late = setTimeout(measure, 400); // re-measure once images have loaded

    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(el);
      Array.from(el.children).forEach((child) => ro.observe(child));
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
    };
  }, [measure, childCount]);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * step, 200);
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className={`srow ${state.overflowing ? '' : 'srow--no-overflow'} ${className}`}>
      <button
        type="button"
        className={`srow-arrow srow-arrow-left ${state.atStart ? 'is-disabled' : ''}`}
        onClick={() => scroll('left')}
        aria-label={`Scroll ${ariaLabel} left`}
        tabIndex={state.overflowing && !state.atStart ? 0 : -1}
      >
        <ChevronLeft size={20} />
      </button>

      <div className="srow-track" ref={trackRef}>
        {children}
      </div>

      <button
        type="button"
        className={`srow-arrow srow-arrow-right ${state.atEnd ? 'is-disabled' : ''}`}
        onClick={() => scroll('right')}
        aria-label={`Scroll ${ariaLabel} right`}
        tabIndex={state.overflowing && !state.atEnd ? 0 : -1}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ScrollRow;