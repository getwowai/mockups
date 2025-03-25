import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { BookOpen, CheckCircle, Star, Target, Award } from "lucide-react";

export default function WeeklyLessonProgress() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">✅ Lessons Completed: <span className="text-primary">3</span></h2>
          <p className="text-sm text-muted-foreground">You completed 3 lessons this week. Keep up the great work!</p>

          <div className="flex gap-4 items-center text-sm text-muted-foreground">
            <Star size={16} className="text-yellow-500" />
            <span><strong>Learning Streak:</strong> 5 Days ⭐</span>
          </div>

          <div className="space-y-1">
            <h3 className="font-medium">🏅 Learning Achievements</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>"First Lesson Completed"</li>
              <li>"3-Day Learning Streak"</li>
              <li>"Perfect Quiz Score"</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">📊 Course Progress</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>E-commerce Fundamentals: 75% complete</li>
              <li>Marketing Strategies: 45% complete</li>
              <li>Customer Service: 90% complete</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">🗂️ Daily Learning Details</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Monday:</strong> Completed "Customer Service Basics" lesson</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Tuesday:</strong> Finished "Marketing Fundamentals" quiz</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Wednesday:</strong> Completed "E-commerce Strategy" module</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Thursday:</strong> Passed "Customer Retention" assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span><strong>Friday:</strong> Completed "Advanced Marketing" lesson</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Next Up Section */}
      <Card>
        <CardContent className="space-y-3 p-6">
          <h3 className="font-medium text-lg">🎯 What's Next</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Complete the "E-commerce Fundamentals" course</li>
            <li>Take the final assessment for "Marketing Strategies"</li>
            <li>Start the new "Advanced Analytics" course</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 