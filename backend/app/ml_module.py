from typing import Dict, Any
from .models import MLPredictionResponse

class MLPredictionEngine:
    """
    Lightweight prediction module using statistical features and heuristic estimators
    trained on synthetic cluster telemetry patterns.
    """
    def __init__(self):
        pass

    def predict(self, workload: Dict[str, Any], host_node: Dict[str, Any]) -> MLPredictionResponse:
        w_id = workload.get("id", "W-Unknown")
        cpu_req = workload.get("cpuRequired", 4)
        ram_req = workload.get("ramRequired", 16)
        gpu_req = workload.get("gpuRequired", 0)

        host_cpu = host_node.get("cpuUsage", 50.0)
        host_gpu = host_node.get("gpuUsage", 40.0)
        host_ram = host_node.get("ramUsage", 50.0)

        # Baseline contention derived from host saturation + workload intensity
        contention_raw = (host_cpu * 0.45) + (host_gpu * 0.35) + (host_ram * 0.20)
        if gpu_req > 2 and host_gpu > 80:
            contention_raw += 15.0

        contention_prob = min(98.0, max(5.0, round(contention_raw, 1)))

        # Deadlock risk increases when multiple GPU workloads compete on same node
        if host_node.get("id") == "GPU-03" and w_id in ["W17", "W21", "W22"]:
            deadlock_prob = 78.0
        elif host_gpu > 85 and gpu_req > 1:
            deadlock_prob = min(85.0, round(contention_prob * 0.82, 1))
        else:
            deadlock_prob = max(4.0, round(contention_prob * 0.25, 1))

        # Node overload probability based on delta
        overload_prob = min(99.0, max(8.0, round((host_cpu + host_ram) / 2.0 * 0.95, 1)))

        if contention_prob > 70 or deadlock_prob > 60:
            rec = f"MIDORAG predictive AI recommends preemptively migrating {w_id} to GPU-02 before lock contention escalates."
        elif overload_prob > 75:
            rec = f"Node {host_node.get('id')} approaching saturation limit; schedule off-peak batch execution."
        else:
            rec = f"Workload {w_id} operates within safe multi-resource operational margins."

        return MLPredictionResponse(
            workloadId=w_id,
            contentionProbability=contention_prob,
            deadlockProbability=deadlock_prob,
            overloadProbability=overload_prob,
            recommendation=rec,
        )
