import React, { useState } from "react";
import { User } from "../types";
import {
  ShoppingBag,
  Trophy,
  Menu,
  Home,
  ShieldHalf,
  Users,
  User as UserIcon,
  Award,
  Layers,
  MessageCircle,
} from "lucide-react";
import JurilyaChat from "./JurilyaChat";

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  currentView,
  onNavigate,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showKepli, setShowKepli] = useState(false);

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      description: "Dashboard overview",
    },
    {
      id: "beybladeRankedGames",
      label: "Beyblade Games",
      icon: Trophy,
      description: "Ranked battles & stats",
    },
    {
      id: "players",
      label: "Players",
      icon: Users,
      description: "View all players",
    },
    {
      id: "tournaments",
      label: "Tournaments",
      icon: Trophy,
      description: "Upcoming & past",
    },
    {
      id: "shop",
      label: "Shop",
      icon: ShoppingBag,
      description: "Browse products",
    },
    {
      id: "specialtyAwards",
      label: "Supreme Leaderboard",
      icon: Award,
      description: "Player stats & awards",
    },
    {
      id: "pbblTeamUpdates",
      label: "PBBL Updates",
      icon: ShieldHalf,
      description: "Team news",
    },
    {
      id: "unmatchedDecks",
      label: "Unmatched Decks",
      icon: Layers,
      description: "Browse all games & decks",
    },
  ];

  return (
    <div className="min-h-screen flex font-sans text-white overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 sm:w-72 glass-sidebar text-white transform transition-all duration-300 ease-in-out overflow-y-auto
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 animate-slide-in
        `}
      >
        {/* Logo Section */}
        <div className="p-4 sm:p-8 border-b border-cyan-400/30 futuristic-grid">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-button flex items-center justify-center animate-float cyber-border animate-pulse">
              <img
                src="/logo.png"
                alt="Nexus Hub"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl"
              />
            </div>
            <div className="text-center">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Upkeep Hobbies Hub
              </h1>
              <p className="text-xs sm:text-sm text-cyan-300 mt-1 font-mono tracking-wide">
                Hobby Shop & Gaming Community
              </p>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 sm:p-6 border-b border-cyan-400/30">
          <div className="flex items-center space-x-2 sm:space-x-3 glass-button p-2 sm:p-3 rounded-xl cyber-border">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-400/50 cyber-border"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-neon-green rounded-full border-2 border-cyan-400/50 animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm sm:text-base truncate">
                {user.name}
              </p>
              <p className="text-xs sm:text-sm text-cyan-300 truncate">
                {user.email}
              </p>
            </div>
            <UserIcon
              size={14}
              className="hidden sm:block text-cyan-300 animate-pulse"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-2 flex-1 data-stream">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 sm:space-x-4 px-3 py-3 sm:px-4 sm:py-4 rounded-xl transition-all duration-200 group font-mono border-l-2 border-transparent
                ${
                  currentView === item.id
                    ? "glass-button bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border-cyan-400/50 text-white neon-text-cyan animate-pulse"
                    : "text-cyan-300 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-400/30"
                }
              `}
            >
              <div
                className={`
                p-2 rounded-lg transition-all duration-200 flex items-center justify-center cyber-border
                ${
                  currentView === item.id
                    ? "bg-gradient-to-r from-cyan-500 to-magenta-500 text-white animate-pulse"
                    : "bg-cyan-500/20 group-hover:bg-cyan-500/30 group-hover:scale-110"
                }
              `}
              >
                <item.icon size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm sm:text-base tracking-wide">
                  {item.label}
                </p>
                <p className="text-xs text-cyan-400 hidden sm:block font-mono">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-cyan-400/30 futuristic-grid">
          <div className="text-center text-xs text-cyan-400 font-mono">
            <p>© 2026 Upkeep Hobbies</p>
            <p className="mt-1">Beyblade • Unmatched • Trading Cards & More</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Mobile Header */}
        <header className="glass-card sticky top-0 z-10 m-2 sm:m-4 p-3 sm:p-4 flex items-center justify-between md:hidden animate-fade-in futuristic-grid scanning">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="glass-button p-2 rounded-lg flex items-center justify-center cyber-border neon-text-cyan"
            >
              <Menu size={18} className="sm:w-5 sm:h-5 animate-pulse" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold capitalize font-mono neon-text-cyan">
              {currentView.replace(/([A-Z])/g, " $1").trim()}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full glass-button flex items-center justify-center cyber-border">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div
          className={`${currentView === "shop" ? "" : "px-2 sm:px-4 md:px-6 lg:px-8"} max-w-full animate-fade-in`}
        >
          {children}
        </div>

        {/* Global Kepli Chat - only show on Unmatched page */}
        {currentView === "unmatchedDecks" && (
          <JurilyaChat
            isOpen={showKepli}
            onToggle={() => setShowKepli(!showKepli)}
          />
        )}
      </main>
    </div>
  );
};
