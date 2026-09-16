"use client";

import React from "react";

export default function SpeciesSubspecies() {
  const speciesData = [
    {
      id: 1,
      name: "Northern Giraffe",
      scientific: "Giraffa camelopardalis",
      totalPop: "~7,037",
      status: "Critically Endangered",
      statusColor: "#dc2626",
      subspecies: [
        { name: "Nubian giraffe", scientific: "G. c. camelopardalis", pop: "3,977" },
        { name: "Kordofan giraffe", scientific: "G. c. antiquorum", pop: "2,391" },
        { name: "West African giraffe", scientific: "G. c. peralta", pop: "669 (most threatened)" },
      ],
      notes: "The most critically threatened group. The West African subspecies is arguably the rarest large mammal in Africa.",
      icon: "⚠️",
    },
    {
      id: 2,
      name: "Reticulated Giraffe",
      scientific: "Giraffa reticulata",
      totalPop: "~20,901",
      status: "Endangered",
      statusColor: "#ea580c",
      subspecies: [{ name: "No subspecies", scientific: "G. reticulata", pop: "20,901" }],
      notes: "Features sharp, uniform reddish-brown polygons separated by bright white lines creating a 'cobweb' effect. Found primarily in northeastern Kenya.",
      icon: "🌐",
    },
    {
      id: 3,
      name: "Masai Giraffe",
      scientific: "Giraffa tippelskirchi",
      totalPop: "~43,926",
      status: "Endangered",
      statusColor: "#ea580c",
      subspecies: [
        { name: "Masai giraffe sensu stricto", scientific: "G. t. tippelskirchi", pop: "43,162" },
        { name: "Luangwa/Thornicroft's giraffe", scientific: "G. t. thornicrofti", pop: "764" },
      ],
      notes: "The largest of all giraffe species, making them the tallest land animals on Earth. Identified by jagged, vine-like spots across Kenya and Tanzania.",
      icon: "🏔️",
    },
    {
      id: 4,
      name: "Southern Giraffe",
      scientific: "Giraffa giraffa",
      totalPop: "~67,663",
      status: "Least Concern",
      statusColor: "#16a34a",
      subspecies: [
        { name: "South African giraffe", scientific: "G. g. giraffa", pop: "~52,000" },
        { name: "Angolan giraffe", scientific: "G. g. angolensis", pop: "15,663" },
      ],
      notes: "The most populous species with star-shaped patches extending to the hooves. Population doubled over the last three decades.",
      icon: "🦒",
    },
  ];

  return (
    <div className="gir-species-subspecies-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">4 Species, 5 Subspecies</h3>
        <p className="gir-section-text">
          The 2016 genetic revolution — officially adopted by the <strong>IUCN in August 2025</strong> — revealed four
          distinct giraffe species with genetic differences comparable to <em>polar bears vs. brown bears</em>.
          Previously classified as one species with 8–11 subspecies, this reclassification is critical for targeted
          conservation.
        </p>
      </div>

      {speciesData.map((sp) => (
        <div key={sp.id} className="gir-species-detail-card">
          <div className="gir-species-detail-header">
            <div className="gir-species-detail-left">
              <span className="gir-species-detail-icon">{sp.icon}</span>
              <div>
                <h4 className="gir-species-detail-name">
                  {sp.id}. {sp.name}
                </h4>
                <em className="gir-species-detail-sci">{sp.scientific}</em>
              </div>
            </div>
            <div className="gir-species-detail-right">
              <span className="gir-species-pop">{sp.totalPop}</span>
              <span
                className="gir-species-status"
                style={{ color: sp.statusColor, borderColor: sp.statusColor }}
              >
                {sp.status}
              </span>
            </div>
          </div>

          <p className="gir-species-detail-notes">{sp.notes}</p>

          <div className="gir-subspecies-table-wrapper">
            <table className="gir-taxonomy-table gir-subspecies-table">
              <thead>
                <tr>
                  <th>Subspecies</th>
                  <th>Scientific Name</th>
                  <th>Population</th>
                </tr>
              </thead>
              <tbody>
                {sp.subspecies.map((sub, j) => (
                  <tr key={j}>
                    <td>{sub.name}</td>
                    <td>
                      <em>{sub.scientific}</em>
                    </td>
                    <td>
                      <strong>{sub.pop}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="gir-callout gir-callout-info" style={{ marginTop: "1.5rem" }}>
        <strong>📊 Key Taxonomy Notes</strong>
        Total: 4 species, 5 subspecies (Reticulated has no subspecies). Least populated: West African giraffe (669
        individuals, only in Niger). Largest population: Masai giraffe sensu stricto (43,162).
      </div>
    </div>
  );
}
