'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface TimelineEntry {
  period: string
  title: string
  items?: string[]
  highlight?: boolean
}

const TIMELINE: TimelineEntry[] = [
  {
    period: '2006',
    title: 'Création de Grâce Location à Libreville',
    highlight: true,
  },
  {
    period: '2006 – 2026',
    title: 'Organisation de célébrations',
    items: ['Mariages civils', 'Mariages coutumiers'],
  },
  {
    period: '2006 – 2026',
    title: 'Collaboration avec les institutions gouvernementales gabonaises',
  },
  {
    period: '2006 – 2026',
    title: 'Services logistiques pour les Jeux scolaires et universitaires',
  },
  {
    period: '2006',
    title: 'Célébrations liées à l\'indépendance du Gabon',
  },
  {
    period: '2007 – 2020',
    title: 'Partenaire officiel de la Tropicale Amissa Bongo',
    highlight: true,
  },
  {
    period: '2008',
    title: 'Tokyo International Conference on African Development (TICAD IV)',
  },
  {
    period: '2009',
    title: 'Inauguration du champ pétrolier Maurel & Prom Gabon',
  },
  {
    period: '2009',
    title: 'Participation à plusieurs campagnes politiques',
  },
  {
    period: '2010',
    title: 'Conférence SETRAG sur les entreprises ferroviaires',
  },
  {
    period: '2012',
    title: 'Coupe d\'Afrique des Nations (CAN)',
    highlight: true,
  },
  {
    period: '2012 – 2015',
    title: 'Collaboration avec Airtel Gabon',
  },
  {
    period: '2013',
    title: 'Recensement général de la population et des logements',
  },
  {
    period: '2014',
    title: 'Jeux OGSSUS',
  },
  {
    period: '2016',
    title: 'Jeux OGSSUS — Participation à plusieurs campagnes politiques',
  },
  {
    period: 'Plusieurs éditions',
    title: 'Journée Africaine de la Statistique',
  },
  {
    period: '2018 – 2021',
    title: 'Recensement général de l\'agriculture',
  },
  {
    period: '2023',
    title: 'Recensement général des entreprises',
  },
  {
    period: '2025 – 2026',
    title: 'Livraisons logistiques à la Cour Constitutionnelle',
    highlight: true,
  },
]

export default function CompanyStory() {
  const [expanded, setExpanded] = useState(false)
  const VISIBLE = 8
  const shown = expanded ? TIMELINE : TIMELINE.slice(0, VISIBLE)

  return (
    <section style={{ padding: '5rem 1.5rem', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label + Title */}
        <div className="section-label" style={{ marginBottom: '1rem' }}>
          Notre Histoire
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 500,
          color: '#F5F5F5',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}>
          Depuis 2006
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9375rem',
          color: 'rgba(245,245,245,0.55)',
          lineHeight: 1.7,
          marginBottom: '3rem',
          maxWidth: '60ch',
        }}>
          Grâce Location accompagne les plus grands événements du Gabon depuis près de 20 ans.
        </p>

        {/* 2-col layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
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
              left: '5.5rem',
              top: '0.75rem',
              bottom: '0.75rem',
              width: '1px',
              background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.05))',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {shown.map((entry, i) => (
                <motion.div
                  key={`${entry.period}-${i}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.4), ease: EASE }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    padding: '1.125rem 0',
                    borderBottom: '1px solid #111',
                  }}
                >
                  {/* Period */}
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: entry.highlight ? 'var(--gold)' : 'rgba(245,245,245,0.55)',
                    flexShrink: 0,
                    width: '5.5rem',
                    textAlign: 'right',
                    lineHeight: 1.4,
                    paddingTop: '3px',
                    letterSpacing: '-0.01em',
                  }}>
                    {entry.period}
                  </div>

                  {/* Dot */}
                  <div style={{
                    width: entry.highlight ? '10px' : '7px',
                    height: entry.highlight ? '10px' : '7px',
                    borderRadius: '50%',
                    background: entry.highlight ? 'var(--gold)' : '#2A2A2A',
                    border: entry.highlight ? 'none' : '1px solid var(--gold)44',
                    flexShrink: 0,
                    marginTop: '5px',
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: entry.highlight ? '0 0 8px var(--gold)55' : 'none',
                  }} />

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      color: entry.highlight ? '#F5F5F5' : 'rgba(245,245,245,0.55)',
                      fontWeight: entry.highlight ? 500 : 400,
                      lineHeight: 1.5,
                      margin: 0,
                    }}>
                      {entry.title}
                    </p>
                    {entry.items && (
                      <ul style={{
                        margin: '0.375rem 0 0',
                        paddingLeft: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.125rem',
                      }}>
                        {entry.items.map(item => (
                          <li key={item} style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.8125rem',
                            color: '#7A756C',
                            listStyle: 'none',
                            paddingLeft: 0,
                          }}>
                            <span style={{ color: 'var(--gold)44', marginRight: '0.375rem' }}>—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Show more / less */}
            {TIMELINE.length > VISIBLE && (
              <button
                onClick={() => setExpanded(e => !e)}
                style={{
                  marginTop: '1.5rem',
                  background: 'none',
                  border: '1px solid #2A2A2A',
                  color: 'var(--gold)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.625rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.background = 'rgba(201,168,76,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2A2A2A'
                  e.currentTarget.style.background = 'none'
                }}
              >
                {expanded ? '↑ Réduire' : `Voir tout (${TIMELINE.length} événements) →`}
              </button>
            )}
          </div>

          {/* RIGHT: Quote + stats box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Quote box */}
            <div style={{
              border: '1px solid #2A2A2A',
              borderLeft: '3px solid var(--gold)',
              padding: '2rem',
              background: '#0a0a0a',
            }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                color: '#F5F5F5',
                lineHeight: 1.8,
                marginBottom: '1.25rem',
              }}>
                Née en 2006, Grâce Location a équipé plus de 500 événements au Gabon.
                Aujourd&apos;hui, cette expertise devient E-Shepha Event.
              </p>
              <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: '1.25rem' }} />
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.125rem',
                fontStyle: 'italic',
                color: 'var(--gold)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                &ldquo;Une nouvelle ère événementielle commence.&rdquo;
              </p>
            </div>

            {/* Stats */}
            {[
              { value: '20', unit: 'ans', label: 'd\'expérience' },
              { value: '500+', unit: '', label: 'événements organisés' },
              { value: '19', unit: '+', label: 'références nationales' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: EASE }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem',
                  border: '1px solid #1A1A1A',
                  background: '#0a0a0a',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  flexShrink: 0,
                }}>
                  {s.value}<span style={{ fontSize: '1rem' }}>{s.unit}</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  color: 'rgba(245,245,245,0.55)',
                  lineHeight: 1.4,
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-story-grid] { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 768px) {
          [data-story-grid] > div:first-child div[style*="left: 5.5rem"] {
            left: 4.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
