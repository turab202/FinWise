import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Tag, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BudgetForm = ({ onSubmit, initialData, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'food',
    amount: initialData?.amount || '',
    period: initialData?.period || 'monthly',
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'food', label: t('categories.food') },
    { value: 'transport', label: t('categories.transport') },
    { value: 'shopping', label: t('categories.shopping') },
    { value: 'housing', label: t('categories.housing') },
    { value: 'entertainment', label: t('categories.entertainment') },
    { value: 'health', label: t('categories.health') },
    { value: 'education', label: t('categories.education') },
    { value: 'other', label: t('categories.other') },
  ];

  const periods = [
    { value: 'weekly', label: t('budgets.periods.weekly') },
    { value: 'monthly', label: t('budgets.periods.monthly') },
    { value: 'yearly', label: t('budgets.periods.yearly') },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('budgets.form.errors.nameRequired');
    if (!formData.amount || isNaN(formData.amount)) newErrors.amount = t('budgets.form.errors.validAmount');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        amount: parseFloat(formData.amount),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl"
    >
      <h2 className="text-xl font-bold text-white mb-6">
        {initialData ? t('common.edit') : t('common.add')} {t('budgets.title')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            {t('budgets.form.name')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border ${errors.name ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white`}
              placeholder={t('budgets.form.name')}
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
            {t('budgets.form.category')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
            {t('budgets.form.limit')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="amount"
              name="amount"
              type="text"
              value={formData.amount}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border ${errors.amount ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white`}
              placeholder="0.00"
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-red-400">{errors.amount}</p>}
        </div>

        <div>
          <label htmlFor="period" className="block text-sm font-medium text-gray-300 mb-1">
            {t('budgets.form.period')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="period"
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white appearance-none"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-white/5 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all shadow-md"
          >
            {initialData ? t('common.update') : t('common.save')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BudgetForm;