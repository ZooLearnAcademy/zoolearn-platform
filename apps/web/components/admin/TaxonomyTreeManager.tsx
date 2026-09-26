"use client";

import { useState, useTransition, useMemo, useCallback, useEffect } from "react";
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
  MagnifyingGlass,
  Eye,
  EyeSlash,
  Warning,
  CheckCircle,
  XCircle,
  ArrowLeft,
  FolderOpen,
} from "@phosphor-icons/react";

export interface TaxonomyNode {
  id: string;
  label: string;
  rank: string;
  common_name: string | null;
  description?: string | null;
  profile?: any | null;
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

const RANK_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Kingdom: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", dot: "bg-amber-400" },
  Phylum: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" },
  Class: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", dot: "bg-blue-400" },
  "Sub-Class": { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", dot: "bg-cyan-400" },
  Order: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", dot: "bg-violet-400" },
  Family: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20", dot: "bg-pink-400" },
  Genus: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", dot: "bg-orange-400" },
  Species: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", dot: "bg-rose-400" },
};

function getRankColor(rank: string) {
  return RANK_COLORS[rank] ?? RANK_COLORS["Kingdom"]!;
}

export function TaxonomyTreeManager({
  initialNodes,
}: {
  initialNodes: TaxonomyNode[];
}) {
  const router = useRouter();
  const [nodes, setNodes] = useState<TaxonomyNode[]>(initialNodes);
  const [currentPath, setCurrentPath] = useState<TaxonomyNode[]>([]);
  const [isPending, startTransition] = useTransition();

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Drawer state
  const [drawerMode, setDrawerMode] = useState<"add" | "edit" | null>(null);
  const [drawerTarget, setDrawerTarget] = useState<TaxonomyNode | null>(null);
  const [form, setForm] = useState({
    label: "",
    common_name: "",
    description: "",
    image_url: "",
    model_3d: "",
    introduction: "",
    size_structure: "",
    ecology: "",
    economy: "",
    sort_order: "0",
    is_active: true,
  });

  // Delete state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteStage, setDeleteStage] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Auto-dismiss delete confirm after 5s
  useEffect(() => {
    if (deleteConfirmId) {
      const timer = setTimeout(() => setDeleteConfirmId(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [deleteConfirmId]);

  const currentParentId = currentPath.length > 0 ? currentPath[currentPath.length - 1]!.id : null;
  const currentRankIndex = currentPath.length;
  const nextRank = RANKS[Math.min(currentRankIndex, RANKS.length - 1)] ?? "Species";

  // Count all descendants recursively
  const getDescendantCount = useCallback((nodeId: string): number => {
    const directChildren = nodes.filter((n) => n.parent_id === nodeId);
    return directChildren.reduce((sum, child) => sum + 1 + getDescendantCount(child.id), 0);
  }, [nodes]);

  const currentChildren = useMemo(() => {
    let children = nodes
      .filter((n) => n.parent_id === currentParentId)
      .sort((a, b) => a.sort_order - b.sort_order || a.label.localeCompare(b.label));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      children = children.filter(
        (n) =>
          n.label.toLowerCase().includes(q) ||
          (n.common_name ?? "").toLowerCase().includes(q) ||
          n.id.toLowerCase().includes(q)
      );
    }

    return children;
  }, [nodes, currentParentId, searchQuery]);

  const totalAtLevel = nodes.filter((n) => n.parent_id === currentParentId).length;
  const activeAtLevel = nodes.filter((n) => n.parent_id === currentParentId && n.is_active).length;

  const openAdd = () => {
    setDrawerMode("add");
    setDrawerTarget(null);
    setForm({
      label: "",
      common_name: "",
      description: "",
      image_url: "",
      model_3d: "",
      introduction: "",
      size_structure: "",
      ecology: "",
      economy: "",
      sort_order: String(totalAtLevel),
      is_active: true,
    });
    setDeleteStage(false);
  };

  const openEdit = (node: TaxonomyNode) => {
    setDrawerMode("edit");
    setDrawerTarget(node);
    setForm({
      label: node.label,
      common_name: node.common_name || "",
      description: node.description || "",
      image_url: node.profile?.image || "",
      model_3d: node.profile?.["3d"] || "",
      introduction: node.profile?.introduction?.join("\n") || "",
      size_structure: node.profile?.sizeStructure?.join("\n") || "",
      ecology: node.profile?.ecology?.join("\n") || "",
      economy: node.profile?.economy?.join("\n") || "",
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
    const profileObj = nextRank === "Species" || (drawerMode === "edit" && drawerTarget?.rank === "Species") ? {
      image: form.image_url,
      "3d": form.model_3d,
      introduction: form.introduction.split("\n").filter(Boolean),
      sizeStructure: form.size_structure.split("\n").filter(Boolean),
      ecology: form.ecology.split("\n").filter(Boolean),
      economy: form.economy.split("\n").filter(Boolean),
    } : null;

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
            description: form.description,
            profile: profileObj,
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
            description: form.description || null,
            profile: profileObj,
            parent_id: currentParentId,
            sort_order: parseInt(form.sort_order),
            is_active: form.is_active,
          };
          setNodes((prev) => [...prev, newNode]);
          showToast("success", `${rank} "${form.label}" created`);
        } else {
          setNodes((prev) =>
            prev.map((n) =>
              n.id === id
                ? {
                    ...n,
                    label: form.label,
                    common_name: form.common_name || null,
                    description: form.description || null,
                    profile: profileObj,
                    sort_order: parseInt(form.sort_order),
                    is_active: form.is_active,
                  }
                : n
            )
          );
          showToast("success", `"${form.label}" updated`);
        }

        closeDrawer();
        router.refresh();
      } catch (err: any) {
        showToast("error", err.message);
      }
    });
  };

  const performDelete = (nodeId: string, nodeLabel: string) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/taxonomy", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: nodeId }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Delete failed");

