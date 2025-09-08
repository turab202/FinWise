import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LineChartComponent = ({ data }) => {
  const { t } = useTranslation();

  // Safe currency formatter with fallback
  const formatCurrency = (value) => {
    // Get currency code from translations or fallback to USD
    const currencyCode = t('currency') || 'USD';
    const locale = t('locale') || 'en-US';

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (error) {
      // Fallback to simple number if currency code is invalid
      console.warn(`Invalid currency code "${currencyCode}", fallback applied.`);
      return value.toFixed(2);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-80 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.monthlyTrends')}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.6)" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.6)" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(value).replace(/\s/g, '')}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              backdropFilter: 'blur(4px)',
            }}
            formatter={(value, name) => [
              formatCurrency(value),
              t(`dashboard.${name}`),
            ]}
          />
          <Legend 
            formatter={(value) => (
              <span className="text-white text-xs">{t(`dashboard.${value}`)}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LineChartComponent;
