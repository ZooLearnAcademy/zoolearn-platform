"use client";

import React, { useEffect, useRef, useState } from "react";

const horseData = [
  {
    era: "Eocene Epoch (~55 MYA)",
    name: "Hyracotherium (Eohippus)",
    sci: "Eohippus",
    desc: "Eohippus is the earliest known member of the horse lineage. It was small, about the size of a fox, around 40 cm tall at the shoulder. It had a short head and neck. The forelimbs had four functional toes and the hind limbs had three, adapted for running on soft forest loam. Its low-crowned teeth were suited for browsing soft forest vegetation.",
    facts: ["4 Toes (Front) / 3 Toes (Hind)", "~40 cm tall", "Size of a fox", "Browsing diet"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340466/Hyracotherium_%EF%B8%8E_mi78ms.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775118956/56ace581-cf31-4522-968f-0ed751393f3b.png",
  },
  {
    era: "Early Eocene (~50 MYA)",
    name: "Orohippus",
    sci: "Early Eocene horse",
    desc: "Slightly larger than Hyracotherium with noticeable updates in tooth structure. It lost the first premolar and developed sharper crests on its molars, showing a subtle shift toward grinding slightly tougher leaves, though it remained a forest browser.",
    facts: ["4 Toes (Front)", "Sharper Molars", "Forest Habitat"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340398/Orohippus_%EF%B8%8E_moxn95.png",
  },
  {
    era: "Oligocene Epoch (~30 MYA)",
    name: "Mesohippus",
    sci: "Intermediate stage",
    desc: "Mesohippus represents a key intermediate stage. Standing about 60 cm tall (size of a sheep), it lived during the Oligocene. All limbs had three functional toes, with the central toe longer to support most of the weight. Teeth developed initial enamel ridges, helping it chew tougher woodland vegetation.",
    facts: ["3 Toes", "~60 cm tall", "Size of a sheep", "Enamel ridges on molars"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340493/Mesohippus_%EF%B8%8E_hld5dm.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775118977/8a87726a-a941-489b-9ce3-669e590ce66e.png",
  },
  {
    era: "Late Oligocene (~28 MYA)",
    name: "Miohippus",
    sci: "Advanced Mesohippus",
    desc: "Larger than Mesohippus, Miohippus had more complex enamel crests on its molars. The third toe was highly prominent. This lineage bridged the gap as the climate dried and forests began transitioning into open woodlands.",
    facts: ["3 Toes", "Grazing Teeth", "Woodland Habitat"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340521/Miohippus_%EF%B8%8E_cq5med.png",
  },
  {
    era: "Early Miocene (~24 MYA)",
    name: "Parahippus",
    sci: "Early grazing horse",
    desc: "Parahippus shows the first clear adaptations for grazing. Teeth grew longer and developed crowns coated in cementum. Limbs elongated and side digits shrunk, facilitating faster running across open grasslands.",
    facts: ["Higher Crowns", "Running Limbs", "Cement-Coated Teeth"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340564/Parahippus_%EF%B8%8E_vcq6jw.png",
  },
  {
    era: "Miocene (~18 MYA)",
    name: "Callippus",
    sci: "Slender grazing horse",
    desc: "Callippus was a highly specialized, slender horse that lived alongside Merychippus. It represented an evolutionary branch adapted for dry grasslands that eventually went extinct without leaving direct modern descendants.",
    facts: ["Side-Branch", "Grassland Specialist", "Extinct Lineage"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340615/Callippus_%EF%B8%8E_rz4br6.png",
  },
  {
    era: "Miocene Epoch (~15 MYA)",
    name: "Merychippus",
    sci: "Ruminating horse",
    desc: "Often called the 'ruminating horse' due to tooth specialization, Merychippus was about 100 cm tall (pony-sized). It had a long neck and stood on three toes per foot, but the side toes were reduced and non-functional. Teeth were tall with thick cementum, perfectly suited for grinding silica-rich grass.",
    facts: ["3 Toes (Side toes reduced)", "~100 cm tall", "Size of a small pony", "Teeth covered with cement"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340595/Merychippus_%EF%B8%8E_ry9izt.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119684/14478513-2745-435f-89cd-dac8fdfdf9db.png",
  },
  {
    era: "Late Miocene (~10 MYA)",
    name: "Pliohippus",
    sci: "Advanced one-toed horse",
    desc: "Pliohippus was the first truly one-toed horse. The side digits were reduced to internal splint bones beneath the skin. It stood 120 cm tall and had high-crowned grazing teeth, closely resembling modern genus Equus.",
    facts: ["1 Toe (Digit III)", "~120 cm tall", "Size of a modern pony", "Grazing molars"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341033/Pliohippus_%EF%B8%8E_u0clzq.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119801/807bf458-d4a8-47cf-be1e-e2b427e0f735.png",
  },
  {
    era: "Late Pliocene to Present",
    name: "Equus",
    sci: "Equus caballus",
    desc: "Equus is the modern horse. Appearing 4 million years ago, it has a single functional toe forming a solid hoof, long running limbs, and deep jaw containing highly crowned grinding teeth. Today, it ranges globally.",
    facts: ["1 Hoof", "~150 cm tall", "Global spread", "Grinding teeth"],
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341098/Equus_ferus_vk3fio.png",
    extraImage: "https://res.cloudinary.com/duibfmcw1/image/upload/q_auto/f_auto/v1775119878/8e422c6a-f5c7-4ab7-b1e3-4853a7882ce7.png",
  },
];

export default function EvolutionTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [selectedHorse, setSelectedHorse] = useState<(typeof horseData)[0] | null>(null);

  const currentIndex = selectedHorse ? horseData.findIndex((h) => h.name === selectedHorse.name) : -1;

  useEffect(() => {
    let rafId: number;
    const updateProgress = () => {
      if (!containerRef.current || !progressRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = (windowHeight / 2 - rect.top) / rect.height;
      progress = Math.max(0, Math.min(1, progress));
      progressRef.current.style.height = `${progress * 100}%`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hor-timeline-section-wrapper">
      <div className="hor-section-box">
        <h3 className="hor-section-title">The Complete Timeline: From Eocene to Present</h3>
        <p className="hor-section-text">
          Scroll down to trace the evolutionary path. Click any photo card to open details, fossil reconstructions, and
          skeletal changes.
        </p>
      </div>

      <div className="hor-timeline-container-wrapper">
        <div className="hor-timeline-container" ref={containerRef}>
          {/* Timeline Line */}
          <div className="hor-timeline-line">
            <div className="hor-timeline-progress" ref={progressRef} />
          </div>

          {horseData.map((horse, index) => {
            const isEven = index % 2 === 0;

            return (
              <div className="hor-timeline-item" key={horse.name}>
                {/* Left Pane */}
                <div className="hor-timeline-pane hor-pane-left">
                  {isEven ? (
                    <div
                      className="hor-photo-card"
                      onClick={() => setSelectedHorse(horse)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="hor-image-wrapper">
                        <img src={horse.img} alt={horse.name} loading="lazy" />
                      </div>
                      <h4 className="hor-species-name">{horse.name}</h4>
                      <p className="hor-species-sci">{horse.sci}</p>
                    </div>
                  ) : (
                    <div className="hor-era-label">
                      <span className="hor-era-year">{horse.era}</span>
                    </div>
                  )}
                </div>

                {/* Center Marker */}
                <div className="hor-timeline-marker">
                  <span className="hor-marker-dot"></span>
                </div>

                {/* Right Pane */}
                <div className="hor-timeline-pane hor-pane-right">
                  {isEven ? (
                    <div className="hor-era-label">
                      <span className="hor-era-year">{horse.era}</span>
                    </div>
                  ) : (
                    <div
                      className="hor-photo-card"
                      onClick={() => setSelectedHorse(horse)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="hor-image-wrapper">
                        <img src={horse.img} alt={horse.name} loading="lazy" />
                      </div>
                      <h4 className="hor-species-name">{horse.name}</h4>
                      <p className="hor-species-sci">{horse.sci}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAIL CARD OVERLAY */}
      {selectedHorse && (
        <div className="hor-detail-overlay" onClick={() => setSelectedHorse(null)}>
          <button
            className="hor-nav-btn-modal hor-nav-left"
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex > 0) {
                const prev = horseData[currentIndex - 1];
                if (prev) setSelectedHorse(prev);
              }
            }}
            disabled={currentIndex === 0}
            aria-label="Previous fossil"
          >
            &#10094;
          </button>

          <div className="hor-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="hor-detail-close" onClick={() => setSelectedHorse(null)} aria-label="Close details">
              ✕
            </button>

            <div className="hor-detail-top">
              <div className="hor-detail-img-wrap">
                <img src={selectedHorse.img} alt={selectedHorse.name} />
              </div>
              <div className="hor-detail-header">
                <span className="hor-detail-era">{selectedHorse.era}</span>
                <h2 className="hor-detail-name">{selectedHorse.name}</h2>
                <p className="hor-detail-sci">{selectedHorse.sci}</p>
              </div>
            </div>

            <div className="hor-detail-body">
              <p className="hor-detail-desc">{selectedHorse.desc}</p>
              <div className="hor-detail-facts">
                {selectedHorse.facts.map((fact, i) => (
                  <span key={i} className="hor-detail-fact-pill">
                    🔹 {fact}
                  </span>
                ))}
              </div>
              {selectedHorse.extraImage && (
                <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                  <img
                    src={selectedHorse.extraImage}
                    alt={`${selectedHorse.name} skeleton`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "250px",
                      objectFit: "contain",
                      background: "#fafafa",
                      borderRadius: "12px",
                      padding: "10px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            className="hor-nav-btn-modal hor-nav-right"
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex < horseData.length - 1) {
                const next = horseData[currentIndex + 1];
                if (next) setSelectedHorse(next);
              }
            }}
            disabled={currentIndex === horseData.length - 1}
            aria-label="Next fossil"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
