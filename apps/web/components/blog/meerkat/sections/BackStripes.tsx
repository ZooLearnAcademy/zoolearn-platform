"use client";

import React, { useState } from "react";

const stripesData = [
  {
    id: "southern",
    name: "Southern Meerkat",
    scientific: "Suricata suricatta suricatta",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783760939/meerkat02_oqtw1d.jpg",
    color: "#2f8593",
    description:
      "The nominate subspecies. Found in South Africa, Namibia, and Botswana, the Southern meerkat is defined by a warm tawny-brown coat with bold, dark brown horizontal bands across its back. The stripes are highly contrasting, aiding in camouflage among dry savanna brush.",
    features: [
      "Warm, reddish-tawny base coloration",
      "Bold, highly contrasting dark horizontal stripes",
      "Thick tail with a prominent dark black tip",
    ],
  },
  {
    id: "desert",
    name: "Desert Meerkat",
    scientific: "Suricata suricatta majoriae",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783843298/meerkat_new_01_o40s9h.jpg",
    color: "#8ba393",
    description:
      "Adapted to the intense sun and sand of the Namib Desert. This subspecies exhibits a very pale, silvery-fawn or light sandy-gray coat. The stripes on its back are thinner, fainter, and less defined to prevent heat absorption and blend into sand dunes.",
    features: [
      "Very pale, silvery-fawn coat to reflect sunlight",
      "Thin, faint, low-contrast stripe markings",
      "Slender build adapted to extreme Namib aridity",
    ],
  },
  {
    id: "angolan",
    name: "Angolan Meerkat",
    scientific: "Suricata suricatta iona",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783843310/meerkat_new_02_mwm5sf.jpg",
    color: "#fcd42c",
    description:
      "Hailing from southwestern Angola. The Angolan meerkat is characterized by a darker, brownish-yellow coat. Its back markings are intermediate, displaying thick but slightly diffuse stripe patterns suitable for transitional bushland.",
    features: [
      "Brownish-yellow base coat coloration",
      "Thick, slightly diffuse dark brown stripe markings",
      "Found in northernmost range border areas",
    ],
  },
];

export default function BackStripes() {
  const [activeStripe, setActiveStripe] = useState<(typeof stripesData)[0]>(stripesData[0]!);

  return (
    <div className="meer-stripe-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">Unique Back Stripes: Subspecies Camouflage Guide</h3>
        <p className="meer-section-text">
          Just like human fingerprints, no two meerkats have the exact same bar markings. These{" "}
          <strong>unique back stripes</strong> help individuals identify each other and serve as natural camouflage.
          Click a subspecies below to explore their specific markings and coat variations.
        </p>
      </div>

      <div className="gir-coat-interactive-wrapper">
        {/* Thumbnails */}
        <div className="gir-coat-thumbnails">
          {stripesData.map((stripe) => (
            <button
              key={stripe.id}
              className={`gir-coat-thumb-btn ${activeStripe.id === stripe.id ? "active" : ""}`}
              onClick={() => setActiveStripe(stripe)}
            >
              <span className="gir-coat-thumb-label">{stripe.name}</span>
            </button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="gir-coat-main-display">
          <div className="gir-coat-large-image">
            <img src={activeStripe.image} alt={activeStripe.name} />

            {/* Overlay Gradient for Text Readability */}
            <div className="gir-coat-overlay">
              <div className="gir-coat-info">
                <div className="gir-coat-header" style={{ borderLeftColor: activeStripe.color }}>
                  <h4 style={{ color: activeStripe.color }}>{activeStripe.name}</h4>
                  <em>{activeStripe.scientific}</em>
                </div>

                <p className="gir-coat-desc">{activeStripe.description}</p>

                <ul className="gir-coat-features">
                  {activeStripe.features.map((feature, idx) => (
                    <li key={idx}>
                      <span style={{ color: activeStripe.color }}>✓</span> {feature}
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
