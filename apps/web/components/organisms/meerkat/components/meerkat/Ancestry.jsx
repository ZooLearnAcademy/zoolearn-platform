import React from 'react';
import { IMAGES } from '../../mock';
import useReveal from '../../hooks/useReveal';

const ANCESTORS = [
  { era:'25 – 22 Mya', name:'Feliform Carnivorans', img: IMAGES.kalahari, body:'The broad ancestral pool from which cat-like and mongoose-like carnivores diverge in Afro-Eurasia. From this base, Herpestidae will bud off.' },
  { era:'22 ± 3.6 Mya', name:'Early Herpestidae', img: IMAGES.digging, body:'The mongoose family emerges. Small, low-slung, insectivorous carnivores exploiting the new mosaic of forest and grassland habitats.' },
  { era:'~18 Mya', name:'Eusocial Mongoose Clade', img: IMAGES.groupHill, body:'A key split. One lineage retains solitary habits; the other trends toward group living — the deep root of the meerkats cooperative lifestyle.' },
  { era:'~15 Mya', name:'Genus Suricata', img: IMAGES.mobThree, body:'Suricata emerges as a distinct sister lineage to Herpestes. Body plan shifts toward upright vigilance and burrow specialisation.' },
  { era:'2.59 – 0.01 Mya', name:'Fossil Meerkats', img: IMAGES.familyLarge, body:'Identifiable Suricata suricatta fossils appear across South African cave sites. The modern sentinel has essentially arrived.' },
  { era:'Today', name:'Suricata suricatta', img: IMAGES.sentinel, body:'A single living species; three subspecies; one of the most closely studied mammals in behavioural biology thanks to decades of Kalahari fieldwork.' },
];

function Row({ a, i }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`mk-reveal grid md:grid-cols-2 gap-10 items-center ${i%2? 'md:[direction:rtl]':''}`}>
      <div className="mk-image-frame md:[direction:ltr]">
        <div className="mk-image aspect-[4/3]">
          <img src={a.img} alt={a.name}/>
        </div>
      </div>
      <div className="md:[direction:ltr]">
        <div className="mk-tag">{a.era}</div>
        <h3 className="mk-h3 mt-3" style={{color:'var(--mk-brown)'}}>{a.name}</h3>
        <p className="mk-lead mt-3">{a.body}</p>
      </div>
    </div>
  );
}

export default function Ancestry() {
  const head = useReveal();
  return (
    <section id="ancestry" className="mk-section mk-band-ancestry">
      <span className="mk-blob mk-blob-rose" style={{width:240, height:240, top:'12%', right:'-5%'}} />
      <span className="mk-blob mk-blob-sky" style={{width:200, height:200, bottom:'10%', left:'-4%', animationDelay:'-6s'}} />
      <div className="mk-container">
        <div ref={head} className="max-w-3xl mk-reveal">
          <div className="mk-tag mb-4">The 22‑Million‑Year Ancestry</div>
          <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>
            Not a straight line — a <span className="mk-serif-italic" style={{color:'var(--mk-terracotta)'}}>branching</span> story
          </h2>
          <p className="mk-lead mt-5">
            The evolutionary path from a Miocene carnivoran to a Kalahari sentinel is not a
            neat ladder. It is a branching web of environmental change, competing lineages
            and evolutionary dead‑ends. These are the six chapters that matter most.
          </p>
        </div>
        <div className="mt-16 grid gap-14">
          {ANCESTORS.map((a, i) => <Row key={i} a={a} i={i} />)}
        </div>
      </div>
    </section>
  );
}
