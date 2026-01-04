import { User, Product, Tournament, MatchLog, SalesData } from "../types";

// CONFIGURATION
const API_BASE_URL =
  "https://lkjnw31n3f.execute-api.ap-northeast-1.amazonaws.com/staging/";

class ApiService {
  /**
   * Helper to normalize API responses.
   * Converts objects with numeric keys to arrays.
   */
  private normalizeResponse<T>(data: any): T[] {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "object") return Object.values(data);
    return [];
  }

  /**
   * Helper function to calculate player scores, point differential, and best rank.
   */
  private calculatePlayerStats(
    userId: string,
    tournaments: Tournament[]
  ): { weeklyScore: number; rank: number; cumulativeDiff: number } {
    if (!tournaments) return { weeklyScore: 0, rank: 0, cumulativeDiff: 0 };

    let totalPoints = 0;
    let totalDiff = 0;
    let bestRank = 999999;

    tournaments.forEach((t) => {
      const standingsList = this.normalizeResponse<any>(t.standings);

      if (standingsList.length > 0) {
        const standing = standingsList.find((s: any) => {
          const sId = s.userId || s.playerId || s.user_id || s.id;
          return String(sId) === String(userId);
        });

        if (standing) {
          let wins = 0;
          let losses = 0;

          if (standing.wins !== undefined && standing.losses !== undefined) {
            // Use separate wins/losses fields if available
            const parsedWins = parseInt(standing.wins, 10);
            const parsedLosses = parseInt(standing.losses, 10);
            if (!isNaN(parsedWins)) wins = parsedWins;
            if (!isNaN(parsedLosses)) losses = parsedLosses;
          } else if (standing.score !== undefined && standing.score !== null) {
            const parts = String(standing.score).split("-");
            const parsedWins = parseInt(parts[0], 10);
            const parsedLosses = parseInt(parts[1], 10);

            if (!isNaN(parsedWins)) wins = parsedWins;
            if (!isNaN(parsedLosses)) losses = parsedLosses;
          }

          totalPoints += wins;
          totalDiff += wins - losses;

          const rank = parseInt(standing.rank, 10);
          if (!isNaN(rank)) bestRank = Math.min(bestRank, rank);
        }
      }
    });

    return {
      weeklyScore: totalPoints,
      rank: bestRank === 999999 ? 0 : bestRank,
      cumulativeDiff: totalDiff,
    };
  }

  // --- Generic Fetch Wrapper ---
  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok)
      throw new Error(`API call failed: ${response.statusText}`);
    return response.json();
  }

  // --- USERS ---
  async getAllUsers(): Promise<User[]> {
    const [usersData, tournamentsData] = await Promise.all([
      this.fetch<any>("/getPlayers"),
      this.fetch<any>("/getGasgasan"),
    ]);

    const userList: User[] = this.normalizeResponse(usersData);
    const tournamentList: Tournament[] =
      this.normalizeResponse(tournamentsData);

    return userList.map((u) => {
      const stats = this.calculatePlayerStats(u.id, tournamentList);
      return {
        ...u,
        weeklyScore: stats.weeklyScore,
        rank: stats.rank,
        cumulativeDiff: stats.cumulativeDiff,
      };
    });
  }

  async login(userId: string): Promise<User> {
    const user = await this.fetch<User>(`/getPlayers/${userId}`);
    const tournamentsData = await this.fetch<any>("/getGasgasan");

    const tournamentList: Tournament[] =
      this.normalizeResponse(tournamentsData);
    const stats = this.calculatePlayerStats(user.id, tournamentList);

    return {
      ...user,
      weeklyScore: stats.weeklyScore,
      rank: stats.rank,
      cumulativeDiff: stats.cumulativeDiff,
    };
  }

  async getTopPlayers(): Promise<User[]> {
    const users = await this.getAllUsers();
    return users
      .sort((a, b) => {
        const scoreA = a.weeklyScore || 0;
        const scoreB = b.weeklyScore || 0;
        if (scoreB !== scoreA) return scoreB - scoreA;

        const diffA = a.cumulativeDiff || 0;
        const diffB = b.cumulativeDiff || 0;
        if (diffB !== diffA) return diffB - diffA;

        const rankA = a.rank && a.rank > 0 ? a.rank : 999999;
        const rankB = b.rank && b.rank > 0 ? b.rank : 999999;
        return rankA - rankB;
      })
      .slice(0, 5);
  }

  // --- PRODUCTS ---
  async getProducts(): Promise<Product[]> {
    const products = await this.fetch<any>("/getItems");
    return this.normalizeResponse(products);
  }

  // --- TOURNAMENTS ---
  async getTournaments(): Promise<Tournament[]> {
    const tournaments = await this.fetch<any>("/getGasgasan");
    return this.normalizeResponse(tournaments);
  }

  async createTournament(
    data: Omit<Tournament, "id" | "status" | "participants">
  ): Promise<Tournament> {
    const response = await fetch(`${API_BASE_URL}/getGasgasan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create tournament");
    return response.json();
  }

  async joinTournament(tournamentId: string, userId: string): Promise<void> {
    await fetch(`${API_BASE_URL}/getGasgasan/${tournamentId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  }

  // --- MATCHES ---
  async getMatches(tournamentId?: string): Promise<MatchLog[]> {
    const query = tournamentId ? `?tournamentId=${tournamentId}` : "";
    const matches = await this.fetch<any>(`/matches${query}`);
    return this.normalizeResponse(matches);
  }

  async recordMatch(match: Omit<MatchLog, "id">): Promise<MatchLog> {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(match),
    });
    if (!response.ok) throw new Error("Failed to record match");
    return response.json();
  }

  // --- ANALYTICS ---
  async getSalesData(): Promise<SalesData[]> {
    const sales = await this.fetch<any>("/analytics/sales");
    return this.normalizeResponse(sales);
  }
}

export const api = new ApiService();
