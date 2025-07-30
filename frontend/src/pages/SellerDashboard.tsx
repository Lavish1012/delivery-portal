import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Receipt, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  ShoppingCart,
  Calendar,
  Users
} from 'lucide-react';
import InventoryManagement from '../components/seller/InventoryManagement';
import BillingTool from '../components/seller/BillingTool';
import SalesAnalytics from '../components/seller/SalesAnalytics';
import { useDarkMode } from '../context/DarkModeContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';


interface DashboardStats {
  today: {
    totalRevenue: number;
    totalQuantity: number;
    totalOrders: number;
  };
  totalProducts: number;
  lowStockProducts: number;
  monthlyRevenue: Array<{
    _id: { year: number; month: number };
    revenue: number;
    orders: number;
  }>;
}

const SellerDashboard: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'billing' | 'analytics'>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/analytics/overview', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setStats(data.overview);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    change?: string;
  }> = ({ title, value, icon, color, change }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl shadow-lg border transition-all duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const TabButton: React.FC<{
    tab: typeof activeTab;
    label: string;
    icon: React.ReactNode;
  }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        activeTab === tab
          ? isDarkMode
            ? 'bg-blue-600 text-white'
            : 'bg-blue-500 text-white'
          : isDarkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`border-b transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Mr. Patel's Dashboard
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Manage your inventory, billing, and analytics
              </p>
            </div>
            
            {/* Date Display */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          <TabButton
            tab="overview"
            label="Overview"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <TabButton
            tab="inventory"
            label="Inventory"
            icon={<Package className="h-4 w-4" />}
          />
          <TabButton
            tab="billing"
            label="Billing"
            icon={<Receipt className="h-4 w-4" />}
          />
          <TabButton
            tab="analytics"
            label="Analytics"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && stats && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Today's Revenue"
                  value={`₹${stats.today.totalRevenue.toLocaleString()}`}
                  icon={<DollarSign className="h-6 w-6 text-white" />}
                  color="bg-green-500"
                />
                <StatCard
                  title="Today's Orders"
                  value={stats.today.totalOrders}
                  icon={<ShoppingCart className="h-6 w-6 text-white" />}
                  color="bg-blue-500"
                />
                <StatCard
                  title="Total Products"
                  value={stats.totalProducts}
                  icon={<Package className="h-6 w-6 text-white" />}
                  color="bg-purple-500"
                />
                <StatCard
                  title="Low Stock Alerts"
                  value={stats.lowStockProducts}
                  icon={<AlertTriangle className="h-6 w-6 text-white" />}
                  color={stats.lowStockProducts > 0 ? "bg-red-500" : "bg-gray-500"}
                />
              </div>

              {/* Quick Actions */}
              <div className={`p-6 rounded-xl shadow-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200"
                  >
                    <Package className="h-8 w-8 text-blue-500" />
                    <div className="text-left">
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Add Product
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Add new items to inventory
                      </p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('billing')}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors duration-200"
                  >
                    <Receipt className="h-8 w-8 text-green-500" />
                    <div className="text-left">
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Create Invoice
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Generate new bill
                      </p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors duration-200"
                  >
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                    <div className="text-left">
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        View Analytics
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Check sales performance
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && <InventoryManagement />}
          {activeTab === 'billing' && <BillingTool />}
          {activeTab === 'analytics' && <SalesAnalytics />}
        </motion.div>
      </div>
    </div>
  );
};

export default SellerDashboard;
