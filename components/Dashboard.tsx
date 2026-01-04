import React, { useEffect, useState } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { api } from '../services/api';
import { SalesData } from '../types';
import { DollarSign, Users, Trophy, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getSalesData();
      setSalesData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <LoadingScreen message="Loading analytics..." size="large" />;

  const totalSales = salesData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500">Overview of shop performance and activities.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Weekly Sales" value={`$${totalSales}`} icon={DollarSign} trend="+12%" />
        <StatCard title="Active Players" value="124" icon={Users} trend="+5%" />
        <StatCard title="Tournaments" value="8" icon={Trophy} trend="Active" />
        <StatCard title="Conversion Rate" value="3.2%" icon={TrendingUp} trend="+0.4%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Daily Sales Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Player Engagement</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: any; trend: string }> = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
        <Icon size={20} />
      </div>
      <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full">{trend}</span>
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);