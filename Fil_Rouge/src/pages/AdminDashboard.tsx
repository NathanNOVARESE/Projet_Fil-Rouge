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
  const [isLoading, setIsLoading] = useState(false);

  // Redirige si pas admin
  useEffect(() => {
    if (!user || !user.isAdmin) navigate('/');
  }, [user, navigate]);

  // Fetch toutes les tables à chaque changement d'onglet
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (tab === 'users') {
          const response = await fetch(`${BACKEND_URL}/users`);
          setUsers(await response.json());
        }
        if (tab === 'forums') {
          const response = await fetch(`${BACKEND_URL}/forums`);
          setForums(await response.json());
        }
        if (tab === 'topics') {
          const response = await fetch(`${BACKEND_URL}/topics`);
          setTopics(await response.json());
        }
        if (tab === 'posts') {
          const response = await fetch(`${BACKEND_URL}/posts`);
          setPosts(await response.json());
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tab]);

  // Suppression générique
  const handleDelete = async (type: 'users' | 'forums' | 'topics' | 'posts', id: number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet élément ?')) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/${type}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erreur lors de la suppression");
        return;
      }
      if (type === 'users') setUsers(users.filter(u => u.id !== id));
      if (type === 'forums') setForums(forums.filter(f => f.id !== id));
      if (type === 'topics') setTopics(topics.filter(t => t.id !== id));
      if (type === 'posts') setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      alert("Erreur réseau lors de la suppression");
    }
  };

  // Edition générique (inline)
  const handleEdit = async (type: 'users' | 'forums' | 'topics' | 'posts', id: number, data: any) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/${type}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erreur lors de la modification");
        return;
      }
      const updated = await res.json();
      if (type === 'users') setUsers(users.map(u => u.id === id ? updated.user : u));
      if (type === 'forums') setForums(forums.map(f => f.id === id ? updated.forum : f));
      if (type === 'topics') setTopics(topics.map(t => t.id === id ? updated.topic : t));
      if (type === 'posts') setPosts(posts.map(p => p.id === id ? updated.post : p));
    } catch (err) {
      alert("Erreur réseau lors de la modification");
    }
  };

  // Simple inline edit component
  const EditableCell = ({ value, onSave }: { value: string, onSave: (v: string) => void }) => {
    const [edit, setEdit] = useState(false);
    const [val, setVal] = useState(value);
    return edit ? (
      <input
        className="border px-1 py-0.5 rounded"
        value={val}
        onChange={e => setVal(e.target.value)}
        onBlur={() => { setEdit(false); onSave(val); }}
        onKeyDown={e => { if (e.key === 'Enter') { setEdit(false); onSave(val); } }}
        autoFocus
      />
    ) : (
      <span onClick={() => setEdit(true)} className="cursor-pointer hover:underline">{value}</span>
    );
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{u.id}</td>
                      <td className="px-6 py-4">
                        <EditableCell value={u.username} onSave={val => handleEdit('users', u.id, { ...u, username: val })} />
                      </td>
                      <td className="px-6 py-4">
                        <EditableCell value={u.email} onSave={val => handleEdit('users', u.id, { ...u, email: val })} />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={u.isAdmin ? 'admin' : 'user'}
                          onChange={e => handleEdit('users', u.id, { ...u, isAdmin: e.target.value === 'admin' })}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDelete('users', u.id)} className="text-red-600 hover:text-red-900 mr-4">Supprimer</button>
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forums.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{f.id}</td>
                      <td className="px-6 py-4">
                        <EditableCell value={f.title} onSave={val => handleEdit('forums', f.id, { ...f, title: val })} />
                      </td>
                      <td className="px-6 py-4">
                        <EditableCell value={f.description || ''} onSave={val => handleEdit('forums', f.id, { ...f, description: val })} />
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDelete('forums', f.id)} className="text-red-600 hover:text-red-900 mr-4">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Topics Tab */}
        {!isLoading && tab === 'topics' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ForumId</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topics.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{t.id}</td>
                      <td className="px-6 py-4">
                        <EditableCell value={t.title} onSave={val => handleEdit('topics', t.id, { ...t, title: val })} />
                      </td>
                      <td className="px-6 py-4">{t.forumId || '-'}</td>
                      <td className="px-6 py-4">{t.author?.username || t.createdBy || '-'}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDelete('topics', t.id)} className="text-red-600 hover:text-red-900 mr-4">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {!isLoading && tab === 'posts' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contenu</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{p.id}</td>
                      <td className="px-6 py-4">{p.author?.username || p.createdBy || '-'}</td>
                      <td className="px-6 py-4">
                        <EditableCell value={p.content} onSave={val => handleEdit('posts', p.id, { ...p, content: val })} />
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDelete('posts', p.id)} className="text-red-600 hover:text-red-900 mr-4">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;