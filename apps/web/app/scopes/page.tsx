import React, { Suspense } from "react";
import { Metadata } from "next";
import { ScopesView } from "@/components/scopes/scopes-view";

export const metadata: Metadata = {
  title: "Career Scopes & Pathways | ZooLearn Life Sciences Directory",
  description:
    "Explore 100+ high-yield career pathways in Zoology, Wildlife Conservation, Medical Biotechnology, Marine Biology, Forensics, and IFS Civil Services.",
  keywords: [
    "Zoology Careers",
    "Life Science Scopes",
    "Wildlife Biologist",
    "IFS Forest Service",
    "Biotechnology Careers",
    "B.Sc Zoology Scope",
    "M.Sc Zoology Scope",
    "ZooLearn",
  ],
  openGraph: {
    title: "Career Scopes & Pathways | ZooLearn",
    description:
      "Explore 100+ verified career options in Zoology, Life Sciences, and Biotechnology with detailed academic roadmaps.",
    type: "website",
  },
};

export default function ScopesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <ScopesView />
    </Suspense>
  );
}

