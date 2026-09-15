import { createClient } from "@supabase/supabase-js";
import type {
  CareerItem,
  ScopeCategory,
  CourseDetail,
} from "@/data/scopes-data";

// ─── Public (anon) client — no cookies needed ────────────────
function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ─── Raw DB types ─────────────────────────────────────────────

interface DBCategory {
  id: string;
  name: string;
  short_name: string | null;
  description: string | null;
  icon_name: string | null;
  salary_range: string | null;
  gradient: string | null;
  color: string | null;
  sort_order: number;
}

interface DBCareer {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  badge: string | null;
  secondary_badge: string | null;
  salary: string | null;
  salary_min: number | null;
  salary_max: number | null;
  bsc: string[];
  msc: string[];
  phd: string[];
  is_top_choice: boolean;
  top_sectors: string[];
  key_skills: string[];
  sort_order: number;
}

// ─── Adapters: DB row → UI type ───────────────────────────────

function adaptCareer(row: DBCareer, catName: string): CareerItem {
  return {
    id:              row.id,
    title:           row.title,
    desc:            row.description ?? "",
    category:        catName,
    categoryId:      row.category_id ?? "",
    badge:           row.badge        ?? undefined,
    secondaryBadge:  row.secondary_badge ?? undefined,
    salary:          row.salary        ?? "—",
    salaryMin:       row.salary_min    ?? 0,
    salaryMax:       row.salary_max    ?? 0,
    bsc:             row.bsc           ?? [],
    msc:             row.msc           ?? [],
    phd:             row.phd           ?? [],
    isTopChoice:     row.is_top_choice ?? false,
    topSectors:      row.top_sectors   ?? [],
    keySkills:       row.key_skills    ?? [],
  };
}

function adaptCategory(
  row: DBCategory,
  careersForCat: DBCareer[]
): ScopeCategory {
  // Derive topRoles from the first 5 career titles in this category
  const topRoles = careersForCat.slice(0, 5).map((c) => c.title);

  return {
    id:          row.id,
    name:        row.name,
    shortName:   row.short_name  ?? row.name.split(" ").slice(0, 2).join(" "),
    description: row.description ?? "",
    iconName:    row.icon_name   ?? "Microscope",
    salaryRange: row.salary_range ?? "",
    count:       careersForCat.length,
    topRoles,
    gradient:    row.gradient    ?? "from-emerald-500/20 via-emerald-500/5 to-transparent",
    color:       row.color       ?? "emerald",
  };
}

// ─── Public fetch functions ───────────────────────────────────

/**
 * Fetches all active scope categories + all active careers from Supabase.
 * Returns data already mapped to the UI types used by ScopesView.
 */
export async function getScopeData(): Promise<{
  categories: ScopeCategory[];
  careers:    CareerItem[];
}> {
  const supabase = createPublicClient();

  // Fetch categories and careers in parallel
  const [catResult, carResult] = await Promise.all([
    supabase
      .from("scope_categories")
      .select("id, name, short_name, description, icon_name, salary_range, gradient, color, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),

    supabase
      .from("scope_careers")
      .select("id, title, description, category_id, badge, secondary_badge, salary, salary_min, salary_max, bsc, msc, phd, is_top_choice, top_sectors, key_skills, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  const rawCategories = (catResult.data ?? []) as DBCategory[];
  const rawCareers    = (carResult.data ?? []) as DBCareer[];

  // Build a lookup: categoryId → careers[]
  const careersByCat = new Map<string, DBCareer[]>();
  for (const car of rawCareers) {
    const key = car.category_id ?? "";
    if (!careersByCat.has(key)) careersByCat.set(key, []);
    careersByCat.get(key)!.push(car);
  }

  // Build a lookup: categoryId → category name
  const catNameById = new Map(rawCategories.map((c) => [c.id, c.name]));

  const categories = rawCategories.map((row) =>
    adaptCategory(row, careersByCat.get(row.id) ?? [])
  );

  const careers = rawCareers.map((row) =>
    adaptCareer(row, catNameById.get(row.category_id ?? "") ?? "")
  );

  return { categories, careers };
}

/**
 * Re-export the courseDetails from the static local file.
 * This data is not stored in the DB — it's a lookup map used in
 * the Career Pathway Flow modal.
 */
export type { CareerItem, ScopeCategory, CourseDetail };
