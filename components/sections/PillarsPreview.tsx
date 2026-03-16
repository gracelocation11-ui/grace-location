'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const PILLARS = [
  { icon: '🎪', title: 'Organisation de cérémonie', sub: 'Tentes, mobilier, décoration, son', href: '/organisation-ceremonie', number: '01' },
  { icon: '🍽️', title: 'Service traiteur', sub: 'Gastronomie événementielle', href: '/service-traiteur', number: '02' },
  { icon: '🚗', title: 'Location de véhicules', sub: 'Flotte premium — 16 véhicules', href: '/location-vehicules', number: '03' },
  { icon: '🌍', title: 'E-Shepha Event', sub: 'La plateforme événementielle', href: '/e-shepha-event', number: '04' },
]

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link
        href={pillar.href}
        style={{
          display: 'block',
          background: hovered ? '#0f0f0f' : '#080808',
          border: '1px solid #1A1A1A',
          borderTop: 'none',
          padding: '2rem',
          textDecoration: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hovered ? '0 8px 40px rgba(201,168,76,0.12)' : 'none',
        }}
      >
        {/* Gold top border animation */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #C9A84C, #E0C068)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }} />

        {/* Number + Icon row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#C9A84C',
          }}>
            {pillar.number}
          </span>
          <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{pillar.icon}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.5rem',
          fontWeight: 500,
          color: '#F7F4EE',
          marginBottom: '0.5rem',
          lineHeight: 1.2,
        }}>
          {pillar.title}
        </h3>

        {/* Sub */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8125rem',
          color: '#BDB8AD',
          marginBottom: '1.5rem',
        }}>
          {pillar.sub}
        </p>

        {/* Arrow */}
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.125rem',
          color: '#C9A84C',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(4px)' : 'translateX(-4px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
          →
        </div>
      </Link>
    </motion.div>
  )
}

export default function PillarsPreview() {
  return (
    <section style={{ padding: '5rem 1.5rem', background: '#080808' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <div className="section-label" style={{ marginBottom: '1rem' }}>
          Nos Services
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 500,
          color: '#F7F4EE',
          marginBottom: '3rem',
          letterSpacing: '-0.02em',
        }}>
          Quatre Piliers d&apos;Excellence
        </h2>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: '#1A1A1A',
        }}>
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.href} pillar={pillar} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          [data-pillars-grid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
