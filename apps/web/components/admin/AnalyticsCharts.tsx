"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type {
  GrowthDataPoint,
  AgeGroup,
  GenderStat,
  InstitutionStat,
  LocationStat,
  ClassStat,
} from "@/lib/supabase/admin";

const COLORS = [
  "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444",
  "#06b6d4", "#84cc16", "#f97316", "#ec4899", "#6366f1",
];

// ─── Growth Chart ──────────────────────────────────────────────────────────

export function GrowthChart({ data }: { data: GrowthDataPoint[] }) {
  if (!data.length) {
    return <EmptyChart message="No registration data available for this period." />;
  }

  // For long ranges, show cumulative; for short ranges show daily
  const isLong = data.length > 60;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="date"
          tickFormatter={(v: string) => {
            const d = new Date(v);
            return isLong
              ? d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" })
              : d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
          }}
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={35}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e1e2e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          labelFormatter={(v) => new Date(v as string).toLocaleDateString("en-IN")}
        />
        <Line
          type="monotone"
          dataKey={isLong ? "cumulative" : "count"}
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          name={isLong ? "Total Users" : "New Registrations"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── Age Distribution Bar Chart ────────────────────────────────────────────

export function AgeChart({ data }: { data: AgeGroup[] }) {
  if (!data.length) return <EmptyChart message="No age data available." />;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e1e2e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          formatter={(v: any, name: any) => [
            name === "count" ? `${v} users` : `${v}%`,
            name === "count" ? "Users" : "Percentage",
          ]}
        />
        <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} name="count" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Gender Pie Chart ──────────────────────────────────────────────────────

export function GenderChart({ data }: { data: GenderStat[] }) {
  if (!data.length) return <EmptyChart message="No gender data available." />;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="gender"
          cx="50%"
          cy="45%"
          outerRadius={90}
          innerRadius={50}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e1e2e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          formatter={(v: any) => [`${v} users`]}
        />
        <Legend
          formatter={(v) => (
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>{v}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ─── Institution Bar Chart ─────────────────────────────────────────────────

export function InstitutionChart({ data }: { data: InstitutionStat[] }) {
  if (!data.length) return <EmptyChart message="No institution data available." />;

  return (
    <ResponsiveContainer width="100%" height={Math.max(200, data.length * 42)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="institution"
          width={160}
          tick={{ fill: "#e2e8f0", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: string) => (v.length > 22 ? v.slice(0, 22) + "…" : v)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e1e2e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          formatter={(v: any) => [`${v} users`]}
        />
        <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} label={{ position: "right", fill: "#94a3b8", fontSize: 11 }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Location Chart ────────────────────────────────────────────────────────

export function LocationChart({ data }: { data: LocationStat[] }) {
  if (!data.length) return <EmptyChart message="No location data available." />;

  return (
    <ResponsiveContainer width="100%" height={Math.max(200, data.length * 42)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="location"
          width={140}
          tick={{ fill: "#e2e8f0", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: string) => (v.length > 20 ? v.slice(0, 20) + "…" : v)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e1e2e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          formatter={(v: any) => [`${v} users`]}
        />
        <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} label={{ position: "right", fill: "#94a3b8", fontSize: 11 }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Class Distribution Chart ──────────────────────────────────────────────

export function ClassChart({ data }: { data: ClassStat[] }) {
  if (!data.length) return <EmptyChart message="No education class data available." />;

  return (
    <ResponsiveContainer width="100%" height={Math.max(200, data.length * 42)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="current_class"
          width={140}
          tick={{ fill: "#e2e8f0", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: string) => (v.length > 20 ? v.slice(0, 20) + "…" : v)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e1e2e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          formatter={(v: any) => [`${v} users`]}
        />
        <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} label={{ position: "right", fill: "#94a3b8", fontSize: 11 }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="h-40 flex items-center justify-center text-slate-500 text-sm">
      {message}
    </div>
  );
}

