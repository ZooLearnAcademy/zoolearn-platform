"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  CalendarBlank,
  GenderIntersex,
  GraduationCap,
  Buildings,
  MapPin,
  CheckCircle,
  SpinnerGap
} from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [institution, setInstitution] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function checkProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("date_of_birth, gender, current_class, institution, location")
        .eq("user_id", user.id)
        .single();

      if (data) {
        const profile = data as any;
        // If they already have all required fields filled, redirect to dashboard
        if (profile.gender && profile.current_class && profile.institution && profile.location) {
          router.push("/dashboard");
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    checkProfile();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setErrorMsg("You must be logged in.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      // @ts-ignore - Supabase type for profiles might be missing
      .update({
        date_of_birth: dateOfBirth,
        gender,
        current_class: currentClass,
        institution,
        location,
      })
      .eq("user_id", user.id);

    if (error) {
      setErrorMsg(error.message);
      setIsSaving(false);
    } else {
      router.push("/dashboard");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/30 dark:bg-[#030303] flex items-center justify-center">
        <SpinnerGap size={32} className="text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-[#030303] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8"
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
            <User size={32} weight="duotone" className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Complete Your Profile</h1>
          <p className="text-sm text-slate-500 mt-2">
            Tell us a bit more about yourself to personalize your learning experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date of Birth</label>
              <div className="relative">
                <CalendarBlank className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="pl-10 h-11 bg-slate-50 dark:bg-slate-900/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gender</label>
              <div className="relative">
                <GenderIntersex className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-10 h-11 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-emerald-500 appearance-none"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Class / Grade</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                type="text"
                placeholder="e.g. 12th Grade - Biology"
                required
                value={currentClass}
                onChange={(e) => setCurrentClass(e.target.value)}
                className="pl-10 h-11 bg-slate-50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Institution</label>
            <div className="relative">
              <Buildings className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                type="text"
                placeholder="e.g. Zoolearn Academy"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="pl-10 h-11 bg-slate-50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                type="text"
                placeholder="e.g. Chennai, India"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-11 bg-slate-50 dark:bg-slate-900/50"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-500/10 p-3 rounded-md">
              {errorMsg}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSaving}
            className="w-full h-12 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <SpinnerGap size={20} className="animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Complete Profile</span>
                <CheckCircle size={20} weight="bold" />
              </div>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
