import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { Flame, CheckCircle, Sparkles, MessageSquare, BookOpen, Award, Star, Lock, Zap } from "lucide-react";
import { useState } from "react";

interface ProgressData {
  missions: number;
  insights: number;
  questions: number;
  quizzes: number;
  lessons: number;
  badges: number;
  streak: number;
  totalCourses?: number;
}

interface Progress {
  week: ProgressData;
  all: ProgressData & { totalCourses: number };
}

export default function UserProfile() {
  const [view, setView] = useState<"week" | "all">("week");

  const progressData: Progress = {
    week: {
      missions: 4,
      insights: 6,
      questions: 5,
      quizzes: 2,
      lessons: 1,
      badges: 1,
      streak: 4
    },
    all: {
      missions: 83,
      insights: 132,
      questions: 48,
      quizzes: 18,
      lessons: 5,
      totalCourses: 8,
      badges: 12,
      streak: 17
    }
  };

  const progress = view === "week" ? progressData.week : progressData.all;

  return (
    <div className="p-4 max-w-sm mx-auto space-y-6">
      {/* User Profile Section */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold">S</div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Sherif Makhlouf</h2>
          <p className="text-sm text-gray-600">Founder @ Worood</p>
          <p className="text-xs text-gray-500 mt-1">👥 3 Other Team Members on WoW</p>
        </div>
      </div>

      {/* Badges and Streaks */}
      <div className="flex justify-between items-center p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <div className="flex flex-col items-center text-yellow-700">
          <Zap size={24} />
          <span className="text-sm font-medium mt-1">⚡ Momentum Master</span>
        </div>
        <div className="flex flex-col items-center text-orange-600">
          <Flame size={24} />
          <span className="text-sm font-medium mt-1">🔥 {progress.streak}-day Streak</span>
        </div>
      </div>

      {/* Header with Tabs */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-indigo-700">🏆 Sherif, Here is Your Progress</h1>
        <p className="text-sm text-muted-foreground">Here's what you've achieved and what's next</p>
        <div className="flex justify-center gap-2 mt-2">
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${view === "week" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setView("week")}
          >
            This Week
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${view === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setView("all")}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-base font-semibold text-green-700">
              <CheckCircle size={18} /> Missions
            </div>
            <p className="text-sm text-green-700">
              {view === "week" ? `${progress.missions} this week` : `${progress.missions} total`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-base font-semibold text-purple-700">
              <Sparkles size={18} /> Insights Read
            </div>
            <p className="text-sm text-purple-700">
              {view === "week" ? `${progress.insights} this week` : `${progress.insights} total`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-base font-semibold text-blue-700">
              <MessageSquare size={18} /> Questions Asked
            </div>
            <p className="text-sm text-blue-700">
              {view === "week" ? `${progress.questions} this week` : `${progress.questions} total`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-base font-semibold text-orange-700">
              <BookOpen size={18} /> Courses & Lessons
            </div>
            <p className="text-sm text-orange-700">
              {view === "week" ? `${progress.lessons} lesson this week` : `${progress.lessons} of ${progressData.all.totalCourses} courses`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-base font-semibold text-red-600">
              <Flame size={18} /> Quizzes
            </div>
            <p className="text-sm text-red-600">
              {view === "week" ? `${progress.quizzes} completed this week` : `${progress.quizzes} total`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-base font-semibold text-yellow-600">
              <Award size={18} /> Badges Earned
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              <p className="text-sm">
                {view === "week" ? `+${progress.badges} this week` : `${progress.badges} earned`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What's Next Section */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardContent className="space-y-3 p-4">
          <h3 className="text-base font-semibold text-indigo-700">🧭 What's Next</h3>
          <ul className="list-disc list-inside text-sm text-indigo-800 space-y-1">
            <li>You're 2 missions away from your next badge</li>
            <li>Finish 1 more quiz to complete your March challenge</li>
            <li>Read 3 more insights to unlock "Trend Watcher" badge</li>
          </ul>
        </CardContent>
      </Card>

      {/* Next Stages with Lock Icons */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-gray-50 border-gray-300">
          <CardContent className="p-4 space-y-2 text-center">
            <Lock size={20} className="mx-auto text-gray-500" />
            <h4 className="font-semibold text-base">Unlock "Campaign Commander"</h4>
            <p className="text-xs text-muted-foreground">Complete 10 missions in one week</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-300">
          <CardContent className="p-4 space-y-2 text-center">
            <Lock size={20} className="mx-auto text-gray-500" />
            <h4 className="font-semibold text-base">Unlock "Insight Master"</h4>
            <p className="text-xs text-muted-foreground">Read 50 insights to gain this badge</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-300">
          <CardContent className="p-4 space-y-2 text-center">
            <Lock size={20} className="mx-auto text-gray-500" />
            <h4 className="font-semibold text-base">Unlock "Quiz Streak Pro"</h4>
            <p className="text-xs text-muted-foreground">Score 5 quizzes in a row</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 