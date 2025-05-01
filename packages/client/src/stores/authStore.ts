import { create } from 'zustand';
import { User, UserRole } from '../types';
import * as authApi from '../api/auth';
import { useOnboardingStore } from './useOnboardingStore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string,organizationName:string) => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login({ email, password });
      set({ 
        user: response.data, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to login', 
        isLoading: false 
      });
    }
  },
  
  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to logout', 
        isLoading: false 
      });
    }
  },
  
  register: async (name, email, password, organizationName) => {
    
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.register({ name, email, password, organizationName });
      set({ 
        user: {
          ...response.data.user,
          organizationId: response.data.organization.id
        }, 
        isAuthenticated: true, 
        isLoading: false 
      });
      // setOrganization(response.data.organization)
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to register', 
        isLoading: false 
      });
    }
  },
  
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await authApi.getCurrentUser();
      set({ 
        user: response.data, 
        isAuthenticated: !!response.data, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    }
  },
  
  updateUser: (userData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null
    }));
    
    // Update user in local storage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        localStorage.setItem(
          'currentUser', 
          JSON.stringify({ ...parsedUser, ...userData })
        );
      } catch (error) {
        console.error('Failed to update user in local storage', error);
      }
    }
  },
  
  clearError: () => {
    set({ error: null });
  }
}));

// Helper function to check if current user has required role
export function useHasRole(role: UserRole | UserRole[]): boolean {
  const { user } = useAuthStore();
  
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
}