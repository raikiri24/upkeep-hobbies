import React from 'react';
import { User } from '../types';
import { Trophy, Star, Swords, Medal } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  // Mock stats
  const stats = {
    wins: 12,
    losses: 5,
    draws: 2,
  };

  const chartData = [
    { name: 'Wins', value: stats.wins, color: '#10b981' },
    { name: 'Losses', value: stats.losses, color: '#ef4444' },
    { name: 'Draws', value: stats.draws, color: '#f59e0b' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-24 h-24 rounded-full border-4 border-blue-50"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <div className="flex items-center justify-center sm:justify-start space-x-4 mt-3">
            <span className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <Trophy size={14} className="mr-1 text-yellow-500" /> Rank #42
            </span>
            <span className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <Star size={14} className="mr-1 text-blue-500" /> Level 12
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Swords size={20} className="mr-2 text-gray-400" />
            Combat Record
          </h3>
          <div className="flex items-center justify-center h-48">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
             {chartData.map(d => (
               <div key={d.name} className="flex items-center">
                 <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: d.color }} />
                 <span className="text-sm text-gray-600">{d.name}: {d.value}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Medal size={20} className="mr-2 text-gray-400" />
            Recent Badges
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="p-2 bg-yellow-100 rounded-full mr-4 text-yellow-600">
                <Trophy size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Tournament Victor</h4>
                <p className="text-xs text-gray-500">Won "Friday Night Magic"</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
               <div className="p-2 bg-purple-100 rounded-full mr-4 text-purple-600">
                <Swords size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Sharpshooter</h4>
                <p className="text-xs text-gray-500">10 Wins Streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};