'use client'
import { motion } from 'framer-motion'

const TIMELINE = [
  { year: '2006', text: 'Fondation de Grâce Location à Libreville' },
  { year: '2015', text: 'Partenaire des institutions gouvernementales gabonaises' },
  { year: '2020', text: 'Partenaire officiel La Tropicale Amissa Bongo' },
  { year: '2025', text: 'Naissance de E-Shepha Event' },
]

export default function CompanyStory() {
  return (
    <section style={{ padding: '5rem 1.5rem', background: '#080808' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label + Title */}
        <div className="section-label" style={{ marginBottom: '1rem' }}>
          Notre Histoire
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 500,
          color: '#F7F4EE',
          marginBottom: '3rem',
          letterSpacing: '-0.02em',
        }}>
          De Grâce Location à E-Shepha Event
        </h2>

        {/* 2-col layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
          data-story-grid
        >
          {/* LEFT: Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical gold line */}
            <div style={{
              position: 'absolute',
              left: '3.5rem',
              top: '0.75rem',
              bottom: '0.75rem',
              width: '1px',
              background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.1))',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {TIMELINE.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}
                >
                  {/* Year */}
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#C9A84C',
                    flexShrink: 0,
                    width: '4rem',
                    textAlign: 'right',
                    lineHeight: 1.4,
                  }}>
                    {entry.year}
                  </div>
                  {/* Dot */}
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#C9A84C',
                    flexShrink: 0,
                    marginTop: '0.45rem',
                    position: 'relative',
                    zIndex: 1,
                  }} />
                  {/* Text */}
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    color: '#BDB8AD',
                    lineHeight: 1.6,
                    flex: 1,
                  }}>
                    {entry.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Quote box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              border: '1px solid #2A2A2A',
              borderLeft: '3px solid #C9A84C',
              padding: '2.5rem',
              background: '#0a0a0a',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.0625rem',
              color: '#F7F4EE',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}>
              Née en 2006, Grâce Location a équipé plus de 500 événements au Gabon.
              Aujourd&apos;hui, cette expertise devient E-Shepha Event.
            </p>

            {/* Divider */}
            <div style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(90deg, #C9A84C, transparent)',
              marginBottom: '1.5rem',
            }} />

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: '#C9A84C',
              lineHeight: 1.6,
            }}>
              &ldquo;Une nouvelle ère événementielle commence.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-story-grid] { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
