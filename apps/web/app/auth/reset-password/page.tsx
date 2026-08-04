"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeSlash, CheckCircle, ShieldCheck, LockKey } from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [strength, setStrength] = useState({ score: 0, text: "", color: "" });

  // ── Password strength ─────────────────────────────────────────────────
  useEffect(() => {
    if (password.length === 0) {
      setStrength({ score: 0, text: "", color: "" });
      return;
    }
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const map: { text: string; color: string }[] = [
      { text: "Weak", color: "bg-destructive" },
      { text: "Weak", color: "bg-destructive" },
      { text: "Fair", color: "bg-yellow-500" },
      { text: "Good", color: "bg-blue-500" },
      { text: "Strong", color: "bg-green-500" },
    ];
    const entry = map[score] ?? map[0]!;
    setStrength({ score, text: entry.text, color: entry.color });
  }, [password]);

  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordsMismatch) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (strength.score < 2) {
      setErrorMsg("Please choose a stronger password.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setIsSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const strengthBarColors = ["bg-muted", "bg-destructive", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className="min-h-screen w-full bg-background flex">
      {/* Left Column: Reset Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative border-r border-border/40">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-24 py-12">
          <div className="w-full max-w-md mx-auto space-y-8">

            {/* Logo */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png"
                  alt="ZooLearn Logo"
                  className="h-14 w-auto object-contain drop-shadow-md"
                />
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="header-normal"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-1"
                  >
                    {/* Icon */}
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                      <LockKey size={30} weight="duotone" className="text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Choose a new password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Make it strong — you&apos;re almost back in.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="header-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-1"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                      className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4"
                    >
                      <ShieldCheck size={30} weight="duotone" className="text-emerald-500" />
                    </motion.div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Password updated!
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Redirecting you to login in a moment...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="reset-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">New password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-background/50 backdrop-blur-sm pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {/* Password strength bars */}
                    <AnimatePresence>
                      {password.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="pt-1 space-y-2"
                        >
                          <div className="flex gap-1 h-1.5">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className={`h-full flex-1 rounded-full transition-all duration-500 ${
                                  level <= strength.score ? strengthBarColors[strength.score] : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">
                              Min. 8 characters, mixed case, numbers & symbols
                            </span>
                            {strength.text && (
                              <span className={`font-semibold ${strength.score === 4 ? "text-green-500" : "text-foreground"}`}>
                                {strength.text}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Confirm new password</label>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={`h-12 bg-background/50 backdrop-blur-sm pr-10 transition-colors ${
                          passwordsMismatch
                            ? "border-destructive focus-visible:ring-destructive"
                            : passwordsMatch
                            ? "border-green-500 focus-visible:ring-green-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirm ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {confirmPassword.length > 0 && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`text-xs font-medium flex items-center gap-1.5 ${
                            passwordsMatch ? "text-green-500" : "text-destructive"
                          }`}
                        >
                          <CheckCircle size={14} weight={passwordsMatch ? "fill" : "regular"} />
                          {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {errorMsg && (
                    <div className="text-destructive text-sm font-medium text-center">{errorMsg}</div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || !passwordsMatch || strength.score < 2}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Updating password...</span>
                      </div>
                    ) : (
                      "Update password"
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Remembered your password?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Back to login
                    </Link>
                  </p>
                </motion.form>
              ) : (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Your password has been updated successfully. You can now log in with your new password.
                  </p>
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full h-11 font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
                  >
                    Go to Login
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* Right Column: Visual (matches login page) */}
      <div className="hidden lg:flex flex-1 relative bg-muted/20 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-teal-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-8 text-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <ShieldCheck size={48} weight="duotone" className="text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Stay secure.</h2>
            <p className="text-muted-foreground max-w-xs text-base leading-relaxed">
              Use a strong, unique password that you don&apos;t use on other sites. We recommend at least 12 characters with a mix of letters, numbers, and symbols.
            </p>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-3 text-left w-full max-w-xs"
          >
            {[
              "Never reuse passwords across sites",
              "Consider using a password manager",
              "Enable two-factor auth for extra security",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                {tip}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
