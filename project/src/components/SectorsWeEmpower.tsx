export default function SectorsWeEmpower() {
  const sectors = [
    { title: "Handloom & Textiles", icon: "⭐" },
    { title: "Crafts & Handicrafts", icon: "✦" },
    { title: "Sustainable Products", icon: "✧" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-5xl font-bold text-blue-900 mb-4">
          Sectors We Empower
        </h2>
        <p className="text-xl text-gray-700 mb-16 max-w-4xl mx-auto">
          "Blending creativity with technology to uplift artisan livelihoods across diverse communities."
        </p>

        <div className="flex justify-center items-center gap-8 flex-wrap">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="relative">
                  <svg viewBox="0 0 50 50" className="w-12 h-12">
                    <path d="M 25 5 L 30 20 L 45 20 L 33 30 L 38 45 L 25 35 L 12 45 L 17 30 L 5 20 L 20 20 Z"
                      fill={index === 0 ? "#7CB8E8" : index === 1 ? "#E8C580" : "#7CB8E8"}
                      stroke="#4A5568"
                      strokeWidth="1" />
                  </svg>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-full px-12 py-8 shadow-lg border-4 border-blue-900 transform group-hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-900/10 rounded-full blur-sm"></div>
                  <h3 className="text-2xl font-bold text-gray-900 relative z-10 whitespace-nowrap">
                    {sector.title}
                  </h3>
                </div>
              </div>

              <div className="absolute inset-0 rounded-full border-2 border-blue-700 -rotate-2 -z-10"></div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-700 rotate-2 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
