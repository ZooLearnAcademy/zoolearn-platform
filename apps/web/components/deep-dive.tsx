"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import deepDiveData from "../data/deep-dive-organisms.json";
import { ArrowRight, Info, Sparkle, Microscope } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import { organismsAtom, isOrganismsLoadingAtom } from "../store/deepDiveStore";

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@workspace/ui/components/tooltip";

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
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 18 },
  },
};

const cardAccents = [
  "from-emerald-500/15 via-teal-500/5",
  "from-teal-500/12 via-cyan-500/5",
  "from-cyan-500/15 via-emerald-500/5",
  "from-green-500/12 via-teal-500/8",
  "from-emerald-400/18 via-green-500/5",
  "from-teal-400/15 via-emerald-400/8",
];

function OrganismCard({ org, index }: { org: Organism; index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      className="h-full"
      whileHover={{
        y: -10,
        transition: { type: "spring" as const, stiffness: 280, damping: 22 },
      }}
    >
      <Link href={org.link} className="block h-full group">
        <Card className="relative h-full overflow-hidden border-border/50 bg-card/90 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:shadow-primary/8 transition-all duration-500 rounded-[1.5rem] cursor-pointer">
          {/* Bottom gradient aura — visual depth */}
          <div
            className={`absolute bottom-0 inset-x-0 h-3/4 bg-gradient-to-t ${cardAccents[index % cardAccents.length]} to-transparent opacity-30 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none`}
          />

          <CardHeader className="relative z-10 pb-3">
            {/* Top accent line + category badges */}
            <div className="flex items-center justify-between mb-4">
              <Separator className="flex-1 mr-3 bg-gradient-to-r from-border/20 via-border/60 to-transparent h-px" />
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge
                  variant="success"
                  className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                >
                  {org.categoryType}
                </Badge>
                <Badge
                  variant="category"
                  className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                >
                  {org.category}
                </Badge>
              </div>
            </div>

            {/* Animated icon container */}
            <div className="w-14 h-14 rounded-2xl bg-background/60 border border-border/50 shadow-sm flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg group-hover:border-primary/30 transition-all duration-500">
              <span className="group-hover:drop-shadow-md transition-all duration-500">
                {org.icon}
              </span>
            </div>

            {/* Title + Scientific Name */}
            <CardTitle className="text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              {org.name}
            </CardTitle>
            <CardDescription className="text-[13px] text-muted-foreground/70 italic font-serif mt-0.5">
              {org.scientificName}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 pb-4">
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Explore the detailed anatomy, biological structure, and functions
              of the {org.name.toLowerCase()}.
            </p>
          </CardContent>

          <Separator className="mx-6 bg-border/40" />

          <CardFooter className="relative z-10 pt-4 pb-5 flex items-center justify-between">
            {/* Info tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className="flex items-center gap-1.5 text-[11px] font-bold text-foreground/50 group-hover:text-foreground transition-colors duration-300 cursor-help"
                >
                  Know more
                  <Info className="w-4 h-4" weight="duotone" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Deep dive into {org.name} anatomy, physiology &amp;
                    classification
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* CTA Button */}
            <Button
              size="sm"
              className="rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-[0.15em] uppercase shadow-sm shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 px-5 py-2.5 h-auto group/btn"
            >
              <span className="flex items-center gap-1.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5">
                START NOW
                <ArrowRight
                  className="w-3.5 h-3.5 opacity-0 group-hover/btn:opacity-100 transition-all duration-300"
                  weight="bold"
                />
              </span>
            </Button>
          </CardFooter>
        </Card>
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
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="success"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Master Key Organisms
            </Badge>
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
            Examine the detailed anatomy and physiology of crucial species
            through our interactive platform.
          </motion.p>
        </div>

        {/* Organism Cards Grid — ALL expanded, no collapsing */}
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
