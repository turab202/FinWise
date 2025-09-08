import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    sort: 'date-desc',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filters.type === 'all' || transaction.type === filters.type;
      const matchesCategory = filters.category === 'all' || transaction.category === filters.category;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      if (filters.sort === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (filters.sort === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (filters.sort === 'amount-desc') return b.amount - a.amount;
      if (filters.sort === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'USD', // Adjust dynamically if needed
    }).format(amount);
  };

  const categories = [
    'food', 'transport', 'shopping', 'housing', 'entertainment', 
    'health', 'education', 'salary', 'other'
  ];

  const sortOptions = [
    { value: 'date-desc', label: t('transactions.sort.dateDesc') },
    { value: 'date-asc', label: t('transactions.sort.dateAsc') },
    { value: 'amount-desc', label: t('transactions.sort.amountDesc') },
    { value: 'amount-asc', label: t('transactions.sort.amountAsc') }
  ];

  const typeOptions = [
    { value: 'all', label: t('transactions.filters.allTypes') },
    { value: 'income', label: t('transactions.types.income') },
    { value: 'expense', label: t('transactions.types.expense') }
  ];

  const categoryOptions = [
    { value: 'all', label: t('transactions.filters.allCategories') },
    ...categories.map(cat => ({
      value: cat,
      label: t(`transactions.categories.${cat}`)
    }))
  ];

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-semibold text-white">{t('transactions.title')}</h3>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('transactions.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-gray-600 hover:bg-white/10 transition-colors text-sm text-gray-300"
          >
            <Filter className="h-4 w-4" />
            {t('transactions.filters.button')}
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('transactions.filters.type')}
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('transactions.filters.category')}
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('transactions.filters.sortBy')}
              </label>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {filteredTransactions.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-400">{t('transactions.noTransactions')}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('transactions.table.description')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('transactions.table.category')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('transactions.table.date')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('transactions.table.amount')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('transactions.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTransactions.map((transaction) => (
                <motion.tr
                  key={transaction._id} // ✅ fixed
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${transaction.type === 'income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {transaction.type === 'income' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{transaction.title}</div>
                        {transaction.description && (
                          <div className="text-xs text-gray-400">{transaction.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {t(`transactions.categories.${transaction.category}`)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{formatDate(transaction.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-blue-400 hover:text-blue-300 mr-3 transition-colors"
                    >
                      {t('transactions.actions.edit')}
                    </button>
                    <button
                      onClick={() => onDelete(transaction._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      {t('transactions.actions.delete')}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
