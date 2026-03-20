import React from 'react';
import { BarChart2, TrendingUp, TrendingDown, Target, Brain, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAppContext } from '../../context/AppContext';

const chartData = [
  { name: 'Instagram', time: 120 },
  { name: 'YouTube', time: 90 },
  { name: 'TikTok', time: 60 },
  { name: 'Twitter', time: 45 },
  { name: 'Reddit', time: 30 },
];

const AIInsights = () => {
  const { focusStats, streak } = useAppContext();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Brain className="w-8 h-8 mr-3 text-focus drop-shadow-[0_0_8px_rgba(124,106,245,0.6)]" />
          AI Insights
        </h1>
        <p className="text-gray-400 mt-2">Weekly analysis of your focus patterns and distractions.</p>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-focus/10 rounded-full blur-2xl group-hover:bg-focus/20 transition-colors" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-focus/20 flex items-center justify-center border border-focus/30 shadow-[0_0_15px_rgba(124,106,245,0.2)]">
              <Target className="w-6 h-6 text-focus" />
            </div>
            <span className="flex items-center text-sm font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-4 h-4 mr-1" /> +5%
            </span>
          </div>
          <h3 className="text-gray-400 font-medium mb-1 relative z-10">Focus Score</h3>
          <div className="text-4xl font-bold text-white relative z-10">{focusStats.focusScore}</div>
        </div>

        <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <BarChart2 className="w-6 h-6 text-blue-500" />
            </div>
            <span className="flex items-center text-sm font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-4 h-4 mr-1" /> +2h
            </span>
          </div>
          <h3 className="text-gray-400 font-medium mb-1 relative z-10">Deep Work</h3>
          <div className="text-4xl font-bold text-white relative z-10">{Math.floor(focusStats.weeklyMinutes / 60)}h {focusStats.weeklyMinutes % 60}m</div>
        </div>

        <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              <Award className="w-6 h-6 text-orange-500" />
            </div>
            <span className="flex items-center text-sm font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg">
              <TrendingDown className="w-4 h-4 mr-1" /> -1
            </span>
          </div>
          <h3 className="text-gray-400 font-medium mb-1 relative z-10">Current Streak</h3>
          <div className="text-4xl font-bold text-white relative z-10">{streak} days</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-3xl p-6 lg:p-8 border border-gray-700 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Top Distractions</h2>
            <p className="text-sm text-gray-400 mt-1">Time spent on blocked apps this week.</p>
          </div>
          
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }} />
                <RechartsTooltip 
                  cursor={{ fill: '#374151', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#7c6af5', fontWeight: 'bold' }}
                  formatter={(value) => [`${value} mins`, 'Usage']}
                />
                <Bar dataKey="time" radius={[0, 8, 8, 0]} barSize={28}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#f97316' : '#7c6af5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 rounded-3xl p-6 lg:p-8 border border-gray-700 shadow-xl flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">AI Analysis</h2>
            <p className="text-sm text-gray-400 mt-1">Personalized actionable insights.</p>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-2xl relative overflow-hidden group hover:border-focus/50 transition-colors cursor-default shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <h4 className="font-bold text-white mb-2 ml-3">Instagram Limit Exceeded</h4>
              <p className="text-sm text-gray-400 ml-3">You've averaged 120 mins a day on Instagram this week, exceeding your 30min goal by 300%. Consider tightening the block schedule.</p>
            </div>

            <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-2xl relative overflow-hidden group hover:border-focus/50 transition-colors cursor-default shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
              <h4 className="font-bold text-white mb-2 ml-3">Peak Focus Time Discovered</h4>
              <p className="text-sm text-gray-400 ml-3">Your Pomodoro sessions are 40% more effective between 9:00 AM and 11:30 AM. Auto-schedule deep work here?</p>
            </div>

            <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-2xl relative overflow-hidden group hover:border-focus/50 transition-colors cursor-default shadow-sm md:block hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-focus shadow-[0_0_10px_rgba(124,106,245,0.8)]" />
              <h4 className="font-bold text-white mb-2 ml-3">Habit Consistency</h4>
              <p className="text-sm text-gray-400 ml-3">You are on a 12-day streak! Consistency is key to long-term success. Keep up the great work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
