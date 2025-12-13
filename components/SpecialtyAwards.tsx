import React, { useState, useMemo, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';
import { Award, TrendingUp, Target, Zap, Crown, Medal, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { LoadingScreen } from './LoadingScreen';

interface PlayerWithStats extends User {
  totalFinishes: number;
  finishRate: number;
}

const SpecialtyAwards: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getAllUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const playersWithStats = useMemo(() => {
    return users.map(player => {
      const stats = player.beybladeStats || { spinFinishes: 0, burstFinishes: 0, overFinishes: 0, extremeFinishes: 0 };
      const totalFinishes = stats.spinFinishes + stats.burstFinishes + stats.overFinishes + stats.extremeFinishes;
      
      return {
        ...player,
        totalFinishes,
        finishRate: totalFinishes
      } as PlayerWithStats;
    });
  }, [users]);

  const getTopPlayers = (category: string, limit: number = 3) => {
    const sorted = [...playersWithStats].sort((a, b) => {
      switch (category) {
        case 'spin':
          return (b.beybladeStats?.spinFinishes || 0) - (a.beybladeStats?.spinFinishes || 0);
        case 'burst':
          return (b.beybladeStats?.burstFinishes || 0) - (a.beybladeStats?.burstFinishes || 0);
        case 'over':
          return (b.beybladeStats?.overFinishes || 0) - (a.beybladeStats?.overFinishes || 0);
        case 'extreme':
          return (b.beybladeStats?.extremeFinishes || 0) - (a.beybladeStats?.extremeFinishes || 0);
        case 'total':
          return b.totalFinishes - a.totalFinishes;
        default:
          return 0;
      }
    });
    return sorted.slice(0, limit);
  };

  const awardCategories = [
    { id: 'spin', name: 'Spin Finish Master', icon: Target, color: 'from-blue-500 to-cyan-500', description: 'Most spin finishes' },
    { id: 'burst', name: 'Burst Finish Specialist', icon: Zap, color: 'from-orange-500 to-red-500', description: 'Most burst finishes' },
    { id: 'over', name: 'Over Finish Expert', icon: TrendingUp, color: 'from-green-500 to-emerald-500', description: 'Most over finishes' },
    { id: 'extreme', name: 'Extreme Finish Legend', icon: Crown, color: 'from-purple-500 to-pink-500', description: 'Most extreme finishes' },
    { id: 'total', name: 'Total Finish Champion', icon: Medal, color: 'from-yellow-500 to-amber-500', description: 'Most total finishes' }
  ];

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const filteredPlayers = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? playersWithStats 
      : getTopPlayers(selectedCategory, playersWithStats.length);

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    return filtered;
  }, [selectedCategory, playersWithStats, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);
  const paginatedPlayers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPlayers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPlayers, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  if (loading) {
    return <LoadingScreen message="Loading specialty awards..." size="large" />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
          Specialty Awards
        </h1>
        <p className="text-gray-300">Per-player statistics and achievements</p>
      </div>

      {/* Award Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {awardCategories.map((category) => {
          const topPlayers = getTopPlayers(category.id, 3);
          const Icon = category.icon;
          
          return (
            <div key={category.id} className="glass-card p-6 rounded-xl hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <Award className="text-yellow-400" size={20} />
              </div>
              
              <h3 className="font-bold text-lg mb-1">{category.name}</h3>
              <p className="text-xs text-gray-400 mb-4">{category.description}</p>
              
              <div className="space-y-2">
                {topPlayers.map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getMedalEmoji(index + 1)}</span>
                      <img src={player.avatar} alt={player.name} className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-medium truncate">{player.name}</span>
                    </div>
                    <span className="text-sm font-bold text-cyan-400">
                      {category.id === 'total' ? player.totalFinishes :
                       category.id === 'spin' ? player.beybladeStats?.spinFinishes || 0 :
                       category.id === 'burst' ? player.beybladeStats?.burstFinishes || 0 :
                       category.id === 'over' ? player.beybladeStats?.overFinishes || 0 :
                       player.beybladeStats?.extremeFinishes || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Stats Table */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold">Detailed Player Statistics</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="glass-button pl-10 pr-4 py-2 rounded-lg text-sm bg-white/10 border border-white/20 focus:outline-none focus:border-cyan-400 w-full sm:w-64"
              />
            </div>
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
              className="glass-button px-4 py-2 rounded-lg text-sm bg-white/10 border border-white/20 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Players</option>
              {awardCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-semibold">Player</th>
                <th className="text-center py-3 px-4 font-semibold">Spin</th>
                <th className="text-center py-3 px-4 font-semibold">Burst</th>
                <th className="text-center py-3 px-4 font-semibold">Over</th>
                <th className="text-center py-3 px-4 font-semibold">Extreme</th>
                <th className="text-center py-3 px-4 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPlayers.map((player: PlayerWithStats) => (
                <tr key={player.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full" />
                      <span className="font-medium">{player.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold">
                      {player.beybladeStats?.spinFinishes || 0}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-orange-500/20 text-orange-400 text-sm font-bold">
                      {player.beybladeStats?.burstFinishes || 0}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm font-bold">
                      {player.beybladeStats?.overFinishes || 0}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-sm font-bold">
                      {player.beybladeStats?.extremeFinishes || 0}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 text-sm font-bold">
                      {player.totalFinishes}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            <div className="text-sm text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPlayers.length)} of {filteredPlayers.length} players
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="glass-button p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`glass-button px-3 py-1 rounded-lg text-sm transition-colors ${
                        currentPage === pageNum 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                          : 'hover:bg-white/20'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="glass-button p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtyAwards;