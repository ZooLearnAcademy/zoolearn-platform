import React, { useEffect, useRef, useState } from 'react';

/**
 * CountUp — animates a number from 0 to `end` when it scrolls into view.
 * Preserves any non-numeric parts of the label (e.g. "cm", "M", "yr").
 */
export default function CountUp({ value, duration = 1600, className = '' }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  // Parse numeric part and suffix (e.g. "22 M" -> 22 + " M")
  const match = String(value).match(/^([\d,.]+)(.*)$/);
  const target = match ? parseFloat(match[1].replace(/,/g, '')) : null;
  const suffix = match ? match[2] : '';
  const isInt = target !== null && Number.isInteger(target);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, started]);

  useEffect(() => {
    if (!started || target === null) return;
    const startTs = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      const formatted = isInt ? Math.round(current).toLocaleString() : current.toFixed(1);
      setDisplay(formatted + suffix);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration, isInt, suffix]);

  if (target === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }
  return <span ref={ref} className={`mk-count ${className}`}>{display}</span>;
}
