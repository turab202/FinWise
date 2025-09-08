import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Tag, DollarSign, Type, Info } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ArrowDown, ArrowUp } from "lucide-react";

const TransactionForm = ({ onSubmit, initialData, onCancel }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    amount: initialData?.amount || '',
    date: initialData?.date ? new Date(initialData.date) : new Date(),
    category: initialData?.category || 'food',
    type: initialData?.type || 'expense',
    description: initialData?.description || '',
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
    { value: 'salary', label: t('categories.salary') },
    { value: 'other', label: t('categories.other') },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = t('formErrors.titleRequired');
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0)
      newErrors.amount = t('formErrors.amountInvalid');
    if (!formData.date) newErrors.date = t('formErrors.dateRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        _id: initialData?._id, // ✅ include _id for editing
        amount: parseFloat(formData.amount),
        date: formData.date.toISOString(),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      handleChange(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-white mb-6">
        {initialData ? t('transactions.editTransaction') : t('transactions.addTransaction')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">{t('transactions.type')}</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex-1 py-2 px-4 rounded-lg border ${
                formData.type === 'expense'
                  ? 'border-red-500 bg-red-500/10 text-red-400'
                  : 'border-gray-600 text-gray-300 hover:bg-white/5'
              } transition-colors flex items-center justify-center`}
            >
              <ArrowDown className="h-4 w-4 mr-2" />
              {t('transactions.expense')}
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex-1 py-2 px-4 rounded-lg border ${
                formData.type === 'income'
                  ? 'border-green-500 bg-green-500/10 text-green-400'
                  : 'border-gray-600 text-gray-300 hover:bg-white/5'
              } transition-colors flex items-center justify-center`}
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              {t('transactions.income')}
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">{t('transactions.title')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Type className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border ${
                errors.title ? 'border-red-500' : 'border-gray-600'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white`}
              placeholder={t('transactions.titlePlaceholder')}
              maxLength={50}
            />
          </div>
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">{t('transactions.amount')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="amount"
              name="amount"
              type="text"
              value={formData.amount}
              onChange={handleAmountChange}
              className={`pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border ${
                errors.amount ? 'border-red-500' : 'border-gray-600'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white`}
              placeholder="0.00"
              inputMode="decimal"
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-red-400">{errors.amount}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">{t('transactions.date')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              id="date"
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              className={`pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border ${
                errors.date ? 'border-red-500' : 'border-gray-600'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white`}
              dateFormat="PPP"
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
              placeholderText={t('transactions.selectDate')}
            />
          </div>
          {errors.date && <p className="mt-1 text-sm text-red-400">{errors.date}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">{t('transactions.category')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border ${
                errors.category ? 'border-red-500' : 'border-gray-600'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white appearance-none`}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            {t('transactions.description')} ({t('common.optional')})
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
              <Info className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
              placeholder={t('transactions.descriptionPlaceholder')}
              maxLength={200}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-white/10 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formData.title || parseFloat(formData.amount) <= 0}
          >
            {initialData ? t('common.update') : t('common.save')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TransactionForm;
