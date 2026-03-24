import { useState } from 'react';
import { Upload, CheckCircle, TrendingUp, Award, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentResult {
  overallScore: number;
  craftsmanship: number;
  finishing: number;
  design: number;
  materialQuality: number;
  consistency: number;
  exportReady: boolean;
  certificationEligible: string[];
  suggestions: {
    text: string;
    priority: 'high' | 'medium' | 'low';
    time: string;
    priceImpact: string;
  }[];
}

const mockResult: AssessmentResult = {
  overallScore: 85,
  craftsmanship: 9,
  finishing: 7,
  design: 8,
  materialQuality: 9,
  consistency: 8,
  exportReady: true,
  certificationEligible: ['GI Tag', 'Export Quality Standards'],
  suggestions: [
    {
      text: 'Improve edge finishing using finer sandpaper',
      priority: 'medium',
      time: '2 hours',
      priceImpact: '+15%',
    },
    {
      text: 'Add more intricate patterns for premium market',
      priority: 'high',
      time: '4 hours',
      priceImpact: '+25%',
    },
    {
      text: 'Consider natural dye for eco-conscious buyers',
      priority: 'low',
      time: '1 day',
      priceImpact: '+10%',
    },
  ],
};

export default function QualityAssessment() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResult(mockResult);
      setAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-text mb-2">Quality Assessment Tool</h1>
        <p className="text-gray-600">Get AI-powered quality analysis and improvement suggestions</p>
      </div>

      {!result ? (
        <div className="space-y-6">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 shadow-sm"
          >
            <h2 className="text-xl font-heading font-semibold mb-4 text-text">Upload Product Photos</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Terracotta Vase Medium"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brief Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe your product..."
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                uploaded
                  ? 'border-primary-green bg-green-50'
                  : 'border-gray-300 hover:border-primary-green hover:bg-gray-50'
              }`}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={() => setUploaded(true)}
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-semibold text-text mb-2">
                {uploaded ? 'Photos Uploaded ✓' : 'Click to upload product photos'}
              </p>
              <p className="text-sm text-gray-500">
                Upload up to 5 photos (JPG, PNG) • Maximum 10MB each
              </p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!uploaded || analyzing}
              className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                uploaded && !analyzing
                  ? 'bg-primary-green text-white hover:bg-primary-green-light'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {analyzing ? 'Analyzing Quality...' : 'Analyze Quality'}
            </button>

            {analyzing && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"></div>
                <p className="mt-2 text-sm text-gray-600">AI is analyzing your product...</p>
              </div>
            )}
          </motion.div>

          {/* Previous Assessments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-heading font-semibold mb-4 text-text">Assessment History</h2>
            <div className="space-y-3">
              {[
                { name: 'Pottery Bowl Large', score: 88, date: '2024-06-15', trend: 'up' },
                { name: 'Terracotta Plate', score: 82, date: '2024-06-10', trend: 'up' },
                { name: 'Clay Vase', score: 75, date: '2024-06-05', trend: 'up' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-text">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getScoreColor(item.score)}`}>{item.score}/100</p>
                      <div className="flex items-center gap-1 text-green-600 text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>Improved</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-primary-green to-primary-green-light rounded-xl p-8 text-white text-center"
          >
            <h2 className="text-2xl font-heading font-bold mb-4">Overall Quality Score</h2>
            <div className="relative inline-block mb-4">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="white"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(result.overallScore / 100) * 502.4} 502.4`}
                  className="transition-all"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold">{result.overallScore}</span>
              </div>
            </div>
            <p className="text-xl font-semibold">
              {result.overallScore >= 80 ? 'Excellent Quality! 🎉' : 'Good Quality! Keep improving!'}
            </p>
            {result.exportReady && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
                <span>Export Ready</span>
              </div>
            )}
          </motion.div>

          {/* Detailed Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-heading font-semibold mb-4 text-text">Detailed Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { name: 'Craftsmanship', score: result.craftsmanship },
                { name: 'Finishing', score: result.finishing },
                { name: 'Design', score: result.design },
                { name: 'Material Quality', score: result.materialQuality },
                { name: 'Consistency', score: result.consistency },
              ].map((item, index) => (
                <div key={index} className={`${getScoreBgColor(item.score * 10)} rounded-lg p-4`}>
                  <p className="text-sm text-gray-600 mb-2">{item.name}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-bold ${getScoreColor(item.score * 10)}`}>
                      {item.score}/10
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        item.score * 10 >= 80
                          ? 'bg-green-500'
                          : item.score * 10 >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${item.score * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Improvement Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-heading font-semibold mb-4 text-text">AI Improvement Suggestions</h2>
            <div className="space-y-4">
              {result.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary-green bg-gray-50 rounded-r-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-text">{index + 1}. {suggestion.text}</p>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        suggestion.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : suggestion.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {suggestion.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>⏱️ {suggestion.time}</span>
                    <span className="text-green-600 font-semibold">💰 {suggestion.priceImpact}</span>
                  </div>
                  <button className="mt-2 text-sm text-primary-green hover:text-primary-green-light font-semibold">
                    View Training Video →
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certification Status */}
          {result.certificationEligible.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-secondary-beige to-secondary-mustard rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-primary-green" />
                <h2 className="text-xl font-heading font-semibold text-text">Certification Ready!</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Your product meets the standards for these certifications:
              </p>
              <div className="flex flex-wrap gap-3">
                {result.certificationEligible.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white px-4 py-2 rounded-lg shadow-sm border-2 border-yellow-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                    <span className="font-semibold text-text">{cert}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-primary-green-light transition-colors font-semibold">
                Apply for Certification
              </button>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-green text-white rounded-lg hover:bg-primary-green-light transition-colors font-semibold">
              <Download className="w-5 h-5" />
              Download Report
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary-green text-primary-green rounded-lg hover:bg-primary-green hover:text-white transition-colors font-semibold">
              <Share2 className="w-5 h-5" />
              Share with NGO
            </button>
            <button
              onClick={() => {
                setResult(null);
                setUploaded(false);
                setProductName('');
                setProductDescription('');
              }}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Assess Another Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

