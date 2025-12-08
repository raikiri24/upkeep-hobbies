import React from 'react';
import { Wrench, Clock, AlertCircle, Trophy, Users } from 'lucide-react';

const PBBLTeamUpdates: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          PBBL Team Updates
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          Philippine Beyblade League team standings and statistics
        </p>
      </div>

      {/* Under Construction Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center space-y-6">
            {/* Construction Icon */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-amber-100 rounded-full mx-auto">
              <div className="absolute inset-0 bg-amber-200 rounded-full animate-pulse"></div>
              <Wrench className="relative text-amber-600" size={48} strokeWidth={2} />
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-200">
              <Clock size={16} />
              <span className="font-semibold">Under Construction</span>
            </div>

            {/* Main Message */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">
                Coming Soon!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working hard to bring you comprehensive PBBL team updates, including:
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
                <Trophy className="text-blue-600" size={24} />
                <span className="text-sm font-medium text-gray-700">Team Standings</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
                <Users className="text-green-600" size={24} />
                <span className="text-sm font-medium text-gray-700">Player Statistics</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
                <Clock className="text-purple-600" size={24} />
                <span className="text-sm font-medium text-gray-700">Match Schedules</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-blue-600 mt-0.5" size={20} />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-900">
                    While you wait, check out other features:
                  </p>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• View individual player statistics</li>
                    <li>• Browse tournament results</li>
                    <li>• Shop for Beyblade gear</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Expected Launch:</span> Next tournament season
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Follow our Facebook page for updates and announcements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Trophy className="text-blue-600" size={20} />
            </div>
            <h4 className="font-semibold text-gray-900">About PBBL</h4>
          </div>
          <p className="text-sm text-gray-600">
            The Philippine Beyblade League features competitive teams including the Upkeep Longhorns and Upkeep Havoc, 
            showcasing the best bladers in the community.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="text-green-600" size={20} />
            </div>
            <h4 className="font-semibold text-gray-900">Team Features</h4>
          </div>
          <p className="text-sm text-gray-600">
            Track team performance, individual player stats, match schedules, and stay updated with the latest 
            PBBL tournament results and rankings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PBBLTeamUpdates;
