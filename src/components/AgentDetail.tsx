import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Mock data for the Inventory & Supply Chain agent
const agentData = {
  'inventory': {
    name: 'Supply Chain Manager',
    description: 'Automates repetitive work: monitor stock, predict shortages, recommend restocks, detect slow-movers, and optimize reorder points.',
    status: 'Active',
    lastRun: '1h ago',
    nextRun: 'today 18:00',
    kpis: [
      { label: 'Low / OOS SKUs', value: '8' },
      { label: 'Avg Days of Stock', value: '32' },
      { label: 'Slow Movers', value: '5' },
      { label: 'At Risk (≤ 5 days)', value: '3' }
    ],
    alerts: [
      {
        sku: 'SKU-1029',
        message: 'will stockout in 3 days based on 7‑day velocity.',
        action: 'Action required',
        type: 'warn'
      },
      {
        sku: 'SKU-5512',
        message: 'has 120 days of inventory and 0 sales in 14 days. Consider markdown or bundle.',
        action: 'Slow mover',
        type: 'warn'
      },
      {
        sku: 'SKU-3399',
        message: 'inventory aged 90+ days. Storage risk flagged.',
        action: 'Aging',
        type: 'warn'
      }
    ],
    restockRecommendations: [
      { sku: 'SKU-1029', stock: 18, avgDaily: 6, daysLeft: 3, leadTime: 7, safety: 10, recommended: 34 },
      { sku: 'SKU-2044', stock: 22, avgDaily: 4, daysLeft: 5.5, leadTime: 10, safety: 12, recommended: 30 },
      { sku: 'SKU-7781', stock: 15, avgDaily: 3, daysLeft: 5, leadTime: 8, safety: 8, recommended: 17 }
    ],
    slowMovers: [
      { sku: 'SKU-5512', sales30d: 2, onHand: 240, turnover: 0.01, suggestion: 'Bundle with SKU‑1020' },
      { sku: 'SKU-3301', sales30d: 4, onHand: 140, turnover: 0.03, suggestion: 'Markdown 15%' },
      { sku: 'SKU-9907', sales30d: 0, onHand: 60, turnover: 0.00, suggestion: 'Flash sale / clearance' }
    ],
    reorderPoints: [
      { sku: 'SKU-1029', rop: 42, current: 18, status: 'Below ROP', type: 'warn' },
      { sku: 'SKU-2044', rop: 50, current: 22, status: 'Below ROP', type: 'warn' },
      { sku: 'SKU-8800', rop: 30, current: 46, status: 'Healthy', type: 'good' }
    ],
    schedule: [
      { frequency: 'Daily', time: '07:00', task: 'Pull inventory & sales' },
      { frequency: 'Weekly', time: 'Mon 08:00', task: 'Recalculate ROP' },
      { frequency: 'Alerts', time: 'Immediate', task: 'when below ROP' }
    ],
    activity: [
      '14:00 – Generated restock list (3 SKUs). Email draft created.',
      '09:05 – Flagged slow mover SKU‑5512 (0 sales 14d).',
      'Yesterday – Aging report compiled (12 SKUs >60d).',
      'Mon – ROP recalculated using 7‑day MA.'
    ]
  }
};

