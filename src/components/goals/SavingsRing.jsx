import { motion } from 'framer-motion';

const SavingsRing = ({ goal }) => {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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
          {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
        </span>
      </div>
    </motion.div>
  );
};

export default SavingsRing;