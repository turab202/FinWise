import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Calendar as CalendarIcon, Wallet } from 'lucide-react';

const GoalCard = ({ goal }) => {
  const { title, targetAmount, currentAmount, targetDate, category } = goal;
  const { t } = useTranslation();

  const current = parseFloat(currentAmount) || 0;
  const target = parseFloat(targetAmount) || 0;
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  const parsedDate = targetDate ? new Date(targetDate) : null;
  const daysLeft = parsedDate ? Math.ceil((parsedDate - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  const getValidCurrency = () => {
    try {
      const currencyCode = t('currency') || 'USD';
      new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode }).format(1);
      return currencyCode;
    } catch {
      return 'USD';
    }
  };

  const formatCurrency = (amount) => {
    const validCurrency = getValidCurrency();
    const locale = t('locale') || navigator.language || 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: validCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString(t('locale') || navigator.language || 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-5 border border-white/10 shadow-lg backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-purple-300 capitalize">{t(`categories.${category}`)}</p>
        </div>
        <div className="p-2 rounded-lg bg-white/10">
          <Target className="h-5 w-5 text-purple-300" />
        </div>
      </div>

      <div className="mb-6">
        <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-white/10 mr-3">
            <Wallet className="h-5 w-5 text-blue-300" />
          </div>
          <div>
            <p className="text-xs text-gray-400">{t('goals.saved')}</p>
            <p className="text-sm font-medium text-white">{formatCurrency(current)}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-white/10 mr-3">
            <Target className="h-5 w-5 text-purple-300" />
          </div>
          <div>
            <p className="text-xs text-gray-400">{t('goals.target')}</p>
            <p className="text-sm font-medium text-white">{formatCurrency(target)}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-white/10 mr-3">
            <CalendarIcon className="h-5 w-5 text-blue-300" />
          </div>
          <div>
            <p className="text-xs text-gray-400">{t('goals.targetDate')}</p>
            <p className="text-sm font-medium text-white">{formatDate(parsedDate)}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-white/10 mr-3">
            <CalendarIcon className="h-5 w-5 text-purple-300" />
          </div>
          <div>
            <p className="text-xs text-gray-400">{t('goals.daysLeft')}</p>
            <p className="text-sm font-medium text-white">
              {daysLeft > 0 ? `${daysLeft} ${t('goals.days')}` : t('goals.reached')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalCard;
