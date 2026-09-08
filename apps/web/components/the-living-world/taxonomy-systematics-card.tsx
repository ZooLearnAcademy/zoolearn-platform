"use client";

import React from "react";
import { TreeStructure, Dna, CheckCircle, ArrowRight, Sparkle } from "@phosphor-icons/react";


export function TaxonomySystematicsCard() {
  const steps = [
    { num: "01", name: "Characterization", desc: "Understanding the morphological and anatomical traits." },
    { num: "02", name: "Identification", desc: "Determining the exact identity and distinct position." },
    { num: "03", name: "Classification", desc: "Grouping into hierarchical categories based on similarities." },
    { num: "04", name: "Nomenclature", desc: "Assigning standardized binomial scientific names." }
  ];

  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* 4 Steps of Taxonomy Bar */}
      <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 p-5 dark:border-slate-800 dark:bg-slate-900/60">
        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Four Core Processes of Taxonomy
        </h4>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={step.name}
              className="relative flex flex-col justify-between rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {step.num}
                </span>
                {idx < 3 && (
                  <span className="hidden text-slate-300 dark:text-slate-600 lg:inline">
                    →
                  </span>
                )}
              </div>
              <div className="mt-2">
                <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {step.name}
                </h5>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Grid: Taxonomy vs Systematics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Taxonomy Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-teal-500/30 bg-teal-50/50 p-5 dark:border-teal-500/20 dark:bg-teal-950/20">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20 text-teal-700 dark:text-teal-300">
                <TreeStructure className="h-4 w-4" />
              </div>
              <h4 className="text-base font-bold text-teal-900 dark:text-teal-200">
                Taxonomy
              </h4>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              The scientific discipline concerned with the identification, naming, and classification of living organisms into hierarchically structured taxa.
            </p>
            <div className="mt-3 rounded-lg bg-white/70 px-3 py-2 text-xs font-medium text-teal-800 dark:bg-slate-900/60 dark:text-teal-300">
              💡 Answers: <strong>“Who is this organism?”</strong>
            </div>
          </div>
        </div>

        {/* Systematics Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-indigo-500/30 bg-indigo-50/50 p-5 dark:border-indigo-500/20 dark:bg-indigo-950/20">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                <Dna className="h-4 w-4" />
              </div>
              <h4 className="text-base font-bold text-indigo-900 dark:text-indigo-200">
                Systematics
              </h4>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Derived from the Latin word <em>systema</em>. Includes taxonomy plus the comprehensive study of evolutionary (phylogenetic) relationships among organisms.
            </p>
            <div className="mt-3 rounded-lg bg-white/70 px-3 py-2 text-xs font-medium text-indigo-800 dark:bg-slate-900/60 dark:text-indigo-300">
              💡 Answers: <strong>“How is this organism related to others?”</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
