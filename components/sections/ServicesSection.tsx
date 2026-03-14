'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getServicesByCategory, formatPrice } from '@/lib/services-data'
import type { ServiceCategory } from '@/types'

const PILLARS: {
  id: ServiceCategory
  number: string
  title: string
  subtitle: string
  icon: string
  accentColor: string
}[] = [
  {
    id: 'event_planning',
    number: '01',
    title: 'Événements & Mariages',
    subtitle: 'De la conception au jour J',
    icon: '✦',
    accentColor: '#C9A84C',
  },
  {
    id: 'catering',
    number: '02',
    title: 'Catering Gastronomique',
    subtitle: 'Une symphonie de saveurs',
    icon: '◈',
    accentColor: '#C9A84C',
  },
  {
    id: 'vehicle_rental',
    number: '03',
    title: 'Location de Véhicules',
    subtitle: 'Flotte premium, style assuré',
    icon: '◉',
    accentColor: '#C9A84C',
  },
  {
    id: 'platform',
    number: '04',
    title: 'E-Shepha Platform',
    subtitle: 'Innovation digitale événementielle',
    icon: '◎',
    accentColor: '#C9A84C',
  },
]

export default function ServicesSection() {
  const [expanded, setExpanded] = useState<ServiceCategory | null>(null)

  const toggle = (id: ServiceCategory) =>
    setExpanded((prev) => (prev === id ? null : id))

  return (
    <section
      id="services"
      style={{
        padding: '7rem 1.5rem',
        background: '#080808',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            Nos Services
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 500,
              color: '#F7F4EE',
              lineHeight: 1.1,
              maxWidth: '18ch',
            }}
          >
            Nos Piliers d&apos;Excellence
          </h2>
        </motion.div>

        {/* ── 2×2 GRID ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
            gap: '1px',
            background: '#1A1A1A',
            border: '1px solid #1A1A1A',
          }}
        >
          {PILLARS.map((pillar, i) => {
            const isOpen = expanded === pillar.id
            const services = getServicesByCategory(pillar.id)

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: (i % 2) * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ background: '#080808', position: 'relative', overflow: 'hidden' }}
              >
                {/* Gold accent line — animates on hover */}
                <div
                  className="pillar-accent"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${pillar.accentColor}, transparent)`,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />

                {/* Card content */}
                <div
                  style={{ padding: '2.5rem', cursor: 'pointer' }}
                  onClick={() => toggle(pillar.id)}
                  onMouseEnter={(e) => {
                    const accent = e.currentTarget.previousElementSibling as HTMLElement
                    if (accent) accent.style.transform = 'scaleX(1)'
                  }}
                  onMouseLeave={(e) => {
                    const accent = e.currentTarget.previousElementSibling as HTMLElement
                    if (accent && !isOpen) accent.style.transform = 'scaleX(0)'
                  }}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`services-${pillar.id}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggle(pillar.id)}
                >
                  {/* Number + icon */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        color: '#C9A84C',
                      }}
                    >
                      {pillar.number}
                    </span>
                    <span style={{ fontSize: '1.25rem', color: '#C9A84C44' }}>
                      {pillar.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)',
                      fontWeight: 500,
                      color: '#F7F4EE',
                      lineHeight: 1.2,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      color: '#BDB8AD',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {pillar.subtitle}
                  </p>

                  {/* Toggle */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#C9A84C',
                    }}
                  >
                    {isOpen ? 'Réduire' : 'Voir les services'}
                    <span
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        lineHeight: 1,
                      }}
                    >
                      ↓
                    </span>
                  </div>
                </div>

                {/* ── EXPANDED SERVICE LIST ── */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`services-${pillar.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 2.5rem 2.5rem',
                          borderTop: '1px solid #1A1A1A',
                          marginTop: 0,
                          paddingTop: '1.5rem',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                          {services.map((svc, si) => (
                            <motion.div
                              key={svc.id}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: si * 0.06, duration: 0.3 }}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                padding: '0.875rem 0',
                                borderBottom: si < services.length - 1 ? '1px solid #1A1A1A' : 'none',
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#F7F4EE',
                                    marginBottom: '0.25rem',
                                  }}
                                >
                                  {svc.name}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.75rem',
                                    color: '#BDB8AD',
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {svc.tagline}
                                </div>
                              </div>
                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                {svc.price ? (
                                  <>
                                    <div
                                      style={{
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '0.625rem',
                                        color: '#BDB8AD',
                                        letterSpacing: '0.08em',
                                        marginBottom: '2px',
                                      }}
                                    >
                                      {svc.price.label ?? 'Dès'}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: '#C9A84C',
                                      }}
                                    >
                                      {formatPrice(svc.price.min, svc.price.currency, { compact: true })}
                                    </div>
                                  </>
                                ) : (
                                  <div
                                    style={{
                                      fontFamily: 'var(--font-sans)',
                                      fontSize: '0.6875rem',
                                      color: '#C9A84C',
                                      letterSpacing: '0.08em',
                                    }}
                                  >
                                    Sur demande
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <a
                          href="#devis"
                          className="btn-gold"
                          style={{
                            display: 'inline-flex',
                            marginTop: '1.25rem',
                            fontSize: '0.6875rem',
                            padding: '0.625rem 1.5rem',
                          }}
                        >
                          Demander un devis
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
