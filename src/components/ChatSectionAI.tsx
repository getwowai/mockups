import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Flame, CheckCircle, Sparkles, MessageCircle, PlayCircle, Info, SendHorizonal, Medal } from "lucide-react";
import { useState } from "react";

const surprisePrompts = [
  "What's one product that drives the most repeat purchases?",
  "Which traffic source brings the highest-converting customers?",
  "Is there a discount code that's hurting profitability?",
  "What's one quick win to reduce cart abandonment?",
  "How can I increase average order value this week?"
];

const communityQuestions = [
  "What product got the most abandoned carts last month?",
  "What was the best-performing ad this quarter?",
  "Which customer segment has the highest lifetime value?"
];

export default function ChatSectionAI() {
  const [surprisePrompt, setSurprisePrompt] = useState(surprisePrompts[0]);
  const [communityPrompt, setCommunityPrompt] = useState(communityQuestions[0]);
  const [chatHistory, setChatHistory] = useState([
    "What are my top 3 returning products?",
    "Which product has the best profit margin?",
    "When do most people abandon their carts?"
  ]);
  const [input, setInput] = useState("");
  const [dailyAskComplete, setDailyAskComplete] = useState(false);
  const streakLevel = 3;
  const levels = ["Curious", "Analyst", "Strategist", "Growth Hacker"];
  const currentLevel = levels[streakLevel - 1];

  const handleSurprise = () => {
    const newPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    setInput(newPrompt);
    setSurprisePrompt(newPrompt);
  };

  const handleCommunityPrompt = () => {
    const random = communityQuestions[Math.floor(Math.random() * communityQuestions.length)];
    setInput(random);
    setCommunityPrompt(random);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setChatHistory([...chatHistory, input]);
    setInput("");
    setDailyAskComplete(true);
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white py-5 px-4 text-center">
        <h1 className="text-2xl font-bold mb-1">🤖 Ask Your WoW Assistant</h1>
        <p className="text-indigo-100 text-sm">
          Get insights, ideas, and answers based on your store data with AI-powered assistance.
        </p>
      </div>

      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-foreground">AI Chat & Learning</h2>
          <p className="text-muted-foreground">Ask questions to discover insights and grow your business</p>
        </div>

      {/* Gamified Streak Level Meter */}
      <Card>
        <CardContent className="flex justify-between items-center p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-orange-500" />
            <span>Streak: 4 Days</span>
          </div>
          <div className="flex items-center gap-2">
            <Medal size={16} className="text-yellow-500" />
            <span>Level {streakLevel}: {currentLevel}</span>
          </div>
        </CardContent>
      </Card>

      {/* Daily Ask Quest Banner */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="text-sm flex items-center gap-2">
            <Sparkles size={16} className="text-blue-500" />
            <span>{dailyAskComplete ? "✅ Daily Ask Completed! +20 XP" : "Ask one question today to earn +20 XP"}</span>
          </div>
          {!dailyAskComplete && <Button size="sm" onClick={handleSurprise}>Ask Now</Button>}
        </CardContent>
      </Card>

      {/* Top Squares Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center gap-2">
              <Info size={18} className="text-yellow-500" />
              <h2 className="font-semibold">Teach Me Something New</h2>
            </div>
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded border">
              {surprisePrompt}
            </div>
            <Button variant="secondary" onClick={handleSurprise}>
              <Sparkles size={16} className="mr-1" /> Surprise Me
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-blue-500" />
              <h2 className="font-semibold">What Other WoW Users Are Asking</h2>
            </div>
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded border">
              {communityPrompt}
            </div>
            <Button variant="secondary" onClick={handleCommunityPrompt}>
              <Sparkles size={16} className="mr-1" /> Show Another
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Previous Questions */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <h3 className="text-sm font-medium text-muted-foreground">🕘 Previous Questions</h3>
          <div className="space-y-2 text-sm">
            {chatHistory.map((question, index) => (
              <div
                key={index}
                className="p-3 rounded border bg-white cursor-pointer hover:bg-muted"
              >
                {question}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Example Prompts and Input */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Which products had the highest conversion rate?",
                "What are the top reasons customers requested support?",
                "Which day of the week do I get the most sales?"
              ].map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-xs"
                  onClick={() => handleExampleClick(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Ask a question..."
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <Button onClick={handleSend}>Ask</Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
} 