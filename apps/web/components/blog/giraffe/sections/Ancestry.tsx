"use client";

import React, { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/blog/scroll-reveal";

const ancestors = [
  {
    year: "25 - 20 Mya",
    name: "Palaeomerycidae (Ancestral Family)",
    description:
      "The base family from which all giraffids arose. They lived across Europe, Asia, and Africa, sharing the landscape with the ancestors of modern pronghorns. This is the earliest ancestor, arising from the gelocid ancestral assemblage.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697780/zoolearn/giraffe/rij9bmoko4mjf9l4bwku.png",
  },
  {
    year: "16 Mya",
    name: "Canthumeryx (The First Giraffid)",
    description:
      "The earliest known true member of the giraffe family. Fossil evidence from Libya and Kenya shows the very first signs of neck vertebrae elongating compared to their width.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697776/zoolearn/giraffe/vbsoph0rxycktykztcba.png",
  },
  {
    year: "12 Mya",
    name: "Giraffokeryx (The Short-Neck Branch)",
    description:
      "An intermediate offshoot that thrived on low vegetation in Eurasia. This branch represents lineages that reverted to short necks to graze on low shrubs.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697805/zoolearn/giraffe/mt4yznqkibudji3jxxby.png",
  },
  {
    year: "7 - 3 Mya",
    name: "Samotherium (The Transitional Link)",
    description:
      "A crucial transitional form with a neck roughly 1 meter long (half that of a modern giraffe). This species underwent the very first 'elongation boost' — the cranial end of the C3 vertebra stretched out.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697784/zoolearn/giraffe/plnzzwl5qxzq2sphvzfe.png",
  },
  {
    year: "7 - 9 Mya",
    name: "Bohlinia (The Direct Ancestor)",
    description:
      "The terminal ancestor before modern giraffes. Roughly the same size as modern giraffes, their progeny migrated from Eurasia into Africa via Ethiopia.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697774/zoolearn/giraffe/nbfwgvoxp6kvbsr3ps3m.png",
  },
  {
    year: "1 Mya",
    name: "Giraffa camelopardalis (The Modern Era)",
    description:
      "The first fossils of the fully modern, completely long-necked giraffe appear in East Africa, marking the completion of the second elongation boost — the caudal end of the vertebrae lengthened.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783697468/zoolearn/lciu7nfitbacw92deppl.png",
  },
];

export default function Ancestry() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleTimelineScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollStart = viewportHeight / 2;
      const progress = ((scrollStart - top) / height) * 100;
      setLineHeight(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleTimelineScroll, { passive: true });
    handleTimelineScroll();
    return () => window.removeEventListener("scroll", handleTimelineScroll);
  }, []);

  return (
    <div className="gir-ancestry-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">The 24-Million-Year Ancestry</h3>
        <p className="gir-section-text">
          The evolutionary path of the giraffe is not a straight line of necks progressively stretching toward the canopy.
          It is a complex web of environmental adaptations, branching lineages, and evolutionary dead-ends.
        </p>
      </div>

      <div className="timeline-container-wrapper" style={{ marginTop: "3rem" }}>
        <div className="timeline-container" ref={containerRef}>
          <div className="timeline-line">
            <div
              className="timeline-progress"
              style={{ height: `${lineHeight}%`, background: "var(--gir-primary)" }}
            />
          </div>

          {ancestors.map((ancestor, index) => {
            const isEven = index % 2 === 0;

            return (
              <ScrollReveal key={ancestor.name} className="timeline-reveal-wrapper">
                <div className="timeline-item">
                  <div className="timeline-pane pane-left">
                    {isEven ? (
                      <div className="content-group align-right">
                        <h3 className="phylum-name" style={{ color: "var(--gir-primary-dark)" }}>
                          {ancestor.name}
                        </h3>
                        <div className="phylum-image-wrapper" style={{ borderColor: "var(--gir-primary)" }}>
                          <img src={ancestor.img} alt={ancestor.name} loading="lazy" />
                        </div>
                      </div>
                    ) : (
                      <div className="content-group text-only align-right">
                        <p className="phylum-desc">{ancestor.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="timeline-marker" style={{ background: "var(--gir-primary)", color: "white" }}>
                    {ancestor.year}
                  </div>

                  <div className="timeline-pane pane-right">
                    {!isEven ? (
                      <div className="content-group align-left">
                        <h3 className="phylum-name" style={{ color: "var(--gir-primary-dark)" }}>
                          {ancestor.name}
                        </h3>
                        <div className="phylum-image-wrapper" style={{ borderColor: "var(--gir-primary)" }}>
                          <img src={ancestor.img} alt={ancestor.name} loading="lazy" />
                        </div>
                      </div>
                    ) : (
                      <div className="content-group text-only align-left">
                        <p className="phylum-desc">{ancestor.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
