import React, { useState } from 'react';
import { useSimulation } from '../state/SimulationContext';
import { SystemNode, NodeCategory } from '../state/types';
import {
  Server,
  Cpu,
  Zap,
  HardDrive,
  Globe,
  Radio,
  Filter,
  CheckCircle,
  AlertTriangle,
  Flame,
  Search,
} from 'lucide-react';

interface InfrastructurePageProps {
  onSelectNode: (node: SystemNode) => void;
  onOpenCreateWorkload: () => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({
  onSelectNode,
  onOpenCreateWorkload,
}) => {
  const { nodes, workloads } = useSimulation();
  const [filterCategory, setFilterCategory] = useState<'all' | NodeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = nodes.filter((node) => {
    const matchesCat = filterCategory === 'all' || node.category === filterCategory;
    const matchesSearch =
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              TOPOLOGY VISUALIZATION
            </span>
            <span className="text-xs font-mono text-midora-muted">• 11 Nodes Active</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Distributed Cloud–Edge Infrastructure
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Heterogeneous multi-tier cluster spanning high-density cloud, low-latency edge gateways, and specialized GPU accelerators.
          </p>
        </div>

        <button
          onClick={onOpenCreateWorkload}
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical flex items-center gap-2 self-start md:self-auto transition-all"
        >
          <span>+ Create Workload</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-midora-border rounded-lg shadow-xs w-full sm:w-auto">
          {(
            [
              { id: 'all', label: 'All Nodes (11)' },
              { id: 'cloud', label: 'Cloud Tier (5)' },
              { id: 'edge', label: 'Edge Gateways (3)' },
              { id: 'gpu', label: 'GPU Clusters (3)' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filterCategory === tab.id
                  ? 'bg-midora-green text-white font-semibold'
                  : 'text-midora-muted hover:text-midora-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-midora-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search node or region..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-midora-border rounded-lg bg-white focus:outline-none focus:border-midora-green"
          />
        </div>
      </div>

      {/* 11 Node Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNodes.map((node) => {
          const nodeWorkloadCount = node.workloads.length;

          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node)}
              className={`midora-card p-5 cursor-pointer hover:shadow-card transition-all ${
                node.status === 'Critical'
                  ? 'border-red-300 ring-1 ring-red-300'
                  : node.status === 'Warning'
                  ? 'border-amber-300'
                  : ''
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 border-b border-midora-borderSubtle pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                      node.category === 'gpu'
                        ? 'bg-midora-sakuraSoft text-midora-sakuraDeep border border-midora-sakuraBorder'
                        : node.category === 'edge'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-midora-greenLight text-midora-greenDark border border-midora-green/20'
                    }`}
                  >
                    {node.category === 'gpu' ? (
                      <Zap className="w-4 h-4 fill-current" />
                    ) : node.category === 'edge' ? (
                      <Radio className="w-4 h-4" />
                    ) : (
                      <Server className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-sm text-midora-dark">
                        {node.id}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-mono uppercase bg-midora-bgWarm border border-midora-border text-midora-muted">
                        {node.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-midora-muted font-mono truncate max-w-[170px]">
                      {node.name.replace(/.*\((.*)\)/, '$1')}
                    </p>
                  </div>
                </div>

                {/* Status indicator */}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 ${
                    node.status === 'Healthy'
                      ? 'bg-midora-greenLight text-midora-greenDark'
                      : node.status === 'Warning'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800 animate-pulse'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      node.status === 'Healthy'
                        ? 'bg-midora-green'
                        : node.status === 'Warning'
                        ? 'bg-amber-600'
                        : 'bg-red-600'
                    }`}
                  />
                  {node.status}
                </span>
              </div>

              {/* Resource Metrics Bars */}
              <div className="space-y-2.5 text-xs font-mono mb-4">
                {/* CPU */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-midora-muted flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-midora-green" /> CPU ({node.totalCpu} cores)
                    </span>
                    <span className="font-bold text-midora-dark">{node.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        node.cpuUsage > 85 ? 'bg-midora-danger' : 'bg-midora-green'
                      }`}
                      style={{ width: `${node.cpuUsage}%` }}
                    />
                  </div>
                </div>

                {/* RAM */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-midora-muted flex items-center gap-1">
                      <HardDrive className="w-3 h-3 text-midora-green" /> RAM ({node.totalRam} GB)
                    </span>
                    <span className="font-bold text-midora-dark">{node.ramUsage}%</span>
                  </div>
                  <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        node.ramUsage > 85 ? 'bg-midora-danger' : 'bg-midora-green'
                      }`}
                      style={{ width: `${node.ramUsage}%` }}
                    />
                  </div>
                </div>

                {/* GPU if applicable */}
                {node.totalGpu > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-midora-muted flex items-center gap-1">
                        <Zap className="w-3 h-3 text-midora-sakuraDeep" /> GPU ({node.totalGpu} units)
                      </span>
                      <span className="font-bold text-midora-sakuraDeep">{node.gpuUsage}%</span>
                    </div>
                    <div className="w-full bg-midora-bgWarm h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          node.gpuUsage > 85 ? 'bg-midora-danger' : 'bg-midora-sakuraDeep'
                        }`}
                        style={{ width: `${node.gpuUsage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Node Environmental & Operational KPIs */}
              <div className="pt-2 border-t border-midora-borderSubtle grid grid-cols-3 gap-2 text-[11px] font-mono text-center">
                <div className="p-1.5 bg-midora-bgWarm/50 rounded">
                  <span className="text-[9px] text-midora-muted block">LATENCY</span>
                  <span className="font-bold text-midora-dark">{node.latency}ms</span>
                </div>
                <div className="p-1.5 bg-midora-bgWarm/50 rounded">
                  <span className="text-[9px] text-midora-muted block">POWER</span>
                  <span className="font-bold text-midora-dark">{node.powerDrawWatts}W</span>
                </div>
                <div className="p-1.5 bg-midora-bgWarm/50 rounded">
                  <span className="text-[9px] text-midora-muted block">GRID CO₂</span>
                  <span className="font-bold text-midora-greenDark">{node.carbonIntensity}g</span>
                </div>
              </div>

              {/* Workloads footer */}
              <div className="mt-3 pt-2 border-t border-midora-borderSubtle flex items-center justify-between text-[11px]">
                <span className="text-midora-muted font-mono">
                  {nodeWorkloadCount} Workloads Assigned
                </span>
                <span className="text-midora-green font-bold hover:underline">
                  Inspect Node →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
