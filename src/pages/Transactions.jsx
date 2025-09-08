// src/pages/Transactions.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import AnimatedHeader from '../components/ui/AnimatedHeader';
import GlassCard from '../components/ui/GlassCard';
import { Plus } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { toast } from 'react-hot-toast';
import api from '../utils/api'; // ✅ use api instance

const Transactions = () => {
  const { t } = useTranslation();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get('/transactions'); // ✅ api handles token
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(t('errors.fetchTransactions'));
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [t]);

  // Add transaction
  const handleAddTransaction = async (newTransaction) => {
    try {
      const res = await api.post('/transactions', newTransaction);
      setTransactions([res.data, ...transactions]);
      setShowForm(false);
      toast.success(t('toasts.transactionAdded'));
    } catch (err) {
      console.error('Error adding transaction:', err);
      toast.error(t('errors.addTransaction'));
    }
  };

  // Update transaction
  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      const res = await api.put(`/transactions/${updatedTransaction._id}`, updatedTransaction);
      setTransactions(
        transactions.map((t) => (t._id === res.data._id ? res.data : t))
      );
      setEditingTransaction(null);
      toast.success(t('toasts.transactionUpdated'));
    } catch (err) {
      console.error('Error updating transaction:', err);
      toast.error(t('errors.updateTransaction'));
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(transactions.filter((t) => t._id !== id));
      toast.success(t('toasts.transactionDeleted'));
    } catch (err) {
      console.error('Error deleting transaction:', err);
      toast.error(t('errors.deleteTransaction'));
    }
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AnimatedHeader text={t('transactions.title')} level="h1" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowForm(true);
            setEditingTransaction(null);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all shadow-md whitespace-nowrap"
          disabled={loading}
        >
          <Plus className="h-4 w-4" />
          {t('transactions.addButton')}
        </motion.button>
      </div>

      {(showForm || editingTransaction) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <GlassCard>
            <TransactionForm
              onSubmit={
                editingTransaction ? handleUpdateTransaction : handleAddTransaction
              }
              initialData={editingTransaction}
              onCancel={handleCancelForm}
            />
          </GlassCard>
        </motion.div>
      )}

      <GlassCard>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
            <span className="sr-only">{t('common.loading')}</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {t('common.retry')}
            </button>
          </div>
        ) : (
          <TransactionList
            transactions={transactions}
            onEdit={handleEditClick}
            onDelete={handleDeleteTransaction}
          />
        )}
      </GlassCard>
    </div>
  );
};

export default Transactions;
