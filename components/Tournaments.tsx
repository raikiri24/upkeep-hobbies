import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Tournament, User } from '../types';
import { Calendar, Users, ChevronRight, ChevronLeft, Crown, HelpCircle, X, Layers, Swords } from 'lucide-react';

interface TournamentsProps {
  user: User;
}

export const Tournaments: React.FC<TournamentsProps> = ({ user }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRankingRules, setShowRankingRules] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [tData, uData] = await Promise.all([
      api.getTournaments(),
      api.getAllUsers()
    ]);
    setTournaments(tData);
    setUsers(uData);
    setLoading(false);
  };

  const getUser = (id: string) => users.find(u => u.id === id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'bg-blue-100 text-blue-700';
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'COMPLETED': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPointsFromScore = (score: string) => {
    // Expects "Wins-Losses" format e.g. "5-0"
    const wins = parseInt(score.split('-')[0], 10);
    return isNaN(wins) ? 0 : wins;
  };

  // Detailed View
  if (selectedTournament) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedTournament(null)}
          className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Tournaments
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-slate-900 to-indigo-900 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                   <span className={`text-xs font-bold px-2 py-1 rounded-full ${selectedTournament.status === 'COMPLETED' ? 'bg-white/20 text-white' : 'bg-green-400 text-green-900'}`}>
                    {selectedTournament.status}
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm border border-white/10">
                    Season {selectedTournament.season}
                  </span>
                  <span className="text-indigo-200 flex items-center text-sm">
                    <Calendar size={14} className="mr-1" /> {selectedTournament.date}
                  </span>
                </div>
                <h1 className="text-3xl font-bold">{selectedTournament.name}</h1>
                <p className="text-indigo-200 mt-1">{selectedTournament.game} Tournament</p>
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Users size={20} className="mr-2" />
                <span className="font-bold text-xl">{selectedTournament.participants.length}</span>
                <span className="text-indigo-300 text-sm ml-1">Players</span>
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
                 <table className="w-full text-left">
                   <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                     <tr>
                       <th className="px-6 py-4 font-semibold">Rank</th>
                       <th className="px-6 py-4 font-semibold">Player</th>
                       <th className="px-6 py-4 font-semibold">Points Earned</th>
                       <th className="px-6 py-4 font-semibold">Record</th>
                       <th className="px-6 py-4 font-semibold">Notes</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {selectedTournament.standings.sort((a,b) => a.rank - b.rank).map((standing) => {
                       const player = getUser(standing.userId);
                       const isWinner = standing.rank === 1;
                       const points = getPointsFromScore(standing.score);
                       
                       return (
                         <tr key={standing.userId} className={`group hover:bg-gray-50 transition-colors ${isWinner ? 'bg-yellow-50/30' : ''}`}>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className={`
                               w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
                               ${standing.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 
                                 standing.rank === 2 ? 'bg-gray-200 text-gray-700' :
                                 standing.rank === 3 ? 'bg-orange-100 text-orange-700' : 'text-gray-500'}
                             `}>
                               {standing.rank === 1 ? <Crown size={14} /> : standing.rank}
                             </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="flex items-center">
                               <img 
                                 src={player?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${standing.userId}`} 
                                 className="w-10 h-10 rounded-full mr-3 border border-gray-200 bg-gray-50"
                                 alt="Avatar"
                               />
                               <span className={`font-semibold ${isWinner ? 'text-gray-900' : 'text-gray-700'}`}>
                                 {player?.name || 'Unknown Player'}
                               </span>
                             </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap font-bold text-indigo-600">
                             +{points} pts
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                             {standing.score}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                             {standing.notes && (
                               <span className="px-2 py-1 bg-gray-100 rounded text-xs">
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
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tournament History</h2>
          <p className="text-gray-500">Browse past events and standings.</p>
        </div>
        <button 
          onClick={() => setShowRankingRules(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
        >
          <HelpCircle size={18} />
          <span>Ranking FAQs</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
        {tournaments.map((t) => (
          <div 
            key={t.id} 
            onClick={() => setSelectedTournament(t)}
            className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(t.status)}`}>
                  {t.status}
                </span>
                <span className="flex items-center text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                  <Layers size={10} className="mr-1"/> Season {t.season}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar size={14} className="mr-1" /> {t.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{t.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{t.game}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-1 text-gray-700 mb-1">
                  <Users size={16} />
                  <span className="font-bold">{t.participants.length}</span>
                </div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Players</p>
              </div>

              {t.standings && t.standings.length > 0 && (
                <div className="hidden sm:flex -space-x-3">
                   {t.standings.slice(0, 3).map(s => (
                     <img 
                        key={s.userId}
                        src={getUser(s.userId)?.avatar} 
                        className="w-10 h-10 rounded-full border-2 border-white ring-1 ring-gray-100"
                        title={getUser(s.userId)?.name}
                        alt="Winner"
                     />
                   ))}
                </div>
              )}

              <div className="p-2 text-gray-300 group-hover:text-indigo-500 transition-colors">
                <ChevronRight size={24} />
              </div>
            </div>
          </div>
        ))}
        
        {tournaments.length === 0 && !loading && (
          <div className="p-12 text-center text-gray-500">
            No tournaments found.
          </div>
        )}
      </div>

      {/* Ranking Rules Modal */}
      {showRankingRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowRankingRules(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Tournament Point System</h3>
              <button 
                onClick={() => setShowRankingRules(false)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-6">
                Points are awarded based on match performance in official tournaments. These points contribute to the Player of the Week leaderboard.
              </p>

              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="p-6 flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                     <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                       <Swords size={24} />
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-900">Per Match Win</h4>
                       <p className="text-xs text-gray-500">Every match won in an official bracket</p>
                     </div>
                   </div>
                   <div className="text-2xl font-black text-indigo-600">
                     +1 Point
                   </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-gray-400 text-center">
                * Byes and technical wins count towards your score.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};