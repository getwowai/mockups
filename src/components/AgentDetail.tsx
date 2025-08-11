import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Type definitions for agent data
interface BaseAgent {
  name: string;
  description: string;
  status: string;
  lastRun: string;
  nextRun: string;
  kpis: { label: string; value: string }[];
  alerts: { sku: string; message: string; action: string; type: string }[];
  schedule: { frequency: string; time: string; task: string }[];
  activity: string[];
}

interface InventoryAgent extends BaseAgent {
  restockRecommendations: { sku: string; stock: number; avgDaily: number; daysLeft: number; leadTime: number; safety: number; recommended: number }[];
  slowMovers: { sku: string; sales30d: number; onHand: number; turnover: number; suggestion: string }[];
  reorderPoints: { sku: string; rop: number; current: number; status: string; type: string }[];
}

interface PromotionsAgent extends BaseAgent {
  promoPerformance: { code: string; redemptions: number; revenue: number; aov: number; margin: number }[];
  recommendations: { action: string; impact: string; confidence: string }[];
}

interface PricingAgent extends BaseAgent {
  priceRecommendations: { sku: string; currentPrice: number; suggestedPrice: number; impact: string; elasticity: number }[];
  bundleOpportunities: { products: string; uplift: string; bundlePrice: number; individualSum: number }[];
}

interface FulfillmentAgent extends BaseAgent {
  orderTracking: { orderNum: string; status: string; carrier: string; daysLate: number; customer: string }[];
  carrierPerformance: { carrier: string; onTime: number; avgDays: number; cost: string; volume: number }[];
}

interface FinanceAgent extends BaseAgent {
  profitabilityAnalysis: { sku: string; revenue: number; cost: number; margin: number; units: number }[];
  categoryPerformance: { category: string; revenue: number; margin: number; contribution: number }[];
  costBreakdown: { item: string; amount: number; percentage: number }[];
}

interface CustomerCareAgent extends BaseAgent {
  setupSteps: { step: string; status: string; description: string }[];
  potentialInsights: { insight: string; description: string }[];
  integrations: { name: string; status: string; setup: string }[];
}

type AgentData = InventoryAgent | PromotionsAgent | PricingAgent | FulfillmentAgent | FinanceAgent | CustomerCareAgent;

