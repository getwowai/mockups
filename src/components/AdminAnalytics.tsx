import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Eye, 
  MousePointer, 
  Download, 
  BarChart3,
  Settings
} from 'lucide-react';
import { Card } from './ui/card';

interface KPIData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface QueryCategory {
  name: string;
  percentage: number;
  color: string;
}

interface Action {
  action: string;
  total: number;
  fromInsights: number;
  fromChat: number;
  fromAgents: number;
  conversion: string;
}

interface Brand {
  name: string;
  queries: number;
  openRate: string;
  ctr: string;
  agentsConfigured: number;
  actions: number;
  isHighlighted?: boolean;
}

interface Activity {
  time: string;
  brand: string;
  action: string;
}

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [segment, setSegment] = useState('All brands');
  const [searchTerm, setSearchTerm] = useState('');

  const handleBrandChange = (brandName: string) => {
    setSegment(brandName);
    if (brandName !== 'All brands') {
      navigate('/brand');
    }
  };

  const kpiData: KPIData[] = [
    { label: 'Active brands', value: '146', change: '+8% vs prior 30d', isPositive: true },
    { label: 'Total queries asked', value: '38,420', change: '+12%', isPositive: true },
    { label: 'Insight opens (OR)', value: '62% OR', change: '+4 pts', isPositive: true },
    { label: 'Clicks from insights (CTR)', value: '19% CTR', change: '+2 pts', isPositive: true },
  ];

  const queryCategories: QueryCategory[] = [
    { name: 'Sales', percentage: 34, color: 'bg-primary' },
    { name: 'Inventory', percentage: 22, color: 'bg-blue-500' },
    { name: 'Pricing', percentage: 11, color: 'bg-green-500' },
    { name: 'Promotions', percentage: 14, color: 'bg-yellow-500' },
    { name: 'Fulfillment', percentage: 8, color: 'bg-purple-500' },
    { name: 'Finance', percentage: 6, color: 'bg-pink-500' },
    { name: 'Customers', percentage: 5, color: 'bg-indigo-500' },
    { name: 'Support', percentage: 0.6, color: 'bg-gray-500' },
  ];

  const actions: Action[] = [
    { action: 'Create PO', total: 412, fromInsights: 166, fromChat: 91, fromAgents: 155, conversion: '7.1%' },
    { action: 'Create Promo Code', total: 288, fromInsights: 204, fromChat: 39, fromAgents: 45, conversion: '5.0%' },
    { action: 'Price Change', total: 199, fromInsights: 88, fromChat: 34, fromAgents: 77, conversion: '3.1%' },
    { action: 'Replenish Stock', total: 350, fromInsights: 140, fromChat: 52, fromAgents: 158, conversion: '6.4%' },
    { action: 'Create Custom Audience', total: 120, fromInsights: 66, fromChat: 38, fromAgents: 16, conversion: '1.7%' },
    { action: 'Edit Products', total: 476, fromInsights: 210, fromChat: 90, fromAgents: 176, conversion: '8.3%' },
  ];

  const topBrands: Brand[] = [
    { name: 'HelioWear', queries: 2940, openRate: '58%', ctr: '16%', agentsConfigured: 4, actions: 210 },
    { name: 'Vitrine', queries: 2510, openRate: '66%', ctr: '21%', agentsConfigured: 5, actions: 248, isHighlighted: true },
    { name: 'LumaSkin', queries: 2340, openRate: '60%', ctr: '18%', agentsConfigured: 3, actions: 175 },
    { name: 'StrideCo', queries: 2020, openRate: '59%', ctr: '17%', agentsConfigured: 4, actions: 162 },
    { name: 'NovaGoods', queries: 1880, openRate: '61%', ctr: '19%', agentsConfigured: 4, actions: 154 },
  ];

  const recentActivities: Activity[] = [
    { time: '14:03', brand: 'Vitrine', action: 'Created PO for 3 SKUs from Inventory agent' },
    { time: '13:55', brand: 'StrideCo', action: 'Ran Pricing Strategist — 2 price increases scheduled' },
    { time: '13:20', brand: 'LumaSkin', action: 'Promo code "SUMMER15" created from insight' },
    { time: '12:41', brand: 'NovaGoods', action: 'Replenished stock for SKU‑8891' },
  ];

  const funnelData = [
    { stage: 'Insights delivered', percentage: 100, color: 'bg-primary' },
    { stage: 'Opened', percentage: 62, color: 'bg-primary/80' },
    { stage: 'Clicked', percentage: 19, color: 'bg-primary/60' },
    { stage: 'Chatted with insight', percentage: 12, color: 'bg-primary/40' },
    { stage: 'Action taken', percentage: 8, color: 'bg-primary/20' },
  ];

  const agentData = [
    { name: 'Inventory', setup: 90, active: 72 },
    { name: 'Promotions', setup: 76, active: 58 },
    { name: 'Pricing', setup: 65, active: 41 },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
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
              value={segment} 
              onChange={(e) => handleBrandChange(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option>All brands</option>
              {topBrands
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((brand, index) => (
                  <option key={index} value={brand.name}>{brand.name}</option>
                ))}
            </select>
            <input 
              type="search" 
              placeholder="Search brand (e.g., Vitrine)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm bg-background"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90">
              View
            </button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className={`text-sm flex items-center gap-1 ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {kpi.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Query Categories */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Query Categories (All brands)</h3>
        <div className="space-y-3">
          {queryCategories.map((category, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-32 text-sm">{category.name}</div>
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
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <span className="bg-muted px-3 py-1 rounded-full">Top keyword: "AOV"</span>
          <span className="bg-muted px-3 py-1 rounded-full">Trending: "stockout"</span>
        </div>
      </Card>

      {/* Insights Performance + Agent Adoption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Insights Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Opens</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">62% (+4)</span>
            </div>
            <div className="h-16 bg-muted rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" style={{width: '62%'}} />
            </div>
            <div className="flex justify-between items-center">
              <span>Clicks</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">19% (+2)</span>
            </div>
            <div className="h-16 bg-muted rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" style={{width: '19%'}} />
            </div>
            <div className="flex justify-between items-center">
              <span>Chat with Insight usage</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">31% of opens</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Agent Adoption (setup vs active)</h3>
          <div className="grid grid-cols-3 gap-4">
            {agentData.map((agent, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="36" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray={226.19}
                      strokeDashoffset={226.19 - (226.19 * agent.setup) / 100}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">{agent.setup}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{agent.name} — setup</p>
                
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="36" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray={226.19}
                      strokeDashoffset={226.19 - (226.19 * agent.active) / 100}
                      className="text-green-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">{agent.active}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{agent.name} — active</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Actions Triggered Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Actions Triggered (last 30 days)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Action</th>
                <th className="text-left py-3 px-2">Total</th>
                <th className="text-left py-3 px-2">From Insights</th>
                <th className="text-left py-3 px-2">From Chat</th>
                <th className="text-left py-3 px-2">From Agents</th>
                <th className="text-left py-3 px-2">Conversion from Open</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-2">{action.action}</td>
                  <td className="py-3 px-2 font-semibold">{action.total}</td>
                  <td className="py-3 px-2">{action.fromInsights}</td>
                  <td className="py-3 px-2">{action.fromChat}</td>
                  <td className="py-3 px-2">{action.fromAgents}</td>
                  <td className="py-3 px-2">{action.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insight → Action Funnel */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Insight → Action Funnel (platform)</h3>
        <div className="space-y-4">
          {funnelData.map((stage, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span>{stage.stage}</span>
                <span className="bg-muted px-2 py-1 rounded text-sm">{stage.percentage}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${stage.color}`} 
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Brands Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Brands by Engagement</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Brand</th>
                <th className="text-left py-3 px-2">Queries</th>
                <th className="text-left py-3 px-2">Open Rate</th>
                <th className="text-left py-3 px-2">CTR</th>
                <th className="text-left py-3 px-2">Agents Configured</th>
                <th className="text-left py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topBrands.map((brand, index) => (
                <tr 
                  key={index} 
                  className={`border-b hover:bg-muted/50 ${brand.isHighlighted ? 'bg-yellow-50' : ''}`}
                >
                  <td className="py-3 px-2 font-semibold">{brand.name}</td>
                  <td className="py-3 px-2">{brand.queries.toLocaleString()}</td>
                  <td className="py-3 px-2">{brand.openRate}</td>
                  <td className="py-3 px-2">{brand.ctr}</td>
                  <td className="py-3 px-2">{brand.agentsConfigured}</td>
                  <td className="py-3 px-2">{brand.actions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Platform Events */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Platform Events</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">{activity.time}</span>
              <span className="text-muted-foreground font-medium">{activity.brand}</span>
              <span className="flex-1">{activity.action}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button className="border border-border px-4 py-2 rounded-md text-sm hover:bg-muted flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Create dashboard
        </button>
      </div>
    </div>
  );
}
