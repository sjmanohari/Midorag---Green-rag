import copy
from datetime import datetime
from typing import Dict, List, Any, Optional
from .graph_engine import GraphEngine
from .allocation_engine import AllocationEngine
from .ml_module import MLPredictionEngine
from .models import AllocationResponse, DeadlockAnalysisResponse, RecommendationModel

# Seed node topology
SEED_NODES = [
    {"id": "Cloud-01", "name": "Cloud-01 (Kanto-DC)", "category": "cloud", "totalCpu": 64, "totalRam": 256, "totalGpu": 4, "cpuUsage": 64.0, "ramUsage": 68.0, "gpuUsage": 50.0, "latency": 28.0, "energy": 14.2, "powerDrawWatts": 380.0, "carbonIntensity": 310.0, "status": "Healthy", "workloads": ["W01", "W04", "W09"], "region": "ap-northeast-1"},
    {"id": "Cloud-02", "name": "Cloud-02 (Kansai-DC)", "category": "cloud", "totalCpu": 64, "totalRam": 256, "totalGpu": 4, "cpuUsage": 72.0, "ramUsage": 75.0, "gpuUsage": 75.0, "latency": 34.0, "energy": 16.8, "powerDrawWatts": 420.0, "carbonIntensity": 295.0, "status": "Healthy", "workloads": ["W02", "W07"], "region": "ap-northeast-3"},
    {"id": "Cloud-03", "name": "Cloud-03 (Nordic-Hydro)", "category": "cloud", "totalCpu": 96, "totalRam": 384, "totalGpu": 8, "cpuUsage": 58.0, "ramUsage": 61.0, "gpuUsage": 62.0, "latency": 68.0, "energy": 22.4, "powerDrawWatts": 510.0, "carbonIntensity": 85.0, "status": "Healthy", "workloads": ["W03", "W11", "W14"], "region": "eu-north-1"},
    {"id": "Cloud-04", "name": "Cloud-04 (US-East)", "category": "cloud", "totalCpu": 64, "totalRam": 256, "totalGpu": 2, "cpuUsage": 79.0, "ramUsage": 81.0, "gpuUsage": 50.0, "latency": 95.0, "energy": 18.1, "powerDrawWatts": 460.0, "carbonIntensity": 390.0, "status": "Warning", "workloads": ["W05", "W12"], "region": "us-east-1"},
    {"id": "Cloud-05", "name": "Cloud-05 (Oregon-Solar)", "category": "cloud", "totalCpu": 48, "totalRam": 192, "totalGpu": 4, "cpuUsage": 45.0, "ramUsage": 52.0, "gpuUsage": 25.0, "latency": 82.0, "energy": 11.3, "powerDrawWatts": 310.0, "carbonIntensity": 140.0, "status": "Healthy", "workloads": ["W06"], "region": "us-west-2"},
    {"id": "Edge-01", "name": "Edge-01 (Tokyo Gateway)", "category": "edge", "totalCpu": 16, "totalRam": 64, "totalGpu": 1, "cpuUsage": 54.0, "ramUsage": 60.0, "gpuUsage": 0.0, "latency": 6.0, "energy": 3.1, "powerDrawWatts": 95.0, "carbonIntensity": 280.0, "status": "Healthy", "workloads": ["W08", "W15"], "region": "tokyo-edge-node-a"},
    {"id": "Edge-02", "name": "Edge-02 (Osaka Metro)", "category": "edge", "totalCpu": 16, "totalRam": 64, "totalGpu": 1, "cpuUsage": 42.0, "ramUsage": 48.0, "gpuUsage": 0.0, "latency": 8.0, "energy": 2.6, "powerDrawWatts": 82.0, "carbonIntensity": 260.0, "status": "Healthy", "workloads": ["W10"], "region": "osaka-edge-hub"},
    {"id": "Edge-03", "name": "Edge-03 (Yokohama Port)", "category": "edge", "totalCpu": 12, "totalRam": 48, "totalGpu": 1, "cpuUsage": 88.0, "ramUsage": 84.0, "gpuUsage": 100.0, "latency": 11.0, "energy": 4.8, "powerDrawWatts": 135.0, "carbonIntensity": 290.0, "status": "Warning", "workloads": ["W13", "W16"], "region": "yokohama-iot-cluster"},
    {"id": "GPU-01", "name": "GPU-01 (NVIDIA H100 Cluster A)", "category": "gpu", "totalCpu": 64, "totalRam": 512, "totalGpu": 8, "cpuUsage": 74.0, "ramUsage": 78.0, "gpuUsage": 88.0, "latency": 22.0, "energy": 32.5, "powerDrawWatts": 890.0, "carbonIntensity": 270.0, "status": "Healthy", "workloads": ["W18", "W19"], "region": "tokyo-accelerator-1"},
    {"id": "GPU-02", "name": "GPU-02 (NVIDIA A100 Eco-Cluster)", "category": "gpu", "totalCpu": 48, "totalRam": 384, "totalGpu": 8, "cpuUsage": 38.0, "ramUsage": 42.0, "gpuUsage": 38.0, "latency": 25.0, "energy": 16.2, "powerDrawWatts": 490.0, "carbonIntensity": 210.0, "status": "Healthy", "workloads": ["W20"], "region": "fukushima-green-compute"},
    {"id": "GPU-03", "name": "GPU-03 (NVIDIA A100 Dense Rack)", "category": "gpu", "totalCpu": 48, "totalRam": 384, "totalGpu": 8, "cpuUsage": 91.0, "ramUsage": 88.0, "gpuUsage": 94.0, "latency": 24.0, "energy": 38.8, "powerDrawWatts": 960.0, "carbonIntensity": 330.0, "status": "Critical", "workloads": ["W17", "W21", "W22"], "region": "tokyo-accelerator-2"},
]

