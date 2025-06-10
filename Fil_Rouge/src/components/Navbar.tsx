import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Moon, Sun, Bell, User, LogOut, Menu } from 'lucide-react';
import { Joystick, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, setUser, darkMode, toggleDarkMode } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // Variable booléenne qui change selon la connexion
  const isLoggedIn = !!user;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user && token) {
      fetch('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.user) setUser(data.user);
          setLoadingUser(false);
        });
    } else {
      setLoadingUser(false);
    }
  }, [user, setUser]);

  useEffect(() => {
    console.log('user:', user);
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('gameforum-store');
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Pour fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.style.display = 'none';
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`px-4 py-3 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-md sticky top-0 z-10`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold flex items-center space-x-0.5 ml-6"
          >
            <Joystick size={30} />
            <span className="text-blue-500">Game</span>
            <span>Forum</span>
          </Link>

          <div className="hidden md:flex space-x-4 w-full max-w-md">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

            {/* Menu déroulant profil */}
            <div className="relative">
              <button
                className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                onClick={() => {
                  if (dropdownRef.current) {
                    dropdownRef.current.style.display =
                      dropdownRef.current.style.display === 'block' ? 'none' : 'block';
                  }
                }}
              >
                <User size={20} />
              </button>
              <div
                ref={dropdownRef}
                id="profile-dropdown"
                className="absolute right-[-40%] mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg py-2 z-20 hidden"
              >
                {loadingUser ? null : isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-md"
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-md"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
