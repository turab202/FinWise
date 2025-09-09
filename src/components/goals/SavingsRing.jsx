import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SavingsRing = ({ goal }) => {
  const { t, i18n } = useTranslation();
  
  // Safe calculations to avoid division by zero
  const current = parseFloat(goal.currentAmount) || 0;
  const target = parseFloat(goal.targetAmount) || 1; // Avoid division by zero
  const percentage = Math.min((current / target) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formatCurrency = (amount) => {
    const currencyCode = t('currency') || 'USD';
    const locale = t('locale') || navigator.language || 'en-US';
    
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (e) {
      // Fallback if currency formatting fails
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-32 h-32 flex items-center justify-center"
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, delay: 0.3 }}
          transform="rotate(-90 50 50)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-white">
          {percentage.toFixed(0)}%
        </span>
        <span className="text-xs text-gray-400 text-center mt-1">
          {formatCurrency(current)} {t('common.of')} {formatCurrency(target)}
        </span>
      </div>
    </motion.div>
  );
};

export default SavingsRing;