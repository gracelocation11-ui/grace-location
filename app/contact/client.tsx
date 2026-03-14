'use client'

import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import AppointmentBooking from '@/components/forms/AppointmentBooking'
import ContactSection from '@/components/sections/ContactSection'

const WHATSAPP = 'https://wa.me/24106203965'

const CONTACT_CARDS = [
  { icon: '📞', label: 'Téléphone', value: '+241 06 20 39 65', value2: '+241 077 68 70 85', href: 'tel:+24106203965' },
  { icon: '💬', label: 'WhatsApp', value: '+241 06 20 39 65', href: WHATSAPP, highlight: true },
  { icon: '✉️', label: 'Email', value: 'gracelocation11@gmail.com', href: 'mailto:gracelocation11@gmail.com' },
  { icon: '📍', label: 'Adresse', value: 'Libreville, Gabon', value2: 'Disponible partout au Gabon', href: null },
]

export default function ContactClient() {
  return (
    <>
      <Navbar />
      <PageHero
        label="Contact"
        title="Parlons de votre projet"
        subtitle="Notre équipe vous répond sous 24h"
      />

      {/* Contact cards */}
      <section style={{ padding: '3rem 1.5rem', background: '#0a0a0a', borderBottom: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#1A1A1A' }}>
            {CONTACT_CARDS.map(card => (
              <div key={card.label} style={{ background: '#080808', padding: '2rem' }}>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <ContactCardInner card={card} />
                  </a>
                ) : (
                  <ContactCardInner card={card} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching section */}
      <section id="coaching" style={{ padding: '4rem 1.5rem', background: '#080808' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>Coaching gratuit</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#F7F4EE', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Réservez un coaching gratuit
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#C9A84C', marginBottom: '2.5rem', letterSpacing: '0.05em' }}>
            Accompagnement gratuit — sans engagement
          </p>
          <AppointmentBooking />
        </div>
      </section>

      {/* Contact form */}
      <ContactSection />

      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />

      <style>{`
        @media (max-width: 768px) {
          [data-contact-cards] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          [data-contact-cards] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

function ContactCardInner({ card }: { card: { icon: string; label: string; value: string; value2?: string | null; highlight?: boolean } }) {
  return (
    <>
      <div style={{ fontSize: '2rem', marginBottom: '0.875rem' }}>{card.icon}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#BDB8AD', marginBottom: '0.5rem' }}>
        {card.label}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 500, color: card.highlight ? '#25D366' : '#F7F4EE', lineHeight: 1.4 }}>
        {card.value}
      </div>
      {card.value2 && (
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: '#BDB8AD', marginTop: '0.25rem' }}>
          {card.value2}
        </div>
      )}
    </>
  )
}
