import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, DollarSign, Calendar, Tag, Bookmark } from 'lucide-react';

const GoalForm = ({ onSubmit, initialData, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    category: 'savings',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        targetAmount: initialData.targetAmount,
        currentAmount: initialData.currentAmount || '',
        targetDate: initialData.targetDate.split('T')[0],
        category: initialData.category,
      });
    }
  }, [initialData]);

  const categories = Object.entries(t('categories', { returnObjects: true })).map(([value, label]) => ({
    value,
    label,
    icon: <Bookmark size={16} />
  }));

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = t('goals.form.errors.titleRequired');
    if (!formData.targetAmount || isNaN(formData.targetAmount) || formData.targetAmount <= 0) 
      newErrors.targetAmount = t('goals.form.errors.validAmount');
    if (formData.currentAmount && (isNaN(formData.currentAmount) || formData.currentAmount < 0)) 
      newErrors.currentAmount = t('goals.form.errors.positiveAmount');
    if (!formData.targetDate) newErrors.targetDate = t('goals.form.errors.dateRequired');
    if (new Date(formData.targetDate) < new Date()) 
      newErrors.targetDate = t('goals.form.errors.futureDate');
    if (formData.currentAmount && parseFloat(formData.currentAmount) > parseFloat(formData.targetAmount)) 
      newErrors.currentAmount = t('goals.form.errors.amountExceeded');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    onSubmit({
      title: formData.title.trim(),
      category: formData.category,
      targetAmount: parseFloat(formData.targetAmount) || 0,
      currentAmount: parseFloat(formData.currentAmount) || 0,
      targetDate: new Date(formData.targetDate).toISOString(), // <-- send ISO
    });
  }
};



  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          {initialData ? t('goals.form.editTitle') : t('goals.form.createTitle')}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {t('goals.form.title')}
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={t('goals.form.titlePlaceholder')}
              className={`w-full bg-gray-800 bg-opacity-50 border ${errors.title ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2 px-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            />
            <Bookmark className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('goals.form.targetAmount')}
            </label>
            <div className="relative">
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                className={`w-full bg-gray-800 bg-opacity-50 border ${errors.targetAmount ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2 px-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            {errors.targetAmount && <p className="mt-1 text-sm text-red-400">{errors.targetAmount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('goals.form.currentAmount')}
            </label>
            <div className="relative">
              <input
                type="number"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`w-full bg-gray-800 bg-opacity-50 border ${errors.currentAmount ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2 px-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            {errors.currentAmount && <p className="mt-1 text-sm text-red-400">{errors.currentAmount}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('goals.form.targetDate')}
            </label>
            <div className="relative">
              <input
                type="date"
                name="targetDate"
                value={formData.targetDate}
                onChange={handleChange}
                className={`w-full bg-gray-800 bg-opacity-50 border ${errors.targetDate ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2 px-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
              />
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            {errors.targetDate && <p className="mt-1 text-sm text-red-400">{errors.targetDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('goals.form.category')}
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-3 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <Tag className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-gray-600 transition-all"
          >
            {t('common.cancel')}
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all shadow-md"
          >
            {initialData ? t('common.update') : t('common.add')} {t('goals.title')}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default GoalForm;