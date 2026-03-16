'use client'

import { motion } from 'framer-motion'
import QuoteGenerator from '@/components/forms/QuoteGenerator'

const TRUST_BADGES = [
  { icon: '🔒', label: 'Données confidentielles' },
  { icon: '⚡', label: 'Réponse sous 24h' },
  { icon: '✦', label: 'Devis 100% gratuit' },
  { icon: '📋', label: 'Sans engagement' },
]

export default function QuoteSection() {
  return (
    <section
      id="devis"
      style={{ padding: '7rem 1.5rem', background: '#0a0a0a', position: 'relative' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ marginBottom: '3rem', maxWidth: '600px' }}
        >
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            Générateur de Devis
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 500,
              color: '#F7F4EE',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Votre Devis Personnalisé
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              color: '#BDB8AD',
              lineHeight: 1.7,
            }}
          >
            Composez votre devis sur-mesure en quelques clics. Sélectionnez vos services,
            ajustez les quantités et recevez votre devis pro-forma par email.
          </p>
        </motion.div>

        {/* ── TRUST BADGES ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '2.5rem',
          }}
        >
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                border: '1px solid #2A2A2A',
                background: '#111',
              }}
            >
              <span style={{ fontSize: '0.875rem' }}>{badge.icon}</span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#BDB8AD',
                  textTransform: 'uppercase',
                }}
              >
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── QUOTE GENERATOR ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          data-quote-grid
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) 320px',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          <QuoteGenerator />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #devis [data-quote-grid] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
