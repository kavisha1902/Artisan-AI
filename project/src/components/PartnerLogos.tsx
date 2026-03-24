import aiaca from '../../components/AIACA-logo (1).png';
import maroonAsha from '../../components/MAROON-ASHA-Logo.png';

export default function PartnerLogos() {
  const logos = [
    { src: aiaca, alt: 'AIACA logo' },
    { src: '/dastkar.png', alt: 'Dastkar logo' },
    { src: '/Rangsutra_Logo final.webp', alt: 'RangSutra logo' },
    { src: '/JRF-Logo.png', alt: 'Jaipur Rugs Foundation logo' },
    { src: maroonAsha, alt: 'Maroon Asha logo' },
  ];
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-12 bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="overflow-hidden">
          <div className="flex w-max items-center gap-8 whitespace-nowrap animate-marquee">
            {marqueeLogos.map((logo, idx) => (
              <div
                key={`${logo.alt}-${idx}`}
                className="h-20 min-w-[220px] bg-white rounded-lg border border-stone-200 px-6 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  className="h-12 w-auto max-w-full object-contain"
                  alt={logo.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
