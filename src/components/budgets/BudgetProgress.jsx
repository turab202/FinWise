import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const BudgetProgress = ({ name, spent, limit, category }) => {
  const { t } = useTranslation();
  
  // Ensure numbers are safe
  const safeSpent = Number(spent) || 0;
  const safeLimit = Number(limit) || 1; // avoid division by zero

  const percentage = Math.min((safeSpent / safeLimit) * 100, 100);
  const isOverBudget = percentage >= 100;
  const isNearBudget = percentage >= 80 && percentage < 100;

  const getProgressColor = () => {
    if (isOverBudget) return 'bg-red-500';
    if (isNearBudget) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (isOverBudget) return t('budgets.status.over');
    if (isNearBudget) return t('budgets.status.near');
    return t('budgets.status.onTrack');
  };

  const getStatusColor = () => {
    if (isOverBudget) return 'text-red-400';
    if (isNearBudget) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-sm"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-white">{name}</h3>
          <p className="text-sm text-gray-400 capitalize">{category}</p>
        </div>
        <span className={`text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{t('currencySymbol')}{safeSpent.toFixed(2)}</span>
          <span>{t('currencySymbol')}{safeLimit.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-2 rounded-full ${getProgressColor()} transition-all duration-300`}
          ></motion.div>
        </div>
      </div>

      <div className="flex justify-between text-xs">
        <span className="text-gray-400">
          {isOverBudget
            ? `${t('currencySymbol')}${(safeSpent - safeLimit).toFixed(2)} ${t('budgets.status.over')}`
            : `${t('currencySymbol')}${(safeLimit - safeSpent).toFixed(2)} ${t('budgets.status.left')}`}
        </span>
        <span className="text-white">{percentage.toFixed(0)}%</span>
      </div>
    </motion.div>
  );
};

export default BudgetProgress;