"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  MagnifyingGlass,
  Clock,
  CheckCircle,
  Trophy,
  Sparkle,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Target,
  Lightning,
  TreeStructure,
  ShieldCheck,
  Funnel,
  Plus
} from "@phosphor-icons/react";
import type { PublicQuizSummary } from "@/lib/supabase/quiz-public";

interface QuizPortalViewProps {
  adminQuizzes: PublicQuizSummary[];
}

interface CuratedQuiz {
  id: string;
  title: string;
  category: "cbt" | "class11" | "class12" | "taxonomy";
  categoryLabel: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "National Exam";
  questionsCount: number;
  timeMinutes: number;
  description: string;
  href: string;
  tags: string[];
  isFeatured?: boolean;
}

const CURATED_QUIZZES: CuratedQuiz[] = [
  {
    id: "neet-2020-cbt",
    title: "NEET 2020 Biology Official CBT Mock Exam",
    category: "cbt",
    categoryLabel: "Official CBT Simulation",
    difficulty: "National Exam",
    questionsCount: 90,
    timeMinutes: 180,
    description:
      "Full 90-question authentic Computer Based Test simulation with live timer, question palette navigation, +4/-1 marking scheme, and detailed NCERT solutions.",
    href: "/quiz/neet-2020",
    tags: ["NEET", "NTA Pattern", "Full Syllabus", "CBT Exam"],
    isFeatured: true,
  },
  {
    id: "curated-animal-kingdom",
    title: "Animal Kingdom: 11 Phyla Master Diagnostic",
    category: "class11",
    categoryLabel: "NCERT Class 11",
    difficulty: "Intermediate",
    questionsCount: 30,
    timeMinutes: 25,
    description:
      "Deep-dive test covering Porifera to Hemichordata: coelom types, symmetry, germ layers, canal systems, and hallmark diagnostic traits.",
    href: "/zoohub",
    tags: ["Porifera", "Coelom", "Animal Kingdom", "Invertebrates"],
  },
  {
    id: "curated-taxonomy-hierarchy",
    title: "Living World & Taxonomic Hierarchy Challenge",
    category: "taxonomy",
    categoryLabel: "Taxonomy & Diversity",
    difficulty: "Beginner",
    questionsCount: 20,
    timeMinutes: 15,
    description:
      "Test your recall on binomial nomenclature, ICZN rules, herbarium techniques, taxonomic keys, and hierarchical taxonomic categories.",
    href: "/taxonomy",
    tags: ["Nomenclature", "Taxonomy", "Binomial", "Hierarchy"],
  },
  {
    id: "curated-chordata-classification",
    title: "Chordata & Vertebrate Comparative Anatomy",
    category: "class11",
    categoryLabel: "NCERT Class 11",
    difficulty: "Advanced",
    questionsCount: 25,
    timeMinutes: 20,
    description:
      "High-yield practice on Protochordata, Cyclostomata, Chondrichthyes vs Osteichthyes, Amphibia, Reptilia, Aves, and Mammalia.",
    href: "/zoohub/chordata",
    tags: ["Chordata", "Vertebrates", "Comparative Anatomy", "Zoology"],
  },
  {
    id: "curated-genetics-evolution",
    title: "Evolution & Animal Population Genetics",
    category: "class12",
    categoryLabel: "NCERT Class 12",
    difficulty: "Advanced",
    questionsCount: 25,
    timeMinutes: 20,
    description:
      "Adaptive radiation, homologous vs analogous organs, Hardy-Weinberg equilibrium, and natural selection case studies.",
    href: "/blog/horse-evolution",
    tags: ["Evolution", "Hardy-Weinberg", "Adaptation", "Class 12"],
  },
];

