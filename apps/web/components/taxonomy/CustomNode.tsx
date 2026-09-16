"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";

type CustomNodeData = {
  label: string;
  subtitle?: string;
  rank?: string;
  isLeaf: boolean;
  isRoot?: boolean;
  isOpen?: boolean;
  isActive: boolean;
  isMatched?: boolean;
  showTooltip?: boolean;
  onClick: () => void;
};

// Exact rank color mappings from the screenshots
const rankColorMap: Record<string, { bg: string; activeBg: string; activeShadow: string }> = {
  Kingdom: { bg: "#5c9bf0", activeBg: "#4ade80", activeShadow: "rgba(74, 222, 128, 0.9)" },
  Phylum: { bg: "#5c9bf0", activeBg: "#4ade80", activeShadow: "rgba(74, 222, 128, 0.9)" },
  Class: { bg: "#4db6ac", activeBg: "#2dd4bf", activeShadow: "rgba(45, 212, 191, 0.9)" },
  "Sub-Class": { bg: "#4db6ac", activeBg: "#2dd4bf", activeShadow: "rgba(45, 212, 191, 0.9)" },
  Order: { bg: "#fff59d", activeBg: "#fde047", activeShadow: "rgba(253, 224, 71, 0.9)" },
  Family: { bg: "#ff8a65", activeBg: "#fb923c", activeShadow: "rgba(251, 146, 60, 0.9)" },
  Genus: { bg: "#ba68c8", activeBg: "#c084fc", activeShadow: "rgba(192, 132, 252, 0.9)" },
  Species: { bg: "#fef08a", activeBg: "#fef08a", activeShadow: "rgba(254, 240, 138, 0.95)" },
};

export default function CustomNode({ data }: { data: CustomNodeData }) {
  const isRoot = data.isRoot;
  const rank = data.rank || (data.isLeaf ? "Species" : "Phylum");
  const rankStyle = rankColorMap[rank] || rankColorMap.Phylum!;

  // Determine background and shadow
  let bg = rankStyle.bg;
  let shadow = "0 4px 12px rgba(0, 0, 0, 0.35)";
  let border = "1px solid rgba(255, 255, 255, 0.25)";

  if (data.isMatched) {
    // Highlighted search match (glowing golden halo)
    bg = "#fef08a";
    shadow = "0 0 24px rgba(254, 240, 138, 0.95), 0 0 10px rgba(250, 204, 21, 0.8)";
    border = "2px solid #facc15";
  } else if (data.isActive || data.isOpen) {
    if (isRoot) {
      bg = "#4ade80";
      shadow = "0 0 24px rgba(74, 222, 128, 0.9)";
      border = "2px solid rgba(255, 255, 255, 0.6)";
    } else {
      bg = rankStyle.activeBg || rankStyle.bg;
      shadow = rankStyle.activeShadow ? `0 0 16px ${rankStyle.activeShadow}` : shadow;
      border = "2px solid rgba(255, 255, 255, 0.4)";
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onClick) {
      data.onClick();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        pointerEvents: "auto",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* Tooltip: "Click to expand the Kingdom" (only shown above collapsed Animalia) */}
      {data.showTooltip && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 18px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1a2638",
            border: "1px solid #334e68",
            color: "#f8fafc",
            padding: "10px 24px",
            borderRadius: "18px",
            fontSize: "16px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.6)",
            pointerEvents: "none",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Click to expand the Kingdom
          {/* Downward pointer triangle */}
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid #1a2638",
            }}
          />
        </div>
      )}

      {/* Main Node Pill */}
      <div
        style={{
          padding: isRoot ? "14px 44px" : "7px 18px",
          borderRadius: isRoot ? "40px" : "22px",
          fontSize: isRoot ? "22px" : "12.5px",
          fontWeight: 700,
          textAlign: "center",
          color: "#000000",
          background: bg,
          boxShadow: shadow,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          userSelect: "none",
          whiteSpace: "nowrap",
          border: border,
        }}
      >
        <div>{data.label}</div>
        {data.subtitle && (
          <div
            style={{
              fontSize: "9.5px",
              fontWeight: 500,
              color: "#334155",
              marginTop: "2px",
              lineHeight: 1.1,
            }}
          >
            {data.subtitle}
          </div>
        )}
      </div>

      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={{
          background: "transparent",
          border: "none",
          width: 1,
          height: 1,
          top: 0,
        }}
      />

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={{
          background: "transparent",
          border: "none",
          width: 1,
          height: 1,
          bottom: 0,
        }}
      />
    </div>
  );
}
