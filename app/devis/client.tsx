'use client'

import { useRef, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import QuoteGenerator, { type QuoteGeneratorRef } from '@/components/forms/QuoteGenerator'
import WeddingPackages from '@/components/sections/WeddingPackages'

const TRUST_BADGES = [
  { icon: '🔒', label: 'Données confidentielles' },
  { icon: '⚡', label: 'Réponse sous 24h' },
  { icon: '✦', label: 'Devis 100% gratuit' },
  { icon: '📋', label: 'Sans engagement' },
]

const WHATSAPP = 'https://wa.me/24106203965'

export default function DevisClient() {
  const quoteRef = useRef<QuoteGeneratorRef>(null)
  const [addedPackageIds, setAddedPackageIds] = useState<string[]>([])

  const handleAddPackage = (id: string, name: string, price: number) => {
    quoteRef.current?.addItem(id, name, price)
    setAddedPackageIds(prev => prev.includes(id) ? prev : [...prev, id])
    // Scroll to quote form
    setTimeout(() => {
      document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  return (
    <>
      <Navbar />
      <PageHero
        label="Devis"
        title="Votre Devis Personnalisé"
        subtitle="Gratuit · Sans engagement · Réponse sous 24h"
      />

      {/* Trust badges */}
      <section style={{ padding: '2rem 1.5rem', background: '#0a0a0a', borderBottom: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
          {TRUST_BADGES.map(badge => (
            <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1rem' }}>{badge.icon}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', letterSpacing: '0.08em' }}>{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Wedding packages */}
      <WeddingPackages onAdd={handleAddPackage} addedIds={addedPackageIds} />

      {/* Quote Generator */}
      <section id="devis" style={{ padding: '3rem 1.5rem 5rem', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <QuoteGenerator ref={quoteRef} />
        </div>
      </section>

      {/* WhatsApp note */}
      <section style={{ padding: '2rem 1.5rem', background: '#0a0a0a', borderTop: '1px solid #1A1A1A', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#BDB8AD', lineHeight: 1.7 }}>
            Vous pouvez aussi nous envoyer votre demande directement via WhatsApp.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem',
              padding: '0.75rem 1.5rem', background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)',
              color: '#25D366', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
            }}
          >
            💬 WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
    </>
  )
}
