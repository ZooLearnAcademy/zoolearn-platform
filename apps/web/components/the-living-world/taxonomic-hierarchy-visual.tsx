"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Info, Sparkle } from "@phosphor-icons/react";
import { cn } from "@workspace/ui/lib/utils";

interface TaxonomicLevel {
  rank: number;
  id: string;
  name: string;
  letter: string;
  mnemonicWord: string;
  color: string;
  // Step capsule styles (unselected)
  stepBg: string;
  stepBorder: string;
  stepHover: string;
  stepText: string;
  stepMnemonic: string;
  // Step capsule styles (selected / active)
  activeBg: string;
  activeBorder: string;
  activeRing: string;
  activeText: string;
  activeMnemonic: string;
  // Inspector notes
  shortDesc: string;
  keyFeature: string;
  examples: string[];
}

export function TaxonomicHierarchyVisual() {
  const [selectedRankId, setSelectedRankId] = useState<string>("species");

  const ranks: TaxonomicLevel[] = [
    {
      rank: 1,
      id: "domain",
      name: "Domain",
      letter: "D",
      mnemonicWord: "Dear",
      color: "#8b5cf6",
      stepBg: "bg-purple-50/60 dark:bg-purple-950/20",
      stepBorder: "border-purple-200/80 dark:border-purple-800/60",
      stepHover: "hover:border-purple-400 hover:bg-purple-50/90 dark:hover:bg-purple-950/40",
      stepText: "text-slate-800 dark:text-slate-100",
      stepMnemonic: "text-purple-400 dark:text-purple-400 font-mono",
      activeBg: "bg-purple-100/90 dark:bg-purple-900/50",
      activeBorder: "border-2 border-purple-600 dark:border-purple-400",
      activeRing: "ring-2 ring-purple-400/30 shadow-md shadow-purple-500/10",
      activeText: "text-purple-950 dark:text-purple-100 font-extrabold",
      activeMnemonic: "text-purple-700 dark:text-purple-300 font-bold font-mono",
      shortDesc: "Highest taxonomic rank grouping organisms based on fundamental cellular and genetic structure.",
      keyFeature: "Three cellular domains: Archaea, Bacteria, and Eukarya (Carl Woese 3-Domain System).",
      examples: ["Eukarya", "Bacteria", "Archaea"]
    },
    {
      rank: 2,
      id: "kingdom",
      name: "Kingdom",
      letter: "K",
      mnemonicWord: "King",
      color: "#ec4899",
      stepBg: "bg-pink-50/60 dark:bg-pink-950/20",
      stepBorder: "border-pink-200/80 dark:border-pink-800/60",
      stepHover: "hover:border-pink-400 hover:bg-pink-50/90 dark:hover:bg-pink-950/40",
      stepText: "text-slate-800 dark:text-slate-100",
      stepMnemonic: "text-pink-400 dark:text-pink-400 font-mono",
      activeBg: "bg-pink-100/90 dark:bg-pink-900/50",
      activeBorder: "border-2 border-pink-600 dark:border-pink-400",
      activeRing: "ring-2 ring-pink-400/30 shadow-md shadow-pink-500/10",
      activeText: "text-pink-950 dark:text-pink-100 font-extrabold",
      activeMnemonic: "text-pink-700 dark:text-pink-300 font-bold font-mono",
      shortDesc: "Broadest obligate category in NCERT classification with the minimum shared characteristics.",
      keyFeature: "All animals belong to Kingdom Animalia; all plants belong to Kingdom Plantae.",
      examples: ["Animalia (Animals)", "Plantae (Plants)", "Fungi", "Protista", "Monera"]
    },
    {
      rank: 3,
      id: "phylum",
      name: "Phylum / Division",
      letter: "P",
      mnemonicWord: "Philip",
      color: "#3b82f6",
      stepBg: "bg-blue-50/60 dark:bg-blue-950/20",
      stepBorder: "border-blue-200/80 dark:border-blue-800/60",
      stepHover: "hover:border-blue-400 hover:bg-blue-50/90 dark:hover:bg-blue-950/40",
      stepText: "text-slate-800 dark:text-slate-100",
      stepMnemonic: "text-blue-400 dark:text-blue-400 font-mono",
      activeBg: "bg-blue-100/90 dark:bg-blue-900/50",
      activeBorder: "border-2 border-blue-600 dark:border-blue-400",
      activeRing: "ring-2 ring-blue-400/30 shadow-md shadow-blue-500/10",
      activeText: "text-blue-950 dark:text-blue-100 font-extrabold",
      activeMnemonic: "text-blue-700 dark:text-blue-300 font-bold font-mono",
      shortDesc: "Groups classes having common major anatomical body plans and fundamental characteristics.",
      keyFeature: "Term 'Phylum' is used for animals (e.g. Chordata); 'Division' is used for plants (e.g. Angiospermae).",
      examples: ["Chordata", "Arthropoda", "Mollusca", "Angiospermae"]
    },
    {
      rank: 4,
      id: "class",
      name: "Class",
      letter: "C",
      mnemonicWord: "Came",
      color: "#06b6d4",
      stepBg: "bg-cyan-50/60 dark:bg-cyan-950/20",
      stepBorder: "border-cyan-200/80 dark:border-cyan-800/60",
      stepHover: "hover:border-cyan-400 hover:bg-cyan-50/90 dark:hover:bg-cyan-950/40",
      stepText: "text-slate-800 dark:text-slate-100",
      stepMnemonic: "text-cyan-500/80 dark:text-cyan-400 font-mono",
      activeBg: "bg-cyan-100/90 dark:bg-cyan-900/50",
      activeBorder: "border-2 border-cyan-600 dark:border-cyan-400",
      activeRing: "ring-2 ring-cyan-400/30 shadow-md shadow-cyan-500/10",
      activeText: "text-cyan-950 dark:text-cyan-100 font-extrabold",
      activeMnemonic: "text-cyan-700 dark:text-cyan-300 font-bold font-mono",
      shortDesc: "Group of related orders sharing distinctive structural and physiological adaptations.",
      keyFeature: "Class Mammalia includes Order Primata (monkeys, apes, humans) and Order Carnivora (cats, dogs).",
      examples: ["Mammalia", "Insecta", "Aves", "Dicotyledonae", "Monocotyledonae"]
    },
    {
      rank: 5,
      id: "order",
      name: "Order",
      letter: "O",
      mnemonicWord: "Over",
      color: "#10b981",
      stepBg: "bg-emerald-50/60 dark:bg-emerald-950/20",
      stepBorder: "border-emerald-200/80 dark:border-emerald-800/60",
      stepHover: "hover:border-emerald-400 hover:bg-emerald-50/90 dark:hover:bg-emerald-950/40",
      stepText: "text-slate-800 dark:text-slate-100",
      stepMnemonic: "text-emerald-500/80 dark:text-emerald-400 font-mono",
      activeBg: "bg-emerald-100/90 dark:bg-emerald-900/50",
      activeBorder: "border-2 border-emerald-600 dark:border-emerald-400",
      activeRing: "ring-2 ring-emerald-400/30 shadow-md shadow-emerald-500/10",
      activeText: "text-emerald-950 dark:text-emerald-100 font-extrabold",
      activeMnemonic: "text-emerald-700 dark:text-emerald-300 font-bold font-mono",
      shortDesc: "Assemblage of families exhibiting a few common vegetative and floral characteristics.",
      keyFeature: "Plant families Convolvulaceae & Solanaceae are included in Order Polymoniales based on floral characters.",
      examples: ["Carnivora", "Primata", "Polymoniales", "Sapindales", "Diptera"]
    },
    {
      rank: 6,
      id: "family",
      name: "Family",
      letter: "F",
      mnemonicWord: "For",
      color: "#f59e0b",
      stepBg: "bg-amber-50/60 dark:bg-amber-950/20",
      stepBorder: "border-amber-200/80 dark:border-amber-800/60",
      stepHover: "hover:border-amber-400 hover:bg-amber-50/90 dark:hover:bg-amber-950/40",
      stepText: "text-slate-800 dark:text-slate-100",
      stepMnemonic: "text-amber-500/80 dark:text-amber-400 font-mono",
      activeBg: "bg-amber-100/90 dark:bg-amber-900/50",
      activeBorder: "border-2 border-amber-600 dark:border-amber-400",
      activeRing: "ring-2 ring-amber-400/30 shadow-md shadow-amber-500/10",
      activeText: "text-amber-950 dark:text-amber-100 font-extrabold",
      activeMnemonic: "text-amber-700 dark:text-amber-300 font-bold font-mono",
      shortDesc: "Group of related genera characterized on both vegetative and reproductive features of plant/animal species.",
      keyFeature: "Family Felidae includes genus Panthera (lion, tiger, leopard) and genus Felis (cats).",
      examples: ["Felidae (Cats)", "Canidae (Dogs)", "Hominidae (Humans)", "Solanaceae (Nightshades)", "Anacardiaceae"]
    },
    {
      rank: 7,
      id: "genus",
      name: "Genus",
      letter: "G",
      mnemonicWord: "Good",
      color: "#f97316",
      stepBg: "bg-orange-50/60 dark:bg-orange-950/20",
      stepBorder: "border-orange-200/80 dark:border-orange-800/60",
      stepHover: "hover:border-orange-400 hover:bg-orange-50/90 dark:hover:bg-orange-950/40",
      stepText: "text-slate-800 dark:text-slate-100",
      stepMnemonic: "text-orange-500/80 dark:text-orange-400 font-mono",
      activeBg: "bg-orange-100/90 dark:bg-orange-900/50",
      activeBorder: "border-2 border-orange-600 dark:border-orange-400",
      activeRing: "ring-2 ring-orange-400/30 shadow-md shadow-orange-500/10",
      activeText: "text-orange-950 dark:text-orange-100 font-extrabold",
      activeMnemonic: "text-orange-700 dark:text-orange-300 font-bold font-mono",
      shortDesc: "Group of closely related species which has more characters in common in comparison to species of other genera.",
      keyFeature: "First capitalized word in binomial nomenclature (e.g., Panthera, Homo, Solanum, Mangifera).",
      examples: ["Panthera", "Homo", "Solanum", "Mangifera", "Musca"]
    },
    {
      rank: 8,
      id: "species",
      name: "Species",
      letter: "S",
      mnemonicWord: "Soup",
      color: "#ef4444",
      stepBg: "bg-rose-50/60 dark:bg-rose-950/20",
      stepBorder: "border-rose-200/80 dark:border-rose-800/60",
      stepHover: "hover:border-rose-400 hover:bg-rose-50/90 dark:hover:bg-rose-950/40",
      stepText: "text-slate-800 dark:text-slate-100",
      stepMnemonic: "text-rose-500/80 dark:text-rose-400 font-mono",
      activeBg: "bg-rose-100/90 dark:bg-rose-900/50",
      activeBorder: "border-2 border-rose-600 dark:border-rose-400",
      activeRing: "ring-2 ring-rose-400/30 shadow-md shadow-rose-500/10",
      activeText: "text-rose-950 dark:text-rose-100 font-extrabold",
      activeMnemonic: "text-rose-700 dark:text-rose-300 font-bold font-mono",
      shortDesc: "The lowest, fundamental unit of classification capable of interbreeding and producing fertile offspring.",
      keyFeature: "Specific epithet in lowercase; maximum number of shared common characteristics.",
      examples: ["Panthera tigris (Tiger)", "Panthera leo (Lion)", "Homo sapiens (Human)", "Mangifera indica (Mango)", "Solanum tuberosum (Potato)"]
    }
  ];

  const defaultRank: TaxonomicLevel = ranks[ranks.length - 1] ?? ranks[0]!;
  const selectedRank: TaxonomicLevel = ranks.find((r) => r.id === selectedRankId) ?? defaultRank;

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: COMPACT EXACT CARD FROM IMAGE (WITH PER-STEP COLORS)         */}
      {/* ========================================================================= */}
      <div className="lg:col-span-5 w-full rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900">
        
        {/* Top Header matching reference image */}
        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 leading-tight">
            ASCENDING TAXONOMIC<br />ORDER
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#00897b] dark:text-emerald-400 shrink-0">
            <ArrowUp className="h-3 w-3 stroke-[2.5]" />
            <span>Broadest (Decreasing Specificity)</span>
          </div>
        </div>

        {/* Steps Stack with narrowing widths & individual step colors */}
        <div className="my-4 flex flex-col gap-2">
          {ranks.map((rank, index) => {
            const isSelected = rank.id === selectedRankId;
            // Visual narrowing pyramid width
            const widthPercentage = 100 - index * 3.5;

            return (
              <motion.div
                key={rank.id}
                onClick={() => setSelectedRankId(rank.id)}
                style={{ width: `${Math.max(76, widthPercentage)}%` }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className={cn(
                  "group mx-auto flex cursor-pointer items-center justify-between rounded-full border px-3.5 sm:px-4 py-2 sm:py-2.5 transition-all duration-200",
                  isSelected
                    ? cn(
                        rank.activeBorder,
                        rank.activeBg,
                        rank.activeRing,
                        "scale-[1.02]"
                      )
                    : cn(
                        rank.stepBorder,
                        rank.stepBg,
                        rank.stepHover
                      )
                )}
              >
                {/* Left: Number Badge + Rank Name */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    style={{ backgroundColor: rank.color }}
                    className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full text-[10px] sm:text-xs font-black text-white shadow-xs"
                  >
                    {rank.rank}
                  </span>
                  <span
                    className={cn(
                      "truncate text-xs sm:text-sm font-bold tracking-tight transition-colors",
                      isSelected ? rank.activeText : rank.stepText
                    )}
                  >
                    {rank.name}
                  </span>
                </div>

                {/* Right: Mnemonic Word */}
                <span
                  className={cn(
                    "text-[11px] sm:text-xs font-mono shrink-0 pl-1 transition-colors",
                    isSelected ? rank.activeMnemonic : rank.stepMnemonic
                  )}
                >
                  {rank.mnemonicWord}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Footer matching reference image */}
        <div className="flex items-center justify-center border-t border-slate-100 pt-3 dark:border-slate-800">
          <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-rose-600 dark:text-rose-400">
            <ArrowDown className="h-3 w-3 stroke-[2.5]" />
            <span>Basic Unit (Maximum Common Characters)</span>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: DYNAMIC EXPLANATION PANEL                                    */}
      {/* ========================================================================= */}
      <div className="lg:col-span-7 w-full rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRank.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Header of selected rank with its theme color */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  style={{ backgroundColor: selectedRank.color }}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl text-base font-black text-white shadow-sm"
                >
                  {selectedRank.letter}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Taxonomic Rank #{selectedRank.rank}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {selectedRank.name}
                  </h3>
                </div>
              </div>

              <span
                style={{
                  backgroundColor: `${selectedRank.color}15`,
                  color: selectedRank.color,
                  borderColor: `${selectedRank.color}35`
                }}
                className="rounded-full border px-3 py-1 text-xs font-bold font-mono shadow-2xs"
              >
                Mnemonic: &ldquo;{selectedRank.mnemonicWord}&rdquo;
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {selectedRank.shortDesc}
            </p>

            {/* Examination Note Box themed to the selected rank */}
            <div
              style={{
                backgroundColor: `${selectedRank.color}0e`,
                borderColor: `${selectedRank.color}35`
              }}
              className="rounded-2xl border p-4"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: selectedRank.color }}>
                <Info className="h-4 w-4 shrink-0" />
                <span>Key NCERT Examination Note</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {selectedRank.keyFeature}
              </p>
            </div>

            {/* Representative examples */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Representative NCERT Examples:
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedRank.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-serif italic text-slate-800 shadow-2xs dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Rule */}
        <div className="mt-5 border-t border-slate-100 pt-3.5 text-[11px] leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
          💡 <strong>NCERT Golden Rule:</strong> As we go from <em>Species</em> $\rightarrow$ <em>Kingdom</em>, number of common characteristics <strong>decreases</strong>, while difficulty of determining relationships <strong>increases</strong>.
        </div>
      </div>
    </div>
  );
}


