import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#why', label: 'Why the Day' },
  { href: '#meet', label: 'Meet' },
  { href: '#marvels', label: 'Adaptations' },
  { href: '#species', label: 'Subspecies' },
  { href: '#evolution', label: 'Evolution' },
  { href: '#taxonomy', label: 'Taxonomy' },
  { href: '#engage', label: 'Discuss' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`mk-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="mk-container flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg" style={{background:'var(--mk-terracotta)', color:'#fff', fontFamily:'Fraunces', fontWeight:700}}>Z</span>
          <span style={{fontFamily:'Fraunces', fontWeight:700, fontSize:20, color:'var(--mk-brown)'}}>ZooLearn</span>
          <span className="ml-2 text-xs uppercase tracking-widest" style={{color:'var(--mk-muted)'}}>Blog</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium hover:opacity-70 transition" style={{color:'var(--mk-brown-soft)'}}>{l.label}</a>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t" style={{borderColor:'rgba(139,69,19,0.12)'}}>
          <div className="mk-container flex flex-col py-3 gap-3">
            {LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="text-sm font-medium py-1" style={{color:'var(--mk-brown-soft)'}}>{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
