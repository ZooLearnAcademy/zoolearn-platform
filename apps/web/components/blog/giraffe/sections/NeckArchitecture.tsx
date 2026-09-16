"use client";

import React from "react";

export default function NeckArchitecture() {
  return (
    <div className="gir-neck-section">
      {/* Main Intro */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">The Architecture of the Neck</h3>
        <p className="gir-section-text">
          How exactly does a mammal grow an <strong>18-foot neck</strong>? The anatomical mechanics are deeply
          counterintuitive. Like humans, mice, and almost every other mammal on Earth,{" "}
          <strong>giraffes only have seven cervical (neck) vertebrae</strong>. To achieve their massive height, they
          didn&apos;t grow <em>more</em> bones — they radically <strong>stretched</strong> the ones they had.
        </p>
        <div className="gir-callout gir-callout-info">
          <strong>🦴 Key Fact</strong>
          A giraffe&apos;s third cervical vertebra (C3) is about the size of a human humerus (upper arm bone) and is{" "}
          <strong>nine times longer than it is wide</strong>.
        </div>
      </div>

      {/* The Two Boosts */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">The Two Elongation Stages</h3>
        <p className="gir-section-text">
          Fossil analyses published in <em>Royal Society Open Science</em> revealed that this stretching did not happen
          simultaneously. The modern giraffe is the <strong>only animal in history</strong> to undergo two completely
          separate elongation stages within the exact same bones:
        </p>

        <div className="gir-boost-cards">
          <div className="gir-boost-card cranial">
            <div className="gir-boost-badge">Stage 1</div>
            <h4 className="gir-boost-title">The Cranial Boost</h4>
            <span className="gir-boost-period">~7 Million Years Ago</span>
            <p className="gir-boost-desc">
              In transitional ancestors like <em>Samotherium</em>, only the <strong>cranial end</strong> (the front
              portion pointing toward the head) of the C3 vertebra stretched out.
            </p>
            <div className="gir-boost-visual">
              <div className="gir-vertebra">
                <div className="gir-vertebra-front stretched" />
                <div className="gir-vertebra-back" />
              </div>
              <span className="gir-boost-label">Front elongated ✓</span>
            </div>
          </div>

          <div className="gir-boost-card caudal">
            <div className="gir-boost-badge">Stage 2</div>
            <h4 className="gir-boost-title">The Caudal Boost</h4>
            <span className="gir-boost-period">~1 Million Years Ago</span>
            <p className="gir-boost-desc">
              Millions of years later, in the modern <em>G. camelopardalis</em>, the <strong>caudal end</strong> (the
              back portion pointing toward the tail) of that identical vertebra lengthened.
            </p>
            <div className="gir-boost-visual">
              <div className="gir-vertebra fully-stretched">
                <div className="gir-vertebra-front stretched" />
                <div className="gir-vertebra-back stretched" />
              </div>
              <span className="gir-boost-label">Both ends elongated ✓✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 8th Vertebra */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">The &quot;Eighth&quot; Neck Vertebra</h3>
        <p className="gir-section-text">
          A landmark <strong>2016 anatomical study</strong> by the University of Tokyo uncovered another structural
          secret. While giraffes only have seven true neck vertebrae, their first thoracic vertebra (T1) — which normally
          sits rigidly in the chest — has evolved <strong>extreme mobility</strong>.
        </p>

        <div className="gir-highlight-box">
          <div className="gir-highlight-icon">🔓</div>
          <div className="gir-highlight-content">
            <h4>T1 Acts as an Eighth Neck Vertebra</h4>
            <p>
              It provides a highly flexible fulcrum that grants the giraffe an extra{" "}
              <strong>50 centimeters (nearly 20 inches)</strong> of reach. This adaptation allows the dual, conflicting
              abilities to reach treetop canopies <em>and</em> bend down to drink water.
            </p>
          </div>
        </div>
      </div>

      {/* Neck Evolution Hypotheses */}
      <div className="gir-section-box">
        <h3 className="gir-section-title">Why Did the Neck Elongate?</h3>
        <p className="gir-section-text">Two leading hypotheses compete for the explanation:</p>

        <div className="gir-grid-2">
          <div className="gir-hypothesis-card">
            <div className="gir-hyp-header">
              <span className="gir-hyp-icon">🌳</span>
              <h4>High Browse (Feeding)</h4>
            </div>
            <p>
              Reach treetop leaves unavailable to competitors during food scarcity. Giraffes eat higher branches other
              animals can&apos;t reach.
            </p>
            <div className="gir-hyp-evidence">
              <span className="gir-evidence-label">Evidence:</span>
              Body proportions directly correlate with high-canopy browsing
            </div>
          </div>

          <div className="gir-hypothesis-card">
            <div className="gir-hyp-header">
              <span className="gir-hyp-icon">⚔️</span>
              <h4>Necks-for-Sex (Combat)</h4>
            </div>
            <p>
              Male necking battles for dominance select longer necks. Males swing necks to deliver powerful blows with
              ossicones.
            </p>
            <div className="gir-hyp-evidence">
              <span className="gir-evidence-label">Evidence:</span>
              Males have heavier skulls and use neck as a weapon
            </div>
          </div>
        </div>

        <div className="gir-callout gir-callout-fact" style={{ marginTop: "1rem" }}>
          <strong>📊 2024 Finding</strong>
          Recent research concludes: <strong>Food, not sex</strong>, drove neck evolution — body proportions support the
          feeding hypothesis over the sexual selection hypothesis.
        </div>
      </div>
    </div>
  );
}
