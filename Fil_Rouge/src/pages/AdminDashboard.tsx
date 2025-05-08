import React, { useState, useEffect } from 'react';
import { useStore } from '../lib/store';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Trophy,
  Gamepad2,
  Activity,
  Star,
  Calendar,
  ChevronRight,
  Clock,
  Search,
  MoreHorizontal,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeDiscussions: number;
  trendingTopics: number;
  ongoingTournaments: number;
  newUsers: number;
  engagementRate: number;
}

interface TrendingGame {
  id: string;
  title: string;
  playerCount: number;
  change: number;
  coverImage: string;
  genre: string;
}

interface UpcomingTournament {
  id: string;
  title: string;
  game: string;
  date: string;
  participants: number;
  maxParticipants: number;
  prizePool: string;
  gameIcon: string;
}

interface RecentDiscussion {
  id: string;
  title: string;
  author: string;
  game: string;
  replies: number;
  views: number;
  timeAgo: string;
  tags: string[];
}

const AdminDashboard: React.FC = () => {
  const { user, darkMode } = useStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeDiscussions: 0,
    trendingTopics: 0,
    ongoingTournaments: 0,
    newUsers: 0,
    engagementRate: 0
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const trendingGames: TrendingGame[] = [
    {
      id: '1',
      title: 'Valorant',
      playerCount: 12543,
      change: 15,
      coverImage: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
      genre: 'FPS'
    },
    {
      id: '2',
      title: 'League of Legends',
      playerCount: 34567,
      change: 8,
      coverImage: 'https://images.pexels.com/photos/7862657/pexels-photo-7862657.jpeg',
      genre: 'MOBA'
    },
    {
      id: '3',
      title: 'Counter-Strike 2',
      playerCount: 45678,
      change: -5,
      coverImage: 'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg',
      genre: 'FPS'
    },
    {
      id: '4',
      title: 'Fortnite',
      playerCount: 78901,
      change: 12,
      coverImage: 'https://images.pexels.com/photos/4107820/pexels-photo-4107820.jpeg',
      genre: 'Battle Royale'
    }
  ];

  const upcomingTournaments: UpcomingTournament[] = [
    {
      id: '1',
      title: 'Valorant Champions Tour',
      game: 'Valorant',
      date: '2024-03-15',
      participants: 64,
      maxParticipants: 128,
      prizePool: '$250,000',
      gameIcon: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg'
    },
    {
      id: '2',
      title: 'League of Legends Spring Split',
      game: 'League of Legends',
      date: '2024-03-20',
      participants: 32,
      maxParticipants: 64,
      prizePool: '$500,000',
      gameIcon: 'https://images.pexels.com/photos/7862657/pexels-photo-7862657.jpeg'
    },
    {
      id: '3',
      title: 'CS2 Major Championship',
      game: 'Counter-Strike 2',
      date: '2024-04-05',
      participants: 24,
      maxParticipants: 32,
      prizePool: '$1,000,000',
      gameIcon: 'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg'
    }
  ];

  const recentDiscussions: RecentDiscussion[] = [
    {
      id: '1',
      title: 'New Valorant Agent Discussion - Abilities Breakdown',
      author: 'ProGamer',
      game: 'Valorant',
      replies: 23,
      views: 456,
      timeAgo: '2 hours ago',
      tags: ['Patch Notes', 'Meta']
    },
    {
      id: '2',
      title: 'CS2 Strategy Guide for New Maps',
      author: 'CSMaster',
      game: 'Counter-Strike 2',
      replies: 45,
      views: 892,
      timeAgo: '3 hours ago',
      tags: ['Guide', 'Maps']
    },
    {
      id: '3',
      title: 'LoL Meta Analysis - Best Champions for Ranked',
      author: 'LeaguePro',
      game: 'League of Legends',
      replies: 67,
      views: 1245,
      timeAgo: '5 hours ago',
      tags: ['Meta', 'Ranked']
    },
    {
      id: '4',
      title: 'Fortnite Season 5: New Weapons and Items',
      author: 'FortniteFan',
      game: 'Fortnite',
      replies: 34,
      views: 789,
      timeAgo: '1 hour ago',
      tags: ['Seasonal', 'Items']
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({
          totalUsers: 15234,
          activeDiscussions: 456,
          trendingTopics: 89,
          ongoingTournaments: 12,
          newUsers: 234,
          engagementRate: 68
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="mb-6">Please log in to view the dashboard.</p>
        <a 
          href="/login" 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Log In
        </a>
      </div>
    );
  }

  const filteredTrendingGames = trendingGames.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTournaments = upcomingTournaments.filter(tournament =>
    tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tournament.game.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscussions = recentDiscussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`min-h-screen bg-gray-900 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl text-white font-bold">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, {user.name || 'Admin'}! Here's what's happening today.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        {['overview', 'analytics', 'users', 'content', 'settings'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
        <StatCard
          icon={<Users className="text-blue-500" size={20} />}
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={12}
          darkMode={darkMode}
        />
        <StatCard
          icon={<MessageSquare className="text-green-500" size={20} />}
          title="Active Discussions"
          value={stats.activeDiscussions}
          change={8}
          darkMode={darkMode}
        />
        <StatCard
          icon={<TrendingUp className="text-purple-500" size={20} />}
          title="Trending Topics"
          value={stats.trendingTopics}
          change={23}
          darkMode={darkMode}
        />
        <StatCard
          icon={<Trophy className="text-yellow-500" size={20} />}
          title="Active Tournaments"
          value={stats.ongoingTournaments}
          change={-2}
          darkMode={darkMode}
        />
        <StatCard
          icon={<Users className="text-pink-500" size={20} />}
          title="New Users"
          value={stats.newUsers}
          change={15}
          darkMode={darkMode}
        />
        <StatCard
          icon={<Activity className="text-teal-500" size={20} />}
          title="Engagement Rate"
          value={`${stats.engagementRate}%`}
          change={5}
          darkMode={darkMode}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Trending Games */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg lg:col-span-2`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Gamepad2 className="text-blue-500 mr-2" size={20} />
              Trending Games
            </h2>
            <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
              View All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-left text-sm`}>
                  <th className="pb-3 font-medium">Game</th>
                  <th className="pb-3 font-medium">Genre</th>
                  <th className="pb-3 font-medium">Players</th>
                  <th className="pb-3 font-medium">Trend</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTrendingGames.map(game => (
                  <tr key={game.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={game.coverImage}
                          alt={game.title}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <span className="font-medium">{game.title}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {game.genre}
                      </span>
                    </td>
                    <td className="py-4">{game.playerCount.toLocaleString()}</td>
                    <td className="py-4">
                      <div className={`flex items-center ${
                        game.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {game.change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        <span className="ml-1">{Math.abs(game.change)}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Activity className="text-purple-500 mr-2" size={20} />
            Community Activity
          </h2>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">New Signups</span>
                <span className="text-sm font-medium">{stats.newUsers}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (stats.newUsers / 500) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Discussion Posts</span>
                <span className="text-sm font-medium">{stats.activeDiscussions}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (stats.activeDiscussions / 1000) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Tournament Participation</span>
                <span className="text-sm font-medium">{stats.ongoingTournaments * 20}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (stats.ongoingTournaments * 20 / 500) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Engagement Rate</span>
                <span className="text-sm font-medium">{stats.engagementRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-teal-500 h-2 rounded-full" 
                  style={{ width: `${stats.engagementRate}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { id: 1, text: "New tournament 'Valorant Champions' created", time: "5 min ago" },
                { id: 2, text: "User 'ProGamer' reached level 50", time: "12 min ago" },
                { id: 3, text: "Discussion 'Meta Changes' got 50 replies", time: "23 min ago" },
                { id: 4, text: "124 new users signed up today", time: "1 hour ago" }
              ].map(item => (
                <div key={item.id} className="flex items-start">
                  <div className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${
                    item.id === 1 ? 'bg-blue-500' : 
                    item.id === 2 ? 'bg-green-500' : 
                    item.id === 3 ? 'bg-purple-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="ml-3">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <Clock size={12} className="mr-1" /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tournaments */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Trophy className="text-yellow-500 mr-2" size={20} />
              Upcoming Tournaments
            </h2>
            <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
              View All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {filteredTournaments.map(tournament => (
              <div 
                key={tournament.id} 
                className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
              >
                <div className="flex items-start">
                  <img
                    src={tournament.gameIcon}
                    alt={tournament.game}
                    className="w-12 h-12 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{tournament.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tournament.game}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {new Date(tournament.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Participants</p>
                        <p className="text-sm font-medium">
                          {tournament.participants}/{tournament.maxParticipants}
                        </p>
                        <div className="mt-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${(tournament.participants / tournament.maxParticipants) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Prize Pool</p>
                        <p className="text-sm font-medium">{tournament.prizePool}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Discussions */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <MessageSquare className="text-green-500 mr-2" size={20} />
              Recent Discussions
            </h2>
            <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
              View All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {filteredDiscussions.map(discussion => (
              <div
                key={discussion.id}
                className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{discussion.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {discussion.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-2">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-gray-200 mr-2">{discussion.author}</span>
                    <span>in</span>
                    <span className="font-medium ml-1">{discussion.game}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <MessageSquare size={14} className="mr-1" />
                      <span>{discussion.replies}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {discussion.timeAgo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: number;
  darkMode: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, darkMode }) => {
  return (
    <div className={`p-4 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {icon}
        </div>
      </div>
      <div className={`mt-3 text-sm flex items-center ${
        change >= 0 ? 'text-green-500' : 'text-red-500'
      }`}>
        {change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        <span className="ml-1">{Math.abs(change)}% from last week</span>
      </div>
    </div>
  );
};

export default AdminDashboard;