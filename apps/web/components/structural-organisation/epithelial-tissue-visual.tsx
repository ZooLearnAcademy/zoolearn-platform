"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TissueImageCard } from "./tissue-image-card";
import { Sparkle, ShieldCheck, ArrowsSplit, CheckCircle, SealQuestion } from "@phosphor-icons/react";

export function EpithelialTissueVisual() {
  const [activeTab, setActiveTab] = useState<"simple" | "glandular" | "compound" | "junctions">("simple");
  const [simpleSubtype, setSimpleSubtype] = useState<number>(0);

  const simpleTypes = [
    {
      name: "Squamous Epithelium",
      image: "/images/structural-organisation/squamous_epithelium.png",
      shape: "Single layer of thin, flattened pavement-like cells with irregular boundaries.",
      location: "Walls of blood vessels (endothelium) and air sacs of lungs (alveoli).",
      function: "Forms a delicate diffusion boundary for rapid exchange of gases and nutrients.",
      neetTip: "Commonly referred to as 'pavement epithelium' due to tile-like appearance."
    },
    {
      name: "Cuboidal Epithelium",
      image: "/images/structural-organisation/cuboidal_epithelium.png",
      shape: "Single layer of cube-like cells with centrally placed spherical nuclei.",
      location: "Ducts of glands and tubular parts of nephrons (kidneys).",
      function: "Primary sites of secretion and absorption.",
      neetTip: "Epithelium lining the Proximal Convoluted Tubule (PCT) of nephrons bears brush-bordered microvilli to maximize reabsorption!"
    },
    {
      name: "Columnar Epithelium",
      image: "/images/structural-organisation/columnar_epithelium.jpg",
      shape: "Single layer of tall, pillar-like cells with elongated nuclei located at the base.",
      location: "Lining of the stomach, intestine, and digestive mucosa.",
      function: "Secretion of digestive enzymes, mucus, and active nutrient absorption.",
      neetTip: "Free surface often features dense microvilli forming a brush border in intestinal villi."
    },
    {
      name: "Ciliated Epithelium",
      image: "/images/structural-organisation/ciliated_epithelium.png",
      shape: "Cuboidal or columnar cells bearing fine, hair-like motile cilia on their apical free surface.",
      location: "Inner lining of hollow visceral passages: bronchioles and fallopian tubes (oviducts).",
      function: "Coordinated rhythmic ciliary beating moves mucus, dust, and ova in a specific unindirectional path.",
      neetTip: "NEET classic: Fallopian tube ciliary action propels the ovum towards the uterus!"
    }
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Category Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/95">
        <button
          onClick={() => setActiveTab("simple")}
          className={`flex-1 min-w-[120px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "simple"
              ? "bg-cyan-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Simple Epithelia (4 Types)
        </button>

        <button
          onClick={() => setActiveTab("glandular")}
          className={`flex-1 min-w-[120px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "glandular"
              ? "bg-cyan-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Glandular Epithelium
        </button>

        <button
          onClick={() => setActiveTab("compound")}
          className={`flex-1 min-w-[120px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "compound"
              ? "bg-cyan-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Compound Epithelium
        </button>

        <button
          onClick={() => setActiveTab("junctions")}
          className={`flex-1 min-w-[120px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "junctions"
              ? "bg-cyan-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Cell Junctions (3 Types)
        </button>
      </div>

      {/* ================= TAB 1: SIMPLE EPITHELIA ================= */}
      {activeTab === "simple" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Subtype Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {simpleTypes.map((type, idx) => (
              <button
                key={idx}
                onClick={() => setSimpleSubtype(idx)}
                className={`rounded-xl p-2 text-center text-xs font-bold transition-all cursor-pointer border ${
                  simpleSubtype === idx
                    ? "border-cyan-600 bg-cyan-50 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300"
                    : "border-slate-200/70 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Active Subtype Visual & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6">
              <TissueImageCard
                src={simpleTypes[simpleSubtype]?.image || ""}
                alt={simpleTypes[simpleSubtype]?.name || ""}
                title={simpleTypes[simpleSubtype]?.name || ""}
                caption={`Microscopic histological schematic of ${simpleTypes[simpleSubtype]?.name}`}
                badge="Simple Epithelium"
              />
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-600" />
                  <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                    {simpleTypes[simpleSubtype]?.name} Blueprint
                  </h4>
                </div>

                <div className="text-xs sm:text-sm space-y-2.5">
                  <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                      Cellular Morphology:
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {simpleTypes[simpleSubtype]?.shape}
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                      NCERT Anatomical Sites:
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {simpleTypes[simpleSubtype]?.location}
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                      Primary Biological Function:
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {simpleTypes[simpleSubtype]?.function}
                    </span>
                  </div>
                </div>

                {/* High-yield NEET alert */}
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <Sparkle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <strong>High-Yield NCERT Point:</strong>{" "}
                    <span>{simpleTypes[simpleSubtype]?.neetTip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= TAB 2: GLANDULAR EPITHELIUM ================= */}
      {activeTab === "glandular" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Diagram 1: Unicellular vs Multicellular */}
            <div className="space-y-3">
              <TissueImageCard
                src="/images/structural-organisation/glandular_types.png"
                alt="Glandular Epithelium Types: Unicellular vs Multicellular"
                title="Classification by Cellularity"
                caption="Unicellular (isolated Goblet cells) vs Multicellular (clusters like Salivary glands)"
                badge="Cell Accumulation"
              />
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80 text-xs sm:text-sm space-y-2">
                <div className="font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  <span>Unicellular vs Multicellular Glands</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Unicellular:</strong> Isolated single glandular cells embedded among non-secretory cells (e.g., Goblet cells in gut lining).
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Multicellular:</strong> Clusters of glandular cells forming complex branched or unbranched organs (e.g., Salivary glands).
                </p>
              </div>
            </div>

            {/* Diagram 2: Exocrine vs Endocrine */}
            <div className="space-y-3">
              <TissueImageCard
                src="/images/structural-organisation/gland_mode_secretion.png"
                alt="Mode of Secretion: Exocrine vs Endocrine"
                title="Classification by Mode of Secretion"
                caption="Exocrine (ducted, releases enzymes/mucus) vs Endocrine (ductless, releases hormones into blood)"
                badge="Secretion Route"
              />
              <div className="rounded-xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80 text-xs sm:text-sm space-y-2">
                <div className="font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-cyan-600" />
                  <span>Exocrine vs Endocrine Glands</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Exocrine Glands:</strong> Possess ducts to discharge mucus, saliva, earwax, oil, milk, digestive enzymes to targeted epithelial surfaces.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Endocrine Glands:</strong> Ductless; release hormones directly into surrounding interstitial fluid to circulate throughout the bloodstream.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= TAB 3: COMPOUND EPITHELIUM ================= */}
      {activeTab === "compound" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
        >
          <div className="lg:col-span-6">
            <TissueImageCard
              src="/images/structural-organisation/compound_epithelium.png"
              alt="Compound (Stratified) Epithelium Architecture"
              title="Compound (Stratified) Epithelium"
              caption="Multi-layered epithelial sheets organized to absorb wear-and-tear mechanical and chemical friction."
              badge="Multi-Layered Architecture"
            />
          </div>

          <div className="lg:col-span-6 space-y-3.5">
            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-cyan-600" />
                <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                  Protective Non-Permeable Shield
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Unlike simple epithelium, compound epithelium comprises multiple stacked strata of cells. Consequently, its role in secretion and absorption is minimal; its principal duty is protection against chemical and physical abrasion.
              </p>

              <div className="space-y-2 text-xs sm:text-sm">
                <strong className="text-slate-900 dark:text-slate-100 block">
                  Four Major Anatomical Locations (NCERT):
                </strong>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
                    <span>Dry surface of the skin (keratinized stratified epithelium)</span>
                  </li>
                  <li className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
                    <span>Moist lining of the buccal cavity</span>
                  </li>
                  <li className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
                    <span>Lining of the pharynx</span>
                  </li>
                  <li className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
                    <span>Inner lining of salivary gland ducts & pancreatic ducts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= TAB 4: CELL JUNCTIONS ================= */}
      {activeTab === "junctions" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <TissueImageCard
            src="/images/structural-organisation/cell_junctions.png"
            alt="Intercellular Junctions: Tight, Adhering, Gap Junctions"
            title="Cell Junctions (Intercellular Contacts)"
            caption="Structural and functional linkers connecting adjacent epithelial cells."
            badge="Intercellular Communication"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tight Junction */}
            <div className="rounded-xl border border-sky-500/25 bg-sky-500/5 p-4 dark:border-sky-500/35 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                <h5 className="font-extrabold text-sm text-sky-900 dark:text-sky-300">
                  1. Tight Junctions
                </h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Form tight barrier seals between neighboring membranes.
              </p>
              <div className="rounded-lg bg-white/90 p-2 dark:bg-slate-800/90 text-xs font-semibold text-sky-800 dark:text-sky-300">
                Key Function: Stop substances from leaking across an epithelial layer.
              </div>
            </div>

            {/* Adhering Junction */}
            <div className="rounded-xl border border-teal-500/25 bg-teal-500/5 p-4 dark:border-teal-500/35 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                <h5 className="font-extrabold text-sm text-teal-900 dark:text-teal-300">
                  2. Adhering Junctions
                </h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Perform cementing action to anchor neighboring cells together.
              </p>
              <div className="rounded-lg bg-white/90 p-2 dark:bg-slate-800/90 text-xs font-semibold text-teal-800 dark:text-teal-300">
                Key Function: Impart high mechanical cohesion to withstand shearing stress.
              </div>
            </div>

            {/* Gap Junction */}
            <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-4 dark:border-cyan-500/35 space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                <h5 className="font-extrabold text-sm text-cyan-900 dark:text-cyan-300">
                  3. Gap Junctions
                </h5>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Microscopic protein channels connecting adjacent cytoplasms.
              </p>
              <div className="rounded-lg bg-white/90 p-2 dark:bg-slate-800/90 text-xs font-semibold text-cyan-800 dark:text-cyan-300">
                Key Function: Instant diffusion of ions, metabolites, and electrical signals.
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
