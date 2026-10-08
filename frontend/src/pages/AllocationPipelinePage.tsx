import React, { useState } from 'react';
import { useSimulation } from '../state/SimulationContext';
import { Workload } from '../state/types';
import { Sparkles, ArrowRight, Award, Check, Cpu, Zap, Globe, ShieldCheck } from 'lucide-react';

export const AllocationPipelinePage: React.FC<{
  onLaunchAllocationModal: (workload: Workload) => void;
  onOpenCreateWorkload: () => void;
}> = ({ onLaunchAllocationModal, onOpenCreateWorkload }) => {
  const { workloads, nodes } = useSimulation();
  const [selectedWorkloadId, setSelectedWorkloadId] = useState<string>(workloads[0]?.id || 'W17');

  const selectedWorkload = workloads.find((w) => w.id === selectedWorkloadId) || workloads[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              ORCHESTRATION PIPELINE
            </span>
            <span className="text-xs font-mono text-midora-muted">• Multi-Stage Analysis</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Deterministic Decision Pipeline & Node Scoring
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Transparent scoring system incorporating resource headroom, SLA latency, power thermal envelope, regional grid carbon intensity, and deadlock cycle freedom.
          </p>
        </div>

        <button
          onClick={onOpenCreateWorkload}
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical flex items-center gap-2"
        >
          <span>+ Create Workload</span>
        </button>
      </div>

      {/* Interactive Pipeline Runner Card */}
      <div className="midora-card p-6 bg-gradient-to-r from-white via-midora-bgWarm/30 to-midora-greenLight/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-midora-muted uppercase tracking-wider">
              SELECT WORKLOAD FOR ANALYSIS
            </span>
            <div className="flex items-center gap-3">
              <select
                value={selectedWorkloadId}
                onChange={(e) => setSelectedWorkloadId(e.target.value)}
                className="px-3 py-2 rounded-lg border border-midora-border bg-white text-xs font-semibold text-midora-dark focus:outline-none focus:border-midora-green"
              >
                {workloads.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.id} — {w.name} ({w.cpuRequired}c / {w.ramRequired}GB{w.gpuRequired > 0 ? ` / ${w.gpuRequired} GPU` : ''})
                  </option>
                ))}
              </select>

              <div className="text-xs text-midora-muted font-mono hidden sm:block">
                Priority: <strong>{selectedWorkload?.priority}</strong> • Status: {selectedWorkload?.status}
              </div>
            </div>
          </div>

          <button
            onClick={() => selectedWorkload && onLaunchAllocationModal(selectedWorkload)}
            className="px-6 py-3 rounded-lg font-bold text-xs text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical flex items-center gap-2 transition-all hover:scale-[1.02] self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            ANALYZE & ALLOCATE THIS WORKLOAD
          </button>
        </div>
      </div>

      {/* 10-Stage Visual Diagram */}
      <div className="midora-card p-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-base font-display font-bold text-midora-dark">
            Complete 10-Stage Decision Pipeline Architecture
          </h2>
          <p className="text-xs text-midora-muted mt-1">
            Deterministic flow chart executed for every scheduling decision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {[
            { step: '01', title: 'Workload Intake', desc: 'Resource demands & SLA tolerances' },
            { step: '02', title: 'Candidate Discovery', desc: 'Scan 11 Cloud, Edge & GPU nodes' },
            { step: '03', title: 'Headroom Evaluation', desc: 'Filter out nodes over 90% load' },
            { step: '04', title: 'Dependency Graphing', desc: 'Model locks & hold-and-wait edges' },
            { step: '05', title: 'Contention Analysis', desc: 'Calculate multi-tenant collisions' },
            { step: '06', title: 'Cycle Elimination', desc: 'Tarjan DFS cycle check' },
            { step: '07', title: 'Latency SLA Match', desc: 'Verify roundtrip ping budget' },
            { step: '08', title: 'Thermal Energy Budget', desc: 'Host power draw & PUE' },
            { step: '09', title: 'Carbon Intensity Rank', desc: 'Prioritize renewable hydro/solar' },
            { step: '10', title: 'Pareto Node Selection', desc: 'Synthesize composite score & commit' },
          ].map((st) => (
            <div
              key={st.step}
              className="p-3.5 rounded-lg border border-midora-border bg-white hover:border-midora-green/40 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                <span className="font-bold text-midora-green">{st.step}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-midora-green" />
              </div>
              <p className="font-bold text-midora-dark">{st.title}</p>
              <p className="text-[11px] text-midora-muted mt-0.5 leading-tight">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formula & Transparent Scoring Methodology */}
      <div className="midora-card p-6">
        <h3 className="text-sm font-display font-bold text-midora-dark mb-2">
          Mathematical Scoring Formulation
        </h3>
        <p className="text-xs text-midora-muted mb-4">
          Node score calculation based on multi-objective constrained optimization:
        </p>

        <div className="p-4 rounded-lg bg-midora-bgWarm/70 border border-midora-border font-mono text-xs text-midora-dark overflow-x-auto">
          Final Score = w₁·Availability + w₂·Latency + w₃·EnergyEff + w₄·CarbonEff + w₅·Priority - w₆·DeadlockRisk - w₇·ContentionRisk
        </div>
      </div>
    </div>
  );
};
