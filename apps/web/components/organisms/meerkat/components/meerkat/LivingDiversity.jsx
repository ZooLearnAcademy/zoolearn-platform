import React from 'react';
import { IMAGES } from '../../mock';
import useReveal from '../../hooks/useReveal';

const SPECIES = [
  { name: 'Meerkat', latin: 'Suricata suricatta', tag: 'Least Concern', color:'#4a8c3f', img: IMAGES.sentinel, note:'Wide range across arid Southern Africa; stable populations under climate pressure.' },
  { name: 'Dwarf Mongoose', latin: 'Helogale parvula', tag: 'Least Concern', color:'#4a8c3f', img: IMAGES.faceClose, note:'Smallest African carnivore; forms cooperative packs like meerkats.' },
  { name: 'Banded Mongoose', latin: 'Mungos mungo', tag: 'Least Concern', color:'#4a8c3f', img: IMAGES.threeSlope, note:'Communal-breeding mongoose famous for synchronised birthing.' },
  { name: 'Liberian Mongoose', latin: 'Liberiictis kuhni', tag: 'Vulnerable', color:'#c98a1e', img: IMAGES.digging, note:'Rare West African forest specialist; fewer than 10,000 individuals.' },
];

export default function LivingDiversity() {
  const head = useReveal();
  const grid = useReveal();
  return (
    <section id="cousins" className="mk-section mk-band-cousins" >
      <div className="mk-container">
        <div ref={head} className="max-w-3xl mk-reveal">
          <div className="mk-tag mk-tag-emerald mb-4">Living Diversity</div>
          <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>
            The meerkat's closest <span className="mk-serif-italic" style={{color:'var(--mk-terracotta)'}}>living</span> cousins
          </h2>
          <p className="mk-lead mt-5">
            Genomic science places the meerkat inside the eusocial mongoose clade — a tight
            evolutionary family whose members all experiment, in their own way, with life in a
            group.
          </p>
        </div>
        <div ref={grid} className="mk-reveal-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {SPECIES.map((s, i) => (
            <div key={i} className="mk-card overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover" style={{transition:'transform 1.2s cubic-bezier(.2,.7,.2,1)'}} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.06)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'} />
              </div>
              <div className="p-5">
                <span className="mk-badge-status" style={{background:`${s.color}18`, color:s.color, border:`1px solid ${s.color}55`}}>{s.tag}</span>
                <h3 className="mk-h3 mt-3" style={{color:'var(--mk-brown)', fontSize:20}}>{s.name}</h3>
                <div className="italic text-sm" style={{color:'var(--mk-muted)'}}>{s.latin}</div>
                <p className="text-sm mt-3" style={{color:'var(--mk-brown-soft)'}}>{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
