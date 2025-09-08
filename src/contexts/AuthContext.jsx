import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -----------------------------
  // Initialize user on app load
  // -----------------------------
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('finwise_token');
      const savedUser = localStorage.getItem('finwise_user');

      if (!token || !savedUser) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me'); // verify token
        setCurrentUser(res.data);
      } catch (err) {
        console.warn('Token invalid/expired, trying refresh...', err);

        // Attempt refresh
        const refreshToken = localStorage.getItem("finwise_refresh_token");
        if (refreshToken) {
          try {
            const refreshRes = await api.post('/auth/refresh', { refreshToken });
            const { token, refreshToken: newRefreshToken, user } = refreshRes.data;

            localStorage.setItem('finwise_token', token);
            if (newRefreshToken) localStorage.setItem('finwise_refresh_token', newRefreshToken);

            setCurrentUser(user);
          } catch (refreshErr) {
            console.error('Refresh failed, logging out...', refreshErr);
            localStorage.clear();
            setCurrentUser(null);
          }
        } else {
          localStorage.clear();
          setCurrentUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

// -----------------------------
// Signup
// -----------------------------
const signup = async ({ name, email, password }) => {
  setLoading(true);
  setError(null);
  try {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
      confirmPassword: password,
    });

    if (res.data.user && res.data.token) {
      // Store token WITHOUT 'Bearer '
      const token = res.data.token.replace(/^Bearer\s+/i, '');
      localStorage.setItem('finwise_token', token);
      localStorage.setItem('finwise_user', JSON.stringify(res.data.user));
      setCurrentUser(res.data.user);
      return res.data.user;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Signup failed';
    setError(msg);
    throw new Error(msg);
  } finally {
    setLoading(false);
  }
};

// -----------------------------
// Login
// -----------------------------
const login = async ({ email, password }) => {
  setLoading(true);
  setError(null);
  try {
    const res = await api.post('/auth/login', { email, password });

    if (res.data.user && res.data.token) {
      // Store token WITHOUT 'Bearer '
      const token = res.data.token.replace(/^Bearer\s+/i, '');
      localStorage.setItem('finwise_token', token);
      localStorage.setItem('finwise_user', JSON.stringify(res.data.user));
      setCurrentUser(res.data.user);
      return res.data.user;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Login failed';
    setError(msg);
    throw new Error(msg);
  } finally {
    setLoading(false);
  }
};


  // -----------------------------
  // Logout
  // -----------------------------
  const logout = () => {
    localStorage.removeItem('finwise_token');
    localStorage.removeItem('finwise_refresh_token');
    localStorage.removeItem('finwise_user');
    setCurrentUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ currentUser, loading, error, signup, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}
