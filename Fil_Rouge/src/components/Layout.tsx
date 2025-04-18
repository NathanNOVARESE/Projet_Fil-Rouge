import React from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from '../lib/store';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const { darkMode } = useStore();

  return (
    <div className={`min-h-screen bg-[url(./assets/bg-white.jpg)] ${darkMode ? 'd bg-[url(./assets/bg.jpg)]' : 'bg-gray-50'}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <Outlet />  
        </main>
      </div>
    </div>
  );
};

export default Layout;