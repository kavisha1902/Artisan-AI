import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import NGOAuth from './pages/NGOAuth.tsx';
import ArtisanAuth from './pages/ArtisanAuth.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import ArtisanLayout from './components/layout/ArtisanLayout.tsx';
import NGOLayout from './components/layout/NGOLayout.tsx';
import ArtisanDashboard from './pages/artisan/ArtisanDashboard.tsx';
import AIAdvisor from './pages/artisan/AIAdvisor.tsx';
import MarketPriceTracker from './pages/artisan/MarketPriceTracker.tsx';
import Training from './pages/artisan/Training.tsx';
import QualityAssessment from './pages/artisan/QualityAssessment.tsx';
import Events from './pages/artisan/Events.tsx';
import Documents from './pages/artisan/Documents.tsx';
import NGODashboard from './pages/ngo/NGODashboard.tsx';
import ImpactDashboard from './pages/ngo/ImpactDashboard.tsx';
import { LanguageProvider } from './modules/i18n.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/ngo/login" element={<NGOAuth mode="login" />} />
          <Route path="/ngo/signup" element={<NGOAuth mode="signup" />} />
          <Route path="/artisan/login" element={<ArtisanAuth mode="login" />} />
          <Route path="/artisan/signup" element={<ArtisanAuth mode="signup" />} />
          
          {/* Artisan Routes */}
          <Route element={<ProtectedRoute allowedUserType="artisan" />}>
            <Route element={<ArtisanLayout />}>
              <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
              <Route path="/artisan/ai-advisor" element={<AIAdvisor />} />
              <Route path="/artisan/market-prices" element={<MarketPriceTracker />} />
              <Route path="/artisan/training" element={<Training />} />
              <Route path="/artisan/quality" element={<QualityAssessment />} />
              <Route path="/artisan/events" element={<Events />} />
              <Route path="/artisan/documents" element={<Documents />} />
              <Route path="/artisan/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
            </Route>
          </Route>

          {/* NGO Routes */}
          <Route element={<ProtectedRoute allowedUserType="ngo" />}>
            <Route element={<NGOLayout />}>
              <Route path="/ngo/dashboard" element={<NGODashboard />} />
              <Route path="/ngo/impact" element={<ImpactDashboard />} />
              <Route path="/ngo/market-intelligence" element={<div className="p-8"><h1 className="text-2xl font-bold">Market Intelligence - Coming Soon</h1></div>} />
              <Route path="/ngo/training" element={<div className="p-8"><h1 className="text-2xl font-bold">Training Customizer - Coming Soon</h1></div>} />
              <Route path="/ngo/quality" element={<div className="p-8"><h1 className="text-2xl font-bold">Quality Control - Coming Soon</h1></div>} />
              <Route path="/ngo/supply-chain" element={<div className="p-8"><h1 className="text-2xl font-bold">Supply Chain - Coming Soon</h1></div>} />
              <Route path="/ngo/reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Report Generator - Coming Soon</h1></div>} />
              <Route path="/ngo/artisans" element={<div className="p-8"><h1 className="text-2xl font-bold">Artisan Management - Coming Soon</h1></div>} />
              <Route path="/ngo/programs" element={<div className="p-8"><h1 className="text-2xl font-bold">Program Management - Coming Soon</h1></div>} />
              <Route path="/ngo/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
