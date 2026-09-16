"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MagnifyingGlassPlus } from "@phosphor-icons/react";

interface TissueImageCardProps {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  badge?: string;
  aspectRatio?: string;
}

export function TissueImageCard({
  src,
  alt,
  title,
  caption,
  badge,
  aspectRatio = "aspect-[16/10]"
}: TissueImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-4 sm:p-5 shadow-xs transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex flex-col items-center justify-center">
        {/* Clickable Image Container */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-b from-cyan-500/10 via-slate-500/5 to-transparent p-1.5 sm:p-2 transition-transform duration-300 hover:scale-[1.01]"
        >
          {badge && (
            <div className="absolute top-3 left-3 z-10 rounded-full bg-cyan-600/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
              {badge}
            </div>
          )}

          <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950/50 flex items-center justify-center`}>
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white shadow-xs backdrop-blur-xs transition-all group-hover:bg-slate-900 group-hover:scale-105">
            <MagnifyingGlassPlus className="h-3.5 w-3.5" />
            <span>Enlarge Diagram</span>
          </div>
        </div>
      </div>

      {/* Caption at the bottom */}
      <div className="mt-3 border-t border-slate-100 pt-2.5 text-center dark:border-slate-800">
        <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
          {title}
        </h4>
        {caption && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 italic">
            {caption}
          </p>
        )}
      </div>

      {/* High-Resolution Modal View */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-2xl bg-white p-4 sm:p-6 shadow-2xl dark:bg-slate-900 flex flex-col items-center"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70 text-white transition-all hover:bg-slate-900 hover:scale-110"
                aria-label="Close image modal"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-auto p-2">
                <img loading="lazy"
                  src={src}
                  alt={alt}
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-xs"
                />
              </div>

              <div className="mt-4 text-center border-t border-slate-100 dark:border-slate-800 pt-3 w-full">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {title}
                </h4>
                {caption && (
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
