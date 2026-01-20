import React from "react";
import {
  Trophy,
  Users,
  TrendingUp,
  Shield,
  Target,
  Swords,
} from "lucide-react";
import { integer } from "yaml-language-server";

interface PlayerScore {
  name: string;
  points: number;
  opponentScore: number;
  result: "Win" | "Lose";
}

interface Match {
  opponent: string;
  teamScore: string;
  gameNumber?: number;
  players: PlayerScore[];
}

const PBBLTeamUpdates: React.FC = () => {
  const havocMatches: Match[] = [
    {
      opponent: "Whimsy",
      teamScore: "2-3 (Lose)",
      players: [
        { name: "Onimaru", points: 0, opponentScore: 5, result: "Lose" },
        { name: "Jonas great", points: 5, opponentScore: 1, result: "Win" },
        { name: "Rae", points: 2, opponentScore: 4, result: "Lose" },
        { name: "Xtra Rice", points: 5, opponentScore: 2, result: "Win" },
        { name: "Bell", points: 1, opponentScore: 4, result: "Lose" },
      ],
    },
    {
      opponent: "Weatherlight X",
      teamScore: "3-2 (Lose)",
      players: [
        { name: "Skade", points: 5, opponentScore: 2, result: "Win" },
        { name: "Jonas great", points: 2, opponentScore: 6, result: "Lose" },
        { name: "QT", points: 3, opponentScore: 4, result: "Lose" },
        { name: "HJ", points: 5, opponentScore: 1, result: "Win" },
        { name: "Jacob", points: 5, opponentScore: 2, result: "Win" },
      ],
    },
    {
      opponent: "Beygirls 2.0",
      teamScore: "3-2 (Win)",
      players: [
        { name: "Skade", points: 5, opponentScore: 3, result: "Win" },
        { name: "Xtra Rice", points: 4, opponentScore: 3, result: "Win" },
        { name: "HJ", points: 0, opponentScore: 4, result: "Lose" },
        { name: "Bell", points: 2, opponentScore: 4, result: "Lose" },
        { name: "Rae", points: 4, opponentScore: 1, result: "Win" },
      ],
    },
    {
      opponent: "River Bladers",
      teamScore: "4-1 (Win)",
      players: [
        { name: "Xtra Rice", points: 6, opponentScore: 3, result: "Win" },
        { name: "Skade", points: 4, opponentScore: 1, result: "Win" },
        { name: "QT", points: 4, opponentScore: 0, result: "Win" },
        { name: "Rae", points: 4, opponentScore: 3, result: "Win" },
        { name: "Jacob", points: 0, opponentScore: 4, result: "Lose" },
      ],
    },
    {
      opponent: "Tiger City",
      teamScore: "3-2 (Win)",
      players: [
        { name: "Xtra Rice", points: 5, opponentScore: 2, result: "Win" },
        { name: "Skade", points: 2, opponentScore: 4, result: "Lose" },
        { name: "QT", points: 4, opponentScore: 2, result: "Win" },
        { name: "HJ", points: 4, opponentScore: 0, result: "Win" },
        { name: "Rae", points: 2, opponentScore: 5, result: "Lose" },
      ],
    },
    {
      opponent: "Ecstatic X",
      teamScore: "4-1 (Win)",
      players: [
        { name: "Xtra Rice", points: 5, opponentScore: 0, result: "Win" },
        { name: "Faener", points: 4, opponentScore: 3, result: "Win" },
        { name: "QT", points: 4, opponentScore: 1, result: "Win" },
        { name: "HJ", points: 2, opponentScore: 4, result: "Lose" },
        { name: "Jacob", points: 4, opponentScore: 3, result: "Win" },
      ],
    },
  ];

  const longhornsGames: Match[] = [
    {
      opponent: "Unknown",
      gameNumber: 1,
      teamScore: "1-4 (Win)",
      players: [
        { name: "Avelino", points: 3, opponentScore: 4, result: "Lose" },
        { name: "Lec", points: 4, opponentScore: 0, result: "Win" },
        { name: "Paolo", points: 2, opponentScore: 4, result: "Lose" },
        { name: "MGOD", points: 2, opponentScore: 4, result: "Lose" },
        { name: "Nico", points: 2, opponentScore: 5, result: "Lose" },
      ],
    },
    {
      opponent: "Unknown",
      gameNumber: 2,
      teamScore: "1-4 (Win)",
      players: [
        { name: "ATX", points: 1, opponentScore: 4, result: "Lose" },
        { name: "Dru", points: 4, opponentScore: 2, result: "Win" },
        { name: "Sleeves", points: 1, opponentScore: 4, result: "Lose" },
        { name: "Leandro", points: 1, opponentScore: 5, result: "Lose" },
        { name: "Marl", points: 1, opponentScore: 5, result: "Lose" },
      ],
    },
    {
      opponent: "Unknown",
      gameNumber: 3,
      teamScore: "0-5 (Lose)",
      players: [
        { name: "Juggyboi", points: 1, opponentScore: 5, result: "Lose" },
        { name: "MGOD", points: 0, opponentScore: 5, result: "Lose" },
        { name: "Tretch", points: 2, opponentScore: 5, result: "Lose" },
        { name: "Avelino", points: 1, opponentScore: 4, result: "Lose" },
        { name: "Paolo", points: 3, opponentScore: 4, result: "Lose" },
      ],
    },
    {
      opponent: "Unknown",
      gameNumber: 4,
      teamScore: "2-3 (Lose)",
      players: [
        { name: "Lec", points: 4, opponentScore: 3, result: "Win" },
        { name: "Leandro", points: 3, opponentScore: 4, result: "Lose" },
        { name: "Dru", points: 5, opponentScore: 0, result: "Win" },
        { name: "ATX", points: 0, opponentScore: 4, result: "Lose" },
        { name: "Sleeves", points: 3, opponentScore: 5, result: "Lose" },
      ],
    },
    {
      opponent: "Unknown",
      gameNumber: 5,
      teamScore: "3-2 (Win)",
      players: [
        { name: "MGod", points: 3, opponentScore: 4, result: "Lose" },
        { name: "Paolo", points: 5, opponentScore: 1, result: "Win" },
        { name: "Dru", points: 0, opponentScore: 5, result: "Lose" },
        { name: "Nico", points: 5, opponentScore: 3, result: "Win" },
        { name: "Marl", points: 4, opponentScore: 3, result: "Win" },
      ],
    },
    {
      opponent: "Unknown",
      gameNumber: 6,
      teamScore: "2-3 (Lose)",
      players: [
        { name: "Lec", points: 0, opponentScore: 4, result: "Lose" },
        { name: "Leandro", points: 4, opponentScore: 0, result: "Win" },
        { name: "Paolo", points: 0, opponentScore: 4, result: "Lose" },
        { name: "Nico", points: 1, opponentScore: 5, result: "Lose" },
        { name: "Marl", points: 5, opponentScore: 3, result: "Win" },
      ],
    },
    {
      opponent: "Unknown",
      gameNumber: 7,
      teamScore: "2-3 (Lose)",
      players: [
        { name: "ATX", points: 4, opponentScore: 0, result: "Win" },
        { name: "Leandro", points: 0, opponentScore: 4, result: "Lose" },
        { name: "Lec", points: 0, opponentScore: 4, result: "Lose" },
        { name: "MGOD", points: 1, opponentScore: 4, result: "Lose" },
        { name: "Sleeves", points: 5, opponentScore: 0, result: "Win" },
      ],
    },
    {
      opponent: "Unknown",
      gameNumber: 8,
      teamScore: "4-1 (Win)",
      players: [
        { name: "ATX", points: 5, opponentScore: 0, result: "Win" },
        { name: "Dru", points: 5, opponentScore: 2, result: "Win" },
        { name: "Nico", points: 5, opponentScore: 2, result: "Win" },
        { name: "Marl", points: 4, opponentScore: 2, result: "Win" },
        { name: "Sleeves", points: 0, opponentScore: 5, result: "Lose" },
      ],
    },
  ];

  const calculateTeamStats = (matches: Match[]) => {
    const totalMatches = matches.length;
    const wins = matches.filter((match) => {
      const teamWins = match.players.filter((p) => p.result === "Win").length;
      const teamLosses = match.players.filter(
        (p) => p.result === "Lose",
      ).length;
      return teamWins > teamLosses;
    }).length;
    const losses = totalMatches - wins;
    const totalPoints = matches.reduce(
      (sum, match) =>
        sum +
        match.players.reduce(
          (playerSum, player) => playerSum + player.points,
          0,
        ),
      0,
    );
    return { totalMatches, wins, losses, totalPoints };
  };

  const calculateLonghornsStats = (games: any[]) => {
    const totalGames = games.length;
    const wins = games.reduce((sum, game) => {
      const gameWins = game.players.filter(
        (player) => player.result === "Win",
      ).length;
      const gameLosses = game.players.filter(
        (player) => player.result === "Lose",
      ).length;
      return gameWins > gameLosses ? sum + 1 : sum;
    }, 0);
    const losses = totalGames - wins;
    const totalPoints = games.reduce(
      (sum, game) =>
        sum +
        game.players.reduce(
          (playerSum, player) => playerSum + player.points,
          0,
        ),
      0,
    );
    return { totalGames, wins, losses, totalPoints };
  };

  const havocStats = calculateTeamStats(havocMatches);
  const longhornsStats = calculateLonghornsStats(longhornsGames);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white tracking-tight neon-text-cyan mb-4">
          PBBL Team Updates
        </h2>
        <p className="text-cyan-300 mt-2 text-lg font-mono">
          Philippine Beyblade League team standings and statistics
        </p>
      </div>

      {/* Team Score Highlight Card */}
      <div className="glass-card overflow-hidden animate-scale-in">
        <div className="p-6 border-b border-cyan-400/30">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 glass-button cyber-border">
              <Target className="text-cyan-400 neon-text-cyan" size={24} />
            </div>
            <h3 className="font-bold text-white neon-text-cyan font-mono text-xl">
              PBBL Team Standings
            </h3>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Havoc Score */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-16 h-16 rounded-2xl glass-button flex items-center justify-center cyber-border">
                  <img
                    src="/UPKEEP HAVOC PBBL.png"
                    alt="Upkeep Havoc"
                    className="w-14 h-14 rounded-xl object-contain"
                  />
                </div>
                <h4 className="font-bold text-white neon-text-cyan font-mono text-2xl">
                  Upkeep Havoc
                </h4>
              </div>
              <div className="glass-button cyber-border rounded-xl p-6">
                <div className="text-4xl font-bold text-cyan-400 font-mono mb-2">
                  5W-1L
                </div>
                <div className="text-sm text-cyan-300 font-mono">
                  Match Record
                </div>
              </div>
            </div>

            {/* Longhorns Score */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-16 h-16 rounded-2xl glass-button flex items-center justify-center cyber-border">
                  <img
                    src="/UPKEEP LONGHORNS PBBL.png"
                    alt="Upkeep Longhorns"
                    className="w-14 h-14 rounded-xl object-contain"
                  />
                </div>
                <h4 className="font-bold text-white neon-text-cyan font-mono text-2xl">
                  Upkeep Longhorns
                </h4>
              </div>
              <div className="glass-button cyber-border rounded-xl p-6">
                <div className="text-4xl font-bold text-cyan-400 font-mono mb-2">
                  2W-6L
                </div>
                <div className="text-sm text-cyan-300 font-mono">
                  Match Record
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Standings */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-cyan-400/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 glass-button cyber-border">
              <Users className="text-green-400 neon-text-green" size={20} />
            </div>
            <h3 className="font-bold text-white neon-text-cyan font-mono text-xl">
              Player Standings
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Havoc Players */}
            <div>
              <h4 className="font-semibold text-white neon-text-cyan font-mono mb-4 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg glass-button flex items-center justify-center cyber-border">
                  <img
                    src="/UPKEEP HAVOC PBBL.png"
                    alt="Upkeep Havoc"
                    className="w-6 h-6 rounded object-contain"
                  />
                </div>
                <span>Upkeep Havoc</span>
              </h4>
              <div className="space-y-2">
                {Array.from(
                  new Set(
                    havocMatches.flatMap((match) =>
                      match.players.map((p) => p.name.toLowerCase()),
                    ),
                  ),
                )
                  .map((normalizedPlayerName) => {
                    const playerMatches = havocMatches.flatMap((match) =>
                      match.players
                        .filter(
                          (p) => p.name.toLowerCase() === normalizedPlayerName,
                        )
                        .map((p) => ({ ...p, opponent: match.opponent })),
                    );
                    const totalPoints = playerMatches.reduce(
                      (sum, p) => sum + p.points,
                      0,
                    );
                    const wins = playerMatches.filter(
                      (p) => p.result === "Win",
                    ).length;
                    const losses = playerMatches.filter(
                      (p) => p.result === "Lose",
                    ).length;
                    const winRate =
                      playerMatches.length > 0
                        ? ((wins / playerMatches.length) * 100).toFixed(0)
                        : "0";

                    return {
                      playerName: normalizedPlayerName,
                      totalPoints,
                      wins,
                      losses,
                      winRate,
                    };
                  })
                  .sort((a, b) => {
                    // Sort by winrate first (highest)
                    const winrateDiff =
                      parseFloat(b.winRate) - parseFloat(a.winRate);
                    if (winrateDiff !== 0) return winrateDiff;

                    // Then by total games played (most games)
                    const gamesA = a.wins + a.losses;
                    const gamesB = b.wins + b.losses;
                    if (gamesB !== gamesA) return gamesB - gamesA;

                    // Case-insensitive name comparison as final tiebreaker
                    const nameA = a.playerName.toLowerCase();
                    const nameB = b.playerName.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                  })
                  .map((player) => (
                    <div
                      key={player.playerName}
                      className="glass-button cyber-border rounded-lg p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-cyan-200 font-mono">
                          {player.playerName}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded font-mono ${
                            parseInt(player.winRate) >= 60
                              ? "bg-green-500/20 text-green-300 border border-green-400/30"
                              : parseInt(player.winRate) >= 40
                                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                                : "bg-red-500/20 text-red-300 border border-red-400/30"
                          }`}
                        >
                          {player.wins}W-{player.losses}L
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold text-white font-mono">
                          {player.wins + player.losses}
                        </div>
                        <div className="text-xs text-cyan-300 font-mono">
                          Winrate {player.winRate}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Longhorns Players */}
            <div>
              <h4 className="font-semibold text-white neon-text-cyan font-mono mb-4 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg glass-button flex items-center justify-center cyber-border">
                  <img
                    src="/UPKEEP LONGHORNS PBBL.png"
                    alt="Upkeep Longhorns"
                    className="w-6 h-6 rounded object-contain"
                  />
                </div>
                <span>Upkeep Longhorns</span>
              </h4>
              <div className="space-y-2">
                {Array.from(
                  new Set(
                    longhornsGames.flatMap((game) =>
                      game.players.map((p) => p.name.toLowerCase()),
                    ),
                  ),
                )
                  .map((normalizedPlayerName) => {
                    const playerGames = longhornsGames.flatMap((game) =>
                      game.players
                        .filter(
                          (p) => p.name.toLowerCase() === normalizedPlayerName,
                        )
                        .map((p) => ({ ...p })),
                    );
                    const totalPoints = playerGames.reduce(
                      (sum, p) => sum + p.points,
                      0,
                    );
                    const wins = playerGames.filter(
                      (p) => p.result === "Win",
                    ).length;
                    const losses = playerGames.filter(
                      (p) => p.result === "Lose",
                    ).length;
                    const winRate =
                      playerGames.length > 0
                        ? ((wins / playerGames.length) * 100).toFixed(0)
                        : "0";

                    return {
                      playerName: normalizedPlayerName,
                      totalPoints,
                      wins,
                      losses,
                      winRate,
                    };
                  })
                  .sort((a, b) => {
                    // Sort by winrate first (highest)
                    const winrateDiff =
                      parseFloat(b.winRate) - parseFloat(a.winRate);
                    if (winrateDiff !== 0) return winrateDiff;

                    // Then by total games played (most games)
                    const gamesA = a.wins + a.losses;
                    const gamesB = b.wins + b.losses;
                    if (gamesB !== gamesA) return gamesB - gamesA;

                    // Case-insensitive name comparison as final tiebreaker
                    const nameA = a.playerName.toLowerCase();
                    const nameB = b.playerName.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                  })
                  .map((player) => (
                    <div
                      key={player.playerName}
                      className="glass-button cyber-border rounded-lg p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-cyan-200 font-mono">
                          {player.playerName}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded font-mono ${
                            parseInt(player.winRate) >= 60
                              ? "bg-green-500/20 text-green-300 border border-green-400/30"
                              : parseInt(player.winRate) >= 40
                                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                                : "bg-red-500/20 text-red-300 border border-red-400/30"
                          }`}
                        >
                          {player.wins}W-{player.losses}L
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold text-white font-mono">
                          {player.wins + player.losses}
                        </div>
                        <div className="text-xs text-cyan-300 font-mono">
                          Winrate {player.winRate}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upkeep Havoc Matches */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-cyan-400/30">
          <div className="flex items-center space-x-3">
            <div className="p-2 glass-button cyber-border">
              <Swords className="text-red-400 neon-text-red" size={20} />
            </div>
            <h3 className="font-bold text-white neon-text-cyan font-mono text-xl">
              Upkeep Havoc - Match Results
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {havocMatches.map((match, index) => (
              <div
                key={index}
                className="glass-button cyber-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white font-mono">
                    vs {match.opponent}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-mono ${
                        match.teamScore.includes("Win")
                          ? "bg-green-500/20 text-green-300 border border-green-400/30"
                          : "bg-red-500/20 text-red-300 border border-red-400/30"
                      }`}
                    >
                      {match.teamScore}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {match.players.map((player, playerIndex) => (
                    <div
                      key={playerIndex}
                      className="flex items-center justify-between glass-card p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-cyan-200 font-mono">
                          {player.name}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded font-mono ${
                            player.result === "Win"
                              ? "bg-green-500/20 text-green-300 border border-green-400/30"
                              : "bg-red-500/20 text-red-300 border border-red-400/30"
                          }`}
                        >
                          {player.result}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-white font-mono">
                        {player.points}-{player.opponentScore}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upkeep Longhorns Games */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-cyan-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 glass-button cyber-border">
                <TrendingUp
                  className="text-yellow-400 neon-text-yellow"
                  size={20}
                />
              </div>
              <h3 className="font-bold text-white neon-text-cyan font-mono text-xl">
                Upkeep Longhorns - Game Results
              </h3>
            </div>
            <div className="text-sm text-cyan-300 font-mono">
              Tournament Date: 01/17/2026
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {longhornsGames.map((game, index) => (
              <div
                key={index}
                className="glass-button cyber-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white font-mono">
                    Game {game.gameNumber}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-cyan-300 font-mono">
                      {game.players.filter((p) => p.result === "Win").length}W -{" "}
                      {game.players.filter((p) => p.result === "Lose").length}L
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {game.players.map((player, playerIndex) => (
                    <div
                      key={playerIndex}
                      className="flex items-center justify-between glass-card p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-cyan-200 font-mono">
                          {player.name}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded font-mono ${
                            player.result === "Win"
                              ? "bg-green-500/20 text-green-300 border border-green-400/30"
                              : "bg-red-500/20 text-red-300 border border-red-400/30"
                          }`}
                        >
                          {player.result}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-white font-mono">
                        {player.points}-{player.opponentScore}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PBBLTeamUpdates;
