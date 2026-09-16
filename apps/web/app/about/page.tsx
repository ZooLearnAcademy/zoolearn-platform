import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AboutView } from "@/components/about/about-view";

export const metadata: Metadata = {
  title: "About Us | ZooLearn",
  description: "Learn about ZooLearn, our mission, future roadmap, achievements, and the dedicated team building the modern educational platform for Zoology and Biology.",
  keywords: ["About ZooLearn", "Biology Education Team", "Zoology Platform", "ZooLearn Mission"],
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <AboutView />
      </main>
      <Footer />
    </div>
  );
}
