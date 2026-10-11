
const API_BASE = 'https://midorag-green-rag.onrender.com/api';


export const apiService = {
  async getStatus() {
    try {
      const res = await fetch(`${API_BASE}/status`);
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return null;
    }
  },

  async getNodes() {
    try {
      const res = await fetch(`${API_BASE}/nodes`);
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return null;
    }
  },

  async getWorkloads() {
    try {
      const res = await fetch(`${API_BASE}/workloads`);
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return null;
    }
  },

  async allocate(workloadId: string, targetNodeId?: string) {
    try {
      const res = await fetch(`${API_BASE}/allocate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workloadId, targetNodeId }),
      });
      if (!res.ok) throw new Error('Allocation error');
      return await res.json();
    } catch {
      return null;
    }
  },

  async getDeadlockAnalysis() {
    try {
      const res = await fetch(`${API_BASE}/deadlock-analysis`);
      if (!res.ok) throw new Error('Deadlock analysis error');
      return await res.json();
    } catch {
      return null;
    }
  },

  async migrate(workloadId: string, fromNodeId: string, toNodeId: string) {
    try {
      const res = await fetch(`${API_BASE}/migrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workloadId, fromNodeId, toNodeId }),
      });
      if (!res.ok) throw new Error('Migration error');
      return await res.json();
    } catch {
      return null;
    }
  },

  async getMLPrediction(workloadId: string) {
    try {
      const res = await fetch(`${API_BASE}/predict/${workloadId}`);
      if (!res.ok) throw new Error('ML prediction error');
      return await res.json();
    } catch {
      return null;
    }
  },
};
