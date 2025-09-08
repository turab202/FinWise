import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GoalCard from '../components/goals/GoalCard';
import GoalForm from '../components/goals/GoalForm';
import GlassCard from '../components/ui/GlassCard';
import AnimatedHeader from '../components/ui/AnimatedHeader';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const Goals = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  // -----------------------------
  // Fetch goals from backend
  // -----------------------------
  useEffect(() => {
    const fetchGoals = async () => {
      if (!currentUser) {
        setGoals([]);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/goals'); // token sent automatically
        setGoals(res.data);
      } catch (error) {
        console.error('Error loading goals', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [currentUser]);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleAddGoal = async (newGoal) => {
  console.log('Adding goal:', newGoal); // <-- check values
  try {
    const res = await api.post('/goals', newGoal);
    setGoals([...goals, res.data]);
    setShowForm(false);
  } catch (err) {
    console.error('Error adding goal', err.response?.data || err);
  }
};


  const handleUpdateGoal = async (updatedGoal) => {
    try {
      const res = await api.put(`/goals/${updatedGoal._id}`, updatedGoal);
      setGoals(goals.map(g => g._id === res.data._id ? res.data : g));
      setEditingGoal(null);
    } catch (err) {
      console.error('Error updating goal', err);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter(g => g._id !== id));
    } catch (err) {
      console.error('Error deleting goal', err);
    }
  };

  const handleAddToSavings = async (id, amount) => {
    try {
      const res = await api.put(`/goals/${id}/add`, { amount });
      setGoals(goals.map(g => g._id === res.data._id ? res.data : g));
    } catch (err) {
      console.error('Error adding to savings', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <AnimatedHeader text={t('goals.title')} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
        >
          <Plus className="h-4 w-4" />
          {t('goals.addButton')}
        </motion.button>
      </div>

      {(showForm || editingGoal) && (
        <GlassCard>
          <GoalForm
            onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal}
            initialData={editingGoal}
            onCancel={() => {
              setShowForm(false);
              setEditingGoal(null);
            }}
          />
        </GlassCard>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <GoalCard 
              key={goal._id} 
              goal={goal} 
              onEdit={() => setEditingGoal(goal)}
              onDelete={() => handleDeleteGoal(goal._id)}
              onAddToSavings={(amount) => handleAddToSavings(goal._id, amount)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Goals;
