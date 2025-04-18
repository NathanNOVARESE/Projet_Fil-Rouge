import React, { useState, useEffect } from 'react';
import { useStore } from '../lib/store';

const GameForum: React.FC = () => {
  const { user, darkMode } = useStore();
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64  ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 bg-[url(./assets/bg-white.)]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10 space-y-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow`}>
          <h1 className="text-2xl font-bold mb-4">Bienvenue sur GameForum</h1>
          <p className="text-gray-600 dark:text-gray-300">Lorem630</p>
        </div>  
        <p className="mb-6">Connectez-vous pour rejoindre la communauté.</p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/login" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Connexion
          </a>
          <a 
            href="/register" 
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Inscription
          </a>
        </div>
      </div>
    );
  }

  // Mock data for the forum
  const featuredGames = [
    'Valorant',
    'League of Legends',
    'Counter-Strike 2',
    'Fortnite'
  ];

  const onlinePlayers = 1243;
  const activeMembers = 8765;
  const discussionCount = 4321;
  const tournamentsOrganized = 56;

  const recentActivities = [
    'Nouveau sujet dans Valorant',
    'Guide complet pour League of Legends',
    'Nouveau sujet dans Counter-Strike',
    'Guide complet pour Fortnite',
    'Nouveau sujet dans Apex Legends',
    'Guide complet pour Overwatch 2'
  ];

  return (
    <div className={`p-6 ${darkMode ? 'text-white' : ' text-gray-900'}`}>
      {/* Cadre identique à l'image avec une hauteur augmentée et texte plus espacé */}
      <div className={`p-8 mb-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow`} style={{ height: '300px' }}>
        <h1 className="text-4xl font-bold mb-4 text-blue-500">Bienvenue sur GameForum</h1>
        <p className="text-2xl font-bold ">Rejoignez la plus grande communauté de gamers francophones. Discutez, partagez et restez informé des dernières actualités gaming.</p>
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Rejoindre la communauté</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-3">Jeux en vedette</h3>
            <ul className={`space-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
              {featuredGames.map((game, index) => (
                <li key={index} className="py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                    <p>{game}</p>
                  </div>
                </li>
              ))}
              <li className="py-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <p>Joueurs en ligne : {onlinePlayers}</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-3">Statistiques</h3>
            <div className={`grid grid-cols-2 gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">Joueurs en ligne</p>
                <p className="text-2xl font-bold">{onlinePlayers}</p>
              </div>
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">Membres actifs</p>
                <p className="text-2xl font-bold">{activeMembers}</p>
              </div>
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">Discussions</p>
                <p className="text-2xl font-bold">{discussionCount}</p>
              </div>
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">Tournois organisés</p>
                <p className="text-2xl font-bold">{tournamentsOrganized}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Activité récente</h2>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <p>{activity}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Il y a 2 heures</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameForum;