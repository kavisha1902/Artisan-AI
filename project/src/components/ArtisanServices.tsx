import ServiceCard from './ServiceCard';

export default function ArtisanServices() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-700 mb-2 tracking-wide uppercase">
            Built on: AI & Data
          </p>
          <h2 className="text-5xl font-bold text-blue-900">
            Our Services for Artisans
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <ServiceCard
            icon={
              <svg viewBox="0 0 80 80" className="w-20 h-20">
                <circle cx="40" cy="30" r="25" fill="#F4D7B8" />
                <circle cx="30" cy="26" r="4" fill="#8B7355" />
                <circle cx="50" cy="26" r="4" fill="#8B7355" />
                <path d="M 30 38 Q 40 42 50 38" stroke="#8B7355" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="40" cy="50" r="3" fill="#FFB366" />
              </svg>
            }
            title="AI BUSINESS ADVISOR"
            description={[
              "Your personal digital guide. It helps you choose what products to focus on, when demand is higher, and where new customers are showing interest. Make confident business decisions without needing any technical skills.",
              "It learns from your sales and gives simple suggestions anyone can follow. Grow your business step-by-step with smart, friendly advice."
            ]}
            accent="#86C5A8"
          />

          <ServiceCard
            icon={
              <svg viewBox="0 0 80 80" className="w-20 h-20">
                <rect x="20" y="15" width="40" height="50" rx="4" fill="#7CB8E8" />
                <rect x="25" y="20" width="30" height="35" rx="2" fill="#B8D8F0" />
                <line x1="30" y1="28" x2="50" y2="28" stroke="#5A9BD5" strokeWidth="2" />
                <line x1="30" y1="35" x2="50" y2="35" stroke="#5A9BD5" strokeWidth="2" />
                <line x1="30" y1="42" x2="45" y2="42" stroke="#5A9BD5" strokeWidth="2" />
                <path d="M 55 50 L 60 55 L 65 45" stroke="#4A4A4A" strokeWidth="2" fill="none" />
              </svg>
            }
            title="Smart Document Generator"
            description={[
              "No need to struggle with paperwork. Automatically generate bills, product descriptions, shipping forms, and store catalogs in a professional format. Just enter the basics and your documents are ready to share or print.",
              "Save hours every week and avoid errors in writing.",
              "All your important documents stay stored safely in one place."
            ]}
            accent="#7CB8E8"
          />

          <ServiceCard
            icon={
              <svg viewBox="0 0 80 80" className="w-20 h-20">
                <rect x="15" y="20" width="50" height="45" rx="4" fill="#6B7C8C" />
                <rect x="20" y="10" width="40" height="15" rx="6" fill="#4A6FA5" />
                <rect x="25" y="13" width="8" height="3" rx="1" fill="#7CB8E8" />
                <rect x="36" y="13" width="8" height="3" rx="1" fill="#7CB8E8" />
                <rect x="47" y="13" width="8" height="3" rx="1" fill="#7CB8E8" />
                <text x="40" y="48" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">4</text>
              </svg>
            }
            title="Events and Workshops Reminder"
            description={[
              "Never miss a growth opportunity. We notify you about skill-building workshops, fairs, and buyer exhibitions happening near you or online.",
              "Learn, network, and showcase your craft at the right platforms.",
              "Discover chances to show your products to bigger audiences.",
              "Improve your skills and gain confidence with every event you attend."
            ]}
            accent="#86C5A8"
          />

          <ServiceCard
            icon={
              <svg viewBox="0 0 80 80" className="w-20 h-20">
                <circle cx="40" cy="35" r="15" fill="#F5E6D3" />
                <path d="M 28 32 L 32 36 L 40 28" stroke="#8B7355" strokeWidth="2" fill="none" />
                <circle cx="52" cy="25" r="8" fill="#FFD700" />
                <text x="52" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#8B7355">$</text>
                <circle cx="30" cy="55" r="6" fill="#7CB8E8" />
                <circle cx="50" cy="55" r="6" fill="#7CB8E8" />
                <path d="M 35 50 Q 40 48 45 50" stroke="#8B7355" strokeWidth="1.5" fill="none" />
              </svg>
            }
            title="Personalized Training Creator"
            description={[
              "Every artisan learns differently. Our AI creates simple learning plans based on your craft, strengths, and business goals. Get short tutorials and practical tips that improve both your creativity and sales abilities.",
              "It supports you like a personal mentor who understands your needs.",
              "The more you learn, the more your craft and income grow."
            ]}
            accent="#FFB366"
          />

          <ServiceCard
            icon={
              <svg viewBox="0 0 80 80" className="w-20 h-20">
                <rect x="15" y="25" width="50" height="35" rx="3" fill="#7CB8E8" />
                <path d="M 25 35 L 30 45 L 40 30" stroke="#4A6FA5" strokeWidth="3" fill="none" strokeLinecap="round" />
                <line x1="25" y1="50" x2="55" y2="50" stroke="#B8D8F0" strokeWidth="2" />
                <path d="M 50 30 L 55 35 L 60 25" stroke="#5A9BD5" strokeWidth="2" fill="none" />
              </svg>
            }
            title="Market Price Tracker"
            description={[
              "Stay updated on what similar products are selling for in different places. This tool tracks trends, customer buying patterns, and festival-based demand so you can price fairly and maximize your earnings.",
              "Avoid underpricing your hard work or losing money to middlemen.",
              "Price smarter for local markets and international buyers."
            ]}
            accent="#7CB8E8"
          />

          <ServiceCard
            icon={
              <svg viewBox="0 0 80 80" className="w-20 h-20">
                <rect x="20" y="25" width="40" height="35" rx="4" fill="#E8C580" />
                <path d="M 30 35 L 35 42 L 45 32" stroke="#8B7355" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="55" cy="30" r="8" fill="#7CB8E8" />
                <path d="M 52 30 L 54 32 L 58 28" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            }
            title="Quality Assessment Tool"
            description={[
              "Upload a photo of your product and get instant feedback on finishing, alignment, patterns, and material quality. We guide you with small improvements that increase customer satisfaction and export readiness.",
              "Fix issues before customers notice them.",
              "Every improvement helps you earn more and build a trusted brand."
            ]}
            accent="#E8C580"
          />
        </div>
      </div>
    </section>
  );
}
