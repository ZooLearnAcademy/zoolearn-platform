import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Background,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import './taxonomy.css';

// --- ICONS ---
const RefreshIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
const FitIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>;
const LockIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const UnlockIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 002 2z" /></svg>;

// --- FULL DATA ---
const treeData = {
  id: 'root', name: 'Annelida', rank: 'Phylum',
  children: [
    { id: 'c1', name: 'Polychaeta', rank: 'Class' },
    { id: 'c2', name: 'Oligochaeta', rank: 'Class' },
    {
      id: 'c3', name: 'Hirudinea', rank: 'Class',
      children: [
        { id: 'o1', name: 'Rhynchobdellida', rank: 'Order' },
        {
          id: 'o2', name: 'Arhynchobdellida', rank: 'Order',
          children: [
            {
              id: 'f1', name: 'Hirudinidae', rank: 'Family',
              children: [
                { id: 'g1', name: 'Hirudo', rank: 'Genus' },
                {
                  id: 'g2', name: 'Hirudinaria', rank: 'Genus',
                  children: [
                    { id: 's1', name: 'granulosa', rank: 'Species' },
                  ]
                },
              ]
            },
          ]
        }
      ]
    }
  ]
};

// --- LAYOUT ENGINE (DAGRE) ---
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: 'TB' });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 200, height: 70 });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = dagreGraph.node(node.id);
      return { ...node, position: { x: x - 100, y: y - 35 } };
    }),
    edges,
  };
};

// --- CUSTOM NODE ---
const TaxonNode = ({ data }) => {
  return (
    <div className={`taxonomy-node ${data.isPath ? 'active-path-node' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <span className="node-name">{data.name}</span>
        <span className="node-rank">({data.rank.charAt(0)})</span>
      </div>
      {data.hasChildren && (
        <div className="node-expander">{data.expanded ? '−' : '+'}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
const nodeTypes = { taxon: TaxonNode };

// --- RECURSIVE FLATTENER ---
const flattenTree = (node, parentId = null, nodes = [], edges = [], expandedIds = []) => {
  const isExpanded = expandedIds.includes(node.id);

  nodes.push({
    id: node.id,
    type: 'taxon',
    data: {
      name: node.name,
      rank: node.rank,
      hasChildren: !!node.children,
      expanded: isExpanded,
    },
    position: { x: 0, y: 0 },
    draggable: false,
  });

  if (parentId) {
    edges.push({
      id: `${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
      animated: true,
      type: 'default',
      style: { stroke: '#555', strokeWidth: 2, strokeDasharray: '5,5' },
    });
  }

  if (isExpanded && node.children) {
    node.children.forEach(child => flattenTree(child, node.id, nodes, edges, expandedIds));
  }
  return { nodes, edges };
};

// --- PATH GENERATOR HELPER ---
const getPathString = (expandedIds) => {
  let path = ["Annelida"];
  if (expandedIds.includes("root")) {
    if (expandedIds.includes("c3")) path.push("Hirudinea");
    if (expandedIds.includes("o2")) path.push("Arhynchobdellida");
    if (expandedIds.includes("f1")) path.push("Hirudinidae");
    if (expandedIds.includes("g2")) path.push("Hirudinaria");
  }
  return path.join("  ›  ");
};

