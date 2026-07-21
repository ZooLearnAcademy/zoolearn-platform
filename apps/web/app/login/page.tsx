import React from "react";
import { AuthForm } from "@/components/auth-form";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-background flex relative">

      {/* Left Column: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative border-r border-border/40">
        


        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-24 py-12">
          <AuthForm />
        </div>
      </div>

      {/* Right Column: Lottie Animation (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-muted/20 items-center justify-center overflow-hidden">
        {/* Background Grid for industrial premium look */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Spotlights */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

        {/* Lottie Animation Wrapper */}
        <div className="relative z-10 w-full max-w-[600px] aspect-square flex flex-col items-center justify-center">
          <iframe 
            src="https://lottie.host/embed/c47676c7-aa08-41ca-ab22-bdca338db435/Pw978ONH5Z.lottie" 
            className="w-full h-full border-none pointer-events-none drop-shadow-2xl"
            title="Dinosaur Animation"
          ></iframe>
          
        </div>
      </div>
    </div>
  );
}
