import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import confetti from 'canvas-confetti';

const MODES = {
  POMODORO: { label: 'Pomodoro', minutes: 25 },
  SHORT_BREAK: { label: 'Short Break', minutes: 5 },
  LONG_BREAK: { label: 'Long Break', minutes: 15 },
};

const QUOTES = [
  "Focus on being productive instead of busy.",
  "The secret of your future is hidden in your daily routine.",
  "Strive for progress, not perfection.",
  "Don't stop until you're proud.",
  "Great things never come from comfort zones.",
  "Success is the sum of small efforts, repeated day in and day out.",
];

const PomodoroTimer = () => {
  const { focusStats, setFocusStats } = useAppContext();
  const [currentMode, setCurrentMode] = useState('POMODORO');
  const [timeLeft, setTimeLeft] = useState(MODES.POMODORO.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [taskLabel, setTaskLabel] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c6af5', '#3b82f6', '#f97316', '#ef4444']
      });

      if (currentMode === 'POMODORO') {
        const newWeekly = focusStats.weeklyMinutes + MODES.POMODORO.minutes;
        setFocusStats(prev => ({...prev, weeklyMinutes: newWeekly }));
        // Play sound or notification here
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentMode, focusStats.weeklyMinutes, setFocusStats]);

  const toggleTimer = () => {
    if (!isActive) setCurrentQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[currentMode].minutes * 60);
  };

  const changeMode = (mode) => {
    setCurrentMode(mode);
    setIsActive(false);
    setTimeLeft(MODES[mode].minutes * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((MODES[currentMode].minutes * 60 - timeLeft) / (MODES[currentMode].minutes * 60)) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="text-center mb-10 h-24">
        <h1 className="text-4xl font-bold text-white flex items-center justify-center">
          <Timer className="w-10 h-10 mr-3 text-focus drop-shadow-[0_0_8px_rgba(124,106,245,0.6)]" />
          Focus Timer
        </h1>
        {isActive && currentQuote ? (
          <p className="text-focus font-medium mt-3 italic animate-in slide-in-from-bottom-2 fade-in duration-500">
            "{currentQuote}"
          </p>
        ) : (
          <p className="text-gray-400 mt-2">Stay productive with the Pomodoro technique.</p>
        )}
      </header>

      <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-focus/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex justify-center space-x-2 mb-12 relative z-10">
          {Object.entries(MODES).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => changeMode(key)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                currentMode === key 
                  ? 'bg-focus text-white shadow-[0_0_15px_rgba(124,106,245,0.4)]' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative w-72 h-72 mx-auto mb-12 z-10">
          <svg className="w-full h-full transform -rotate-90 pointer-events-none">
            <circle
              cx="144"
              cy="144"
              r="130"
              className="stroke-gray-700 pointer-events-none"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="144"
              cy="144"
              r="130"
              className="stroke-focus pointer-events-none transition-all duration-1000 ease-linear drop-shadow-[0_0_10px_rgba(124,106,245,0.5)]"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 130}
              strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <div className="text-7xl font-bold font-mono tracking-tighter drop-shadow-md">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6 relative z-10 mb-8">
          <button
            onClick={toggleTimer}
            className="w-20 h-20 bg-focus hover:bg-focus/90 text-white rounded-full flex items-center justify-center transition-all shadow-[0_0_20px_rgba(124,106,245,0.4)] hover:shadow-[0_0_30px_rgba(124,106,245,0.6)] hover:scale-105"
          >
            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-1" />}
          </button>
          
          <button
            onClick={resetTimer}
            className="w-14 h-14 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-all hover:scale-105"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="relative z-10 pb-4">
          <input 
            type="text"
            placeholder="What are you working on?"
            value={taskLabel}
            onChange={(e) => setTaskLabel(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 text-center text-lg text-white placeholder-gray-500 focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus transition-all shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
