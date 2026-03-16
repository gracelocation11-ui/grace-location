'use client'

import { motion } from 'framer-motion'

const PARTNERS = [
  { name: 'Airtel Gabon', abbr: 'AIRTEL' },
  { name: 'Olam Gabon', abbr: 'OLAM' },
  { name: 'CNAMGS', abbr: 'CNAMGS' },
  { name: 'La Tropicale Amissa Bongo', abbr: 'TROPICALE' },
  { name: 'CAN 2012 Gabon', abbr: 'CAN 2012' },
  { name: 'Min. Défense', abbr: 'MIN. DÉFENSE' },
  { name: 'Min. Planification', abbr: 'PLANIFICATION' },
  { name: 'Min. Économie', abbr: 'ÉCONOMIE' },
  { name: 'Min. Jeunesse & Sports', abbr: 'JEUNESSE & SPORTS' },
]

// Duplicate for seamless loop
const ITEMS = [...PARTNERS, ...PARTNERS]

export default function PartnersLogoMarquee() {
  return (
    <section style={{ padding: '5rem 0 4rem', background: '#0A0A0A', borderTop: '1px solid #1A1A1A', overflow: 'hidden' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 1.5rem' }}
      >
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
          Références
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          fontWeight: 500,
          color: '#F5F5F5',
          margin: 0,
        }}>
          Ils nous font confiance
        </h2>
      </motion.div>

      {/* Marquee track */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(90deg, #0A0A0A, transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(-90deg, #0A0A0A, transparent)',
          pointerEvents: 'none',
        }} />

        <div className="animate-marquee" style={{ display: 'flex', gap: '1px', width: 'max-content' }}>
          {ITEMS.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#0a0a0a',
                border: '1px solid #1A1A1A',
                padding: '1.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.375rem',
                minWidth: '160px',
                flexShrink: 0,
                transition: 'border-color 0.3s ease',
              }}
            >
              {/* Logo placeholder — swap with <img> when you have logo files */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1A1A1A, #2A2A2A)',
                border: '1px solid var(--gold)33',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                  {p.abbr.slice(0, 2)}
                </span>
              </div>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.5625rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(245,245,245,0.55)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}>
                {p.abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
