# MIDORAG
> **Carbon-Aware Resource Orchestration & Deadlock Resilience for Sustainable Cloud–Edge Systems**

![MIDORAG Logo](frontend/public/midorag-mark.svg)

---

## 🌸 Visual Identity & Aesthetic

MIDORAG is designed around an elegant, Japanese Sakura-inspired scientific computing visual identity:
- **Off-white/Warm palette**: `#FAF8F5`, `#FCFAF6` with clean expansive whitespace and subtle grid lines.
- **Botanical Green accents**: `#228B53`, `#10B981`, `#2D6A4F` reflecting carbon reduction and eco-computing.
- **Sakura Pink highlights**: `#F4A7B9`, `#FFB7C5`, `#E87A90` representing delicate precision.
- **Nature framing**: Botanical branch SVGs gracefully entering from top corners and delicate Sakura petal sprays along the bottom.
- **Falling Petal System**: Continuous, performant animated cherry blossom petals with gentle random drift and rotation.
- **Technical Typography**: Space Grotesk display headings, Inter UI typography, and JetBrains Mono metrics.

---

## ⚡ Architecture Overview

```
Receive Workload
       ↓
Analyze Infrastructure (11 Multi-Tier Nodes)
       ↓
Find Candidate Nodes (5 Cloud, 3 Edge, 3 GPU)
       ↓
Analyze Resource Availability & Headroom
       ↓
Build Bipartite Dependency Graph
       ↓
Detect Contention & Mutual Exclusion
       ↓
Detect Deadlock / Cycles (NetworkX / Tarjan DFS)
       ↓
Evaluate Host Energy & Power Draw
       ↓
Evaluate Regional Grid Carbon Impact (gCO₂/kWh)
       ↓
Evaluate SLA Network Latency
       ↓
Apply Workload Priority
       ↓
Calculate Pareto Multi-Objective Score
       ↓
Select Optimal Node & Commit Allocation
       ↓
Continuous Telemetry & Autonomous Migration
```

### Modes
- **SIMULATION MODE**: Clearly labeled throughout. Resource allocation is fully simulated with zero physical hardware dependencies.

---

## 📁 Project Structure

```
midorag/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI REST endpoints & CORS
│   │   ├── models.py            # Pydantic schemas
│   │   ├── simulation_engine.py # Cluster state manager & telemetry
│   │   ├── graph_engine.py      # NetworkX bipartite cycle detection
│   │   ├── allocation_engine.py # 10-stage decision pipeline & scoring
│   │   └── ml_module.py         # Lightweight predictive contention AI
│   ├── run.py                   # Uvicorn server launcher
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── midorag-mark.svg     # Vector brand mark
│   ├── src/
│   │   ├── assets/
│   │   │   ├── MidoragLogo.tsx          # Scalable logo component
│   │   │   ├── BotanicalDecorations.tsx # Top & bottom branch framing
│   │   │   └── SakuraPetals.tsx         # Falling petal animation
│   │   ├── components/
│   │   │   ├── Navbar.tsx               # Navigation & simulation banners
│   │   │   ├── WorkloadModal.tsx        # Workload creation modal
│   │   │   ├── AllocationModal.tsx      # 10-stage decision pipeline
│   │   │   └── NodeDetailModal.tsx      # Node telemetry inspector
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx          # Reference-inspired hero
│   │   │   ├── DashboardPage.tsx        # 8 KPI cards & overview
│   │   │   ├── InfrastructurePage.tsx   # 11 Nodes grid & gauges
│   │   │   ├── WorkloadsPage.tsx        # Workloads table & ML risk
│   │   │   ├── AllocationPipelinePage.tsx # Pipeline visualizer
│   │   │   ├── DependencyGraphPage.tsx  # React Flow interactive graph
│   │   │   ├── DeadlockPage.tsx         # Coffman matrix & cycle defense
│   │   │   ├── EnergyCarbonPage.tsx     # Recharts sustainability charts
│   │   │   ├── OptimizationPage.tsx     # Migration directives
│   │   │   ├── DemoScenarioPage.tsx     # 1-click BEFORE/AFTER benchmark
│   │   │   └── ActivityPage.tsx         # Event audit trail
│   │   ├── state/
│   │   │   ├── SimulationContext.tsx    # Reactive state store
│   │   │   ├── initialData.ts           # Initial topology seeds
│   │   │   └── types.ts                 # TypeScript interfaces
│   │   ├── services/
│   │   │   └── api.ts                   # Backend REST client
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── tailwind.config.js
└── README.md
```

---

## 🚀 Running the Application

### 1. Backend (FastAPI + NetworkX)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn networkx pydantic
python run.py
# Running at http://127.0.0.1:8000
```

### 2. Frontend (React + TypeScript + Tailwind)
```bash
cd frontend
npm install
npm run dev
# Running at http://localhost:5173
```

---

## 🔬 Key Features
1. **Interactive Dependency Graph**: Powered by React Flow, visualizing bipartite resource-request relationships and actively highlighting circular deadlocks in vibrant red/pink.
2. **Transparent Scoring**: Shows the mathematical multi-objective breakdown and reasons why a node was chosen.
3. **One-Click Demo Scenario**: Instantly induces contention on GPU-03, triggers cycle detection, reallocates to GPU-02, and presents a comprehensive BEFORE/AFTER comparison card with 23.7% energy saved and 88.9% deadlock risk reduction.
