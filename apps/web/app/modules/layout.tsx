import React from "react"
import { Navbar } from "@/components/navbar"

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-16">
        {children}
      </main>
    </div>
  )
}
