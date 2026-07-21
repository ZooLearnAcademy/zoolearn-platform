"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { 
  Sun, 
  Moon, 
  MagnifyingGlass, 
  Heart, 
  List, 
  X,
  House,
  TreeStructure,
  SquaresFour,
  Binoculars
} from "@phosphor-icons/react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Taxonomy Tree", href: "/taxonomy" },
  { label: "ZooHub", href: "/zoohub" },
  { label: "Scopes", href: "/scopes" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

export function Navbar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Prevents hydration mismatch for theme toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
    <header 
      className="sticky top-0 z-50 w-full"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Main glass container */}
      <div 
        className={cn(
          "w-full border-b border-white/20 dark:border-white/10 shadow-sm transition-all duration-300",
          "bg-white/70 dark:bg-black/70 backdrop-blur-md",
          "hover:shadow-emerald-500/5 hover:border-emerald-500/20"
        )}
      >
        <div className="relative flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo & Search Section */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png" 
                alt="ZooLearn Logo" 
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Expandable Search Input */}
            <div 
              className={cn(
                "hidden lg:flex relative items-center rounded-full border border-border bg-muted/30 px-4 py-2 transition-all duration-300",
                searchFocused ? "w-80 border-emerald-500/50 bg-background shadow-md shadow-emerald-500/5" : "w-56"
              )}
            >
              <MagnifyingGlass 
                size={20} 
                className={cn("text-muted-foreground transition-colors", searchFocused && "text-emerald-500")} 
              />
              <input
                type="text"
                placeholder="Search taxonomy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="ml-2 w-full bg-transparent text-base text-foreground placeholder-muted-foreground outline-none border-none p-0 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Center Links (Hidden on Mobile) */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                    isActive 
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Section (Theme, Support) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted/50 transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} className="text-amber-500" />
                ) : (
                  <Moon size={18} className="text-slate-700" />
                )}
              </button>
            )}

            {/* Premium Support Button */}
            <Button
              className={cn(
                "rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm shadow-emerald-500/20",
                "px-5 py-2 flex items-center gap-2 group"
              )}
            >
              <Heart 
                weight="fill" 
                size={16} 
                className="text-white group-hover:scale-125 group-hover:text-rose-200 transition-all duration-300 animate-pulse" 
              />
              Support Us
            </Button>
          </div>

          {/* Mobile Menu & Theme Toggle Actions */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted/50 transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-slate-700" />
                )}
              </button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted/50 transition-colors"
              aria-label="Open main menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* ZooHub Mega Menu Dropdown */}
      <div
        className={cn(
          "absolute left-0 right-0 top-20 border-b border-white/20 dark:border-white/10 shadow-xl bg-white/95 dark:bg-black/95 backdrop-blur-xl overflow-hidden transition-all duration-500 z-30 hidden md:block",
          activeDropdown === "ZooHub" ? "max-h-[600px] opacity-100 py-10" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto max-w-5xl px-8 flex justify-center gap-24">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Lower Invertebrates</h3>
            <ul className="flex flex-col gap-3">
              {["Porifera", "Coelenterata", "Ctenophora", "Platyhelminthes", "Aschelminthes"].map(phylum => (
                <li key={phylum}>
                  <Link href={`/zoohub/${phylum.toLowerCase()}`} className="text-base font-bold text-foreground/90 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {phylum}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Higher Invertebrates</h3>
            <ul className="flex flex-col gap-3 mt-1">
              {["Annelida", "Arthropoda", "Mollusca", "Echinodermata", "Hemichordata"].map(phylum => (
                <li key={phylum}>
                  <Link href={`/zoohub/${phylum.toLowerCase()}`} className="text-base font-bold text-foreground/90 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {phylum}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Vertebrates</h3>
            <ul className="flex flex-col gap-3 mt-1">
              {["Chordata"].map(phylum => (
                <li key={phylum}>
                  <Link href={`/zoohub/${phylum.toLowerCase()}`} className="text-base font-bold text-foreground/90 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {phylum}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Smooth slide down) */}
      <div
        className={cn(
          "absolute left-0 right-0 top-20 border-b border-white/20 dark:border-white/10 shadow-xl bg-white/95 dark:bg-black/95 backdrop-blur-lg overflow-hidden transition-all duration-300 z-40 md:hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100 py-4 border-t border-emerald-500/20" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-3 px-4">
          {/* Mobile Search */}
          <div className="relative flex items-center rounded-full border border-border bg-muted/40 px-3 py-2">
            <MagnifyingGlass size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search taxonomy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 w-full bg-transparent text-sm text-foreground outline-none"
            />
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                    isActive 
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <hr className="border-border/60 my-1" />

          {/* Mobile Support Button */}
          <Button
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Heart weight="fill" size={16} className="text-rose-200 animate-pulse" />
            Support Us
          </Button>
        </div>
      </div>
    </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 dark:bg-black/95 backdrop-blur-xl border-t border-border/50 pb-2 pt-1">
        <div className="flex items-center justify-around h-[64px] px-2">
          {[
            { label: "Home", href: "/", icon: House },
            { label: "Taxonomy", href: "/taxonomy", icon: TreeStructure },
            { label: "ZooHub", href: "/zoohub", icon: SquaresFour },
            { label: "Scopes", href: "/scopes", icon: Binoculars },
          ].map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="flex flex-col items-center justify-center w-[72px] h-full gap-1 transition-all group"
              >
                <div className={cn(
                  "flex items-center justify-center rounded-2xl p-1.5 transition-all duration-300",
                  isActive ? "bg-emerald-500/15" : "bg-transparent group-hover:bg-muted/50"
                )}>
                  <Icon 
                    size={26} 
                    weight={isActive ? "fill" : "regular"} 
                    className={cn(
                      "transition-colors duration-300",
                      isActive ? "text-emerald-500" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                </div>
                <span className={cn(
                  "text-[10px] font-medium transition-colors duration-300",
                  isActive ? "text-emerald-500 font-bold" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
