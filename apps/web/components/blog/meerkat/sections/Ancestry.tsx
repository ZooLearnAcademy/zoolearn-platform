"use client";

import React, { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/blog/scroll-reveal";

const ancestors = [
  {
    year: "15 Mya",
    name: "Feliform Ancestry (Early Carnivora)",
    description:
      "Mongooses belong to the Feliformia (cat-like) suborder. Roughly 15 million years ago, early mongoose ancestors diverged from other feliform branches in Eurasia and Africa, adapting to forest floor foraging.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783760897/meerkat01_mfk33t.jpg",
  },
  {
    year: "10 Mya",
    name: "Herpestidae Family Radiation",
    description:
      "The mongoose family (Herpestidae) expanded significantly. These early ancestors evolved long bodies, short legs, and acute senses of smell, allowing them to excel at sniffing out underground prey.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783760939/meerkat02_oqtw1d.jpg",
  },
  {
    year: "5 Mya",
    name: "Suricata Genus Divergence",
    description:
      "As African forests thinned due to drying climates, the ancestor of the genus Suricata split from other mongooses. Surviving in open, predator-heavy savanna required developing the earliest forms of group vigilance.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783759881/meerkat4_qem2wx.webp",
  },
  {
    year: "2 Mya",
    name: "Suricata major (Fossil Ancestor)",
    description:
      "Fossil records in South Africa show Suricata major, a larger prehistoric ancestor of modern meerkats. They possessed similar digging claws but had not yet fully refined their complex social structures.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783759841/meerkat1_h7lqyx.jpg",
  },
  {
    year: "1 Mya",
    name: "Suricata suricatta (Modern Meerkat)",
    description:
      "Modern meerkats emerge in East and Southern Africa. They fully adapt to group cooperative breeding, sentinel warning calls, and structural division of labor to colonize the dry Kalahari and Namib deserts.",
    img: "https://res.cloudinary.com/duibfmcw1/image/upload/v1783843298/meerkat_new_01_o40s9h.jpg",
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
        <h3 className="gir-section-title">The 15-Million-Year Mongoose Ancestry</h3>
        <p className="gir-section-text">
          Meerkats did not evolve in isolation. Their lineage is a testament to adapting from forested conditions into
          open, dry savannas where survival requires group cooperation.
        </p>
      </div>

      <div className="timeline-container-wrapper" style={{ marginTop: "3rem" }}>
        <div className="timeline-container" ref={containerRef}>
          <div className="timeline-line">
            <div
              className="timeline-progress"
              style={{ height: `${lineHeight}%`, background: "var(--meer-primary, #2f8593)" }}
            ></div>
          </div>

          {ancestors.map((ancestor, index) => {
            const isEven = index % 2 === 0;

            return (
              <ScrollReveal key={ancestor.name} className="timeline-reveal-wrapper">
                <div className="timeline-item">
                  <div className="timeline-pane pane-left">
                    {isEven ? (
                      <div className="content-group align-right">
                        <h3 className="phylum-name" style={{ color: "var(--meer-primary-dark, #1f5963)" }}>
                          {ancestor.name}
                        </h3>
                        <div
                          className="phylum-image-wrapper"
                          style={{ borderColor: "var(--meer-primary, #2f8593)" }}
                        >
                          <img src={ancestor.img} alt={ancestor.name} loading="lazy" />
                        </div>
                      </div>
                    ) : (
                      <div className="content-group text-only align-right">
                        <p className="phylum-desc">{ancestor.description}</p>
                      </div>
                    )}
                  </div>

                  <div
                    className="timeline-marker"
                    style={{ background: "var(--meer-primary, #2f8593)", color: "white" }}
                  >
                    {ancestor.year}
                  </div>

                  <div className="timeline-pane pane-right">
                    {!isEven ? (
                      <div className="content-group align-left">
                        <h3 className="phylum-name" style={{ color: "var(--meer-primary-dark, #1f5963)" }}>
                          {ancestor.name}
                        </h3>
                        <div
                          className="phylum-image-wrapper"
                          style={{ borderColor: "var(--meer-primary, #2f8593)" }}
                        >
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
