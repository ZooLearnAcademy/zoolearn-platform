import React from 'react';
import { WHY_FORCES, IMAGES } from '../../mock';
import { Sprout, Bird, Home, Dna, GraduationCap } from 'lucide-react';
import useReveal from '../../hooks/useReveal';

const ICONS = [Sprout, Bird, Home, Dna, GraduationCap];

export default function SocialScience() {
  const head = useReveal();
  const cards = useReveal();
  return (
    <section id="social" className="mk-section mk-band-social">
      <span className="mk-blob mk-blob-lavender" style={{width:280, height:280, top:'5%', left:'-6%'}} />
      <span className="mk-blob mk-blob-mint" style={{width:200, height:200, bottom:'8%', right:'-4%', animationDelay:'-10s'}} />
      <div className="mk-container">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div ref={head} className="mk-reveal">
            <div className="mk-tag mk-tag-emerald mb-4">The Science of Sociality</div>
            <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>
              Why did meerkats become <span className="mk-serif-italic" style={{color:'var(--mk-terracotta)'}}>so</span> social?
            </h2>
            <p className="mk-lead mt-5">
              Most carnivores are loners. Yet meerkats crossed a threshold that only a handful
              of mammals — including humans and naked mole‑rats — have ever crossed: true
              cooperative breeding. Five interlocking forces made it possible.
            </p>
          </div>
          <div className="mk-image-frame">
            <div className="mk-image aspect-[4/3]">
              <img src={IMAGES.gathering} alt="A gathering of meerkats"/>
            </div>
          </div>
        </div>

        <div ref={cards} className="mk-reveal-stagger grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-16">
          {WHY_FORCES.map((f, i) => {
            const Icon = ICONS[i] || Sprout;
            return (
              <div key={i} className="mk-card p-6">
                <div className="mk-marvel-icon mb-3" style={{width:44,height:44}}><Icon size={20}/></div>
                <h3 className="font-semibold text-lg" style={{color:'var(--mk-brown)'}}>{f.title}</h3>
                <p className="mt-2 text-sm" style={{color:'var(--mk-brown-soft)'}}>{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
