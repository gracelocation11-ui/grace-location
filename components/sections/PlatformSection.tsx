'use client'

import { motion } from 'framer-motion'

const PILLARS = [
  {
    icon: '◈',
    title: 'Connaissance',
    description:
      'Une expertise approfondie de l\'événementiel gabonais et des standards internationaux de luxe.',
  },
  {
    icon: '◉',
    title: 'Culture',
    description:
      'Enracinés dans la richesse culturelle du Gabon, nous fusionnons traditions et modernité.',
  },
  {
    icon: '◎',
    title: 'Impact Social',
    description:
      'Chaque événement crée de la valeur locale — emplois, formation et développement communautaire.',
  },
  {
    icon: '◇',
    title: 'Célébrations',
    description:
      'Nous transformons chaque occasion en souvenir impérissable, avec précision et passion.',
  },
]

const STATS = [
  { value: '100%', label: 'Satisfaction client' },
  { value: '24h', label: 'Disponibilité' },
  { value: '15+', label: 'Équipiers experts' },
  { value: '2+', label: 'Pays couverts' },
]

export default function PlatformSection() {
  return (
    <section
      id="platform"
      style={{
        padding: '7rem 1.5rem',
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '800px',
          height: '600px',
          background:
            'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            E-Shepha Platform
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.75rem)',
              fontWeight: 500,
              color: '#F5F5F5',
              lineHeight: 1.1,
              maxWidth: '20ch',
              margin: '0 auto 1.25rem',
            }}
          >
            L&apos;Innovation au Service de Vos Événements
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(245,245,245,0.55)',
              maxWidth: '52ch',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Notre plateforme digitale réunit gestion des invitations, RSVPs, billetterie
            et coordination live — pour des événements sans friction.
          </p>
        </motion.div>

        {/* ── 4 PILLARS ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1px',
            background: '#1A1A1A',
            marginBottom: '4rem',
          }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: '#0A0A0A',
                padding: '2.5rem 2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#0f0f0f'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#0A0A0A'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.25rem',
                  color: 'var(--gold)',
                }}
              >
                {pillar.icon}
              </div>

              {/* Gold accent */}
              <div
                style={{
                  width: '24px',
                  height: '1px',
                  background: 'var(--gold)',
                  marginBottom: '1rem',
                }}
              />

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.375rem',
                  fontWeight: 500,
                  color: '#F5F5F5',
                  marginBottom: '0.75rem',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'rgba(245,245,245,0.55)',
                  lineHeight: 1.7,
                }}
              >
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── VISION QUOTE ── */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: '0 auto 4rem',
            maxWidth: '720px',
            textAlign: 'center',
            padding: '3rem 2.5rem',
            border: '1px solid rgba(201,168,76,0.15)',
            background: 'rgba(201,168,76,0.02)',
            position: 'relative',
          }}
        >
          {/* Quote mark */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '2rem',
              fontFamily: 'var(--font-serif)',
              fontSize: '4rem',
              color: 'rgba(201,168,76,0.15)',
              lineHeight: 1,
            }}
          >
            "
          </div>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#EDE8DE',
              lineHeight: 1.5,
              marginBottom: '1.5rem',
            }}
          >
            Chez E-Shepha Event, chaque occasion est une toile vierge. Basés au
            cœur de Libreville, nous apportons les standards mondiaux aux
            célébrations locales.
          </p>
          <footer
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'var(--gold)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}
            >
              La Vision E-Shepha
            </span>
            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'var(--gold)',
              }}
            />
          </footer>
        </motion.blockquote>

        {/* ── STATS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: '#1A1A1A',
            border: '1px solid #1A1A1A',
            marginBottom: '2.5rem',
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: '#0A0A0A',
                padding: '2rem 1rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  marginBottom: '0.375rem',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,245,0.55)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center' }}
        >
          <a href="#contact" className="btn-gold">
            Devenir partenaire
          </a>
        </motion.div>
      </div>
    </section>
  )
}
