import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import AuthPage from './pages/AuthPage';
import { useStore } from './lib/store';

function App() {
  const { darkMode, user, setUser } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Simulate authenticated user for demo purposes
  useEffect(() => {
    if (!user && !location.pathname.includes('/login') && !location.pathname.includes('/register')) {
      // Set demo user for easy testing
      setUser({
        id: 'user-123',
        email: 'demo@example.com',
        name: 'Demo User',
      });
    }
  }, [user, location.pathname, setUser]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Routes>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tags" element={<div className="p-4">Tags Management (Coming Soon)</div>} />
          <Route path="calendar" element={<div className="p-4">Calendar View (Coming Soon)</div>} />
          <Route path="settings" element={<div className="p-4">Settings (Coming Soon)</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;