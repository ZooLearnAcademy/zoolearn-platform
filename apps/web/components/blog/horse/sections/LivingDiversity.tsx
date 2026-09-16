"use client";

import React from "react";

const species = [
  {
    name: "Domestic Horse",
    scientific: "Equus caballus",
    status: "Domesticated",
    statusColor: "#16a34a",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1774341098/Equus_ferus_vk3fio.png",
  },
  {
    name: "Plains Zebra",
    scientific: "Equus quagga",
    status: "Near Threatened",
    statusColor: "#eab308",
    image: "https://images.unsplash.com/photo-1501705388883-4ed8a543392c?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "African Wild Ass",
    scientific: "Equus asinus",
    status: "Critically Endangered",
    statusColor: "#dc2626",
    image: "https://images.unsplash.com/photo-1532713109643-df9b541e2dbd?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Przewalski's Horse",
    scientific: "Equus przewalskii",
    status: "Endangered",
    statusColor: "#ea580c",
    image: "https://images.unsplash.com/photo-1598974357830-72df45734453?q=80&w=600&auto=format&fit=crop",
  },
];

export default function LivingDiversity() {
  return (
    <div className="hor-living-diversity-section">
      <div className="hor-section-box">
        <h3 className="hor-section-title">Living Diversity: The Modern Equidae</h3>
        <p className="hor-section-text">
          Today, the Equidae family contains seven wild species (three zebras, three wild asses, and Przewalski&apos;s wild
          horse) along with the domestic horse and donkey. Together, they represent the survivors of a once vast
          evolutionary branch.
        </p>
      </div>

      <div className="hor-diversity-grid">
        {species.map((sp, i) => (
          <div key={i} className="hor-div-card">
            <div className="hor-div-image-container">
              <img
                src={sp.image}
                alt={`${sp.name} — ${sp.scientific}`}
                className="hor-div-img"
                loading="lazy"
              />
            </div>
            <div className="hor-div-overlay">
              <span className="hor-div-status" style={{ backgroundColor: sp.statusColor }}>
                {sp.status}
              </span>
              <div className="hor-div-content">
                <h4>{sp.name}</h4>
                <em>{sp.scientific}</em>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
