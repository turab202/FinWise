import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Wallet, PieChart, Target, Settings, Menu, X } from 'lucide-react';
import UserMenu from './UserMenu';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/dashboard', icon: Home, label: t('dashboard.title', 'Dashboard') },
    { path: '/transactions', icon: Wallet, label: t('transactions.title', 'Transactions') },
    { path: '/budgets', icon: PieChart, label: t('budgets.title', 'Budgets') },
    { path: '/goals', icon: Target, label: t('goals.title', 'Goals') },
    { path: '/settings', icon: Settings, label: t('settings.title', 'Settings') },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-gray-800/80 backdrop-blur-md border-b border-white/10 z-50 h-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/dashboard" className="flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                >
                  {t('appName', 'FinWise')}
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
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
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop User Menu + Mobile Toggle */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <UserMenu />
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 bg-gray-800/95 backdrop-blur-md border-b border-white/10 z-40 md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.label}
                </Link>
              ))}
              {/* Mobile User Menu */}
<div className="px-3 py-3">
  <UserMenu isMobile />
</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prevent content overlap */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
