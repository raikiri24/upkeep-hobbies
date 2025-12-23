import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types";
import { LoadingScreen } from "./LoadingScreen";
import {
  Trophy,
  Medal,
  Star,
  Crown,
  Zap,
  RotateCw,
  ArrowRightFromLine,
  Flame,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react";

export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedStat, setSelectedStat] = useState<{
    title: string;
    players: User[];
    icon: any;
    color: "red" | "blue" | "green" | "purple";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getAllUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen message="Loading community stats..." size="large" />;
  }

  const getTopStatPlayers = (stat: keyof User["beybladeStats"]) => {
    return users
      .filter((user) => user.beybladeStats && user.beybladeStats[stat] > 0)
      .sort(
        (a, b) =>
          (b.beybladeStats?.[stat] || 0) - (a.beybladeStats?.[stat] || 0)
      );
  };

  const topSpin = getTopStatPlayers("spinFinishes");
  const topBurst = getTopStatPlayers("burstFinishes");
  const topOver = getTopStatPlayers("overFinishes");
  const topExtreme = getTopStatPlayers("extremeFinishes");

  const topPlayers = users
    .filter((user) => user.weeklyScore > 0)
    .sort((a, b) => b.weeklyScore - a.weeklyScore)
    .slice(0, 5);

  const champion = topPlayers[0];

  return (
    <div className="space-y-12 pb-12 relative">
      {/* Header Section */}
      <div className="text-center space-y-3 sm:space-y-4 animate-fade-in">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Upkeep Hobbies
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Community Stats
        </h2>
        <p className="text-base sm:text-lg text-blue-200 max-w-3xl mx-auto">
          Honoring the stadium's top performers, representing the peak of
          excellence in the Upkeep community.
        </p>
      </div>

      {/* Hero: Player of the Week */}
      {champion && (
        <div className="glass-card p-8 md:p-12 animate-scale-in relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 rounded-full blur-[100px]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 text-yellow-400 animate-bounce drop-shadow-[0_0_20px_rgba(250,204,21,0.6)] flex items-center justify-center">
                <Crown size={48} fill="currentColor" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <img
                src={champion.avatar}
                alt={champion.name}
                className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white/30 shadow-2xl object-cover"
              />
              <div className="absolute -bottom-3 lg:-bottom-4 left-1/2 transform -translate-x-1/2 glass-button px-4 py-1 lg:px-6 lg:py-2 rounded-full shadow-lg tracking-wider uppercase whitespace-nowrap border-blue-400/50 text-xs sm:text-sm">
                #1 Champion
              </div>
            </div>

            <div className="text-center lg:text-left space-y-3 lg:space-y-4">
              <div className="inline-flex items-center space-x-2 glass-button px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-semibold text-white border-blue-400/50">
                <Star
                  size={14}
                  className="text-yellow-400 flex-shrink-0"
                  fill="currentColor"
                />
                <span className="tracking-wide">PLAYER OF THE WEEK</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white">
                  {champion.name}
                </h3>
                <p className="text-blue-200 text-base sm:text-xl lg:text-xl mt-2 font-light">
                  Dominating with{" "}
                  <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {champion.weeklyScore}
                  </span>{" "}
                  points
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Leaderboard */}
      <div className="glass-card overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-blue-400/30">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <Trophy className="mr-3 text-yellow-400" />
            Top 5 Players
          </h3>
        </div>

        <div className="divide-y divide-white/10">
          {topPlayers.map((player, index) => (
            <div
              key={player.id}
              className="group flex items-center p-4 sm:p-6 hover:bg-blue-500/10 transition-all duration-300"
            >
              <div
                className={`
                flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full font-black text-lg mr-6 shadow-lg
                ${
                  index === 0
                    ? "glass-button bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                    : index === 1
                    ? "glass-button bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                    : index === 2
                    ? "glass-button bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "glass-button text-gray-300"
                }
              `}
              >
                {index + 1}
              </div>

              <img
                src={player.avatar}
                alt={player.name}
                className="w-14 h-14 rounded-full object-cover mr-4 border-3 border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-300"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-lg truncate group-hover:text-cyan-300 transition-colors">
                  {player.name}
                </h4>
                <div className="flex items-center space-x-4 text-xs text-blue-200 mt-1">
                  <span className="flex items-center glass-button px-2 py-1 rounded-lg">
                    <Zap
                      size={12}
                      className="mr-1 text-yellow-400 flex-shrink-0"
                    />{" "}
                    {player.beybladeStats?.burstFinishes} Bursts
                  </span>
                  <span className="flex items-center glass-button px-2 py-1 rounded-lg">
                    <RotateCw
                      size={12}
                      className="mr-1 text-cyan-400 flex-shrink-0"
                    />{" "}
                    {player.beybladeStats?.spinFinishes} Spins
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="block font-black text-3xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight flex-shrink-0">
                  {player.weeklyScore}
                </span>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Points
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialty Awards Grid */}
      <div className="animate-fade-in">
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Medal className="mr-3 text-yellow-400" />
          Specialty Awards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Burst King"
            players={topBurst}
            value={topBurst[0]?.beybladeStats?.burstFinishes}
            icon={Zap}
            color="red"
            description="Most Explosive Finishes"
            onClick={() =>
              setSelectedStat({
                title: "Burst King",
                players: topBurst,
                icon: Zap,
                color: "red",
              })
            }
          />
          <StatCard
            title="Spin Master"
            players={topSpin}
            value={topSpin[0]?.beybladeStats?.spinFinishes}
            icon={RotateCw}
            color="blue"
            description="Spin longevity"
            onClick={() =>
              setSelectedStat({
                title: "Spin Master",
                players: topSpin,
                icon: RotateCw,
                color: "blue",
              })
            }
          />
          <StatCard
            title="Ring-Out Pro"
            players={topOver}
            value={topOver[0]?.beybladeStats?.overFinishes}
            icon={ArrowRightFromLine}
            color="green"
            description="Stadium Outs"
            onClick={() =>
              setSelectedStat({
                title: "Ring-Out Pro",
                players: topOver,
                icon: ArrowRightFromLine,
                color: "green",
              })
            }
          />
          <StatCard
            title="Extreme Finisher"
            players={topExtreme}
            value={topExtreme[0]?.beybladeStats?.extremeFinishes}
            icon={Flame}
            color="purple"
            description="High Impact Knockouts"
            onClick={() =>
              setSelectedStat({
                title: "Extreme Finisher",
                players: topExtreme,
                icon: Flame,
                color: "purple",
              })
            }
          />
        </div>
      </div>

      {/* Shop Section */}
      <div className="animate-fade-in">
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
          <ExternalLink className="mr-3 text-cyan-400" />
          Shop Pages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ShopCard
            title="Facebook Shop"
            description="Browse our collection on Facebook"
            icon={Facebook}
            color="blue"
            url="https://www.facebook.com/profile.php?id=100083603391159"
          />
          <ShopCard
            title="Instagram"
            description="Coming soon - Follow us for updates"
            icon={Instagram}
            color="purple"
            url="#"
            disabled
          />
          <ShopCard
            title="Twitter/X"
            description="Coming soon - Latest news and drops"
            icon={Twitter}
            color="cyan"
            url="#"
            disabled
          />
          <ShopCard
            title="YouTube"
            description="Coming soon - Product reviews and tutorials"
            icon={Youtube}
            color="red"
            url="#"
            disabled
          />
        </div>
      </div>

      {/* Specialty Modal */}
      {selectedStat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedStat(null)}
          />
          <div className="relative glass-modal w-full max-w-md overflow-hidden transform transition-all animate-scale-in">
            {/* Modal Header */}
            <div
              className={`p-6 text-white bg-gradient-to-r ${
                selectedStat.color === "red"
                  ? "from-red-500 to-rose-600"
                  : selectedStat.color === "blue"
                  ? "from-blue-500 to-cyan-600"
                  : selectedStat.color === "green"
                  ? "from-green-500 to-emerald-600"
                  : "from-purple-500 to-fuchsia-600"
              }`}
            >
              <button
                onClick={() => setSelectedStat(null)}
                className="absolute top-4 right-4 p-2 glass-button hover:bg-white/30 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
              <div className="flex items-center space-x-3 mb-1">
                <div className="p-3 glass-button">
                  <selectedStat.icon size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-wide">
                  {selectedStat.title}
                </h3>
              </div>
              <p className="text-white/80 text-sm font-medium">
                Top Performers
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-0 max-h-[60vh] overflow-y-auto">
              <div className="divide-y divide-blue-400/20">
                {selectedStat.players.map((player, index) => (
                  <div
                    key={player.id}
                    className="group flex items-center p-3 sm:p-4 sm:p-6 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    <div
                      className={`
                        flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-black text-base sm:text-lg mr-4 sm:mr-6 shadow-lg
                        ${
                          index === 0
                            ? "glass-button bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                            : index === 1
                            ? "glass-button bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                            : index === 2
                            ? "glass-button bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : "glass-button text-gray-300"
                        }
                      `}
                    >
                      {index + 1}
                    </div>

                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-3 sm:mr-4 border-3 border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-base sm:text-lg truncate group-hover:text-cyan-300 transition-colors">
                        {player.name}
                      </h4>
                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-blue-200 mt-1">
                        {selectedStat.title === "Burst King" && (
                          <span className="flex items-center glass-button px-1 sm:px-2 py-1 rounded-lg">
                            <Zap size={10} className="text-yellow-400 mr-1" />
                            {player.beybladeStats?.burstFinishes}
                          </span>
                        )}
                        {selectedStat.title === "Spin Master" && (
                          <span className="flex items-center glass-button px-1 sm:px-2 py-1 rounded-lg">
                            <RotateCw
                              size={10}
                              className="text-cyan-400 mr-1"
                            />
                            {player.beybladeStats?.spinFinishes}
                          </span>
                        )}
                        {selectedStat.title === "Ring-Out Pro" && (
                          <span className="flex items-center glass-button px-1 sm:px-2 py-1 rounded-lg">
                            <ArrowRightFromLine
                              size={10}
                              className="text-green-400 mr-1"
                            />
                            {player.beybladeStats?.overFinishes}
                          </span>
                        )}
                        {selectedStat.title === "Extreme Finisher" && (
                          <span className="flex items-center glass-button px-1 sm:px-2 py-1 rounded-lg">
                            <Flame size={10} className="text-purple-400 mr-1" />
                            {player.beybladeStats?.extremeFinishes}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right ml-2 sm:ml-0">
                      <span className="block font-black text-2xl sm:text-3xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight flex-shrink-0">
                        {selectedStat.title === "Burst King"
                          ? player.beybladeStats?.burstFinishes
                          : selectedStat.title === "Spin Master"
                          ? player.beybladeStats?.spinFinishes
                          : selectedStat.title === "Ring-Out Pro"
                          ? player.beybladeStats?.overFinishes
                          : player.beybladeStats?.extremeFinishes}
                      </span>
                      <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                        Finishes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 glass-card border-t border-blue-400/30 text-center">
              <p className="text-xs text-blue-200 font-medium">
                {selectedStat.players.length}{" "}
                {selectedStat.players.length === 1 ? "Player" : "Players"} Tied
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  players: User[];
  value: number | undefined;
  icon: any;
  color: "red" | "blue" | "green" | "purple";
  description: string;
  onClick: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  players,
  value,
  icon: Icon,
  color,
  description,
  onClick,
}) => {
  const colorStyles = {
    red: "from-red-500 to-rose-600 text-red-400",
    blue: "from-blue-500 to-cyan-600 text-blue-400",
    green: "from-green-500 to-emerald-600 text-green-400",
    purple: "from-purple-500 to-fuchsia-600 text-purple-400",
  };

  const bgGradient = `bg-gradient-to-br ${colorStyles[color]}`;

  return (
    <div
      onClick={onClick}
      className="glass-card p-4 sm:p-6 transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-2 sm:p-3 rounded-xl transition-transform group-hover:scale-110 duration-300 glass-button ${bgGradient}`}
        >
          <Icon size={20} className="sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            {value || 0}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-blue-200 mb-4 sm:mb-6 font-medium">
        {description}
      </p>

      {/* Players Info */}
      {players.length > 0 ? (
        <div className="flex items-center pt-4 border-t border-blue-400/30">
          <div className="flex -space-x-2 sm:-space-x-3 mr-2 sm:mr-3">
            {players.slice(0, 3).map((p, i) => (
              <img
                key={p.id}
                src={p.avatar}
                alt={p.name}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/30 shadow-lg flex-shrink-0 z-${
                  30 - i * 10
                }`}
                title={p.name}
              />
            ))}
            {players.length > 3 && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/30 shadow-lg glass-button flex items-center justify-center text-xs font-bold text-white z-0 flex-shrink-0">
                +{players.length - 3}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 ml-1 sm:ml-2">
            <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate group-hover:text-cyan-300 transition-colors">
              {players.length === 1
                ? players[0].name
                : `${players.length} Players`}
            </p>
            <p className="text-[10px] text-blue-300 uppercase tracking-wide font-bold">
              {players.length === 1 ? "Category Leader" : "Tied Leaders"}
            </p>
          </div>

          {/* Decorative dot for single player */}
          {players.length === 1 && (
            <div
              className={`w-3 h-3 rounded-full ${bgGradient} animate-pulse flex-shrink-0`}
            ></div>
          )}
        </div>
      ) : (
        <div className="pt-4 border-t border-blue-400/30 text-sm text-blue-300">
          No data available
        </div>
      )}
    </div>
  );
};

interface ShopCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  url: string;
  disabled?: boolean;
}

const ShopCard: React.FC<ShopCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  url,
  disabled = false,
}) => {
  const colorStyles = {
    blue: "from-blue-500 to-blue-600 text-blue-400",
    purple: "from-purple-500 to-purple-600 text-purple-400",
    cyan: "from-cyan-500 to-cyan-600 text-cyan-400",
    red: "from-red-500 to-red-600 text-red-400",
  };

  const bgGradient = `bg-gradient-to-br ${colorStyles[color as keyof typeof colorStyles]}`;

  if (disabled) {
    return (
      <div className="glass-card p-4 sm:p-6 opacity-60 cursor-not-allowed">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-2 sm:p-3 rounded-xl glass-button bg-gray-500 text-gray-300`}
          >
            <Icon size={20} className="sm:w-5 sm:h-5" />
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              {title}
            </p>
            <span className="inline-block px-2 py-0.5 glass-button text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-blue-200 mb-4 sm:mb-6 font-medium">
          {description}
        </p>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="glass-card p-4 sm:p-6 transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in block"
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-2 sm:p-3 rounded-xl transition-transform group-hover:scale-110 duration-300 glass-button ${bgGradient}`}
        >
          <Icon size={20} className="sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            {title}
          </p>
          <ExternalLink size={14} className="text-cyan-300 ml-1" />
        </div>
      </div>

      <p className="text-xs sm:text-sm text-blue-200 mb-4 sm:mb-6 font-medium">
        {description}
      </p>

      <div className="flex items-center pt-4 border-t border-blue-400/30">
        <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
          Visit Shop
        </span>
      </div>
    </a>
  );
};