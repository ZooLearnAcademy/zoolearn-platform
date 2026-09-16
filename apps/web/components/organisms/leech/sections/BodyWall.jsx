import React, { useState, useRef, useEffect } from 'react';
import './BodyWall.css';

const anatomyParts = [
  { id: 'bw-cuticle', name: 'Cuticle', description: 'A thin, non-cellular, protective outer covering that is periodically shed. It acts as the first line of defense against physical injury and pathogens.', y: 20, height: 15, patternId: 'bw-pattern-cuticle', color: '#475569' },
  { id: 'bw-epidermis', name: 'Epidermis', description: 'A single layer of living columnar cells that secretes the cuticle. It contains numerous gland cells that produce mucus to keep the skin moist.', y: 35, height: 40, patternId: 'bw-pattern-epidermis', color: '#ef4444' },
  { id: 'bw-dermis', name: 'Dermis', description: 'A thick layer of fibrous connective tissue. It houses blood capillaries, pigment cells (chromatophores), and sensory nerve endings.', y: 75, height: 45, patternId: 'bw-pattern-dermis', color: '#f97316' },
  { id: 'bw-muscular', name: 'Muscular Layer', description: 'Comprises powerful circular and longitudinal muscles. Their coordinated contractions enable the leech to perform its characteristic looping movement.', y: 120, height: 60, patternId: 'bw-pattern-muscular', color: '#b91c1c' },
  { id: 'bw-botryoidal', name: 'Botryoidal Tissue', description: 'A unique connective tissue filling the reduced coelom. It is highly vascularized and plays a vital role in excretion and iron storage.', y: 180, height: 70, patternId: 'bw-pattern-botryoidal', color: '#9333ea' }
];

const BodyWall = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [showAllLabels, setShowAllLabels] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activePartId = selectedPart || hoveredPart;
  const displayPart = anatomyParts.find(p => p.id === activePartId);

  const visibleParts = showAllLabels
    ? anatomyParts
    : (activePartId ? [anatomyParts.find(p => p.id === activePartId)] : []);

  useEffect(() => {
    if (selectedPart && window.innerWidth < 1024 && sidebarRef.current) {
      sidebarRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedPart]);

  const handlePartClick = (partId) => {
    setSelectedPart(prev => prev === partId ? null : partId);
  };

  return (
    <section className="leech-section-content">

      <div className="leech-section-box" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', minHeight: '600px' }}>

          {/* --- MAIN DIAGRAM AREA --- */}
          <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', borderRight: isDesktop ? '1px solid var(--leech-border)' : 'none' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--leech-primary)', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--leech-text-muted)' }}>Microscopic Analysis</span>
              </div>
              <h2 className="leech-section-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Integumentary System</h2>
              <p className="leech-section-text" style={{ fontSize: '0.9rem' }}>Interactive histological cross-section showing the protective body wall layers.</p>
            </div>

            <div style={{ background: 'var(--leech-bg-app)', border: '1px solid var(--leech-border)', borderRadius: '1rem', padding: '1rem', flex: 1, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--leech-primary)' }}>Cross-section View</span>
                <button
                  onClick={() => setShowAllLabels(!showAllLabels)}
                  style={{ background: 'white', border: '1px solid var(--leech-border)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  {showAllLabels ? 'Hide Labels' : 'View All Labels'}
                </button>
              </div>

              <div className="bw-svg-container">
                <svg viewBox="0 0 480 280">
                  <defs>
                    <marker id="bw-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#000000" />
                    </marker>

                    <pattern id="bw-pattern-cuticle" x="0" y="0" width="100" height="10" patternUnits="userSpaceOnUse">
                      <rect width="100" height="10" fill="#cbd5e1" />
                      <line x1="0" y1="5" x2="100" y2="5" stroke="#475569" strokeWidth="1.5" />
                    </pattern>

                    <pattern id="bw-pattern-epidermis" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse">
                      <rect width="20" height="40" fill="#fecaca" stroke="#ef4444" strokeWidth="0.5" />
                      <circle cx="10" cy="20" r="4" fill="#b91c1c" fillOpacity="0.6" />
                    </pattern>

                    <pattern id="bw-pattern-dermis" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="30" height="30" fill="#fed7aa" />
                      <path d="M0 10 Q 15 0, 30 10 M0 20 Q 15 30, 30 20" fill="none" stroke="#ea580c" strokeWidth="1" />
                    </pattern>

                    <pattern id="bw-pattern-muscular" x="0" y="0" width="100" height="12" patternUnits="userSpaceOnUse">
                      <rect width="100" height="12" fill="#fca5a5" />
                      <line x1="0" y1="4" x2="100" y2="4" stroke="#991b1b" strokeWidth="1.5" strokeOpacity="0.4" />
                    </pattern>

                    <pattern id="bw-pattern-botryoidal" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill="#d8b4fe" />
                      <circle cx="10" cy="10" r="6" fill="#6b21a8" fillOpacity="0.3" />
                    </pattern>
                  </defs>

                  {anatomyParts.map((part) => (
                    <rect
                      key={part.id}
                      x="20"
                      y={part.y}
                      width="300"
                      height={part.height}
                      rx="2"
                      fill={`url(#${part.patternId})`}
                      style={{ cursor: 'pointer', transition: 'opacity 0.2s', opacity: selectedPart && selectedPart !== part.id ? 0.4 : 1, stroke: selectedPart === part.id ? 'var(--leech-primary)' : 'none', strokeWidth: selectedPart === part.id ? '3px' : '0' }}
                      onClick={() => handlePartClick(part.id)}
                      onMouseEnter={() => setHoveredPart(part.id)}
                      onMouseLeave={() => setHoveredPart(null)}
                    />
                  ))}

                  {visibleParts.map(part => (
                    <g key={part.id}>
                      <line x1="325" y1={part.y + part.height / 2} x2="365" y2={part.y + part.height / 2} stroke="#000000" strokeWidth="1.5" markerEnd="url(#bw-arrowhead)" />
                      <text x="375" y={part.y + part.height / 2} style={{ fontSize: '11px', fontWeight: '800', fill: '#000000', textTransform: 'uppercase', pointerEvents: 'none' }}>{part.name}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* --- SIDEBAR AREA --- */}
          <div ref={sidebarRef} style={{ width: isDesktop ? '35%' : '100%', background: '#f8fafc', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 className="leech-section-title" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--leech-text-muted)' }}>Layer Details</h3>

            {displayPart ? (
              <div style={{ marginTop: '1rem', animation: 'leechFadeUp 0.4s ease-out' }}>
                <div style={{ width: '40px', height: '6px', borderRadius: '4px', backgroundColor: displayPart.color, marginBottom: '1rem' }}></div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--leech-primary-dark)', marginBottom: '0.5rem' }}>{displayPart.name}</h4>
                <p className="leech-section-text" style={{ fontSize: '0.95rem' }}>{displayPart.description}</p>
              </div>
            ) : (
              <div style={{ marginTop: '2rem', padding: '2rem', border: '2px dashed var(--leech-border)', borderRadius: '1rem', textAlign: 'center', color: 'var(--leech-text-muted)' }}>
                <p style={{ fontSize: '0.9rem' }}>Tap a layer to view precise structural data.</p>
              </div>
            )}

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--leech-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--leech-text-muted)' }}>
                <span>Specimen</span>
                <strong style={{ color: 'var(--leech-text-main)' }}>Indian Leech</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--leech-text-muted)', marginTop: '4px' }}>
                <span>View</span>
                <strong style={{ color: 'var(--leech-text-main)' }}>Transverse Section</strong>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default BodyWall;