export function QuizPortalView({ adminQuizzes: initialAdminQuizzes }: QuizPortalViewProps) {
  const [adminQuizzes, setAdminQuizzes] = useState<PublicQuizSummary[]>(initialAdminQuizzes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  // Sync live admin quizzes
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveQuizzes() {
      try {
        setLoading(true);
        const res = await fetch("/api/quizzes", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.quizzes && Array.isArray(data.quizzes)) {
            setAdminQuizzes(data.quizzes);
          }
        }
      } catch (err) {
        console.error("Error fetching live quizzes:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchLiveQuizzes();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { id: "all", label: "All Tests" },
    { id: "cbt", label: "CBT Mock Exams" },
    { id: "admin", label: "Admin Quizzes", count: adminQuizzes.length },
    { id: "class11", label: "Class 11 Zoology" },
    { id: "class12", label: "Class 12 Zoology" },
    { id: "taxonomy", label: "Taxonomy & Tree" },
  ];

  // Filter admin quizzes
  const filteredAdminQuizzes = useMemo(() => {
    if (selectedCategory !== "all" && selectedCategory !== "admin") return [];
    return adminQuizzes.filter((q) => {
      const matchQuery =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.description && q.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return matchQuery;
    });
  }, [adminQuizzes, searchQuery, selectedCategory]);

  // Filter curated quizzes
  const filteredCuratedQuizzes = useMemo(() => {
    if (selectedCategory === "admin") return [];
    return CURATED_QUIZZES.filter((q) => {
      const matchCat = selectedCategory === "all" || q.category === selectedCategory;
      const matchQuery =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const totalQuizzesCount = adminQuizzes.length + CURATED_QUIZZES.length;

  return (
    <div className="relative w-full overflow-hidden pb-20">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-4">
        
        {/* ================= HERO HEADER ================= */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ZooLearn Interactive Examination & Quiz Center
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.15]">
            Test Your Knowledge with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">High-Yield Quizzes</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Experience real-time Computer Based Tests (CBT), chapter diagnostics, and customized tests published by educators to strengthen your zoological mastery.
          </p>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
            <div className="p-3.5 rounded-2xl bg-background/80 dark:bg-muted/20 border border-border/70 backdrop-blur-sm shadow-xs flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{totalQuizzesCount}+</span>
              <span className="text-xs font-medium text-muted-foreground mt-0.5">Available Tests</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-background/80 dark:bg-muted/20 border border-border/70 backdrop-blur-sm shadow-xs flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-teal-600 dark:text-teal-400">90 Qs</span>
              <span className="text-xs font-medium text-muted-foreground mt-0.5">Full CBT Simulation</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-background/80 dark:bg-muted/20 border border-border/70 backdrop-blur-sm shadow-xs flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Instant</span>
              <span className="text-xs font-medium text-muted-foreground mt-0.5">Scoring & Analysis</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-background/80 dark:bg-muted/20 border border-border/70 backdrop-blur-sm shadow-xs flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-amber-500">100%</span>
              <span className="text-xs font-medium text-muted-foreground mt-0.5">NCERT Aligned</span>
            </div>
          </div>
        </section>

        {/* ================= SEARCH & CATEGORY FILTERS ================= */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:flex-1">
              <MagnifyingGlass
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quizzes by title, topic, or keyword (e.g. Porifera, NEET, Genetics)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-background border border-border/80 text-foreground placeholder-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Admin Portal Quick Link */}
            <Link
              href="/admin/quiz"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-muted/70 hover:bg-muted text-foreground border border-border/80 text-xs font-bold transition-all group"
            >
              <Plus size={16} className="text-emerald-500 group-hover:rotate-90 transition-transform duration-300" />
              <span>Admin Quiz Creator</span>
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    active
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]"
                      : "bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground border border-border/50"
                  }`}
                >
                  <span>{cat.label}</span>
                  {typeof cat.count === "number" && (
                    <span
                      className={`px-1.5 py-0.2 text-[10px] rounded-full ${
                        active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= FLAGSHIP CBT EXAM BANNER ================= */}
        {(selectedCategory === "all" || selectedCategory === "cbt") && !searchQuery && (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950/80 via-slate-900 to-[#07130f] border border-emerald-500/30 p-6 sm:p-8 md:p-10 shadow-xl shadow-emerald-950/20">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Trophy size={14} weight="fill" className="text-amber-400" />
                  Official NTA CBT Mock Simulation
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  NEET 2020 Biology Official CBT Examination
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Full 90-question authentic examination palette with interactive section filters, live ticking countdown timer, question status palette (Answered, Marked for Review, Not Visited), and instant NCERT scoring breakdown.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                    <Target size={16} className="text-emerald-400" />
                    <span>90 Questions (360 Marks)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                    <Clock size={16} className="text-teal-400" />
                    <span>180 Minutes Full Duration</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                    <ShieldCheck size={16} className="text-amber-400" />
                    <span>+4 / -1 Marking Rule</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/quiz/neet-2020"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Launch CBT Exam</span>
                  <ArrowRight size={18} weight="bold" />
                </Link>
                <span className="text-[11px] text-center text-slate-400 font-medium">
                  Free • No Registration Required
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADMIN PUBLISHED QUIZZES SECTION ================= */}
        {(selectedCategory === "all" || selectedCategory === "admin") && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
                  <Sparkle size={22} weight="fill" className="text-emerald-500" />
                  Admin & Educator Published Quizzes
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Quizzes authored, verified, and published directly from the ZooLearn admin console.
                </p>
              </div>
              <span className="text-xs font-bold text-muted-foreground px-3 py-1 rounded-lg bg-muted/50 border border-border/50">
                {filteredAdminQuizzes.length} Published
              </span>
            </div>

            {filteredAdminQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAdminQuizzes.map((quiz) => {
                  const timeLimitText = quiz.time_limit_seconds
                    ? `${Math.round(quiz.time_limit_seconds / 60)} Mins`
                    : "No Limit";
                  return (
                    <div
                      key={quiz.id}
                      className="group flex flex-col justify-between rounded-3xl bg-background border border-border/80 hover:border-emerald-500/50 p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                            Live Quiz
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock size={14} />
                            <span>{timeLimitText}</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {quiz.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                            {quiz.description || "Interactive quiz module with multiple choice questions and instant scoring."}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-muted-foreground border-t border-border/40">
                          <span className="flex items-center gap-1">
                            <BookOpen size={14} className="text-emerald-500" />
                            {quiz.question_count} Questions
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle size={14} className="text-teal-500" />
                            Pass: {quiz.passing_percentage}%
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40">
                        <Link
                          href={`/quiz/${quiz.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white font-bold text-sm transition-all duration-200 group-hover:shadow-md group-hover:shadow-emerald-500/20"
                        >
                          <span>Start Quiz</span>
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border/80 bg-muted/20 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                  <BookOpen size={24} />
                </div>
                <h4 className="text-base font-bold text-foreground">No Admin Quizzes Published Yet</h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  New quizzes created by administrators will appear here automatically. You can create quizzes in the admin builder.
                </p>
                <div className="pt-2">
                  <Link
                    href="/admin/quiz/new"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    <Plus size={14} />
                    Create a Quiz Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= CURATED TOPIC & CHAPTER CHALLENGES ================= */}
        {selectedCategory !== "admin" && filteredCuratedQuizzes.length > 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
                <Lightning size={22} weight="fill" className="text-teal-500" />
                NCERT Zoology Chapter & Topic Masterclasses
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Curated high-yield modules covering taxonomy, animal diversity, physiology, and evolutionary adaptations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCuratedQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="group flex flex-col justify-between rounded-3xl bg-background border border-border/80 hover:border-emerald-500/50 p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold">
                        {quiz.categoryLabel}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        quiz.difficulty === "National Exam"
                          ? "bg-rose-500/10 text-rose-500"
                          : quiz.difficulty === "Advanced"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {quiz.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {quiz.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {quiz.questionsCount} Qs
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {quiz.timeMinutes}m
                      </span>
                    </div>

                    <Link
                      href={quiz.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted/80 hover:bg-emerald-500 text-foreground hover:text-white text-xs font-bold transition-all duration-200"
                    >
                      <span>{quiz.category === "cbt" ? "Start Test" : "Explore"}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state when search produces 0 results */}
        {filteredAdminQuizzes.length === 0 && filteredCuratedQuizzes.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto text-muted-foreground">
              <MagnifyingGlass size={28} />
            </div>
            <h3 className="text-lg font-bold text-foreground">No quizzes found for &quot;{searchQuery}&quot;</h3>
            <p className="text-sm text-muted-foreground">
              Try searching with another keyword or reset the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
