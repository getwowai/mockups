import { Home, BookOpen, Target, BarChart, User, Sparkles, ChevronDown, Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Insights", icon: Sparkles, path: "/insights" },
  { name: "Agents", icon: Bot, path: "/agents" },
  { name: "Missions", icon: Target, path: "/missions" },
  { name: "Lessons", icon: BookOpen, path: "/lessons" },
  { name: "Progress", icon: BarChart, path: "/progress" },
];

export function BottomNav() {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full text-sm transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="mt-1">{item.name}</span>
              </Link>
            );
          })}
          
          {/* Profile Dropdown */}
          <div className="relative w-full h-full">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-sm transition-colors",
                location.pathname === "/profile" || location.pathname === "/partner"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <div className="flex items-center gap-1">
                <User className="h-5 w-5" />
                <ChevronDown className="h-4 w-4" />
              </div>
              <span className="mt-1">Profile</span>
            </button>
            
            {showProfileMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-background border rounded-lg shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => setShowProfileMenu(false)}
                >
                  User
                </Link>
                <Link
                  to="/partner"
                  className="block px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Partner
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 