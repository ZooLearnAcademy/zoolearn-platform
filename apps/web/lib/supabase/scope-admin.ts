"use server";

/**
 * Scope Admin Server Actions — SERVER ONLY
 *
 * CRUD operations for scope_categories and scope_careers tables.
 * All mutations use the admin client (service role) to bypass RLS.
 * Public reads use the regular server client.
 */
import { createAdminClient } from "./admin-client";
import { createSupabaseServerClient } from "./server-client";
import { revalidatePath } from "next/cache";

// ─── Types ────────────────────────────────────────────────────────────────

export interface ScopeCategory {
  id: string;
  name: string;
  short_name: string | null;
  description: string | null;
  icon_name: string | null;
  salary_range: string | null;
  gradient: string | null;
  color: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScopeCareer {
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Public Read Functions ─────────────────────────────────────────────────

export async function getScopeCategories(): Promise<ScopeCategory[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("scope_categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as ScopeCategory[];
}

export async function getScopeCareers(categoryId?: string): Promise<ScopeCareer[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("scope_careers")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return data as ScopeCareer[];
}

export async function getAllScopeCareers(): Promise<ScopeCareer[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("scope_careers")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data as ScopeCareer[];
}

export async function getAllScopeCategories(): Promise<ScopeCategory[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("scope_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data as ScopeCategory[];
}

/**
 * Get a single scope category by ID.
 * Returns null if not found or inactive.
 */
export async function getScopeCategoryById(categoryId: string): Promise<ScopeCategory | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("scope_categories")
    .select("*")
    .eq("id", categoryId)
    .eq("is_active", true)
    .single();
  if (error || !data) return null;
  return data as ScopeCategory;
}

/**
 * Get careers for a specific category (active only).
 */
export async function getScopeCareersForCategory(categoryId: string): Promise<ScopeCareer[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("scope_careers")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data as ScopeCareer[];
}

// ─── Admin Mutations ───────────────────────────────────────────────────────

export async function upsertScopeCategory(
  category: Partial<ScopeCategory> & { id: string }
) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("scope_categories")
    .upsert({ ...category, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  revalidatePath("/scopes");
  revalidatePath("/admin/scope");
}

export async function deleteScopeCategory(id: string) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("scope_categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/scopes");
  revalidatePath("/admin/scope");
}

export async function upsertScopeCareer(
  career: Partial<ScopeCareer> & { id: string }
) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("scope_careers")
    .upsert({ ...career, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  revalidatePath("/scopes");
  revalidatePath("/admin/scope");
}

export async function deleteScopeCareer(id: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("scope_careers").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/scopes");
  revalidatePath("/admin/scope");
}

export async function toggleScopeCategoryActive(id: string, isActive: boolean) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("scope_categories")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/scopes");
  revalidatePath("/admin/scope");
}

export async function toggleScopeCareerActive(id: string, isActive: boolean) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("scope_careers")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/scopes");
  revalidatePath("/admin/scope");
}
