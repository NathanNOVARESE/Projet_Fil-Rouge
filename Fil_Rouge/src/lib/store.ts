import { create } from 'zustand';
import { Priority } from '@prisma/client';

export type User = {
  id: string;
  email: string;
  name?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
  tags: Tag[];
  userId: string;
};

export type Tag = {
  id: string;
  name: string;
  color: string;
};

type AppState = {
  user: User | null;
  darkMode: boolean;
  tasks: Task[];
  loading: boolean;
  error: string | null;
  
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useStore = create<AppState>((set) => ({
  user: null,
  darkMode: false,
  tasks: [],
  loading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task) => set((state) => ({ 
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)) 
  })),
  deleteTask: (id) => set((state) => ({ 
    tasks: state.tasks.filter((t) => t.id !== id) 
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));