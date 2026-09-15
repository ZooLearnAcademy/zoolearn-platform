import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server-client"
import { DashboardClient } from "@/components/dashboard/DashboardClient"
import { Navbar } from "@/components/navbar"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Dashboard | ZooLearn",
}

export interface UserProfileData {
  userId: string
  fullName: string
  email: string
  avatarUrl: string
  dateOfBirth: string | null
  gender: string | null
  currentClass: string | null
  institution: string | null
  location: string | null
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  // Fetch full profile from the profiles table (populated by the DB trigger on signup)
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url, date_of_birth, gender, current_class, institution, location")
    .eq("user_id", user.id)
    .single()

  const p = profile as any

  const profileData: UserProfileData = {
    userId: user.id,
    fullName:
      p?.full_name ??
      user.user_metadata?.full_name ??
      user.user_metadata?.name ??
      user.email?.split("@")[0] ??
      "Student",
    email: p?.email ?? user.email ?? "",
    // Google profile pic is stored in avatar_url by the trigger; fall back to DiceBear
    avatarUrl:
      p?.avatar_url ??
      user.user_metadata?.avatar_url ??
      user.user_metadata?.picture ??
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email ?? user.id)}&backgroundColor=e2e8f0`,
    dateOfBirth: p?.date_of_birth ?? null,
    gender: p?.gender ?? null,
    currentClass: p?.current_class ?? null,
    institution: p?.institution ?? null,
    location: p?.location ?? null,
  }

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-[#030303] flex flex-col font-sans selection:bg-emerald-500/30">
      <Navbar />
      <DashboardClient profile={profileData} />
    </div>
  )
}
