import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../modules/i18n';
import { useAuthStore } from '../store/authStore';
import { mockNGOs } from '../utils/mockData';

type AuthMode = 'login' | 'signup';

export default function NGOAuth({ mode }: { mode: AuthMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const navigate = useNavigate();
  const { login, setGuestMode } = useAuthStore();
  const t = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo: use mock data
    const ngoData = mockNGOs[0];
    login({
      id: ngoData.id,
      name: orgName || ngoData.name,
      email: email || ngoData.email,
      phone: ngoData.phone,
      registrationNumber: ngoData.registrationNumber,
      location: ngoData.location,
      craftsSupported: ngoData.craftsSupported,
      artisansCount: ngoData.artisansCount,
      language: 'en',
    } as any, 'ngo');
    navigate('/ngo/dashboard');
  };

  const handleGuestMode = () => {
    const ngoData = mockNGOs[0];
    login(ngoData as any, 'ngo');
    setGuestMode(true);
    navigate('/ngo/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center">
            <div className="text-3xl font-light tracking-tight leading-5 text-center">
              <span className="block">&lt;ART&gt;</span>
              <span className="block">&lt;IS-AN&gt;</span>
              <span className="block">&lt;AI&gt;</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-light text-gray-900">
            {mode === 'login' ? t('header.ngo_login') : t('header.ngo_signup')}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {mode === 'signup' && (
              <>
                <div>
                  <label htmlFor="name" className="sr-only">
                    {t('auth.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder={t('auth.name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="orgName" className="sr-only">
                    {t('auth.org')}
                  </label>
                  <input
                    id="orgName"
                    name="orgName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder={t('auth.org')}
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t('auth.email')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${mode === 'login' ? 'rounded-t-md' : ''} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t('auth.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${mode === 'signup' ? '' : 'rounded-b-md'} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  {t('auth.confirm')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={t('auth.confirm')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary-terracotta hover:bg-secondary-terracotta/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-terracotta"
            >
              {mode === 'login' ? t('auth.login') : t('auth.signup')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleGuestMode}
              className="w-full py-2 px-4 border-2 border-secondary-terracotta text-secondary-terracotta rounded-md hover:bg-secondary-terracotta hover:text-white transition-colors text-sm font-medium"
            >
              Explore Demo Mode (Guest)
            </button>
          </div>

          <div className="text-center">
            {mode === 'login' ? (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/ngo/signup" className="font-medium text-secondary-terracotta hover:text-secondary-terracotta/90">
                  Sign up here
                </Link>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/ngo/login" className="font-medium text-secondary-terracotta hover:text-secondary-terracotta/90">
                  Log in here
                </Link>
              </p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Are you an artisan?{' '}
              <Link to={`/artisan/${mode}`} className="font-medium text-secondary-terracotta hover:text-secondary-terracotta/90">
                Click here instead
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}