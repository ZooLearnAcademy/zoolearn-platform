import React from 'react';

const NODES = [
  { level: 0, label: 'Order: Carnivora' },
  { level: 1, label: 'Suborder: Feliformia' },
  { level: 2, label: 'Family: Herpestidae' },
  { level: 3, label: 'Genus: Suricata' },
];

const SUB = [
  { name: 'S. s. suricatta', tag: 'Cape / Southern', color: '#c68449' },
  { name: 'S. s. majoriae', tag: 'Namibian', color: '#b06a34' },
  { name: 'S. s. iona', tag: 'Angolan', color: '#8b4513' },
];

export default function Taxonomy() {
  return (
    <section id="taxonomy" className="mk-section mk-band-taxonomy">
      <div className="mk-container">
        <div className="max-w-3xl">
          <div className="mk-tag mb-4">Taxonomy — 2025 View</div>
          <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>Where the Meerkat Sits on the Tree of Life</h2>
          <p className="mk-lead mt-5">
            Unlike the giraffe, the meerkat’s taxonomy has remained refreshingly stable.
            Genomic work in 2024–25 has instead illuminated its <em>phylogenetic position</em>:
            a sister clade to the genus <em>Herpestes</em>, nested inside the eusocial mongoose
            group.
          </p>
        </div>

        <div className="mt-12 mk-card p-8">
          <div className="flex flex-col items-center gap-5">
            {NODES.map((n, i) => (
              <React.Fragment key={i}>
                <div className="px-6 py-3 rounded-xl font-semibold text-sm" style={{background: i===NODES.length-1 ? 'var(--mk-terracotta)' : 'rgba(212,160,74,0.18)', color: i===NODES.length-1 ? '#fff' : 'var(--mk-brown)', border:'1px solid rgba(185,94,42,0.25)'}}>
                  {n.label}
                </div>
                {i < NODES.length-1 && <div className="h-6 w-[2px]" style={{background:'rgba(185,94,42,0.35)'}}/>}
              </React.Fragment>
            ))}
            <div className="h-6 w-[2px]" style={{background:'rgba(185,94,42,0.35)'}}/>
            <div className="px-6 py-3 rounded-xl font-semibold text-sm bg-white" style={{color:'var(--mk-brown)', border:'1.5px solid var(--mk-terracotta)'}}>Species: <em>Suricata suricatta</em></div>
            <div className="h-6 w-[2px]" style={{background:'rgba(185,94,42,0.35)'}}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              {SUB.map((s, i) => (
                <div key={i} className="rounded-xl p-4 text-center" style={{background:`${s.color}18`, border:`1px solid ${s.color}44`}}>
                  <div className="mk-stat-label" style={{color:s.color}}>{s.tag}</div>
                  <div className="font-semibold mt-1 italic" style={{color:'var(--mk-brown)'}}>{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            ['1 species', 'The genus Suricata contains only one living species today.'],
            ['3 subspecies', 'Southern, Namibian and Angolan forms recognised on morphology and range.'],
            ['4 close cousins', 'Kusimanse, dwarf, banded and Liberian mongooses share the eusocial clade.'],
          ].map(([t, b], i) => (
            <div key={i} className="mk-card p-6">
              <div className="mk-stat-num">{t}</div>
              <p className="mt-2 text-sm" style={{color:'var(--mk-brown-soft)'}}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
