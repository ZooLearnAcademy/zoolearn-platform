"use client";

import React, { useState } from "react";

const rolesData = [
  {
    id: "sentinel",
    name: "The Sentinel",
    subtitle: "The Lookout Guard",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783843298/meerkat_new_01_o40s9h.jpg",
    color: "#2f8593",
    description:
      "The sentinel is the lifeline of the meerkat mob. Climbing to a high vantage point, such as a rock or termite mound, the sentinel stands tall on its hind legs to scan the horizon and sky for incoming predators.",
    features: [
      "Uses complex vocal alarm calls to signal danger type and urgency",
      "Stands on hind legs using its strong tail as a balancing tripod",
      "Acts completely altruistically, sacrificing foraging time to protect others",
    ],
  },
  {
    id: "babysitter",
    name: "The Babysitter",
    subtitle: "The Pup Guardian",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783843310/meerkat_new_02_mwm5sf.jpg",
    color: "#8ba393",
    description:
      "When the mob leaves the safety of the burrow to forage, they cannot take young pups with them. One or more adult babysitters stay behind to guard the burrow system and defend the helpless pups.",
    features: [
      "Subordinate adults volunteer for duty, often skipping meals for the day",
      "Will scoop pups under their bodies to shield them during predator attacks",
      "Can lose up to 5% of their body weight in a single babysitting shift",
    ],
  },
  {
    id: "forager",
    name: "The Forager",
    subtitle: "The Food Provider",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783843321/meerkat_new03_vus7xq.jpg",
    color: "#fcd42c",
    description:
      "Foragers spend their days with their noses to the ground, frantically digging and searching for food. They turn over rocks and search through sandy tunnels to hunt down insects, grubs, and small reptiles.",
    features: [
      "Uses an acute sense of smell to detect prey hidden deep beneath the sand",
      "Frantically excavates soil using long, non-retractable claws",
      "Brings captured grubs back to the pups rather than eating them immediately",
    ],
  },
  {
    id: "mentor",
    name: "The Mentor",
    subtitle: "The Hunting Instructor",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783843332/meerkat_new04_jopbe6.jpg",
    color: "#1f5963",
    description:
      "Meerkats are not born knowing how to handle venomous scorpions or fast lizards. Adult mentors take on the role of teaching younger pups how to hunt and neutralize dangerous prey safely.",
    features: [
      "Presents dead scorpions first to let pups practice handling them safely",
      "Disarms live scorpions by removing the venomous tail stinger before offering them",
      "Gradually increases difficulty until the pup can hunt fully armed prey",
    ],
  },
  {
    id: "alpha",
    name: "The Alpha Pair",
    subtitle: "The Mob Leaders",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783843361/meerkat_new07_gezmfo.jpg",
    color: "#dc2626",
    description:
      "A meerkat clan is a strict matriarchy led by a dominant alpha female and her alpha male partner. They direct the mob's movement, decide when to move burrows, and lead territory defense.",
    features: [
      "The alpha pair monopolizes reproduction, producing up to 80% of all surviving pups",
      "The alpha female actively suppresses other breeding females to conserve resources",
      "Coordinates territory defense against rival meerkat mobs (inter-clan wars)",
    ],
  },
];

export default function SocialSentinels() {
  const [activeRole, setActiveRole] = useState<(typeof rolesData)[0]>(rolesData[0]!);

  return (
    <div className="meer-roles-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">Cooperative Society: Interactive Role Guide</h3>
        <p className="meer-section-text">
          Survival in the Kalahari is impossible alone. Meerkats thrive through an advanced division of labor where
          every individual has a vital role. Click the tabs below to explore the jobs inside a meerkat mob.
        </p>
      </div>

      <div className="meer-roles-interactive-wrapper">
        {/* Role Selectors */}
        <div className="meer-roles-thumbnails">
          {rolesData.map((role) => (
            <button
              key={role.id}
              className={`meer-role-thumb-btn ${activeRole.id === role.id ? "active" : ""}`}
              onClick={() => setActiveRole(role)}
            >
              <span className="meer-role-thumb-label">{role.name}</span>
            </button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="meer-role-main-display">
          <div className="meer-role-large-image">
            <img src={activeRole.image} alt={activeRole.name} />

            {/* Overlay Gradient for Text Readability */}
            <div className="meer-role-overlay">
              <div className="meer-role-info">
                <div className="meer-role-header" style={{ borderLeftColor: activeRole.color }}>
                  <h4 style={{ color: activeRole.color }}>{activeRole.name}</h4>
                  <em>{activeRole.subtitle}</em>
                </div>

                <p className="meer-role-desc">{activeRole.description}</p>

                <ul className="meer-role-features">
                  {activeRole.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="bullet-star" style={{ color: activeRole.color }}>
                        ★
                      </span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
