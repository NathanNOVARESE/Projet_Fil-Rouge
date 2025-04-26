import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Star, Users, MessageSquare, Calendar, Download, Gamepad2, ChevronDown, ChevronUp, Share2, Bookmark, Eye, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GamePres: React.FC = () => {
  // Access user and dark mode state from the store
  const { user, darkMode } = useStore();
  const [showFullDescription, setShowFullDescription] = useState(false); // State to toggle full description
  const navigate = useNavigate(); // React Router hook for navigation
  const [activeTab, setActiveTab] = useState('overview'); // State to manage active tab

  // Game data mock
  const game = {
    id: 'valorant',
    title: 'Valorant',
    developer: 'Riot Games',
    releaseDate: '02/06/2020',
    genre: 'FPS Tactique',
    platforms: ['PC'],
    rating: 4.8,
    reviewsCount: 12453,
    playersCount: 15000000,
    description: `Valorant est un jeu de tir tactique en 5v5 où les joueurs incarnent des agents aux capacités uniques. 
    Chaque partie se déroule en 25 manches maximum, avec une équipe attaquante et une équipe défensive. 
    Le jeu allie précision mécanique et stratégie d'équipe pour une expérience compétitive intense.
    
    ${showFullDescription ? `
    Avec plus de 20 agents uniques, chaque partie offre des possibilités tactiques différentes. 
    Les cartes sont conçues pour encourager les combats stratégiques et les prises de décision rapides. 
    Le système économique entre les manches ajoute une couche supplémentaire de profondeur tactique.
    ` : ''}`,
    features: [
      'Mode compétitif classé',
      'Plus de 20 agents uniques',
      '6 cartes différentes',
      'Mises à jour régulières',
      'Anti-cheat robuste'
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core 2 Duo E8400',
        memory: '4 GB RAM',
        graphics: 'Intel HD 4000',
        storage: '10 GB'
      },
      recommended: {
        os: 'Windows 10 64-bit',
        processor: 'Intel i3-4150',
        memory: '8 GB RAM',
        graphics: 'GeForce GTX 730',
        storage: '10 GB'
      }
    },
    media: {
      coverImage: 'https://images4.alphacoders.com/136/1363796.jpeg',
      screenshots: [
        'https://i.pinimg.com/736x/a9/4f/9e/a94f9eede9223fdc14e2dc8909e519bd.jpg',
        'https://i.pinimg.com/736x/79/a8/a6/79a8a679df49156c06bf28d6db4e64de.jpg',
        'https://i.pinimg.com/736x/62/c8/dc/62c8dce6249d27bc220dfcffef2fa2b2.jpg'
      ],
      trailer: 'https://www.youtube.com/embed/e_E9W2vsRbQ'
    },
    tournaments: [
      {
        id: 1,
        name: 'Championnat Français Valorant',
        date: '15/06/2023',
        prize: '10 000€',
        participants: 128
      },
      {
        id: 2,
        name: 'Valorant Community Cup',
        date: '30/06/2023',
        prize: '5 000€',
        participants: 64
      }
    ],
    discussions: [
      {
        id: 1,
        title: 'Meta actuelle des agents',
        author: 'ProPlayer',
        replies: 42,
        views: 1200,
        lastActivity: 'Il y a 2 heures'
      },
      {
        id: 2,
        title: 'Guide des positions sur Haven',
        author: 'CoachValo',
        replies: 18,
        views: 850,
        lastActivity: 'Il y a 5 heures'
      }
    ]
  };

  // Toggle description visibility
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className={`min-h-screen rounded-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 w-full overflow-hidden">
          <img 
            src={game.media.coverImage} 
            alt={game.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"></div>
        </div>
        <div className="container mx-auto px-4 relative -mt-20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-48 h-64 rounded-lg overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
              <img 
                src="https://i.pinimg.com/736x/67/c0/7e/67c07ead929b049e453bedda45980b79.jpg" 
                alt={`${game.title} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 text-white">{game.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-300">
                <span className="flex items-center text-yellow-500">
                  <Star size={18} className="mr-1" />
                  {game.rating}/5 ({game.reviewsCount.toLocaleString()} avis)
                </span>
                <span className="flex items-center">
                  <Users size={18} className="mr-1" />
                  {game.playersCount.toLocaleString()} joueurs
                </span>
                <span className="flex items-center">
                  <Gamepad2 size={18} className="mr-1" />
                  {game.genre}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {game.platforms.map((platform, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors">
                  <Download size={18} className="mr-2" />
                  Installer
                </button>
                <button className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Bookmark size={18} />
                </button>
                <button className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">

        {/* Back Button Section */}
        <div className="container mx-auto pb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" />
            Retour
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
          <div className="flex space-x-8">
            {['overview', 'media', 'tournaments', 'community'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium ${
                  activeTab === tab
                    ? darkMode
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : darkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-800'
                } transition-colors capitalize`}
              >
                {tab === 'overview' ? 'Aperçu' : 
                 tab === 'media' ? 'Médias' : 
                 tab === 'tournaments' ? 'Tournois' : 'Communauté'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <>
                <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow mb-6`}>
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {game.description}
                  </p>
                  <button
                    onClick={toggleDescription}
                    className="flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {showFullDescription ? (
                      <>
                        <ChevronUp size={16} className="mr-1" />
                        Voir moins
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} className="mr-1" />
                        Voir plus
                      </>
                    )}
                  </button>
                </div>

                <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow mb-6`}>
                  <h2 className="text-2xl font-bold mb-4">Fonctionnalités</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {game.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow`}>
                  <h2 className="text-2xl font-bold mb-4">Configuration requise</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Minimum</h3>
                      <ul className="space-y-2">
                        {Object.entries(game.systemRequirements.minimum).map(([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{key}:</span>
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Recommandé</h3>
                      <ul className="space-y-2">
                        {Object.entries(game.systemRequirements.recommended).map(([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{key}:</span>
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe 
                      src={game.media.trailer} 
                      title={`${game.title} Trailer`}
                      className="w-full h-96"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Captures d'écran</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {game.media.screenshots.map((screenshot, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                        <img 
                          src={screenshot} 
                          alt={`${game.title} screenshot ${index + 1}`} 
                          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tournaments' && (
                <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Tournois à venir</h2>
                {game.tournaments.map(tournament => (
                  <div 
                  key={tournament.id}
                  onClick={() => navigate('/prescomp')}
                  className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                  >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-1">{tournament.name}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {tournament.date}
                      </span>
                      <span className="flex items-center">
                      <Users size={16} className="mr-1" />
                      {tournament.participants} participants
                      </span>
                    </div>
                    </div>
                    <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-yellow-500">{tournament.prize}</span>
                    <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Voir le tournoi
                    </button>
                    </div>
                  </div>
                  </div>
                ))}
                </div>
            )}

            {activeTab === 'community' && (
                <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Discussions récentes</h2>
                {game.discussions.map(discussion => (
                  <div 
                  key={discussion.id}
                  onClick={() => navigate('/tchat')}
                  className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                  >
                  <h3 className="text-lg font-semibold mb-1">{discussion.title}</h3>
                  <div className="flex flex-wrap items-center justify-between text-sm">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Par {discussion.author}
                    </span>
                    <div className="flex space-x-4">
                    <span className="flex items-center">
                      <MessageSquare size={16} className="mr-1" />
                      {discussion.replies} réponses
                    </span>
                    <span className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      {discussion.views} vues
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {discussion.lastActivity}
                    </span>
                    </div>
                  </div>
                  </div>
                ))}
                </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow`}>
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Joueurs actifs</h3>
                  <p className="text-2xl font-bold">1.2M</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Temps de jeu moyen</h3>
                  <p className="text-2xl font-bold">4.7h</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Note communautaire</h3>
                  <div className="flex items-center">
                    <Star size={20} className="text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold">{game.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow`}>
              <h2 className="text-xl font-semibold mb-4">Développeur</h2>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src="https://i.pinimg.com/736x/af/e9/ca/afe9caf7daea0349e5e1a2104b3d9852.jpg" 
                    alt={game.developer} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{game.developer}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sortie: {game.releaseDate}</p>
                </div>
              </div>
            </div>

            <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 shadow`}>
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {['FPS', 'Compétitif', 'Tactique', '5v5', 'Free-to-play'].map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePres;