"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkle, Stack, Eye, Heart, Brain, SquaresFour } from "@phosphor-icons/react";
import { TissueImageCard } from "./tissue-image-card";

export function HierarchyVisualCard() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      level: "Level 1: Cells",
      title: "Fundamental Structural Unit",
      description: "In unicellular forms (Amoeba), one cell handles all vital tasks. In multicellular animals, billions of cells specialize.",
      example: "Epithelial cell, Osteocyte, Neuron, Muscle fiber",
      color: "from-blue-500 to-cyan-500"
    },
    {
      level: "Level 2: Tissues",
      title: "Organized Cell Groups",
      description: "Groups of similar cells along with intercellular matrix coordinate to perform dedicated tasks.",
      example: "Epithelium, Connective, Muscular, Neural",
      color: "from-cyan-500 to-teal-500"
    },
    {
      level: "Level 3: Organs",
      title: "Multi-Tissue Architectures",
      description: "Two or more primary tissues organized in precise proportions and arrangements to form an anatomical structure.",
      example: "Stomach, Heart, Lungs, Kidneys",
      color: "from-teal-500 to-emerald-500"
    },
    {
      level: "Level 4: Organ Systems",
      title: "Physiological Integration",
      description: "Multiple organs working synchronously to execute complex life processes through division of labour.",
      example: "Digestive, Circulatory, Respiratory, Nervous",
      color: "from-emerald-500 to-amber-500"
    },
    {
      level: "Level 5: Organism",
      title: "Coordinated Living Animal",
      description: "The complete individual displaying seamless physiological balance, homeostasis, and survival.",
      example: "Hydra, Earthworm, Cockroach, Human",
      color: "from-amber-500 to-rose-500"
    }
  ];

  const fourTissues = [
    {
      name: "Epithelial Tissue",
      role: "Protection, Secretion & Absorption",
      hallmark: "Closely packed cells, free surface facing fluid/air, minimal matrix.",
      icon: SquaresFour,
      color: "border-sky-500/30 bg-sky-500/5 text-sky-700 dark:text-sky-300"
    },
    {
      name: "Connective Tissue",
      role: "Binding, Support & Transport",
      hallmark: "Most abundant; cells secrete collagen/elastin fibres and matrix (except blood).",
      icon: Stack,
      color: "border-teal-500/30 bg-teal-500/5 text-teal-700 dark:text-teal-300"
    },
    {
      name: "Muscular Tissue",
      role: "Contraction & Body Movement",
      hallmark: "Elongated fibres with parallel myofibrils; voluntary & involuntary classes.",
      icon: Heart,
      color: "border-rose-500/30 bg-rose-500/5 text-rose-700 dark:text-rose-300"
    },
    {
      name: "Neural Tissue",
      role: "Impulse Conduction & Control",
      hallmark: "Excitable neurons transmit action potentials; neuroglia form >50% of volume.",
      icon: Brain,
      color: "border-indigo-500/30 bg-indigo-500/5 text-indigo-700 dark:text-indigo-300"
    }
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Primary Diagram from User's Word Document */}
      <TissueImageCard
        src="/images/structural-organisation/hierarchy_of_animal_life.jpg"
        alt="The Hierarchy of Animal life: Cells to Systems"
        title="The Hierarchy of Animal Life: Cells to Systems"
        caption="NCERT Reference Diagram: Progressive structural integration from microscopic cells to complex organ systems and organisms."
        badge="NCERT Chapter 7 Reference"
      />

      {/* Interactive Step-by-Step Hierarchy Flow */}
      <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
              Interactive Levels of Structural Organisation
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
            Click stages to explore
          </span>
        </div>

        {/* Step Buttons */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {stages.map((stg, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition-all cursor-pointer ${
                  isSelected
                    ? "bg-cyan-600 text-white shadow-xs scale-[1.02]"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">
                  Stage 0{idx + 1}
                </span>
                <span className="text-xs font-extrabold mt-0.5">
                  {stg.level.split(":")[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Details Card */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 sm:p-5 dark:border-cyan-500/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="inline-block rounded-full bg-cyan-600 px-2.5 py-0.5 text-xs font-extrabold text-white">
              {stages[activeStage]?.level}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Structural Rank {activeStage + 1} of 5
            </span>
          </div>

          <h4 className="mt-2 text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            {stages[activeStage]?.title}
          </h4>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {stages[activeStage]?.description}
          </p>

          <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/80 p-2.5 dark:bg-slate-800/80 text-xs">
            <strong className="text-cyan-700 dark:text-cyan-300 font-bold shrink-0">
              NCERT Examples:
            </strong>
            <span className="text-slate-700 dark:text-slate-300 italic font-medium">
              {stages[activeStage]?.example}
            </span>
          </div>
        </motion.div>
      </div>

      {/* The 4 Basic Tissue Types Overview Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
            The 4 Foundational Animal Tissue Lineages
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {fourTissues.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className={`rounded-xl border p-4 transition-all hover:shadow-xs ${t.color}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-white p-1.5 shadow-2xs dark:bg-slate-800">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {t.name}
                  </h4>
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Primary Role: {t.role}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.hallmark}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
