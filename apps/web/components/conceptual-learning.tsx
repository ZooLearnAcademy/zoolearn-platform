"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Leaf,
  Microscope,
  ArrowUpRight,
  Atom,
  Exam,
  BookOpenText,
  Flask,
  Dna,
  GraduationCap,
  PawPrint,
  ListMagnifyingGlass,
  TreeStructure,
} from "@phosphor-icons/react";

/* ─── Animation Variants ──────────────────────────────────── */

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Data ────────────────────────────────────────────────── */

interface ConceptSection {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
  }[];
}

const sections: ConceptSection[] = [
  {
    title: "NCERT Chapters",
    subtitle: "Core curriculum concepts with interactive visuals",
    icon: <BookOpenText size={24} weight="duotone" className="text-emerald-500" />,
    items: [
      {
        title: "The Living World",
        description:
          "Biodiversity, Identification, Binomial Nomenclature, Taxonomic Hierarchy, and Taxonomical Aids.",
        href: "/living-world",
        icon: <Leaf size={20} weight="duotone" className="text-emerald-500" />,
        badge: "Chapter 1",
      },
      {
        title: "Structural Organisation in Animals",
        description:
          "Epithelial, Connective, Muscular, and Neural tissues with comparative tables and visual aids.",
        href: "/structural-organisation-in-animals",
        icon: <Microscope size={20} weight="duotone" className="text-violet-500" />,
        badge: "Chapter 7",
      },
    ],
  },
  {
    title: "Curriculum Modules",
    subtitle: "Grade-specific and exam-focused structured learning paths",
    icon: <GraduationCap size={24} weight="duotone" className="text-blue-500" />,
    items: [
      {
        title: "11th Standard Biology",
        description:
          "Foundational biology curriculum — cell biology, plant anatomy, animal physiology, and diversity.",
        href: "/modules/11th",
        icon: <Flask size={20} weight="duotone" className="text-blue-500" />,
        badge: "Grade 11",
      },
      {
        title: "12th Standard Biology",
        description:
          "Advanced genetics, molecular biology, human physiology, and board exam preparation.",
        href: "/modules/12th",
        icon: <Dna size={20} weight="duotone" className="text-indigo-500" />,
        badge: "Grade 12",
      },
      {
        title: "NEET Biology",
        description:
          "High-yield competitive exam prep with question banks, mock exams, and strategy guides.",
        href: "/modules/neet",
        icon: <Exam size={20} weight="duotone" className="text-amber-500" />,
        badge: "Competitive",
      },
    ],
  },
  {
    title: "Organism Deep-Dives",
    subtitle: "In-depth case studies of important organisms",
    icon: <PawPrint size={24} weight="duotone" className="text-orange-500" />,
    items: [
      {
        title: "Leech (Hirudinaria granulosa)",
        description:
          "Complete study of the medicinal leech — morphology, anatomy, circulatory system, and coelom structure.",
        href: "/organisms/leech",
        icon: <span className="text-lg">🪱</span>,
        badge: "Annelida",
      },
      {
        title: "Rabbit (Oryctolagus cuniculus)",
        description:
          "Mammalian anatomy — digestive, respiratory, circulatory, nervous, and reproductive systems.",
        href: "/organisms/rabbit",
        icon: <span className="text-lg">🐇</span>,
        badge: "Mammalia",
      },
      {
        title: "Cockroach (Periplaneta americana)",
        description:
          "Arthropod anatomy — exoskeleton, respiratory, open circulatory, and reproductive systems.",
        href: "/organisms/cockroach",
        icon: <span className="text-lg">🪳</span>,
        badge: "Arthropoda",
      },
      {
        title: "Frog (Rana tigrina)",
        description:
          "Amphibian anatomy — dual life, skin respiration, metamorphosis, and digestive system.",
        href: "/organisms/frog",
        icon: <span className="text-lg">🐸</span>,
        badge: "Amphibia",
      },
    ],
  },
  {
    title: "Explore & Discover",
    subtitle: "Browse the complete zoological catalog",
    icon: <ListMagnifyingGlass size={24} weight="duotone" className="text-cyan-500" />,
    items: [
      {
        title: "ZooHub — Species Catalog",
        description:
          "Browse 270+ species across 11 phyla with detailed taxonomy, images, ecology, and economic importance.",
        href: "/zoohub",
        icon: <Atom size={20} weight="duotone" className="text-cyan-500" />,
      },
      {
        title: "Taxonomy Tree",
        description:
          "Interactive visual tree showing the complete classification of Kingdom Animalia.",
        href: "/taxonomy",
        icon: <TreeStructure size={20} weight="duotone" className="text-teal-500" />,
      },
      {
        title: "Career Scopes",
        description:
          "100+ career pathways in Zoology, Wildlife Conservation, Marine Biology, Forensics, and Civil Services.",
        href: "/scopes",
        icon: <GraduationCap size={20} weight="duotone" className="text-rose-500" />,
      },
    ],
  },
];

/* ─── Card Component ──────────────────────────────────────── */

function ConceptCard({
  item,
}: {
  item: ConceptSection["items"][number];
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link
        ref={cardRef}
        href={item.href}
        onMouseMove={handleMouseMove}
        className="group relative flex flex-col h-full rounded-2xl border border-border/50
                   bg-card/80 backdrop-blur-sm p-6 transition-all duration-300
                   hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
      >
        {/* Spotlight gradient following cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.06), transparent 60%)`,
          }}
        />

        <div className="relative z-10 flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50 border border-border/50">
              {item.icon}
            </div>
            {item.badge && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
                {item.badge}
              </span>
            )}
          </div>
          <ArrowUpRight
            size={18}
            weight="bold"
            className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>

        <h3 className="relative z-10 text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="relative z-10 text-sm text-muted-foreground leading-relaxed flex-1">
          {item.description}
        </p>
      </Link>
    </motion.div>
  );
}

/* ─── Main View ───────────────────────────────────────────── */

export function ConceptualLearningView() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 sm:mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          <Atom size={14} weight="duotone" />
          Conceptual Learning
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
          Master Biology,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-teal-500">
            Concept by Concept
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Interactive modules, chapter-wise NCERT content, organism deep-dives,
          and the complete zoological catalog — all designed for visual learners
          and NEET aspirants.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-16 sm:space-y-20">
        {sections.map((section, sIndex) => (
          <motion.section
            key={section.title}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50 border border-border/50">
                {section.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.subtitle}</p>
              </div>
            </div>

            <div
              className={`grid gap-4 sm:gap-5 ${
                section.items.length <= 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {section.items.map((item) => (
                <ConceptCard key={item.href} item={item} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </main>
  );
}

export default ConceptualLearningView;
