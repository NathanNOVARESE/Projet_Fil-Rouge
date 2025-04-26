import React, { useState } from 'react';
import { MessageSquare, Users, Flag, Settings, Bell, Search, BarChart2, FileText, ThumbsUp, AlertTriangle, LogOut, Trash2, Edit, Ban, Check, X, Shield, Mail, Lock, Globe } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('activity');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Données mock
  const forumStats = [
    { label: "Membres", value: "24,591", trend: "+12% ce mois" },
    { label: "Posts", value: "189,403", trend: "+23% ce mois" },
    { label: "Topics", value: "15,287", trend: "+8% ce mois" },
    { label: "Activité", value: "92%", trend: "En hausse" }
  ];

  const recentPosts = [
    { 
      id: 1, 
      title: "Meilleur build pour Soraka en S14", 
      author: "LoLPlayer92", 
      date: "10 min", 
      likes: 42,
      game: "League of Legends",
      reported: false
    },
    { 
      id: 2, 
      title: "[BUG] Problème de hitbox sur Mirage", 
      author: "CS2Fan", 
      date: "25 min", 
      likes: 15,
      game: "CS2",
      reported: true
    },
    { 
      id: 3, 
      title: "Guide débutant pour le ranked", 
      author: "ValoCoach", 
      date: "1h", 
      likes: 87,
      game: "Valorant",
      reported: false
    }
  ];

  const reportedContent = [
    {
      id: 1,
      type: "Post",
      reason: "Langage inapproprié",
      content: "Ce joueur est un noob...",
      author: "ToxicPlayer",
      date: "15 min"
    },
    {
      id: 2,
      type: "Commentaire",
      reason: "Spam",
      content: "Venez sur mon stream twitch.tv...",
      author: "Spammer123",
      date: "30 min"
    }
  ];

  // Données mock pour les membres
  const members = [
    {
      id: 1,
      username: "GameMaster",
      email: "gamemaster@example.com",
      joinDate: "15/02/2021",
      lastActive: "Aujourd'hui",
      role: "Admin",
      status: "active"
    },
    {
      id: 2,
      username: "ModeratorPro",
      email: "mod@example.com",
      joinDate: "22/05/2022",
      lastActive: "Hier",
      role: "Modérateur",
      status: "active"
    },
    {
      id: 3,
      username: "ToxicPlayer",
      email: "toxic@example.com",
      joinDate: "10/10/2023",
      lastActive: "3 jours",
      role: "Membre",
      status: "banned"
    }
  ];

  // Données mock pour les posts
  const allPosts = [
    ...recentPosts,
    { 
      id: 4, 
      title: "Discussion générale sur Elden Ring DLC", 
      author: "SoulsFan", 
      date: "2h", 
      likes: 156,
      game: "Elden Ring",
      reported: false
    },
    { 
      id: 5, 
      title: "[SPOILER] Fin alternative découverte", 
      author: "GamerExplorer", 
      date: "5h", 
      likes: 89,
      game: "Baldur's Gate 3",
      reported: true
    }
  ];

  // Données mock pour la modération
  const moderationActions = [
    {
      id: 1,
      action: "Suppression de post",
      moderator: "ModeratorPro",
      target: "Post #4512",
      reason: "Contenu NSFW",
      date: "10 min"
    },
    {
      id: 2,
      action: "Bannissement",
      moderator: "GameMaster",
      target: "Utilisateur Toxic123",
      reason: "Harcèlement répété",
      date: "1h"
    },
    {
      id: 3,
      action: "Avertissement",
      moderator: "ModeratorPro",
      target: "Utilisateur NewPlayer",
      reason: "Spam",
      date: "3h"
    }
  ];

  // Données mock pour les paramètres
  const forumSettings = [
    {
      category: "Général",
      settings: [
        { name: "Nom du forum", value: "GameForum", editable: true },
        { name: "Description", value: "La communauté des gamers passionnés", editable: true },
        { name: "Langue", value: "Français", editable: true }
      ]
    },
    {
      category: "Modération",
      settings: [
        { name: "Posts nécessitant approbation", value: "Oui", editable: true },
        { name: "Niveau de censure", value: "Moyen", editable: true },
        { name: "Signalements nécessaires pour masquer", value: "3", editable: true }
      ]
    },
    {
      category: "Sécurité",
      settings: [
        { name: "Connexion requise", value: "Oui", editable: true },
        { name: "Enregistrement ouvert", value: "Oui", editable: true },
        { name: "Authentification à deux facteurs", value: "Pour les modérateurs", editable: true }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-gray-800 text-white transition-all duration-200`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {!sidebarCollapsed && <h1 className="text-xl font-bold">ModPanel</h1>}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            {sidebarCollapsed ? "»" : "«"}
          </button>
        </div>
        
        <nav className="p-2">
          {[
            { icon: <BarChart2 size={18} />, label: "Activité", id: "activity" },
            { icon: <MessageSquare size={18} />, label: "Posts", id: "posts" },
            { icon: <Users size={18} />, label: "Membres", id: "members" },
            { icon: <Flag size={18} />, label: "Signalements", id: "reports" },
            { icon: <AlertTriangle size={18} />, label: "Modération", id: "moderation" },
            { icon: <Settings size={18} />, label: "Paramètres", id: "settings" }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full p-3 rounded mb-1 ${
                activeTab === item.id ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {!sidebarCollapsed && item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {activeTab === 'activity' && 'Activité du forum'}
            {activeTab === 'posts' && 'Gestion des posts'}
            {activeTab === 'members' && 'Gestion des membres'}
            {activeTab === 'reports' && 'Contenu signalé'}
            {activeTab === 'moderation' && 'Historique de modération'}
            {activeTab === 'settings' && 'Paramètres du forum'}
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                AD
              </div>
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium">Admin</span>
                  <LogOut size={18} className="text-gray-500" />
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'activity' && (
            <>
              {/* Forum statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {forumStats.map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-green-500 text-xs mt-1">{stat.trend}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Posts */}
                <div className="lg:col-span-2 bg-white p-5 rounded-lg border shadow-sm">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <MessageSquare className="mr-2" size={18} />
                    Derniers posts
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map(post => (
                      <div key={post.id} className={`p-3 rounded border ${
                        post.reported ? 'border-red-200 bg-red-50' : 'border-gray-200'
                      }`}>
                        <div className="flex justify-between">
                          <h4 className="font-medium">{post.title}</h4>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {post.game}
                          </span>
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>Par {post.author} · {post.date}</span>
                          <div className="flex items-center">
                            <ThumbsUp size={14} className="mr-1" />
                            {post.likes}
                            {post.reported && (
                              <Flag size={14} className="ml-2 text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reported Content */}
                <div className="bg-white p-5 rounded-lg border shadow-sm">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Flag className="mr-2" size={18} />
                    Signalements récents
                  </h3>
                  <div className="space-y-3">
                    {reportedContent.map(item => (
                      <div key={item.id} className="p-3 rounded border border-red-200 bg-red-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              {item.type}
                            </span>
                            <p className="mt-2 text-sm line-clamp-2">{item.content}</p>
                          </div>
                          <button className="text-xs bg-white border px-2 py-1 rounded hover:bg-gray-50">
                            Voir
                          </button>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>Par {item.author}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'posts' && (
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-5 border-b">
                <h3 className="font-semibold">Tous les posts</h3>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Tous
                  </button>
                  <button className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">
                    Signalés
                  </button>
                  <button className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">
                    Populaires
                  </button>
                </div>
              </div>
              
              <div className="divide-y">
                {allPosts.map(post => (
                  <div key={post.id} className={`p-4 flex justify-between items-center ${
                    post.reported ? 'bg-red-50' : ''
                  }`}>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{post.title}</h4>
                      <div className="flex mt-1 text-sm text-gray-500">
                        <span className="truncate">Par {post.author} · {post.date} · {post.game}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="flex items-center text-sm">
                        <ThumbsUp size={14} className="mr-1" />
                        {post.likes}
                      </span>
                      {post.reported && (
                        <span className="text-red-500">
                          <Flag size={16} />
                        </span>
                      )}
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t flex justify-between items-center">
                <span className="text-sm text-gray-500">1-5 sur 189,403 posts</span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">
                    Précédent
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-5 border-b">
                <h3 className="font-semibold">Gestion des membres</h3>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                      Tous
                    </button>
                    <button className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">
                      Admins
                    </button>
                    <button className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">
                      Modérateurs
                    </button>
                    <button className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">
                      Bannis
                    </button>
                  </div>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm flex items-center">
                    <Users size={16} className="mr-1" />
                    Nouveau membre
                  </button>
                </div>
              </div>
              
              <div className="divide-y">
                {members.map(member => (
                  <div key={member.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {member.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium truncate">{member.username}</h4>
                        <p className="text-sm text-gray-500 truncate">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block text-sm text-gray-500">
                      Inscrit le {member.joinDate}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        member.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                        member.role === 'Modérateur' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {member.role}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {member.status === 'active' ? 'Actif' : 'Banni'}
                      </span>
                      
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-500 hover:text-blue-600">
                          <Mail size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-yellow-600">
                          <Edit size={16} />
                        </button>
                        {member.status === 'active' ? (
                          <button className="p-1 text-gray-500 hover:text-red-600">
                            <Ban size={16} />
                          </button>
                        ) : (
                          <button className="p-1 text-gray-500 hover:text-green-600">
                            <Check size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t flex justify-between items-center">
                <span className="text-sm text-gray-500">1-3 sur 24,591 membres</span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-white border rounded text-sm hover:bg-gray-50">
                    Précédent
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Flag className="mr-2" size={18} />
                  Signalements en attente
                </h3>
                <div className="space-y-3">
                  {reportedContent.map(item => (
                    <div key={item.id} className="p-4 rounded border border-red-200 bg-red-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              {item.type}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              {item.reason}
                            </span>
                          </div>
                          <p className="mt-2 text-sm">{item.content}</p>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Par {item.author} · {item.date}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="px-3 py-1 bg-white border border-green-500 text-green-500 rounded text-sm hover:bg-green-50 flex items-center">
                            <Check size={14} className="mr-1" />
                            Approuver
                          </button>
                          <button className="px-3 py-1 bg-white border border-red-500 text-red-500 rounded text-sm hover:bg-red-50 flex items-center">
                            <X size={14} className="mr-1" />
                            Rejeter
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center">
                            <Trash2 size={14} className="mr-1" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-4">Statistiques des signalements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded border border-blue-100">
                    <h4 className="text-sm text-blue-800">Signalements ce mois</h4>
                    <p className="text-2xl font-bold mt-1">124</p>
                    <p className="text-green-500 text-xs mt-1">+15% vs mois dernier</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded border border-red-100">
                    <h4 className="text-sm text-red-800">Contenu supprimé</h4>
                    <p className="text-2xl font-bold mt-1">87</p>
                    <p className="text-green-500 text-xs mt-1">62% des signalements</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded border border-green-100">
                    <h4 className="text-sm text-green-800">Temps moyen de traitement</h4>
                    <p className="text-2xl font-bold mt-1">22 min</p>
                    <p className="text-red-500 text-xs mt-1">+5 min vs mois dernier</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'moderation' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Shield className="mr-2" size={18} />
                  Actions récentes de modération
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modérateur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cible</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raison</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {moderationActions.map(action => (
                        <tr key={action.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{action.action}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{action.moderator}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{action.target}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{action.reason}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{action.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border shadow-sm">
                  <h3 className="font-semibold mb-4">Modérateurs actifs</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                          M
                        </div>
                        <span className="font-medium">ModeratorPro</span>
                      </div>
                      <span className="text-sm text-green-600">En ligne</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800">
                          G
                        </div>
                        <span className="font-medium">GameMaster</span>
                      </div>
                      <span className="text-sm text-gray-500">Hors ligne</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border shadow-sm">
                  <h3 className="font-semibold mb-4">Ajouter un modérateur</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Rechercher un membre..."
                        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                      Attribuer les droits
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-6">Paramètres du forum</h3>
                
                {forumSettings.map((category, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h4 className="text-lg font-medium mb-4 flex items-center">
                      {category.category === 'Général' && <Globe className="mr-2" size={18} />}
                      {category.category === 'Modération' && <Shield className="mr-2" size={18} />}
                      {category.category === 'Sécurité' && <Lock className="mr-2" size={18} />}
                      {category.category}
                    </h4>
                    
                    <div className="space-y-3">
                      {category.settings.map((setting, sIndex) => (
                        <div key={sIndex} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded hover:bg-gray-50">
                          <div className="mb-2 sm:mb-0">
                            <h5 className="font-medium">{setting.name}</h5>
                            {setting.editable && (
                              <p className="text-sm text-gray-500">Cliquez pour modifier</p>
                            )}
                          </div>
                          <div className="flex items-center">
                            <span className={`px-3 py-1 rounded text-sm ${
                              setting.editable ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {setting.value}
                            </span>
                            {setting.editable && (
                              <button className="ml-2 p-1 text-gray-500 hover:text-blue-600">
                                <Edit size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-5 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-4">Actions avancées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 border rounded hover:bg-gray-50 flex flex-col items-center">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-2">
                      <Trash2 size={20} />
                    </div>
                    <span className="font-medium">Vider le cache</span>
                    <span className="text-sm text-gray-500">Supprime les données temporaires</span>
                  </button>
                  <button className="p-4 border rounded hover:bg-gray-50 flex flex-col items-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2">
                      <FileText size={20} />
                    </div>
                    <span className="font-medium">Sauvegarde</span>
                    <span className="text-sm text-gray-500">Créer une sauvegarde complète</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;