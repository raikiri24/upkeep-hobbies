import React from "react";
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
} from "lucide-react";

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

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      description: "Dashboard overview",
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
      label: "Specialty Awards",
      icon: Award,
      description: "Player stats & awards",
    },
    {
      id: "pbblTeamUpdates",
      label: "PBBL Updates",
      icon: ShieldHalf,
      description: "Team news",
    },
  ];

  return (
    <div className="min-h-screen flex font-sans text-white">
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
        fixed inset-y-0 left-0 z-30 w-64 sm:w-72 glass-sidebar text-white transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 animate-slide-in
      `}
      >
        {/* Logo Section */}
        <div className="p-4 sm:p-8 border-b border-white/10">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-button flex items-center justify-center animate-float">
              <img
                src="/logo.png"
                alt="Upkeep Hobbies"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl"
              />
            </div>
            <div className="text-center">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Upkeep Hobbies
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Beyblade League Manager
              </p>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center space-x-2 sm:space-x-3 glass-button p-2 sm:p-3 rounded-xl">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white/20"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm sm:text-base truncate">
                {user.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-300 truncate">
                {user.email}
              </p>
            </div>
            <UserIcon size={14} className="hidden sm:block text-gray-300" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 sm:space-x-4 px-3 py-3 sm:px-4 sm:py-4 rounded-xl transition-all duration-200 group
                ${
                  currentView === item.id
                    ? "glass-button bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }
              `}
            >
              <div
                className={`
                p-2 rounded-lg transition-all duration-200 flex items-center justify-center
                ${
                  currentView === item.id
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-white/10 group-hover:bg-white/20"
                }
              `}
              >
                <item.icon size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm sm:text-base">{item.label}</p>
                <p className="text-xs text-gray-400 hidden sm:block">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10">
          <div className="text-center text-xs text-gray-400">
            <p>© 2026 Upkeep Hobbies</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="glass-card sticky top-0 z-10 m-2 sm:m-4 p-3 sm:p-4 flex items-center justify-between md:hidden animate-fade-in">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="glass-button p-2 rounded-lg flex items-center justify-center"
            >
              <Menu size={18} className="sm:w-5 sm:h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold capitalize">
              {currentView.replace(/([A-Z])/g, " $1").trim()}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full glass-button flex items-center justify-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className={`${currentView === 'shop' ? '' : 'px-2 sm:px-4 md:px-6 lg:px-8'} max-w-full animate-fade-in `}>{children}</div>
      </main>
    </div>
  );
};
