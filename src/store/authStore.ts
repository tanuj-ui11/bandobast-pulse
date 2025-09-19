import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'supervisor' | 'officer';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  rank?: string;
  sector?: string;
  zone?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock users for demo
const mockUsers: Record<string, User> = {
  'supervisor1': {
    id: 'sup1',
    username: 'supervisor1',
    name: 'SDPO Rajesh Kumar',
    role: 'supervisor',
    rank: 'SDPO',
  },
  'officer1': {
    id: 'off1',
    username: 'officer1',
    name: 'PI Amit Sharma',
    role: 'officer',
    rank: 'PI',
    sector: 'I',
    zone: 'Zone 1',
  },
};

const mockCredentials: Record<string, string> = {
  'supervisor1': 'admin123',
  'officer1': 'police123',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers[username];
        const validPassword = mockCredentials[username];

        if (user && password === validPassword) {
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        } else {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);