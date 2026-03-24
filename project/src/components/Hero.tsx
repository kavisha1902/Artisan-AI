import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../modules/i18n';

export default function Hero() {
  const t = useTranslation();
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-6xl lg:text-7xl font-light leading-tight mb-8">
              {t('hero.title1')}
              <br />
              {t('hero.title2_part1')}{' '}
              <span className="inline-flex items-center">
                <svg className="w-12 h-12 text-blue-600 mx-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
              {t('hero.title2_part2')}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl mb-8">
              {t('hero.tagline')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/artisan/login"
                className="px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-primary-green-light transition-colors font-semibold text-lg"
              >
                I'm an Artisan
              </Link>
              <Link
                to="/ngo/login"
                className="px-6 py-3 bg-secondary-terracotta text-white rounded-lg hover:bg-secondary-terracotta/90 transition-colors font-semibold text-lg"
              >
                I'm an NGO
              </Link>
              <Link
                to="/artisan/login"
                className="px-6 py-3 border-2 border-primary-green text-primary-green rounded-lg hover:bg-primary-green hover:text-white transition-colors font-semibold text-lg"
              >
                Explore Demo
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 w-full max-w-xl mx-auto">
              <div className="w-full aspect-square max-w-xl rounded-full overflow-hidden ring-8 ring-stone-200 shadow-xl">
                <img src="/portrait-artist-work_52683-17649.jpg" alt="Artisan at work" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-blue-600" />
      </div>
    </section>
  );
}
