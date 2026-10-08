import React from 'react';
import { MidoragLogo } from '../assets/MidoragLogo';
import {
  Sparkles,
  Play,
  ArrowRight,
  ShieldCheck,
  Zap,
  Network,
  Cpu,
  Layers,
  Check,
  Terminal,
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onRunDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onRunDemo }) => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden">
      {/* ========================================================
          HERO SECTION — Matching Primary Reference Composition (Section 7)
          Large branding, generous whitespace, botanical framing,
          technical typography and nature-tech harmony
          ======================================================== */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center z-20">
        {/* Subtle top indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-midora-border shadow-soft text-xs font-mono text-midora-muted mb-8 animate-fade-in backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-midora-green animate-pulse" />
          <span>RESEARCH PROTOTYPE • SIMULATION MODE</span>
          <span className="text-midora-border">|</span>
          <span className="text-midora-sakuraDeep font-semibold">SAKURA IDENTITY</span>
        </div>

        {/* Hero Branding — Centered Grand Logo */}
        <div className="flex flex-col items-center justify-center mb-6">
          <MidoragLogo size="hero" showTagline={false} className="justify-center" />
        </div>

        {/* Primary Subtitle & Technical Specification */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-midora-dark tracking-tight max-w-3xl mx-auto mt-2 leading-tight">
          Carbon-Aware Resource Orchestration
          <span className="block text-midora-green font-semibold">
            & Deadlock Resilience
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-midora-muted max-w-2xl mx-auto font-sans leading-relaxed">
          Intelligent resource allocation for sustainable cloud–edge computing.
          Harmonizing workload scheduling, graph cycle prevention, and carbon minimization.
        </p>

        {/* Action Buttons: [Explore Platform] and [Run Demo] */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="px-6 py-3.5 rounded-lg font-bold text-sm text-white bg-midora-green hover:bg-midora-greenDark shadow-botanical flex items-center gap-2.5 transition-all hover:scale-[1.02]"
          >
            <span>Explore Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onRunDemo}
            className="px-6 py-3.5 rounded-lg font-bold text-sm bg-white hover:bg-midora-sakuraSoft/50 text-midora-dark border border-midora-sakuraBorder shadow-sakura flex items-center gap-2.5 transition-all hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-midora-sakuraDeep text-midora-sakuraDeep" />
            <span>Run Midorag Demo</span>
          </button>
        </div>

        {/* Thin technical line badge */}
        <div className="mt-12 pt-8 border-t border-midora-border/60 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-3 bg-white/70 rounded-lg border border-midora-borderSubtle">
            <span className="text-[10px] font-mono uppercase text-midora-muted block">TOPOLOGY</span>
            <span className="text-sm font-display font-bold text-midora-dark">11 Multi-Tier Nodes</span>
            <span className="text-[11px] text-midora-muted block">5 Cloud • 3 Edge • 3 GPU</span>
          </div>
          <div className="p-3 bg-white/70 rounded-lg border border-midora-borderSubtle">
            <span className="text-[10px] font-mono uppercase text-midora-muted block">DEADLOCK ENGINE</span>
            <span className="text-sm font-display font-bold text-midora-greenDark">Tarjan Cycle Guard</span>
            <span className="text-[11px] text-midora-muted block">NetworkX Directed Graphs</span>
          </div>
          <div className="p-3 bg-white/70 rounded-lg border border-midora-borderSubtle">
            <span className="text-[10px] font-mono uppercase text-midora-muted block">CARBON OPTIMIZER</span>
            <span className="text-sm font-display font-bold text-midora-dark">Pareto Scheduling</span>
            <span className="text-[11px] text-midora-muted block">Real-Time Grid Telemetry</span>
          </div>
          <div className="p-3 bg-white/70 rounded-lg border border-midora-borderSubtle">
            <span className="text-[10px] font-mono uppercase text-midora-muted block">PREDICTIVE ML</span>
            <span className="text-sm font-display font-bold text-midora-dark">Preemptive Rebalance</span>
            <span className="text-[11px] text-midora-muted block">Contention & Hold-and-Wait</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          DECISION PIPELINE CONCEPT DISPLAY (Section 3)
          Visual flow of how MIDORAG receives workloads and schedules them
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-16 z-20">
        <div className="midora-card p-6 md:p-8 bg-white/90 backdrop-blur-md">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono font-bold tracking-widest text-midora-green uppercase">
              SUSTAINABLE COMPUTING ARCHITECTURE
            </span>
            <h2 className="text-xl font-display font-bold text-midora-dark mt-1">
              Deterministic 10-Stage Decision Engine
            </h2>
            <p className="text-xs text-midora-muted mt-1 max-w-xl mx-auto">
              Every submitted workload is analyzed through graph topology, carbon intensity, and mutual exclusion safety.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            {[
              { num: '01', title: 'Workload Intake', desc: 'Compute & SLA demands' },
              { num: '02', title: 'Node Survey', desc: 'Survey 11 candidate nodes' },
              { num: '03', title: 'Resource Headroom', desc: 'Verify CPU/RAM/GPU capacity' },
              { num: '04', title: 'Bipartite Graph', desc: 'Model dependency edges' },
              { num: '05', title: 'Contention Check', desc: 'Assess multi-tenant locks' },
              { num: '06', title: 'Cycle Detection', desc: 'Detect circular wait hazards' },
              { num: '07', title: 'Latency Evaluation', desc: 'Edge vs cloud ping bounds' },
              { num: '08', title: 'Thermal Energy', desc: 'Measure host power draw' },
              { num: '09', title: 'Carbon Footprint', desc: 'Favor clean hydro & solar grids' },
              { num: '10', title: 'Optimal Allocation', desc: 'Commit simulated assignment' },
            ].map((st) => (
              <div
                key={st.num}
                className="p-3 rounded-lg border border-midora-borderSubtle bg-midora-bgWarm/40 hover:bg-midora-greenLight/30 transition-all hover:border-midora-green/30"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-midora-green">{st.num}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-midora-green/40" />
                </div>
                <p className="font-semibold text-midora-dark">{st.title}</p>
                <p className="text-[10px] text-midora-muted mt-0.5">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-midora-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="font-mono text-midora-muted">
              SIMULATION MODE: Standalone in-browser or paired with Python FastAPI backend.
            </span>
            <button
              onClick={onExplore}
              className="text-midora-greenDark hover:text-midora-green font-bold flex items-center gap-1"
            >
              Enter Interactive Dashboard →
            </button>
          </div>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="py-6 border-t border-midora-border/60 text-center text-xs text-midora-muted font-mono z-20">
        MIDORAG • Carbon-Aware Resource Orchestration & Deadlock Resilience • Sakura Scientific UI
      </footer>
    </div>
  );
};
