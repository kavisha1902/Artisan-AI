import { useAuthStore } from '../../store/authStore';
import { mockNGOs } from '../../utils/mockData';
import { Users, TrendingUp, BookOpen, Shield, Network, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NGODashboard() {
  const { user } = useAuthStore();
  const ngo = user as any;
  
  // Use mock data if in guest mode or no user data
  const userData = ngo || mockNGOs[0];

  const quickStats = [
    {
      title: 'Total Artisans Enrolled',
      value: userData.artisansCount || 250,
      change: '↑ 12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Income Generated',
      value: '₹45,00,000',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Programs Running',
      value: 8,
      completionRate: '75%',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Average Quality Score',
      value: '82/100',
      improvement: '+8%',
      icon: Shield,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  const quickActions = [
    { icon: Users, label: 'Add New Artisan', path: '/ngo/artisans', color: 'bg-blue-500' },
    { icon: BookOpen, label: 'Create Training Program', path: '/ngo/training', color: 'bg-purple-500' },
    { icon: FileText, label: 'Generate Impact Report', path: '/ngo/reports', color: 'bg-green-500' },
    { icon: Network, label: 'Manage Supply Chain', path: '/ngo/supply-chain', color: 'bg-accent-coral' },
  ];

  const recentActivities = [
    { type: 'artisan', text: '12 new artisans registered this month', time: '2 hours ago', icon: Users },
    { type: 'training', text: 'Training program completed by 45 artisans', time: '5 hours ago', icon: BookOpen },
    { type: 'quality', text: '3 artisans ready for certification', time: '1 day ago', icon: Shield },
    { type: 'report', text: 'Monthly impact report generated', time: '2 days ago', icon: FileText },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-secondary-terracotta to-secondary-mustard rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-heading font-bold mb-2">
          Welcome, {userData.name || 'NGO'}! 🙏
        </h1>
        <p className="text-white/90">Track your impact and manage artisan programs efficiently.</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${stat.color} w-6 h-6`} />
                </div>
                {stat.change && (
                  <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                )}
              </div>
              <p className="text-2xl font-bold text-text mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
              {stat.completionRate && (
                <p className="text-xs text-gray-400 mt-1">Completion: {stat.completionRate}</p>
              )}
              {stat.improvement && (
                <p className="text-xs text-green-600 mt-1">{stat.improvement} this quarter</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.path}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${action.color} rounded-xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <p className="font-semibold">{action.label}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Icon className="w-5 h-5 text-secondary-terracotta" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text">{activity.text}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-secondary-beige to-secondary-mustard rounded-xl p-6">
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">AI-Generated Insights</h2>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">✓ 15 artisans ready for certification</p>
            <p className="text-sm text-gray-600">Pottery craft showing highest certification readiness (65%)</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">📈 Pottery craft showing 25% income growth</p>
            <p className="text-sm text-gray-600">12 artisans crossed ₹50,000/month threshold this quarter</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">⚠️ Training completion rate dropped 5%</p>
            <p className="text-sm text-gray-600">Action needed: Review engagement strategies for textile artisans</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">💼 3 new buyers interested in bamboo crafts</p>
            <p className="text-sm text-gray-600">Connect artisans through Supply Chain Builder</p>
          </div>
        </div>
      </div>

      {/* Programs Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Active Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Advanced Pottery', 'Business Skills', 'Quality Standards'].map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-text mb-2">{program}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enrolled</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium text-green-600">35</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-green h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-xs text-gray-500">78% completion rate</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

