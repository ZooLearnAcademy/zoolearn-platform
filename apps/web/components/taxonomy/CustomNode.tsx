"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

export type CustomNodeData = {
  label: string;
  subtitle?: string;
  rank?: string;
  isLeaf?: boolean;
  isActive?: boolean;
  isExtinct?: boolean;
  hasChildren?: boolean;
  isExpanded?: boolean;
  showTooltip?: boolean;
  customWidth?: number;
  onClick?: () => void;
};

export const rankColors: Record<string, { bg: string; activeBg: string; border: string; text: string; shadow: string }> = {
  Kingdom: { bg: "#60a5fa", activeBg: "#4ade80", border: "#86efac", text: "#000000", shadow: "rgba(74,222,128,0.8)" },
  Phylum: { bg: "#64b5f6", activeBg: "#90caf9", border: "#bbdefb", text: "#000000", shadow: "rgba(100,181,246,0.8)" },
  "Sub-Phylum": { bg: "#4dd0e1", activeBg: "#80deea", border: "#b2ebf2", text: "#000000", shadow: "rgba(77,208,225,0.8)" },
  Class: { bg: "#4db6ac", activeBg: "#80cbc4", border: "#b2dfdb", text: "#000000", shadow: "rgba(77,182,172,0.8)" },
  "Sub-Class": { bg: "#81c784", activeBg: "#a5d6a7", border: "#c8e6c9", text: "#000000", shadow: "rgba(129,199,132,0.8)" },
  "Infra-Class": { bg: "#aed581", activeBg: "#c5e1a5", border: "#dcedc8", text: "#000000", shadow: "rgba(174,213,129,0.8)" },
  "Super-Order": { bg: "#dce775", activeBg: "#e6ee9c", border: "#f0f4c3", text: "#000000", shadow: "rgba(220,231,117,0.8)" },
  Order: { bg: "#fff176", activeBg: "#fff59d", border: "#fff9c4", text: "#000000", shadow: "rgba(255,241,118,0.8)" },
  "Sub-Order": { bg: "#ffd54f", activeBg: "#ffe082", border: "#ffecb3", text: "#000000", shadow: "rgba(255,213,79,0.8)" },
  "Super-Family": { bg: "#ffb74d", activeBg: "#ffcc80", border: "#ffe0b2", text: "#000000", shadow: "rgba(255,183,77,0.8)" },
  Family: { bg: "#ff8a65", activeBg: "#ffab91", border: "#ffccbc", text: "#000000", shadow: "rgba(255,138,101,0.8)" },
  "Sub-Family": { bg: "#f06292", activeBg: "#f48fb1", border: "#f8bbd0", text: "#000000", shadow: "rgba(240,98,146,0.8)" },
  Genus: { bg: "#ba68c8", activeBg: "#ce93d8", border: "#e1bee7", text: "#000000", shadow: "rgba(186,104,200,0.8)" },
  Species: { bg: "#ffd54f", activeBg: "#ffe082", border: "#ffecb3", text: "#000000", shadow: "rgba(255,213,79,0.9)" },
};

const defaultColor = {
  bg: "#64b5f6",
  activeBg: "#90caf9",
  border: "#bbdefb",
  text: "#000000",
  shadow: "rgba(100,181,246,0.8)",
};

function CustomNodeComponent({ data }: { data: CustomNodeData }) {
  const rank = data.rank || (data.isLeaf ? "Species" : "Phylum");
  const colors = rankColors[rank] ?? defaultColor;
  const width = data.customWidth ?? 160;

  return (
    <div className="relative group">
      {/* Tooltip prompt on initial state */}
      {data.showTooltip && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-lg bg-[#1e293b] text-white text-xs font-semibold whitespace-nowrap shadow-2xl border border-slate-600 pointer-events-none animate-bounce z-50">
          Click to expand the Kingdom
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1e293b]" />
        </div>
      )}

      {/* Node Pill */}
      <div
        onClick={data.onClick}
        style={{
          width: `${width}px`,
          padding: "10px 14px",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 700,
          textAlign: "center",
          cursor: "pointer",
          color: colors.text,
          background: data.isActive ? colors.activeBg : colors.bg,
          boxShadow: data.isActive
            ? `0 0 24px ${colors.shadow}, 0 4px 12px rgba(0,0,0,0.6)`
            : "0 4px 14px rgba(0,0,0,0.4)",
          border: data.isActive
            ? `2px solid ${colors.border}`
            : "1px solid rgba(255,255,255,0.25)",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          userSelect: "none",
          boxSizing: "border-box",
        }}
        className="hover:scale-105 active:scale-95"
      >
        <div className="flex items-center justify-center gap-1 leading-tight break-words">
          <span className="truncate max-w-full" title={data.label}>
            {data.label}
          </span>
          {data.isExtinct && (
            <span title="Extinct" className="text-red-700 font-bold ml-1 text-xs shrink-0">
              ✞
            </span>
          )}
        </div>

        {data.subtitle && (
          <div
            style={{ fontSize: 9.5, opacity: 0.8, marginTop: 2, fontWeight: 500 }}
            className="truncate"
            title={data.subtitle}
          >
            {data.subtitle}
          </div>
        )}
      </div>

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={{ background: "transparent", border: "none" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={{ background: "transparent", border: "none" }}
      />
    </div>
  );
}

export default memo(CustomNodeComponent);
