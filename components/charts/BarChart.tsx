import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<{ [key: string]: any }>;
  player1Name: string;
  player2Name: string;
}

export const LazyBarChart: React.FC<BarChartProps> = ({ data, player1Name, player2Name }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="stat" tick={{ fill: '#e5e7eb' }} />
        <YAxis tick={{ fill: '#e5e7eb' }} />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
          labelStyle={{ color: '#e5e7eb' }}
        />
        <Legend />
        <Bar dataKey={player1Name} fill="#3b82f6" />
        <Bar dataKey={player2Name} fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
};