
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { User } from '../types';
import { apiLogin, apiSignup, apiGetMe } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  signup: (details: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const currentUser = await apiGetMe(storedToken);
          setUser(currentUser);
          setToken(storedToken);
        } catch (error) {
          console.error("Session expired or token invalid", error);
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };
    validateToken();
  }, []);

  const login = async (credentials: any) => {
    const { token: newToken, user: loggedInUser } = await apiLogin(credentials);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(loggedInUser);
  };

  const signup = async (details: any) => {
    const { token: newToken, user: newUser } = await apiSignup(details);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
