import { ScopeManager } from "@/components/admin/ScopeManager";
import { getAllScopeCategories, getAllScopeCareers } from "@/lib/supabase/scope-admin";

export const dynamic = "force-dynamic";

export default async function AdminScopePage() {
  const [categories, careers] = await Promise.all([
    getAllScopeCategories(),
    getAllScopeCareers(),
  ]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs text-violet-400 font-medium uppercase tracking-widest">Live Database</span>
        </div>
        <h1 className="text-2xl font-black text-white mb-1">Career Scopes Manager</h1>
        <p className="text-slate-400 text-sm">
          Manage career categories and individual careers. Changes appear instantly on the /scopes page.
        </p>

        {/* Quick counts */}
        <div className="flex flex-wrap gap-3 mt-4">
          {[
            { label: "Categories", value: categories.length, color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
            { label: "Careers", value: careers.length, color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
            { label: "Active Careers", value: careers.filter(c => c.is_active).length, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
            { label: "Top Choices", value: careers.filter(c => c.is_top_choice).length, color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
          ].map((s) => (
            <div
              key={s.label}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-bold ${s.color}`}
            >
              {s.value.toLocaleString()} {s.label}
            </div>
          ))}
        </div>
      </div>

      <ScopeManager categories={categories} careers={careers} />
    </div>
  );
}
