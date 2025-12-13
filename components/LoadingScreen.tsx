import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12', 
    large: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4 animate-fade-in">
      {/* Animated Logo */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
        <div className="relative glass-card p-4 rounded-2xl">
          <img 
            src="./logo.png" 
            alt="Upkeep Hobbies" 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl animate-float"
          />
        </div>
      </div>

      {/* Loading Spinner */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
        <div className={`relative glass-button rounded-full flex items-center justify-center ${sizeClasses[size]}`}>
          <Loader2 
            size={size === 'small' ? 16 : size === 'medium' ? 24 : 32}
            className="text-cyan-300 animate-spin"
          />
        </div>
      </div>

      {/* Loading Message */}
      <div className="text-center space-y-2">
        <p className={`${textSizes[size]} text-blue-200 font-medium animate-pulse`}>
          {message}
        </p>
        
        {/* Animated Dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-48 sm:w-64 h-1 glass-card rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-shimmer"></div>
      </div>
    </div>
  );
};