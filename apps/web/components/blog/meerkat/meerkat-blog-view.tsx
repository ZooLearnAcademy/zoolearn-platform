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
  Users,
  Shield,
  Clock,
  List,
} from "lucide-react";
import "./meerkat.css";

// Import Sections
import SurvivalAdaptations from "./sections/SurvivalAdaptations";
import BackStripes from "./sections/BackStripes";
import AltruismScience from "./sections/AltruismScience";
import DailyRoutine from "./sections/DailyRoutine";
import Taxonomy from "./sections/Taxonomy";
import LivingDiversity from "./sections/LivingDiversity";
import Ancestry from "./sections/Ancestry";
import EvolutionTimeline from "./sections/EvolutionTimeline";
import SocialSentinels from "./sections/SocialSentinels";
import DietMechanics from "./sections/DietMechanics";

export function MeerkatBlogView() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState("calc(100vh - 120px)");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("meerkat-day");
  const [progress, setProgress] = useState(0);
  const sidebarRef = useRef<HTMLElement | null>(null);

  const sections = [
    { id: "meerkat-day", label: "World Meerkat Day", icon: <CalendarDays size={18} /> },
    { id: "meet-meerkat", label: "Meet the Meerkat", icon: <Heart size={18} /> },
    { id: "roles", label: "Cooperative Roles", icon: <Users size={18} /> },
    { id: "adaptations", label: "Biological Marvels", icon: <Bone size={18} /> },
    { id: "diet", label: "Diet & Foraging", icon: <Shield size={18} /> },
    { id: "stripes", label: "Back Striping", icon: <Tag size={18} /> },
    { id: "altruism", label: "Science of Altruism", icon: <GitBranch size={18} /> },
    { id: "routine", label: "Daily Routine", icon: <Clock size={18} /> },
    { id: "taxonomy", label: "Taxonomy & Evolution", icon: <Tag size={18} /> },
    { id: "diversity", label: "Living Subspecies", icon: <List size={18} /> },
    { id: "ancestry", label: "15-Million-Year Ancestry", icon: <GitBranch size={18} /> },
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

  // Scroll spy + sidebar visibility + scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".foo-zl-footer");
      const banner = document.querySelector(".meer-hero-banner") as HTMLElement | null;
      const scrollPosition = window.scrollY;

      // Show sidebar when scrolled past banner
      if (banner) {
        const bannerBottom = banner.offsetHeight;
        setShowSidebar(scrollPosition > bannerBottom * 0.7);
      }

      setShowBackToTop(scrollPosition > 400);

      // Smooth reading progress through the page scroll
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollPosition / docHeight) * 100 : 0;
      setProgress(scrollPercent);

      // Scroll spy: detect active section
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

      // Sidebar footer collision calculation
      if (!footer || !sidebarRef.current) return;
      const headerHeight = 80;
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (footerRect.top < viewportHeight) {
        const newHeight = Math.max(footerRect.top - headerHeight - 40, 100);
        setSidebarHeight(`${newHeight}px`);
      } else {
        setSidebarHeight(`calc(100vh - ${headerHeight + 40}px)`);
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

  return (
    <div className="meer-zoopage">
      {/* ─── HERO BANNER ─── */}
      <section className="meer-hero-banner" id="meerkat-day">
        <div className="meer-hero-container">
          <div className="meer-hero-content">
            <span className="meer-taxonomy-tag">July 3 · World Meerkat Day</span>
            <h1 className="meer-hero-title">World Meerkat Day</h1>
            <p className="meer-hero-subtitle">Celebrating the Social Sentinels of the Desert</p>

            <div className="meer-taxonomy-grid">
              <div className="meer-tax-item">
                <span className="meer-tax-label">Weight</span>
                <span className="meer-tax-value">730 g</span>
              </div>
              <div className="meer-tax-item">
                <span className="meer-tax-label">Lifespan</span>
                <span className="meer-tax-value">12-14 yrs</span>
              </div>
              <div className="meer-tax-item">
                <span className="meer-tax-label">Speed</span>
                <span className="meer-tax-value">32 km/h</span>
              </div>
              <div className="meer-tax-item">
                <span className="meer-tax-label">Group Size</span>
                <span className="meer-tax-value">Up to 50</span>
              </div>
            </div>

            <p className="meer-hero-description">
              Masters of collaboration, these small mammals conquer the harsh Kalahari Desert through complex social
              structures, altruistic behavior, and sophisticated vocal communication.
            </p>
          </div>

          <div className="meer-hero-visual">
            <div className="meer-hero-image-wrapper">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783938438/meeerkatbannerimage_zybmne.png"
                alt="Meerkat Hero"
                className="meer-hero-img"
              />
            </div>
          </div>
        </div>

        <div className="meer-hero-bottom-fade"></div>

        <div className="meer-scroll-indicator" onClick={() => scrollToSection("meet-meerkat")}>
          <div className="meer-mouse">
            <div className="meer-wheel"></div>
          </div>
          <div className="meer-arrow-down"></div>
        </div>
      </section>

      {/* ─── APP CONTAINER ─── */}
      <div className="meer-zoo-app-container">
        {/* MOBILE OVERLAY */}
        <div
          className={`meer-mobile-overlay ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* SIDEBAR */}
        <aside
          ref={sidebarRef}
          className={`meer-zoo-sidebar ${isMobileMenuOpen ? "open" : ""} ${!showSidebar ? "hidden" : ""}`}
          style={{ height: sidebarHeight }}
        >
          <div className="meer-sidebar-header">
            <div className="meer-progress-track">
              <div className="meer-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="meer-sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`meer-nav-btn ${activeSection === section.id ? "active" : ""}`}
                onClick={() => scrollToSection(section.id)}
              >
                <span className="meer-nav-icon">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="meer-zoo-main-content">
          <button
            className="meer-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>

          <div className="meer-content-card">
            {/* ── SECTION: Why World Meerkat Day ── */}
            <section id="meerkat-day-info" className="meer-blog-section">
              <h2 className="meer-section-heading">Why World Meerkat Day?</h2>
              <div className="meer-section-box">
                {/* Large Banner Image */}
                <div className="meer-section-banner-wrapper">
                  <img
                    src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783848173/for_2nd_page_new_pcntuw.jpg"
                    alt="World Meerkat Day Banner"
                  />
                </div>

                <h3 className="meer-section-title">July 3rd — Celebrating the Desert&apos;s Cooperators</h3>
                <p className="meer-section-text">
                  <strong>World Meerkat Day</strong> is celebrated annually on <strong>July 3rd</strong>. This day is
                  dedicated to raising awareness about these incredible, highly social animals and the desert ecosystems
                  they call home.
                </p>
                <p className="meer-section-text">
                  Meerkats teach us valuable lessons about teamwork, altruism, and collective responsibility. By
                  understanding how they survive the harsh desert conditions through collaboration, we can appreciate the
                  complex web of life in the Kalahari.
                </p>

                {/* Gallery */}
                <div className="meer-day-gallery">
                  <div className="meer-gallery-item">
                    <img
                      src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783845296/meerkat_new11_e2c1ro.jpg"
                      alt="Meerkat Family"
                    />
                  </div>
                  <div className="meer-gallery-item">
                    <img
                      src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783845257/meerkat_new10_ppvzzp.jpg"
                      alt="Meerkat Lookout"
                    />
                  </div>
                </div>

                <div
                  className="meer-day-highlights"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    marginTop: "30px",
                  }}
                >
                  <div
                    className="meer-day-card"
                    style={{
                      background: "var(--meer-bg-card, #ffffff)",
                      padding: "20px",
                      borderRadius: "12px",
                      border: "1px solid var(--meer-border)",
                      textAlign: "center",
                      boxShadow: "var(--meer-shadow-soft)",
                    }}
                  >
                    <span
                      className="meer-day-icon"
                      style={{ display: "block", marginBottom: "10px", color: "var(--meer-primary)" }}
                    >
                      <CalendarDays size={32} />
                    </span>
                    <h4 style={{ color: "var(--meer-primary-dark)", marginBottom: "10px" }}>When?</h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--meer-text-secondary)", lineHeight: "1.5" }}>
                      July 3rd every year — a special day dedicated to the Suricata genus
                    </p>
                  </div>
                  <div
                    className="meer-day-card"
                    style={{
                      background: "var(--meer-bg-card, #ffffff)",
                      padding: "20px",
                      borderRadius: "12px",
                      border: "1px solid var(--meer-border)",
                      textAlign: "center",
                      boxShadow: "var(--meer-shadow-soft)",
                    }}
                  >
                    <span
                      className="meer-day-icon"
                      style={{ display: "block", marginBottom: "10px", color: "var(--meer-primary)" }}
                    >
                      <Users size={32} />
                    </span>
                    <h4 style={{ color: "var(--meer-primary-dark)", marginBottom: "10px" }}>Why Celebrate?</h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--meer-text-secondary)", lineHeight: "1.5" }}>
                      To honor their unmatched cooperation, intricate communication, and community survival instincts
                    </p>
                  </div>
                  <div
                    className="meer-day-card"
                    style={{
                      background: "var(--meer-bg-card, #ffffff)",
                      padding: "20px",
                      borderRadius: "12px",
                      border: "1px solid var(--meer-border)",
                      textAlign: "center",
                      boxShadow: "var(--meer-shadow-soft)",
                    }}
                  >
                    <span
                      className="meer-day-icon"
                      style={{ display: "block", marginBottom: "10px", color: "var(--meer-primary)" }}
                    >
                      <Shield size={32} />
                    </span>
                    <h4 style={{ color: "var(--meer-primary-dark)", marginBottom: "10px" }}>Our Mission</h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--meer-text-secondary)", lineHeight: "1.5" }}>
                      Support habitat protection and address challenges like severe Kalahari droughts
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Meet the Meerkat ── */}
            <section id="meet-meerkat" className="meer-blog-section">
              <h2 className="meer-section-heading">Meet the Meerkat</h2>

              <div className="meer-section-box meer-horizontal-layout">
                <div className="meer-horizontal-text">
                  <h3 className="meer-section-title">The Collaborative Carnivore</h3>
                  <p className="meer-section-text">
                    Meerkats (<em>Suricata suricatta</em>) are small foraging carnivores belonging to the mongoose family
                    (Herpestidae). They are highly recognizable by their upright sentinel posture and are native to the
                    Kalahari Desert in Botswana, the Namib Desert in Namibia, southwestern Angola, and South Africa.
                  </p>
                  <p className="meer-section-text">
                    They possess slender bodies, long legs, and a distinctive tail that helps them balance when standing
                    upright. Meerkats have a broad head, large eyes, a pointed snout, and small crescent-shaped ears. The
                    color of their coat varies depending on their geographical location, ranging from light fawn to
                    silvery-brown, which helps them blend seamlessly into their arid, dusty environment.
                  </p>
                  <p className="meer-section-text">
                    A group of meerkats is called a &quot;mob&quot;, &quot;gang&quot;, or &quot;clan&quot;. While a typical clan contains around 20
                    meerkats, some super-families have been known to grow up to 50 members. These clans are tightly knit
                    and highly territorial, constantly defending their home range from rival meerkat mobs.
                  </p>
                </div>
                <div
                  className="meer-horizontal-image-wrapper"
                  style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}
                >
                  <img
                    src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783848684/for_3rd_image_wxokzt.jpg"
                    alt="Meet the Meerkat"
                    className="meer-horizontal-image"
                    style={{
                      height: "auto",
                      maxHeight: "230px",
                      objectFit: "contain",
                      objectPosition: "center",
                      width: "100%",
                      border: "2px solid var(--meer-primary)",
                      padding: "4px",
                      background: "#ffffff",
                      borderRadius: "12px",
                    }}
                  />
                  <img
                    src="https://res.cloudinary.com/duibfmcw1/image/upload/v1783849239/for_3rd_page_2_cbzbon.jpg"
                    alt="Meet the Meerkat Scene"
                    className="meer-horizontal-image"
                    style={{
                      height: "auto",
                      maxHeight: "230px",
                      objectFit: "contain",
                      objectPosition: "center",
                      width: "100%",
                      border: "2px solid var(--meer-primary)",
                      padding: "4px",
                      background: "#ffffff",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              </div>

              <div className="meer-meet-stats">
                <div className="meer-stat-card">
                  <span className="meer-stat-number">12 in</span>
                  <span className="meer-stat-desc">Body Length</span>
                </div>
                <div className="meer-stat-card">
                  <span className="meer-stat-number">10 in</span>
                  <span className="meer-stat-desc">Tail Length</span>
                </div>
                <div className="meer-stat-card">
                  <span className="meer-stat-number">30+</span>
                  <span className="meer-stat-desc">Distinct Calls</span>
                </div>
                <div className="meer-stat-card">
                  <span className="meer-stat-number">4</span>
                  <span className="meer-stat-desc">Toes per Foot</span>
                </div>
              </div>
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Cooperative Roles ── */}
            <section id="roles" className="meer-blog-section">
              <h2 className="meer-section-heading">Cooperative Social Roles</h2>
              <SocialSentinels />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Biological Marvels ── */}
            <section id="adaptations" className="meer-blog-section">
              <h2 className="meer-section-heading">Biological Marvels</h2>
              <SurvivalAdaptations />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Diet & Foraging ── */}
            <section id="diet" className="meer-blog-section">
              <h2 className="meer-section-heading">Diet &amp; Foraging</h2>
              <DietMechanics />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Back Striping ── */}
            <section id="stripes" className="meer-blog-section">
              <h2 className="meer-section-heading">Back Striping Patterns</h2>
              <BackStripes />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Science of Altruism ── */}
            <section id="altruism" className="meer-blog-section">
              <h2 className="meer-section-heading">Science of Altruism</h2>
              <AltruismScience />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Daily Routine ── */}
            <section id="routine" className="meer-blog-section">
              <h2 className="meer-section-heading">A Day in the Life</h2>
              <DailyRoutine />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Taxonomy ── */}
            <section id="taxonomy" className="meer-blog-section">
              <h2 className="meer-section-heading">Taxonomy &amp; Evolution</h2>
              <Taxonomy />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Living Subspecies ── */}
            <section id="diversity" className="meer-blog-section">
              <h2 className="meer-section-heading">Living Subspecies</h2>
              <LivingDiversity />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Ancestry ── */}
            <section id="ancestry" className="meer-blog-section">
              <h2 className="meer-section-heading">15-Million-Year Ancestry</h2>
              <Ancestry />
            </section>

            <div className="meer-section-divider" />

            {/* ── SECTION: Evolution Timeline ── */}
            <section id="timeline" className="meer-blog-section">
              <h2 className="meer-section-heading">Mongoose Evolution Timeline</h2>
              <EvolutionTimeline />
            </section>
          </div>
        </main>
      </div>

      <button
        className={`meer-back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}

export default MeerkatBlogView;
