import { Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, useSetLanguage, useTranslation } from '../modules/i18n';
import type { Language } from '../store/languageStore';

export default function Header() {
  const lang = useLanguage();
  const setLang = useSetLanguage();
  const t = useTranslation();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-100 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-light tracking-tight leading-5">
            <span className="block">&lt;ART&gt;</span>
            <span className="block">&lt;IS-AN&gt;</span>
            <span className="block">&lt;AI&gt;</span>
          </div>
        </Link>

        <div className="flex-1 max-w-4xl">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder=""
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-gray-400 focus:outline-none bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <select
            aria-label="Language"
            className="border rounded-full px-3 py-2 bg-white text-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="bn">বাংলা</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="mr">मराठी</option>
            <option value="gu">ગુજરાતી</option>
          </select>

          <div className="hidden md:flex items-center gap-3 text-sm">
            <Link className="hover:underline" to="/ngo/login">{t('header.ngo_login')}</Link>
            <span className="text-gray-300">|</span>
            <Link className="hover:underline" to="/artisan/login">{t('header.artisan_login')}</Link>
            <span className="text-gray-300">|</span>
            <Link className="hover:underline" to="/ngo/signup">{t('header.ngo_signup')}</Link>
            <span className="text-gray-300">|</span>
            <Link className="hover:underline" to="/artisan/signup">{t('header.artisan_signup')}</Link>
          </div>

          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors md:hidden" aria-label="menu">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
