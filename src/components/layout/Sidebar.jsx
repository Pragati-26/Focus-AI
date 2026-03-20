import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrainCircuit, ShieldAlert, Timer, Calendar, CheckSquare, BarChart2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const navItems = [
    { name: 'Insights', path: '/', icon: BarChart2 },
    { name: 'App Blocker', path: '/blocker', icon: ShieldAlert },
    { name: 'Pomodoro', path: '/pomodoro', icon: Timer },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Habits', path: '/habits', icon: CheckSquare },
  ];

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 h-screen flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="bg-focus p-2 rounded-lg shadow-[0_0_15px_rgba(124,106,245,0.4)]">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-wide text-white">Focus AI</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium font-sans",
                isActive 
                  ? "bg-focus/10 text-focus shadow-[inset_4px_0_0_0_rgba(124,106,245,1)]" 
                  : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between border border-gray-800">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Focus Score</span>
            <span className="text-xl font-bold text-focus mt-1">85%</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-focus/20 border-2 border-focus flex items-center justify-center shadow-[0_0_10px_rgba(124,106,245,0.2)]">
            <span className="text-sm font-bold text-focus">A</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
