"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import "./horse.css";
import EvolutionTimeline from "./sections/EvolutionTimeline";
import Transformation from "./sections/Transformation";
import Adaptations from "./sections/Adaptations";
import Taxonomy from "./sections/Taxonomy";
import LivingDiversity from "./sections/LivingDiversity";

export function HorseEvolutionBlogView() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hor-zoopage">
      <div
        className="hor-zoo-app-container"
        style={{
          display: "block",
          minHeight: "auto",
          margin: "0 auto",
          maxWidth: "1200px",
          padding: "2rem 20px 4rem",
        }}
      >
        <main style={{ flex: 1, padding: "20px 0", minWidth: 0 }}>
          <div className="hor-content-card" style={{ width: "100%" }}>
            {/* Header section */}
            <section id="hero" className="hor-blog-section" style={{ padding: "0 0 2rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <span style={{ fontSize: "2.8rem" }}>🐴</span>
                <div>
                  <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--hor-text-main, #111827)", margin: 0 }}>
                    Evolution of the Horse
                  </h1>
                  <p style={{ fontSize: "1.15rem", color: "var(--hor-primary, #b45309)", margin: "4px 0 0", fontStyle: "italic" }}>
                    A 55-Million-Year Evolutionary Journey
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--hor-text-secondary, #4b5563)",
                  marginBottom: "32px",
                  maxWidth: "850px",
                  lineHeight: "1.75",
                }}
              >
                Trace how climate shifts transformed Eohippus from a small forest dweller to the modern, single-toed
                Equus. Explore the comprehensive timeline, interactive skeletal changes, and biomechanical adaptations.
              </p>
            </section>

            {/* Evolution Timeline */}
            <section id="timeline" className="hor-blog-section" style={{ padding: "1rem 0" }}>
              <EvolutionTimeline />
            </section>

            <div className="gir-section-divider" style={{ margin: "3rem 0", height: "1px", background: "var(--hor-border, #e5e7eb)" }} />

            {/* Interactive Transformation */}
            <section id="transformation" className="hor-blog-section" style={{ padding: "1rem 0" }}>
              <Transformation />
            </section>

            <div className="gir-section-divider" style={{ margin: "3rem 0", height: "1px", background: "var(--hor-border, #e5e7eb)" }} />

            {/* Anatomical Adaptations */}
            <section id="adaptations" className="hor-blog-section" style={{ padding: "1rem 0" }}>
              <Adaptations />
            </section>

            <div className="gir-section-divider" style={{ margin: "3rem 0", height: "1px", background: "var(--hor-border, #e5e7eb)" }} />

            {/* Taxonomy */}
            <section id="taxonomy" className="hor-blog-section" style={{ padding: "1rem 0" }}>
              <Taxonomy />
            </section>

            <div className="gir-section-divider" style={{ margin: "3rem 0", height: "1px", background: "var(--hor-border, #e5e7eb)" }} />

            {/* Living Diversity */}
            <section id="diversity" className="hor-blog-section" style={{ padding: "1rem 0" }}>
              <LivingDiversity />
            </section>
          </div>
        </main>
      </div>

      {/* BACK TO TOP */}
      <button
        className={`hor-back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}

export default HorseEvolutionBlogView;
