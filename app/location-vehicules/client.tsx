'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { VEHICLE_CATEGORIES, VEHICLES_DATA, type VehicleData } from '@/lib/vehicles-data'
import { formatPrice } from '@/lib/services-data'

const WHATSAPP_BASE = 'https://wa.me/24106203965'

const REFERENCES = ['La Tropicale Amissa Bongo', 'CAN 2012', 'CEMAC']

function VehicleCard({ vehicle }: { vehicle: VehicleData }) {
  const waMsg = encodeURIComponent(`Bonjour, je souhaite louer le ${vehicle.brand} ${vehicle.model} ${vehicle.year}. Tarif: ${vehicle.pricePerDay.toLocaleString('fr-FR')} FCFA/jour.`)

  return (
    <div style={{ background: '#111', border: '1px solid #1A1A1A', overflow: 'hidden', transition: 'border-color 0.3s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#1A1A1A')}
    >
      {/* Gradient area */}
      <div style={{ height: '140px', background: vehicle.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {vehicle.recommended && (
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#C9A84C', color: '#080808', fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.25rem 0.5rem' }}>
            Recommandé
          </div>
        )}
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
          <path d="M8 28 L14 18 L66 18 L72 28" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" fill="none"/>
          <rect x="4" y="26" width="72" height="8" rx="2" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
          <circle cx="18" cy="34" r="5" fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
          <circle cx="62" cy="34" r="5" fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
        </svg>
      </div>

      <div style={{ padding: '1.25rem' }}>
        {/* Category + seats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C' }}>
            {vehicle.categoryLabel}
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#BDB8AD' }}>
            {vehicle.seats} places
          </span>
        </div>

        {/* Name */}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.375rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '0.75rem', lineHeight: 1.2 }}>
          {vehicle.brand} {vehicle.model}
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', marginLeft: '0.375rem', fontWeight: 400 }}>
            {vehicle.year}
          </span>
        </h3>

        {/* Features */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
          {vehicle.features.slice(0, 3).map(f => (
            <span key={f} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', color: '#BDB8AD', padding: '0.2rem 0.5rem', border: '1px solid #2A2A2A' }}>
              {f}
            </span>
          ))}
        </div>

        {/* Price */}
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: '#C9A84C', marginBottom: '1rem' }}>
          {formatPrice(vehicle.pricePerDay, 'FCFA', { compact: true })}
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 400, color: '#BDB8AD', marginLeft: '0.25rem' }}>/jour</span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a
            href={`${WHATSAPP_BASE}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.625rem', padding: '0.625rem 0.5rem' }}
          >
            WhatsApp
          </a>
          <Link
            href={`/location-vehicules/${vehicle.slug}`}
            className="btn-gold"
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.625rem', padding: '0.625rem 0.5rem' }}
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LocationVehiculesClient() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [luxuryQty, setLuxuryQty] = useState(1)
  const [minibusQty, setMinibusQty] = useState(0)

  const filtered = activeCategory === 'all' ? VEHICLES_DATA : VEHICLES_DATA.filter(v => v.category === activeCategory)

  const convoyTotal = luxuryQty * 150000 + minibusQty * 165000
  const convoyMsg = encodeURIComponent(`Bonjour, je souhaite organiser un convoi de mariage avec ${luxuryQty} véhicule(s) de luxe et ${minibusQty} minibus. Budget estimé: ${convoyTotal.toLocaleString('fr-FR')} FCFA/jour.`)

  return (
    <>
      <Navbar />
      <PageHero
        label="Flotte Premium"
        title="Location de Véhicules"
        subtitle="16 véhicules · Chauffeurs professionnels · 24h/7j"
      />

      {/* Stats */}
      <section style={{ background: '#080808', borderBottom: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#1A1A1A' }}>
          {[
            { v: '16+', l: 'Véhicules' },
            { v: '24h/7j', l: 'Disponibilité' },
            { v: 'Chauffeur', l: 'Inclus' },
            { v: '2006', l: 'Depuis' },
          ].map(stat => (
            <div key={stat.l} style={{ background: '#080808', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: '#C9A84C', lineHeight: 1, marginBottom: '0.5rem' }}>{stat.v}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#BDB8AD', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle grid */}
      <section style={{ padding: '3rem 1.5rem', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Category filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '2rem' }}>
            {VEHICLE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '0.5rem 1rem', border: '1px solid',
                  borderColor: activeCategory === cat.id ? '#C9A84C' : '#2A2A2A',
                  background: activeCategory === cat.id ? '#C9A84C' : 'transparent',
                  color: activeCategory === cat.id ? '#080808' : '#BDB8AD',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1rem' }}>
            {filtered.map(v => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        </div>
      </section>

      {/* Convoy builder */}
      <section style={{ padding: '4rem 1.5rem', background: '#0a0a0a', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Convoi de Mariage</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '2.5rem' }}>
            Composez votre convoi
          </h2>

          <div style={{ background: '#111', border: '1px solid #1A1A1A', padding: '2rem', marginBottom: '1.5rem' }}>
            {/* Luxury */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#F7F4EE', fontWeight: 500 }}>Véhicules luxe</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#BDB8AD' }}>LC300 / LC200 / Prado</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => setLuxuryQty(Math.max(1, luxuryQty - 1))} style={{ width: '36px', height: '36px', background: 'transparent', border: '1px solid #2A2A2A', color: '#C9A84C', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>−</button>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#C9A84C', minWidth: '2rem', textAlign: 'center' }}>{luxuryQty}</span>
                <button onClick={() => setLuxuryQty(Math.min(5, luxuryQty + 1))} style={{ width: '36px', height: '36px', background: 'transparent', border: '1px solid #2A2A2A', color: '#C9A84C', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>+</button>
              </div>
            </div>
            {/* Minibus */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#F7F4EE', fontWeight: 500 }}>Minibus HiAce</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#BDB8AD' }}>15 places — transferts invités</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => setMinibusQty(Math.max(0, minibusQty - 1))} style={{ width: '36px', height: '36px', background: 'transparent', border: '1px solid #2A2A2A', color: '#C9A84C', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>−</button>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#C9A84C', minWidth: '2rem', textAlign: 'center' }}>{minibusQty}</span>
                <button onClick={() => setMinibusQty(Math.min(2, minibusQty + 1))} style={{ width: '36px', height: '36px', background: 'transparent', border: '1px solid #2A2A2A', color: '#C9A84C', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>+</button>
              </div>
            </div>
            {/* Total */}
            <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#BDB8AD' }}>Estimation / jour</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: '#C9A84C' }}>
                {formatPrice(convoyTotal, 'FCFA', { compact: true })}
              </span>
            </div>
          </div>

          <a href={`${WHATSAPP_BASE}?text=${convoyMsg}`} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ justifyContent: 'center', width: '100%' }}>
            💬 Réserver ce convoi
          </a>
        </div>
      </section>

      {/* References */}
      <section style={{ padding: '2.5rem 1.5rem', background: '#080808', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
          {REFERENCES.map(ref => (
            <span key={ref} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#BDB8AD', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.5rem 1rem', border: '1px solid #1A1A1A' }}>
              {ref}
            </span>
          ))}
        </div>
      </section>

      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />
    </>
  )
}
