'use client'

import Link from 'next/link'
import { useState } from 'react'

const PILLARS = [
  {
    number: '01',
    title: 'Organisation',
    subtitle: 'de Cérémonie',
    description: 'Tentes, mobilier, décoration florale, sonorisation — tout le matériel pour vos cérémonies d\'exception depuis 2006.',
    href: '/organisation-ceremonie',
    cover: '/portfolio/mariages/cover.jpg',
    gradient: 'linear-gradient(160deg, #1a0c02 0%, #0d0802 100%)',
    accent: '#CFA948',
  },
  {
    number: '02',
    title: 'Service',
    subtitle: 'Traiteur',
    description: 'Gastronomie événementielle raffinée — buffets, cocktails dînatoires, dîners de gala et réceptions officielles.',
    href: '/service-traiteur',
    cover: '/portfolio/traiteur/cover.jpg',
    gradient: 'linear-gradient(160deg, #030e07 0%, #020a04 100%)',
    accent: '#5A9A6A',
  },
  {
    number: '03',
    title: 'Location de',
    subtitle: 'Véhicules',
    description: 'Flotte prestige — 16 véhicules haut de gamme pour convois, cortèges, transferts VIP et missions diplomatiques.',
    href: '/location-vehicules',
    cover: '/portfolio/vehicules/cover.jpg',
    gradient: 'linear-gradient(160deg, #040612 0%, #020409 100%)',
    accent: '#4A7ABF',
  },
  {
    number: '04',
    title: 'E-Shepha',
    subtitle: 'Event Platform',
    description: 'La plateforme digitale événementielle — coaching, gestion de projet, suivi en temps réel et expertise stratégique.',
    href: '/e-shepha-event',
    gradient: 'linear-gradient(160deg, #100c02 0%, #0a0800 100%)',
    accent: '#CFA948',
  },
]

function PillarCard({ p }: { p: typeof PILLARS[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={p.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        position: 'relative',
        height: '560px',
        overflow: 'hidden',
        textDecoration: 'none',
        background: p.gradient,
      }}
    >
      {/* Cover image */}
      {p.cover && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${p.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            filter: 'brightness(0.35)',
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.15) 100%)',
      }} />

      {/* Gold frame on hover */}
      <div style={{
        position: 'absolute',
        inset: '12px',
        border: `1px solid ${p.accent}`,
        opacity: hovered ? 0.4 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${p.accent}, transparent)`,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem' }}>

        {/* Number */}
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: p.accent,
          marginBottom: '1.25rem',
          opacity: 0.8,
        }}>
          {p.number}
        </span>

        {/* Accent line */}
        <div style={{ width: '32px', height: '1px', background: p.accent, marginBottom: '1rem', opacity: 0.6 }} />

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#F5F5F5',
          margin: 0,
          lineHeight: 1.1,
        }}>
          {p.title}
        </h3>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
          fontWeight: 400,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: p.accent,
          margin: '0 0 1rem',
          lineHeight: 1.1,
        }}>
          {p.subtitle}
        </h3>

        {/* Description — revealed on hover */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
          fontSize: '0.8125rem',
          color: 'rgba(245,245,245,0.7)',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          maxHeight: hovered ? '100px' : '0',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.4s ease',
        }}>
          {p.description}
        </p>

        {/* CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: '0.5625rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: p.accent,
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}>
          Découvrir <span>→</span>
        </div>
      </div>
    </Link>
  )
}

export default function PillarsPreview() {
  return (
    <section style={{ padding: '6rem 0', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            Nos Services
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#F5F5F5',
            margin: 0,
            lineHeight: 1.05,
          }}>
            Quatre Piliers<br />
            <span style={{ color: 'var(--gold)', fontWeight: 400, fontSize: '0.85em' }}>d&apos;Excellence</span>
          </h2>
        </div>
      </div>

      {/* 4-col grid — full width */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        background: '#1A1A1A',
      }} data-pillars-grid>
        {PILLARS.map((p) => (
          <PillarCard key={p.href} p={p} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          [data-pillars-grid] { grid-template-columns: repeat(2, 1fr) !important; }
          [data-pillars-grid] a { height: 420px !important; }
        }
        @media (max-width: 600px) {
          [data-pillars-grid] { grid-template-columns: 1fr !important; }
          [data-pillars-grid] a { height: 340px !important; }
        }
      `}</style>
    </section>
  )
}
