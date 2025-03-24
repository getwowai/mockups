import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Banknote, CreditCard, Users, BriefcaseBusiness, Lock } from "lucide-react";

interface QNBTool {
  title: string;
  status: string;
  benefit: string;
  icon: React.ReactNode;
  action: string;
}

const qnbTools: QNBTool[] = [
  {
    title: "Corporate Account",
    status: "Qualified",
    benefit: "Manage business funds with ease",
    icon: <Banknote size={20} className="text-green-600" />,
    action: "Apply Now"
  },
  {
    title: "Business Card",
    status: "Eligible",
    benefit: "Earn cashback on marketing and logistics",
    icon: <CreditCard size={20} className="text-green-600" />,
    action: "Get Card"
  },
  {
    title: "Payroll Services",
    status: "Qualified",
    benefit: "Automate salary payouts to your team",
    icon: <Users size={20} className="text-green-600" />,
    action: "Book Setup"
  },
  {
    title: "Business Loan",
    status: "Needs 3-month revenue",
    benefit: "Fuel your growth with working capital",
    icon: <BriefcaseBusiness size={20} className="text-yellow-600" />,
    action: "Track Progress"
  },
  {
    title: "FX Optimization",
    status: "Not Available",
    benefit: "Currency tools for cross-border selling",
    icon: <Lock size={20} className="text-gray-400" />,
    action: "Unavailable"
  }
];

export default function QNBTools() {
  return (
    <div className="p-4 max-w-sm mx-auto space-y-6 font-sans bg-[#f9fafb] min-h-screen">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-bold text-[#004c3f]">Powered by QNB Bank</h1>
        <p className="text-sm text-gray-600">Your store qualifies for these business tools</p>
      </div>

      <div className="space-y-4">
        {qnbTools.map((tool, index) => (
          <Card key={index} className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {tool.icon}
                  <h3 className="text-sm font-semibold text-gray-800">{tool.title}</h3>
                </div>
                <span className={`text-xs font-medium ${
                  tool.status === "Qualified"
                    ? "text-green-700"
                    : tool.status === "Eligible"
                    ? "text-blue-600"
                    : tool.status === "Needs 3-month revenue"
                    ? "text-yellow-600"
                    : "text-gray-400"
                }`}>{tool.status}</span>
              </div>
              <p className="text-xs text-gray-500">{tool.benefit}</p>
              <div className="pt-1">
                <Button
                  size="sm"
                  variant={tool.status === "Not Available" ? "ghost" : "outline"}
                  disabled={tool.status === "Not Available"}
                  className="w-full text-xs"
                >
                  {tool.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead CTA */}
      <div className="bg-[#e7f5f0] border border-[#bfe3d7] rounded-md p-4 text-center mt-6">
        <h4 className="text-sm font-semibold text-[#004c3f]">Need Help Choosing?</h4>
        <p className="text-xs text-gray-600 mb-2">Book a free financial review with a QNB advisor</p>
        <Button size="sm" className="bg-[#008060] text-white w-full">Book Call</Button>
      </div>
    </div>
  );
} 