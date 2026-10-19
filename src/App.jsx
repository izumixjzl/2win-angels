import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import PortfolioGallery from './components/PortfolioGallery'
import PackageSection from './components/PackageSection'
import WhySection from './components/WhySection'
import BookingSection from './components/BookingSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingInquiry from './components/FloatingInquiry'

export default function App() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <main className="overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioGallery />
        <PackageSection />
        <WhySection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingInquiry />
    </>
  )
}
