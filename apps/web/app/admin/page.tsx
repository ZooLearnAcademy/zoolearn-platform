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
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto min-h-full space-y-12">
      
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1017] to-[#080b10] border border-white/5 p-8 md:p-12 shadow-2xl">
        {/* Abstract background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em]">Live Database Connection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Control Center</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
              Welcome to the ZooLearn platform management suite. All data shown here is fetched live from Supabase.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="px-5 py-3 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-3 w-full sm:w-auto shadow-inner">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <ShieldCheck size={20} className="text-emerald-400" weight="fill" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Session Status</div>
                <div className="text-sm text-emerald-400 font-bold">Verified Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Platform Overview (Stats Grid) ─── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <ChartBar size={20} className="text-slate-400" weight="duotone" />
          <h2 className="text-sm text-slate-300 font-bold uppercase tracking-widest">
            Platform Overview
          </h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statCards.map((s, i) => (
            <div
              key={s.label}
              className={`group relative overflow-hidden rounded-3xl p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50`}
            >
              {/* Subtle gradient hover background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-current to-transparent ${s.color}`} />
              
              <div className="relative flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg}`}>
                  <s.icon size={24} className={s.color} weight="duotone" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white tracking-tight mb-1">
                    {s.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                    {s.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Management Sections ─── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Database size={20} className="text-slate-400" weight="duotone" />
          <h2 className="text-sm text-slate-300 font-bold uppercase tracking-widest">
            Management Sections
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {sections.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex flex-col h-full bg-[#0f131a] rounded-[2rem] p-7 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 border border-white/5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Animated Border Glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                <div className={`absolute inset-[-1px] rounded-[2rem] bg-gradient-to-br ${s.gradient} -z-10`} />
              </div>
              
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center shadow-inner`}>
                  <s.icon size={28} className={s.iconColor} weight="duotone" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
              
              <div className="flex-1 relative z-10">
                <h2 className="text-xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                  {s.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  {s.description}
                </p>
              </div>
              
              <div className="mt-auto relative z-10">
                <span className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl ${s.badgeColor} border border-current/10 shadow-sm`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {s.badge}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Quick Links ─── */}
      <div className="pt-4 pb-8">
        <h2 className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 pl-1">
          Public Page Previews
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "ZooHub", href: "/zoohub", icon: Globe },
            { label: "Taxonomy", href: "/taxonomy", icon: Tree },
            { label: "Scopes", href: "/scopes", icon: Compass },
            { label: "Public Home", href: "/", icon: Eye },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              className="group flex items-center gap-3 px-5 py-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 shadow-sm"
            >
              <link.icon size={18} className="text-slate-400 group-hover:text-white transition-colors" weight="duotone" />
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
