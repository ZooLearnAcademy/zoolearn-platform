import React, { useState } from 'react';
import { SUBSPECIES } from '../../mock';
import useReveal from '../../hooks/useReveal';

export default function CoatSpecies() {
  const [active, setActive] = useState(SUBSPECIES[0].id);
  const current = SUBSPECIES.find(s => s.id === active);
  const head = useReveal();
  const grid = useReveal();
  return (
    <section id="species" className="mk-section mk-band-species" >
      <div className="mk-container">
        <div ref={head} className="max-w-3xl mk-reveal">
          <div className="mk-tag mb-4">Subspecies Guide</div>
          <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>
            Three faces of <span className="mk-serif-italic" style={{color:'var(--mk-terracotta)'}}>Suricata suricatta</span>
          </h2>
          <p className="mk-lead mt-5">
            The meerkat is the only living species of its genus, but three subspecies are
            recognised across Southern Africa — distinguished by coat shade, band contrast
            and geographic isolation.
          </p>
        </div>

        <div ref={grid} className="mk-reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {SUBSPECIES.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`mk-card mk-species-card overflow-hidden text-left ${active===s.id ? 'active' : ''}`}
              style={{borderColor: active===s.id ? s.color : undefined}}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.common} className="w-full h-full object-cover" style={{transition:'transform 1s cubic-bezier(.2,.7,.2,1)'}} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'} />
              </div>
              <div className="p-5">
                <div className="mk-stat-label" style={{color:s.color}}>{s.year}</div>
                <div className="font-semibold mt-1" style={{color:'var(--mk-brown)'}}>{s.common}</div>
                <div className="text-xs mt-1 italic" style={{color:'var(--mk-muted)'}}>{s.name}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-14 items-start">
          <div className="mk-image-frame">
            <div className="mk-image aspect-[4/3]">
              <img src={current.img} alt={current.common} />
            </div>
          </div>
          <div>
            <div className="mk-tag mb-3" style={{background:`${current.color}22`, borderColor:`${current.color}55`, color:current.color}}>{current.year}</div>
            <h3 className="mk-h2" style={{color:'var(--mk-brown)', fontSize:'clamp(28px,3.4vw,42px)'}}>{current.common}</h3>
            <div className="italic mt-1" style={{color:'var(--mk-muted)'}}>{current.name}</div>
            <p className="mt-5" style={{color:'var(--mk-brown-soft)'}}><strong>Range: </strong>{current.range}</p>
            <ul className="mt-4 space-y-3">
              {current.traits.map((t, i) => (
                <li key={i} className="flex gap-3" style={{color:'var(--mk-brown-soft)'}}>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{background:current.color}}/>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
