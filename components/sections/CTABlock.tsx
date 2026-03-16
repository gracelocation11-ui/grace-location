'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

const WHATSAPP = 'https://wa.me/24106203965'

export default function CTABlock() {
  return (
    <section style={{ padding: '6rem 1.5rem', background: '#080808', position: 'relative', overflow: 'hidden' }}>
      {/* Kente pattern overlay */}
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

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 500,
            color: '#F7F4EE',
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Prêts à créer quelque chose d&apos;exceptionnel ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.125rem',
            color: '#BDB8AD',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}
        >
          De votre mariage à votre conférence — nous gérons tout avec élégance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.875rem',
            justifyContent: 'center',
          }}
        >
          <Link href="/devis" className="btn-gold">
            Devis gratuit
          </Link>
          <Link href="/contact#coaching" className="btn-outline">
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
              padding: '0.875rem 1.75rem',
              background: 'rgba(37,211,102,0.1)',
              border: '1px solid rgba(37,211,102,0.3)',
              color: '#25D366',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.18)'
              e.currentTarget.style.borderColor = 'rgba(37,211,102,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.1)'
              e.currentTarget.style.borderColor = 'rgba(37,211,102,0.3)'
            }}
          >
            💬 WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
