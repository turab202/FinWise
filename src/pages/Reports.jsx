import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DonutChart from '../components/dashboard/Charts/DonutChart';
import LineChart from '../components/dashboard/Charts/LineChart';
import AnimatedHeader from '../components/ui/AnimatedHeader';
import GlassCard from '../components/ui/GlassCard';
import { Download } from 'lucide-react';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('expenses');

  useEffect(() => {
    // Simulate API fetch
    const fetchReportData = async () => {
      try {
        // In a real app, you would fetch this from your backend
        const mockData = {
          expenses: {
            distribution: [
              { name: 'Food', value: 540 },
              { name: 'Transport', value: 320 },
              { name: 'Shopping', value: 280 },
              { name: 'Housing', value: 650 },
              { name: 'Entertainment', value: 210 },
              { name: 'Other', value: 318 },
            ],
            trends: [
              { name: 'Jan', expenses: 2400 },
              { name: 'Feb', expenses: 2600 },
              { name: 'Mar', expenses: 2200 },
              { name: 'Apr', expenses: 2800 },
              { name: 'May', expenses: 2500 },
              { name: 'Jun', expenses: 2300 },
            ],
          },
          income: {
            distribution: [
              { name: 'Salary', value: 3200 },
              { name: 'Freelance', value: 850 },
              { name: 'Investments', value: 450 },
              { name: 'Other', value: 150 },
            ],
            trends: [
              { name: 'Jan', income: 4000 },
              { name: 'Feb', income: 4200 },
              { name: 'Mar', income: 3800 },
              { name: 'Apr', income: 4500 },
              { name: 'May', income: 4100 },
              { name: 'Jun', income: 4800 },
            ],
          },
        };

        setTimeout(() => {
          setReportData(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching report data:', error);
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const handleExport = () => {
    // In a real app, this would generate and download a report
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <AnimatedHeader text="Reports" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Download className="h-4 w-4" />
          Export Report
        </motion.button>
      </div>

      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'expenses' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'income' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
        >
          Income
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="space-y-6">
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">
              {activeTab === 'expenses' ? 'Expense' : 'Income'} Distribution
            </h3>
            <div className="h-80">
              <DonutChart 
                data={activeTab === 'expenses' ? reportData.expenses.distribution : reportData.income.distribution} 
              />
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">
              {activeTab === 'expenses' ? 'Expense' : 'Income'} Trends
            </h3>
            <div className="h-80">
              <LineChart 
                data={activeTab === 'expenses' ? reportData.expenses.trends : reportData.income.trends} 
              />
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Reports;