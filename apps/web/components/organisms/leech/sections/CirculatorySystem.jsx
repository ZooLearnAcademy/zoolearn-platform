






import "./circulatorySystem.css";

const CirculatorySystem = () => {
  return (
    <section className="cs-circulatory-section">
      <div className="cs-circulatory-container">
        
        {/* HEADER */}
        <div className="cs-circulatory-header">
          <h2 className="cs-section-title">Circulatory System</h2>
          <div className="cs-underline"></div>
           
        </div>

        <div className="cs-circulatory-grid">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="cs-circulatory-content">
            
            {/* INTRO BOX */}
            <div className="cs-intro-box">
              <h3 className="cs-intro-heading">Haemocoelic System</h3>
              <p className="cs-intro-text">
                Leech has a haemocoelic circulatory system.
              </p>
            </div>

            {/* KEY FEATURE CARD */}
            <div className="cs-feature-card cs-vessel-card">
              <div className="cs-icon-circle">🚫</div>
              <p className="cs-feature-text">Blood vessels are absent</p>
            </div>

            {/* CHANNELS SECTION */}
            <div className="cs-channels-container">
              <h4 className="cs-channels-title">
                Blood flows through four longitudinal haemocoelic channels:
              </h4>
              
              <div className="cs-channels-list">
                
                {/* Dorsal */}
                <div className="cs-channel-item">
                  <span className="cs-dot"></span>
                  <p>One dorsal</p>
                </div>

                {/* Ventral */}
                <div className="cs-channel-item">
                  <span className="cs-dot"></span>
                  <p>One ventral</p>
                </div>

                {/* Lateral (Heart) - Highlighted */}
                <div className="cs-channel-item cs-highlight-item">
                  <span className="cs-heart-icon">❤️</span>
                  <p>
                    Two lateral 
                    <span className="cs-sub-note"> (act like hearts)</span>
                  </p>
                </div>

              </div>
              
            </div>

            {/* CONNECTION CARD */}
            <div className="cs-feature-card cs-connection-card">
              <div className="cs-icon-circle">🔗</div>
              <p className="cs-feature-text">
                Channels connect posteriorly in the 26th segment
              </p>
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="cs-circulatory-image-col">
            <div className="cs-image-frame">
              <img 
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1769586113/circulatory_system_npfsym.jpg"
                alt="Circulatory System of Leech" 
                className="cs-circulatory-img"
              />
              <span className="cs-img-caption">Haemocoelic Channels</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CirculatorySystem;