import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GiraffeBlogView } from "@/components/blog/giraffe/giraffe-blog-view";

export const metadata: Metadata = {
  title: "World Giraffe Day: The Tallest Story Ever Told | ZooLearn",
  description: "Explore 24 million years of giraffe evolution, the science behind the iconic neck, the 2025 IUCN 4-species reclassification, and conservation efforts.",
  keywords: ["Giraffe Evolution", "World Giraffe Day", "Giraffe Taxonomy", "Giraffe Neck Science", "IUCN Giraffe", "Giraffa camelopardalis"],
};

export default function GiraffeBlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <GiraffeBlogView />
      </main>
      <Footer />
    </div>
  );
}
