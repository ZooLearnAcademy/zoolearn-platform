import React, { useState } from "react";
import "./parasiticAdaptations.css";

const ParasiticAdaptations = () => {
  // State for the slider
  const [activeSlide, setActiveSlide] = useState(0);

  // Array of images to swipe through
  const slides = [
    {
      id: 1,
      src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810858/parasitic_cdkchf.png",
      alt: "Parasitic Adaptations",
      caption: "Parasitic Mode"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/duibfmcw1/image/upload/v1767810737/digestivesystem_osipqw.png",
      alt: "Digestive System of Leech",
      caption: "Digestive System"
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="parasitic-section">
      <div className="parasitic-container">

        {/* HEADER */}
        <div className="parasitic-header">
          <h2 className="section-title">Parasitic Adaptations Of Leech</h2>
          <div className="title-underline"></div>
        </div>

        <div className="parasitic-grid">

          {/* LEFT: TEXT & CARDS */}
          <div className="parasitic-content">

            {/* INTRO TEXT */}
            <div className="intro-card">
              <p className="intro-text">
                A leech lives as a parasite, feeding on animal blood using special adaptations to attach, suck, store, and digest it slowly.
              </p>
            </div>

            {/* ADAPTATIONS GRID */}
            <div className="adaptations-list">

              {/* CARD 1 */}
              <div className="adaptation-card" style={{ animationDelay: "0.1s" }}>
                <div className="icon-box">🩸</div>
                <div className="card-info">
                  <h4 className="adaptation-title">Feeding Habit of Leech</h4>
                  <p>A leech sucks blood using three tiny-toothed jaws that make a Y-shaped cut. Its muscular pharynx pumps the blood while saliva is released into the wound.</p>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="adaptation-card" style={{ animationDelay: "0.2s" }}>
                <div className="icon-box">🧲</div>
                <div className="card-info">
                  <h4 className="adaptation-title">Prevention of Pain and Blood Clotting</h4>
                  <p>Leech saliva contains hirudin, which stops blood from clotting and keeps it flowing. It also releases an anaesthetic, so the host usually feels no pain.</p>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="adaptation-card" style={{ animationDelay: "0.3s" }}>
                <div className="icon-box">🦷</div>
                <div className="card-info">
                  <h4 className="adaptation-title">Food Storage and Digestion
                  </h4>
                  <p>The blood a leech sucks is stored in large chambers and digested very slowly. Because of this, it can survive for months without feeding and does not need complex digestive enzymes.</p>
                </div>
              </div>

              {/* CARD 4 */}
              <div className="adaptation-card" style={{ animationDelay: "0.4s" }}>
                <div className="icon-box">🧪</div>
                <div className="card-info">
                  <h4 className="adaptation-title">Adaptations for Firm Attachment</h4>
                  <p>A leech stays attached to its host using two suckers at the front and back, which help it cling firmly while feeding.</p>
                </div>
              </div>

              {/* CARD 5 */}
              <div className="adaptation-card" style={{ animationDelay: "0.5s" }}>
                <div className="icon-box">🚫</div>
                <div className="card-info">
                  <h4 className="adaptation-title">Other Parasitic Adaptations</h4>
                  <p>Leeches lack setae and parapodia since they aren’t needed for a parasitic life. Their soft, flexible body helps them attach and move on the host.</p>
                </div>
              </div>

              {/* CARD 6 */}
              <div className="adaptation-card" style={{ animationDelay: "0.6s" }}>
                <div className="icon-box">📦</div>
                <div className="card-info">
                  <h4 className="adaptation-title">Food Storage;</h4>
                  <p>Blood is stored in the crop, allowing the leech to survive for many months without a new meal.</p>
                </div>
              </div>

              {/* CARD 7 */}
              <div className="adaptation-card full-width-card" style={{ animationDelay: "0.7s" }}>
                <div className="icon-box">🥣</div>
                <div className="card-info">
                  <h4 className="adaptation-title">Easy understanding line</h4>
                  <p>Every part of a leech, from its jaws and suckers to its saliva, is specially adapted for its blood-sucking parasitic life.</p>
                </div>
              </div>

            </div>

          </div>


          {/* RIGHT: IMAGE SLIDER */}
          <div className="parasitic-image-col">
            <div className="image-frame">

              <div className="slider-wrapper">
                {/* Navigation Buttons */}
                <button className="slider-btn prev-btn" onClick={handlePrev}>❮</button>
                <button className="slider-btn next-btn" onClick={handleNext}>❯</button>

                {/* Active Image */}
                <img
                  src={slides[activeSlide].src}
                  alt={slides[activeSlide].alt}
                  className="parasitic-img"
                />
              </div>

              {/* Caption */}
              <span className="img-caption">{slides[activeSlide].caption}</span>

              {/* Dots Indicator */}
              <div className="slider-dots">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`slider-dot ${index === activeSlide ? 'active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                  ></span>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ParasiticAdaptations;