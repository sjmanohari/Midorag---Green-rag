from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class NodeModel(BaseModel):
    id: str
    name: str
    category: str # 'cloud' | 'edge' | 'gpu'
    totalCpu: int
    totalRam: int
    totalGpu: int
    cpuUsage: float
    ramUsage: float
    gpuUsage: float
    latency: float
    energy: float
    powerDrawWatts: float
    carbonIntensity: float
    status: str # 'Healthy' | 'Warning' | 'Critical'
    workloads: List[str] = []
    region: str

class WorkloadModel(BaseModel):
    id: str
    name: str
    type: str
    cpuRequired: int
    ramRequired: int
    gpuRequired: int
    priority: str # 'Critical' | 'High' | 'Medium' | 'Low'
    maxLatency: float
    estimatedRuntime: str
    energySensitivity: str # 'High' | 'Medium' | 'Low'
    carbonSensitivity: str # 'High' | 'Medium' | 'Low'
    assignedNode: Optional[str] = None
    status: str = 'Queued'
    contentionProbability: float = 0.0
    deadlockProbability: float = 0.0
    createdAt: str = ""

class AllocationRequest(BaseModel):
    workloadId: str
    targetNodeId: Optional[str] = None

class ScoreBreakdownModel(BaseModel):
    nodeId: str
    overallScore: float
    resourceAvailabilityScore: float
    latencyScore: float
    energyEfficiencyScore: float
    carbonEfficiencyScore: float
    deadlockSafetyScore: float
    contentionSafetyScore: float
    justifications: List[str]

class AllocationResponse(BaseModel):
    recommendedNodeId: str
    overallScore: float
    breakdown: ScoreBreakdownModel
    pipelineSteps: List[Dict[str, Any]]

class DeadlockAnalysisResponse(BaseModel):
    hasCycle: bool
    riskPercent: float
    cycles: List[Any]
    affectedWorkloads: List[str]
    affectedResources: List[str]
    recommendedAction: str

class RecommendationModel(BaseModel):
    id: str
    workloadId: str
    sourceNode: str
    targetNode: str
    reason: str
    expectedEnergyReduction: float
    expectedCarbonReduction: float
    expectedLatencyReduction: float
    expectedDeadlockReduction: float
    status: str = "pending"
    timestamp: str

class MLPredictionResponse(BaseModel):
    workloadId: str
    contentionProbability: float
    deadlockProbability: float
    overloadProbability: float
    recommendation: str
