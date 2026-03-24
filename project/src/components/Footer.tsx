export default function Footer() {
  return (
    <footer className="bg-stone-50 text-gray-900 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full"></div>
              <div className="w-6 h-6 bg-black rounded-full"></div>
            </div>
            <div className="text-3xl font-bold tracking-tight">
              Artisan AI
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a></li>
              </ul>
            </div>

            <div>
              <div className="space-y-1 text-gray-700">
                <p>Tel. 123-456-7890</p>
                <p>500 Terry Francine St.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
