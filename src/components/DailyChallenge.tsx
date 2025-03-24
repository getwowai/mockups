import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { Sparkles, CheckCircle, XCircle, Flame, EyeOff, Gift } from "lucide-react";

interface Answer {
  label: string;
  icon: string;
}

export default function DailyChallenge() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correctAnswer = "BLACKFRIDAY";

  const answers: Answer[] = [
    { label: "SUMMER25", icon: "☀️" },
    { label: "NEWYEAR10", icon: "🎉" },
    { label: "VIP20", icon: "👑" },
    { label: "BLACKFRIDAY", icon: "🛍️" }
  ];

  const handleSelect = (answer: string) => {
    if (!submitted) {
      setSelected(answer);
      setSubmitted(true);
    }
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div className="space-y-6">
      {/* Challenge Card */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="text-xs text-purple-600 font-semibold uppercase">Category: Discounts</div>
          <h2 className="text-lg font-semibold">Which discount code generated the most revenue in 2024?</h2>
          <div className="space-y-3">
            {answers.map(({ label, icon }) => (
              <Button
                key={label}
                variant={selected === label ? "default" : "outline"}
                className={`w-full justify-start ${submitted ? (label === correctAnswer ? "border-green-500" : selected === label ? "border-red-500" : "") : ""}`}
                onClick={() => handleSelect(label)}
              >
                <span className="mr-2">{icon}</span>
                {submitted && label === correctAnswer && <CheckCircle size={16} className="mr-2 text-green-600" />}
                {submitted && selected === label && label !== correctAnswer && (
                  <XCircle size={16} className="mr-2 text-red-600" />
                )}
                {label}
              </Button>
            ))}
          </div>

          {submitted && (
            <div className="pt-4 text-sm text-muted-foreground space-y-2">
              {isCorrect ? (
                <p className="text-green-600 font-medium">✔️ Correct! BLACKFRIDAY brought in $32,000 — the top performer.</p>
              ) : (
                <p className="text-red-600 font-medium">❌ Not quite. The correct answer was BLACKFRIDAY.</p>
              )}
              <p>Pro tip: Use performance insights to plan your next seasonal discount!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tomorrow's Sneak Peek */}
      <Card>
        <CardContent className="space-y-2 p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles size={16} className="text-purple-500" />
            <span className="font-medium">🔒 Tomorrow's Challenge Sneak Peek</span>
          </div>
          <p className="italic text-sm text-muted-foreground">
            "Which product had the highest return rate in Q1?"
          </p>
          <Button variant="secondary" className="w-full flex items-center gap-2 mt-2">
            <EyeOff size={16} /> Unlock Now
          </Button>
        </CardContent>
      </Card>

      {/* Streak / XP Footer */}
      <div className="flex justify-between items-center text-sm text-muted-foreground px-1">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-orange-500" />
          <span>Challenge Streak: 3 Days</span>
        </div>
        <div className="text-purple-500 font-medium flex items-center gap-1">
          <Gift size={14} /> +20 XP
        </div>
      </div>
    </div>
  );
} 