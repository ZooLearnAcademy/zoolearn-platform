import React from "react";
import { Metadata } from "next";
import { StructuralOrganisationPageView } from "@/components/structural-organisation/structural-organisation-page-view";

export const metadata: Metadata = {
  title: "Structural Organisation in Animals — Class 11 Biology Chapter 7 | ZooLearn",
  description: "Comprehensive NCERT notes and interactive visual guide for Structural Organisation in Animals: Epithelial, Connective, Muscular, and Neural Tissues."
};

export default function StructuralOrganisationPage() {
  return <StructuralOrganisationPageView />;
}
