"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  Handle,
  Position,
  Node,
  Edge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  X,
  GraduationCap,
  Clock,
  BookOpen,
  Sparkle,
  Buildings,
  Briefcase,
  Info,
  CheckCircle,
  CurrencyInr,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import {
  courseDetails,
  scopeCategories,
  type CareerItem,
  type CourseDetail,
} from "@/data/scopes-data";

// Custom Hub Node (Responsive & Theme-Adaptive)
function HubNode({ data }: { data: { label: string; hubName: string } }) {
  return (
    <div className="relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-blue-50/95 dark:bg-[#0b1736]/95 border-2 border-blue-500 dark:border-blue-400/90 text-blue-950 dark:text-blue-100 shadow-[0_4px_16px_rgba(59,130,246,0.25)] dark:shadow-[0_0_25px_rgba(59,130,246,0.5)] flex flex-col items-center justify-center min-w-[200px] sm:min-w-[260px] max-w-[300px] sm:max-w-[380px] text-center select-none backdrop-blur-md transition-all">
      <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-0.5">
        HUB
      </span>
      <span className="text-[11px] sm:text-xs font-extrabold tracking-wide text-slate-900 dark:text-white uppercase line-clamp-1 font-mono">
        {data.label || data.hubName || "ZOOLOGY & RESEARCH HUB"}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !bg-blue-500 dark:!bg-blue-400 !border-none !bottom-[-5px]"
      />
    </div>
  );
}

// Custom Bachelor Node (Responsive & Theme-Adaptive)
function BachelorNode({
  data,
}: {
  data: { label: string; onClick: (course: string) => void };
}) {
  return (
    <div
      onClick={() => data.onClick(data.label)}
      className="group relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-emerald-50/95 dark:bg-[#05231c]/95 border-2 border-emerald-500 dark:border-emerald-400/90 text-emerald-950 dark:text-emerald-100 shadow-[0_4px_14px_rgba(16,185,129,0.2)] dark:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.35)] dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:border-emerald-600 dark:hover:border-emerald-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-w-[130px] sm:min-w-[160px] max-w-[180px] sm:max-w-[220px] text-center select-none backdrop-blur-md"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-emerald-500 dark:!bg-emerald-400 !border-none !top-[-5px]"
      />
      <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase mb-0.5 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
        BACHELOR
      </span>
      <span className="text-[10px] sm:text-xs font-extrabold tracking-wide text-slate-900 dark:text-white uppercase line-clamp-1 font-mono">
        {data.label}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !bg-emerald-500 dark:!bg-emerald-400 !border-none !bottom-[-5px]"
      />
    </div>
  );
}

// Custom Master Node (Responsive & Theme-Adaptive)
function MasterNode({
  data,
}: {
  data: { label: string; onClick: (course: string) => void };
}) {
  return (
    <div
      onClick={() => data.onClick(data.label)}
      className="group relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-purple-50/95 dark:bg-[#1b0d2e]/95 border-2 border-purple-500 dark:border-purple-400/90 text-purple-950 dark:text-purple-100 shadow-[0_4px_14px_rgba(168,85,247,0.2)] dark:shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_6px_22px_rgba(168,85,247,0.35)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:border-purple-600 dark:hover:border-purple-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-w-[130px] sm:min-w-[160px] max-w-[180px] sm:max-w-[220px] text-center select-none backdrop-blur-md"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-purple-500 dark:!bg-purple-400 !border-none !top-[-5px]"
      />
      <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-purple-700 dark:text-purple-400 uppercase mb-0.5 group-hover:text-purple-800 dark:group-hover:text-purple-300">
        MASTER
      </span>
      <span className="text-[10px] sm:text-xs font-extrabold tracking-wide text-slate-900 dark:text-white uppercase line-clamp-1 font-mono">
        {data.label}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !bg-purple-500 dark:!bg-purple-400 !border-none !bottom-[-5px]"
      />
    </div>
  );
}

