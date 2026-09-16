import type { Metadata } from "next";
import { AnimaliaFlow } from "@/components/taxonomy/AnimaliaFlow";
import { getTaxonomyTree } from "@/lib/data/taxonomy";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Interactive Taxonomy Tree | ZooLearn",
  description:
    "Explore the animal kingdom visually with our Interactive Taxonomy Tree. Discover classifications from Kingdom down to Species.",
  keywords: [
    "Taxonomy Tree",
    "Animal Classification",
    "Biology Tree",
    "Zoology Classification",
    "Kingdom Animalia",
    "Phylum",
    "Species",
  ],
  alternates: {
    canonical: "/taxonomy",
  },
  openGraph: {
    title: "Interactive Taxonomy Tree | ZooLearn",
    description:
      "Interactive classification tree for Kingdom Animalia. Explore phyla, classes, and species visually.",
    url: "https://zoolearn.in/taxonomy",
    type: "website",
  },
};

export default async function TaxonomyPage() {
  const treeData = await getTaxonomyTree();

  if (!treeData) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-[#0d1117] text-white p-6">
        <div className="text-center max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">
            Unable to Load Taxonomy Data
          </h1>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            The taxonomy data file could not be loaded. Please ensure the data file exists and refresh the page.
          </p>
          <a
            href="/taxonomy"
            className="inline-flex items-center px-5 py-2.5 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] relative bg-[#0d1117]">
      <AnimaliaFlow treeData={treeData} />
    </div>
  );
}
