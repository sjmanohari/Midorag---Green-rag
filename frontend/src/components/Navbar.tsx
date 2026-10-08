import React, { useState } from 'react';
import { MidoragLogo } from '../assets/MidoragLogo';
import {
  Activity,
  Cpu,
  Layers,
  Network,
  ShieldAlert,
  Sparkles,
  Zap,
  TrendingDown,
  LayoutDashboard,
  Play,
  Menu,
  X,
  Compass,
} from 'lucide-react';

export type ActiveTab =
  | 'landing'
  | 'overview'
  | 'infrastructure'
  | 'workloads'
  | 'allocation'
  | 'graph'
  | 'deadlock'
  | 'energy'
  | 'optimization'
  | 'activity'
  | 'demo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCreateWorkload: () => void;
  onRunDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreateWorkload,
  onRunDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'infrastructure', label: 'Infrastructure', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'workloads', label: 'Workloads', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'allocation', label: 'Allocation', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'graph', label: 'Dependency Graph', icon: <Network className="w-3.5 h-3.5" /> },
    { id: 'deadlock', label: 'Deadlock & Risk', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'energy', label: 'Energy & Carbon', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'optimization', label: 'Optimization', icon: <TrendingDown className="w-3.5 h-3.5" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-midora-card/90 backdrop-blur-md border-b border-midora-border/80 shadow-soft">
      {/* Simulation Banner Notice (Section 3 & 28) */}
      <div className="bg-midora-greenLight/70 border-b border-midora-green/20 px-4 py-1 text-center flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-midora-green text-white">
          Simulation Mode
        </span>
        <span className="text-xs text-midora-dark/80 font-sans">
          Resource allocation is simulated for sustainable cloud–edge environments.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="cursor-pointer transition-transform hover:scale-[1.01]"
            onClick={() => setActiveTab('landing')}
          >
            <MidoragLogo size="sm" showTagline={false} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'landing'
                  ? 'bg-midora-green/10 text-midora-greenDark font-semibold'
                  : 'text-midora-muted hover:text-midora-dark hover:bg-black/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Landing
            </button>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-midora-green/10 text-midora-greenDark font-semibold shadow-xs'
                      : 'text-midora-muted hover:text-midora-dark hover:bg-black/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onRunDemo}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-gradient-to-r from-midora-sakuraSoft to-white text-midora-sakuraDeep border border-midora-sakuraBorder hover:bg-midora-sakuraSoft/80 shadow-xs flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              title="Run Controlled Simulation Demo"
            >
              <Play className="w-3 h-3 fill-current" />
              Run Demo
            </button>

            <button
              onClick={onOpenCreateWorkload}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-midora-green text-white hover:bg-midora-greenDark shadow-botanical flex items-center gap-1.5 transition-all hover:scale-[1.02]"
            >
              <span>+ Create Workload</span>
            </button>

            <div className="h-5 w-px bg-midora-border mx-1" />

            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-midora-bgWarm border border-midora-border text-[11px] font-mono text-midora-dark">
              <span className="w-2 h-2 rounded-full bg-midora-green animate-pulse" />
              <span className="hidden md:inline">Operational</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenCreateWorkload}
              className="px-2.5 py-1.5 rounded text-xs font-semibold bg-midora-green text-white"
            >
              + Workload
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-midora-dark hover:bg-midora-bgWarm border border-midora-border"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-midora-border bg-midora-card px-4 pt-3 pb-4 space-y-1 shadow-lg">
          <button
            onClick={() => {
              setActiveTab('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded text-xs font-medium text-midora-dark hover:bg-midora-bgWarm flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-midora-green" />
            Landing Page
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center gap-2 ${
                activeTab === item.id
                  ? 'bg-midora-green/10 text-midora-greenDark font-bold'
                  : 'text-midora-muted hover:bg-midora-bgWarm hover:text-midora-dark'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onRunDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded text-xs font-semibold bg-midora-sakuraSoft text-midora-sakuraDeep border border-midora-sakuraBorder flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Run MIDORAG Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
