import React from 'react';
import { User, Mail, Calendar, MessageSquare, Trophy, Star, Settings, Shield, Activity } from 'lucide-react';

function Profile() {
  const userStats = {
    discussions: 156,
    replies: 892,
    reputation: 1450,
    joined: 'Mars 2024',
    lastActive: 'Il y a 2 heures',
    rank: 'Vétéran',
    badges: ['Expert FPS', 'Contributeur Elite', 'Guide Communautaire'],
    favoriteGames: ['Counter-Strike 2', 'Elden Ring', 'League of Legends']
  };

  const recentActivity = [
    { id: 1, type: 'reply', content: 'A répondu à "Guide débutant Elden Ring"', time: 'Il y a 2 heures' },
    { id: 2, type: 'discussion', content: 'A créé "Les meilleurs builds pour CS2"', time: 'Il y a 1 jour' },
    { id: 3, type: 'badge', content: 'A obtenu le badge "Expert FPS"', time: 'Il y a 3 jours' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profil principal */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="h-24 w-24 rounded-full bg-accent-500 flex items-center justify-center mx-auto">
                  <User className="h-12 w-12 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">John Doe</h1>
              <p className="text-gray-500">@johndoe</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-3" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3" />
                <span>Membre depuis {userStats.joined}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Activity className="h-5 w-5 mr-3" />
                <span>Dernière activité: {userStats.lastActive}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.discussions}</div>
                <div className="text-sm text-gray-500">Discussions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.replies}</div>
                <div className="text-sm text-gray-500">Réponses</div>
              </div>
            </div>

            <button className="mt-6 w-full py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition duration-150">
              Modifier le profil
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Badges</h2>
            <div className="space-y-3">
              {userStats.badges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <Shield className="h-5 w-5 text-secondary-600" />
                  <span className="text-gray-700">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Réputation</p>
                    <p className="text-xl font-bold text-gray-900">{userStats.reputation}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-secondary-600" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Rang</p>
                    <p className="text-xl font-bold text-gray-900">{userStats.rank}</p>
                  </div>
                  <Star className="h-8 w-8 text-accent-500" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Paramètres</p>
                    <p className="text-xl font-bold text-gray-900">Gérer</p>
                  </div>
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition duration-150">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.content}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jeux favoris</h2>
            <div className="space-y-3">
              {userStats.favoriteGames.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{game}</span>
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;