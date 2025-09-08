// components/OAuthButtons.jsx
import { motion } from 'framer-motion';
import { Github, Google } from 'lucide-react';

const OAuthButtons = () => {
  const handleOAuthClick = (provider) => {
    console.log(`${provider} OAuth button clicked at ${new Date().toISOString()}`);
    alert(`In production, this would redirect to ${provider} OAuth`);
  };

  return (
    <div className="flex flex-col space-y-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        onClick={() => handleOAuthClick('Google')}
      >
        <Google className="h-5 w-5 mr-2 text-red-500" />
        <span className="text-sm font-medium text-gray-300">Continue with Google</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        onClick={() => handleOAuthClick('GitHub')}
      >
        <Github className="h-5 w-5 mr-2 text-gray-300" />
        <span className="text-sm font-medium text-gray-300">Continue with GitHub</span>
      </motion.button>
    </div>
  );
};

export default OAuthButtons;