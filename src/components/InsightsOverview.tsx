import { Card, CardContent } from "./ui/card";
import { Bell, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Benchmarking from "./Benchmarking";

interface InsightCategory {
  title: string;
  badge: string;
  icon: string;
  seen: boolean;
  highlights: string[];
}

const insightCategories: InsightCategory[] = [
  {
    title: "Sales",
    badge: "3 New",
    icon: "💰",
    seen: false,
    highlights: ["Top sales day this month", "Most refunded product"]
  },
  {
    title: "Products",
    badge: "Updated",
    icon: "📦",
    seen: true,
    highlights: ["Highest viewed product", "Variant with low conversion"]
  },
  {
    title: "Customers",
    badge: "🔥 Trending",
    icon: "👥",
    seen: false,
    highlights: ["Repeat customer surge", "Churn signals"]
  },
  {
    title: "Discounts",
    badge: "New Insight",
    icon: "🏷️",
    seen: false,
    highlights: ["Best performing code", "Low ROI offer"]
  },
  {
    title: "Inventory",
    badge: "Seen",
    icon: "📊",
    seen: true,
    highlights: ["Overstock alert", "Stockout risk"]
  }
];

export default function InsightsOverview() {
  const [showBenchmarking, setShowBenchmarking] = useState(false);

  return (
    <div className="p-4 max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold">📊 Your Insights</h1>
        <p className="text-sm text-muted-foreground">Explore AI insights by category</p>
      </div>

      {/* Benchmarking Toggle */}
      <Card className="border border-indigo-200">
        <CardContent className="p-4">
          <button
            onClick={() => setShowBenchmarking(!showBenchmarking)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📈</span>
              <span className="font-semibold">Store Benchmarking</span>
            </div>
            {showBenchmarking ? (
              <ChevronUp size={20} className="text-indigo-600" />
            ) : (
              <ChevronDown size={20} className="text-indigo-600" />
            )}
          </button>
          {showBenchmarking && (
            <div className="mt-4 pt-4 border-t">
              <Benchmarking />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights Categories */}
      <div className="grid grid-cols-1 gap-4">
        {insightCategories.map((category, index) => (
          <Link key={index} to={`/insights/${category.title.toLowerCase()}`} className="block">
            <Card className={`border ${!category.seen ? "border-indigo-500" : "border-gray-200"} hover:shadow-md transition-shadow`}>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <span>{category.icon}</span> {category.title}
                  </h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${!category.seen ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                    {category.badge}
                  </span>
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {category.highlights.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                {!category.seen && (
                  <div className="flex items-center text-xs text-indigo-600 mt-2 gap-1">
                    <Bell size={14} /> Unread insights available
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 