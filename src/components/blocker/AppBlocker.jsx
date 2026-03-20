import React, { useState } from 'react';
import { Shield, ShieldAlert, Clock, Plus, Trash2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AppBlocker = () => {
  const { blockedApps, toggleAppLock, setBlockedApps } = useAppContext();
  const [newAppName, setNewAppName] = useState('');

  const handleAddApp = (e) => {
    e.preventDefault();
    if (!newAppName.trim()) return;
    const newApp = {
      id: Date.now().toString(),
      name: newAppName,
      locked: true,
      limit: 60
    };
    setBlockedApps([...blockedApps, newApp]);
    setNewAppName('');
  };

  const removeApp = (id) => {
    setBlockedApps(apps => apps.filter(app => app.id !== id));
  };

  const updateLimit = (id, newLimit) => {
    setBlockedApps(apps => apps.map(app => 
      app.id === id ? { ...app, limit: parseInt(newLimit, 10) || 0 } : app
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <ShieldAlert className="w-8 h-8 mr-3 text-focus drop-shadow-[0_0_8px_rgba(124,106,245,0.6)]" />
          App Blocker
        </h1>
        <p className="text-gray-400 mt-2">Manage distractions and set daily limits for your apps.</p>
      </header>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-700 bg-gray-800/80">
          <form onSubmit={handleAddApp} className="flex space-x-3">
            <input 
              type="text" 
              placeholder="App name (e.g. Instagram)"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus transition-all"
              value={newAppName}
              onChange={(e) => setNewAppName(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-focus hover:bg-focus/90 text-white px-6 py-3 rounded-xl font-medium flex items-center transition-all shadow-[0_0_15px_rgba(124,106,245,0.3)] hover:shadow-[0_0_20px_rgba(124,106,245,0.5)]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add App
            </button>
          </form>
        </div>

        <div className="divide-y divide-gray-700">
          {blockedApps.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <ShieldAlert className="w-12 h-12 mb-4 opacity-20" />
              No apps blocked yet. Add one above.
            </div>
          ) : (
            blockedApps.map(app => (
              <div key={app.id} className="p-6 flex items-center justify-between group hover:bg-gray-750 transition-colors">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => toggleAppLock(app.id)}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
                      app.locked 
                        ? 'bg-red-500/10 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:bg-red-500/20' 
                        : 'bg-green-500/10 text-green-500 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:bg-green-500/20'
                    }`}
                  >
                    <Shield className="w-6 h-6" />
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                    <div className="flex items-center text-sm mt-1">
                      <span className={`font-medium ${app.locked ? 'text-red-400' : 'text-green-400'}`}>
                        {app.locked ? 'Locked' : 'Unlocked'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 bg-gray-900 px-3 py-2 rounded-lg border border-gray-700">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <input 
                      type="number" 
                      min="0"
                      className="w-16 bg-transparent text-white text-right focus:outline-none focus:text-focus transition-colors font-medium"
                      value={app.limit}
                      onChange={(e) => updateLimit(app.id, e.target.value)}
                    />
                    <span className="text-gray-400 text-sm font-medium">min/day</span>
                  </div>
                  
                  <button 
                    onClick={() => removeApp(app.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppBlocker;
