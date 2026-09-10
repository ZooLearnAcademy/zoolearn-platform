import "./nervousSystem.css";

const NervousSystem = () => {
  return (
    <section className="nerv-nervous-section"  id="respiratory-system">
      <div className="nerv-nervous-container">
        
        {/* HEADER */}
        <div className="nerv-nervous-header">
          <h2 className="nerv-section-title">Nervous System</h2>
          <div className="nerv-title-underline"></div>
        </div>

        <div className="nerv-nervous-grid">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="nerv-nervous-content">
            
            <p className="nerv-nervous-intro">
              The nervous system consists of:
            </p>

            <div className="nerv-nerve-list">
              
              {/* ITEM 1 */}
              <div className="nerv-nerve-card">
                <div className="nerv-node-point"></div>
                <div className="nerv-nerve-info">
                  <h3 className="nerv-nerve-name">
                    Suprapharyngeal ganglion (brain)
                  </h3>
                  <p className="nerv-nerve-desc">– above pharynx</p>
                </div>
              </div>

              {/* CONNECTIVE LINE (Visual) */}
              <div className="nerv-connector-line"></div>

              {/* ITEM 2 */}
              <div className="nerv-nerve-card">
                <div className="nerv-node-point"></div>
                <div className="nerv-nerve-info">
                  <h3 className="nerv-nerve-name">Circumpharyngeal connectives</h3>
                </div>
              </div>

              {/* CONNECTIVE LINE (Visual) */}
              <div className="nerv-connector-line"></div>

              {/* ITEM 3 */}
              <div className="nerv-nerve-card">
                <div className="nerv-node-point"></div>
                <div className="nerv-nerve-info">
                  <h3 className="nerv-nerve-name">Subpharyngeal ganglion</h3>
                </div>
              </div>

              {/* CONNECTIVE LINE (Visual) */}
              <div className="nerv-connector-line"></div>

              {/* ITEM 4 */}
              <div className="nerv-nerve-card">
                <div className="nerv-node-point"></div>
                <div className="nerv-nerve-info">
                  <h3 className="nerv-nerve-name">Paired ventral nerve cord</h3>
                  <p className="nerv-nerve-desc">with 21 segmental ganglia</p>
                </div>
              </div>

            </div>

            {/* FOOTER SUMMARY */}
            <div className="nerv-nervous-footer">
              <div className="nerv-pulse-icon">⚡</div>
              <p>
                This system controls movement, sensation, and feeding.
              </p>
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="nerv-nervous-image-col">
            <div className="nerv-image-frame">
              
              <img 
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810860/nervoussystem_utggdl.png"
                alt="Nervous System of Leech" 
                className="nerv-nervous-img"
              />
              <span className="nerv-img-caption">Nervous System</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NervousSystem;