import { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useLanguageStore, languages } from '../../store/languageStore';
import type { Language } from '../../store/languageStore';
import { 
  Home, BarChart3, Brain, BookOpen, Shield, Network, FileText, 
  Users, Briefcase, Settings, LogOut, Menu, X, Globe 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NGOLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  const navigate = useNavigate();
  const location = useLocation();

  const ngo = user as any;
  
  // Memoize menu items to update when language changes
  const menuItems = useMemo(() => [
    { path: '/ngo/dashboard', icon: Home, label: t('nav.dashboard') },
    { path: '/ngo/impact', icon: BarChart3, label: t('nav.impact_dashboard') },
    { path: '/ngo/market-intelligence', icon: Brain, label: t('nav.market_intelligence') },
    { path: '/ngo/training', icon: BookOpen, label: t('nav.training_customizer') },
    { path: '/ngo/quality', icon: Shield, label: t('nav.quality_control') },
    { path: '/ngo/supply-chain', icon: Network, label: t('nav.supply_chain') },
    { path: '/ngo/reports', icon: FileText, label: t('nav.report_generator') },
    { path: '/ngo/artisans', icon: Users, label: t('nav.artisan_management') },
    { path: '/ngo/programs', icon: Briefcase, label: t('nav.program_management') },
    { path: '/ngo/settings', icon: Settings, label: t('nav.settings') },
  ], [currentLanguage, t]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-heading font-bold text-primary-green">Art-is-an-AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={currentLanguage}
              onChange={(e) => {
                const newLang = e.target.value as Language;
                setLanguage(newLang);
              }}
              className="text-sm border rounded px-2 py-1 pr-8 appearance-none bg-white"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.nativeName}</option>
              ))}
            </select>
            <Globe size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className={`
                fixed lg:sticky top-0 left-0 h-screen w-64 bg-white shadow-lg z-40
                lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                overflow-y-auto
              `}
            >
              <div className="p-6">
                {/* Logo */}
                <div className="mb-8">
                  <h1 className="text-2xl font-heading font-bold text-primary-green flex items-center gap-2">
                    <span className="text-3xl">🎨</span>
                    Art-is-an-AI
                  </h1>
                </div>

                {/* Profile Section */}
                <div className="mb-8 pb-6 border-b">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-secondary-terracotta flex items-center justify-center text-white font-bold">
                      {ngo?.name?.charAt(0) || 'N'}
                    </div>
                    <div>
                      <p className="font-semibold text-text text-sm">{ngo?.name || 'NGO'}</p>
                      <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm
                          ${isActive 
                            ? 'bg-secondary-terracotta text-white shadow-md' 
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="mt-8 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all text-sm"
                >
                  <LogOut size={18} />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {/* Desktop Header */}
          <header className="hidden lg:flex bg-white shadow-sm p-4 items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search artisans, programs, reports..."
                className="px-4 py-2 border rounded-lg w-96"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={currentLanguage}
                  onChange={(e) => {
                    const newLang = e.target.value as Language;
                    setLanguage(newLang);
                  }}
                  className="text-sm border rounded px-2 py-1 pr-8 appearance-none bg-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.nativeName}</option>
                  ))}
                </select>
                <Globe size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary-terracotta flex items-center justify-center text-white font-bold">
                {ngo?.name?.charAt(0) || 'N'}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

