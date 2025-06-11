import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Mail, Calendar, Trophy, TowerControl as GameController, MessageSquare, Star, Edit, Save, X } from 'lucide-react';

const EditProfile: React.FC = () => {
  const { user, darkMode, setUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    banner: user?.banner || ''
  });

  // Mock data
  const profileStats = {
    memberSince: "Mars 2024",
    gamesPlayed: 15,
    tournamentsWon: 3,
    discussionsStarted: 47,
    reputation: 1250
  };

  const recentActivities = [
    {
      type: "comment",
      content: "A commenté sur 'Guide Valorant'",
      date: "Il y a 2 heures"
    },
    {
      type: "tournament",
      content: "A participé au tournoi CS2",
      date: "Il y a 1 jour"
    },
    {
      type: "discussion",
      content: "A créé une discussion sur League of Legends",
      date: "Il y a 2 jours"
    }
  ];

  const [favoriteGames, setFavoriteGames] = useState([
    "Valorant",
    "Counter-Strike 2",
    "League of Legends",
    "Fortnite"
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Vérifie format/taille ici...
    // Upload vers backend
    const form = new FormData();
    form.append('file', file);
    form.append('type', type);
    const res = await fetch('/api/upload', { method: 'POST', body: form });
    if (!res.ok) return alert('Erreur upload');
    const data = await res.json();
    setFormData(prev => ({ ...prev, [type]: data.url }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
      const data = await res.json();
      setUser(data.user); // Mets à jour le store avec le nouvel utilisateur
      setIsEditing(false);
    } catch (err) {
      alert('Erreur lors de la sauvegarde du profil');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Profil non disponible</h1>
        <p className="mb-6">Veuillez vous connecter pour voir votre profil.</p>
        <a 
          href="/login" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Connexion
        </a>
      </div>
    );
  }

  return (
    <div className={`p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
        {/* Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-100">
            <img
              src={formData.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              placeholder="URL de la photo de profil"
              className="mt-2 w-full text-xs border-b border-blue-500 bg-transparent"
            />
          )}
        </div>

        {/* Bannière */}
        <div 
          className="h-48 bg-cover bg-center relative group"
          style={{ backgroundImage: `url(${formData.banner})` }}
        >
          {isEditing && (
            <input
              type="url"
              name="banner"
              value={formData.banner}
              onChange={handleInputChange}
              placeholder="URL de la bannière"
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2/3 text-xs border-b border-blue-500 bg-white/80 px-2 py-1 rounded"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <div className="relative px-6 pb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center -mt-12">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-100">
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full">
                    <Edit size={16} />
                  </button>
                )}
              </div>
              <div className="ml-4 pt-12">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold bg-transparent border-b border-blue-500 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{formData.name}</h1>
                )}
                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                  <Trophy size={16} className="mr-1 text-yellow-500" />
                  Joueur Elite
                </p>
              </div>
            </div>
            
            <div className="pt-6">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 transition-colors"
                  >
                    <Save size={16} className="mr-2" />
                    Enregistrer
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center hover:bg-red-700 transition-colors"
                  >
                    <X size={16} className="mr-2" />
                    Annuler
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                >
                  <Edit size={16} className="mr-2" />
                  Modifier le profil
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="md:col-span-2 space-y-6">
              {/* Informations personnelles */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Informations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={20} />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-transparent border-b border-blue-500 focus:outline-none flex-1"
                      />
                    ) : (
                      <span>{formData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-400" size={20} />
                    <span>Membre depuis {profileStats.memberSince}</span>
                  </div>
                </div>
                
                {/* Bio */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Bio</h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-blue-500 rounded-lg p-2 focus:outline-none"
                      rows={3}
                    />
                  ) : (
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {formData.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Statistiques (position originale) */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                    <GameController className="mx-auto mb-2 text-blue-500" size={24} />
                    <div className="text-2xl font-bold">{profileStats.gamesPlayed}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Jeux joués</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                    <Trophy className="mx-auto mb-2 text-yellow-500" size={24} />
                    <div className="text-2xl font-bold">{profileStats.tournamentsWon}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tournois gagnés</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                    <MessageSquare className="mx-auto mb-2 text-green-500" size={24} />
                    <div className="text-2xl font-bold">{profileStats.discussionsStarted}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Discussions</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg text-center`}>
                    <Star className="mx-auto mb-2 text-purple-500" size={24} />
                    <div className="text-2xl font-bold">{profileStats.reputation}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Réputation</div>
                  </div>
                </div>
              </div>

              {/* Activité récente */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg divide-y ${darkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="p-4 flex justify-between items-center">
                      <span>{activity.content}</span>
                      <span className="text-sm text-gray-500">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar (position originale) */}
            <div className="space-y-6">
              {/* Jeux favoris */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Jeux favoris</h2>
                  {isEditing && (
                    <button className="text-blue-500 text-sm flex items-center">
                      <Edit size={16} className="mr-1" />
                      Modifier
                    </button>
                  )}
                </div>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
                  {favoriteGames.map((game, index) => (
                    <div 
                      key={index}
                      className={`py-2 ${
                        index !== favoriteGames.length - 1 ? `border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}` : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <GameController size={16} className="mr-2 text-blue-500" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={game}
                              onChange={(e) => {
                                const newGames = [...favoriteGames];
                                newGames[index] = e.target.value;
                                setFavoriteGames(newGames);
                              }}
                              className="bg-transparent border-b border-blue-500 focus:outline-none"
                            />
                          ) : (
                            <span>{game}</span>
                          )}
                        </div>
                        {isEditing && (
                          <button 
                            onClick={() => {
                              setFavoriteGames(favoriteGames.filter((_, i) => i !== index));
                            }}
                            className="text-red-500"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      onClick={() => setFavoriteGames([...favoriteGames, "Nouveau jeu"])}
                      className="mt-2 text-blue-500 text-sm flex items-center"
                    >
                      + Ajouter un jeu
                    </button>
                  )}
                </div>
              </div>

              {/* Badges */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Badges</h2>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 grid grid-cols-3 gap-2`}>
                  {[...Array(6)].map((_, index) => (
                    <div 
                      key={index}
                      className={`${
                        darkMode ? 'bg-gray-600' : 'bg-white'
                      } p-2 rounded-lg flex items-center justify-center`}
                    >
                      <Trophy size={24} className="text-yellow-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Paramètres de confidentialité (seulement en mode édition) */}
              {isEditing && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Confidentialité</h2>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span>Profil public</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Afficher l'email</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;