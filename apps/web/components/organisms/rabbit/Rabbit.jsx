"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, ArrowUp, Loader } from 'lucide-react';
import RabbitData from './RabbitData.json';
import './Rabbit.css';

// --- REUSABLE COMPONENTS ---

const SectionHeader = ({ title, icon }) => (
    <div className="rab-section-title">
        <span className="rab-section-marker"></span>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <span>{title}</span>
    </div>
);

const Card = ({ title, children, className = '' }) => (
    <div className={`rab-info-card ${className}`}>
        {title && <div className="rab-card-title">{title}</div>}
        {children}
    </div>
);

const Model3D = ({ src, title }) => (
    <div className="rab-model-container">
        <iframe
            key={src}
            title={title}
            className="rab-sketchfab-embed"
            src={src}
            allow="autoplay; fullscreen; vr"
            allowFullScreen
        />
    </div>
);

const Flow = ({ steps }) => (
    <div className="rab-flow-container">
        {steps.map((step, idx) => (
            <React.Fragment key={idx}>
                <div className="rab-flow-step">{step}</div>
                {idx < steps.length - 1 && <div className="rab-flow-arrow">↓</div>}
            </React.Fragment>
        ))}
    </div>
);

const PointList = ({ items }) => (
    <ul className="rab-point-list">
        {items.map((item, idx) => {
            let content = item;
            if (typeof item === 'object' && item.text) {
                if (item.strong) {
                    const parts = item.text.split(item.strong);
                    content = (
                        <>
                            {parts[0]}<strong>{item.strong}</strong>{parts[1]}
                        </>
                    );
                } else {
                    content = item.text;
                }
            }

            return (
                <li key={idx} className="rab-list-item">
                    <span className="rab-bullet"></span>
                    {content}
                </li>
            );
        })}
    </ul>
);

