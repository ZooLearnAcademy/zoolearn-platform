"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./CustomNode";
import { TaxonomyNode } from "@/lib/data/taxonomy";

const nodeTypes = {
  custom: CustomNode,
};

// Estimate node width based on label and subtitle length
function getNodeWidth(label: string, commonName?: string): number {
  const primaryLen = label ? label.length : 0;
  const subLen = commonName ? commonName.length : 0;
  const maxLen = Math.max(primaryLen, subLen);

  if (maxLen <= 8) return 140;
  if (maxLen <= 14) return 165;
  if (maxLen <= 22) return 195;
  return Math.min(235, 195 + (maxLen - 22) * 4);
}

function FlowContent({ treeData }: { treeData: TaxonomyNode }) {
  const { fitView, setCenter, getNode } = useReactFlow();

  // Initially, no nodes are expanded (only root Animalia is visible)
  const [openNodes, setOpenNodes] = useState<Set<string>>(() => new Set());
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: string; label: string; rank: string; commonName?: string }[]>([]);

  const nodeHeight = 55;
  const spacingX = 42; // generous horizontal gap between sibling nodes/subtrees
  const spacingY = 140; // vertical level gap

  // Collect all searchable nodes
  const allSearchableTaxa = useMemo(() => {
    const list: { id: string; label: string; rank: string; commonName?: string }[] = [];
    const traverse = (node: TaxonomyNode) => {
      list.push({
        id: node.id,
        label: node.label,
        rank: node.rank,
        commonName: node.commonName,
      });
      if (node.children) {
        for (const child of node.children) {
          traverse(child);
        }
      }
    };
    traverse(treeData);
    return list;
  }, [treeData]);

  // Search suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const q = searchQuery.trim().toLowerCase();
    const matches = allSearchableTaxa
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          (item.commonName && item.commonName.toLowerCase().includes(q))
      )
      .slice(0, 8);

    setSuggestions(matches);
  }, [searchQuery, allSearchableTaxa]);

  // Find ancestor chain for a given target ID
  const findPathToNode = useCallback((root: TaxonomyNode, targetId: string): string[] | null => {
    if (root.id === targetId) return [root.id];
    if (root.children) {
      for (const child of root.children) {
        const path = findPathToNode(child, targetId);
        if (path) return [root.id, ...path];
      }
    }
    return null;
  }, []);

  const handleSelectNode = useCallback(
    (nodeId: string) => {
      const path = findPathToNode(treeData, nodeId);
      if (path) {
        setOpenNodes((prev) => {
          const next = new Set(prev);
          path.forEach((id) => next.add(id));
          return next;
        });
        setActiveNode(nodeId);
        setSearchError("");
        setSuggestions([]);

        // Focus camera on node after DOM update
        setTimeout(() => {
          const node = getNode(nodeId);
          if (node) {
            const w = getNodeWidth(node.data.label as string, node.data.subtitle as string);
            setCenter(node.position.x + w / 2, node.position.y + nodeHeight / 2, {
              duration: 800,
              zoom: 1.05,
            });
          }
        }, 120);
      } else {
        setSearchError("Taxon not found in tree.");
      }
    },
    [findPathToNode, treeData, getNode, setCenter]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.trim().toLowerCase();
    const match = allSearchableTaxa.find(
      (item) =>
        item.label.toLowerCase() === q ||
        item.label.toLowerCase().includes(q) ||
        (item.commonName && item.commonName.toLowerCase().includes(q))
    );

    if (match) {
      handleSelectNode(match.id);
    } else {
      setSearchError(`No matches found for "${searchQuery}"`);
    }
  };

  const handleNodeClick = useCallback(
    (node: TaxonomyNode) => {
      const hasChildren = Boolean(node.children && node.children.length > 0);
      if (hasChildren) {
        setOpenNodes((prev) => {
          const next = new Set(prev);
          if (next.has(node.id)) {
            next.delete(node.id);
          } else {
            next.add(node.id);
          }
          return next;
        });
      }
      setActiveNode(node.id);
    },
    []
  );

  // Non-colliding Hierarchical Subtree Layout Algorithm
  const { nodes, edges } = useMemo(() => {
    const computedNodes: Node[] = [];
    const computedEdges: Edge[] = [];

    // Step 1: Calculate exact subtree widths for non-overlapping layout
    const calcSubtreeWidth = (node: TaxonomyNode): number => {
      const myWidth = getNodeWidth(node.label, node.commonName);
      const isExpanded = openNodes.has(node.id) && Boolean(node.children && node.children.length > 0);

      if (!isExpanded || !node.children || node.children.length === 0) {
        return myWidth + spacingX;
      }

      let childrenTotalWidth = 0;
      for (const child of node.children) {
        childrenTotalWidth += calcSubtreeWidth(child);
      }

      return Math.max(childrenTotalWidth, myWidth + spacingX);
    };

    // Step 2: Position nodes recursively
    const layoutNode = (
      node: TaxonomyNode,
      depth: number,
      startX: number,
      parentId: string | null
    ): number => {
      const isExpanded = openNodes.has(node.id) && Boolean(node.children && node.children.length > 0);
      const subtreeWidth = calcSubtreeWidth(node);
      const myWidth = getNodeWidth(node.label, node.commonName);
      const nodeY = depth * spacingY;
      let nodeCenterX: number;
      let nodeX: number;

      if (isExpanded && node.children && node.children.length > 0) {
        let currentChildX = startX;
        const childCenters: number[] = [];

        for (const child of node.children) {
          const childSubtreeWidth = calcSubtreeWidth(child);
          const childCenter = layoutNode(child, depth + 1, currentChildX, node.id);
          childCenters.push(childCenter);
          currentChildX += childSubtreeWidth;
        }

        // Center parent relative to its outermost children
        const minChild = Math.min(...childCenters);
        const maxChild = Math.max(...childCenters);
        nodeCenterX = (minChild + maxChild) / 2;
        nodeX = nodeCenterX - myWidth / 2;
      } else {
        nodeX = startX + (subtreeWidth - spacingX) / 2 - myWidth / 2;
        nodeCenterX = nodeX + myWidth / 2;
      }

      const isActive = activeNode === node.id;
      const isRoot = node.id === "animalia";
      const showTooltip = isRoot && !openNodes.has("animalia");

      computedNodes.push({
        id: node.id,
        type: "custom",
        position: { x: nodeX, y: nodeY },
        data: {
          label: node.label,
          subtitle: node.commonName,
          rank: node.rank,
          isLeaf: !node.children || node.children.length === 0,
          isActive,
          isExtinct: node.extinct,
          hasChildren: Boolean(node.children && node.children.length > 0),
          isExpanded,
          showTooltip,
          customWidth: myWidth,
          onClick: () => handleNodeClick(node),
        },
      });

      if (parentId) {
        const isActiveEdge = activeNode === node.id || activeNode === parentId;
        computedEdges.push({
          id: `e-${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          type: "default", // Smooth curved bezier edge
          animated: false,
          style: {
            stroke: isActiveEdge ? "#4ade80" : "#ffffff",
            strokeWidth: isActiveEdge ? 2.5 : 1.5,
            strokeDasharray: "4, 4",
            opacity: isActiveEdge ? 1 : 0.35,
          },
        });
      }

      return nodeCenterX;
    };

    layoutNode(treeData, 0, 0, null);

    return { nodes: computedNodes, edges: computedEdges };
  }, [treeData, openNodes, activeNode, handleNodeClick]);

  // Fit view on initial load and node changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ duration: 450, padding: 0.25 });
    }, 120);
    return () => clearTimeout(timer);
  }, [nodes.length, fitView]);

  return (
    <div className="w-full h-full min-h-[600px] relative bg-[#0d1117] text-white overflow-hidden font-sans select-none">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.05}
        maxZoom={2.5}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} color="#334155" gap={20} size={1} />

        {/* Top-Right Search & Actions Bar */}
        <Panel position="top-right" className="m-5 flex flex-col gap-2 items-end z-20">
          {/* Search Row */}
          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search taxon (e.g. Tiger)"
                className="w-56 px-3 py-1.5 text-xs rounded-md bg-[#161b22] border border-[#30363d] text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 shadow-lg"
              />
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold rounded-md bg-[#ffd54f] text-black hover:bg-[#ffe082] transition-colors shadow-lg cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-1 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl overflow-hidden max-h-56 overflow-y-auto z-30">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      handleSelectNode(item.id);
                      setSearchQuery(item.label);
                    }}
                    className="px-3 py-2 text-xs cursor-pointer hover:bg-[#30363d] flex items-center justify-between border-b border-[#21262d] last:border-none"
                  >
                    <div>
                      <span className="font-semibold text-white">{item.label}</span>
                      {item.commonName && (
                        <span className="text-slate-400 text-[11px] ml-1.5 italic">
                          ({item.commonName})
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#21262d] text-slate-300 font-mono">
                      {item.rank}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {searchError && (
              <div className="mt-1.5 px-2 py-1 text-[11px] text-rose-300 bg-rose-950/80 border border-rose-800/60 rounded">
                {searchError}
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setOpenNodes(new Set());
                setActiveNode(null);
                setSearchQuery("");
                setSearchError("");
                setTimeout(() => fitView({ duration: 500, padding: 0.25 }), 100);
              }}
              className="px-3 py-1.5 text-xs font-medium bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-md text-white shadow-md transition-colors cursor-pointer"
            >
              Reset Tree
            </button>
            <button
              onClick={() => fitView({ duration: 500, padding: 0.25 })}
              className="px-3 py-1.5 text-xs font-medium bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-md text-white shadow-md transition-colors cursor-pointer"
            >
              Reset View
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export function AnimaliaFlow({ treeData }: { treeData: TaxonomyNode }) {
  return (
    <ReactFlowProvider>
      <FlowContent treeData={treeData} />
    </ReactFlowProvider>
  );
}
