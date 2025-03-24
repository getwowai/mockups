import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import WeeklyLesson from "./WeeklyLesson";
import DailyChallenge from "./DailyChallenge";

export default function LessonsPage() {
  const [showWeeklyLesson, setShowWeeklyLesson] = React.useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = React.useState(true);

  return (
    <div className="p-4 sm:p-6 w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">📚 Learning Center</h1>
        <p className="text-muted-foreground">Your personalized learning journey</p>
      </div>

      {/* Weekly Lesson Toggle */}
      <Card className="border border-indigo-200 w-full">
        <CardContent className="p-3 sm:p-4">
          <button
            onClick={() => setShowWeeklyLesson(!showWeeklyLesson)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg flex-shrink-0">📚</span>
              <span className="font-semibold truncate">Weekly Learning Progress</span>
            </div>
            {showWeeklyLesson ? (
              <ChevronUp size={20} className="text-indigo-600 flex-shrink-0" />
            ) : (
              <ChevronDown size={20} className="text-indigo-600 flex-shrink-0" />
            )}
          </button>
          {showWeeklyLesson && (
            <div className="mt-4 pt-4 border-t overflow-x-hidden">
              <WeeklyLesson />
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
            <div className="mt-4 pt-4 border-t overflow-x-hidden">
              <DailyChallenge />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 