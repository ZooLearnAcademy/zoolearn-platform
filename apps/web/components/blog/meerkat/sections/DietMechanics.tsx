"use client";

import React from "react";

const preyItems = [
  {
    icon: "🐛",
    title: "Insects & Grubs",
    desc: "Beetle larvae, caterpillars, pupae, and termites make up the majority of their diet. Highly nutritious and rich in fat and proteins.",
  },
  {
    icon: "🦂",
    title: "Venomous Arachnids",
    desc: "Spiders, centipedes, and scorpions. Adults hunt them with immunity, disarming scorpions by removing the stinger with lightning-fast speed.",
  },
  {
    icon: "🦎",
    title: "Small Reptiles",
    desc: "Lizards, geckos, and small desert snakes. These provide crucial protein boosts and require high agility and cooperation to capture.",
  },
  {
    icon: "🥔",
    title: "Succulent Roots",
    desc: "When insects are scarce during drought seasons, they dig up succulent roots and tubers, which contain high quantities of water.",
  },
];

export default function DietMechanics() {
  return (
    <div className="meer-diet-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">Diet &amp; Foraging: The Opportunistic Hunter</h3>
        <p className="meer-section-text">
          Meerkats are primarily insectivores, but they are highly opportunistic feeders. Because they have very little
          body fat and a high metabolic rate, they must spend a large part of every day foraging for food, turning over
          stones, and digging into crevices.
        </p>
      </div>

      <div className="meer-diet-grid">
        {preyItems.map((item, i) => (
          <div key={i} className="meer-diet-card">
            <div className="meer-diet-icon">{item.icon}</div>
            <div className="meer-diet-content">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="meer-callout meer-callout-water">
        <strong>💧 The Water Mystery: How They Stay Hydrated</strong>
        <p>
          Meerkats do not need to drink standing water! In the Kalahari Desert, open water sources are virtually
          nonexistent for months. Meerkats solve this by absorbing 100% of their hydration from the moisture content of
          their prey, grubs, and the water-rich succulent tubers they dig up.
        </p>
      </div>
    </div>
  );
}
