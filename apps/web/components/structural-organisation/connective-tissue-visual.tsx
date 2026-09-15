"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TissueImageCard } from "./tissue-image-card";
import { Sparkle, CheckCircle, ShieldCheck, Heartbeat } from "@phosphor-icons/react";

export function ConnectiveTissueVisual() {
  const [activeCategory, setActiveCategory] = useState<"loose" | "dense" | "specialised">("loose");
  const [specSubtype, setSpecSubtype] = useState<"cartilage" | "bone" | "blood">("cartilage");

  return (
    <div className="mt-6 space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/95">
        <button
          onClick={() => setActiveCategory("loose")}
          className={`flex-1 min-w-[130px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeCategory === "loose"
              ? "bg-teal-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          I. Loose Connective Tissue
        </button>

        <button
          onClick={() => setActiveCategory("dense")}
          className={`flex-1 min-w-[130px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeCategory === "dense"
              ? "bg-teal-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          II. Dense Connective Tissue
        </button>

        <button
          onClick={() => setActiveCategory("specialised")}
          className={`flex-1 min-w-[130px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeCategory === "specialised"
              ? "bg-teal-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          III. Specialised (Cartilage, Bone, Blood)
        </button>
      </div>

      {/* ================= CATEGORY 1: LOOSE CONNECTIVE ================= */}
      {activeCategory === "loose" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6">
              <TissueImageCard
                src="/images/structural-organisation/loose_connective.png"
                alt="Loose Connective Tissue: Areolar and Adipose Tissue"
                title="Loose Connective Tissue: Areolar & Adipose"
                caption="Cells and structural fibres are loosely organized in a semi-fluid ground substance."
                badge="Semi-Fluid Matrix"
              />
            </div>

            <div className="lg:col-span-6 space-y-3.5">
              {/* Areolar Box */}
              <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 dark:border-teal-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-teal-600" />
                  <h4 className="text-sm font-bold text-teal-900 dark:text-teal-200">
                    Areolar Tissue (Subcutaneous Support)
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Located beneath the skin; serves as a universal supporting framework for epithelium.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="rounded-lg bg-white/90 p-2 dark:bg-slate-800/90 text-center">
                    <strong className="block text-teal-700 dark:text-teal-300">Fibroblasts</strong>
                    <span className="text-slate-500">Secrete collagen/elastin fibres</span>
                  </div>
                  <div className="rounded-lg bg-white/90 p-2 dark:bg-slate-800/90 text-center">
                    <strong className="block text-teal-700 dark:text-teal-300">Macrophages</strong>
                    <span className="text-slate-500">Phagocytic scavengers</span>
                  </div>
                  <div className="rounded-lg bg-white/90 p-2 dark:bg-slate-800/90 text-center">
                    <strong className="block text-teal-700 dark:text-teal-300">Mast Cells</strong>
                    <span className="text-slate-500">Histamine, serotonin, heparin</span>
                  </div>
                </div>
              </div>

              {/* Adipose Box */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 dark:border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-600" />
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                    Adipose Tissue (Fat Storage Reservoir)
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Located predominantly beneath the skin. Contains specialized adipocytes storing large lipid droplets.
                </p>
                <div className="rounded-lg bg-white/90 p-2.5 dark:bg-slate-800/90 text-xs text-slate-600 dark:text-slate-300">
                  <strong>Metabolic Role:</strong> Unused excess dietary calories are converted into fats and deposited in adipocytes as energy reserves and thermal body insulation.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= CATEGORY 2: DENSE CONNECTIVE ================= */}
      {activeCategory === "dense" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Dense Regular */}
            <div className="space-y-3">
              <TissueImageCard
                src="/images/structural-organisation/dense_regular.png"
                alt="Dense Regular Connective Tissue"
                title="Dense Regular Connective Tissue"
                caption="Collagen fibres are packed in strict parallel bundles along lines of stress."
                badge="Parallel Bundles"
              />
              <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/90 space-y-2.5 text-xs sm:text-sm">
                <div className="font-extrabold text-teal-800 dark:text-teal-300">
                  Tendons vs. Ligaments (NEET Classic)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-teal-50 p-2.5 dark:bg-teal-950/50">
                    <strong className="block text-teal-900 dark:text-teal-200 font-bold mb-1">
                      Tendons:
                    </strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      Inelastic, dense cords connecting <strong>skeletal muscle to bone</strong>.
                    </span>
                  </div>
                  <div className="rounded-lg bg-teal-50 p-2.5 dark:bg-teal-950/50">
                    <strong className="block text-teal-900 dark:text-teal-200 font-bold mb-1">
                      Ligaments:
                    </strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      Elastic bands connecting <strong>bone to bone</strong>.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dense Irregular */}
            <div className="space-y-3">
              <TissueImageCard
                src="/images/structural-organisation/dense_irregular.png"
                alt="Dense Irregular Connective Tissue"
                title="Dense Irregular Connective Tissue"
                caption="Fibroblasts and interwoven collagen fibres arranged in multidirectional orientations."
                badge="Multidirectional Mesh"
              />
              <div className="rounded-xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/90 space-y-2 text-xs sm:text-sm">
                <div className="font-extrabold text-teal-800 dark:text-teal-300">
                  Anatomical Distribution & Resistance
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                  Located predominantly in the <strong>dermis of the skin</strong>. The criss-cross arrangement of collagen provides immense mechanical resistance against tension applied in diverse directions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= CATEGORY 3: SPECIALISED CONNECTIVE ================= */}
      {activeCategory === "specialised" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Subtype Switcher */}
          <div className="flex items-center gap-2">
            {(["cartilage", "bone", "blood"] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setSpecSubtype(sub)}
                className={`rounded-xl py-2 px-4 text-xs sm:text-sm font-bold capitalize transition-all cursor-pointer border ${
                  specSubtype === sub
                    ? "border-teal-600 bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Active Subtype View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6">
              {specSubtype === "cartilage" && (
                <TissueImageCard
                  src="/images/structural-organisation/cartilage.png"
                  alt="Cartilage Specialised Connective Tissue"
                  title="Cartilage (Solid, Pliable Matrix)"
                  caption="Chondrocytes enclosed within tiny fluid cavities called lacunae."
                  badge="Chondrocytes in Lacunae"
                />
              )}
              {specSubtype === "bone" && (
                <TissueImageCard
                  src="/images/structural-organisation/bone.png"
                  alt="Bone Specialised Connective Tissue"
                  title="Bone (Hard, Calcified Matrix)"
                  caption="Concentric lamellae, osteocytes within lacunae, and Haversian canal system."
                  badge="Osteocytes in Lacunae"
                />
              )}
              {specSubtype === "blood" && (
                <TissueImageCard
                  src="/images/structural-organisation/blood.png"
                  alt="Blood Fluid Connective Tissue"
                  title="Blood (Fluid Connective Tissue)"
                  caption="Fluid plasma containing Erythrocytes (RBCs), Leucocytes (WBCs), and Platelets. Lacks structural fibres!"
                  badge="Fluid Plasma"
                />
              )}
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-3">
                <h4 className="text-base font-extrabold capitalize text-slate-800 dark:text-slate-100">
                  {specSubtype} Detailed Characteristics
                </h4>

                {specSubtype === "cartilage" && (
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <p>
                      <strong>Matrix:</strong> Solid, pliable (flexible), and highly resistant to compressive forces.
                    </p>
                    <p>
                      <strong>Cells:</strong> Chondrocytes are suspended in pairs or clusters within cavities termed <em>lacunae</em>.
                    </p>
                    <p>
                      <strong>NCERT Locations:</strong> Tip of the nose, outer ear pinna, joints in limbs, hands, and between adjacent vertebrae.
                    </p>
                  </div>
                )}

                {specSubtype === "bone" && (
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <p>
                      <strong>Matrix:</strong> Hard, non-pliable matrix heavily rich in calcium salts and high-tensile collagen fibres.
                    </p>
                    <p>
                      <strong>Cells:</strong> Osteocytes reside within distinct lacunae interconnected by canaliculi.
                    </p>
                    <p>
                      <strong>Functions:</strong> Provides the structural framework of the body, protects visceral organs, supports body weight, and houses hemopoietic bone marrow.
                    </p>
                  </div>
                )}

                {specSubtype === "blood" && (
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <p>
                      <strong>Matrix:</strong> Liquid fluid plasma (55% of volume). <em>Crucially, cells do NOT secrete structural fibres.</em>
                    </p>
                    <p>
                      <strong>RBCs (Erythrocytes):</strong> Transport respiratory gases via haemoglobin. (Note: Frog RBCs are nucleated and biconvex!).
                    </p>
                    <p>
                      <strong>WBCs (Leucocytes):</strong> Provide immune defense, phagocytosis, and antibodies.
                    </p>
                    <p>
                      <strong>Platelets (Thrombocytes):</strong> Cell fragments essential for blood coagulation.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
