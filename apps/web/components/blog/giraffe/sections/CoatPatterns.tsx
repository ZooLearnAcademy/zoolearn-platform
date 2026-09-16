"use client";

import React, { useState } from "react";

const coatData = [
  {
    id: "reticulated",
    name: "Reticulated Giraffe",
    scientific: "Giraffa reticulata",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697790/zoolearn/giraffe/fvh8xl685zbkluixneim.jpg",
    color: "#ea580c",
    description:
      'Perhaps the most visually striking, the Reticulated giraffe is defined by sharp, uniform, reddish-brown polygons separated by stark, bright white lines. This creates a highly distinct "cobweb" or net-like effect. Found primarily in northeastern Kenya.',
    features: [
      "Smooth, well-defined polygon shapes",
      "Bright, high-contrast white lines",
      "Deep reddish-brown patches",
    ],
  },
  {
    id: "masai",
    name: "Masai Giraffe",
    scientific: "Giraffa tippelskirchi",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697785/zoolearn/giraffe/klcervl4bejvjafktktd.jpg",
    color: "#b45309",
    description:
      "The Masai giraffe is easily identified by its extremely dark, almost chocolate-brown spots that are highly irregular, jagged, and vine-like. The edges look like splattered stars or oak leaves. They dominate the landscapes of Kenya and Tanzania.",
    features: [
      "Irregular, jagged, star-like edges",
      "Darkest coloration of all species",
      "Creamy tan background lines",
    ],
  },
  {
    id: "southern",
    name: "Southern Giraffe",
    scientific: "Giraffa giraffa",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697794/zoolearn/giraffe/oz19xqs1udin9teuo7hp.jpg",
    color: "#16a34a",
    description:
      "Characterized by star-shaped patches that are less sharply defined than the Reticulated, but more rounded than the Masai. Crucially, their spots extend all the way down their legs to the hooves. Found in Namibia, South Africa, and Botswana.",
    features: [
      "Rounded, star-shaped patches",
      "Spots extend down to the hooves",
      "Warm tawny brown on light tan",
    ],
  },
  {
    id: "northern",
    name: "Northern Giraffe",
    scientific: "Giraffa camelopardalis",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697787/zoolearn/giraffe/ov1nhjy2qacmgkls8qoc.jpg",
    color: "#dc2626",
    description:
      "The Northern giraffe generally has large, paler chestnut-brown spots with relatively smooth edges, set against a pale cream background. Unlike the Southern giraffe, their lower legs are noticeably pale and mostly spot-free.",
    features: [
      "Pale, chestnut-brown patches",
      "Smooth edges",
      "Lower legs are stark white/spotless",
    ],
  },
];

export default function CoatPatterns() {
  const [activeCoat, setActiveCoat] = useState<(typeof coatData)[0]>(coatData[0]!);

  return (
    <div className="gir-coat-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Unique Spot Patterns: An Interactive Guide</h3>
        <p className="gir-section-text">
          Just like a human fingerprint, no two giraffes have the exact same coat. However, the{" "}
          <strong>shape, color, and spacing</strong> of the spots are the primary visual indicators for distinguishing the
          four distinct species in the wild.
        </p>
      </div>

      <div className="gir-coat-interactive-wrapper">
        {/* Thumbnails */}
        <div className="gir-coat-thumbnails">
          {coatData.map((coat) => (
            <button
              key={coat.id}
              className={`gir-coat-thumb-btn ${activeCoat.id === coat.id ? "active" : ""}`}
              onClick={() => setActiveCoat(coat)}
            >
              <div className="gir-coat-thumb-img-wrapper">
                <img src={coat.image} alt={`${coat.name} pattern`} />
              </div>
              <span className="gir-coat-thumb-label">{coat.name}</span>
            </button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="gir-coat-main-display">
          <div className="gir-coat-large-image">
            <img src={activeCoat.image} alt={activeCoat.name} />

            {/* Overlay Gradient for Text Readability */}
            <div className="gir-coat-overlay">
              <div className="gir-coat-info">
                <div className="gir-coat-header" style={{ borderLeftColor: activeCoat.color }}>
                  <h4 style={{ color: activeCoat.color }}>{activeCoat.name}</h4>
                  <em>{activeCoat.scientific}</em>
                </div>

                <p className="gir-coat-desc">{activeCoat.description}</p>

                <ul className="gir-coat-features">
                  {activeCoat.features.map((feature, idx) => (
                    <li key={idx}>
                      <span style={{ color: activeCoat.color }}>✓</span> {feature}
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
