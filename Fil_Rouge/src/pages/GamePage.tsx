import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Gamepad2, Search, Users, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const GamesPage: React.FC = () => {
  const { darkMode } = useStore(); // Access the global dark mode state
  const [searchTerm, setSearchTerm] = useState(''); // State to manage the search input
  const navigate = useNavigate(); // Initialize useNavigate for page navigation

  // Mock data for games
  const games = [
    {
      title: "Valorant",
      category: "FPS Tactique",
      players: 12543,
      rating: 4.8,
      tournaments: 24,
      image: "https://i.pinimg.com/736x/b0/62/1f/b0621f3e685d35f8134cb90230073ff5.jpg"
    },
    {
      title: "League of Legends",
      category: "MOBA",
      players: 34567,
      rating: 4.5,
      tournaments: 56,
      image: "https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg"
    },
    {
      title: "Counter-Strike 2",
      category: "FPS",
      players: 45678,
      rating: 4.7,
      tournaments: 89,
      image: "https://images.pexels.com/photos/7862657/pexels-photo-7862657.jpeg"
    },
    {
      title: "Fortnite",
      category: "Battle Royale",
      players: 23456,
      rating: 4.3,
      tournaments: 34,
      image: "https://i.pinimg.com/736x/51/28/12/512812a989d41afcc6501ef5d9fa4c3d.jpg"
    },
    {
      title: "Apex Legends",
      category: "Battle Royale",
      players: 18765,
      rating: 4.4,
      tournaments: 28,
      image: "https://images.pexels.com/photos/7915509/pexels-photo-7915509.jpeg"
    },
    {
      title: "Overwatch 2",
      category: "FPS",
      players: 15678,
      rating: 4.2,
      tournaments: 19,
      image: "https://images.pexels.com/photos/7915264/pexels-photo-7915264.jpeg"
    }
  ];

  // Filter games based on the search term
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-6 ${darkMode ? 'text-white' : ' text-gray-900'}`}>
      {/* Header section */}
      <div className={`p-8 mb-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Gamepad2 className="mr-2 text-blue-500" />
          Jeux Vidéos
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explorez notre sélection de jeux et rejoignez les communautés
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
            className={`w-full pl-10 pr-4 py-3 rounded-lg ${
              darkMode 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-900'
            } border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game, index) => (
          <div 
            key={index}
            onClick={() => navigate('/presgame')} // Navigate to the game details page
            className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow overflow-hidden transition-transform duration-200 hover:transform hover:scale-105 cursor-pointer`} // Add hover effect and pointer cursor
          >
            {/* Game image */}
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${game.image})` }}
            />
            <div className="p-4">
              {/* Game title */}
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              {/* Game category */}
              <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
              } mb-3`}>
                {game.category}
              </span>
              
              {/* Game stats */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {/* Players */}
                <div className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <Users size={16} className="mb-1" />
                  <span className="text-sm">{game.players}</span>
                </div>
                {/* Rating */}
                <div className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <Star size={16} className="mb-1" />
                  <span className="text-sm">{game.rating}</span>
                </div>
                {/* Tournaments */}
                <div className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <Trophy size={16} className="mb-1" />
                  <span className="text-sm">{game.tournaments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;