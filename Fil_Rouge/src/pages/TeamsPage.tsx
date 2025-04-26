import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Users, Trophy, Calendar, Search, ChevronDown, ChevronUp, Twitter, Instagram, Globe } from 'lucide-react';

const TeamsPage: React.FC = () => {
  const { darkMode } = useStore();
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGame, setFilterGame] = useState('ALL');
  const [filterRegion, setFilterRegion] = useState('ALL');

  // Mock data for teams
  const teams = [
    {
      media: {
          coverImage: 'https://img.freepik.com/photos-gratuite/amis-vue-cote-gagnant-jeu-video_23-2149349984.jpg?semt=ais_hybrid&w=740',
        },
        


      id: 1,
      name: 'Team Vitality',
      logo: '',
      game: 'Counter-Strike 2',
      region: 'Europe',
      established: 2013,
      players: [
        { name: 'ZywOo', role: 'AWPer', nationality: 'FR' },
        { name: 'Spinx', role: 'Rifler', nationality: 'IL' },
        { name: 'flameZ', role: 'Rifler', nationality: 'IL' },
        { name: 'apEX', role: 'IGL', nationality: 'FR' },
        { name: 'Magisk', role: 'Support', nationality: 'DK' }
      ],
      achievements: [
        { title: 'Major Paris 2023', year: 2023 },
        { title: 'IEM Rio 2023', year: 2023 },
        { title: 'EPL S17', year: 2023 }
      ],
      socials: {
        twitter: 'https://twitter.com/TeamVitality',
        instagram: 'https://instagram.com/TeamVitality',
        website: 'https://vitality.gg'
      },
      upcomingMatches: [
        { opponent: 'FaZe Clan', date: '15/11/2023', event: 'BLAST Premier' },
        { opponent: 'G2 Esports', date: '18/11/2023', event: 'IEM Cologne' }
      ],
      stats: {
        winRate: '72%',
        recentForm: ['W', 'W', 'L', 'W', 'W'],
        worldRanking: 1
      }
    },
    {
      id: 2,
      name: 'T1',
      logo: '',
      game: 'League of Legends',
      region: 'Korea',
      established: 2002,
      players: [
        { name: 'Faker', role: 'Mid', nationality: 'KR' },
        { name: 'Zeus', role: 'Top', nationality: 'KR' },
        { name: 'Oner', role: 'Jungle', nationality: 'KR' },
        { name: 'Gumayusi', role: 'ADC', nationality: 'KR' },
        { name: 'Keria', role: 'Support', nationality: 'KR' }
      ],
      achievements: [
        { title: 'Worlds 2023', year: 2023 },
        { title: 'LCK Summer 2023', year: 2023 },
        { title: 'MSI 2022', year: 2022 }
      ],
      socials: {
        twitter: 'https://twitter.com/T1LoL',
        instagram: 'https://instagram.com/T1',
        website: 'https://t1.gg'
      },
      upcomingMatches: [
        { opponent: 'Gen.G', date: '20/11/2023', event: 'LCK Finals' },
        { opponent: 'DRX', date: '25/11/2023', event: 'KeSPA Cup' }
      ],
      stats: {
        winRate: '68%',
        recentForm: ['W', 'L', 'W', 'W', 'W'],
        worldRanking: 2
      }
    },
    {
      id: 3,
      name: 'Team SoloMid',
      logo: '',
      game: 'Valorant',
      region: 'North America',
      established: 2009,
      players: [
        { name: 'Corey', role: 'Duelist', nationality: 'US' },
        { name: 'gMd', role: 'Initiator', nationality: 'CA' },
        { name: 'seven', role: 'Controller', nationality: 'US' },
        { name: 'Rossy', role: 'Sentinel', nationality: 'US' },
        { name: 'valyn', role: 'IGL', nationality: 'US' }
      ],
      achievements: [
        { title: 'VCT NA 2023', year: 2023 },
        { title: 'Champions Tour', year: 2022 }
      ],
      socials: {
        twitter: 'https://twitter.com/TSM',
        instagram: 'https://instagram.com/TSM',
        website: 'https://tsm.gg'
      },
      upcomingMatches: [
        { opponent: 'Sentinels', date: '12/11/2023', event: 'VCT Americas' },
        { opponent: 'LOUD', date: '15/11/2023', event: 'VCT Playoffs' }
      ],
      stats: {
        winRate: '65%',
        recentForm: ['W', 'L', 'W', 'L', 'W'],
        worldRanking: 5
      }
    }
  ];

  const games = ['ALL', 'Counter-Strike 2', 'League of Legends', 'Valorant', 'Fortnite', 'Dota 2'];
  const regions = ['ALL', 'Europe', 'North America', 'Korea', 'China', 'Brazil', 'Japan'];

  const filteredTeams = teams.filter(team => {
    return (
      (searchTerm === '' || team.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterGame === 'ALL' || team.game === filterGame) &&
      (filterRegion === 'ALL' || team.region === filterRegion)
    );
  });

  const toggleTeam = (id: number) => {
    setExpandedTeam(expandedTeam === id ? null : id);
  };

  return (
    <div className={`min-h-screen rounded-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 w-full bg-gradient-to-r from-purple-600 to-blue-600 relative">
          <img 
            src={teams[0]?.media?.coverImage || ''} 
            alt="Cover Image" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Équipes Esport</h1>
              <p className="text-xl">Découvrez les meilleures équipes professionnelles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Rechercher</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom d'équipe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 rounded-md ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  } border`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jeu</label>
              <select
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className={`w-full px-3 py-2 rounded-md ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } border`}
              >
                {games.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Région</label>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className={`w-full px-3 py-2 rounded-md ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } border`}
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Teams List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map(team => (
            <div 
              key={team.id}
              className={`rounded-lg overflow-hidden shadow-lg transition-all duration-200 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Team Header */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleTeam(team.id)}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={team.logo} 
                    alt={team.name} 
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{team.name}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {team.game}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {team.region}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Stats */}
              <div className="px-6 pb-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className={`p-2 rounded ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
                    <p className="font-semibold">{team.stats.winRate}</p>
                  </div>
                  <div className={`p-2 rounded ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Forme</p>
                    <div className="flex justify-center space-x-1">
                      {team.stats.recentForm.map((result, i) => (
                        <span 
                          key={i}
                          className={`w-5 h-5 flex items-center justify-center rounded text-xs ${
                            result === 'W' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`p-2 rounded ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Classement</p>
                    <p className="font-semibold">#{team.stats.worldRanking}</p>
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              {expandedTeam === team.id && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                  {/* Players */}
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Users size={18} className="mr-2" />
                      Joueurs
                    </h3>
                    <ul className="space-y-2">
                      {team.players.map((player, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-200'
                            }`}>
                              {player.nationality}
                            </span>
                            <span>{player.name}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            {player.role}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Trophy size={18} className="mr-2" />
                      Palmarès
                    </h3>
                    <ul className="space-y-2">
                      {team.achievements.map((achievement, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{achievement.title}</span>
                          <span className="text-gray-500 dark:text-gray-400">{achievement.year}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Upcoming Matches */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Calendar size={18} className="mr-2" />
                      Prochains matchs
                    </h3>
                    <ul className="space-y-2">
                      {team.upcomingMatches.map((match, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <div>
                            <p>vs {match.opponent}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{match.event}</p>
                          </div>
                          <span className="text-gray-500 dark:text-gray-400">{match.date}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Socials */}
                  <div className="mt-6 flex space-x-3">
                    <a 
                      href={team.socials.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      <Twitter size={18} />
                    </a>
                    <a 
                      href={team.socials.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      <Instagram size={18} />
                    </a>
                    <a 
                      href={team.socials.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      <Globe size={18} />
                    </a>
                  </div>
                </div>
              )}

              {/* Toggle Button */}
              <div className="px-6 pb-4">
                <button
                  onClick={() => toggleTeam(team.id)}
                  className={`w-full py-2 rounded-b-lg flex items-center justify-center ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {expandedTeam === team.id ? (
                    <ChevronUp size={18} className="mr-1" />
                  ) : (
                    <ChevronDown size={18} className="mr-1" />
                  )}
                  {expandedTeam === team.id ? 'Réduire' : 'Voir plus'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;