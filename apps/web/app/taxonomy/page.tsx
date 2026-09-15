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
      <div className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Unable to Load Taxonomy Tree
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
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
    <div className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col items-center">
      <div className="w-full max-w-4xl text-center py-8">
        <h1 className="text-4xl md:text-5xl font-black text-[#0a192f] dark:text-white tracking-tighter mb-4">
          Taxonomy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Tree</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Interactive classification of Kingdom Animalia. Explore the hierarchical relationships between different phyla and classes.
        </p>
      </div>
      
      <div className="w-full flex-1 min-h-[600px] border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 relative">
        <AnimaliaFlow treeData={animaliaTree} />
      </div>
    </div>
  );
}
