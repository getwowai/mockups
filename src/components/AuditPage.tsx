import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, ShoppingCart, Eye, BarChart3, DollarSign } from 'lucide-react';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Data types
interface MonthlyData {
  label: string;
  revenue: number;
  orders: number;
  discount: number;
}

interface Channel {
  name: string;
  revenue: number;
  orders: number;
  spend: number;
}

interface Region {
  region: string;
  revenue: number;
  orders: number;
}

interface KPICardProps {
  label: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, trend, isPositive }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card className="p-4 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-lg font-semibold text-foreground flex items-center gap-2">
        {value}
        {trend && (
          <motion.span 
            className={`text-xs flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </motion.span>
        )}
      </div>
    </Card>
  </motion.div>
);

const InteractiveLineChart: React.FC<{ data: MonthlyData[] }> = ({ data }) => {
  const formatTooltip = (value: number, name: string) => {
    if (name === 'revenue') {
      return [`EGP ${value.toLocaleString()}`, 'Revenue'];
    }
    return [value, name];
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="label" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <Tooltip 
          formatter={formatTooltip}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="hsl(var(--primary))" 
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

const InteractiveBarChart: React.FC<{ data: any[]; xKey: string; yKey: string; color?: string }> = ({ 
  data, 
  xKey, 
  yKey, 
  color = "hsl(var(--primary))" 
}) => {
  const formatTooltip = (value: number, name: string) => {
    if (name === 'revenue') {
      return [`EGP ${value.toLocaleString()}`, 'Revenue'];
    }
    return [value, name];
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey={xKey} 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : 
                                   value >= 1000 ? `${(value / 1000).toFixed(1)}K` : 
                                   value}
        />
        <Tooltip 
          formatter={formatTooltip}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Bar 
          dataKey={yKey} 
          fill={color}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

const AuditPage: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'channels' | 'geography'>('overview');

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValues(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Demo data
  const currency = "EGP";
  const monthly24: MonthlyData[] = [
    { label: "Aug 23", revenue: 780000, orders: 350, discount: 0.16 },
    { label: "Sep 23", revenue: 810000, orders: 365, discount: 0.15 },
    { label: "Oct 23", revenue: 910000, orders: 402, discount: 0.15 },
    { label: "Nov 23", revenue: 1160000, orders: 540, discount: 0.21 },
    { label: "Dec 23", revenue: 1240000, orders: 565, discount: 0.23 },
    { label: "Jan 24", revenue: 690000, orders: 310, discount: 0.12 },
    { label: "Feb 24", revenue: 740000, orders: 330, discount: 0.12 },
    { label: "Mar 24", revenue: 890000, orders: 385, discount: 0.14 },
    { label: "Apr 24", revenue: 960000, orders: 420, discount: 0.13 },
    { label: "May 24", revenue: 990000, orders: 435, discount: 0.12 },
    { label: "Jun 24", revenue: 920000, orders: 392, discount: 0.13 },
    { label: "Jul 24", revenue: 900000, orders: 388, discount: 0.14 },
  ];

  const channels: Channel[] = [
    { name: "Paid Search", revenue: 2600000, orders: 1150, spend: 620000 },
    { name: "Paid Social", revenue: 2100000, orders: 980, spend: 520000 },
    { name: "Email", revenue: 1450000, orders: 720, spend: 70000 },
    { name: "Organic", revenue: 1850000, orders: 850, spend: 90000 },
    { name: "Referral", revenue: 850000, orders: 345, spend: 25000 },
  ];

  const regions: Region[] = [
    { region: "Cairo", revenue: 3900000, orders: 1700 },
    { region: "Giza", revenue: 1600000, orders: 720 },
    { region: "Alexandria", revenue: 1200000, orders: 520 },
    { region: "Dakahlia", revenue: 600000, orders: 270 },
    { region: "Sharqia", revenue: 480000, orders: 210 },
  ];

  // Calculations
  const totalRevenue = monthly24.reduce((sum, month) => sum + month.revenue, 0);
  const totalOrders = monthly24.reduce((sum, month) => sum + month.orders, 0);
  const avgAOV = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
  const bestMonth = monthly24.reduce((prev, current) => prev.revenue > current.revenue ? prev : current);
  const slowMonth = monthly24.reduce((prev, current) => prev.revenue < current.revenue ? prev : current);
  const avgDiscount = monthly24.reduce((sum, month) => sum + month.discount, 0) / monthly24.length;

  const formatMoney = (value: number) => `${currency} ${value.toLocaleString()}`;
  const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

  const insights = [
    { 
      title: "Sofas dominance → cross-sell opportunity", 
      body: "Bundle sofa + TV unit/ décor with room‑set content. Prioritize Email and Organic where ROAS is strong."
    },
    { 
      title: "Net margin headroom", 
      body: "Reduce Nov–Dec discount spikes with value‑add offers; negotiate shipping to cut COGS by 1–2pp."
    },
    { 
      title: "Channel mix optimization", 
      body: "Shift 10–15% budget from low‑ROAS Paid Social to Email/Organic retargeting; use suppression lists."
    },
    { 
      title: "Geography-led SLAs", 
      body: "Pilot same/next‑day delivery on top SKUs in Cairo to lift conversion and reviews."
    },
    { 
      title: "Returns prevention", 
      body: "Add AR sizing and calibrated color swatches; surface materials and care info above the fold."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-primary/10 to-primary/5 border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.h1 
            className="text-3xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vitrine Furniture — Brand Audit Report
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Expanded snapshot with profitability, customers, channels, geography, returns, and web analytics.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Executive Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Executive Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <KPICard label="Revenue (TTM)" value={formatMoney(totalRevenue)} />
              <KPICard label="Gross Margin" value="46%" trend="+2.1%" isPositive={true} />
              <KPICard label="Net Margin" value="12%" trend="-0.8%" isPositive={false} />
            </div>
            <motion.ul 
              className="space-y-2 text-sm text-muted-foreground ml-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                • Revenue grew 18% YoY with peak in {bestMonth.label}.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                • Gross margin 46%; net margin 12% after {formatMoney(1450000)} marketing.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                • Blended LTV {formatMoney(8200)} vs CAC ~ {formatMoney(350)} (LTV:CAC = 23.4). Target ≥ 3.0.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                • Conversion rate 1.7% on 890,000 sessions; bounce 52%.
              </motion.li>
            </motion.ul>
          </Card>
        </motion.div>

        {/* Core KPIs */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <KPICard label="Total Revenue (12m)" value={formatMoney(totalRevenue)} />
          <KPICard label="Total Orders (12m)" value={totalOrders.toLocaleString()} />
          <KPICard label="Avg AOV" value={formatMoney(avgAOV)} />
          <KPICard label="Best Month" value={`${bestMonth.label} • ${formatMoney(bestMonth.revenue)}`} />
          <KPICard label="Slowest Month" value={`${slowMonth.label} • ${formatMoney(slowMonth.revenue)}`} />
          <KPICard label="Avg Discount Share" value={formatPercent(avgDiscount)} />
        </motion.div>

        {/* Charts Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {/* Profitability */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Profitability
            </h2>
            <div className="space-y-3">
              <motion.div 
                className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <span className="text-muted-foreground">Revenue (TTM)</span>
                <span className="font-medium">{formatMoney(totalRevenue)}</span>
              </motion.div>
              <motion.div 
                className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-muted-foreground">COGS</span>
                <span className="font-medium">{formatMoney(Math.round(totalRevenue * 0.54))}</span>
              </motion.div>
              <motion.div 
                className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <span className="text-muted-foreground">Gross Profit</span>
                <span className="font-medium">{formatMoney(Math.round(totalRevenue * 0.46))}</span>
              </motion.div>
              <motion.div 
                className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <span className="text-muted-foreground">Gross Margin</span>
                <span className="font-medium">46%</span>
              </motion.div>
              <div className="border-t pt-2">
                <motion.div 
                  className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <span className="text-muted-foreground">Net Profit</span>
                  <span className="font-medium">{formatMoney(Math.round(totalRevenue * 0.12))}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between hover:bg-muted/30 p-2 rounded transition-colors duration-200"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <span className="text-muted-foreground">Net Margin</span>
                  <span className="font-medium">12%</span>
                </motion.div>
              </div>
            </div>
          </Card>

          {/* Growth */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Growth
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <KPICard label="YoY Revenue" value="+18%" />
              <KPICard label="YoY Orders" value="+15%" />
              <KPICard label="Last MoM Revenue" value="+8%" />
            </div>
            <div className="border border-border rounded-lg p-4 border-l-4 border-l-primary hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold mb-2">Monthly Revenue</h3>
              <InteractiveLineChart data={monthly24} />
            </div>
          </Card>
        </motion.div>

        {/* Channels & Geography */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Marketing Channels 
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">ROAS & CAC</span>
            </h2>
            <InteractiveBarChart data={channels} xKey="name" yKey="revenue" />
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">ROAS by Channel</h3>
              <div className="space-y-1 text-sm">
                {channels.map((channel, index) => (
                  <motion.div 
                    key={channel.name} 
                    className="flex justify-between hover:bg-muted/50 p-2 rounded transition-colors duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <span className="text-muted-foreground">{channel.name}</span>
                    <span className="font-medium">{(channel.revenue / channel.spend).toFixed(2)}x</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              Customer Geography
            </h2>
            <InteractiveBarChart data={regions} xKey="region" yKey="revenue" color="hsl(var(--muted-foreground))" />
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">Top Regions</h3>
              <div className="space-y-1 text-sm">
                {regions.map((region, index) => (
                  <motion.div 
                    key={region.region} 
                    className="flex justify-between hover:bg-muted/50 p-2 rounded transition-colors duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <span className="text-muted-foreground">{region.region}</span>
                    <span className="font-medium">{formatMoney(region.revenue)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <Card className="p-6 border-l-4 border-l-blue-400 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-400" />
              Detailed Insights & Recommendations
            </h2>
            <ol className="space-y-3">
              {insights.map((insight, index) => (
                <motion.li 
                  key={index} 
                  className="text-sm hover:bg-muted/30 p-3 rounded-lg transition-colors duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <strong className="text-foreground">{insight.title}.</strong>{' '}
                  <span className="text-muted-foreground">{insight.body}</span>
                </motion.li>
              ))}
            </ol>
          </Card>
        </motion.div>

        <div className="text-center text-xs text-muted-foreground mt-8">
          © 2025 WoW AI — Expanded audit report with interactive features
        </div>
      </div>
    </div>
  );
};

export default AuditPage;
