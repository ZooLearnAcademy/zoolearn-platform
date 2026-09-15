import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { TaxonomyTreeManager } from "@/components/admin/TaxonomyTreeManager";
import { Leaf } from "@phosphor-icons/react/dist/ssr";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Taxonomy Tree — ZooLearn Admin",
};

export default async function AdminTaxonomyPage() {
  const supabase = await createSupabaseServerClient();

  const { data: nodes } = await supabase
    .from("taxonomy_nodes")
    .select("*")
    .order("sort_order", { ascending: true });

  const activeNodesCount = nodes?.filter(n => n.is_active).length || 0;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Page header bar */}
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between shrink-0 bg-[#0a0a10]">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Live Database
            </span>
          </div>
          <h1 className="text-lg font-black text-white flex items-center gap-2">
            <Leaf size={24} className="text-emerald-500" />
            Biological Taxonomy Tree
          </h1>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
            {nodes?.length || 0} Total Nodes
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold text-blue-400 bg-blue-500/10 border-blue-500/20">
            {activeNodesCount} Active
          </div>
        </div>
      </div>

      {/* Main interactive Tree UI */}
      <TaxonomyTreeManager initialNodes={nodes || []} />
    </div>
  );
}
