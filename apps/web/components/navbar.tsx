"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Sun, Moon, Heart, List, X,
  SquaresFour, Gear, CreditCard, SignOut, CaretRight, User
} from "@phosphor-icons/react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface NavItem { label: string; href: string }

const navItems: NavItem[] = [
  { label: "Learn", href: "/" },
  { label: "Taxonomy Tree", href: "/taxonomy" },
  { label: "ZooHub", href: "/zoohub" },
  { label: "Scopes", href: "/scopes" },
  { label: "Blog", href: "/blog" },
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
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    setMounted(true)
    const supabase = getSupabaseBrowserClient()

    async function loadUser(u: SupabaseUser | null) {
      setUser(u)
      if (!u) { setProfile(null); return }

      // Pull full profile from DB (has avatar_url from Google, full_name, etc.)
      const { data } = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url")
        .eq("user_id", u.id)
        .single()

      if (data) {
        setProfile(data as UserProfile)
      } else {
        // Fallback to auth metadata (works before trigger fires)
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
    setProfileOpen(false)
    setMobileProfileOpen(false)
    router.push("/login")
    router.refresh()
  }

  const displayName = profile?.full_name ?? user?.email?.split("@")[0] ?? "Guest"
  const displayEmail = profile?.email ?? user?.email ?? "Not signed in"
  // Use Google profile pic if available, else DiceBear fallback
  const avatarUrl = profile?.avatar_url ?? getFallbackAvatar(user)

  return (
    <>
    <header className={cn(
      "sticky top-0 z-50 w-full h-16 md:h-20",
      "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl",
      "border-b border-slate-200/60 dark:border-slate-800/40",
      "transition-all duration-300"
    )}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all">
            <span className="text-white font-black text-sm">Z</span>
          </div>
          <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
            Zoo<span className="text-emerald-500">Learn</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <div className="hidden md:block">
            {mounted && (
              <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          {/* Support */}
          <Button variant="outline" size="sm"
            className="hidden md:flex items-center gap-1.5 h-9 px-3 text-sm font-semibold border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 group"
          >
            <Heart size={16} className="text-rose-500 group-hover:scale-125 transition-all duration-300 animate-pulse" />
            Support Us
          </Button>

          {/* Profile Popover */}
          <div className="hidden md:block relative" onMouseLeave={() => setProfileOpen(false)}>
            <button onMouseEnter={() => setProfileOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-transparent hover:border-emerald-500 transition-all overflow-hidden shadow-sm bg-slate-100 dark:bg-slate-800"
            >
              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>

            <div className={cn(
              "absolute right-0 top-[calc(100%+0.5rem)] w-[290px] rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl transition-all duration-300 origin-top-right overflow-hidden",
              profileOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            )}>
              {/* Profile Header */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-b from-slate-50/80 to-white/40 dark:from-slate-900/80 dark:to-[#0a0a0a]/40 border-b border-slate-100 dark:border-slate-800/60">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white dark:border-slate-700 shadow-md bg-slate-200 dark:bg-slate-800">
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight truncate">{displayName}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{displayEmail}</span>
                </div>
              </div>

              {/* Menu */}
              <div className="p-2 flex flex-col gap-0.5">
                <Link href="/dashboard" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all group text-sm">
                  <SquaresFour size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  Dashboard
                </Link>
                <Link href="/dashboard" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all group text-sm">
                  <Gear size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  Account Settings
                </Link>
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all group text-sm">
                  <CreditCard size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  Subscription
                </button>
              </div>

              <div className="p-2 border-t border-slate-100 dark:border-slate-800/60">
                {user ? (
                  <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-rose-600 dark:text-rose-500 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-sm">
                    <SignOut size={18} />
                    Sign Out
                  </button>
                ) : (
                  <Link href="/login" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-emerald-600 dark:text-emerald-500 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors text-sm">
                    <User size={18} />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Drawer */}
    <div className={cn("fixed inset-0 z-[60] md:hidden transition-all duration-300", mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none")}>
      <div className={cn("absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity", mobileMenuOpen ? "opacity-100" : "opacity-0")}
        onClick={() => setMobileMenuOpen(false)} />
      <div className={cn("absolute right-0 top-0 h-full w-[min(320px,90vw)] bg-white dark:bg-[#0a0a0a] shadow-2xl transition-transform duration-300 overflow-y-auto", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="p-5 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/40">
          <span className="font-black text-lg text-slate-900 dark:text-white">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <X size={18} />
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
              className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/40">
          <button onClick={() => { setMobileMenuOpen(false); setMobileProfileOpen(true) }}
            className="flex items-center gap-3 w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shrink-0 bg-slate-200 dark:bg-slate-800">
              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{displayName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{displayEmail}</p>
            </div>
            <CaretRight size={16} className="text-slate-400 shrink-0" />
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Profile Sheet */}
    {mobileProfileOpen && (
      <div className="fixed inset-0 z-[65] bg-black/30 md:hidden" onClick={() => setMobileProfileOpen(false)} />
    )}
    <div className={cn("fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#111] rounded-t-3xl shadow-2xl transition-transform duration-300 md:hidden", mobileProfileOpen ? "translate-y-0" : "translate-y-full")}>
      <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto my-3" />
      <div className="flex items-center gap-4 p-5 border-b border-slate-100 dark:border-slate-800/60">
        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white dark:border-slate-700 shadow-md bg-slate-200 dark:bg-slate-800">
          <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight truncate">{displayName}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400 truncate">{displayEmail}</span>
        </div>
      </div>
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
      <div className="p-4 pb-10">
        {user ? (
          <button onClick={handleSignOut} className="flex items-center justify-center gap-3 w-full p-4 rounded-xl text-rose-600 dark:text-rose-500 font-bold bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors">
            <SignOut size={20} />
            Sign Out
          </button>
        ) : (
          <Link href="/login" onClick={() => setMobileProfileOpen(false)} className="flex items-center justify-center gap-3 w-full p-4 rounded-xl text-emerald-600 dark:text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
            <User size={20} />
            Sign In
          </Link>
        )}
      </div>
    </div>
    </>
  )
}