// Mock data for all agents
const agentData: Record<string, AgentData> = {
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
  },
  'promotions': {
    name: 'Offers & Promotions Manager',
    description: 'Ranks promo codes by net revenue, flags high-return promotions, and optimizes discount strategies.',
    status: 'Active',
    lastRun: '3h ago',
    nextRun: 'tomorrow 09:00',
    kpis: [
      { label: 'Active Promo Codes', value: '12' },
      { label: 'Best Performing Code', value: '+31% AOV' },
      { label: 'Total Revenue Impact', value: '$15,420' },
      { label: 'Conversion Uplift', value: '+18%' }
    ],
    alerts: [
      {
        sku: 'SUMMER25',
        message: 'is performing 45% above average. Consider extending duration.',
        action: 'Extend campaign',
        type: 'good'
      },
      {
        sku: 'NEWCUSTOMER',
        message: 'has low redemption rate (2.1%). Review targeting.',
        action: 'Review targeting',
        type: 'warn'
      },
      {
        sku: 'FLASH15',
        message: 'margin impact is -12%. Consider reducing discount.',
        action: 'Adjust discount',
        type: 'warn'
      }
    ],
    promoPerformance: [
      { code: 'SUMMER25', redemptions: 847, revenue: 8420, aov: 142, margin: 18 },
      { code: 'WELCOME10', redemptions: 624, revenue: 4980, aov: 98, margin: 22 },
      { code: 'BUNDLE20', redemptions: 312, revenue: 7200, aov: 180, margin: 15 }
    ],
    recommendations: [
      { action: 'Create bundle discount', impact: '+$2,400 revenue', confidence: 'High' },
      { action: 'A/B test 15% vs 20% discount', impact: '+8% conversion', confidence: 'Medium' },
      { action: 'Launch cart abandonment promo', impact: '+156 recovered carts', confidence: 'High' }
    ],
    schedule: [
      { frequency: 'Daily', time: '09:00', task: 'Analyze promo performance' },
      { frequency: 'Weekly', time: 'Mon 10:00', task: 'Generate promo recommendations' },
      { frequency: 'Monthly', time: '1st 09:00', task: 'Review discount strategy' }
    ],
    activity: [
      '09:00 – SUMMER25 flagged as top performer (+31% AOV)',
      '08:45 – Generated 3 new promo recommendations',
      'Yesterday – Monthly promo report sent to marketing team',
      'Mon – Analyzed Q3 discount effectiveness across segments'
    ]
  },
  'pricing': {
    name: 'Pricing Strategist',
    description: 'Suggests price moves and markdowns, tracks elasticity and bundle uplift for optimal revenue.',
    status: 'Scheduled',
    lastRun: '6h ago',
    nextRun: 'in 6h',
    kpis: [
      { label: 'Price Optimization Opportunities', value: '8' },
      { label: 'Revenue Impact (30d)', value: '+$12,340' },
      { label: 'Avg Price Elasticity', value: '-1.8' },
      { label: 'Markdown Candidates', value: '5' }
    ],
    alerts: [
      {
        sku: 'SKU-7890',
        message: 'price is 15% below competitor average. Consider +$5 increase.',
        action: 'Price increase opportunity',
        type: 'good'
      },
      {
        sku: 'SKU-4455',
        message: 'has been stagnant for 45 days. Consider 10% markdown.',
        action: 'Markdown candidate',
        type: 'warn'
      },
      {
        sku: 'SKU-9988',
        message: 'competitor dropped price by 8%. Monitor closely.',
        action: 'Competitor watch',
        type: 'warn'
      }
    ],
    priceRecommendations: [
      { sku: 'SKU-7890', currentPrice: 45, suggestedPrice: 50, impact: '+$840/month', elasticity: -1.2 },
      { sku: 'SKU-3344', currentPrice: 89, suggestedPrice: 79, impact: '+12 sales/week', elasticity: -2.1 },
      { sku: 'SKU-6677', currentPrice: 25, suggestedPrice: 22, impact: 'Clear inventory', elasticity: -1.8 }
    ],
    bundleOpportunities: [
      { products: 'SKU-7890 + SKU-1122', uplift: '+23%', bundlePrice: 89, individualSum: 95 },
      { products: 'SKU-4455 + SKU-8899', uplift: '+18%', bundlePrice: 159, individualSum: 175 },
      { products: 'SKU-3344 + SKU-5566', uplift: '+31%', bundlePrice: 199, individualSum: 225 }
    ],
    schedule: [
      { frequency: 'Daily', time: '18:00', task: 'Monitor competitor prices' },
      { frequency: 'Weekly', time: 'Wed 14:00', task: 'Generate pricing recommendations' },
      { frequency: 'Monthly', time: '15th 11:00', task: 'Elasticity analysis update' }
    ],
    activity: [
      '18:00 – Daily competitor price monitoring completed',
      '14:30 – SKU-7890 flagged for price increase opportunity',
      'Yesterday – Bundle recommendations generated (3 new opportunities)',
      'Tue – Price elasticity recalculated for 25 SKUs'
    ]
  },
  'fulfillment': {
    name: 'Fulfillment & Logistics Manager',
    description: 'Monitors unfulfilled orders, delays, and partner SLA performance to ensure timely delivery.',
    status: 'Paused',
    lastRun: '12h ago',
    nextRun: 'Paused',
    kpis: [
      { label: 'Unfulfilled Orders', value: '7' },
      { label: 'Avg Fulfillment Time', value: '2.3 days' },
      { label: 'SLA Breaches', value: '3' },
      { label: 'Carrier Performance', value: '94%' }
    ],
    alerts: [
      {
        sku: 'Order-4829',
        message: 'is 2 days overdue. Carrier: FastShip reported delay.',
        action: 'Contact customer',
        type: 'warn'
      },
      {
        sku: 'Order-5931',
        message: 'address verification failed. Customer action required.',
        action: 'Address issue',
        type: 'warn'
      },
      {
        sku: 'Partner-FastShip',
        message: 'SLA performance dropped to 89% this week.',
        action: 'Review partner',
        type: 'warn'
      }
    ],
    orderTracking: [
      { orderNum: 'Order-4829', status: 'Delayed', carrier: 'FastShip', daysLate: 2, customer: 'John D.' },
      { orderNum: 'Order-5931', status: 'Address Issue', carrier: 'QuickPost', daysLate: 1, customer: 'Sarah M.' },
      { orderNum: 'Order-6112', status: 'In Transit', carrier: 'ExpressGo', daysLate: 0, customer: 'Mike R.' }
    ],
    carrierPerformance: [
      { carrier: 'FastShip', onTime: 89, avgDays: 2.8, cost: '$4.50', volume: 245 },
      { carrier: 'QuickPost', onTime: 96, avgDays: 2.1, cost: '$5.20', volume: 189 },
      { carrier: 'ExpressGo', onTime: 98, avgDays: 1.9, cost: '$6.80', volume: 67 }
    ],
    schedule: [
      { frequency: 'Hourly', time: 'Every hour', task: 'Monitor order status updates' },
      { frequency: 'Daily', time: '08:00', task: 'Generate delay alerts' },
      { frequency: 'Weekly', time: 'Fri 16:00', task: 'Carrier performance review' }
    ],
    activity: [
      '20:00 – Order-4829 flagged as 2 days overdue',
      '18:30 – FastShip SLA performance alert triggered',
      'Yesterday – Weekly carrier review completed',
      'Wed – 3 address verification issues resolved'
    ]
  },
  'finance': {
    name: 'Finance & Profitability Analyst',
    description: 'Surfaces margin leaks, below-cost sales, and contribution by category to maximize profitability.',
    status: 'Active',
    lastRun: '1h ago',
    nextRun: 'today 20:00',
    kpis: [
      { label: 'Below-Cost Sales', value: '1 SKU' },
      { label: 'Avg Gross Margin', value: '42%' },
      { label: 'Margin Leaks (30d)', value: '$1,240' },
      { label: 'Most Profitable Category', value: 'Electronics' }
    ],
    alerts: [
      {
        sku: 'SKU-8822',
        message: 'sold at $23 with cost $25. Loss of $2 per unit.',
        action: 'Below-cost alert',
        type: 'warn'
      },
      {
        sku: 'Category-Apparel',
        message: 'margin dropped 3% this month. Review pricing strategy.',
        action: 'Margin decline',
        type: 'warn'
      },
      {
        sku: 'SKU-7755',
        message: 'shipping costs are 18% of sale price. Optimize logistics.',
        action: 'High shipping cost',
        type: 'warn'
      }
    ],
    profitabilityAnalysis: [
      { sku: 'SKU-8822', revenue: 690, cost: 750, margin: -8.7, units: 30 },
      { sku: 'SKU-4433', revenue: 1240, cost: 680, margin: 45.2, units: 16 },
      { sku: 'SKU-9911', revenue: 2100, cost: 1150, margin: 45.2, units: 25 }
    ],
    categoryPerformance: [
      { category: 'Electronics', revenue: 15420, margin: 38, contribution: 28 },
      { category: 'Apparel', revenue: 12890, margin: 52, contribution: 34 },
      { category: 'Home & Garden', revenue: 8760, margin: 41, contribution: 18 }
    ],
    costBreakdown: [
      { item: 'Product Cost', amount: 18420, percentage: 58 },
      { item: 'Shipping & Handling', amount: 2840, percentage: 9 },
      { item: 'Payment Processing', amount: 980, percentage: 3 },
      { item: 'Marketing & Ads', amount: 4200, percentage: 13 }
    ],
    schedule: [
      { frequency: 'Daily', time: '20:00', task: 'Scan for below-cost sales' },
      { frequency: 'Weekly', time: 'Mon 09:00', task: 'Category margin analysis' },
      { frequency: 'Monthly', time: '1st 10:00', task: 'Profitability deep dive' }
    ],
    activity: [
      '20:00 – SKU-8822 flagged for below-cost sale',
      '16:45 – Apparel category margin decline detected',
      'Yesterday – Monthly profitability report generated',
      'Mon – Cost structure analysis completed'
    ]
  },
  'customer-care': {
    name: 'Customer Care Signals Analyzer',
    description: 'Analyzes support tags and NPS comments to surface product and CX issues for improvement.',
    status: 'Needs Setup',
    lastRun: 'Never',
    nextRun: 'Setup required',
    kpis: [
      { label: 'Support Tickets (30d)', value: 'Setup needed' },
      { label: 'Average NPS Score', value: 'Connect NPS tool' },
      { label: 'Top Issue Category', value: 'Connect helpdesk' },
      { label: 'Resolution Time', value: 'Data pending' }
    ],
    alerts: [],
    setupSteps: [
      { step: 'Connect helpdesk system', status: 'pending', description: 'Link Zendesk, Intercom, or Freshdesk' },
      { step: 'Import historical tickets', status: 'pending', description: 'Analyze past 90 days of support data' },
      { step: 'Connect NPS survey tool', status: 'pending', description: 'Link survey platform for sentiment analysis' },
      { step: 'Configure alert thresholds', status: 'pending', description: 'Set up notifications for issue spikes' }
    ],
    potentialInsights: [
      { insight: 'Product Quality Issues', description: 'Identify SKUs with high return/complaint rates' },
      { insight: 'Shipping & Delivery Problems', description: 'Track carrier performance through customer feedback' },
      { insight: 'Website & UX Issues', description: 'Surface checkout, search, and navigation problems' },
      { insight: 'Customer Satisfaction Trends', description: 'Monitor NPS trends by product category and time' }
    ],
    integrations: [
      { name: 'Zendesk', status: 'Available', setup: 'Connect API' },
      { name: 'Intercom', status: 'Available', setup: 'Connect API' },
      { name: 'Freshdesk', status: 'Available', setup: 'Connect API' },
      { name: 'Typeform NPS', status: 'Available', setup: 'Connect webhook' },
      { name: 'SurveyMonkey', status: 'Available', setup: 'Connect API' }
    ],
    schedule: [
      { frequency: 'Daily', time: '10:00', task: 'Process new support tickets' },
      { frequency: 'Weekly', time: 'Thu 15:00', task: 'Generate CX insights report' },
      { frequency: 'Monthly', time: '5th 14:00', task: 'NPS trend analysis' }
    ],
    activity: [
      'Setup required - No activity yet',
      'Connect your helpdesk to start analyzing support data',
      'Link NPS surveys to track customer satisfaction',
      'Configure integrations to begin insights generation'
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
              <h2 className="text-lg font-bold text-foreground mb-4">
                {agentId === 'customer-care' ? 'Setup Required' : 'Critical Alerts'}
              </h2>
              {agentId === 'customer-care' ? (
                <div className="space-y-3">
                  {(agent as CustomerCareAgent).setupSteps?.map((step, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                      <div className="flex items-center justify-between">
                        <strong>{step.step}</strong>
                        <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full px-2 py-1 text-xs font-medium">
                          {step.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
            </div>

{/* Dynamic Second Section based on agent type */}
            {agentId === 'inventory' && (
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
                      {(agent as InventoryAgent).restockRecommendations?.map((item, index) => (
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
            )}

            {agentId === 'promotions' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Promo Code Performance</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Code</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Redemptions</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Revenue</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">AOV</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Margin %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(agent as PromotionsAgent).promoPerformance?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm border-b font-medium">{item.code}</td>
                          <td className="px-3 py-2 text-sm border-b">{item.redemptions}</td>
                          <td className="px-3 py-2 text-sm border-b">${item.revenue.toLocaleString()}</td>
                          <td className="px-3 py-2 text-sm border-b">${item.aov}</td>
                          <td className="px-3 py-2 text-sm border-b">{item.margin}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-foreground mb-2">Recommendations</h3>
                  <div className="space-y-2">
                    {(agent as PromotionsAgent).recommendations?.map((rec, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <strong>{rec.action}</strong>
                            <p className="text-sm text-muted-foreground">{rec.impact}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${rec.confidence === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {rec.confidence}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {agentId === 'pricing' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Price Recommendations</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">SKU</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Current</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Suggested</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Impact</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Elasticity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(agent as PricingAgent).priceRecommendations?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm border-b font-medium">{item.sku}</td>
                          <td className="px-3 py-2 text-sm border-b">${item.currentPrice}</td>
                          <td className="px-3 py-2 text-sm border-b"><strong>${item.suggestedPrice}</strong></td>
                          <td className="px-3 py-2 text-sm border-b text-green-600">{item.impact}</td>
                          <td className="px-3 py-2 text-sm border-b">{item.elasticity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-foreground mb-2">Bundle Opportunities</h3>
                  <div className="space-y-2">
                    {(agent as PricingAgent).bundleOpportunities?.map((bundle, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                        <div className="flex justify-between items-center">
                          <div>
                            <strong>{bundle.products}</strong>
                            <p className="text-sm text-muted-foreground">Bundle: ${bundle.bundlePrice} (Individual: ${bundle.individualSum})</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
                            {bundle.uplift} uplift
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {agentId === 'fulfillment' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Order Tracking</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Order #</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Status</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Carrier</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Days Late</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Customer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(agent as FulfillmentAgent).orderTracking?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm border-b font-medium">{item.orderNum}</td>
                          <td className="px-3 py-2 text-sm border-b">
                            <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'Delayed' ? 'bg-red-100 text-red-800' : item.status === 'Address Issue' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-sm border-b">{item.carrier}</td>
                          <td className="px-3 py-2 text-sm border-b">{item.daysLate || '0'}</td>
                          <td className="px-3 py-2 text-sm border-b">{item.customer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {agentId === 'finance' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Profitability Analysis</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">SKU</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Revenue</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Cost</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Margin %</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Units</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(agent as FinanceAgent).profitabilityAnalysis?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm border-b font-medium">{item.sku}</td>
                          <td className="px-3 py-2 text-sm border-b">${item.revenue}</td>
                          <td className="px-3 py-2 text-sm border-b">${item.cost}</td>
                          <td className="px-3 py-2 text-sm border-b">
                            <span className={`font-medium ${item.margin < 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {item.margin.toFixed(1)}%
                            </span>
                          </td>
                          <td className="px-3 py-2 text-sm border-b">{item.units}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-foreground mb-2">Category Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(agent as FinanceAgent).categoryPerformance?.map((cat, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                        <h4 className="font-medium">{cat.category}</h4>
                        <p className="text-sm text-muted-foreground">Revenue: ${cat.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Margin: {cat.margin}%</p>
                        <p className="text-sm text-muted-foreground">Contribution: {cat.contribution}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {agentId === 'customer-care' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Available Integrations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(agent as CustomerCareAgent).integrations?.map((integration, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{integration.name}</h4>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                          {integration.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{integration.setup}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-foreground mb-2">Potential Insights</h3>
                  <div className="space-y-2">
                    {(agent as CustomerCareAgent).potentialInsights?.map((insight, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                        <h4 className="font-medium">{insight.insight}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Third Section - Only for Inventory Agent */}
            {agentId === 'inventory' && (
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
                      {(agent as InventoryAgent).slowMovers?.map((item, index) => (
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
            )}

            {/* Fulfillment Carrier Performance */}
            {agentId === 'fulfillment' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Carrier Performance</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Carrier</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">On Time %</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Avg Days</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Cost</th>
                        <th className="text-left text-xs font-medium text-gray-500 px-3 py-2 border-b">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(agent as FulfillmentAgent).carrierPerformance?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm border-b font-medium">{item.carrier}</td>
                          <td className="px-3 py-2 text-sm border-b">
                            <span className={`font-medium ${item.onTime >= 95 ? 'text-green-600' : item.onTime >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {item.onTime}%
                            </span>
                          </td>
                          <td className="px-3 py-2 text-sm border-b">{item.avgDays}</td>
                          <td className="px-3 py-2 text-sm border-b">{item.cost}</td>
                          <td className="px-3 py-2 text-sm border-b">{item.volume}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Charts for Inventory Agent */}
            {agentId === 'inventory' && (
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
            )}

            {/* Reorder Points for Inventory Agent */}
            {agentId === 'inventory' && (
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
                      {(agent as InventoryAgent).reorderPoints?.map((item, index) => (
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
            )}

            {/* Right column content for other agents */}
            {agentId !== 'inventory' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  {agentId === 'promotions' && 'Top Insights'}
                  {agentId === 'pricing' && 'Market Intelligence'}
                  {agentId === 'fulfillment' && 'Performance Metrics'}
                  {agentId === 'finance' && 'Key Metrics'}
                  {agentId === 'customer-care' && 'Quick Setup'}
                </h2>
                
                {agentId === 'promotions' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">SUMMER25 Success</h4>
                      <p className="text-sm text-green-700">Outperforming by 45% - consider extending</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800">Bundle Opportunity</h4>
                      <p className="text-sm text-blue-700">Create product bundles for +$2,400 revenue</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800">A/B Test Ready</h4>
                      <p className="text-sm text-yellow-700">15% vs 20% discount test recommended</p>
                    </div>
                  </div>
                )}

                {agentId === 'pricing' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">Price Opportunity</h4>
                      <p className="text-sm text-green-700">SKU-7890: 15% below market - increase by $5</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800">Elasticity Alert</h4>
                      <p className="text-sm text-blue-700">High elasticity products identified for testing</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-800">Bundle Impact</h4>
                      <p className="text-sm text-purple-700">3 bundle opportunities with 18-31% uplift</p>
                    </div>
                  </div>
                )}

                {agentId === 'fulfillment' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800">Delayed Orders</h4>
                      <p className="text-sm text-red-700">7 orders need immediate attention</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800">Carrier Performance</h4>
                      <p className="text-sm text-yellow-700">FastShip SLA down to 89% - review needed</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800">ExpressGo Leader</h4>
                      <p className="text-sm text-blue-700">98% on-time rate, 1.9 day average</p>
                    </div>
                  </div>
                )}

                {agentId === 'finance' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800">Below-Cost Alert</h4>
                      <p className="text-sm text-red-700">SKU-8822 losing $2 per unit</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">Top Performer</h4>
                      <p className="text-sm text-green-700">Electronics: 38% margin, 28% contribution</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800">Margin Watch</h4>
                      <p className="text-sm text-yellow-700">Apparel category down 3% this month</p>
                    </div>
                  </div>
                )}

                {agentId === 'customer-care' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800">Quick Start</h4>
                      <p className="text-sm text-blue-700">Connect Zendesk to begin analyzing tickets</p>
                      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">
                        Connect Now
                      </button>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">NPS Integration</h4>
                      <p className="text-sm text-green-700">Link surveys for satisfaction insights</p>
                      <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm">
                        Setup NPS
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

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
