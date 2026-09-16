"use client";

import React from "react";
import { Trees, Leaf, Footprints, Sun, Clock } from "lucide-react";

export default function EvolutionTimeline() {
  const timelineData = [
    {
      period: "15 Mya",
      ancestor: "Feliformia Split",
      characteristics: "Diverged from early cat-like carnivores to form herpestid branches.",
    },
    {
      period: "10 Mya",
      ancestor: "Herpestidae Family",
      characteristics: "Radiation of early mongooses across Eurasian and African savanna grasslands.",
    },
    {
      period: "5 Mya",
      ancestor: "Suricata Divergence",
      characteristics: "Split from solitary mongooses, transitioning to open desert environments.",
    },
    {
      period: "2 Mya",
      ancestor: "Suricata major",
      characteristics: "Prehistoric fossil species found in South Africa; larger size than modern meerkats.",
    },
    {
      period: "1 Mya",
      ancestor: "Modern Meerkat appears",
      characteristics: "First fossils of modern Suricata suricatta emerge in dry South African zones.",
    },
    {
      period: "Present",
      ancestor: "3 Living Subspecies",
      characteristics: "Southern, Desert, and Angolan meerkats populate Kalahari, Namib, and Angolan plains.",
    },
  ];

  const timeSpans = [
    { stage: "Feliformia to Herpestidae", time: "15 → 10 Mya", duration: "5 Million Years", icon: <Trees size={24} /> },
    { stage: "Herpestidae to Suricata", time: "10 → 5 Mya", duration: "5 Million Years", icon: <Leaf size={24} /> },
    { stage: "Suricata to Suricata major", time: "5 → 2 Mya", duration: "3 Million Years", icon: <Footprints size={24} /> },
    { stage: "Suricata major to Modern", time: "2 → 1 Mya", duration: "1 Million Years", icon: <Sun size={24} /> },
  ];

  return (
    <div className="gir-evo-timeline-section">
      {/* Time Span Summary */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">Evolutionary Chapters</h3>
        <p className="gir-section-text">
          The 15-million-year evolutionary path of meerkats broken down into key transitions.
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
          <div className="gir-epoch-card total" style={{ borderColor: "var(--meer-primary, #2f8593)" }}>
            <div className="gir-epoch-icon">
              <Clock size={24} />
            </div>
            <div className="gir-epoch-content">
              <div className="gir-epoch-time">15 → 1 Mya</div>
              <h4>Total Evolution</h4>
              <div className="gir-epoch-duration">14 Million Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Evolutionary Milestones */}
      <div className="gir-section-box" style={{ marginTop: "3rem" }}>
        <h3 className="gir-section-title">Critical Evolutionary Milestones</h3>
        <div className="gir-ancestors-grid">
          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: "#2f8593" }}>
              Feliformia
            </div>
            <div className="gir-anc-header">
              <h4>Herpestidae Split</h4>
              <span>15 Mya</span>
            </div>
            <p>Diverged from other feliforms, specializing in ground-dwelling insectivorous habits.</p>
          </div>

          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: "#8ba393" }}>
              Open Savanna
            </div>
            <div className="gir-anc-header">
              <h4>Suricata Split</h4>
              <span>5 Mya</span>
            </div>
            <p>Left dense cover for open plains, driving the need for social warning systems.</p>
          </div>

          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: "#fcd42c", color: "var(--meer-text-main, #1c2b1c)" }}>
              Fossil Record
            </div>
            <div className="gir-anc-header">
              <h4>Suricata major</h4>
              <span>2 Mya</span>
            </div>
            <p>Prehistoric ancestor of meerkats, showing identical digging anatomy but larger body mass.</p>
          </div>

          <div className="gir-anc-card">
            <div className="gir-anc-badge" style={{ background: "#1f5963" }}>
              Modern form
            </div>
            <div className="gir-anc-header">
              <h4>Suricata suricatta</h4>
              <span>1 Mya</span>
            </div>
            <p>First appearance of fully modern meerkats with specialized group-rearing and alarm vocalizations.</p>
          </div>
        </div>
      </div>

      {/* Complete origin timeline */}
      <div className="gir-section-box" style={{ marginTop: "3rem" }}>
        <h3 className="gir-section-title">Chronological Milestones</h3>

        <div className="gir-chrono-list">
          {timelineData.map((row, i) => (
            <div
              key={i}
              className={`gir-chrono-item ${row.period === "1 Mya" || row.period === "Present" ? "gir-chrono-highlight" : ""}`}
            >
              <div className="gir-chrono-time">{row.period}</div>
              <div className="gir-chrono-node" style={{ background: "var(--meer-primary, #2f8593)" }}></div>
              <div className="gir-chrono-details">
                <h4>{row.ancestor}</h4>
                <p>{row.characteristics}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="gir-callout gir-callout-fact"
          style={{ marginTop: "2rem", borderLeftColor: "var(--meer-primary, #2f8593)" }}
        >
          <strong>Unique Achievement:</strong> Modern meerkats are the only mongooses to evolve complete division of
          labor, altruistic guard rotations, and active teaching (mentoring) of hunting strategies.
        </div>
      </div>
    </div>
  );
}
