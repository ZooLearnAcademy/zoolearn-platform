"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Sun, 
  Moon, 
  MagnifyingGlass, 
  List, 
  X,
  House,
  TreeStructure,
  SquaresFour,
  Binoculars,
  Gear,
  CreditCard,
  SignOut,
  User,
  SignIn
} from "@phosphor-icons/react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { cloudinaryLoader } from "@/lib/cloudinary"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Learn", href: "/" },
  { label: "Taxonomy Tree", href: "/taxonomy" },
  { label: "ZooHub", href: "/zoohub" },
  { label: "Scopes", href: "/scopes" },
  { label: "Blog", href: "/blog" },
  { label: "Quiz", href: "/quiz" },
  { label: "About", href: "/about" },
]

interface UserProfile {
  full_name: string | null
  email: string | null
  avatar_url: string | null
}

function getFallbackAvatar(user: SupabaseUser | null, seed?: string): string {
  const s = seed ?? user?.email ?? user?.id ?? "guest"
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(s)}&backgroundColor=b6e3f4`
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)

  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // Prevents hydration mismatch for theme toggle & listens to Supabase auth
  useEffect(() => {
    setMounted(true)
    const supabase = getSupabaseBrowserClient()

    async function loadUser(u: SupabaseUser | null) {
      setUser(u)
      if (!u) {
        setProfile(null)
        return
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url")
        .eq("user_id", u.id)
        .single()

      if (data) {
        setProfile(data as UserProfile)
      } else {
        setProfile({
          full_name: u.user_metadata?.full_name ?? u.user_metadata?.name ?? null,
          email: u.email ?? null,
          avatar_url: u.user_metadata?.avatar_url ?? u.user_metadata?.picture ?? null,
        })
      }
    }

    supabase.auth.getUser().then(({ data }) => loadUser(data.user))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setProfileOpen(false)
    setMobileProfileOpen(false)
    router.push("/login")
    router.refresh()
  }

  const displayName = profile?.full_name ?? user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Learner"
  const displayEmail = profile?.email ?? user?.email ?? ""
  const avatarUrl = profile?.avatar_url ?? user?.user_metadata?.avatar_url ?? getFallbackAvatar(user, displayName)

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
        <div className="relative flex h-16 md:h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo & Search Section */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Image 
                loader={cloudinaryLoader}
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png" 
                alt="ZooLearn Logo" 
                width={56}
                height={56}
                priority
                className="h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Expandable Search Input */}
            <div 
              className={cn(
                "flex relative items-center rounded-full border border-border bg-muted/30 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300",
                searchFocused ? "w-40 sm:w-60 lg:w-80 border-emerald-500/50 bg-background shadow-md shadow-emerald-500/5" : "w-28 sm:w-48 lg:w-56"
              )}
            >
              <MagnifyingGlass 
                size={20} 
                className={cn("text-muted-foreground transition-colors", searchFocused && "text-emerald-500")} 
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="ml-2 w-full bg-transparent text-sm sm:text-base text-foreground placeholder-muted-foreground outline-none border-none p-0 focus:ring-0 focus:outline-none"
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

          {/* Right Section (Theme, Profile / Login) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
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

            {/* Profile Popover / Sign In */}
            {user ? (
              <div className="relative" onMouseLeave={() => setProfileOpen(false)}>
                <button 
                  onClick={() => setProfileOpen((prev) => !prev)}
                  onMouseEnter={() => setProfileOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-transparent hover:border-emerald-500 transition-all overflow-hidden shadow-sm"
                  aria-label="User profile menu"
                >
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>

                {/* Popover Menu */}
                <div 
                  className={cn(
                    "absolute right-0 top-[calc(100%+0.5rem)] w-[280px] rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl transition-all duration-300 origin-top-right overflow-hidden z-50",
                    profileOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  )}
                >
                  {/* Header */}
                  <Link 
                    href="/dashboard" 
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-4 p-5 bg-gradient-to-b from-slate-50/80 to-white/40 dark:from-slate-900/80 dark:to-[#0a0a0a]/40 border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0 border-2 border-white dark:border-slate-700 shadow-md">
                      <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{displayName}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{displayEmail}</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mt-0.5">Zoolearn Learner</span>
                    </div>
                  </Link>

                  {/* Menu Items */}
                  <div className="p-2 flex flex-col gap-1">
                    <Link 
                      href="/dashboard" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all group text-sm"
                    >
                      <SquaresFour size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 transition-colors" />
                      Dashboard & Profile
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="p-2 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30">
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-rose-600 dark:text-rose-500 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-sm"
                    >
                      <SignOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 hover:border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm transition-all shadow-xs"
              >
                <SignIn size={16} weight="bold" />
                <span>Sign In</span>
              </Link>
            )}
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

      {/* Learn Mega Menu Dropdown */}
      <div
        className={cn(
          "absolute left-0 right-0 top-16 md:top-20 border-b border-white/20 dark:border-white/10 shadow-xl bg-white/95 dark:bg-black/95 backdrop-blur-xl overflow-hidden transition-all duration-500 z-30 hidden md:block",
          activeDropdown === "Learn" ? "max-h-[600px] opacity-100 py-8" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto max-w-5xl px-8 grid grid-cols-3 gap-8">
          <Link href="/modules/11th" className="p-5 rounded-2xl bg-muted/40 hover:bg-emerald-500/10 border border-border/50 hover:border-emerald-500/30 transition-all group">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">NCERT Class 11</span>
            <h4 className="text-lg font-bold text-foreground mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Diversity & Organization</h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Living World, Animal Kingdom, and Structural Organisation in Animals.</p>
          </Link>
          <Link href="/modules/12th" className="p-5 rounded-2xl bg-muted/40 hover:bg-emerald-500/10 border border-border/50 hover:border-emerald-500/30 transition-all group">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">NCERT Class 12</span>
            <h4 className="text-lg font-bold text-foreground mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Genetics & Physiology</h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Reproduction, Genetics, Evolution, Biotechnology, and Ecology.</p>
          </Link>
          <Link href="/quiz/neet-2020" className="p-5 rounded-2xl bg-muted/40 hover:bg-emerald-500/10 border border-border/50 hover:border-emerald-500/30 transition-all group">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Exam Practice</span>
            <h4 className="text-lg font-bold text-foreground mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">NEET CBT Simulation</h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Official 90-question CBT mock test with authentic timer and instant scoring.</p>
          </Link>
        </div>
      </div>

      {/* ZooHub Mega Menu Dropdown */}
      <div
        className={cn(
          "absolute left-0 right-0 top-16 md:top-20 border-b border-white/20 dark:border-white/10 shadow-xl bg-white/95 dark:bg-black/95 backdrop-blur-xl overflow-hidden transition-all duration-500 z-30 hidden md:block",
          activeDropdown === "ZooHub" ? "max-h-[600px] opacity-100 py-10" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto max-w-5xl px-8 flex justify-center gap-24">
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

      {/* Mobile Drawer */}
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
              placeholder="Search..."
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

          {/* Mobile Auth Button */}
          {user ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3 min-w-0">
                <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm font-bold truncate">{displayName}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={handleSignOut} className="text-rose-600 text-xs">
                Sign Out
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-sm"
            >
              <SignIn size={18} />
              Sign In to ZooLearn
            </Link>
          )}
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
          { label: "Profile", action: () => (user ? setMobileProfileOpen(true) : router.push("/login")), icon: User },
        ].map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          const content = (
            <>
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
            </>
          )

          if (item.action) {
            return (
              <button 
                key={item.label}
                onClick={item.action}
                className="flex flex-col items-center justify-center w-[60px] sm:w-[72px] h-full gap-1 transition-all group"
              >
                {content}
              </button>
            )
          }

          return (
            <Link 
              key={item.href} 
              href={item.href!}
              className="flex flex-col items-center justify-center w-[60px] sm:w-[72px] h-full gap-1 transition-all group"
            >
              {content}
            </Link>
          )
        })}
      </div>
    </nav>

    {/* Mobile Profile Bottom Sheet Overlay */}
    {mobileProfileOpen && (
      <div 
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
        onClick={() => setMobileProfileOpen(false)}
      />
    )}
    
    {/* Mobile Profile Bottom Sheet */}
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#111] rounded-t-3xl shadow-2xl transition-transform duration-300 md:hidden",
        mobileProfileOpen ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto my-3" />
      
      {/* Header */}
      <div className="flex items-center gap-4 p-5 bg-gradient-to-b from-slate-50/80 to-white/40 dark:from-slate-900/80 dark:to-[#111]/40 border-b border-slate-100 dark:border-slate-800/60">
        <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0 border-2 border-white dark:border-slate-700 shadow-md">
          <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[1.1rem] font-extrabold text-slate-900 dark:text-white leading-tight truncate">{displayName}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400 truncate">{displayEmail}</span>
          <span className="text-[0.8rem] font-bold text-emerald-600 dark:text-emerald-500">Zoolearn Learner</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 flex flex-col gap-2">
        <Link href="/dashboard" onClick={() => setMobileProfileOpen(false)} className="flex items-center gap-4 w-full p-4 rounded-xl text-slate-600 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm"><SquaresFour size={20} className="text-emerald-600 dark:text-emerald-400" /></div>
          Dashboard
        </Link>
        <Link href="/dashboard" onClick={() => setMobileProfileOpen(false)} className="flex items-center gap-4 w-full p-4 rounded-xl text-slate-600 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm"><Gear size={20} className="text-emerald-600 dark:text-emerald-400" /></div>
          Account Settings
        </Link>
      </div>

      {/* Footer / Sign Out */}
      <div className="p-4 mt-2 pb-8">
        <button 
          onClick={handleSignOut} 
          className="flex items-center justify-center gap-3 w-full p-4 rounded-xl text-rose-600 dark:text-rose-500 font-bold bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
        >
          <SignOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
    </>
  )
}
