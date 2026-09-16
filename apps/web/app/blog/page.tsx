import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogIndexView } from "@/components/blog/blog-index-view";

export const metadata: Metadata = {
  title: "ZooLearn Blog: Biology & Zoology Articles | ZooLearn",
  description: "Read the latest deep-dive articles on Evolution, Zoology, Animal Behaviour, Giraffes, Meerkats, and Evolutionary History on the ZooLearn Blog.",
  keywords: ["Biology Blog", "Zoology Articles", "Evolution", "Animal Facts", "Giraffe Blog", "Meerkat Blog", "Horse Evolution"],
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <BlogIndexView />
      </main>
      <Footer />
    </div>
  );
}
