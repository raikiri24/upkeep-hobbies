import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types";
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
      // Fetch all users to calculate stats locally for this view
      const data = await api.getAllUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading community stats...
      </div>
    );
  }

  // Calculate Rankings with Tie Breakers
  const topPlayers = [...users]
    .sort((a, b) => {
      // 1. Primary: Weekly Score (Wins) - Descending
      const scoreA = a.weeklyScore || 0;
      const scoreB = b.weeklyScore || 0;
      if (scoreB !== scoreA) return scoreB - scoreA;

      // 2. Secondary: Point Differential (Wins - Losses) - Descending
      const diffA = a.cumulativeDiff || 0;
      const diffB = b.cumulativeDiff || 0;
      if (diffB !== diffA) return diffB - diffA;

      // 3. Tertiary: Tournament Rank - Ascending (Lower is better)
      // If no rank (0 or undefined), push to bottom
      const rankA = a.rank && a.rank > 0 ? a.rank : 999999;
      const rankB = b.rank && b.rank > 0 ? b.rank : 999999;
      return rankA - rankB;
    })
    .slice(0, 5);

  const champion = topPlayers[0];

  // Specialized Finishers with Tie Breaking
  const getTopStatPlayers = (
    statKey: keyof NonNullable<User["beybladeStats"]>
  ) => {
    if (users.length === 0) return [];

    const maxVal = Math.max(
      ...users.map((u) => u.beybladeStats?.[statKey] || 0)
    );

    // If max is 0, no one wins
    if (maxVal === 0) return [];

    return users.filter((u) => (u.beybladeStats?.[statKey] || 0) === maxVal);
  };

  const topSpin = getTopStatPlayers("spinFinishes");
  const topBurst = getTopStatPlayers("burstFinishes");
  const topOver = getTopStatPlayers("overFinishes");
  const topExtreme = getTopStatPlayers("extremeFinishes");

  return (
    <div className="space-y-10 pb-12 relative">
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Beyblade Arena
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          Recognizing the masters of the stadium.
        </p>
      </div>

      {/* Hero: Player of the Week */}
      {champion && (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl shadow-2xl text-white p-8 md:p-12 border border-indigo-500/30">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500 opacity-20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 opacity-20 rounded-full blur-[100px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="absolute -top-6 -left-6 text-yellow-400 animate-bounce drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                <Crown size={56} fill="currentColor" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <img
                src={champion.avatar}
                alt={champion.name}
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-2xl object-cover"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm font-black px-6 py-2 rounded-full shadow-lg tracking-wider uppercase whitespace-nowrap border border-orange-400">
                #1 Champion
              </div>
            </div>

            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md text-sm font-semibold text-indigo-200 border border-white/10">
                <Star
                  size={14}
                  className="text-yellow-400"
                  fill="currentColor"
                />
                <span className="tracking-wide">PLAYER OF THE WEEK</span>
              </div>
              <div>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight">
                  {champion.name}
                </h3>
                <p className="text-indigo-200 text-xl mt-2 font-light">
                  Dominating with{" "}
                  <span className="font-bold text-white">
                    {champion.weeklyScore}
                  </span>{" "}
                  points
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specialty Awards Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Medal className="mr-3 text-indigo-600" />
          Special Awards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                title: "Pocket Master",
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
            description="High Impact knockouts"
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

      {/* General Leaderboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Trophy className="mr-2 text-yellow-500" />
            Top 5 Players
          </h3>
        </div>

        <div className="divide-y divide-gray-100">
          {topPlayers.map((player, index) => (
            <div
              key={player.id}
              className="group flex items-center p-4 sm:p-6 hover:bg-indigo-50/30 transition-colors"
            >
              <div
                className={`
                flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-black text-lg mr-6 shadow-sm
                ${
                  index === 0
                    ? "bg-yellow-100 text-yellow-700 ring-2 ring-yellow-200"
                    : index === 1
                    ? "bg-gray-100 text-gray-600 ring-2 ring-gray-200"
                    : index === 2
                    ? "bg-orange-100 text-orange-700 ring-2 ring-orange-200"
                    : "bg-white text-gray-400 border border-gray-200"
                }
              `}
              >
                {index + 1}
              </div>

              <img
                src={player.avatar}
                alt={player.name}
                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-lg truncate group-hover:text-indigo-700 transition-colors">
                  {player.name}
                </h4>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center">
                    <Zap size={12} className="mr-1" />{" "}
                    {player.beybladeStats?.burstFinishes} Bursts
                  </span>
                  <span className="flex items-center">
                    <RotateCw size={12} className="mr-1" />{" "}
                    {player.beybladeStats?.spinFinishes} Spins
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="block font-black text-2xl text-indigo-600 tracking-tight">
                  {player.weeklyScore}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Points
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialty Modal */}
      {selectedStat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedStat(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
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
                className="absolute top-4 right-4 p-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
              <div className="flex items-center space-x-3 mb-1">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
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
              <div className="divide-y divide-gray-100">
                {selectedStat.players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-100 shadow-sm mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {player.name}
                      </h4>
                      <p className="text-xs text-gray-500">Member</p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-black text-xl ${
                          selectedStat.color === "red"
                            ? "text-red-600"
                            : selectedStat.color === "blue"
                            ? "text-blue-600"
                            : selectedStat.color === "green"
                            ? "text-green-600"
                            : "text-purple-600"
                        }`}
                      >
                        {/* Map the correct stat based on the title or color as fallback logic */}
                        {selectedStat.title === "Burst King"
                          ? player.beybladeStats?.burstFinishes
                          : selectedStat.title === "Pocket Master"
                          ? player.beybladeStats?.spinFinishes
                          : selectedStat.title === "Ring-Out Pro"
                          ? player.beybladeStats?.overFinishes
                          : player.beybladeStats?.extremeFinishes}
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Finishes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 font-medium">
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
    red: "bg-red-50 text-red-600 border-red-100 from-red-500 to-rose-600",
    blue: "bg-blue-50 text-blue-600 border-blue-100 from-blue-500 to-cyan-600",
    green:
      "bg-green-50 text-green-600 border-green-100 from-green-500 to-emerald-600",
    purple:
      "bg-purple-50 text-purple-600 border-purple-100 from-purple-500 to-fuchsia-600",
  };

  const bgGradient = `bg-gradient-to-br ${colorStyles[color]
    .split(" ")
    .slice(3)
    .join(" ")}`;

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group ${
        colorStyles[color].split(" ")[2]
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 rounded-xl transition-transform group-hover:scale-110 duration-300 ${colorStyles[
            color
          ]
            .split(" ")
            .slice(0, 2)
            .join(" ")}`}
        >
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-black text-gray-900">{value || 0}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-6 font-medium">{description}</p>

      {/* Players Info */}
      {players.length > 0 ? (
        <div className="flex items-center pt-4 border-t border-gray-100">
          <div className="flex -space-x-3 mr-3">
            {players.slice(0, 3).map((p, i) => (
              <img
                key={p.id}
                src={p.avatar}
                alt={p.name}
                className={`w-10 h-10 rounded-full border-2 border-white shadow-sm z-${
                  30 - i * 10
                }`}
                title={p.name}
              />
            ))}
            {players.length > 3 && (
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 z-0">
                +{players.length - 3}
              </div>
            )}
          </div>

          <div className="ml-1 overflow-hidden">
            <p className="text-sm font-bold text-gray-900 leading-tight truncate group-hover:text-indigo-600 transition-colors">
              {players.length === 1
                ? players[0].name
                : `${players.length} Players`}
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">
              {players.length === 1 ? "Category Leader" : "Tied Leaders"}
            </p>
          </div>

          {/* Decorative dot for single player */}
          {players.length === 1 && (
            <div className={`ml-auto w-3 h-3 rounded-full ${bgGradient}`}></div>
          )}
        </div>
      ) : (
        <div className="pt-4 border-t border-gray-100 text-sm text-gray-400">
          No data available
        </div>
      )}
    </div>
  );
};
