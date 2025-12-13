import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: Array<{ stat: string; value: number }>;
  playerName: string;
}

export const LazyRadarChart: React.FC<RadarChartProps> = ({ data, playerName }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
        <PolarAngleAxis dataKey="stat" tick={{ fill: '#e5e7eb' }} />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 'dataMax']} 
          tick={{ fill: '#9ca3af' }}
        />
        <Radar 
          name={playerName} 
          dataKey="value" 
          stroke="url(#colorGradient)" 
          fill="url(#colorGradient)" 
          fillOpacity={0.6}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </RadarChart>
    </ResponsiveContainer>
  );
};