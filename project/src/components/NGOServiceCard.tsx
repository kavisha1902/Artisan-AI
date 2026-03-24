import { ChevronRight } from 'lucide-react';

interface NGOServiceCardProps {
  title: string;
  items: string[];
  integration?: string;
}

export default function NGOServiceCard({ title, items, integration }: NGOServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
      <h3 className="text-3xl font-light mb-6 text-gray-900 border-b border-gray-200 pb-4">
        {title}
      </h3>
      <ul className="space-y-3 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-gray-400 mt-1">•</span>
            <span className="text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      {integration && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Integration:</span> {integration}
          </p>
        </div>
      )}
      <button className="mt-6 inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all group bg-black text-white px-6 py-3 rounded-lg">
        <span>Read More</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