SEED_WORKLOADS = [
    {"id": "W01", "name": "Kyoto Climate Carbon Forecast", "type": "AI Training", "cpuRequired": 8, "ramRequired": 32, "gpuRequired": 1, "priority": "High", "maxLatency": 80.0, "estimatedRuntime": "4.5 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "Cloud-01", "status": "Running", "contentionProbability": 18.0, "deadlockProbability": 12.0, "createdAt": "17:10:02"},
    {"id": "W02", "name": "Sensor Stream Telemetry Ingestion", "type": "Sensor Aggregation", "cpuRequired": 6, "ramRequired": 16, "gpuRequired": 0, "priority": "Medium", "maxLatency": 40.0, "estimatedRuntime": "Continuous", "energySensitivity": "Medium", "carbonSensitivity": "Medium", "assignedNode": "Cloud-02", "status": "Running", "contentionProbability": 14.0, "deadlockProbability": 8.0, "createdAt": "17:15:30"},
    {"id": "W03", "name": "Botanical Genome Transformer", "type": "AI Training", "cpuRequired": 16, "ramRequired": 64, "gpuRequired": 2, "priority": "Critical", "maxLatency": 120.0, "estimatedRuntime": "12 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "Cloud-03", "status": "Running", "contentionProbability": 22.0, "deadlockProbability": 10.0, "createdAt": "17:18:11"},
    {"id": "W04", "name": "Elastic Search Log Aggregator", "type": "Graph Analytics", "cpuRequired": 4, "ramRequired": 16, "gpuRequired": 0, "priority": "Low", "maxLatency": 150.0, "estimatedRuntime": "2 hrs", "energySensitivity": "Low", "carbonSensitivity": "Medium", "assignedNode": "Cloud-01", "status": "Running", "contentionProbability": 12.0, "deadlockProbability": 5.0, "createdAt": "17:22:45"},
    {"id": "W05", "name": "Smart Grid Power Balancer", "type": "Graph Analytics", "cpuRequired": 12, "ramRequired": 48, "gpuRequired": 0, "priority": "High", "maxLatency": 60.0, "estimatedRuntime": "Continuous", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "Cloud-04", "status": "Running", "contentionProbability": 48.0, "deadlockProbability": 32.0, "createdAt": "17:28:10"},
    {"id": "W06", "name": "Ocean Buoy Marine Telemetry", "type": "Sensor Aggregation", "cpuRequired": 4, "ramRequired": 12, "gpuRequired": 0, "priority": "Low", "maxLatency": 200.0, "estimatedRuntime": "6 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "Cloud-05", "status": "Running", "contentionProbability": 8.0, "deadlockProbability": 4.0, "createdAt": "17:31:00"},
    {"id": "W07", "name": "Vector Database Indexing", "type": "Graph Analytics", "cpuRequired": 10, "ramRequired": 32, "gpuRequired": 1, "priority": "Medium", "maxLatency": 90.0, "estimatedRuntime": "1.5 hrs", "energySensitivity": "Medium", "carbonSensitivity": "Medium", "assignedNode": "Cloud-02", "status": "Running", "contentionProbability": 25.0, "deadlockProbability": 15.0, "createdAt": "17:35:19"},
    {"id": "W08", "name": "Autonomous Vehicle Edge V2X", "type": "Edge Stream", "cpuRequired": 4, "ramRequired": 16, "gpuRequired": 0, "priority": "Critical", "maxLatency": 15.0, "estimatedRuntime": "Continuous", "energySensitivity": "Medium", "carbonSensitivity": "Low", "assignedNode": "Edge-01", "status": "Running", "contentionProbability": 20.0, "deadlockProbability": 10.0, "createdAt": "17:40:05"},
    {"id": "W09", "name": "Renewable Dispatch Optimizer", "type": "Graph Analytics", "cpuRequired": 6, "ramRequired": 24, "gpuRequired": 0, "priority": "High", "maxLatency": 75.0, "estimatedRuntime": "3 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "Cloud-01", "status": "Running", "contentionProbability": 16.0, "deadlockProbability": 9.0, "createdAt": "17:42:22"},
    {"id": "W10", "name": "Subway Sensor Stream Monitor", "type": "Edge Stream", "cpuRequired": 3, "ramRequired": 8, "gpuRequired": 0, "priority": "Medium", "maxLatency": 25.0, "estimatedRuntime": "Continuous", "energySensitivity": "Medium", "carbonSensitivity": "Medium", "assignedNode": "Edge-02", "status": "Running", "contentionProbability": 11.0, "deadlockProbability": 6.0, "createdAt": "17:44:50"},
    {"id": "W11", "name": "Nordic Clean Energy Grid Model", "type": "AI Training", "cpuRequired": 14, "ramRequired": 48, "gpuRequired": 2, "priority": "High", "maxLatency": 100.0, "estimatedRuntime": "8 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "Cloud-03", "status": "Running", "contentionProbability": 24.0, "deadlockProbability": 14.0, "createdAt": "17:48:10"},
    {"id": "W12", "name": "Regional Supply Chain Simulator", "type": "Graph Analytics", "cpuRequired": 8, "ramRequired": 32, "gpuRequired": 0, "priority": "Medium", "maxLatency": 120.0, "estimatedRuntime": "5 hrs", "energySensitivity": "Low", "carbonSensitivity": "Low", "assignedNode": "Cloud-04", "status": "Running", "contentionProbability": 42.0, "deadlockProbability": 28.0, "createdAt": "17:50:35"},
    {"id": "W13", "name": "Port Robotics Vision Stream", "type": "Edge Stream", "cpuRequired": 4, "ramRequired": 16, "gpuRequired": 1, "priority": "High", "maxLatency": 20.0, "estimatedRuntime": "Continuous", "energySensitivity": "Medium", "carbonSensitivity": "Medium", "assignedNode": "Edge-03", "status": "Running", "contentionProbability": 76.0, "deadlockProbability": 60.0, "createdAt": "17:52:00"},
    {"id": "W14", "name": "Atmospheric CO2 Diffusion PDE", "type": "Graph Analytics", "cpuRequired": 12, "ramRequired": 40, "gpuRequired": 1, "priority": "High", "maxLatency": 110.0, "estimatedRuntime": "7 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "Cloud-03", "status": "Running", "contentionProbability": 19.0, "deadlockProbability": 11.0, "createdAt": "17:54:15"},
    {"id": "W15", "name": "Urban Pedestrian Traffic Vision", "type": "Edge Stream", "cpuRequired": 3, "ramRequired": 12, "gpuRequired": 0, "priority": "Medium", "maxLatency": 30.0, "estimatedRuntime": "Continuous", "energySensitivity": "Medium", "carbonSensitivity": "Medium", "assignedNode": "Edge-01", "status": "Running", "contentionProbability": 15.0, "deadlockProbability": 7.0, "createdAt": "17:55:00"},
    {"id": "W16", "name": "Harbor Automated Guided Vehicle", "type": "Edge Stream", "cpuRequired": 4, "ramRequired": 14, "gpuRequired": 0, "priority": "High", "maxLatency": 18.0, "estimatedRuntime": "Continuous", "energySensitivity": "Medium", "carbonSensitivity": "Medium", "assignedNode": "Edge-03", "status": "Running", "contentionProbability": 68.0, "deadlockProbability": 52.0, "createdAt": "17:56:40"},
    {"id": "W17", "name": "Fine-Tuning Sakura-70B Eco-LLM", "type": "AI Training", "cpuRequired": 16, "ramRequired": 128, "gpuRequired": 3, "priority": "Critical", "maxLatency": 50.0, "estimatedRuntime": "6 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "GPU-03", "status": "Running", "contentionProbability": 88.0, "deadlockProbability": 78.0, "createdAt": "17:58:00"},
    {"id": "W18", "name": "Medical Radiology Foundation Model", "type": "AI Training", "cpuRequired": 14, "ramRequired": 96, "gpuRequired": 3, "priority": "Critical", "maxLatency": 60.0, "estimatedRuntime": "10 hrs", "energySensitivity": "Medium", "carbonSensitivity": "Medium", "assignedNode": "GPU-01", "status": "Running", "contentionProbability": 34.0, "deadlockProbability": 20.0, "createdAt": "17:59:12"},
    {"id": "W19", "name": "Real-time Protein Folding FoldingNet", "type": "LLM Inference", "cpuRequired": 12, "ramRequired": 64, "gpuRequired": 2, "priority": "High", "maxLatency": 45.0, "estimatedRuntime": "4 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "GPU-01", "status": "Running", "contentionProbability": 30.0, "deadlockProbability": 18.0, "createdAt": "18:00:00"},
    {"id": "W20", "name": "Satellite Forest Canopy Carbon Biomass", "type": "AI Training", "cpuRequired": 8, "ramRequired": 48, "gpuRequired": 2, "priority": "High", "maxLatency": 70.0, "estimatedRuntime": "3.5 hrs", "energySensitivity": "High", "carbonSensitivity": "High", "assignedNode": "GPU-02", "status": "Running", "contentionProbability": 14.0, "deadlockProbability": 9.0, "createdAt": "18:01:25"},
    {"id": "W21", "name": "Multi-Modal Video Generation Worker A", "type": "AI Training", "cpuRequired": 10, "ramRequired": 64, "gpuRequired": 2, "priority": "High", "maxLatency": 55.0, "estimatedRuntime": "5 hrs", "energySensitivity": "Medium", "carbonSensitivity": "Medium", "assignedNode": "GPU-03", "status": "Running", "contentionProbability": 82.0, "deadlockProbability": 74.0, "createdAt": "18:02:10"},
    {"id": "W22", "name": "3D Diffusion Neural Radiance Field", "type": "AI Training", "cpuRequired": 8, "ramRequired": 48, "gpuRequired": 2, "priority": "Medium", "maxLatency": 65.0, "estimatedRuntime": "2.5 hrs", "energySensitivity": "Low", "carbonSensitivity": "Medium", "assignedNode": "GPU-03", "status": "Running", "contentionProbability": 79.0, "deadlockProbability": 71.0, "createdAt": "18:03:00"},
]

class SimulationEngine:
    def __init__(self):
        self.nodes = copy.deepcopy(SEED_NODES)
        self.workloads = copy.deepcopy(SEED_WORKLOADS)
        self.graph_engine = GraphEngine()
        self.allocation_engine = AllocationEngine()
        self.ml_engine = MLPredictionEngine()
        self.refresh_graph()

    def refresh_graph(self):
        self.graph_engine.build_allocation_graph(self.workloads, self.nodes)

    def get_nodes(self) -> List[Dict[str, Any]]:
        return self.nodes

    def get_workloads(self) -> List[Dict[str, Any]]:
        return self.workloads

    def get_deadlock_status(self) -> DeadlockAnalysisResponse:
        self.refresh_graph()
        data = self.graph_engine.detect_deadlocks()
        return DeadlockAnalysisResponse(**data)

    def allocate_workload(self, workload_id: str, target_node_id: Optional[str] = None) -> AllocationResponse:
        wl = next((w for w in self.workloads if w["id"] == workload_id), None)
        if not wl:
            # Create a mock workload if not present
            wl = {
                "id": workload_id,
                "name": "New Dynamic Workload",
                "type": "AI Training",
                "cpuRequired": 8,
                "ramRequired": 32,
                "gpuRequired": 1,
                "priority": "High",
                "maxLatency": 50.0,
            }

        response = self.allocation_engine.select_optimal_node(wl, self.nodes)
        chosen_node = target_node_id or response.recommendedNodeId

        # Apply state changes
        for n in self.nodes:
            if n["id"] == chosen_node:
                n["cpuUsage"] = min(98.0, n["cpuUsage"] + round((wl["cpuRequired"] / n["totalCpu"]) * 100, 1))
                if wl["gpuRequired"] > 0 and n["totalGpu"] > 0:
                    n["gpuUsage"] = min(100.0, n["gpuUsage"] + round((wl["gpuRequired"] / n["totalGpu"]) * 100, 1))
                if workload_id not in n["workloads"]:
                    n["workloads"].append(workload_id)
                if n["cpuUsage"] > 90 or n["gpuUsage"] > 90:
                    n["status"] = "Warning"

        for w in self.workloads:
            if w["id"] == workload_id:
                w["assignedNode"] = chosen_node
                w["status"] = "Running"

        self.refresh_graph()
        return response

    def migrate(self, workload_id: str, from_node_id: str, to_node_id: str):
        for n in self.nodes:
            if n["id"] == from_node_id:
                n["cpuUsage"] = max(20.0, n["cpuUsage"] - 18.0)
                n["gpuUsage"] = max(15.0, n["gpuUsage"] - 35.0)
                n["workloads"] = [w for w in n["workloads"] if w != workload_id]
                if n["cpuUsage"] < 85 and n["gpuUsage"] < 85:
                    n["status"] = "Healthy"
            if n["id"] == to_node_id:
                n["cpuUsage"] = min(92.0, n["cpuUsage"] + 12.0)
                n["gpuUsage"] = min(85.0, n["gpuUsage"] + 28.0)
                if workload_id not in n["workloads"]:
                    n["workloads"].append(workload_id)

        for w in self.workloads:
            if w["id"] == workload_id:
                w["assignedNode"] = to_node_id
                w["deadlockProbability"] = 8.0
                w["contentionProbability"] = 12.0

        self.refresh_graph()

    def reset(self):
        self.nodes = copy.deepcopy(SEED_NODES)
        self.workloads = copy.deepcopy(SEED_WORKLOADS)
        self.refresh_graph()
