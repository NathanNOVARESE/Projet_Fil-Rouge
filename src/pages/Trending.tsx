import React from 'react';
import { MessageSquare, User, Flame } from 'lucide-react';

const trendingTopics = [
  { id: 1, title: 'Votre avis sur le nouveau Call of Duty?', replies: 45, views: 1203, author: 'GameMaster', time: '2h', category: 'FPS' },
  { id: 2, title: 'Guide débutant: Elden Ring', replies: 78, views: 2541, author: 'EldenFan', time: '5h', category: 'RPG' },
  { id: 3, title: 'Les meilleurs builds pour Diablo IV', replies: 92, views: 3102, author: 'DiabloMaster', time: '1h', category: 'RPG' },
  { id: 4, title: 'Débat: Le futur des Battle Royale', replies: 156, views: 4521, author: 'BRExpert', time: '3h', category: 'Battle Royale' },
  { id: 5, title: 'Problème de lag sur Fortnite', replies: 23, views: 876, author: 'FortPlayer', time: '1j', category: 'Support' },
  { id: 6, title: 'Quels jeux attendez-vous en 2025?', replies: 112, views: 3254, author: 'FuturGamer', time: '2j', category: 'Discussion' }
];

function Trending() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Flame className="h-8 w-8 text-accent-500" />
            <h1 className="text-2xl font-bold text-gray-900">Tendances</h1>
          </div>
          <div className="flex space-x-4">
            <select className="rounded-lg border-gray-300 text-gray-700 text-sm focus:ring-secondary-500 focus:border-secondary-500">
              <option>Aujourd'hui</option>
              <option>Cette semaine</option>
              <option>Ce mois</option>
            </select>
            <select className="rounded-lg border-gray-300 text-gray-700 text-sm focus:ring-secondary-500 focus:border-secondary-500">
              <option>Toutes catégories</option>
              <option>FPS</option>
              <option>RPG</option>
              <option>Battle Royale</option>
              <option>Support</option>
              <option>Discussion</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {trendingTopics.map(topic => (
            <div key={topic.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-150">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <a href="#" className="text-lg font-medium text-gray-900 hover:text-secondary-600">
                      {topic.title}
                    </a>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
                      {topic.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <a href="#" className="text-sm text-secondary-600 hover:text-secondary-700">
                        {topic.author}
                      </a>
                    </div>
                    <span className="text-sm text-gray-500">{topic.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>{topic.replies} réponses</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{topic.views} vues</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition duration-150">
            Charger plus
          </button>
        </div>
      </div>
    </div>
  );
}

export default Trending;