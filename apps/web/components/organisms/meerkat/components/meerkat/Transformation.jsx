import React, { useState } from 'react';
import { TRANSFORM } from '../../mock';
import useReveal from '../../hooks/useReveal';

export default function Transformation() {
  const [idx, setIdx] = useState(TRANSFORM.length - 1);
  const t = TRANSFORM[idx];
  const head = useReveal();
  return (
    <section id="evolution" className="mk-section mk-band-evolution" >
      <div className="mk-container">
        <div ref={head} className="max-w-3xl mk-reveal">
          <div className="mk-tag mb-4">Interactive Transformation</div>
          <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>
            A <span className="mk-serif-italic" style={{color:'var(--mk-terracotta)'}}>25‑million‑year</span> journey to the Kalahari
          </h2>
          <p className="mk-lead mt-5">
            Click a stage below to trace the meerkat's lineage from a Miocene forest
            carnivoran to the desert sentinel we know today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-14 items-center">
          <div className="mk-image-frame">
            <div className="mk-image aspect-[4/3]">
              <img src={t.img} alt={t.title} />
            </div>
          </div>
          <div key={t.era} className="mk-fade-in">
            <div className="mk-tag">{t.era}</div>
            <h3 className="mk-h2 mt-3" style={{color:'var(--mk-brown)', fontSize:'clamp(28px,3.4vw,44px)'}}>{t.title}</h3>
            <p className="mk-lead mt-5">{t.body}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="mk-card p-5">
                <div className="mk-stat-label">{t.a}</div>
                <div className="font-semibold mt-1" style={{color:'var(--mk-brown)'}}>{t.aVal}</div>
              </div>
              <div className="mk-card p-5">
                <div className="mk-stat-label">{t.b}</div>
                <div className="font-semibold mt-1" style={{color:'var(--mk-brown)'}}>{t.bVal}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 relative">
          <div className="absolute left-0 right-0 top-1/2 h-[2px]" style={{background:'linear-gradient(90deg, rgba(185,94,42,0.15), rgba(185,94,42,0.7), rgba(185,94,42,0.15))'}}/>
          <div className="relative grid grid-cols-4 gap-4">
            {TRANSFORM.map((s, i) => (
              <button key={i} onClick={()=>setIdx(i)} className="flex flex-col items-center gap-3 py-4 group">
                <div className="h-4 w-4 rounded-full transition-all" style={{background: i===idx ? 'var(--mk-terracotta)' : '#fff', border:`2px solid var(--mk-terracotta)`, boxShadow: i===idx ? '0 0 0 8px rgba(185,94,42,0.15)' : 'none'}}/>
                <div className="text-xs font-semibold text-center transition-colors" style={{color: i===idx ? 'var(--mk-terracotta-dark)' : 'var(--mk-muted)'}}>{s.era}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
