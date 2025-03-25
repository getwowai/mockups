import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Flame, Sparkles, PlayCircle, CheckCircle, Info } from "lucide-react";
import { useState } from "react";

export default function WeeklyLesson() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="bg-white border-indigo-200">
        <CardContent className="space-y-4 p-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-purple-600 font-semibold uppercase">Category: Offers</span>
            <span className="text-blue-600">🎧 4 min listen</span>
          </div>

          <h2 className="text-lg font-semibold text-blue-900">How to Create a Winning Black Friday Offer</h2>

          <p className="text-sm text-blue-800">
            Black Friday is a golden opportunity to grow revenue and attract new customers. The best offers are simple, time-limited, and highlight your bestsellers.
            Bundle products, offer site-wide discounts, or provide exclusive early access to your loyal customers.
          </p>

          <div className="text-sm flex items-start gap-2 bg-indigo-50 p-3 rounded border border-indigo-100">
            <Info size={16} className="mt-0.5 text-indigo-500" />
            <span>
              <strong className="text-indigo-700">Store Insight:</strong> Last year, your 30% off site-wide offer generated 42% of November's total revenue.
            </span>
          </div>

          <Button variant="outline" className="flex items-center gap-2 border-indigo-300 text-indigo-700">
            <PlayCircle size={18} /> Listen to Audio
          </Button>

          {!completed ? (
            <Button
              className="w-full flex items-center justify-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setCompleted(true)}
            >
              <CheckCircle size={18} /> Mark as Complete
            </Button>
          ) : (
            <div className="mt-4 text-green-600 text-sm flex items-center gap-2">
              <CheckCircle size={16} /> Lesson marked as complete — +30 XP earned!
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center text-sm text-gray-700 px-1">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-orange-500" />
          <span>🔥 Learning Streak: <strong>2 Weeks</strong></span>
        </div>
        <div className="text-purple-600 font-medium flex items-center gap-1">
          <Sparkles size={14} /> +30 XP
        </div>
      </div>
    </div>
  );
} 