import "./respiratorySystem.css";

const RespiratorySystem = () => {
  return (
    <section className="rs-respiratory-section"  id="respiratory-system">
      <div className="rs-respiratory-container">
        
        {/* HEADER */}
        <div className="rs-respiratory-header">
          <h2 className="rs-section-title">Respiratory System</h2>
          <div className="rs-underline"></div>
          {/* <div className="rs-title-underline"></div> */}
        </div>

        <div className="rs-respiratory-grid">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="rs-respiratory-content">
            
            {/* CARD 1: INTRO */}
            <div className="rs-respiratory-card rs-intro-card" id="rs-intro">
              <h3 className="rs-card-heading"> </h3>
              <p className="rs-card-text">
                Leech has no special respiratory organs like gills or lungs.
              </p>
              <div className="rs-divider-line"></div>
              <p className="rs-scientific-name">Skin acts as the respiratory organ.</p>
            </div>

            {/* CARD 2: MECHANISM */}
            <div className="rs-respiratory-card rs-mechanism-card">
              <div className="rs-icon-wrapper">🌬️</div>
              <div className="rs-info-col">
                <h3 className="rs-card-heading">Mechanism</h3>
                <p className="rs-card-text">
                  Exchange of respiratory gases takes place through <strong>diffusion</strong>.
                </p>
                <p className="rs-card-text">
                  The skin is kept moist and slimy by mucus secretion, which allows oxygen dissolved in water to diffuse into the haemocoelic fluid.
                </p>
                
              </div>
            </div>

            {/* CARD 3: TRANSPORT */}
            <div className="rs-respiratory-card rs-transport-card">
              <div className="rs-icon-wrapper">🩸</div>
              <div className="rs-info-col">
                <h3 className="rs-card-heading">Gas Transport</h3>
                <p className="rs-card-text">
                  <strong>Haemoglobin</strong> dissolved in the haemocoelic fluid transports oxygen to all body parts.
                </p>
                <span className="rs-highlight-badge">CO₂ diffuses out through skin</span>
              </div>
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="rs-respiratory-image-col">
            <div className="rs-image-frame">
              <img 
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769585037/repiratory_system_pie2fn.jpg"
                alt="Leech Respiration" 
                className="rs-respiratory-img"
              />
              <span className="rs-img-caption">Cutaneous Respiration</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RespiratorySystem;