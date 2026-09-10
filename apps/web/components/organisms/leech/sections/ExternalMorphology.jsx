import React, { useState, useRef, useEffect } from 'react';
import "./externalMorphology.css";

// Body Wall Data
const anatomyParts = [
  { id: 'bw-cuticle', name: 'Cuticle', description: 'A thin, non-cellular, protective outer covering that is periodically shed. It acts as the first line of defense against physical injury and pathogens.', y: 20, height: 15, patternId: 'bw-pattern-cuticle', color: '#475569' },
  { id: 'bw-epidermis', name: 'Epidermis', description: 'A single layer of living columnar cells that secretes the cuticle. It contains numerous gland cells that produce mucus to keep the skin moist.', y: 35, height: 40, patternId: 'bw-pattern-epidermis', color: '#ef4444' },
  { id: 'bw-dermis', name: 'Dermis', description: 'A thick layer of fibrous connective tissue. It houses blood capillaries, pigment cells (chromatophores), and sensory nerve endings.', y: 75, height: 45, patternId: 'bw-pattern-dermis', color: '#f97316' },
  { id: 'bw-muscular', name: 'Muscular Layer', description: 'Comprises powerful circular and longitudinal muscles. Their coordinated contractions enable the leech to perform its characteristic looping movement.', y: 120, height: 60, patternId: 'bw-pattern-muscular', color: '#b91c1c' },
  { id: 'bw-botryoidal', name: 'Botryoidal Tissue', description: 'A unique connective tissue filling the reduced coelom. It is highly vascularized and plays a vital role in excretion and iron storage.', y: 180, height: 70, patternId: 'bw-pattern-botryoidal', color: '#9333ea' }
];

