import React from 'react';
import { CHRONO } from '../../mock';
import { Hourglass } from 'lucide-react';

const EPOCHS = [
  { icon:'🌲', span:'25 → 22 Mya', title:'Carnivorans to Herpestidae', took:'~3 million years' },
  { icon:'🌿', span:'22 → 18 Mya', title:'Herpestidae to Eusocial Clade', took:'~4 million years' },
  { icon:'🌵', span:'18 → 2.5 Mya', title:'Eusocial Clade to Suricata', took:'~15.5 million years' },
  { icon:'🦊', span:'2.5 Mya → Now', title:'Suricata suricatta era', took:'~2.5 million years' },
];

export default function Timeline() {
  return (
    <section id="chronology" className="mk-section mk-band-chrono" >
      <div className="mk-container">
        <div className="max-w-3xl">
          <div className="mk-tag mb-4">Complete Evolution Timeline</div>
          <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>Evolutionary Epochs</h2>
          <p className="mk-lead mt-5">The 22-million-year journey, broken into the four chapters that shaped the meerkat.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {EPOCHS.map((e, i) => (
            <div key={i} className="mk-card p-6">
              <div className="text-3xl" aria-hidden>{e.icon}</div>
              <div className="mk-stat-label mt-4">{e.span}</div>
              <h3 className="font-semibold mt-2" style={{color:'var(--mk-brown)'}}>{e.title}</h3>
              <div className="text-sm mt-2" style={{color:'var(--mk-muted)'}}>Took {e.took}</div>
            </div>
          ))}
          <div className="mk-card p-6 sm:col-span-2 lg:col-span-4" style={{background:'linear-gradient(180deg, #fdf1de, #f4f8ec)'}}>
            <div className="flex items-center gap-3">
              <Hourglass style={{color:'var(--mk-terracotta-dark)'}}/>
              <div className="font-semibold" style={{color:'var(--mk-brown)'}}>Total Evolution</div>
            </div>
            <div className="mk-stat-num mt-2">22 Million Years</div>
            <p className="mt-2" style={{color:'var(--mk-brown-soft)'}}>From the birth of the mongoose family to the sentinel standing watch this morning in the Kalahari.</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mk-h3" style={{color:'var(--mk-brown)'}}>Comprehensive Chronology</h3>
          <div className="mt-8 relative">
            {CHRONO.map((c, i) => (
              <div key={i} className="relative pl-10 pb-8">
                {i < CHRONO.length - 1 && <div className="mk-timeline-line"/>}
                <div className="mk-timeline-dot absolute left-0 top-1.5"/>
                <div className="mk-stat-label">{c.era}</div>
                <div className="font-semibold mt-1" style={{color:'var(--mk-brown)'}}>{c.title}</div>
                <p className="mt-1 text-sm" style={{color:'var(--mk-brown-soft)'}}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 mk-card p-6" style={{background:'linear-gradient(180deg, #fdf1de, #f4f8ec)'}}>
          <div className="font-semibold" style={{color:'var(--mk-brown)'}}>🦊 Unique Achievement</div>
          <p className="mt-2" style={{color:'var(--mk-brown-soft)'}}>Among mongooses, only the meerkat evolved the combination of upright sentinel vigilance, complex referential alarm calls, and cooperative pup teaching — a rare triple in the mammalian world.</p>
        </div>
      </div>
    </section>
  );
}
