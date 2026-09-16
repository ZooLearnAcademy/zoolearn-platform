"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useRouter } from "next/navigation";

import CustomNode from "./CustomNode";

export type AnimaliaNode = {
  id: string;
  label: string;
  rank: string;
  commonName?: string;
  children?: AnimaliaNode[];
};

const nodeTypes = {
  custom: CustomNode,
};

function extractSpeciesSlug(treeId: string): string {
  const parts = treeId.split("_");
  return parts[parts.length - 1] || treeId;
}

function extractPhylumSlug(treeId: string): string {
  const parts = treeId.split("_");
  return parts.length >= 2 ? parts[1]! : treeId;
}

const LEVEL_HEIGHT = 160;
const HORIZONTAL_GAP = 36;

/**
 * Accurately calculate the visual width of any node based on text length.
 */
function getNodeWidth(node: AnimaliaNode): number {
  if (node.id === "animalia") return 220;
  const labelLen = node.label ? node.label.length : 0;
  const subLen = node.commonName ? node.commonName.length : 0;
  const maxChars = Math.max(labelLen, subLen);
  // 9px per char + 48px padding & handles
  return Math.max(160, Math.min(320, maxChars * 8.8 + 48));
}

/**
 * Recursively computes non-overlapping subtree bounding box widths.
 */
function getSubtreeWidth(node: AnimaliaNode, openNodes: Set<string>): number {
  const selfWidth = getNodeWidth(node) + HORIZONTAL_GAP;
  if (!node.children || node.children.length === 0 || !openNodes.has(node.id)) {
    return selfWidth;
  }
  let childrenTotal = 0;
  for (const child of node.children) {
    childrenTotal += getSubtreeWidth(child, openNodes);
  }
  return Math.max(selfWidth, childrenTotal);
}

