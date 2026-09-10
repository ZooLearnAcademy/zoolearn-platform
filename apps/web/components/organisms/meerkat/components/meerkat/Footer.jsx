import React from 'react';

export default function Footer() {
  return (
    <footer className="pt-16 pb-10" style={{background:'#2b1a0d', color:'#f6e9cf'}}>
      <div className="mk-container">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg" style={{background:'var(--mk-terracotta)', color:'#fff', fontFamily:'Fraunces', fontWeight:700}}>Z</span>
              <span style={{fontFamily:'Fraunces', fontWeight:700, fontSize:22}}>ZooLearn</span>
            </div>
            <p className="mt-4 text-sm opacity-80 max-w-sm">A learning studio celebrating the world’s wild neighbours, one species at a time. This edition: <strong>World Meerkat Day, July 3, 2026</strong>.</p>
          </div>
          <div>
            <div className="mk-stat-label" style={{color:'var(--mk-gold)'}}>Explore</div>
            <ul className="mt-3 space-y-2 text-sm opacity-90">
              <li><a href="#why" className="hover:opacity-70">Why the Day</a></li>
              <li><a href="#marvels" className="hover:opacity-70">Biological marvels</a></li>
              <li><a href="#evolution" className="hover:opacity-70">Evolutionary journey</a></li>
              <li><a href="#engage" className="hover:opacity-70">Join the discussion</a></li>
            </ul>
          </div>
          <div>
            <div className="mk-stat-label" style={{color:'var(--mk-gold)'}}>Credits</div>
            <p className="mt-3 text-sm opacity-80">Content synthesised from IUCN, Kalahari Meerkat Project and peer-reviewed Herpestidae phylogenetics (2020–2025). Photography via Unsplash.</p>
          </div>
        </div>
        <div className="mt-10 pt-6 flex flex-wrap items-center justify-between text-xs opacity-70" style={{borderTop:'1px solid rgba(255,255,255,0.1)'}}>
          <div>© {new Date().getFullYear()} ZooLearn. All rights reserved.</div>
          <div>Built for World Meerkat Day · July 3, 2026</div>
        </div>
      </div>
    </footer>
  );
}
