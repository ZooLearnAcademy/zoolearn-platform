import "./excretorySystem.css";

const ExcretorySystem = () => {
  return (
    <section className="es-excretory-section">
      <div className="es-excretory-container">
        
        {/* HEADER */}
        <div className="es-excretory-header">
          <h2 className="es-section-title">Excretory System</h2>
          <div className="es-title-underline"></div>
        </div>

        <div className="es-excretory-grid">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="es-excretory-content">
            
            {/* MAIN INFO CARD */}
            <div className="es-info-card">
              <div className="es-icon-badge">💧</div>
              <p className="es-main-text">
                Excretion occurs through <strong>17 pairs of metanephridia</strong>, 
                present in segments <strong>6–22</strong>.
              </p>
            </div>

            {/* COMPONENTS LIST */}
            <div className="es-components-container">
              <h3 className="es-sub-heading">Each nephridium has:</h3>
              
              
              <div className="es-component-list">
                
                {/* ITEM 1 */}
                <div className="es-component-card" style={{ animationDelay: "0.2s" }}>
                  <span className="es-dot-indicator"></span>
                  <p className="es-component-name">A funnel</p>
                </div>

                {/* ITEM 2 */}
                <div className="es-component-card" style={{ animationDelay: "0.3s" }}>
                  <span className="es-dot-indicator"></span>
                  <p className="es-component-name">A coiled tubule</p>
                </div>

                {/* ITEM 3 */}
                <div className="es-component-card" style={{ animationDelay: "0.4s" }}>
                  <span className="es-dot-indicator"></span>
                  <p className="es-component-name">
                    An external opening <span className="es-highlight">(nephridiopore)</span>
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="es-excretory-image-col">
            <div className="es-image-frame">
              <img 
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810762/excretorysystem_w85798.png" 
                alt="Excretory System of Leech" 
                className="es-excretory-img"
              />
              <span className="es-img-caption">Nephridium Structure</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExcretorySystem;