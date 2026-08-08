import React from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ConceptualLearning } from "@/components/conceptual-learning"
import { Footer } from "@/components/footer"
import { DeepDive } from "@/components/deep-dive"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Premium Floating Navbar */}
      <Navbar />
      <Hero />
      <ConceptualLearning />
      <DeepDive />
      <Footer />
    </div>
  )
}

