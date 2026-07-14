import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkUserLoggedIn = async () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        setUser(userInfo);
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
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
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
