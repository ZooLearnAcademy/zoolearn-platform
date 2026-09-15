"use client"

import {
  User, EnvelopeSimple, CalendarBlank, GenderIntersex,
  GraduationCap, Buildings, MapPin, Bell, CreditCard,
  Key, PencilSimple, Camera, CheckCircle, Warning,
  SpinnerGap
} from "@phosphor-icons/react"
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import type { UserProfileData } from "@/app/dashboard/page"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"

interface Props {
  profile: UserProfileData
}

export function DashboardClient({ profile: initial }: Props) {
  const [activeTab, setActiveTab] = useState("general")
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [saveOk, setSaveOk] = useState(false)

  // Editable fields
  const [fullName, setFullName] = useState(initial.fullName)
  const [dateOfBirth, setDateOfBirth] = useState(initial.dateOfBirth ?? "")
  const [gender, setGender] = useState(initial.gender ?? "")
  const [currentClass, setCurrentClass] = useState(initial.currentClass ?? "")
  const [institution, setInstitution] = useState(initial.institution ?? "")
  const [location, setLocation] = useState(initial.location ?? "")

  const tabs = [
    { id: "general", label: "Overview", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  const inputClass = "flex px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all"

  const handleSave = async () => {
    setSaving(true)
    setSaveError("")
    setSaveOk(false)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabase = getSupabaseBrowserClient() as any
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName || null,
          date_of_birth: dateOfBirth || null,
          gender: gender || null,
          current_class: currentClass || null,
          institution: institution || null,
          location: location || null,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", initial.userId)

      if (error) throw new Error(error.message)
      setSaveOk(true)
      setIsEditing(false)
    } catch (e: any) {
      setSaveError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const cancelEdit = () => {
    setFullName(initial.fullName)
    setDateOfBirth(initial.dateOfBirth ?? "")
    setGender(initial.gender ?? "")
    setCurrentClass(initial.currentClass ?? "")
    setInstitution(initial.institution ?? "")
    setLocation(initial.location ?? "")
    setIsEditing(false)
    setSaveError("")
  }

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-16">

      {/* Sidebar */}
      <aside className="w-full md:w-56 shrink-0">
        <div className="sticky top-28">
          <h2 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 px-3">Account</h2>
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsEditing(false) }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                )}
              >
                <tab.icon size={18} className={activeTab === tab.id ? "text-emerald-500" : "text-slate-400 dark:text-slate-500"} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {activeTab === "general" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">

              {/* Card Header */}
              <div className="px-6 pt-6 pb-5 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60">
                <div>
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white">My Profile</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Your account information from ZooLearn</p>
                </div>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}
                    className="h-9 gap-2 text-sm font-medium bg-white dark:bg-[#0a0a0a]"
                  >
                    <PencilSimple size={16} />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="p-6 space-y-6">

                {/* Feedback */}
                {saveOk && (
                  <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm rounded-xl px-4 py-3">
                    <CheckCircle size={16} weight="fill" />
                    Profile updated successfully.
                  </div>
                )}
                {saveError && (
                  <div className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm rounded-xl px-4 py-3">
                    <Warning size={16} weight="fill" />
                    {saveError}
                  </div>
                )}

                {/* Avatar + Name */}
                <div className="flex items-center gap-6 py-5 border-y border-slate-200/60 dark:border-slate-800/60">
                  <div className={cn("relative rounded-full border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm shrink-0", isEditing ? "w-20 h-20 group cursor-pointer" : "w-24 h-24")}>
                    <img src={initial.avatarUrl} alt={fullName} className={cn("w-full h-full object-cover", isEditing && "group-hover:opacity-70 transition-opacity")} referrerPolicy="no-referrer" />
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <Camera size={20} className="text-white drop-shadow-md" weight="fill" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{fullName || "—"}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{initial.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200/50 dark:border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active Student
                    </div>
                  </div>
                </div>

                {isEditing ? (
                  /* ── Edit Mode ── */
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Email cannot be changed here. Contact support to update your email.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                        <div className={inputClass}>
                          <User className="text-slate-400 mr-2 mt-0.5 shrink-0" size={16} />
                          <input value={fullName} onChange={(e) => setFullName(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email <span className="text-slate-400 font-normal">(read-only)</span></label>
                        <div className={cn(inputClass, "opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-900")}>
                          <EnvelopeSimple className="text-slate-400 mr-2 mt-0.5 shrink-0" size={16} />
                          <input value={initial.email} disabled className="bg-transparent border-none outline-none text-sm w-full text-slate-600 dark:text-slate-400 cursor-not-allowed" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date of Birth</label>
                        <div className={inputClass}>
                          <CalendarBlank className="text-slate-400 mr-2 mt-0.5 shrink-0" size={16} />
                          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gender</label>
                        <div className={inputClass}>
                          <GenderIntersex className="text-slate-400 mr-2 mt-0.5 shrink-0" size={16} />
                          <select value={gender} onChange={(e) => setGender(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100 appearance-none"
                          >
                            <option value="">Select…</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not">Prefer not to say</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Class / Grade</label>
                        <div className={inputClass}>
                          <GraduationCap className="text-slate-400 mr-2 mt-0.5 shrink-0" size={16} />
                          <input value={currentClass} onChange={(e) => setCurrentClass(e.target.value)}
                            placeholder="e.g. 12th Grade - Biology"
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100 placeholder-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Institution</label>
                        <div className={inputClass}>
                          <Buildings className="text-slate-400 mr-2 mt-0.5 shrink-0" size={16} />
                          <input value={institution} onChange={(e) => setInstitution(e.target.value)}
                            placeholder="e.g. Zoolearn Academy"
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100 placeholder-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                        <div className={inputClass}>
                          <MapPin className="text-slate-400 mr-2 mt-0.5 shrink-0" size={16} />
                          <input value={location} onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Chennai, India"
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-slate-100 placeholder-slate-400" />
                        </div>
                      </div>

                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                      <Button variant="outline" onClick={cancelEdit} className="text-sm font-medium bg-white dark:bg-[#0a0a0a]">Cancel</Button>
                      <Button onClick={handleSave} disabled={saving}
                        className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 text-sm font-medium px-6 shadow-sm gap-2"
                      >
                        {saving && <SpinnerGap size={14} className="animate-spin" />}
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* ── View Mode ── */
                  <div className="animate-in fade-in duration-300 space-y-8">

                    <div>
                      <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-5">Personal Information</h3>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        {[
                          { icon: User, label: "Full Name", value: fullName },
                          { icon: EnvelopeSimple, label: "Email Address", value: initial.email },
                          { icon: CalendarBlank, label: "Date of Birth", value: initial.dateOfBirth ? new Date(initial.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : null },
                          { icon: GenderIntersex, label: "Gender", value: initial.gender ? initial.gender.charAt(0).toUpperCase() + initial.gender.slice(1).replace("_", " ") : null },
                        ].map(({ icon: Icon, label, value }) => (
                          <div key={label}>
                            <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                              <Icon size={15} />
                              {label}
                            </dt>
                            <dd className="text-base font-medium text-slate-900 dark:text-slate-100">
                              {value ?? <span className="text-slate-400 dark:text-slate-600 text-sm italic">Not set</span>}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-5">Education</h3>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        {[
                          { icon: GraduationCap, label: "Current Class", value: initial.currentClass },
                          { icon: Buildings, label: "Institution", value: initial.institution },
                          { icon: MapPin, label: "Location", value: initial.location, span: true },
                        ].map(({ icon: Icon, label, value, span }) => (
                          <div key={label} className={span ? "sm:col-span-2" : ""}>
                            <dt className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                              <Icon size={15} />
                              {label}
                            </dt>
                            <dd className="text-base font-medium text-slate-900 dark:text-slate-100">
                              {value ?? <span className="text-slate-400 dark:text-slate-600 text-sm italic">Not set</span>}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab !== "general" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 py-24 flex flex-col items-center justify-center text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-[#0a0a0a]/50">
            <Key size={32} className="text-slate-400 mb-4" />
            <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">Coming Soon</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">This section is currently under development.</p>
          </div>
        )}
      </div>
    </main>
  )
}
