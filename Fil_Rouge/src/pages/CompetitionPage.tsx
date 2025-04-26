import React from 'react';
import { useStore } from '../lib/store';
import { Trophy, Calendar, Users, Medal, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompetitionPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation between pages
  const { darkMode } = useStore(); // Retrieve the global dark mode state

  // Mock data for upcoming tournaments
  const upcomingTournaments = [
    {
      title: "Valorant Champions Tour",
      game: "Valorant",
      date: "15 Mars 2024",
      participants: 128,
      prizePool: "100,000€",
      status: "Inscriptions ouvertes", // Status of the tournament
      timeLeft: "5 jours" // Time left before the tournament starts
    },
    {
      title: "League of Legends Spring Split",
      game: "League of Legends",
      date: "20 Mars 2024",
      participants: 64,
      prizePool: "50,000€",
      status: "Inscriptions ouvertes",
      timeLeft: "10 jours"
    },
    {
      title: "CS2 Major Championship",
      game: "Counter-Strike 2",
      date: "1 Avril 2024",
      participants: 32,
      prizePool: "75,000€",
      status: "Bientôt", // Status indicating the tournament is coming soon
      timeLeft: "22 jours"
    }
  ];

  // Mock data for past tournaments
  const pastTournaments = [
    {
      title: "Fortnite World Cup",
      game: "Fortnite",
      winner: "TeamPro", // Winner of the tournament
      prizeWon: "25,000€", // Prize won by the winner
      participants: 256 // Number of participants
    },
    {
      title: "Apex Legends Global Series",
      game: "Apex Legends",
      winner: "ApexPredators",
      prizeWon: "15,000€",
      participants: 128
    }
  ];

  return (
    <div className={`p-6 ${darkMode ? 'text-white' : ' text-gray-900'}`}>
      {/* Header section */}
      <div className={`p-8 mb-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Trophy className="mr-2 text-blue-500" />
          Compétitions
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Voir les tournois à venir et regarder les meilleurs joueurs
        </p>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming tournaments section */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-gray-300 pb-4">Tournois à venir</h2>
          <div className="space-y-4">
            {upcomingTournaments.map((tournament, index) => (
              <div 
                key={index}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } p-6 rounded-lg shadow hover:shadow-lg transition-shadow`}
              >
                {/* Tournament details */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{tournament.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                      darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tournament.game}
                    </span>
                  </div>
                  {/* Tournament status */}
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    tournament.status === "Inscriptions ouvertes"
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {tournament.status}
                  </div>
                </div>

                {/* Tournament stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">{tournament.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">{tournament.participants} équipes</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">{tournament.prizePool}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">Dans {tournament.timeLeft}</span>
                  </div>
                </div>

                {/* Button to view tournament details */}
                <button 
                  onClick={() => navigate('/prescomp')} // Navigate to the tournament details page
                  className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Voir les infos
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Past tournaments section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Derniers vainqueurs</h2>
          <div className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } p-4 rounded-lg shadow`}>
            {pastTournaments.map((tournament, index) => (
              <div 
                key={index}
                className={`py-4 ${
                  index !== pastTournaments.length - 1 ? 'border-b dark:border-gray-700' : ''
                }`}
              >
                {/* Tournament winner details */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{tournament.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{tournament.game}</span>
                  </div>
                  <Medal className="text-yellow-500" size={24} />
                </div>
                <div className="mt-2">
                  <p className="text-sm">
                    <span className="font-medium">Vainqueur:</span> {tournament.winner}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Prix:</span> {tournament.prizeWon}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Participants:</span> {tournament.participants}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionPage;