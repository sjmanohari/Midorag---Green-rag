import React from 'react';
import { useSimulation } from '../state/SimulationContext';
import {
  Layers,
  Cpu,
  HardDrive,
  Zap,
  ShieldAlert,
  Globe,
  Server,
  Play,
  TrendingDown,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (tab: any) => void;
  onOpenCreateWorkload: () => void;
  onRunDemo: () => void;
  onSelectNode: (node: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenCreateWorkload,
  onRunDemo,
  onSelectNode,
}) => {
  const {
    nodes,
    workloads,
    kpis,
    deadlockCycle,
    recommendations,
    activities,
    applyRecommendation,
    resolveDeadlock,
  } = useSimulation();

  const pendingRec = recommendations.find((r) => r.status === 'pending');
  const hasActiveDeadlock = deadlockCycle && deadlockCycle.status === 'active';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              CLUSTER TELEMETRY OVERVIEW
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-midora-sakuraSoft text-midora-sakuraDeep font-bold border border-midora-sakuraBorder">
              SIMULATION ENGINE
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Resource Orchestration & Carbon Metrics
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Real-time multi-tier cloud-edge scheduler with graph cycle deadlock avoidance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRunDemo}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-midora-sakuraBorder text-midora-sakuraDeep hover:bg-midora-sakuraSoft/60 shadow-sakura flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run Demo Scenario
          </button>
          <button
            onClick={onOpenCreateWorkload}
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            + Create Workload
          </button>
        </div>
      </div>

      {/* Deadlock Risk Alert Banner if active cycle exists (Section 15) */}
      {hasActiveDeadlock && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5 flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-red-600 text-white">
                  CRITICAL
                </span>
                <span className="text-xs font-bold text-red-900">
                  Circular Dependency Detected in Resource Allocation Graph
                </span>
              </div>
              <p className="text-xs text-red-700 mt-1">
                Deadlock Risk: <strong className="font-mono">{deadlockCycle.riskPercent}%</strong> •
                Affected Workloads: {deadlockCycle.workloadIds.join(', ')} • Affected Resources: {deadlockCycle.resourceIds.join(', ')}
              </p>
              <p className="text-[11px] text-red-600 mt-0.5">
                Recommended Action: {deadlockCycle.recommendedAction}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onNavigate('deadlock')}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-red-300 text-red-700 hover:bg-red-50"
            >
              Inspect Graph
            </button>
            <button
              onClick={resolveDeadlock}
              className="px-3.5 py-1.5 rounded-md text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs"
            >
              Apply Mitigation
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          8 DASHBOARD KPI CARDS (Section 9)
          - Active Workloads
          - Available Nodes
          - CPU Utilization
          - RAM Utilization
          - GPU Utilization
          - Deadlock Risk
          - Energy Consumption
          - Estimated Carbon
          ======================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* 1. Active Workloads */}
        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">Active Workloads</span>
            <Layers className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-display font-bold text-midora-dark">
              {kpis.activeWorkloads}
            </span>
            <span className="text-[11px] font-mono text-midora-green font-semibold">
              {workloads.length} Total
            </span>
          </div>
          <div className="mt-2 text-[10px] text-midora-muted font-mono">
            {workloads.filter((w) => w.priority === 'Critical').length} Critical Priority
          </div>
        </div>

        {/* 2. Available Nodes */}
        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">Available Nodes</span>
            <Server className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-display font-bold text-midora-dark">
              {kpis.availableNodes}
            </span>
            <span className="text-[11px] font-mono text-midora-green font-semibold">Healthy</span>
          </div>
          <div className="mt-2 text-[10px] text-midora-muted font-mono">
            5 Cloud • 3 Edge • 3 GPU
          </div>
        </div>

        {/* 3. CPU Utilization */}
        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">CPU Utilization</span>
            <Cpu className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-dark">
              {kpis.avgCpu}%
            </span>
            <span className="text-[11px] font-mono text-midora-muted">Cluster Avg</span>
          </div>
          <div className="w-full bg-midora-bgWarm h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${kpis.avgCpu > 80 ? 'bg-midora-danger' : 'bg-midora-green'}`}
              style={{ width: `${kpis.avgCpu}%` }}
            />
          </div>
        </div>

        {/* 4. RAM Utilization */}
        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">RAM Utilization</span>
            <HardDrive className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-dark">
              {kpis.avgRam}%
            </span>
            <span className="text-[11px] font-mono text-midora-muted">Committed</span>
          </div>
          <div className="w-full bg-midora-bgWarm h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${kpis.avgRam > 80 ? 'bg-midora-danger' : 'bg-midora-green'}`}
              style={{ width: `${kpis.avgRam}%` }}
            />
          </div>
        </div>

        {/* 5. GPU Utilization */}
        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">GPU Utilization</span>
            <Zap className="w-4 h-4 text-midora-sakuraDeep" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-dark">
              {kpis.avgGpu}%
            </span>
            <span className="text-[11px] font-mono text-midora-sakuraDeep font-semibold">
              3 Nodes
            </span>
          </div>
          <div className="w-full bg-midora-bgWarm h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${kpis.avgGpu > 85 ? 'bg-midora-danger' : 'bg-midora-sakuraDeep'}`}
              style={{ width: `${kpis.avgGpu}%` }}
            />
          </div>
        </div>

        {/* 6. Deadlock Risk */}
        <div
          className={`midora-card p-4 transition-colors ${
            kpis.deadlockRisk > 50 ? 'border-red-300 bg-red-50/40' : ''
          }`}
        >
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">Deadlock Risk</span>
            <ShieldAlert
              className={`w-4 h-4 ${kpis.deadlockRisk > 50 ? 'text-red-600 animate-pulse' : 'text-midora-green'}`}
            />
          </div>
          <div className="flex items-baseline justify-between">
            <span
              className={`text-2xl sm:text-3xl font-mono font-bold ${
                kpis.deadlockRisk > 50 ? 'text-red-700' : 'text-midora-dark'
              }`}
            >
              {kpis.deadlockRisk}%
            </span>
            <span
              className={`text-[11px] font-mono font-bold ${
                kpis.deadlockRisk > 50 ? 'text-red-600' : 'text-midora-green'
              }`}
            >
              {kpis.deadlockRisk > 50 ? 'CRITICAL' : 'RESILIENT'}
            </span>
          </div>
          <div className="mt-2 text-[10px] text-midora-muted font-mono">
            {hasActiveDeadlock ? '1 Circular Wait Detected' : 'Zero Graph Cycles'}
          </div>
        </div>

        {/* 7. Energy Consumption */}
        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">Energy Consumption</span>
            <Zap className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-dark">
              {kpis.totalEnergy}
            </span>
            <span className="text-xs font-mono text-midora-muted">kWh</span>
          </div>
          <div className="mt-2 text-[10px] text-midora-greenDark font-mono font-semibold flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-midora-green" /> -27.4 kWh Optimized
          </div>
        </div>

        {/* 8. Estimated Carbon */}
        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">Estimated Carbon</span>
            <Globe className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-greenDark">
              {kpis.estimatedCarbon}
            </span>
            <span className="text-xs font-mono text-midora-muted">kg CO₂</span>
          </div>
          <div className="mt-2 text-[10px] text-midora-green font-mono font-semibold flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-midora-green" /> -11.8 kg CO₂ Saved
          </div>
        </div>
      </div>

      {/* Middle Section: Node Grid Preview & Live Optimization Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Topology Quick Grid (2 cols) */}
        <div className="lg:col-span-2 midora-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-display font-bold text-midora-dark">
                Interactive Infrastructure Nodes (11)
              </h2>
              <p className="text-xs text-midora-muted">
                Click any node to view real-time memory buffers, latency, and hosted workloads.
              </p>
            </div>
            <button
              onClick={() => onNavigate('infrastructure')}
              className="text-xs font-bold text-midora-green hover:underline flex items-center gap-1"
            >
              Full View <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => onSelectNode(node)}
                className={`p-3 rounded-lg border transition-all cursor-pointer hover:shadow-sm ${
                  node.status === 'Critical'
                    ? 'border-red-300 bg-red-50/60'
                    : node.status === 'Warning'
                    ? 'border-amber-200 bg-amber-50/40'
                    : 'border-midora-borderSubtle bg-white hover:border-midora-green/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-xs text-midora-dark">{node.id}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      node.status === 'Healthy'
                        ? 'bg-midora-green'
                        : node.status === 'Warning'
                        ? 'bg-amber-500'
                        : 'bg-red-500 animate-pulse'
                    }`}
                  />
                </div>
                <div className="text-[10px] text-midora-muted font-mono truncate mb-2">
                  {node.region}
                </div>
                <div className="space-y-1 text-[10px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-midora-muted">CPU:</span>
                    <span className="font-bold">{node.cpuUsage}%</span>
                  </div>
                  {node.totalGpu > 0 && (
                    <div className="flex justify-between">
                      <span className="text-midora-muted">GPU:</span>
                      <span className="font-bold text-midora-sakuraDeep">{node.gpuUsage}%</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-midora-muted">Ping:</span>
                    <span>{node.latency}ms</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Optimization Recommendation Card (Section 16 & 18) */}
        <div className="midora-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-midora-green">
                RECOMMENDATION #01
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-midora-greenLight text-midora-greenDark">
                Active Suggestion
              </span>
            </div>

            {pendingRec ? (
              <div className="space-y-3.5">
                <div>
                  <h3 className="text-sm font-bold text-midora-dark">
                    Reallocate Workload {pendingRec.workloadId}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 font-mono text-xs text-midora-dark font-semibold">
                    <span className="px-2 py-0.5 rounded bg-midora-bgWarm border border-midora-border">
                      {pendingRec.sourceNode}
                    </span>
                    <span className="text-midora-muted">→</span>
                    <span className="px-2 py-0.5 rounded bg-midora-greenLight border border-midora-green/30 text-midora-greenDark">
                      {pendingRec.targetNode}
                    </span>
                  </div>
                  <p className="text-xs text-midora-muted mt-2 leading-relaxed">
                    {pendingRec.reason}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-midora-bgWarm/60 border border-midora-borderSubtle space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] text-midora-muted uppercase font-bold block">
                    EXPECTED IMPACT:
                  </span>
                  <div className="flex justify-between text-midora-greenDark">
                    <span>Energy Consumption:</span>
                    <span className="font-bold">↓ {pendingRec.expectedEnergyReduction}%</span>
                  </div>
                  <div className="flex justify-between text-midora-greenDark">
                    <span>Carbon Footprint:</span>
                    <span className="font-bold">↓ {pendingRec.expectedCarbonReduction}%</span>
                  </div>
                  <div className="flex justify-between text-midora-greenDark">
                    <span>Network Latency:</span>
                    <span className="font-bold">↓ {pendingRec.expectedLatencyReduction}%</span>
                  </div>
                  <div className="flex justify-between text-midora-emerald font-bold">
                    <span>Deadlock Risk:</span>
                    <span>↓ {pendingRec.expectedDeadlockReduction}%</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => applyRecommendation(pendingRec.id)}
                    className="flex-1 py-2 rounded-md font-bold text-xs text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical transition-all"
                  >
                    APPLY RECOMMENDATION
                  </button>
                  <button
                    onClick={() => onNavigate('optimization')}
                    className="px-3 py-2 rounded-md font-semibold text-xs border border-midora-border text-midora-muted hover:bg-black/5"
                  >
                    Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <CheckCircle className="w-8 h-8 text-midora-green mx-auto" />
                <p className="text-xs font-semibold text-midora-dark">Cluster Fully Optimized</p>
                <p className="text-[11px] text-midora-muted">Zero pending migrations required.</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-midora-borderSubtle mt-4 flex items-center justify-between text-[11px] font-mono text-midora-muted">
            <span>PARETO ENGINE</span>
            <span>STATUS: READY</span>
          </div>
        </div>
      </div>

      {/* Activity Log Preview */}
      <div className="midora-card p-5">
        <div className="flex items-center justify-between mb-3 border-b border-midora-borderSubtle pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-midora-green">REAL-TIME EVENTS</span>
            <span className="text-xs font-display font-bold text-midora-dark">
              Simulation Activity Feed
            </span>
          </div>
          <button
            onClick={() => onNavigate('activity')}
            className="text-xs font-bold text-midora-green hover:underline flex items-center gap-1"
          >
            View Full Log ({activities.length}) →
          </button>
        </div>

        <div className="divide-y divide-midora-borderSubtle text-xs">
          {activities.slice(0, 4).map((act) => (
            <div key={act.id} className="py-2.5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-[11px] text-midora-muted mt-0.5">
                  {act.timestamp}
                </span>
                <div>
                  <p className="font-semibold text-midora-dark">{act.title}</p>
                  <p className="text-[11px] text-midora-muted mt-0.5">{act.details}</p>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold flex-shrink-0 ${
                  act.severity === 'critical'
                    ? 'bg-red-100 text-red-700'
                    : act.severity === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : act.severity === 'success'
                    ? 'bg-midora-greenLight text-midora-greenDark'
                    : 'bg-midora-bgWarm text-midora-muted'
                }`}
              >
                {act.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
