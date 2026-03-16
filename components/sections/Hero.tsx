'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Marquee from '@/components/ui/Marquee'


const STATS = [
  { value: '10+', label: 'Ans d\'expérience' },
  { value: '500+', label: 'Événements réalisés' },
  { value: '50+', label: 'Partenaires actifs' },
  { value: '4', label: 'Piliers de service' },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: EASE,
    },
  }),
}

export default function Hero() {
  return (
    <section
      style={{ position: 'relative', overflow: 'hidden' }}
      aria-label="E-Shepha Event — Présentation"
    >
      {/* ── KENTE PATTERN BG ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(45deg, #C9A84C 25%, transparent 25%),
            linear-gradient(-45deg, #C9A84C 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #C9A84C 75%),
            linear-gradient(-45deg, transparent 75%, #C9A84C 75%)
          `,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          opacity: 0.04,
          zIndex: 0,
        }}
      />

      {/* ── RADIAL GLOW ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── BOTTOM FADE ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #080808)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── CONTENT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '6rem 1.5rem 4rem',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Label */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="section-label"
          style={{ marginBottom: '2rem' }}
        >
          Premium Event Management · Libreville, Gabon
        </motion.div>

        {/* H1 */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.75rem, 7vw, 6.5rem)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#F7F4EE',
            marginBottom: '1.5rem',
            maxWidth: '14ch',
          }}
        >
          La nouvelle{' '}
          <em
            style={{
              fontStyle: 'italic',
              background: 'linear-gradient(90deg, #A8852A 0%, #E0C068 40%, #FAEAA0 60%, #E0C068 80%, #A8852A 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          >
            génération
          </em>{' '}
          d&apos;événements au Gabon.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#BDB8AD',
            maxWidth: '52ch',
            marginBottom: '2.75rem',
          }}
        >
          De la planification au jour J — mariages, galas, location de véhicules
          et plateforme digitale. L&apos;excellence à chaque détail.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="hero-ctas">
            <Link href="/devis" className="btn-gold hero-btn">
              Devis gratuit
            </Link>
            <Link href="/e-shepha-event" className="btn-outline hero-btn">
              Découvrir E-Shepha
            </Link>
            <a
              href="https://wa.me/24106203965?text=Bonjour%20E-Shepha%20Event%20!%20Je%20souhaite%20obtenir%20des%20informations."
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-wa"
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          data-stats
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            marginTop: '5rem',
            width: '100%',
            maxWidth: '640px',
            background: '#2A2A2A',
            border: '1px solid #2A2A2A',
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: '#080808',
                padding: '1.25rem 0.75rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 600,
                  color: '#C9A84C',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.625rem',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#BDB8AD',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* Shimmer keyframe (also in globals but scoped here for safety) */}
      <style>{`
        @keyframes shimmer {
          0%  { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .hero-ctas {
          position: relative;
          z-index: 20;
          display: flex;
          flex-wrap: wrap;
          gap: 0.875rem;
          justify-content: center;
          align-items: center;
        }
        .hero-btn {
          position: relative;
          z-index: 20;
          min-height: 48px;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .hero-wa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: rgba(37,211,102,0.1);
          border: 1px solid rgba(37,211,102,0.3);
          color: #25D366;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.25s ease, border-color 0.25s ease;
          min-height: 48px;
        }
        .hero-wa:hover {
          background: rgba(37,211,102,0.18);
          border-color: rgba(37,211,102,0.5);
        }
        @media (max-width: 540px) {
          .hero-ctas {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }
          .hero-btn, .hero-wa {
            width: 100%;
            max-width: 320px;
            justify-content: center;
          }
        }
        @media (max-width: 600px) {
          [data-stats] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
