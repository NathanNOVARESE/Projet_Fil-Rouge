// Import necessary libraries and components
import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../lib/store';
import { Mail, Calendar, Trophy, TowerControl as GameController, MessageSquare, Star, Edit, Save, X } from 'lucide-react';
import type { User } from '../types/User';

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const BACKEND_URL = "http://localhost:3001";

// Component for editing the profile
const EditProfile: React.FC = () => {
  // Typage explicite du user
  const { user, darkMode, setUser } = useStore() as { user: User | null; darkMode: boolean; setUser: (u: User) => void };
  const [isEditing, setIsEditing] = useState(false);

  // Pré-remplir le formulaire avec les vraies infos du user connecté
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    banner: user?.banner || ''
  });

  // Add state for password change and email validation
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [emailError, setEmailError] = useState('');

  // Aperçu local
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Fichiers sélectionnés
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  // Réfs pour inputs cachés
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Synchronise le formulaire si le user change (ex: après login)
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        banner: user.banner || ''
      });
      setAvatarPreview(null);
      setBannerPreview(null);
      setAvatarFile(null);
      setBannerFile(null);
    }
  }, [user]);

  // Statistiques dynamiques (exemple, adapte selon ton modèle)
  const profileStats = {
    memberSince: user ? new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '',
    gamesPlayed: user?.gamesPlayed ?? 0,
    tournamentsWon: user?.tournamentsWon ?? 0,
    discussionsStarted: user?.discussionsStarted ?? 0,
    reputation: user?.reputation ?? 0
  };

  // Activité récente (adapte selon ton backend)
  const recentActivities = user?.recentActivities ?? [];

  // Function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle email validation on change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, email: value }));
    setEmailError(validateEmail(value) ? '' : 'Adresse email invalide.');
  };

  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Save password changes
  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users/me/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Erreur lors du changement de mot de passe");
        return;
      }
      alert("Mot de passe mis à jour avec succès !");
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert("Erreur réseau lors du changement de mot de passe");
    }
  };

  // --- GESTION DU CLIC SUR IMAGE ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Format non supporté. JPEG, PNG ou WebP uniquement.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert('Image trop lourde (max 5 Mo)');
      return;
    }
    const url = URL.createObjectURL(file);
    if (type === 'avatar') {
      setAvatarPreview(url);
      setAvatarFile(file);
    } else {
      setBannerPreview(url);
      setBannerFile(file);
    }
  };

  // --- UPLOAD VERS BACKEND ---
  const uploadToBackend = async (file: File, type: 'avatar' | 'banner'): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    form.append('type', type);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    });
    if (!res.ok) throw new Error('Erreur upload');
    const data = await res.json();
    // Retourne l’URL complète
    return `${BACKEND_URL}${data.url}`;
  };

  // --- SAUVEGARDE DU PROFIL ---
  const handleSave = async () => {
    try {
      let avatarUrl = formData.avatar;
      let bannerUrl = formData.banner;
      if (avatarFile) avatarUrl = await uploadToBackend(avatarFile, 'avatar');
      if (bannerFile) bannerUrl = await uploadToBackend(bannerFile, 'banner');

      const token = localStorage.getItem('token');
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          avatar: avatarUrl,
          banner: bannerUrl
        })
      });
      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');
      const data = await res.json();
      setUser(data.user);
      setIsEditing(false);
      setAvatarPreview(null);
      setBannerPreview(null);
      setAvatarFile(null);
      setBannerFile(null);
    } catch (err) {
      alert('Erreur lors de la sauvegarde du profil');
    }
  };

  const getFullImageUrl = (url: string | undefined | null) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads/')) return `${BACKEND_URL}${url}`;
    return url;
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

  // Main profile page layout
  return (
    <div className={`p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
        {/* Bannière */}
        <div
          className="h-48 bg-cover bg-center relative group cursor-pointer"
          style={{
            backgroundImage: `url(${
              bannerPreview ||
              getFullImageUrl(formData.banner) ||
              getFullImageUrl(user.banner)
            })`
          }}
          onClick={() => isEditing && bannerInputRef.current?.click()}
        >
          {isEditing && (
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={e => handleFileChange(e, 'banner')}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="relative px-6 pb-6">
          {/* Profile picture and name */}
          <div className="flex items-center -mt-12">
            <div className="relative group">
              <div
                className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => isEditing && avatarInputRef.current?.click()}
              >
                <img
                  src={
                    avatarPreview ||
                    getFullImageUrl(formData.avatar) ||
                    getFullImageUrl(user.avatar)
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: 'none' }}
                  onChange={e => handleFileChange(e, 'avatar')}
                />
              )}
            </div>
            <div className="ml-4 pt-12">
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="text-2xl font-bold bg-transparent border-b border-blue-500 focus:outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold">{user.username}</h1>
              )}
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <Trophy size={16} className="mr-1 text-yellow-500" />
                Elite de la communauté
              </p>
            </div>
          </div>
          
          {/* Edit and save buttons */}
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
                  onClick={() => {
                    setIsEditing(false);
                    setAvatarPreview(null);
                    setBannerPreview(null);
                    setAvatarFile(null);
                    setBannerFile(null);
                  }}
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

        {/* Profile details and statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 space-y-6">
            {/* Information section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Informations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={20} />
                  {isEditing ? (
                    <div className="w-full">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        className="bg-transparent border-b border-blue-500 focus:outline-none flex-1 w-full"
                      />
                      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                  ) : (
                    <span>{user.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={20} />
                  <span>Membre depuis {profileStats.memberSince}</span>
                </div>
              </div>
              
              {/* Bio section */}
              <div className="mt-4">
                {/* Affiche le message si le compte est admin */}
                {user.isAdmin && (
                  <div className="mb-2 px-3 py-2 rounded bg-purple-100 text-purple-800 font-semibold w-fit">
                    Ce compte est administrateur
                  </div>
                )}
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
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Add password change section, visible only in edit mode */}
            {isEditing && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Modifier le mot de passe</h2>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 space-y-4`}>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 rounded-md bg-transparent border border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 rounded-md bg-transparent border border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirmer le nouveau mot de passe</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 rounded-md bg-transparent border border-blue-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handlePasswordSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Enregistrer le mot de passe
                  </button>
                </div>
              </div>
            )}

            {/* Statistics section */}
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

            {/* Recent activity section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg divide-y ${darkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
                {recentActivities.length === 0 && (
                  <div className="p-4 text-gray-400">Aucune activité récente.</div>
                )}
                {recentActivities.map((activity, index) => (
                  <div key={index} className="p-4 flex justify-between items-center">
                    <span>{activity.content}</span>
                    <span className="text-sm text-gray-500">{activity.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges (exemple statique) */}
          <div className="space-y-6">
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
            {/* Privacy settings, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default EditProfile;