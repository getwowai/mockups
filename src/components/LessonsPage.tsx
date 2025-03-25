import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import WeeklyLessonProgress from "./WeeklyLessonProgress";
import DailyChallenge from "./DailyChallenge";
import WeeklyLesson from "./WeeklyLesson";

export default function LessonsPage() {
  const [showWeeklyLesson, setShowWeeklyLesson] = React.useState(true);
  const [showWeeklyProgress, setShowWeeklyProgress] = React.useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = React.useState(false);

  return (
    <div className="p-4 sm:p-6 w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">📚 Learning Center</h1>
        <p className="text-muted-foreground">Your personalized learning journey</p>
      </div>

      {/* Current Weekly Lesson */}
      <Card className="border border-indigo-200 w-full">
        <CardContent className="p-3 sm:p-4">
          <button
            onClick={() => setShowWeeklyLesson(!showWeeklyLesson)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg flex-shrink-0">📘</span>
              <div className="flex flex-col">
                <span className="font-semibold truncate">This Week's Lesson</span>
                <span className="text-sm text-muted-foreground">Learn something new to grow your store</span>
              </div>
            </div>
            {showWeeklyLesson ? (
              <ChevronUp size={20} className="text-indigo-600 flex-shrink-0" />
            ) : (
              <ChevronDown size={20} className="text-indigo-600 flex-shrink-0" />
            )}
          </button>
          {showWeeklyLesson && (
            <div className="mt-4">
              <WeeklyLesson />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Progress Toggle */}
      <Card className="border border-indigo-200 w-full">
        <CardContent className="p-3 sm:p-4">
          <button
            onClick={() => setShowWeeklyProgress(!showWeeklyProgress)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg flex-shrink-0">📊</span>
              <span className="font-semibold truncate">Weekly Learning Progress</span>
            </div>
            {showWeeklyProgress ? (
              <ChevronUp size={20} className="text-indigo-600 flex-shrink-0" />
            ) : (
              <ChevronDown size={20} className="text-indigo-600 flex-shrink-0" />
            )}
          </button>
          {showWeeklyProgress && (
            <div className="mt-4">
              <WeeklyLessonProgress />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Challenge Toggle */}
      <Card className="border border-indigo-200 w-full">
        <CardContent className="p-3 sm:p-4">
          <button
            onClick={() => setShowDailyChallenge(!showDailyChallenge)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg flex-shrink-0">🎯</span>
              <span className="font-semibold truncate">Daily Challenge</span>
            </div>
            {showDailyChallenge ? (
              <ChevronUp size={20} className="text-indigo-600 flex-shrink-0" />
            ) : (
              <ChevronDown size={20} className="text-indigo-600 flex-shrink-0" />
            )}
          </button>
          {showDailyChallenge && (
            <div className="mt-4">
              <DailyChallenge />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 