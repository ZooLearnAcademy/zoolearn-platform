"use client";

import React, { useState } from "react";

const adaptations = [
  {
    id: "hoof",
    icon: "🐎",
    title: "The Single Hoof",
    subtitle: "Digit III Dominance",
    points: [
      "Reduced from 4 digits to a single functional toe",
      "Saves energy by minimizing limb mass at the extremity",
      "Hoof made of keratin, acting as a natural shock absorber",
      "Allows for high-velocity running on hard soil",
    ],
    color: "#8b4513",
  },
  {
    id: "teeth",
    icon: "🦷",
    title: "Hypsodont Teeth",
    subtitle: "High-Crowned Molars",
    points: [
      "Extremely long crowns extending deep into the jaw",
      "Covered with a tough layer of cementum",
      "Slowly erupts as grinding surfaces wear down",
      "Specifically evolved to grind silica-rich, abrasive grasses",
    ],
    color: "#a0522d",
  },
  {
    id: "limbs",
    icon: "🦴",
    title: "Cursorial Limbs",
    subtitle: "Specialized Running",
    points: [
      "Elongation of metacarpal/metatarsal bones",
      "Fusion of radius-ulna and tibia-fibula to prevent rotation",
      "Restricts limb movement to a single fore-and-aft plane",
      "Maximized stride length for cursorial locomotion",
    ],
    color: "#d2691e",
  },
  {
    id: "size",
    icon: "📈",
    title: "Size Progression",
    subtitle: "Fox to Stallion",
    points: [
      "Overall body size increased dramatically over 55 million years",
      "Evolved from 40 cm tall (Eohippus) to 150+ cm (Equus)",
      "Larger size allows digestion of low-quality fibrous grasses",
      "Provides physical defense and stamina against open-field predators",
    ],
    color: "#cd853f",
  },
];

export default function Adaptations() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="hor-adaptations-section">
      <div className="hor-section-box">
        <h3 className="hor-section-title">Anatomical Adaptations: Built for the Steppes</h3>
        <p className="hor-section-text">
          Environmental changes driven by plate tectonics forced horses to adapt or perish. Click each card below to
          explore how natural selection sculpted the modern horse.
        </p>
      </div>

      <div className="hor-adaptations-grid">
        {adaptations.map((item) => (
          <div
            key={item.id}
            className={`hor-adapt-flip-card ${activeCard === item.id ? "flipped" : ""}`}
            onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
          >
            <div className="hor-adapt-flip-inner">
              <div className="hor-adapt-flip-front" style={{ borderBottomColor: item.color }}>
                <span className="hor-adapt-icon-large">{item.icon}</span>
                <h4>{item.title}</h4>
                <span className="hor-adapt-subtitle" style={{ color: item.color }}>
                  {item.subtitle}
                </span>
                <div className="hor-click-hint">Click to explore</div>
              </div>

              <div className="hor-adapt-flip-back" style={{ background: item.color }}>
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
