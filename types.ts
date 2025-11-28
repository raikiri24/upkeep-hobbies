export interface BeybladeStats {
  spinFinishes: number;
  burstFinishes: number;
  overFinishes: number;
  extremeFinishes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  weeklyScore?: number;
  rank?: number; // Best rank from tournament standings
  cumulativeDiff?: number;
  beybladeStats?: BeybladeStats;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

export interface TournamentStanding {
  userId: string;
  rank: number;
  score: string; // e.g. "5-0", "12pts"
  notes?: string;
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  game: string;
  season: number;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  participants: string[]; // User IDs
  maxPlayers: number;
  standings?: TournamentStanding[];
}

export interface MatchLog {
  id: string;
  tournamentId: string;
  player1Id: string;
  player2Id: string;
  player1Score: number;
  player2Score: number;
  winnerId: string;
}

export interface SalesData {
  date: string;
  amount: number;
}

export interface PlayerStats {
  matchesPlayed: number;
  wins: number;
  winRate: number;
  tournamentsJoined: number;
}
