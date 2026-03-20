import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // App Blocker state
  const [blockedApps, setBlockedApps] = useState([
    { id: '1', name: 'Instagram', locked: false, limit: 30 },
    { id: '2', name: 'YouTube', locked: true, limit: 60 }
  ]);

  // Pomodoro state
  const [focusStats, setFocusStats] = useState({
    focusScore: 85,
    weeklyMinutes: 450,
  });

  // Habit Tracker state
  const [habits, setHabits] = useState([
    { id: '1', name: 'Drink Water', completed: false },
    { id: '2', name: 'Read 30 mins', completed: true },
  ]);
  const [streakDays, setStreakDays] = useState(
    Array.from({ length: 28 }, (_, i) => ({ day: i + 1, completed: i < 12 }))
  );
  const streak = streakDays.filter(d => d.completed).length;

  // Schedules
  const [schedules, setSchedules] = useState([]);

  const toggleAppLock = (id) => {
    setBlockedApps(apps => apps.map(app => 
      app.id === id ? { ...app, locked: !app.locked } : app
    ));
  };

  const toggleHabit = (id) => {
    setHabits(habits => habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  const toggleStreakDay = (dayIndex) => {
    setStreakDays(days => days.map((d, i) => 
      i === dayIndex ? { ...d, completed: !d.completed } : d
    ));
  };

  return (
    <AppContext.Provider value={{
      blockedApps, toggleAppLock, setBlockedApps,
      focusStats, setFocusStats,
      habits, setHabits, toggleHabit, streak, streakDays, setStreakDays, toggleStreakDay,
      schedules, setSchedules
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
