import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Make sure this import path is correct
import SignupForm from '../components/auth/SignupForm';
import { useEffect } from 'react';

const SignupPage = () => {
  const { currentUser, signup } = useAuth(); // Destructure signup from useAuth
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSignup = async (data) => {
    try {
      await signup(data);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Signup error:', err);
      alert('Sign up failed: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <SignupForm onSignup={handleSignup} loading={false} />
    </div>
  );
};

export default SignupPage;