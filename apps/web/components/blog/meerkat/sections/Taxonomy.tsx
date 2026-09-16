"use client";

import React from "react";
import ReactFlow, { Background, Controls, MarkerType, MiniMap, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "order",
    data: { label: <div className="tax-node root-node">Order: Carnivora</div> },
    position: { x: 400, y: 10 },
    type: "default",
    style: {
      background: "#ececc2",
      border: "2px solid #2f8593",
      borderRadius: "8px",
      padding: "10px",
      width: 220,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  {
    id: "suborder",
    data: { label: <div className="tax-node genus-node">Suborder: Feliformia (Cat-like)</div> },
    position: { x: 400, y: 95 },
    type: "default",
    style: {
      background: "#fbfbf4",
      border: "2px solid #1f5963",
      borderRadius: "8px",
      padding: "10px",
      width: 220,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  {
    id: "root",
    data: { label: <div className="tax-node root-node">Family: Herpestidae (Mongooses)</div> },
    position: { x: 400, y: 180 },
    type: "default",
    style: {
      background: "#ececc2",
      border: "2px solid #2f8593",
      borderRadius: "8px",
      padding: "10px",
      width: 220,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  {
    id: "genus",
    data: { label: <div className="tax-node genus-node">Genus: Suricata</div> },
    position: { x: 400, y: 265 },
    type: "default",
    style: {
      background: "#fbfbf4",
      border: "2px solid #1f5963",
      borderRadius: "8px",
      padding: "10px",
      width: 220,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  {
    id: "species",
    data: {
      label: (
        <div className="tax-node species-node">
          Species: Suricata suricatta
          <br />
          <small>(Meerkat)</small>
        </div>
      ),
    },
    position: { x: 400, y: 350 },
    type: "default",
    style: {
      background: "#fff",
      border: "2px solid #2f8593",
      borderRadius: "8px",
      padding: "10px",
      width: 220,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  // Subspecies
  {
    id: "sub-suricatta",
    data: {
      label: (
        <div className="tax-node subspecies-node">
          Southern Meerkat
          <br />
          <small>(S. s. suricatta)</small>
        </div>
      ),
    },
    position: { x: 150, y: 460 },
    type: "output",
    style: {
      background: "#fff",
      border: "1px solid #8ba393",
      borderRadius: "8px",
      padding: "8px",
      width: 180,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
  {
    id: "sub-majoriae",
    data: {
      label: (
        <div className="tax-node subspecies-node">
          Desert Meerkat
          <br />
          <small>(S. s. majoriae)</small>
        </div>
      ),
    },
    position: { x: 400, y: 460 },
    type: "output",
    style: {
      background: "#fff",
      border: "1px solid #8ba393",
      borderRadius: "8px",
      padding: "8px",
      width: 180,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
  {
    id: "sub-iona",
    data: {
      label: (
        <div className="tax-node subspecies-node">
          Angolan Meerkat
          <br />
          <small>(S. s. iona)</small>
        </div>
      ),
    },
    position: { x: 650, y: 460 },
    type: "output",
    style: {
      background: "#fff",
      border: "1px solid #8ba393",
      borderRadius: "8px",
      padding: "8px",
      width: 180,
      fontSize: "0.8rem",
      textAlign: "center",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e0", source: "order", target: "suborder", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e0-1", source: "suborder", target: "root", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e1", source: "root", target: "genus", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2", source: "genus", target: "species", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3", source: "species", target: "sub-suricatta", type: "smoothstep" },
  { id: "e4", source: "species", target: "sub-majoriae", type: "smoothstep" },
  { id: "e5", source: "species", target: "sub-iona", type: "smoothstep" },
];

export default function Taxonomy() {
  return (
    <div className="meer-taxonomy-section">
      <div className="meer-section-box">
        <h3 className="meer-section-title">Taxonomy &amp; Evolution</h3>
        <p className="meer-section-text">
          Meerkats are not rodents, dogs, or prairie dogs. They belong to the order <strong>Carnivora</strong> and
          suborder <strong>Feliformia</strong>, family <strong>Herpestidae</strong> (the mongoose family), and are the
          only surviving members of the genus <strong>Suricata</strong>. Genetic studies recognize three distinct
          subspecies adapted to different regional zones of Southern Africa.
        </p>
      </div>

      {/* React Flow Container */}
      <div
        className="meer-reactflow-wrapper"
        style={{
          width: "100%",
          height: "560px",
          background: "#fbfbf4",
          border: "1px solid var(--meer-border, #e2e8f0)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <ReactFlow nodes={initialNodes} edges={initialEdges} fitView attributionPosition="bottom-right">
          <Background color="#2f8593" gap={20} />
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.id === "order" || n.id === "root") return "#2f8593";
              if (n.id === "suborder" || n.id === "genus") return "#1f5963";
              return "#8ba393";
            }}
            nodeColor={(n) => {
              if (n.id === "order" || n.id === "root") return "#ececc2";
              return "#fff";
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
