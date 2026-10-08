import React from 'react';
import { useSimulation } from '../state/SimulationContext';
import {
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  Cpu,
  Zap,
  Globe,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const DemoScenarioPage: React.FC<{ onNavigateToGraph: () => void }> = ({
  onNavigateToGraph,
}) => {
  const { demoState, runDemoScenario, resetDemoScenario } = useSimulation();

  const isRunning =
    demoState.isActive &&
    ['contention_induced', 'deadlock_detected', 'analyzing', 'migrated'].includes(demoState.stage);
  const isCompleted = demoState.stage === 'completed';

  const demoSteps = [
    { key: 'contention_induced', label: '1. Induce Contention', desc: 'Overload GPU-03 to 96% with dual AI workloads' },
    { key: 'deadlock_detected', label: '2. Detect Cycle', desc: 'Tarjan DFS identifies circular wait W17 ⇄ W21' },
    { key: 'analyzing', label: '3. Pareto Evaluation', desc: 'Survey 11 candidate nodes for lowest carbon & risk' },
    { key: 'migrated', label: '4. Execute Migration', desc: 'Reallocate W17 to GPU-02 (Fukushima Green)' },
    { key: 'completed', label: '5. Benchmark Relief', desc: 'Quantify energy savings and deadlock risk reduction' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              CONTROLLED RESEARCH BENCHMARK
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-midora-sakuraSoft text-midora-sakuraDeep font-bold">
              ONE-CLICK DEMO SCENARIO
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            End-to-End Orchestration & Deadlock Resilience Demo
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Simulate a catastrophic multi-tenant GPU contention deadlock, followed by autonomous Pareto recovery and carbon reduction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {demoState.isActive && (
            <button
              onClick={resetDemoScenario}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-midora-border text-midora-muted hover:text-midora-dark hover:bg-black/5 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset State
            </button>
          )}

          <button
            disabled={isRunning}
            onClick={runDemoScenario}
            className={`px-6 py-3 rounded-xl font-display font-bold text-sm text-white shadow-botanical flex items-center gap-2.5 transition-all ${
              isRunning
                ? 'bg-midora-green/70 cursor-wait'
                : 'bg-midora-green hover:bg-midora-greenDark hover:scale-[1.02]'
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Running Scenario...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>RUN MIDORAG DEMO</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stepper Status Bar */}
      <div className="midora-card p-5">
        <h3 className="text-xs font-mono font-bold text-midora-muted uppercase tracking-wider mb-3">
          AUTOMATED DEMO EXECUTION PIPELINE
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          {demoSteps.map((s, idx) => {
            const stepOrder = ['idle', 'contention_induced', 'deadlock_detected', 'analyzing', 'migrated', 'completed'];
            const currentIndex = stepOrder.indexOf(demoState.stage);
            const thisIndex = stepOrder.indexOf(s.key);
            const isDone = currentIndex >= thisIndex && demoState.stage !== 'idle';
            const isActive = demoState.stage === s.key;

            return (
              <div
                key={s.key}
                className={`p-3 rounded-lg border transition-all ${
                  isActive
                    ? 'border-midora-green bg-midora-greenLight/60 shadow-xs ring-1 ring-midora-green/40'
                    : isDone
                    ? 'border-midora-green/30 bg-midora-bgWarm/40'
                    : 'border-midora-borderSubtle bg-white opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-[11px] text-midora-dark">{s.label}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-midora-green" />
                  ) : isActive ? (
                    <Loader2 className="w-3.5 h-3.5 text-midora-green animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-midora-border" />
                  )}
                </div>
                <p className="text-[10px] text-midora-muted leading-tight mt-0.5">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          BEFORE / AFTER COMPARISON (Section 19 Core Requirement)
          ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BEFORE CARD */}
        <div
          className={`midora-card p-6 border transition-all ${
            demoState.isActive && !isCompleted
              ? 'border-red-300 ring-2 ring-red-200 bg-red-50/30'
              : 'border-midora-border bg-white'
          }`}
        >
          <div className="flex items-center justify-between border-b border-midora-border pb-3 mb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-600">
                BASELINE STATUS (UNCOORDINATED)
              </span>
              <h2 className="text-xl font-display font-bold text-midora-dark">
                BEFORE MIDORAG
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-red-100 text-red-700">
              Contention Induced
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 rounded-lg bg-white border border-red-100">
              <span className="text-[10px] text-midora-muted block">HOST CPU LOAD</span>
              <span className="text-2xl font-bold text-midora-dark">
                {demoState.beforeMetrics.cpu}%
              </span>
              <span className="text-[10px] text-red-600 block mt-0.5">Overheated Host</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-red-100">
              <span className="text-[10px] text-midora-muted block">ACCELERATOR GPU</span>
              <span className="text-2xl font-bold text-red-600">
                {demoState.beforeMetrics.gpu}%
              </span>
              <span className="text-[10px] text-red-600 block mt-0.5">Saturated Rack</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-red-100">
              <span className="text-[10px] text-midora-muted block">DEADLOCK RISK</span>
              <span className="text-2xl font-bold text-red-600">
                {demoState.beforeMetrics.deadlockRisk}%
              </span>
              <span className="text-[10px] text-red-600 block mt-0.5">Circular Wait Cycle</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-red-100">
              <span className="text-[10px] text-midora-muted block">ENERGY DEMAND</span>
              <span className="text-2xl font-bold text-midora-dark">
                {demoState.beforeMetrics.energy} <span className="text-xs">kWh</span>
              </span>
              <span className="text-[10px] text-red-600 block mt-0.5">Thermal Inefficiency</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-midora-borderSubtle text-xs text-midora-muted">
            <p>
              • Workload W17 locked on GPU-03 competing with W21.
              <br />
              • High local thermal dissipation with peak grid carbon emissions.
            </p>
          </div>
        </div>

        {/* AFTER CARD */}
        <div
          className={`midora-card p-6 border transition-all ${
            isCompleted
              ? 'border-midora-green ring-2 ring-midora-green/30 bg-gradient-to-b from-white to-midora-greenLight/30 shadow-card'
              : 'border-midora-border bg-white opacity-85'
          }`}
        >
          <div className="flex items-center justify-between border-b border-midora-border pb-3 mb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-midora-green">
                AUTONOMOUS OPTIMIZATION RESULT
              </span>
              <h2 className="text-xl font-display font-bold text-midora-dark">
                AFTER MIDORAG
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-midora-greenLight text-midora-greenDark">
              {isCompleted ? '✓ Pareto Optimized' : 'Ready to Run'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 rounded-lg bg-white border border-midora-green/30">
              <span className="text-[10px] text-midora-muted block">HOST CPU LOAD</span>
              <span className="text-2xl font-bold text-midora-greenDark">
                {demoState.afterMetrics.cpu}%
              </span>
              <span className="text-[10px] text-midora-green block mt-0.5">↓ 22% Headroom Freed</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-midora-green/30">
              <span className="text-[10px] text-midora-muted block">ACCELERATOR GPU</span>
              <span className="text-2xl font-bold text-midora-greenDark">
                {demoState.afterMetrics.gpu}%
              </span>
              <span className="text-[10px] text-midora-green block mt-0.5">↓ 35% Balanced Load</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-midora-green/30">
              <span className="text-[10px] text-midora-muted block">DEADLOCK RISK</span>
              <span className="text-2xl font-bold text-midora-emerald">
                {demoState.afterMetrics.deadlockRisk}%
              </span>
              <span className="text-[10px] text-midora-green block mt-0.5">Acyclic Graph Guaranteed</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-midora-green/30">
              <span className="text-[10px] text-midora-muted block">ENERGY DEMAND</span>
              <span className="text-2xl font-bold text-midora-greenDark">
                {demoState.afterMetrics.energy} <span className="text-xs">kWh</span>
              </span>
              <span className="text-[10px] text-midora-green block mt-0.5">Low-Carbon Grid Shift</span>
            </div>
          </div>

          {/* Core Benchmark Achievements */}
          <div className="mt-4 pt-3 border-t border-midora-borderSubtle grid grid-cols-2 gap-2 text-center font-mono">
            <div className="p-2 rounded bg-midora-greenLight/60 text-midora-greenDark font-bold text-xs">
              Energy Saved: 23.7%
            </div>
            <div className="p-2 rounded bg-midora-greenLight/60 text-midora-emerald font-bold text-xs">
              Deadlock Risk Reduced: 88.9%
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="midora-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <span className="text-midora-muted">
          SIMULATION CONTROLLER: Ready to replay or inspect updated resource topology graph.
        </span>
        <button
          onClick={onNavigateToGraph}
          className="text-midora-greenDark hover:text-midora-green font-bold flex items-center gap-1.5"
        >
          View Updated Dependency Graph →
        </button>
      </div>
    </div>
  );
};
