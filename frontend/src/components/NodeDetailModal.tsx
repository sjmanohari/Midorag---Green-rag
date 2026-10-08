import React from 'react';
import { SystemNode, Workload } from '../state/types';
import {
  X,
  Cpu,
  HardDrive,
  Zap,
  Globe,
  Radio,
  Clock,
  Layers,
  Shield,
  Activity,
} from 'lucide-react';

interface NodeDetailModalProps {
  node: SystemNode | null;
  workloads: Workload[];
  onClose: () => void;
  onMigrateWorkload?: (workloadId: string, fromNodeId: string) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  workloads,
  onClose,
}) => {
  if (!node) return null;

  const nodeWorkloads = workloads.filter((w) => node.workloads.includes(w.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-midora-border rounded-xl shadow-modal overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-midora-border flex items-center justify-between bg-gradient-to-r from-midora-bgWarm via-white to-midora-greenLight/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-midora-greenLight border border-midora-green/30 flex items-center justify-center text-midora-greenDark font-bold">
              <Cpu className="w-5 h-5 text-midora-green" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-midora-muted">
                  {node.category.toUpperCase()} NODE • {node.region}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    node.status === 'Healthy'
                      ? 'bg-midora-greenLight text-midora-greenDark'
                      : node.status === 'Warning'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800 animate-pulse'
                  }`}
                >
                  {node.status}
                </span>
              </div>
              <h2 className="text-lg font-display font-bold text-midora-dark">
                {node.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-midora-muted hover:text-midora-dark hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-midora-dark">
          {/* Hardware Utilization Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-midora-bgWarm/60 border border-midora-borderSubtle">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-midora-green" /> CPU Cores
                </span>
                <span className="font-mono font-bold">{node.cpuUsage}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-midora-borderSubtle">
                <div
                  className={`h-full ${node.cpuUsage > 85 ? 'bg-midora-danger' : 'bg-midora-green'}`}
                  style={{ width: `${node.cpuUsage}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-midora-muted mt-1 block">
                {Math.round((node.cpuUsage / 100) * node.totalCpu)} / {node.totalCpu} cores active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-midora-bgWarm/60 border border-midora-borderSubtle">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5 text-midora-green" /> RAM Memory
                </span>
                <span className="font-mono font-bold">{node.ramUsage}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-midora-borderSubtle">
                <div
                  className={`h-full ${node.ramUsage > 85 ? 'bg-midora-danger' : 'bg-midora-green'}`}
                  style={{ width: `${node.ramUsage}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-midora-muted mt-1 block">
                {Math.round((node.ramUsage / 100) * node.totalRam)} / {node.totalRam} GB committed
              </span>
            </div>

            <div className="p-3 rounded-lg bg-midora-bgWarm/60 border border-midora-borderSubtle">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-midora-sakuraDeep" /> Accelerator GPU
                </span>
                <span className="font-mono font-bold">{node.gpuUsage}%</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-midora-borderSubtle">
                <div
                  className={`h-full ${node.gpuUsage > 85 ? 'bg-midora-danger' : 'bg-midora-sakuraDeep'}`}
                  style={{ width: `${node.gpuUsage}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-midora-muted mt-1 block">
                {node.totalGpu > 0 ? `${node.totalGpu} Physical Units (${node.gpuUsage}% load)` : 'None'}
              </span>
            </div>
          </div>

          {/* Environmental & Network Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-white border border-midora-border">
              <span className="text-[10px] font-mono text-midora-muted block">NETWORK PING</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-base font-mono font-bold text-midora-dark">{node.latency}</span>
                <span className="text-[10px] text-midora-muted font-mono">ms</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-midora-border">
              <span className="text-[10px] font-mono text-midora-muted block">POWER DRAW</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-base font-mono font-bold text-midora-dark">{node.powerDrawWatts}</span>
                <span className="text-[10px] text-midora-muted font-mono">Watts</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-midora-border">
              <span className="text-[10px] font-mono text-midora-muted block">ENERGY CONSUMED</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-base font-mono font-bold text-midora-dark">{node.energy}</span>
                <span className="text-[10px] text-midora-muted font-mono">kWh</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-midora-border">
              <span className="text-[10px] font-mono text-midora-muted block">CARBON INTENSITY</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-base font-mono font-bold text-midora-greenDark">{node.carbonIntensity}</span>
                <span className="text-[10px] text-midora-muted font-mono">gCO₂/kWh</span>
              </div>
            </div>
          </div>

          {/* Hosted Workloads */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-bold uppercase tracking-wider text-[11px] text-midora-muted flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-midora-green" /> Hosted Workloads ({nodeWorkloads.length})
              </span>
            </div>

            {nodeWorkloads.length === 0 ? (
              <div className="p-4 rounded-lg bg-midora-bgWarm/40 border border-midora-border text-center text-midora-muted text-xs">
                No active workloads assigned to this node currently.
              </div>
            ) : (
              <div className="divide-y divide-midora-borderSubtle border border-midora-border rounded-lg overflow-hidden bg-white">
                {nodeWorkloads.map((w) => (
                  <div key={w.id} className="p-3 flex items-center justify-between hover:bg-midora-bgWarm/30 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-midora-dark">{w.id}</span>
                        <span className="font-semibold text-midora-dark">{w.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-midora-bgWarm border border-midora-border font-mono">
                          {w.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-midora-muted">
                        <span>CPU: {w.cpuRequired}c</span>
                        <span>RAM: {w.ramRequired}GB</span>
                        {w.gpuRequired > 0 && <span>GPU: {w.gpuRequired}</span>}
                        <span>Contention: {w.contentionProbability}%</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-midora-greenLight text-midora-greenDark font-bold">
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-midora-border bg-midora-bgWarm/30 flex items-center justify-between">
          <span className="text-[10px] font-mono text-midora-muted">
            SIMULATED TELEMETRY AGENT v1.0.4
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-semibold bg-midora-charcoal text-white hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
