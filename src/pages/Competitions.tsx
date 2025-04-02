import React from 'react';
import { Trophy, Calendar, Users, MapPin, Clock } from 'lucide-react';

const competitions = [
  {
    id: 1,
    title: 'ESL Pro League Season 19',
    game: 'Counter-Strike 2',
    date: '15-20 Avril 2025',
    prizePool: '1,000,000 €',
    participants: '16 équipes',
    location: 'Paris, France',
    status: 'À venir',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'League of Legends World Championship',
    game: 'League of Legends',
    date: '1-20 Mai 2025',
    prizePool: '2,250,000 €',
    participants: '24 équipes',
    location: 'Seoul, Corée du Sud',
    status: 'Inscriptions ouvertes',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Rocket League Championship Series',
    game: 'Rocket League',
    date: '10-12 Juin 2025',
    prizePool: '500,000 €',
    participants: '32 équipes',
    location: 'En ligne',
    status: 'Bientôt',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  }
];

function Competitions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-accent-500" />
            <h1 className="text-2xl font-bold text-gray-900">Compétitions</h1>
          </div>
          <div className="flex space-x-4">
            <select className="rounded-lg border-gray-300 text-gray-700 text-sm">
              <option>Tous les jeux</option>
              <option>Counter-Strike 2</option>
              <option>League of Legends</option>
              <option>Rocket League</option>
            </select>
            <select className="rounded-lg border-gray-300 text-gray-700 text-sm">
              <option>Tous statuts</option>
              <option>À venir</option>
              <option>En cours</option>
              <option>Terminé</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {competitions.map(competition => (
            <div key={competition.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
              <div className="relative h-48">
                <img src={competition.image} alt={competition.title} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
                  <span className="text-white font-medium">{competition.game}</span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-accent-500 text-white rounded-full text-sm">
                  {competition.status}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{competition.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{competition.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{competition.participants}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{competition.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Trophy className="h-5 w-5 mr-2" />
                    <span>{competition.prizePool}</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition duration-150">
                    S'inscrire
                  </button>
                  <button className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-150">
                    Plus d'infos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendrier des compétitions</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              {competitions.map(competition => (
                <div key={competition.id} className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition duration-150">
                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">{competition.title}</h4>
                      <p className="text-sm text-gray-500">{competition.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                    {competition.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Competitions;