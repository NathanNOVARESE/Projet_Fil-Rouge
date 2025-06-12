import React, { useEffect, useState } from 'react';
import { useStore } from '../lib/store';
import { Send, ArrowLeft, MoreVertical, Smile, Image as ImageIcon, File, Heart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ForumChat: React.FC = () => {
  const { user, darkMode } = useStore();
  const navigate = useNavigate();
  const { id: topicId } = useParams();

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [topic, setTopic] = useState<any>(null);

  // Menu déroulant
  const [menuOpen, setMenuOpen] = useState(false);
  // Modal d'édition
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState("");

  useEffect(() => {
    if (!topicId) return;
    setLoading(true);

    const fetchMessages = () => {
      fetch(`/api/topics/${topicId}/messages`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .finally(() => setLoading(false));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, [topicId]);

  useEffect(() => {
    if (!topicId) return;
    fetch(`/api/topics/${topicId}`)
      .then(res => res.json())
      .then(data => {
        setTopic(data);
        setEditTitle(data.title);
        setEditContent(data.content || "");
        setEditTags(Array.isArray(data.tags) ? data.tags.map(t => t.name).join(", ") : "");
      });
  }, [topicId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !user) return;

    const msgToSend = {
      content: newMessage,
      createdBy: user.id
    };

    const res = await fetch(`/api/topics/${topicId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msgToSend)
    });

    if (res.ok) {
      const saved = await res.json();
      setMessages([...messages, { ...saved, user }]);
      setNewMessage("");
    }
  };

  const handleEditTopic = () => {
    setEditOpen(true);
    setMenuOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await fetch(`/api/topics/${topic.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
        tags: editTags.split(",").map(t => t.trim()).filter(Boolean),
        userId: user.id
      })
    });
    setTopic({ ...topic, title: editTitle, content: editContent, tags: editTags.split(",").map(t => t.trim()).filter(Boolean) });
    setEditOpen(false);
  };

  const handleDeleteTopic = async () => {
    if (!window.confirm("Supprimer ce topic ?")) return;
    if (!user) return;
    const res = await fetch(`/api/topics/${topic.id}/${user.id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      navigate(-1);
    } else {
      const err = await res.json();
      alert(err.error || "Erreur lors de la suppression");
    }
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header section */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center justify-between">
          {/* Back button */}
          <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ArrowLeft size={20} />
          </button>
          {/* Topic title centré */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src="https://i.pinimg.com/736x/79/d2/60/79d260fd171398929f1c8c2cbc935c90.jpg" 
                    alt="Groupe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </div>
              <h2 className="font-semibold text-lg">
                {topic ? topic.title : "Chargement..."}
              </h2>
            </div>
          </div>
          {/* Options button */}
          {user?.id === topic?.createdBy && (
            <div className="relative">
              <button
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <MoreVertical size={20} />
              </button>
              {menuOpen && (
                <div className={`absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10`}>
                  <button
                    onClick={handleEditTopic}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={handleDeleteTopic}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Modal d'édition */}
        {editOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <form
              onSubmit={handleEditSubmit}
              className={`bg-white dark:bg-gray-800 p-6 rounded shadow-lg flex flex-col space-y-4`}
            >
              <h3 className="font-bold text-lg mb-2">Modifier le topic</h3>
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="border px-3 py-2 rounded"
                required
                placeholder="Titre"
              />
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                className="border px-3 py-2 rounded"
                placeholder="Contenu"
                rows={3}
              />
              <input
                type="text"
                value={editTags}
                onChange={e => setEditTags(e.target.value)}
                className="border px-3 py-2 rounded"
                placeholder="Tags (séparés par des virgules)"
              />
              <div className="flex space-x-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Messages section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.createdBy === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${message.createdBy === user?.id ? 'flex-row-reverse' : ''}`}>
              {/* Avatar for other users */}
              {message.createdBy !== user?.id && (
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={message.user?.avatar || ""} 
                      alt={message.user?.name || ""} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <div>
                {/* Message metadata */}
                {!message.isCurrentUser && (
                  <div className="flex items-center mb-1 space-x-2">
                    <span className="font-semibold text-sm">{message.user.name}</span>
                    {message.user.role === "Modérateur" && (
                      <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">Modo</span>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                  </div>
                )}
                {/* Message content */}
                <div 
                  className={`p-3 rounded-lg ${message.isCurrentUser 
                    ? darkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-500 text-white'
                    : darkMode 
                      ? 'bg-gray-700' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                {/* Message actions */}
                <div className={`flex items-center mt-1 space-x-3 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500">
                    Reply
                  </button>
                  <button className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-red-500">
                    <Heart size={14} className="mr-1" />
                    {message.likes}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className={`p-3 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center space-x-2">
          {/* Emoji button */}
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Smile size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
          {/* Image upload button */}
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ImageIcon size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
          {/* File upload button */}
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <File size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
          {/* Message input */}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Write a message..."
            className={`flex-1 py-2 px-4 rounded-full ${darkMode ? 'bg-gray-700 focus:bg-gray-600' : 'bg-gray-100 focus:bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* Send button */}
          <button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${newMessage.trim() 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumChat;