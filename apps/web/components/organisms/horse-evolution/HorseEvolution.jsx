"use client";

import React, { useEffect, useRef, useState } from 'react';
import './HorseEvolution.css';

const horseData = [
  {
    era: "Eocene Epoch",
    name: "Hyracotherium",
    sci: "Eohippus",
    desc: `Eohippus is the earliest known member of the horse lineage. It appeared during the Eocene epoch. Fossils were first discovered in North America.
It was small, about the size of a fox or terrier dog, around 40 cm tall at the shoulder. It had a short head and neck.
The forelimbs had four functional toes (2, 3, 4, 5) and a splint of the first toe. The hind limbs had three functional toes (2, 3, 4) and a splint of the fifth toe.
The low-crowned molar teeth were adapted for browsing soft vegetation.`,
    facts: ["4 Toes (Front) / 3 Toes (Hind)", "~40 cm tall", "Size of a fox", "Browsing diet"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340466/Hyracotherium_%EF%B8%8E_mi78ms.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775118956/56ace581-cf31-4522-968f-0ed751393f3b.png"
  },
  {
    era: "Eocene (~50 MYA)",
    name: "Orohippus",
    sci: "Early Eocene horse",
    desc: `Slightly larger than Hyracotherium with changes in tooth structure. Lost the first premolar and developed sharper crests on molars.
• Still a forest browser.
• Subtle shift toward harder foods.
• Represents early diversification of the horse lineage.`,
    facts: ["4 Toes (Front)", "Sharper Molars", "Forest Habitat"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340398/Orohippus_%EF%B8%8E_moxn95.png",
    extraImage: ""
  },
  {
    era: "Oligocene Epoch",
    name: "Mesohippus",
    sci: "Intermediate stage",
    desc: `Mesohippus represents an intermediate stage in horse evolution. It evolved from Hyracotherium (Eohippus).
It appeared during the Oligocene epoch, about 3 crore years ago. It was about the size of a modern sheep. The height was about 60 cm at the shoulders.
The forefeet had three functional digits (2, 3, 4) and a splint of the fifth digit. The hind feet had three toes. The middle toe was longer and supported most of the body weight.
The molar teeth showed the beginning of enamel ridges.`,
    facts: ["3 Toes", "~60 cm tall", "Size of a sheep", "Enamel ridges on molars"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340493/Mesohippus_%EF%B8%8E_hld5dm.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775118977/8a87726a-a941-489b-9ce3-669e590ce66e.png"
  },
  {
    era: "Late Oligocene (~30 MYA)",
    name: "Miohippus",
    sci: "Advanced Mesohippus",
    desc: `Larger than Mesohippus with improved teeth for grazing. More adapted to grasslands as forests retreated.
• Third toe still present but more reduced.
• Teeth began to transition for abrasive grass diet.
• An evolutionary bridge between browsers and grazers.`,
    facts: ["3 Toes", "Grazing Teeth", "Grassland Transition"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340521/Miohippus_%EF%B8%8E_cq5med.png",
    extraImage: ""
  },
  {
    era: "Early Miocene (~24 MYA)",
    name: "Parahippus",
    sci: "Early grazing horse",
    desc: `Shows clear transition from browsing to grazing. Teeth developed higher crowns with cement coating for grinding tough grass.
• Side toes shrinking but still functional.
• Longer limbs for running across open grasslands.
• Represents the shift from forest browser to grassland grazer.`,
    facts: ["Higher Crowns", "Running Limbs", "Cement-Coated Teeth"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340564/Parahippus_%EF%B8%8E_vcq6jw.png",
    extraImage: ""
  },
  {
    era: "Miocene (~15 MYA)",
    name: "Callippus",
    sci: "Slender grazing horse",
    desc: `A slender, side-branch of horse evolution. Specialized in grassland habitats alongside Merychippus.
• Highly specialized dentition.
• Represents evolutionary diversification.
• Eventually went extinct without direct descendants.`,
    facts: ["Side-Branch", "Grassland Specialist", "Extinct Lineage"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340615/Callippus_%EF%B8%8E_rz4br6.png",
    extraImage: ""
  },
  {
    era: "Miocene Epoch",
    name: "Merychippus",
    sci: "Ruminating horse",
    desc: `Merychippus is known as the ruminating horse. It evolved from Mesohippus.
It appeared during the Miocene epoch, about 2 crore years ago. It was about the size of a small pony. The height was about 100 cm at the shoulders.
It had a longer neck. The forelimbs and hind limbs had three fingers/toes each. The middle finger and toe were longer and supported most of the body weight. The side toes were reduced.
The teeth were longer and covered with cement, with well-developed enamel ridges.`,
    facts: ["3 Toes (Side toes reduced)", "~100 cm tall", "Size of a small pony", "Teeth covered with cement"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340595/Merychippus_%EF%B8%8E_ry9izt.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119684/14478513-2745-435f-89cd-dac8fdfdf9db.png"
  },
  {
    era: "Late Miocene Epoch",
    name: "Pliohippus",
    sci: "Advanced horse",
    desc: `Pliohippus was an advanced horse in evolution. It evolved from Merychippus-like ancestors.
It lived during the late Miocene epoch (~12–6 million years ago). It was about the size of a modern pony. Height was about 120 cm at the shoulders.
Each limb had one functional toe (digit III). Digits II and IV were reduced to splint bones beneath the skin. It is considered one of the earliest one-toed horses.
Molars were high-crowned with cement and serrations, adapted for grazing grasses.`,
    facts: ["1 Toe (Digit III)", "~120 cm tall", "Size of a modern pony", "Grazing molars"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341033/Pliohippus_%EF%B8%8E_u0clzq.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119801/807bf458-d4a8-47cf-be1e-e2b427e0f735.png"
  },
  {
    era: "Late Pliocene Epoch",
    name: "Equus",
    sci: "Equus caballus (Modern Horse)",
    desc: `Equus is the modern horse. It evolved from Pliohippus. It appeared during the late Pliocene epoch, about 4–4.5 million years ago.
It first appeared in North America and later spread to other parts of the world except Australia. The height is about 150 cm at the shoulders.
It has a long head and long neck. Each forelimb and hind limb has one functional digit (third digit) forming a single hoof. The other digits are reduced and present as two splint bones.
The highly elongated crowns with enamel ridges are perfectly suited for grinding grass.`,
    facts: ["1 Hoof", "~150 cm tall", "Global spread (except Australia)", "Grinding teeth"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341098/Equus_ferus_vk3fio.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119878/8e422c6a-f5c7-4ab7-b1e3-4853a7882ce7.png"
  }
];

const HorseEvolution = () => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  const currentIndex = selectedHorse ? horseData.findIndex(h => h.name === selectedHorse.name) : -1;

  // Scroll-based progress line — direct DOM for zero lag
  useEffect(() => {
    let rafId;
    const updateProgress = () => {
      if (!containerRef.current || !progressRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = ((windowHeight / 2) - rect.top) / rect.height;
      progress = Math.max(0, Math.min(1, progress));
      progressRef.current.style.height = `${progress * 100}%`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('horse-reveal-visible');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.horse-timeline-item');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
    <section className="horse-evo-section">
      <header className="horse-evo-header">
        <p className="horse-evo-domain">zoolearn.in</p>
        <h1 className="horse-evo-title">Evolution of the Horse</h1>
        <h2 className="horse-evo-subtitle">From Eohippus to Equus — A 55 Million Year Journey</h2>
      </header>

      <div className="horse-timeline-container" ref={containerRef}>
        {/* Timeline Line */}
        <div className="horse-timeline-line">
          <div
            className="horse-timeline-progress"
            ref={progressRef}
          />
        </div>

        {horseData.map((horse, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              className={`horse-timeline-item ${isEven ? 'horse-item-left' : 'horse-item-right'} ${horse.name === 'Callippus' ? 'horse-branch-item' : ''}`}
              key={horse.name}
            >

              {/* Left Pane */}
              <div className="horse-timeline-pane horse-pane-left">
                {isEven ? (
                  <div className="horse-photo-card" onClick={() => setSelectedHorse(horse)} style={{ cursor: 'pointer' }}>
                    <div className="horse-image-wrapper">
                      <img src={horse.img} alt={horse.name} loading="lazy" />
                    </div>
                    <h3 className="horse-species-name">{horse.name}</h3>
                    <p className="horse-species-sci">{horse.sci}</p>
                  </div>
                ) : (
                  <div className="horse-era-label horse-era-align-right">
                    <span className="horse-era-year">{horse.era}</span>
                  </div>
                )}
              </div>

              {/* Center Marker */}
              <div className="horse-timeline-marker">
                <span className="horse-marker-dot"></span>
              </div>

              {/* Branch Line for Callippus */}
              {horse.name === "Callippus" && (
                <div className="horse-branch-line-right"></div>
              )}

              {/* Right Pane */}
              <div className="horse-timeline-pane horse-pane-right">
                {isEven ? (
                  <div className="horse-era-label">
                    <span className="horse-era-year">{horse.era}</span>
                  </div>
                ) : (
                  <div className="horse-photo-card" onClick={() => setSelectedHorse(horse)} style={{ cursor: 'pointer' }}>
                    <div className="horse-image-wrapper">
                      <img src={horse.img} alt={horse.name} loading="lazy" />
                    </div>
                    <h3 className="horse-species-name">{horse.name}</h3>
                    <p className="horse-species-sci">{horse.sci}</p>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </section>

      {/* ─── DETAIL CARD OVERLAY ─── */}
      {selectedHorse && (
        <div className="horse-detail-overlay" onClick={() => setSelectedHorse(null)}>
          <button 
            className="horse-nav-btn horse-nav-left" 
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex > 0) setSelectedHorse(horseData[currentIndex - 1]);
            }}
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>

          <div className="horse-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="horse-detail-close" onClick={() => setSelectedHorse(null)}>✕</button>

            <div className="horse-detail-top">
              <div className="horse-detail-img-wrap">
                <img src={selectedHorse.img} alt={selectedHorse.name} />
              </div>
              <div className="horse-detail-header">
                <span className="horse-detail-era">{selectedHorse.era}</span>
                <h2 className="horse-detail-name">{selectedHorse.name}</h2>
                <p className="horse-detail-sci">{selectedHorse.sci}</p>
              </div>
            </div>

            <div className={`horse-detail-body ${selectedHorse.extraImage ? 'has-extra-image' : ''}`}>
              <div className="horse-detail-text">
                <p className="horse-detail-desc">{selectedHorse.desc}</p>
                <div className="horse-detail-facts">
                  {selectedHorse.facts.map((fact, i) => (
                    <span key={i} className="horse-detail-fact-pill">🔹 {fact}</span>
                  ))}
                </div>
              </div>

              {selectedHorse.extraImage && selectedHorse.extraImage.trim() !== "" && (
                <div className="horse-detail-large-image-wrap" onClick={() => setZoomedImage(selectedHorse.extraImage)} style={{ cursor: 'zoom-in' }}>
                  <img src={selectedHorse.extraImage} alt={`${selectedHorse.name} detailed view`} className="horse-large-extra-img" loading="lazy" />
                </div>
              )}
            </div>
          </div>

          <button 
            className="horse-nav-btn horse-nav-right" 
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex < horseData.length - 1) setSelectedHorse(horseData[currentIndex + 1]);
            }}
            disabled={currentIndex === horseData.length - 1}
          >
            &#10095;
          </button>
        </div>
      )}

      {/* ─── FULLSCREEN ZOOMED IMAGE OVERLAY ─── */}
      {zoomedImage && (
        <div className="horse-zoomed-overlay" onClick={() => setZoomedImage(null)}>
          <button className="horse-zoomed-close" onClick={() => setZoomedImage(null)}>✕</button>
          <img src={zoomedImage} alt="Zoomed detailed view" className="horse-zoomed-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
};
export default HorseEvolution;