// --- CHART COMPONENT ---
const AnimaliaChart = ({ interactive = true, onPathChange, isFullScreen = false, isMini = false }) => {
  const { fitView } = useReactFlow();
  const [isLocked, setIsLocked] = useState(!interactive);

  // Default State logic:
  // - Interactive (Desktop/Fullscreen): Initialize with 'root' expanded.
  // - Static (Mobile Preview): Initialize with a deeper branch if isMini.
  const [expandedIds, setExpandedIds] = useState(() => {
    if (isMini) return ['root', 'c3', 'o2']; // Show a deeper teaser
    return interactive ? ['root'] : ['root', 'c3'];
  });

  const { nodes: initialNodes, edges: initialEdges } = flattenTree(treeData, null, [], [], expandedIds);
  const layouted = getLayoutedElements(initialNodes, initialEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(layouted.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layouted.edges);

  useEffect(() => {
    const { nodes: fN, edges: fE } = flattenTree(treeData, null, [], [], expandedIds);
    const { nodes: lN, edges: lE } = getLayoutedElements(fN, fE);
    setNodes([...lN]);
    setEdges([...lE]);

    if (onPathChange) onPathChange(getPathString(expandedIds));

  }, [expandedIds, setNodes, setEdges, onPathChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({
        duration: 400,
        padding: isMini ? 0.05 : 0.2 // Tighter padding for mini preview
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [fitView, interactive, expandedIds.length, isMini]);

  const onNodeClick = useCallback((event, node) => {
    if (!interactive) return;
    if (!node.data.hasChildren) return;
    setExpandedIds((prev) =>
      prev.includes(node.id) ? prev.filter(id => id !== node.id) : [...prev, node.id]
    );
  }, [interactive]);

  const resetTree = () => {
    setExpandedIds(['root']);
    setTimeout(() => fitView({ duration: 800 }), 100);
  };

  return (
    <div className={`animalia-flow-container ${!isFullScreen ? 'embedded' : ''} ${!interactive ? 'static-mode' : ''}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={interactive}
        elementsSelectable={interactive}
        panOnDrag={interactive && !isLocked}
        zoomOnScroll={interactive && !isLocked && isFullScreen}
        panOnScroll={interactive && !isLocked}
        zoomOnPinch={interactive && !isLocked}
        zoomOnDoubleClick={interactive && !isLocked}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#cbd5e1" gap={24} size={1} />
      </ReactFlow>

      {interactive && (
        <div className="taxonomy-controls">
          <button className="control-btn" onClick={resetTree}>
            <RefreshIcon /> <span>Reset</span>
          </button>
          <div className="control-separator" />
          <button className="control-btn" onClick={() => fitView({ duration: 800 })}>
            <FitIcon /> <span>Fit</span>
          </button>
          <div className="control-separator" />
          <button
            className={`control-btn toggle ${!isLocked ? 'unlocked' : ''}`}
            onClick={() => setIsLocked(!isLocked)}
          >
            {isLocked ? <LockIcon /> : <UnlockIcon />}
            <span>{isLocked ? 'Locked' : 'Free'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

// --- MAIN WRAPPER ---
const AnimaliaFlow = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentPath, setCurrentPath] = useState("Annelida");

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFullScreen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isFullScreen]);

  return (
    <>
      <section className="taxonomy-section">
        <div className="taxonomy-intro">
          <h2 className="taxonomy-title">
            Taxonomic Position <span className="taxonomy-title-accent">– Classification Hierarchy</span>
          </h2>
          <p className="taxonomy-description">
            The Indian Cattle Leech (<em>Hirudinaria granulosa</em>) is scientifically classified based on its
            morphological features and evolutionary relationships.
          </p>
        </div>

        {/* --- DESKTOP VIEW: INTERACTIVE INLINE --- */}
        {isDesktop ? (
          <div className="taxonomy-card desk-interactive">
            <div className="taxonomy-path-header">
              <span className="path-label">Taxonomy:</span>
              <span className="path-value">{currentPath || "Annelida › Hirudinea"}</span>
            </div>

            <div className="taxonomy-static-wrapper">
              <ReactFlowProvider>
                <AnimaliaChart
                  interactive={true}
                  onPathChange={setCurrentPath}
                  isFullScreen={false}
                />
              </ReactFlowProvider>
            </div>
          </div>
        ) : (
          /* --- MOBILE VIEW: PORTAL CARD (ENTRY) --- */
          <div className="taxonomy-card mobile-entry-card">
            <div className="mobile-preview-wrapper">
              <ReactFlowProvider>
                {/* MINI PREVIEW: Expanded branch, no interaction */}
                <AnimaliaChart interactive={false} isMini={true} isFullScreen={false} />
              </ReactFlowProvider>
              <div className="preview-overlay" />
            </div>
            <div className="mobile-entry-content">
              <div className="mobile-entry-visual">
                <div className="visual-circle">🏷️</div>
              </div>
              <h3>Interactive Classification</h3>
              <p>Explore the detailed evolutionary hierarchy of the Indian Cattle Leech.</p>
              <button
                className="taxonomy-open-btn full-width"
                onClick={() => setIsFullScreen(true)}
              >
                🚀 Open Interactive View
              </button>
            </div>
          </div>
        )}
      </section>

      {/* FULL SCREEN MODAL - Renders at the end of body to avoid layout/stacking context issues */}
      {isFullScreen && createPortal(
        <div className="taxonomy-fullscreen-wrapper mobile-only-page">
          <header className="taxonomy-fullscreen-header page-header">
            <button className="taxonomy-back-btn icon-btn" onClick={() => setIsFullScreen(false)}>
              ✕
            </button>
            <div className="header-titles">
              <span className="page-label">Leech Taxonomy</span>
              <div className="fullscreen-path">{currentPath}</div>
            </div>
          </header>

          <div className="taxonomy-fullscreen-content">
            <ReactFlowProvider>
              <AnimaliaChart interactive={true} onPathChange={setCurrentPath} isFullScreen={true} />
            </ReactFlowProvider>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default AnimaliaFlow;