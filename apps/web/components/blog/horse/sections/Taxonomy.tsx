"use client";

import React from "react";

export default function Taxonomy() {
  return (
    <div className="hor-taxonomy-section">
      <div className="hor-section-box">
        <h3 className="hor-section-title">Equidae Taxonomy: Branching of Modern Equids</h3>
        <p className="hor-section-text">
          Modern taxonomy classifies all living equids under a single genus, <strong>Equus</strong>. However, this
          genus is further divided into three distinct subgenera that separate true horses, zebras, and wild asses.
        </p>
      </div>

      <div className="tree-container">
        <div className="hor-tree-root">
          {/* Family Node */}
          <div className="hor-tree-node">
            <h5>Family: Equidae</h5>
            <p>All Equine Ancestors &amp; Relatives</p>
          </div>

          {/* Genus Node */}
          <div className="hor-tree-node sub-root">
            <h5>Genus: Equus</h5>
            <p>Modern One-Toed Equids</p>
          </div>

          {/* Subgenera Branches */}
          <div className="hor-tree-branches">
            {/* Branch 1: Horses */}
            <div className="hor-branch-col">
              <div className="hor-tree-node leaf">
                <h5>Subgenus: Equus</h5>
                <p>True Horses</p>
              </div>
              <div
                className="hor-section-list"
                style={{
                  listStyleType: "none",
                  padding: 0,
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "var(--hor-text-secondary)",
                }}
              >
                <li>
                  Domestic Horse (<em>E. caballus</em>)
                </li>
                <li>
                  Przewalski&apos;s Horse (<em>E. przewalskii</em>)
                </li>
              </div>
            </div>

            {/* Branch 2: Asses */}
            <div className="hor-branch-col">
              <div className="hor-tree-node leaf" style={{ borderColor: "#cd853f" }}>
                <h5>Subgenus: Asinus</h5>
                <p>Donkeys &amp; Asses</p>
              </div>
              <div
                className="hor-section-list"
                style={{
                  listStyleType: "none",
                  padding: 0,
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "var(--hor-text-secondary)",
                }}
              >
                <li>
                  African Wild Ass (<em>E. asinus</em>)
                </li>
                <li>
                  Onager (<em>E. hemionus</em>)
                </li>
                <li>
                  Kiang (<em>E. kiang</em>)
                </li>
              </div>
            </div>

            {/* Branch 3: Zebras */}
            <div className="hor-branch-col">
              <div className="hor-tree-node leaf" style={{ borderColor: "#272522" }}>
                <h5>Subgenus: Hippotigris</h5>
                <p>Zebras</p>
              </div>
              <div
                className="hor-section-list"
                style={{
                  listStyleType: "none",
                  padding: 0,
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "var(--hor-text-secondary)",
                }}
              >
                <li>
                  Plains Zebra (<em>E. quagga</em>)
                </li>
                <li>
                  Mountain Zebra (<em>E. zebra</em>)
                </li>
                <li>
                  Grevy&apos;s Zebra (<em>E. grevyi</em>)
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
