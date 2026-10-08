import React from 'react';
import { useSimulation } from '../state/SimulationContext';
import {
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Zap,
  Cpu,
  Layers,
  AlertTriangle,
  CheckCircle,
  FileText,
} from 'lucide-react';

export const DeadlockPage: React.FC<{ onNavigateToGraph: () => void }> = ({
  onNavigateToGraph,
}) => {
  const { deadlockCycle, resolveDeadlock, migrateWorkload } = useSimulation();

  const isCycleActive = deadlockCycle && deadlockCycle.status === 'active';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              DEADLOCK RESILIENCE ENGINE
            </span>
            <span className="text-xs font-mono text-midora-muted">• Graph Cycle Defense</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Coffman Conditions & Cycle Prevention
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Continuous Tarjan DFS cycle detection preventing circular wait conditions in multi-tenant accelerator pools.
          </p>
        </div>

        <button
          onClick={onNavigateToGraph}
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical flex items-center gap-2 transition-all"
        >
          <span>Open Interactive Graph</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Primary Status Card */}
      <div
        className={`p-6 rounded-xl border transition-all ${
          isCycleActive
            ? 'border-red-300 bg-gradient-to-r from-red-50/90 via-white to-red-50/60 shadow-sm'
            : 'border-midora-green/30 bg-gradient-to-r from-midora-greenLight/50 via-white to-midora-greenLight/20'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl flex-shrink-0 ${
                isCycleActive ? 'bg-red-100 text-red-600' : 'bg-midora-green text-white'
              }`}
            >
              {isCycleActive ? (
                <ShieldAlert className="w-8 h-8 animate-pulse" />
              ) : (
                <ShieldCheck className="w-8 h-8" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase ${
                    isCycleActive ? 'bg-red-600 text-white' : 'bg-midora-green text-white'
                  }`}
                >
                  {isCycleActive ? 'CRITICAL CYCLE DETECTED' : 'SYSTEM RESILIENT'}
                </span>
                <span className="text-xs font-mono text-midora-muted">
                  DFS EVALUATION: 0.14ms
                </span>
              </div>
              <h2 className="text-lg font-display font-bold text-midora-dark mt-1">
                {isCycleActive
                  ? 'Active Deadlock Hazard on GPU-03 Accelerator Rack'
                  : 'Zero Directed Cycles Detected in Resource Graph'}
              </h2>
              <p className="text-xs text-midora-muted mt-1 leading-relaxed max-w-2xl">
                {isCycleActive
                  ? 'Workload W17 holds VRAM Pool GPU-03 and requests DMA buffer RAM-02, which is currently locked by W21. W21 simultaneously requests VRAM on GPU-03.'
                  : 'All dependency edges form a Directed Acyclic Graph (DAG). Workload executions proceed asynchronously without lock contention.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <div className="p-3 bg-white rounded-lg border border-midora-border text-center min-w-[130px]">
              <span className="text-[10px] font-mono text-midora-muted uppercase block">
                DEADLOCK RISK
              </span>
              <span
                className={`text-2xl font-mono font-black ${
                  isCycleActive ? 'text-red-600' : 'text-midora-greenDark'
                }`}
              >
                {isCycleActive ? '78%' : '6.5%'}
              </span>
            </div>

            {isCycleActive ? (
              <button
                onClick={resolveDeadlock}
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md transition-all hover:scale-[1.02]"
              >
                Execute Preemptive Migration
              </button>
            ) : (
              <button
                onClick={() => migrateWorkload('W17', 'GPU-02', 'GPU-03')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold bg-white border border-midora-border text-midora-dark hover:bg-midora-bgWarm transition-colors"
              >
                Simulate Contention Injection
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Coffman Conditions Four-Pillar Inspection */}
      <div className="midora-card p-6">
        <h3 className="text-sm font-display font-bold text-midora-dark mb-1">
          Coffman Deadlock Condition Matrix
        </h3>
        <p className="text-xs text-midora-muted mb-4">
          Deadlock occurs if and only if all four Coffman conditions hold simultaneously. MIDORAG actively breaks the Circular Wait condition.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* 1. Mutual Exclusion */}
          <div className="p-3.5 rounded-lg bg-midora-bgWarm/50 border border-midora-borderSubtle">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-midora-dark">1. Mutual Exclusion</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                ACTIVE
              </span>
            </div>
            <p className="text-midora-muted text-[11px] leading-relaxed">
              GPU compute kernels require non-sharable dedicated device memory contexts.
            </p>
          </div>

          {/* 2. Hold and Wait */}
          <div className="p-3.5 rounded-lg bg-midora-bgWarm/50 border border-midora-borderSubtle">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-midora-dark">2. Hold & Wait</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                ACTIVE
              </span>
            </div>
            <p className="text-midora-muted text-[11px] leading-relaxed">
              Workloads retain allocated VRAM while awaiting host memory direct transfers.
            </p>
          </div>

          {/* 3. No Preemption */}
          <div className="p-3.5 rounded-lg bg-midora-bgWarm/50 border border-midora-borderSubtle">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-midora-dark">3. No Preemption</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                STANDARD
              </span>
            </div>
            <p className="text-midora-muted text-[11px] leading-relaxed">
              In-flight tensor operations cannot be unceremoniously evicted without checkpointing.
            </p>
          </div>

          {/* 4. Circular Wait */}
          <div
            className={`p-3.5 rounded-lg border transition-all ${
              isCycleActive
                ? 'bg-red-50 border-red-300'
                : 'bg-midora-greenLight/40 border-midora-green/30'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-midora-dark">4. Circular Wait</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  isCycleActive
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-midora-green text-white'
                }`}
              >
                {isCycleActive ? 'CYCLE FORMED' : 'BROKEN / PREVENTED'}
              </span>
            </div>
            <p className="text-midora-charcoal text-[11px] leading-relaxed">
              {isCycleActive
                ? 'Cycle: W17 → RAM-02 → W21 → GPU-03 → W17. Deadlock imminent.'
                : 'Directed graph acyclic. MIDORAG reroutes allocations before cycles close.'}
            </p>
          </div>
        </div>
      </div>

      {/* Recovery Actions Catalog (Section 16) */}
      <div className="midora-card p-6">
        <h3 className="text-sm font-display font-bold text-midora-dark mb-1">
          Automated Recovery & Mitigation Strategies
        </h3>
        <p className="text-xs text-midora-muted mb-4">
          Supported recovery policies executed under simulated conditions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-white border border-midora-border">
            <span className="font-mono text-midora-green font-bold text-[10px] uppercase block mb-1">
              POLICY 01
            </span>
            <h4 className="font-bold text-midora-dark mb-1">Workload Migration</h4>
            <p className="text-midora-muted text-[11px]">
              Transfers memory state and kernel execution to an unsaturated node (e.g. GPU-03 → GPU-02).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-midora-border">
            <span className="font-mono text-midora-green font-bold text-[10px] uppercase block mb-1">
              POLICY 02
            </span>
            <h4 className="font-bold text-midora-dark mb-1">Queue Buffering</h4>
            <p className="text-midora-muted text-[11px]">
              Temporarily halts lock requests for low-priority tasks until high-priority tensors commit.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-midora-border">
            <span className="font-mono text-midora-green font-bold text-[10px] uppercase block mb-1">
              POLICY 03
            </span>
            <h4 className="font-bold text-midora-dark mb-1">Preemptive Resource Release</h4>
            <p className="text-midora-muted text-[11px]">
              Flushes idle intermediate tensor buffers to release VRAM locks back to the global allocator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
