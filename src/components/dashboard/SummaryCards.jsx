import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowDown, PiggyBank, TrendingUp } from 'lucide-react';

const SummaryCards = ({ data }) => {
  const { t, i18n } = useTranslation();

  // Get currency settings based on current language
  const getCurrencySettings = () => {
    const language = i18n.language.split('-')[0]; // Get base language code
    const settings = {
      'en': { locale: 'en-US', currency: 'USD', symbol: '$', dir: 'ltr' },
      'ar': { locale: 'ar-SA', currency: 'SAR', symbol: 'ر.س', dir: 'rtl' },
      'am': { locale: 'am-ET', currency: 'ETB', symbol: 'ብር', dir: 'ltr' },
      'es': { locale: 'es-ES', currency: 'EUR', symbol: '€', dir: 'ltr' },
      'fr': { locale: 'fr-FR', currency: 'EUR', symbol: '€', dir: 'ltr' },
      'de': { locale: 'de-DE', currency: 'EUR', symbol: '€', dir: 'ltr' }
    };
    return settings[language] || settings.en;
  };

  const { locale, currency, symbol, dir } = getCurrencySettings();

  const cards = [
    {
      title: t('dashboard.income'),
      value: data?.income || 0,
      icon: <ArrowUp className="h-6 w-6 text-green-400" />,
      color: 'from-green-500 to-emerald-500',
      change: data?.incomeChange || 0,
    },
    {
      title: t('dashboard.expenses'),
      value: data?.expenses || 0,
      icon: <ArrowDown className="h-6 w-6 text-red-400" />,
      color: 'from-red-500 to-rose-500',
      change: data?.expensesChange || 0,
    },
    {
      title: t('dashboard.savings'),
      value: data?.savings || 0,
      icon: <PiggyBank className="h-6 w-6 text-blue-400" />,
      color: 'from-blue-500 to-indigo-500',
      change: data?.savingsChange || 0,
    },
    {
      title: t('dashboard.investments'),
      value: data?.investments || 0,
      icon: <TrendingUp className="h-6 w-6 text-purple-400" />,
      color: 'from-purple-500 to-violet-500',
      change: data?.investmentsChange || 0,
    },
  ];

  const formatCurrency = (value) => {
    try {
      // Special handling for Ethiopian Birr
      if (currency === 'ETB') {
        return new Intl.NumberFormat(locale, {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value) + ' ብር';
      }

      // Try standard currency formatting
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      
      return formatter.format(value);
    } catch (error) {
      console.warn(`Currency formatting failed for ${currency}. Using fallback.`);
      // Fallback to symbol + formatted number
      return symbol + ' ' + new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
  };

  const renderChangeIndicator = (change) => {
    if (change === 0 || isNaN(change)) return null;
    
    const isPositive = change > 0;
    return (
      <span className={`text-xs font-medium ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
        {isPositive ? '+' : ''}
        {change}% {t('dashboard.fromLastMonth')}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir={dir}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`bg-gradient-to-br ${card.color} rounded-xl p-6 shadow-lg backdrop-blur-sm bg-opacity-20 border border-white/10`}
        >
          <div className="flex justify-between items-start">
            <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              <p className="text-sm font-medium text-white/80">{card.title}</p>
              <h3 className="mt-1 text-2xl font-bold text-white">
                {formatCurrency(card.value)}
              </h3>
              <div className="mt-2 flex items-center">
                {renderChangeIndicator(card.change)}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              {card.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;