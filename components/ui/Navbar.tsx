'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const WHATSAPP = 'https://wa.me/24106203965'

const NAV_LINKS = [
  { label: 'Organisation', href: '/organisation-ceremonie' },
  { label: 'Traiteur', href: '/service-traiteur' },
  { label: 'Véhicules', href: '/location-vehicules' },
  { label: 'E-Shepha', href: '/e-shepha-event' },
  { label: 'Devis', href: '/devis' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = () => setOpen(false)

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          background: scrolled
            ? 'rgba(10,10,10,0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(201,168,76,0.12)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* ── BRAND ── */}
          <Link
            href="/"
            style={{ textDecoration: 'none', flexShrink: 0 }}
            aria-label="E-Shepha Event — Accueil"
          >
            <div style={{ lineHeight: 1 }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#CFA948',
                  textTransform: 'uppercase',
                }}
              >
                E-Shepha Event
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.55rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: 'rgba(245,245,245,0.45)',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}
              >
                Grâce Location · Libreville
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav
            aria-label="Navigation principale"
            style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}
            className="hidden-mobile"
          >
            <style>{`
              @media (max-width: 900px) { .hidden-mobile { display: none !important; } }
              @media (min-width: 901px) { .hidden-desktop { display: none !important; } }
            `}</style>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,245,0.55)',
                  textDecoration: 'none',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#CFA948')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,245,245,0.55)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── DESKTOP CTAs ── */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}
            className="hidden-mobile"
          >
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.5rem 1rem',
                border: '1px solid #CFA948',
                color: '#CFA948',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#CFA94818'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.855L0 24l6.335-1.509A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.964-1.347l-.356-.211-3.763.896.953-3.671-.232-.374A9.786 9.786 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
              </svg>
              WhatsApp
            </a>
            <Link
              href="/devis"
              className="btn-gold"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.6875rem' }}
            >
              Devis gratuit
            </Link>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            className="hidden-desktop"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
            }}
          >
            <span
              style={{
                display: 'block',
                height: '1.5px',
                background: '#CFA948',
                borderRadius: '1px',
                transition: 'transform 0.3s ease, opacity 0.3s ease, width 0.3s ease',
                width: open ? '24px' : '24px',
                transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                height: '1.5px',
                background: '#CFA948',
                borderRadius: '1px',
                width: '18px',
                transition: 'opacity 0.3s ease',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                height: '1.5px',
                background: '#CFA948',
                borderRadius: '1px',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                width: open ? '24px' : '24px',
                transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 49,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '96px 2rem 2rem',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-12px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 4.5vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#F5F5F5',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: '1px solid #1A1A1A',
                transition: 'color 0.2s ease, padding-left 0.3s ease',
                transitionDelay: open ? `${i * 40}ms` : '0ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#CFA948'
                e.currentTarget.style.paddingLeft = '0.5rem'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#F5F5F5'
                e.currentTarget.style.paddingLeft = '0'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2.5rem' }}>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="btn-outline"
            style={{ justifyContent: 'center' }}
          >
            💬 WhatsApp
          </a>
          <Link
            href="/devis"
            onClick={handleNavClick}
            className="btn-gold"
            style={{ justifyContent: 'center' }}
          >
            Devis gratuit
          </Link>
        </div>

        <p
          style={{
            marginTop: 'auto',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6875rem',
            letterSpacing: '0.15em',
            color: '#2A2A2A',
            textTransform: 'uppercase',
          }}
        >
          Grâce Location · E-Shepha Event · Libreville, Gabon
        </p>
      </div>

      {/* ── SPACER ── */}
      <div style={{ height: '72px' }} />
    </>
  )
}
