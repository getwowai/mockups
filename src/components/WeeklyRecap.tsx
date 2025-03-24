import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { Flame, Trophy, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import Benchmarking from "./Benchmarking";

export default function WeeklyRecap() {
  const [showBenchmarking, setShowBenchmarking] = React.useState(false);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">📬 Weekly Recap</h1>
        <p className="text-muted-foreground">Here's how your team performed this week</p>
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

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">✅ Missions Completed: <span className="text-primary">5</span></h2>
          <p className="text-sm text-muted-foreground">You completed 5 daily missions this week. Great job staying consistent!</p>

          <div className="flex gap-4 items-center text-sm text-muted-foreground">
            <Flame size={16} className="text-orange-500" />
            <span><strong>Team Streak:</strong> 5 Days 🔥</span>
          </div>

          <div className="space-y-1">
            <h3 className="font-medium">🏅 Achievements Unlocked</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>"3-Day Team Streak"</li>
              <li>"First Delegation"</li>
              <li>"Bounce Rate Fixer"</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">📊 Store Improvements</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Bounce rate on collection page improved by 7%</li>
              <li>Refund rate dropped by 12%</li>
              <li>Inventory restocked on top 3 bestsellers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">🗂️ Mission Details</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Monday:</strong> Improve collection page layout (Bounce rate reduced by 7%)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Tuesday:</strong> Investigate refunds (Discovered sizing issues, updated chart)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Wednesday:</strong> Restock bestsellers (3 SKUs reordered)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Thursday:</strong> Update email flows to clarify return policy</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Friday:</strong> Add product reviews to top-seller for credibility</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h3 className="font-semibold text-lg">🔮 Next Week's Focus</h3>
          <p className="text-sm text-muted-foreground">You had 28 abandoned carts this week. Let's work on optimizing your checkout experience.</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy size={16} className="text-yellow-500" />
            Goal: Reduce cart abandonment by 20%
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 