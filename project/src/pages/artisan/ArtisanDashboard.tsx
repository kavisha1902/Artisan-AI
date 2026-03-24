import { useAuthStore } from '../../store/authStore';
import { mockArtisans } from '../../utils/mockData';
import { TrendingUp, Package, BookOpen, Star, MessageCircle, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ArtisanDashboard() {
  const { user } = useAuthStore();
  const artisan = user as any;
  
  // Use mock data if in guest mode or no user data
  const userData = artisan || mockArtisans[0];
  const monthlyIncome = userData.monthlyIncome || 25000;
  const lastMonthIncome = userData.incomeHistory?.[userData.incomeHistory.length - 2]?.income || 18000;
  const incomeGrowth = ((monthlyIncome - lastMonthIncome) / lastMonthIncome * 100).toFixed(1);

  const quickStats = [
    {
      title: 'Monthly Income',
      value: `₹${monthlyIncome.toLocaleString()}`,
      change: `↑ ${incomeGrowth}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Products Listed',
      value: userData.productsListed || 23,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Training Progress',
      value: '65%',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Quality Score',
      value: `${userData.qualityScore || 85}/100`,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  const quickActions = [
    { icon: MessageCircle, label: 'Ask AI Advisor', path: '/artisan/ai-advisor', color: 'bg-primary-green' },
    { icon: TrendingUp, label: 'Check Market Prices', path: '/artisan/market-prices', color: 'bg-blue-500' },
    { icon: Package, label: 'Upload New Product', path: '/artisan/quality', color: 'bg-purple-500' },
    { icon: Calendar, label: 'View Upcoming Events', path: '/artisan/events', color: 'bg-accent-coral' },
  ];

  const recentActivities = [
    { type: 'training', text: 'Completed: Advanced Pottery Finishing', time: '2 hours ago', icon: BookOpen },
    { type: 'price', text: 'Price alert: Pottery prices increased 8%', time: '5 hours ago', icon: TrendingUp },
    { type: 'event', text: 'Event reminder: National Handicraft Fair', time: '1 day ago', icon: Calendar },
    { type: 'document', text: 'Generated: Business Registration Form', time: '2 days ago', icon: FileText },
    { type: 'quality', text: 'Quality assessment completed', time: '3 days ago', icon: Star },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-green to-primary-green-light rounded-2xl p-6 text-white"
      >
        <h1 className="text-3xl font-heading font-bold mb-2">
          Namaste, {userData.name || 'Artisan'}! 🙏
        </h1>
        <p className="text-white/90">Welcome back! Here's what's happening with your business today.</p>
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
                  <Icon className="w-5 h-5 text-primary-green" />
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

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-secondary-beige to-secondary-mustard rounded-xl p-6">
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Recommendations for You</h2>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-text mb-1">Suggested Training: Digital Marketing Basics</h3>
            <p className="text-sm text-gray-600">Learn how to market your products online - 95% match for you</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-text mb-1">Upcoming Event: Regional Craft Fair</h3>
            <p className="text-sm text-gray-600">Only 45km away - Perfect for pottery artisans like you</p>
          </div>
        </div>
      </div>
    </div>
  );
}

