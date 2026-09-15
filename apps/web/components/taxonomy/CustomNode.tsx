"use client";

import { Handle, Position } from "@xyflow/react";

type CustomNodeData = {
  label: string;
  subtitle?: string;
  rank?: string;
  isLeaf: boolean;
  isActive: boolean;
  onClick: () => void;
};

const rankColors: Record<string, { bg: string; activeBg: string; shadow: string }> = {
  Kingdom: { bg: "#7c3aed", activeBg: "#a78bfa", shadow: "rgba(124,58,237,0.6)" },
  Phylum: { bg: "#64b5f6", activeBg: "#90caf9", shadow: "rgba(100,181,246,0.6)" },
  Class: { bg: "#4db6ac", activeBg: "#80cbc4", shadow: "rgba(77,182,172,0.6)" },
  Species: { bg: "#ffd54f", activeBg: "#ffe082", shadow: "rgba(255,213,79,0.6)" },
};

export default function CustomNode({ data }: { data: CustomNodeData }) {
  const rank = data.rank || (data.isLeaf ? "Species" : "Phylum");
  const colors = rankColors[rank] || rankColors.Phylum!;

  return (
    <div
      onClick={data.onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        minWidth: 120,
        maxWidth: 180,
        textAlign: "center",
        cursor: "pointer",
        color: "#000",

        background: data.isActive ? colors.activeBg : colors.bg,

        boxShadow: data.isActive
          ? `0 0 18px ${colors.shadow}`
          : "0 4px 12px rgba(0,0,0,0.4)",

        transition: "all 0.3s ease",
        userSelect: "none",
        border: data.isActive
          ? "2px solid rgba(255,255,255,0.5)"
          : "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {data.label}
      {data.subtitle && (
        <div style={{ fontSize: 9, opacity: 0.8, marginTop: 4 }}>
          {data.subtitle}
        </div>
      )}
      {data.rank && (
        <div style={{ fontSize: 8, opacity: 0.6, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {data.rank}
        </div>
      )}

      {/* Connection Handles — Left/Right for horizontal tree layout */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={false}
        style={{ background: "transparent", border: "none" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={false}
        style={{ background: "transparent", border: "none" }}
      />
    </div>
  );
}
