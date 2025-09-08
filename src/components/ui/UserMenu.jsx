import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from "react-router-dom";


const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  return (
    <div className="relative ml-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
          {currentUser?.name?.charAt(0) || 'U'}
        </div>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 border border-white/10 backdrop-blur-md z-50"
        >
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-white border-b border-white/10">
              <div className="font-medium">{currentUser?.name || 'User'}</div>
              <div className="text-gray-400 truncate">{currentUser?.email || 'user@example.com'}</div>
            </div>
            
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="h-4 w-4 mr-2" />
              Profile Settings
            </Link>
            
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserMenu;