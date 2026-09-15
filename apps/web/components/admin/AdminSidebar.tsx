"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChartBar,
  Tree,
  Compass,
  SignOut,
  ShieldCheck,
  X,
  List,
  SquaresFour,
  Globe,
  Bug,
  Question,
} from "@phosphor-icons/react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { cn } from "@workspace/ui/lib/utils";

const navItems = [
  { label: "Dashboard",     href: "/admin",           icon: SquaresFour, exact: true },
  { label: "Analytics",     href: "/admin/analytics", icon: ChartBar,    exact: false },
  {
    label: "ZooHub",
    href: "/admin/zoohub",
    icon: Bug,
    exact: false,
    group: "Content",
  },
  {
    label: "Taxonomy Tree",
    href: "/admin/taxonomy",
    icon: Tree,
    exact: false,
    group: "Content",
  },
  {
    label: "Career Scopes",
    href: "/admin/scope",
    icon: Compass,
    exact: false,
    group: "Content",
  },
  {
    label: "Quiz Engine",
    href: "/admin/quiz",
    icon: Question,
    exact: false,
    group: "Content",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck size={18} weight="fill" className="text-white" />
          </div>
          <div>
            <div className="text-white font-black text-sm leading-tight">ZooLearn</div>
            <div className="text-emerald-400 text-xs font-semibold">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {/* Top items (no group) */}
        {navItems.filter(i => !i.group).map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon
                size={17}
                weight={active ? "fill" : "regular"}
                className={active ? "text-emerald-400" : ""}
              />
              {item.label}
            </Link>
          );
        })}

        {/* Content group */}
        <div className="pt-4 pb-1 px-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
            Content
          </span>
        </div>
        {navItems.filter(i => i.group === "Content").map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon
                size={17}
                weight={active ? "fill" : "regular"}
                className={active ? "text-emerald-400" : ""}
              />
              {item.label}
            </Link>
          );
        })}

        {/* Divider + Public site link */}
        <div className="pt-4">
          <Link
            href="/"
            target="_blank"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-300 hover:bg-white/5 transition-all"
          >
            <Globe size={17} />
            View Public Site
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/8">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <SignOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 min-h-screen bg-[#0c0c12] border-r border-white/8 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#0c0c12] border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
      >
        <List size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-56 bg-[#0c0c12] border-r border-white/10 h-full">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
