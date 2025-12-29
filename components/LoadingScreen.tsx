import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Initializing System...', 
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
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4 animate-fade-in futuristic-grid">
      {/* Animated Logo */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
        <div className="relative glass-card p-4 rounded-2xl cyber-border">
          <img 
            src="./logo.png" 
            alt="Nexus Hub" 
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl animate-float"
          />
        </div>
      </div>

      {/* Cyberpunk Loader */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
        <div className={`cyber-loader ${sizeClasses[size]}`}></div>
      </div>

      {/* Loading Message */}
      <div className="text-center space-y-2">
        <p className={`${textSizes[size]} text-cyan-200 font-medium animate-pulse font-mono tracking-wide`}>
          {message}
        </p>
        
        {/* Animated Binary Dots */}
        <div className="flex justify-center space-x-1 font-mono text-xs text-cyan-400">
          <span className="animate-pulse">0</span>
          <span className="animate-pulse" style={{ animationDelay: '100ms' }}>1</span>
          <span className="animate-pulse" style={{ animationDelay: '200ms' }}>0</span>
          <span className="animate-pulse" style={{ animationDelay: '300ms' }}>1</span>
          <span className="animate-pulse" style={{ animationDelay: '400ms' }}>1</span>
          <span className="animate-pulse" style={{ animationDelay: '500ms' }}>0</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-48 sm:w-64 h-2 glass-card rounded-full overflow-hidden scanning">
        <div className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full animate-shimmer"></div>
      </div>
      
      {/* System Status */}
      <div className="text-xs text-cyan-400 font-mono space-y-1 animate-pulse">
        <p>▶ SYSTEM_STATUS: INITIALIZING</p>
        <p>▶ PROTOCOL: ACTIVE_CONNECTION</p>
      </div>
    </div>
  );
};