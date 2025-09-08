import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#A4DE6C', '#D0ED57'];

const DonutChart = ({ data }) => {
  const { t } = useTranslation();

  // ✅ Safe currency formatter
  const formatCurrency = (value) => {
    const currencyCode = t('currency') || 'USD'; // fallback to USD
    const locale = t('locale') || 'en-US';       // fallback to en-US

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (error) {
      console.warn(`Invalid currency code "${currencyCode}", using plain number.`);
      return value.toFixed(2);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, percent } = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">
            {t(`categories.${name}`)}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {formatCurrency(value)}
          </p>
          {percent !== undefined && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {(percent * 100).toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-80 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-lg font-semibold text-white mb-4">
        {t('dashboard.expenseDistribution')}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => (
              <span className="text-white/80 text-xs hover:text-white transition-colors">
                {t(`categories.${value}`)}
              </span>
            )}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default DonutChart;
