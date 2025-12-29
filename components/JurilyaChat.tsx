import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2, MessageCircle, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { JurilyaMessage, JurilyaResponse, jurilyaService } from '../services/jurilyaService';
import { UnmatchedDeck } from '../types';

interface JurilyaChatProps {
  currentDeck?: UnmatchedDeck;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const JurilyaChat: React.FC<JurilyaChatProps> = ({ 
  currentDeck, 
  isOpen = false, 
  onToggle 
}) => {
  const [messages, setMessages] = useState<JurilyaMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showRelatedCards, setShowRelatedCards] = useState(true);
  const [showJurilyaSuggestions, setShowJurilyaSuggestions] = useState(true);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [currentRelatedCards, setCurrentRelatedCards] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      const welcomeMessage: JurilyaMessage = {
        id: '1',
        content: '🤖 Hello! I\'m Jurilya, your Unmatched expert. I can help you with hero strategies, deck building, rules, and gameplay mechanics. What would you like to know?',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: JurilyaMessage = {
      id: Date.now().toString(),
      content: messageContent,
      role: 'user',
      timestamp: new Date(),
      context: {
        deckId: currentDeck?.id,
        heroName: currentDeck?.hero
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await jurilyaService.askQuestion(messageContent, {
        deckId: currentDeck?.id,
        heroName: currentDeck?.hero
      });

      setTimeout(() => {
        // Use the structured response directly
        const assistantMessage: JurilyaMessage = {
          id: (Date.now() + 1).toString(),
          content: response.message,
          role: 'assistant',
          timestamp: new Date(),
          context: {
            deckId: currentDeck?.id,
            heroName: currentDeck?.hero,
            suggestions: response.suggestions,
            relatedCards: response.relatedCards
          }
        };

        setMessages(prev => [...prev, assistantMessage]);
        setCurrentSuggestions(response.suggestions || []);
        setCurrentRelatedCards(response.relatedCards || []);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      const errorMessage: JurilyaMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const contextualSuggestions = jurilyaService.getContextualQuestions(currentDeck);

  const parseMessageResponse = (message: string) => {
    // Look for JSON block in the message
    const jsonMatch = message.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    
    if (jsonMatch) {
      try {
        const jsonData = JSON.parse(jsonMatch[1]);
        const cleanMessage = message.replace(/```json\s*\{[\s\S]*?\}\s*```/, '').trim();
        return {
          cleanMessage,
          suggestions: jsonData.suggestions || [],
          relatedCards: jsonData.relatedCards || []
        };
      } catch (error) {
        console.error('Failed to parse JSON from message:', error);
      }
    }
    
    return {
      cleanMessage: message,
      suggestions: [],
      relatedCards: []
    };
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 w-14 h-14 glass-button rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-pulse border border-cyan-400/60 z-50 flex items-center justify-center group"
      >
        <img src="/jurilya.png" alt="Jurilya" className="w-8 h-8 rounded-full" />
        <span className="absolute -top-8 -right-2 w-6 h-6 bg-neon-green rounded-full flex items-center justify-center">
          <Sparkles size={12} className="text-white" />
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 w-96 max-w-[90vw] z-50 transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-[600px]'
    }`}>
      <div className="h-full glass-modal rounded-xl flex flex-col border-2 border-cyan-400/30">
        {/* Header */}
        <div className="flex items-center justify-between p-3 glass-card border-b border-cyan-400/20">
          <div className="flex items-center space-x-2">
            <img src="/jurilya.png" alt="Jurilya" className="w-8 h-8 rounded-full" />
            <div>
              <h3 className="text-sm font-bold text-white">Jurilya AI</h3>
              <p className="text-xs text-cyan-400">Unmatched Expert</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 glass-button rounded text-cyan-300 hover:text-cyan-100"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-1 glass-button rounded text-cyan-300 hover:text-cyan-100"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Context Indicator */}
            {currentDeck && (
              <div className="px-3 py-2 glass-card border-b border-cyan-400/20 bg-cyan-500/10">
                <p className="text-xs text-cyan-300 font-mono">
                  🎯 Context: {currentDeck.hero} - {currentDeck.type}
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl font-mono text-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white ml-2'
                        : 'glass-card text-cyan-100 mr-2'
                    }`}
                  >
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          strong: ({children}) => <strong className="text-cyan-300 font-bold">{children}</strong>,
                          em: ({children}) => <em className="text-cyan-200 italic">{children}</em>,
                          code: ({className, children, ...props}) => {
                            return <code className="bg-cyan-900/50 text-cyan-300 px-1 py-0.5 rounded text-xs" {...props}>{children}</code>
                          },
                          ul: ({children}) => <ul className="list-disc list-inside space-y-1 text-cyan-100">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal list-inside space-y-1 text-cyan-100">{children}</ol>,
                          li: ({children}) => <li className="text-cyan-100">{children}</li>,
                          p: ({children}) => <p className="text-cyan-100 mb-2">{children}</p>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-cyan-200' : 'text-cyan-500'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-card px-3 py-2 rounded-xl mr-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Related Cards */}
            {currentRelatedCards.length > 0 && showRelatedCards && (
              <div className="p-3 border-t border-cyan-400/20">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-cyan-400 font-mono">🃏 Related Cards:</p>
                  <button
                    onClick={() => setShowRelatedCards(false)}
                    className="text-xs text-cyan-500 hover:text-cyan-300 transition-colors"
                  >
                    Hide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentRelatedCards.map((card, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(`Tell me more about ${card}`)}
                      className="glass-button px-2 py-1 text-xs text-purple-300 hover:text-purple-100 hover:scale-105 transition-all border border-purple-400/30"
                    >
                      {card}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            {currentSuggestions.length > 0 && showJurilyaSuggestions && (
              <div className="p-3 border-t border-cyan-400/20 bg-cyan-500/10">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-cyan-400 font-mono">🤖 Jurilya Suggestions:</p>
                  <button
                    onClick={() => setShowJurilyaSuggestions(false)}
                    className="text-xs text-cyan-500 hover:text-cyan-300 transition-colors"
                  >
                    Hide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="glass-button px-2 py-1 text-xs text-cyan-300 hover:text-cyan-100 hover:scale-105 transition-all border border-cyan-400/40 bg-cyan-600/20"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Default Suggestions */}
            {showSuggestions && messages.length <= 2 && currentSuggestions.length === 0 && (
              <div className="p-3 border-t border-cyan-400/20">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-cyan-400 font-mono">💡 Quick Questions:</p>
                  <button
                    onClick={() => setShowSuggestions(false)}
                    className="text-xs text-cyan-500 hover:text-cyan-300"
                  >
                    Hide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contextualSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="glass-button px-2 py-1 text-xs text-cyan-300 hover:text-cyan-100 hover:scale-105 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Show Hidden Sections */}
            {(!showSuggestions || !showRelatedCards || !showJurilyaSuggestions || currentRelatedCards.length > 0 || currentSuggestions.length > 0) && (
              <div className="p-3 border-t border-cyan-400/20">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-cyan-400 font-mono">👁️ Show Hidden:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!showSuggestions && messages.length <= 2 && currentSuggestions.length === 0 && (
                    <button
                      onClick={() => setShowSuggestions(true)}
                      className="glass-button px-2 py-1 text-xs text-cyan-300 hover:text-cyan-100 hover:scale-105 transition-all"
                    >
                      💡 Quick Questions
                    </button>
                  )}
                  {!showRelatedCards && currentRelatedCards.length > 0 && (
                    <button
                      onClick={() => setShowRelatedCards(true)}
                      className="glass-button px-2 py-1 text-xs text-purple-300 hover:text-purple-100 hover:scale-105 transition-all border border-purple-400/30"
                    >
                      🃏 Related Cards
                    </button>
                  )}
                  {!showJurilyaSuggestions && currentSuggestions.length > 0 && (
                    <button
                      onClick={() => setShowJurilyaSuggestions(true)}
                      className="glass-button px-2 py-1 text-xs text-cyan-300 hover:text-cyan-100 hover:scale-105 transition-all border border-cyan-400/40 bg-cyan-600/20"
                    >
                      🤖 Jurilya Suggestions
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-cyan-400/20">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }} className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Jurilya about Unmatched..."
                  className="flex-1 glass-input text-cyan-300 placeholder-cyan-600"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="glass-button p-2 rounded text-cyan-300 hover:text-cyan-100 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JurilyaChat;