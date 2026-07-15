import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          const userInfo = JSON.parse(storedUserInfo);
          // Simple expiry check if there's a token with an expiration (assuming JWT decode could be done here, or rely on interceptor)
          if (userInfo && userInfo.token) {
            setUser(userInfo);
          } else {
            localStorage.removeItem('userInfo');
          }
        } catch (e) {
          localStorage.removeItem('userInfo');
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();

    // Listen for global auth expiration events (from API interceptor)
    const handleAuthExpired = () => {
      setUser(null);
      localStorage.removeItem('userInfo');
    };
    window.addEventListener('auth-expired', handleAuthExpired);

    return () => {
      window.removeEventListener('auth-expired', handleAuthExpired);
    };
  }, []);

  const login = async (email, password, role) => {
    const response = await api.post('/auth/login', { email, password, role });
    const userData = response.data.data || response.data;
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    return userData;
  };

  const register = async (userDataPayload) => {
    const response = await api.post('/auth/register', userDataPayload);
    const userData = response.data.data || response.data;
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    sessionStorage.clear(); // Clear any other possible session data
    // Socket disconnection is handled by SocketContext listening to `user` state changing to null
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
