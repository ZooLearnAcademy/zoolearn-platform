"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import "./about.css";

const achievementImages = [
  "https://res.cloudinary.com/duibfmcw1/image/upload/v1783550009/WhatsApp_Image_2026-07-07_at_4.29.38_PM_jq9dqp.jpg",
  "https://res.cloudinary.com/duibfmcw1/image/upload/v1783550031/WhatsApp_Image_2026-07-07_at_4.29.38_PM_1_myxskv.jpg",
  "https://res.cloudinary.com/duibfmcw1/image/upload/v1783743848/ceo_image_boralg.jpg",
];

export function AboutView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);

  const startAutoSlide = useCallback(() => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % achievementImages.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [startAutoSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % achievementImages.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + achievementImages.length) % achievementImages.length);
    startAutoSlide();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="about-container">
      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-badge">About Us</span>
          <h1>About ZooLearn</h1>
          <p>
            A specialized educational platform dedicated to zoology,
            animal taxonomy, and biological sciences.
          </p>
        </div>
      </section>

      {/* About Content — Card Style */}
      <section className="about-section about-intro-section">
        <div className="about-intro-grid">
          <div className="about-intro-card">
            <div className="intro-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1 4 3 6 3s6-2 6-3v-5" />
              </svg>
            </div>
            <h3>For Learners</h3>
            <p>
              ZooLearn is designed to support school students, NEET aspirants,
              undergraduate learners, and early-stage researchers by providing
              structured, syllabus-aligned, and scientifically accurate content.
            </p>
          </div>
          <div className="about-intro-card">
            <div className="intro-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3>Strong Foundation</h3>
            <p>
              The platform focuses on building a strong academic foundation in
              zoology through carefully curated content based on NCERT guidelines
              and modern taxonomy, covering Class 10 through NEET syllabi.
            </p>
          </div>
          <div className="about-intro-card">
            <div className="intro-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <h3>Detailed Content</h3>
            <p>
              ZooLearn provides fully completed content on human evolution,
              evolutionary stages, and detailed anatomical studies of the leech,
              cockroach, and rabbit — the most frequently tested zoology topics.
            </p>
          </div>
          <div className="about-intro-card">
            <div className="intro-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Future-Ready</h3>
            <p>
              Built with a long-term vision of integrating intelligent learning
              tools. AI-based features are under development and will be
              introduced in future phases.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section about-mission-section">
        <div className="section-label">
          <span className="section-label-badge">Our Purpose</span>
          <h2>Our Mission</h2>
          <p className="section-label-sub">
            ZooLearn&apos;s mission is to make zoology learning clear, structured, and
            reliable for every learner.
          </p>
        </div>
        <div className="mission-items">
          <div className="mission-item">
            <div className="mission-item-marker"></div>
            <span>Provide complete and syllabus-accurate zoology content</span>
          </div>
          <div className="mission-item">
            <div className="mission-item-marker"></div>
            <span>Follow modern and accepted taxonomic classification systems</span>
          </div>
          <div className="mission-item">
            <div className="mission-item-marker"></div>
            <span>Simplify complex zoological concepts without losing scientific depth</span>
          </div>
          <div className="mission-item">
            <div className="mission-item-marker"></div>
            <span>Support students in academic learning and competitive exam preparation</span>
          </div>
          <div className="mission-item">
            <div className="mission-item-marker"></div>
            <span>Build a platform that gradually evolves with technology while maintaining academic integrity</span>
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="about-section about-future-section">
        <div className="section-label">
          <span className="section-label-badge">Roadmap</span>
          <h2>Future Plans</h2>
        </div>
        <div className="future-timeline">
          <div className="future-item">
            <div className="future-item-dot"></div>
            <div className="future-item-content">
              <h4>AI-Powered Chatbot</h4>
              <p>Doubt-solving and concept clarification with intelligent AI</p>
            </div>
          </div>
          <div className="future-item">
            <div className="future-item-dot"></div>
            <div className="future-item-content">
              <h4>Smart Quizzes</h4>
              <p>AI-powered quizzes with Easy, Medium, and Hard difficulty levels</p>
            </div>
          </div>
          <div className="future-item">
            <div className="future-item-dot"></div>
            <div className="future-item-content">
              <h4>Personalized Learning</h4>
              <p>Custom recommendations based on your learning patterns</p>
            </div>
          </div>
          <div className="future-item">
            <div className="future-item-dot"></div>
            <div className="future-item-content">
              <h4>Advanced Modules</h4>
              <p>Certification-based courses and advanced zoology modules</p>
            </div>
          </div>
          <div className="future-item">
            <div className="future-item-dot"></div>
            <div className="future-item-content">
              <h4>Interactive Tools</h4>
              <p>Taxonomy exploration and comparison tools for deeper learning</p>
            </div>
          </div>
          <div className="future-item">
            <div className="future-item-dot"></div>
            <div className="future-item-content">
              <h4>Community &amp; Experts</h4>
              <p>Community learning features and expert sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Directors of ZooLearn */}
      <section className="about-section directors-section" id="directors">
        <div className="directors-header">
          <span className="directors-badge">Leadership</span>
          <h2>Directors of ZooLearn</h2>
          <p className="directors-subtitle">
            Meet the visionary leaders guiding ZooLearn Academy&apos;s mission and growth.
          </p>
        </div>
        <div className="directors-grid">
          <div className="director-card" id="Amirtharaj-Natarajan">
            <div className="director-image-wrap">
              <img
                loading="lazy"
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1770016570/amirtharaj-removebg-preview_nhyhyp.png"
                alt="Amirtharaj Natarajan"
              />
            </div>
            <div className="director-info">
              <h3>Amirtharaj Natarajan</h3>
              <span className="director-role">3D Developer &amp; Guide</span>
              <p>
                Amirtharaj Natarajan is a 3D Developer and Guide at ZooLearn Academy.
                Since December 2025, he has been leading the 3D team and helping
                employees build practical 3D and AR/VR skills.
              </p>
            </div>
          </div>
          <div className="director-card" id="Dr-Krishnamoorthy">
            <div className="director-image-wrap">
              <img
                loading="lazy"
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783748019/krishnamoorthy_d8wy5s.png"
                alt="Dr. R. Krishnamoorthy"
              />
            </div>
            <div className="director-info">
              <h3>Dr. R. Krishnamoorthy, Ph.D.</h3>
              <span className="director-role">Content Verification Advisor</span>
              <p>
                Dr. R. Krishnamoorthy, Ph.D., is an experienced zoologist, researcher,
                and recipient of multiple national research awards. He serves as the
                Content Verification Advisor at ZooLearn Academy, ensuring all learning
                materials are accurate and authenticated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="about-section achievements-section" id="achievements">
        <div className="achievements-header">
          <span className="achievements-badge">Recognition</span>
          <h2>Achievements</h2>
        </div>
        <div className="achievement-showcase">
          <div className="achievement-carousel">
            <button className="carousel-btn carousel-prev" onClick={prevSlide} aria-label="Previous image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div className="carousel-viewport">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={(e) => {
                  if (e.touches[0]) {
                    touchStartX.current = e.touches[0].clientX;
                  }
                }}
                onTouchEnd={(e) => {
                  if (e.changedTouches[0]) {
                    const diff = touchStartX.current - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) {
                      if (diff > 0) {
                        nextSlide();
                      } else {
                        prevSlide();
                      }
                    }
                  }
                }}
              >
                {achievementImages.map((src, idx) => (
                  <div className="carousel-slide" key={idx}>
                    <img loading="lazy" src={src} alt={`Luminary Award 2026 - Photo ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            <button className="carousel-btn carousel-next" onClick={nextSlide} aria-label="Next image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <div className="carousel-dots">
              {achievementImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${idx === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="achievement-content">
            <div className="achievement-award-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 22V8a2 2 0 0 0-2-2H6v6.83a8 8 0 0 0 4 6.93V22" />
                <path d="M14 22V8a2 2 0 0 1 2-2h2v6.83a8 8 0 0 1-4 6.93V22" />
              </svg>
            </div>
            <h3>Luminary Award 2026</h3>
            <p>
              ZooLearn Academy was honored with the <strong>Luminary Award 2026</strong> for
              its outstanding contribution to innovative education, recognizing its
              commitment to transforming learning through technology and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="about-section about-careers-section">
        <div className="section-label">
          <span className="section-label-badge">Join Us</span>
          <h2>Careers</h2>
          <p className="section-label-sub">
            ZooLearn offers opportunities for individuals who want to contribute
            to the future of science education.
          </p>
        </div>
        <div className="careers-grid">
          <div className="career-item">
            <div className="career-bullet"></div>
            <span>Zoology and life science content development</span>
          </div>
          <div className="career-item">
            <div className="career-bullet"></div>
            <span>Educational research and curriculum planning</span>
          </div>
          <div className="career-item">
            <div className="career-bullet"></div>
            <span>Software development and platform engineering</span>
          </div>
          <div className="career-item">
            <div className="career-bullet"></div>
            <span>AI and educational technology</span>
          </div>
          <div className="career-item">
            <div className="career-bullet"></div>
            <span>Scientific illustration and academic design</span>
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="about-section about-press-section">
        <div className="section-label">
          <span className="section-label-badge">Media</span>
          <h2>Press Kit</h2>
          <p className="section-label-sub">
            The ZooLearn Press Kit provides official information for media,
            educators, collaborators, and partners.
          </p>
        </div>
        <div className="press-items">
          <div className="press-item">
            <div className="press-bullet"></div>
            <span>Platform overview and academic focus</span>
          </div>
          <div className="press-item">
            <div className="press-bullet"></div>
            <span>Current content coverage and future roadmap</span>
          </div>
          <div className="press-item">
            <div className="press-bullet"></div>
            <span>Brand descriptions and usage details</span>
          </div>
          <div className="press-item">
            <div className="press-bullet"></div>
            <span>Media and contact information</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutView;
