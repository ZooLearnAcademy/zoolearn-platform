import React, { useState } from "react";
import "./locomotion.css";

const Locomotion = () => {
  // 1. Setup state to track active video. Default is 'none' to show the image first.
  const [activeMedia, setActiveMedia] = useState("image");

  const mediaSources = {
    looping: "https://res.cloudinary.com/duibfmcw1/video/upload/v1768903630/WhatsApp_Video_2026-01-19_at_14.26.01_jhzt2o.mp4",
    swimming: "https://res.cloudinary.com/duibfmcw1/video/upload/v1768986635/Video_Project_1_rcyiik.mp4",
    defaultImage: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810794/leech_imk2bj.jpg"
  };

  return (
    <section className="locomotion-section" id="locomotion">
      <div className="locomotion-container">
        <div className="locomotion-header">
          <h2 className="locomotion-title">Locomotion</h2>
          <div className="locomotion-underline"></div>
        </div>

        <div className="locomotion-grid">
          <div className="locomotion-text-col">
            <p className="locomotion-intro">Leeches move in two ways:</p>

            <div className="movement-cards">
              {/* LOOPING CARD */}
              <div
                className={`movement-card clickable ${activeMedia === 'looping' ? 'active-card' : ''}`}
                style={{ animationDelay: "0.2s" }}
                onClick={() => setActiveMedia("looping")}
              >
                <div className="icon-box">🪱</div>
                <div className="movement-info">
                  <h3 className="movement-name">Looping / crawling</h3>
                  <div className="arrow-separator">→</div>
                  <p className="movement-desc">by alternate attachment of anterior and posterior suckers</p>
                </div>
              </div>

              {/* SWIMMING CARD */}
              <div 
                className={`movement-card clickable ${activeMedia === 'swimming' ? 'active-card' : ''}`}
                style={{ animationDelay: "0.4s" }}
                onClick={() => setActiveMedia("swimming")}
              >
                <div className="icon-box">🌊</div>
                <div className="movement-info">
                  <h3 className="movement-name">Swimming</h3>
                  <div className="arrow-separator">→</div>
                  <p className="movement-desc">by wave-like (undulating) movements of the body in water</p>
                </div>
              </div>
            </div>

            <div className="locomotion-footer">
              <p className="footer-note">Movement is controlled by muscle contraction and relaxation.</p>
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Media Box */}
          <div className="locomotion-image-col">
            <div className="image-frame video-frame">
              {activeMedia === "image" ? (
                <img src={mediaSources.defaultImage} alt="Leech" className="locomotion-img" />
              ) : (
                <video
                  key={activeMedia} // Key ensures React reloads the video when source changes
                  className="locomotion-video"
                  src={mediaSources[activeMedia]}
                  title="Leech Movement Video"
                  autoPlay
                  loop      // <--- This ensures the video plays again and again
                  muted     // <--- Required for autoPlay to work in most browsers
                  playsInline
                  controls={false} // Set to true if you want user controls (play/pause)
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                />
              )}
              
              <span className="img-label">
                {activeMedia === "image" ? "Leech Movement" : `Video: ${activeMedia} Mode`}
              </span>
              
              {activeMedia !== "image" && (
                <button className="reset-btn" onClick={() => setActiveMedia("image")}>Reset to Image</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locomotion;