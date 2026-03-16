'use client'
import { motion } from 'framer-motion'

const STATS = [
  { value: '500+', label: 'Événements organisés' },
  { value: '2006', label: 'Année de création' },
  { value: '16+', label: 'Véhicules disponibles' },
  { value: '4', label: 'Piliers de services' },
]

export default function TrustStats() {
  return (
    <section style={{ background: '#0A0A0A', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        background: '#1A1A1A',
      }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: '#0A0A0A',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              color: 'var(--gold)',
              lineHeight: 1,
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,245,0.55)',
              lineHeight: 1.4,
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          [data-trust-grid] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
