/**
 * Admin Analytics Data Layer — SERVER ONLY
 *
 * All functions use the service-role Supabase client to bypass RLS
 * and aggregate user statistics. Never import in client components.
 */
import { createAdminClient } from "./admin-client";

// ─── Types ────────────────────────────────────────────────────────────────

export interface UserStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  active: number;
  inactive: number;
}

export interface GrowthDataPoint {
  date: string;
  count: number;
  cumulative: number;
}

export interface AgeGroup {
  label: string;
  count: number;
  percent: number;
}

export interface GenderStat {
  gender: string;
  count: number;
  percent: number;
}

export interface InstitutionStat {
  institution: string;
  count: number;
  percent: number;
}

export interface LocationStat {
  location: string;
  count: number;
  percent: number;
}

export interface ClassStat {
  current_class: string;
  count: number;
  percent: number;
}

// ─── Helper ───────────────────────────────────────────────────────────────

function startOf(unit: "day" | "week" | "month"): string {
  const now = new Date();
  if (unit === "day") {
    now.setHours(0, 0, 0, 0);
  } else if (unit === "week") {
    const day = now.getDay(); // 0 = Sunday
    now.setDate(now.getDate() - day);
    now.setHours(0, 0, 0, 0);
  } else {
    now.setDate(1);
    now.setHours(0, 0, 0, 0);
  }
  return now.toISOString();
}

// ─── Functions ────────────────────────────────────────────────────────────

/**
 * Get high-level user counts.
 */
export async function getUserStats(): Promise<UserStats> {
  const admin = createAdminClient();

  // Total users
  const { count: total } = await admin
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // New users today
  const { count: today } = await admin
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOf("day"));

  // New users this week
  const { count: thisWeek } = await admin
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOf("week"));

  // New users this month
  const { count: thisMonth } = await admin
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", startOf("month"));

  // Active = signed in within last 30 days (via auth.users last_sign_in_at)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const { data: authUsers } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const active = authUsers?.users?.filter(
    (u) => u.last_sign_in_at && new Date(u.last_sign_in_at) >= thirtyDaysAgo
  ).length ?? 0;

  return {
    total: total ?? 0,
    today: today ?? 0,
    thisWeek: thisWeek ?? 0,
    thisMonth: thisMonth ?? 0,
    active,
    inactive: (total ?? 0) - active,
  };
}

/**
 * Get daily user registration counts for a given time range.
 * range: '7d' | '30d' | '3m' | '6m' | '1y' | 'all'
 */
export async function getUserGrowthData(range: string): Promise<GrowthDataPoint[]> {
  const admin = createAdminClient();

  let fromDate: Date | null = new Date();
  switch (range) {
    case "7d":
      fromDate.setDate(fromDate.getDate() - 7);
      break;
    case "30d":
      fromDate.setDate(fromDate.getDate() - 30);
      break;
    case "3m":
      fromDate.setMonth(fromDate.getMonth() - 3);
      break;
    case "6m":
      fromDate.setMonth(fromDate.getMonth() - 6);
      break;
    case "1y":
      fromDate.setFullYear(fromDate.getFullYear() - 1);
      break;
    default:
      fromDate = null;
  }

  let query = admin
    .from("profiles")
    .select("created_at")
    .order("created_at", { ascending: true });

  if (fromDate) {
    query = query.gte("created_at", fromDate.toISOString());
  }

  const { data } = await query;

  if (!data || data.length === 0) return [];

  // Group by date
  const byDate: Record<string, number> = {};
  for (const row of data as any[]) {
    const dateStr = new Date(row.created_at).toISOString().split("T")[0]!;
    byDate[dateStr] = (byDate[dateStr] ?? 0) + 1;
  }

  // Build cumulative series
  const sorted = Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b));
  let cumulative = 0;
  return sorted.map(([date, count]) => {
    cumulative += count;
    return { date, count, cumulative };
  });
}

/**
 * Get age distribution from profiles.date_of_birth
 */
