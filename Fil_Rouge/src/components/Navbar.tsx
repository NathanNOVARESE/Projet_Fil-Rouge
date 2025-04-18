import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Moon, Sun, Bell, User, LogOut, Trophy } from 'lucide-react';
import { Joystick, Search} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, darkMode, toggleDarkMode, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
  };


  return (
    <nav className={`px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md sticky top-0 z-10`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center space-x-0.2">
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

          {user ? (
            <div className="flex items-center space-x-2">
              <div className="hidden md:block">
            </div>
            <div className="relative">
              <button
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
              onClick={() => {
                const dropdown = document.getElementById('profile-dropdown');
                if (dropdown) {
                dropdown.style.display =
                  dropdown.style.display === 'block' ? 'none' : 'block';
                }
              }}
              >
              <User size={20} />
              </button>
              <div
              id="profile-dropdown"
              className="absolute right-[-40%] mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg py-2 z-20 hidden"
              >
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
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
              </div>
            </div>
            <script>
              {`
              document.addEventListener('click', (event) => {
                const dropdown = document.getElementById('profile-dropdown');
                const button = event.target.closest('button');
                if (
                dropdown &&
                dropdown.style.display === 'block' &&
                !dropdown.contains(event.target) &&
                (!button || button.className.indexOf('bg-blue-100') === -1)
                ) {
                dropdown.style.display = 'none';
                }
              });
              `}
            </script>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
          to="/login"
          className="px-4 py-2 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
          Login
              </Link>
              <Link
          to="/register"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
          Sign Up
              </Link>
            </div>
          )}
        </div>
        </div>
    </nav>
  );
};

export default Navbar;