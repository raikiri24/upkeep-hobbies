import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import { Tournament, User } from '../types';
import { Calendar, Users, ChevronRight, ChevronLeft, Crown, HelpCircle, X, Layers, Swords, ArrowUpDown } from 'lucide-react';
import { LoadingScreen } from './LoadingScreen';

interface TournamentsProps {
  user: User;
}

export const Tournaments: React.FC<TournamentsProps> = ({ user }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRankingRules, setShowRankingRules] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [tData, uData] = await Promise.all([
      api.getTournaments(),
      api.getAllUsers()
    ]);
    setUsers(uData);
    setLoading(false);
  };

  // Sort tournaments by date whenever data or sort order changes
  const sortedTournaments = useMemo(() => {
    return [...tournaments].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }, [tournaments, sortOrder]);

  const getUser = (id: string) => users.find(u => u.id === id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'glass-button bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'ACTIVE': return 'glass-button bg-green-500/20 text-green-300 border-green-400/30';
      case 'COMPLETED': return 'glass-button bg-gray-500/20 text-gray-300 border-gray-400/30';
      default: return 'glass-button bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getPointsFromScore = (score: string) => {
    // Expects "Wins-Losses" format e.g. "5-0"
    const wins = parseInt(score.split('-')[0], 10);
    return isNaN(wins) ? 0 : wins;
  };

  if (loading) {
    return <LoadingScreen message="Loading tournaments..." size="large" />;
  }

  // Detailed View
  if (selectedTournament) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setSelectedTournament(null)}
          className="flex items-center text-sm text-blue-300 hover:text-cyan-300 transition-colors glass-button px-3 py-2 rounded-lg"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Tournaments
        </button>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-blue-400/30 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                   <span className={`text-xs font-bold px-2 py-1 rounded-full glass-button ${
                     selectedTournament.status === 'COMPLETED' 
                       ? 'bg-gray-500/20 text-gray-300 border-gray-400/30' 
                       : 'bg-green-500/20 text-green-300 border-green-400/30'
                   }`}>
                    {selectedTournament.status}
                  </span>
                  <span className="glass-button px-2 py-1 rounded text-xs font-medium bg-white/10 border border-white/20">
                    Season {selectedTournament.season}
                  </span>
                  <span className="text-blue-200 flex items-center text-sm">
                    <Calendar size={14} className="mr-1" /> {new Date(selectedTournament.date).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">{selectedTournament.name}</h1>
                <p className="text-blue-200 mt-1">{selectedTournament.game} Tournament</p>
              </div>
              <div className="flex items-center glass-button px-4 py-2 rounded-lg bg-white/10 border border-white/20">
                <Users size={20} className="mr-2 text-cyan-300" />
                <span className="font-bold text-xl text-white">{selectedTournament.participants.length}</span>
                <span className="text-blue-300 text-sm ml-1">Players</span>
              </div>
            </div>
          </div>

          <div className="p-0">
             {(!selectedTournament.standings || selectedTournament.standings.length === 0) ? (
               <div className="p-12 text-center text-gray-400">
                 No ranking data available for this tournament yet.
               </div>
             ) : (
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead className="text-blue-200 text-xs uppercase tracking-wider border-b border-blue-400/30">
                     <tr>
                       <th className="px-6 py-4 font-semibold">Rank</th>
                       <th className="px-6 py-4 font-semibold">Player</th>
                       <th className="px-6 py-4 font-semibold">Points Earned</th>
                       <th className="px-6 py-4 font-semibold">Record</th>
                       <th className="px-6 py-4 font-semibold">Notes</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/10">
                     {selectedTournament.standings.sort((a,b) => a.rank - b.rank).map((standing) => {
                       const player = getUser(standing.userId);
                       const isWinner = standing.rank === 1;
                       const points = getPointsFromScore(standing.score);
                       
                       return (
                         <tr key={standing.userId} className={`group hover:bg-blue-500/10 transition-colors ${isWinner ? 'bg-yellow-500/10' : ''}`}>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className={`
                               w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm glass-button
                               ${standing.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 
                                 standing.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                                 standing.rank === 3 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'text-gray-300'}
                             `}>
                               {standing.rank === 1 ? <Crown size={14} /> : standing.rank}
                             </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="flex items-center">
                               <img 
                                 src={player?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${standing.userId}`} 
                                 className="w-10 h-10 rounded-full mr-3 border-2 border-white/30"
                                 alt="Avatar"
                               />
                               <span className={`font-semibold ${isWinner ? 'text-white' : 'text-blue-200'} group-hover:text-cyan-300 transition-colors`}>
                                 {player?.name || 'Unknown Player'}
                               </span>
                             </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap font-bold text-cyan-300">
                             +{points} pts
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                             {standing.score}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                             {standing.notes && (
                               <span className="glass-button px-2 py-1 rounded text-xs">
                                 {standing.notes}
                               </span>
                             )}
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6 relative animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tournament History
          </h2>
          <p className="text-blue-200">Browse past events and standings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center space-x-2 glass-button px-4 py-2 rounded-lg hover:bg-white/20 transition-colors font-medium text-sm text-cyan-300"
            title={`Sort by ${sortOrder === 'newest' ? 'oldest' : 'newest'} first`}
          >
            <ArrowUpDown size={18} />
            <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
          </button>
          <button 
            onClick={() => setShowRankingRules(true)}
            className="flex items-center space-x-2 glass-button px-4 py-2 rounded-lg hover:bg-white/20 transition-colors font-medium text-sm text-cyan-300"
          >
            <HelpCircle size={18} />
            <span>Ranking FAQs</span>
          </button>
        </div>
      </div>

      <div className="glass-card divide-y divide-white/10">
        {sortedTournaments.map((t) => (
          <div 
            key={t.id} 
            onClick={() => setSelectedTournament(t)}
            className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-blue-500/10 transition-colors cursor-pointer group"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(t.status)}`}>
                  {t.status}
                </span>
                <span className="flex items-center text-xs font-bold px-2 py-1 rounded-full glass-button bg-white/10 border border-white/20">
                  <Layers size={10} className="mr-1"/> Season {t.season}
                </span>
                <span className="text-sm text-blue-200 flex items-center">
                  <Calendar size={14} className="mr-1" /> {new Date(t.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{t.name}</h3>
              <p className="text-sm text-blue-200 mt-1">{t.game}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center glass-button px-4 py-2 rounded-lg bg-white/10 border border-white/20">
                <div className="flex items-center justify-center space-x-1 text-cyan-300 mb-1">
                  <Users size={16} />
                  <span className="font-bold">{t.participants.length}</span>
                </div>
                <p className="text-[10px] uppercase font-bold text-blue-300">Players</p>
              </div>

              {t.standings && t.standings.length > 0 && (
                <div className="hidden sm:flex -space-x-3">
                   {t.standings.slice(0, 3).map(s => (
                     <img 
                        key={s.userId}
                        src={getUser(s.userId)?.avatar} 
                        className="w-10 h-10 rounded-full border-2 border-white/30 shadow-lg"
                        title={getUser(s.userId)?.name}
                        alt="Winner"
                     />
                   ))}
                </div>
              )}

              <div className="p-2 text-blue-300 group-hover:text-cyan-300 transition-colors">
                <ChevronRight size={24} />
              </div>
            </div>
          </div>
        ))}
        
        {tournaments.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No tournaments found.
          </div>
        )}
      </div>

      {/* Ranking Rules Modal */}
      {showRankingRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowRankingRules(false)}
          />
          <div className="relative glass-modal w-full max-w-lg overflow-hidden transform transition-all animate-scale-in">
            <div className="p-6 border-b border-blue-400/30 flex justify-between items-center bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
              <h3 className="text-xl font-bold text-white">Tournament Point System</h3>
              <button 
                onClick={() => setShowRankingRules(false)}
                className="p-2 glass-button hover:bg-white/30 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-blue-200 mb-6">
                Points are awarded based on match performance in official tournaments. These points contribute to Player of Week leaderboard.
              </p>

              <div className="glass-card border border-blue-400/30 overflow-hidden">
                <div className="p-6 flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                     <div className="p-3 glass-button bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full">
                       <Swords size={24} />
                     </div>
                     <div>
                       <h4 className="font-bold text-white">Per Match Win</h4>
                       <p className="text-xs text-blue-200">Every match won in an official bracket</p>
                     </div>
                   </div>
                   <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                     +1 Point
                   </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-blue-300 text-center">
                * Byes and technical wins count towards your score.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};