export type NodeCategory = 'cloud' | 'edge' | 'gpu';
export type NodeStatus = 'Healthy' | 'Warning' | 'Critical';
export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type SensitivityLevel = 'High' | 'Medium' | 'Low';
export type WorkloadStatus = 'Running' | 'Queued' | 'Migrating' | 'Blocked';

export interface SystemNode {
  id: string; // e.g. "Cloud-01", "Edge-01", "GPU-01"
  name: string;
  category: NodeCategory;
  totalCpu: number; // cores
  totalRam: number; // GB
  totalGpu: number; // units
  cpuUsage: number; // percent
  ramUsage: number; // percent
  gpuUsage: number; // percent
  latency: number; // ms
  energy: number; // kWh
  powerDrawWatts: number; // current W
  carbonIntensity: number; // gCO2/kWh
  status: NodeStatus;
  workloads: string[]; // workload IDs
  region: string;
}

export interface Workload {
  id: string; // e.g. "W17"
  name: string;
  type: 'AI Training' | 'LLM Inference' | 'Edge Stream' | 'Graph Analytics' | 'Sensor Aggregation';
  cpuRequired: number;
  ramRequired: number;
  gpuRequired: number;
  priority: PriorityLevel;
  maxLatency: number; // ms
  estimatedRuntime: string;
  energySensitivity: SensitivityLevel;
  carbonSensitivity: SensitivityLevel;
  assignedNode: string | null;
  status: WorkloadStatus;
  contentionProbability: number; // 0-100
  deadlockProbability: number; // 0-100
  createdAt: string;
}

export interface Recommendation {
  id: string;
  workloadId: string;
  sourceNode: string;
  targetNode: string;
  reason: string;
  expectedEnergyReduction: number; // percent
  expectedCarbonReduction: number; // percent
  expectedLatencyReduction: number; // percent
  expectedDeadlockReduction: number; // percent
  status: 'pending' | 'applied' | 'ignored';
  timestamp: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  category: 'workload' | 'orchestration' | 'deadlock' | 'energy' | 'demo';
  severity: 'info' | 'success' | 'warning' | 'critical';
  title: string;
  details: string;
}

export interface DeadlockCycle {
  cycleId: string;
  workloadIds: string[];
  resourceIds: string[];
  riskPercent: number;
  status: 'active' | 'resolved';
  recommendedAction: string;
  suggestedMigration: {
    workloadId: string;
    fromNode: string;
    toNode: string;
  };
}

export interface AllocationScoreBreakdown {
  nodeId: string;
  overallScore: number;
  resourceAvailabilityScore: number;
  latencyScore: number;
  energyEfficiencyScore: number;
  carbonEfficiencyScore: number;
  deadlockSafetyScore: number;
  contentionSafetyScore: number;
  justifications: string[];
}

export interface DemoState {
  isActive: boolean;
  stage: 'idle' | 'contention_induced' | 'deadlock_detected' | 'analyzing' | 'migrated' | 'completed';
  beforeMetrics: {
    cpu: number;
    gpu: number;
    deadlockRisk: number;
    energy: number;
    carbon: number;
  };
  afterMetrics: {
    cpu: number;
    gpu: number;
    deadlockRisk: number;
    energy: number;
    carbon: number;
  };
}
