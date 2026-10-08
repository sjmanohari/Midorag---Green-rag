import React, { useEffect, useState } from 'react';
import { Workload, SystemNode, AllocationScoreBreakdown } from '../state/types';
import {
  CheckCircle2,
  Loader2,
  Cpu,
  Zap,
  Globe,
  ShieldCheck,
  Check,
  Activity,
  Award,
} from 'lucide-react';

interface AllocationModalProps {
  isOpen: boolean;
  workload: Workload | null;
  nodes: SystemNode[];
  onClose: () => void;
  onCommitAllocation: (workloadId: string, nodeId: string, breakdown: AllocationScoreBreakdown) => void;
}

const PIPELINE_STAGES = [
  { id: 1, title: 'Analyzing Workload Demands', desc: 'Parsing CPU/RAM/GPU profiles & SLA constraints' },
  { id: 2, title: 'Checking Candidate Nodes', desc: 'Surveying 11 Cloud, Edge, and GPU nodes' },
  { id: 3, title: 'Analyzing Resource Availability', desc: 'Filtering saturated nodes above capacity thresholds' },
  { id: 4, title: 'Building Dependency Graph', desc: 'Constructing bipartite resource request graph' },
  { id: 5, title: 'Checking Resource Contention', desc: 'Simulating multi-tenant lock contention' },
  { id: 6, title: 'Checking Deadlock Risk & Cycles', desc: 'Evaluating Tarjan directed cycle avoidance' },
  { id: 7, title: 'Evaluating Network Latency', desc: 'Checking edge ping & regional roundtrip times' },
  { id: 8, title: 'Evaluating Energy Consumption', desc: 'Calculating host power draw & thermal overhead' },
  { id: 9, title: 'Evaluating Carbon Impact', desc: 'Factoring regional grid carbon intensity (gCO₂/kWh)' },
  { id: 10, title: 'Selecting Optimal Node', desc: 'Calculating final Pareto multi-objective score' },
];

