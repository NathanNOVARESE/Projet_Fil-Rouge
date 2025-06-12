import React, { useEffect, useState } from 'react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "http://localhost:3001";

const AdminDashboard: React.FC = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'users' | 'forums' | 'topics' | 'posts'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [forums, setForums] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedForum, setSelectedForum] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirige si pas admin
  useEffect(() => {
    if (!user || !user.isAdmin) navigate('/');
  }, [user, navigate]);

  // Fetch data selon le tab
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (tab === 'users') {
          const response = await fetch(`${BACKEND_URL}/users`);
          const data = await response.json();
          setUsers(data);
        }
        if (tab === 'forums') {
          const response = await fetch(`${BACKEND_URL}/forums`);
          const data = await response.json();
          setForums(data);
        }
        if (tab === 'topics' && selectedForum) {
          const response = await fetch(`${BACKEND_URL}/forums/${selectedForum}/topics`);
          const data = await response.json();
          setTopics(data);
        }
        if (tab === 'posts' && selectedTopic) {
          const response = await fetch(`${BACKEND_URL}/topics/${selectedTopic}/posts`);
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tab, selectedForum, selectedTopic]);

  const deleteUser = async (id: number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erreur lors de la suppression");
        return;
      }
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert("Erreur réseau lors de la suppression");
    }
  };

  const updateUserRole = async (id: number, isAdmin: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAdmin }),
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erreur lors du changement de rôle");
        return;
      }
      const data = await res.json();
      setUsers(users.map(u => u.id === id ? data.user : u));
    } catch (err) {
      alert("Erreur réseau lors du changement de rôle");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-indigo-200">Gestion du forum</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setTab('users')}
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                tab === 'users' 
                  ? 'border-b-2 border-indigo-500 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Utilisateurs
            </button>
            <button
              onClick={() => setTab('forums')}
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                tab === 'forums' 
                  ? 'border-b-2 border-indigo-500 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Forums
            </button>
            <button
              onClick={() => setTab('topics')}
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                tab === 'topics' 
                  ? 'border-b-2 border-indigo-500 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Topics
            </button>
            <button
              onClick={() => setTab('posts')}
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                tab === 'posts' 
                  ? 'border-b-2 border-indigo-500 text-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Posts
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Users Tab */}
        {!isLoading && tab === 'users' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={u.isAdmin ? 'admin' : 'user'}
                          onChange={(e) => updateUserRole(u.id, e.target.value === 'admin')}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="text-red-600 hover:text-red-900 mr-4"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Forums Tab */}
        {!isLoading && tab === 'forums' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Liste des Forums</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {forums.map((f) => (
                <li key={f.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-indigo-600">{f.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{f.description || 'Aucune description'}</p>
                    </div>
                    <button
                      onClick={() => { setSelectedForum(f.id); setTab('topics'); }}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Voir Topics
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Topics Tab */}
        {!isLoading && tab === 'topics' && selectedForum && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <button
                  onClick={() => setTab('forums')}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ← Retour aux Forums
                </button>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Topics du Forum</h2>
              <div></div> {/* Empty div for flex spacing */}
            </div>
            <ul className="divide-y divide-gray-200">
              {topics.map((t) => (
                <li key={t.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{t.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Créé par: {t.author?.username || 'Inconnu'} • {new Date(t.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => { setSelectedTopic(t.id); setTab('posts'); }}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Voir Posts
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Posts Tab */}
        {!isLoading && tab === 'posts' && selectedTopic && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <button
                  onClick={() => setTab('topics')}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ← Retour aux Topics
                </button>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Posts du Topic</h2>
              <div></div> {/* Empty div for flex spacing */}
            </div>
            <ul className="divide-y divide-gray-200">
              {posts.map((p) => (
                <li key={p.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        {p.author?.username?.charAt(0).toUpperCase() || '?'}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{p.author?.username || 'Anonyme'}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-800 mt-1 whitespace-pre-line">{p.content}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;