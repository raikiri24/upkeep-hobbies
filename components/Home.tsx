import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { User, Product, Tournament } from "../types";
import {
  Calendar,
  ShoppingBag,
  Star,
  Megaphone,
  Clock,
  TrendingUp,
  Package,
  AlertCircle,
  ExternalLink,
  Users,
  Zap,
  Trophy,
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "urgent" | "event";
  timestamp: Date;
  author?: string;
}

interface GameSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "tournament" | "casual" | "training";
  participants?: number;
  maxParticipants?: number;
}

export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for announcements and schedule (in real app, these would come from API)
  const [announcements] = useState<Announcement[]>([
    {
      id: "1",
      title: "🎉 Shop Update",
      content:
        "New Beyblade Burst generation products now available in the shop!",
      type: "info",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      author: "Shop Manager",
    },
    {
      id: "2",
      title: "🏆 Tournament Results",
      content:
        "Congratulations to last week's tournament winners! Check out rankings.",
      type: "event",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      author: "Tournament Admin",
    },
  ]);

  // Static game schedule - Friday and Sunday tournaments
  const getStaticGameSchedule = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Find next Friday (Basagan ng Bungo)
    const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7; // 5 = Friday
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);

    // Find next Sunday (Laglagan sa Langit)
    const daysUntilSunday = (0 - today.getDay() + 7) % 7 || 7; // 0 = Sunday
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);

    return [
      {
        id: "friday-tournament",
        title: "Basagan ng Bungo",
        date: nextFriday.toISOString().split("T")[0],
        time: "5:00 PM",
        location: "Upkeep Hobbies Shop",
        type: "tournament" as const,
        participants: 12,
        maxParticipants: 16,
      },
      {
        id: "sunday-tournament",
        title: "Laglagan sa Langit",
        date: nextSunday.toISOString().split("T")[0],
        time: "5:00 PM",
        location: "Upkeep Hobbies Shop",
        type: "tournament" as const,
        participants: 15,
        maxParticipants: 20,
      },
    ];
  };

  const [gameSchedule] = useState<GameSchedule[]>(getStaticGameSchedule());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, productsData, tournamentsData] = await Promise.all([
          api.getAllUsers(),
          api.getProducts(),
          api.getTournaments(),
        ]);
        setUsers(usersData);
        setProducts(productsData);
        setTournaments(tournamentsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get new arrivals (last 10 products)
  const newArrivals = products.filter((p) => p.stock > 0).slice(0, 6);

  // Get low stock items
  const lowStockItems = products
    .filter((p) => p.stock > 0 && p.stock <= 3)
    .slice(0, 4);

  // Get upcoming games (sorted by date)
  const upcomingGames = gameSchedule
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="h-full w-full bg-black relative overflow-hidden flex items-center justify-center futuristic-grid">
        <div className="text-center">
          <div className="cyber-loader mx-auto mb-4"></div>
          <p className="text-cyan-400 mt-4 font-mono">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="text-center space-y-4 animate-fade-in relative">
        <div className="absolute inset-0 data-stream"></div>
        <div className="relative z-10">
          <div className="mb-4">
            <span className="inline-block glass-button px-4 py-2 text-xs neon-text-cyan font-bold tracking-widest animate-pulse">
              // UPKEEP HOBBIES HUB v2.0.24
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Welcome Home
          </h1>
          <p className="text-lg sm:text-xl text-cyan-200 max-w-3xl mx-auto font-mono tracking-wide">
            Your gateway to Beyblade battles, shop updates, and community
            events.
            <span className="block text-sm text-cyan-400 mt-2 animate-pulse">
              ▶ STATUS: ONLINE • COMMUNITY: {users.length} PLAYERS • SHOP:{" "}
              {newArrivals.length} NEW ITEMS
            </span>
          </p>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center neon-text-cyan">
            <Megaphone className="mr-3 text-neon-yellow animate-pulse" />
            Latest Announcements
          </h2>
          <div className="glass-button px-3 py-1 text-xs text-cyan-300 font-mono">
            {announcements.length} updates
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Game Schedule Section */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center neon-text-cyan">
              <Calendar className="mr-3 text-neon-cyan animate-pulse" />
              Weekly Tournaments
            </h2>
            <div className="glass-button px-3 py-1 text-xs text-cyan-300 font-mono">
              Regular Schedule
            </div>
          </div>
          <div className="space-y-4">
            {/* PBBL Season 6 Info */}
            <div className="glass-card p-6 transition-all duration-300 futuristic-grid border-2 border-magenta-400/30">
              <div className="flex items-center justify-between mb-4">
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-magenta-500 to-purple-600 text-white">
                  LEAGUE
                </div>
                <div className="px-2 py-1 glass-button bg-magenta-500/20 text-magenta-300 rounded-full text-xs font-bold">
                  SEASON 6
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Philippines BeyBlade League
              </h3>
              <p className="text-sm text-cyan-200 font-mono mb-3">
                The official professional Beyblade league in the Philippines
              </p>
              <div className="flex items-center text-xs text-cyan-300 font-mono">
                <Trophy size={14} className="mr-2 text-magenta-400" />
                Ongoing Season 6 • Professional League
              </div>
            </div>

            {upcomingGames.map((game) => (
              <GameScheduleCard key={game.id} game={game} />
            ))}
          </div>
        </div>

        {/* New Shop Stock Section */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center neon-text-cyan">
              <ShoppingBag className="mr-3 text-neon-magenta animate-pulse" />
              New Shop Arrivals
            </h2>
            <div className="glass-button px-3 py-1 text-xs text-cyan-300 font-mono">
              {newArrivals.length} new items
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        <StatCard
          title="Active Players"
          value={users.length.toString()}
          icon={Users}
          color="cyan"
          change="+12%"
          changeType="positive"
        />
        <StatCard
          title="Tournaments"
          value={tournaments.length.toString()}
          icon={Trophy}
          color="magenta"
          change="+2"
          changeType="positive"
        />
        <StatCard
          title="Shop Items"
          value={products.filter((p) => p.stock > 0).length.toString()}
          icon={Package}
          color="green"
          change="+8"
          changeType="positive"
        />
        <StatCard
          title="Low Stock Alert"
          value={lowStockItems.length.toString()}
          icon={AlertCircle}
          color="red"
          change={lowStockItems.length > 0 ? "-3" : "0"}
          changeType={lowStockItems.length > 0 ? "negative" : "neutral"}
        />
      </div>
    </div>
  );
};

