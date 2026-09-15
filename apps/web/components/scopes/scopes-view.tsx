"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  Heart,
  ArrowRight,
  ArrowLeft,
  Sparkle,
  TrendUp,
  GraduationCap,
  Briefcase,
  SlidersHorizontal,
  Compass,
  Microscope,
  Tree,
  Waves,
  Stethoscope,
  Dna,
  Bug,
  Brain,
  Fingerprint,
  Building,
  Buildings,
  Globe,
  ShareNetwork,
  CheckCircle,
  X,
  CaretRight,
  CurrencyInr,
  BookOpen,
  Info,
  FolderOpen,
  Lightbulb,
} from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";
import {
  type CareerItem,
  type ScopeCategory,
  type CourseDetail,
} from "@/data/scopes-data";
import { CareerPathwayFlow } from "./career-pathway-flow";

interface ScopesViewProps {
  initialCategories: ScopeCategory[];
  initialCareers:    CareerItem[];
  courseDetails:     Record<string, CourseDetail>;
}

export function ScopesView({
  initialCategories,
  initialCareers,
  courseDetails,
}: ScopesViewProps) {
  // Use DB data passed from the Server Component
  const scopeCategories = initialCategories;
  const allCareers      = initialCareers;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active Scope selection (Level 1: null = All Scopes Hub, Level 2: scopeId = Careers inside that scope)
  const initialScope = searchParams.get("scope") || null;
  const [activeScopeId, setActiveScopeId] = useState<string | null>(initialScope);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [qualificationFilter, setQualificationFilter] = useState<"all" | "bsc" | "msc" | "phd">("all");
  const [onlyTopChoices, setOnlyTopChoices] = useState(false);
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [activeCareer, setActiveCareer] = useState<CareerItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state when URL search params change
  useEffect(() => {
    const scopeParam = searchParams.get("scope");
    if (scopeParam) {
      const exists = scopeCategories.some((c) => c.id === scopeParam);
      if (exists) {
        setActiveScopeId(scopeParam);
      }
    } else {
      setActiveScopeId(null);
    }
  }, [searchParams]);

  // Navigate to Scope
  const handleSelectScope = (scopeId: string) => {
    setActiveScopeId(scopeId);
    setSearchQuery("");
    setQualificationFilter("all");
    setOnlyTopChoices(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(`/scopes?scope=${scopeId}`, { scroll: false });
  };

  // Back to All Scopes
  const handleBackToAllScopes = () => {
    setActiveScopeId(null);
    setSearchQuery("");
    setQualificationFilter("all");
    setOnlyTopChoices(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(`/scopes`, { scroll: false });
  };

  // Toggle bookmark / favorites
  const toggleSave = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedCareers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Find active scope object
  const currentScope = useMemo(() => {
    if (!activeScopeId) return null;
    return scopeCategories.find((c) => c.id === activeScopeId) || null;
  }, [activeScopeId]);

  // Scopes Filter for Level 1 Hub
  const filteredScopes = useMemo(() => {
    if (!searchQuery.trim()) return scopeCategories;
    const query = searchQuery.toLowerCase();
    return scopeCategories.filter(
      (scope) =>
        scope.name.toLowerCase().includes(query) ||
        scope.shortName.toLowerCase().includes(query) ||
        scope.description.toLowerCase().includes(query) ||
        scope.topRoles.some((role) => role.toLowerCase().includes(query)) ||
        allCareers.some(
          (car) =>
            car.categoryId === scope.id &&
            (car.title.toLowerCase().includes(query) ||
              car.desc.toLowerCase().includes(query))
        )
    );
  }, [searchQuery]);

  // Careers Filter for Level 2 inside active scope
  const filteredCareers = useMemo(() => {
    if (!activeScopeId) return [];

    return allCareers.filter((career) => {
      // Must belong to this scope
      if (career.categoryId !== activeScopeId) return false;

      // In-scope search
      const matchesSearch =
        searchQuery.trim() === "" ||
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.bsc.some((deg) => deg.toLowerCase().includes(searchQuery.toLowerCase())) ||
        career.msc.some((deg) => deg.toLowerCase().includes(searchQuery.toLowerCase())) ||
        career.phd.some((deg) => deg.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (career.topSectors &&
          career.topSectors.some((sec) => sec.toLowerCase().includes(searchQuery.toLowerCase())));

      // Qualification filter
      const matchesQualification =
        qualificationFilter === "all" ||
        (qualificationFilter === "bsc" && career.bsc.length > 0) ||
        (qualificationFilter === "msc" && career.msc.length > 0) ||
        (qualificationFilter === "phd" && career.phd.length > 0);

      // Top Choice filter
      const matchesTopChoice = !onlyTopChoices || career.isTopChoice;

      return matchesSearch && matchesQualification && matchesTopChoice;
    });
  }, [activeScopeId, searchQuery, qualificationFilter, onlyTopChoices]);

  // Handle sharing
  const handleShare = (career: CareerItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/scopes?scope=${career.categoryId}&career=${career.id}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Render category icon dynamically
  const renderCategoryIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Microscope":
        return <Microscope className={className} />;
      case "Tree":
        return <Tree className={className} />;
      case "Waves":
        return <Waves className={className} />;
      case "Stethoscope":
        return <Stethoscope className={className} />;
      case "Dna":
        return <Dna className={className} />;
      case "Bug":
        return <Bug className={className} />;
      case "Brain":
        return <Brain className={className} />;
      case "Fingerprint":
        return <Fingerprint className={className} />;
      case "Building2":
        return <Buildings className={className} />;
      case "Landmark":
        return <Building className={className} />;
      case "Globe":
        return <Globe className={className} />;
      case "GraduationCap":
        return <GraduationCap className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-600">
      {/* Background Subtle Pattern */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-80 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* LEVEL 1: ALL SCOPES HUB (SHOWN FIRST) */}
        {/* ========================================================================= */}
        {!activeScopeId && (
          <div>
            {/* HERO SECTION */}
            <section className="relative pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-border/50">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-medium tracking-wide mb-5">
                  <Sparkle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  <span>ZOOLOGY & LIFE SCIENCES SCOPES • 15 SPECIALIZED DOMAINS</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-4xl leading-[1.15]">
                  Explore High-Yield{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Zoology & Life Sciences
                  </span>{" "}
                  Scopes
                </h1>

                {/* Subtitle */}
                <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Select a specialized scope domain below to explore verified career avenues, research pathways, and academic progression roadmaps.
                </p>

                {/* Real-time KPI Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 w-full max-w-4xl">
                  <div className="flex flex-col items-center p-3.5 rounded-xl bg-card border border-border/70 shadow-xs hover:border-emerald-500/40 transition-colors">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">15</span>
                    <span className="text-xs text-muted-foreground font-medium mt-0.5">Specialized Scopes</span>
                  </div>
                  <div className="flex flex-col items-center p-3.5 rounded-xl bg-card border border-border/70 shadow-xs hover:border-emerald-500/40 transition-colors">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">100+</span>
                    <span className="text-xs text-muted-foreground font-medium mt-0.5">Verified Careers</span>
                  </div>
                  <div className="flex flex-col items-center p-3.5 rounded-xl bg-card border border-border/70 shadow-xs hover:border-emerald-500/40 transition-colors">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">₹3–40 LPA</span>
                    <span className="text-xs text-muted-foreground font-medium mt-0.5">Salary Spectrum</span>
                  </div>
                  <div className="flex flex-col items-center p-3.5 rounded-xl bg-card border border-border/70 shadow-xs hover:border-emerald-500/40 transition-colors">
                    <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-mono">100%</span>
                    <span className="text-xs text-muted-foreground font-medium mt-0.5">Academic Roadmaps</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* SCOPES SEARCH COMMAND BAR */}
            <section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border/60 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                <div className="relative w-full flex-1">
                  <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search scopes (e.g., General Zoology, Wildlife, Biotechnology, Marine, Forensics, IFS)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 py-2 h-10 w-full rounded-xl bg-card border-border/80 focus-visible:ring-emerald-500 text-xs sm:text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-mono font-medium text-muted-foreground whitespace-nowrap hidden md:block">
                  Showing {filteredScopes.length} Domains
                </div>
              </div>
            </section>

            {/* SCOPE CARDS GRID (PRIMARY VIEW) */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredScopes.map((scope, index) => {
                  return (
                    <motion.div
                      key={scope.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                    >
                      <Card
                        onClick={() => handleSelectScope(scope.id)}
                        className="group cursor-pointer rounded-2xl border border-border/80 bg-card hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full p-5 sm:p-6"
                      >
                        <div>
                          {/* Top Row: Icon + Career Count Pill */}
                          <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                              {renderCategoryIcon(scope.iconName, "w-4 h-4 sm:w-5 sm:h-5")}
                            </div>

                            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-muted text-muted-foreground font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border border-border/60">
                              {scope.count} CAREERS
                            </span>
                          </div>

                          {/* Scope Title */}
                          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                            {scope.name}
                          </h3>

                          {/* Salary Range Badge */}
                          <div className="mt-2 mb-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                              <CurrencyInr className="w-3.5 h-3.5" />
                              <span>{scope.salaryRange}</span>
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3 sm:mb-4">
                            {scope.description}
                          </p>

                          {/* Top Roles Preview Pills */}
                          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                            {scope.topRoles.slice(0, 4).map((role) => (
                              <span
                                key={role}
                                className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground text-[10px] sm:text-[11px] font-medium border border-border/50"
                              >
                                {role}
                              </span>
                            ))}
                            {scope.topRoles.length > 4 && (
                              <span className="px-2 py-0.5 rounded-md bg-muted/40 text-muted-foreground text-[10px] sm:text-[11px] font-medium">
                                +{scope.topRoles.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Footer */}
                        <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
                          <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            Explore Careers
                          </span>

                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </main>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 2: CAREERS DIRECTORY INSIDE SELECTED SCOPE */}
        {/* ========================================================================= */}
        {activeScopeId && currentScope && (
          <div>
            {/* BREADCRUMB & HEADER SECTION */}
            <section className="relative pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-border/50">
              {/* Back Button / Breadcrumb */}
              <button
                onClick={handleBackToAllScopes}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-4 px-3 py-1.5 rounded-lg border border-border/70 bg-card hover:bg-muted"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Scopes</span>
              </button>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                      {renderCategoryIcon(currentScope.iconName, "w-3.5 h-3.5 sm:w-4 sm:h-4")}
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      SCOPE DOMAIN DIRECTORY
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                    {currentScope.name}
                  </h1>

                  <p className="text-xs sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                    {currentScope.description}
                  </p>
                </div>

                {/* Scope Metadata Badges */}
                <div className="flex sm:flex-col gap-2 shrink-0 flex-wrap">
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-card border border-border/80 flex items-center gap-2 flex-1 sm:flex-initial">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-mono block">Career Roles</span>
                      <span className="text-xs sm:text-sm font-bold text-foreground font-mono">{filteredCareers.length} Available</span>
                    </div>
                  </div>

                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-card border border-border/80 flex items-center gap-2 flex-1 sm:flex-initial">
                    <CurrencyInr className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-mono block">Domain Spectrum</span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 font-mono">{currentScope.salaryRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* IN-SCOPE FILTER COMMAND BAR */}
            <section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border/60 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
                {/* Search in this Scope */}
                <div className="relative w-full flex-1">
                  <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={`Search careers in ${currentScope.shortName}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 py-2 h-10 w-full rounded-xl bg-card border-border/80 focus-visible:ring-emerald-500 text-xs sm:text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  <Button
                    variant={onlyTopChoices ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOnlyTopChoices(!onlyTopChoices)}
                    className={`h-9 sm:h-10 rounded-xl px-3 sm:px-3.5 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                      onlyTopChoices
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600"
                        : "border-border/80 text-foreground hover:bg-muted"
                    }`}
                  >
                    <Sparkle className="w-3.5 h-3.5" />
                    <span>Top Choice</span>
                  </Button>

                  {/* Degree Filter */}
                  <div className="inline-flex rounded-xl p-0.5 sm:p-1 bg-muted/60 border border-border/80 shrink-0">
                    <button
                      onClick={() => setQualificationFilter("all")}
                      className={`px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                        qualificationFilter === "all"
                          ? "bg-card text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setQualificationFilter("bsc")}
                      className={`px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                        qualificationFilter === "bsc"
                          ? "bg-card text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      B.Sc
                    </button>
                    <button
                      onClick={() => setQualificationFilter("msc")}
                      className={`px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                        qualificationFilter === "msc"
                          ? "bg-card text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      M.Sc
                    </button>
                    <button
                      onClick={() => setQualificationFilter("phd")}
                      className={`px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                        qualificationFilter === "phd"
                          ? "bg-card text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Ph.D
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* CAREERS CARD GRID */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Status Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    Showing {filteredCareers.length} Careers in {currentScope.shortName}
                  </span>
                  {(searchQuery || onlyTopChoices || qualificationFilter !== "all") && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setOnlyTopChoices(false);
                        setQualificationFilter("all");
                      }}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 ml-2"
                    >
                      <X className="w-3 h-3" /> Reset Filters
                    </button>
                  )}
                </div>

                <div className="text-xs text-muted-foreground hidden sm:block">
                  Click on any card to view detailed B.Sc → M.Sc → Ph.D roadmaps
                </div>
              </div>

              {filteredCareers.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border/80 p-8">
                  <Compass className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h3 className="text-lg font-bold text-foreground">No careers match your search in this scope</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                    Try searching for different keywords or clear your degree / top-choice filters.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setOnlyTopChoices(false);
                      setQualificationFilter("all");
                    }}
                    className="mt-4 rounded-xl"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredCareers.map((career, index) => {
                    const isSaved = savedCareers.includes(career.id);

                    return (
                      <motion.div
                        key={career.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                      >
                        <Card
                          onClick={() => setActiveCareer(career)}
                          className="group cursor-pointer rounded-2xl border border-border/80 bg-card hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 relative overflow-hidden flex flex-col justify-between h-full p-5"
                        >
                          <div>
                            {/* Top Badges & Bookmark */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {career.isTopChoice ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 font-mono font-bold text-[10px] tracking-wider uppercase">
                                    TOP CHOICE
                                  </span>
                                ) : null}

                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                                  {career.secondaryBadge || career.category}
                                </span>
                              </div>

                              <button
                                onClick={(e) => toggleSave(career.id, e)}
                                className={`p-1.5 rounded-full hover:bg-muted transition-colors ${
                                  isSaved
                                    ? "text-rose-500 fill-rose-500"
                                    : "text-muted-foreground/70 hover:text-rose-500"
                                }`}
                                title={isSaved ? "Remove from saved" : "Save career"}
                              >
                                <Heart
                                  weight={isSaved ? "fill" : "regular"}
                                  className="w-4 h-4"
                                />
                              </button>
                            </div>

                            {/* Card Title */}
                            <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                              {career.title}
                            </h3>

                            {/* Salary Pill */}
                            <div className="mt-2.5 mb-3">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                                <CurrencyInr className="w-3.5 h-3.5" />
                                <span>{career.salary.replace("₹", "").trim()}</span>
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                              {career.desc}
                            </p>
                          </div>

                          {/* Footer View Pathway Link */}
                          <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
                            <span className="text-sm font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                              View Pathway
                            </span>

                            <div className="w-7 h-7 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CAREER PATHWAY REACT FLOW EXPLORER MODAL (EXACT MATCH WITH SCREENSHOT) */}
      {/* ========================================================================= */}
      <Dialog open={!!activeCareer} onOpenChange={(open) => !open && setActiveCareer(null)}>
        {activeCareer && (
          <DialogContent className="max-w-6xl w-[95vw] p-0 border-none bg-transparent shadow-none [&>button]:hidden">
            <CareerPathwayFlow
              career={activeCareer}
              onClose={() => setActiveCareer(null)}
            />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
