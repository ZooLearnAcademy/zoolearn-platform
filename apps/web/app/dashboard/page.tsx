"use client"

import { useRouter } from "next/navigation"

import { Navbar } from "@/components/navbar"
import { 
  User,
  EnvelopeSimple, 
  CalendarBlank, 
  GenderIntersex, 
  GraduationCap,
  MapPin,
  Buildings,
  Bell,
  CreditCard,
  Key,
  PencilSimple,
  Camera,
  SpinnerGap,
  GoogleLogo
} from "@phosphor-icons/react"
import { useState, useEffect } from "react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"

interface UserProfile {
  user_id: string
  full_name: string | null
  email: string | null
  avatar_url: string | null
  created_at: string
  date_of_birth?: string
  gender?: string
  current_class?: string
  institution?: string
  location?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  const [activeTab, setActiveTab] = useState("general")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // Editable form fields
  const [editName, setEditName] = useState("")
  const [editDob, setEditDob] = useState("")
  const [editGender, setEditGender] = useState("")
  const [editClass, setEditClass] = useState("")
  const [editInstitution, setEditInstitution] = useState("")
  const [editLocation, setEditLocation] = useState("")

  // Fetch the user's profile from Supabase
  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (data) {
        const profile = data as UserProfile;
        setProfile(profile)
        setEditName(profile.full_name || "")
        setEditDob(profile.date_of_birth || "")
        setEditGender(profile.gender || "")
        setEditClass(profile.current_class || "")
        setEditInstitution(profile.institution || "")
        setEditLocation(profile.location || "")
        
        if (!profile.gender || !profile.current_class || !profile.institution || !profile.location) {
          router.push("/onboarding")
          return
        }
      } else if (error) {
        // Profile might not exist yet — use auth metadata as fallback
        setProfile({
          user_id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
          email: user.email || null,
          avatar_url: null,
          created_at: user.created_at,
        })
        setEditName(user.user_metadata?.full_name || "")
      }
      setIsLoading(false)
    }
    loadProfile()
  }, [supabase])

  const handleSave = async () => {
    if (!profile) return
    setIsSaving(true)

    const { error } = await supabase
      .from("profiles")
      // @ts-ignore - Supabase type for profiles might be missing
      .update({ 
        full_name: editName,
        date_of_birth: editDob,
        gender: editGender,
        current_class: editClass,
        institution: editInstitution,
        location: editLocation
      })
      .eq("user_id", profile.user_id)

    if (!error) {
      setProfile({ 
        ...profile, 
        full_name: editName,
        date_of_birth: editDob,
        gender: editGender,
        current_class: editClass,
        institution: editInstitution,
        location: editLocation
      })
      setIsEditing(false)
    }
    setIsSaving(false)
  }

  const displayName = profile?.full_name || "User"
  const displayEmail = profile?.email || ""
  const dummyAvatar = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
  const avatarUrl = profile?.avatar_url || dummyAvatar
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "—"

  const tabs = [
    { id: "general", label: "Overview", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-[#030303] flex flex-col font-sans selection:bg-emerald-500/30">
      <Navbar />

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <SpinnerGap size={32} className="text-emerald-500 animate-spin" />
        </div>
      ) : (
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="sticky top-28">
            <h2 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 px-3">Account Dashboard</h2>
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsEditing(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                    activeTab === tab.id 
                      ? "bg-slate-200/50 dark:bg-slate-800/80 text-slate-900 dark:text-white" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:text-slate-300"
                  )}
                >
                  <tab.icon size={16} weight={activeTab === tab.id ? "fill" : "regular"} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 max-w-3xl">
          {activeTab === "general" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                    {isEditing ? "Edit Profile" : "Profile Overview"}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {isEditing ? "Update your photo and personal details here." : "View your personal details and current status."}
                  </p>
                </div>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(true)}
                    className="h-9 gap-2 text-sm font-medium bg-white dark:bg-[#0a0a0a]"
                  >
                    <PencilSimple size={16} />
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-6 py-6 border-y border-slate-200/60 dark:border-slate-800/60">
                <div className={cn("relative rounded-full border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-sm shrink-0", "w-24 h-24")}>
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{displayName}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">ZooLearn Learner</p>
                  {!isEditing && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200/50 dark:border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Active Student
                    </div>
                  )}
                  {profile?.avatar_url && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                      <GoogleLogo size={12} weight="bold" />
                      Synced from Google
                    </p>
                  )}
                </div>
              </div>

              {isEditing ? (
                /* Edit Mode: Form Fields */
                <div className="py-8 space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                      <div className="flex px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                        <User className="text-slate-400 mr-2 mt-0.5" size={16} />
                        <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                      <div className="flex px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm cursor-not-allowed opacity-70">
                        <EnvelopeSimple className="text-slate-400 mr-2 mt-0.5" size={16} />
                        <input type="email" defaultValue={displayEmail} disabled className="bg-transparent border-none outline-none text-sm w-full text-slate-600 dark:text-slate-400 cursor-not-allowed" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date of Birth</label>
                      <div className="flex px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                        <CalendarBlank className="text-slate-400 mr-2 mt-0.5" size={16} />
                        <input type="date" value={editDob} onChange={(e) => setEditDob(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gender</label>
                      <div className="flex px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                        <GenderIntersex className="text-slate-400 mr-2 mt-0.5" size={16} />
                        <select value={editGender} onChange={(e) => setEditGender(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100 appearance-none">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Class</label>
                      <div className="flex px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                        <GraduationCap className="text-slate-400 mr-2 mt-0.5" size={16} />
                        <input type="text" value={editClass} onChange={(e) => setEditClass(e.target.value)} placeholder="12th Grade - Biology" className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Institution</label>
                      <div className="flex px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                        <Buildings className="text-slate-400 mr-2 mt-0.5" size={16} />
                        <input type="text" value={editInstitution} onChange={(e) => setEditInstitution(e.target.value)} placeholder="Zoolearn Academy" className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                      <div className="flex px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                        <MapPin className="text-slate-400 mr-2 mt-0.5" size={16} />
                        <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="Chennai, India" className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                    <Button variant="outline" onClick={() => { setIsEditing(false); setEditName(displayName); }} className="text-sm font-medium bg-white dark:bg-[#0a0a0a]">Cancel</Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 text-sm font-medium px-6 shadow-sm">
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              ) : (
                /* View Mode: Description List */
                <div className="animate-in fade-in duration-300">
                  <div className="py-8">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-wider">Personal Information</h3>
                    
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                      <div>
                        <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          <User size={16} />
                          Full Name
                        </dt>
                        <dd className="text-base font-medium text-slate-900 dark:text-slate-100">{displayName}</dd>
                      </div>
                      
                      <div>
                        <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          <EnvelopeSimple size={16} />
                          Email Address
                        </dt>
                        <dd className="text-base font-medium text-slate-900 dark:text-slate-100">{displayEmail}</dd>
                      </div>

                      <div>
                        <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          <CalendarBlank size={16} />
                          Date of Birth
                        </dt>
                        <dd className="text-base font-medium text-slate-900 dark:text-slate-100">{profile?.date_of_birth || "—"}</dd>
                      </div>

                      <div>
                        <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          <GenderIntersex size={16} />
                          Gender
                        </dt>
                        <dd className="text-base font-medium text-slate-900 dark:text-slate-100">{profile?.gender || "—"}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div className="py-8 border-t border-slate-200/60 dark:border-slate-800/60">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-wider">Education Details</h3>
                    
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                      <div>
                        <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          <GraduationCap size={16} />
                          Current Class
                        </dt>
                        <dd className="text-base font-medium text-slate-900 dark:text-slate-100">{profile?.current_class || "—"}</dd>
                      </div>

                      <div>
                        <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          <Buildings size={16} />
                          Institution
                        </dt>
                        <dd className="text-base font-medium text-slate-900 dark:text-slate-100">{profile?.institution || "—"}</dd>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                          <MapPin size={16} />
                          Location
                        </dt>
                        <dd className="text-base font-medium text-slate-900 dark:text-slate-100">{profile?.location || "—"}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab !== "general" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 py-24 flex flex-col items-center justify-center text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-[#0a0a0a]/50">
              <Key size={32} className="text-slate-400 mb-4" />
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">Coming Soon</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">This section is currently under development. Please check back later.</p>
            </div>
          )}
        </div>
      </main>
      )}
    </div>
  )
}
