import React from "react";
import { User } from "../types";
import { ShoppingBag, Trophy, Menu, Home } from "lucide-react";

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

  // Removed Dashboard from navItems
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "tournaments", label: "Tournaments", icon: Trophy },
    { id: "shop", label: "Shop", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}
      >
        <div className="p-6 border-b border-slate-700 flex justify-center items-center">
          {/* SVG Logo Implementation with inline styles for React compatibility */}
          <div className="w-full max-w-[200px]">
            <img src="./logo.png" alt="" />
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:hidden sticky top-0 z-10">
          <h2 className="font-semibold text-lg capitalize">{currentView}</h2>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Menu size={24} />
          </button>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
