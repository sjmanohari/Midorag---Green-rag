import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  SystemNode,
  Workload,
  Recommendation,
  ActivityEvent,
  DeadlockCycle,
  DemoState,
  AllocationScoreBreakdown,
  PriorityLevel,
  SensitivityLevel,
} from './types';
import {
  initialNodes,
  initialWorkloads,
  initialRecommendations,
  initialActivities,
  initialDeadlockCycle,
} from './initialData';

interface SimulationContextValue {
  nodes: SystemNode[];
  workloads: Workload[];
  recommendations: Recommendation[];
  activities: ActivityEvent[];
  deadlockCycle: DeadlockCycle | null;
  demoState: DemoState;
  isSimulating: boolean;
  setIsSimulating: (simulating: boolean) => void;

  // Actions
  createWorkload: (data: {
    name: string;
    type: Workload['type'];
    cpuRequired: number;
    ramRequired: number;
    gpuRequired: number;
    priority: PriorityLevel;
    maxLatency: number;
    estimatedRuntime: string;
    energySensitivity: SensitivityLevel;
    carbonSensitivity: SensitivityLevel;
  }) => Workload;
  allocateWorkload: (
    workloadId: string,
    targetNodeId: string,
    scoreBreakdown?: AllocationScoreBreakdown
  ) => void;
  migrateWorkload: (workloadId: string, fromNodeId: string, toNodeId: string) => void;
  applyRecommendation: (recommendationId: string) => void;
  ignoreRecommendation: (recommendationId: string) => void;
  runDemoScenario: () => Promise<void>;
  resetDemoScenario: () => void;
  resolveDeadlock: () => void;

  // KPI Metrics
  kpis: {
    activeWorkloads: number;
    availableNodes: string;
    avgCpu: number;
    avgRam: number;
    avgGpu: number;
    deadlockRisk: number;
    totalEnergy: number;
    estimatedCarbon: number;
    energySaved: number;
    carbonSaved: number;
  };
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<SystemNode[]>(initialNodes);
  const [workloads, setWorkloads] = useState<Workload[]>(initialWorkloads);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [activities, setActivities] = useState<ActivityEvent[]>(initialActivities);
  const [deadlockCycle, setDeadlockCycle] = useState<DeadlockCycle | null>(initialDeadlockCycle);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const [demoState, setDemoState] = useState<DemoState>({
    isActive: false,
    stage: 'idle',
    beforeMetrics: {
      cpu: 89,
      gpu: 96,
      deadlockRisk: 72,
      energy: 11.4,
      carbon: 3.8,
    },
    afterMetrics: {
      cpu: 67,
      gpu: 61,
      deadlockRisk: 8,
      energy: 8.7,
      carbon: 2.3,
    },
  });