const Rabbit = () => {
    const [activeTab, setActiveTab] = useState('habit');
    const [reproGender, setReproGender] = useState('female');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);

    const { taxonomy, hero, models, sections } = RabbitData;

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

    // Scroll handling for Sidebar opacity and Back to Top
    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('.foo-zl-footer');
            const banner = document.querySelector('.rab-hero-banner');
            const scrollPosition = window.scrollY;

            if (banner) {
                const bannerBottom = banner.offsetHeight;
                setShowSidebar(scrollPosition > bannerBottom * 0.7);
            }

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
        const contentArea = document.querySelector('.rab-zoo-main-content');
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

    // --- MAIN RENDER ---

    return (
        <div className="rab-zoo-page">

            {/* FULL PAGE HERO BANNER */}
            <section className="rab-hero-banner">
                <div className="rab-hero-container">
                    <div className="rab-hero-content">
                        <span className="rab-taxonomy-tag">{taxonomy.tag}</span>
                        <h1 className="rab-hero-title">{hero.title}</h1>
                        <p className="rab-hero-subtitle">{hero.subtitle}</p>

                        <div className="rab-taxonomy-grid">
                            <div className="rab-tax-item">
                                <span className="rab-tax-label">Phylum</span>
                                <span className="rab-tax-value">{taxonomy.phylum}</span>
                            </div>
                            <div className="rab-tax-item">
                                <span className="rab-tax-label">Class</span>
                                <span className="rab-tax-value">{taxonomy.class}</span>
                            </div>
                            <div className="rab-tax-item">
                                <span className="rab-tax-label">Order</span>
                                <span className="rab-tax-value">{taxonomy.order}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rab-hero-visual">
                        <div className="rab-hero-image-wrapper">
                            <img loading="lazy"
                                src={hero.image}
                                alt="Rabbit"
                                className="rab-hero-img"
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="rab-scroll-indicator"
                    onClick={() => {
                        const content = document.querySelector('.rab-zoo-main-content');
                        if (content) content.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div className="rab-mouse"><div className="rab-wheel"></div></div>
                    <div className="rab-arrow-down"></div>
                </div>
            </section>

            {/* APP CONTAINER */}
            <div className="rab-zoo-app-container">

                {/* MOBILE OVERLAY */}
                <div
                    className={`rab-mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* SIDEBAR */}
                <aside
                    ref={sidebarRef}
                    className={`rab-zoo-sidebar ${isMobileMenuOpen ? 'open' : ''} ${!showSidebar ? 'hidden' : ''}`}
                    style={{ height: sidebarHeight }}
                >
                    <div className="rab-sidebar-header">
                        <div className="rab-progress-label">Progress</div>
                        <div className="rab-progress-track">
                            <div
                                className="rab-progress-fill"
                                style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <nav className="rab-sidebar-nav">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`rab-nav-btn ${activeTab === section.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(section.id)}
                            >
                                <span className="rab-nav-icon">{section.icon}</span>
                                <span>{section.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="rab-zoo-main-content">

                    {/* MOBILE TOGGLE BUTTON */}
                    <button
                        className="rab-mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="rab-content-card">

                        {/* CONTENT HEADER */}
                        <div className="rab-content-header">
                            <h2 className="rab-header-title">{sections[currentIndex].label}</h2>
                            <div className="rab-header-nav-buttons">
                                {prevSection && (
                                    <button className="rab-nav-action-btn rab-prev-btn" onClick={handlePrev}>
                                        <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Prev
                                    </button>
                                )}
                                {nextSection && (
                                    <button className="rab-nav-action-btn rab-next-btn" onClick={handleNext}>
                                        Next <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* SECTIONS */}

                        {/* 1. HABIT & HABITAT */}
                        {activeTab === 'habit' && (
                            <div className="rab-content-section">
                                <SectionHeader title="Overview" icon="" />
                                <Card>
                                    <PointList items={sections[0].overview} />
                                </Card>

                                <div className="rab-facts-grid">
                                    {sections[0].facts.map((fact, idx) => (
                                        <div key={idx} className="rab-fact-card">
                                            <span className="rab-fact-icon">{fact.icon}</span>
                                            <span className="rab-fact-label">{fact.label}</span>
                                            <span className="rab-fact-val">{fact.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. MORPHOLOGY */}
                        {activeTab === 'morphology' && (
                            <div className="rab-content-section">
                                <SectionHeader title="Body Structure" icon="" />

                                <div className="rab-split-view">
                                    <div className="rab-text-column">
                                        <Card title="Shape & Size">
                                            <PointList items={sections[1].content.shapeSize} />
                                        </Card>
                                        <Card title="Colour">
                                            <p className="rab-list-item">{sections[1].content.colour}</p>
                                        </Card>
                                        <Card title="Body-division">
                                            <p className="rab-list-item">{sections[1].content.bodyDivision}</p>
                                        </Card>
                                    </div>
                                    <Model3D src={models.morphology} title="Rabbit Morphology" />
                                </div>

                                <Card title="Head">
                                    <PointList items={sections[1].content.head} />
                                </Card>

                                <Card title="Neck">
                                    <p className="rab-list-item">{sections[1].content.neck}</p>
                                </Card>

                                <Card title="Trunk">
                                    <PointList items={sections[1].content.trunk} />
                                </Card>

                                <Card title="Tail">
                                    <p className="rab-list-item">{sections[1].content.tail}</p>
                                </Card>

                                <Card title="Integument (Skin)">
                                    <p className="rab-list-item">{sections[1].content.integument}</p>
                                </Card>

                                <Card title="Coelom (Body Cavity)" className="rab-highlight-card">
                                    <PointList items={sections[1].content.coelom} />
                                </Card>
                            </div>
                        )}

                        {/* 3. DIGESTIVE */}
                        {activeTab === 'digestive' && (
                            <div className="rab-content-section">
                                <SectionHeader title="Digestive System" icon="" />

                                <Card title="Overview">
                                    <PointList items={sections[2].content.overview} />
                                </Card>

                                <div className="rab-split-view">
                                    <div className="rab-text-column">
                                        <Card title="Alimentary Canal">
                                            <Flow steps={sections[2].content.alimentaryCanal} />
                                        </Card>
                                        <Card title="Caecum">
                                            <p className="rab-list-item">{sections[2].content.caecum}</p>
                                        </Card>
                                    </div>
                                    <Model3D src={models.digestive} title="Digestive System" />
                                </div>

                                <Card title="Digestive Glands">
                                    <PointList items={sections[2].content.digestiveGlands} />
                                </Card>

                                <Card title="Dentition in Rabbit">
                                    <PointList items={sections[2].content.dentition.details} />
                                    <div className="rab-formula-box">
                                        {sections[2].content.dentition.visual.map((item, idx) => (
                                            <React.Fragment key={idx}>
                                                <span>{item.label}</span>
                                                <div className="rab-fraction">
                                                    <span>{item.top}</span>
                                                    <span>{item.bottom}</span>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p style={{ textAlign: 'center', color: 'var(--rab-text-secondary)' }}>
                                        Rabbit - {sections[2].content.dentition.formula}
                                    </p>
                                    <p className="rab-list-item">{sections[2].content.dentition.description}</p>
                                </Card>
                            </div>
                        )}

                        {/* 4. RESPIRATORY */}
                        {activeTab === 'respiratory' && (
                            <div className="rab-content-section">
                                <SectionHeader title="Respiratory System" icon="" />

                                <Card title="Overview">
                                    <PointList items={sections[3].content.overview} />
                                </Card>

                                <div className="rab-split-view">
                                    <div className="rab-text-column">
                                        <Card title="Lungs">
                                            <div className="rab-facts-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                                {sections[3].content.lungs.map((lung, idx) => (
                                                    <div key={idx} className="rab-fact-card">
                                                        <span className="rab-fact-label">{lung.label}</span>
                                                        <span className="rab-fact-val">{lung.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                        <Card title="Pleura">
                                            <p className="rab-list-item">{sections[3].content.pleura}</p>
                                        </Card>
                                    </div>
                                    <Model3D src={models.respiratory} title="Respiratory System" />
                                </div>

                                <Card title="Air Pathway">
                                    <div className="rab-flow-container rab-flow-horizontal">
                                        {sections[3].content.pathway.map((step, idx) => (
                                            <React.Fragment key={idx}>
                                                <div className="rab-flow-step">{step}</div>
                                                {idx < sections[3].content.pathway.length - 1 && (
                                                    <div className="rab-flow-arrow rab-flow-arrow-h">→</div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </Card>

                                <Card title="Respiratory Structures">
                                    <PointList items={sections[3].content.details} />
                                </Card>

                                <Card title="The Breathing Process">
                                    <PointList items={sections[3].content.breathing} />
                                </Card>
                            </div>
                        )}

                        {activeTab === 'circulatory' && (
                            <div className="rab-content-section">
                                <SectionHeader title="Circulatory System" icon="" />

                                <div className="rab-split-view">
                                    <div className="rab-text-column">
                                        <Card title="Overview">
                                            <p className="rab-list-item">{sections[4].content.overview}</p>
                                        </Card>
                                        <Card title="Valves & Openings">
                                            <PointList items={sections[4].content.valves} />
                                        </Card>
                                    </div>
                                    <Model3D src={models.circulatory} title="Circulatory System" />
                                </div>

                                <Card title="Blood Circulation">
                                    <PointList items={sections[4].content.circulation} />
                                </Card>
                            </div>
                        )}

                        {/* 6. NERVOUS */}
                        {activeTab === 'nervous' && (
                            <div className="rab-content-section">
                                <SectionHeader title="Nervous System" icon="" />

                                <Card title="Overview">
                                    <PointList items={sections[5].overview} />
                                </Card>

                                <div className="rab-facts-grid">
                                    {sections[5].facts.map((fact, idx) => (
                                        <div key={idx} className="rab-fact-card">
                                            <span className="rab-fact-label">{fact.label}</span>
                                            <span className="rab-fact-val">{fact.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <Card title="Brain - Structure & Protection">
                                    <PointList items={sections[5].brainDetails} />
                                </Card>

                                <Card title="Major Regions & Components">
                                    <PointList items={sections[5].brainRegions} />
                                </Card>
                            </div>
                        )}


                        {/* 7. URINOGENITAL */}
                        {activeTab === 'urinogenital' && (
                            <div className="rab-content-section">
                                <SectionHeader title="Urinogenital System" icon="" />

                                <Card title="Overview">
                                    <PointList items={sections[6].content.overview} />
                                </Card>

                                <div className="rab-split-view">
                                    <div className="rab-text-column">
                                        <Card title="Excretory System">
                                            <p className="rab-list-item">{sections[6].content.excretory}</p>
                                        </Card>

                                        <Card title="The Reproductive System">
                                            <p className="rab-list-item" style={{ marginBottom: '1rem' }}>{sections[6].content.reproGeneral}</p>
                                            <div className="rab-toggle-group">
                                                <button
                                                    className={`rab-toggle-btn ${reproGender === 'male' ? 'active' : ''}`}
                                                    onClick={() => setReproGender('male')}
                                                >
                                                    <span>♂ Male</span>
                                                </button>
                                                <button
                                                    className={`rab-toggle-btn ${reproGender === 'female' ? 'active' : ''}`}
                                                    onClick={() => setReproGender('female')}
                                                >
                                                    <span>♀ Female</span>
                                                </button>
                                            </div>

                                            {reproGender === 'male' && (
                                                <PointList items={sections[6].content.reproductive.male} />
                                            )}
                                        </Card>
                                    </div>
                                    <Model3D
                                        src={reproGender === 'male' ? models.reproMale : models.reproFemale}
                                        title={`Reproductive System (${reproGender})`}
                                    />
                                </div>

                                {reproGender === 'female' && (
                                    <>
                                        <Card title="Anatomy & Structure">
                                            <PointList items={sections[6].content.reproductive.female} />
                                        </Card>

                                        <Card title="Common Passageways">
                                            <PointList items={sections[6].content.commonPassageways} />
                                        </Card>

                                        <Card title="Accessory Glands">
                                            <PointList items={sections[6].content.femaleGlands} />
                                        </Card>
                                    </>
                                )}

                                <Card title="General Biological Facts" className="rab-highlight-card">
                                    <PointList items={sections[6].content.generalFacts} />
                                </Card>
                            </div>
                        )}

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
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'var(--rab-primary)',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: showBackToTop ? 1 : 0,
                    pointerEvents: showBackToTop ? 'auto' : 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 90
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <ArrowUp size={24} />
            </button>

        </div>
    );
};

export default Rabbit;
