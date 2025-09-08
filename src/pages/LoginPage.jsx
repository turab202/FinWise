// pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import { useEffect } from 'react';

const LoginPage = () => {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  // Only navigate if there's a valid current user
  if (currentUser && currentUser.email) {
    navigate('/dashboard');
  }
}, [currentUser, navigate]);

  const handleLogin = async (credentials) => {
  try {
    await login(credentials);
    navigate('/dashboard');
  } catch (err) {
    console.error('Login error details:', err);
    alert('Login failed: ' + (err.message || 'Unknown error'));
  }
};

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <LoginForm onLogin={handleLogin} loading={false} />
    </div>
  );
};

export default LoginPage;
