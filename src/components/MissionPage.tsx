import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, Share2, MessageCircle, Flame, Medal } from "lucide-react";
import { useParams } from 'react-router-dom';

const categoryData = {
  sales: {
    title: "Sales Mission",
    description: "Optimize your sales funnel and boost revenue",
    icon: "💰"
  },
  products: {
    title: "Product Mission",
    description: "Improve your product catalog and listings",
    icon: "📦"
  },
  customers: {
    title: "Customer Mission",
    description: "Enhance customer experience and retention",
    icon: "👥"
  },
  inventory: {
    title: "Inventory Mission",
    description: "Optimize your inventory management",
    icon: "📊"
  }
};

export default function MissionPage() {
  const { category } = useParams();
  const categoryInfo = categoryData[category as keyof typeof categoryData] || {
    title: "Mission",
    description: "Complete your daily mission",
    icon: "🎯"
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">{categoryInfo.icon} {categoryInfo.title}</h1>
        <p className="text-muted-foreground">{categoryInfo.description}</p>
      </div>

      {/* Mission Card */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">🎯 Mission: Reduce bounce rate on your top collection page</h2>
            <p className="text-sm text-muted-foreground">
              Your "New Arrivals" page has a 61% bounce rate. Let's make it more engaging.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Move bestsellers to the top of the page</li>
              <li>Add a testimonial section</li>
              <li>Compress hero image for faster load time</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center gap-2">
              <CheckCircle size={18} /> Mark as Done
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 size={18} /> Share with Team
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <MessageCircle size={18} /> Ask WoW
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Panel */}
      <Card>
        <CardContent className="space-y-3 p-6">
          <h3 className="font-medium text-lg">💬 Chat with Your AI Advisor</h3>
          <p className="text-sm text-muted-foreground">Need more context or ideas? Ask your AI assistant:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>"Why is this page's bounce rate so high?"</li>
            <li>"What else can I do to improve conversions?"</li>
            <li>"How do I update my Shopify theme layout?"</li>
          </ul>
          <div className="pt-2">
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-muted-foreground px-1">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-orange-500" />
          <span>Streak: 5 Days</span>
        </div>
        <div className="flex items-center gap-1">
          <Medal size={16} className="text-yellow-500" />
          <span>Unlocked: "3 Missions in a Row"</span>
        </div>
      </div>
    </div>
  );
} 