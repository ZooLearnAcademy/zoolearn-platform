import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConceptualLearningView } from "@/components/conceptual-learning";

export const metadata: Metadata = {
  title: "Conceptual Learning Hub | ZooLearn",
  description:
    "Explore interactive biology modules and concept deep-dives. Master zoology through visual taxonomy, structured learning paths, NCERT chapters, and organism case studies.",
  keywords: [
    "Biology Concepts",
    "NCERT Biology",
    "Zoology Learning",
    "The Living World",
    "Structural Organisation",
    "NEET Biology",
    "ZooLearn",
  ],
  openGraph: {
    title: "Conceptual Learning Hub | ZooLearn",
    description:
      "Interactive biological modules and concept deep-dives for students and NEET aspirants.",
    type: "website",
  },
};

export default function ConceptualLearningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ConceptualLearningView />
      <Footer />
    </div>
  );
}
