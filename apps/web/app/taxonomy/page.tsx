import type { Metadata } from "next";
import { AnimaliaFlow } from "@/components/taxonomy/AnimaliaFlow";
import { getTaxonomyTreeFull } from "@/lib/supabase/zoohub";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Interactive Taxonomy Tree | ZooLearn",
  description:
    "Explore the animal kingdom visually with our Interactive Taxonomy Tree. Discover classifications from Phylum to Species.",
  keywords: [
    "Taxonomy Tree",
    "Animal Classification",
    "Biology Tree",
    "Zoology Classification",
    "Phylum",
    "Species",
  ],
  alternates: {
    canonical: "/taxonomy",
  },
  openGraph: {
    title: "Interactive Taxonomy Tree | ZooLearn",
    description:
      "Interactive classification tree for the Kingdom Animalia. Explore phylums, classes, and species visually.",
    url: "https://zoolearn.in/taxonomy",
    type: "website",
  },
};

export default async function TaxonomyPage() {
  let animaliaTree;
  let error = false;

  try {
    animaliaTree = await getTaxonomyTreeFull();
  } catch (err) {
    console.error("[taxonomy] Failed to load taxonomy tree:", err);
    error = true;
  }

  if (error || !animaliaTree) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#080c14]">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Unable to Load Taxonomy Tree
          </h1>
          <p className="text-slate-400 mb-6">
            There was an error connecting to the database. Please try refreshing the page.
          </p>
          <a
            href="/taxonomy"
            className="inline-flex items-center px-5 py-2.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition-colors"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-4rem)] relative overflow-hidden bg-[#080c14]">
      <AnimaliaFlow treeData={animaliaTree} />
    </div>
  );
}
