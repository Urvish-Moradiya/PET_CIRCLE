import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('userData'));
      const storedToken = localStorage.getItem('authToken');
      if (storedUser && storedToken) {
        if (!storedUser.role) {
          console.warn('No role found, defaulting to PetOwner');
          storedUser.role = 'PetOwner';
          localStorage.setItem('userData', JSON.stringify(storedUser));
        }
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error parsing userData:', error);
      localStorage.removeItem('userData');
      localStorage.removeItem('authToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    try {
      if (!userData.role) {
        console.warn('No role provided, defaulting to PetOwner');
        userData.role = 'PetOwner';
      }
      const normalizedRole = userData.role.toLowerCase();
      userData.role = normalizedRole === 'petexpert' ? 'PetExpert' : 'PetOwner';
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('authToken', token);
      setUser(userData);
    } catch (error) {
      console.error('Error saving userData:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('userData');
      localStorage.removeItem('authToken');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;