const AgentDetail: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const stockoutChartRef = useRef<HTMLCanvasElement>(null);
  const agingChartRef = useRef<HTMLCanvasElement>(null);

  const agent = agentData[agentId as keyof typeof agentData];

  useEffect(() => {
    // Load Chart.js dynamically and create charts
    const loadCharts = async () => {
      try {
        // @ts-ignore
        const Chart = (window as any).Chart;
        if (!Chart) {
          // Load Chart.js from CDN
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
          script.onload = () => createCharts();
          document.head.appendChild(script);
        } else {
          createCharts();
        }
      } catch (error) {
        console.log('Chart.js not available, skipping charts');
      }
    };

    const createCharts = () => {
      // @ts-ignore
      const Chart = (window as any).Chart;
      if (!Chart) return;

      // Stockout Risk Chart
      if (stockoutChartRef.current) {
        new Chart(stockoutChartRef.current, {
          type: 'line',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
              label: 'At‑risk SKUs',
              data: [5, 4, 3, 6],
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              tension: 0.35,
              fill: true,
              pointRadius: 3
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1 } },
              x: { ticks: { color: '#6b7280' } }
            }
          }
        });
      }

      // Aging Chart
      if (agingChartRef.current) {
        new Chart(agingChartRef.current, {
          type: 'bar',
          data: {
            labels: ['<30d', '30–60d', '60–90d', '>90d'],
            datasets: [{
              label: 'Units',
              data: [220, 180, 120, 90],
              backgroundColor: ['#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6'],
              borderColor: '#6366f1',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true },
              x: { ticks: { color: '#6b7280' } }
            }
          }
        });
      }
    };

    loadCharts();
  }, []);

  if (!agent) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Agent Not Found</h1>
          <Link to="/agents" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Agents
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadgeClass = (type: string) => {
    switch (type) {
      case 'warn':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'good':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Link to="/agents" className="text-indigo-200 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Agent: {agent.name}</h1>
          </div>
          <p className="text-indigo-100 text-sm">{agent.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Overview Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start gap-4 flex-wrap mb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground mb-2">Overview</h2>
              <div className="text-sm text-muted-foreground">
                Status: <span className="bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-1 text-xs font-medium">
                  {agent.status}
                </span> · Last run: {agent.lastRun} · Next run: {agent.nextRun}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="bg-indigo-500 text-white border border-indigo-500 rounded-lg px-3 py-2 text-sm font-medium hover:bg-indigo-600 transition-colors">
                Run now
              </button>
              <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                Settings
              </button>
              <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                Export report
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {agent.kpis.map((kpi, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">{kpi.label}</div>
                <div className="text-lg font-bold text-foreground">{kpi.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Critical Alerts */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">Critical Alerts</h2>
              <div className="space-y-3">
                {agent.alerts.map((alert, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                    <strong>{alert.sku}</strong> {alert.message}{' '}
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(alert.type)}`}>
                      {alert.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Restock Recommendations */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-2">Restock Recommendations</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Formula: (Avg daily sales × Lead time) + Safety stock − Current inventory
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">SKU</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Stock</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Avg Daily</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Days Left</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Lead Time (d)</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Safety</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Recommended Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agent.restockRecommendations.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-sm border-b">{item.sku}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.stock}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.avgDaily}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.daysLeft}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.leadTime}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.safety}</td>
                        <td className="px-3 py-2 text-sm border-b"><strong>{item.recommended}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="bg-indigo-500 text-white border border-indigo-500 rounded-lg px-3 py-2 text-sm font-medium hover:bg-indigo-600 transition-colors">
                  Create PO draft
                </button>
                <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Email supplier
                </button>
              </div>
            </div>

            {/* Slow-Moving SKUs */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">Slow‑Moving SKUs</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">SKU</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">30‑day Sales</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">On‑hand</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Turnover</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Suggestion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agent.slowMovers.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-sm border-b">{item.sku}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.sales30d}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.onHand}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.turnover}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.suggestion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Forecast & Aging Charts */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">Forecast & Aging</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Stockout Risk – next 4 weeks</h3>
                  <canvas ref={stockoutChartRef} height="140"></canvas>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Inventory Aging (units)</h3>
                  <canvas ref={agingChartRef} height="140"></canvas>
                </div>
              </div>
            </div>

            {/* Dynamic Reorder Points */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-2">Dynamic Reorder Points</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Recomputed weekly using moving averages of sales velocity and lead times.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">SKU</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">ROP</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Current</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agent.reorderPoints.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-sm border-b">{item.sku}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.rop}</td>
                        <td className="px-3 py-2 text-sm border-b">{item.current}</td>
                        <td className="px-3 py-2 text-sm border-b">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(item.type)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schedule & Activity */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">Schedule & Activity</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-2">Schedule</h3>
                  <div className="space-y-2">
                    {agent.schedule.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-2 bg-white">
                        <strong>{item.frequency}</strong>: {item.time} – {item.task}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-2">Recent Activity</h3>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {agent.activity.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-2 bg-white text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="bg-indigo-500 text-white border border-indigo-500 rounded-lg px-3 py-2 text-sm font-medium hover:bg-indigo-600 transition-colors">
                  Edit schedule
                </button>
                <button className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Notification settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
