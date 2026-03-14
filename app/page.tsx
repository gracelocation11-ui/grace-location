import Navbar from "@/components/ui/Navbar"
import Hero from "@/components/sections/Hero"
import Marquee from "@/components/ui/Marquee"
import ServicesSection from "@/components/sections/ServicesSection"
import VehiclesSection from "@/components/sections/VehiclesSection"
import PlatformSection from "@/components/sections/PlatformSection"
import QuoteSection from "@/components/sections/QuoteSection"
import PortfolioSection from "@/components/sections/PortfolioSection"
import AppointmentSection from "@/components/sections/AppointmentSection"
import PartnersSection from "@/components/sections/PartnersSection"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/ui/Footer"
import WhatsAppFloat from "@/components/ui/WhatsAppFloat"

export default function Home() {
  return (
    <main className="noise-overlay">
      <Navbar />
      <Hero />
      <Marquee />
      <ServicesSection />
      <VehiclesSection />
      <PlatformSection />
      <QuoteSection />
      <PortfolioSection />
      <AppointmentSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
