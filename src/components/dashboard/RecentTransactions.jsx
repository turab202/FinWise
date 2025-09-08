import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowDown, CreditCard, ShoppingCart, Utensils, Home, Activity, Book, Gift } from 'lucide-react';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'food':
      return <Utensils className="h-4 w-4" />;
    case 'shopping':
      return <ShoppingCart className="h-4 w-4" />;
    case 'housing':
      return <Home className="h-4 w-4" />;
    case 'transport':
      return <Activity className="h-4 w-4" />;
    case 'education':
      return <Book className="h-4 w-4" />;
    case 'entertainment':
      return <Gift className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const RecentTransactions = ({ transactions }) => {
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(t('locale'), options);
  };

const formatCurrency = (amount) => {
  const currencyCode = t('currency');
  
  // Fallback to USD if currency is not specified or invalid
  const options = {
    style: 'currency',
    currency: currencyCode || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  try {
    return new Intl.NumberFormat(t('locale'), options).format(amount);
  } catch (e) {
    // Fallback if formatting fails
    return new Intl.NumberFormat(t('locale'), {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.recentTransactions')}</h3>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${transaction.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">{transaction.title}</h4>
                <p className="text-xs text-gray-400">
                  {formatDate(transaction.date)} • {t(`categories.${transaction.category}`)}
                </p>
              </div>
            </div>
            <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
          {t('dashboard.viewAllTransactions')} →
        </button>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;