// Custom Doctoral Node (Responsive & Theme-Adaptive)
function DoctoralNode({
  data,
}: {
  data: { label: string; onClick: (course: string) => void };
}) {
  return (
    <div
      onClick={() => data.onClick(data.label)}
      className="group relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-amber-50/95 dark:bg-[#2a1406]/95 border-2 border-amber-500 dark:border-amber-400/90 text-amber-950 dark:text-amber-100 shadow-[0_4px_14px_rgba(245,158,11,0.2)] dark:shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.35)] dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:border-amber-600 dark:hover:border-amber-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-w-[130px] sm:min-w-[160px] max-w-[180px] sm:max-w-[220px] text-center select-none backdrop-blur-md"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-amber-500 dark:!bg-amber-400 !border-none !top-[-5px]"
      />
      <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-0.5 group-hover:text-amber-800 dark:group-hover:text-amber-300">
        DOCTORAL
      </span>
      <span className="text-[10px] sm:text-xs font-extrabold tracking-wide text-slate-900 dark:text-white uppercase line-clamp-1 font-mono">
        {data.label}
      </span>
    </div>
  );
}

const nodeTypes = {
  hubNode: HubNode,
  bachelorNode: BachelorNode,
  masterNode: MasterNode,
  doctoralNode: DoctoralNode,
};

interface CareerPathwayFlowProps {
  career: CareerItem;
  onClose: () => void;
}