        // Remove the node and ALL its descendants from local state
        const idsToRemove = new Set<string>();
        const collectIds = (parentId: string) => {
          idsToRemove.add(parentId);
          nodes.filter((n) => n.parent_id === parentId).forEach((n) => collectIds(n.id));
        };
        collectIds(nodeId);

        setNodes((prev) => prev.filter((n) => !idsToRemove.has(n.id)));
        setDeleteConfirmId(null);
        showToast("success", `"${nodeLabel}" deleted`);
        closeDrawer();
        router.refresh();
      } catch (err: any) {
        showToast("error", err.message);
        setDeleteStage(false);
        setDeleteConfirmId(null);
      }
    });
  };

  const handleDrawerDelete = () => {
    if (!deleteStage) {
      setDeleteStage(true);
      return;
    }
    performDelete(drawerTarget!.id, drawerTarget!.label);
  };

  const handleInlineDelete = (node: TaxonomyNode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deleteConfirmId === node.id) {
      performDelete(node.id, node.label);
    } else {
      setDeleteConfirmId(node.id);
    }
  };

  const rankColor = getRankColor(nextRank);

  return (
    <div className="flex flex-col h-full bg-[#0a0a10]">
      {/* Breadcrumb Trail */}
      <div className="px-6 py-3 flex items-center gap-1 border-b border-white/8 shrink-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button
          onClick={() => { setCurrentPath([]); setSearchQuery(""); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            currentPath.length === 0
              ? "bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.08)]"
              : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
          }`}
        >
          <House size={15} weight={currentPath.length === 0 ? "fill" : "regular"} />
          Root
        </button>

        {currentPath.map((node, i) => {
          const isLast = i === currentPath.length - 1;
          const rc = getRankColor(node.rank);
          return (
            <div key={node.id} className="flex items-center gap-1">
              <CaretRight size={12} className="text-slate-700" />
              <button
                onClick={() => { setCurrentPath(currentPath.slice(0, i + 1)); setSearchQuery(""); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isLast
                    ? `${rc.bg} ${rc.text} shadow-[0_0_10px_rgba(16,185,129,0.08)]`
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${rc.dot} ${isLast ? "animate-pulse" : "opacity-50"}`} />
                <span className="text-[10px] opacity-60 uppercase tracking-wider font-bold mr-0.5">
                  {node.rank}
                </span>
                {node.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* Toolbar: Search + Stats + Add + Back */}
      <div className="px-6 py-4 flex items-center gap-3 shrink-0">
        {currentPath.length > 0 && (
          <button
            onClick={() => { setCurrentPath(currentPath.slice(0, -1)); setSearchQuery(""); }}
            className="flex items-center gap-1.5 px-3 py-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 rounded-xl text-sm font-medium transition-all"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        )}

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-white truncate">
            {currentPath.length > 0
              ? currentPath[currentPath.length - 1]!.label
              : "Root Taxonomy Nodes"}
          </h2>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-slate-500">
              {totalAtLevel} {nextRank}{totalAtLevel !== 1 ? "s" : ""}
            </span>
            <span className="text-xs text-emerald-500/60">
              {activeAtLevel} active
            </span>
            {totalAtLevel - activeAtLevel > 0 && (
              <span className="text-xs text-amber-500/60">
                {totalAtLevel - activeAtLevel} hidden
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder={`Search ${nextRank}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 pl-8 pr-3 py-2 text-sm bg-white/5 border border-white/8 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.07] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <button
          onClick={openAdd}
          className={`flex items-center gap-2 ${rankColor.bg} hover:brightness-125 ${rankColor.text} border ${rankColor.border} px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]`}
        >
          <Plus size={14} weight="bold" />
          Add {nextRank}
        </button>
      </div>

      {/* Children Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="max-w-6xl mx-auto w-full">
          {currentChildren.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-8">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-5">
                {searchQuery ? (
                  <MagnifyingGlass size={28} className="text-slate-700" />
                ) : (
                  <TreeStructure size={28} className="text-slate-700" />
                )}
              </div>
              {searchQuery ? (
                <>
                  <p className="text-slate-400 mb-1 text-sm">No results for &quot;{searchQuery}&quot;</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors mt-2"
                  >
                    Clear search
                  </button>
                </>
              ) : (
                <>
                  <p className="text-slate-400 mb-1 text-sm">
                    No {nextRank}s in this branch yet
                  </p>
                  <p className="text-slate-600 text-xs mb-4">
                    Click the button below to add the first one
                  </p>
                  <button
                    onClick={openAdd}
                    className={`flex items-center gap-2 ${rankColor.bg} ${rankColor.text} border ${rankColor.border} px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-125`}
                  >
                    <Plus size={14} weight="bold" />
                    Create first {nextRank}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentChildren.map((child) => {
                const numChildren = nodes.filter((n) => n.parent_id === child.id).length;
                const totalDescendants = getDescendantCount(child.id);
                const rc = getRankColor(child.rank);
                const isDeletePending = deleteConfirmId === child.id;

                return (
                  <div
                    key={child.id}
                    onClick={() => {
                      if (!isDeletePending) {
                        setCurrentPath([...currentPath, child]);
                        setSearchQuery("");
                      }
                    }}
                    className={`group relative flex flex-col p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                      isDeletePending
                        ? "bg-red-500/[0.06] border-red-500/25 ring-1 ring-red-500/20"
                        : child.is_active
                        ? "bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-emerald-500/30"
                        : "bg-white/[0.01] border-white/[0.03] opacity-60 hover:opacity-80"
                    }`}
                  >
                    {/* Inactive badge */}
                    {!child.is_active && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/15 text-[10px] font-bold text-amber-400/80">
                        <EyeSlash size={10} />
                        Hidden
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md ${rc.bg} ${rc.text} text-[10px] font-black uppercase tracking-wider mb-2`}>
                          <div className={`w-1 h-1 rounded-full ${rc.dot}`} />
                          {child.rank}
                        </div>

                        <h3 className="text-base font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">
                          {child.label}
                        </h3>
                        {child.common_name && (
                          <p className="text-xs text-slate-500 italic mt-0.5 truncate">
                            &quot;{child.common_name}&quot;
                          </p>
                        )}
                        {child.description && (
                          <p className="text-xs text-slate-500/80 mt-1 line-clamp-2">
                            {child.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer: Counts + Actions */}
                    <div className="mt-auto pt-3 flex items-center justify-between border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-600 group-hover:text-slate-400 transition-colors">
                          <FolderOpen size={12} />
                          {numChildren} direct
                        </span>
                        {totalDescendants > numChildren && (
                          <span className="text-xs text-slate-700">
                            ({totalDescendants} total)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(child);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                          title="Edit"
                        >
                          <PencilSimple size={14} />
                        </button>
                        <button
                          onClick={(e) => handleInlineDelete(child, e)}
                          className={`p-1.5 rounded-lg transition-all ${
                            isDeletePending
                              ? "text-red-400 bg-red-500/20 animate-pulse"
                              : "text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                          }`}
                          title={isDeletePending ? "Click again to confirm" : "Delete"}
                        >
                          <Trash size={14} />
                        </button>
                        <CaretRight size={14} className="text-slate-700 group-hover:text-emerald-500 transition-colors ml-1" />
                      </div>
                    </div>

                    {/* Delete confirmation bar */}
                    {isDeletePending && (
                      <div className="mt-2 -mx-1 px-3 py-2 bg-red-500/10 border border-red-500/15 rounded-xl flex items-center gap-2">
                        <Warning size={14} className="text-red-400 shrink-0" />
                        <span className="text-xs text-red-400/90 flex-1">
                          {totalDescendants > 0
                            ? `Will also delete ${totalDescendants} sub-node${totalDescendants > 1 ? "s" : ""}! `
                            : "Delete this node? "}
                          Click the trash icon again.
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(null);
                          }}
                          className="text-xs text-slate-500 hover:text-slate-300 font-medium px-2 py-0.5 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ─── Drawer ─── */}
      {drawerMode && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={closeDrawer} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-sm flex flex-col bg-[#0f0f1a] border-l border-white/10 shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${rankColor.text}`}>
                  {drawerMode === "add" ? `New ${nextRank}` : `Edit ${drawerTarget?.rank}`}
                </span>
                <h2 className="text-base font-bold text-white mt-1">
                  {drawerMode === "add"
                    ? `Add to ${currentPath.length > 0 ? currentPath[currentPath.length - 1]!.label : "Root"}`
                    : drawerTarget?.label}
                </h2>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Scientific Label *
                </label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="e.g., Chordata"
                  autoFocus
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Common Name
                </label>
                <input
                  type="text"
                  value={form.common_name}
                  onChange={(e) => setForm({ ...form, common_name: e.target.value })}
                  placeholder="e.g., Vertebrates (Optional)"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g., A brief description of this node (Optional)"
                  rows={3}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                />
              </div>

              {(nextRank === "Species" || drawerTarget?.rank === "Species") && (
                <div className="pt-4 border-t border-white/5 space-y-5">
                  <h4 className="text-sm font-bold text-emerald-400">Species Profile Details</h4>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={form.image_url}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      placeholder="e.g., https://example.com/image.jpg"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      3D Model URL
                    </label>
                    <input
                      type="text"
                      value={form.model_3d}
                      onChange={(e) => setForm({ ...form, model_3d: e.target.value })}
                      placeholder="e.g., https://example.com/model.glb"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Introduction (One bullet per line)
                    </label>
                    <textarea
                      value={form.introduction}
                      onChange={(e) => setForm({ ...form, introduction: e.target.value })}
                      placeholder="Line 1\nLine 2"
                      rows={3}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Size & Structure (One bullet per line)
                    </label>
                    <textarea
                      value={form.size_structure}
                      onChange={(e) => setForm({ ...form, size_structure: e.target.value })}
                      placeholder="Line 1\nLine 2"
                      rows={3}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Ecology (One bullet per line)
                    </label>
                    <textarea
                      value={form.ecology}
                      onChange={(e) => setForm({ ...form, ecology: e.target.value })}
                      placeholder="Line 1\nLine 2"
                      rows={3}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Economic Importance (One bullet per line)
                    </label>
                    <textarea
                      value={form.economy}
                      onChange={(e) => setForm({ ...form, economy: e.target.value })}
                      placeholder="Line 1\nLine 2"
                      rows={3}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Visibility
                  </label>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_active: !form.is_active })}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
                      form.is_active
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}
                  >
                    {form.is_active ? (
                      <><Eye size={16} /> Visible</>
                    ) : (
                      <><EyeSlash size={16} /> Hidden</>
                    )}
                  </button>
                </div>
              </div>

              {/* Preview ID for new nodes */}
              {drawerMode === "add" && form.label && (
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    Generated ID
                  </span>
                  <p className="text-xs text-slate-400 font-mono mt-1 break-all">
                    {generateId(form.label, currentParentId)}
                  </p>
                </div>
              )}

              {/* Edit-mode metadata */}
              {drawerMode === "edit" && drawerTarget && (
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      Node ID
                    </span>
                    <p className="text-xs text-slate-400 font-mono mt-0.5 break-all">
                      {drawerTarget.id}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      Rank
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">{drawerTarget.rank}</p>
                  </div>
                  {(() => {
                    const desc = getDescendantCount(drawerTarget.id);
                    if (desc > 0)
                      return (
                        <div className="flex items-center gap-2 pt-1">
                          <TreeStructure size={12} className="text-slate-600" />
                          <span className="text-xs text-slate-500">
                            {desc} descendant node{desc > 1 ? "s" : ""}
                          </span>
                        </div>
                      );
                    return null;
                  })()}
                </div>
              )}
            </div>

            {/* Drawer footer */}
            <div className="p-6 border-t border-white/8 bg-black/20 flex flex-col gap-3">
              <button
                onClick={handleSave}
                disabled={isPending || !form.label.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Spinner className="animate-spin" size={16} />
                ) : drawerMode === "add" ? (
                  <><Plus size={14} weight="bold" /> Create {nextRank}</>
                ) : (
                  <><CheckCircle size={14} weight="fill" /> Save Changes</>
                )}
              </button>

              {drawerMode === "edit" && (
                <button
                  onClick={handleDrawerDelete}
                  disabled={isPending}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all border flex items-center justify-center gap-2 ${
                    deleteStage
                      ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 animate-pulse"
                      : "bg-transparent text-slate-500 border-white/5 hover:border-red-500/30 hover:text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  <Trash size={14} />
                  {deleteStage ? (
                    <>
                      Confirm Delete
                      {(() => {
                        const desc = getDescendantCount(drawerTarget!.id);
                        return desc > 0 ? ` (+ ${desc} sub-nodes)` : "";
                      })()}
                    </>
                  ) : (
                    "Delete Node"
                  )}
                </button>
              )}
            </div>
          </aside>
        </>
      )}

      {/* ─── Toast ─── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3.5 rounded-xl border shadow-2xl text-sm font-bold flex items-center gap-2.5 z-[60] animate-toast-in ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400"
              : "bg-red-950/90 border-red-500/30 text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={16} weight="fill" />
          ) : (
            <XCircle size={16} weight="fill" />
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}