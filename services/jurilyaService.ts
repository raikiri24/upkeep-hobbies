import { UnmatchedDeck } from '../types';

export interface JurilyaMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  context?: {
    deckId?: string;
    heroName?: string;
    cardType?: string;
    suggestions?: string[];
    relatedCards?: string[];
  };
}

export interface JurilyaResponse {
  message: string;
  suggestions?: string[];
  relatedCards?: string[];
}

class JurilyaService {
  // Kepli AI API endpoint
  private readonly API_ENDPOINT = 'https://lkjnw31n3f.execute-api.ap-northeast-1.amazonaws.com/staging/api/kepli-ask';
  
  // Mock knowledge base for Unmatched
  private readonly knowledgeBase = {
    heroes: {
      'King Arthur': {
        description: 'A melee hero with 18 health and 5 movement. Special ability: Excalibur.',
        strategy: 'Focus on close combat and use Excalibur at crucial moments.',
        weaknesses: 'Vulnerable to ranged attacks and high-damage bursts.'
      },
      'Medusa': {
        description: 'A ranged villain with 15 health and 4 movement. Special ability: Stone Gaze.',
        strategy: 'Keep distance and use Stone Gaze to control the battlefield.',
        weaknesses: 'Struggles against fast melee heroes.'
      }
    },
    abilities: {
      'Excalibur': 'King Arthur\'s signature move - deals high damage and can bypass defenses.',
      'Stone Gaze': 'Medusa can petrify enemies, preventing them from acting for a turn.'
    },
    strategies: {
      general: [
        'Control the center of the battlefield for better positioning',
        'Save your special ability for critical moments',
        'Balance offense and defense based on your hero type',
        'Pay attention to movement values and positioning'
      ]
    }
  };

  async askQuestion(
    question: string, 
    context?: {
      deckId?: string;
      heroName?: string;
      cardType?: string;
    }
  ): Promise<JurilyaResponse> {
    try {
      return await this.callRealAPI(question, context);
    } catch (error) {
      console.error('Kepli API error:', error);
      
      // Fallback to mock responses if API fails
      return this.getFallbackResponse(question, context);
    }
  }

  private getFallbackResponse(
    question: string,
    context?: {
      deckId?: string;
      heroName?: string;
      cardType?: string;
    }
  ): JurilyaResponse {
    const lowerQuestion = question.toLowerCase();
    
    // Check if question is about specific hero
    if (context?.heroName) {
      const heroInfo = this.knowledgeBase.heroes[context.heroName as keyof typeof this.knowledgeBase.heroes];
      if (heroInfo) {
        return {
          message: `${context.heroName}: ${heroInfo.description}\n\n**Strategy:** ${heroInfo.strategy}\n\n**Weaknesses:** ${heroInfo.weaknesses}`,
          suggestions: [
            `How to play ${context.heroName} against ranged heroes?`,
            `Best card combinations for ${context.heroName}`,
            `${context.heroName} matchup strategies`
          ]
        };
      }
    }

    // General Unmatched questions
    if (lowerQuestion.includes('strategy') || lowerQuestion.includes('how to play')) {
      return {
        message: 'Here are some key strategies for Unmatched:\n\n1. **Position Control**: The center of the battlefield offers the most options\n2. **Resource Management**: Don\'t use your special ability too early\n3. **Matchup Awareness**: Adjust your strategy based on your opponent\n4. **Movement Matters**: Always consider your hero\'s movement value\n\nWould you like more specific advice about a particular hero or situation?',
        suggestions: [
          'How to counter fast heroes?',
          'Best beginner heroes?',
          'Understanding card types'
        ]
      };
    }

    if (lowerQuestion.includes('beginner') || lowerQuestion.includes('new')) {
      return {
        message: 'Welcome to Unmatched! For beginners, I recommend:\n\n**Easy Heroes:**\n• King Arthur - straightforward and balanced\n• Little Red Riding Hood - aggressive and simple\n• Big Bad Wolf - powerful and direct\n\n**Learning Tips:**\n• Start with the tutorial decks\n• Focus on learning movement zones\n• Practice timing your special abilities\n\nWould you like detailed advice for any of these heroes?',
        suggestions: [
          'King Arthur detailed guide',
          'Understanding movement zones',
          'When to use special abilities'
        ]
      };
    }

    if (lowerQuestion.includes('card type') || lowerQuestion.includes('attack defense')) {
      return {
        message: 'Unmatched features several card types:\n\n**Attack Cards**: Deal damage directly to opponents\n**Defense Cards**: Reduce or negate incoming damage\n**Scheme Cards**: Ongoing effects and abilities\n**Event Cards**: One-time effects or triggered abilities\n\nThe key is balancing immediate actions with long-term strategy. Would you like to know more about any specific type?',
        suggestions: [
          'Building attack-heavy decks',
          'Defensive strategies',
          'Scheme card combos'
        ]
      };
    }

    // Default response
    return {
        message: 'I\'m Jurilya, your Unmatched expert! I can help you with:\n\n🎯 Hero strategies and matchups\n🃏 Card mechanics and combos\n📋 Deck building advice\n🎮 Game rules and clarifications\n\nFeel free to ask me anything about Unmatched gameplay, heroes, or strategies!',
      suggestions: [
        'Best beginner heroes?',
        'How to counter specific heroes?',
        'Deck building tips',
        'Movement and positioning guide'
      ]
    };
  }

  // Method to call real API
  private async callRealAPI(question: string, context?: any): Promise<JurilyaResponse> {
    const response = await fetch(this.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context,
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the API response to match our KepliResponse interface
    // Adjust this based on your actual API response structure
    return {
      message: data.message || data.response || 'No response from API',
      suggestions: data.suggestions || [],
      relatedCards: data.relatedCards || []
    };
  }

  // Get contextual questions based on current view
  getContextualQuestions(deck?: UnmatchedDeck): string[] {
    if (!deck) {
      return [
        'What heroes are good for beginners?',
        'How does movement work in Unmatched?',
        'What are the basic rules?'
      ];
    }

    return [
      `What's the best strategy for ${deck.hero}?`,
      `How does ${deck.special} work?`,
      `What heroes counter ${deck.hero}?`,
      `Best card combinations with ${deck.hero}?`
    ];
  }
}

export const jurilyaService = new JurilyaService();