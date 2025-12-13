import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { api } from '../services/api';
import { User } from '../types';
import { Mail, Trophy, Search, ArrowUpDown, X, Users, BarChart3 } from 'lucide-react';
import { LoadingScreen } from './LoadingScreen';

// Lazy load the charts for better performance
const LazyRadarChart = lazy(() => import('./charts/RadarChart').then(module => ({ default: module.LazyRadarChart })));
const LazyBarChart = lazy(() => import('./charts/BarChart').then(module => ({ default: module.LazyBarChart })));

type SortField = 'name' | 'email' | 'totalFinishes' | 'spinFinishes' | 'overFinishes' | 'burstFinishes' | 'extremeFinishes';
type SortDirection = 'asc' | 'desc';

export const Players: React.FC = () => {
  const [players, setPlayers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedPlayer, setSelectedPlayer] = useState<User | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePlayers, setComparePlayers] = useState<[User | null, User | null]>([null, null]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await api.getAllUsers();
      setPlayers(data);
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  const totalFinishes = useCallback((player: User) => {
    if (!player.beybladeStats) return 0;
    return player.beybladeStats.spinFinishes + player.beybladeStats.overFinishes + 
           player.beybladeStats.burstFinishes + player.beybladeStats.extremeFinishes;
  }, []);

  const filteredPlayers = useMemo(() => {
    // Early return if no players
    if (!players.length) return [];
    
    let filtered = players;
    
    // Apply search filter - optimized with early return
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = players.filter(player => 
        player.name.toLowerCase().includes(query) ||
        player.email.toLowerCase().includes(query)
      );
    }
    
    // Pre-compute values for sorting
    const getValue = (player: User, field: SortField) => {
      switch (field) {
        case 'name':
          return player.name.toLowerCase();
        case 'email':
          return player.email.toLowerCase();
        case 'totalFinishes':
          return totalFinishes(player);
        case 'spinFinishes':
          return player.beybladeStats?.spinFinishes || 0;
        case 'overFinishes':
          return player.beybladeStats?.overFinishes || 0;
        case 'burstFinishes':
          return player.beybladeStats?.burstFinishes || 0;
        case 'extremeFinishes':
          return player.beybladeStats?.extremeFinishes || 0;
        default:
          return player.name.toLowerCase();
      }
    };
    
    // Apply sorting with optimized comparison
    return filtered.sort((a, b) => {
      const aValue = getValue(a, sortField);
      const bValue = getValue(b, sortField);
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }, [players, searchQuery, sortField, sortDirection, totalFinishes]);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  const getRadarData = useCallback((player: User) => {
    if (!player.beybladeStats) return [];
    
    const { spinFinishes, burstFinishes, overFinishes, extremeFinishes } = player.beybladeStats;
    return [
      { stat: 'Spin', value: spinFinishes },
      { stat: 'Burst', value: burstFinishes },
      { stat: 'Over', value: overFinishes },
      { stat: 'Extreme', value: extremeFinishes },
    ];
  }, []);

  const getBestCategories = useCallback((player: User) => {
    if (!player.beybladeStats) return '';
    
    const { spinFinishes, burstFinishes, overFinishes, extremeFinishes } = player.beybladeStats;
    const max = Math.max(spinFinishes, burstFinishes, overFinishes, extremeFinishes);
    const bestCategories = [];
    
    if (spinFinishes === max) bestCategories.push('🌀 Spin');
    if (burstFinishes === max) bestCategories.push('💥 Burst');
    if (overFinishes === max) bestCategories.push('⚡ Over');
    if (extremeFinishes === max) bestCategories.push('🔥 Extreme');
    
    return bestCategories.join(' • ');
  }, []);

  const addToCompare = useCallback((player: User) => {
    if (!compareMode) return;
    
    setComparePlayers(prev => {
      if (!prev[0]) {
        return [player, null];
      } else if (!prev[1] && prev[0].id !== player.id) {
        return [prev[0], player];
      } else if (prev[0].id === player.id) {
        return [null, prev[1]];
      } else if (prev[1] && prev[1].id === player.id) {
        return [prev[0], null];
      }
      return prev;
    });
  }, [compareMode]);

  const removeFromCompare = useCallback((index: number) => {
    setComparePlayers(prev => {
      const newPlayers = [...prev] as [User | null, User | null];
      newPlayers[index] = null;
      return newPlayers;
    });
  }, []);

  const getComparisonData = useMemo(() => {
    if (!comparePlayers[0] || !comparePlayers[1]) return [];
    
    const [player1, player2] = comparePlayers;
    const p1Stats = player1.beybladeStats || {};
    const p2Stats = player2.beybladeStats || {};
    
    return [
      { stat: 'Spin', [player1.name]: p1Stats.spinFinishes || 0, [player2.name]: p2Stats.spinFinishes || 0 },
      { stat: 'Burst', [player1.name]: p1Stats.burstFinishes || 0, [player2.name]: p2Stats.burstFinishes || 0 },
      { stat: 'Over', [player1.name]: p1Stats.overFinishes || 0, [player2.name]: p2Stats.overFinishes || 0 },
      { stat: 'Extreme', [player1.name]: p1Stats.extremeFinishes || 0, [player2.name]: p2Stats.extremeFinishes || 0 },
    ];
  }, [comparePlayers]);

  if (loading) return <LoadingScreen message="Loading players..." size="large" />;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Players
        </h1>
        <p className="text-lg text-gray-200">Discover and track all Beyblade players</p>
      </div>

      {/* Search and Filter Section */}
      <div className="glass-card p-4 sm:p-6 animate-fade-in">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-300 flex items-center" size={16} />
                <input
                  type="text"
                  placeholder="Search players by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-white placeholder-blue-200 focus:outline-none text-sm sm:text-base"
                />
              </div>
            </div>
            
            <button
              onClick={() => {
                setCompareMode(prev => !prev);
                setComparePlayers([null, null]);
              }}
              className={`
                glass-button px-4 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap
                ${compareMode 
                  ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400/40 text-white' 
                  : 'text-blue-200 hover:text-white hover:bg-blue-500/10'
                }
              `}
            >
              <BarChart3 size={18} />
              {compareMode ? 'Comparing' : 'Compare Players'}
            </button>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end space-x-4">
            <div className="text-sm text-blue-200">
              <span className="font-semibold text-white">{filteredPlayers.length}</span>
              {searchQuery && ` of ${players.length}`} players
            </div>
          </div>
        </div>
        
        {/* Sort Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
          <span className="text-sm text-blue-200 self-center font-medium">Sort by:</span>
          {[
            { field: 'name' as SortField, label: 'Name', icon: '👤' },
            { field: 'totalFinishes' as SortField, label: 'Total Finishes', icon: '🏆' },
            { field: 'spinFinishes' as SortField, label: 'Spin', icon: '🌀' },
            { field: 'overFinishes' as SortField, label: 'Over', icon: '⚡' },
            { field: 'burstFinishes' as SortField, label: 'Burst', icon: '💥' },
            { field: 'extremeFinishes' as SortField, label: 'Extreme', icon: '🔥' },
          ].map(({ field, label, icon }) => (
            <button
              key={field}
              onClick={() => handleSort(field)}
              className={`
                glass-button px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2
                ${sortField === field
                  ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-400/40 text-white'
                  : 'text-blue-200 hover:text-white hover:bg-blue-500/10'
                }
              `}
            >
              <span>{icon}</span>
              {label}
              <ArrowUpDown size={14} className={sortField === field && sortDirection === 'desc' ? 'rotate-180' : ''} />
            </button>
          ))}
      </div>
      

      </div>

      {/* Compare Mode Selection */}
      {compareMode && (
        <div className="glass-card p-4 sm:p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
              <Users className="mr-2 text-blue-400" />
              Select Players to Compare
            </h3>
            <div className="text-sm text-blue-200">
              {comparePlayers.filter(p => p !== null).length}/2 selected
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`glass-card p-4 border-2 transition-all ${comparePlayers[0] ? 'border-green-400/50 bg-green-500/10' : 'border-dashed border-white/20'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-1">Player 1</p>
                  {comparePlayers[0] ? (
                    <div className="flex items-center space-x-2">
                      <img src={comparePlayers[0].avatar} alt={comparePlayers[0].name} className="w-8 h-8 rounded-full" />
                      <span className="text-white font-medium">{comparePlayers[0].name}</span>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Click a player to select</p>
                  )}
                </div>
                {comparePlayers[0] && (
                  <button
                    onClick={() => removeFromCompare(0)}
                    className="glass-button p-1 rounded-lg hover:bg-red-500/20 text-red-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className={`glass-card p-4 border-2 transition-all ${comparePlayers[1] ? 'border-green-400/50 bg-green-500/10' : 'border-dashed border-white/20'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-1">Player 2</p>
                  {comparePlayers[1] ? (
                    <div className="flex items-center space-x-2">
                      <img src={comparePlayers[1].avatar} alt={comparePlayers[1].name} className="w-8 h-8 rounded-full" />
                      <span className="text-white font-medium">{comparePlayers[1].name}</span>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Click a player to select</p>
                  )}
                </div>
                {comparePlayers[1] && (
                  <button
                    onClick={() => removeFromCompare(1)}
                    className="glass-button p-1 rounded-lg hover:bg-red-500/20 text-red-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {comparePlayers[0] && comparePlayers[1] && (
            <div className="mt-6 p-4 glass-card bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-400/30">
              <h4 className="text-lg font-bold text-white mb-4 text-center">Stat Comparison</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart Comparison */}
                <div className="glass-card p-4">
                  <h5 className="text-sm font-medium text-gray-300 mb-3 text-center">Finish Types Comparison</h5>
                  <Suspense fallback={<div className="h-48 flex items-center justify-center text-gray-400">Loading chart...</div>}>
                    <LazyBarChart 
                      data={getComparisonData} 
                      player1Name={comparePlayers[0]!.name}
                      player2Name={comparePlayers[1]!.name}
                    />
                  </Suspense>
                </div>
                
                {/* Stats Summary */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-gray-300 mb-3">Head to Head Stats</h5>
                  {useMemo(() => [
                    { label: 'Total Finishes', getValue: (p: User) => totalFinishes(p) },
                    { label: 'Spin Finishes', getValue: (p: User) => p.beybladeStats?.spinFinishes || 0 },
                    { label: 'Burst Finishes', getValue: (p: User) => p.beybladeStats?.burstFinishes || 0 },
                    { label: 'Over Finishes', getValue: (p: User) => p.beybladeStats?.overFinishes || 0 },
                    { label: 'Extreme Finishes', getValue: (p: User) => p.beybladeStats?.extremeFinishes || 0 },
                  ], [totalFinishes]).map(({ label, getValue }) => {
                    const p1Value = getValue(comparePlayers[0]!);
                    const p2Value = getValue(comparePlayers[1]!);
                    const p1Wins = p1Value > p2Value;
                    
                    return (
                      <div key={label} className="glass-card p-3">
                        <div className="text-xs text-gray-400 mb-2">{label}</div>
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center space-x-2 ${p1Wins ? 'text-green-400' : 'text-gray-300'}`}>
                            <span className="text-sm font-medium">{comparePlayers[0]!.name}</span>
                            <span className="font-bold">{p1Value}</span>
                            {p1Wins && <Trophy size={12} />}
                          </div>
                          <div className="text-gray-500">vs</div>
                          <div className={`flex items-center space-x-2 ${!p1Wins && p2Value > p1Value ? 'text-green-400' : 'text-gray-300'}`}>
                            <span className="font-bold">{p2Value}</span>
                            <span className="text-sm font-medium">{comparePlayers[1]!.name}</span>
                            {!p1Wins && p2Value > p1Value && <Trophy size={12} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredPlayers.map((player, index) => (
          <div 
            key={player.id} 
            className={`
              glass-card p-4 sm:p-6 hover:scale-105 transition-all duration-300 cursor-pointer animate-scale-in relative
              ${compareMode ? 'hover:border-green-400/50' : ''}
              ${comparePlayers[0]?.id === player.id || comparePlayers[1]?.id === player.id ? 'border-green-400/50 bg-green-500/10' : ''}
            `}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => compareMode ? addToCompare(player) : setSelectedPlayer(player)}
          >
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              {compareMode && (
                <div className="absolute top-2 right-2 z-10">
                  {comparePlayers[0]?.id === player.id && (
                    <div className="glass-button bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      P1
                    </div>
                  )}
                  {comparePlayers[1]?.id === player.id && (
                    <div className="glass-button bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      P2
                    </div>
                  )}
                </div>
              )}
              
              <div className="relative">
                <img 
                  src={player.avatar} 
                  alt={player.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-white/30 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center border-2 border-white/30">
                  <Trophy size={12} className="sm:w-4 sm:h-4 text-white flex-shrink-0" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{player.name}</h3>
                <div className="flex items-center justify-center text-xs sm:text-sm text-blue-200">
                  <Mail size={12} className="sm:w-3 sm:h-3 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">{player.email}</span>
                  <span className="sm:hidden truncate max-w-[120px]">{player.email}</span>
                </div>
              </div>
              
              {player.beybladeStats && (
                <div className="w-full space-y-3 sm:space-y-4">
                  <div className="glass-button p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-blue-200">Total Finishes</span>
                      <span className="text-lg sm:text-xl font-bold text-white flex-shrink-0 ml-2">{totalFinishes(player)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs">
                    <div className="glass-button p-1 sm:p-2 rounded-lg text-center">
                      <div className="text-blue-300 text-xs">🌀 Spin</div>
                      <div className="font-bold text-white text-sm sm:text-base">{player.beybladeStats.spinFinishes}</div>
                    </div>
                    <div className="glass-button p-1 sm:p-2 rounded-lg text-center">
                      <div className="text-blue-300 text-xs">💥 Burst</div>
                      <div className="font-bold text-white text-sm sm:text-base">{player.beybladeStats.burstFinishes}</div>
                    </div>
                    <div className="glass-button p-1 sm:p-2 rounded-lg text-center">
                      <div className="text-blue-300 text-xs">⚡ Over</div>
                      <div className="font-bold text-white text-sm sm:text-base">{player.beybladeStats.overFinishes}</div>
                    </div>
                    <div className="glass-button p-1 sm:p-2 rounded-lg text-center">
                      <div className="text-blue-300 text-xs">🔥 Extreme</div>
                      <div className="font-bold text-white text-sm sm:text-base">{player.beybladeStats.extremeFinishes}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in">
          <div className="glass-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="p-4 sm:p-8 border-b border-white/20 relative">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 glass-button p-2 sm:p-3 rounded-xl hover:bg-white/20 transition-colors z-10"
              >
                <X size={20} className="sm:w-5 sm:h-5 text-white flex-shrink-0" />
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="relative">
                    <img 
                      src={selectedPlayer.avatar} 
                      alt={selectedPlayer.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 border-white/30 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center border-2 border-white/30">
                      <Trophy size={12} className="sm:w-4 sm:h-4 text-white flex-shrink-0" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedPlayer.name}</h3>
                    <p className="text-gray-300 flex items-center mt-1 text-sm sm:text-base">
                      <Mail size={14} className="sm:w-4 sm:h-4 mr-2" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{selectedPlayer.email}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-4 sm:p-8">
              {selectedPlayer.beybladeStats ? (
                <div className="space-y-6 sm:space-y-8">
                  {/* Radar Chart */}
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Beyblade Statistics</h4>
                    <div className="glass-card p-4 sm:p-6 h-80 sm:h-96">
                      <Suspense fallback={<div className="h-full flex items-center justify-center text-gray-400">Loading chart...</div>}>
                        <LazyRadarChart 
                          data={getRadarData(selectedPlayer)} 
                          playerName={selectedPlayer.name} 
                        />
                      </Suspense>
                    </div>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-card p-4 sm:p-6 text-center">
                      <div className="text-sm text-gray-300 mb-2">Total Finishes</div>
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {totalFinishes(selectedPlayer)}
                      </div>
                    </div>
                    <div className="glass-card p-4 sm:p-6 text-center">
                      <div className="text-sm text-gray-300 mb-2">Best Categories</div>
                      <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        {getBestCategories(selectedPlayer)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Individual Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="glass-card p-4 flex items-center justify-between min-h-[60px]">
                      <span className="text-sm font-medium text-gray-200 flex items-center flex-1">
                        <span className="mr-2">🌀</span> Spin Finishes
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-blue-400 flex-shrink-0 ml-2">{selectedPlayer.beybladeStats.spinFinishes}</span>
                    </div>
                    <div className="glass-card p-4 flex items-center justify-between min-h-[60px]">
                      <span className="text-sm font-medium text-gray-200 flex items-center flex-1">
                        <span className="mr-2">💥</span> Burst Finishes
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-green-400 flex-shrink-0 ml-2">{selectedPlayer.beybladeStats.burstFinishes}</span>
                    </div>
                    <div className="glass-card p-4 flex items-center justify-between min-h-[60px]">
                      <span className="text-sm font-medium text-gray-200 flex items-center flex-1">
                        <span className="mr-2">⚡</span> Over Finishes
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-yellow-400 flex-shrink-0 ml-2">{selectedPlayer.beybladeStats.overFinishes}</span>
                    </div>
                    <div className="glass-card p-4 flex items-center justify-between min-h-[60px]">
                      <span className="text-sm font-medium text-gray-200 flex items-center flex-1">
                        <span className="mr-2">🔥</span> Extreme Finishes
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-purple-400 flex-shrink-0 ml-2">{selectedPlayer.beybladeStats.extremeFinishes}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <Trophy size={64} className="mx-auto mb-6 text-gray-400" />
                  <p className="text-xl text-gray-300">No Beyblade statistics available for this player.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};