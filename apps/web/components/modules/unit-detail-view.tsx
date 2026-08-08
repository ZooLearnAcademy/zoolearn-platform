"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  TreeStructure,
  Dna,
  Atom,
  Plant,
  Heartbeat,
  MagnifyingGlass,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Compass,
  CheckCircle
} from "@phosphor-icons/react";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import type { ModuleCurriculumData, Unit, Chapter } from "./class-module-view";

interface UnitDetailViewProps {
  gradeData: ModuleCurriculumData;
  unit: Unit;
}

export function UnitDetailView({ gradeData, unit }: UnitDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<{ unit: Unit; chapter: Chapter } | null>(null);

  // Unit theme helper
  const getUnitTheme = (unitId: string) => {
    switch (unitId) {
      case "diversity-in-living-world":
      case "biology-in-human-welfare":
      case "ecology-and-environment":
        return {
          glow: "from-emerald-500/15 via-emerald-500/5 to-transparent",
          tag: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          accentText: "text-emerald-600 dark:text-emerald-400",
          icon: TreeStructure
        };
      case "structural-organisation":
      case "genetics-and-evolution":
        return {
          glow: "from-cyan-500/15 via-cyan-500/5 to-transparent",
          tag: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
          accentText: "text-cyan-600 dark:text-cyan-400",
          icon: Dna
        };
      case "cell-structure-and-functions":
        return {
          glow: "from-violet-500/15 via-violet-500/5 to-transparent",
          tag: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30",
          accentText: "text-violet-600 dark:text-violet-400",
          icon: Atom
        };
      case "plant-physiology":
      case "biotechnology":
        return {
          glow: "from-amber-500/15 via-amber-500/5 to-transparent",
          tag: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          accentText: "text-amber-600 dark:text-amber-400",
          icon: Plant
        };
      case "human-physiology":
      case "reproduction":
      default:
        return {
          glow: "from-rose-500/15 via-rose-500/5 to-transparent",
          tag: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
          accentText: "text-rose-600 dark:text-rose-400",
          icon: Heartbeat
        };
    }
  };

  const theme = getUnitTheme(unit.id);
  const IconComponent = theme.icon;

  // Filter Chapters
  const filteredChapters = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return unit.chapters;
    return unit.chapters.filter((chapter) => {
      return (
        chapter.title.toLowerCase().includes(q) ||
        chapter.description.toLowerCase().includes(q) ||
        chapter.keyTopics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [unit.chapters, searchQuery]);

  const parentGradeRoute = `/modules/${gradeData.grade}`;

  return (
    <div className="w-full min-h-screen bg-background text-foreground pb-32 selection:bg-primary/20 selection:text-foreground">
      {/* Precision Background Grid */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 max-w-7xl">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-wider text-muted-foreground uppercase mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">ACADEMY</Link>
          <span className="text-border">/</span>
          <Link href="/#learning-modules" className="hover:text-foreground transition-colors">MODULES</Link>
          <span className="text-border">/</span>
          <Link href={parentGradeRoute} className="hover:text-foreground transition-colors">
            {gradeData.gradeTitle.toUpperCase()}
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-semibold">
            {unit.unitNumber.toUpperCase()}
          </span>
        </div>

        {/* Executive Unit Hero Section */}
        <div className="relative rounded-xl border border-slate-300 dark:border-slate-700/90 bg-card/85 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden mb-10">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-400/50 dark:via-slate-600/50 to-transparent" />

          {/* Ambient Glow */}
          <div className={cn(
            "absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none bg-gradient-to-br",
            theme.glow
          )} />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
            <div className="space-y-4 max-w-3xl">
              {/* Badge Row & Back Button */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={parentGradeRoute}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium border border-slate-300 dark:border-slate-700 bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All {gradeData.gradeTitle} Units</span>
                </Link>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-foreground/10 text-foreground border border-border">
                  {unit.unitNumber} • {unit.category}
                </span>
              </div>

              {/* Title with Large Themed Icon */}
              <div className="flex items-start sm:items-center gap-4 pt-1">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs shrink-0",
                  theme.tag
                )}>
                  <IconComponent className="w-8 h-8" weight="duotone" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                    {unit.title}
                  </h1>
                  <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-0.5">
                    {unit.tagline}
                  </p>
                </div>
              </div>

              {/* Subtitle / Description */}
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-2xl">
                {unit.description}
              </p>
            </div>

            {/* High-Yield Target Stats */}
            <div className="flex items-center gap-3 border-t lg:border-t-0 lg:border-l border-border/70 pt-6 lg:pt-0 lg:pl-8 shrink-0">
              <div className="pr-3 sm:pr-4 py-1.5 first:pl-0 border-r border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Unit Chapters</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-foreground mt-0.5 flex items-baseline gap-2">
                  <span>{unit.chapters.length}</span>
                  <span className="text-[10px] font-normal text-muted-foreground font-sans">Chapters</span>
                </div>
              </div>

              <div className="px-3 sm:px-4 py-1.5 border-r border-border/40">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">NEET Weightage</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-foreground mt-0.5 flex items-baseline gap-2">
                  <span>{unit.neetWeightage}</span>
                </div>
              </div>

              <div className="px-3 sm:px-4 py-1.5 last:pr-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Standard</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-baseline gap-2">
                  <span>100%</span>
                  <span className="text-[10px] font-normal text-muted-foreground font-sans">NCERT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Command Toolbar: Search Chapters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`Search chapters in ${unit.unitNumber}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-12 h-10 bg-card border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm focus-visible:ring-primary/20 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground hover:text-foreground bg-muted px-1.5 py-0.5 rounded"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground px-3 py-1.5 rounded-lg bg-card border border-slate-300 dark:border-slate-700 shadow-xs">
              Showing {filteredChapters.length} of {unit.chapters.length} Chapters
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXECUTIVE INDUSTRIAL CHAPTERS GRID (EXACT SAME 3-COLUMN CARD SYSTEM) */}
        {/* ========================================================================= */}

        {filteredChapters.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-border/70 bg-card/40 space-y-3">
            <Compass className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="text-base font-bold text-foreground">No matching chapters found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No chapters in {unit.unitNumber} match &quot;{searchQuery}&quot;.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSearchQuery("")} className="text-xs rounded-md">
              Reset Query
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => setSelectedChapter({ unit, chapter })}
                className="group relative rounded-xl border border-slate-300 dark:border-slate-700/90 bg-card hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer space-y-4 overflow-hidden"
              >
                {/* Top Inset Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-400/50 dark:via-slate-600/50 to-transparent" />

                {/* Subtle Hover Ambient Glow */}
                <div className={cn(
                  "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none bg-gradient-to-br",
                  theme.glow
                )} />

                <div className="space-y-4 relative z-10">
                  {/* Monospace Metadata Row with Large Professional Icon */}
                  <div className="flex items-center gap-3.5">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md",
                      theme.tag
                    )}>
                      <IconComponent className="w-6 h-6" weight="duotone" />
                    </div>
                    <span className="text-base sm:text-lg font-mono font-bold uppercase tracking-wider text-foreground">
                      CHAPTER {chapter.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h3>
                  </div>

                  {/* Key Topics as a single clean paragraph */}
                  <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                    {chapter.keyTopics.join(", ")}.
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-5 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 relative z-10">
                  <div className="text-[11px] font-mono text-muted-foreground">
                    Chapter {chapter.number} • NCERT
                  </div>

                  <div className="flex items-center gap-1.5">
                    {chapter.id === "animal-kingdom" && (
                      <Link
                        href="/zoohub"
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-7 px-2.5 text-[11px] font-mono rounded-md border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-1 shadow-xs"
                        )}
                      >
                        <span>ZooHub 3D</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    )}

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedChapter({ unit, chapter });
                      }}
                      className="h-7 px-2.5 text-[11px] font-mono rounded-md font-semibold flex items-center gap-1 shadow-xs"
                    >
                      <span>Explore Chapter</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chapter Detail Inspector Modal */}
        <AnimatePresence>
          {selectedChapter && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="relative w-full max-w-xl bg-card border border-border rounded-xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      {unit.unitNumber} • CHAPTER {selectedChapter.chapter.number}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      {selectedChapter.chapter.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedChapter(null)}
                    className="w-8 h-8 rounded-md bg-muted/60 text-muted-foreground hover:text-foreground flex items-center justify-center text-xs font-mono"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                      Overview
                    </h4>
                    <p className="text-foreground/90 leading-relaxed">
                      {selectedChapter.chapter.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      High-Yield Examination Focus
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedChapter.chapter.keyTopics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-muted/60 border border-border/60 text-foreground/80 font-mono text-[11px]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="text-[11px] font-mono text-muted-foreground">
                      NEET Weightage: <span className="text-foreground font-semibold">{selectedChapter.chapter.neetWeightage}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedChapter.chapter.id === "animal-kingdom" && (
                        <Link
                          href="/zoohub"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "h-8 px-3 text-xs font-mono rounded-md border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                          )}
                        >
                          <span>Open ZooHub 3D</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      )}

                      <Button
                        size="sm"
                        onClick={() => setSelectedChapter(null)}
                        className="h-8 px-4 text-xs font-mono rounded-md"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
