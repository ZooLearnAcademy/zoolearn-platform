"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import './Cockroachcontent.css';

// ------------------------------------------------------------
// CONTENT DATA – exactly matching the Word document
// ------------------------------------------------------------
const cockroachContent = {
  general: {
    title: "General Characteristics",
    sections: [
      {
        heading: "General Characteristics",
        content: [
          "Cockroach is a common insect usually found in human dwellings.",
          "Scientific name: Periplaneta americana.",
          "It is nocturnal, omnivorous, and fast‑moving in nature.",
          "The American cockroach is widely distributed across tropical and subtropical regions of the world and is commonly found in human habitations.",
          "It lives in warm, moist environments such as sewers, drains, basements, kitchens, bathrooms, and garbage areas.",
          "This cockroach is omnivorous, feeding on food scraps, organic matter, paper, and decaying materials.",
          "It acts as a mechanical carrier of disease‑causing organisms, making it an important species in public health studies."
        ]
      }
    ]
  },
  morphology: {
    title: "External Morphology",
    sections: [
      {
        heading: "External Morphology & Body Organization",
        content: [
          "The body is elongated, brown in colour, and dorsoventrally flattened.",
          "It is covered by a hard, non‑living chitinous exoskeleton.",
          "The exoskeleton protects the body and prevents excessive loss of water."
        ]
      },
      {
        heading: "Exoskeleton and Sclerites",
        isSubtopic: true,
        content: [
          "The exoskeleton is divided into hardened plates called sclerites.",
          "These sclerites are joined by flexible arthrodial membranes, allowing movement.",
          "Types of sclerites: Tergites (dorsal plates), Sternites (ventral plates), Pleurites (lateral plates)."
        ]
      },
      {
        heading: "Body Division",
        isSubtopic: true,
        content: [
          "The body of cockroach is divided into three regions: Head, Thorax, Abdomen.",
          "Each region performs specific functions."
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508120/cockroach_qzolle.jpg",
        imageCaption: "Body regions of cockroach"
      },
      {
        heading: "Head",
        isSubtopic: true,
        content: [
          "The head is formed by the fusion of six segments.",
          "It is enclosed within a head capsule.",
          "The head is attached to the thorax by a flexible neck, allowing free movement."
        ]
      },
      // ---------- added missing "Sense Organs" heading ----------
      {
        heading: "Sense Organs",
        isSubtopic: true,
        content: []  // just a heading, no bullet points
      },
      {
        heading: "Antennae",
        isSubSubtopic: true,
        content: [
          "One pair of long, segmented antennae is present.",
          "They act as organs of touch and smell.",
          "Help in detecting air currents and vibrations."
        ]
      },
      {
        heading: "Compound Eyes",
        isSubSubtopic: true,
        content: [
          "One pair of large compound eyes is present.",
          "Each eye is made up of numerous ommatidia.",
          "They produce mosaic vision."
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508128/cockroach_head_y9fyez.png",
        imageCaption: "Compound eye"
      },
      {
        heading: "Mouth Parts",
        isSubSubtopic: true,
        content: [
          "Mouth parts are of mandibulate (biting and chewing) type.",
          "They are adapted for omnivorous feeding.",
          "Components:",
          "  - Labrum (upper lip)",
          "  - Mandibles (cut and crush food)",
          "  - Maxillae (hold food)",
          "  - Labium (lower lip)",
          "  - Hypopharynx (tongue‑like structure)"
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508156/labeled_mouth_parts_qq31am.png",
        imageCaption: "Mandibulate mouth parts"
      },
      {
        heading: "Thorax",
        isSubtopic: true,
        content: [
          "The thorax consists of three segments: Prothorax, Mesothorax, Metathorax.",
          "It is mainly responsible for locomotion."
        ]
      },
      {
        heading: "Legs",
        isSubSubtopic: true,
        content: [
          "Three pairs of jointed legs are present.",
          "Each leg has five segments: Coxa, Trochanter, Femur, Tibia, Tarsus.",
          "Legs are adapted for walking and running."
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508137/cockroach_leg_rp6cvi.png",
        imageCaption: "Thoracic legs"
      },
      {
        heading: "Wings",
        isSubSubtopic: true,
        content: [
          "Two pairs of wings are present.",
          "Forewings (tegmina): Thick and leathery, protect hindwings and body.",
          "Hindwings: Thin and membranous, used for flight."
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508290/wings.5_smkuv2.jpg",
        imageCaption: "Wings"
      },
      {
        heading: "Abdomen",
        isSubtopic: true,
        content: [
          "The abdomen consists of 10 segments in adults.",
          "Each segment bears a tergum and sternum.",
          "Segments overlap, providing flexibility."
        ]
      },
      {
        heading: "Anal Appendages",
        isSubSubtopic: true,
        content: [
          "Anal cerci are present in both males and females and act as sensory organs.",
          "Anal styles are present only in males."
        ]
      },
      {
        heading: "Stink (Repugnatorial) Glands",
        isSubSubtopic: true,
        content: [
          "Repugnatorial glands are present between abdominal segments.",
          "They produce a foul‑smelling secretion.",
          "This secretion helps in defence."
        ]
      }
    ]
  },
  digestive: {
    title: "Digestive System",
    sections: [
      {
        heading: "Digestive System in Cockroach",
        content: [
          "The digestive system consists of mouth and mouthparts, alimentary canal, and salivary glands.",
          "Cockroach is omnivorous, feeding on both plant and animal matter."
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508152/Cockroach-Digestive-System_ate4r1.png",
        imageCaption: "Digestive system"
      },
      {
        heading: "Alimentary Canal",
        isSubtopic: true,
        content: [
          "The alimentary canal is a long, tubular structure extending from mouth to anus.",
          "It is divided into three main regions: Foregut, Midgut, Hindgut."
        ]
      },
      {
        heading: "Foregut",
        isSubSubtopic: true,
        content: [
          "The foregut includes: Mouth, Pharynx, Oesophagus, Crop, Gizzard.",
          "The crop temporarily stores food.",
          "The gizzard helps in grinding and filtering food."
        ]
      },
      {
        heading: "Gizzard (Proventriculus)",
        isSubSubtopic: true,
        content: [
          "The gizzard is thick‑walled and muscular.",
          "It contains six chitinous teeth that help in grinding food.",
          "Bristles present inside act as strain filters, preventing large food particles from entering the midgut."
        ]
      },
      {
        heading: "Midgut",
        isSubSubtopic: true,
        content: [
          "The midgut is the main site of digestion and absorption.",
          "It bears numerous hepatic caecae (usually 6‑8).",
          "Hepatic caecae secrete digestive enzymes that help in digestion."
        ]
      },
      {
        heading: "Hindgut",
        isSubSubtopic: true,
        content: [
          "The hindgut is divided into: ileum, colon, rectum.",
          "The rectum absorbs water from undigested food.",
          "The alimentary canal opens to the outside through the anus."
        ]
      },
      {
        heading: "Easy memory line",
        isSubtopic: true,
        content: [
          "Crop stores food → Gizzard grinds → Midgut digests → Rectum absorbs water"
        ]
      }
    ]
  },
  respiratory: {
    title: "Respiratory System",
    sections: [
      {
        heading: "Respiratory System in Cockroach",
        content: [
          "Cockroach respires through a tracheal system.",
          "Oxygen is supplied directly to body tissues through air tubes.",
          "Blood does not take part in respiration – oxygen does not travel through haemolymph.",
          "Exchange of gases occurs by diffusion at the tissue level."
        ]
      },
      {
        heading: "Spiracles",
        isSubtopic: true,
        content: [
          "Spiracles are the external openings of the tracheal system.",
          "A total of 10 pairs of spiracles are present: 2 pairs in the thorax, 8 pairs in the abdomen.",
          "Spiracles are provided with valves that help regulate air entry and reduce water loss."
        ]
      },
      {
        heading: "Tracheae",
        isSubtopic: true,
        content: [
          "Tracheae are a network of fine air tubes spread throughout the body.",
          "They are lined internally with spiral thickenings called taenidia.",
          "Taenidia prevent the tracheae from collapsing and keep them open for airflow.",
          "Tracheae branch into finer tracheoles, which deliver oxygen directly to cells."
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508278/tracheal_system_kjxoxm.png",
        imageCaption: "Tracheal tubes with taenidia"
      },
      {
        heading: "Easy memory line",
        isSubtopic: true,
        content: [
          "Spiracles → Tracheae → Tracheoles → Body tissues"
        ]
      }
    ]
  },
  circulatory: {
    title: "Circulatory System",
    sections: [
      {
        heading: "Circulatory System in Cockroach",
        content: [
          "Cockroach possesses an open circulatory system.",
          "Blood does not flow continuously through blood vessels; it flows freely in body spaces called sinuses.",
          "The blood of cockroach is known as haemolymph."
        ]
      },
      {
        heading: "Haemolymph",
        isSubtopic: true,
        content: [
          "Haemolymph is a colourless fluid.",
          "It consists of plasma and haemocytes (blood cells).",
          "It does not contain haemoglobin, so it is colourless.",
          "Haemolymph does not transport oxygen – oxygen is carried directly to tissues by the tracheal system.",
          "It helps in the transport of nutrients, hormones, and metabolic wastes."
        ]
      },
      {
        heading: "Heart",
        isSubtopic: true,
        content: [
          "The heart is a long, muscular, tube‑like structure.",
          "It is located on the dorsal side of the body.",
          "The heart is divided into 13 segmental chambers, mainly present in the abdominal region.",
          "Each chamber has a pair of ostia (valves).",
          "Ostia allow haemolymph to enter the heart and prevent backward flow."
        ]
      },
      {
        heading: "Sinuses",
        isSubtopic: true,
        content: [
          "The body cavity (haemocoel) is divided into three sinuses:",
          "  1. Pericardial sinus (dorsal) – contains the heart and aorta",
          "  2. Perivisceral sinus (middle) – contains the digestive organs",
          "  3. Perineural sinus (ventral) – contains the ventral nerve cord"
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771507996/Circulation_system_fye7ui.jpg",
        imageCaption: "Body sinuses"
      },
      {
        heading: "Circulation Pathway",
        isSubtopic: true,
        content: [
          "Haemolymph flows in the following sequence:",
          "Heart → Head sinus → Perineural sinus → Perivisceral sinus → Pericardial sinus → Heart"
        ]
      },
      {
        heading: "Easy memory line",
        isSubtopic: true,
        content: [
          "Cockroach blood circulates freely in sinuses and does not carry oxygen."
        ]
      }
    ]
  },
  excretory: {
    title: "Excretory System",
    sections: [
      {
        heading: "Excretory System in Cockroach",
        content: [
          "Cockroach excretes nitrogenous wastes with the help of Malpighian tubules, which are the main excretory organs.",
          "This system helps in removal of wastes as well as in conservation of water."
        ]
      },
      {
        heading: "Malpighian Tubules",
        isSubtopic: true,
        content: [
          "Malpighian tubules are yellow, thread‑like structures.",
          "About 100‑150 tubules are present.",
          "They float freely in the haemolymph.",
          "The tubules open into the junction of the midgut and hindgut."
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508200/Malpighian_tubules_t2uthi.png",
        imageCaption: "Malpighian tubules"
      },
      {
        heading: "Mechanism of Excretion",
        isSubtopic: true,
        content: [
          "The main nitrogenous waste is uric acid.",
          "Therefore, cockroach is uricotelic.",
          "Uric acid passes from the haemolymph into the Malpighian tubules.",
          "It is then released into the hindgut.",
          "In the hindgut, water is reabsorbed, forming dry excreta.",
          "This adaptation helps the cockroach conserve water."
        ]
      },
      {
        heading: "Accessory Excretory Organs",
        isSubtopic: true,
        table: {
          headers: ["Organ", "Function"],
          rows: [
            ["Fat body", "Stores uric acid"],
            ["Nephrocytes", "Remove toxic substances from haemolymph"],
            ["Urate (uricose) glands", "Store nitrogenous wastes"]
          ]
        }
      },
      {
        heading: "Easy memory line",
        isSubtopic: true,
        content: [
          "Malpighian tubules remove uric acid and help save water."
        ]
      }
    ]
  },
  nervous: {
    title: "Nervous System",
    sections: [
      {
        heading: "Nervous System in Cockroach",
        content: [
          "The nervous system is ganglionated and lies on the ventral side of the body.",
          "It is well developed and helps in coordination, movement, and response to stimuli.",
          "The nervous system consists of: Brain (supra‑oesophageal ganglion), Sub‑oesophageal ganglion, Double ventral nerve cord."
        ]
      },
      {
        heading: "Brain (Supra‑oesophageal Ganglion)",
        isSubtopic: true,
        content: [
          "The brain is located above the oesophagus.",
          "It is formed by the fusion of several ganglia.",
          "The brain gives off nerves to compound eyes (optic nerves) and antennae (antennary nerves).",
          "It mainly controls sensory perception and integration – vision, smell, and touch."
        ]
      },
      {
        heading: "Sub‑oesophageal Ganglion",
        isSubtopic: true,
        content: [
          "It is located below the oesophagus.",
          "It is connected to the brain by circum‑oesophageal connectives.",
          "It controls mouthparts, salivary glands, and movements related to feeding."
        ]
      },
      {
        heading: "Double Ventral Nerve Cord",
        isSubtopic: true,
        content: [
          "A double ventral nerve cord runs along the ventral side of the body.",
          "It bears a series of segmental ganglia.",
          "Thoracic ganglia control movements of legs and wings.",
          "Abdominal ganglia control abdominal movements and anal cerci."
        ],
        image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1771508218/nervous_non_labled_jk54rx.png"
      },
      {
        heading: "Functions of the Nervous System",
        isSubtopic: true,
        content: [
          "Controls locomotion",
          "Coordinates sensory responses",
          "Regulates activities of internal organs",
          "Helps in reflex actions"
        ]
      },
      {
        heading: "Easy memory line",
        isSubtopic: true,
        content: [
          "Brain thinks, sub‑oesophageal ganglion feeds, ventral nerve cord moves."
        ]
      }
    ]
  },
  maleRepro: {
    title: "Male Reproductive System",
    sections: [
      {
        heading: "Male Reproductive System in Cockroach",
        content: [
          "The male reproductive system is well developed and adapted for the production, storage, and transfer of sperms during copulation."
        ]
      },
      {
        heading: "Testes",
        isSubtopic: true,
        content: [
          "A pair of testes is present.",
          "Each testis is elongated and lobed.",
          "Their main function is the production of sperms."
        ]
      },
      {
        heading: "Vasa Deferentia",
        isSubtopic: true,
        content: [
          "From each testis arises a vas deferens.",
          "These ducts carry sperms from the testes to the seminal vesicles."
        ]
      },
      {
        heading: "Seminal Vesicles",
        isSubtopic: true,
        content: [
          "Sac‑like structures present near the ejaculatory duct.",
          "Their main function is the temporary storage of sperms."
        ]
      },
      {
        heading: "Ejaculatory Duct",
        isSubtopic: true,
        content: [
          "A single, median, wide, muscular, and glandular duct.",
          "Opens into the genital pouch through the male genital pore.",
          "Transfers sperms during copulation, usually in the form of a spermatophore."
        ]
      },
      {
        heading: "Mushroom‑shaped (Utricular) Gland",
        isSubtopic: true,
        content: [
          "Located at the junction of the vasa deferentia and ejaculatory duct.",
          "It consists of:",
          "  - Utriculi majores",
          "  - Utriculi breviores",
          "Secretes a fluid that:",
          "  - Nourishes sperms",
          "  - Helps in the formation of the spermatophore."
        ]
      },
      {
        heading: "Phallic or Conglobate Gland",
        isSubtopic: true,
        content: [
          "A club‑shaped accessory gland.",
          "Opens into the genital pouch.",
          "Secretes the outer covering of the spermatophore."
        ]
      },
      {
        heading: "Genital Pouch",
        isSubtopic: true,
        content: [
          "The genital pouch is bounded dorsally by the 9th and 10th terga, ventrally by the 9th sternum.",
          "It contains: anus, male genital pore, and male genital structures.",
          "It plays an important role in copulation and sperm transfer."
        ]
      },
      {
        heading: "External Genitalia",
        isSubtopic: true,
        content: [
          "Around the male genital pore, there are three hard, chitinous plates.",
          "These plates are called phallomeres.",
          "Together, the phallomeres form the phallic organs (gonapophyses).",
          "Their main function is to assist in copulation."
        ]
      },
      {
        heading: "Easy memory line",
        isSubtopic: true,
        content: [
          "Accessory glands form spermatophore; phallomeres help in copulation."
        ]
      }
    ]
  },
  femaleRepro: {
    title: "Female Reproductive System",
    sections: [
      {
        heading: "Female Reproductive System in Cockroach",
        content: [
          "The female reproductive system is well developed and adapted for production of eggs, storage of sperms, and formation of ootheca (egg case)."
        ]
      },
      {
        heading: "Ovaries",
        isSubtopic: true,
        content: [
          "A pair of ovaries is present in the 2nd to 6th abdominal segments.",
          "Each ovary is made up of eight ovarian tubules called ovarioles.",
          "Each ovariole is blind at one end.",
          "Ova are arranged in acropetal order, meaning:",
          "  - Youngest eggs are present at the tip",
          "  - Oldest eggs are present near the base"
        ]
      },
      {
        heading: "Oviducts",
        isSubtopic: true,
        content: [
          "The eight ovarioles of each ovary unite to form a short and wide lateral oviduct.",
          "The two lateral oviducts run backward and unite to form a median common oviduct."
        ]
      },
      {
        heading: "Vagina (Common Oviduct)",
        isSubtopic: true,
        content: [
          "The posterior, wider part of the common oviduct is called the vagina.",
          "It opens into the genital pouch through a vertical slit known as the vulva or female genital pore.",
          "The female genital pore is present on the 8th sternum."
        ]
      },
      {
        heading: "Genital Pouch (Gynatrium)",
        isSubtopic: true,
        content: [
          "The genital pouch is a large, boat‑shaped chamber.",
          "It is mainly formed by the 7th sternum.",
          "Boundaries: anterior and dorsal margins – formed by 8th and 9th sterna; posterior, ventral and lateral margins – formed by 7th sternum.",
          "It plays an important role in copulation and egg laying."
        ]
      },
      {
        heading: "Spermathecae",
        isSubtopic: true,
        content: [
          "A pair of unequal‑sized spermathecae is present in the 6th abdominal segment.",
          "They open into the genital pouch through a median aperture.",
          "Function: Storage of sperms received from the male during copulation."
        ]
      },
      {
        heading: "Collateral Glands",
        isSubtopic: true,
        content: [
          "A pair of highly branched glands is present.",
          "They open separately into the genital pouch.",
          "Their secretion helps in the formation of ootheca (egg case)."
        ]
      },
      {
        heading: "External Genitalia (Gonapophyses)",
        isSubtopic: true,
        content: [
          "Present inside the genital pouch, between the female genital pore and anus.",
          "Made up of three pairs of chitinous plates: one pair arises from the 8th sternum, two pairs arise from the 9th sternum.",
          "They help in egg laying and ootheca formation."
        ]
      },
      {
        heading: "Easy memory line",
        isSubtopic: true,
        content: [
          "Ovaries form eggs, spermatheca stores sperms, collateral glands form ootheca."
        ]
      }
    ]
  }
};

// ------------------------------------------------------------
// MAIN COMPONENT – Rabbit-style layout (unchanged)
// ------------------------------------------------------------
const Cockroach = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 80px)');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const tabKeys = Object.keys(cockroachContent);
  const currentIndex = tabKeys.indexOf(activeTab);
  const prevTabKey = currentIndex > 0 ? tabKeys[currentIndex - 1] : null;
  const nextTabKey = currentIndex < tabKeys.length - 1 ? tabKeys[currentIndex + 1] : null;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Scroll handling for Sidebar opacity and Back to Top
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.foo-zl-footer');
      const banner = document.querySelector('.coc-hero-banner');
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
    const contentArea = document.querySelector('.coc-zoo-main-content');
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
    <div className="coc-zoo-page">

      {/* FULL PAGE HERO BANNER */}
      <section className="coc-hero-banner">
        <div className="coc-hero-container">
          <div className="coc-hero-content">
            <span className="coc-taxonomy-tag">Phylum Arthropoda · Class Insecta</span>
            <h1 className="coc-hero-title">American Cockroach</h1>
            <p className="coc-hero-subtitle">Periplaneta americana</p>

            <div className="coc-taxonomy-grid">
              <div className="coc-tax-item">
                <span className="coc-tax-label">Phylum</span>
                <span className="coc-tax-value">Arthropoda</span>
              </div>
              <div className="coc-tax-item">
                <span className="coc-tax-label">Class</span>
                <span className="coc-tax-value">Insecta</span>
              </div>
              <div className="coc-tax-item">
                <span className="coc-tax-label">Order</span>
                <span className="coc-tax-value">Blattodea</span>
              </div>
            </div>
          </div>

          <div className="coc-hero-visual">
            <div className="coc-hero-image-wrapper">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1771508120/cockroach_qzolle.jpg"
                alt="Cockroach"
                className="coc-hero-img"
              />
            </div>
          </div>
        </div>

        <div
          className="coc-scroll-indicator"
          onClick={() => {
            const content = document.querySelector('.coc-zoo-main-content');
            if (content) content.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="coc-mouse"><div className="coc-wheel"></div></div>
          <div className="coc-arrow-down"></div>
        </div>
      </section>

      {/* APP CONTAINER */}
      <div className="coc-zoo-app-container">

        {/* MOBILE OVERLAY */}
        <div
          className={`coc-mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* SIDEBAR */}
        <aside
          ref={sidebarRef}
          className={`coc-zoo-sidebar ${isMobileMenuOpen ? 'open' : ''} ${!showSidebar ? 'hidden' : ''}`}
          style={{ height: sidebarHeight }}
        >
          <div className="coc-sidebar-header">
            <div className="coc-progress-label">Progress</div>
            <div className="coc-progress-track">
              <div
                className="coc-progress-fill"
                style={{ width: `${((currentIndex + 1) / tabKeys.length) * 100}%` }}
              />
            </div>
          </div>

          <nav className="coc-sidebar-nav">
            {tabKeys.map((key) => (
              <button
                key={key}
                className={`coc-nav-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <span>{cockroachContent[key].title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="coc-zoo-main-content">

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="coc-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>

          <div className="coc-content-card">

            {/* CONTENT HEADER */}
            <div className="coc-content-header">
              <h2 className="coc-header-title">{cockroachContent[activeTab].title}</h2>
              <div className="coc-header-nav-buttons">
                {prevTabKey && (
                  <button className="coc-nav-action-btn coc-prev-btn" onClick={() => setActiveTab(prevTabKey)}>
                    <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Prev
                  </button>
                )}
                {nextTabKey && (
                  <button className="coc-nav-action-btn coc-next-btn" onClick={() => setActiveTab(nextTabKey)}>
                    Next <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                  </button>
                )}
              </div>
            </div>

            {/* SECTIONS */}
            <div className="coc-content-section">
              {cockroachContent[activeTab].sections.map((section, index) => (
                <div key={index} className="coc-section-block"
                  style={{
                    marginLeft: section.isSubSubtopic ? '3rem' : section.isSubtopic ? '1.5rem' : '0',
                    borderLeft: (section.isSubtopic || section.isSubSubtopic) ? '3px solid rgba(13, 148, 136, 0.15)' : 'none',
                    paddingLeft: (section.isSubtopic || section.isSubSubtopic) ? '1.5rem' : '0'
                  }}
                >
                  <div className="coc-section-title">
                    <span
                      className="coc-section-marker"
                      style={(section.isSubtopic || section.isSubSubtopic) ? { height: '1rem', background: '#94a3b8' } : {}}
                    />
                    <span style={(section.isSubtopic || section.isSubSubtopic) ? { fontSize: '1.1rem', color: '#475569' } : {}}>
                      {section.heading}
                    </span>
                  </div>

                  {section.content && (
                    <ul className="coc-point-list">
                      {section.content.map((item, i) => (
                        <li key={i} className="coc-list-item">
                          <span className="coc-bullet" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.image && (
                    <figure className="coc-image-wrapper">
                      <img
                        src={section.image}
                        alt={section.heading}
                        className="coc-section-image"
                        loading="lazy"
                      />
                      {section.imageCaption && (
                        <figcaption className="coc-image-caption">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {section.table && (
                    <div className="coc-table-container">
                      <table className="coc-zoo-table">
                        <thead>
                          <tr>
                            {section.table.headers.map((header, hIndex) => (
                              <th key={hIndex}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rIndex) => (
                            <tr key={rIndex}>
                              {row.map((cell, cIndex) => (
                                <td key={cIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* FOOTER NAVIGATION */}
            <div className="coc-navigation-footer">
              {prevTabKey ? (
                <button className="coc-nav-action-btn coc-prev-btn" onClick={() => setActiveTab(prevTabKey)}>
                  <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Previous
                </button>
              ) : <div />}
              {nextTabKey && (
                <button className="coc-nav-action-btn coc-next-btn" onClick={() => setActiveTab(nextTabKey)}>
                  Next <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* BACK TO TOP */}
      <button
        className={`coc-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
};

export default Cockroach;