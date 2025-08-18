import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  BarChart3,
  DollarSign,
  Users,
  AlertTriangle,
  PieChart,
  LineChart
} from 'lucide-react';
import { Card } from './ui/card';

interface FinancialKPI {
  label: string;
  value: string;
  subtext: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface ChurnBrand {
  name: string;
  riskLevel: 'high' | 'medium' | 'low';
  reason: string;
}

export default function FinancialDashboard() {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [animateValues, setAnimateValues] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setAnimateValues(true);
  }, []);

  const financialKPIs: FinancialKPI[] = [
    { 
      label: 'Monthly Recurring Revenue (MRR)', 
      value: '$5,014', 
      subtext: '46 brands × $109 ARPU',
      trend: { value: '+15% vs last month', isPositive: true }
    },
    { 
      label: 'Subscription Mix', 
      value: '38 Paid / 8 Freemium', 
      subtext: 'Conversion rate: 21% upgraded',
      trend: { value: '+3% conversion', isPositive: true }
    },
    { 
      label: 'Churn Rate', 
      value: '7%', 
      subtext: '3 brands at risk of churn',
      trend: { value: '-2% vs last month', isPositive: true }
    },
    { 
      label: 'Average Data Cost per Brand', 
      value: '$3.80', 
      subtext: '$175 total / month',
      trend: { value: '-5% efficiency gain', isPositive: true }
    },
    { 
      label: 'Average AI Cost per Brand', 
      value: '$5.40', 
      subtext: '$248 total / month',
      trend: { value: '+12% usage increase', isPositive: false }
    },
    { 
      label: 'Gross Profit (after costs)', 
      value: '$4,591', 
      subtext: '90% gross margin',
      trend: { value: '+18% vs last month', isPositive: true }
    },
  ];

  const churnBrands: ChurnBrand[] = [
    { name: 'Vitron', riskLevel: 'high', reason: 'Low activity & agent usage' },
    { name: 'Dermacy', riskLevel: 'medium', reason: 'Decreased query volume' },
    { name: 'Elio', riskLevel: 'medium', reason: 'Support tickets increase' },
  ];

  const revenueGrowthData = [
    { month: 'Jan', value: 3800, change: null },
    { month: 'Feb', value: 4200, change: 10.5 },
    { month: 'Mar', value: 4650, change: 10.7 },
    { month: 'Apr', value: 4850, change: 4.3 },
    { month: 'May', value: 5014, change: 3.4 },
  ];

  const costBreakdown = [
    { category: 'AI Costs', value: 248, percentage: 58.5, color: 'bg-primary' },
    { category: 'Data Costs', value: 175, percentage: 41.5, color: 'bg-blue-500' },
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg text-primary-foreground flex items-center justify-center">
              <DollarSign className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Financial Dashboard</h1>
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
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90">
              View Report
            </button>
          </div>
        </div>
      </div>

      {/* Financial KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {financialKPIs.map((kpi, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <p className={`text-2xl font-bold transition-all duration-1000 ${
                animateValues ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
              }`} style={{ transitionDelay: `${index * 100}ms` }}>
                {kpi.value}
              </p>
              <p className="text-sm text-muted-foreground">{kpi.subtext}</p>
              {kpi.trend && (
                <p className={`text-sm flex items-center gap-1 ${
                  kpi.trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend.isPositive ? 
                    <TrendingUp className="h-4 w-4" /> : 
                    <TrendingDown className="h-4 w-4" />
                  }
                  {kpi.trend.value}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Financial Trends Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Financial Trends</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Growth Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Revenue Growth</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                Last 5 months
              </div>
            </div>
            
            {/* Chart Container */}
            <div className="relative h-48 mb-4">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                <span>$5.5k</span>
                <span>$4.5k</span>
                <span>$3.5k</span>
                <span>$2.5k</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-8 h-full flex items-end justify-between gap-4">
                {revenueGrowthData.map((data, index) => {
                  const height = (data.value / 5500) * 100;
                  const prevValue = index > 0 ? revenueGrowthData[index - 1].value : data.value;
                  const isPositive = data.value > prevValue;
                  
                  return (
                    <div key={data.month} className="flex flex-col items-center gap-2 flex-1 group">
                      {/* Hover tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded mb-1">
                        <div className="font-medium">${data.value.toLocaleString()}</div>
                        {data.change && (
                          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                            {isPositive ? '↗' : '↘'} {data.change}%
                          </div>
                        )}
                      </div>
                      
                      {/* Value label */}
                      <div className="text-xs text-muted-foreground font-medium">
                        ${(data.value/1000).toFixed(1)}k
                      </div>
                      
                      {/* Bar */}
                      <div className="relative w-full max-w-12">
                        <div 
                          className="bg-primary/20 rounded-t-md w-full transition-all duration-1000 ease-out hover:bg-primary/30 cursor-pointer"
                          style={{ 
                            height: animateValues ? `${height}%` : '0%',
                            transitionDelay: `${index * 150}ms`
                          }}
                        />
                        <div 
                          className="bg-primary rounded-t-md w-full absolute bottom-0 transition-all duration-1200 ease-out"
                          style={{ 
                            height: animateValues ? `${Math.min(height, 80)}%` : '0%',
                            transitionDelay: `${index * 150 + 200}ms`
                          }}
                        />
                      </div>
                      
                      {/* Month label */}
                      <div className="text-xs font-medium text-center">{data.month}</div>
                      
                      {/* Growth indicator */}
                      {data.change && (
                        <div className={`text-xs flex items-center gap-1 ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {data.change}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Grid lines */}
              <div className="absolute inset-0 ml-8 pointer-events-none">
                {[0, 25, 50, 75, 100].map((percent) => (
                  <div 
                    key={percent}
                    className="absolute w-full border-t border-muted/30"
                    style={{ bottom: `${percent}%` }}
                  />
                ))}
              </div>
            </div>
            
            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-sm font-medium text-green-600">+32%</div>
                <div className="text-xs text-muted-foreground">Total Growth</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">$1,214</div>
                <div className="text-xs text-muted-foreground">Total Increase</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-primary">$5,014</div>
                <div className="text-xs text-muted-foreground">Current MRR</div>
              </div>
            </div>
          </Card>

          {/* Cost Breakdown */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Cost Breakdown</h3>
            </div>
            <div className="space-y-4">
              {costBreakdown.map((cost, index) => (
                <div key={cost.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{cost.category}</span>
                    <span className="text-sm font-bold">${cost.value}/month</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cost.color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: animateValues ? `${cost.percentage}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{cost.percentage.toFixed(1)}% of total costs</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Total Monthly Costs</span>
                <span>${costBreakdown.reduce((sum, cost) => sum + cost.value, 0)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Brands at Risk */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold">Brands at Risk of Churn</h3>
        </div>
        <div className="space-y-3">
          {churnBrands.map((brand, index) => (
            <div 
              key={brand.name} 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{brand.name}</div>
                  <div className="text-sm text-muted-foreground">{brand.reason}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(brand.riskLevel)}`}>
                {brand.riskLevel.toUpperCase()} RISK
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">
            <strong>Recommendation:</strong> Reach out to high-risk brands for product usage review and support
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button className="border border-border px-4 py-2 rounded-md text-sm hover:bg-muted flex items-center gap-2 transition-colors">
          <Download className="h-4 w-4" />
          Export Financial Report
        </button>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 flex items-center gap-2 transition-colors">
          <BarChart3 className="h-4 w-4" />
          Generate Forecast
        </button>
      </div>
    </div>
  );
}
