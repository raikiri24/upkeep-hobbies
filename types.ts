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
  sku: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  status: string;
  imageUrl: string;
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

export interface UnmatchedCard {
  title: string;
  slug: string;
  type: "attack" | "defense" | "versatile" | "scheme";
  value?: number;
  boost?: number;
  basicText?: string;
  duringText?: string;
  afterText?: string;
  immediateText?: string;
  image: string;
  quantity: number;
  characterName?: string;
  card_notes?: string;
  other_decks?: Array<{ name: string; slug: string }>;
}

export interface UnmatchedHero {
  name: string;
  slug: string;
  hp: number;
  attack_type: "melee" | "ranged";
  quantity: number;
}

export interface UnmatchedSidekick {
  name: string;
  slug: string;
  hp: number;
  attack_type: "melee" | "ranged";
  quantity: number;
}

export interface UnmatchedDeck {
  id: string;
  name: string;
  slug: string;
  hero?: string;
  side?: string;
  release?: string;
  set?: string;
  setSlug?: string;
  type?: string;
  health?: number;
  cardCount?: number;
  special?: string;
  movement?: number;
  quote?: string;
  notes?: string;
  heroes?: UnmatchedHero[];
  sidekicks?: UnmatchedSidekick[];
  cards?: UnmatchedCard[];
}
