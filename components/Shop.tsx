import React from 'react';
import { User } from '../types';
import { Hammer, HardHat, Construction } from 'lucide-react';

interface ShopProps {
  user: User;
}

export const Shop: React.FC<ShopProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="relative">
        <div className="absolute -inset-4 bg-yellow-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Construction size={80} className="text-yellow-600 relative z-10" />
      </div>
      
      <div className="space-y-2 max-w-md">
        <h2 className="text-3xl font-bold text-gray-900">Shop Under Construction</h2>
        <p className="text-gray-500 text-lg">
          We are currently building an amazing shopping experience for all your hobby needs. Check back soon for the grand opening!
        </p>
      </div>

      <div className="flex items-center space-x-2 text-sm font-semibold text-yellow-700 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
        <HardHat size={16} />
        <span>Development in Progress</span>
      </div>
    </div>
  );
};