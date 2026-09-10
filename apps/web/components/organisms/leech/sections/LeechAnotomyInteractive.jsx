import React, { useState } from "react";
import "./LeechAnotomyInteractive.css";
import BodyDivisions from "./BodyDivisions";

// Image URL
const LEECH_IMAGE_URL =
  "https://res.cloudinary.com/duibfmcw1/image/upload/v1768818886/Screenshot_2026-01-19_155027_hmjpry.png";

// Generate 33 segments
const segmentDefs = Array.from({ length: 33 }, (_, i) => {
  const top = (i / 33) * 100;
  const height = 100 / 33;
  return { id: i + 1, top, height, label: `Segment ${i + 1}` };
});

// Anatomy Data
const regionInfo = {
  "1-5": {
    title: "Anterior Sucker & Cephalic Region",
    desc: "Segments 1–5 include the anterior sucker and eyes for attachment and light detection.",
    color: "#ec4899",
    icon: "👁️"
  },
  "6-8": {
    title: "Pre-clitellar Region",
    desc: "Segments 6–8 with pharynx present; transition zone.",
    color: "#ef4444",
    icon: "🔄"
  },
  "9-11": {
    title: "Clitellar Region",
    desc: "Glandular region involved in reproduction (cocoon formation).",
    color: "#f97316",
    icon: "🥚"
  },
  "12-22": {
    title: "Middle Body Region",
    desc: "Contains crop, intestine, nephridiopores. The longest body zone.",
    color: "#22c55e",
    icon: "🧬"
  },
  "23-26": {
    title: "Posterior Body Region",
    desc: "Includes rectum and anus in segments 23–26.",
    color: "#14b8a6",
    icon: "🍑"
  },
  "27-33": {
    title: "Posterior Sucker",
    desc: "Organ of attachment and locomotion.",
    color: "#6366f1",
    icon: "⚓"
  }
};

// Helper to find region key
function getRegion(segmentId) {
  if (!segmentId) return null;
  const id = parseInt(segmentId, 10);
  
  if (id <= 5) return "1-5";
  if (id <= 8) return "6-8";
  if (id <= 11) return "9-11";
  if (id <= 22) return "12-22";
  if (id <= 26) return "23-26";
  return "27-33";
}

export default function LeechAnatomyInteractive() {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Logic: Hover takes priority for quick preview, otherwise show Selected
  const activeId = hoveredSegment || selectedSegment;
  const activeRegionKey = getRegion(activeId);
  const info = activeRegionKey ? regionInfo[activeRegionKey] : null;

  // HANDLE CLICK TOGGLE
  const handleSegmentClick = (id) => {
    if (selectedSegment === id) {
      setSelectedSegment(null);
    } else {
      setSelectedSegment(id);
    }
  };

  return (
    <>
      <div className="leech-anatomy-container"  id="interactive-anatomy">
      <header className="leech-header-section">
        <div className="leech-badge">Interactive Anatomy</div>
        <h2>Ventral View (33 Segments)</h2>
        <p>
          <strong>Hover</strong> to preview. <strong>Click</strong> a segment to lock/unlock details.
        </p>
      </header>

      <div className="leech-layout">
        
        {/* Left Side: Ruler & Image */}
        <div className="leech-visual-container">
          
          {/* Indexing Ruler */}
          <div className="leech-ruler-col">
            {segmentDefs.map((seg) => (
              <div 
                key={`ruler-${seg.id}`} 
                className={`leech-ruler-mark ${activeId === seg.id ? "leech-active-mark" : ""}`}
                style={{ top: `${seg.top}%`, height: `${seg.height}%` }}
              >
                {(seg.id % 5 === 0) && (
                  <span className="leech-ruler-num">{seg.id}</span>
                )}
              </div>
            ))}
          </div>

          {/* Image & Overlays */}
          <div className="leech-image-wrapper">
            
            <img src={LEECH_IMAGE_URL} alt="Leech Anatomy" className="leech-img" />
            
            {segmentDefs.map((seg) => {
               const isRegionActive = activeId && getRegion(activeId) === getRegion(seg.id);
               const isExactActive = activeId === seg.id;
               const isLocked = selectedSegment === seg.id;

               return (
                <div
                  key={seg.id}
                  className={`leech-segment-overlay 
                    ${isExactActive ? "leech-seg-highlight" : ""} 
                    ${isLocked ? "leech-seg-locked" : ""}
                  `}
                  style={{
                    top: `${seg.top}%`,
                    height: `${seg.height}%`,
                    backgroundColor: isExactActive 
                      ? 'rgba(59, 130, 246, 0.4)' 
                      : (isRegionActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent')
                  }}
                  onMouseEnter={() => setHoveredSegment(seg.id)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  onClick={() => handleSegmentClick(seg.id)}
                  title={`Segment ${seg.id}`}
                />
              );
            })}
          </div>
        </div>

        {/* Right Side: Info Panel */}
        <aside className="leech-info-panel-wrapper">
          <div className={`leech-info-card ${info ? "leech-card-visible" : "leech-card-empty"}`}>
            {info ? (
              <>
                <div 
                  className="leech-card-header" 
                  style={{ 
                    backgroundColor: info.color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}
                >
                  {/* Icon removed, Title moved here */}
                  <h3 style={{ margin: 0, color: 'white' }}>{info.title}</h3>
                  <span className="leech-card-seg-range">Segments {activeRegionKey}</span>
                </div>
                
                <div className="leech-card-body">
                  <p>{info.desc}</p>
                  
                  <div className="leech-stat-row">
                      {/* Current Focus maintained, Status removed */}
                      <div className="leech-stat-pill">
                        <span className="leech-label">Current Focus</span>
                        <span className="leech-value">Segment {activeId}</span>
                      </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="leech-empty-state">
                <div className="leech-empty-icon">👆</div>
                <h3>Explore the Anatomy</h3>
                <p>Hover over the body segments to see functional regions.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
      <BodyDivisions />
    </>
  );
}