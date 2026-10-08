from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List
from .simulation_engine import SimulationEngine
from .models import (
    AllocationRequest,
    AllocationResponse,
    DeadlockAnalysisResponse,
    MLPredictionResponse,
    WorkloadModel,
)

app = FastAPI(
    title="MIDORAG Engine API",
    description="Carbon-Aware Resource Orchestration & Deadlock Resilience API",
    version="1.0.0",
)

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = SimulationEngine()

@app.get("/")
def read_root():
    return {
        "system": "MIDORAG",
        "description": "Carbon-Aware Resource Orchestration & Deadlock Resilience",
        "mode": "SIMULATION MODE",
        "status": "System Operational",
        "version": "1.0.0",
    }

@app.get("/api/status")
def get_status():
    deadlock_info = engine.get_deadlock_status()
    nodes = engine.get_nodes()
    workloads = engine.get_workloads()
    return {
        "mode": "SIMULATION MODE",
        "simulationDisclaimer": "Resource allocation is simulated.",
        "operational": True,
        "nodesCount": len(nodes),
        "workloadsCount": len(workloads),
        "deadlockRisk": deadlock_info.riskPercent,
        "hasCycle": deadlock_info.hasCycle,
    }

@app.get("/api/nodes")
def get_nodes():
    return engine.get_nodes()

@app.get("/api/workloads")
def get_workloads():
    return engine.get_workloads()

@app.post("/api/workloads")
def create_workload(workload: WorkloadModel):
    w_dict = workload.model_dump()
    engine.workloads.insert(0, w_dict)
    engine.refresh_graph()
    return w_dict

@app.post("/api/allocate", response_model=AllocationResponse)
def allocate_workload(req: AllocationRequest):
    return engine.allocate_workload(req.workloadId, req.targetNodeId)

@app.get("/api/deadlock-analysis", response_model=DeadlockAnalysisResponse)
def analyze_deadlocks():
    return engine.get_deadlock_status()

@app.get("/api/graph-elements")
def get_graph_elements():
    engine.refresh_graph()
    return engine.graph_engine.export_graph_elements()

@app.post("/api/migrate")
def migrate_workload(payload: Dict[str, str]):
    w_id = payload.get("workloadId")
    from_node = payload.get("fromNodeId")
    to_node = payload.get("toNodeId")
    if not (w_id and from_node and to_node):
        raise HTTPException(status_code=400, detail="Missing required parameters")
    engine.migrate(w_id, from_node, to_node)
    return {"status": "success", "migrated": w_id, "from": from_node, "to": to_node}

@app.get("/api/predict/{workload_id}", response_model=MLPredictionResponse)
def predict_workload(workload_id: str):
    wl = next((w for w in engine.workloads if w["id"] == workload_id), None)
    if not wl:
        raise HTTPException(status_code=404, detail="Workload not found")
    host_node = next((n for n in engine.nodes if n["id"] == wl.get("assignedNode")), engine.nodes[0])
    return engine.ml_engine.predict(wl, host_node)

@app.post("/api/reset")
def reset_simulation():
    engine.reset()
    return {"status": "reset_completed"}
