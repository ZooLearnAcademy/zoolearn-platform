import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MeerkatBlogView } from "@/components/blog/meerkat/meerkat-blog-view";

export const metadata: Metadata = {
  title: "World Meerkat Day: The Social Sentinels of the Desert | ZooLearn",
  description: "Discover the fascinating social structures, survival adaptations, and complex communication of meerkats in the Kalahari Desert on the ZooLearn Blog.",
  keywords: ["World Meerkat Day", "Meerkat Behavior", "Social Sentinels", "Herpestidae", "Suricata suricatta", "Desert Mammals"],
};

export default function MeerkatBlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <MeerkatBlogView />
      </main>
      <Footer />
    </div>
  );
}
