import React, { useState } from 'react';
import { CheckSquare, Flame, Plus, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const HabitTracker = () => {
  const { habits, setHabits, toggleHabit, streak, streakDays, toggleStreakDay } = useAppContext();
  const [newHabit, setNewHabit] = useState('');

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now().toString(), name: newHabit, completed: false }]);
    setNewHabit('');
  };

  const completedToday = habits.filter(h => h.completed).length;
  const progress = habits.length > 0 ? (completedToday / habits.length) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <CheckSquare className="w-8 h-8 mr-3 text-focus drop-shadow-[0_0_8px_rgba(124,106,245,0.6)]" />
            Habit Tracker
          </h1>
          <p className="text-gray-400 mt-2">Build consistency with daily goals and streaks.</p>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center space-x-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-gray-600 transition-colors cursor-default">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="text-sm text-gray-400 font-medium">Current Streak</div>
            <div className="text-2xl font-bold text-white">{streak} Days</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Goals */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Today's Goals</h2>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-1 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
                  <div 
                    className="h-full bg-focus transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(124,106,245,0.8)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-focus w-10 text-right">{Math.round(progress)}%</span>
              </div>
            </div>

            <form onSubmit={handleAddHabit} className="mb-6 flex space-x-2">
              <input
                type="text"
                placeholder="New habit..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus transition-all"
                value={newHabit}
                onChange={e => setNewHabit(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-focus focus:outline-none text-white p-2.5 rounded-xl transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>

            <div className="space-y-3">
              {habits.map(habit => (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-full flex items-center p-4 rounded-2xl border transition-all ${
                    habit.completed
                      ? 'bg-focus/10 border-focus/30 shadow-[inset_0_0_20px_rgba(124,106,245,0.05)] translate-x-1'
                      : 'bg-gray-900 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-4 transition-all ${
                    habit.completed
                      ? 'bg-focus border-focus text-white'
                      : 'border-gray-500 text-transparent'
                  }`}>
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span className={`font-medium transition-all ${
                    habit.completed ? 'text-white/50 line-through' : 'text-gray-200'
                  }`}>
                    {habit.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 28-Day Streak Grid */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-xl h-full">
            <h2 className="text-xl font-bold text-white mb-6">28-Day Journey</h2>
            
            <div className="grid grid-cols-7 gap-3 sm:gap-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-center text-sm font-bold text-gray-500 mb-2">{day}</div>
              ))}
              
              {streakDays.map((day, i) => (
                <div 
                  key={i} 
                  className="aspect-square relative group cursor-pointer"
                  onClick={() => toggleStreakDay(i)}
                >
                  <div className={`w-full h-full rounded-xl transition-all duration-300 border ${
                    day.completed 
                      ? 'bg-focus/80 border-focus shadow-[0_0_15px_rgba(124,106,245,0.3)] hover:scale-105 hover:bg-focus hover:shadow-[0_0_20px_rgba(124,106,245,0.6)]' 
                      : 'bg-gray-900 border-gray-800 hover:border-gray-700 hover:bg-gray-800'
                  }`} />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-gray-700 shadow-xl font-medium">
                    Day {day.day} {day.completed ? '(Completed)' : ''}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-400 font-medium">
                <div className="w-4 h-4 rounded-md bg-gray-900 border border-gray-800 mr-2" />
                Remaining
              </div>
              <div className="flex items-center text-gray-400 font-medium">
                <div className="w-4 h-4 rounded-md bg-focus/80 border border-focus mr-2 shadow-[0_0_5px_rgba(124,106,245,0.4)]" />
                Completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
