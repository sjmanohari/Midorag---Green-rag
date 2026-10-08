import React from 'react';
import { useSimulation } from '../state/SimulationContext';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Zap,
  Globe,
  TrendingDown,
  Leaf,
  Sun,
  Droplet,
  Wind,
  Info,
} from 'lucide-react';

export const EnergyCarbonPage: React.FC = () => {
  const { nodes, workloads, kpis } = useSimulation();

  // Synthetic time series data for energy & carbon over time
  const timeSeriesData = [
    { time: '12:00', baselineEnergy: 28.5, midoragEnergy: 22.1, baselineCarbon: 8.9, midoragCarbon: 6.2 },
    { time: '13:00', baselineEnergy: 31.2, midoragEnergy: 23.4, baselineCarbon: 9.8, midoragCarbon: 6.5 },
    { time: '14:00', baselineEnergy: 34.0, midoragEnergy: 25.1, baselineCarbon: 10.6, midoragCarbon: 7.0 },
    { time: '15:00', baselineEnergy: 36.8, midoragEnergy: 26.2, baselineCarbon: 11.4, midoragCarbon: 7.2 },
    { time: '16:00', baselineEnergy: 38.4, midoragEnergy: 27.0, baselineCarbon: 12.1, midoragCarbon: 7.5 },
    { time: '17:00', baselineEnergy: 41.2, midoragEnergy: 28.3, baselineCarbon: 13.0, midoragCarbon: 7.8 },
    { time: '18:00', baselineEnergy: 43.5, midoragEnergy: 29.1, baselineCarbon: 13.8, midoragCarbon: 8.1 },
  ];

  // Node by Node energy and carbon breakdown
  const nodeEnergyData = nodes.map((n) => ({
    name: n.id,
    energy: n.energy,
    carbon: parseFloat(((n.energy * n.carbonIntensity) / 1000).toFixed(2)),
    intensity: n.carbonIntensity,
  }));

  // Top workloads by energy
  const workloadEnergyData = workloads.slice(0, 6).map((w) => ({
    name: w.id,
    cpu: w.cpuRequired * 1.8,
    ram: w.ramRequired * 0.4,
    gpu: w.gpuRequired * 4.5,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header with clear Simulation Disclaimer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              SUSTAINABILITY ANALYTICS
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-midora-greenLight text-midora-greenDark font-bold">
              ESTIMATED / SIMULATED DATA
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Carbon-Aware Telemetry & Energy Reduction
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Pareto-optimal scheduling shifting deferrable workloads to low-carbon grid regions (Nordic Hydro & Oregon Solar).
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-midora-border shadow-xs text-xs font-mono">
          <Leaf className="w-4 h-4 text-midora-green" />
          <span>Average Grid Intensity: <strong>245 gCO₂/kWh</strong></span>
        </div>
      </div>

      {/* 4 Primary KPI Cards (Section 17) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">Total Energy</span>
            <Zap className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-dark">142</span>
            <span className="text-xs font-mono text-midora-muted">kWh</span>
          </div>
          <span className="text-[10px] text-midora-muted font-mono mt-2 block">
            ESTIMATED / SIMULATED
          </span>
        </div>

        <div className="midora-card p-4">
          <div className="flex items-center justify-between text-midora-muted mb-2">
            <span className="text-xs font-medium">Estimated Carbon</span>
            <Globe className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-dark">46.3</span>
            <span className="text-xs font-mono text-midora-muted">kg CO₂</span>
          </div>
          <span className="text-[10px] text-midora-muted font-mono mt-2 block">
            ESTIMATED / SIMULATED
          </span>
        </div>

        <div className="midora-card p-4 bg-gradient-to-br from-white to-midora-greenLight/30 border-midora-green/30">
          <div className="flex items-center justify-between text-midora-greenDark mb-2">
            <span className="text-xs font-bold">Energy Saved</span>
            <TrendingDown className="w-4 h-4 text-midora-green" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-greenDark">27.4</span>
            <span className="text-xs font-mono text-midora-green font-bold">kWh</span>
          </div>
          <span className="text-[10px] text-midora-green font-mono font-semibold mt-2 block">
            ↓ 19.3% CLUSTER SAVINGS
          </span>
        </div>

        <div className="midora-card p-4 bg-gradient-to-br from-white to-midora-sakuraSoft/40 border-midora-sakuraBorder">
          <div className="flex items-center justify-between text-midora-sakuraDeep mb-2">
            <span className="text-xs font-bold">Carbon Saved</span>
            <Leaf className="w-4 h-4 text-midora-sakuraDeep" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-midora-dark">11.8</span>
            <span className="text-xs font-mono text-midora-sakuraDeep font-bold">kg CO₂</span>
          </div>
          <span className="text-[10px] text-midora-sakuraDeep font-mono font-semibold mt-2 block">
            ↓ 25.4% EMISSIONS AVOIDED
          </span>
        </div>
      </div>

      {/* Chart 1: Energy & Carbon Over Time (Baseline vs MIDORAG Optimized) */}
      <div className="midora-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-display font-bold text-midora-dark">
              Energy Consumption & Carbon Emissions Timeline
            </h2>
            <p className="text-xs text-midora-muted">
              Comparison between uncoordinated FIFO baseline vs MIDORAG carbon-aware orchestration.
            </p>
          </div>
          <span className="text-[10px] font-mono text-midora-muted">
            HOURLY INTERVALS • SIMULATED
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="midoEnergyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#228B53" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#228B53" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="baseEnergyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
              <XAxis dataKey="time" stroke="#8E8B82" fontSize={11} />
              <YAxis stroke="#8E8B82" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E8E5DD',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="baselineEnergy"
                name="Baseline Energy (kWh)"
                stroke="#9CA3AF"
                fill="url(#baseEnergyGrad)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey="midoragEnergy"
                name="MIDORAG Energy (kWh)"
                stroke="#228B53"
                fill="url(#midoEnergyGrad)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Energy by Node & Workload Demand Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy & Carbon By Node */}
        <div className="midora-card p-6">
          <h2 className="text-sm font-display font-bold text-midora-dark mb-1">
            Energy & Carbon by Node (11 Nodes)
          </h2>
          <p className="text-xs text-midora-muted mb-4">
            Nordic-Hydro and Oregon-Solar display minimal carbon footprints despite high compute loads.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nodeEnergyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
                <XAxis dataKey="name" stroke="#8E8B82" fontSize={10} />
                <YAxis stroke="#8E8B82" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E8E5DD',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="energy" name="Energy (kWh)" fill="#228B53" radius={[4, 4, 0, 0]} />
                <Bar dataKey="carbon" name="Carbon (kg CO₂)" fill="#F4A7B9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workload Resource Breakdown */}
        <div className="midora-card p-6">
          <h2 className="text-sm font-display font-bold text-midora-dark mb-1">
            Power Footprint by Workload Class
          </h2>
          <p className="text-xs text-midora-muted mb-4">
            Component power decomposition across GPU accelerators, CPU host cores, and memory bus.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadEnergyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0ECE1" />
                <XAxis dataKey="name" stroke="#8E8B82" fontSize={11} />
                <YAxis stroke="#8E8B82" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E8E5DD',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="cpu" stackId="a" name="CPU Draw (W)" fill="#2D6A4F" />
                <Bar dataKey="ram" stackId="a" name="RAM Draw (W)" fill="#74C69D" />
                <Bar dataKey="gpu" stackId="a" name="GPU Draw (W)" fill="#E87A90" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
