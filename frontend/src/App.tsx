import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './state/SimulationContext';
import { BotanicalDecorations } from './assets/BotanicalDecorations';
import { SakuraPetals } from './assets/SakuraPetals';
import { Navbar, ActiveTab } from './components/Navbar';
import { WorkloadModal } from './components/WorkloadModal';
import { AllocationModal } from './components/AllocationModal';
import { NodeDetailModal } from './components/NodeDetailModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { WorkloadsPage } from './pages/WorkloadsPage';
import { AllocationPipelinePage } from './pages/AllocationPipelinePage';
import { DependencyGraphPage } from './pages/DependencyGraphPage';
import { DeadlockPage } from './pages/DeadlockPage';
import { EnergyCarbonPage } from './pages/EnergyCarbonPage';
import { OptimizationPage } from './pages/OptimizationPage';
import { DemoScenarioPage } from './pages/DemoScenarioPage';
import { ActivityPage } from './pages/ActivityPage';

import { SystemNode, Workload, AllocationScoreBreakdown } from './state/types';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [isWorkloadModalOpen, setIsWorkloadModalOpen] = useState(false);
  const [selectedNodeForDetail, setSelectedNodeForDetail] = useState<SystemNode | null>(null);
  const [allocationWorkload, setAllocationWorkload] = useState<Workload | null>(null);

  const {
    nodes,
    workloads,
    createWorkload,
    allocateWorkload,
  } = useSimulation();

  const handleCreateWorkloadSubmit = (data: any) => {
    const newWl = createWorkload(data);
    setIsWorkloadModalOpen(false);
    // Launch animated allocation pipeline immediately for the newly submitted workload
    setAllocationWorkload(newWl);
  };

  const handleCommitAllocation = (
    workloadId: string,
    nodeId: string,
    breakdown: AllocationScoreBreakdown
  ) => {
    allocateWorkload(workloadId, nodeId, breakdown);
    setAllocationWorkload(null);
  };

  return (
    <div className="min-h-screen bg-midora-bg text-midora-dark relative flex flex-col selection:bg-midora-sakuraSoft selection:text-midora-dark">
      {/* 1. Botanical Branch Framing (Section 6) */}
      <BotanicalDecorations variant={activeTab === 'landing' ? 'full' : 'subtle'} />

      {/* 2. Falling Sakura Petal Particles (Section 5) */}
      <SakuraPetals />

      {/* 3. Navigation Bar (Section 8) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateWorkload={() => setIsWorkloadModalOpen(true)}
        onRunDemo={() => setActiveTab('demo')}
      />

      {/* 4. Page Content View (Framed by whitespace and botanical elements) */}
      <main className="flex-1 relative z-20 px-4 sm:px-6 lg:px-8 pt-6 max-w-7xl mx-auto w-full">
        {activeTab === 'landing' && (
          <LandingPage
            onExplore={() => setActiveTab('overview')}
            onRunDemo={() => setActiveTab('demo')}
          />
        )}

        {activeTab === 'overview' && (
          <DashboardPage
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenCreateWorkload={() => setIsWorkloadModalOpen(true)}
            onRunDemo={() => setActiveTab('demo')}
            onSelectNode={(node) => setSelectedNodeForDetail(node)}
          />
        )}

        {activeTab === 'infrastructure' && (
          <InfrastructurePage
            onSelectNode={(node) => setSelectedNodeForDetail(node)}
            onOpenCreateWorkload={() => setIsWorkloadModalOpen(true)}
          />
        )}

        {activeTab === 'workloads' && (
          <WorkloadsPage
            onOpenCreateWorkload={() => setIsWorkloadModalOpen(true)}
            onAllocateWorkload={(w) => setAllocationWorkload(w)}
          />
        )}

        {activeTab === 'allocation' && (
          <AllocationPipelinePage
            onLaunchAllocationModal={(w) => setAllocationWorkload(w)}
            onOpenCreateWorkload={() => setIsWorkloadModalOpen(true)}
          />
        )}

        {activeTab === 'graph' && <DependencyGraphPage />}

        {activeTab === 'deadlock' && (
          <DeadlockPage onNavigateToGraph={() => setActiveTab('graph')} />
        )}

        {activeTab === 'energy' && <EnergyCarbonPage />}

        {activeTab === 'optimization' && <OptimizationPage />}

        {activeTab === 'demo' && (
          <DemoScenarioPage onNavigateToGraph={() => setActiveTab('graph')} />
        )}

        {activeTab === 'activity' && <ActivityPage />}
      </main>

      {/* ========================================================
          MODALS & DRAWERS
          ======================================================== */}
      {/* 1. Create Workload Modal */}
      <WorkloadModal
        isOpen={isWorkloadModalOpen}
        onClose={() => setIsWorkloadModalOpen(false)}
        onSubmit={handleCreateWorkloadSubmit}
      />

      {/* 2. Multi-Stage Animated Decision Pipeline Modal */}
      <AllocationModal
        isOpen={!!allocationWorkload}
        workload={allocationWorkload}
        nodes={nodes}
        onClose={() => setAllocationWorkload(null)}
        onCommitAllocation={handleCommitAllocation}
      />

      {/* 3. Node Detail Inspector Modal */}
      <NodeDetailModal
        node={selectedNodeForDetail}
        workloads={workloads}
        onClose={() => setSelectedNodeForDetail(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <MainApp />
    </SimulationProvider>
  );
}
