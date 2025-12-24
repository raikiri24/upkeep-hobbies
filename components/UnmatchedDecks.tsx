import React, { useEffect, useState, useMemo } from "react";
import { unmatchedApi } from '../services/unmatchedApi';
import { UnmatchedDeck } from '../types';

const UnmatchedDecks: React.FC = () => {
 const [decks, setDecks] = useState<UnmatchedDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRelease, setSelectedRelease] = useState<string>('all');
  const [selectedDeck, setSelectedDeck] = useState<UnmatchedDeck | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const uniqueReleases = useMemo(() => {
    const releases = new Set<string>();
    decks.forEach(deck => {
      if (deck.release) {
        releases.add(deck.release);
      }
    });
    return Array.from(releases).sort();
  }, [decks]);

  const filteredDecks = useMemo(() => {
    let filtered = decks;
    
    // Filter by release
    if (selectedRelease !== 'all') {
      filtered = filtered.filter(deck => deck.release === selectedRelease);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(deck => 
        deck.name?.toLowerCase().includes(query) ||
        deck.hero?.toLowerCase().includes(query) ||
        deck.side?.toLowerCase().includes(query) ||
        deck.type?.toLowerCase().includes(query) ||
        deck.release?.toLowerCase().includes(query) ||
        deck.special?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [decks, selectedRelease, searchQuery]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        setLoading(true);
        const fetchedDecks = await unmatchedApi.getDecks();
        setDecks(fetchedDecks);
      } catch (err) {
        setError('Failed to load Unmatched decks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-4 border-red-400 text-red-300 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6 animate-fade-in">Unmatched Decks</h1>
      
      <div className="glass-card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search-input" className="block text-sm font-medium text-white mb-2">
              Search Decks:
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, hero, or type..."
                className="glass-input pl-10 pr-3 py-2 w-full"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="release-filter" className="block text-sm font-medium text-white mb-2">
              Filter by Set/Release:
            </label>
            <select
              id="release-filter"
              value={selectedRelease}
              onChange={(e) => setSelectedRelease(e.target.value)}
              className="glass-input px-3 py-2 w-full"
            >
              <option value="all">All Sets</option>
              {uniqueReleases.map((release) => (
                <option key={release} value={release}>
                  {release}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredDecks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-300 text-lg">
            {searchQuery ? `No decks found matching "${searchQuery}"` : 
             selectedRelease === 'all' ? 'No Unmatched decks found.' : `No decks found in the "${selectedRelease}" set.`}
          </div>
          {(searchQuery || selectedRelease !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRelease('all');
              }}
              className="mt-4 px-4 py-2 glass-button text-white rounded-md"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
      
      {filteredDecks.length > 0 && (
        <div className="text-center text-sm text-gray-300 mb-6">
          Showing {filteredDecks.length} deck{filteredDecks.length !== 1 ? 's' : ''}
          {selectedRelease !== 'all' && ` from "${selectedRelease}" set`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDecks.map((deck) => (
          <div 
            key={deck.id} 
            className="glass-card p-6 rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in"
            onClick={() => setSelectedDeck(deck)}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-3">{deck.name}</h2>
              
              <div className="space-y-2">
                {deck.hero && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">Hero:</span>
                    <span className="text-sm text-white font-medium">{deck.hero}</span>
                  </div>
                )}
                
                {deck.side && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">Side:</span>
                    <span className="text-sm text-white">{deck.side}</span>
                  </div>
                )}
                
                {deck.release && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">Release:</span>
                    <span className="text-sm px-2 py-1 bg-blue-600 text-white rounded-full font-medium">
                      {deck.release}
                    </span>
                  </div>
                )}
                
                {deck.type && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">Type:</span>
                    <span className="text-sm text-white">{deck.type}</span>
                  </div>
                )}
              </div>
              
              {deck.health !== undefined && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {deck.health !== undefined && (
                      <div>
                        <div className="text-xs text-gray-300">Health</div>
                        <div className="text-lg font-bold text-red-400">{deck.health}</div>
                      </div>
                    )}
                    {deck.cardCount !== undefined && (
                      <div>
                        <div className="text-xs text-gray-300">Cards</div>
                        <div className="text-lg font-bold text-blue-400">{deck.cardCount}</div>
                      </div>
                    )}
                    {deck.movement !== undefined && (
                      <div>
                        <div className="text-xs text-gray-300">Movement</div>
                        <div className="text-lg font-bold text-green-400">{deck.movement}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {deck.special && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="text-sm">
                    <span className="font-medium text-gray-200">Special:</span>
                    <p className="text-gray-300 mt-1 text-xs leading-relaxed">{deck.special}</p>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="text-xs text-center text-blue-300 font-medium">
                  Click to view all cards with images
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedDeck && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="glass-modal p-0 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-600 p-6 flex justify-between items-start">
              <div className="flex gap-6">
                {selectedDeck.cards && selectedDeck.cards.length > 0 && (
                  <div className="w-32 h-44 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={selectedDeck.cards[0].image} 
                      alt={selectedDeck.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedDeck.name}</h2>
                  {selectedDeck.hero && <p className="text-lg text-gray-300 mt-1">Hero: {selectedDeck.hero}</p>}
                  {selectedDeck.quote && (
                    <blockquote className="text-sm text-gray-400 italic mt-2">"{selectedDeck.quote}"</blockquote>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedDeck(null)}
                className="text-gray-400 hover:text-white text-2xl font-bold flex-shrink-0 transition-colors"
              >
                ×
              </button>
            </div>
            
            {selectedDeck.special && (
              <div className="p-6 bg-blue-900 bg-opacity-30 border-b border-blue-700">
                <h3 className="font-bold text-blue-200 mb-2">Special Ability</h3>
                <p className="text-blue-100 whitespace-pre-line">{selectedDeck.special}</p>
              </div>
            )}
            
            <div className="p-6">
              {selectedDeck.heroes && selectedDeck.heroes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Hero Stats</h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedDeck.heroes.map((hero, index) => (
                      <div key={index} className="glass-card p-4 rounded-lg">
                        <div className="font-medium text-white">{hero.name}</div>
                        <div className="text-sm text-gray-300 mt-1">
                          <div>HP: {hero.hp}</div>
                          <div>Attack: {hero.attack_type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedDeck.sidekicks && selectedDeck.sidekicks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Sidekicks</h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedDeck.sidekicks.map((sidekick, index) => (
                      <div key={index} className="glass-card p-4 rounded-lg">
                        <div className="font-medium text-white">{sidekick.name}</div>
                        <div className="text-sm text-gray-300 mt-1">
                          <div>HP: {sidekick.hp} (x{sidekick.quantity})</div>
                          <div>Attack: {sidekick.attack_type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedDeck.cards && selectedDeck.cards.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Cards ({selectedDeck.cards.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedDeck.cards.map((card, index) => (
                      <div key={`${card.slug}-${index}`} className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105">
                        <div className="aspect-[2/3] bg-gray-100 relative">
                          <img 
                            src={card.image} 
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.classList.add('bg-gray-200');
                            }}
                          />
                          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                            card.type === 'attack' ? 'bg-red-100 text-red-800' :
                            card.type === 'defense' ? 'bg-green-100 text-green-800' :
                            card.type === 'scheme' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {card.type}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-white mb-2">{card.title}</h4>
                          
                          <div className="flex gap-4 mb-3">
                            {card.value !== undefined && (
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-300">Value:</span>
                                <span className="text-lg font-bold text-white">{card.value}</span>
                              </div>
                            )}
                            
                            {card.boost !== undefined && (
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-300">Boost:</span>
                                <span className="text-lg font-bold text-orange-400">{card.boost}</span>
                              </div>
                            )}
                          </div>
                          
                          {card.basicText && (
                            <div className="text-sm text-gray-300 mb-2">
                              <span className="font-medium">Basic:</span> {card.basicText}
                            </div>
                          )}
                          
                          {card.duringText && (
                            <div className="text-sm text-gray-300 mb-2">
                              <span className="font-medium">During:</span> {card.duringText}
                            </div>
                          )}
                          
                          {card.afterText && (
                            <div className="text-sm text-gray-300 mb-2">
                              <span className="font-medium">After:</span> {card.afterText}
                            </div>
                          )}
                          
                          {card.immediateText && (
                            <div className="text-sm text-gray-300 mb-2">
                              <span className="font-medium">Immediate:</span> {card.immediateText}
                            </div>
                          )}
                          
                          <div className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-600">
                            Quantity: {card.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnmatchedDecks;