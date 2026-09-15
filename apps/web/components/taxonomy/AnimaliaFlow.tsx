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

/**
 * nodeTypes MUST be outside to avoid re-renders
 */
const nodeTypes = {
  custom: CustomNode,
};

/**
 * Extract the actual species slug from a composite tree ID.
 * e.g. "animalia_porifera_calcarea_sycon" → "sycon"
 */
function extractSpeciesSlug(treeId: string): string {
  const parts = treeId.split("_");
  return parts[parts.length - 1] || treeId;
}

/**
 * Extract the phylum slug from a composite tree ID.
 * e.g. "animalia_porifera_calcarea_sycon" → "porifera"
 */
function extractPhylumSlug(treeId: string): string {
  const parts = treeId.split("_");
  return parts.length >= 2 ? parts[1]! : treeId;
}

function FlowContent({ treeData }: { treeData: AnimaliaNode }) {
  const router = useRouter();
  const { fitView, getNode, setCenter } = useReactFlow();

  // Set of node IDs that are currently expanded
  const [openNodes, setOpenNodes] = useState<Set<string>>(
    () => new Set(["animalia"])
  );
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [spacingY, setSpacingY] = useState(240);

  // Responsive spacing — safe for SSR
  useEffect(() => {
    const update = () =>
      setSpacingY(window.innerWidth < 768 ? 160 : 240);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Search suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const query = searchQuery.trim().toLowerCase();
    const matches: string[] = [];

    const collectMatches = (node: AnimaliaNode) => {
      if (
        node.label.toLowerCase().includes(query) ||
        (node.commonName && node.commonName.toLowerCase().includes(query))
      ) {
        matches.push(node.label);
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

  const spacingX = 200;

  // ReactFlow onNodeClick handler — looks up the tree node and delegates
  // NOTE: We do NOT use ReactFlow's onNodeClick prop because nodesDraggable=false
  // + elementsSelectable=false sets pointer-events:none on wrappers.
  // Instead we use data.onClick on the inner div in CustomNode.
  const handleNodeClick = useCallback(
    (parentId: string | null, node: AnimaliaNode) => {
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
    [router]
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
        // Open all ancestors along the path
        const newOpenNodes = new Set(openNodes);
        // Always keep animalia open
        newOpenNodes.add("animalia");
        result.path.forEach((id) => {
          newOpenNodes.add(id);
        });
        setOpenNodes(newOpenNodes);
        setActiveNode(result.found.id);

        setTimeout(() => {
          const flowNode = getNode(result.found!.id);
          if (flowNode) {
            setCenter(flowNode.position.x + 60, flowNode.position.y + 20, {
              zoom: 1,
              duration: 800,
            });
          }
        }, 200);
      } else {
        setSearchError("No matching species/taxon found.");
      }
    },
    [openNodes, getNode, setCenter, treeData]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]);
    executeSearch(searchQuery);
  };

  const handleSuggestionClick = (s: string) => {
    setSearchQuery(s);
    setSuggestions([]);
    executeSearch(s);
  };

  // Generate stable nodes and edges arrays
  const { nodes, edges } = useMemo(() => {
    const getNodesAndEdges = (rootNode: AnimaliaNode) => {
      const nodes: Node[] = [];
      const edges: Edge[] = [];
      const levelCounts: Record<number, number> = {};

      const traverse = (node: AnimaliaNode, depth: number, parentId: string | null) => {
        if (levelCounts[depth] === undefined) {
          levelCounts[depth] = 0;
        }
        const indexInLevel = levelCounts[depth]!;
        levelCounts[depth]!++;

        const x = indexInLevel * spacingX;
        const y = depth * spacingY;
        const parent = parentId;
        const isLeaf = !node.children || node.children.length === 0;

        nodes.push({
          id: node.id,
          type: "custom",
          position: { x, y },
          data: {
            label: node.label,
            rank: node.rank,
            isLeaf,
            isActive: activeNode === node.id,
            onClick: () => handleNodeClick(parentId, node),
          },
        });

        if (parentId) {
          const isActiveEdge =
            openNodes.has(node.id) || activeNode === node.id;

          edges.push({
            id: `edge-${parentId}-${node.id}`,
            source: parentId,
            target: node.id,
            type: "default",
            animated: true,
            style: {
              stroke: isActiveEdge ? "#ffd54f" : "#ffffff",
              strokeWidth: isActiveEdge ? 3 : 2,
              strokeDasharray: "5,5",
              opacity: isActiveEdge ? 1 : 0.3,
            },
          });
        }

        // Expand children when the node is open
        if (node.children && openNodes.has(node.id)) {
          for (const child of node.children) {
            traverse(child, depth + 1, node.id);
          }
        }
      };

      traverse(rootNode, 0, null);
      return { nodes, edges };
    };

    return getNodesAndEdges(treeData);
  }, [openNodes, activeNode, spacingY, treeData, handleNodeClick]);

  // Auto-fit view when nodes change
  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ duration: 400, padding: 0.2 });
    }, 100);
    return () => clearTimeout(timer);
  }, [nodes.length, fitView]);

  // Check if tree is empty (no children on root)
  const isEmpty = !treeData.children || treeData.children.length === 0;

  if (isEmpty) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#121212",
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
          No phyla, classes, or species data has been added yet. Use the Admin panel to populate the taxonomy tree.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "#121212",
        position: "relative",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#333" gap={20} />

        <Panel
          position="top-right"
          style={{ marginTop: "16px", marginRight: "20px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
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
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #444",
                    background: "#222",
                    color: "white",
                    outline: "none",
                    width: "200px",
                  }}
                />
                {suggestions.length > 0 && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      background: "#222",
                      listStyle: "none",
                      padding: 0,
                      margin: "4px 0 0 0",
                      borderRadius: "6px",
                      zIndex: 10,
                      border: "1px solid #444",
                      overflow: "hidden",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {suggestions.map((s) => (
                      <li
                        key={s}
                        onClick={() => handleSuggestionClick(s)}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderBottom: "1px solid #333",
                          color: "#fff",
                          fontSize: "14px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#333")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="submit"
                style={{
                  background: "#ffd54f",
                  color: "#000",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Search
              </button>
            </form>

            {searchError && (
              <span
                style={{
                  color: "#ff6b6b",
                  fontSize: "0.85rem",
                  background: "#222",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                {searchError}
              </span>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setOpenNodes(new Set(["animalia"]));
                  setActiveNode(null);
                  setSearchQuery("");
                  setSearchError("");
                }}
                style={{
                  background: "#222",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  cursor: "pointer",
                }}
              >
                Reset Tree
              </button>
              <button
                onClick={() => fitView({ duration: 800, padding: 0.2 })}
                style={{
                  background: "#222",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  cursor: "pointer",
                }}
              >
                Reset View
              </button>
            </div>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {[
                { color: "#7c3aed", label: "Kingdom" },
                { color: "#64b5f6", label: "Phylum" },
                { color: "#4db6ac", label: "Class" },
                { color: "#ffd54f", label: "Species" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11px",
                    color: "#94a3b8",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "3px",
                      background: item.color,
                    }}
                  />
                  {item.label}
                </div>
              ))}
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
