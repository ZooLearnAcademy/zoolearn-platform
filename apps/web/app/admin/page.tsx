import Link from "next/link";
import {
  ChartBar,
  Tree,
  Compass,
  ArrowRight,
  Users,
  Globe,
  Leaf,
  Bug,
  Database,
  ShieldCheck,
  ArrowUp,
  Eye,
  Question,
} from "@phosphor-icons/react/dist/ssr";
import { createAdminClient } from "@/lib/supabase/admin-client";

export const dynamic = "force-dynamic";

async function getDashboardStats() {
  const admin = createAdminClient();

  const [
    { count: totalUsers },
    { count: totalSpecies },
    { count: totalPhyla },
    { count: taxonomyNodes },
    { count: scopeCategories },
    { count: scopeCareers },
    { count: totalQuizzes },
    { count: publishedQuizzes },
    { data: authData },
  ] = await Promise.all([
    admin.from("profiles").select("*", { count: "exact", head: true }),
    admin.from("species").select("*", { count: "exact", head: true }),
    admin.from("phyla").select("*", { count: "exact", head: true }),
    admin.from("taxonomy_nodes").select("*", { count: "exact", head: true }),
    admin.from("scope_categories").select("*", { count: "exact", head: true }),
    admin.from("scope_careers").select("*", { count: "exact", head: true }),
    admin.from("quizzes").select("*", { count: "exact", head: true }),
    admin.from("quizzes").select("*", { count: "exact", head: true }).eq("status", "published"),
    admin.auth.admin.listUsers({ perPage: 1000 }),
  ]);

  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const users = authData?.users ?? [];
  const activeToday = users.filter(
    (u) => u.last_sign_in_at && new Date(u.last_sign_in_at) >= todayStart
  ).length;
  const newThisMonth = users.filter(
    (u) => u.created_at && new Date(u.created_at) >= monthStart
  ).length;

  return {
    totalUsers: totalUsers ?? 0,
    totalSpecies: totalSpecies ?? 0,
    totalPhyla: totalPhyla ?? 0,
    taxonomyNodes: taxonomyNodes ?? 0,
    scopeCategories: scopeCategories ?? 0,
    scopeCareers: scopeCareers ?? 0,
    totalQuizzes: totalQuizzes ?? 0,
    publishedQuizzes: publishedQuizzes ?? 0,
    activeToday,
    newThisMonth,
  };
}

export default async function AdminDashboardPage() {
  let stats = {
    totalUsers: 0, totalSpecies: 0, totalPhyla: 0,
    taxonomyNodes: 0, scopeCategories: 0, scopeCareers: 0,
    totalQuizzes: 0, publishedQuizzes: 0,
    activeToday: 0, newThisMonth: 0,
  };

  try { stats = await getDashboardStats(); } catch { /* no-op */ }

  const statCards = [
    { label: "Registered Users", value: stats.totalUsers, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Active Today", value: stats.activeToday, icon: Eye, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "New This Month", value: stats.newThisMonth, icon: ArrowUp, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "Species in ZooHub", value: stats.totalSpecies, icon: Bug, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { label: "Phyla", value: stats.totalPhyla, icon: Leaf, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
    { label: "Taxonomy Nodes", value: stats.taxonomyNodes, icon: Tree, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    { label: "Career Scopes", value: stats.scopeCategories, icon: Compass, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
    { label: "Career Items", value: stats.scopeCareers, icon: Database, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  ];

  const sections = [
    {
      href: "/admin/analytics",
      icon: ChartBar,
      title: "Analytics",
      description: "User statistics, growth charts, demographics by class, gender, institution and location.",
      gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
      border: "border-blue-500/20 hover:border-blue-400/40",
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
      badge: `${stats.totalUsers} users`,
      badgeColor: "bg-blue-500/15 text-blue-400",
    },
    {
      href: "/admin/taxonomy",
      icon: Tree,
      title: "Taxonomy Tree",
      description: "Manage phyla, classes, and species for ZooHub. Changes go live instantly.",
      gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
      border: "border-emerald-500/20 hover:border-emerald-400/40",
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
      badge: `${stats.totalSpecies} species`,
      badgeColor: "bg-emerald-500/15 text-emerald-400",
    },
    {
      href: "/admin/scope",
      icon: Compass,
      title: "Career Scopes",
      description: "Manage all career categories and individual career items shown on the Scopes page.",
      gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
      border: "border-violet-500/20 hover:border-violet-400/40",
      iconBg: "bg-violet-500/15",
      iconColor: "text-violet-400",
      badge: `${stats.scopeCareers} careers`,
      badgeColor: "bg-violet-500/15 text-violet-400",
    },
    {
      href: "/admin/quiz",
      icon: Question,
      title: "Quiz Engine",
      description: "Create dynamic quizzes and embed them anywhere with a single component.",
      gradient: "from-purple-600/20 via-fuchsia-600/10 to-transparent",
      border: "border-purple-500/20 hover:border-purple-400/40",
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-400",
      badge: `${stats.publishedQuizzes} published`,
      badgeColor: "bg-purple-500/15 text-purple-400",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium uppercase tracking-widest">Live</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-1">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm">ZooLearn platform control centre — all data is live from Supabase.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <ShieldCheck size={16} className="text-emerald-400" weight="fill" />
          <span className="text-emerald-400 text-sm font-semibold">Admin Access</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">
          Platform Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statCards.map((s) => (
            <div
              key={s.label}
              className={`border rounded-2xl p-4 ${s.bg} flex flex-col gap-2`}
            >
              <s.icon size={20} className={s.color} weight="duotone" />
              <div className="text-2xl font-black text-white">
                {s.value.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">
          Management Sections
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group bg-gradient-to-br ${s.gradient} border ${s.border} rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                  <s.icon size={22} className={s.iconColor} weight="duotone" />
                </div>
                <ArrowRight
                  size={18}
                  className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{s.description}</p>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.badgeColor}`}>
                {s.badge}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">
          Quick Links — Public Pages
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "ZooHub", href: "/zoohub", icon: Globe, desc: `${stats.totalSpecies} species` },
            { label: "Taxonomy", href: "/taxonomy", icon: Tree, desc: `${stats.taxonomyNodes} nodes` },
            { label: "Scopes", href: "/scopes", icon: Compass, desc: `${stats.scopeCategories} domains` },
            { label: "Home", href: "/", icon: Eye, desc: "Public landing" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              className="group flex items-center gap-3 p-4 bg-white/5 border border-white/8 rounded-xl hover:bg-white/10 hover:border-white/15 transition-all"
            >
              <link.icon size={18} className="text-slate-400 group-hover:text-white transition-colors" weight="duotone" />
              <div>
                <div className="text-sm font-semibold text-white">{link.label}</div>
                <div className="text-xs text-slate-500">{link.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
