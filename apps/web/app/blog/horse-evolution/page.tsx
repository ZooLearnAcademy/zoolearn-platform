import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HorseEvolutionBlogView } from "@/components/blog/horse/horse-blog-view";

export const metadata: Metadata = {
  title: "Evolution of the Horse: 55-Million-Year Journey | ZooLearn",
  description: "Explore how climate shifts transformed Eohippus from a small forest dweller to the modern, single-toed Equus in our interactive horse evolution blog.",
  keywords: ["Horse Evolution", "Eohippus", "Equidae", "Equus", "Hoof Evolution", "Tooth Adaptation", "Fossils"],
};

export default function HorseEvolutionBlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HorseEvolutionBlogView />
      </main>
      <Footer />
    </div>
  );
}
