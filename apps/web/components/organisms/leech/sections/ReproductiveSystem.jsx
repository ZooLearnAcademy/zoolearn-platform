import { useState } from "react";
import "./reproductiveSystem.css";

const ReproductiveSystem = () => {
  // State to track which system is currently active ('male' or 'female')
  const [activeTab, setActiveTab] = useState("male");

  return (
    <section className="reproductive-section"  id="reproductive-system">
      <div className="reproductive-container">
        
        {/* HEADER */}
        <div className="reproductive-header">
          <h2 className="section-title">Reproductive System</h2>
           
        </div>

        <div className="reproductive-grid">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="reproductive-content">
            
            {/* INTRO CARD - HERMAPHRODITE (Always Visible) */}
            <div className="hermaphrodite-card">
              <div className="icon-badge">⚥</div>
              <p className="intro-text">
                Leech is <strong>hermaphrodite</strong> because both the male and female reproductive organs are present in the same animal.
              </p>
            </div>

            {/* TOGGLE BUTTONS */}
            <div className="system-tabs">
              <button 
                className={`tab-btn ${activeTab === "male" ? "active" : ""}`}
                onClick={() => setActiveTab("male")}
              >
                Male Reproductive System
              </button>
              <button 
                className={`tab-btn ${activeTab === "female" ? "active" : ""}`}
                onClick={() => setActiveTab("female")}
              >
                Female Reproductive System
              </button>
            </div>

            {/* DYNAMIC CONTENT AREA */}
            <div className="system-content-area">
              
              {/* MALE SYSTEM CONTENT */}
              {activeTab === "male" && (
                <div className="system-group male-group fade-in">
                  <h3 className="group-title"> </h3>
                  
                  <div className="organ-list">
                    <div className="organ-card">
                      <h4 className="organ-name">Testis sacs:</h4>
                      <p>There are 11 pairs of testis sacs located in segment 12 to 22.</p>
                    </div>

                    <div className="organ-card">
                      <h4 className="organ-name">Vasa Efferentia & Deferentia:</h4>
                      <p>Short duct (vasa efferentia) lead from each testis sac into a common longitudinal canal called the vas deferens on each side.</p>
                    </div>

                    <div className="organ-card">
                      <h4 className="organ-name">Epididymis:</h4>
                      <p>The vas deferens forms a coiled mass in the 10th segment, which stores sperm.</p>
                    </div>

                    <div className="organ-card">
                      <h4 className="organ-name">Ejaculatory Duct & Atrium:</h4>
                      <p>These lead to the male genital pore, located mid-ventrally on the 10th segment.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* FEMALE SYSTEM CONTENT */}
              {activeTab === "female" && (
                <div className="system-group female-group fade-in">
                  <span className="group-title"></span>
                  <div className="organ-list">
                    <div className="organ-card">
                      <h4 className="organ-name">Ovaries:</h4>
                      <p>There is one pair of ovaries contained within ovisacs in the 11th segment.</p>
                    </div>

                    <div className="organ-card">
                      <h4 className="organ-name">Oviducts:</h4>
                      <p>Short tubes from each ovisac join to form a common oviduct.</p>
                    </div>

                    <div className="organ-card">
                      <h4 className="organ-name">Vagina:</h4>
                      <p>The common oviduct opens into a muscular pear-shaped organ called the vagina.</p>
                    </div>

                    <div className="organ-card">
                      <h4 className="organ-name">Female Genital Pore:</h4>
                      <p>This opens mid-ventrally on the 11th segment.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT: IMAGE (Stays on the far right) */}
          <div className="reproductive-image-col">
            <div className="image-frame">
              <img 
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810909/reproductivesystem_gctgvg.png"
                alt="Reproductive System of Leech" 
                className="reproductive-img"
              />
              <span className="img-caption">Reproductive System</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReproductiveSystem;