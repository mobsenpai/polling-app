import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { apiCall } from '../utils/apiCaller.js';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userExistence, setUserExistence] = useState(false);
  const { showNotification } = useNotification();

  // Verify user based on HTTP-only cookie
  const verifyUserFromCookie = async () => {
    try {
      const response = await apiCall({
        method: 'GET',
        url: '/auth/verify-user',
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data);
        setLoading(false);
        setError(null);
      } else if (response.status === 403) {
        setUser(null);
        logout();
      }
    } catch (err) {
      setUser(null);
      logout();
    }
  };

  useEffect(() => {
    verifyUserFromCookie();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const response = await apiCall({
        method: 'GET',
        url: '/auth/logout',
        withCredentials: true,
      });

      if (response.status === 200) {
        showNotification('success', response.data.message || 'Logged out successfully');
      }

      setUser(null);
      setLoading(false);
    } catch (err) {
      console.error('Logout failed:', err);
      showNotification('error', 'Logout failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      error,
      setLoading,
      logout,
      userExistence
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
