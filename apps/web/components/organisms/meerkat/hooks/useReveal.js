import { useEffect, useRef } from 'react';

export default function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [options.threshold, options.rootMargin]);
  return ref;
}
