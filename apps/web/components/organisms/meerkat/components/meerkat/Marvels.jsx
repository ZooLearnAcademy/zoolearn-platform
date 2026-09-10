import React from 'react';
import { Sun, Eye, Bug, Megaphone, Pickaxe, Users } from 'lucide-react';
import useReveal from '../../hooks/useReveal';

const MARVELS = [
  { Icon: Sun, title: 'Solar-Panel Belly', stat: '~35°C tolerance',
    bullets: [
      'Sparse fur over jet-black skin on abdomen',
      'Acts as a natural solar panel at dawn',
      'Warms the body after chilly desert nights',
      'Enables early foraging before predators wake',
    ] },
  { Icon: Eye, title: 'Third Eyelid', stat: 'Nictitating membrane',
    bullets: [
      'Transparent sand-shield that blinks sideways',
      'Protects eyes while digging at high speed',
      'Dark eye-rings reduce glare like sunglasses',
      'Sharp long-distance vision spots eagles 300m away',
    ] },
  { Icon: Bug, title: 'Venom Immunity', stat: 'Scorpion-resistant',
    bullets: [
      'Partial immunity to Parabuthus scorpion venom',
      'Pups are taught how to disarm live scorpions',
      'A rare example of taught predation in mammals',
      'Also eats snakes, spiders and centipedes',
    ] },
  { Icon: Megaphone, title: 'Sentinel Language', stat: '30+ distinct calls',
    bullets: [
      'Different calls for aerial vs. terrestrial threats',
      'Encodes urgency AND type of predator',
      'One of the most complex vocal systems in mammals',
      'Sentinels rotate on a voluntary shift roster',
    ] },
  { Icon: Pickaxe, title: 'Master Diggers', stat: '2 cm curved claws',
    bullets: [
      'Can excavate their own body weight in seconds',
      'Burrow networks reach 5 m deep, 15+ entrances',
      'Multiple chambers for sleep, nursery and toilet',
      'Shared with mongooses and ground squirrels',
    ] },
  { Icon: Users, title: 'Eusocial Mob', stat: '20 – 50 members',
    bullets: [
      'Cooperative breeding: helpers raise the alphas pups',
      'Babysitters skip meals to guard the nursery',
      'One of only ~15 truly eusocial mammals',
      'Teachers actively train pups — rare in the wild',
    ] },
];

export default function Marvels() {
  const head = useReveal();
  const grid = useReveal();
  return (
    <section id="marvels" className="mk-section mk-band-marvels">
      <span className="mk-blob mk-blob-mint" style={{width:220, height:220, top:'10%', right:'5%'}} />
      <span className="mk-blob mk-blob-butter" style={{width:180, height:180, bottom:'8%', left:'4%', animationDelay:'-4s'}} />
      <div className="mk-container">
        <div ref={head} className="max-w-3xl mk-reveal">
          <div className="mk-tag mb-4">Biological Marvels</div>
          <h2 className="mk-h2" style={{color:'var(--mk-brown)'}}>
            Six adaptations that <span className="mk-serif-italic" style={{color:'var(--mk-terracotta)'}}>rewrote</span> the rulebook
          </h2>
          <p className="mk-lead mt-5">
            Evolution sculpted the meerkat into a compact, cooperative desert specialist.
            Hover any card to reveal how each adaptation works.
          </p>
        </div>
        <div ref={grid} className="mk-reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {MARVELS.map(({ Icon, ...m }, i) => (
            <div key={i} className="mk-card mk-tilt mk-marvel relative overflow-hidden aspect-[4/3]">
              <div className="front p-7 h-full flex flex-col justify-between">
                <div className="mk-marvel-icon"><Icon size={26} /></div>
                <div>
                  <h3 className="mk-h3" style={{color:'var(--mk-brown)'}}>{m.title}</h3>
                  <div className="mk-stat-label mt-2">{m.stat}</div>
                  <div className="mt-3 text-xs" style={{color:'var(--mk-muted)'}}>Hover to explore →</div>
                </div>
              </div>
              <div className="back">
                <div className="mk-marvel-icon" style={{width:44,height:44}}><Icon size={20}/></div>
                <h3 className="mk-h3 mt-3" style={{color:'var(--mk-brown)'}}>{m.title}</h3>
                <ul className="mt-3 space-y-2">
                  {m.bullets.map((b, j) => (
                    <li key={j} className="text-sm flex gap-2" style={{color:'var(--mk-brown-soft)'}}>
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{background:'var(--mk-terracotta)'}}/>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
