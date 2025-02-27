//src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  googleSignIn: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  googleSignIn: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in a real app, you would call an API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email && password.length >= 6) {
        const userData = { email, name: email.split('@')[0] };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('authUser', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const googleSignIn = async (): Promise<boolean> => {
    try {
      // Simulate Google Sign In
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockGoogleUser = {
        email: 'user@gmail.com',
        name: 'Google User'
      };
      
      setUser(mockGoogleUser);
      setIsAuthenticated(true);
      localStorage.setItem('authUser', JSON.stringify(mockGoogleUser));
      return true;
    } catch (error) {
      console.error('Google Sign In error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};