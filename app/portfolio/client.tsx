'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import Testimonials from '@/components/sections/Testimonials'

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

export default function PortfolioClient() {
  return (
    <>
      <Navbar />
      <PageHero
        label="Portfolio"
        title="Nos Réalisations"
        subtitle="500+ événements depuis 2006"
      />

      {/* 3 Category Blocks */}
      <section style={{ background: '#080808', padding: '4rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: '3rem' }}
          >
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>Galeries</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 500, color: '#F7F4EE', margin: 0 }}>
              Explorez nos univers
            </h2>
          </motion.div>

          <div data-portfolio-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1A1A1A' }}>
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              >
                <Link href={`/portfolio/${cat.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    data-cat-card
                    style={{
                      background: cat.gradient,
                      position: 'relative',
                      overflow: 'hidden',
                      height: '420px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '2rem',
                    }}
                  >
                    {/* Cover image */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${cat.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                      }}
                      data-cat-img
                    />

                    {/* Overlay gradient */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.2) 100%)',
                    }} />

                    {/* Top accent */}
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: '3px',
                      background: `linear-gradient(90deg, ${cat.accent}, transparent)`,
                    }} />

                    {/* Icon */}
                    <span style={{
                      position: 'absolute',
                      top: '1.5rem', right: '1.5rem',
                      fontSize: '1.5rem',
                      color: cat.accent,
                      opacity: 0.6,
                    }}>{cat.icon}</span>

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: '32px', height: '1px',
                        background: cat.accent,
                        marginBottom: '1rem',
                      }} />
                      <h3 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.375rem, 2vw, 1.75rem)',
                        fontWeight: 500,
                        color: '#F7F4EE',
                        margin: '0 0 0.375rem',
                        lineHeight: 1.2,
                      }}>{cat.label}</h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: '#BDB8AD',
                        margin: '0 0 1rem',
                        lineHeight: 1.5,
                      }}>{cat.sublabel}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.5625rem',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: cat.accent,
                        }}>{cat.count}</span>
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#F7F4EE',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                        }}>
                          Voir la galerie
                          <span style={{ fontSize: '0.875rem' }}>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: '#0a0a0a', borderTop: '1px solid #1A1A1A', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '1rem', lineHeight: 1.1 }}>
            Votre événement sera ici →
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#BDB8AD', lineHeight: 1.7, marginBottom: '2rem' }}>
            Rejoignez les 500+ événements que nous avons organisés au Gabon.
          </p>
          <Link href="/devis" className="btn-gold" style={{ justifyContent: 'center' }}>
            Obtenir mon devis gratuit
          </Link>
        </div>
      </section>

      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />

      <style>{`
        @media (max-width: 768px) {
          [data-portfolio-grid] { grid-template-columns: 1fr !important; }
          [data-cat-card] { height: 300px !important; }
        }
        [data-cat-card]:hover [data-cat-img] { transform: scale(1.05); }
      `}</style>
    </>
  )
}
