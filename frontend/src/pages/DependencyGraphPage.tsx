import React, { useState, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  MarkerType,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSimulation } from '../state/SimulationContext';
import {
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Layers,
  Cpu,
  Zap,
  Info,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export const DependencyGraphPage: React.FC = () => {
  const { deadlockCycle, resolveDeadlock, migrateWorkload } = useSimulation();
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const isCycleActive = deadlockCycle && deadlockCycle.status === 'active';

  // Construct graph elements with botanical-scientific styling
  const { initialNodes, initialEdges } = useMemo(() => {
    const rawNodes: Node[] = [
      // Workload 17
      {
        id: 'W17',
        position: { x: 100, y: 120 },
        data: {
          label: 'W17 (Sakura-70B)',
          type: 'workload',
          detail: 'Critical LLM Fine-Tuning. Requests RAM-02 buffer.',
        },
        style: {
          background: isCycleActive ? '#FFF0F3' : '#FFFFFF',
          border: isCycleActive ? '2px solid #E87A90' : '1px solid #E8E5DD',
          borderRadius: '8px',
          padding: '10px 14px',
          fontWeight: 600,
          color: '#121614',
          boxShadow: isCycleActive ? '0 0 16px rgba(232, 122, 144, 0.4)' : '0 2px 8px rgba(0,0,0,0.04)',
          width: 170,
        },
      },
      // Resource: GPU-03 VRAM Pool
      {
        id: 'GPU-03-VRAM',
        position: { x: 380, y: 80 },
        data: {
          label: 'GPU-03 (VRAM Pool)',
          type: 'resource',
          detail: '80GB HBM2e Pool. Allocated to W17; requested by W21.',
        },
        style: {
          background: isCycleActive ? '#FFF5F7' : '#F7FDF9',
          border: isCycleActive ? '2px solid #DC2626' : '1px solid #228B53',
          borderRadius: '8px',
          padding: '10px 14px',
          fontWeight: 600,
          color: '#121614',
          boxShadow: isCycleActive ? '0 0 16px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(34, 139, 83, 0.1)',
          width: 180,
        },
      },
      // Workload 21
      {
        id: 'W21',
        position: { x: 640, y: 120 },
        data: {
          label: 'W21 (Video Gen)',
          type: 'workload',
          detail: 'High Priority AI Worker. Holds RAM-02; requests GPU-03.',
        },
        style: {
          background: isCycleActive ? '#FFF0F3' : '#FFFFFF',
          border: isCycleActive ? '2px solid #E87A90' : '1px solid #E8E5DD',
          borderRadius: '8px',
          padding: '10px 14px',
          fontWeight: 600,
          color: '#121614',
          boxShadow: isCycleActive ? '0 0 16px rgba(232, 122, 144, 0.4)' : '0 2px 8px rgba(0,0,0,0.04)',
          width: 170,
        },
      },
      // Resource: RAM-02 (Shared Memory Pool)
      {
        id: 'RAM-02',
        position: { x: 380, y: 260 },
        data: {
          label: 'RAM-02 (DMA Pool)',
          type: 'resource',
          detail: '64GB Direct Memory Access. Allocated to W21; requested by W17.',
        },
        style: {
          background: isCycleActive ? '#FFF5F7' : '#F7FDF9',
          border: isCycleActive ? '2px solid #DC2626' : '1px solid #228B53',
          borderRadius: '8px',
          padding: '10px 14px',
          fontWeight: 600,
          color: '#121614',
          boxShadow: isCycleActive ? '0 0 16px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(34, 139, 83, 0.1)',
          width: 180,
        },
      },

      // Candidate Target Node for Resolution: GPU-02
      {
        id: 'GPU-02',
        position: { x: 380, y: 400 },
        data: {
          label: 'GPU-02 (Eco A100)',
          type: 'node',
          detail: 'Fukushima Green Compute. 38% utilization, 210 gCO₂/kWh.',
        },
        style: {
          background: '#E8F5EE',
          border: '2px solid #228B53',
          borderRadius: '8px',
          padding: '10px 14px',
          fontWeight: 700,
          color: '#135933',
          boxShadow: '0 4px 14px rgba(34, 139, 83, 0.2)',
          width: 180,
        },
      },
    ];

    const rawEdges: Edge[] = isCycleActive
      ? [
          // Cycle Edge 1: W17 requests GPU-03-VRAM
          {
            id: 'e-w17-gpu03',
            source: 'GPU-03-VRAM',
            target: 'W17',
            label: 'allocated_to',
            animated: true,
            style: { stroke: '#E87A90', strokeWidth: 2.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#E87A90' },
          },
          // Cycle Edge 2: W21 requests GPU-03-VRAM
          {
            id: 'e-w21-gpu03',
            source: 'W21',
            target: 'GPU-03-VRAM',
            label: 'requests (BLOCKED)',
            animated: true,
            style: { stroke: '#DC2626', strokeWidth: 3 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#DC2626' },
          },
          // Cycle Edge 3: RAM-02 allocated to W21
          {
            id: 'e-ram02-w21',
            source: 'RAM-02',
            target: 'W21',
            label: 'allocated_to',
            animated: true,
            style: { stroke: '#E87A90', strokeWidth: 2.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#E87A90' },
          },
          // Cycle Edge 4: W17 requests RAM-02 (CYCLE COMPLETION!)
          {
            id: 'e-w17-ram02',
            source: 'W17',
            target: 'RAM-02',
            label: 'requests (BLOCKED)',
            animated: true,
            style: { stroke: '#DC2626', strokeWidth: 3 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#DC2626' },
          },
        ]
      : [
          // Resolved non-cyclic state: W17 migrated to GPU-02
          {
            id: 'e-gpu02-w17',
            source: 'GPU-02',
            target: 'W17',
            label: 'allocated_to (RESOLVED)',
            animated: false,
            style: { stroke: '#228B53', strokeWidth: 2.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#228B53' },
          },
          {
            id: 'e-gpu03-w21',
            source: 'GPU-03-VRAM',
            target: 'W21',
            label: 'allocated_to (RESOLVED)',
            animated: false,
            style: { stroke: '#228B53', strokeWidth: 2.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#228B53' },
          },
          {
            id: 'e-ram02-w21',
            source: 'RAM-02',
            target: 'W21',
            label: 'allocated_to',
            animated: false,
            style: { stroke: '#52B788', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#52B788' },
          },
        ];

    return { initialNodes: rawNodes, initialEdges: rawEdges };
  }, [isCycleActive]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              BIPARTITE RESOURCE TOPOLOGY
            </span>
            <span className="text-xs font-mono text-midora-muted">• Directed Graph Analysis</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Resource Allocation & Dependency Graph
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            NetworkX directed bipartite graph modeling concurrent allocations, requests, and Tarjan cycle detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCycleActive ? (
            <button
              onClick={resolveDeadlock}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm flex items-center gap-2 transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              Break Cycle (Migrate W17)
            </button>
          ) : (
            <button
              onClick={() => migrateWorkload('W17', 'GPU-02', 'GPU-03')}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-midora-border text-midora-muted hover:text-midora-dark hover:bg-black/5 flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Re-Induce Cycle for Testing
            </button>
          )}
        </div>
      </div>

      {/* Cycle Detection Banner (Section 15) */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          isCycleActive
            ? 'border-red-300 bg-red-50/90 shadow-sm'
            : 'border-midora-green/30 bg-midora-greenLight/40'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${
                isCycleActive ? 'bg-red-100 text-red-600' : 'bg-midora-green text-white'
              }`}
            >
              {isCycleActive ? (
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase ${
                    isCycleActive ? 'bg-red-600 text-white' : 'bg-midora-green text-white'
                  }`}
                >
                  {isCycleActive ? 'CRITICAL ALERT' : 'GRAPH SAFE'}
                </span>
                <span className="text-xs font-bold text-midora-dark">
                  {isCycleActive
                    ? 'Circular Dependency Cycle Detected in Resource Allocation'
                    : 'All Graph Edges Acyclic — Zero Deadlock Hazards'}
                </span>
              </div>
              <p className="text-xs text-midora-charcoal mt-1">
                Deadlock Risk:{' '}
                <strong className={`font-mono ${isCycleActive ? 'text-red-700' : 'text-midora-greenDark'}`}>
                  {isCycleActive ? '78%' : '6.5%'}
                </strong>{' '}
                • Affected Workloads:{' '}
                <span className="font-mono">{isCycleActive ? 'W17, W21' : 'None (Safe)'}</span> •
                Affected Resources:{' '}
                <span className="font-mono">{isCycleActive ? 'GPU-03, RAM-02' : 'Nominal'}</span>
              </p>
              {isCycleActive && (
                <p className="text-[11px] text-red-700 font-mono mt-0.5">
                  Cycle path: W17 → [requests] → RAM-02 → [allocated] → W21 → [requests] → GPU-03 → [allocated] → W17
                </p>
              )}
            </div>
          </div>

          {isCycleActive && (
            <div className="flex-shrink-0">
              <button
                onClick={resolveDeadlock}
                className="px-4 py-2 rounded-md font-bold text-xs text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical transition-all"
              >
                APPLY RECOMMENDED MIGRATION
              </button>
            </div>
          )}
        </div>
      </div>

      {/* React Flow Interactive Graph Canvas */}
      <div className="midora-card overflow-hidden h-[540px] relative border border-midora-border">
        {/* Graph Legend Overlay */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-3 rounded-lg border border-midora-border shadow-soft text-xs space-y-1.5 font-mono">
          <span className="text-[10px] uppercase font-bold text-midora-muted block">
            GRAPH TOPOLOGY LEGEND
          </span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-white border-2 border-midora-sakuraDeep inline-block" />
            <span>Workload Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-midora-greenLight border border-midora-green inline-block" />
            <span>Resource Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-midora-green inline-block" />
            <span>Target Host Node</span>
          </div>
          {isCycleActive && (
            <div className="flex items-center gap-2 text-red-600 font-bold">
              <span className="w-3 h-0.5 bg-red-600 inline-block" />
              <span>Deadlock Cycle Edge</span>
            </div>
          )}
        </div>

        {/* React Flow View */}
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          onNodeClick={(_, node) => setSelectedElement(node.data.detail as string)}
          className="bg-midora-bg"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#C4BFB2" />
          <Controls className="bg-white border border-midora-border rounded shadow-soft" />
        </ReactFlow>

        {/* Inspector Detail Drawer */}
        {selectedElement && (
          <div className="absolute bottom-4 right-4 z-10 max-w-sm bg-white p-3.5 rounded-lg border border-midora-border shadow-modal text-xs animate-fade-in">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono font-bold text-midora-green text-[10px] uppercase">
                ELEMENT TELEMETRY
              </span>
              <button
                onClick={() => setSelectedElement(null)}
                className="text-midora-muted hover:text-midora-dark text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-midora-charcoal">{selectedElement}</p>
          </div>
        )}
      </div>
    </div>
  );
};
