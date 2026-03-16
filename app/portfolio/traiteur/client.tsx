'use client'

import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import PartnersLogoMarquee from '@/components/sections/PartnersLogoMarquee'
import PortfolioGallery from '@/components/sections/PortfolioGallery'

// Add your photo filenames here — place images in public/portfolio/traiteur/
const PHOTOS = [
  { src: '/portfolio/traiteur/01.jpg', alt: 'Buffet africain gastronomique', size: 'tall' },
  { src: '/portfolio/traiteur/02.jpg', alt: 'Cocktail dînatoire VIP', size: 'normal' },
  { src: '/portfolio/traiteur/03.jpg', alt: 'Dîner de gala 300 couverts', size: 'normal' },
  { src: '/portfolio/traiteur/04.jpg', alt: 'Buffet international', size: 'normal' },
  { src: '/portfolio/traiteur/05.jpg', alt: 'Banquet Olam Gabon', size: 'normal' },
  { src: '/portfolio/traiteur/06.jpg', alt: 'Cocktail diplomatique', size: 'tall' },
  { src: '/portfolio/traiteur/07.jpg', alt: 'Déjeuner corporate', size: 'normal' },
  { src: '/portfolio/traiteur/08.jpg', alt: 'Réception officielle', size: 'normal' },
]

export default function TraiteurClient() {
  return (
    <>
      <Navbar />
      <PageHero
        label="Galerie"
        title="Service Traiteur"
        subtitle="Buffets · Cocktails · Dîners de gala · Réceptions"
      />
      <PortfolioGallery photos={PHOTOS} accent="#5A9A6A" backHref="/portfolio" />
      <PartnersLogoMarquee />
      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
    </>
  )
}
