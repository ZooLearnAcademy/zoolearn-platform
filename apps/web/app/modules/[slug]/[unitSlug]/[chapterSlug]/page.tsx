import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TheLivingWorldPageView } from "@/components/the-living-world/the-living-world-page-view";
import { StructuralOrganisationPageView } from "@/components/structural-organisation/structural-organisation-page-view";

interface PageProps {
  params: Promise<{ slug: string; unitSlug: string; chapterSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { chapterSlug } = await params;

  if (chapterSlug === "the-living-world" || chapterSlug === "living-world") {
    return {
      title: "The Living World — Class 11 Biology Chapter 1 | ZooLearn",
      description: "Explore the diversity of living organisms, taxonomy, systematics, binomial nomenclature rules, taxonomic hierarchy, and taxonomical aids."
    };
  }

  if (
    chapterSlug === "structural-organisation-in-animals" ||
    chapterSlug === "structural-organisation"
  ) {
    return {
      title: "Structural Organisation in Animals — Class 11 Biology Chapter 7 | ZooLearn",
      description: "Comprehensive NCERT notes and visual guide for animal tissues: Epithelial, Connective, Muscular, and Neural tissues."
    };
  }

  return {
    title: "Chapter | ZooLearn"
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { chapterSlug } = await params;

  if (chapterSlug === "the-living-world" || chapterSlug === "living-world") {
    return <TheLivingWorldPageView hideNavbar />;
  }

  if (
    chapterSlug === "structural-organisation-in-animals" ||
    chapterSlug === "structural-organisation"
  ) {
    return <StructuralOrganisationPageView hideNavbar />;
  }

  // Fallback if other chapter isn't created yet
  notFound();
}

