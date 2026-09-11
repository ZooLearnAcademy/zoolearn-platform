"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ChevronLeft, ChevronRight, ArrowUp,
  Tag, Bug, Search, Ruler, Layers, Footprints,
  Droplets, Wind, HeartPulse, Brain, Trash2, Dna, Syringe
} from 'lucide-react';
import "./leech.css";
import "./sections/sections-responsive.css";

// Import Sections
import Taxonomy from "./sections/Taxonomy";
import ExternalMorphology from "./sections/ExternalMorphology";
import BodyWall from "./sections/BodyWall";
import Locomotion from "./sections/Locomotion";
import DigestiveSystem from "./sections/DigestiveSystem";
import RespiratorySystem from "./sections/RespiratorySystem";
import CirculatorySystem from "./sections/CirculatorySystem";
import NervousSystem from "./sections/NervousSystem";
import ExcretorySystem from "./sections/ExcretorySystem";
import ReproductiveSystem from "./sections/ReproductiveSystem";
import ParasiticAdaptations from "./sections/ParasiticAdaptations";
import LeechAnatomyInteractive from "./sections/LeechAnotomyInteractive";

export default function LeechLayout() {
  const [activeTab, setActiveTab] = useState('taxonomy');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  // Section Definitions
  const sections = [
    { id: 'taxonomy', label: 'Taxonomy', icon: <Tag size={18} />, component: <Taxonomy /> },
    { id: 'morphology', label: 'External Morphology', icon: <Bug size={18} />, component: <ExternalMorphology /> },
    { id: 'anatomy', label: 'Interactive Anatomy', icon: <Search size={18} />, component: <LeechAnatomyInteractive /> },
    { id: 'bodywall', label: 'Body Wall', icon: <Layers size={18} />, component: <BodyWall /> },
    { id: 'locomotion', label: 'Locomotion', icon: <Footprints size={18} />, component: <Locomotion /> },
    { id: 'digestive', label: 'Digestive System', icon: <Droplets size={18} />, component: <DigestiveSystem /> },
    { id: 'respiratory', label: 'Respiratory System', icon: <Wind size={18} />, component: <RespiratorySystem /> },
    { id: 'circulatory', label: 'Circulatory System', icon: <HeartPulse size={18} />, component: <CirculatorySystem /> },
    { id: 'nervous', label: 'Nervous System', icon: <Brain size={18} />, component: <NervousSystem /> },
    { id: 'excretory', label: 'Excretory System', icon: <Trash2 size={18} />, component: <ExcretorySystem /> },
    { id: 'reproductive', label: 'Reproductive System', icon: <Dna size={18} />, component: <ReproductiveSystem /> },
    { id: 'parasitic', label: 'Parasitic Adaptations', icon: <Syringe size={18} />, component: <ParasiticAdaptations /> },
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Helper functions for navigation
  const currentIndex = sections.findIndex(s => s.id === activeTab);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  const handlePrev = () => { if (prevSection) setActiveTab(prevSection.id); };
  const handleNext = () => { if (nextSection) setActiveTab(nextSection.id); };

  // Scroll handling for Sidebar and Back to Top
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      const banner = document.querySelector('.leech-hero-banner');
      const scrollPosition = window.scrollY;

      // Show sidebar when scrolled past 70% of banner
      if (banner) {
        const bannerBottom = banner.offsetHeight;
        setShowSidebar(scrollPosition > bannerBottom * 0.7);
      }

      // Show back to top button after scrolling 400px
      setShowBackToTop(scrollPosition > 400);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Smooth scroll to content top when tab changes
  useEffect(() => {
    const contentArea = document.querySelector('.leech-zoo-main-content');
    if (contentArea) {
      const headerHeight = 80;
      const elementPosition = contentArea.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      if (window.scrollY > offsetPosition) {
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div className="leech-zoopage">

      {/* ─── FULL PAGE HERO BANNER ─── */}
      <section className="leech-hero-banner">
        <div className="leech-hero-container">

          {/* LEFT: Text Content */}
          <div className="leech-hero-content">
            <span className="leech-taxonomy-tag">Phylum Annelida · Class Hirudinea</span>
            <h1 className="leech-hero-title">Indian Cattle Leech</h1>
            <p className="leech-hero-subtitle">Hirudinaria granulosa</p>

            <div className="leech-taxonomy-grid">
              <div className="leech-tax-item">
                <span className="leech-tax-label">Habitat</span>
                <span className="leech-tax-value">Freshwater</span>
              </div>
              <div className="leech-tax-item">
                <span className="leech-tax-label">Diet</span>
                <span className="leech-tax-value">Sanguivorous</span>
              </div>
              <div className="leech-tax-item">
                <span className="leech-tax-label">Region</span>
                <span className="leech-tax-value">South Asia</span>
              </div>
            </div>

            <p className="leech-hero-description">
              An ectoparasitic annelid inhabiting ponds, swamps, and lakes across the Indian subcontinent.
              Known for its anticoagulant secretion <em>hirudin</em>, used in modern medicine and microsurgery.
            </p>

            {/* Quick Stats */}
             
          </div>

          {/* RIGHT: Hero Image */}
          <div className="leech-hero-visual">
            <div className="leech-hero-image-wrapper">
              <img loading="lazy"
                src="https://res.cloudinary.com/duibfmcw1/image/upload/f_auto,q_auto,w_600/v1767810091/image_yibxxk.jpg"
                alt="Indian Cattle Leech - Hirudinaria granulosa"
                className="leech-hero-img"
              />
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="leech-hero-bottom-fade"></div>

        {/* Scroll Indicator */}
        <div
          className="leech-scroll-indicator"
          onClick={() => {
            const content = document.querySelector('.leech-zoo-main-content');
            if (content) content.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="leech-mouse"><div className="leech-wheel"></div></div>
          <div className="leech-arrow-down"></div>
        </div>
      </section>

      {/* ─── APP CONTAINER ─── */}
      <div className="leech-zoo-app-container">

        {/* MOBILE OVERLAY */}
        <div
          className={`leech-mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* SIDEBAR */}
        <aside
          ref={sidebarRef}
          className={`leech-zoo-sidebar ${isMobileMenuOpen ? 'open' : ''} ${!showSidebar ? 'hidden' : ''}`}
          style={{ height: sidebarHeight }}
        >
          <div className="leech-sidebar-header">
            <div className="leech-progress-label">Progress</div>
            <div className="leech-progress-track">
              <div
                className="leech-progress-fill"
                style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          <nav className="leech-sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`leech-nav-btn ${activeTab === section.id ? 'active' : ''}`}
                onClick={() => setActiveTab(section.id)}
              >
                <span className="leech-nav-icon">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="leech-zoo-main-content">

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="leech-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>

          <div className="leech-content-card">

            {/* CONTENT HEADER */}
            <div className="leech-content-header">
              <h2 className="leech-header-title">{sections[currentIndex].label}</h2>
              <div className="leech-header-nav-buttons">
                {prevSection && (
                  <button className="leech-nav-action-btn leech-prev-btn" onClick={handlePrev}>
                    &larr; Prev
                  </button>
                )}
                {nextSection && (
                  <button className="leech-nav-action-btn leech-next-btn" onClick={handleNext}>
                    Next &rarr;
                  </button>
                )}
              </div>
            </div>

            {/* RENDER ACTIVE COMPONENT */}
            <div className="leech-component-wrapper">
              {sections[currentIndex].component}
            </div>

          </div>
        </main>
      </div>

      {/* BACK TO TOP */}
      <button
        className={`patt-back-to-top ${showBackToTop ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--leech-primary), var(--leech-primary-vivid, #65a30d))',
          color: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'auto' : 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 6px 20px rgba(61,107,10,0.25)',
          zIndex: 90
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={22} />
      </button>

    </div>
  );
}
