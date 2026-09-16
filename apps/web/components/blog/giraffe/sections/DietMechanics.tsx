"use client";

import React from "react";

export default function DietMechanics() {
  return (
    <div className="gir-diet-section">
      {/* Intro */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">Life at the Top — Diet &amp; Mechanics</h3>
        <p className="gir-section-text">
          The giraffe&apos;s anatomy allows it to exploit a feeding zone — between <strong>4.5 and 5.5 meters</strong> off the
          ground — that is completely undisputed by other terrestrial herbivores. However, sustaining a body mass of up to{" "}
          <strong>1,900 kg (4,200 lbs)</strong> on a diet of leaves requires exceptional dietary mechanics.
        </p>
      </div>

      {/* Diet Table */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">The High Browser&apos;s Diet</h3>
        <div className="gir-taxonomy-table-wrapper">
          <table className="gir-taxonomy-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Feeding Type</strong>
                </td>
                <td>High browser — treetop leaves (4.5–5.5m height)</td>
              </tr>
              <tr>
                <td>
                  <strong>Primary Food</strong>
                </td>
                <td>Acacia (~60% of diet)</td>
              </tr>
              <tr>
                <td>
                  <strong>Secondary Foods</strong>
                </td>
                <td>Mimosa, Wild apricot, Leaves &amp; buds, Flowers, fruits, seeds, pods, Bark</td>
              </tr>
              <tr>
                <td>
                  <strong>Rare Foods</strong>
                </td>
                <td>Grass (&lt;15%), Bones (osteophagia for calcium/phosphorus)</td>
              </tr>
              <tr>
                <td>
                  <strong>Daily Intake</strong>
                </td>
                <td>25–45 kg of foliage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Adaptations */}
      <div className="gir-adaptation-grid">
        <div className="gir-adapt-card">
          <div className="gir-adapt-icon">🌿</div>
          <h4>The Acacia Staple</h4>
          <p>
            Approximately 60% of their diet consists of Acacia leaves — trees notorious for vicious, razor-sharp thorns
            designed to deter herbivores.
          </p>
        </div>

        <div className="gir-adapt-card">
          <div className="gir-adapt-icon">👅</div>
          <h4>18-Inch Prehensile Tongue</h4>
          <p>
            A massive, muscular, prehensile tongue up to 18 inches long. Colored deep purple or black to prevent sunburn,
            it delicately wraps around branches, stripping leaves while weaving past thorns.
          </p>
        </div>

        <div className="gir-adapt-card">
          <div className="gir-adapt-icon">🛡️</div>
          <h4>Thickened Anatomy</h4>
          <p>
            Lips and the inside of their mouths are covered in heavily keratinized, tough papillae (bumps) that prevent
            accidental thorn pricks from causing damage.
          </p>
        </div>
      </div>

      {/* Osteophagia */}
      <div className="gir-section-box" style={{ marginTop: "2rem" }}>
        <h3 className="gir-section-title">The Osteophagia Phenomenon</h3>
        <p className="gir-section-text">
          Giraffes avoid grass almost entirely (&lt;15% of diet), as bending down puts them in a highly vulnerable
          position to predators. Because their massive, towering skeletons require immense amounts of calcium and
          phosphorus, their plant-based diet sometimes falls short.
        </p>
        <div className="gir-callout gir-callout-fact">
          <strong>🦴 Osteophagia</strong>
          To supplement mineral requirements, giraffes find dried skeletons of dead animals on the savanna, pick up the
          bones, and slowly chew on them to extract residual calcium.
        </div>
      </div>

      {/* Cardiovascular */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">The Cardiovascular Cost</h3>
        <p className="gir-section-text">
          Fueling a brain that sits 18 feet in the air requires the most extreme cardiovascular system of any land
          animal.
        </p>

        <div className="gir-stats-grid">
          <div className="gir-stat-card">
            <span className="gir-stat-number">25 lbs</span>
            <span className="gir-stat-desc">Heart weight (11 kg)</span>
          </div>
          <div className="gir-stat-card">
            <span className="gir-stat-number">150 bpm</span>
            <span className="gir-stat-desc">Heart rate at peak</span>
          </div>
          <div className="gir-stat-card">
            <span className="gir-stat-number">2×</span>
            <span className="gir-stat-desc">Human blood pressure</span>
          </div>
        </div>

        <div className="gir-callout gir-callout-info" style={{ marginTop: "1rem" }}>
          <strong>🧠 Rete Mirabile</strong>
          When lowering their heads to drink, a complex network of elastic blood vessels at the base of the brain (
          <em>rete mirabile</em>) and one-way valves in the jugular vein engage instantly — preventing the immense blood
          pressure from causing a fatal brain hemorrhage.
        </div>
      </div>
    </div>
  );
}