export async function getAgeDistribution(): Promise<AgeGroup[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("profiles")
    .select("date_of_birth")
    .not("date_of_birth", "is", null);

  if (!data || data.length === 0) return [];

  const groups: Record<string, number> = {
    "Under 13": 0,
    "13–17": 0,
    "18–20": 0,
    "21–24": 0,
    "25–30": 0,
    "31+": 0,
    "Unknown": 0,
  };

  const currentYear = new Date().getFullYear();
  for (const row of data as any[]) {
    if (!row.date_of_birth) {
      groups["Unknown"]!++;
      continue;
    }
    const birthYear = new Date(row.date_of_birth).getFullYear();
    const age = currentYear - birthYear;
    if (age < 13) groups["Under 13"]!++;
    else if (age <= 17) groups["13–17"]!++;
    else if (age <= 20) groups["18–20"]!++;
    else if (age <= 24) groups["21–24"]!++;
    else if (age <= 30) groups["25–30"]!++;
    else groups["31+"]!++;
  }

  const total = data.length;
  return Object.entries(groups)
    .filter(([, count]) => count > 0)
    .map(([label, count]) => ({
      label,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get gender distribution
 */
export async function getGenderDistribution(): Promise<GenderStat[]> {
  const admin = createAdminClient();
  const { data } = await admin.from("profiles").select("gender");

  if (!data || data.length === 0) return [];

  const groups: Record<string, number> = {};
  for (const row of data as any[]) {
    const key = row.gender?.trim() || "Unknown";
    groups[key] = (groups[key] ?? 0) + 1;
  }

  const total = data.length;
  return Object.entries(groups)
    .map(([gender, count]) => ({
      gender,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get institution / college distribution (top 10 + others)
 */
export async function getInstitutionStats(): Promise<InstitutionStat[]> {
  const admin = createAdminClient();
  const { data } = await admin.from("profiles").select("institution");

  if (!data || data.length === 0) return [];

  const groups: Record<string, number> = {};
  for (const row of data as any[]) {
    const key = row.institution?.trim() || "Unknown";
    groups[key] = (groups[key] ?? 0) + 1;
  }

  const total = data.length;
  const sorted = Object.entries(groups)
    .map(([institution, count]) => ({
      institution,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Top 9 + Others
  if (sorted.length > 10) {
    const top9 = sorted.slice(0, 9);
    const othersCount = sorted.slice(9).reduce((s, r) => s + r.count, 0);
    top9.push({
      institution: "Others",
      count: othersCount,
      percent: Math.round((othersCount / total) * 100),
    });
    return top9;
  }
  return sorted;
}

/**
 * Get location distribution
 */
export async function getLocationStats(): Promise<LocationStat[]> {
  const admin = createAdminClient();
  const { data } = await admin.from("profiles").select("location");

  if (!data || data.length === 0) return [];

  const groups: Record<string, number> = {};
  for (const row of data as any[]) {
    const key = row.location?.trim() || "Unknown";
    groups[key] = (groups[key] ?? 0) + 1;
  }

  const total = data.length;
  const sorted = Object.entries(groups)
    .map(([location, count]) => ({
      location,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  if (sorted.length > 10) {
    const top9 = sorted.slice(0, 9);
    const othersCount = sorted.slice(9).reduce((s, r) => s + r.count, 0);
    top9.push({
      location: "Others",
      count: othersCount,
      percent: Math.round((othersCount / total) * 100),
    });
    return top9;
  }
  return sorted;
}

/**
 * Get current_class / education level distribution
 */
export async function getClassDistribution(): Promise<ClassStat[]> {
  const admin = createAdminClient();
  const { data } = await admin.from("profiles").select("current_class");

  if (!data || data.length === 0) return [];

  const groups: Record<string, number> = {};
  for (const row of data as any[]) {
    const key = row.current_class?.trim() || "Unknown";
    groups[key] = (groups[key] ?? 0) + 1;
  }

  const total = data.length;
  return Object.entries(groups)
    .map(([current_class, count]) => ({
      current_class,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Verify the current request user is an admin.
 * Used in Server Components/Actions to double-check beyond middleware.
 */
export async function verifyAdmin(userId: string): Promise<boolean> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("user_id", userId)
    .single();
  return (data as any)?.is_admin === true;
}
