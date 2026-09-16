"use client";

import React from "react";

export default function EvolutionTimeline() {
  const timelineData = [
    { period: "20–25 Mya", ancestor: "Palaeomerycidae (family)", characteristics: "First ancestor; arose from gelocid ancestral assemblage" },
    { period: "16–20 Mya", ancestor: "Canthumeryx", characteristics: "Primitive giraffid, slightly elongated neck bones, long tongue" },
    { period: "20–2 Mya", ancestor: "Paleotragus", characteristics: "Short-necked, complete skin-covered horns" },
    { period: "12 Mya", ancestor: "Giraffokeryx", characteristics: "Short-necked, thrived on low vegetation (India/Eurasia)" },
    { period: "7–3 Mya", ancestor: "Samotherium", characteristics: "Short-necked transitional giraffe; Eurasia & Africa (Miocene–Pliocene)" },
    { period: "7–5 Mya", ancestor: "Bohlinia", characteristics: "Terminal Climacoceratid genus; progeny entered China & India" },
    { period: "~7.5 Mya", ancestor: "True long-necked giraffes", characteristics: "First appearance of extended necks" },
    { period: "7 Mya", ancestor: "Giraffa enters Africa", characteristics: "Via Ethiopia; radiated into multiple species" },
    { period: "4 Mya", ancestor: "Giraffa extinction in Asia", characteristics: "Climate change caused Asian counterparts to die off" },
    { period: "2 Mya", ancestor: "Neck elongation advances", characteristics: "Lineage further elongated neck vertebrae, enhancing reach" },
    { period: "1 Mya", ancestor: "G. camelopardalis appears", characteristics: "First fossils of modern giraffe in East Africa" },
    { period: "Present", ancestor: "4 species (Masai, Northern, Reticulated, Southern)", characteristics: "5 subspecies; ~140,000 total remaining" },
  ];

  const timeSpans = [
    { stage: "Palaeomerycidae to Canthumeryx", time: "25 → 16 Mya", duration: "9 Million Years", icon: "🌲" },
    { stage: "Canthumeryx to Giraffokeryx", time: "16 → 12 Mya", duration: "4 Million Years", icon: "🌿" },
    { stage: "Giraffokeryx to Bohlinia", time: "12 → 7 Mya", duration: "5 Million Years", icon: "🌳" },
    { stage: "Bohlinia to Modern", time: "7 → 1 Mya", duration: "6 Million Years", icon: "🦒" },
  ];

  return (
    <div className="gir-evo-timeline-section">
      {/* Time Span Summary */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">Evolutionary Epochs</h3>
        <p className="gir-section-text">
          The 24-million-year journey broken down into critical chapters of transformation.
        </p>

        <div className="gir-epoch-grid">
          {timeSpans.map((span, i) => (
            <div key={i} className="gir-epoch-card">
              <div className="gir-epoch-icon">{span.icon}</div>
              <div className="gir-epoch-content">
                <div className="gir-epoch-time">{span.time}</div>
                <h4>{span.stage}</h4>
                <div className="gir-epoch-duration">Takes {span.duration}</div>
              </div>
            </div>
          ))}
          <div className="gir-epoch-card total">
            <div className="gir-epoch-icon">⏳</div>
            <div className="gir-epoch-content">
              <div className="gir-epoch-time">25 → 1 Mya</div>
              <h4>Total Evolution</h4>
              <div className="gir-epoch-duration">24 Million Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Exact Ancestors */}
      <div className="gir-section-box" style={{ marginTop: "3rem" }}>
        <h3 className="gir-section-title">The Exact Ancestors</h3>
        <div className="gir-ancestors-grid">
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: "#ca8a04" }}>
              Earliest
            </div>
            <div className="gir-anc-header">
              <h4>Helladotherium</h4>
              <span>23 Mya</span>
            </div>
            <p>3 meters tall, antelope-like. Forefather of both modern giraffe AND okapi.</p>
          </div>

          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: "#b45309" }}>
              First Giraffid
            </div>
            <div className="gir-anc-header">
              <h4>Canthumeryx</h4>
              <span>16 Mya</span>
            </div>
            <p>Earliest known giraffid. Start of the giraffid family with slightly elongated neck vertebrae.</p>
          </div>

          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: "#ea580c" }}>
              Transitional
            </div>
            <div className="gir-anc-header">
              <h4>Samotherium</h4>
              <span>7 Mya</span>
            </div>
            <p>~1 meter neck. First elongation boost (cranial end stretched). Crucial evolutionary link.</p>
          </div>

          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: "#dc2626" }}>
              Most Direct
            </div>
            <div className="gir-anc-header">
              <h4>Bohlinia</h4>
              <span>7–9 Mya</span>
            </div>
            <p>Almost same size as modern giraffe. Direct ancestor of modern G. camelopardalis.</p>
          </div>
        </div>
      </div>

      {/* Complete Origin Timeline */}
      <div className="gir-section-box" style={{ marginTop: "3rem" }}>
        <h3 className="gir-section-title">Comprehensive Chronology</h3>

        <div className="gir-chrono-list">
          {timelineData.map((row, i) => (
            <div
              key={i}
              className={`gir-chrono-item ${row.period === "1 Mya" || row.period === "Present" ? "gir-chrono-highlight" : ""}`}
            >
              <div className="gir-chrono-time">{row.period}</div>
              <div className="gir-chrono-node"></div>
              <div className="gir-chrono-details">
                <h4>{row.ancestor}</h4>
                <p>{row.characteristics}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gir-callout gir-callout-fact" style={{ marginTop: "2rem" }}>
          <strong>🦒 Unique Achievement:</strong> Modern giraffe represents the only form that underwent BOTH elongation
          stages, making it uniquely long-necked among all living and extinct mammals.
        </div>
      </div>
    </div>
  );
}
