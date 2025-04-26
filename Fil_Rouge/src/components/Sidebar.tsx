import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../lib/store';
import { TrendingUp, Gamepad2, Home, Trophy, MessageSquare, ChevronLeft, ChevronRight, Users, Lock } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { darkMode } = useStore();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { path: '/', label: 'Accueil', icon: <Home size={20} /> },
    { path: '/trends', label: 'Tendances', icon: <TrendingUp size={20} /> },
    { path: '/discussions', label: 'Discussions', icon: <MessageSquare size={20} /> },
    { path: '/games', label: 'Jeux', icon: <Gamepad2 size={20} /> },
    { path: '/competition', label: 'Compétition', icon: <Trophy size={20} /> },
    { path: '/teams', label: 'Équipes', icon: <Users size={20} /> },    
    { path: '/admin', label: 'Dashboard', icon: <Lock size={20} /> },    
  ];

  return (
    <aside
      className={`${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } ${
        collapsed ? 'w-16' : 'w-64'
      } min-h-screen transition-all duration-300 shadow-md hidden md:block relative`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      <div className="pt-8 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-4 border-blue-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  } transition-colors`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;