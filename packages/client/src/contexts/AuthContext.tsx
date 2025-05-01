import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string,organizationName: string) => Promise<void>;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  clearError: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  hasRole: () => false,
  clearError: () => {},
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    logout, 
    register,
    clearError
  } = useAuthStore();
  
  // Function to check if the user has a specific role
  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };
  
  // Context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    hasRole,
    clearError
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};