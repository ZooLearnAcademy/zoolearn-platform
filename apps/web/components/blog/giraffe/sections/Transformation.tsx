"use client";

import React, { useState } from "react";

const stages = [
  {
    id: 1,
    name: "Palaeomerycidae",
    era: "25 Million Years Ago",
    neck: "Short (Deer-like)",
    environment: "Dense prehistoric forests",
    desc: "The earliest known ancestor. With a thick build and short neck, it was perfectly adapted to browsing low-lying forest vegetation.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697837/zoolearn/giraffe/fuzdsqrd2bkoauro5w8i.jpg",
  },
  {
    id: 2,
    name: "Canthumeryx",
    era: "16 Million Years Ago",
    neck: "Slightly Elongated",
    environment: "Transitional woodland",
    desc: "As the forests began to thin, the first subtle signs of elongation appeared in the cervical vertebrae, allowing it to reach slightly higher leaves.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697838/zoolearn/giraffe/vnu6jvx7dj70oiq1t3h9.jpg",
  },
  {
    id: 3,
    name: "Samotherium",
    era: "7 Million Years Ago",
    neck: "Medium (~1 meter)",
    environment: "Early dry savanna",
    desc: "A crucial transitional form. The cranial end of the C3 vertebra stretched out (the first elongation boost), giving it a distinctive mid-length neck.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697840/zoolearn/giraffe/xc7xeax5e7x60oztbhzl.jpg",
  },
  {
    id: 4,
    name: "Giraffa camelopardalis",
    era: "Modern Era",
    neck: "Extreme (~2.4 meters)",
    environment: "Open African savanna",
    desc: "The second elongation boost occurred (lengthening the caudal end of the vertebrae). Fully adapted to dominate the high canopy of the open savanna.",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697841/zoolearn/giraffe/y1izgulqngy7iej6m99m.jpg",
  },
];

export default function Transformation() {
  const [activeStage, setActiveStage] = useState(0);
  const [prevStage, setPrevStage] = useState(0);

  const handleStageChange = (index: number) => {
    setPrevStage(activeStage);
    setActiveStage(index);
  };

  return (
    <div className="gir-transformation-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Interactive Transformation</h3>
        <p className="gir-section-text">
          Follow the 25-million-year journey. Click the timeline stages below to witness how shifting ecosystems drove
          the most extreme anatomical transformation in mammalian history.
        </p>
      </div>

      <div className="gir-evo-interactive">
        {/* Main Display */}
        <div className="gir-evo-main-view">
          {stages.map((stage, index) => {
            let slideClass = "gir-evo-slide";
            if (index === activeStage) slideClass += " active";
            else if (index === prevStage) slideClass += " previous";

            // Determine wipe direction
            if (index === activeStage && activeStage > prevStage) slideClass += " wipe-forward";
            if (index === activeStage && activeStage < prevStage) slideClass += " wipe-backward";

            return (
              <div key={stage.id} className={slideClass}>
                <img src={stage.image} alt={stage.name} />
                <div className="gir-evo-overlay">
                  <div className="gir-evo-data-box">
                    <div className="gir-evo-era">{stage.era}</div>
                    <h4>{stage.name}</h4>
                    <p>{stage.desc}</p>
                    <div className="gir-evo-stats">
                      <div className="gir-evo-stat">
                        <span className="stat-icon">🦴</span>
                        <div className="stat-info">
                          <strong>Neck Length</strong>
                          <span>{stage.neck}</span>
                        </div>
                      </div>
                      <div className="gir-evo-stat">
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

        {/* Timeline Controls */}
        <div className="gir-evo-timeline-controls">
          <div className="gir-evo-progress-track">
            <div
              className="gir-evo-progress-fill"
              style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
            ></div>
          </div>

          <div className="gir-evo-steps">
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                className={`gir-evo-step-btn ${index <= activeStage ? "completed" : ""} ${index === activeStage ? "active" : ""}`}
                onClick={() => handleStageChange(index)}
              >
                <div className="gir-evo-step-dot"></div>
                <div className="gir-evo-step-label">{stage.era.split(" ")[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
