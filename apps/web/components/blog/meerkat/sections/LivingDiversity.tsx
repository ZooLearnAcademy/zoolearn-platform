"use client";

import React from "react";

const subspecies = [
  {
    name: "Southern Meerkat",
    scientific: "Suricata suricatta suricatta",
    status: "Least Concern",
    statusColor: "#16a34a",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783845296/meerkat_new11_e2c1ro.jpg",
  },
  {
    name: "Desert Meerkat",
    scientific: "Suricata suricatta majoriae",
    status: "Least Concern",
    statusColor: "#16a34a",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783759881/meerkat4_qem2wx.webp",
  },
  {
    name: "Angolan Meerkat",
    scientific: "Suricata suricatta iona",
    status: "Least Concern",
    statusColor: "#16a34a",
    image: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783845257/meerkat_new10_ppvzzp.jpg",
  },
];

export default function LivingDiversity() {
  return (
    <div className="gir-living-diversity-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">Living Subspecies: Subspecific Diversity</h3>
        <p className="gir-section-text">
          Evolution has shaped regional populations of meerkats to match their specific environments, resulting in three
          recognized subspecies spanning Southern Africa.
        </p>
      </div>

      <div className="gir-diversity-grid">
        {subspecies.map((sp, i) => (
          <div key={i} className="gir-div-card">
            <div className="gir-div-image-container">
              <img
                src={sp.image}
                alt={`${sp.name} — ${sp.scientific}`}
                className="gir-div-img"
                loading="lazy"
              />
            </div>
            <div className="gir-div-overlay">
              <span className="gir-div-status" style={{ backgroundColor: sp.statusColor }}>
                {sp.status}
              </span>
              <div className="gir-div-content">
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
