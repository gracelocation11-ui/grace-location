'use client'

import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import PartnersLogoMarquee from '@/components/sections/PartnersLogoMarquee'
import PortfolioGallery from '@/components/sections/PortfolioGallery'

// Add your photo filenames here — place images in public/portfolio/vehicules/
const PHOTOS = [
  { src: '/portfolio/vehicules/01.jpg', alt: 'Convoi La Tropicale Amissa Bongo', size: 'tall' },
  { src: '/portfolio/vehicules/02.jpg', alt: 'Flotte prestige mariage', size: 'normal' },
  { src: '/portfolio/vehicules/03.jpg', alt: 'Transfert VIP aéroport', size: 'normal' },
  { src: '/portfolio/vehicules/04.jpg', alt: 'Cortège officiel', size: 'normal' },
  { src: '/portfolio/vehicules/05.jpg', alt: 'SUV prestige', size: 'normal' },
  { src: '/portfolio/vehicules/06.jpg', alt: 'Limousine événement', size: 'tall' },
  { src: '/portfolio/vehicules/07.jpg', alt: 'Bus de liaison corporate', size: 'normal' },
  { src: '/portfolio/vehicules/08.jpg', alt: 'Convoi diplomatique', size: 'normal' },
]

export default function VehiculesClient() {
  return (
    <>
      <Navbar />
      <PageHero
        label="Galerie"
        title="Véhicules"
        subtitle="Convois · Cortèges · Transferts VIP · Flotte prestige"
      />
      <PortfolioGallery photos={PHOTOS} accent="#4A7ABF" backHref="/portfolio" />
      <PartnersLogoMarquee />
      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
    </>
  )
}
