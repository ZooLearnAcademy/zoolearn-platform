import React from 'react';
import useReveal from '../../hooks/useReveal';

const LINES = [
  'Suricata suricatta',
  'Kalahari sentinel',
  '22 million years',
  'Eusocial mongoose',
  'Scorpion whisperer',
  'Solar\u2011panel belly',
  'World Meerkat Day \u00B7 July 3, 2026',
];

export default function Marquee() {
  const ref = useReveal();
  const items = [...LINES, ...LINES];
  return (
    <div ref={ref} className="mk-marquee mk-reveal">
      <div className="mk-marquee-track">
        {items.map((t, i) => (
          <span key={i} className="mk-marquee-item">{t}</span>
        ))}
      </div>
    </div>
  );
}
