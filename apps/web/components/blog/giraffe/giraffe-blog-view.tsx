"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  ArrowUp,
  CalendarDays,
  Heart,
  Tag,
  GitBranch,
  Bone,
  Clock,
  List,
} from "lucide-react";
import "./giraffe.css";

// Import Sections
import Taxonomy from "./sections/Taxonomy";
import Ancestry from "./sections/Ancestry";
import EvolutionTimeline from "./sections/EvolutionTimeline";
import Adaptations from "./sections/Adaptations";
import CoatPatterns from "./sections/CoatPatterns";
import NeckScience from "./sections/NeckScience";
import Transformation from "./sections/Transformation";
import LivingDiversity from "./sections/LivingDiversity";

export function GiraffeBlogView() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState("calc(100vh - 80px)");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("giraffe-day");
  const sidebarRef = useRef<HTMLElement | null>(null);

  const sections = [
    { id: "giraffe-day", label: "World Giraffe Day", icon: <CalendarDays size={18} /> },
    { id: "meet-giraffe", label: "Meet the Giraffe", icon: <Heart size={18} /> },
    { id: "adaptations", label: "Biological Marvels", icon: <Bone size={18} /> },
    { id: "coat-patterns", label: "Spot Patterns", icon: <Tag size={18} /> },
    { id: "neck-science", label: "Science of the Neck", icon: <GitBranch size={18} /> },
    { id: "transformation", label: "Interactive Transformation", icon: <Clock size={18} /> },
    { id: "taxonomy", label: "Taxonomy (2025)", icon: <Tag size={18} /> },
    { id: "diversity", label: "Living Diversity", icon: <List size={18} /> },
    { id: "ancestry", label: "24-Million-Year Ancestry", icon: <GitBranch size={18} /> },
    { id: "timeline", label: "Evolution Timeline", icon: <Clock size={18} /> },
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerHeight = 90;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - headerHeight, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  // Scroll spy + sidebar visibility
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".foo-zl-footer");
      const banner = document.querySelector(".gir-hero-banner") as HTMLElement | null;
      const scrollPosition = window.scrollY;

      // Show sidebar when scrolled past banner
      if (banner) {
        const bannerBottom = banner.offsetHeight;
        setShowSidebar(scrollPosition > bannerBottom * 0.7);
      }

      setShowBackToTop(scrollPosition > 400);

      // Scroll spy: detect which section is in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (!sec) continue;
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sec.id);
            break;
          }
        }
      }

      // Sidebar footer collision
      if (!footer || !sidebarRef.current) return;
      const headerHeight = 80;
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (footerRect.top < viewportHeight) {
        const newHeight = Math.max(footerRect.top - headerHeight, 100);
        setSidebarHeight(`${newHeight}px`);
      } else {
        setSidebarHeight(`calc(100vh - ${headerHeight}px)`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections]);

  // Progress calculation
  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const progress = ((currentIndex + 1) / sections.length) * 100;

  return (
    <div className="gir-zoopage">
      {/* ─── HERO BANNER ─── */}
      <section className="gir-hero-banner" id="giraffe-day">
        <div className="gir-hero-container">
          {/* LEFT: Text */}
          <div className="gir-hero-content">
            <span className="gir-taxonomy-tag">June 21 · World Giraffe Day</span>
            <h1 className="gir-hero-title">World Giraffe Day</h1>
            <p className="gir-hero-subtitle">Celebrating the tallest animal on the longest day of the year</p>

            <div className="gir-taxonomy-grid">
              <div className="gir-tax-item">
                <span className="gir-tax-label">Neck</span>
                <span className="gir-tax-value">2.4 m</span>
              </div>
              <div className="gir-tax-item">
                <span className="gir-tax-label">Heart</span>
                <span className="gir-tax-value">11 kg</span>
              </div>
              <div className="gir-tax-item">
                <span className="gir-tax-label">Speed</span>
                <span className="gir-tax-value">65 km/h</span>
              </div>
              <div className="gir-tax-item">
                <span className="gir-tax-label">Population</span>
                <span className="gir-tax-value">~140,000</span>
              </div>
            </div>

            <p className="gir-hero-description">
              An evolutionary marvel, an ecosystem engineer, and a creature undergoing a silent extinction. Discover the
              24-million-year journey of the savanna&apos;s gentle giant.
            </p>
          </div>

          {/* RIGHT: Hero Image */}
          <div className="gir-hero-visual">
            <div className="gir-hero-image-wrapper">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783697468/zoolearn/lciu7nfitbacw92deppl.png"
                alt="Giraffa camelopardalis — Modern Giraffe"
                className="gir-hero-img"
              />
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="gir-hero-bottom-fade"></div>

        {/* Scroll Indicator */}
        <div className="gir-scroll-indicator" onClick={() => scrollToSection("meet-giraffe")}>
          <div className="gir-mouse">
            <div className="gir-wheel"></div>
          </div>
          <div className="gir-arrow-down"></div>
        </div>
      </section>

      {/* ─── APP CONTAINER ─── */}
      <div className="gir-zoo-app-container">
        {/* MOBILE OVERLAY */}
        <div
          className={`gir-mobile-overlay ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* SIDEBAR */}
        <aside
          ref={sidebarRef}
          className={`gir-zoo-sidebar ${isMobileMenuOpen ? "open" : ""} ${!showSidebar ? "hidden" : ""}`}
          style={{ height: sidebarHeight }}
        >
          <div className="gir-sidebar-header">
            <div className="gir-progress-label">Reading Progress</div>
            <div className="gir-progress-track">
              <div className="gir-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="gir-sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`gir-nav-btn ${activeSection === section.id ? "active" : ""}`}
                onClick={() => scrollToSection(section.id)}
              >
                <span className="gir-nav-icon">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="gir-zoo-main-content">
          {/* MOBILE TOGGLE */}
          <button
            className="gir-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>

          <div className="gir-content-card">
            {/* ── Why World Giraffe Day ── */}
            <section className="gir-blog-section">
              <h2 className="gir-section-heading">🦒 Why World Giraffe Day?</h2>
              <div className="gir-section-box">
                <h3 className="gir-section-title">June 21 — The Longest Day for the Tallest Animal</h3>
                <p className="gir-section-text">
                  <strong>World Giraffe Day</strong> is celebrated annually on <strong>June 21st</strong> — the longest
                  day (or night) of the year, depending on the hemisphere. This date was intentionally chosen to match the{" "}
                  <strong>tallest animal on Earth</strong> with the <strong>longest day of the year</strong> in the
                  Northern Hemisphere (summer solstice).
                </p>
                <p className="gir-section-text">
                  Initiated by the <strong>Giraffe Conservation Foundation (GCF)</strong>, this annual event aims to
                  raise awareness, shed light on the challenges giraffes face in the wild, and celebrate these gentle
                  giants that have roamed the African savanna for millions of years.
                </p>

                <div className="gir-day-highlights">
                  <div className="gir-day-card">
                    <span className="gir-day-icon">📅</span>
                    <h4>When?</h4>
                    <p>June 21st every year — the summer solstice in the Northern Hemisphere</p>
                  </div>
                  <div className="gir-day-card">
                    <span className="gir-day-icon">🤔</span>
                    <h4>Why This Date?</h4>
                    <p>The longest day of the year celebrates the tallest animal — a poetic match by the GCF</p>
                  </div>
                  <div className="gir-day-card">
                    <span className="gir-day-icon">🎯</span>
                    <h4>Purpose</h4>
                    <p>Raise awareness about declining populations &amp; support conservation initiatives worldwide</p>
                  </div>
                </div>
              </div>

              <div className="gir-section-box">
                <h3 className="gir-section-title">Why Giraffes Matter to Ecosystems</h3>
                <p className="gir-section-text">
                  Giraffes are far more than a tourist attraction — they are <strong>keystone browsers</strong> that
                  play a vital role in maintaining the ecological balance of African savannas and woodlands.
                </p>
                <ul className="gir-section-list">
                  <li>
                    <strong>Seed Dispersal:</strong> Giraffes consume fruits, seeds, and pods from treetops, spreading
                    seeds across vast distances through their dung — promoting forest regeneration.
                  </li>
                  <li>
                    <strong>Tree Pruning:</strong> By browsing the high canopy, giraffes naturally prune trees,
                    stimulating new growth and allowing sunlight to reach the understory.
                  </li>
                  <li>
                    <strong>Predator Sentinels:</strong> Their height gives them an unmatched vantage point. Other animals
                    like zebras and wildebeest often graze near giraffes, using them as early-warning lookouts for
                    predators.
                  </li>
                  <li>
                    <strong>Nutrient Cycling:</strong> Their large-scale foliage consumption and excretion return vital
                    nutrients to the soil, enriching the savanna ecosystem.
                  </li>
                  <li>
                    <strong>Biodiversity Indicators:</strong> Healthy giraffe populations signal well-managed habitats.
                    Their decline warns of broader ecosystem degradation.
                  </li>
                </ul>

                <div className="gir-callout gir-callout-fact">
                  <strong>⚠️ Silent Extinction</strong>
                  Giraffe numbers have plummeted by nearly <strong>40% in just 30 years</strong>. With fewer than
                  140,000 remaining, they are undergoing what conservationists call a <strong>&quot;silent extinction&quot;</strong> —
                  declining rapidly with far less public attention than elephants or rhinos.
                </div>
              </div>
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: Meet the Giraffe ── */}
            <section id="meet-giraffe" className="gir-blog-section">
              <h2 className="gir-section-heading">🌍 Meet the Giraffe</h2>
              <div className="gir-section-box">
                <h3 className="gir-section-title">The 24-Million-Year Masterpiece</h3>
                <p className="gir-section-text">
                  For over a century, science operated under a single assumption regarding the world&apos;s tallest
                  terrestrial animal: there was only one species of giraffe, divided into several regional subspecies.
                  This monolithic view remained unchallenged in textbooks around the globe.
                </p>
                <p className="gir-section-text">
                  However, in <strong>2016</strong>, genetic data revealed a biological earthquake — a reality formally
                  adopted by the <strong>International Union for Conservation of Nature (IUCN) in August 2025</strong>.
                  There is not one species of giraffe, but <strong>four distinct species</strong>, possessing genetic
                  differences as vast and profound as those between polar bears and brown bears.
                </p>
                <p className="gir-section-text">
                  Today, fewer than <strong>140,000 giraffes</strong> remain in the wild. To understand them requires
                  looking past their height and examining a <strong>24-million-year evolutionary journey</strong> marked
                  by massive climate shifts, anatomical anomalies, and two highly distinct biological &quot;boosts.&quot;
                </p>
              </div>

              <div className="gir-meet-stats">
                <div className="gir-stat-card">
                  <span className="gir-stat-number">18 ft</span>
                  <span className="gir-stat-desc">Maximum Height</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">1,900 kg</span>
                  <span className="gir-stat-desc">Maximum Weight</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">7</span>
                  <span className="gir-stat-desc">Neck Vertebrae (same as humans!)</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">25 lbs</span>
                  <span className="gir-stat-desc">Heart Weight</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">18 in</span>
                  <span className="gir-stat-desc">Tongue Length</span>
                </div>
                <div className="gir-stat-card">
                  <span className="gir-stat-number">24 M</span>
                  <span className="gir-stat-desc">Years of Evolution</span>
                </div>
              </div>
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: Biological Marvels ── */}
            <section id="adaptations" className="gir-blog-section">
              <h2 className="gir-section-heading">🌟 Biological Marvels</h2>
              <Adaptations />
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: Spot Patterns ── */}
            <section id="coat-patterns" className="gir-blog-section">
              <h2 className="gir-section-heading">🐆 Coat Patterns</h2>
              <CoatPatterns />
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: The Science Behind the Neck ── */}
            <section id="neck-science" className="gir-blog-section">
              <h2 className="gir-section-heading">🔬 The Science Behind the Neck</h2>
              <NeckScience />
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: Interactive Transformation ── */}
            <section id="transformation" className="gir-blog-section">
              <h2 className="gir-section-heading">🔄 Interactive Transformation</h2>
              <Transformation />
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: Taxonomy ── */}
            <section id="taxonomy" className="gir-blog-section">
              <h2 className="gir-section-heading">🏷️ Taxonomy — The 2025 Reclassification</h2>
              <Taxonomy />
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: Living Diversity ── */}
            <section id="diversity" className="gir-blog-section">
              <h2 className="gir-section-heading">🌍 Living Diversity</h2>
              <LivingDiversity />
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: 24-Million-Year Ancestry ── */}
            <section id="ancestry" className="gir-blog-section">
              <h2 className="gir-section-heading">🌿 The 24-Million-Year Ancestry</h2>
              <Ancestry />
            </section>

            <div className="gir-section-divider" />

            {/* ── SECTION: Evolution Timeline ── */}
            <section id="timeline" className="gir-blog-section">
              <h2 className="gir-section-heading">⏳ Complete Evolution Timeline</h2>
              <EvolutionTimeline />
            </section>
          </div>
        </main>
      </div>

      {/* BACK TO TOP */}
      <button
        className={`gir-back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to Top"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}

export default GiraffeBlogView;
