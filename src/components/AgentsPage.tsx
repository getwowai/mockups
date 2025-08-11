import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Agent {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'active' | 'scheduled' | 'paused' | 'needs-setup';
  kpi: string;
  meta: string;
}

const agents: Agent[] = [
  {
    id: 'inventory',
    name: 'Inventory & Supply Chain',
    icon: '📦',
    description: 'Flags low stock, suggests restocks, and identifies slow movers based on velocity.',
    status: 'active',
    kpi: '⚠️ 6 SKUs need restock',
    meta: 'Last run: 2h ago'
  },
  {
    id: 'promotions',
    name: 'Offers & Promotions',
    icon: '🎯',
    description: 'Ranks promo codes by net revenue and flags high-return promotions.',
    status: 'active',
    kpi: '🏷️ Best code: +31% AOV',
    meta: 'Last run: 3h ago'
  },
  {
    id: 'pricing',
    name: 'Pricing Strategist',
    icon: '💸',
    description: 'Suggests price moves and markdowns; tracks elasticity and bundle uplift.',
    status: 'scheduled',
    kpi: '⬆️ 2 SKUs suggested ↑',
    meta: 'Next run: in 6h'
  },
  {
    id: 'fulfillment',
    name: 'Fulfillment & Logistics',
    icon: '🚚',
    description: 'Monitors unfulfilled orders, delays, and partner SLA performance.',
    status: 'paused',
    kpi: '📦 3 delayed orders',
    meta: 'Paused 12h ago'
  },
  {
    id: 'finance',
    name: 'Finance & Profitability',
    icon: '🧾',
    description: 'Surfaces margin leaks, below-cost sales, and contribution by category.',
    status: 'active',
    kpi: '💰 1 SKU sold below cost',
    meta: 'Last run: 1h ago'
  },
  {
    id: 'customer-care',
    name: 'Customer Care Signals',
    icon: '💬',
    description: 'Analyzes support tags and NPS comments to surface product and CX issues.',
    status: 'needs-setup',
    kpi: '✨ Setup to start insights',
    meta: 'Connect: Helpdesk, NPS'
  }
];

const AgentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getStatusBadgeClass = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'scheduled':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'paused':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'needs-setup':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'scheduled':
        return 'Scheduled';
      case 'paused':
        return 'Paused';
      case 'needs-setup':
        return 'Needs setup';
      default:
        return status;
    }
  };

  const getActionButtons = (agent: Agent) => {
    if (agent.status === 'needs-setup') {
      return (
        <>
          <button className="bg-indigo-500 text-white border border-indigo-500 rounded-lg px-3 py-2 text-sm font-medium hover:bg-indigo-600 transition-colors">
            Start setup
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Learn more
          </button>
        </>
      );
    }

    if (agent.status === 'paused') {
      return (
        <>
          <Link to={`/agents/${agent.id}`}>
            <button className="bg-indigo-500 text-white border border-indigo-500 rounded-lg px-3 py-2 text-sm font-medium hover:bg-indigo-600 transition-colors">
              View details
            </button>
          </Link>
          <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Resume
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Settings
          </button>
        </>
      );
    }

    return (
      <>
        <Link to={`/agents/${agent.id}`}>
          <button className="bg-indigo-500 text-white border border-indigo-500 rounded-lg px-3 py-2 text-sm font-medium hover:bg-indigo-600 transition-colors">
            View details
          </button>
        </Link>
        <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
          Run now
        </button>
        <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
          Settings
        </button>
      </>
    );
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const configuredAgents = agents.filter(agent => agent.status !== 'needs-setup').length;
  const totalAgents = agents.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white py-5 px-4 text-center">
        <h1 className="text-2xl font-bold mb-1">Agents for Repetitive Tasks</h1>
        <p className="text-indigo-100 text-sm">
          Automate routine work across inventory, pricing, fulfillment, finance, and more.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Your Agents</h2>
            <p className="text-muted-foreground text-sm">
              Configure, run, and review specialized agents that handle repeated workflows.
            </p>
          </div>
          <div className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-3 py-2 text-sm font-medium">
            Setup progress: {configuredAgents} / {totalAgents} agents configured
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            type="search"
            placeholder="Search agents…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 min-w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="paused">Paused</option>
            <option value="needs-setup">Needs setup</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All categories</option>
            <option value="inventory">Inventory</option>
            <option value="pricing">Pricing</option>
            <option value="promotions">Promotions</option>
            <option value="fulfillment">Fulfillment</option>
            <option value="finance">Finance</option>
            <option value="customers">Customers</option>
          </select>
          <span className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-2 text-xs">
            Tip: You can pause an agent anytime
          </span>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-indigo-200 focus-within:ring-offset-2"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <span>{agent.icon}</span>
                  {agent.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusBadgeClass(agent.status)}`}>
                  {getStatusText(agent.status)}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {agent.description}
              </p>

              {/* KPI and Meta */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="text-sm font-semibold text-foreground">
                  {agent.kpi}
                </div>
                <div className="text-xs text-muted-foreground">
                  {agent.meta}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {getActionButtons(agent)}
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Bulk actions</h3>
          <div className="flex flex-wrap gap-2">
            <button className="bg-indigo-500 text-white border border-indigo-500 rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-600 transition-colors">
              Run all active
            </button>
            <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              Pause all
            </button>
            <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              Manage schedules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
