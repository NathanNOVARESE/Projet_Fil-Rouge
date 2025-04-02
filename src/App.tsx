import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Bell, MessageSquare, User, Home, Gamepad2, Trophy, Flame, Menu, X } from 'lucide-react';
import Trending from './pages/Trending';
import PopularGames from './pages/PopularGames';
import Competitions from './pages/Competitions';
import Profile from './pages/Profile';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Gamepad2 className="h-8 w-8 text-secondary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">GameForum</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-500" />
              </button>
              
              <button className="p-2 rounded-full hover:bg-gray-100">
                <MessageSquare className="h-6 w-6 text-gray-500" />
              </button>
              
              <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-700">Profil</span>
              </Link>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Notifications</span>
              </button>
              
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Messages</span>
              </button>
              
              <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-700">Profil</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="hidden md:block w-64 bg-white shadow-sm h-screen fixed">
          <nav className="p-4 space-y-2">
            <Link
              to="/"
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                location.pathname === '/' ? 'bg-secondary-100 text-secondary-700' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Home size={18} />
              <span>Accueil</span>
            </Link>
            <Link
              to="/trending"
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                location.pathname === '/trending' ? 'bg-secondary-100 text-secondary-700' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Flame size={18} />
              <span>Tendances</span>
            </Link>
            <Link
              to="/popular-games"
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                location.pathname === '/popular-games' ? 'bg-secondary-100 text-secondary-700' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Gamepad2 size={18} />
              <span>Jeux populaires</span>
            </Link>
            <Link
              to="/competitions"
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                location.pathname === '/competitions' ? 'bg-secondary-100 text-secondary-700' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Trophy size={18} />
              <span>Compétitions</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64">
          <Routes>
            <Route path="/" element={<div>Page d'accueil</div>} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/popular-games" element={<PopularGames />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;