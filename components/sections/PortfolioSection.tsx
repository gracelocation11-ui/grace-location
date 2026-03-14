'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FilterTab = 'tous' | 'mariages' | 'corporate' | 'vehicules' | 'traiteur' | 'concerts'

const TABS: { value: FilterTab; label: string }[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'mariages', label: 'Mariages' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'vehicules', label: 'Véhicules' },
  { value: 'traiteur', label: 'Traiteur' },
  { value: 'concerts', label: 'Concerts' },
]

const PORTFOLIO_ITEMS = [
  {
    id: 'p1',
    title: 'Mariage Royal',
    subtitle: 'Hôtel Radisson Blu, Libreville',
    category: 'mariages' as FilterTab,
    date: 'Décembre 2024',
    gradient: 'linear-gradient(135deg, #2a1a08 0%, #4a2e0e 100%)',
    accentColor: '#C9A84C',
    size: 'tall',
  },
  {
    id: 'p2',
    title: 'Gala CAN 2012',
    subtitle: 'Stade de l\'Amitié, Libreville',
    category: 'corporate' as FilterTab,
    date: 'Février 2012',
    gradient: 'linear-gradient(135deg, #081822 0%, #0e2a3a 100%)',
    accentColor: '#4A9EBF',
    size: 'normal',
  },
  {
    id: 'p3',
    title: 'Flotte La Tropicale',
    subtitle: 'Convoi officiel, Gabon',
    category: 'vehicules' as FilterTab,
    date: 'Janvier 2024',
    gradient: 'linear-gradient(135deg, #0a1808 0%, #182808 100%)',
    accentColor: '#5A9A3A',
    size: 'normal',
  },
  {
    id: 'p4',
    title: 'Gala CNAMGS',
    subtitle: 'Grand Hôtel Okumé Palace',
    category: 'corporate' as FilterTab,
    date: 'Novembre 2023',
    gradient: 'linear-gradient(135deg, #18080a 0%, #2a0e10 100%)',
    accentColor: '#BF4A5A',
    size: 'tall',
  },
  {
    id: 'p5',
    title: 'Banquet Olam Gabon',
    subtitle: 'Dîner de gala, 300 couverts',
    category: 'traiteur' as FilterTab,
    date: 'Octobre 2024',
    gradient: 'linear-gradient(135deg, #1a1808 0%, #2a2808 100%)',
    accentColor: '#C9A84C',
    size: 'normal',
  },
  {
    id: 'p6',
    title: 'Concert Airtel Gabon',
    subtitle: 'Place de l\'Indépendance',
    category: 'concerts' as FilterTab,
    date: 'Juillet 2023',
    gradient: 'linear-gradient(135deg, #18081a 0%, #280e2a 100%)',
    accentColor: '#A84CC9',
    size: 'normal',
  },
  {
    id: 'p7',
    title: 'Mariage Traditionnel',
    subtitle: 'Cérémonie Fang & Réception',
    category: 'mariages' as FilterTab,
    date: 'Août 2024',
    gradient: 'linear-gradient(135deg, #221008 0%, #3a1a0a 100%)',
    accentColor: '#C9A84C',
    size: 'normal',
  },
  {
    id: 'p8',
    title: 'Cocktail Diplomatique',
    subtitle: 'Résidence ambassade de France',
    category: 'traiteur' as FilterTab,
    date: 'Mars 2024',
    gradient: 'linear-gradient(135deg, #081018 0%, #0e1a28 100%)',
    accentColor: '#4A7ABF',
    size: 'tall',
  },
  {
    id: 'p9',
    title: 'Séminaire Gabon Télécom',
    subtitle: 'Formation managériale, 2 jours',
    category: 'corporate' as FilterTab,
    date: 'Septembre 2024',
    gradient: 'linear-gradient(135deg, #101808 0%, #1a2808 100%)',
    accentColor: '#5AAA4A',
    size: 'normal',
  },
]

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('tous')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered =
    activeFilter === 'tous'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter)

  return (
    <section
      id="galerie"
      style={{ padding: '7rem 1.5rem', background: '#0a0a0a', position: 'relative' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            Notre Portfolio
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 500,
              color: '#F7F4EE',
              lineHeight: 1.1,
            }}
          >
            Nos Réalisations
          </h2>
        </motion.div>

        {/* ── FILTER TABS ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.375rem',
            marginBottom: '2.5rem',
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.125rem',
                border: '1px solid',
                borderColor:
                  activeFilter === tab.value ? '#C9A84C' : '#2A2A2A',
                background:
                  activeFilter === tab.value ? '#C9A84C' : 'transparent',
                color:
                  activeFilter === tab.value ? '#080808' : '#BDB8AD',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== tab.value) {
                  e.currentTarget.style.borderColor = '#C9A84C44'
                  e.currentTarget.style.color = '#C9A84C'
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== tab.value) {
                  e.currentTarget.style.borderColor = '#2A2A2A'
                  e.currentTarget.style.color = '#BDB8AD'
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── CSS MASONRY GRID ── */}
        <motion.div
          layout
          style={{
            columns: '3 280px',
            columnGap: '1px',
            gap: '0',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '1px',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'block',
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Gradient placeholder */}
                <div
                  style={{
                    background: item.gradient,
                    height: item.size === 'tall' ? '400px' : '260px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                    transform: hoveredId === item.id ? 'scale(1.03)' : 'scale(1)',
                  }}
                >
                  {/* Accent dot */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${item.accentColor}22, transparent 70%)`,
                      transition: 'transform 0.4s ease, opacity 0.4s ease',
                      opacity: hoveredId === item.id ? 0 : 1,
                    }}
                  />
                  {/* Category badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(8,8,8,0.7)',
                      border: `1px solid ${item.accentColor}44`,
                      padding: '0.25rem 0.625rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.5625rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: item.accentColor,
                    }}
                  >
                    {TABS.find((t) => t.value === item.category)?.label}
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)',
                    opacity: hoveredId === item.id ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '1px',
                      background: item.accentColor,
                      marginBottom: '0.75rem',
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.375rem',
                      fontWeight: 500,
                      color: '#F7F4EE',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      color: '#BDB8AD',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.subtitle}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.5625rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: item.accentColor,
                    }}
                  >
                    {item.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── COUNT ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            color: '#2A2A2A',
            textAlign: 'center',
            marginTop: '2rem',
            letterSpacing: '0.1em',
          }}
        >
          {filtered.length} / {PORTFOLIO_ITEMS.length} réalisations affichées
        </motion.p>
      </div>
    </section>
  )
}
