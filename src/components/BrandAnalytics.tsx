import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  Target, 
  DollarSign, 
  Truck, 
  Download, 
  Share2,
  BarChart3,
  Activity,
  Clock
} from 'lucide-react';
import { Card } from './ui/card';

interface KPIData {
  label: string;
  value: string;
  sparklineData: number[];
}

interface QueryItem {
  question: string;
  category: string;
  timeAgo: string;
  result: string;
}

interface QueryCategory {
  name: string;
  percentage: number;
  color: string;
}

interface ActionData {
  action: string;
  total: number;
  fromInsight: number;
  fromChat: number;
  fromAgent: number;
}

interface AgentInfo {
  name: string;
  emoji: string;
  status: 'Active' | 'Scheduled';
  description: string;
  usageData: number[];
}

interface EngagementMetric {
  label: string;
  value: string;
  percentage: number;
}

interface Alert {
  type: 'Heads-up' | 'Tip' | 'Benchmark';
  message: string;
}

export default function BrandAnalytics() {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [agentFilter, setAgentFilter] = useState('All agents');
  const [actionFilter, setActionFilter] = useState('All actions');
  const [heatmapData, setHeatmapData] = useState<boolean[]>([]);

  // Generate heatmap data on component mount
  useEffect(() => {
    const data = Array.from({ length: 28 }, () => Math.random() > 0.45);
    setHeatmapData(data);
  }, []);

  const kpiData: KPIData[] = [
    { 
      label: 'Queries entered', 
      value: '230', 
      sparklineData: [28, 29, 26, 24, 22, 18, 16, 14, 10] 
    },
    { 
      label: 'Actions taken', 
      value: '95', 
      sparklineData: [30, 28, 27, 25, 24, 22, 20, 18, 16] 
    },
    { 
      label: 'Monthly active usage', 
      value: '2Hr 32Mins', 
      sparklineData: [24, 22, 20, 18, 16, 18, 16, 14, 12] 
    },
    { 
      label: 'Insight funnel conversion', 
      value: '22%', 
      sparklineData: [30, 28, 26, 24, 22, 20, 18, 16, 15] 
    },
  ];

  const latestQueries: QueryItem[] = [
    {
      question: "Which SKUs will stockout in 7 days?",
      category: "Inventory",
      timeAgo: "3 hours ago",
      result: "Triggered: Create PO (draft)"
    },
    {
      question: "What were sales yesterday by channel?",
      category: "Sales",
      timeAgo: "6 hours ago",
      result: "Viewed insight"
    },
    {
      question: "Change price of SKU‑A12 to 199 SAR",
      category: "Pricing",
      timeAgo: "1 day ago",
      result: "Action executed"
    },
    {
      question: "Create promo code for Eid, 15% off",
      category: "Promotions",
      timeAgo: "2 days ago",
      result: "Action executed"
    },
  ];

  const queryCategories: QueryCategory[] = [
    { name: 'Sales', percentage: 40, color: 'bg-primary' },
    { name: 'Inventory', percentage: 30, color: 'bg-blue-500' },
    { name: 'Promotions', percentage: 15, color: 'bg-green-500' },
    { name: 'Pricing', percentage: 10, color: 'bg-yellow-500' },
    { name: 'Fulfillment', percentage: 5, color: 'bg-purple-500' },
  ];

  const actionData: ActionData[] = [
    { action: 'Create Promo Code', total: 40, fromInsight: 25, fromChat: 10, fromAgent: 5 },
    { action: 'Replenish Stock', total: 33, fromInsight: 15, fromChat: 8, fromAgent: 10 },
    { action: 'Price Change', total: 20, fromInsight: 10, fromChat: 7, fromAgent: 3 },
    { action: 'Create Custom Audience', total: 12, fromInsight: 8, fromChat: 4, fromAgent: 0 },
    { action: 'Edit Products', total: 18, fromInsight: 9, fromChat: 3, fromAgent: 6 },
  ];

  const emailPerformance = [
    { stage: 'Delivered', percentage: 100 },
    { stage: 'Opened', percentage: 75 },
    { stage: 'Clicked', percentage: 40 },
    { stage: 'Action taken', percentage: 22 },
  ];

  const agents: AgentInfo[] = [
    {
      name: 'Inventory',
      emoji: '📦',
      status: 'Active',
      description: '12 restock actions · 3 slow mover flags',
      usageData: [30, 28, 26, 20, 18, 20, 16, 14, 12]
    },
    {
      name: 'Promotions',
      emoji: '🎯',
      status: 'Active',
      description: '15 promo codes created · 4 tests running',
      usageData: [32, 30, 28, 26, 24, 22, 20, 20, 18]
    },
    {
      name: 'Pricing',
      emoji: '💸',
      status: 'Scheduled',
      description: '8 price adjustments · 2 bundles suggested',
      usageData: [30, 28, 28, 26, 24, 24, 22, 20, 20]
    },
    {
      name: 'Fulfillment',
      emoji: '🚚',
      status: 'Active',
      description: '7 delayed orders resolved · 2 partner alerts',
      usageData: [33, 30, 28, 27, 26, 24, 23, 22, 21]
    },
  ];

  const engagementMetrics: EngagementMetric[] = [
    { label: 'Avg session time', value: '12m', percentage: 68 },
    { label: 'Days active (30d)', value: '24 days', percentage: 80 },
    { label: 'Messages per session', value: '5.6', percentage: 55 },
  ];

  const alerts: Alert[] = [
    {
      type: 'Heads-up',
      message: 'Inventory agent detected 3 SKUs below reorder point. PO draft suggested.'
    },
    {
      type: 'Tip',
      message: 'Vitrine responds well to "Chat with Insight" (31% usage). Consider onboarding to Pricing agent.'
    },
    {
      type: 'Benchmark',
      message: 'Vitrine\'s OR 75% vs platform median 62% — top quartile.'
    },
  ];

  const Sparkline = ({ data, className }: { data: number[], className?: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / (max - min)) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className={`w-full h-8 ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          points={points}
          className="text-primary"
        />
        <polyline
          fill="rgba(99, 102, 241, 0.1)"
          stroke="none"
          points={`0,100 ${points} 100,100`}
          className="text-primary"
        />
      </svg>
    );
  };

  const DonutChart = ({ percentage, label }: { percentage: number, label: string }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-primary"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold">{percentage}%</span>
          <span className="text-xs">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg text-primary-foreground flex items-center justify-center font-bold">
              V
            </div>
            <h1 className="text-2xl font-bold text-foreground">Brand Analytics — Vitrine</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom…</option>
            </select>
            <select 
              value={agentFilter} 
              onChange={(e) => setAgentFilter(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option>All agents</option>
              <option>Inventory</option>
              <option>Pricing</option>
              <option>Promotions</option>
              <option>Fulfillment</option>
              <option>Finance</option>
            </select>
            <select 
              value={actionFilter} 
              onChange={(e) => setActionFilter(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option>All actions</option>
              <option>Promotion</option>
              <option>Inventory</option>
              <option>Pricing</option>
              <option>Fulfillment</option>
              <option>Customers/Segments</option>
            </select>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90">
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">{kpi.label}</h3>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <Sparkline data={kpi.sparklineData} />
            </div>
          </Card>
        ))}
      </div>

      {/* Latest Queries + Query Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Latest queries</h3>
            <div className="space-y-4">
              {latestQueries.map((query, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <p className="font-medium">"{query.question}"</p>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded">{query.category}</span>
                    <span>{query.timeAgo}</span>
                    <span>{query.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Queries by category</h3>
          <div className="space-y-3">
            {queryCategories.map((category, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm">{category.name}</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${category.color}`} 
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-right">{category.percentage}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Actions by category + Email Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Actions by category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <DonutChart percentage={35} label="Promo" />
              </div>
              <div className="flex justify-center">
                <DonutChart percentage={30} label="Inv" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Action</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Insight</th>
                    <th className="text-left py-2">Chat</th>
                    <th className="text-left py-2">Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {actionData.map((action, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{action.action}</td>
                      <td className="py-2 font-semibold">{action.total}</td>
                      <td className="py-2">{action.fromInsight}</td>
                      <td className="py-2">{action.fromChat}</td>
                      <td className="py-2">{action.fromAgent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Insight email performance</h3>
          <div className="space-y-3">
            {emailPerformance.map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm">{stage.stage}</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-right">{stage.percentage}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Agent Utilization */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Agent utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-semibold">{agent.emoji} {agent.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  agent.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {agent.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
              <Sparkline data={agent.usageData} />
            </div>
          ))}
        </div>
      </Card>

      {/* Usage & Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily usage (last 4 weeks)</h3>
          <div className="grid grid-cols-7 gap-1">
            {heatmapData.map((isActive, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm border ${
                  isActive 
                    ? 'bg-primary border-primary' 
                    : 'bg-muted border-muted'
                }`}
              />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Engagement</h3>
          <div className="space-y-4">
            {engagementMetrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm">{metric.label}</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${metric.percentage}%` }}
                  />
                </div>
                <div className="w-16 text-sm text-right">{metric.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts & Notes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Alerts & notes</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/50">
              <span className="font-semibold">{alert.type}:</span> {alert.message}
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button className="border border-border px-4 py-2 rounded-md text-sm hover:bg-muted flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share link
        </button>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Create dashboard from view
        </button>
      </div>
    </div>
  );
}
