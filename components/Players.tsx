import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import { User } from '../types';
import { Mail, Trophy, Search, ArrowUpDown } from 'lucide-react';

type SortField = 'name' | 'email' | 'totalFinishes' | 'spinFinishes' | 'overFinishes' | 'burstFinishes' | 'extremeFinishes';
type SortDirection = 'asc' | 'desc';

export const Players: React.FC = () => {
  const [players, setPlayers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await api.getAllUsers();
      setPlayers(data);
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  const filteredPlayers = useMemo(() => {
    let filtered = players;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = players.filter(player => 
        player.name.toLowerCase().includes(query) ||
        player.email.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'totalFinishes':
          aValue = totalFinishes(a);
          bValue = totalFinishes(b);
          break;
        case 'spinFinishes':
          aValue = a.beybladeStats?.spinFinishes || 0;
          bValue = b.beybladeStats?.spinFinishes || 0;
          break;
        case 'overFinishes':
          aValue = a.beybladeStats?.overFinishes || 0;
          bValue = b.beybladeStats?.overFinishes || 0;
          break;
        case 'burstFinishes':
          aValue = a.beybladeStats?.burstFinishes || 0;
          bValue = b.beybladeStats?.burstFinishes || 0;
          break;
        case 'extremeFinishes':
          aValue = a.beybladeStats?.extremeFinishes || 0;
          bValue = b.beybladeStats?.extremeFinishes || 0;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }, [players, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading players...</div>;

  const totalFinishes = (player: User) => {
    if (!player.beybladeStats) return 0;
    return player.beybladeStats.spinFinishes + player.beybladeStats.overFinishes + 
           player.beybladeStats.burstFinishes + player.beybladeStats.extremeFinishes;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Players</h2>
        <p className="text-gray-500">View all players and their Beyblade statistics.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-semibold">
                All Players ({filteredPlayers.length}{searchQuery && ` of ${players.length}`})
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 self-center">Sort by:</span>
              {[
                { field: 'name' as SortField, label: 'Name' },
                { field: 'totalFinishes' as SortField, label: 'Total Finishes' },
                { field: 'spinFinishes' as SortField, label: 'Spin' },
                { field: 'overFinishes' as SortField, label: 'Over' },
                { field: 'burstFinishes' as SortField, label: 'Burst' },
                { field: 'extremeFinishes' as SortField, label: 'Extreme' },
              ].map(({ field, label }) => (
                <button
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                    sortField === field
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {label}
                  <ArrowUpDown size={14} className={sortField === field && sortDirection === 'desc' ? 'rotate-180' : ''} />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={player.avatar} 
                  alt={player.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{player.name}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail size={12} className="mr-1" />
                    {player.email}
                  </div>
                </div>
              </div>
              
              {player.beybladeStats && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Trophy size={14} className="mr-1 text-yellow-500" />
                      Total Finishes
                    </div>
                    <span className="font-semibold">{totalFinishes(player)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Spin</span>
                      <span className="font-medium">{player.beybladeStats.spinFinishes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Over</span>
                      <span className="font-medium">{player.beybladeStats.overFinishes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Burst</span>
                      <span className="font-medium">{player.beybladeStats.burstFinishes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Extreme</span>
                      <span className="font-medium">{player.beybladeStats.extremeFinishes}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};