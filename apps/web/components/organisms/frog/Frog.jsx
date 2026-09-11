"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    ArrowUp,
    Loader,
    BookOpen,
    Eye,
    Utensils,
    Activity,
    Heart,
    Brain,
    Droplet,
    Dna,
    TrendingUp,
    Thermometer,
    Home,
    Sun,
    Snowflake,
    Waves,
    Sprout,
    Leaf,
    Pill,
    Shield,
    RefreshCw,
    History,
    Globe,
    Layers,
    Image,
    Lightbulb
} from 'lucide-react';
import FrogData from './FrogData.json';
import './Frog.css';

// --- ICON MAP & HELPER ---
const iconMap = {
    // Sections
    classification: BookOpen,
    morphology: Eye,
    digestive: Utensils,
    respiratory: Activity,
    circulatory: Heart,
    nervous: Brain,
    excretory: Droplet,
    reproductive: Dna,
    economic: TrendingUp,

    // Classification Facts
    Thermometer: Thermometer,
    Home: Home,
    Sun: Sun,
    Snowflake: Snowflake,
    Waves: Waves,
    Droplet: Droplet,

    // Economic Categories
    Sprout: Sprout,
    Leaf: Leaf,
    Utensils: Utensils,
    Pill: Pill,
    Shield: Shield,

    // Economic Facts
    Dna: Dna,
    RefreshCw: RefreshCw,
    History: History,
    Globe: Globe,
    Layers: Layers,

    // Other
    Lightbulb: Lightbulb,
    Image: Image
};

const Icon = ({ name, size = 20, className = '', style = {} }) => {
    const IconComponent = iconMap[name];
    if (!IconComponent) return null;
    return <IconComponent size={size} className={className} style={style} />;
};

// --- REUSABLE COMPONENTS ---

const SectionHeader = ({ title, icon }) => (
    <div className="frog-section-title">
        <span className="frog-section-marker"></span>
        {icon && (
            <span style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
                <Icon name={icon} size={22} />
            </span>
        )}
        <span>{title}</span>
    </div>
);

const Card = ({ title, children, className = '' }) => (
    <div className={`frog-info-card ${className}`}>
        {title && <div className="frog-card-title">{title}</div>}
        {children}
    </div>
);

const Model3D = ({ src, title }) => {
    if (!src) return null;
    return (
        <div className="frog-model-container">
            <iframe
                key={src}
                title={title}
                className="frog-sketchfab-embed"
                src={src}
                allow="autoplay; fullscreen; vr"
                allowFullScreen
            />
        </div>
    );
};

const ModelLoading = ({ title, className = '', style = {} }) => (
    <div className={`frog-model-container frog-model-loading-state ${className}`} style={style}>
        <div className="frog-model-loading-inner">
            <div className="frog-model-loading-icon">
                <Loader size={32} className="frog-spinner" />
            </div>
            <p className="frog-model-loading-text">Loading 3D model</p>
            <div className="frog-model-loading-bar">
                <div className="frog-model-loading-bar-fill" />
            </div>
            <p className="frog-model-loading-subtext">{title}</p>
        </div>
    </div>
);

const ImagePlaceholder = ({ label }) => (
    <div style={{
        position: 'sticky',
        top: '120px',
        height: '350px',
        background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        border: '2px dashed rgba(22, 163, 74, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        color: 'rgba(22, 163, 74, 0.6)',
        fontSize: '0.9rem',
        fontWeight: '600',
        textAlign: 'center',
        padding: '1rem'
    }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', color: '#16a34a' }}>
            <Icon name="Image" size={48} />
        </span>
        <span>{label}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: '400', color: '#94a3b8' }}>Image will be added here</span>
    </div>
);

const FrogImage = ({ src, label, className = '', style = {} }) => {
    if (!src) return <ImagePlaceholder label={label} />;
    return (
        <div className={`frog-image-card ${className}`} style={style}>
            <div className="frog-image-container">
                <img loading="lazy" src={src} alt={label} className="frog-content-img" />
            </div>
            <div className="frog-image-caption">
                <span className="frog-image-caption-prefix">Figure: </span>
                <span className="frog-image-caption-text">{label}</span>
            </div>
        </div>
    );
};

const CardImage = ({ src, alt }) => {
    if (!src) return null;
    return (
        <div className="frog-card-image-container">
            <img loading="lazy" src={src} alt={alt} className="frog-card-content-img" />
            <div className="frog-card-image-caption">
                <span className="frog-card-image-caption-prefix">Figure: </span>
                <span className="frog-card-image-caption-text">{alt}</span>
            </div>
        </div>
    );
};

const Flow = ({ steps }) => {
    if (!steps || !steps.length) return null;
    return (
        <div className="frog-flow-container">
            {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                    <div className="frog-flow-step">{step}</div>
                    {idx < steps.length - 1 && <div className="frog-flow-arrow">↓</div>}
                </React.Fragment>
            ))}
        </div>
    );
};

const PointList = ({ items }) => {
    if (!items || !items.length) return null;
    return (
        <ul className="frog-point-list">
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
                    <li key={idx} className="frog-list-item">
                        <span className="frog-bullet"></span>
                        {content}
                    </li>
                );
            })}
        </ul>
    );
};

const Frog = () => {
    const [activeTab, setActiveTab] = useState('classification');
    const [activeGender, setActiveGender] = useState('male');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);

    const { taxonomy, hero, models, sections } = FrogData;

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
            const banner = document.querySelector('.frog-hero-banner');
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
        const contentArea = document.querySelector('.frog-zoo-main-content');
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

    // Render active tab content
    const renderActiveContent = () => {
        const currentSection = sections[currentIndex];
        
        switch (activeTab) {
            case 'classification':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="Classification of Rana tigrina" icon="classification" />

                        {/* Classification Intro */}
                        <Card title="Systematic Position">
                            <p className="frog-list-item" style={{ marginBottom: '1rem' }}>
                                {currentSection.classificationIntro}
                            </p>
                            <div className="frog-facts-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                                {currentSection.systematicPosition?.map((item, idx) => (
                                    <div key={idx} className="frog-fact-card">
                                        <span className="frog-fact-label">{item.rank}</span>
                                        <span className="frog-fact-val">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Habitat & Environment */}
                        <SectionHeader title="Habitat & Environment" icon="" />
                        <Card>
                            <ul className="frog-point-list" style={{ gap: '1.25rem' }}>
                                {currentSection.habitat?.map((item, idx) => {
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
                                        <li key={idx} className="frog-list-item">
                                            <span className="frog-bullet"></span>
                                            <span>{content}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Card>

                        {/* Skin Note */}
                        <Card title="Skin & Water Absorption" className="frog-highlight-card">
                            <p className="frog-list-item">
                                <span className="frog-bullet"></span>
                                {currentSection.skinNote}
                            </p>
                        </Card>

                        {/* Quick Facts Grid */}
                        <div className="frog-facts-grid">
                            {currentSection.facts?.map((fact, idx) => (
                                <div key={idx} className="frog-fact-card">
                                    <span className="frog-fact-icon">
                                        <Icon name={fact.icon} size={22} style={{ color: 'var(--frog-primary)' }} />
                                    </span>
                                    <span className="frog-fact-label">{fact.label}</span>
                                    <span className="frog-fact-val">{fact.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'morphology':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="External Morphology" icon="morphology" />
                        <Card>
                            <p className="frog-list-item">{currentSection.intro}</p>
                        </Card>

                        {/* Body Division + Main Image */}
                        <div className="frog-split-view">
                            <div className="frog-text-column">
                                <SectionHeader title={currentSection.bodyDivision.title} />
                                {currentSection.bodyDivision.subsections.map((sub, idx) => (
                                    <Card key={idx} title={sub.subtitle}>
                                        <PointList items={sub.points} />
                                    </Card>
                                ))}
                            </div>
                            <FrogImage src={currentSection.images?.morphologyMain} label="External Morphology of Frog" />
                        </div>

                        {/* Skin Characteristics */}
                        <SectionHeader title={currentSection.skin.title} />
                        {currentSection.skin.subsections.map((sub, idx) => (
                            <Card key={idx} title={sub.subtitle}>
                                <PointList items={sub.points} />
                            </Card>
                        ))}

                        {/* Head Features */}
                        <SectionHeader title={currentSection.head.title} />
                        <Card>
                            <div className="frog-card-split-layout">
                                <div className="frog-card-text-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {currentSection.head.subsections.map((sub, idx) => (
                                        <div key={idx} style={{ borderBottom: idx < currentSection.head.subsections.length - 1 ? '1px dashed var(--frog-border-color)' : 'none', paddingBottom: idx < currentSection.head.subsections.length - 1 ? '0.75rem' : 0 }}>
                                            <div className="frog-card-title" style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.4rem' }}>
                                                {sub.subtitle}
                                            </div>
                                            <PointList items={sub.points} />
                                        </div>
                                    ))}
                                </div>
                                <div className="frog-card-img-col">
                                    <FrogImage src={currentSection.images?.headFeatures} label="Head Features" />
                                </div>
                            </div>
                        </Card>

                        {/* Appendages (Limbs) */}
                        <SectionHeader title={currentSection.appendages.title} />
                        {currentSection.appendages.subsections.map((sub, idx) => (
                            <Card key={idx} title={sub.subtitle}>
                                <PointList items={sub.points} />
                            </Card>
                        ))}

                        {/* Sexual Dimorphism */}
                        <SectionHeader title={currentSection.sexualDimorphism.title} />
                        <Card>
                            <p className="frog-list-item">{currentSection.sexualDimorphism.intro}</p>
                        </Card>
                        {currentSection.sexualDimorphism.subsections.map((sub, idx) => {
                            if (sub.imageKey) {
                                return (
                                    <Card key={idx} title={sub.subtitle}>
                                        <div className="frog-card-split-layout">
                                            <div className="frog-card-text-col">
                                                <PointList items={sub.points} />
                                            </div>
                                            <div className="frog-card-img-col">
                                                <FrogImage src={currentSection.images?.[sub.imageKey]} label={sub.subtitle} />
                                            </div>
                                        </div>
                                    </Card>
                                );
                            }
                            return (
                                <Card key={idx} title={sub.subtitle}>
                                    <PointList items={sub.points} />
                                </Card>
                            );
                        })}
                    </div>
                );

            case 'digestive':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="Digestive System" icon="digestive" />
                        
                        {/* Intro */}
                        <Card>
                            <p className="frog-list-item">{currentSection.intro}</p>
                        </Card>

                        {/* Alimentary Canal */}
                        <div className="frog-split-view">
                            <div className="frog-text-column">
                                <SectionHeader title={currentSection.alimentaryCanal?.title} />
                                <Card>
                                    <p className="frog-list-item" style={{ marginBottom: '1.25rem' }}>
                                        {currentSection.alimentaryCanal?.description}
                                    </p>
                                    {currentSection.alimentaryCanal?.subsections.map((sub, idx) => (
                                        <div key={idx} style={{ marginBottom: '1.25rem' }}>
                                            <div className="frog-card-title" style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}>
                                                {sub.subtitle}
                                            </div>
                                            <PointList items={sub.points} />
                                        </div>
                                    ))}
                                </Card>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {models.digestive ? (
                                    <Model3D src={models.digestive} title="Frog Digestive System" />
                                ) : (
                                    <FrogImage src={currentSection.images?.digestive} label="Digestive System" />
                                )}
                                <Card title="Alimentary Canal Path">
                                    <Flow steps={currentSection.alimentaryCanal?.flow} />
                                </Card>
                            </div>
                        </div>

                        {/* Digestive Glands */}
                        <SectionHeader title={currentSection.glands?.title} />
                        <Card>
                            {currentSection.glands?.subsections.map((sub, idx) => (
                                <div key={idx} style={{ marginBottom: idx < currentSection.glands.subsections.length - 1 ? '1.25rem' : 0 }}>
                                    <div className="frog-card-title" style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}>
                                        {sub.subtitle}
                                    </div>
                                    <PointList items={sub.points} />
                                </div>
                            ))}
                        </Card>

                        {/* Digestion Process */}
                        <SectionHeader title={currentSection.digestionProcess?.title} />
                        <Card>
                            {currentSection.digestionProcess?.subsections.map((sub, idx) => (
                                <div key={idx} style={{ marginBottom: idx < currentSection.digestionProcess.subsections.length - 1 ? '1.25rem' : 0 }}>
                                    <div className="frog-card-title" style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}>
                                        {sub.subtitle}
                                    </div>
                                    <PointList items={sub.points} />
                                </div>
                            ))}
                        </Card>
                    </div>
                );

            case 'respiratory':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="Respiratory System" icon="respiratory" />
                        
                        {/* Intro */}
                        <Card>
                            <p className="frog-list-item">{currentSection.intro}</p>
                        </Card>

                        {currentSection.modes?.map((mode, idx) => {
                            // If it's Pulmonary Respiration, render in a split view with pathway
                            if (mode.title.includes("Pulmonary")) {
                                return (
                                    <div key={idx} style={{ marginTop: '2rem' }}>
                                        <SectionHeader title={mode.title} />
                                        <p className="frog-list-item" style={{ marginBottom: '1rem', fontStyle: 'italic', color: 'var(--frog-text-secondary)' }}>
                                            {mode.description}
                                        </p>
                                        <div className="frog-split-view">
                                            <div className="frog-text-column">
                                                {mode.subsections.map((sub, sIdx) => (
                                                    <Card key={sIdx} title={sub.subtitle}>
                                                        <PointList items={sub.points} />
                                                    </Card>
                                                ))}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                <Card title="Air Pathway">
                                                    <Flow steps={mode.pathway} />
                                                </Card>
                                                {models.respiratory ? (
                                                    <Model3D src={models.respiratory} title="Frog Respiratory System" />
                                                ) : (
                                                    <FrogImage src={currentSection.images?.respiratory} label="Pulmonary Respiration" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // For Cutaneous, Buccal, and Larval Respiration modes
                            return (
                                <div key={idx} style={{ marginTop: '2rem' }}>
                                    <SectionHeader title={mode.title} />
                                    <p className="frog-list-item" style={{ marginBottom: '1rem', fontStyle: 'italic', color: 'var(--frog-text-secondary)' }}>
                                        {mode.description}
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                        {mode.subsections.map((sub, sIdx) => (
                                            <Card key={sIdx} title={sub.subtitle}>
                                                <PointList items={sub.points} />
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'circulatory':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="Circulatory System" icon="circulatory" />

                        {/* Intro */}
                        <Card>
                            <p className="frog-list-item">{currentSection.intro}</p>
                        </Card>

                        {/* The Heart */}
                        <div className="frog-split-view">
                            <div className="frog-text-column">
                                <SectionHeader title={currentSection.heart?.title} />
                                <Card>
                                    <p className="frog-list-item" style={{ marginBottom: '1.25rem' }}>
                                        {currentSection.heart?.description}
                                    </p>
                                    {currentSection.heart?.subsections.map((sub, idx) => (
                                        <div key={idx} style={{ marginBottom: '1.25rem' }}>
                                            <div className="frog-card-title" style={{ fontSize: '1rem', borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}>
                                                {sub.subtitle}
                                            </div>
                                            <PointList items={sub.points} />
                                        </div>
                                    ))}
                                </Card>
                            </div>
                            <div className="frog-sticky-column">
                                <ModelLoading title="Frog Circulatory System" />
                            </div>
                        </div>

                        {/* Vascular and Portal Systems */}
                        <SectionHeader title={currentSection.vascular?.title} />
                        {currentSection.vascular?.subsections.map((sub, idx) => (
                            <Card key={idx} title={sub.subtitle}>
                                <PointList items={sub.points} />
                            </Card>
                        ))}

                        {/* Portal Systems */}
                        <Card title="Portal Systems">
                            <p className="frog-list-item" style={{ marginBottom: '1rem' }}>
                                {currentSection.vascular?.portalSystems?.intro}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                {currentSection.vascular?.portalSystems?.systems.map((sys, idx) => (
                                    <Card key={idx} title={sys.subtitle} className="frog-highlight-card">
                                        <PointList items={sys.points} />
                                    </Card>
                                ))}
                            </div>
                        </Card>

                        {/* Blood and Lymph */}
                        <SectionHeader title={currentSection.blood?.title} />
                        <div className="frog-split-view">
                            <div className="frog-text-column">
                                {currentSection.blood?.subsections.map((sub, idx) => (
                                    <Card key={idx} title={sub.subtitle}>
                                        <PointList items={sub.points} />
                                    </Card>
                                ))}
                            </div>
                            {currentSection.images?.blood && (
                                <div className="frog-sticky-column">
                                    <FrogImage src={currentSection.images.blood} label="Blood Cells and Lymph" />
                                </div>
                            )}
                        </div>

                        {/* Circulation */}
                        <SectionHeader title={currentSection.circulation?.title} />
                        <Card className="frog-highlight-card">
                            <PointList items={currentSection.circulation?.points} />
                            {currentSection.images?.circulation && (
                                <CardImage src={currentSection.images.circulation} alt="Circulation Path" />
                            )}
                        </Card>
                    </div>
                );

            case 'nervous':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="Nervous System" icon="nervous" />

                        {/* Intro */}
                        <Card>
                            <p className="frog-list-item">{currentSection.intro}</p>
                        </Card>

                        {/* 1. Central Nervous System */}
                        <SectionHeader title={currentSection.cns?.title} />
                        <Card>
                            <p className="frog-list-item">{currentSection.cns?.description}</p>
                        </Card>

                        {/* The Brain */}
                        <Card title={currentSection.cns?.brain?.title}>
                            <PointList items={currentSection.cns?.brain?.points} />
                        </Card>

                        {/* Brain Regions */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                            {currentSection.cns?.brain?.regions.map((region, idx) => (
                                <Card key={idx} title={region.subtitle}>
                                    <PointList items={region.points} />
                                </Card>
                            ))}
                        </div>

                        {/* Spinal Cord */}
                        <Card title={currentSection.cns?.spinalCord?.title}>
                            <PointList items={currentSection.cns?.spinalCord?.points} />
                        </Card>

                        {/* 2. Peripheral and Autonomic Systems */}
                        <SectionHeader title={currentSection.peripheral?.title} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start' }}>
                            {currentSection.peripheral?.subsections.map((sub, idx) => (
                                <Card key={idx} title={sub.subtitle}>
                                    <PointList items={sub.points} />
                                    {sub.subtitle.includes("Peripheral") && currentSection.images?.peripheral && (
                                        <CardImage src={currentSection.images.peripheral} alt="Peripheral Nervous System (PNS)" />
                                    )}
                                </Card>
                            ))}
                        </div>

                        {/* 3. Sense Organs */}
                        <SectionHeader title={currentSection.senseOrgans?.title} />
                        <Card>
                            <p className="frog-list-item">{currentSection.senseOrgans?.description}</p>
                        </Card>
                        <div className="frog-split-view">
                            <div className="frog-text-column">
                                {currentSection.senseOrgans?.subsections.slice(0, 2).map((sub, idx) => (
                                    <Card key={idx} title={sub.subtitle}>
                                        <PointList items={sub.points} />
                                    </Card>
                                ))}
                            </div>
                            <div>
                                {currentSection.senseOrgans?.subsections.slice(2).map((sub, idx) => (
                                    <Card key={idx} title={sub.subtitle}>
                                        <PointList items={sub.points} />
                                        {currentSection.images?.senses && (
                                            <CardImage src={currentSection.images.senses} alt="Chemical and Physical Senses" />
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'excretory':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="Excretory System" icon="excretory" />

                        {/* Intro */}
                        <Card>
                            <p className="frog-list-item">{currentSection.intro}</p>
                        </Card>

                        {/* The Kidneys */}
                        <div className="frog-split-view">
                            <div className="frog-text-column">
                                <SectionHeader title={currentSection.kidneys?.title} />
                                {currentSection.kidneys?.subsections.map((sub, idx) => (
                                    <Card key={idx} title={sub.subtitle}>
                                        <PointList items={sub.points} />
                                    </Card>
                                ))}
                            </div>
                            {models.excretory ? (
                                <div className="frog-sticky-column">
                                    <Model3D src={models.excretory} title="Frog Excretory System" />
                                </div>
                            ) : (
                                <FrogImage src={currentSection.images?.excretory} label="Excretory System" />
                            )}
                        </div>

                        {/* Ureters and Sexual Differences */}
                        <SectionHeader title={currentSection.ureters?.title} />
                        <Card>
                            <p className="frog-list-item" style={{ marginBottom: '1rem' }}>
                                {currentSection.ureters?.description}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                {currentSection.ureters?.subsections.map((sub, idx) => (
                                    <Card key={idx} title={sub.subtitle} className="frog-highlight-card">
                                        <PointList items={sub.points} />
                                    </Card>
                                ))}
                            </div>
                        </Card>

                        {/* Storage and Elimination */}
                        <SectionHeader title={currentSection.storage?.title} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                            {currentSection.storage?.subsections.map((sub, idx) => (
                                <Card key={idx} title={sub.subtitle}>
                                    <PointList items={sub.points} />
                                </Card>
                            ))}
                        </div>

                        {/* Nitrogenous Waste */}
                        <SectionHeader title={currentSection.nitrogenousWaste?.title} />
                        <Card className="frog-highlight-card">
                            <PointList items={currentSection.nitrogenousWaste?.points} />
                        </Card>
                    </div>
                );

            case 'reproductive':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="Reproductive System" icon="reproductive" />

                        {/* Intro */}
                        <Card>
                            <p className="frog-list-item">{currentSection.intro}</p>
                        </Card>

                        {/* Gender Toggle */}
                        <div className="frog-toggle-group" style={{ margin: '1.5rem 0 2rem' }}>
                            <button
                                className={`frog-toggle-btn ${activeGender === 'male' ? 'active' : ''}`}
                                onClick={() => setActiveGender('male')}
                            >
                                <span>♂ Male Reproductive System</span>
                            </button>
                            <button
                                className={`frog-toggle-btn ${activeGender === 'female' ? 'active' : ''}`}
                                onClick={() => setActiveGender('female')}
                            >
                                <span>♀ Female Reproductive System</span>
                            </button>
                        </div>

                        {/* Male Reproductive System */}
                        {activeGender === 'male' && (
                            <div className="frog-split-view">
                                <div className="frog-text-column">
                                    <SectionHeader title={currentSection.male?.title} />
                                    <div>
                                        {currentSection.male?.subsections.map((sub, idx) => (
                                            <Card key={idx} title={sub.subtitle}>
                                                <PointList items={sub.points} />
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                                <div className="frog-sticky-column">
                                    <ModelLoading title="Male Reproductive System" />
                                </div>
                            </div>
                        )}

                        {/* Female Reproductive System */}
                        {activeGender === 'female' && (
                            <div className="frog-split-view">
                                <div className="frog-text-column">
                                    <SectionHeader title={currentSection.female?.title} />
                                    <div>
                                        {currentSection.female?.subsections.map((sub, idx) => (
                                            <Card key={idx} title={sub.subtitle}>
                                                <PointList items={sub.points} />
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                                <div className="frog-sticky-column">
                                    <ModelLoading title="Female Reproductive System" />
                                </div>
                            </div>
                        )}

                        {/* Fertilization and Development */}
                        <SectionHeader title={currentSection.fertilization?.title} />
                        <div className="frog-split-view">
                            <div className="frog-text-column">
                                {currentSection.fertilization?.subsections.slice(0, 3).map((sub, idx) => (
                                    <Card key={idx} title={sub.subtitle} className={sub.subtitle.includes("Metamorphosis") && !sub.subtitle.includes("Changes") ? "frog-highlight-card" : ""}>
                                        <PointList items={sub.points} />
                                    </Card>
                                ))}
                            </div>
                            <div>
                                {currentSection.fertilization?.subsections.slice(3).map((sub, idx) => (
                                    <Card key={idx} title={sub.subtitle}>
                                        <PointList items={sub.points} />
                                        {currentSection.images?.metamorphosis && (
                                            <CardImage src={currentSection.images.metamorphosis} alt="Changes During Metamorphosis" />
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'economic':
                return (
                    <div className="frog-content-section">
                        <SectionHeader title="Economic Importance of Frogs" icon="economic" />

                        {/* Intro */}
                        <Card>
                            <p className="frog-list-item">{currentSection.intro}</p>
                        </Card>

                        {/* Importance Categories */}
                        {currentSection.categories?.map((cat, idx) => {
                            const cardTitle = (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Icon name={cat.icon} size={18} style={{ color: 'var(--frog-primary)' }} />
                                    <span>{cat.title}</span>
                                </div>
                            );
                            return (
                                <Card key={idx} title={cardTitle}>
                                    <PointList items={cat.points} />
                                </Card>
                            );
                        })}

                        {/* Facts */}
                        <SectionHeader title="Did You Know?" icon="Lightbulb" />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                            {currentSection.facts?.map((fact, idx) => (
                                <Card key={idx} className="frog-highlight-card">
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <span style={{ flexShrink: 0, marginTop: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(22, 163, 74, 0.1)' }}>
                                            <Icon name={fact.icon} size={18} style={{ color: 'var(--frog-primary)' }} />
                                        </span>
                                        <div>
                                            <div className="frog-card-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '0.35rem' }}>
                                                {fact.label}
                                            </div>
                                            <p className="frog-list-item" style={{ margin: 0 }}>{fact.text}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="frog-content-section">
                        <SectionHeader title={currentSection.label} />
                        <Card>
                            <p>{currentSection.content?.overview || "Content placeholder."}</p>
                        </Card>
                    </div>
                );
        }
    };

    return (
        <div className="frog-zoo-page">

            {/* FULL PAGE HERO BANNER */}
            <section className="frog-hero-banner">
                <div className="frog-hero-container">
                    <div className="frog-hero-content">
                        <span className="frog-taxonomy-tag">{taxonomy.tag}</span>
                        <h1 className="frog-hero-title">{hero.title}</h1>
                        <p className="frog-hero-subtitle">{hero.subtitle}</p>

                        <div className="frog-taxonomy-grid">
                            <div className="frog-tax-item">
                                <span className="frog-tax-label">Phylum</span>
                                <span className="frog-tax-value">{taxonomy.phylum}</span>
                            </div>
                            <div className="frog-tax-item">
                                <span className="frog-tax-label">Class</span>
                                <span className="frog-tax-value">{taxonomy.class}</span>
                            </div>
                            <div className="frog-tax-item">
                                <span className="frog-tax-label">Order</span>
                                <span className="frog-tax-value">{taxonomy.order}</span>
                            </div>
                        </div>
                    </div>

                    <div className="frog-hero-visual">
                        <div className="frog-hero-image-wrapper">
                            <img loading="lazy"
                                src={hero.image || "https://img.icons8.com/fluency/96/frog.png"}
                                alt="Frog"
                                className="frog-hero-img"
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="frog-scroll-indicator"
                    onClick={() => {
                        const content = document.querySelector('.frog-zoo-main-content');
                        if (content) content.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div className="frog-mouse"><div className="frog-wheel"></div></div>
                    <div className="frog-arrow-down"></div>
                </div>
            </section>

            {/* APP CONTAINER */}
            <div className="frog-zoo-app-container">

                {/* MOBILE OVERLAY */}
                <div
                    className={`frog-mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* SIDEBAR */}
                <aside
                    ref={sidebarRef}
                    className={`frog-zoo-sidebar ${isMobileMenuOpen ? 'open' : ''} ${!showSidebar ? 'hidden' : ''}`}
                    style={{ height: sidebarHeight }}
                >
                    <div className="frog-sidebar-header">
                        <div className="frog-progress-label">Progress</div>
                        <div className="frog-progress-track">
                            <div
                                className="frog-progress-fill"
                                style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <nav className="frog-sidebar-nav">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`frog-nav-btn ${activeTab === section.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(section.id)}
                            >
                                <span className="frog-nav-icon">
                                    <Icon name={section.icon} size={18} />
                                </span>
                                <span>{section.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="frog-zoo-main-content">

                    {/* MOBILE TOGGLE BUTTON */}
                    <button
                        className="frog-mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="frog-content-card">

                        {/* CONTENT HEADER */}
                        <div className="frog-content-header">
                            <h2 className="frog-header-title">{sections[currentIndex].label}</h2>
                            <div className="frog-header-nav-buttons">
                                {prevSection && (
                                    <button className="frog-nav-action-btn frog-prev-btn" onClick={handlePrev}>
                                        <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Prev
                                    </button>
                                )}
                                {nextSection && (
                                    <button className="frog-nav-action-btn frog-next-btn" onClick={handleNext}>
                                        Next <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* ACTIVE SECTION CONTENT */}
                        {renderActiveContent()}

                    </div>
                </main>
            </div>

            {/* BACK TO TOP */}
            <button
                className={`frog-back-to-top ${showBackToTop ? 'visible' : ''}`}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'var(--frog-primary)',
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

export default Frog;
