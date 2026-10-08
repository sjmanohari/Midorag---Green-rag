import React, { useState } from 'react';
import { Workload, PriorityLevel, SensitivityLevel } from '../state/types';
import { X, Sparkles, Cpu, HardDrive, Zap, Globe, Gauge } from 'lucide-react';

interface WorkloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    type: Workload['type'];
    cpuRequired: number;
    ramRequired: number;
    gpuRequired: number;
    priority: PriorityLevel;
    maxLatency: number;
    estimatedRuntime: string;
    energySensitivity: SensitivityLevel;
    carbonSensitivity: SensitivityLevel;
  }) => void;
}

export const WorkloadModal: React.FC<WorkloadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('LLM Fine-Tuning Sakura-Instruct');
  const [type, setType] = useState<Workload['type']>('AI Training');
  const [cpuRequired, setCpuRequired] = useState(8);
  const [ramRequired, setRamRequired] = useState(32);
  const [gpuRequired, setGpuRequired] = useState(2);
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [maxLatency, setMaxLatency] = useState(50);
  const [estimatedRuntime, setEstimatedRuntime] = useState('3.5 hours');
  const [energySensitivity, setEnergySensitivity] = useState<SensitivityLevel>('High');
  const [carbonSensitivity, setCarbonSensitivity] = useState<SensitivityLevel>('High');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      type,
      cpuRequired,
      ramRequired,
      gpuRequired,
      priority,
      maxLatency,
      estimatedRuntime,
      energySensitivity,
      carbonSensitivity,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-midora-border rounded-xl shadow-modal overflow-hidden">
        {/* Header with delicate botanical Sakura line */}
        <div className="px-6 py-4 border-b border-midora-border flex items-center justify-between bg-gradient-to-r from-midora-sakuraSoft/40 via-white to-midora-greenLight/40">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              WORKLOAD SPECIFICATION INGESTION
            </span>
            <h2 className="text-lg font-display font-bold text-midora-dark">
              + Create Sustainable Workload
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-midora-muted hover:text-midora-dark hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs text-midora-dark max-h-[80vh] overflow-y-auto">
          {/* Workload Name & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-midora-dark">Workload Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-midora-border rounded-md bg-midora-bgWarm/40 focus:outline-none focus:border-midora-green focus:ring-1 focus:ring-midora-green"
                placeholder="e.g. LLM Fine-Tuning"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-midora-dark">Workload Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as Workload['type'])}
                className="w-full px-3 py-2 border border-midora-border rounded-md bg-midora-bgWarm/40 focus:outline-none focus:border-midora-green"
              >
                <option value="AI Training">AI Training (GPU Intense)</option>
                <option value="LLM Inference">LLM Inference (Latency Sensitive)</option>
                <option value="Edge Stream">Edge Stream (Ultra-Low Latency)</option>
                <option value="Graph Analytics">Graph Analytics (Memory Bound)</option>
                <option value="Sensor Aggregation">Sensor Aggregation (IoT Telemetry)</option>
              </select>
            </div>
          </div>

          {/* Resources: CPU, RAM, GPU */}
          <div className="p-3.5 bg-midora-bgWarm/50 rounded-lg border border-midora-borderSubtle space-y-3">
            <span className="text-[11px] font-mono font-bold text-midora-muted uppercase tracking-wider block">
              Compute Resource Demands
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-medium flex items-center gap-1 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-midora-green" /> CPU Cores
                </label>
                <input
                  type="number"
                  min="1"
                  max="64"
                  value={cpuRequired}
                  onChange={(e) => setCpuRequired(parseInt(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 border border-midora-border rounded bg-white text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="font-medium flex items-center gap-1 mb-1">
                  <HardDrive className="w-3.5 h-3.5 text-midora-green" /> RAM (GB)
                </label>
                <input
                  type="number"
                  min="2"
                  max="256"
                  value={ramRequired}
                  onChange={(e) => setRamRequired(parseInt(e.target.value) || 2)}
                  className="w-full px-2.5 py-1.5 border border-midora-border rounded bg-white text-center font-mono font-bold"
                />
              </div>
              <div>
                <label className="font-medium flex items-center gap-1 mb-1">
                  <Zap className="w-3.5 h-3.5 text-midora-sakuraDeep" /> GPU Units
                </label>
                <input
                  type="number"
                  min="0"
                  max="8"
                  value={gpuRequired}
                  onChange={(e) => setGpuRequired(parseInt(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 border border-midora-border rounded bg-white text-center font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Priority & Latency & Runtime */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 border border-midora-border rounded bg-midora-bgWarm/40 focus:border-midora-green"
              >
                <option value="Critical">Critical (Immediate)</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Standard</option>
                <option value="Low">Low (Deferrable)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-midora-green" /> Max Latency (ms)
              </label>
              <input
                type="number"
                min="5"
                max="500"
                value={maxLatency}
                onChange={(e) => setMaxLatency(parseInt(e.target.value) || 50)}
                className="w-full px-3 py-2 border border-midora-border rounded bg-midora-bgWarm/40 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Estimated Runtime</label>
              <input
                type="text"
                value={estimatedRuntime}
                onChange={(e) => setEstimatedRuntime(e.target.value)}
                className="w-full px-3 py-2 border border-midora-border rounded bg-midora-bgWarm/40"
                placeholder="e.g. 3 hours"
              />
            </div>
          </div>

          {/* Environmental Sensitivities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3.5 bg-midora-greenLight/30 rounded-lg border border-midora-green/20">
            <div>
              <label className="font-semibold mb-1 flex items-center gap-1.5 text-midora-greenDark">
                <Zap className="w-3.5 h-3.5 text-midora-green" /> Energy Sensitivity
              </label>
              <select
                value={energySensitivity}
                onChange={(e) => setEnergySensitivity(e.target.value as SensitivityLevel)}
                className="w-full px-3 py-2 border border-midora-border rounded bg-white"
              >
                <option value="High">High (Strict Power Budget)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="font-semibold mb-1 flex items-center gap-1.5 text-midora-greenDark">
                <Globe className="w-3.5 h-3.5 text-midora-green" /> Carbon Sensitivity
              </label>
              <select
                value={carbonSensitivity}
                onChange={(e) => setCarbonSensitivity(e.target.value as SensitivityLevel)}
                className="w-full px-3 py-2 border border-midora-border rounded bg-white"
              >
                <option value="High">High (Favor Green / Hydro Grid)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Footer with ANALYZE & ALLOCATE button */}
          <div className="pt-3 border-t border-midora-border flex items-center justify-between">
            <span className="text-[11px] font-mono text-midora-muted">
              SIMULATION ENGINE READY
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md font-medium text-midora-muted hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-md font-bold text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                ANALYZE & ALLOCATE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
