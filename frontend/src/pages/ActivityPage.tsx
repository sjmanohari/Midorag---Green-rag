import React, { useState } from 'react';
import { useSimulation } from '../state/SimulationContext';
import { Activity, Filter, Search, Terminal, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activities } = useSimulation();
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredActivities = activities.filter((act) => {
    const matchesSev = severityFilter === 'all' || act.severity === severityFilter;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSev && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-midora-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-midora-green uppercase">
              EVENT AUDIT TRAIL
            </span>
            <span className="text-xs font-mono text-midora-muted">• {activities.length} Recorded Events</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-midora-dark mt-0.5">
            Real-Time Cluster Activity & Decision Log
          </h1>
          <p className="text-xs text-midora-muted mt-0.5">
            Immutable stream of scheduling decisions, graph cycle evaluations, and simulated hardware telemetry events.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-midora-border rounded-lg shadow-xs w-full sm:w-auto">
          {['all', 'critical', 'warning', 'success', 'info'].map((s) => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium uppercase font-mono transition-colors ${
                severityFilter === s
                  ? 'bg-midora-green text-white font-semibold'
                  : 'text-midora-muted hover:text-midora-dark'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-midora-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search log messages..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-midora-border rounded-lg bg-white focus:outline-none focus:border-midora-green"
          />
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="midora-card divide-y divide-midora-borderSubtle overflow-hidden">
        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center text-xs text-midora-muted font-mono">
            No events match the selected criteria.
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div key={act.id} className="p-4 flex items-start justify-between gap-4 hover:bg-midora-bgWarm/30 transition-colors">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs font-semibold text-midora-muted mt-0.5 min-w-[70px]">
                  {act.timestamp}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-midora-dark">{act.title}</span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-midora-bgWarm border border-midora-border text-midora-muted">
                      {act.category}
                    </span>
                  </div>
                  <p className="text-xs text-midora-muted mt-1 leading-relaxed">
                    {act.details}
                  </p>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase flex-shrink-0 ${
                  act.severity === 'critical'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : act.severity === 'warning'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : act.severity === 'success'
                    ? 'bg-midora-greenLight text-midora-greenDark border border-midora-green/20'
                    : 'bg-midora-bgWarm text-midora-muted'
                }`}
              >
                {act.severity}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
