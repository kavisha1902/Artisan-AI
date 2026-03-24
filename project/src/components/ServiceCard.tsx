import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string[];
  accent?: string;
}

export default function ServiceCard({ icon, title, description, accent }: ServiceCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl p-8 shadow-lg border-4 border-black hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="absolute -top-3 -left-3 w-12 h-12">
        <svg viewBox="0 0 50 50" className="w-full h-full">
          <path d="M 5 25 Q 5 5 25 5" stroke={accent || "#86C5A8"} strokeWidth="3" fill="none" />
          <path d="M 25 5 L 30 5 L 30 10" stroke={accent || "#86C5A8"} strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="flex items-start gap-6 mb-6">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-blue-900 leading-tight">
          {title}
        </h3>
      </div>

      <div className={`relative bg-gradient-to-br ${accent === '#FFB366' ? 'from-orange-50 to-amber-50' : 'from-blue-50 to-indigo-50'} rounded-2xl p-6 border-2 border-gray-200`}>
        <div className="absolute -top-2 left-6">
          <svg viewBox="0 0 30 30" className="w-6 h-6">
            <path d="M 15 5 L 20 15 L 15 25 L 10 15 Z" fill={accent || "#86C5A8"} opacity="0.6" />
          </svg>
        </div>

        <div className="space-y-3">
          {description.map((text, index) => (
            <p key={index} className="text-blue-800 leading-relaxed">
              {text}
            </p>
          ))}
        </div>

        <button className="mt-6 flex items-center gap-2 text-gray-800 font-medium hover:gap-3 transition-all group">
          <span>Explore</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
