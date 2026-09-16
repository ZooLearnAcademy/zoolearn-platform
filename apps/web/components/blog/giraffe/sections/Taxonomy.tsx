"use client";

import React from "react";
import ReactFlow, { Background, Controls, MarkerType, MiniMap, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "root",
    data: { label: <div className="tax-node root-node">Family: Giraffidae</div> },
    position: { x: 400, y: 50 },
    type: "default",
    style: {
      background: "#fef3c7",
      border: "2px solid #b45309",
      borderRadius: "8px",
      padding: "10px",
      width: 200,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  {
    id: "genus",
    data: { label: <div className="tax-node genus-node">Genus: Giraffa</div> },
    position: { x: 400, y: 150 },
    type: "default",
    style: {
      background: "#ffedd5",
      border: "2px solid #ea580c",
      borderRadius: "8px",
      padding: "10px",
      width: 200,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  // 4 Species
  {
    id: "sp-southern",
    data: {
      label: (
        <div className="tax-node species-node">
          Southern Giraffe
          <br />
          <small>(G. giraffa)</small>
        </div>
      ),
    },
    position: { x: 50, y: 280 },
    type: "default",
    style: {
      background: "#dcfce7",
      border: "2px solid #16a34a",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
      textAlign: "center",
    },
  },
  {
    id: "sp-masai",
    data: {
      label: (
        <div className="tax-node species-node">
          Masai Giraffe
          <br />
          <small>(G. tippelskirchi)</small>
        </div>
      ),
    },
    position: { x: 280, y: 280 },
    type: "default",
    style: {
      background: "#ffedd5",
      border: "2px solid #ea580c",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
      textAlign: "center",
    },
  },
  {
    id: "sp-reticulated",
    data: {
      label: (
        <div className="tax-node species-node">
          Reticulated Giraffe
          <br />
          <small>(G. reticulata)</small>
        </div>
      ),
    },
    position: { x: 520, y: 280 },
    type: "default",
    style: {
      background: "#ffedd5",
      border: "2px solid #ea580c",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
      textAlign: "center",
    },
  },
  {
    id: "sp-northern",
    data: {
      label: (
        <div className="tax-node species-node">
          Northern Giraffe
          <br />
          <small>(G. camelopardalis)</small>
        </div>
      ),
    },
    position: { x: 750, y: 280 },
    type: "default",
    style: {
      background: "#fee2e2",
      border: "2px solid #dc2626",
      borderRadius: "8px",
      padding: "10px",
      width: 180,
      textAlign: "center",
    },
  },
  // Subspecies
  {
    id: "sub-angolan",
    data: { label: <div className="tax-node subspecies-node">Angolan giraffe</div> },
    position: { x: 0, y: 400 },
    type: "output",
    style: {
      background: "#f0fdf4",
      border: "1px solid #16a34a",
      borderRadius: "8px",
      padding: "8px",
      width: 130,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
  {
    id: "sub-southafrican",
    data: { label: <div className="tax-node subspecies-node">South African giraffe</div> },
    position: { x: 140, y: 400 },
    type: "output",
    style: {
      background: "#f0fdf4",
      border: "1px solid #16a34a",
      borderRadius: "8px",
      padding: "8px",
      width: 130,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
  {
    id: "sub-masai",
    data: { label: <div className="tax-node subspecies-node">Masai sensu stricto</div> },
    position: { x: 280, y: 400 },
    type: "output",
    style: {
      background: "#fff7ed",
      border: "1px solid #ea580c",
      borderRadius: "8px",
      padding: "8px",
      width: 130,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
  {
    id: "sub-thornicroft",
    data: { label: <div className="tax-node subspecies-node">Luangwa giraffe</div> },
    position: { x: 420, y: 400 },
    type: "output",
    style: {
      background: "#fff7ed",
      border: "1px solid #ea580c",
      borderRadius: "8px",
      padding: "8px",
      width: 130,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
  {
    id: "sub-nubian",
    data: { label: <div className="tax-node subspecies-node">Nubian giraffe</div> },
    position: { x: 620, y: 400 },
    type: "output",
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "8px",
      width: 130,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
  {
    id: "sub-kordofan",
    data: { label: <div className="tax-node subspecies-node">Kordofan giraffe</div> },
    position: { x: 760, y: 400 },
    type: "output",
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "8px",
      width: 130,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
  {
    id: "sub-westafrican",
    data: { label: <div className="tax-node subspecies-node">West African giraffe</div> },
    position: { x: 900, y: 400 },
    type: "output",
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "8px",
      width: 130,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "root", target: "genus", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2", source: "genus", target: "sp-southern", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3", source: "genus", target: "sp-masai", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e4", source: "genus", target: "sp-reticulated", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e5", source: "genus", target: "sp-northern", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  // Southern subspecies
  { id: "e6", source: "sp-southern", target: "sub-angolan", type: "smoothstep" },
  { id: "e7", source: "sp-southern", target: "sub-southafrican", type: "smoothstep" },
  // Masai subspecies
  { id: "e8", source: "sp-masai", target: "sub-masai", type: "smoothstep" },
  { id: "e9", source: "sp-masai", target: "sub-thornicroft", type: "smoothstep" },
  // Northern subspecies
  { id: "e10", source: "sp-northern", target: "sub-nubian", type: "smoothstep" },
  { id: "e11", source: "sp-northern", target: "sub-kordofan", type: "smoothstep" },
  { id: "e12", source: "sp-northern", target: "sub-westafrican", type: "smoothstep" },
];

export default function Taxonomy() {
  return (
    <div className="gir-taxonomy-section">
      <div className="gir-section-box">
        <h3 className="gir-section-title">The 2025 Reclassification</h3>
        <p className="gir-section-text">
          For over a century, science operated under a single assumption: there was only one species of giraffe. In{" "}
          <strong>2016</strong>, genetic data revealed a biological earthquake — formally adopted by the{" "}
          <strong>IUCN in August 2025</strong>. There are <strong>four distinct species</strong> and{" "}
          <strong>five subspecies</strong> (the Reticulated Giraffe has no subspecies).
        </p>
      </div>

      {/* React Flow Container */}
      <div
        className="gir-reactflow-wrapper"
        style={{
          width: "100%",
          height: "500px",
          background: "#fafaf9",
          border: "1px solid #e7e5e4",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <ReactFlow nodes={initialNodes} edges={initialEdges} fitView attributionPosition="bottom-right">
          <Background color="#b45309" gap={20} />
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.id === "root") return "#b45309";
              if (n.id.startsWith("sp-")) return "#ea580c";
              return "#16a34a";
            }}
            nodeColor={(n) => {
              if (n.id === "root") return "#fef3c7";
              return "#fff";
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
