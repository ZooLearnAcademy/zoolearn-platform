"use client";

import React from "react";

const forces = [
  {
    icon: "🌿",
    title: "Reaching Higher Food",
    desc: "As African forests gave way to savanna, acacia trees became the primary food source. Only taller individuals could browse beyond the reach of every other herbivore.",
  },
  {
    icon: "🧬",
    title: "Natural Selection",
    desc: "Each generation, longer-necked giraffes survived lean seasons better and reproduced more successfully. Across millions of years, this compounded into extraordinary elongation.",
  },
  {
    icon: "🌡️",
    title: "Climate Change",
    desc: "The drying of Africa 5–8 million years ago replaced dense forest with open savanna — creating both the ecological pressure and the opportunity for upward browsing.",
  },
  {
    icon: "🥊",
    title: "Food Competition",
    desc: "As herbivore diversity exploded on the savanna, competition at ground level intensified dramatically. A taller browser had a monopoly on leaves no one else could reach.",
  },
  {
    icon: "💪",
    title: "Sexual Selection",
    desc: "Male giraffes use their necks as weapons in ritualized 'necking' combat. Longer-necked males win more fights, claim more mates, and pass their genes to more offspring.",
  },
];

export default function NeckScience() {
  return (
    <div className="gir-neck-science-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">The Science Behind the Neck</h3>
        <p className="gir-section-text">
          <strong>Why Necks Became Longer:</strong> Evolution is never a single story. The giraffe&apos;s neck emerged from the
          intersection of five powerful forces.
        </p>
      </div>

      <div className="gir-forces-grid">
        {forces.map((force, i) => (
          <div key={i} className="gir-force-card">
            <div className="gir-force-icon">{force.icon}</div>
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
