import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for charts
const incomeData = [
  { month: 'Jan', avg: 12000, median: 10000, top10: 25000, bottom10: 8000 },
  { month: 'Feb', avg: 13500, median: 11000, top10: 28000, bottom10: 8500 },
  { month: 'Mar', avg: 15000, median: 12000, top10: 30000, bottom10: 9000 },
  { month: 'Apr', avg: 16500, median: 13000, top10: 32000, bottom10: 9500 },
  { month: 'May', avg: 18000, median: 14000, top10: 35000, bottom10: 10000 },
  { month: 'Jun', avg: 19500, median: 15000, top10: 38000, bottom10: 10500 },
];

const craftDistribution = [
  { name: 'Pottery', value: 35, color: '#4CAF50' },
  { name: 'Textiles', value: 28, color: '#E07856' },
  { name: 'Bamboo', value: 15, color: '#F4A261' },
  { name: 'Metal Work', value: 12, color: '#FF6B6B' },
  { name: 'Wood Work', value: 10, color: '#4ECDC4' },
];

const incomeBrackets = [
  { range: '₹0-10k', count: 25 },
  { range: '₹10-25k', count: 120 },
  { range: '₹25-50k', count: 80 },
  { range: '₹50k+', count: 25 },
];

export default function ImpactDashboard() {
  const [timeRange, setTimeRange] = useState('6months');

  const topMetrics = [
    { title: 'Total Artisans', value: '250', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Total Income Generated', value: '₹45,00,000', change: '+23%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Average Income/Artisan', value: '₹18,000', change: '+18%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Quality Score Avg', value: '82/100', change: '+8%', icon: Award, color: 'text-yellow-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Program Impact Dashboard</h1>
        <p className="text-gray-600">Track your impact and measure program effectiveness</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['1week', '1month', '3months', '6months', '1year'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === range
                ? 'bg-secondary-terracotta text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} bg-opacity-10 p-3 rounded-lg`}>
                  <Icon className={`${metric.color} w-6 h-6`} />
                </div>
                <span className="text-sm text-green-600 font-semibold">{metric.change}</span>
              </div>
              <p className="text-2xl font-bold text-text mb-1">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Income Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Income Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incomeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="avg" stroke="#4CAF50" strokeWidth={2} name="Average Income" />
            <Line type="monotone" dataKey="median" stroke="#66BB6A" strokeWidth={2} strokeDasharray="5 5" name="Median Income" />
            <Line type="monotone" dataKey="top10" stroke="#FF6B6B" strokeWidth={2} strokeDasharray="3 3" name="Top 10%" />
            <Line type="monotone" dataKey="bottom10" stroke="#94a3b8" strokeWidth={2} strokeDasharray="3 3" name="Bottom 10%" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Craft Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-heading font-semibold mb-4 text-text">Craft Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={craftDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {craftDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Income Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-heading font-semibold mb-4 text-text">Income Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incomeBrackets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4CAF50" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-secondary-beige to-secondary-mustard rounded-xl p-6"
      >
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">AI-Generated Insights</h2>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">✓ Average income increased by 23% this quarter</p>
            <p className="text-sm text-gray-600">Pottery artisans showed highest growth (35%). 12 artisans crossed ₹50,000/month threshold.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">📈 Training completion rate improved by 15%</p>
            <p className="text-sm text-gray-600">Business Skills course showing best engagement. Consider expanding similar content.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">🎯 15 artisans ready for certification</p>
            <p className="text-sm text-gray-600">Pottery craft showing highest certification readiness (65%).</p>
          </div>
        </div>
      </motion.div>

      {/* Success Stories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Ramesh Kumar', craft: 'Pottery', growth: '400%', income: '₹25,000' },
            { name: 'Priya Sharma', craft: 'Textiles', growth: '267%', income: '₹32,000' },
            { name: 'Suresh Patel', craft: 'Bamboo', growth: '350%', income: '₹28,000' },
          ].map((artisan, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-xl mb-3">
                {artisan.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-text mb-1">{artisan.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{artisan.craft}</p>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-gray-600">Income: </span>
                  <span className="font-semibold text-green-600">{artisan.income}/month</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Growth: </span>
                  <span className="font-semibold text-primary-green">{artisan.growth}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

