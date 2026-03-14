import Navbar from "@/components/ui/Navbar"
import Hero from "@/components/sections/Hero"
import Marquee from "@/components/ui/Marquee"
import PillarsPreview from "@/components/sections/PillarsPreview"
import TrustStats from "@/components/sections/TrustStats"
import CompanyStory from "@/components/sections/CompanyStory"
import VehiclesSection from "@/components/sections/VehiclesSection"
import PortfolioSection from "@/components/sections/PortfolioSection"
import Testimonials from "@/components/sections/Testimonials"
import CTABlock from "@/components/sections/CTABlock"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/ui/Footer"
import MobileCTABar from "@/components/ui/MobileCTABar"
import WhatsAppFloat from "@/components/ui/WhatsAppFloat"

export default function Home() {
  return (
    <main className="noise-overlay" style={{ paddingBottom: '0' }}>
      <Navbar />
      <Hero />
      <Marquee />
      <PillarsPreview />
      <TrustStats />
      <CompanyStory />
      <VehiclesSection />
      <PortfolioSection />
      <Testimonials />
      <CTABlock />
      <ContactSection />
      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
    </main>
  )
}
