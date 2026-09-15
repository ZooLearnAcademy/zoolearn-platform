"use client";

import { useState, useTransition } from "react";
import {
  Plus, PencilSimple, Trash, X, Check, Warning,
  SpinnerGap, Eye, EyeSlash, Compass,
} from "@phosphor-icons/react";
import type { ScopeCategory, ScopeCareer } from "@/lib/supabase/scope-admin";

type Tab = "categories" | "careers";

interface ScopeManagerProps {
  categories: ScopeCategory[];
  careers: ScopeCareer[];
}

export function ScopeManager({ categories, careers }: ScopeManagerProps) {
  const [tab, setTab] = useState<Tab>("categories");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Category form state
  const [catForm, setCatForm] = useState<Partial<ScopeCategory> | null>(null);
  // Career form state
  const [carForm, setCarForm] = useState<Partial<ScopeCareer> | null>(null);

  const showFeedback = (type: "success" | "error", msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 3000);
  };

  const callApi = async (method: string, body: object) => {
    const res = await fetch("/api/admin/scope", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Operation failed");
    return result;
  };

  const handleSaveCategory = () => {
    if (!catForm?.id || !catForm.name) return;
    startTransition(async () => {
      try {
        await callApi("POST", { action: "upsert-category", data: catForm });
        showFeedback("success", "Category saved.");
        setCatForm(null);
        window.location.reload();
      } catch (err: any) {
        showFeedback("error", err.message);
      }
    });
  };

  const handleSaveCareer = () => {
    if (!carForm?.id || !carForm.title) return;
    startTransition(async () => {
      try {
        await callApi("POST", { action: "upsert-career", data: carForm });
        showFeedback("success", "Career saved.");
        setCarForm(null);
        window.location.reload();
      } catch (err: any) {
        showFeedback("error", err.message);
      }
    });
  };

  const handleToggle = (id: string, type: "category" | "career", current: boolean) => {
    startTransition(async () => {
      try {
        await callApi("PATCH", { action: `toggle-${type}`, id, is_active: !current });
        window.location.reload();
      } catch (err: any) {
        showFeedback("error", err.message);
      }
    });
  };

  const handleDelete = (id: string, type: "category" | "career") => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    setDeleteConfirm(null);
    startTransition(async () => {
      try {
        await callApi("DELETE", { action: `delete-${type}`, id });
        showFeedback("success", "Deleted.");
        window.location.reload();
      } catch (err: any) {
        showFeedback("error", err.message);
      }
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Scope Management</h1>
          <p className="text-slate-400 text-sm">
            Control career categories and career items on the public Scope page.
          </p>
        </div>
        <button
          onClick={() =>
            tab === "categories"
              ? setCatForm({ id: `cat-${Date.now()}`, sort_order: categories.length, is_active: true })
              : setCarForm({ id: `car-${Date.now()}`, sort_order: careers.length, is_active: true, bsc: [], msc: [], phd: [], top_sectors: [], key_skills: [] })
          }
          className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-xl text-sm transition-all"
        >
          <Plus size={16} />
          Add {tab === "categories" ? "Category" : "Career"}
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-6 text-sm ${
          feedback.type === "success"
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
            : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {feedback.type === "success" ? <Check size={16} weight="bold" /> : <Warning size={16} weight="fill" />}
          {feedback.msg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{categories.length}</div>
          <div className="text-xs text-slate-400 mt-1">Scope Categories</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{careers.length}</div>
          <div className="text-xs text-slate-400 mt-1">Career Items</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 mb-6 w-fit">
        {(["categories", "careers"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              tab === t
                ? "bg-violet-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Categories Tab */}
      {tab === "categories" && (
        <div className="space-y-3">
          {categories.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No scope categories yet. Run the migration script or add manually.
            </div>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className={`bg-white/5 border rounded-xl p-4 flex items-center gap-4 ${
                  cat.is_active ? "border-white/10" : "border-white/5 opacity-50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{cat.name}</span>
                    {cat.short_name && (
                      <span className="text-xs text-slate-500">({cat.short_name})</span>
                    )}
                    {!cat.is_active && (
                      <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Inactive</span>
                    )}
                  </div>
                  {cat.description && (
                    <div className="text-xs text-slate-500 mt-1 truncate">{cat.description}</div>
                  )}
                  {cat.salary_range && (
                    <div className="text-xs text-violet-400 mt-1">Salary: {cat.salary_range}</div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs text-slate-600 mr-2">#{cat.sort_order}</span>
                  <button
                    onClick={() => handleToggle(cat.id, "category", cat.is_active)}
                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
                    title={cat.is_active ? "Deactivate" : "Activate"}
                  >
                    {cat.is_active ? <Eye size={14} /> : <EyeSlash size={14} />}
                  </button>
                  <button
                    onClick={() => setCatForm({ ...cat })}
                    className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                  >
                    <PencilSimple size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, "category")}
                    className={`p-1.5 rounded-lg transition-all ${
                      deleteConfirm === cat.id
                        ? "text-red-400 bg-red-500/20"
                        : "text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                    }`}
                    title={deleteConfirm === cat.id ? "Click again to confirm" : "Delete"}
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Careers Tab */}
      {tab === "careers" && (
        <div className="space-y-2">
          {careers.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No careers found. Run the migration script or add manually.
            </div>
          ) : (
            careers.map((car) => {
              const cat = categories.find((c) => c.id === car.category_id);
              return (
                <div
                  key={car.id}
                  className={`bg-white/5 border rounded-xl p-4 flex items-center gap-4 ${
                    car.is_active ? "border-white/10" : "border-white/5 opacity-50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-white text-sm">{car.title}</span>
                      {car.badge && (
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{car.badge}</span>
                      )}
                      {car.is_top_choice && (
                        <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">⭐ Top</span>
                      )}
                      {!car.is_active && (
                        <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Inactive</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      {cat && <span className="text-xs text-violet-400">{cat.name}</span>}
                      {car.salary && <span className="text-xs text-slate-500">{car.salary}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleToggle(car.id, "career", car.is_active)}
                      className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      {car.is_active ? <Eye size={14} /> : <EyeSlash size={14} />}
                    </button>
                    <button
                      onClick={() => setCarForm({ ...car })}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                    >
                      <PencilSimple size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(car.id, "career")}
                      className={`p-1.5 rounded-lg transition-all ${
                        deleteConfirm === car.id
                          ? "text-red-400 bg-red-500/20"
                          : "text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                      }`}
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Category Form Modal */}
      {catForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#111118] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">
                {categories.find((c) => c.id === catForm.id) ? "Edit Category" : "Add Category"}
              </h3>
              <button onClick={() => setCatForm(null)} className="text-slate-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { key: "id", label: "ID (unique key)", placeholder: "e.g. wildlife" },
                { key: "name", label: "Name *", placeholder: "e.g. Wildlife Biology" },
                { key: "short_name", label: "Short Name", placeholder: "e.g. Wildlife" },
                { key: "description", label: "Description", placeholder: "Brief description" },
                { key: "icon_name", label: "Icon Name", placeholder: "e.g. Tree" },
                { key: "salary_range", label: "Salary Range", placeholder: "e.g. ₹3L – ₹25L" },
                { key: "gradient", label: "Gradient (CSS)", placeholder: "e.g. from-green-500 to-teal-500" },
                { key: "color", label: "Color", placeholder: "e.g. #10b981" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-slate-400 mb-1.5 block">{label}</label>
                  <input
                    value={(catForm as any)[key] || ""}
                    onChange={(e) => setCatForm({ ...catForm, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-all"
                    placeholder={placeholder}
                    disabled={key === "id" && !!categories.find((c) => c.id === catForm.id)}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Sort Order</label>
                <input
                  type="number"
                  value={catForm.sort_order ?? 0}
                  onChange={(e) => setCatForm({ ...catForm, sort_order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="cat-active"
                  checked={catForm.is_active ?? true}
                  onChange={(e) => setCatForm({ ...catForm, is_active: e.target.checked })}
                  className="w-4 h-4 accent-violet-500"
                />
                <label htmlFor="cat-active" className="text-sm text-slate-300">Active (visible on public site)</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setCatForm(null)} className="flex-1 py-2.5 border border-white/10 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={isPending || !catForm.id || !catForm.name}
                className="flex-1 py-2.5 bg-violet-500 hover:bg-violet-400 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isPending ? <SpinnerGap size={16} className="animate-spin" /> : <Check size={16} weight="bold" />}
                {isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Career Form Modal */}
      {carForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#111118] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">
                {careers.find((c) => c.id === carForm.id) ? "Edit Career" : "Add Career"}
              </h3>
              <button onClick={() => setCarForm(null)} className="text-slate-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { key: "id", label: "ID (unique key)", placeholder: "e.g. wildlife-biologist" },
                { key: "title", label: "Title *", placeholder: "e.g. Wildlife Biologist" },
                { key: "description", label: "Description", placeholder: "Brief description" },
                { key: "badge", label: "Badge", placeholder: "e.g. High Demand" },
                { key: "secondary_badge", label: "Secondary Badge", placeholder: "Optional" },
                { key: "salary", label: "Salary Range", placeholder: "e.g. ₹4L – ₹20L" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-slate-400 mb-1.5 block">{label}</label>
                  <input
                    value={(carForm as any)[key] || ""}
                    onChange={(e) => setCarForm({ ...carForm, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/50 transition-all"
                    placeholder={placeholder}
                    disabled={key === "id" && !!careers.find((c) => c.id === carForm.id)}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Category</label>
                <select
                  value={carForm.category_id || ""}
                  onChange={(e) => setCarForm({ ...carForm, category_id: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0d0d14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                >
                  <option value="">No category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Sort Order</label>
                <input
                  type="number"
                  value={carForm.sort_order ?? 0}
                  onChange={(e) => setCarForm({ ...carForm, sort_order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="car-top"
                  checked={carForm.is_top_choice ?? false}
                  onChange={(e) => setCarForm({ ...carForm, is_top_choice: e.target.checked })}
                  className="w-4 h-4 accent-violet-500"
                />
                <label htmlFor="car-top" className="text-sm text-slate-300">Top Choice</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="car-active"
                  checked={carForm.is_active ?? true}
                  onChange={(e) => setCarForm({ ...carForm, is_active: e.target.checked })}
                  className="w-4 h-4 accent-violet-500"
                />
                <label htmlFor="car-active" className="text-sm text-slate-300">Active (visible on public site)</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setCarForm(null)} className="flex-1 py-2.5 border border-white/10 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSaveCareer}
                disabled={isPending || !carForm.id || !carForm.title}
                className="flex-1 py-2.5 bg-violet-500 hover:bg-violet-400 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {isPending ? <SpinnerGap size={16} className="animate-spin" /> : <Check size={16} weight="bold" />}
                {isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
