import React from 'react';
import { Wrench, Clock, AlertCircle, Trophy, Users } from 'lucide-react';

const PBBLTeamUpdates: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white tracking-tight neon-text-cyan mb-4">
          PBBL Team Updates
        </h2>
        <p className="text-cyan-300 mt-2 text-lg font-mono">
          Philippine Beyblade League team standings and statistics
        </p>
      </div>

      {/* Under Construction Card */}
      <div className="glass-card overflow-hidden animate-scale-in">
        <div className="p-8 md:p-12">
          <div className="text-center space-y-6">
            {/* Construction Icon */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 glass-button cyber-border mx-auto animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full animate-pulse"></div>
              <Wrench className="relative text-amber-400 neon-text-cyan" size={48} strokeWidth={2} />
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 glass-button cyber-border text-amber-300 px-4 py-2 rounded-full border border-amber-400/30">
              <Clock size={16} className="animate-pulse" />
              <span className="font-semibold font-mono">Under Construction</span>
            </div>

            {/* Main Message */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white neon-text-cyan glitch-text" data-text="Coming Soon!">
                Coming Soon!
              </h3>
              <p className="text-cyan-300 max-w-md mx-auto">
                We're working hard to bring you comprehensive PBBL team updates, including:
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
              <div className="glass-button cyber-border flex flex-col items-center space-y-2 p-4 group hover:scale-105 transition-all">
                <Trophy className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={24} />
                <span className="text-sm font-medium text-cyan-200 font-mono">Team Standings</span>
              </div>
              <div className="glass-button cyber-border flex flex-col items-center space-y-2 p-4 group hover:scale-105 transition-all">
                <Users className="text-green-400 group-hover:text-green-300 transition-colors" size={24} />
                <span className="text-sm font-medium text-cyan-200 font-mono">Player Statistics</span>
              </div>
              <div className="glass-button cyber-border flex flex-col items-center space-y-2 p-4 group hover:scale-105 transition-all">
                <Clock className="text-magenta-400 group-hover:text-magenta-300 transition-colors" size={24} />
                <span className="text-sm font-medium text-cyan-200 font-mono">Match Schedules</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="glass-button cyber-border rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-cyan-400 mt-0.5 animate-pulse" size={20} />
                <div className="text-left">
                  <p className="text-sm font-medium text-cyan-200 font-mono">
                    While you wait, check out other features:
                  </p>
                  <ul className="text-sm text-cyan-300 mt-1 space-y-1 font-mono">
                    <li>• View individual player statistics</li>
                    <li>• Browse tournament results</li>
                    <li>• Shop for Beyblade gear</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="pt-6 border-t border-cyan-400/30">
              <p className="text-sm text-cyan-300 font-mono">
                <span className="font-medium">Expected Launch:</span> Next tournament season
              </p>
              <p className="text-xs text-cyan-400 mt-1 font-mono">
                Follow our Facebook page for updates and announcements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 hover:scale-102 transition-all">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 glass-button cyber-border">
              <Trophy className="text-cyan-400 neon-text-cyan" size={20} />
            </div>
            <h4 className="font-semibold text-white neon-text-cyan font-mono">About PBBL</h4>
          </div>
          <p className="text-sm text-cyan-300">
            The Philippine Beyblade League features competitive teams including the Upkeep Longhorns and Upkeep Havoc, 
            showcasing the best bladers in the community.
          </p>
        </div>

        <div className="glass-card p-6 hover:scale-102 transition-all">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 glass-button cyber-border">
              <Users className="text-green-400 neon-text-green" size={20} />
            </div>
            <h4 className="font-semibold text-white neon-text-cyan font-mono">Team Features</h4>
          </div>
          <p className="text-sm text-cyan-300">
            Track team performance, individual player stats, match schedules, and stay updated with the latest 
            PBBL tournament results and rankings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PBBLTeamUpdates;
