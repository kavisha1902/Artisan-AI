import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  rating: number;
  image: string;
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Pottery Artisan",
      title: "Pottery Artisan",
      quote: "I used to guess my vase prices, but the AI Advisor told me to sell at ₹2,800 after checking market trends. I tried it—and my earnings jumped 30%. For the first time, I know what my craft is truly worth.",
      rating: 4,
      image: "/pottery.jpg"
    },
    {
      name: "Handloom Weaver",
      title: "Handloom Weaver",
      quote: "Earlier, middlemen fixed my fabric prices. The Market Tracker showed what other weavers charged across regions. I updated my rates—and now I earn 15% more without losing a single buyer. The AI also suggested trending color palettes and patterns that sell better online. Now, my fabrics are reaching new buyers through NGO-linked marketplaces.",
      rating: 5,
      image: "/handloom.jpg"
    }
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-stone-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        <div className="relative bg-white rounded-3xl border-4 border-black p-12 shadow-2xl">
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-blue-900 bg-white hover:bg-blue-50 transition-colors flex items-center justify-center z-10"
          >
            <ChevronLeft className="w-6 h-6 text-blue-900" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-blue-900 bg-white hover:bg-blue-50 transition-colors flex items-center justify-center z-10"
          >
            <ChevronRight className="w-6 h-6 text-blue-900" />
          </button>

          <div className="absolute -top-3 -left-3 w-16 h-16">
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <path d="M 20 30 L 25 25 L 30 30 L 35 20 L 40 30"
                stroke="#E8C580" strokeWidth="3" fill="none" />
            </svg>
          </div>

          <div className="absolute -bottom-3 -right-3 w-16 h-16">
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <circle cx="30" cy="30" r="15" stroke="#7CB8E8" strokeWidth="3" fill="none" />
              <circle cx="30" cy="30" r="8" stroke="#7CB8E8" strokeWidth="2" fill="none" />
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-8 h-full">
                <div className="absolute -top-3 left-8">
                  <svg viewBox="0 0 40 40" className="w-10 h-10">
                    <path d="M 10 20 L 15 10 L 25 10 L 30 20 L 25 30 L 15 30 Z"
                      fill="#E8C580" stroke="#4A5568" strokeWidth="1" />
                  </svg>
                </div>

                <div className="relative w-full aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-gray-200">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <svg viewBox="0 0 40 40" className="w-8 h-8">
                    <circle cx="20" cy="20" r="15" fill="white" stroke="#CBD5E0" strokeWidth="2" />
                  </svg>
                </div>

                <h3 className="text-3xl font-bold text-blue-900 mb-6">
                  {currentTestimonial.name}
                </h3>

                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {currentTestimonial.quote}
                </p>

                <div className="mb-6">
                  <p className="text-gray-800 font-semibold mb-2">Rating:</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-8 h-8 ${
                          i < currentTestimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 bg-green-400 hover:bg-green-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-colors">
                  <span>Discover more</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
