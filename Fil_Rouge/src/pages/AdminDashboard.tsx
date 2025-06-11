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

  // Redirige si pas admin
  useEffect(() => {
    if (!user || !user.isAdmin) navigate('/');
  }, [user, navigate]);

  // Fetch data selon le tab
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (tab === 'users') {
      fetch(`${BACKEND_URL}/users`).then(r => r.json()).then(setUsers);
    }
    if (tab === 'forums') {
      fetch(`${BACKEND_URL}/forums`).then(r => r.json()).then(setForums);
    }
    if (tab === 'topics' && selectedForum) {
      fetch(`${BACKEND_URL}/forums/${selectedForum}/topics`).then(r => r.json()).then(setTopics);
    }
    if (tab === 'posts' && selectedTopic) {
      fetch(`${BACKEND_URL}/topics/${selectedTopic}/posts`).then(r => r.json()).then(setPosts);
    }
  }, [tab, selectedForum, selectedTopic]);

  // Actions de suppression (exemple pour users)
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setTab('users')} className={tab === 'users' ? 'font-bold' : ''}>Utilisateurs</button>
        <button onClick={() => setTab('forums')} className={tab === 'forums' ? 'font-bold' : ''}>Forums</button>
        <button onClick={() => setTab('topics')} className={tab === 'topics' ? 'font-bold' : ''}>Topics</button>
        <button onClick={() => setTab('posts')} className={tab === 'posts' ? 'font-bold' : ''}>Posts</button>
      </div>

      {tab === 'users' && (
        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th><th>Nom</th><th>Email</th><th>Admin</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.isAdmin ? 'admin' : 'user'}
                    onChange={e => updateUserRole(u.id, e.target.value === 'admin')}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  {/* Bouton pour supprimer */}
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Supprimer
                  </button>
                  {/* Tu peux ajouter ici un bouton pour éditer (changer isAdmin, etc.) */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'forums' && (
        <div>
          <ul>
            {forums.map(f => (
              <li key={f.id}>
                <span>{f.title}</span>
                {/* Bouton pour voir les topics de ce forum */}
                <button onClick={() => { setSelectedForum(f.id); setTab('topics'); }}>Voir Topics</button>
                {/* Bouton pour supprimer */}
                {/* ... */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'topics' && selectedForum && (
        <div>
          <button onClick={() => setTab('forums')}>Retour Forums</button>
          <ul>
            {topics.map(t => (
              <li key={t.id}>
                <span>{t.title}</span>
                {/* Bouton pour voir les posts de ce topic */}
                <button onClick={() => { setSelectedTopic(t.id); setTab('posts'); }}>Voir Posts</button>
                {/* ... */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'posts' && selectedTopic && (
        <div>
          <button onClick={() => setTab('topics')}>Retour Topics</button>
          <ul>
            {posts.map(p => (
              <li key={p.id}>
                <span>{p.content}</span>
                {/* ... */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;