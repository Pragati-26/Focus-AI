import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppBlocker from './components/blocker/AppBlocker';
import PomodoroTimer from './components/pomodoro/PomodoroTimer';
import FocusSchedule from './components/schedule/FocusSchedule';
import HabitTracker from './components/habits/HabitTracker';
import AIInsights from './components/insights/AIInsights';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AIInsights />} />
          <Route path="/blocker" element={<AppBlocker />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
          <Route path="/schedule" element={<FocusSchedule />} />
          <Route path="/habits" element={<HabitTracker />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
