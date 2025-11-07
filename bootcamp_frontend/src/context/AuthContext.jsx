import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../services/api'; // axios instance with baseURL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  // Load user profile if token exists
  useEffect(() => {
    if (token) {
      getUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      await getUserProfile();
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err.response?.data?.msg || err.message);
      return { success: false, message: err.response?.data?.msg || 'Login error' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/auth/register', { name, email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      await getUserProfile();
      return { success: true };
    } catch (err) {
      console.error('Register failed:', err.response?.data?.msg || err.message);
      return { success: false, message: err.response?.data?.msg || 'Registration error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  const getUserProfile = async () => {
    try {
      const res = await axios.get('/students/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.profile);
    } catch (err) {
      console.error('Fetching user failed:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for components
export const useAuth = () => useContext(AuthContext);
