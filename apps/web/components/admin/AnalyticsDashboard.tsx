"use client";

import { useState, useTransition } from "react";
import {
  GrowthChart,
  AgeChart,
  GenderChart,
  InstitutionChart,
  LocationChart,
  ClassChart,
} from "@/components/admin/AnalyticsCharts";
import type {
  UserStats,
  GrowthDataPoint,
  AgeGroup,
  GenderStat,
  InstitutionStat,
  LocationStat,
  ClassStat,
} from "@/lib/supabase/admin";
import {
  Users,
  CalendarBlank,
  UserPlus,
  Pulse,
  UserMinus,
} from "@phosphor-icons/react";

const GROWTH_RANGES = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "3 Months", value: "3m" },
  { label: "6 Months", value: "6m" },
  { label: "1 Year", value: "1y" },
  { label: "All Time", value: "all" },
];

interface AnalyticsDashboardProps {
  stats: UserStats;
  initialGrowthData: GrowthDataPoint[];
  ageGroups: AgeGroup[];
  genderStats: GenderStat[];
  institutionStats: InstitutionStat[];
  locationStats: LocationStat[];
  classStats: ClassStat[];
}

export function AnalyticsDashboard({
  stats,
  initialGrowthData,
  ageGroups,
  genderStats,
  institutionStats,
  locationStats,
  classStats,
}: AnalyticsDashboardProps) {
  const [growthRange, setGrowthRange] = useState("30d");
  const [growthData, setGrowthData] = useState(initialGrowthData);
  const [isPending, startTransition] = useTransition();

  const handleRangeChange = async (range: string) => {
    setGrowthRange(range);
    startTransition(async () => {
      const res = await fetch(`/api/admin/analytics/growth?range=${range}`);
      const data = await res.json();
      setGrowthData(data);
    });
  };

  const statCards = [
    { label: "Total Users", value: stats.total, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "New Today", value: stats.today, icon: UserPlus, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "New This Week", value: stats.thisWeek, icon: CalendarBlank, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "New This Month", value: stats.thisMonth, icon: UserPlus, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { label: "Active (30d)", value: stats.active, icon: Pulse, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
    { label: "Inactive", value: stats.inactive, icon: UserMinus, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Analytics</h1>
        <p className="text-slate-400 text-sm">Real-time user statistics from Supabase.</p>
      </div>

      {/* Stat Cards */}
      <section>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">User Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className={`${card.bg} border rounded-xl p-4`}>
              <card.icon size={20} className={`${card.color} mb-3`} weight="duotone" />
              <div className="text-2xl font-bold text-white">{card.value.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-1">{card.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* User Growth */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">User Growth</h2>
            <p className="text-xs text-slate-500">New registrations over time</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {GROWTH_RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => handleRangeChange(r.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  growthRange === r.value
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div className={isPending ? "opacity-50 transition-opacity" : ""}>
          <GrowthChart data={growthData} />
        </div>
      </section>

      {/* Age + Gender row */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Age Distribution</h2>
          <p className="text-xs text-slate-500 mb-5">Users grouped by age range</p>
          <AgeChart data={ageGroups} />
          {/* Table */}
          {ageGroups.length > 0 && (
            <div className="mt-4 space-y-2">
              {ageGroups.map((g) => (
                <div key={g.label} className="flex items-center gap-3 text-sm">
                  <span className="text-slate-300 w-16">{g.label}</span>
                  <div className="flex-1 bg-white/5 rounded-full h-1.5">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full"
                      style={{ width: `${g.percent}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-xs w-8 text-right">{g.percent}%</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Gender Distribution</h2>
          <p className="text-xs text-slate-500 mb-5">Users by gender</p>
          <GenderChart data={genderStats} />
          {genderStats.length > 0 && (
            <div className="mt-2 space-y-2">
              {genderStats.map((g, i) => (
                <div key={g.gender} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ["#10b981","#3b82f6","#8b5cf6","#f59e0b","#ef4444"][i % 5] }} />
                    <span className="text-slate-300">{g.gender}</span>
                  </div>
                  <div className="flex gap-4 text-slate-400 text-xs">
                    <span>{g.count.toLocaleString()}</span>
                    <span>{g.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Institution */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-1">Institution / College</h2>
        <p className="text-xs text-slate-500 mb-5">Top institutions by user count</p>
        <InstitutionChart data={institutionStats} />
      </section>

      {/* Location + Class row */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Location</h2>
          <p className="text-xs text-slate-500 mb-5">Users by location / state</p>
          <LocationChart data={locationStats} />
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Education Level</h2>
          <p className="text-xs text-slate-500 mb-5">Users by current class / degree</p>
          <ClassChart data={classStats} />
        </section>
      </div>
    </div>
  );
}
