import React, { useEffect, useRef } from 'react';

export default function Aurora() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div ref={ref} className="mk-aurora" aria-hidden>
      <span className="mk-aurora-blob mk-aurora-1" />
      <span className="mk-aurora-blob mk-aurora-2" />
      <span className="mk-aurora-blob mk-aurora-3" />
      <span className="mk-aurora-blob mk-aurora-4" />
      <span className="mk-aurora-blob mk-aurora-5" />
      <div className="mk-aurora-grain" />
    </div>
  );
}