  const getTimestamp = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  const addActivity = useCallback((event: Omit<ActivityEvent, 'id' | 'timestamp'>) => {
    const newEvent: ActivityEvent = {
      ...event,
      id: `ACT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toTimeString().split(' ')[0],
    };
    setActivities((prev) => [newEvent, ...prev.slice(0, 49)]);
  }, []);

  // Compute live KPIs
  const kpis = useMemo(() => {
    const activeWorkloads = workloads.filter((w) => w.status === 'Running').length;
    const availableNodesCount = nodes.filter((n) => n.status === 'Healthy').length;
    const avgCpu = Math.round(
      nodes.reduce((acc, n) => acc + n.cpuUsage, 0) / (nodes.length || 1)
    );
    const avgRam = Math.round(
      nodes.reduce((acc, n) => acc + n.ramUsage, 0) / (nodes.length || 1)
    );
    const avgGpu = Math.round(
      nodes.reduce((acc, n) => acc + n.gpuUsage, 0) / (nodes.length || 1)
    );
    const deadlockRisk = deadlockCycle && deadlockCycle.status === 'active' ? deadlockCycle.riskPercent : 6;
    const totalEnergy = parseFloat(
      nodes.reduce((acc, n) => acc + n.energy, 0).toFixed(1)
    );
    // Estimated carbon in kg CO2: sum(energy * carbonIntensity / 1000)
    const estimatedCarbon = parseFloat(
      nodes.reduce((acc, n) => acc + (n.energy * n.carbonIntensity) / 1000, 0).toFixed(1)
    );

    return {
      activeWorkloads,
      availableNodes: `${availableNodesCount} / ${nodes.length}`,
      avgCpu,
      avgRam,
      avgGpu,
      deadlockRisk,
      totalEnergy,
      estimatedCarbon,
      energySaved: 27.4,
      carbonSaved: 11.8,
    };
  }, [nodes, workloads, deadlockCycle]);

  // Periodic subtle dynamic fluctuation to simulate real-time cluster telemetry
  useEffect(() => {
    if (!isSimulating || demoState.isActive) return;

    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          // fluctuate CPU slightly +/- 1-3%
          const cpuDelta = (Math.random() - 0.48) * 2;
          const ramDelta = (Math.random() - 0.5) * 1.5;
          const newCpu = Math.min(99, Math.max(15, Math.round(node.cpuUsage + cpuDelta)));
          const newRam = Math.min(98, Math.max(20, Math.round(node.ramUsage + ramDelta)));
          // slight power draw fluctuation
          const powerDelta = (Math.random() - 0.48) * 8;
          const newWatts = Math.round(node.powerDrawWatts + powerDelta);

          return {
            ...node,
            cpuUsage: newCpu,
            ramUsage: newRam,
            powerDrawWatts: newWatts,
          };
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [isSimulating, demoState.isActive]);

  const createWorkload = (data: {
    name: string;
    type: Workload['type'];
    cpuRequired: number;
    ramRequired: number;
    gpuRequired: number;
    priority: PriorityLevel;
    maxLatency: number;
    estimatedRuntime: string;
    energySensitivity: SensitivityLevel;
    carbonSensitivity: SensitivityLevel;
  }): Workload => {
    const nextNum = workloads.length + 1;
    const id = `W${nextNum < 10 ? '0' + nextNum : nextNum}`;
    const newWorkload: Workload = {
      ...data,
      id,
      assignedNode: null,
      status: 'Queued',
      contentionProbability: Math.floor(Math.random() * 25) + 10,
      deadlockProbability: Math.floor(Math.random() * 20) + 5,
      createdAt: getTimestamp(),
    };

    setWorkloads((prev) => [newWorkload, ...prev]);
    addActivity({
      category: 'workload',
      severity: 'info',
      title: `Workload ${id} Submitted`,
      details: `Workload "${data.name}" (${data.cpuRequired}c/${data.ramRequired}GB/${data.gpuRequired} GPU) queued for carbon-aware scoring.`,
    });

    return newWorkload;
  };

  const allocateWorkload = (
    workloadId: string,
    targetNodeId: string,
    scoreBreakdown?: AllocationScoreBreakdown
  ) => {
    const target = nodes.find((n) => n.id === targetNodeId);
    if (!target) return;

    const wl = workloads.find((w) => w.id === workloadId);
    const cpuInc = wl ? Math.round((wl.cpuRequired / target.totalCpu) * 100) : 5;
    const ramInc = wl ? Math.round((wl.ramRequired / target.totalRam) * 100) : 4;
    const gpuInc = wl && target.totalGpu > 0 ? Math.round((wl.gpuRequired / target.totalGpu) * 100) : 0;

    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === targetNodeId) {
          const newCpu = Math.min(98, node.cpuUsage + cpuInc);
          const newRam = Math.min(98, node.ramUsage + ramInc);
          const newGpu = Math.min(100, node.gpuUsage + gpuInc);
          return {
            ...node,
            cpuUsage: newCpu,
            ramUsage: newRam,
            gpuUsage: newGpu,
            workloads: Array.from(new Set([...node.workloads, workloadId])),
            status: newCpu > 90 || newGpu > 92 ? 'Warning' : node.status,
          };
        }
        return node;
      })
    );

    setWorkloads((prev) =>
      prev.map((w) => (w.id === workloadId ? { ...w, assignedNode: targetNodeId, status: 'Running' } : w))
    );

    addActivity({
      category: 'orchestration',
      severity: 'success',
      title: `Workload ${workloadId} Allocated to ${targetNodeId}`,
      details: `Optimal node ${targetNodeId} selected with score ${scoreBreakdown?.overallScore?.toFixed(1) || '89.4'}. Resources committed.`,
    });
  };

  const migrateWorkload = (workloadId: string, fromNodeId: string, toNodeId: string) => {
    const wl = workloads.find((w) => w.id === workloadId);
    const cpuWeight = wl ? wl.cpuRequired : 8;

    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === fromNodeId) {
          const newCpu = Math.max(25, node.cpuUsage - 18);
          const newGpu = Math.max(20, node.gpuUsage - 35);
          return {
            ...node,
            cpuUsage: newCpu,
            gpuUsage: newGpu,
            workloads: node.workloads.filter((id) => id !== workloadId),
            status: newCpu < 85 && newGpu < 85 ? 'Healthy' : node.status,
          };
        }
        if (node.id === toNodeId) {
          const newCpu = Math.min(92, node.cpuUsage + 12);
          const newGpu = Math.min(85, node.gpuUsage + 28);
          return {
            ...node,
            cpuUsage: newCpu,
            gpuUsage: newGpu,
            workloads: Array.from(new Set([...node.workloads, workloadId])),
            status: newCpu < 85 ? 'Healthy' : 'Warning',
          };
        }
        return node;
      })
    );

    setWorkloads((prev) =>
      prev.map((w) =>
        w.id === workloadId
          ? {
              ...w,
              assignedNode: toNodeId,
              status: 'Running',
              deadlockProbability: Math.min(15, w.deadlockProbability / 4),
              contentionProbability: Math.min(20, w.contentionProbability / 3),
            }
          : w
      )
    );

    // If this resolved the active deadlock cycle on GPU-03
    if (deadlockCycle && deadlockCycle.suggestedMigration.workloadId === workloadId) {
      setDeadlockCycle({
        ...deadlockCycle,
        status: 'resolved',
        riskPercent: 8,
      });
    }

    addActivity({
      category: 'orchestration',
      severity: 'success',
      title: `Workload ${workloadId} Migrated`,
      details: `Reallocated from ${fromNodeId} → ${toNodeId}. Dependency cycle eliminated. Contention relieved.`,
    });
  };

  const applyRecommendation = (recommendationId: string) => {
    const rec = recommendations.find((r) => r.id === recommendationId);
    if (!rec) return;

    migrateWorkload(rec.workloadId, rec.sourceNode, rec.targetNode);

    setRecommendations((prev) =>
      prev.map((r) => (r.id === recommendationId ? { ...r, status: 'applied' } : r))
    );

    addActivity({
      category: 'orchestration',
      severity: 'success',
      title: `Recommendation Applied: ${rec.id}`,
      details: `Executed scheduled migration: Workload ${rec.workloadId} transferred from ${rec.sourceNode} to ${rec.targetNode}.`,
    });
  };

  const ignoreRecommendation = (recommendationId: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === recommendationId ? { ...r, status: 'ignored' } : r))
    );
    addActivity({
      category: 'orchestration',
      severity: 'info',
      title: `Recommendation Dismissed`,
      details: `Recommendation ${recommendationId} ignored by operator override.`,
    });
  };

  const resolveDeadlock = () => {
    if (deadlockCycle) {
      migrateWorkload(
        deadlockCycle.suggestedMigration.workloadId,
        deadlockCycle.suggestedMigration.fromNode,
        deadlockCycle.suggestedMigration.toNode
      );
    }
  };

  // Impressive Controlled Demo Scenario (Section 19)
  const runDemoScenario = async () => {
    setDemoState({
      isActive: true,
      stage: 'contention_induced',
      beforeMetrics: {
        cpu: 89,
        gpu: 96,
        deadlockRisk: 72,
        energy: 11.4,
        carbon: 3.8,
      },
      afterMetrics: {
        cpu: 67,
        gpu: 61,
        deadlockRisk: 8,
        energy: 8.7,
        carbon: 2.3,
      },
    });

    // 1. Induce contention
    setNodes((prev) =>
      prev.map((n) =>
        n.id === 'GPU-03'
          ? { ...n, cpuUsage: 89, gpuUsage: 96, status: 'Critical', energy: 38.8 }
          : n
      )
    );
    setDeadlockCycle({
      cycleId: 'DEMO-CYCLE-GPU03',
      workloadIds: ['W17', 'W21'],
      resourceIds: ['GPU-03', 'RAM-02'],
      riskPercent: 72,
      status: 'active',
      recommendedAction: 'Migrate W17 to GPU-02 (Fukushima Green Compute)',
      suggestedMigration: {
        workloadId: 'W17',
        fromNode: 'GPU-03',
        toNode: 'GPU-02',
      },
    });

    addActivity({
      category: 'demo',
      severity: 'critical',
      title: 'DEMO: Contention & Circular Dependency Induced',
      details: 'GPU-03 saturated at 96% GPU. Circular dependency established between W17 and W21.',
    });

    // 2. Detection stage (1.2s delay)
    await new Promise((r) => setTimeout(r, 1400));
    setDemoState((prev) => ({ ...prev, stage: 'deadlock_detected' }));
    addActivity({
      category: 'demo',
      severity: 'warning',
      title: 'DEMO: Tarjan Cycle Detected in Resource Graph',
      details: 'Graph Engine identified directed cycle: W17 → GPU-03 → W21 → RAM-02 → W17. Deadlock risk: 72%.',
    });

    // 3. Analysis stage (1.4s delay)
    await new Promise((r) => setTimeout(r, 1600));
    setDemoState((prev) => ({ ...prev, stage: 'analyzing' }));
    addActivity({
      category: 'demo',
      severity: 'info',
      title: 'DEMO: Multi-Objective Pareto Node Search',
      details: 'Evaluating 11 nodes. GPU-02 selected: 38% utilization, 36% lower carbon intensity, zero cycle risk.',
    });

    // 4. Migration stage (1.4s delay)
    await new Promise((r) => setTimeout(r, 1600));
    setDemoState((prev) => ({ ...prev, stage: 'migrated' }));
    migrateWorkload('W17', 'GPU-03', 'GPU-02');

    // 5. Completed stage (1.2s delay)
    await new Promise((r) => setTimeout(r, 1400));
    setDemoState((prev) => ({ ...prev, stage: 'completed' }));
    addActivity({
      category: 'demo',
      severity: 'success',
      title: 'DEMO: Optimization Complete',
      details: 'Energy consumption reduced by 23.7%. Deadlock risk slashed from 72% down to 8% (88.9% reduction).',
    });
  };

  const resetDemoScenario = () => {
    setDemoState({
      isActive: false,
      stage: 'idle',
      beforeMetrics: {
        cpu: 89,
        gpu: 96,
        deadlockRisk: 72,
        energy: 11.4,
        carbon: 3.8,
      },
      afterMetrics: {
        cpu: 67,
        gpu: 61,
        deadlockRisk: 8,
        energy: 8.7,
        carbon: 2.3,
      },
    });
    setNodes(initialNodes);
    setWorkloads(initialWorkloads);
    setRecommendations(initialRecommendations);
    setDeadlockCycle(initialDeadlockCycle);
    addActivity({
      category: 'demo',
      severity: 'info',
      title: 'Simulation State Reset',
      details: 'Default simulated topology and workload distribution restored.',
    });
  };

  return (
    <SimulationContext.Provider
      value={{
        nodes,
        workloads,
        recommendations,
        activities,
        deadlockCycle,
        demoState,
        isSimulating,
        setIsSimulating,
        createWorkload,
        allocateWorkload,
        migrateWorkload,
        applyRecommendation,
        ignoreRecommendation,
        runDemoScenario,
        resetDemoScenario,
        resolveDeadlock,
        kpis,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
