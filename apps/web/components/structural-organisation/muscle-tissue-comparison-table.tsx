"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TissueImageCard } from "./tissue-image-card";
import { MagnifyingGlass, Sparkle, Heart, Lightning } from "@phosphor-icons/react";
import { Input } from "@workspace/ui/components/input";

export function MuscleTissueComparisonTable() {
  const [selectedMuscle, setSelectedMuscle] = useState<"skeletal" | "smooth" | "cardiac">("skeletal");
  const [searchTerm, setSearchTerm] = useState("");

  const comparisonData = [
    {
      feature: "Striations (Cross-stripes)",
      skeletal: "Present (Alternating dark & light bands)",
      smooth: "Absent (Smooth, non-striated)",
      cardiac: "Present (Faint striations)",
      highlight: true
    },
    {
      feature: "Nature of Control",
      skeletal: "Voluntary (Somatic nervous control)",
      smooth: "Involuntary (Autonomic nervous control)",
      cardiac: "Involuntary (Myogenic rhythmicity)",
      highlight: true
    },
    {
      feature: "Typical Location",
      skeletal: "Attached to skeleton (biceps, triceps, limbs)",
      smooth: "Walls of visceral hollow organs (stomach, gut, vessels)",
      cardiac: "Exclusively in the Heart wall (myocardium)",
      highlight: true
    },
    {
      feature: "Cell Shape & Morphology",
      skeletal: "Long, cylindrical, unbranched fibers",
      smooth: "Fusiform (spindle-shaped, tapered at ends)",
      cardiac: "Cylindrical, branched interconnected fibers",
      highlight: false
    },
    {
      feature: "Nuclear Position & Number",
      skeletal: "Multinucleated (syncytial), peripheral nuclei",
      smooth: "Uninucleated, centrally placed nucleus",
      cardiac: "Uninucleated (or binucleated), central",
      highlight: false
    },
    {
      feature: "Intercalated Discs",
      skeletal: "Absent",
      smooth: "Absent",
      cardiac: "Present (Dense transverse bands with gap junctions)",
      highlight: true
    },
    {
      feature: "Rate of Fatigue",
      skeletal: "Fatigues rapidly upon sustained work",
      smooth: "Slow, sustained contraction, rarely fatigues",
      cardiac: "Rhythmic, continuous; NEVER fatigues throughout life!",
      highlight: false
    }
  ];

  const filteredData = comparisonData.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.feature.toLowerCase().includes(q) ||
      item.skeletal.toLowerCase().includes(q) ||
      item.smooth.toLowerCase().includes(q) ||
      item.cardiac.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mt-6 space-y-6">
      {/* 3 Muscle Tabs with Diagrams */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
            Microscopic Histology: 3 Muscle Variants
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedMuscle("skeletal")}
            className={`rounded-xl py-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              selectedMuscle === "skeletal"
                ? "border-rose-600 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 shadow-2xs"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            Skeletal Muscle
          </button>

          <button
            onClick={() => setSelectedMuscle("smooth")}
            className={`rounded-xl py-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              selectedMuscle === "smooth"
                ? "border-rose-600 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 shadow-2xs"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            Smooth Muscle
          </button>

          <button
            onClick={() => setSelectedMuscle("cardiac")}
            className={`rounded-xl py-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              selectedMuscle === "cardiac"
                ? "border-rose-600 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 shadow-2xs"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            Cardiac Muscle
          </button>
        </div>

        {/* Selected Muscle Display */}
        <div>
          {selectedMuscle === "skeletal" && (
            <TissueImageCard
              src="/images/structural-organisation/skeletal_muscle.png"
              alt="Skeletal Muscle Striated Fibres"
              title="Skeletal Muscle (Striated & Voluntary)"
              caption="Cylindrical striated fibres arranged in parallel bundles enclosed by a connective tissue sheath."
              badge="Striated • Voluntary"
            />
          )}

          {selectedMuscle === "smooth" && (
            <TissueImageCard
              src="/images/structural-organisation/smooth_muscle.png"
              alt="Smooth Muscle Fusiform Fibres"
              title="Smooth (Visceral) Muscle (Non-Striated & Involuntary)"
              caption="Fusiform (spindle-shaped) fibres tapering at both ends, lacking striations."
              badge="Fusiform • Involuntary"
            />
          )}

          {selectedMuscle === "cardiac" && (
            <TissueImageCard
              src="/images/structural-organisation/cardiac_muscle.png"
              alt="Cardiac Muscle with Intercalated Discs"
              title="Cardiac Muscle (Branched, Involuntary, Intercalated Discs)"
              caption="Intercalated discs with gap junctions allow synchronized wave contraction of the heart."
              badge="Intercalated Discs • Heart Only"
            />
          )}
        </div>
      </div>

      {/* Interactive NCERT Comparative Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/95 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkle className="h-4 w-4 text-rose-600" />
              <span>Comparative NCERT Matrix: Skeletal vs Smooth vs Cardiac</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              High-yield comparison table directly from NCERT & your document notes
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 text-xs h-9 rounded-xl border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/70 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200 border-b border-slate-200/70 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-extrabold">Feature</th>
                <th className="py-3 px-4 font-extrabold text-blue-700 dark:text-blue-300">Skeletal Muscle</th>
                <th className="py-3 px-4 font-extrabold text-amber-700 dark:text-amber-300">Smooth Muscle</th>
                <th className="py-3 px-4 font-extrabold text-rose-700 dark:text-rose-300">Cardiac Muscle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">
                    {row.feature}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {row.skeletal}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {row.smooth}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {row.cardiac}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* High Yield Footnote */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-xs text-rose-900 dark:text-rose-200">
          <strong>Key NCERT Exam Point:</strong> Intercalated discs with gap junctions are unique to <strong>cardiac muscle</strong>. They allow cells to communicate so that when one cell receives a signal to contract, its neighbors are stimulated as well!
        </div>
      </div>
    </div>
  );
}
