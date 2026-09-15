"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  PencilSimple,
  Trash,
  X,
  Check,
  Warning,
  SpinnerGap,
  MagnifyingGlass,
  Leaf,
  Bug,
  Tree,
  CaretRight,
} from "@phosphor-icons/react";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface Phylum {
  slug: string;
  name: string;
  subtitle?: string | null;
  sort_order: number;
}

interface TaxClass {
  slug: string;
  class_name: string;
  phylum_slug: string;
  sort_order: number;
}

interface Species {
  slug: string;
  name: string;
  scientific_name?: string | null;
  phylum_slug: string;
  class_slug?: string | null;
  sort_order: number;
}

type DrawerMode =
  | "add-phylum"
  | "add-class"
  | "add-species"
  | "edit-phylum"
  | "edit-class"
  | "edit-species"
  | null;

interface FormState {
  name: string;
  slug: string;
  subtitle: string;
  scientific_name: string;
  phylum_slug: string;
  class_slug: string;
  sort_order: string;
}

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const BLANK_FORM: FormState = {
  name: "",
  slug: "",
  subtitle: "",
  scientific_name: "",
  phylum_slug: "",
  class_slug: "",
  sort_order: "0",
};

// ——— Main Component ——————————————————————————————————————————————————————————

export function ZooHubManager({
  phyla: initialPhyla,
  classes: initialClasses,
  species: initialSpecies,
}: {
  phyla: Phylum[];
  classes: TaxClass[];
  species: Species[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Optimistic local data
  const [phyla, setPhyla] = useState<Phylum[]>(initialPhyla);
  const [classes, setClasses] = useState<TaxClass[]>(initialClasses);
  const [species, setSpecies] = useState<Species[]>(initialSpecies);

  // Selection (master-detail navigation)
  const [selectedPhylum, setSelectedPhylum] = useState<Phylum | null>(null);
  const [selectedClass, setSelectedClass] = useState<TaxClass | null>(null);

  // Search
  const [phylumSearch, setPhylumSearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [speciesSearch, setSpeciesSearch] = useState("");

  // Drawer
  const [drawerMode, setDrawerMode] = useState<DrawerMode>(null);
  const [drawerTarget, setDrawerTarget] = useState<any>(null);
  const [form, setForm] = useState<FormState>(BLANK_FORM);
  const [slugManual, setSlugManual] = useState(false);
  const [deleteStage, setDeleteStage] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // â”€â”€ Derived counts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const classCount = (phylumSlug: string) =>
    classes.filter((c) => c.phylum_slug === phylumSlug).length;
  const speciesCountForPhylum = (phylumSlug: string) =>
    species.filter((s) => s.phylum_slug === phylumSlug).length;
  const speciesCountForClass = (classSlug: string) =>
    species.filter((s) => s.class_slug === classSlug).length;

  // â”€â”€ Filtered lists â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const filteredPhyla = phyla.filter((p) =>
    p.name.toLowerCase().includes(phylumSearch.toLowerCase())
  );
  const filteredClasses = selectedPhylum
    ? classes
        .filter((c) => c.phylum_slug === selectedPhylum.slug)
        .filter((c) =>
          c.class_name.toLowerCase().includes(classSearch.toLowerCase())
        )
    : [];
  const filteredSpecies = selectedPhylum
    ? species
        .filter((s) =>
          selectedClass
            ? s.class_slug === selectedClass.slug
            : s.phylum_slug === selectedPhylum.slug
        )
        .filter(
          (s) =>
            s.name.toLowerCase().includes(speciesSearch.toLowerCase()) ||
            (s.scientific_name ?? "")
              .toLowerCase()
              .includes(speciesSearch.toLowerCase())
        )
    : [];

  // â”€â”€ Drawer helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const closeDrawer = () => {
    setDrawerMode(null);
    setDrawerTarget(null);
    setDeleteStage(false);
    setSlugManual(false);
  };

  const openAdd = (
    mode: "add-phylum" | "add-class" | "add-species",
    prefill: Partial<FormState> = {}
  ) => {
    setDrawerMode(mode);
    setDrawerTarget(null);
    setDeleteStage(false);
    setSlugManual(false);
    setForm({ ...BLANK_FORM, ...prefill });
  };

  const openEdit = (
    mode: "edit-phylum" | "edit-class" | "edit-species",
    target: any,
    prefill: FormState
  ) => {
    setDrawerMode(mode);
    setDrawerTarget(target);
    setDeleteStage(false);
    setSlugManual(true);
    setForm(prefill);
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: slugManual ? prev.slug : toSlug(name),
    }));
  };

  const isAddMode = drawerMode?.startsWith("add-") ?? false;
  const isEditMode = drawerMode?.startsWith("edit-") ?? false;

  const drawerColor = drawerMode?.includes("phylum")
    ? { dot: "bg-amber-400", text: "text-amber-400" }
    : drawerMode?.includes("class")
    ? { dot: "bg-teal-400", text: "text-teal-400" }
    : { dot: "bg-violet-400", text: "text-violet-400" };

  const drawerLabel = drawerMode?.includes("phylum")
    ? "Phylum"
    : drawerMode?.includes("class")
    ? "Class"
    : "Species";

  const drawerTitle: Record<string, string> = {
    "add-phylum": "Add New Phylum",
    "add-class": `Add Class${selectedPhylum ? " to " + selectedPhylum.name : ""}`,
    "add-species": "Add New Species",
    "edit-phylum": "Edit Phylum",
    "edit-class": "Edit Class",
    "edit-species": "Edit Species",
  };
  const drawerTitleText = drawerTitle[drawerMode ?? ""] ?? "";

  // â”€â”€ Save â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleSave = () => {
    startTransition(async () => {
      try {
        const apiMode = isEditMode ? "edit" : drawerMode!;
        const editType = isEditMode ? drawerMode!.replace("edit-", "") : null;

        const res = await fetch("/api/admin/zoohub", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: apiMode,
            editTarget: drawerTarget?.slug ?? null,
            editType,
            ...form,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to save");

        // Optimistic updates
        if (drawerMode === "add-phylum") {
          const p: Phylum = {
            slug: form.slug,
            name: form.name,
            subtitle: form.subtitle || null,
            sort_order: parseInt(form.sort_order),
          };
          setPhyla((prev) =>
            [...prev, p].sort((a, b) => a.sort_order - b.sort_order)
          );
          showToast("success", `âœ“ Phylum "${form.name}" added`);
        } else if (drawerMode === "add-class") {
          const c: TaxClass = {
            slug: form.slug,
            class_name: form.name,
            phylum_slug: form.phylum_slug,
            sort_order: parseInt(form.sort_order),
          };
          setClasses((prev) =>
            [...prev, c].sort((a, b) => a.sort_order - b.sort_order)
          );
          showToast("success", `âœ“ Class "${form.name}" added`);
        } else if (drawerMode === "add-species") {
          const s: Species = {
            slug: form.slug,
            name: form.name,
            scientific_name: form.scientific_name || null,
            phylum_slug: form.phylum_slug,
            class_slug: form.class_slug || null,
            sort_order: parseInt(form.sort_order),
          };
          setSpecies((prev) =>
            [...prev, s].sort((a, b) => a.sort_order - b.sort_order)
          );
          showToast("success", `âœ“ Species "${form.name}" added`);
        } else if (drawerMode === "edit-phylum") {
          setPhyla((prev) =>
            prev.map((p) =>
              p.slug === drawerTarget.slug
                ? {
                    ...p,
                    name: form.name,
                    subtitle: form.subtitle || null,
                    sort_order: parseInt(form.sort_order),
                  }
                : p
            )
          );
          if (selectedPhylum?.slug === drawerTarget.slug) {
            setSelectedPhylum((prev) =>
              prev
                ? { ...prev, name: form.name, subtitle: form.subtitle || null }
                : null
            );
          }
          showToast("success", "âœ“ Phylum updated");
        } else if (drawerMode === "edit-class") {
          setClasses((prev) =>
            prev.map((c) =>
              c.slug === drawerTarget.slug
                ? { ...c, class_name: form.name, sort_order: parseInt(form.sort_order) }
                : c
            )
          );
          if (selectedClass?.slug === drawerTarget.slug) {
            setSelectedClass((prev) =>
              prev ? { ...prev, class_name: form.name } : null
            );
          }
          showToast("success", "âœ“ Class updated");
        } else if (drawerMode === "edit-species") {
          setSpecies((prev) =>
            prev.map((s) =>
              s.slug === drawerTarget.slug
                ? {
                    ...s,
                    name: form.name,
                    scientific_name: form.scientific_name || null,
                    sort_order: parseInt(form.sort_order),
                  }
                : s
            )
          );
          showToast("success", "âœ“ Species updated");
        }

        closeDrawer();
        router.refresh();
      } catch (err: any) {
        showToast("error", err.message);
      }
    });
  };

  // â”€â”€ Delete â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleDelete = () => {
    if (!deleteStage) {
      setDeleteStage(true);
      return;
    }
    const type = drawerMode!.replace("edit-", "");
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/zoohub", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: drawerTarget.slug, type }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Delete failed");

        if (type === "phylum") {
          setPhyla((prev) => prev.filter((p) => p.slug !== drawerTarget.slug));
          if (selectedPhylum?.slug === drawerTarget.slug) {
            setSelectedPhylum(null);
            setSelectedClass(null);
          }
          showToast("success", "Phylum deleted");
        } else if (type === "class") {
          setClasses((prev) => prev.filter((c) => c.slug !== drawerTarget.slug));
          if (selectedClass?.slug === drawerTarget.slug) setSelectedClass(null);
          showToast("success", "Class deleted");
        } else {
          setSpecies((prev) => prev.filter((s) => s.slug !== drawerTarget.slug));
          showToast("success", "Species deleted");
        }
        closeDrawer();
        router.refresh();
      } catch (err: any) {
        showToast("error", err.message);
        setDeleteStage(false);
      }
    });
  };

  // â”€â”€â”€ Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• Column 1 â€” Phyla â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="w-60 shrink-0 flex flex-col border-r border-white/8 bg-[#0c0c12]">
        {/* Column header */}
        <div className="px-4 pt-4 pb-3 border-b border-white/8">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                Phyla
              </span>
              <span className="text-[10px] text-slate-600 font-mono">{phyla.length}</span>
            </div>
            <button
              onClick={() => openAdd("add-phylum")}
              title="Add phylum"
              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all"
            >
              <Plus size={12} weight="bold" />
            </button>
          </div>
          <div className="relative">
            <MagnifyingGlass
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600"
            />
            <input
              value={phylumSearch}
              onChange={(e) => setPhylumSearch(e.target.value)}
              placeholder="Searchâ€¦"
              className="w-full pl-7 pr-3 py-1.5 bg-white/4 border border-white/8 rounded-lg text-xs text-white placeholder-slate-700 focus:outline-none focus:border-amber-500/30 transition-all"
            />
          </div>
        </div>

        {/* Phyla list */}
        <div className="flex-1 overflow-y-auto py-1">
          {filteredPhyla.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 px-4 text-center">
              <Leaf size={28} className="text-slate-800" />
              <p className="text-xs text-slate-700">No phyla yet.</p>
              <button
                onClick={() => openAdd("add-phylum")}
                className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors"
              >
                + Add first phylum
              </button>
            </div>
          ) : (
            filteredPhyla.map((phylum) => {
              const active = selectedPhylum?.slug === phylum.slug;
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedPhylum(phylum);
                      setSelectedClass(null);
                      setClassSearch("");
                      setSpeciesSearch("");
                    }
                  }}
                  key={phylum.slug}
                  onClick={() => {
                    setSelectedPhylum(phylum);
                    setSelectedClass(null);
                    setClassSearch("");
                    setSpeciesSearch("");
                  }}
                  className={`w-full text-left px-4 py-2.5 border-r-2 transition-all group cursor-pointer ${
                    active
                      ? "bg-amber-500/8 border-amber-400"
                      : "border-transparent hover:bg-white/3"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-sm font-semibold truncate leading-snug ${
                          active ? "text-amber-300" : "text-slate-300"
                        }`}
                      >
                        {phylum.name}
                      </div>
                      <div className="text-[10px] text-slate-600 mt-0.5">
                        {classCount(phylum.slug)} cl Â· {speciesCountForPhylum(phylum.slug)} sp
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit("edit-phylum", phylum, {
                            name: phylum.name,
                            slug: phylum.slug,
                            subtitle: phylum.subtitle || "",
                            scientific_name: "",
                            phylum_slug: "",
                            class_slug: "",
                            sort_order: String(phylum.sort_order),
                          });
                        }}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 text-slate-600 hover:text-amber-400 transition-all"
                      >
                        <PencilSimple size={11} />
                      </button>
                      <CaretRight
                        size={11}
                        className={`transition-all ${
                          active ? "text-amber-400 rotate-90" : "text-slate-700"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• Column 2 â€” Classes â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="w-60 shrink-0 flex flex-col border-r border-white/8 bg-[#0d0d14]">
        {!selectedPhylum ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
            <Tree size={36} className="text-slate-800" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Select a phylum<br />to view its classes
            </p>
          </div>
        ) : (
          <>
            <div className="px-4 pt-4 pb-3 border-b border-white/8">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">
                    Classes
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">
                    {filteredClasses.length}
                  </span>
                </div>
                <button
                  onClick={() =>
                    openAdd("add-class", { phylum_slug: selectedPhylum.slug })
                  }
                  title="Add class"
                  className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-all"
                >
                  <Plus size={12} weight="bold" />
                </button>
              </div>
              <div className="relative">
                <MagnifyingGlass
                  size={12}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600"
                />
                <input
                  value={classSearch}
                  onChange={(e) => setClassSearch(e.target.value)}
                  placeholder="Searchâ€¦"
                  className="w-full pl-7 pr-3 py-1.5 bg-white/4 border border-white/8 rounded-lg text-xs text-white placeholder-slate-700 focus:outline-none focus:border-teal-500/30 transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-1">
              {filteredClasses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2 px-4 text-center">
                  <p className="text-xs text-slate-700">
                    No classes in {selectedPhylum.name}.
                  </p>
                  <button
                    onClick={() =>
                      openAdd("add-class", { phylum_slug: selectedPhylum.slug })
                    }
                    className="text-xs text-teal-400/70 hover:text-teal-400 transition-colors"
                  >
                    + Add first class
                  </button>
                </div>
              ) : (
                filteredClasses.map((cls) => {
                  const active = selectedClass?.slug === cls.slug;
                  return (
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedClass(cls);
                          setSpeciesSearch("");
                        }
                      }}
                      key={cls.slug}
                      onClick={() => {
                        setSelectedClass(cls);
                        setSpeciesSearch("");
                      }}
                      className={`w-full text-left px-4 py-2.5 border-r-2 transition-all group cursor-pointer ${
                        active
                          ? "bg-teal-500/8 border-teal-400"
                          : "border-transparent hover:bg-white/3"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div
                            className={`text-sm font-semibold truncate leading-snug ${
                              active ? "text-teal-300" : "text-slate-300"
                            }`}
                          >
                            {cls.class_name}
                          </div>
                          <div className="text-[10px] text-slate-600 mt-0.5">
                            {speciesCountForClass(cls.slug)} species
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit("edit-class", cls, {
                                name: cls.class_name,
                                slug: cls.slug,
                                subtitle: "",
                                scientific_name: "",
                                phylum_slug: cls.phylum_slug,
                                class_slug: "",
                                sort_order: String(cls.sort_order),
                              });
                            }}
                            className="p-1 rounded opacity-0 group-hover:opacity-100 text-slate-600 hover:text-teal-400 transition-all"
                          >
                            <PencilSimple size={11} />
                          </button>
                          <CaretRight
                            size={11}
                            className={`transition-all ${
                              active ? "text-teal-400 rotate-90" : "text-slate-700"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• Column 3 â€” Species â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="flex-1 flex flex-col bg-[#0a0a10] min-w-0">
        {!selectedPhylum ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/8 border border-violet-500/15 flex items-center justify-center">
              <Bug size={32} className="text-violet-700" />
            </div>
            <div>
              <h3 className="text-slate-500 font-semibold mb-1">No phylum selected</h3>
              <p className="text-sm text-slate-700">
                Choose a phylum from the left, then optionally a class,<br />to browse and manage species
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Species header */}
            <div className="px-6 pt-4 pb-3 border-b border-white/8">
              <div className="flex items-center justify-between gap-4 mb-2.5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-violet-400">
                      Species
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono">
                      {filteredSpecies.length}
                    </span>
                  </div>
                  {/* Breadcrumb trail */}
                  <div className="flex items-center gap-1 text-[10px] text-slate-600">
                    <span className="text-amber-400/60">{selectedPhylum.name}</span>
                    {selectedClass ? (
                      <>
                        <CaretRight size={9} />
                        <span className="text-teal-400/60">{selectedClass.class_name}</span>
                      </>
                    ) : (
                      <span className="text-slate-700"> Â· all classes</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() =>
                    openAdd("add-species", {
                      phylum_slug: selectedPhylum.slug,
                      class_slug: selectedClass?.slug ?? "",
                    })
                  }
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-500/10 border border-violet-500/15 text-violet-400 hover:bg-violet-500/18 text-xs font-bold transition-all shrink-0"
                >
                  <Plus size={13} weight="bold" />
                  Add Species
                </button>
              </div>
              <div className="relative">
                <MagnifyingGlass
                  size={12}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                />
                <input
                  value={speciesSearch}
                  onChange={(e) => setSpeciesSearch(e.target.value)}
                  placeholder="Search by common name or scientific nameâ€¦"
                  className="w-full pl-8 pr-3 py-2 bg-white/4 border border-white/8 rounded-lg text-xs text-white placeholder-slate-700 focus:outline-none focus:border-violet-500/30 transition-all"
                />
              </div>
            </div>

            {/* Species list */}
            <div className="flex-1 overflow-y-auto">
              {filteredSpecies.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
                  <Bug size={32} className="text-slate-800" />
                  <p className="text-xs text-slate-700">No species found.</p>
                  <button
                    onClick={() =>
                      openAdd("add-species", {
                        phylum_slug: selectedPhylum.slug,
                        class_slug: selectedClass?.slug ?? "",
                      })
                    }
                    className="text-xs text-violet-400/70 hover:text-violet-400 transition-colors"
                  >
                    + Add first species
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-white/4">
                  {filteredSpecies.map((sp) => {
                    const parentClass = classes.find((c) => c.slug === sp.class_slug);
                    return (
                      <div
                        key={sp.slug}
                        className="flex items-center gap-4 px-6 py-3 hover:bg-white/3 group transition-colors"
                      >
                        {/* Icon */}
                        <div className="w-8 h-8 rounded-xl bg-violet-500/8 border border-violet-500/15 flex items-center justify-center shrink-0">
                          <Bug size={14} className="text-violet-500" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-200 truncate">
                            {sp.name}
                          </div>
                          {sp.scientific_name && (
                            <div className="text-[11px] text-slate-600 italic mt-0.5 truncate">
                              {sp.scientific_name}
                            </div>
                          )}
                        </div>

                        {/* Class badge + edit */}
                        <div className="flex items-center gap-2 shrink-0">
                          {parentClass && (
                            <span className="hidden sm:inline-flex text-[10px] text-teal-400/60 bg-teal-500/8 border border-teal-500/12 px-2 py-0.5 rounded-full">
                              {parentClass.class_name}
                            </span>
                          )}
                          <button
                            onClick={() =>
                              openEdit("edit-species", sp, {
                                name: sp.name,
                                slug: sp.slug,
                                subtitle: "",
                                scientific_name: sp.scientific_name ?? "",
                                phylum_slug: sp.phylum_slug,
                                class_slug: sp.class_slug ?? "",
                                sort_order: String(sp.sort_order),
                              })
                            }
                            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-slate-600 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
                          >
                            <PencilSimple size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• Slide-in Drawer â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {drawerMode && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-sm flex flex-col bg-[#0f0f1a] border-l border-white/10 shadow-2xl animate-slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${drawerColor.dot}`} />
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${drawerColor.text}`}
                  >
                    {drawerLabel}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white">{drawerTitleText}</h2>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/8 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  {drawerMode.includes("class") ? "Class Name" : "Name"}
                  <span className="text-red-400 ml-0.5">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder={
                    drawerMode.includes("phylum")
                      ? "e.g. Chordata"
                      : drawerMode.includes("class")
                      ? "e.g. Mammalia"
                      : "e.g. Lion"
                  }
                  autoFocus
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/15 transition-all"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
                  <span>
                    Slug <span className="text-red-400">*</span>
                  </span>
                  {!slugManual && isAddMode && (
                    <span className="text-slate-700 font-normal">auto-generated</span>
                  )}
                </label>
                <input
                  value={form.slug}
                  disabled={isEditMode}
                  onChange={(e) => {
                    setSlugManual(true);
                    setForm((prev) => ({
                      ...prev,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, ""),
                    }));
                  }}
                  placeholder="e.g. chordata"
                  className={`w-full px-4 py-3 border rounded-xl text-sm font-mono transition-all focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/15 ${
                    isEditMode
                      ? "bg-white/3 border-white/6 text-slate-600 cursor-not-allowed"
                      : "bg-white/5 border-white/10 text-white placeholder-slate-600"
                  }`}
                />
                {isEditMode && (
                  <p className="text-[10px] text-slate-700 mt-1">
                    Slug cannot be changed â€” it&apos;s the database identifier.
                  </p>
                )}
              </div>

              {/* Scientific name â€” species only */}
              {(drawerMode === "add-species" || drawerMode === "edit-species") && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Scientific Name
                  </label>
                  <input
                    value={form.scientific_name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, scientific_name: e.target.value }))
                    }
                    placeholder="e.g. Panthera leo"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm italic placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/15 transition-all"
                  />
                </div>
              )}

              {/* Description â€” phylum only */}
              {(drawerMode === "add-phylum" || drawerMode === "edit-phylum") && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Description
                  </label>
                  <input
                    value={form.subtitle}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, subtitle: e.target.value }))
                    }
                    placeholder="Brief description of this phylum"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/15 transition-all"
                  />
                </div>
              )}

              {/* Parent Phylum â€” class or species */}
              {(drawerMode === "add-class" ||
                drawerMode === "edit-class" ||
                drawerMode === "add-species" ||
                drawerMode === "edit-species") && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Parent Phylum <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.phylum_slug}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phylum_slug: e.target.value,
                        class_slug: "",
                      }))
                    }
                    className="w-full px-4 py-3 bg-[#0a0a10] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/40 transition-all"
                  >
                    <option value="">Select phylumâ€¦</option>
                    {phyla.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Parent Class â€” species only, optional */}
              {(drawerMode === "add-species" || drawerMode === "edit-species") &&
                form.phylum_slug && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Parent Class{" "}
                      <span className="text-slate-600 font-normal">(optional)</span>
                    </label>
                    <select
                      value={form.class_slug}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, class_slug: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-[#0a0a10] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/40 transition-all"
                    >
                      <option value="">No class</option>
                      {classes
                        .filter((c) => c.phylum_slug === form.phylum_slug)
                        .map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.class_name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

              {/* Sort order */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, sort_order: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/15 transition-all"
                />
                <p className="text-[10px] text-slate-700 mt-1">
                  Lower numbers appear first (0 = top).
                </p>
              </div>

              {/* Delete confirmation zone */}
              {isEditMode && deleteStage && (
                <div className="p-4 bg-red-500/8 border border-red-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Warning size={15} weight="fill" className="text-red-400" />
                    <span className="text-sm font-bold text-red-400">
                      Confirm deletion
                    </span>
                  </div>
                  <p className="text-xs text-red-300/60 leading-relaxed">
                    This is <strong>permanent</strong> and cannot be undone.
                    {drawerMode === "edit-phylum" &&
                      " All classes and species under this phylum must be deleted first."}
                    {drawerMode === "edit-class" &&
                      " Species in this class will have their class removed."}
                  </p>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 border-t border-white/8 flex flex-col gap-2">
              <button
                onClick={handleSave}
                disabled={isPending || !form.name.trim() || !form.slug.trim()}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending && !deleteStage ? (
                  <>
                    <SpinnerGap size={15} className="animate-spin" /> Savingâ€¦
                  </>
                ) : (
                  <>
                    <Check size={15} weight="bold" />
                    {isAddMode ? "Add to Database" : "Save Changes"}
                  </>
                )}
              </button>

              {isEditMode && (
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    deleteStage
                      ? "bg-red-500 hover:bg-red-400 text-white"
                      : "border border-red-500/15 text-red-400/70 hover:text-red-400 hover:bg-red-500/8 hover:border-red-500/25"
                  }`}
                >
                  {isPending && deleteStage ? (
                    <>
                      <SpinnerGap size={15} className="animate-spin" /> Deletingâ€¦
                    </>
                  ) : (
                    <>
                      <Trash size={15} />
                      {deleteStage ? "Yes, Delete Forever" : "Delete"}
                    </>
                  )}
                </button>
              )}

              <button
                onClick={deleteStage ? () => setDeleteStage(false) : closeDrawer}
                className="w-full py-2 text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                {deleteStage ? "â† Cancel" : "Close"}
              </button>
            </div>
          </aside>
        </>
      )}

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• Toast â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium border animate-toast-in backdrop-blur-sm ${
            toast.type === "success"
              ? "bg-emerald-950/95 border-emerald-500/25 text-emerald-300"
              : "bg-red-950/95 border-red-500/25 text-red-300"
          }`}
        >
          {toast.type === "success" ? (
            <Check size={15} weight="bold" />
          ) : (
            <Warning size={15} weight="fill" />
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