export const AllocationModal: React.FC<AllocationModalProps> = ({
  isOpen,
  workload,
  nodes,
  onClose,
  onCommitAllocation,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [breakdown, setBreakdown] = useState<AllocationScoreBreakdown | null>(null);
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);

  useEffect(() => {
    if (!isOpen || !workload) {
      setCurrentStep(0);
      setIsDone(false);
      setBreakdown(null);
      setSelectedNode(null);
      return;
    }

    // Determine candidate based on GPU needs and lowest carbon/deadlock
    let candidate = nodes.find((n) => {
      if (workload.gpuRequired > 0) {
        return n.category === 'gpu' && n.id !== 'GPU-03'; // avoid overloaded GPU-03
      }
      if (workload.maxLatency <= 30) {
        return n.category === 'edge' && n.status === 'Healthy';
      }
      return n.category === 'cloud' && n.carbonIntensity < 200;
    });

    if (!candidate) {
      candidate = nodes.find((n) => n.id === 'GPU-02') || nodes[0];
    }

    setSelectedNode(candidate);

    const generatedBreakdown: AllocationScoreBreakdown = {
      nodeId: candidate.id,
      overallScore: candidate.category === 'gpu' ? 90.3 : 92.8,
      resourceAvailabilityScore: 92.0,
      latencyScore: candidate.category === 'edge' ? 98.0 : 88.0,
      energyEfficiencyScore: 91.0,
      carbonEfficiencyScore: candidate.carbonIntensity < 150 ? 96.0 : 84.0,
      deadlockSafetyScore: 97.0,
      contentionSafetyScore: 90.0,
      justifications: [
        'Sufficient CPU cores and RAM headroom verified',
        workload.gpuRequired > 0 ? 'GPU accelerator compute pool available without contention' : 'Low memory contention guarantee',
        `Network latency within acceptable SLA bounds (${candidate.latency} ms)`,
        'Zero circular dependency cycles detected in resource graph',
        'Contention risk below 15% threshold',
        `Lower grid carbon intensity (${candidate.carbonIntensity} gCO₂/kWh)`,
        'Energy consumption optimized for cluster thermal headroom',
      ],
    };

    setBreakdown(generatedBreakdown);

    // Fast animated step progression
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= PIPELINE_STAGES.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, 380);

    return () => clearInterval(interval);
  }, [isOpen, workload, nodes]);

  if (!isOpen || !workload) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-midora-border rounded-xl shadow-modal overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-midora-border flex items-center justify-between bg-gradient-to-r from-midora-greenLight/50 via-white to-midora-sakuraSoft/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-midora-green text-white uppercase">
                DECISION PIPELINE
              </span>
              <span className="text-xs font-mono text-midora-muted">{workload.id}</span>
            </div>
            <h2 className="text-lg font-display font-bold text-midora-dark mt-0.5">
              Carbon-Aware Allocation Analysis: {workload.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-midora-muted hover:text-midora-dark hover:bg-black/5"
          >
            ✕
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Animated 10-step progress bar & stages */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-midora-dark">
                Pipeline Execution: Step {Math.min(currentStep, 10)} of 10
              </span>
              <span className="text-xs font-mono font-semibold text-midora-green">
                {isDone ? 'COMPLETED — OPTIMAL NODE SELECTED' : 'PROCESSING...'}
              </span>
            </div>
            <div className="w-full bg-midora-bgWarm h-2 rounded-full overflow-hidden border border-midora-border">
              <div
                className="bg-gradient-to-r from-midora-green to-midora-emerald h-full transition-all duration-300 rounded-full"
                style={{ width: `${(Math.min(currentStep, 10) / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Stepper display (compact 2-column list) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {PIPELINE_STAGES.map((s) => {
              const completed = currentStep > s.id;
              const active = currentStep === s.id;
              return (
                <div
                  key={s.id}
                  className={`flex items-start gap-2.5 p-2 rounded-md transition-colors ${
                    active
                      ? 'bg-midora-greenLight border border-midora-green/40 shadow-xs'
                      : completed
                      ? 'bg-midora-bgWarm/40 border border-midora-borderSubtle text-midora-dark/80'
                      : 'opacity-40 border border-transparent'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {completed ? (
                      <CheckCircle2 className="w-4 h-4 text-midora-green" />
                    ) : active ? (
                      <Loader2 className="w-4 h-4 text-midora-green animate-spin" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-midora-muted inline-flex items-center justify-center text-[10px] font-mono">
                        {s.id}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-[11px] text-midora-muted leading-tight">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Transparent Scoring System Card (Appears upon pipeline completion) */}
          {isDone && breakdown && selectedNode && (
            <div className="border border-midora-green/30 bg-gradient-to-b from-white to-midora-greenLight/20 rounded-xl p-5 shadow-sm space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-midora-border pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-midora-muted">
                    RECOMMENDED NODE
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-display font-bold text-midora-dark">
                      {selectedNode.id}
                    </span>
                    <span className="text-xs text-midora-muted">({selectedNode.name})</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-midora-green/30 shadow-xs">
                  <Award className="w-4 h-4 text-midora-green" />
                  <span className="text-xs font-mono font-bold text-midora-muted">OVERALL SCORE</span>
                  <span className="text-2xl font-mono font-black text-midora-greenDark">
                    {breakdown.overallScore}
                  </span>
                  <span className="text-xs font-mono text-midora-muted">/100</span>
                </div>
              </div>

              {/* Score Criterion Breakdown Bar Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded bg-white border border-midora-border">
                  <div className="flex justify-between font-mono font-medium mb-1">
                    <span>Resource Availability</span>
                    <span className="font-bold text-midora-dark">{breakdown.resourceAvailabilityScore}/100</span>
                  </div>
                  <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                    <div className="bg-midora-green h-full" style={{ width: `${breakdown.resourceAvailabilityScore}%` }} />
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white border border-midora-border">
                  <div className="flex justify-between font-mono font-medium mb-1">
                    <span>Latency Score</span>
                    <span className="font-bold text-midora-dark">{breakdown.latencyScore}/100</span>
                  </div>
                  <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                    <div className="bg-midora-green h-full" style={{ width: `${breakdown.latencyScore}%` }} />
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white border border-midora-border">
                  <div className="flex justify-between font-mono font-medium mb-1">
                    <span>Energy Efficiency</span>
                    <span className="font-bold text-midora-dark">{breakdown.energyEfficiencyScore}/100</span>
                  </div>
                  <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                    <div className="bg-midora-green h-full" style={{ width: `${breakdown.energyEfficiencyScore}%` }} />
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white border border-midora-border">
                  <div className="flex justify-between font-mono font-medium mb-1">
                    <span>Carbon Efficiency</span>
                    <span className="font-bold text-midora-dark">{breakdown.carbonEfficiencyScore}/100</span>
                  </div>
                  <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                    <div className="bg-midora-green h-full" style={{ width: `${breakdown.carbonEfficiencyScore}%` }} />
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white border border-midora-border">
                  <div className="flex justify-between font-mono font-medium mb-1">
                    <span>Deadlock Safety</span>
                    <span className="font-bold text-midora-dark">{breakdown.deadlockSafetyScore}/100</span>
                  </div>
                  <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                    <div className="bg-midora-emerald h-full" style={{ width: `${breakdown.deadlockSafetyScore}%` }} />
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white border border-midora-border">
                  <div className="flex justify-between font-mono font-medium mb-1">
                    <span>Contention Safety</span>
                    <span className="font-bold text-midora-dark">{breakdown.contentionSafetyScore}/100</span>
                  </div>
                  <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                    <div className="bg-midora-emerald h-full" style={{ width: `${breakdown.contentionSafetyScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Justification Checkmarks (Show WHY the node was selected) */}
              <div className="pt-2">
                <span className="text-[11px] font-mono font-bold text-midora-muted uppercase tracking-wider block mb-2">
                  SELECTION JUSTIFICATION EVIDENCE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-midora-charcoal">
                  {breakdown.justifications.map((just, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-midora-green flex-shrink-0" />
                      <span>{just}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4 border-t border-midora-border bg-midora-bgWarm/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-midora-muted">
            SIMULATION MODE — ZERO PRODUCTION OVERHEAD
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-xs font-semibold text-midora-muted hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              disabled={!isDone || !breakdown || !selectedNode}
              onClick={() => {
                if (breakdown && selectedNode) {
                  onCommitAllocation(workload.id, selectedNode.id, breakdown);
                  onClose();
                }
              }}
              className={`px-5 py-2 rounded-md text-xs font-bold text-white transition-all shadow-botanical ${
                isDone
                  ? 'bg-midora-green hover:bg-midora-greenDark cursor-pointer hover:scale-[1.02]'
                  : 'bg-midora-muted opacity-50 cursor-not-allowed'
              }`}
            >
              COMMIT SIMULATED ALLOCATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
