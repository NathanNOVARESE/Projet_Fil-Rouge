import React, { useState } from 'react';
import { Search, Bell, MessageSquare, User, Home, Gamepad2, Trophy, Flame, Menu, X } from 'lucide-react';

// Données d'exemple pour le forum
const forumCategories = [
  { id: 1, name: 'FPS', count: 124, icon: <Flame size={18} /> },
  { id: 2, name: 'RPG', count: 89, icon: <Trophy size={18} /> },
  { id: 3, name: 'Stratégie', count: 56, icon: <Gamepad2 size={18} /> },
  { id: 4, name: 'Simulation', count: 42, icon: <Gamepad2 size={18} /> },
];

const trendingTopics = [
  { id: 1, title: 'Votre avis sur le nouveau Call of Duty?', replies: 45, views: 1203, author: 'GameMaster', time: '2h' },
  { id: 2, title: 'Guide débutant: Elden Ring', replies: 78, views: 2541, author: 'EldenFan', time: '5h' },
  { id: 3, title: 'Problème de lag sur Fortnite', replies: 23, views: 876, author: 'FortPlayer', time: '1j' },
  { id: 4, title: 'Quels jeux attendez-vous en 2025?', replies: 112, views: 3254, author: 'FuturGamer', time: '2j' },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Gamepad2 className="h-8 w-8 text-secondary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GameForum</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-500" />
              </button>
              
              <button className="p-2 rounded-full hover:bg-gray-100">
                <MessageSquare className="h-6 w-6 text-gray-500" />
              </button>
              
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-700">Profil</span>
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Notifications</span>
              </button>
              
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Messages</span>
              </button>
              
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-700">Profil</span>
              </button>
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg bg-secondary-100 text-secondary-700">
                  <Home size={18} />
                  <span>Accueil</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <Flame size={18} />
                  <span>Tendances</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <Gamepad2 size={18} />
                  <span>Jeux populaires</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                  <Trophy size={18} />
                  <span>Compétitions</span>
                </a>
              </nav>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Catégories</h2>
              <div className="space-y-2">
                {forumCategories.map(category => (
                  <a 
                    key={category.id}
                    href="#" 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-secondary-600">{category.icon}</span>
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Bienvenue sur GameForum</h1>
                <button className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-medium">
                  Nouveau sujet
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-accent-500 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">1,245</h3>
                    <p className="text-sm text-gray-600">Discussions</p>
                  </div>
                </div>
                
                <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-secondary-500 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">8,392</h3>
                    <p className="text-sm text-gray-600">Membres</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">24,567</h3>
                    <p className="text-sm text-gray-600">Messages</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Sujets tendances</h2>
                  <a href="#" className="text-secondary-600 hover:text-secondary-700 text-sm font-medium">
                    Voir tout
                  </a>
                </div>
                
                <div className="border rounded-lg divide-y">
                  {trendingTopics.map(topic => (
                    <div key={topic.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <a href="#" className="text-lg font-medium text-gray-900 hover:text-secondary-600">
                            {topic.title}
                          </a>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">
                              Par <a href="#" className="text-secondary-600">{topic.author}</a>
                            </span>
                            <span className="text-sm text-gray-500">{topic.time}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{topic.replies} réponses</div>
                          <div className="text-sm text-gray-500">{topic.views} vues</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dernières discussions</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-accent-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">RPGMaster</span>
                          <span className="text-sm text-gray-500">il y a 30 min</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full">RPG</span>
                      </div>
                      <p className="text-gray-700">
                        Je viens de terminer Final Fantasy XVI et je dois dire que c'est l'un des meilleurs jeux de la série. Qu'en pensez-vous?
                      </p>
                      <div className="mt-3 flex items-center space-x-4">
                        <button className="text-sm text-gray-500 hover:text-secondary-600 flex items-center space-x-1">
                          <MessageSquare size={16} />
                          <span>Répondre</span>
                        </button>
                        <span className="text-sm text-gray-500">12 réponses</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 ml-6 space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="h-8 w-8 rounded-full bg-secondary-500 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">FFLover</span>
                            <span className="text-sm text-gray-500">il y a 15 min</span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Totalement d'accord! Le système de combat est incroyable et l'histoire est captivante.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-secondary-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">FPSPro</span>
                          <span className="text-sm text-gray-500">il y a 2h</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-accent-100 text-accent-700 rounded-full">FPS</span>
                      </div>
                      <p className="text-gray-700">
                        Quelqu'un a-t-il des conseils pour améliorer sa précision dans les jeux FPS? J'ai du mal à viser correctement.
                      </p>
                      <div className="mt-3 flex items-center space-x-4">
                        <button className="text-sm text-gray-500 hover:text-secondary-600 flex items-center space-x-1">
                          <MessageSquare size={16} />
                          <span>Répondre</span>
                        </button>
                        <span className="text-sm text-gray-500">8 réponses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium">
                  Voir plus de discussions
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Gamepad2 className="h-8 w-8 text-secondary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">GameForum</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 max-w-md">
                La communauté de référence pour tous les passionnés de jeux vidéo. Discutez, partagez et restez informé des dernières actualités.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Navigation</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Accueil</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Tendances</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Catégories</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Membres</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Ressources</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Guides</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Tutoriels</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">FAQ</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Légal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Conditions d'utilisation</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Politique de confidentialité</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-secondary-600">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              &copy; 2025 GameForum. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;