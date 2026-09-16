"use client";

import React from "react";
import { Dna, Telescope, MessageSquare, RefreshCcw, Swords } from "lucide-react";

const altruisticForces = [
  {
    icon: <Dna size={24} />,
    title: "Kin Selection",
    desc: "Helpers in a mob share a high percentage of genes with the alpha pair's offspring. By sacrificing their food and safety to protect the pups, they ensure their own genetic lineage survives.",
  },
  {
    icon: <Telescope size={24} />,
    title: "Vigilance Trade-off",
    desc: "Meerkats must dig deep to find grubs, leaving them blind to danger. Having one dedicated sentinel look out allows foragers to work efficiently without constantly stopping to scan.",
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Vocal Language Coordination",
    desc: 'Sentinels communicate constantly via "peeps" to signal safety, and issue precise alarm calls specifying the danger type (air vs. land) and urgency level, saving precious seconds.',
  },
  {
    icon: <RefreshCcw size={24} />,
    title: "Sentinel Rotations",
    desc: "Guard duty is highly demanding. Mobs rotate sentinel shifts throughout the day, ensuring everyone gets a chance to forage and maintain their strength.",
  },
  {
    icon: <Swords size={24} />,
    title: "Territorial Defense",
    desc: "Meerkats defend elaborate underground burrows and food territories. Larger mobs have a higher success rate in repelling rival clans during territory wars.",
  },
];

export default function AltruismScience() {
  return (
    <div className="meer-neck-science-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">The Science of Altruism: Why Meerkats Cooperate</h3>
        <p className="meer-section-text">
          <strong>The Evolution of Selflessness:</strong> Altruism is rare in the animal kingdom, but the meerkat is a
          prime exception. Their cooperative lifestyle is driven by five evolutionary forces.
        </p>
      </div>

      <div className="gir-forces-grid">
        {altruisticForces.map((force, i) => (
          <div key={i} className="gir-force-card">
            <div
              className="gir-force-icon"
              style={{ background: "var(--meer-primary-light)", color: "var(--meer-primary-dark)" }}
            >
              {force.icon}
            </div>
            <div className="gir-force-content">
              <h4>{force.title}</h4>
              <p>{force.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
