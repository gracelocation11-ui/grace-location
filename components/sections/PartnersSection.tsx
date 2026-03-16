'use client'

import { motion } from 'framer-motion'

const PARTNERS = [
  { name: 'Airtel Gabon', type: 'Télécoms', emoji: '📡' },
  { name: 'Olam Gabon', type: 'Agroalimentaire', emoji: '🌿' },
  { name: 'CNAMGS', type: 'Protection Sociale', emoji: '🏛️' },
  { name: 'Gabon Télécom', type: 'Télécoms', emoji: '📶' },
  { name: 'Air France', type: 'Aviation', emoji: '✈️' },
  { name: 'Radisson Blu', type: 'Hôtellerie', emoji: '🏨' },
  { name: 'La Tropicale', type: 'Cyclisme / Sport', emoji: '🚴' },
  { name: 'CAN 2012', type: 'Football / BSAC', emoji: '⚽' },
  { name: 'Luxembourg', type: 'Diplomatique', emoji: '🇱🇺' },
]

// Row 1: first 5, Row 2: last 4 (centered)
const ROW1 = PARTNERS.slice(0, 5)
const ROW2 = PARTNERS.slice(5)

// Marquee strip items (doubled for seamless loop)
const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS]

export default function PartnersSection() {
  return (
    <section
      id="partenaires"
      style={{ padding: '6rem 0', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── MARQUEE STRIP ── */}
      <div
        aria-hidden="true"
        style={{
          overflow: 'hidden',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
          background: 'rgba(17,17,17,0.8)',
          padding: '1rem 0',
          marginBottom: '5rem',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            animation: 'marquee 25s linear infinite',
          }}
        >
          {MARQUEE_ITEMS.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0 2.5rem',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '1rem' }}>{p.emoji}</span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,245,0.55)',
                }}
              >
                {p.name}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'rgba(201,168,76,0.3)',
                  marginLeft: '1.5rem',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            Ils nous ont fait confiance
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 500,
              color: '#F5F5F5',
              lineHeight: 1.1,
            }}
          >
            Nos Partenaires & Références
          </h2>
        </motion.div>

        {/* ── ROW 1 — 5 cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1px',
            background: '#1A1A1A',
            marginBottom: '1px',
          }}
        >
          {ROW1.map((partner, i) => (
            <PartnerCard key={partner.name} partner={partner} index={i} />
          ))}
        </div>

        {/* ── ROW 2 — 4 cards centered ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: '#1A1A1A',
            maxWidth: 'calc(80% + 3px)',
            margin: '0 auto',
          }}
        >
          {ROW2.map((partner, i) => (
            <PartnerCard key={partner.name} partner={partner} index={i + 5} />
          ))}
        </div>

        {/* ── TRUSTED LABEL ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#2A2A2A',
            marginTop: '2.5rem',
          }}
        >
          Trusted by prestigious partners across Gabon & beyond
        </motion.p>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 700px) {
          [data-partner-grid-1] { grid-template-columns: repeat(3, 1fr) !important; }
          [data-partner-grid-2] { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  )
}

function PartnerCard({
  partner,
  index,
}: {
  partner: { name: string; type: string; emoji: string }
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        background: '#0A0A0A',
        padding: '1.75rem 1rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
        borderBottom: '2px solid transparent',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = '#0f0f0f'
        ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--gold)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = '#0A0A0A'
        ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'
      }}
    >
      <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{partner.emoji}</span>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#F5F5F5',
          letterSpacing: '0.04em',
        }}
      >
        {partner.name}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.5625rem',
          fontWeight: 400,
          color: 'rgba(245,245,245,0.55)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {partner.type}
      </div>
    </motion.div>
  )
}
