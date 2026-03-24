import NGOServiceCard from './NGOServiceCard';

export default function NGOServices() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-5xl font-light text-gray-900 mb-8">
            Services We Provide To The NGOs That Partner With Us:
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NGOServiceCard
            title="Program Impact Dashboard"
            items={[
              "Live view of beneficiary income, sales, and outreach",
              "Craft/region filters to spot what's working",
              "Simple charts ready for board reviews"
            ]}
            integration="Data flows in when artisans use AI Business Advisor for pricing and product choices."
          />

          <NGOServiceCard
            title="Automated Report Generator"
            items={[
              "Donor reports and grant-ready summaries in minutes",
              "Pulls documents in English + local languages",
              "Cleaner compliance with time-stamped evidence"
            ]}
            integration="Documents created by Smart Document Generator roll up here automatically."
          />

          <NGOServiceCard
            title="Supply Chain Builder"
            items={[
              "Match bulk orders with verified artisan groups",
              "Create buyer–seller networks across regions",
              "Track fulfillment capacity and timelines"
            ]}
            integration="Demand signals from Market Price Tracker help form the right clusters fast."
          />

          <NGOServiceCard
            title="Training Content Customizer"
            items={[
              "Upload your curriculum once",
              "AI adapts lessons by craft, literacy level, and local needs",
              "Track who completed which modules"
            ]}
          />

          <NGOServiceCard
            title="Market Intelligence Hub"
            items={[
              "Aggregate price trends across all artisan groups",
              "Spot demand spikes for specific crafts or festivals",
              "Share best-selling designs and buyer feedback"
            ]}
          />

          <NGOServiceCard
            title="Quality Control Center"
            items={[
              "Review artisan product photos at scale",
              "AI flags common defects before items ship",
              "Build standardized quality benchmarks per craft"
            ]}
          />
        </div>
      </div>
    </section>
  );
}
