import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { ZooHubManager } from "@/components/admin/ZooHubManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ZooHub Manager — ZooLearn Admin",
};

export default async function AdminZooHubPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: phyla }, { data: classes }, { data: species }] = await Promise.all([
    supabase.from("phyla").select("*").order("sort_order", { ascending: true }),
    supabase.from("classes").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("species")
      .select("slug, name, scientific_name, phylum_slug, class_slug, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Page header bar */}
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Live Database
            </span>
          </div>
          <h1 className="text-lg font-black text-white">ZooHub Catalog Manager</h1>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-2">
          {[
            { label: "Phyla", count: phyla?.length ?? 0, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
            { label: "Classes", count: classes?.length ?? 0, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
            { label: "Species", count: species?.length ?? 0, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
          ].map((s) => (
            <div
              key={s.label}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold ${s.color}`}
            >
              {s.count.toLocaleString()} {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* 3-column manager — fills remaining height */}
      <ZooHubManager
        phyla={phyla ?? []}
        classes={classes ?? []}
        species={species ?? []}
      />
    </div>
  );
}
