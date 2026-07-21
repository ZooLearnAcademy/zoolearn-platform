"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleLogo, AppleLogo, Eye, EyeSlash, CheckCircle } from "@phosphor-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { signIn } from "next-auth/react";

type AuthMode = "login" | "signup";

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password Strength Logic
  const [strength, setStrength] = useState({ score: 0, text: "Weak" });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated Backend Call
    console.log("Submitting credentials to backend:", {
      action: mode,
      payload: {
        name: mode === "signup" ? name : undefined,
        email,
        password,
      }
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSuccess(true);

    // Reset success state after a while
    setTimeout(() => {
      setIsSuccess(false);
      if (mode === "signup") setMode("login");
      setPassword("");
    }, 3000);
  };

  const strengthColors = ["bg-muted", "bg-destructive", "bg-warning", "bg-yellow-500", "bg-green-500"];
  const currentStrengthColor = password.length > 0 ? strengthColors[strength.score] : "bg-muted";

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Header & Logo */}
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="flex items-center justify-center mb-6">
          <img 
            src="https://res.cloudinary.com/duibfmcw1/image/upload/v1765947727/logopng_2_webaac.png" 
            alt="ZooLearn Logo" 
            className="h-14 w-auto object-contain drop-shadow-md" 
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : "Sign up to start exploring the animal kingdom"}
        </p>
      </div>

      {/* Custom Animated Tabs */}
      <div className="relative flex p-1 bg-muted/50 rounded-xl backdrop-blur-sm">
        {["login", "signup"].map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab as AuthMode)}
            className={`relative flex-1 py-2 text-sm font-semibold capitalize rounded-lg transition-colors ${
              mode === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
            }`}
          >
            {mode === tab && (
              <motion.div
                layoutId="auth-tab"
                className="absolute inset-0 bg-background rounded-lg shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none">Password</label>
            {mode === "login" && (
              <a href="#" className="text-xs text-primary hover:underline font-medium">
                Forgot password?
              </a>
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

        <Button 
          type="submit" 
          disabled={isLoading || isSuccess}
          className="w-full h-12 text-base font-semibold transition-all group overflow-hidden relative"
        >
          {isLoading ? (
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
              <span>Success!</span>
            </motion.div>
          ) : (
            <span className="relative z-10 flex items-center">
              {mode === "login" ? "Sign In" : "Create Account"}
            </span>
          )}
          
          {/* Button Hover effect */}
          <div className="absolute inset-0 h-full w-full bg-primary/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
        </Button>
      </form>

      <div className="relative flex items-center py-2">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-4 text-xs text-muted-foreground uppercase tracking-wider font-semibold">Or continue with</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="h-12 bg-background/50 hover:bg-muted transition-colors"
        >
          <GoogleLogo size={20} className="mr-2" weight="bold" />
          Google
        </Button>
        <Button variant="outline" type="button" className="h-12 bg-background/50 hover:bg-muted transition-colors">
          <AppleLogo size={20} className="mr-2" weight="fill" />
          Apple
        </Button>
      </div>
      
      <p className="text-center text-xs text-muted-foreground mt-8">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary transition-colors">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary transition-colors">Privacy Policy</a>.
      </p>
    </div>
  );
}
