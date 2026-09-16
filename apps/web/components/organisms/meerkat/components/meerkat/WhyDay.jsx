import React from 'react';
import { Calendar, HelpCircle, Target, AlertTriangle } from 'lucide-react';
import useReveal from '../../hooks/useReveal';

export default function WhyDay() {
  const head = useReveal();
  const cards = useReveal();
  const list = useReveal();
  return (
    <section id="why" className="mk-section mk-band-why">
      <span className="mk-blob mk-blob-peach" style={{width:260, height:260, top:'8%', right:'-4%'}} />
      <span className="mk-blob mk-blob-lavender" style={{width:200, height:200, bottom:'12%', left:'-3%', animationDelay:'-8s'}} />
      <div className="mk-container">
        <div ref={head} className="max-w-3xl mk-reveal">
          <div className="mk-tag mb-4">Why World Meerkat Day?</div>
          <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>
            July 3 — a day for the <span className="mk-serif-italic" style={{color:'var(--mk-terracotta)'}}>desert's</span> watchtower
          </h2>
          <p className="mk-lead mt-5">
            World Meerkat Day is observed on <strong>July 3rd</strong>, in the heart of the Southern African winter
            — the exact season when meerkat mobs huddle for warmth at dawn and their iconic
            sentinel posture is at its most photogenic. The day was created to celebrate the
            small carnivores that keep the Kalahari ecosystem in balance, and to raise support
            for conservation of their fragile arid habitat.
          </p>
        </div>

        <div ref={cards} className="mk-reveal-stagger grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Calendar, title: 'When?', body: 'July 3rd every year — mid-winter in the Southern Hemisphere, when meerkats bask most visibly.' },
            { icon: HelpCircle, title: 'Why this date?', body: 'A poetic pairing: the day of maximum sun-basking behaviour honours the sun-loving sentinel.' },
            { icon: Target, title: 'Purpose', body: 'Raise awareness of arid-land conservation, kin cooperation and the mongoose family.' },
          ].map((c, i) => (
            <div key={i} className="mk-card mk-card-lux p-8">
              <div className="mk-marvel-icon"><c.icon size={22}/></div>
              <h3 className="mk-h3 mt-5" style={{color:'var(--mk-brown)'}}>{c.title}</h3>
              <p className="mt-3" style={{color:'var(--mk-brown-soft)'}}>{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="mk-pullquote max-w-3xl">
            Weighing less than a kilogram, meerkats punch far above their weight ecologically —
            keystone insectivores, prolific engineers of the underground world, and an
            irreplaceable link in the arid food-web.
          </div>
        </div>

        <div ref={list} className="mt-14 max-w-4xl mk-reveal">
          <h3 className="mk-h3" style={{color:'var(--mk-brown)'}}>Why meerkats matter to ecosystems</h3>
          <ul className="mt-6 space-y-4">
            {[
              ['Pest control', 'A single mob can consume tens of thousands of scorpions, beetles and locusts per year — regulating invertebrate populations across their territory.'],
              ['Soil engineers', 'Meerkat burrows aerate compacted desert soils and create refuges shared with ground squirrels, yellow mongooses, snakes and lizards.'],
              ['Living warning system', 'Their layered alarm calls benefit dozens of savanna species that eavesdrop on meerkat sentinels for free predator information.'],
              ['Nutrient recycling', 'By dispersing seeds and depositing nutrient-rich dung across large ranges, meerkats subsidise plant regrowth in nutrient-poor sands.'],
              ['Indicator species', 'Their long-term study populations in the Kalahari are one of the worlds most trusted signals of arid-climate change impacts.'],
            ].map(([t, b], i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full flex-shrink-0" style={{background:'var(--mk-terracotta)'}}/>
                <span><strong style={{color:'var(--mk-brown)'}}>{t}:</strong> <span style={{color:'var(--mk-brown-soft)'}}>{b}</span></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 mk-card p-6 md:p-8 flex gap-4 items-start" style={{background:'linear-gradient(180deg, #fdf1de, #f4f8ec)'}}>
          <AlertTriangle className="flex-shrink-0 mt-1" style={{color:'var(--mk-terracotta-dark)'}} />
          <div>
            <div className="font-semibold" style={{color:'var(--mk-brown)'}}>Least Concern — but not untouched</div>
            <p className="mt-2" style={{color:'var(--mk-brown-soft)'}}>
              The IUCN lists the meerkat as <em>Least Concern</em>. Yet a 2025 genomic study
              revealed rising evolutionary stress from a species-specific tuberculosis and
              worsening Kalahari droughts — a reminder that stable numbers can hide silent
              declines in genetic diversity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
