import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, MapPin } from 'lucide-react';
import { IMAGES } from '../../mock';
import CountUp from './CountUp';

export default function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  // Cursor-follow spotlight + subtle image parallax
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--sx', `${x}%`);
      el.style.setProperty('--sy', `${y}%`);
      if (imageRef.current) {
        const dx = (e.clientX / window.innerWidth - 0.5) * 14;
        const dy = (e.clientY / window.innerHeight - 0.5) * 14;
        imageRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="mk-hero-bg mk-grain mk-noise mk-hero-spotlight relative overflow-hidden"
    >
      <div className="mk-orb mk-orb-1" />
      <div className="mk-orb mk-orb-2" />
      <span className="mk-blob mk-blob-peach" style={{ width: 180, height: 180, top: '15%', right: '8%', opacity: 0.35 }} />
      <span className="mk-blob mk-blob-mint" style={{ width: 120, height: 120, bottom: '12%', left: '6%', opacity: 0.30, animationDelay: '-6s' }} />

      {/* Floating sparkle particles */}
      <div className="mk-hero-sparks" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="mk-spark" style={{
            left: `${(i * 7 + 4) % 100}%`,
            top: `${(i * 13 + 8) % 90}%`,
            animationDelay: `${(i % 7) * 0.6}s`,
            animationDuration: `${4 + (i % 4)}s`,
          }} />
        ))}
      </div>

      <div className="mk-container pt-16 pb-28 md:pt-24 md:pb-36 relative">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="mk-fade-in">
            <div className="mk-tag mb-7"><Sparkles size={14} /> July 3, 2026 · World Meerkat Day</div>

            <h1 className="mk-hero-title">
              <span className="mk-hero-word" style={{ animationDelay: '0.1s' }}>World</span>
              <span className="mk-hero-word mk-gradient-text mk-hero-glow" style={{ animationDelay: '0.35s' }}>
                Meerkat
              </span>
              <span className="mk-hero-word mk-serif-italic" style={{ animationDelay: '0.55s', fontWeight: 500 }}>
                Day.
              </span>
            </h1>

            <p className="mk-lead mt-7 max-w-xl mk-fade-up" style={{ animationDelay: '0.7s' }}>
              Celebrating the desert&apos;s smallest sentinel — a sun-worshipping,
              scorpion-eating, cooperatively raised carnivore whose 22&#8209;million&#8209;year
              journey rewrote what it means to be social.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 mk-fade-up" style={{ animationDelay: '0.85s' }}>
              <a href="#why" className="mk-btn-primary inline-flex items-center gap-2 mk-btn-bounce">
                Begin the story <ArrowDown size={16} className="mk-arrow-bob" />
              </a>
              <a href="#engage" className="mk-btn-ghost">Join the conversation</a>
            </div>

            <div className="mt-10 flex items-center gap-3 mk-fade-up" style={{ animationDelay: '0.95s' }}>
              <MapPin size={14} style={{ color: 'var(--mk-terracotta-dark)' }} />
              <span className="mk-eyebrow">from the Kalahari, with love</span>
              <span className="mk-caret" aria-hidden />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 max-w-md mk-fade-up" style={{ animationDelay: '1.05s' }}>
              <div className="mk-hero-stat"><div className="mk-stat-num"><CountUp value="30 cm" /></div><div className="mk-stat-label">Height</div></div>
              <div className="mk-hero-stat"><div className="mk-stat-num"><CountUp value="730 g" /></div><div className="mk-stat-label">Weight</div></div>
              <div className="mk-hero-stat"><div className="mk-stat-num"><CountUp value="50" /></div><div className="mk-stat-label">Mob size</div></div>
              <div className="mk-hero-stat"><div className="mk-stat-num"><CountUp value="22 M" /></div><div className="mk-stat-label">Evolution</div></div>
            </div>
          </div>

          <div className="w-full relative">
            <div ref={imageRef} className="mk-image-frame mk-float mx-auto" style={{ maxWidth: '440px', transition: 'transform .6s cubic-bezier(.2,.7,.2,1)' }}>
              <div className="mk-image mk-kenburns aspect-[4/5]">
                <img src={IMAGES.hero} alt="Meerkat sentinel standing tall" loading="eager" />
              </div>
            </div>

            {/* Rotating gold badge */}
            <div className="mk-hero-badge" aria-hidden>
              <svg viewBox="0 0 200 200" width="120" height="120">
                <defs>
                  <path id="mkBadgePath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                </defs>
                <text fontSize="14" letterSpacing="4" fontFamily="Fraunces, serif" fill="#8f451c" fontWeight="700">
                  <textPath href="#mkBadgePath" startOffset="0">WORLD MEERKAT DAY · JULY 3, 2026 · </textPath>
                </text>
              </svg>
              <div className="mk-hero-badge-core"><Sparkles size={20} /></div>
            </div>

            <div className="mk-sentinel-card mk-pulse">
              <div className="mk-stat-label">Sentinel Duty</div>
              <div className="mt-1 text-sm" style={{ color: 'var(--mk-brown)' }}>
                Rotating watch-shifts keep the mob safe from martial eagles and jackals.
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <a href="#why" className="mk-scroll-cue" aria-label="Scroll to next section">
          <span className="mk-scroll-cue-line" />
          <span className="mk-scroll-cue-text">Scroll</span>
        </a>
      </div>
    </section>
  );
}
