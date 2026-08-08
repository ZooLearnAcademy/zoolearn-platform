
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { UnitDetailView } from "@/components/modules/unit-detail-view";
import type { ModuleCurriculumData } from "@/components/modules/class-module-view";
import class11Data from "@/data/class11-modules.json";
import class12Data from "@/data/class12-modules.json";

interface PageProps {
  params: Promise<{ slug: string; unitSlug: string }>;
}

function getGradeData(slug: string): ModuleCurriculumData | null {
  if (slug === "11th" || slug === "living-world" || slug === "11th-module") {
    return class11Data as ModuleCurriculumData;
  }
  if (slug === "12th" || slug === "patterns" || slug === "12th-module") {
    return class12Data as ModuleCurriculumData;
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, unitSlug } = await params;
  const gradeData = getGradeData(slug);
  if (!gradeData) {
    return { title: "Unit Not Found | ZooLearn" };
  }

  const unit = gradeData.units.find(
    (u) => u.id === unitSlug || u.route.endsWith(`/${unitSlug}`)
  );

  if (!unit) {
    return { title: "Unit Not Found | ZooLearn" };
  }

  return {
    title: `${unit.unitNumber}: ${unit.title} - ${gradeData.gradeTitle} | ZooLearn`,
    description: `${unit.description} Master all ${unit.chapters.length} chapters with NEET exam blueprints.`
  };
}

export default async function UnitPage({ params }: PageProps) {
  const { slug, unitSlug } = await params;
  const gradeData = getGradeData(slug);

  if (!gradeData) {
    notFound();
  }

  const unit = gradeData.units.find(
    (u) => u.id === unitSlug || u.route.endsWith(`/${unitSlug}`)
  );

  if (!unit) {
    notFound();
  }

  return <UnitDetailView gradeData={gradeData} unit={unit} />;
}
