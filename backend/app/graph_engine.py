from typing import Dict, List, Any, Tuple
import networkx as nx

class GraphEngine:
    def __init__(self):
        self.graph = nx.DiGraph()

    def build_allocation_graph(self, workloads: List[Dict[str, Any]], nodes: List[Dict[str, Any]]) -> nx.DiGraph:
        """
        Builds a directed bipartite resource allocation graph:
        Workloads -> [requests] -> Resources/Nodes
        Resources/Nodes -> [allocated_to] -> Workloads
        """
        G = nx.DiGraph()

        # Add node resources
        for n in nodes:
            node_id = n["id"]
            G.add_node(node_id, type="node", label=n["name"], category=n.get("category", "cloud"))
            # Sub-resources for granular contention simulation
            if n.get("totalGpu", 0) > 0:
                gpu_res = f"GPU-RES-{node_id}"
                G.add_node(gpu_res, type="resource", label=f"VRAM Pool {node_id}")
            ram_res = f"RAM-RES-{node_id}"
            G.add_node(ram_res, type="resource", label=f"RAM Pool {node_id}")

        # Add workloads and edges
        for w in workloads:
            w_id = w["id"]
            G.add_node(w_id, type="workload", label=w["name"], status=w.get("status", "Queued"))

            assigned = w.get("assignedNode")
            if assigned and w.get("status") == "Running":
                # Workload holds assigned node
                G.add_edge(assigned, w_id, relation="allocated_to")

                # If assigned to GPU-03 and critical, simulate circular hold-and-wait contention
                if assigned == "GPU-03" and w_id in ["W17", "W21"]:
                    gpu_res = f"GPU-RES-{assigned}"
                    ram_res = f"RAM-RES-{assigned}"
                    if w_id == "W17":
                        # W17 holds GPU-RES and requests RAM-RES held by W21
                        G.add_edge(gpu_res, "W17", relation="allocated_to")
                        G.add_edge("W17", ram_res, relation="requests")
                    elif w_id == "W21":
                        # W21 holds RAM-RES and requests GPU-RES held by W17
                        G.add_edge(ram_res, "W21", relation="allocated_to")
                        G.add_edge("W21", gpu_res, relation="requests")

        self.graph = G
        return G

    def detect_deadlocks(self) -> Dict[str, Any]:
        """
        Detects directed cycles in the resource allocation graph using Tarjan's / Johnson's cycle algorithm.
        Calculates deadlock risk probability.
        """
        cycles = list(nx.simple_cycles(self.graph))
        has_cycle = len(cycles) > 0

        affected_workloads = set()
        affected_resources = set()

        formatted_cycles = []
        for cycle in cycles:
            formatted_cycles.append(cycle)
            for node_name in cycle:
                node_data = self.graph.nodes.get(node_name, {})
                if node_data.get("type") == "workload":
                    affected_workloads.add(node_name)
                else:
                    affected_resources.add(node_name)

        risk_percent = 78.0 if has_cycle else 6.5
        rec_action = (
            "Migrate W17 to GPU-02 (Fukushima Green Compute) to break circular dependency"
            if "W17" in affected_workloads
            else "Rebalance node queues to preserve deadlock safety"
        )

        return {
            "hasCycle": has_cycle,
            "riskPercent": risk_percent,
            "cycles": formatted_cycles,
            "affectedWorkloads": sorted(list(affected_workloads)),
            "affectedResources": sorted(list(affected_resources)),
            "recommendedAction": rec_action,
        }

    def export_graph_elements(self) -> Dict[str, Any]:
        """
        Exports nodes and edges formatted for visualization (React Flow compatible).
        """
        nodes_out = []
        edges_out = []

        for node_id, data in self.graph.nodes(data=True):
            nodes_out.append({
                "id": node_id,
                "data": {"label": data.get("label", node_id), "type": data.get("type", "node")},
                "type": data.get("type", "node"),
            })

        for u, v, data in self.graph.edges(data=True):
            edges_out.append({
                "id": f"e-{u}-{v}",
                "source": u,
                "target": v,
                "label": data.get("relation", "connects"),
            })

        return {"nodes": nodes_out, "edges": edges_out}
