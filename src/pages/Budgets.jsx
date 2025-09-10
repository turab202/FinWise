// src/pages/Budgets.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import BudgetProgress from "../components/budgets/BudgetProgress";
import BudgetForm from "../components/budgets/BudgetForm";
import AnimatedHeader from "../components/ui/AnimatedHeader";
import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import { Plus, AlertCircle, RefreshCw } from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTranslation } from "react-i18next";
import api from "../utils/api";

const Budgets = () => {
  const { t } = useTranslation();
  const { currentUser, loading: authLoading } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleApiError = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    const errorMessage =
      error.response?.data?.msg ||
      error.response?.data?.error ||
      error.message ||
      defaultMessage;

    if (error.response?.status === 401) {
      setError(t("errors.unauthorized"));
    } else if (error.response?.status >= 500) {
      setError(t("errors.serverError"));
    } else if (error.response?.status === 404) {
      setError(t("errors.notFound"));
    } else if (error.request) {
      setError(t("errors.networkError"));
    } else {
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      setLoading(false);
      setError(t("errors.unauthorized"));
      return;
    }

    const fetchBudgets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/budgets");
        setBudgets(res.data);
      } catch (err) {
        handleApiError(err, t("errors.fetchFailed"));
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [authLoading, currentUser, retryCount, t]);

  const handleAddBudget = async (newBudget) => {
    try {
      setError(null);
      const res = await api.post("/budgets", newBudget);
      setBudgets([...budgets, res.data]);
      setShowForm(false);
    } catch (err) {
      handleApiError(err, t("errors.addFailed"));
    }
  };

  const handleUpdateBudget = async (updatedBudget) => {
    try {
      setError(null);
      const res = await api.put(`/budgets/${updatedBudget._id}`, updatedBudget);
      setBudgets(
        budgets.map((b) => (b._id === updatedBudget._id ? res.data : b))
      );
      setEditingBudget(null);
    } catch (err) {
      handleApiError(err, t("errors.updateFailed"));
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      setError(null);
      await api.delete(`/budgets/${id}`);
      setBudgets(budgets.filter((b) => b._id !== id));
    } catch (err) {
      handleApiError(err, t("errors.deleteFailed"));
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setError(null);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center"
        >
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="flex-grow">{error}</span>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleRetry}
              className="flex items-center text-red-700 hover:text-red-900"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              {t("common.retry", "Retry")}
            </button>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 ml-4"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      <div className="flex justify-between items-center">
        <AnimatedHeader text={t("budgets.title")} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all shadow-md"
          disabled={!!error}
        >
          <Plus className="h-4 w-4" />
          {t("budgets.addButton")}
        </motion.button>
      </div>

      {(showForm || editingBudget) && (
        <GlassCard>
          <BudgetForm
            onSubmit={editingBudget ? handleUpdateBudget : handleAddBudget}
            initialData={editingBudget}
            onCancel={() => {
              setShowForm(false);
              setEditingBudget(null);
            }}
          />
        </GlassCard>
      )}

      <GlassCard>
        {budgets.length === 0 && !error ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              {t("budgets.noBudgets", "No budgets created yet")}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              {t("budgets.createFirst", "Create your first budget")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => (
              <BudgetProgress
                key={budget._id}
                name={budget.name}
                spent={budget.spent}
                limit={budget.limit}
                category={budget.category} // Pass the category value, not translation
                period={budget.period}
                onEdit={() => setEditingBudget(budget)}
                onDelete={() => handleDeleteBudget(budget._id)}
              />
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Budgets;