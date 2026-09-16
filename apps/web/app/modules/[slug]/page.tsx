import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { ClassModuleView, ModuleCurriculumData } from "@/components/modules/class-module-view";
import class11Data from "@/data/class11-modules.json";
import class12Data from "@/data/class12-modules.json";
import { buttonVariants } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "11th" || slug === "living-world" || slug === "11th-module") {
    return {
      title: "Class 11 Biology Module - Complete 5 Units & NEET Guide | ZooLearn",
      description: "Explore the complete Class 11 Biology curriculum featuring Diversity in Living World, Structural Organisation, Cell Biology, Plant Physiology, and Human Physiology with interactive taxonomy blueprints."
    };
  }
  if (slug === "12th" || slug === "patterns" || slug === "12th-module") {
    return {
      title: "Class 12 Biology Module - Genetics, Reproduction & Biotechnology | ZooLearn",
      description: "Comprehensive Class 12 Biology preparation module covering Reproduction, Genetics & Evolution, Biology in Human Welfare, Biotechnology, and Ecology."
    };
  }
  if (slug === "neet" || slug === "kingdom" || slug === "neet-module") {
    return {
      title: "NEET Biology Masterclass - High Yield Mock Tests & Blueprints | ZooLearn",
      description: "High-yield competitive exam preparation module for NEET aspirants with chapter-wise question banks and mock tests."
    };
  }
  return {
    title: `Module: ${slug.replace(/-/g, " ")} | ZooLearn`,
    description: "Explore interactive biology learning modules."
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { slug } = await params;

  // Render unified ClassModuleView with Class 11 JSON data
  if (slug === "11th" || slug === "living-world" || slug === "11th-module") {
    return <ClassModuleView data={class11Data as ModuleCurriculumData} />;
  }

  // Render unified ClassModuleView with Class 12 JSON data
  if (slug === "12th" || slug === "patterns" || slug === "12th-module") {
    return <ClassModuleView data={class12Data as ModuleCurriculumData} />;
  }

  // Placeholder template for 12th & NEET modules with clean modern aesthetics
  const is12th = slug === "12th" || slug === "patterns" || slug === "12th-module";
  const isNeet = slug === "neet" || slug === "kingdom" || slug === "neet-module";

  const moduleTitle = is12th 
    ? "Class 12 Biology Module" 
    : isNeet 
    ? "NEET Aspirant Masterclass" 
    : `Module: ${slug.replace(/-/g, " ")}`;

  const moduleSubtitle = is12th
    ? "Reproduction, Genetics & Evolution, Biology in Human Welfare, Biotechnology, and Ecology & Environment."
    : isNeet
    ? "Comprehensive high-yield question banks, past-year trend analysis, rapid revision cheatsheets, and timed mock tests."
    : "Interactive curriculum module.";

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh] flex flex-col items-center justify-center text-center">
      <Card className="w-full p-8 md:p-12 rounded-3xl border-border/50 bg-card/80 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            {isNeet ? (
              <Sparkle className="w-8 h-8 text-primary" weight="duotone" />
            ) : (
              <GraduationCap className="w-8 h-8 text-primary" weight="duotone" />
            )}
          </div>
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 rounded-full">
            {is12th ? "Class 12 Standard" : isNeet ? "Competitive Prep" : "Academic Track"}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            {moduleTitle}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {moduleSubtitle}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40 text-sm text-muted-foreground max-w-xl mx-auto">
          Currently viewing <strong>Class 11 Biology</strong> is fully live with all 5 Units and 22 Chapters. This module is being actively updated with interactive simulations.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/modules/11th"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-11 px-6 rounded-xl font-bold text-sm bg-slate-900 hover:bg-emerald-600 dark:bg-white dark:hover:bg-emerald-500 text-white dark:text-slate-900 transition-colors shadow-md"
            )}
          >
            <BookOpen weight="bold" className="mr-2 w-4 h-4" />
            Explore Class 11 Module (5 Units)
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 px-6 rounded-xl font-semibold text-sm hover:bg-muted"
            )}
          >
            <ArrowLeft weight="bold" className="mr-2 w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
