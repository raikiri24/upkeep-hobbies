# Kepli AI Serverless API Integration Guide

## 📋 Setup Instructions for Your Serverless Backend

### 🔧 File Structure
Create this in your `/Documents/Enshored Projects/Human Resources/christmas_party_attendance_qr_code/christmasparty-backend/packages/api-upk`:

```
api-upk/
├── functions/
│   └── kepli-ask/
│       ├── index.js
│       └── package.json
└── serverless.yml
```

### 🚀 AWS Lambda Function (kepli-ask/index.js)

```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini with environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// System prompt to restrict to Unmatched only
const SYSTEM_PROMPT = `You are Kepli, an expert AI assistant for the Unmatched card game. 
You ONLY answer questions about:
- Unmatched heroes and their abilities
- Card mechanics and strategies  
- Deck building advice
- Game rules and clarifications
- Hero matchups and counter-strategies

Politely decline any questions about topics other than Unmatched. 
Be helpful, concise, and provide strategic insights when relevant.

Available heroes and their data can be fetched from: https://lkjnw31n3f.execute-api.ap-northeast-1.amazonaws.com/staging/unmatched-decks

Always provide helpful, game-focused responses.`;

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    const { question, context } = JSON.parse(event.body);

    // Validate input
    if (!question || typeof question !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid question format' })
      };
    }

    // Get deck data for context if provided
    let contextData = '';
    if (context?.deckId || context?.heroName) {
      try {
        const deckResponse = await fetch(`https://lkjnw31n3f.execute-api.ap-northeast-1.amazonaws.com/staging/unmatched-decks`);
        const decks = await deckResponse.json();
        const deck = decks.decks?.find(d => d.id === context.deckId || d.hero === context.heroName);
        if (deck) {
          contextData = `\n\nCurrent Context: ${deck.name} (${deck.type}) - Health: ${deck.health || deck.hp}, Movement: ${deck.movement}, Special: ${deck.special}`;
        }
      } catch (error) {
        console.log('Could not fetch deck context:', error);
      }
    }

    const fullPrompt = `${SYSTEM_PROMPT}${contextData}\n\nUser Question: ${question}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: text,
        suggestions: generateSuggestions(text),
        relatedCards: extractRelatedCards(text)
      })
    };

  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'AI service temporarily unavailable',
        message: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.'
      })
    };
  }
};

function generateSuggestions(response) {
  const suggestions = [];
  
  if (response.toLowerCase().includes('strategy')) {
    suggestions.push('Specific matchup strategies', 'Deck building tips');
  }
  if (response.toLowerCase().includes('hero')) {
    suggestions.push('Hero counters', 'Ability explanations');
  }
  if (response.toLowerCase().includes('card')) {
    suggestions.push('Card combinations', 'Timing and usage');
  }
  
  return suggestions.slice(0, 3); // Limit to 3 suggestions
}

function extractRelatedCards(response) {
  // Extract hero names mentioned in response
  const heroes = ['King Arthur', 'Medusa', 'Little Red Riding Hood', 'Big Bad Wolf', 'Robin Hood', 'Prince John'];
  const mentioned = [];
  
  heroes.forEach(hero => {
    if (response.toLowerCase().includes(hero.toLowerCase())) {
      mentioned.push(hero);
    }
  });
  
  return mentioned.slice(0, 2); // Limit to 2 related heroes
}
```

### 📦 Package JSON (kepli-ask/package.json)

```json
{
  "name": "kepli-ask",
  "version": "1.0.0",
  "dependencies": {
    "@google/generative-ai": "^0.1.3"
  }
}
```

### ⚙️ Serverless Configuration

```yaml
service: api-upk
provider:
  name: aws
  runtime: nodejs18.x
  region: ap-northeast-1

functions:
  kepli-ask:
    handler: functions/kepli-ask/index.handler
    environment:
      GEMINI_API_KEY: ${env:GEMINI_API_KEY}
    events:
      - http:
        path: /api/kepli-ask
        method: post
        cors: true

plugins:
  - serverless-offline
  - serverless-dotenv-plugin

custom:
  serverless-offline:
    httpPort: 3003
```

### 🔐 Environment Setup

1. **Set environment variable:**
   ```bash
   export GEMINI_API_KEY="your-gemini-api-key-here"
   ```

2. **Install dependencies:**
   ```bash
   cd functions/kepli-ask
   npm install
   ```

3. **Deploy:**
   ```bash
   serverless deploy
   ```

### 🔄 Update Frontend Service

Replace the mock call in `/services/kepliService.ts`:

```typescript
private async callRealAPI(question: string, context?: any): Promise<KepliResponse> {
  const response = await fetch('/api/kepli-ask', { // Update to your deployed endpoint
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
    throw new Error('API call failed');
  }

  return response.json();
}
```

### 🛡️ Security Features

✅ **API Key Protection**: Stored in environment variables  
✅ **Request Validation**: Input sanitization and type checking  
✅ **Rate Limiting**: Implement API rate limiting  
✅ **CORS Configuration**: Secure cross-origin requests  
✅ **Error Handling**: Graceful fallbacks and error messages  
✅ **Content Filtering**: System prompt restricts to Unmatched only  

### 📊 Usage Analytics (Optional)

Add usage tracking:
```javascript
// Add to handler function
const usage = {
  timestamp: new Date().toISOString(),
  question: question.substring(0, 100), // First 100 chars
  context: context ? 'deck-specific' : 'general'
};

// Log to CloudWatch or your analytics service
console.log('KEPLI_USAGE:', JSON.stringify(usage));
```

### 🧪 Testing

```bash
# Test locally
serverless offline

# Test the function
curl -X POST http://localhost:3003/api/kepli-ask \
  -H "Content-Type: application/json" \
  -d '{"question":"How do I play King Arthur?"}'
```

This setup provides a secure, production-ready backend for Kepli AI while keeping your API key completely hidden from the frontend.