"use client";

import React, { useState } from "react";

const stages = [
  {
    id: 1,
    name: "Hyracotherium (Eohippus)",
    era: "55 Million Years Ago",
    toes: "4 Toes (Front) / 3 Toes (Hind)",
    environment: "Dense Subtropical Forests",
    desc: "The size of a fox, Eohippus browsed soft leaves and fruit in tropical forests. Its multiple toes were spread wide to navigate muddy forest floors without sinking.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340466/Hyracotherium_%EF%B8%8E_mi78ms.png",
  },
  {
    id: 2,
    name: "Mesohippus",
    era: "30 Million Years Ago",
    toes: "3 Toes (Middle toe larger)",
    environment: "Open Woodlands & Forest Edges",
    desc: "As temperatures dropped and grasslands began to appear, Mesohippus evolved a larger body (sheep-sized) and lost its fourth toe. The central toe grew stronger to support its weight.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340493/Mesohippus_%EF%B8%8E_hld5dm.png",
  },
  {
    id: 3,
    name: "Merychippus",
    era: "15 Million Years Ago",
    toes: "3 Toes (Reduced side digits)",
    environment: "Semi-Arid Savanna & Grasslands",
    desc: "A massive evolutionary milestone. Merychippus was the first dedicated grazer, sporting cement-covered teeth. Side toes were highly reduced, and it stood fully on its middle digit tip.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774340595/Merychippus_%EF%B8%8E_ry9izt.png",
  },
  {
    id: 4,
    name: "Equus (Modern Horse)",
    era: "Modern Era",
    toes: "1 Hoof (Single Digit III)",
    environment: "Open Plains & Dry Steppes",
    desc: "The culmination of Equidae evolution. All side toes are reduced to internal splint bones. The single hoof is perfectly engineered for long-distance high-speed flight across open plains.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341098/Equus_ferus_vk3fio.png",
  },
];

export default function Transformation() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="hor-transformation-section">
      <div className="hor-section-box">
        <h3 className="hor-section-title">Interactive Transformation: Forest to Plains</h3>
        <p className="hor-section-text">
          Use the interactive panel below to step through 55 million years of anatomy updates. Notice how climate shifts
          drove adaptations in feet, diet, and posture.
        </p>
      </div>

      <div className="hor-evo-interactive">
        {/* Main Display */}
        <div className="hor-evo-main-view">
          {stages.map((stage, index) => {
            let slideClass = "hor-evo-slide";
            if (index === activeStage) slideClass += " active";

            return (
              <div key={stage.id} className={slideClass}>
                <img src={stage.image} alt={stage.name} />
                <div className="hor-evo-overlay">
                  <div className="hor-evo-data-box">
                    <div className="hor-evo-era">{stage.era}</div>
                    <h4>{stage.name}</h4>
                    <p>{stage.desc}</p>
                    <div className="hor-evo-stats">
                      <div className="hor-evo-stat">
                        <span className="stat-icon">🦶</span>
                        <div className="stat-info">
                          <strong>Limb Digit Structure</strong>
                          <span>{stage.toes}</span>
                        </div>
                      </div>
                      <div className="hor-evo-stat">
                        <span className="stat-icon">🌍</span>
                        <div className="stat-info">
                          <strong>Environment</strong>
                          <span>{stage.environment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Navigation */}
        <div className="hor-evo-timeline-nav">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              className={`hor-evo-nav-btn ${index === activeStage ? "active" : ""}`}
              onClick={() => setActiveStage(index)}
            >
              <span className="nav-dot"></span>
              <span className="nav-label">{stage.era.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
