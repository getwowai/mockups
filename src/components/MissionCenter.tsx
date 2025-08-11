import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Mission {
  text: string;
  completed: boolean;
  importance: "High" | "Medium" | "Low";
}

interface MissionCategory {
  title: string;
  icon: string;
  missions: Mission[];
}

const missionCategories: MissionCategory[] = [
  {
    title: "Sales",
    icon: "💰",
    missions: [
      { text: "Optimize sales funnel for mobile", completed: true, importance: "High" },
      { text: "Run promo campaign on bestsellers", completed: false, importance: "Medium" }
    ]
  },
  {
    title: "Products",
    icon: "📦",
    missions: [
      { text: "Add size chart to product pages", completed: true, importance: "Low" },
      { text: "Update product descriptions for SEO", completed: false, importance: "High" }
    ]
  },
  {
    title: "Customers",
    icon: "👥",
    missions: [
      { text: "Launch post-purchase survey", completed: false, importance: "Medium" },
      { text: "Create VIP customer segment", completed: true, importance: "High" }
    ]
  },
  {
    title: "Inventory",
    icon: "📊",
    missions: [
      { text: "Restock low inventory items", completed: false, importance: "High" },
      { text: "Review suppliers for Q2", completed: true, importance: "Medium" }
    ]
  }
];

const getBadgeStyle = (importance: Mission["importance"]): string => {
  switch (importance) {
    case "High":
      return "bg-red-500 text-white";
    case "Medium":
      return "bg-yellow-400 text-black";
    case "Low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export default function MissionCenter() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white py-5 px-4 text-center">
        <h1 className="text-2xl font-bold mb-1">🎯 Your Mission Center</h1>
        <p className="text-indigo-100 text-sm">
          Track all your missions by category, status, and importance to achieve your goals.
        </p>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Mission Categories</h2>
          <p className="text-muted-foreground">Organize and prioritize your action items</p>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {missionCategories.map((category, index) => (
          <Link key={index} to={`/missions/${category.title.toLowerCase()}`} className="block">
            <Card className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>{category.icon}</span> {category.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{category.missions.length} missions</span>
                </div>
                <ul className="space-y-2 text-sm">
                  {category.missions.map((mission, i) => (
                    <li
                      key={i}
                      className={`flex items-center justify-between p-2 rounded border ${mission.completed ? "bg-green-50 border-green-300" : "bg-white border-gray-200"}`}
                    >
                      <div className="flex items-center gap-2">
                        {mission.completed ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-400" />
                        )}
                        <span className={mission.completed ? "line-through text-muted-foreground" : ""}>{mission.text}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${getBadgeStyle(mission.importance)}`}>{mission.importance}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
} 