import { useState } from 'react';
import { Play, Star, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
// import { mockTrainings } from '../../utils/mockData';

const courses = [
  {
    id: 'TRN001',
    title: 'Advanced Pottery Finishing Techniques',
    craft: 'Pottery',
    level: 'Intermediate',
    duration: '3 hours',
    rating: 4.6,
    enrollments: 45,
    progress: 65,
    thumbnail: '🎨',
    description: 'Master advanced finishing techniques to improve product quality and market value.',
    modules: [
      { name: 'Module 1: Surface Preparation', completed: true },
      { name: 'Module 2: Finishing Tools', completed: true },
      { name: 'Module 3: Quality Standards', completed: false },
    ],
  },
  {
    id: 'TRN002',
    title: 'Business Skills for Artisans',
    craft: 'All',
    level: 'Beginner',
    duration: '5 hours',
    rating: 4.8,
    enrollments: 120,
    progress: 0,
    thumbnail: '💼',
    description: 'Learn essential business skills to grow your craft enterprise.',
    modules: [
      { name: 'Module 1: Pricing Strategies', completed: false },
      { name: 'Module 2: Customer Relations', completed: false },
      { name: 'Module 3: Financial Management', completed: false },
    ],
  },
  {
    id: 'TRN003',
    title: 'Digital Marketing Basics',
    craft: 'All',
    level: 'Beginner',
    duration: '4 hours',
    rating: 4.7,
    enrollments: 89,
    progress: 0,
    thumbnail: '📱',
    description: 'Promote your craft online and reach more customers.',
    modules: [],
  },
];

export default function Training() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [, setActiveCourse] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'craft', name: 'Craft Techniques' },
    { id: 'business', name: 'Business Skills' },
    { id: 'marketing', name: 'Marketing & Sales' },
    { id: 'quality', name: 'Quality & Standards' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">My Training</h1>
        <p className="text-gray-600">Continue your learning journey and develop new skills</p>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-green to-primary-green-light rounded-xl p-6 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Overall Progress</p>
            <p className="text-3xl font-bold">65%</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Courses Completed</p>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm mt-1">out of 8 enrolled</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Badges Earned</p>
            <div className="flex gap-2 mt-2">
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">🏆 Quick Learner</div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">⭐ Perfectionist</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-green text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Active Courses */}
      <div>
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Active Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses
            .filter((course) => course.progress > 0)
            .map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveCourse(course.id)}
              >
                <div className="text-4xl mb-3">{course.thumbnail}</div>
                <h3 className="text-lg font-semibold text-text mb-2">{course.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{course.level}</span>
                  <span className="text-xs text-gray-500">{course.duration}</span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-green h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <button className="text-primary-green hover:text-primary-green-light font-semibold text-sm flex items-center gap-1">
                    Continue <Play className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses
            .filter((course) => course.progress === 0)
            .map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveCourse(course.id)}
              >
                <div className="text-4xl mb-3">{course.thumbnail}</div>
                <h3 className="text-lg font-semibold text-text mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{course.level}</span>
                  <span className="text-xs text-gray-500">{course.duration}</span>
                  <span className="text-xs text-gray-500">• {course.enrollments} enrolled</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary-green">
                    <span className="font-semibold">95% match</span>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green-light transition-colors font-semibold">
                  Start Course
                </button>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Skills Improvement Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-xl font-heading font-semibold mb-4 text-text">Skills Development</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Product Design', before: 60, after: 75 },
            { name: 'Business', before: 45, after: 70 },
            { name: 'Marketing', before: 30, after: 65 },
            { name: 'Quality Control', before: 50, after: 80 },
            { name: 'Digital Skills', before: 25, after: 60 },
          ].map((skill, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-600 mb-2">{skill.name}</p>
              <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(skill.after / 100) * 251.2} 251.2`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-text">{skill.after}%</span>
                </div>
              </div>
              <p className="text-xs text-green-600">+{skill.after - skill.before}%</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certificates Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-secondary-beige to-secondary-mustard rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-primary-green" />
          <h2 className="text-xl font-heading font-semibold text-text">Earned Certificates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Basic Pottery', date: '2024-03-15', icon: '🏺' },
            { name: 'Quality Standards', date: '2024-04-20', icon: '⭐' },
          ].map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm border-2 border-yellow-300"
            >
              <div className="text-3xl mb-2">{cert.icon}</div>
              <h3 className="font-semibold text-text mb-1">{cert.name}</h3>
              <p className="text-xs text-gray-500">Completed: {cert.date}</p>
              <button className="mt-3 text-sm text-primary-green hover:text-primary-green-light font-semibold">
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

