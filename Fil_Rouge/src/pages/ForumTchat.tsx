import React, { useState } from 'react';
import { useStore } from '../lib/store';
import { Send, ArrowLeft, MoreVertical, Smile, Image as ImageIcon, File, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForumChat: React.FC = () => {
  const { user, darkMode } = useStore(); // Access the global store for user and dark mode state
  const navigate = useNavigate(); // Hook for navigation between pages

  // State to manage the list of messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: {
        name: "MarcGamer92",
        avatar: "https://thispersondoesnotexist.com/",
        role: "Modérateur"
      },
      content: "Salut tout le monde ! Qui participe au tournoi ce week-end ?", // Message content
      timestamp: "10:30", // Time the message was sent
      likes: 5 // Number of likes on the message
    },
    {
      id: 2,
      user: {
        name: "MarcGamer92",
        avatar: "https://thispersondoesnotexist.com/",
        role: "Membre"
      },
      content: "Je serai là ! J'ai trop hâte, ça va être légendaire 🔥",
      timestamp: "10:32",
      likes: 3
    },
    {
      id: 3,
      user: {
        name: user?.username || "Vous", // Use the current user's username or a default value
        avatar: user?.avatar || "https://thispersondoesnotexist.com/",
        role: "Membre"
      },
      content: "Je viens de m'inscrire, c'est mon premier tournoi ! Des conseils ?", // Message content
      timestamp: "10:35",
      likes: 2,
      isCurrentUser: true // Indicates if the message belongs to the current user
    }
  ]);

  const [newMessage, setNewMessage] = useState(""); // State to manage the input for new messages

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages

    const message = {
      id: messages.length + 1, // Generate a new ID for the message
      user: {
        name: user?.username || "Vous",
        avatar: user?.avatar || "https://thispersondoesnotexist.com/",
        role: "Membre"
      },
      content: newMessage, // Use the input value as the message content
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Current time
      likes: 0, // New messages start with 0 likes
      isCurrentUser: true // Mark the message as sent by the current user
    };

    setMessages([...messages, message]); // Add the new message to the list
    setNewMessage(""); // Clear the input field
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
          {/* Chat group information */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="https://i.pinimg.com/736x/79/d2/60/79d260fd171398929f1c8c2cbc935c90.jpg" 
                  alt="Groupe" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online status indicator */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </div>
            <div>
              <h2 className="font-semibold">YAaaakssss</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">12 membres en ligne</p>
            </div>
          </div>
          {/* Options button */}
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}>
              {/* Avatar for other users */}
              {!message.isCurrentUser && (
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={message.user.avatar} 
                      alt={message.user.name} 
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