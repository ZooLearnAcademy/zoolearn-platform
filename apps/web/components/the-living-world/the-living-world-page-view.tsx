"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  CheckCircle,
  BookOpen,
  Sparkle,
  TreeStructure
} from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { livingWorldTopics, type LivingWorldTopic, type ContentCard } from "@/data/the-living-world-topics";

import { BinomialTigerCard } from "./binomial-tiger-card";
import { TaxonomySystematicsCard } from "./taxonomy-systematics-card";
import { TaxonomicHierarchyVisual } from "./taxonomic-hierarchy-visual";
import { NCERTTaxaTable } from "./ncert-taxa-table";
import { TaxonomicalAidsVisual } from "./taxonomical-aids-visual";
import { Navbar } from "@/components/navbar";
import { LivingWorldSidebar } from "./living-world-sidebar";

interface TheLivingWorldPageViewProps {
  hideNavbar?: boolean;
}

export function TheLivingWorldPageView({ hideNavbar = false }: TheLivingWorldPageViewProps) {
  const [activeTopicId, setActiveTopicId] = useState<string>("introduction");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const activeTopicIndex = livingWorldTopics.findIndex((t) => t.id === activeTopicId);
  const activeTopic: LivingWorldTopic =
    livingWorldTopics[activeTopicIndex] ?? livingWorldTopics[0]!;

  const progressPercentage = Math.round(
    ((activeTopicIndex + 1) / livingWorldTopics.length) * 100
  );

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
    if (activeTopicIndex < livingWorldTopics.length - 1) {
      const nextTopic = livingWorldTopics[activeTopicIndex + 1];
      if (nextTopic) handleTopicChange(nextTopic.id);
    }
  };

  const handlePrevTopic = () => {
    if (activeTopicIndex > 0) {
      const prevTopic = livingWorldTopics[activeTopicIndex - 1];
      if (prevTopic) handleTopicChange(prevTopic.id);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Top Navbar */}
      {!hideNavbar && <Navbar />}

      {/* Background soft gradient aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1720px] px-3 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR (ZOOHUB STYLE) ================= */}
          <LivingWorldSidebar
            activeTopicId={activeTopicId}
            onSelectTopic={handleTopicChange}
          />

          {/* ================= RIGHT MAIN CONTENT CONTAINER ================= */}
          <main className="min-w-0 flex-1 w-full space-y-6">
            <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-10 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
              
              {/* Content Header: Title & Next Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
                <div>
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

                  {activeTopicIndex < livingWorldTopics.length - 1 ? (
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
                      Chapter Completed
                    </Button>
                  )}
                </div>
              </div>

              {/* Content Cards Stack */}
              <div className="mt-8 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTopic.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {activeTopic.cards.map((card) => (
                      <section
                        key={card.id}
                        id={card.id}
                        className="group relative rounded-2xl border border-slate-200/70 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-slate-300/90 hover:shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:border-slate-700"
                      >
                        {/* Card Header with Green Indicator Pill */}
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className="h-5 sm:h-6 w-1.5 rounded-full bg-[#00897b] shrink-0"
                          />
                          <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                            {card.title}
                          </h2>
                        </div>

                        {/* Card Paragraphs */}
                        {card.paragraphs && card.paragraphs.length > 0 && (
                          <div className="mt-3.5 space-y-3">
                            {card.paragraphs.map((p, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300"
                              >
                                {p}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Bullets if present */}
                        {card.bullets && card.bullets.length > 0 && (
                          <ul className="mt-4 space-y-2.5">
                            {card.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                                <span
                                  aria-hidden="true"
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00897b]"
                                />
                                <div className="leading-relaxed">
                                  {b.lead && (
                                    <strong className="text-slate-800 dark:text-slate-100 font-semibold mr-1.5">
                                      {b.lead}
                                    </strong>
                                  )}
                                  <span>{b.text}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Custom Visual Injections based on type */}
                        {card.customType === "binomial-tiger" && (
                          <BinomialTigerCard />
                        )}

                        {card.customType === "taxonomy-systematics" && (
                          <TaxonomySystematicsCard />
                        )}

                        {card.customType === "hierarchy-pyramid" && (
                          <TaxonomicHierarchyVisual />
                        )}

                        {card.customType === "taxa-table" && (
                          <NCERTTaxaTable />
                        )}

                        {card.customType === "aids-grid" && (
                          <TaxonomicalAidsVisual />
                        )}
                      </section>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
                {activeTopicIndex > 0 ? (
                  <Button
                    variant="outline"
                    onClick={handlePrevTopic}
                    className="w-full sm:w-auto rounded-full border-slate-200 px-6 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Topic ({livingWorldTopics[activeTopicIndex - 1]?.title})
                  </Button>
                ) : <div />}

                {activeTopicIndex < livingWorldTopics.length - 1 ? (
                  <Button
                    onClick={handleNextTopic}
                    className="w-full sm:w-auto rounded-full bg-[#00897b] hover:bg-[#00796b] text-white px-7 py-2.5 text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-[1.02]"
                  >
                    Next Topic ({livingWorldTopics[activeTopicIndex + 1]?.title})
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={scrollToTop}
                    className="w-full sm:w-auto rounded-full bg-[#00897b] hover:bg-[#00796b] text-white px-7 py-2.5 text-xs sm:text-sm font-semibold shadow-sm"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Back to Top
                  </Button>
                )}
              </div>

            </div>
          </main>

        </div>
      </div>

      {/* Floating Scroll to Top Button (matching screenshot bottom right) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#00897b] text-white shadow-lg transition-transform duration-200 hover:bg-[#00796b] hover:scale-110 active:scale-95"
          >
            <ArrowUp className="h-5 w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
