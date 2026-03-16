'use client'

import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import PartnersLogoMarquee from '@/components/sections/PartnersLogoMarquee'
import PortfolioGallery from '@/components/sections/PortfolioGallery'

// Add your photo filenames here — place images in public/portfolio/mariages/
const PHOTOS = [
  { src: '/portfolio/mariages/01.jpg', alt: 'Mariage Royal — Radisson Blu', size: 'tall' },
  { src: '/portfolio/mariages/02.jpg', alt: 'Gala CNAMGS', size: 'normal' },
  { src: '/portfolio/mariages/03.jpg', alt: 'Cérémonie traditionnelle', size: 'normal' },
  { src: '/portfolio/mariages/04.jpg', alt: 'Cocktail diplomatique', size: 'tall' },
  { src: '/portfolio/mariages/05.jpg', alt: 'Séminaire corporate', size: 'normal' },
  { src: '/portfolio/mariages/06.jpg', alt: 'Gala CAN 2012', size: 'normal' },
  { src: '/portfolio/mariages/07.jpg', alt: 'Mariage traditionnel Fang', size: 'normal' },
  { src: '/portfolio/mariages/08.jpg', alt: 'Conférence ministérielle', size: 'normal' },
  { src: '/portfolio/mariages/09.jpg', alt: 'Dîner de gala — Okumé Palace', size: 'tall' },
]

export default function MariagesCorporateClient() {
  return (
    <>
      <Navbar />
      <PageHero
        label="Galerie"
        title="Mariages & Corporate"
        subtitle="Cérémonies · Galas · Conférences · Événements officiels"
      />
      <PortfolioGallery photos={PHOTOS} accent="#C9A84C" backHref="/portfolio" />
      <PartnersLogoMarquee />
      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
    </>
  )
}
