'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section
      style={{ position: 'relative', height: '100svh', minHeight: '640px', overflow: 'hidden' }}
      aria-label="E-Shepha Event — Présentation"
    >
      {/* ── CINEMATIC BACKGROUND ── */}
      <div
        aria-hidden
        className="hero-bg-zoom"
        style={{
          position: 'absolute',
          inset: '-5%',
          background: `
            radial-gradient(ellipse 120% 80% at 50% 30%, rgba(207,169,72,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 80% 70%, rgba(207,169,72,0.04) 0%, transparent 50%),
            linear-gradient(160deg, #0f0b04 0%, #0A0A0A 40%, #060608 100%)
          `,
          zIndex: 0,
        }}
      />

      {/* ── KENTE GEOMETRIC OVERLAY ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(45deg, #CFA948 25%, transparent 25%),
            linear-gradient(-45deg, #CFA948 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #CFA948 75%),
            linear-gradient(-45deg, transparent 75%, #CFA948 75%)
          `,
          backgroundSize: '6px 6px',
          backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
          opacity: 0.025,
          zIndex: 1,
        }}
      />

      {/* ── BOTTOM VIGNETTE ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to bottom, transparent, #0A0A0A)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── SIDE VIGNETTES ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)', zIndex: 2, pointerEvents: 'none' }} />

      {/* ── CONTENT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '6rem 1.5rem 5rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: 'var(--gold)', opacity: 0.6 }} />
          Luxury Event Planning · Libreville, Gabon
          <span style={{ width: '32px', height: '1px', background: 'var(--gold)', opacity: 0.6 }} />
        </motion.div>

        {/* Main Title — Cinzel */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            fontWeight: 900,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#F5F5F5',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}
        >
          E-Shepha{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #A88530 0%, #E5C060 40%, #FFF0A0 60%, #E5C060 80%, #A88530 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          >
            Event
          </span>
        </motion.h1>

        {/* Italic Subtitle — Cormorant */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            color: 'rgba(245,245,245,0.75)',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem',
          }}
        >
          Create &nbsp;•&nbsp; Connect &nbsp;•&nbsp; Celebrate
        </motion.p>

        {/* Sub-caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)',
            color: 'rgba(245,245,245,0.45)',
            letterSpacing: '0.1em',
            marginBottom: '3rem',
          }}
        >
          Mariages · Galas · Location · Catering · Événements corporatifs
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="hero-ctas"
        >
          <Link href="/contact" className="hero-btn hero-btn-gold">
            Plan Your Event
          </Link>
          <Link href="/portfolio" className="hero-btn hero-btn-outline">
            Voir le Portfolio
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          data-stats
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            marginTop: '5rem',
            width: '100%',
            maxWidth: '600px',
            background: 'rgba(207,169,72,0.1)',
          }}
        >
          {[
            { value: '10+', label: "Ans d'expérience" },
            { value: '500+', label: 'Événements' },
            { value: '50+', label: 'Partenaires' },
            { value: '4', label: 'Piliers' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(10,10,10,0.9)', padding: '1.25rem 0.5rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.3rem' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.5)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2.5rem;
          font-family: var(--font-display);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          min-height: 52px;
          transition: all 0.3s ease;
          touch-action: manipulation;
        }
        .hero-btn-gold {
          background: linear-gradient(135deg, #A88530, #E5C060, #A88530);
          background-size: 200% auto;
          color: #0A0A0A;
        }
        .hero-btn-gold:hover {
          background-position: right center;
          box-shadow: 0 8px 32px rgba(207,169,72,0.4);
        }
        .hero-btn-outline {
          background: transparent;
          color: #F5F5F5;
          border: 1px solid rgba(207,169,72,0.5);
        }
        .hero-btn-outline:hover {
          border-color: var(--gold);
          background: rgba(207,169,72,0.06);
          color: var(--gold);
        }
        @media (max-width: 540px) {
          .hero-ctas { flex-direction: column; width: 100%; }
          .hero-btn { width: 100%; max-width: 300px; }
        }
        @media (max-width: 600px) {
          [data-stats] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
