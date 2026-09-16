import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'top', label: 'World Meerkat Day' },
  { id: 'why', label: 'Why the Day' },
  { id: 'meet', label: 'Meet the Meerkat' },
  { id: 'marvels', label: 'Biological Marvels' },
  { id: 'species', label: 'Subspecies' },
  { id: 'social', label: 'Science of Sociality' },
  { id: 'evolution', label: 'Transformation' },
  { id: 'taxonomy', label: 'Taxonomy' },
  { id: 'cousins', label: 'Living Cousins' },
  { id: 'ancestry', label: 'Ancestry' },
  { id: 'chronology', label: 'Chronology' },
  { id: 'engage', label: 'Discuss' },
];

export default function LeftNav() {
  const [active, setActive] = useState('top');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);

      // find active section — the one whose top is closest above viewport middle
      const middle = window.scrollY + window.innerHeight * 0.35;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.offsetTop <= middle) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="mk-leftnav" aria-label="Reading progress">
      <div className="mk-leftnav-inner">
        <div className="mk-leftnav-eyebrow">On this page</div>
        <div className="mk-leftnav-track">
          <div className="mk-leftnav-track-fill" style={{ height: `${progress}%` }} />
          <ul className="mk-leftnav-list">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => jump(s.id)}
                  className={`mk-leftnav-item ${active === s.id ? 'is-active' : ''}`}
                  aria-current={active === s.id ? 'true' : undefined}
                >
                  <span className="mk-leftnav-dot" />
                  <span className="mk-leftnav-label">
                    <span className="mk-leftnav-index">{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mk-leftnav-progress-text">
          <span className="mk-leftnav-index">{Math.round(progress)}%</span>
          <span>read</span>
        </div>
      </div>
    </aside>
  );
}
