"use client"

import React from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ConceptualLearning } from "@/components/conceptual-learning"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Premium Floating Navbar */}
      <Navbar />
      <Hero />
      <ConceptualLearning />
    </div>
  )
}

