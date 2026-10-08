import React from 'react';
import { useSimulation } from '../state/SimulationContext';
import {
  TrendingDown,
  ArrowRight,
  Zap,
  Globe,
  Gauge,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const OptimizationPage: React.FC = () => {
  const { recommendations, applyRecommendation, ignoreRecommendation } = useSimulation();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              PARETO OPTIMIZER
            </span>
            <span className="text-xs font-mono text-midora-muted">• Multi-Objective Recommendations</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Resource Reallocation & Migration Directives
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Automated optimization engine recommending live state migrations to minimize carbon emissions, eliminate contention, and guarantee deadlock safety.
          </p>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isPending = rec.status === 'pending';
          const isApplied = rec.status === 'applied';
          const isIgnored = rec.status === 'ignored';

          return (
            <div
              key={rec.id}
              className={`midora-card p-6 border transition-all ${
                isApplied
                  ? 'border-midora-green/40 bg-midora-greenLight/20'
                  : isIgnored
                  ? 'opacity-50 border-midora-borderSubtle bg-white'
                  : 'border-midora-border bg-white shadow-soft'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left details */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-midora-greenLight text-midora-greenDark uppercase">
                      {rec.id}
                    </span>
                    <span className="text-xs font-mono text-midora-muted">
                      Generated at {rec.timestamp}
                    </span>
                    {isApplied && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-midora-green text-white">
                        ✓ APPLIED TO CLUSTER
                      </span>
                    )}
                    {isIgnored && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-midora-bgWarm text-midora-muted">
                        DISMISSED
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-display font-bold text-midora-dark flex items-center gap-2">
                    <span>Move Workload {rec.workloadId}</span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-midora-bgWarm border border-midora-border text-midora-dark">
                      {rec.sourceNode}
                    </span>
                    <ArrowRight className="w-4 h-4 text-midora-muted" />
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-midora-greenLight border border-midora-green/30 text-midora-greenDark">
                      {rec.targetNode}
                    </span>
                  </h3>

                  <p className="text-xs text-midora-muted leading-relaxed">
                    {rec.reason}
                  </p>
                </div>

                {/* Impact Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs flex-shrink-0">
                  <div className="p-2.5 rounded bg-midora-bgWarm/60 border border-midora-borderSubtle text-center min-w-[100px]">
                    <span className="text-[10px] text-midora-muted block">ENERGY</span>
                    <span className="font-bold text-midora-greenDark">
                      ↓ {rec.expectedEnergyReduction}%
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-midora-bgWarm/60 border border-midora-borderSubtle text-center min-w-[100px]">
                    <span className="text-[10px] text-midora-muted block">CARBON</span>
                    <span className="font-bold text-midora-greenDark">
                      ↓ {rec.expectedCarbonReduction}%
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-midora-bgWarm/60 border border-midora-borderSubtle text-center min-w-[100px]">
                    <span className="text-[10px] text-midora-muted block">LATENCY</span>
                    <span className="font-bold text-midora-greenDark">
                      ↓ {rec.expectedLatencyReduction}%
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-midora-bgWarm/60 border border-midora-borderSubtle text-center min-w-[100px]">
                    <span className="text-[10px] text-midora-muted block">DEADLOCK</span>
                    <span className="font-bold text-midora-emerald">
                      ↓ {rec.expectedDeadlockReduction}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {isPending && (
                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => applyRecommendation(rec.id)}
                      className="px-4 py-2 rounded-md font-bold text-xs text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical transition-all hover:scale-[1.02]"
                    >
                      APPLY RECOMMENDATION
                    </button>
                    <button
                      onClick={() => ignoreRecommendation(rec.id)}
                      className="px-4 py-2 rounded-md font-semibold text-xs border border-midora-border text-midora-muted hover:bg-black/5"
                    >
                      IGNORE
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