function FlowContent({ treeData }: { treeData: AnimaliaNode }) {
  const router = useRouter();
  const { fitView, getNode, setCenter } = useReactFlow();

  // Root initially collapsed so user sees "Click to expand the Kingdom"
  const [openNodes, setOpenNodes] = useState<Set<string>>(() => new Set());
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [matchedNodeId, setMatchedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [suggestions, setSuggestions] = useState<{ label: string; commonName?: string }[]>([]);
  const isSearchingRef = useRef(false);

  // Build index map of all nodes in treeData
  const nodeMap = useMemo(() => {
    const map = new Map<string, AnimaliaNode>();
    const traverse = (node: AnimaliaNode) => {
      if (!node) return;
      map.set(node.id, node);
      if (node.children) {
        for (const child of node.children) {
          traverse(child);
        }
      }
    };
    traverse(treeData);
    return map;
  }, [treeData]);

  // Search suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const query = searchQuery.trim().toLowerCase();
    const matches: { label: string; commonName?: string }[] = [];

    const collectMatches = (node: AnimaliaNode) => {
      if (!node) return;
      const labelMatch = node.label.toLowerCase().includes(query);
      const commonMatch = node.commonName && node.commonName.toLowerCase().includes(query);

      if (labelMatch || commonMatch) {
        matches.push({ label: node.label, commonName: node.commonName });
      }
      if (node.children) {
        for (const child of node.children) {
          collectMatches(child);
        }
      }
    };

    collectMatches(treeData);
    setSuggestions(matches.slice(0, 8));
  }, [searchQuery, treeData]);

  const toggleNode = useCallback(
    (nodeId: string) => {
      const node = nodeMap.get(nodeId);
      if (!node) return;

      setActiveNode(node.id);

      if (!node.children || node.children.length === 0) {
        // Leaf node — navigate to ZooHub species page
        const speciesSlug = extractSpeciesSlug(node.id);
        const phylumSlug = extractPhylumSlug(node.id);
        router.push(`/zoohub/${phylumSlug}/${speciesSlug}`);
        return;
      }

      setOpenNodes((prev) => {
        const next = new Set(prev);
        if (next.has(node.id)) {
          next.delete(node.id);
        } else {
          next.add(node.id);
        }
        return next;
      });
    },
    [nodeMap, router]
  );

  const executeSearch = useCallback(
    (q: string) => {
      setSearchError("");
      if (!q.trim()) return;

      const query = q.trim().toLowerCase();

      const findPath = (
        node: AnimaliaNode,
        path: string[] = []
      ): { found: AnimaliaNode | null; path: string[] } => {
        if (!node) return { found: null, path: [] };
        const isMatch =
          node.label.toLowerCase().includes(query) ||
          (node.commonName &&
            node.commonName.toLowerCase().includes(query));

        if (isMatch) return { found: node, path };

        if (node.children) {
          for (const child of node.children) {
            const res = findPath(child, [...path, node.id]);
            if (res.found) return res;
          }
        }
        return { found: null, path: [] };
      };

      const result = findPath(treeData);

      if (result.found) {
        isSearchingRef.current = true;
        const newOpenNodes = new Set(openNodes);
        newOpenNodes.add("animalia");
        result.path.forEach((id) => {
          newOpenNodes.add(id);
        });
        setOpenNodes(newOpenNodes);
        setActiveNode(result.found.id);
        setMatchedNodeId(result.found.id);

        setTimeout(() => {
          const flowNode = getNode(result.found!.id);
          if (flowNode) {
            setCenter(flowNode.position.x + 80, flowNode.position.y + 20, {
              zoom: 1.1,
              duration: 800,
            });
          }
          setTimeout(() => {
            isSearchingRef.current = false;
          }, 900);
        }, 220);
      } else {
        setSearchError("No matching taxon found.");
      }
    },
    [openNodes, getNode, setCenter, treeData]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]);
    executeSearch(searchQuery);
  };

  const handleSuggestionClick = (item: { label: string; commonName?: string }) => {
    const term = item.commonName || item.label;
    setSearchQuery(term);
    setSuggestions([]);
    executeSearch(term);
  };

  // Build hierarchical layout with guaranteed zero overlap
  const { nodes, edges } = useMemo(() => {
    const computedNodes: Node[] = [];
    const computedEdges: Edge[] = [];

    const layout = (
      node: AnimaliaNode,
      xStart: number,
      depth: number,
      parentId: string | null
    ) => {
      if (!node) return;
      const subtreeWidth = getSubtreeWidth(node, openNodes);
      const nodeWidth = getNodeWidth(node);
      const isRoot = node.id === "animalia" || depth === 0;
      const isLeaf = !node.children || node.children.length === 0;
      const isOpen = openNodes.has(node.id);
      const isMatched = matchedNodeId === node.id;

      // Perfectly center node within its subtree bounding box
      const nodeX = xStart + (subtreeWidth - nodeWidth - HORIZONTAL_GAP) / 2;
      const nodeY = depth * LEVEL_HEIGHT;

      computedNodes.push({
        id: node.id,
        type: "custom",
        position: { x: nodeX, y: nodeY },
        data: {
          label: node.label,
          subtitle: node.commonName,
          rank: node.rank,
          isLeaf,
          isRoot,
          isOpen,
          isActive: isOpen || activeNode === node.id,
          isMatched,
          showTooltip: isRoot && !isOpen,
          onClick: () => toggleNode(node.id),
        },
      });

      if (parentId) {
        const isBranchActive = openNodes.has(node.id) || matchedNodeId === node.id;
        computedEdges.push({
          id: `edge-${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          type: "default",
          animated: false,
          style: {
            stroke: isBranchActive ? "#64748b" : "#475569",
            strokeWidth: 1.5,
            strokeDasharray: "3 3",
          },
        });
      }

      if (node.children && isOpen) {
        let currentX = xStart;
        for (const child of node.children) {
          const childWidth = getSubtreeWidth(child, openNodes);
          layout(child, currentX, depth + 1, node.id);
          currentX += childWidth;
        }
      }
    };

    if (treeData) {
      layout(treeData, 0, 0, null);
    }

    return { nodes: computedNodes, edges: computedEdges };
  }, [openNodes, activeNode, matchedNodeId, treeData, toggleNode]);

  // Fit view automatically on node changes when not in active search zoom
  useEffect(() => {
    if (isSearchingRef.current) return;
    const timer = setTimeout(() => {
      fitView({ duration: 500, padding: 0.2 });
    }, 80);
    return () => clearTimeout(timer);
  }, [nodes.length, openNodes, fitView]);

  const isEmpty = !treeData || (!treeData.children && !treeData.label);

  if (isEmpty) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#080c14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "48px" }}>🌿</div>
        <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 700 }}>
          Taxonomy Tree is Empty
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "400px", textAlign: "center" }}>
          No taxonomy data found. Please verify the database connection.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "#080c14",
        position: "relative",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, rfNode) => toggleNode(rfNode.id)}
        fitView
        minZoom={0.05}
        maxZoom={2}
        nodesConnectable={false}
        nodesDraggable={true}
        elementsSelectable={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1e293b" gap={24} size={1.5} />

        {/* Top-Right Control Panel */}
        <Panel
          position="top-right"
          style={{ marginTop: "16px", marginRight: "20px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-end",
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{ display: "flex", gap: "8px" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search taxon (e.g. Tiger)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1px solid #334155",
                    background: "#161f30",
                    color: "white",
                    outline: "none",
                    width: "220px",
                    fontSize: "13px",
                  }}
                />
                {suggestions.length > 0 && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      background: "#161f30",
                      listStyle: "none",
                      padding: 0,
                      margin: "4px 0 0 0",
                      borderRadius: "8px",
                      zIndex: 10,
                      border: "1px solid #334155",
                      overflow: "hidden",
                      maxHeight: "220px",
                      overflowY: "auto",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    }}
                  >
                    {suggestions.map((item, i) => (
                      <li
                        key={`${item.label}-${i}`}
                        onClick={() => handleSuggestionClick(item)}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderBottom: "1px solid #24324a",
                          color: "#fff",
                          fontSize: "13px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#24324a")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <span style={{ fontWeight: 600 }}>{item.label}</span>
                        {item.commonName && (
                          <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                            {item.commonName}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="submit"
                style={{
                  background: "#facc15",
                  color: "#000",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "13px",
                  transition: "opacity 0.2s",
                }}
              >
                Search
              </button>
            </form>

            {searchError && (
              <span
                style={{
                  color: "#f87171",
                  fontSize: "12px",
                  background: "#1e293b",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "1px solid #334155",
                }}
              >
                {searchError}
              </span>
            )}

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => {
                  setOpenNodes(new Set());
                  setActiveNode(null);
                  setMatchedNodeId(null);
                  setSearchQuery("");
                  setSearchError("");
                }}
                style={{
                  background: "#161f30",
                  color: "#e2e8f0",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid #334155",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 500,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#24324a")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#161f30")}
              >
                Reset Tree
              </button>
              <button
                onClick={() => fitView({ duration: 600, padding: 0.2 })}
                style={{
                  background: "#161f30",
                  color: "#e2e8f0",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid #334155",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 500,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#24324a")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#161f30")}
              >
                Reset View
              </button>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export function AnimaliaFlow({ treeData }: { treeData: AnimaliaNode }) {
  return (
    <ReactFlowProvider>
      <FlowContent treeData={treeData} />
    </ReactFlowProvider>
  );
}
