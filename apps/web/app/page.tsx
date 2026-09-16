import React from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { LearningModules } from "@/components/learning-modules"
import { DeepDive } from "@/components/deep-dive"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Premium Floating Navbar */}
      <Navbar />
      <Hero />
      <LearningModules />
      <DeepDive />
      <Footer />
    </div>
  )
}

