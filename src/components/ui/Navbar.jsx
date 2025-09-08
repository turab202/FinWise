import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Wallet, PieChart, Target, Settings } from 'lucide-react';
import UserMenu from './UserMenu';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // ✅ Use nested keys like 'dashboard.title' and add fallbacks
  const navLinks = [
    { path: '/dashboard', icon: Home, label: t('dashboard.title', 'Dashboard') },
    { path: '/transactions', icon: Wallet, label: t('transactions.title', 'Transactions') },
    { path: '/budgets', icon: PieChart, label: t('budgets.title', 'Budgets') },
    { path: '/goals', icon: Target, label: t('goals.title', 'Goals') },
    { path: '/settings', icon: Settings, label: t('settings.title', 'Settings') },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-gray-800/80 backdrop-blur-md border-b border-white/10 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
              >
                {t('appName', 'FinWise')}
              </motion.div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label} {/* Now guaranteed to be a string */}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;