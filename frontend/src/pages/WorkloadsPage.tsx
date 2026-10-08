import React, { useState } from 'react';
import { useSimulation } from '../state/SimulationContext';
import { Workload } from '../state/types';
import {
  Layers,
  Sparkles,
  Cpu,
  Zap,
  HardDrive,
  Search,
  Filter,
  Brain,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface WorkloadsPageProps {
  onOpenCreateWorkload: () => void;
  onAllocateWorkload: (workload: Workload) => void;
}

export const WorkloadsPage: React.FC<WorkloadsPageProps> = ({
  onOpenCreateWorkload,
  onAllocateWorkload,
}) => {
  const { workloads, nodes } = useSimulation();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedMlWorkload, setSelectedMlWorkload] = useState<Workload | null>(null);

  const filteredWorkloads = workloads.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || w.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              WORKLOAD CATALOG
            </span>
            <span className="text-xs font-mono text-midora-muted">• {workloads.length} Managed Tasks</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Active Compute Workloads & ML Risk Profiles
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Heterogeneous AI training, LLM inference, graph processing, and edge streaming workloads with real-time contention scoring.
          </p>
        </div>

        <button
          onClick={onOpenCreateWorkload}
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical flex items-center gap-2 self-start md:self-auto transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ Create Workload</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-midora-border rounded-lg shadow-xs w-full sm:w-auto">
          {['all', 'Critical', 'High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                priorityFilter === p
                  ? 'bg-midora-green text-white font-semibold'
                  : 'text-midora-muted hover:text-midora-dark'
              }`}
            >
              {p === 'all' ? 'All Priorities' : `${p} Priority`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-midora-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workload by name or ID..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-midora-border rounded-lg bg-white focus:outline-none focus:border-midora-green"
          />
        </div>
      </div>

      {/* Workloads Table */}
      <div className="midora-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-midora-bgWarm/60 border-b border-midora-border font-mono text-midora-muted uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3">Workload</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Resources (CPU / RAM / GPU)</th>
                <th className="px-3 py-3">Priority</th>
                <th className="px-3 py-3">Assigned Node</th>
                <th className="px-3 py-3">Contention Prob.</th>
                <th className="px-3 py-3">Deadlock Prob.</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-midora-borderSubtle">
              {filteredWorkloads.map((w) => {
                const assignedNodeObj = nodes.find((n) => n.id === w.assignedNode);
                return (
                  <tr key={w.id} className="hover:bg-midora-bgWarm/30 transition-colors">
                    {/* Workload ID & Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-midora-dark">{w.id}</span>
                        <div>
                          <div className="font-semibold text-midora-dark">{w.name}</div>
                          <span className="text-[10px] text-midora-muted font-mono">
                            Created {w.createdAt}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-midora-bgWarm border border-midora-border text-midora-charcoal">
                        {w.type}
                      </span>
                    </td>

                    {/* Demand */}
                    <td className="px-3 py-3 font-mono text-[11px]">
                      <span className="font-semibold text-midora-dark">{w.cpuRequired}c</span>
                      <span className="text-midora-muted"> / </span>
                      <span>{w.ramRequired}GB</span>
                      {w.gpuRequired > 0 && (
                        <>
                          <span className="text-midora-muted"> / </span>
                          <span className="text-midora-sakuraDeep font-bold">{w.gpuRequired} GPU</span>
                        </>
                      )}
                    </td>

                    {/* Priority */}
                    <td className="px-3 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          w.priority === 'Critical'
                            ? 'bg-red-100 text-red-800'
                            : w.priority === 'High'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-midora-bgWarm text-midora-muted'
                        }`}
                      >
                        {w.priority}
                      </span>
                    </td>

                    {/* Assigned Node */}
                    <td className="px-3 py-3">
                      {w.assignedNode ? (
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="px-2 py-0.5 rounded bg-midora-greenLight text-midora-greenDark font-bold text-[11px] border border-midora-green/20">
                            {w.assignedNode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-midora-muted font-mono italic">Unassigned</span>
                      )}
                    </td>

                    {/* Contention Prob (ML) */}
                    <td className="px-3 py-3 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold ${
                            w.contentionProbability > 70
                              ? 'text-red-600'
                              : w.contentionProbability > 40
                              ? 'text-amber-600'
                              : 'text-midora-green'
                          }`}
                        >
                          {w.contentionProbability}%
                        </span>
                      </div>
                    </td>

                    {/* Deadlock Prob */}
                    <td className="px-3 py-3 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold ${
                            w.deadlockProbability > 60
                              ? 'text-red-600'
                              : w.deadlockProbability > 25
                              ? 'text-amber-600'
                              : 'text-midora-green'
                          }`}
                        >
                          {w.deadlockProbability}%
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-midora-greenLight text-midora-greenDark">
                        {w.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="px-4 py-3 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedMlWorkload(w)}
                        className="p-1 rounded text-midora-muted hover:text-midora-dark hover:bg-black/5"
                        title="View ML Prediction & Risk"
                      >
                        <Brain className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onAllocateWorkload(w)}
                        className="px-2 py-1 rounded text-[11px] font-bold text-white bg-midora-green hover:bg-midora-greenDark transition-colors"
                      >
                        Reallocate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ML Prediction Modal Drawer (Section 23) */}
      {selectedMlWorkload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white border border-midora-border rounded-xl shadow-modal overflow-hidden p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-midora-border pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-midora-green" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-midora-green uppercase">
                    ML PREDICTIVE DIAGNOSTICS (SYNTHETIC TELEMETRY)
                  </span>
                  <h3 className="text-base font-display font-bold text-midora-dark">
                    Workload {selectedMlWorkload.id}: {selectedMlWorkload.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedMlWorkload(null)}
                className="text-midora-muted hover:text-midora-dark text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-midora-bgWarm/60 rounded-lg border border-midora-borderSubtle">
                <div className="flex justify-between mb-1">
                  <span>Resource Contention Probability:</span>
                  <span className="font-bold text-midora-dark">
                    {selectedMlWorkload.contentionProbability}%
                  </span>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      selectedMlWorkload.contentionProbability > 70
                        ? 'bg-red-500'
                        : 'bg-midora-green'
                    }`}
                    style={{ width: `${selectedMlWorkload.contentionProbability}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-midora-bgWarm/60 rounded-lg border border-midora-borderSubtle">
                <div className="flex justify-between mb-1">
                  <span>Deadlock / Cycle Probability:</span>
                  <span className="font-bold text-midora-dark">
                    {selectedMlWorkload.deadlockProbability}%
                  </span>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      selectedMlWorkload.deadlockProbability > 60
                        ? 'bg-red-500'
                        : 'bg-midora-green'
                    }`}
                    style={{ width: `${selectedMlWorkload.deadlockProbability}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-midora-bgWarm/60 rounded-lg border border-midora-borderSubtle">
                <div className="flex justify-between mb-1">
                  <span>Node Overload Probability:</span>
                  <span className="font-bold text-midora-dark">
                    {Math.min(95, selectedMlWorkload.contentionProbability + 6)}%
                  </span>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{
                      width: `${Math.min(95, selectedMlWorkload.contentionProbability + 6)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* AI Recommendation Message (Section 23) */}
            <div className="p-3.5 bg-midora-greenLight/50 border border-midora-green/30 rounded-lg text-xs">
              <span className="font-mono font-bold text-midora-greenDark uppercase text-[10px] block mb-1">
                PREDICTIVE MITIGATION RECOMMENDATION:
              </span>
              <p className="text-midora-charcoal leading-relaxed font-sans">
                {selectedMlWorkload.contentionProbability > 70
                  ? `MIDORAG recommends preemptively moving ${selectedMlWorkload.id} before resource contention escalates.`
                  : `Workload ${selectedMlWorkload.id} is operating safely within nominal multi-resource operational parameters.`}
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedMlWorkload(null)}
                className="px-4 py-2 rounded-md font-semibold text-xs text-midora-muted hover:bg-black/5"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = selectedMlWorkload;
                  setSelectedMlWorkload(null);
                  onAllocateWorkload(target);
                }}
                className="px-4 py-2 rounded-md font-bold text-xs text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical"
              >
                Launch Decision Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
