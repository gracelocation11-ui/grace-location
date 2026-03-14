'use client'

import { useState, useEffect, useRef } from 'react'

const WA_NUMBER = '24106203965'
const WA_BASE = `https://wa.me/${WA_NUMBER}?text=`

const QUICK_REPLIES = [
  {
    id: 'event',
    label: 'Planifier un événement',
    icon: '✦',
    message:
      'Bonjour E-Shepha Event ! Je souhaite planifier un événement à Libreville. Pouvez-vous me donner plus d\'informations sur vos services ?',
  },
  {
    id: 'vehicle',
    label: 'Location de véhicule',
    icon: '◉',
    message:
      'Bonjour E-Shepha Event ! Je suis intéressé(e) par la location d\'un véhicule. Quels sont vos tarifs et votre disponibilité ?',
  },
  {
    id: 'quote',
    label: 'Demander un devis',
    icon: '◈',
    message:
      'Bonjour E-Shepha Event ! Je voudrais demander un devis pour mon projet événementiel. Comment procéder ?',
  },
  {
    id: 'wedding',
    label: 'Organisation de mariage',
    icon: '◇',
    message:
      'Bonjour E-Shepha Event ! Je prépare mon mariage et j\'aimerais en savoir plus sur vos packages Wedding Planning à Libreville.',
  },
]

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  // Show after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  if (!visible) return null

  return (
    <div
      ref={popupRef}
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
      }}
    >
      {/* ── POPUP ── */}
      <div
        style={{
          width: '300px',
          background: '#111',
          border: '1px solid #2A2A2A',
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          transformOrigin: 'bottom right',
          transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(8px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
        role="dialog"
        aria-label="Contact WhatsApp"
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          style={{
            background: '#1a2a1a',
            borderBottom: '1px solid rgba(37,211,102,0.15)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(37,211,102,0.15)',
              border: '1px solid rgba(37,211,102,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.125rem',
              flexShrink: 0,
            }}
          >
            💬
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#F7F4EE',
              }}
            >
              E-Shepha Event
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                color: '#25D366',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#25D366',
                  boxShadow: '0 0 0 2px rgba(37,211,102,0.3)',
                }}
              />
              En ligne · Répond en &lt; 1h
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#BDB8AD',
              fontSize: '1.125rem',
              lineHeight: 1,
              padding: '0.25rem',
            }}
          >
            ×
          </button>
        </div>

        {/* Message bubble */}
        <div style={{ padding: '1rem 1.25rem' }}>
          <div
            style={{
              background: '#1a2a1a',
              border: '1px solid rgba(37,211,102,0.1)',
              borderRadius: '0 8px 8px 8px',
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: '#EDE8DE',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Bonjour 👋 Comment puis-je vous aider ? Choisissez une option ou écrivez-nous directement.
            </p>
          </div>

          {/* Quick reply buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {QUICK_REPLIES.map((reply) => (
              <a
                key={reply.id}
                href={`${WA_BASE}${encodeURIComponent(reply.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 0.875rem',
                  background: 'rgba(37,211,102,0.06)',
                  border: '1px solid rgba(37,211,102,0.15)',
                  color: '#F7F4EE',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8125rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(37,211,102,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(37,211,102,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.15)'
                }}
              >
                <span style={{ color: '#C9A84C', fontSize: '0.75rem', flexShrink: 0 }}>
                  {reply.icon}
                </span>
                <span>{reply.label}</span>
                <span style={{ marginLeft: 'auto', color: '#25D366', fontSize: '0.75rem' }}>→</span>
              </a>
            ))}
          </div>

          {/* Direct link */}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.875rem',
              padding: '0.625rem',
              background: '#25D366',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1EB356'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#25D366'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.855L0 24l6.335-1.509A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            Ouvrir WhatsApp
          </a>
        </div>
      </div>

      {/* ── FAB BUTTON ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer WhatsApp' : 'Contacter via WhatsApp'}
        aria-expanded={open}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: '#25D366',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
          animation: !open ? 'pulseFab 3s ease-in-out infinite' : 'none',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,211,102,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)'
        }}
      >
        {/* Toggle between WA icon and close */}
        <div
          style={{
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: open ? 'rotate(45deg) scale(0.8)' : 'rotate(0deg) scale(1)',
            opacity: open ? 0 : 1,
            position: 'absolute',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.855L0 24l6.335-1.509A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        </div>
        <div
          style={{
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: open ? 'rotate(0deg) scale(1)' : 'rotate(-45deg) scale(0.8)',
            opacity: open ? 1 : 0,
            position: 'absolute',
            color: 'white',
            fontSize: '1.5rem',
            lineHeight: 1,
          }}
        >
          ×
        </div>
      </button>

      <style>{`
        @keyframes pulseFab {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); }
          50% { box-shadow: 0 4px 20px rgba(37,211,102,0.4), 0 0 0 10px rgba(37,211,102,0.08); }
        }
      `}</style>
    </div>
  )
}
