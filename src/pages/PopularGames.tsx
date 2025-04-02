import React from 'react';
import { Star, Users, Trophy, ThumbsUp, MessageSquare } from 'lucide-react';

const popularGames = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    category: 'RPG',
    rating: 4.5,
    players: '125K',
    discussions: 2341,
    reviews: 15234
  },
  {
    id: 2,
    title: 'Call of Duty: Modern Warfare III',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80',
    category: 'FPS',
    rating: 4.2,
    players: '500K',
    discussions: 5123,
    reviews: 42123
  },
  {
    id: 3,
    title: 'The Legend of Zelda: TOTK',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    category: 'Action/Aventure',
    rating: 4.9,
    players: '300K',
    discussions: 4231,
    reviews: 35234
  }
];

function PopularGames() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-secondary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Jeux Populaires</h1>
          </div>
          <div className="flex space-x-4">
            <select className="rounded-lg border-gray-300 text-gray-700 text-sm">
              <option>Tous les genres</option>
              <option>FPS</option>
              <option>RPG</option>
              <option>Action/Aventure</option>
            </select>
            <select className="rounded-lg border-gray-300 text-gray-700 text-sm">
              <option>Cette semaine</option>
              <option>Ce mois</option>
              <option>Cette année</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularGames.map(game => (
            <div key={game.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
              <div className="relative h-48">
                <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 px-2 py-1 bg-black bg-opacity-50 rounded text-white text-sm">
                  {game.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{game.title}</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-700">{game.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="ml-1 text-gray-700">{game.players}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {game.discussions} discussions
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {game.reviews} avis
                  </div>
                </div>
                <button className="mt-4 w-full py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition duration-150">
                  Voir les discussions
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150">
            Voir plus de jeux
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopularGames;