"use client";

import React, { useState } from "react";

const adaptations = [
  {
    id: "neck",
    icon: "🦒",
    title: "The Extraordinary Neck",
    subtitle: "2.4 m long",
    points: [
      "Same 7 vertebrae as humans",
      "Each bone over 25 cm long",
      "Rivals any other herbivore for food access",
      "Used as a weapon in 'necking' combat",
    ],
    color: "#b45309",
  },
  {
    id: "heart",
    icon: "❤️",
    title: "The 11 kg Heart",
    subtitle: "11 kg weight",
    points: [
      "Twice human blood pressure",
      "Pumps blood nearly 2 m upward",
      "60 cm in diameter",
      "Beats ~65 times per minute",
    ],
    color: "#dc2626",
  },
  {
    id: "tongue",
    icon: "👅",
    title: "The 50 cm Tongue",
    subtitle: "50 cm length",
    points: [
      "Dark blue-black pigmentation",
      "Blocks UV radiation in open sun",
      "Wraps around thorny acacia branches",
      "Prehensile — works like a hand",
    ],
    color: "#ea580c",
  },
  {
    id: "spots",
    icon: "🌟",
    title: "Unique Spot Patterns",
    subtitle: "No two alike",
    points: [
      "Individual as a fingerprint",
      "Acts as a thermal radiator",
      "Blood vessels release heat at patch edges",
      "Spot shape is species-specific",
    ],
    color: "#ca8a04",
  },
];

export default function Adaptations() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="gir-adaptations-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Biological Marvels: Amazing Adaptations</h3>
        <p className="gir-section-text">
          Evolution sculpted the giraffe into a marvel of engineering. Click a card to explore each adaptation.
        </p>
      </div>

      <div className="gir-adaptations-grid">
        {adaptations.map((item) => (
          <div
            key={item.id}
            className={`gir-adapt-flip-card ${activeCard === item.id ? "flipped" : ""}`}
            onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
          >
            <div className="gir-adapt-flip-inner">
              <div className="gir-adapt-flip-front" style={{ borderBottomColor: item.color }}>
                <span className="gir-adapt-icon-large">{item.icon}</span>
                <h4>{item.title}</h4>
                <span className="gir-adapt-subtitle" style={{ color: item.color }}>
                  {item.subtitle}
                </span>
                <div className="gir-click-hint">Click to explore</div>
              </div>

              <div className="gir-adapt-flip-back" style={{ background: item.color }}>
                <h4>{item.title}</h4>
                <ul>
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
