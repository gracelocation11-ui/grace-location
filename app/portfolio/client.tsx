'use client'

import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import PortfolioSection from '@/components/sections/PortfolioSection'
import Testimonials from '@/components/sections/Testimonials'

const PARTNERS = [
  'Airtel Gabon',
  'Olam Gabon',
  'CNAMGS',
  'La Tropicale Amissa Bongo',
  'CAN 2012 Gabon',
  'Min. Défense',
  'Min. Planification',
  'Min. Économie',
  'Min. Jeunesse & Sports',
]

export default function PortfolioClient() {
  return (
    <>
      <Navbar />
      <PageHero
        label="Portfolio"
        title="Nos Réalisations"
        subtitle="500+ événements depuis 2006"
      />

      {/* Portfolio section */}
      <PortfolioSection />

      {/* Partners */}
      <section style={{ padding: '4rem 1.5rem', background: '#080808', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '1rem', justifyContent: 'center' }}>Références</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 500, color: '#F7F4EE', marginBottom: '2.5rem', textAlign: 'center', letterSpacing: '-0.02em' }}>
            Ils nous ont fait confiance
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1A1A1A', maxWidth: '800px', margin: '0 auto' }}>
            {PARTNERS.map(partner => (
              <div key={partner} style={{ background: '#080808', padding: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', letterSpacing: '0.08em' }}>
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: '#0a0a0a', borderTop: '1px solid #1A1A1A', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '1rem', lineHeight: 1.1 }}>
            Votre événement sera ici →
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#BDB8AD', lineHeight: 1.7, marginBottom: '2rem' }}>
            Rejoignez les 500+ événements que nous avons organisés au Gabon.
          </p>
          <Link href="/devis" className="btn-gold" style={{ justifyContent: 'center' }}>
            Obtenir mon devis gratuit
          </Link>
        </div>
      </section>

      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
    </>
  )
}