// Helper Components
// Helper Components
const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

const AnnouncementCard: React.FC<{ announcement: Announcement }> = ({
  announcement,
}) => {
  const typeStyles = {
    urgent: "from-red-500 to-pink-600 text-white border-red-400/50",
    info: "from-blue-500 to-cyan-600 text-white border-blue-400/50",
    event: "from-purple-500 to-magenta-600 text-white border-purple-400/50",
  };

  const handleCardClick = () => {
    if (announcement.title.includes("Tournament Results")) {
      window.location.href = "/beyblade-ranked-games";
    } else if (announcement.title.includes("Shop Update")) {
      window.location.href = "/shop";
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer futuristic-grid"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${typeStyles[announcement.type]}`}
        >
          {announcement.type.toUpperCase()}
        </div>
        <span className="text-xs text-cyan-400 font-mono">
          {formatTimestamp(announcement.timestamp)}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
        {announcement.title}
      </h3>
      <p className="text-sm text-cyan-200 font-mono">{announcement.content}</p>
      {announcement.author && (
        <p className="text-xs text-cyan-400 mt-3 font-mono">
          — {announcement.author}
        </p>
      )}
    </div>
  );
};

const GameScheduleCard: React.FC<{ game: GameSchedule }> = ({ game }) => {
  const gameDate = new Date(game.date);
  const isToday = gameDate.toDateString() === new Date().toDateString();
  const isFriday = game.title === "Basagan ng Bungo";
  const isSunday = game.title === "Laglagan sa Langit";

  const getDayLabel = () => {
    if (isFriday) return "FRIDAY";
    if (isSunday) return "SUNDAY";
    return gameDate
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();
  };

  return (
    <div
      className={`glass-card p-6 transition-all duration-300 hover:scale-105 futuristic-grid ${
        isToday ? "border-2 border-cyan-400/50" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          {getDayLabel()}
        </div>
        {isToday && (
          <div className="px-2 py-1 glass-button bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-bold animate-pulse">
            TODAY
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 neon-text-cyan">
        {game.title}
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-cyan-200 font-mono">
          <Calendar size={14} className="mr-2 text-cyan-400" />
          {gameDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="flex items-center text-cyan-200 font-mono">
          <Clock size={14} className="mr-2 text-cyan-400" />
          {game.time}
        </div>
        <div className="flex items-center text-cyan-200 font-mono">
          <ExternalLink size={14} className="mr-2 text-cyan-400" />
          {game.location}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-cyan-400/30">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-cyan-300 font-mono">Slots Available</span>
          <span className="text-white font-bold">
            {game.participants !== undefined &&
            game.maxParticipants !== undefined
              ? `${game.maxParticipants - game.participants}/${game.maxParticipants}`
              : "Available"}
          </span>
        </div>
        <p className="text-xs text-cyan-400 font-mono italic">
          {isFriday && "Intense burst-finish tournament"}
          {isSunday && "High-stakes knockout competition"}
        </p>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const isLowStock = product.stock <= 3;

  return (
    <div className="glass-card p-4 transition-all duration-300 hover:scale-105 cursor-pointer futuristic-grid">
      <div className="relative">
        {isLowStock && (
          <div className="absolute -top-2 -right-2 z-20">
            <div className="glass-button bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse border border-red-400/50">
              LOW
            </div>
          </div>
        )}
        <div className="h-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
          <Package className="text-cyan-400/60" size={32} />
        </div>
        <h4 className="text-sm font-bold text-white mb-1 truncate">
          {product.name}
        </h4>
        <p className="text-xs text-cyan-300 font-mono mb-2">
          ₱{product.price.toLocaleString()}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold ${
              isLowStock ? "text-red-400" : "text-green-400"
            }`}
          >
            {product.stock} left
          </span>
          <span className="text-xs text-cyan-400 font-mono">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
  color: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
  changeType,
}) => {
  const colorStyles = {
    cyan: "from-cyan-500 to-blue-600 text-neon-cyan",
    magenta: "from-magenta-500 to-red-600 text-neon-magenta",
    green: "from-green-500 to-emerald-600 text-neon-green",
    red: "from-red-500 to-pink-600 text-neon-red",
  };

  const changeColors = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-gray-400",
  };

  return (
    <div className="glass-card p-6 transition-all duration-300 hover:scale-105 futuristic-grid">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl glass-button bg-gradient-to-r ${colorStyles[color as keyof typeof colorStyles]} cyber-border`}
        >
          <Icon size={20} className="text-white animate-pulse" />
        </div>
        <div
          className={`text-sm font-bold ${changeColors[changeType]} font-mono flex items-center`}
        >
          <TrendingUp size={12} className="mr-1" />
          {change}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white font-mono">{value}</p>
        <p className="text-sm text-cyan-300 font-mono">{title}</p>
      </div>
    </div>
  );
};
