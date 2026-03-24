import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockMarketPrices } from '../../utils/mockData';

const priceData = mockMarketPrices[0].priceHistory.map(item => ({
  month: item.date.split('-')[1] + '/' + item.date.split('-')[0].slice(-2),
  min: item.min,
  avg: item.avg,
  max: item.max,
  yourPrice: 450,
}));

const regionalData = [
  { state: 'Rajasthan', avg: 480 },
  { state: 'Delhi', avg: 550 },
  { state: 'Gujarat', avg: 420 },
  { state: 'Maharashtra', avg: 500 },
  { state: 'Tamil Nadu', avg: 470 },
  { state: 'Karnataka', avg: 490 },
];

export default function MarketPriceTracker() {
  const [selectedRegion, setSelectedRegion] = useState('Rajasthan');
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Market Price Tracker</h1>
        <p className="text-gray-600">Real-time pricing data and market trends for your craft</p>
      </div>

      {/* Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-green to-primary-green-light rounded-xl p-6 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Average Price (This Month)</p>
            <p className="text-3xl font-bold">₹{priceData[priceData.length - 1].avg}</p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">↑ 8% from last month</span>
            </div>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Your Listed Price</p>
            <p className="text-3xl font-bold">₹450</p>
            <p className="text-sm mt-2">Within market range ✓</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Market Trend</p>
            <p className="text-3xl font-bold">Increasing</p>
            <p className="text-sm mt-2">Peak season approaching</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm flex flex-wrap gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Region</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="Rajasthan">Rajasthan</option>
            <option value="Delhi">Delhi</option>
            <option value="Gujarat">Gujarat</option>
            <option value="All">All Regions</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Time Range</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="1week">1 Week</option>
            <option value="1month">1 Month</option>
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green-light transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Price Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-text">Price Trend</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Your Price</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} name="Market Average" />
            <Line type="monotone" dataKey="min" stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" name="Minimum" />
            <Line type="monotone" dataKey="max" stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" name="Maximum" />
            <Line type="monotone" dataKey="yourPrice" stroke="#10b981" strokeWidth={2} strokeDasharray="0" name="Your Price" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Regional Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-xl font-heading font-semibold text-text mb-4">Regional Price Comparison</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={regionalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Bar dataKey="avg" fill="#4CAF50" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Price Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-secondary-beige to-secondary-mustard rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-6 h-6 text-primary-green" />
          <h2 className="text-xl font-heading font-semibold text-text">AI-Generated Price Insights</h2>
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">✓ Your products are priced well</p>
            <p className="text-sm text-gray-600">Your current price (₹450) is 6% above market average, which is good for your quality level.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">📈 Prices in your region increased by 8% last month</p>
            <p className="text-sm text-gray-600">Trending upward - consider reviewing pricing for new products.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">💰 Premium products (₹500+) are trending</p>
            <p className="text-sm text-gray-600">High-quality pottery with intricate designs can command 15-20% premium.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-semibold text-text mb-1">🎯 Festival season approaching</p>
            <p className="text-sm text-gray-600">Prices typically increase 25-30% during Oct-Dec. Plan your inventory accordingly.</p>
          </div>
        </div>
      </motion.div>

      {/* Price Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-xl font-heading font-semibold text-text mb-4">Set Price Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <label className="text-sm text-gray-600 mb-2 block">Notify when price goes above</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="₹500"
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green-light">
                Set Alert
              </button>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <label className="text-sm text-gray-600 mb-2 block">Notify when price drops below</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="₹400"
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green-light">
                Set Alert
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

