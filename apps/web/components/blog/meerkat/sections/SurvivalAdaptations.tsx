"use client";

import React, { useState } from "react";
import { Sun, Eye, Shield, Activity } from "lucide-react";

const adaptations = [
  {
    id: "belly",
    icon: <Sun size={32} />,
    title: "Solar Panel Belly",
    subtitle: "Thermal Regulation",
    points: [
      "Sparse stomach hair reveals dark skin",
      "Basks facing the morning sun to warm up",
      "Acts as a natural solar collector",
      "Crucial for survival after cold desert nights",
    ],
    color: "#2f8593",
  },
  {
    id: "eyes",
    icon: <Eye size={32} />,
    title: "Built-in Sunglasses",
    subtitle: "Anti-Glare Protection",
    points: [
      "Dark patches of fur surround the eyes",
      "Absorbs sunlight and reduces blinding glare",
      "Allows them to look directly into the sky",
      "Helps detect soaring eagles and hawks",
    ],
    color: "#8ba393",
  },
  {
    id: "venom",
    icon: <Shield size={32} />,
    title: "Venom Immunity",
    subtitle: "Chemical Defense",
    points: [
      "Natural resistance to scorpion & snake venom",
      "Evolved neurotoxin receptor blockades",
      "Enables hunting of deadly Kalahari scorpions",
      "Teaches pups how to handle live stingers",
    ],
    color: "#fcd42c",
  },
  {
    id: "claws",
    icon: <Activity size={32} />,
    title: "Excavation Master",
    subtitle: "Rapid Digging System",
    points: [
      "Long, strong, non-retractable foreclaws",
      "Special membranes cover eyes while digging",
      "Ears fold completely shut to keep sand out",
      "Can move their body weight in sand in seconds",
    ],
    color: "#1f5963",
  },
];

export default function SurvivalAdaptations() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="meer-adaptations-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">Biological Marvels: Desert Survival</h3>
        <p className="meer-section-text">
          Through millions of years in the unforgiving Kalahari, meerkats have evolved a toolkit of incredible
          biological solutions. Click any card to explore their survival adaptations.
        </p>
      </div>

      <div className="meer-adaptations-grid">
        {adaptations.map((item) => (
          <div
            key={item.id}
            className={`meer-adapt-flip-card ${activeCard === item.id ? "flipped" : ""}`}
            onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
          >
            <div className="meer-adapt-flip-inner">
              <div className="meer-adapt-flip-front" style={{ borderBottomColor: item.color }}>
                <span className="meer-adapt-icon-large">{item.icon}</span>
                <h4>{item.title}</h4>
                <span className="meer-adapt-subtitle" style={{ color: item.color }}>
                  {item.subtitle}
                </span>
                <div className="meer-click-hint">Click to explore</div>
              </div>

              <div className="meer-adapt-flip-back" style={{ background: item.color }}>
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
