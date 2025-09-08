import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const categoryColors = {
  food: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  transport: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  shopping: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  housing: 'bg-red-500/10 text-red-400 border-red-500/20',
  entertainment: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  health: 'bg-green-500/10 text-green-400 border-green-500/20',
  education: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  salary: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  other: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const categoryIcons = {
  food: '🍔',
  transport: '🚗',
  shopping: '🛍️',
  housing: '🏠',
  entertainment: '🎭',
  health: '🏥',
  education: '📚',
  salary: '💰',
  other: '❓',
};

const CategoryChip = ({ category, onClick, className = '', size = 'normal' }) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    normal: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`inline-flex items-center rounded-full border ${categoryColors[category] || categoryColors.other} ${
        sizeClasses[size]
      } font-medium capitalize ${className}`}
    >
      <span className="mr-1">{categoryIcons[category] || categoryIcons.other}</span>
      {t(`categories.${category}`)}
    </motion.button>
  );
};

export default CategoryChip;