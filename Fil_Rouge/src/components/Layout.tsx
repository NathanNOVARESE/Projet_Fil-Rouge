import React from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from '../lib/store';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const { darkMode } = useStore();

  return (
    <div className={`min-h-screen bg-cover bg-center bg-[url(./assets/bg-white.jpg)] ${darkMode ? 'bg-[url(./assets/bg.jpg)]' : 'bg-gray-50'}`}>
    <div className={`min-h-screen  ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar/>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />  
        </main>
      </div>
    </div>
  );
};

export default Layout;