"use client";

import React, { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GoogleLogo,
  Eye,
  EyeSlash,
  CheckCircle,
  EnvelopeSimple,
  X,
  ArrowLeft,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInAction,
  signUpAction,
  forgotPasswordAction,
  googleSignInAction,
} from "@/app/actions/auth";

type AuthMode = "login" | "signup" | "forgot";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  // Password Strength Logic
  const [strength, setStrength] = useState({ score: 0, text: "" });

  useEffect(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let text = "Weak";
    if (score === 2) text = "Fair";
    if (score === 3) text = "Good";
    if (score === 4) text = "Strong";

    if (password.length === 0) {
      score = 0;
      text = "";
    }

    setStrength({ score, text });
  }, [password]);

  // Show URL-based auth errors (e.g. from callback failures)
  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError === "auth_callback_error") {
      setErrorMsg("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMsg("");
    setIsSuccess(false);
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    startTransition(async () => {
      try {
        if (mode === "forgot") {
          const result = await forgotPasswordAction(email);
          if (!result.success) {
            setErrorMsg(result.error ?? "Failed to send reset email.");
          } else {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
              switchMode("login");
            }, 5000);
          }
          return;
        }

        if (mode === "signup") {
          const result = await signUpAction(email, password, name);
          if (!result.success) {
            setErrorMsg(result.error ?? "Sign up failed.");
          } else {
            setSignupEmail(result.email ?? email);
            setShowEmailPopup(true);
          }
          return;
        }

        if (mode === "login") {
          const result = await signInAction(email, password);
          if (!result.success) {
            setErrorMsg(result.error ?? "Sign in failed.");
          } else {
            setIsSuccess(true);
            setTimeout(() => router.push("/dashboard"), 1000);
          }
          return;
        }
      } catch {
        setErrorMsg("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      const result = await googleSignInAction();
      if (!result.success || !result.redirectUrl) {
        setErrorMsg(result.error ?? "Google sign-in failed.");
        return;
      }
      // Redirect to the OAuth provider URL returned by the server
      window.location.href = result.redirectUrl;
    });
  };

  const strengthColors = ["bg-muted", "bg-destructive", "bg-warning", "bg-yellow-500", "bg-green-500"];

  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Header & Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center justify-center mb-6">
            <div className="dark:bg-white/5 dark:p-3 dark:rounded-2xl dark:backdrop-blur-md transition-all">
              <img 
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png" 
                alt="ZooLearn Logo" 
                className="h-14 w-auto object-contain drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {mode === "forgot"
              ? "Reset Password"
              : mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "forgot"
              ? "Enter your email and we'll send you a reset link"
              : mode === "login" 
              ? "Enter your credentials to access your account" 
              : "Sign up to start exploring the animal kingdom"}
          </p>
        </div>

        {/* Custom Animated Tabs */}
        {mode !== "forgot" ? (
          <div className="relative flex p-1 bg-muted/50 dark:bg-muted/20 rounded-xl backdrop-blur-sm border border-border/40">
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                onClick={() => switchMode(tab as AuthMode)}
                className={`relative flex-1 py-2.5 text-sm font-semibold capitalize rounded-lg transition-colors ${
                  mode === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {mode === tab && (
                  <motion.div
                    layoutId="auth-tab"
                    className="absolute inset-0 bg-background dark:bg-muted/50 rounded-lg shadow-sm border border-border/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center w-full py-2 bg-muted/20 hover:bg-muted/50 rounded-lg border border-transparent hover:border-border/50"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Login
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="popLayout">
            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 origin-top"
              >
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={mode === "signup"}
                  className="h-12 bg-background/50 backdrop-blur-sm"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Email address</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-background/50 backdrop-blur-sm"
            />
          </div>

          {mode !== "forgot" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none">Password</label>
                {mode === "login" && (
                  <button type="button" onClick={() => switchMode("forgot")} className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </button>
                )}
              </div>
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
              
              {/* Password Strength Indicator for Signup */}
              <AnimatePresence>
                {mode === "signup" && password.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="pt-2 space-y-2"
                  >
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div 
                          key={level} 
                          className={`h-full flex-1 rounded-full transition-colors duration-500 ${
                            level <= strength.score ? strengthColors[strength.score] : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Password strength:</span>
                      <span className={`font-semibold ${strength.score === 4 ? "text-green-500" : "text-foreground"}`}>
                        {strength.text}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {errorMsg && (
            <div className="text-destructive text-sm font-medium text-center">{errorMsg}</div>
          )}

          <Button
            type="submit"
            disabled={isLoading || isPending || isSuccess}
            className="w-full h-12 text-base font-semibold transition-all group overflow-hidden relative"
          >
            {isLoading || isPending ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : isSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-2 text-green-400"
              >
                <CheckCircle size={20} weight="bold" />
                <span>{mode === "signup" ? "Account created!" : mode === "forgot" ? "Reset link sent!" : "Success!"}</span>
              </motion.div>
            ) : (
              <span className="relative z-10 flex items-center">
                {mode === "forgot" ? (
                  <>
                    <PaperPlaneTilt size={18} className="mr-2" />
                    Send Reset Link
                  </>
                ) : mode === "login" ? "Sign In" : "Create Account"}
              </span>
            )}
            
            {/* Button Hover effect */}
            <div className="absolute inset-0 h-full w-full bg-primary/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
          </Button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-1 border-t border-border" />
          <span className="px-4 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Or continue with
          </span>
          <div className="flex-1 border-t border-border" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleSignIn}
            className="h-12 bg-background/50 hover:bg-muted transition-colors"
          >
            <GoogleLogo size={20} className="mr-2" weight="bold" />
            Google
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {/* Email Verification Popup */}
      <AnimatePresence>
        {showEmailPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => { setShowEmailPopup(false); switchMode("login"); }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              className="relative bg-background rounded-2xl shadow-2xl border border-border p-8 max-w-md w-full text-center space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowEmailPopup(false); switchMode("login"); }}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ y: -10 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center"
              >
                <EnvelopeSimple size={40} weight="duotone" className="text-emerald-500" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">Check your email!</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We&apos;ve sent a confirmation link to
                </p>
                <p className="text-sm font-semibold text-foreground bg-muted/50 rounded-lg py-2 px-4 inline-block">
                  {signupEmail}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Please click the link in your email to verify your account, then come back and log in.
                </p>
              </div>

              <Button
                onClick={() => { setShowEmailPopup(false); switchMode("login"); }}
                className="w-full h-11 font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
              >
                Got it, take me to Login
              </Button>

              <p className="text-xs text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
