import { ArrowRight } from 'lucide-react';
import valueImage from '../../components/IMG_0874-scaled.webp';

export default function WhatWeValue() {
  const values = [
    {
      number: "01",
      title: "Empowering Livelihoods",
      description: "We elevate artisans with digital tools that unlock better income opportunities and direct market access.",
    },
    {
      number: "02",
      title: "Preserving Tradition",
      description: "Every craft carries history. We digitize artisan stories so heritage keeps inspiring future generations.",
    },
    {
      number: "03",
      title: "Fair & Transparent Pricing",
      description: "Data helps artisans set the right price for the right customer. No middlemen. No exploitation.",
    },
    {
      number: "04",
      title: "Community-Driven Growth",
      description: "From local clusters to global markets, we build networks that support families, villages, and ecosystems.",
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10">
              <svg viewBox="0 0 500 500" className="w-full max-w-lg mx-auto">
                <defs>
                  <clipPath id="circleClip">
                    <circle cx="250" cy="250" r="200" />
                  </clipPath>
                </defs>

                <g clipPath="url(#circleClip)">
                  <image
                    href={valueImage}
                    x="25"
                    y="20"
                    width="450"
                    height="450"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>

                <circle cx="250" cy="250" r="205" fill="none" stroke="#C495B0" strokeWidth="4" opacity="0.6" />
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-6xl font-bold text-gray-900 mb-12">
              What we value?
            </h2>

            <div className="space-y-8">
              {values.map((value) => (
                <div key={value.number} className="group">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {value.number}—{value.title}
                  </h3>
                  <p className="text-gray-800 leading-relaxed mb-3">
                    {value.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
