import React, { useState } from 'react';
import { Calendar, Plus, Clock, Trash2, CalendarDays } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const FocusSchedule = () => {
  const { schedules, setSchedules } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '11:00'
  });

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newSchedule.title.trim()) return;
    
    setSchedules([...schedules, {
      ...newSchedule,
      id: Date.now().toString()
    }]);
    
    setIsModalOpen(false);
    setNewSchedule({ title: '', day: 'Monday', startTime: '09:00', endTime: '11:00' });
  };

  const removeSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  // Group schedules by day
  const groupedSchedules = DAYS.reduce((acc, day) => {
    acc[day] = schedules.filter(s => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-focus drop-shadow-[0_0_8px_rgba(124,106,245,0.6)]" />
            Focus Schedule
          </h1>
          <p className="text-gray-400 mt-2">Plan your week to block out recurring focus time.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-focus hover:bg-focus/90 text-white px-5 py-2.5 rounded-xl font-medium flex items-center transition-all shadow-[0_0_15px_rgba(124,106,245,0.3)] hover:shadow-[0_0_20px_rgba(124,106,245,0.5)] hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Block
        </button>
      </header>

      {schedules.length === 0 ? (
        <div className="bg-gray-800 rounded-3xl p-16 border border-gray-700 shadow-2xl text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-700 shadow-inner">
            <CalendarDays className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No schedules yet</h3>
          <p className="text-gray-400 max-w-sm mb-8">Set up recurring focus blocks for deep work, studying, or winding down.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-focus hover:text-white font-medium flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" /> Create your first block
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DAYS.map(day => {
            const daySchedules = groupedSchedules[day];
            if (daySchedules.length === 0) return null;
            
            return (
              <div key={day} className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden group hover:border-gray-600 transition-colors">
                <div className="bg-gray-900/80 px-5 py-3 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="font-bold text-white">{day}</h3>
                  <span className="text-xs font-bold text-gray-500 bg-gray-800 px-2 py-1 rounded-md">{daySchedules.length}</span>
                </div>
                <div className="divide-y divide-gray-700/50 p-2">
                  {daySchedules.map(schedule => (
                    <div key={schedule.id} className="p-3 group/item hover:bg-gray-750/50 rounded-xl transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-white">{schedule.title}</h4>
                          <div className="flex items-center text-sm text-focus mt-1.5 font-medium bg-focus/10 w-fit px-2 py-0.5 rounded-md">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {schedule.startTime} - {schedule.endTime}
                          </div>
                        </div>
                        <button 
                          onClick={() => removeSchedule(schedule.id)}
                          className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover/item:opacity-100 transition-all p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-900/50">
              <h3 className="text-xl font-bold text-white">New Focus Block</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSchedule} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Focus Goal</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  placeholder="e.g., Deep Work, Study session"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus transition-all shadow-inner"
                  value={newSchedule.title}
                  onChange={e => setNewSchedule({...newSchedule, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Day of Week</label>
                <div className="relative">
                  <select 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus transition-all appearance-none cursor-pointer"
                    value={newSchedule.day}
                    onChange={e => setNewSchedule({...newSchedule, day: e.target.value})}
                  >
                    {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Start Time</label>
                  <input 
                    type="time" 
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus transition-all [color-scheme:dark] cursor-pointer"
                    value={newSchedule.startTime}
                    onChange={e => setNewSchedule({...newSchedule, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">End Time</label>
                  <input 
                    type="time" 
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-focus focus:ring-1 focus:ring-focus transition-all [color-scheme:dark] cursor-pointer"
                    value={newSchedule.endTime}
                    onChange={e => setNewSchedule({...newSchedule, endTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-focus hover:bg-focus/90 text-white px-6 py-2.5 rounded-xl font-medium shadow-[0_0_15px_rgba(124,106,245,0.3)] transition-all hover:shadow-[0_0_20px_rgba(124,106,245,0.5)]"
                >
                  Save Block
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusSchedule;
