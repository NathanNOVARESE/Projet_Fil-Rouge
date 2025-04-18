import React, { useState, useEffect } from 'react';
import { useStore } from '../lib/store';
import { ListTodo, CheckSquare, Clock, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, tasks, darkMode } = useStore();
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Welcome to Task Manager</h1>
        <p className="mb-6">Please log in or sign up to start managing your tasks.</p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/login" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Log In
          </a>
          <a 
            href="/register" 
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const overdueTasks = tasks.filter(task => 
    !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
  ).length;
  const upcomingTasks = tasks.filter(task => 
    !task.completed && task.dueDate && 
    new Date(task.dueDate) >= new Date() && 
    new Date(task.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  const statCards = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: <ListTodo size={24} className="text-blue-500" />,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: <CheckSquare size={24} className="text-green-500" />,
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
    },
    {
      title: 'Upcoming (7 days)',
      value: upcomingTasks,
      icon: <Clock size={24} className="text-purple-500" />,
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
    },
    {
      title: 'Overdue',
      value: overdueTasks,
      icon: <AlertTriangle size={24} className="text-red-500" />,
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
    },
  ];

  // Today's tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaysTasks = tasks.filter(task => {
    if (task.completed) return false;
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, index) => (
          <div 
            key={index}
            className={`${card.bg} ${card.border} border rounded-lg p-4 flex items-center transition-transform duration-200 hover:transform hover:scale-105`}
          >
            <div className="mr-4">
              {card.icon}
            </div>
            <div>
              <p className={`text-sm text-gray-600 dark:text-gray-400`}>{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
          {todaysTasks.length > 0 ? (
            <ul className="space-y-2">
              {todaysTasks.map(task => (
                <li key={task.id} className="py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-start">
                    <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${
                      task.priority === 'HIGH' 
                        ? 'bg-red-500' 
                        : task.priority === 'MEDIUM' 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No tasks due today. Enjoy your day!</p>
          )}
        </div>
        
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <h2 className="text-xl font-semibold mb-4">Task Completion</h2>
          <div className="h-44 flex items-center justify-center">
            <div className="relative h-36 w-36">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray={`${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-3xl font-bold">{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You've completed {completedTasks} out of {totalTasks} tasks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;