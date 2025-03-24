import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { BarChart3, TrendingUp, ShieldCheck, AlertTriangle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

interface Benchmark {
  category: string;
  store: string;
  industry: string;
  status: string;
  color: string;
  tag: string;
}

const benchmarks: Benchmark[] = [
  {
    category: "Revenue",
    store: "$12.4K",
    industry: "$10.2K",
    status: "Outperforming",
    color: "text-green-700",
    tag: "Top 25%"
  },
  {
    category: "Return Rate",
    store: "3.8%",
    industry: "5.6%",
    status: "Well Done",
    color: "text-green-600",
    tag: "Better than Avg"
  },
  {
    category: "Customer Retention",
    store: "24%",
    industry: "36%",
    status: "Needs Attention",
    color: "text-yellow-600",
    tag: "Below Avg"
  },
  {
    category: "Fulfillment Speed",
    store: "2.4 days",
    industry: "1.9 days",
    status: "Lacking",
    color: "text-red-600",
    tag: "Slow"
  }
];

export default function Benchmarking() {
  return (
    <div className="p-4 max-w-sm mx-auto space-y-6 font-sans bg-[#f3f6fc] min-h-screen">
      {/* Header */}
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold text-[#004c3f]">📊 Benchmarking</h1>
        <p className="text-sm text-gray-600">Compared to Apparel – MENA region</p>
        <div className="text-xs text-[#008060]">🏅 You're in the Top 25% of stores</div>
        <div className="mt-2">
          <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Badge: Outperformer</span>
        </div>
      </div>

      {/* Benchmark Cards */}
      <div className="space-y-4">
        {benchmarks.map((item, index) => (
          <Card key={index} className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm text-gray-700">{item.category}</h3>
                <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
              </div>
              <div className="text-sm text-gray-500">Your Store: <strong className="text-gray-800">{item.store}</strong></div>
              <div className="text-sm text-gray-500">Industry Avg: <strong className="text-gray-800">{item.industry}</strong></div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 ${item.color}`}>{item.tag}</span>
                <Link to="/missions">
                  <Button size="sm" variant="outline" className="text-xs">Improve</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress & Challenge */}
      <div className="mt-4 bg-[#e7f5f0] border border-[#c7e7dd] rounded-md p-4 space-y-2 text-center">
        <Trophy className="mx-auto text-[#008060]" size={20} />
        <h4 className="text-sm font-semibold text-[#004c3f]">Benchmark Challenge</h4>
        <p className="text-xs text-gray-600">Improve 2 more KPIs this week to earn the "Trendsetter" badge</p>
        <Button size="sm" className="mt-2 bg-[#008060] text-white w-full">View Improvement Missions</Button>
      </div>
    </div>
  );
} 