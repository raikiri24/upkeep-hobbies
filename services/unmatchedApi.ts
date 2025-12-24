import axios from 'axios';
import { UnmatchedDeck, UnmatchedCard, UnmatchedHero, UnmatchedSidekick } from "../types";

// Use proxy path to avoid CORS issues in both development and production
const UNMATCHED_API_URL = "/api/unmatched/api/db/decks";

class UnmatchedService {
  private async fetch<T>(url: string): Promise<T> {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Failed to fetch from Unmatched API: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error(`Failed to fetch from Unmatched API: Network error`);
      } else {
        throw new Error(`Failed to fetch from Unmatched API: ${error.message}`);
      }
    }
  }

  async getDecks(): Promise<UnmatchedDeck[]> {
    try {
      const data = await this.fetch<any>(UNMATCHED_API_URL);
      
      // The API returns { decks: [...] }
      const decksArray = data.decks || data;
      
      // Transform the data to match our interface
      return decksArray.map((deck: any): UnmatchedDeck => ({
        id: deck.slug || deck.id?.toString() || deck._id?.toString() || Math.random().toString(),
        name: deck.name || deck.title || 'Unknown Deck',
        slug: deck.slug,
        hero: deck.heroes?.[0]?.name || deck.hero || deck.character,
        side: deck.side || deck.faction,
        release: deck.set || deck.release,
        set: deck.set,
        setSlug: deck.setSlug,
        type: deck.type || deck.deckType,
        health: deck.heroes?.[0]?.hp || deck.health || parseInt(deck.hp) || undefined,
        cardCount: deck.cards?.length || deck.cardCount || deck.total_cards,
        special: deck.special,
        movement: deck.movement,
        quote: deck.quote,
        notes: deck.notes,
        heroes: deck.heroes,
        sidekicks: deck.sidekicks,
        cards: deck.cards
      }));
    } catch (error) {
      console.error('Error fetching Unmatched decks:', error);
      // In production, provide better error handling for CORS issues
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        console.error('CORS error detected. Please check server configuration.');
        return [];
      }
      throw error;
    }
  }

  async getDeckById(id: string): Promise<UnmatchedDeck | null> {
    try {
      const decks = await this.getDecks();
      return decks.find(deck => deck.id === id) || null;
    } catch (error) {
      console.error(`Error fetching Unmatched deck with id ${id}:`, error);
      return null;
    }
  }

  async getDecksByHero(hero: string): Promise<UnmatchedDeck[]> {
    try {
      const decks = await this.getDecks();
      return decks.filter(deck => 
        deck.hero?.toLowerCase() === hero.toLowerCase()
      );
    } catch (error) {
      console.error(`Error fetching Unmatched decks for hero ${hero}:`, error);
      return [];
    }
  }
}

export const unmatchedApi = new UnmatchedService();