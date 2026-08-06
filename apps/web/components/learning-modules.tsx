"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, MagnifyingGlass, ProjectorScreenChart, GlobeHemisphereWest, GitBranch } from "@phosphor-icons/react";
import Link from "next/link";
import learningModulesData from "../data/learning-modules.json";

export interface LearningModule {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

const getIcon = (name: string) => {
  switch (name) {
    case "magnifying-glass": return <MagnifyingGlass className="w-8 h-8 text-primary" weight="duotone" />;
    case "projector": return <ProjectorScreenChart className="w-8 h-8 text-primary" weight="duotone" />;
    case "globe": return <GlobeHemisphereWest className="w-8 h-8 text-primary" weight="duotone" />;
    default: return <GitBranch className="w-8 h-8 text-primary" weight="duotone" />;
  }
};

function LearningCard({ mod, index }: { mod: LearningModule, index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  const paddedNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link 
        href={mod.link}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative flex flex-col justify-between p-[clamp(1.5rem,3vw,2.5rem)] rounded-[2rem] bg-card border border-border/40 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden cursor-pointer h-full block"
      >
        {/* Spotlight Effect */}
        <div 
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-700 group-hover:opacity-100 z-10"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.12), transparent 40%)`
          }}
        />
        
        {/* Background watermark number */}
        <div className="absolute -bottom-6 -right-4 text-[clamp(6rem,12vw,10rem)] font-black text-muted/15 z-0 select-none group-hover:scale-110 transition-transform duration-700 group-hover:text-primary/10 pointer-events-none leading-none">
          {paddedNumber}
        </div>

        <div className="relative z-20 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors duration-500 shadow-inner">
              <div className="transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out">
                {getIcon(mod.icon)}
              </div>
            </div>
            
            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border/50 bg-background/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-lg">
              <ArrowUpRight className="w-5 h-5 text-primary" weight="bold" />
            </div>
          </div>
          
          <div className="space-y-4 mt-auto">
            <div className="inline-block px-3 py-1 rounded-full border border-border/50 bg-muted/30 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
              Module {paddedNumber}
            </div>
            <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-500">
              {mod.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-[clamp(0.875rem,1.1vw,1.05rem)]">
              {mod.description}
            </p>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-in-out z-20" />
      </Link>
    </motion.div>
  );
}

export function LearningModules({ modules = learningModulesData as LearningModule[] }: { modules?: LearningModule[] }) {
  return (
    <section className="relative w-full py-[clamp(4rem,8vw,8rem)] bg-background border-t border-border/40 overflow-hidden">
      {/* Premium Dark Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Radial Gradient for central glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-[clamp(2.5rem,5vw,5rem)]">
          <div className="flex flex-col space-y-4 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2"
            >
              <span className="h-px w-8 bg-primary"></span>
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary uppercase">
                Learning Modules
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(1.875rem,4vw,3.5rem)] font-extrabold tracking-tight text-foreground leading-[1.15]"
            >
              Master the concepts, <br />
              <span className="text-muted-foreground font-light">understand the animal.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:max-w-sm"
          >
            <p className="text-[clamp(0.95rem,1.2vw,1.125rem)] text-muted-foreground border-l-2 border-primary/30 pl-4">
              We&apos;ve distilled complex biological structures into highly visual, easy-to-digest learning modules designed for absolute clarity.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {modules.map((mod, idx) => (
            <LearningCard key={mod.id} mod={mod} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
