import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onLogin({ email, password });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-300">Sign in to manage your finances</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              } focus:ring-2 focus:ring-purple-500 text-white`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              } focus:ring-2 focus:ring-purple-500 text-white`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-300 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 text-purple-600 rounded bg-white/5 border-gray-600"
            />
            <span className="ml-2">Remember me</span>
          </label>

          <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {/* Signup */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?  
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;                setShowPassword(!showPassword);
                console.log('Password visibility toggled:', !showPassword);
              }}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-200 transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-200 transition-colors" />
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-white/5"
              onChange={(e) => console.log('Remember me checked:', e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
              onClick={() => console.log('Forgot password link clicked')}
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={() => console.log('Login button clicked')}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Sign in'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <OAuthButtons />
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
            onClick={() => console.log('Sign up link clicked')}
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

const OAuthButtons = () => {
  const handleOAuthClick = (provider) => {
    console.log(`${provider} OAuth clicked`);
    alert(`In production, this would redirect to ${provider} OAuth`);
  };

  return (
    <>
      {/* <button
        type="button"
        className="w-full flex justify-center items-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors space-x-2"
        onClick={() => handleOAuthClick('Google')}
      >
        <svg className="h-5 w-5 text-red-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.748-1.648-4.058-2.637-6.735-2.637-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10-7.827 10-10 0-1.248-0.192-2.148-0.32-2.637H12.545z" fill="currentColor" />
        </svg>
        <span>Google</span>
      </button>

      <button
        type="button"
        className="w-full flex justify-center items-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors space-x-2"
        onClick={() => handleOAuthClick('GitHub')}
      >
        <svg className="h-5 w-5 text-gray-200" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387 0.6.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.724-4.042-1.61-4.042-1.61-0.546-1.386-1.332-1.754-1.332-1.754-1.087-0.745 0.084-0.729 0.084-0.729 1.205 0.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495 0.998 0.108-0.776 0.417-1.305 0.76-1.605-2.665-0.3-5.466-1.332-5.466-5.93 0-1.31 0.465-2.38 1.235-3.22-0.135-0.303-0.54-1.523 0.105-3.176 0 0 1.005-0.322 3.3 1.23 0.96-0.267 1.98-0.399 3-0.405 1.02 0.006 2.04 0.138 3 0.405 2.295-1.552 3.3-1.23 3.3-1.23 0.645 1.653 0.24 2.873 0.12 3.176 0.765 0.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92 0.42 0.36 0.81 1.096 0.81 2.22 0 1.606-0.015 2.896-0.015 3.286 0 0.315 0.225 0.69 0.825 0.57C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12" />
        </svg>
        <span>GitHub</span>
      </button> */}
    </>
  );
};

export default LoginForm;