export function CareerPathwayFlow({ career, onClose }: CareerPathwayFlowProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Find Scope category name for the Hub
  const scopeCat = useMemo(() => {
    return scopeCategories.find((c) => c.id === career.categoryId);
  }, [career.categoryId]);

  const hubTitle = useMemo(() => {
    if (!scopeCat) return "LIFE SCIENCES RESEARCH HUB";
    const clean = scopeCat.name.replace(/[^a-zA-Z &]/g, "").trim().toUpperCase();
    return clean.endsWith("HUB") ? clean : `${clean} HUB`;
  }, [scopeCat]);

  // Handle Course Click
  const handleNodeClick = useCallback((courseName: string) => {
    setSelectedCourse(courseName);
  }, []);

  // Compute Layout Nodes & Edges dynamically based on career.bsc, career.msc, career.phd
  const { nodes, edges } = useMemo(() => {
    const computedNodes: Node[] = [];
    const computedEdges: Edge[] = [];

    const canvasWidth = 900;
    const centerX = canvasWidth / 2;

    const blueEdgeColor = isDark ? "#3b82f6" : "#2563eb";
    const purpleEdgeColor = isDark ? "#a855f7" : "#9333ea";
    const amberEdgeColor = isDark ? "#f59e0b" : "#d97706";

    // 1. Hub Node
    computedNodes.push({
      id: "hub-1",
      type: "hubNode",
      position: { x: centerX - 140, y: 25 },
      data: { label: hubTitle, hubName: hubTitle },
    });

    // 2. Bachelor Tier
    const bscList = career.bsc.length > 0 ? career.bsc : ["B.Sc. Zoology", "B.Sc. Life Sciences"];
    const bscSpacing = canvasWidth / (bscList.length + 1);
    const bscY = 160;

    bscList.forEach((bsc, idx) => {
      const nodeId = `bsc-${idx}`;
      const xPos = bscSpacing * (idx + 1) - 95;

      computedNodes.push({
        id: nodeId,
        type: "bachelorNode",
        position: { x: xPos, y: bscY },
        data: { label: bsc, onClick: handleNodeClick },
      });

      // Edge from Hub -> Bachelor
      computedEdges.push({
        id: `e-hub-${nodeId}`,
        source: "hub-1",
        target: nodeId,
        type: "default",
        animated: true,
        style: {
          stroke: blueEdgeColor,
          strokeWidth: 2,
          strokeDasharray: "4,4",
        },
      });
    });

    // 3. Master Tier
    const mscList = career.msc.length > 0 ? career.msc : ["M.Sc. Zoology", "M.Sc. Specialization"];
    const mscSpacing = canvasWidth / (mscList.length + 1);
    const mscY = 295;

    mscList.forEach((msc, mIdx) => {
      const nodeId = `msc-${mIdx}`;
      const xPos = mscSpacing * (mIdx + 1) - 95;

      computedNodes.push({
        id: nodeId,
        type: "masterNode",
        position: { x: xPos, y: mscY },
        data: { label: msc, onClick: handleNodeClick },
      });

      // Interconnect Bachelor -> Master
      bscList.forEach((_, bIdx) => {
        const bscNodeId = `bsc-${bIdx}`;
        if (
          bscList.length === 1 ||
          mscList.length === 1 ||
          bIdx === mIdx ||
          Math.abs(bIdx - mIdx) === 1
        ) {
          computedEdges.push({
            id: `e-${bscNodeId}-${nodeId}`,
            source: bscNodeId,
            target: nodeId,
            type: "default",
            style: {
              stroke: purpleEdgeColor,
              strokeWidth: 2,
              strokeDasharray: "4,4",
            },
          });
        }
      });
    });

    // 4. Doctoral Tier
    const phdList = career.phd.length > 0 ? career.phd : ["Ph.D. Research"];
    const phdSpacing = canvasWidth / (phdList.length + 1);
    const phdY = 430;

    phdList.forEach((phd, pIdx) => {
      const nodeId = `phd-${pIdx}`;
      const xPos = phdSpacing * (pIdx + 1) - 95;

      computedNodes.push({
        id: nodeId,
        type: "doctoralNode",
        position: { x: xPos, y: phdY },
        data: { label: phd, onClick: handleNodeClick },
      });

      // Connect Master -> Doctoral
      mscList.forEach((_, mIdx) => {
        const mscNodeId = `msc-${mIdx}`;
        if (
          mscList.length === 1 ||
          phdList.length === 1 ||
          mIdx === pIdx ||
          Math.abs(mIdx - pIdx) === 1
        ) {
          computedEdges.push({
            id: `e-${mscNodeId}-${nodeId}`,
            source: mscNodeId,
            target: nodeId,
            type: "default",
            style: {
              stroke: amberEdgeColor,
              strokeWidth: 2,
              strokeDasharray: "4,4",
            },
          });
        }
      });
    });

    return { nodes: computedNodes, edges: computedEdges };
  }, [career, hubTitle, handleNodeClick, isDark]);

  // Selected Course details
  const activeCourseInfo: CourseDetail = useMemo(() => {
    if (!selectedCourse) {
      return { exp: "", dur: "", imp: "" };
    }
    return (
      courseDetails[selectedCourse] || {
        exp: "Comprehensive academic and practical program focused on core principles, modern research methodologies, and domain mastery.",
        dur: selectedCourse.startsWith("B.Sc")
          ? "3–4 years"
          : selectedCourse.startsWith("M.Sc")
          ? "2 years"
          : "3–6 years",
        imp: "Provides critical domain knowledge, laboratory training, and eligibility for high-yield research positions and specialized industry roles.",
      }
    );
  }, [selectedCourse]);

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090d16] border border-border/80 text-foreground shadow-2xl relative flex flex-col p-4 sm:p-6 md:p-8 max-h-[92vh] overflow-y-auto transition-colors">
      {/* ========================================================================= */}
      {/* HEADER SECTION (RESPONSIVE & THEME-ADAPTIVE) */}
      {/* ========================================================================= */}
      <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div className="space-y-1 sm:space-y-1.5 max-w-3xl pr-2">
          {/* Top Monospace Label */}
          <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            CAREER PATHWAY EXPLORER
          </div>

          {/* Career Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {career.title}
          </h2>

          {/* Career Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5 line-clamp-3 sm:line-clamp-none">
            {career.desc}
          </p>

          {/* Degree Tier Legend */}
          <div className="flex items-center gap-3 sm:gap-6 pt-2 sm:pt-3 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
                BACHELOR
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-purple-500 dark:bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
                MASTER
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
                DOCTORAL
              </span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white flex items-center justify-center transition-colors shrink-0 border border-slate-200 dark:border-white/10 shadow-xs"
          title="Close explorer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MAIN CANVAS / FLOW GRAPH (REACT FLOW) */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-xl sm:rounded-2xl bg-slate-50/70 dark:bg-[#040711] border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-inner transition-colors">
        {/* Canvas Instruction Hint */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-5 z-10 pointer-events-none text-[9px] sm:text-[11px] font-mono font-semibold tracking-wider text-slate-600 dark:text-slate-400 uppercase bg-white/90 dark:bg-black/50 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-slate-300 dark:border-slate-800 shadow-xs backdrop-blur-xs">
          TAP / CLICK A NODE FOR DETAILS
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.3}
          maxZoom={1.5}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnDrag={true}
          zoomOnPinch={true}
          proOptions={{ hideAttribution: false }}
        >
          <Background color={isDark ? "#1e293b" : "#cbd5e1"} gap={20} size={1} />
          <Controls
            showInteractive={false}
            className="!bg-white dark:!bg-[#090d16] !border-slate-200 dark:!border-slate-800 !rounded-lg sm:!rounded-xl !shadow-md overflow-hidden [&>button]:!bg-white dark:[&>button]:!bg-[#090d16] [&>button]:!border-slate-200 dark:[&>button]:!border-slate-800 [&>button]:!text-slate-700 dark:[&>button]:!text-slate-300 hover:[&>button]:!bg-slate-100 dark:hover:[&>button]:!bg-slate-800"
          />
        </ReactFlow>
      </div>

      {/* ========================================================================= */}
      {/* FOOTER METADATA: SALARY & KEY DOMAIN SKILLS */}
      {/* ========================================================================= */}
      <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold">
            <CurrencyInr className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>{career.salary}</span>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Category: <span className="text-slate-900 dark:text-slate-200 uppercase font-semibold">{career.category}</span>
          </div>
        </div>

        {career.topSectors && career.topSectors.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap justify-start sm:justify-end">
            <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono uppercase mr-1">Recruiting Hubs:</span>
            {career.topSectors.slice(0, 3).map((sec) => (
              <span
                key={sec}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[10px] sm:text-[11px] font-medium border border-slate-200 dark:border-slate-700"
              >
                {sec}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* COURSE DETAILS POPUP MODAL (ON CLICKING ANY NODE) */}
      {/* ========================================================================= */}
      <Dialog
        open={!!selectedCourse}
        onOpenChange={(open) => !open && setSelectedCourse(null)}
      >
        {selectedCourse && (
          <DialogContent className="max-w-lg w-[92vw] rounded-2xl bg-white dark:bg-[#090d16] border border-border text-foreground p-5 sm:p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2 sm:px-2.5 py-0.5 rounded-md font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                    selectedCourse.startsWith("B.Sc")
                      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                      : selectedCourse.startsWith("M.Sc")
                      ? "bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30"
                      : "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {selectedCourse.startsWith("B.Sc")
                    ? "BACHELOR PROGRAM"
                    : selectedCourse.startsWith("M.Sc")
                    ? "POSTGRADUATE MASTER"
                    : "DOCTORAL RESEARCH"}
                </span>

                {activeCourseInfo.dur && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] sm:text-[11px] font-mono border border-border/60">
                    <Clock className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                    <span>{activeCourseInfo.dur}</span>
                  </span>
                )}
              </div>

              <DialogTitle className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground pt-1">
                {selectedCourse}
              </DialogTitle>

              <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeCourseInfo.exp}
              </DialogDescription>
            </DialogHeader>

            <Separator className="my-3 bg-border" />

            {/* Career Importance */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5" />
                <span>Career Significance & Opportunities</span>
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                {activeCourseInfo.imp}
              </p>
            </div>

            {/* Practical Alignment */}
            <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Direct Pathway to {career.title}
              </span>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-medium text-xs transition-colors border border-border"
              >
                Close
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
