import Header from './components/Header';
import Hero from './components/Hero';
import ArtisanServices from './components/ArtisanServices';
import Marquee from './components/Marquee';
import NGOServices from './components/NGOServices';
import PartnerLogos from './components/PartnerLogos';
import SectorsWeEmpower from './components/SectorsWeEmpower';
import TestimonialCarousel from './components/TestimonialCarousel';
import WhatWeValue from './components/WhatWeValue';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ArtisanServices />
      <Marquee />
      <NGOServices />
      <PartnerLogos />
      <SectorsWeEmpower />
      <TestimonialCarousel />
      <WhatWeValue />
      <Footer />
    </div>
  );
}

export default App;
