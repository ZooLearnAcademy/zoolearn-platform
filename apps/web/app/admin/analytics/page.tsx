import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import {
  getUserStats,
  getUserGrowthData,
  getAgeDistribution,
  getGenderDistribution,
  getInstitutionStats,
  getLocationStats,
  getClassDistribution,
  type UserStats,
  type GrowthDataPoint,
  type AgeGroup,
  type GenderStat,
  type InstitutionStat,
  type LocationStat,
  type ClassStat,
} from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const emptyStats = { total: 0, today: 0, thisWeek: 0, thisMonth: 0, active: 0, inactive: 0 };

export default async function AdminAnalyticsPage() {
  let stats: UserStats = emptyStats;
  let growthData: GrowthDataPoint[] = [];
  let ageGroups: AgeGroup[] = [];
  let genderStats: GenderStat[] = [];
  let institutionStats: InstitutionStat[] = [];
  let locationStats: LocationStat[] = [];
  let classStats: ClassStat[] = [];

  try {
    [stats, growthData, ageGroups, genderStats, institutionStats, locationStats, classStats] =
      await Promise.all([
        getUserStats(),
        getUserGrowthData("30d"),
        getAgeDistribution(),
        getGenderDistribution(),
        getInstitutionStats(),
        getLocationStats(),
        getClassDistribution(),
      ]);
  } catch (err) {
    console.error("[admin analytics] Failed to fetch analytics data:", err);
  }

  return (
    <AnalyticsDashboard
      stats={stats}
      initialGrowthData={growthData}
      ageGroups={ageGroups}
      genderStats={genderStats}
      institutionStats={institutionStats}
      locationStats={locationStats}
      classStats={classStats}
    />
  );
}
