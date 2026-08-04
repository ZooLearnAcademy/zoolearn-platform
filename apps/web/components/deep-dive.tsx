"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import deepDiveData from "../data/deep-dive-organisms.json";
import { Info, ArrowRight } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import { organismsAtom, isOrganismsLoadingAtom } from "../store/deepDiveStore";

export interface Organism {
  id: string;
  name: string;
  scientificName: string;
  categoryType: string;
  category: string;
  icon: string;
  link: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  }
};

const cardGradients = [
  "from-primary/15 via-primary/5 to-transparent",
  "from-muted-foreground/10 via-muted/10 to-transparent",
  "from-primary/10 via-primary/5 to-transparent",
  "from-muted-foreground/15 via-muted/5 to-transparent",
  "from-primary/20 via-muted/10 to-transparent",
  "from-muted/20 via-primary/5 to-transparent"
];

function OrganismCard({ org, index }: { org: Organism; index: number }) {
  return (
    <motion.div 
      variants={cardVariants} 
      className="h-full"
      whileHover={{ y: -8, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
    >
      <Link 
        href={org.link}
        className="group relative flex flex-col p-5 rounded-[1.5rem] bg-card/80 backdrop-blur-sm border border-border/60 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full overflow-hidden"
      >
        {/* The bottom mesh-like gradient using theme colors */}
        <div 
          className={`absolute bottom-0 inset-x-0 h-3/4 bg-gradient-to-t ${cardGradients[index % cardGradients.length]} opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} 
        />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Top line & label */}
          <div className="flex items-center justify-between mb-5">
             <div className="h-[1px] bg-gradient-to-r from-border/20 via-border/80 to-transparent flex-1 mr-4" />
             <span className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
               {org.category}
             </span>
          </div>

          {/* Icon Container */}
          <div className="w-12 h-12 rounded-2xl bg-background/50 border border-border/50 shadow-sm flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-md transition-all duration-500">
            <span className=" group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-sm">{org.icon}</span>
          </div>

          {/* Title Area */}
          <div className="mb-3">
            <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              {org.name}
            </h3>
            {/* Scientific Name directly under Name */}
            <p className="text-[13px] text-muted-foreground/70 italic font-serif mt-0.5">
              {org.scientificName}
            </p>
          </div>
          
          {/* Desc - Smaller font size */}
          <p className="text-xs text-muted-foreground mb-6 leading-relaxed font-medium">
            Explore the detailed anatomy, biological structure, and functions of the {org.name.toLowerCase()}.
          </p>

          {/* Bottom row */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/40">
             <div className="flex items-center gap-1.5 text-[11px] font-bold text-foreground/50 group-hover:text-foreground transition-colors duration-300">
                Know more 
                <Info className="w-4 h-4" weight="duotone" />
             </div>

             <div className="group/btn relative px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-[0.15em] shadow-sm shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center">
               <span className="relative z-10 flex items-center gap-1.5 transition-transform duration-300 group-hover/btn:-translate-x-1">
                 START NOW
                 <ArrowRight className="w-3.5 h-3.5 opacity-0 absolute -right-5 group-hover/btn:opacity-100 group-hover/btn:-right-4 transition-all duration-300" weight="bold" />
               </span>
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function DeepDive() {
  const [organisms, setOrganisms] = useAtom(organismsAtom);
  const [isLoading, setIsLoading] = useAtom(isOrganismsLoadingAtom);
  
  /* ==============================================================
     BACKEND INTEGRATION READY (COMMENTED OUT FOR NOW)
     Uncomment this block when your backend API is ready to serve the data.
     
     React.useEffect(() => {
       const fetchOrganisms = async () => {
         setIsLoading(true);
         try {
           const response = await fetch('/api/organisms'); // Replace with your actual backend route
           if (!response.ok) throw new Error('Network response was not ok');
           const data = await response.json();
           setOrganisms(data);
         } catch (error) {
           console.error("Error fetching organisms data:", error);
         } finally {
           setIsLoading(false);
         }
       };
       
       fetchOrganisms();
     }, [setOrganisms, setIsLoading]);
     
     // if (isLoading) return <div className="py-24 text-center text-muted-foreground font-medium">Loading organisms...</div>;
  ============================================================== */

  return (
    <section className="relative w-full py-24 bg-background overflow-hidden border-t border-border/30">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-50" />

      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="mb-16 flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              Master Key Organisms
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Deep Dive
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-muted-foreground max-w-2xl font-medium"
          >
            Examine the detailed anatomy and physiology of crucial species through our interactive platform.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {organisms.map((org, idx) => (
            <OrganismCard key={org.id} org={org} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
