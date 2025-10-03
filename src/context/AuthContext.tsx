"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { loginAction, logoutAction, getUserAction } from '@/app/actions/auth';
import type { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = user !== null;

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getUserAction();
      if (result.success && result.data) {
        setUser(result.data);
        setError(null);
      } else {
        setUser(null);
        setError(result.error || 'Authentication check failed');
      }
    } catch (err) {
      setUser(null);
      setError('Authentication check failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await loginAction({ email, password });
      if (result.success && result.data) {
        setUser(result.data.user);
        return { success: true };
      } else {
        setError(result.error || 'Login failed. Please try again.');
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const result = await logoutAction();
      if (result.success) {
        setUser(null);
        setError(null);
      }
    } catch (err) {
      setError('Logout failed');
    }
  }, []);

  // Auto-refresh auth on mount
  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    refreshAuth,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
