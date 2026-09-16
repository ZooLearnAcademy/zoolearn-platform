"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  CheckCircle,
  Sparkle,
  Cube,
  ImageIcon
} from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Navbar } from "@/components/navbar";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export interface OrganismCardContent {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: {
    type?: "ncert" | "key" | "mnemonic";
    title?: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  model3D?: {
    src: string;
    title: string;
  };
  steps?: {
    num: string | number;
    title: string;
    desc: string;
  }[];
  customComponent?: React.ReactNode;
}

export interface OrganismTopic {
  id: string;
  title: string;
  description: string;
  cards: OrganismCardContent[];
}

export interface OrganismData {
  id: string;
  title: string;
  scientificName: string;
  taxonomyMeta: string;
  icon: string;
  topics: OrganismTopic[];
}

interface OrganismShellProps {
  data: OrganismData;
  hideNavbar?: boolean;
}

export function OrganismShell({ data, hideNavbar = false }: OrganismShellProps) {
  const [activeTopicId, setActiveTopicId] = useState<string>(data.topics[0]?.id || "");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const activeTopicIndex = data.topics.findIndex((t) => t.id === activeTopicId);
  const activeTopic: OrganismTopic = data.topics[activeTopicIndex] ?? data.topics[0]!;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTopicChange = (topicId: string) => {
    setActiveTopicId(topicId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextTopic = () => {
    if (activeTopicIndex < data.topics.length - 1) {
      const nextTopic = data.topics[activeTopicIndex + 1];
      if (nextTopic) handleTopicChange(nextTopic.id);
    }
  };

  const handlePrevTopic = () => {
    if (activeTopicIndex > 0) {
      const prevTopic = data.topics[activeTopicIndex - 1];
      if (prevTopic) handleTopicChange(prevTopic.id);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Top Navbar */}
      {!hideNavbar && <Navbar />}

      {/* Background Soft Aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1720px] px-3 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR (COMPLETE SUB-TOPICS LIST) ================= */}
          <aside className="w-full lg:w-72 xl:w-80 lg:shrink-0 lg:sticky lg:top-24 space-y-4 font-sans select-none">
            <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 p-3 sm:p-4 shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar">
              
              {/* Header Box */}
              <div className="p-2 mb-3 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00897b] to-[#00bfa5] text-white text-xl shadow-xs shrink-0">
                  {data.icon}
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="font-extrabold text-base text-slate-800 dark:text-slate-100 truncate">{data.title}</span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 italic font-serif truncate">{data.scientificName}</span>
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mt-1 truncate">{data.taxonomyMeta}</span>
                </div>
              </div>

              {/* Navigation Menu with All Sub-topics */}
              <nav className="space-y-1">
                {data.topics.map((topic, idx) => {
                  const isTopicActive = activeTopicId === topic.id;

                  return (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicChange(topic.id)}
                      className={cn(
                        "w-full text-left flex items-center justify-between text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl transition-all cursor-pointer group",
                        isTopicActive
                          ? "bg-[#e0f2f1]/90 text-[#00695c] font-extrabold shadow-2xs dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "text-slate-700 dark:text-slate-200 hover:bg-emerald-50/80 hover:text-emerald-700 dark:hover:bg-slate-800/60"
                      )}
                    >
                      <span className="truncate flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] font-mono px-1.5 py-0.5 rounded-md",
                          isTopicActive ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        )}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate">{topic.title}</span>
                      </span>
                      {isTopicActive && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT CONTAINER ================= */}
          <main className="min-w-0 flex-1 w-full space-y-6">
            <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-10 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
              
              {/* Content Header: Title & Navigation Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Module {activeTopicIndex + 1} of {data.topics.length}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#004d40] dark:text-emerald-400">
                    {activeTopic.title}
                  </h1>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {activeTopic.description}
                  </p>
                </div>

                {/* Top Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {activeTopicIndex > 0 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevTopic}
                      className="rounded-full border-slate-200 text-xs text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                    >
                      <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                      Prev
                    </Button>
                  )}

                  {activeTopicIndex < data.topics.length - 1 ? (
                    <Button
                      onClick={handleNextTopic}
                      className="rounded-full bg-[#00897b] hover:bg-[#00796b] text-white px-5 py-2 text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-[1.02]"
                    >
                      Next
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={scrollToTop}
                      className="rounded-full border-emerald-500/40 text-emerald-600 hover:bg-emerald-50 text-xs sm:text-sm dark:text-emerald-400"
                    >
                      <CheckCircle className="mr-1.5 h-4 w-4" />
                      Module Completed
                    </Button>
                  )}
                </div>
              </div>

              {/* Cards Stack */}
              <div className="mt-8 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTopic.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {activeTopic.cards.map((card) => (
                      <div
                        key={card.id}
                        id={card.id}
                        className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-slate-800/80 dark:bg-slate-900/60 shadow-2xs hover:border-emerald-500/30 transition-all duration-300"
                      >
                        {/* Card Header with Emerald Bar */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="w-1.5 h-6 bg-emerald-500 dark:bg-emerald-400 rounded-full shrink-0" />
                          <div>
                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                              {card.title}
                            </h2>
                            {card.subtitle && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {card.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Custom Component Render */}
                        {card.customComponent && (
                          <div className="my-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
                            {card.customComponent}
                          </div>
                        )}

                        {/* Interactive 3D Model Embed */}
                        {card.model3D && (
                          <div className="my-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-md">
                            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/80 text-xs font-bold text-slate-300">
                              <span className="flex items-center gap-2">
                                <Cube className="size-4 text-emerald-400 animate-pulse" weight="bold" />
                                3D Interactive Model: {card.model3D.title}
                              </span>
                              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Interactive Canvas</span>
                            </div>
                            <div className="relative w-full h-[380px] sm:h-[450px]">
                              <iframe
                                title={card.model3D.title}
                                src={card.model3D.src}
                                className="w-full h-full border-0"
                                allow="autoplay; fullscreen; vr"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )}

                        {/* Paragraphs */}
                        {card.paragraphs && card.paragraphs.length > 0 && (
                          <div className="space-y-3 mb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {card.paragraphs.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        )}

                        {/* Bullet Items */}
                        {card.bullets && card.bullets.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {card.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Steps Process Visual */}
                        {card.steps && card.steps.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
                            {card.steps.map((step, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 shadow-2xs flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                                    {step.num}
                                  </span>
                                </div>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{step.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">{step.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Callout Box */}
                        {card.callout && (
                          <div className="my-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 flex items-start gap-3">
                            <Sparkle className="size-5 text-emerald-500 shrink-0 mt-0.5" weight="fill" />
                            <div>
                              {card.callout.title && (
                                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                                  {card.callout.title}
                                </h4>
                              )}
                              <p className="leading-relaxed font-medium">{card.callout.text}</p>
                            </div>
                          </div>
                        )}

                        {/* Image / Diagram with Caption */}
                        {card.image && (
                          <div className="my-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950/60 p-3 text-center shadow-xs">
                            <div className="flex items-center gap-2 mb-2 px-2 text-[11px] font-bold text-slate-400">
                              <ImageIcon className="size-3.5 text-emerald-400" />
                              <span>Anatomical Illustration / Diagram</span>
                            </div>
                            <img
                              src={optimizeCloudinaryUrl(card.image.src, 600)}
                              alt={card.image.alt}
                              className="mx-auto max-h-96 w-auto rounded-xl object-contain shadow-md transition-transform hover:scale-[1.01]"
                              loading="lazy"
                            />
                            {card.image.caption && (
                              <p className="mt-3 text-xs font-semibold text-slate-400 dark:text-slate-400">
                                Figure: {card.image.caption}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Styled Table */}
                        {card.table && (
                          <div className="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-left text-xs sm:text-sm">
                              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px]">
                                <tr>
                                  {card.table.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                                {card.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="px-4 py-3">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Navigation Controls */}
              <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                {activeTopicIndex > 0 ? (
                  <Button
                    variant="outline"
                    onClick={handlePrevTopic}
                    className="w-full sm:w-auto rounded-full border-slate-200 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 px-6 py-2.5"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Topic ({data.topics[activeTopicIndex - 1]?.title})
                  </Button>
                ) : <div />}

                {activeTopicIndex < data.topics.length - 1 && (
                  <Button
                    onClick={handleNextTopic}
                    className="w-full sm:w-auto rounded-full bg-[#00897b] hover:bg-[#00796b] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 shadow-xs transition-all hover:scale-[1.02]"
                  >
                    Next Topic ({data.topics[activeTopicIndex + 1]?.title})
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* Floating Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#00897b] text-white shadow-lg transition-transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" weight="bold" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
