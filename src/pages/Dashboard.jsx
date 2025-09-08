import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SummaryCards from '../components/dashboard/SummaryCards';
import DonutChart from '../components/dashboard/Charts/DonutChart';
import LineChart from '../components/dashboard/Charts/LineChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import AnimatedHeader from '../components/ui/AnimatedHeader';
import GlassCard from '../components/ui/GlassCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api'; // Reuse your existing api axios instance

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (!currentUser) {
        setDashboardData(null);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('finwise_token');

        // Fetch dashboard info and user goals in parallel
        const [dashboardRes, goalsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }),
          api.get('/goals'), // fetch all user goals
        ]);

        if (!dashboardRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const dashboardJson = await dashboardRes.json();
        const goals = goalsRes.data;

        // Calculate total savings from goals
        const totalSavings = goals.reduce(
          (sum, goal) => sum + (parseFloat(goal.currentAmount) || 0),
          0
        );

        // Merge savings into dashboard data
        const data = {
          ...dashboardJson,
          savings: totalSavings,
        };

        // Translate transactions and categories if needed
        if (data.recentTransactions) {
          data.recentTransactions = data.recentTransactions.map(tx => ({
            ...tx,
            title: t(`transactions.${tx.title}`),
            category: t(`categories.${tx.category}`),
          }));
        }

        if (data.expenseDistribution) {
          data.expenseDistribution = data.expenseDistribution.map(item => ({
            ...item,
            name: t(`categories.${item.name}`),
          }));
        }

        if (data.monthlyTrends) {
          data.monthlyTrends = data.monthlyTrends.map(item => ({
            ...item,
            name: t(`months.${item.name}`),
          }));
        }

        setDashboardData(data);
      } catch (error) {
        console.error(t('errors.fetchDashboard'), error);
        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-20 text-gray-500">
        {t('dashboard.noData')}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatedHeader text={t('dashboard.title')} className="mb-6" />
      
      <SummaryCards data={dashboardData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <LineChart data={dashboardData.monthlyTrends} />
        </GlassCard>
        
        <GlassCard>
          <DonutChart data={dashboardData.expenseDistribution} />
        </GlassCard>
      </div>
      
      <GlassCard>
        <RecentTransactions 
          transactions={dashboardData.recentTransactions} 
          title={t('recentTransactions')}
        />
      </GlassCard>
    </div>
  );
};

export default Dashboard;
