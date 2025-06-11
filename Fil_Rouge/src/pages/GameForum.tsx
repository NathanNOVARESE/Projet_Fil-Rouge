import React, { useState, useEffect } from 'react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import { UserRound,UserRoundPlus ,  MessageCircle, Trophy, User } from 'lucide-react';

const GameForum: React.FC = () => {
  const navigate = useNavigate();
  const { user, darkMode } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 bg-[url(./assets/bg-white.)]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10 space-y-6">
        <div className={`p-4 min-h-[120px] rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow flex justify-center items-center`}>
          <h1 className="text-2xl font-bold text-blue-500 text-center w-full">Bienvenue sur GameForum</h1>
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

  const featuredGames = [
    'Valorant',
    'League of Legends',
    'Fortnite',
    'Apex Legends'
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
      {/* Welcome section */}
      <div className={`p-4 sm:p-8 mb-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow`} style={{ height: 'auto' }}>
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-blue-500">Bienvenue sur GameForum</h1>
        <p className="text-lg sm:text-2xl font-bold">Rejoignez la plus grande communauté de gamers francophones. Discutez, partagez et restez informé des dernières actualités gaming.</p>
      </div>
      
      {/* Community section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-gray-300 pb-4">Rejoindre la communauté</h2>
        
        {/* Featured games section */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6 inline-block border-b-4 border-gray-300 pb-2">Jeux en vedette</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {featuredGames.map((game, index) => {
              const gameImages: { [key: string]: string } = {
                'Valorant': 'https://i.pinimg.com/736x/67/c0/7e/67c07ead929b049e453bedda45980b79.jpg',
                'League of Legends': 'https://i.pinimg.com/736x/d1/b1/1d/d1b11d5e4dbae547ac0d651476cec488.jpg',
                'Counter-Strike 2': 'https://i.pinimg.com/736x/3c/1e/87/3c1e871625f3c31c9b7d10ed179205e9.jpg',
                'Fortnite': 'https://i.pinimg.com/736x/4b/ab/34/4bab34086b84ee2a0e1b66b1e82ed0be.jpg',
                'Apex Legends': 'https://i.pinimg.com/736x/bc/93/1b/bc931b47a7edf6322785f1a6427a3653.jpg',
                'Overwatch 2': 'https://i.pinimg.com/736x/6a/a2/4c/6aa24c0ce2d5823abd694787b125449c.jpg'
              };

              return (
                <div 
                  key={index} 
                  className={`rounded-lg overflow-hidden shadow-lg border ${
                    darkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-100'
                  } transition-colors cursor-pointer`}
                  onClick={() => navigate(`/presgame?game=${encodeURIComponent(game)}`)}
                >
                  <img 
                    src={gameImages[game] || 'https://via.placeholder.com/150'} 
                    alt={game} 
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{game}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Découvrez les dernières actualités et stratégies.</p>
                    <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Populaire
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* Statistics section - moved right after Featured Games */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6 inline-block border-b-4 border-gray-300 pb-2 ">Statistiques</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            <div className={`p-6 rounded-lg shadow-lg border ${
              darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <UserRound size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Joueurs en ligne</p>
                  <p className="text-2xl font-bold">{onlinePlayers}</p>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-lg shadow-lg border ${
              darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <UserRoundPlus size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Membres actifs</p>
                  <p className="text-2xl font-bold">{activeMembers}</p>
                </div>
              </div>
            </div>
            <div className={`p-6 rounded-lg shadow-lg border cursor-pointer ${
              darkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-200'
            }`}>
                <div 
                className="flex items-center space-x-4 cursor-pointer" 
                onClick={() => navigate('/discussions')}
                >
                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Discussions</p>
                  <p className="text-2xl font-bold">{discussionCount}</p>
                </div>
                </div>
            </div>
            <div className={`p-6 rounded-lg shadow-lg border cursor-pointer  ${
              darkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-200'
            }`}>
              <div 
              className="flex items-center space-x-4"
              onClick={() => navigate('/competition')}              
              >
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white ">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tournois en cours</p>
                  <p className="text-2xl font-bold">{tournamentsOrganized}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      
      {/* Recent activity section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-gray-300 pb-2">Activité récente</h2>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentActivities.map((activity, index) => (
          <div 
        key={index} 
        className={`p-6 rounded-lg shadow-md border ${
          darkMode ? 'border-gray-700 bg-gray-800 hover:bg-gray-800' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
        } transition-transform transform hover:scale-105`}
          >
        <p className="text-lg font-medium">{activity}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Il y a 2 heures</p>
          </div>
        ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameForum;