'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const CATEGORIES = [
  {
    slug: 'mariages-corporate',
    label: 'Mariages & Corporate',
    sublabel: 'Cérémonies · Galas · Conférences',
    count: '300+ événements',
    gradient: 'linear-gradient(135deg, #1a0e04 0%, #2e1a08 50%, #1a1004 100%)',
    accent: '#C9A84C',
    icon: '✦',
    cover: '/portfolio/mariages/cover.jpg',
  },
  {
    slug: 'traiteur',
    label: 'Traiteur',
    sublabel: 'Buffets · Cocktails · Dîners de gala',
    count: '150+ prestations',
    gradient: 'linear-gradient(135deg, #04100a 0%, #081e10 50%, #041408 100%)',
    accent: '#5A9A6A',
    icon: '◆',
    cover: '/portfolio/traiteur/cover.jpg',
  },
  {
    slug: 'vehicules',
    label: 'Véhicules',
    sublabel: 'Convois · Cortèges · Transferts VIP',
    count: '500+ missions',
    gradient: 'linear-gradient(135deg, #060a18 0%, #0a1028 50%, #060814 100%)',
    accent: '#4A7ABF',
    icon: '◈',
    cover: '/portfolio/vehicules/cover.jpg',
  },
]

export default function PortfolioPreview() {
  return (
    <section style={{ padding: '6rem 1.5rem', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: '3rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Portfolio</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 500, color: '#F7F4EE', margin: 0, lineHeight: 1.1 }}>
              Nos Réalisations
            </h2>
          </div>
          <Link href="/portfolio" style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#BDB8AD', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            transition: 'color 0.2s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
            onMouseLeave={e => (e.currentTarget.style.color = '#BDB8AD')}
          >
            Voir tout →
          </Link>
        </motion.div>

        {/* 3 blocks */}
        <div data-portfolio-preview style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1A1A1A' }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            >
              <Link href={`/portfolio/${cat.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  data-preview-card
                  style={{
                    background: cat.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    height: '380px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.75rem',
                  }}
                >
                  {/* Cover image */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${cat.cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                  }} data-preview-img />

                  {/* Dark overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.45) 55%, rgba(8,8,8,0.15) 100%)',
                  }} />

                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${cat.accent}, transparent)`,
                  }} />

                  {/* Icon */}
                  <span style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                    fontSize: '1.25rem', color: cat.accent, opacity: 0.5,
                  }}>{cat.icon}</span>

                  {/* Text */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '28px', height: '1px', background: cat.accent, marginBottom: '0.875rem' }} />
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                      fontWeight: 500, color: '#F7F4EE',
                      margin: '0 0 0.25rem', lineHeight: 1.2,
                    }}>{cat.label}</h3>
                    <p style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.6875rem',
                      color: '#BDB8AD', margin: '0 0 0.875rem', lineHeight: 1.5,
                    }}>{cat.sublabel}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontSize: '0.5625rem',
                        fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: cat.accent,
                      }}>{cat.count}</span>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontSize: '0.625rem',
                        fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: '#F7F4EE', display: 'flex', alignItems: 'center', gap: '0.3rem',
                      }}>Voir →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-portfolio-preview] { grid-template-columns: 1fr !important; }
          [data-preview-card] { height: 280px !important; }
        }
        [data-preview-card]:hover [data-preview-img] { transform: scale(1.05); }
      `}</style>
    </section>
  )
}
