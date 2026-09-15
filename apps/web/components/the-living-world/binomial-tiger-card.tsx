"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowsOutSimple, X, Sparkle, BookOpen, MagnifyingGlassPlus } from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";

export function BinomialTigerCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tigerImageUrl = "https://res.cloudinary.com/duibfmcw1/image/upload/v1767809416/tiger_y9orpy.jpg";

  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* Visual Diagram Box matching screenshot */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex flex-col items-center justify-center">
          {/* Tiger Illustration Card */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="group relative w-full max-w-[540px] cursor-pointer overflow-hidden rounded-xl bg-gradient-to-b from-amber-500/10 to-transparent p-2 transition-transform duration-300 hover:scale-[1.01]"
          >
            <div className="relative aspect-[16/9] sm:aspect-[2/1] w-full overflow-hidden rounded-lg">
              <img
                src={tigerImageUrl}
                alt="Tiger (Panthera tigris) Binomial Nomenclature"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm transition-opacity group-hover:bg-slate-900">
              <MagnifyingGlassPlus className="h-3.5 w-3.5" />
              <span>Zoom</span>
            </div>
          </div>
        </div>

        {/* Caption at the bottom */}
        <div className="mt-5 border-t border-slate-100 pt-3 text-center dark:border-slate-800">
          <p className="text-xs italic text-slate-500 dark:text-slate-400">
            Binomial Nomenclature: A two-part scientific naming system (Genus + Species) used for classifying organisms.
          </p>
        </div>
      </div>

      {/* Highlights & Linnaeus Contributions Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Examples Box */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 dark:border-emerald-500/30">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
              Standard Examples
            </h4>
          </div>
          <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-1.5 dark:bg-slate-800/80">
              <span className="font-serif italic font-semibold text-slate-900 dark:text-slate-100">
                Mangifera indica
              </span>
              <span className="text-slate-500 dark:text-slate-400">Mango</span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-1.5 dark:bg-slate-800/80">
              <span className="font-serif italic font-semibold text-slate-900 dark:text-slate-100">
                Solanum tuberosum
              </span>
              <span className="text-slate-500 dark:text-slate-400">Potato</span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-1.5 dark:bg-slate-800/80">
              <span className="font-serif italic font-semibold text-slate-900 dark:text-slate-100">
                Homo sapiens
              </span>
              <span className="text-slate-500 dark:text-slate-400">Human</span>
            </li>
          </ul>
        </div>

        {/* Linnaeus Landmark Publications */}
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 dark:border-indigo-500/30">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300">
              Key Works by Carolus Linnaeus
            </h4>
          </div>
          <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-1.5 dark:bg-slate-800/80">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Species Plantarum (1753)
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">5,900 plant species</span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-1.5 dark:bg-slate-800/80">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Systema Naturae (1758)
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">4,326 animal species</span>
            </li>
            <li className="rounded-lg bg-indigo-600/10 px-3 py-1 text-center font-medium text-indigo-700 dark:text-indigo-300">
              Recognized universally as the <strong>“Father of Taxonomy”</strong>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal View for Image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-2xl overflow-hidden rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-900"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 text-white transition hover:bg-slate-900"
                aria-label="Close image modal"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={tigerImageUrl}
                  alt="Tiger Scientific Name Breakdown"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-3 text-center">
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  <span className="italic font-serif">Panthera tigris</span> (Tiger)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Binomial Nomenclature Illustration — Genus (Panthera) + Specific Epithet (tigris)
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
