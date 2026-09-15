"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  TreeStructure,
  Plus,
  PencilSimple,
  Trash,
  CaretRight,
  House,
  X,
  Spinner,
} from "@phosphor-icons/react";

export interface TaxonomyNode {
  id: string;
  label: string;
  rank: string;
  common_name: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
}

const RANKS = [
  "Kingdom",
  "Phylum",
  "Class",
  "Sub-Class",
  "Order",
  "Family",
  "Genus",
  "Species",
];

export function TaxonomyTreeManager({
  initialNodes,
}: {
  initialNodes: TaxonomyNode[];
}) {
  const router = useRouter();
  const [nodes, setNodes] = useState<TaxonomyNode[]>(initialNodes);
  const [currentPath, setCurrentPath] = useState<TaxonomyNode[]>([]);
  const [isPending, startTransition] = useTransition();

  // Drawer state
  const [drawerMode, setDrawerMode] = useState<"add" | "edit" | null>(null);
  const [drawerTarget, setDrawerTarget] = useState<TaxonomyNode | null>(null);
  const [form, setForm] = useState({
    label: "",
    common_name: "",
    sort_order: "0",
    is_active: true,
  });

  const [deleteStage, setDeleteStage] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const currentParentId = currentPath.length > 0 ? currentPath[currentPath.length - 1]!.id : null;
  const currentRankIndex = currentPath.length;
  const nextRank = RANKS[Math.min(currentRankIndex, RANKS.length - 1)] ?? "species";

  const currentChildren = useMemo(() => {
    return nodes
      .filter((n) => n.parent_id === currentParentId)
      .sort((a, b) => a.sort_order - b.sort_order || a.label.localeCompare(b.label));
  }, [nodes, currentParentId]);

  const openAdd = () => {
    setDrawerMode("add");
    setDrawerTarget(null);
    setForm({ label: "", common_name: "", sort_order: "0", is_active: true });
    setDeleteStage(false);
  };

  const openEdit = (node: TaxonomyNode) => {
    setDrawerMode("edit");
    setDrawerTarget(node);
    setForm({
      label: node.label,
      common_name: node.common_name || "",
      sort_order: String(node.sort_order),
      is_active: node.is_active,
    });
    setDeleteStage(false);
  };

  const closeDrawer = () => {
    setDrawerMode(null);
    setDrawerTarget(null);
    setDeleteStage(false);
  };

  const generateId = (label: string, parentId: string | null) => {
    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return parentId ? `${parentId}_${slug}` : slug;
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        const id = drawerMode === "add" ? generateId(form.label, currentParentId) : drawerTarget!.id;
        const rank: string = drawerMode === "add" ? nextRank : drawerTarget!.rank;

        const res = await fetch("/api/admin/taxonomy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: drawerMode,
            id,
            label: form.label,
            rank,
            common_name: form.common_name,
            parent_id: currentParentId,
            sort_order: form.sort_order,
            is_active: form.is_active,
          }),
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to save");

        if (drawerMode === "add") {
          const newNode: TaxonomyNode = {
            id,
            label: form.label,
            rank,
            common_name: form.common_name || null,
            parent_id: currentParentId,
            sort_order: parseInt(form.sort_order),
            is_active: form.is_active,
          };
          setNodes((prev) => [...prev, newNode]);
          showToast("success", `Added ${form.label}`);
        } else {
          setNodes((prev) =>
            prev.map((n) =>
              n.id === id
                ? {
                    ...n,
                    label: form.label,
                    common_name: form.common_name || null,
                    sort_order: parseInt(form.sort_order),
                    is_active: form.is_active,
                  }
                : n
            )
          );
          showToast("success", `Updated ${form.label}`);
        }

        closeDrawer();
        router.refresh();
      } catch (err: any) {
        showToast("error", err.message);
      }
    });
  };

  const handleDelete = () => {
    if (!deleteStage) {
      setDeleteStage(true);
      return;
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/taxonomy", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: drawerTarget!.id }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Delete failed");

        setNodes((prev) => prev.filter((n) => n.id !== drawerTarget!.id));
        showToast("success", "Deleted successfully");
        closeDrawer();
        router.refresh();
      } catch (err: any) {
        showToast("error", err.message);
        setDeleteStage(false);
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a10]">
      {/* Breadcrumb Trail */}
      <div className="px-6 py-4 flex items-center gap-2 border-b border-white/8 shrink-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button
          onClick={() => setCurrentPath([])}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            currentPath.length === 0
              ? "bg-emerald-500/10 text-emerald-400"
              : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
          }`}
        >
          <House size={16} />
          Root
        </button>

        {currentPath.map((node, i) => {
          const isActive = i === currentPath.length - 1;
          return (
            <div key={node.id} className="flex items-center gap-2">
              <CaretRight size={14} className="text-slate-700" />
              <button
                onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                }`}
              >
                <span className="text-[10px] text-slate-600 uppercase tracking-wider mr-1.5 font-bold">
                  {node.rank}
                </span>
                {node.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* Children List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                {currentPath.length > 0
                  ? `Sub-Nodes of ${currentPath[currentPath.length - 1]!.label}`
                  : "Root Taxonomy Nodes"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Currently managing <strong>{nextRank}s</strong>
              </p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <Plus size={16} weight="bold" />
              Add {nextRank}
            </button>
          </div>

          {currentChildren.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-2xl">
              <TreeStructure size={48} className="text-slate-700 mb-4" />
              <p className="text-slate-400 mb-4">No {nextRank}s found in this branch.</p>
              <button
                onClick={openAdd}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
              >
                + Create the first {nextRank}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentChildren.map((child) => {
                const numChildren = nodes.filter((n) => n.parent_id === child.id).length;
                return (
                  <div
                    key={child.id}
                    onClick={() => setCurrentPath([...currentPath, child])}
                    className="group relative flex flex-col p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-emerald-500/30 rounded-2xl cursor-pointer transition-all overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-[10px] font-black text-emerald-500/70 uppercase tracking-wider mb-1">
                          {child.rank}
                        </div>
                        <h3 className="text-base font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                          {child.label}
                        </h3>
                        {child.common_name && (
                          <p className="text-xs text-slate-500 italic mt-0.5">
                            "{child.common_name}"
                          </p>
                        )}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(child);
                        }}
                        className="p-2 -mt-2 -mr-2 text-slate-600 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <PencilSimple size={16} />
                      </button>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                      <span className="text-xs font-medium text-slate-600 group-hover:text-slate-400 transition-colors">
                        {numChildren} sub-nodes
                      </span>
                      <CaretRight size={14} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      {drawerMode && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={closeDrawer} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-sm flex flex-col bg-[#0f0f1a] border-l border-white/10 shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  {drawerMode === "add" ? `New ${nextRank}` : `Edit ${drawerTarget?.rank}`}
                </span>
                <h2 className="text-base font-bold text-white mt-1">
                  {drawerMode === "add" ? `Add to ${currentPath.length > 0 ? currentPath[currentPath.length-1]!.label : 'Root'}` : drawerTarget?.label}
                </h2>
              </div>
              <button onClick={closeDrawer} className="p-2 text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Scientific Label *</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="e.g., Chordata"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Common Name</label>
                <input
                  type="text"
                  value={form.common_name}
                  onChange={(e) => setForm({ ...form, common_name: e.target.value })}
                  placeholder="e.g., Vertebrates (Optional)"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/8 bg-black/20 flex flex-col gap-3">
              <button
                onClick={handleSave}
                disabled={isPending || !form.label}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50"
              >
                {isPending ? <Spinner className="animate-spin" /> : drawerMode === "add" ? "Create Node" : "Save Changes"}
              </button>

              {drawerMode === "edit" && (
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all border ${
                    deleteStage
                      ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                      : "bg-transparent text-slate-500 border-white/5 hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  {deleteStage ? "Are you sure? Click again to delete." : "Delete Node"}
                </button>
              )}
            </div>
          </aside>
        </>
      )}

      {/* Toasts */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl border shadow-2xl text-sm font-bold flex items-center gap-2 animate-toast-in z-50 ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400"
              : "bg-red-950/90 border-red-500/30 text-red-400"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
