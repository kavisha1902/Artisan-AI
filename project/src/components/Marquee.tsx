export default function Marquee() {
  const text = "Empowering Local Artisans | Blending Creativity with Artificial Intelligence | Bridging NGOs and Communities";

  return (
    <div className="bg-blue-900 text-white py-3 overflow-hidden border-y-4 border-yellow-600">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-lg font-medium px-8">{text}</span>
        <span className="text-lg font-medium px-8">{text}</span>
        <span className="text-lg font-medium px-8">{text}</span>
        <span className="text-lg font-medium px-8">{text}</span>
      </div>
    </div>
  );
}
