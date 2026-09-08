"use client";

import React, { useState } from "react";
import {
  Plant,
  Tree,
  Bank,
  Key,
  Bookmarks,
  Info,
  CheckCircle,
  FileText
} from "@phosphor-icons/react";
import { cn } from "@workspace/ui/lib/utils";

export function TaxonomicalAidsVisual() {
  const [activeAid, setActiveAid] = useState<string>("herbarium");

  const aids = [
    {
      id: "herbarium",
      title: "Herbarium",
      tagline: "Quick Referral System",
      icon: Plant,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/30",
      description:
        "Storehouse of collected plant specimens that are dried, pressed, and preserved on sheets. Sheets are arranged systematically according to universally accepted systems of classification.",
      keyFacts: [
        "Standard sheet dimension: 41 × 29 cm (16.5 × 11.5 inches)",
        "Carries label with date, place of collection, English/local/botanical names, family, and collector's name",
        "Does NOT contain information on plant height or life cycle"
      ]
    },
    {
      id: "botanical-gardens",
      title: "Botanical Gardens",
      tagline: "Ex-situ Live Collections",
      icon: Tree,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10 border-green-500/30",
      description:
        "Specialized gardens having collections of living plants grown for reference, identification, and conservation. Each plant is labeled indicating its scientific name and family.",
      keyFacts: [
        "Royal Botanical Garden: Kew (England) — World's largest",
        "Indian Botanical Garden: Howrah, Kolkata (India)",
        "National Botanical Research Institute (NBRI): Lucknow (India)"
      ]
    },
    {
      id: "museums",
      title: "Biological Museums",
      tagline: "Preserved Specimen Centers",
      icon: Bank,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10 border-amber-500/30",
      description:
        "Set up in educational institutions (schools and colleges) for study and reference. Specimens are preserved in containers or jars in preservative solutions (formalin) or as dry specimens.",
      keyFacts: [
        "Insects are preserved in insect boxes after collecting, killing, and pinning",
        "Larger animals like birds and mammals are usually stuffed and preserved",
        "Museums often maintain complete skeletal collections of animals"
      ]
    },
    {
      id: "zoological-parks",
      title: "Zoological Parks (Zoos)",
      tagline: "Wild Animals in Human Care",
      icon: Plant,
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-500/10 border-sky-500/30",
      description:
        "Protected environments where wild animals are kept under human care, which enables us to learn about their food habits, physiology, and natural behavior.",
      keyFacts: [
        "All animals in a zoo are provided conditions as similar as possible to their natural habitats",
        "Crucial for behavioral studies and ex-situ conservation breeding programs"
      ]
    }
  ];

  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {aids.map((aid) => {
          const Icon = aid.icon;
          const isSelected = activeAid === aid.id;

          return (
            <div
              key={aid.id}
              onClick={() => setActiveAid(aid.id)}
              className={cn(
                "cursor-pointer rounded-2xl border p-5 transition-all duration-200",
                isSelected
                  ? "border-emerald-500 bg-white dark:bg-slate-800/90 shadow-md ring-2 ring-emerald-500/20"
                  : "border-slate-200/80 bg-slate-50/50 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800/60"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", aid.bgColor)}>
                    <Icon className={cn("h-5 w-5", aid.color)} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {aid.title}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {aid.tagline}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {aid.description}
              </p>

              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
                {aid.keyFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Taxonomic Key Interactive Box */}
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-50/40 p-5 dark:border-indigo-500/30 dark:bg-indigo-950/20">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
            Structure of a Taxonomic Key
          </h4>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-3.5 shadow-xs dark:bg-slate-900/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              01. The Couplet
            </span>
            <h5 className="mt-1 text-xs font-bold text-slate-900 dark:text-slate-100">
              Contrasting Pair
            </h5>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
              Keys are based on contrasting characters in a pair called a <strong>couplet</strong>, representing choice between two opposite options.
            </p>
          </div>

          <div className="rounded-xl bg-white p-3.5 shadow-xs dark:bg-slate-900/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              02. The Lead
            </span>
            <h5 className="mt-1 text-xs font-bold text-slate-900 dark:text-slate-100">
              Individual Statement
            </h5>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
              Each statement in the taxonomic key is called a <strong>lead</strong>. Accepting one lead results in the rejection of the other.
            </p>
          </div>

          <div className="rounded-xl bg-white p-3.5 shadow-xs dark:bg-slate-900/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              03. Category Specific
            </span>
            <h5 className="mt-1 text-xs font-bold text-slate-900 dark:text-slate-100">
              Analytical Device
            </h5>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
              Separate taxonomic keys are required for each category (family, genus, species). Keys are inherently <strong>analytical</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
