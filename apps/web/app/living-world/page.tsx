import React from "react";
import { Metadata } from "next";
import { TheLivingWorldPageView } from "@/components/the-living-world/the-living-world-page-view";

export const metadata: Metadata = {
  title: "The Living World — Class 11 Biology Chapter 1 | ZooLearn",
  description: "Comprehensive NCERT notes and visual guide for The Living World: Identification, Binomial Nomenclature, Taxonomic Hierarchy, and Taxonomical Aids."
};

export default function LivingWorldPage() {
  return <TheLivingWorldPageView />;
}