const ExternalMorphology = () => {
  // --- Body Wall State ---
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [showAllLabels, setShowAllLabels] = useState(false);
  const sidebarRef = useRef(null);

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
    setSelectedPart(selectedPart === partId ? null : partId);
  };
  // ---------------------

  return (
    <section className="em-morphology-section" id="external-morphology">
      <div className="em-morphology-container">

        {/* HEADER */}
        <div className="em-morphology-header">
          <h2 className="em-morphology-title">External Morphology</h2>
          <div className="em-morphology-underline"></div>
        </div>

        {/* TOP SECTION (unchanged) */}
        <div className="em-top-section-grid">
          <div className="em-morphology-card em-image-card">
            <div className="em-image-wrapper">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810830/morphology_sf7xd1.png"
                alt="External Morphology of Leech"
                className="em-morphology-img"
              />
              <span className="em-image-caption">External Morphology</span>
            </div>
          </div>

          <div className="em-right-stack">
            <div className="em-morphology-card em-text-card">
              <h3 className="em-card-title">Shape and Size</h3>
              <p className="em-card-text">
                The body of the leech is soft, elongated, vermiform, and segmented.
                It may appear ribbon-shaped or cylindrical and can grow up to 35 cm.
              </p>
              <h3 className="em-card-title em-mt-4">Colour</h3>
              <ul className="em-morphology-list">
                <li><strong>Dorsal:</strong> Olive green</li>
                <li><strong>Ventral:</strong> Orange-yellow to orange-red</li>
              </ul>
            </div>

            <div className="em-morphology-card em-text-card">
              <h3 className="em-card-title">Segmentation</h3>
              <p className="em-card-text">
                Divided into 33 segments. Each segment is subdivided into annuli.
              </p>
              <h3 className="em-card-title em-mt-4">Sense Receptors</h3>
              <ul className="em-morphology-list">
                <li><strong>Annular receptors:</strong> On each annulus</li>
                <li><strong>Segmental receptors:</strong> First annulus of each segment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: SUCKERS (unchanged) */}
        <div className="em-morphology-card em-full-width em-mt-layout">
          <h3 className="em-card-title">Suckers</h3>
          <p className="em-card-text">Two suckers for attachment and movement.</p>
          <div className="em-sucker-grid">
            <div className="em-sucker-item">
              <div className="em-sucker-badge">1</div>
              <h4>Anterior (oral) sucker</h4>
              <ul>
                <li>Ventral, occupies first 5 segments</li>
                <li>Used for feeding & attachment</li>
              </ul>
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769585515/anterior_kbxsua.jpg"
                alt="anterior sucker"
                className="em-sucker-img"
              />
            </div>
            <div className="em-sucker-item">
              <div className="em-sucker-badge">2</div>
              <h4>Posterior sucker</h4>
              <ul>
                <li>Fusion of last 7 segments</li>
                <li>Firm attachment & locomotion</li>
              </ul>
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769585506/posterior_pe2qow.png"
                alt="posterior sucker"
                className="em-sucker-img"
              />
            </div>
          </div>
        </div>

        {/* --- BODY WALL SECTION (MERGED FROM BODYWALL PAGE) --- */}
         


        {/* --- BOTTOM SECTION: APERTURES SPLIT VIEW --- */}
        <div className="em-split-section em-mt-layout">

          {/* LEFT COLUMN: APERTURE LIST */}
          <div className="em-morphology-card em-aperture-column">
            <h3 className="em-card-title">External Apertures</h3>

            <div className="em-aperture-list-container">

              <div className="em-aperture-row">
                <div className="em-aperture-icon">👄</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Mouth</span>
                  <span className="em-aperture-desc">Present at the center of the anterior sucker</span>
                </div>
              </div>

              <div className="em-aperture-row">
                <div className="em-aperture-icon">◎</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Anus</span>
                  <span className="em-aperture-desc">Mid-dorsal side of the 26th segment</span>
                </div>
              </div>

              <div className="em-aperture-row">
                <div className="em-aperture-icon">💧</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Nephridiopores</span>
                  <ul className="em-sub-list">
                    <li>17 pairs, opening ventrally</li>
                    <li>Last annulus of segments 6 to 22</li>
                  </ul>
                </div>
              </div>

              <div className="em-aperture-row">
                <div className="em-aperture-icon">♂</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Male genital pore</span>
                  <ul className="em-sub-list">
                    <li>Mid-ventral, 10th segment</li>
                    <li>Between 2nd and 3rd annuli</li>
                  </ul>
                </div>
              </div>

              <div className="em-aperture-row">
                <div className="em-aperture-icon">♀</div>
                <div className="em-aperture-content">
                  <span className="em-aperture-name">Female genital pore</span>
                  <ul className="em-sub-list">
                    <li>Mid-ventral, 11th segment</li>
                    <li>Between 2nd and 3rd annuli</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: 3D MODEL CARD */}
          <div className="em-morphology-card em-blender-column" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', padding: 0, boxShadow: 'none' }}>

            {/* CARD WRAPPER START: This div creates the white card look */}
            <div className="em-blender-card-wrapper" style={{
              width: '100%',
              maxWidth: '450px',
              height: 'auto',
              minHeight: '350px',
              margin: '0 auto',

              // STYLES TO MATCH THE REFERENCE CARD LOOK
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '12px',           /* Creates the white border space inside card */
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0'
            }}>

              {/* INNER CONTAINER FOR IFRAME */}
              <div className="sketchfab-embed-wrapper" style={{
                width: '100%',
                height: '300px',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <iframe
                  title="Indian_cattle_leech_overview"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src="https://sketchfab.com/models/69b3e8feda0d4c11a2e2a9e678fd489d/embed"
                  style={{ width: '100%', height: '100%' }}
                >
                </iframe>
              </div>

              {/* CAPTION AREA */}
              <div style={{
                textAlign: 'center',
                marginTop: '12px',
                fontSize: '13px',
                color: '#64748b',
                paddingBottom: '5px'
              }}>
                <a href="https://sketchfab.com/3d-models/indian-cattle-leech-overview-69b3e8feda0d4c11a2e2a9e678fd489d" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: '#1caad9', textDecoration: 'none' }}>
                  Indian Cattle Leech 3D Model
                </a>
              </div>

            </div>
            {/* CARD WRAPPER END */}

          </div>

        </div>
      </div>
    </section>
  );
};

export default ExternalMorphology;