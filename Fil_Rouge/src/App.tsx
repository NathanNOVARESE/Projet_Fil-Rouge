import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import GameForum from './pages/GameForum';
import TasksPage from './pages/TasksPage';
import TrendsPage from './pages/TrendsPage';
import GamesPage from './pages/GamePage';
import GamePres from './pages/GamePres';
import CompetitionPage from './pages/CompetitionPage';
import CompetitionPres from './pages/CompetitionPres';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import DiscussionsPage from './pages/DiscussionsPage';
import AuthPage from './pages/AuthPage';
import TeamsPage from './pages/TeamsPage';
import ForumTchat from './pages/ForumTchat';
import { useStore } from './lib/store';

function App() {
  const { darkMode } = useStore();
  const navigate = useNavigate();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Routes>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<GameForum />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="trends" element={<TrendsPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="presgame" element={<GamePres />} />
          <Route path="discussions" element={<DiscussionsPage />} />
          <Route path="tchat" element={<ForumTchat />} />
          <Route path="competition" element={<CompetitionPage />} />
          <Route path="prescomp" element={<CompetitionPres />} />
          <Route path="teams" element={<TeamsPage/>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="settings" element={<div className="p-4">Settings (Coming Soon)</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;