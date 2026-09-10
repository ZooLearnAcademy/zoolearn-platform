import React from 'react';
import { IMAGES } from '../../mock';
import useReveal from '../../hooks/useReveal';
import CountUp from './CountUp';

export default function MeetMeerkat() {
  const left = useReveal();
  const right = useReveal();
  const stats = useReveal();
  return (
    <section id="meet" className="mk-section mk-band-meet" >
      <div className="mk-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={left} className="mk-reveal mk-image-frame">
            <div className="mk-image aspect-[4/5]">
              <img src={IMAGES.portrait} alt="Meerkat portrait" />
            </div>
          </div>
          <div ref={right} className="mk-reveal">
            <div className="mk-tag mb-4">Meet the Meerkat</div>
            <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>
              The <span className="mk-serif-italic" style={{color:'var(--mk-terracotta)'}}>22‑million‑year</span> sentinel
            </h2>
            <p className="mk-lead mt-5">
              For most of the 20th century, meerkats were treated as a footnote in the mongoose
              family — charming, but not particularly instructive. Then long‑term field science
              from the Kalahari began to reveal something extraordinary: an animal that had
              solved cooperation, teaching and specialised predation on a scale rivalled only by
              a handful of species on Earth.
            </p>
            <p className="mk-lead mt-4">
              Today, <strong>Suricata suricatta</strong> is recognised as the single living
              species in its genus, subdivided into <strong>three subspecies</strong> spread
              across Southern Africa. Behind its cartoon‑friendly face sits a lineage that
              stretches back <strong>22 million years</strong> to the birth of the mongoose
              family itself.
            </p>
          </div>
        </div>

        <div ref={stats} className="mk-reveal-stagger grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-20">
          {[
            ['30 cm', 'Body length'],
            ['25 cm', 'Tail length'],
            ['730 g', 'Adult weight'],
            ['12 yr', 'Wild lifespan'],
            ['50', 'Max mob size'],
            ['22 M', 'Years of evolution'],
          ].map(([v, l], i) => (
            <div key={i} className="mk-card mk-tilt p-6 text-center">
              <div className="mk-stat-num"><CountUp value={v} /></div>
              <div className="mk-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
