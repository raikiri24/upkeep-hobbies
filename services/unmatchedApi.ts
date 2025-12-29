import axios from "axios";
import {
  UnmatchedDeck,
  UnmatchedCard,
  UnmatchedHero,
  UnmatchedSidekick,
} from "../types";

// Mock data for development when API is unavailable
const mockDecks: UnmatchedDeck[] = [
  {
    id: "1",
    name: "King Arthur",
    slug: "king-arthur",
    hero: "King Arthur",
    side: "Hero",
    release: "Unmatched: Battle of Legends, Volume One",
    set: "Volume One",
    setSlug: "volume-one",
    type: "Hero",
    health: 18,
    cardCount: 12,
    special: "Excalibur",
    movement: 5,
    quote: "I am the Once and Future King!",
    notes: "Legendary British leader",
    heroes: [
      {
        name: "King Arthur",
        slug: "king-arthur",
        hp: 18,
        attack_type: "melee",
        quantity: 1,
      },
    ],
    sidekicks: [
      {
        name: "Knights of the Round Table",
        slug: "knights",
        hp: 5,
        attack_type: "melee",
        quantity: 3,
      },
    ],
    cards: [],
  },
  {
    id: "2",
    name: "Medusa",
    slug: "medusa",
    hero: "Medusa",
    side: "Villain",
    release: "Unmatched: Battle of Legends, Volume One",
    set: "Volume One",
    setSlug: "volume-one",
    type: "Villain",
    health: 15,
    cardCount: 12,
    special: "Stone Gaze",
    movement: 4,
    quote: "One look is all it takes.",
    notes: "Gorgon with petrifying gaze",
    heroes: [
      {
        name: "Medusa",
        slug: "medusa",
        hp: 15,
        attack_type: "ranged",
        quantity: 1,
      },
    ],
    sidekicks: [
      {
        name: "Sthenno",
        slug: "sthenno",
        hp: 4,
        attack_type: "ranged",
        quantity: 2,
      },
    ],
    cards: [],
  },
];

class UnmatchedService {
  private async fetch<T>(url: string): Promise<T> {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error: any) {
      console.warn("API unavailable, using mock data:", error.message);
      throw error;
    }
  }

  async getDecks(): Promise<UnmatchedDeck[]> {
    try {
      // Use Vite proxy in development, direct API in production
      const apiUrl =
        "https://lkjnw31n3f.execute-api.ap-northeast-1.amazonaws.com/staging/unmatched-decks"; // Direct API in production
      const data = await this.fetch<any>(apiUrl);

      // The API returns { decks: [...] }
      const decksArray = data.decks || data;

      // Transform the data to match our interface
      return decksArray.map(
        (deck: any): UnmatchedDeck => ({
          id:
            deck.slug ||
            deck.id?.toString() ||
            deck._id?.toString() ||
            Math.random().toString(),
          name: deck.name || deck.title || "Unknown Deck",
          slug: deck.slug,
          hero: deck.heroes?.[0]?.name || deck.hero || deck.character,
          side: deck.side || deck.faction,
          release: deck.set || deck.release,
          set: deck.set,
          setSlug: deck.setSlug,
          type: deck.type || deck.deckType,
          health:
            deck.heroes?.[0]?.hp ||
            deck.health ||
            parseInt(deck.hp) ||
            undefined,
          cardCount: deck.cards?.length || deck.cardCount || deck.total_cards,
          special: deck.special,
          movement: deck.movement,
          quote: deck.quote,
          notes: deck.notes,
          heroes: deck.heroes,
          sidekicks: deck.sidekicks,
          cards: deck.cards,
        })
      );
    } catch (error) {
      console.error("Error fetching Unmatched decks:", error);
      // Return mock data when API fails
      console.log("Using mock data instead");
      return mockDecks;
    }
  }

  async getDeckById(id: string): Promise<UnmatchedDeck | null> {
    try {
      const decks = await this.getDecks();
      return decks.find((deck) => deck.id === id) || null;
    } catch (error) {
      console.error(`Error fetching Unmatched deck with id ${id}:`, error);
      return null;
    }
  }

  async getDecksByHero(hero: string): Promise<UnmatchedDeck[]> {
    try {
      const decks = await this.getDecks();
      return decks.filter(
        (deck) => deck.hero?.toLowerCase() === hero.toLowerCase()
      );
    } catch (error) {
      console.error(`Error fetching Unmatched decks for hero ${hero}:`, error);
      return [];
    }
  }
}

export const unmatchedApi = new UnmatchedService();
