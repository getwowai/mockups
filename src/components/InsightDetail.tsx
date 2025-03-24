import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles, SendHorizonal, Flame, BadgeCheck, MessageCircle, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";

const data = [
  { name: "Week 1", returns: 4 },
  { name: "Week 2", returns: 6 },
  { name: "Week 3", returns: 5 },
  { name: "Week 4", returns: 8 },
];

export default function InsightDetail() {
  const { category } = useParams();
  const [showMission, setShowMission] = React.useState(false);
  const [input, setInput] = React.useState("");

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Insight";

  return (
    <Card className="max-w-xl mx-auto p-4 space-y-5">
      <CardContent className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ChevronLeft size={14} /> Yesterday's Insight
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            Previous Insights <ChevronRight size={14} />
          </Button>
        </div>

        {/* Gamified Header */}
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Flame size={14} className="text-orange-500" />
            Streak: <strong className="text-gray-800 ml-1">5 days</strong>
          </div>
          <div className="flex items-center gap-1">
            <BadgeCheck size={14} className="text-green-600" />
            Badge: <strong className="text-gray-800 ml-1">Insight Explorer</strong>
          </div>
        </div>

        {/* Insight Category */}
        <span className="text-xs uppercase tracking-wide text-green-600 font-medium">{categoryTitle}</span>

        <h2 className="text-xl font-semibold">📦 High Return Rate Detected</h2>
        <p className="text-sm text-muted-foreground">
          8% of orders were returned last week — higher than your monthly average. Most returns came from Product X.
        </p>
        <p className="text-sm text-muted-foreground">
          The return rate has been trending upward for the past 3 weeks. Customer comments suggest sizing and expectations may be the root cause.
        </p>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="returns" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowMission(true)}>
          ✨ How Can I Use This Insight?
        </Button>

        {showMission && (
          <div className="space-y-3 bg-muted p-4 rounded-md">
            <h3 className="font-semibold text-base">🎯 Suggested Mission: Reduce Product X Returns</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Review customer feedback on Product X</li>
              <li>Update product images and size chart</li>
              <li>Adjust product description clarity</li>
            </ul>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="default">Mark as Done</Button>
              <Button size="sm" variant="outline">Share with Team</Button>
            </div>
          </div>
        )}

        {/* AI Assistant Section */}
        <div className="space-y-1 pt-4">
          <p className="text-sm font-medium">💬 Need help? Ask the AI Assistant</p>
          <div className="flex gap-2 flex-wrap text-xs">
            {["Why are returns increasing?", "Show me feedback on Product X", "How do I lower returns?"]
              .map((prompt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="text-xs"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </Button>
              ))}
          </div>
          <div className="flex mt-2 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 border rounded text-sm"
            />
            <Button size="sm">
              <SendHorizonal size={14} className="mr-1" /> Ask
            </Button>
          </div>
        </div>

        {/* Tomorrow's Teaser */}
        <div className="mt-6 text-sm text-gray-500 border-t pt-3">
          🔒 <span className="font-medium">Tomorrow's Teaser:</span> Your top converting product this month has a surprise trend...
        </div>

        {/* Unlock Tomorrow's Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-center mt-4">
          <Lock size={18} className="mx-auto mb-2 text-blue-500" />
          <h4 className="text-sm font-medium text-blue-800">Unlock Tomorrow's Insights</h4>
          <p className="text-xs text-blue-700 mt-1">Get early access to tomorrow's trend analysis and recommended actions.</p>
          <Button variant="outline" size="sm" className="mt-2">🔓 Unlock Now</Button>
        </div>
      </CardContent>
    </Card>
  );
} 