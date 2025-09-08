import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/ui/Navbar';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';
import LanguageSwitcher from './components/ui/LanguageSwitcher';
import { AuthProvider } from "./contexts/AuthContext";

// Create a separate component that uses the useAuth hook
const AppContent = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <LoadingSpinner size="lg" />
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute bottom-10 text-gray-400 text-sm">
            {i18n.t('initializing')}
          </div>
        )}
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Show Navbar only when logged in */}
        {currentUser && <Navbar />}

        {/* Development mode banner */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-600 text-white text-center py-1 text-sm">
            {i18n.t('devMode')}
          </div>
        )} */}

        {/* Language Switcher */}
        <div className="fixed bottom-4 right-4 z-50">
          <LanguageSwitcher />
        </div>

        {/* Main content area */}
        <main className={`${currentUser ? 'pt-16 px-4 pb-8 md:px-8 lg:px-12' : 'px-4 py-8'}`}>
          <Routes>
            <Route
              path="/login"
              element={currentUser ? <Navigate to="/dashboard" replace /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={currentUser ? <Navigate to="/dashboard" replace /> : <SignupPage />}
            />
            <Route
              path="/dashboard"
              element={currentUser ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/"
              element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />}
            />
            <Route
              path="/transactions"
              element={currentUser ? <Transactions /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/budgets"
              element={currentUser ? <Budgets /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/reports"
              element={currentUser ? <Reports /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/goals"
              element={currentUser ? <Goals /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/settings"
              element={currentUser ? <Settings /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </main>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(30, 30, 45, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
};

// Main App component that wraps everything with providers
const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;