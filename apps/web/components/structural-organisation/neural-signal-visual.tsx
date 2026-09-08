"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TissueImageCard } from "./tissue-image-card";
import { Lightning, Brain, Sparkle, ArrowRight, ShieldCheck, Pulse } from "@phosphor-icons/react";

export function NeuralSignalVisual() {
  const [activeTab, setActiveTab] = useState<"structure" | "signal" | "neuroglia">("structure");
  const [signalStep, setSignalStep] = useState<number>(0);

  const signalSteps = [
    {
      step: "Phase 1: Stimulus Reception",
      title: "Threshold Stimulus & Depolarization",
      desc: "When a resting neuron receives an adequate environmental or physiological stimulus, voltage-gated channels open, generating a localized electrical disturbance (action potential).",
      location: "Dendrites & Soma Receptive Zone"
    },
    {
      step: "Phase 2: Axonal Propagation",
      title: "Rapid Wave Travel along Axolemma",
      desc: "The generated electrical wave travels rapidly and continuously down the elongated axon membrane without losing amplitude.",
      location: "Axon (Axolemma)"
    },
    {
      step: "Phase 3: Output Zone Synapse",
      title: "Terminal Secretory Events",
      desc: "Upon reaching the axon endings (output zone / synaptic knobs), the electrical depolarization triggers the opening of calcium channels and release of neurotransmitters into the synaptic cleft.",
      location: "Synaptic Knobs / Output Zone"
    },
    {
      step: "Phase 4: Target Response",
      title: "Stimulation or Inhibition",
      desc: "Neurotransmitters bind to specific receptors on adjacent downstream neurons, muscle motor end-plates (causing contraction), or glands (stimulating secretion).",
      location: "Post-Synaptic Effector Cell"
    }
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/95">
        <button
          onClick={() => setActiveTab("structure")}
          className={`flex-1 min-w-[130px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "structure"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          1. Neuron Anatomy
        </button>

        <button
          onClick={() => setActiveTab("signal")}
          className={`flex-1 min-w-[130px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "signal"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          2. How Neural Signals Work
        </button>

        <button
          onClick={() => setActiveTab("neuroglia")}
          className={`flex-1 min-w-[130px] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "neuroglia"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          3. Neuroglial Cells (&gt;50% Volume)
        </button>
      </div>

      {/* ================= TAB 1: NEURON STRUCTURE ================= */}
      {activeTab === "structure" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
        >
          <div className="lg:col-span-6">
            <TissueImageCard
              src="/images/structural-organisation/neuron_structure.png"
              alt="Neuron Structure: Soma, Dendrites, Axon"
              title="Anatomy of a Typical Multipolar Neuron"
              caption="Structural and functional excitable unit of the nervous system."
              badge="Excitable Unit"
            />
          </div>

          <div className="lg:col-span-6 space-y-3.5">
            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-600" />
                <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                  Three Fundamental Parts of a Neuron
                </h4>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="rounded-lg bg-indigo-50/70 p-3 dark:bg-indigo-950/40">
                  <strong className="text-indigo-900 dark:text-indigo-200 block mb-1">
                    1. Cell Body (Soma / Cyton):
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300">
                    Contains spherical nucleus and granular cytoplasm rich in Nissl's granules (ribosomes/RER) and metabolic organelles.
                  </span>
                </div>

                <div className="rounded-lg bg-indigo-50/70 p-3 dark:bg-indigo-950/40">
                  <strong className="text-indigo-900 dark:text-indigo-200 block mb-1">
                    2. Dendrites (Receptive Branches):
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300">
                    Short, highly branched tapering extensions specialized to receive chemical and physical inputs from other cells and conduct them toward the cell body.
                  </span>
                </div>

                <div className="rounded-lg bg-indigo-50/70 p-3 dark:bg-indigo-950/40">
                  <strong className="text-indigo-900 dark:text-indigo-200 block mb-1">
                    3. Axon (Transmission Cable):
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300">
                    A single long, cylindrical process that conducts electrical impulses away from the cell body toward target cells or synaptic terminals.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= TAB 2: NEURAL SIGNAL CONDUCTION ================= */}
      {activeTab === "signal" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <TissueImageCard
            src="/images/structural-organisation/neural_signal_conduction.png"
            alt="Neural Signal Conduction and Output Zone Events"
            title="Transmission of Nerve Impulses & Synaptic Events"
            caption="Sequential generation of electrical disturbance, rapid axonal travel, and output zone neurotransmitter response."
            badge="Impulse Conduction"
          />

          {/* Interactive Conduction Step Navigator */}
          <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Lightning className="h-4 w-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Interactive Impulse Transmission Sequence
                </h4>
              </div>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Step {signalStep + 1} of 4
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {signalSteps.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setSignalStep(idx)}
                  className={`rounded-xl p-2.5 text-center text-xs font-bold transition-all cursor-pointer ${
                    signalStep === idx
                      ? "bg-indigo-600 text-white shadow-xs scale-[1.02]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <span className="block text-[10px] opacity-80 uppercase">Phase {idx + 1}</span>
                  <span className="truncate block mt-0.5">{st.step.split(":")[1]}</span>
                </button>
              ))}
            </div>

            {/* Active Step Details */}
            <motion.div
              key={signalStep}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 dark:border-indigo-500/30 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-indigo-800 dark:text-indigo-300 uppercase">
                  {signalSteps[signalStep]?.step}
                </span>
                <span className="rounded-md bg-white/80 px-2 py-0.5 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Site: {signalSteps[signalStep]?.location}
                </span>
              </div>
              <h5 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                {signalSteps[signalStep]?.title}
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {signalSteps[signalStep]?.desc}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ================= TAB 3: NEUROGLIAL CELLS ================= */}
      {activeTab === "neuroglia" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent p-5 sm:p-7 shadow-xs dark:border-indigo-500/40 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-indigo-600 p-2 text-white shadow-xs">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  Neuroglial Cells (Neuroglia) — The Unsung Heroes
                </h4>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">
                  Non-excitable, supportive matrix of the central and peripheral nervous system
                </p>
              </div>
            </div>

            {/* Massive Volume Stat Box */}
            <div className="rounded-2xl border border-indigo-600/30 bg-white/90 p-5 dark:bg-slate-900/90 text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                &gt; 50%
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                Of Total Neural Tissue Volume in Animal Body
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Neuroglial cells far outnumber neurons, forming more than half of the total volume of all neural tissue!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-white/80 p-3.5 dark:bg-slate-800/80 space-y-1">
                <strong className="block font-bold text-indigo-700 dark:text-indigo-300">
                  Support & Protection
                </strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Cushion delicate neurons from physical trauma and maintain structural tissue integrity.
                </p>
              </div>

              <div className="rounded-xl bg-white/80 p-3.5 dark:bg-slate-800/80 space-y-1">
                <strong className="block font-bold text-indigo-700 dark:text-indigo-300">
                  Micro-environment Control
                </strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Regulate extracellular ionic concentrations (potassium ions) and neurotransmitter cleanup.
                </p>
              </div>

              <div className="rounded-xl bg-white/80 p-3.5 dark:bg-slate-800/80 space-y-1">
                <strong className="block font-bold text-indigo-700 dark:text-indigo-300">
                  Myelin Sheath Production
                </strong>
                <p className="text-slate-600 dark:text-slate-300">
                  Schwann cells (PNS) and Oligodendrocytes (CNS) produce electrical insulation for rapid impulse jumping.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
