'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const WHATSAPP = 'https://wa.me/24106203965'
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function CTABlock() {
  return (
    <section style={{ padding: '7rem 1.5rem', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      {/* Radial gold glow */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(207,169,72,0.12) 0%, rgba(207,169,72,0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Kente pattern */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(45deg, #CFA948 25%, transparent 25%),
          linear-gradient(-45deg, #CFA948 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #CFA948 75%),
          linear-gradient(-45deg, transparent 75%, #CFA948 75%)
        `,
        backgroundSize: '6px 6px',
        backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
        opacity: 0.025,
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ width: '24px', height: '1px', background: 'var(--gold)', opacity: 0.6 }} />
          Commençons
          <span style={{ width: '24px', height: '1px', background: 'var(--gold)', opacity: 0.6 }} />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)',
            fontWeight: 900,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#F5F5F5',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}
        >
          Créons votre événement
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}
        >
          inoubliable.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
            color: 'rgba(245,245,245,0.6)',
            marginBottom: '2.75rem',
            lineHeight: 1.7,
          }}
        >
          De votre mariage à votre conférence — nous gérons tout avec élégance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}
        >
          <Link
            href="/devis"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #A88530, #E5C060, #A88530)',
              backgroundSize: '200% auto',
              color: '#0A0A0A',
              fontFamily: 'var(--font-display)',
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background-position 0.4s ease, box-shadow 0.3s ease',
              minHeight: '52px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundPosition = 'right center'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(207,169,72,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundPosition = 'left center'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Devis gratuit
          </Link>

          <Link
            href="/contact#coaching"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2.5rem',
              background: 'transparent',
              color: '#F5F5F5',
              fontFamily: 'var(--font-display)',
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(207,169,72,0.4)',
              transition: 'border-color 0.3s ease, background 0.3s ease, color 0.3s ease',
              minHeight: '52px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold)'
              e.currentTarget.style.background = 'rgba(207,169,72,0.06)'
              e.currentTarget.style.color = 'var(--gold)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(207,169,72,0.4)'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#F5F5F5'
            }}
          >
            Coaching gratuit
          </Link>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'rgba(37,211,102,0.08)',
              border: '1px solid rgba(37,211,102,0.25)',
              color: '#25D366',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.25s ease, border-color 0.25s ease',
              minHeight: '52px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.15)'
              e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.08)'
              e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)'
            }}
          >
            💬 WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
