'use client'
import Link from 'next/link'

const WHATSAPP = 'https://wa.me/24106203965'

export default function MobileCTABar() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          background: 'rgba(8,8,8,0.97)',
          borderTop: '1px solid rgba(201,168,76,0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0 1rem',
        }}
        className="lg-hidden"
      >
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            background: 'rgba(37,211,102,0.1)',
            border: '1px solid rgba(37,211,102,0.3)',
            color: '#25D366',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          💬 WhatsApp
        </a>
        <Link
          href="/devis"
          style={{
            flex: 1,
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg,#C9A84C 0%,#E0C068 50%,#A8852A 100%)',
            color: '#080808',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Devis gratuit
        </Link>
      </div>
      <style>{`
        .lg-hidden { display: flex; }
        @media (min-width: 1024px) { .lg-hidden { display: none !important; } }
      `}</style>
    </>
  )
}
